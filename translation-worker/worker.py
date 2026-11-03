#!/usr/bin/env python3
"""Translate French catalogue fields into EN/DE/ES/PT without overwriting manual edits."""
import hashlib, json, os, sys, time
import requests
import argostranslate.package
import argostranslate.translate

BASE=os.environ["SUPABASE_URL"].rstrip("/")
KEY=os.environ["SUPABASE_SERVICE_ROLE_KEY"]
LANGS=("en","de","es","pt")
FIELDS={
 "tours":("title","summary","description","itinerary","inclusions","exclusions","seo_title","seo_description"),
 "destinations":("name","summary","description","seo_title","seo_description"),
}
HEADERS={"apikey":KEY,"Authorization":f"Bearer {KEY}","Content-Type":"application/json","Prefer":"return=minimal"}
SESSION=requests.Session()

def digest(value:str)->str:
 return hashlib.sha256(value.encode("utf-8")).hexdigest()

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
 path=argostranslate.package.download_package(pkg)
 argostranslate.package.install_from_path(path)

def translate(text:str,lang:str)->str:
 if not text.strip(): return text
 installed=argostranslate.translate.get_installed_languages()
 fr=next((x for x in installed if x.code=="fr"),None)
 en=next((x for x in installed if x.code=="en"),None)
 dst=next((x for x in installed if x.code==lang),None)
 if not fr or not en or not dst: raise RuntimeError(f"Missing Argos language model for fr/en/{lang}")
 english=text if lang=="en" else fr.get_translation(en).translate(text)
 result=english if lang=="en" else en.get_translation(dst).translate(english)
 if not result or not result.strip(): raise RuntimeError(f"Empty translation for {lang}")
 return result

def rest_get(table:str):
 rows=[]; offset=0
 while True:
  r=SESSION.get(f"{BASE}/rest/v1/{table}",headers={**HEADERS,"Range":f"{offset}-{offset+99}"},params={"select":"id,translations,"+",".join(FIELDS[table]),"limit":"100"},timeout=45)
  r.raise_for_status(); batch=r.json(); rows.extend(batch)
  if len(batch)<100: break
  offset+=100
 return rows

def process(table:str):
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
  if changed:
   payload={"translations":translations}
   response=SESSION.patch(f"{BASE}/rest/v1/{table}",headers=HEADERS,params={"id":f"eq.{row['id']}"},json=payload,timeout=45)
   response.raise_for_status();count+=1
 print(f"{table}: {count} record(s) updated")
 return count

def main():
 if os.getenv("DRY_RUN","true").lower()!="false":
  print("DRY_RUN enabled: no Supabase writes. Set DRY_RUN=false to publish translations.")
  return
 for pair in (("fr","en"),("en","de"),("en","es"),("en","pt")): install_pair(*pair)
 total=sum(process(table) for table in FIELDS)
 print(f"Completed: {total} records updated")

if __name__=="__main__":
 try: main()
 except Exception as exc:
  print(f"Translation worker failed: {exc}",file=sys.stderr); raise
