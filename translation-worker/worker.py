#!/usr/bin/env python3
"""Translate French catalogue fields into EN/DE/ES/PT without overwriting manual edits."""
import hashlib, json, os, sys, time
import requests
import argostranslate.package
import argostranslate.translate

BASE=os.getenv("SUPABASE_URL","").rstrip("/")
KEY=os.getenv("SUPABASE_SERVICE_ROLE_KEY","")
LANGS=("en","de","es","pt")
FIELDS={
 "tours":("title","summary","description","itinerary","inclusions","exclusions","seo_title","seo_description"),
 "destinations":("name","summary","description","seo_title","seo_description"),
}
# Modern Supabase secret keys (sb_secret_...) are API keys, not JWTs.
# Send them only via apikey; legacy service_role keys are JWTs and also use Bearer auth.
HEADERS={"apikey":KEY,"Content-Type":"application/json","Prefer":"return=minimal"}
if KEY and not KEY.startswith("sb_secret_"):
 HEADERS["Authorization"]=f"Bearer {KEY}"
SESSION=requests.Session()
PREVIEW=[]

# Names and cultural terms that must remain stable across languages.
# Keys are source-language spellings; values are the official forms to restore.
PROTECTED_TERMS = {
 "Vodun Days":"Vodun Days",
 "AFA TOURS":"AFA TOURS",
 "Bouche du Roy":"Bouche du Roy",
 "Porto-Novo":"Porto-Novo",
 "Porto Novo":"Porto-Novo",
 "Ouidah":"Ouidah",
 "Adjarra":"Adjarra",
 "Ganvié":"Ganvié",
 "Ganvie":"Ganvié",
 "Cotonou":"Cotonou",
 "Abomey":"Abomey",
 "Grand-Popo":"Grand-Popo",
 "Grand Popo":"Grand-Popo",
 "Black River":"Black River",
 "Rivière noire":"Black River",
 "Riviere noire":"Black River",
 "Zangbeto":"Zangbeto",
 "Honmè":"Honmè",
 "Hôgbonou":"Hôgbonou",
 "Hogbonou":"Hôgbonou",
 "Kpassè":"Kpassè",
 "Kpasse":"Kpassè",
 "Sodabi":"Sodabi",
 "Vodun":"Vodun",
}

def protect_terms(text:str):
 """Replace Beninese proper names with opaque tokens before machine translation."""
 replacements={}
 protected=text
 for index, (source, official) in enumerate(sorted(PROTECTED_TERMS.items(), key=lambda item: len(item[0]), reverse=True)):
  import re
  pattern=re.compile(re.escape(source), re.IGNORECASE)
  if pattern.search(protected):
   token=f"ZZZAFATERM{index:03d}ZZZ"
   protected=pattern.sub(token, protected)
   replacements[token]=official
 return protected, replacements

def restore_terms(text:str, replacements:dict)->str:
 for token, official in replacements.items():
  text=text.replace(token, official)
  text=text.replace(token.lower(), official)
 return text


def digest(value:str)->str:
 return hashlib.sha256(value.encode("utf-8")).hexdigest()

def merge_translations(latest:dict, proposed:dict, table:str)->dict:
 """Merge generated fields while preserving every human-owned value."""
 if not isinstance(latest,dict): latest={}
 merged=json.loads(json.dumps(latest))
 proposed_meta=proposed.get("_meta",{}).get("languages",{})
 for lang in LANGS:
  latest_lang=merged.setdefault(lang,{})
  latest_fields=merged.get("_meta",{}).get("languages",{}).get(lang,{}).get("fields",{})
  proposed_lang=proposed.get(lang,{})
  proposed_fields=proposed_meta.get(lang,{}).get("fields",{})
  for field,value in proposed_lang.items():
   if field not in FIELDS[table]: continue
   current=latest_lang.get(field)
   current_meta=latest_fields.get(field,{})
   # Preserve anything that is not positively identified as worker-generated.
   if current_meta.get("origin")=="manual": continue
   if current and current_meta.get("origin")!="argos": continue
   # A generated value edited outside the worker becomes human-owned.
   if current and current_meta.get("target_hash")!=digest(current):
    merged.setdefault("_meta",{}).setdefault("languages",{}).setdefault(lang,{"fields":{}}).setdefault("fields",{})[field]={"origin":"manual","updated_at":time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime())}
    continue
   merged_lang_meta=merged.setdefault("_meta",{}).setdefault("languages",{}).setdefault(lang,{"fields":{}}).setdefault("fields",{})
   merged_lang_meta[field]=proposed_fields.get(field,{})
   latest_lang[field]=value
 return merged

def install_pair(source:str,target:str)->None:
 installed=argostranslate.translate.get_installed_languages()
 src=next((x for x in installed if x.code==source),None)
 dst=next((x for x in installed if x.code==target),None)
 if src and dst:
  try:
   src.get_translation(dst)
   return
  except Exception:
   pass
 argostranslate.package.update_package_index()
 packages=argostranslate.package.get_available_packages()
 pkg=next((p for p in packages if p.from_code==source and p.to_code==target),None)
 if not pkg: raise RuntimeError(f"Argos package unavailable: {source}->{target}")
 path=pkg.download()
 argostranslate.package.install_from_path(path)

def translate(text:str,lang:str)->str:
 if not text.strip(): return text
 protected_text, replacements=protect_terms(text)
 installed=argostranslate.translate.get_installed_languages()
 fr=next((x for x in installed if x.code=="fr"),None)
 en=next((x for x in installed if x.code=="en"),None)
 dst=next((x for x in installed if x.code==lang),None)
 if not fr or not en or not dst: raise RuntimeError(f"Missing Argos language model for fr/en/{lang}")
 english=protected_text if lang=="en" else fr.get_translation(en).translate(protected_text)
 result=english if lang=="en" else en.get_translation(dst).translate(english)
 result=restore_terms(result,replacements)
 if not result or not result.strip(): raise RuntimeError(f"Empty translation for {lang}")
 return result

def rest_get(table:str, dry_run:bool=False):
 rows=[]; offset=0
 while True:
  r=SESSION.get(f"{BASE}/rest/v1/{table}",headers={**HEADERS,"Range":f"{offset}-{offset+99}"},params={"select":"id,translations,"+",".join(FIELDS[table]),"limit":"100"},timeout=45)
  r.raise_for_status(); batch=r.json(); rows.extend(batch)
  if len(batch)<100: break
  offset+=100
 return rows

def process(table:str, dry_run:bool=False):
 count=0
 for row in rest_get(table):
  translations=row.get("translations") or {}
  if not isinstance(translations,dict): translations={}
  changed=False
  meta=translations.setdefault("_meta",{}).setdefault("languages",{})
  for lang in LANGS:
   language_meta=meta.setdefault(lang,{"fields":{}})
   field_meta=language_meta.setdefault("fields",{})
   target=translations.setdefault(lang,{})
   for field in FIELDS[table]:
    source=row.get(field)
    if not isinstance(source,str) or not source.strip(): continue
    source_hash=digest(source)
    old_meta=field_meta.get(field,{})
    old_value=target.get(field)
    # Values without Argos provenance are manual. If an Argos value was edited in admin,
    # its current hash no longer matches target_hash: protect that manual correction forever.
    if old_meta.get("origin")=="manual": continue
    if old_value and old_meta.get("origin")!="argos": continue
    if old_value and old_meta.get("origin")=="argos" and old_meta.get("target_hash")!=digest(old_value):
     field_meta[field]={"origin":"manual","updated_at":time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime())}
     changed=True
     continue
    if old_value and old_meta.get("source_hash")==source_hash: continue
    translated=translate(source,lang)
    target[field]=translated
    field_meta[field]={"origin":"argos","source_hash":source_hash,"target_hash":digest(translated),"updated_at":time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime())}
    changed=True
  if changed and dry_run:
   preview_fields={}
   for lang in LANGS:
    generated={field:translations.get(lang,{}).get(field) for field in FIELDS[table]
               if translations.get(lang,{}).get(field) and translations.get("_meta",{}).get("languages",{}).get(lang,{}).get("fields",{}).get(field,{}).get("origin")=="argos"}
    if generated: preview_fields[lang]=generated
   PREVIEW.append({"table":table,"id":row["id"],"translations":preview_fields})
   print(f"{table} {row['id']}: would update translations (dry-run)")
   count+=1
   continue
  if changed:
   # Re-read immediately before writing so admin corrections made while translation
   # was running are merged and never lost to a stale JSONB snapshot.
   latest_response=SESSION.get(f"{BASE}/rest/v1/{table}",headers=HEADERS,params={"select":"id,translations","id":f"eq.{row['id']}","limit":"1"},timeout=45)
   latest_response.raise_for_status()
   latest_rows=latest_response.json()
   if not latest_rows:
    print(f"{table} {row['id']}: row disappeared; skipped")
    continue
   latest=latest_rows[0].get("translations") or {}
   latest=merge_translations(latest,translations,table)
   response=SESSION.patch(f"{BASE}/rest/v1/{table}",headers=HEADERS,params={"id":f"eq.{row['id']}"},json={"translations":latest},timeout=45)
   response.raise_for_status();count+=1
 print(f"{table}: {count} record(s) updated")
 return count

def main():
 dry_run=os.getenv("DRY_RUN","true").lower()!="false"
 if not BASE or not KEY:
  if dry_run:
   print("Supabase secrets absent: syntax and unit tests only.")
   return
  raise RuntimeError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in write mode.")
 for pair in (("fr","en"),("en","de"),("en","es"),("en","pt")): install_pair(*pair)
 total=sum(process(table,dry_run=dry_run) for table in FIELDS)
 if dry_run:
  with open("translation-preview.json","w",encoding="utf-8") as preview_file:
   json.dump({"mode":"dry-run","records":PREVIEW},preview_file,ensure_ascii=False,indent=2)
  print(f"Preview saved: {len(PREVIEW)} records in translation-preview.json")
 print(f"Completed: {total} records {'would be updated' if dry_run else 'updated'}")

if __name__=="__main__":
 try: main()
 except Exception as exc:
  print(f"Translation worker failed: {exc}",file=sys.stderr); raise
