// Gestion du contenu du site (français saisi, anglais automatique) + partenaires + statistiques
const THEMES=[["ville","Villes et patrimoine"],["memoire","Histoire et mémoire"],["eau","Eau et savoir-faire"],["nature","Nature et safari"],["vodun","Vodun et spiritualités"]];
const KINDS={
 circuit:{label:"Circuits",one:"circuit",fields:[
  {k:"title",l:"Titre du circuit",tr:1,req:1},{k:"destination",l:"Ville / destination",req:1},{k:"category",l:"Catégorie (ex. HISTOIRE · PATRIMOINE)",tr:1},
  {k:"shortDescription",l:"Résumé court (1–2 phrases)",tr:1,area:1},{k:"description",l:"Description complète",tr:1,area:1,req:1},
  {k:"stops",l:"Étapes (une par ligne)",tr:1,area:1},{k:"duration",l:"Durée (ex. 3 à 4 h)",tr:1},
  {k:"priceValue",l:"Prix par personne en FCFA (0 = sur devis)",num:1},{k:"theme",l:"Thème",theme:1},{k:"img",l:"Photo principale (lien https)"}]},
 team:{label:"Équipe",one:"membre",fields:[
  {k:"name",l:"Nom complet",req:1},{k:"role",l:"Fonction",tr:1,req:1},{k:"bio",l:"Présentation courte",tr:1,area:1},{k:"photo",l:"Photo (lien https, facultatif)"}]},
 transport:{label:"Transport",one:"offre de transport",fields:[
  {k:"title",l:"Nom de l’offre (ex. Cotonou ⇄ Porto-Novo)",tr:1,req:1},{k:"description",l:"Détail",tr:1,area:1},{k:"price",l:"Prix affiché (ex. 25 000 FCFA / trajet)",tr:1}]},
 partner:{label:"Partenaires",one:"partenaire",fields:[
  {k:"name",l:"Nom du partenaire",req:1},{k:"ptype",l:"Type",sel:[["hotel","Hôtel"],["resto","Restaurant"],["heb","Hébergement"],["trans","Transport"],["other","Autre"]]},
  {k:"city",l:"Ville"},{k:"description",l:"Présentation",tr:1,area:1},{k:"price",l:"Tarif indicatif",tr:1},{k:"img",l:"Photo (lien https)"},{k:"link",l:"Lien (site, Facebook, vidéo)"}]},
 text:{label:"Textes à corriger",one:"texte",fields:[
  {k:"text",l:"Texte français tel qu’il est écrit sur le site",tr:1,area:1,req:1}]}
};
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slugify=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60)||"item-"+Date.now().toString(36);
const STAT={draft:"Brouillon",published:"Publié sur le site",archived:"Archivé"};

export async function renderSiteManager(content,supabase,kind="circuit"){
 const K=KINDS[kind];
 content.innerHTML="<h2>Contenu du site</h2><p>Chargement…</p>";
 const {data:rows,error}=await supabase.from("site_items").select("*").eq("kind",kind).order("sort").order("created_at");
 if(error){content.innerHTML="<h2>Contenu du site</h2><p>"+esc(error.message)+"</p>";return;}
 const tabs=Object.entries(KINDS).map(([k,v])=>'<button type="button" class="button'+(k===kind?" active":"")+'" data-sk="'+k+'" style="margin:0 6px 6px 0">'+v.label+"</button>").join("");
 const fieldHtml=(f,side)=>{
  const n=side+"_"+f.k,dis=side==="en"&&!f.tr;
  if(side==="en"&&!f.tr)return"";
  if(f.sel)return '<label>'+esc(f.l)+'<select name="'+n+'">'+f.sel.map(o=>'<option value="'+o[0]+'">'+o[1]+"</option>").join("")+"</select></label>";
  if(f.theme)return '<label>'+esc(f.l)+'<select name="'+n+'">'+THEMES.map(o=>'<option value="'+o[0]+'">'+o[1]+"</option>").join("")+"</select></label>";
  if(f.area)return '<label>'+esc(f.l)+'<textarea name="'+n+'" rows="'+(f.k==="description"?5:3)+'"'+(f.req&&side==="fr"?" required":"")+"></textarea></label>";
  return '<label>'+esc(f.l)+'<input name="'+n+'"'+(f.num?' type="number" min="0" step="500"':"")+(f.req&&side==="fr"?" required":"")+"></label>";
 };
 const list=rows.length?rows.map(r=>{const t=r.fr.title||r.fr.name||r.fr.text||r.slug;return '<article class="admin-panel" style="padding:14px;margin:8px 0;display:flex;gap:12px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:200px"><strong>'+esc(String(t).slice(0,90))+'</strong><br><small>'+esc(STAT[r.status]||r.status)+" · anglais "+(Object.keys(r.en||{}).length?"prêt":"à traduire")+'</small></div><button class="button" data-edit="'+r.id+'" type="button">Modifier</button><button class="button" data-toggle="'+r.id+'" type="button">'+(r.status==="published"?"Retirer du site":"Publier")+'</button><button class="button" data-del="'+r.id+'" type="button">Supprimer</button></article>'}).join(""):"<p>Aucun élément. Ajoutez le premier ci-dessous.</p>";
 content.innerHTML='<h2>Contenu du site</h2><p>Écrivez en français. Le bouton « Traduire en anglais » prépare la version anglaise, que vous pouvez corriger avant de publier. Le visiteur qui choisit EN la voit automatiquement.</p><div>'+tabs+'</div><h3>'+K.label+" ("+rows.length+')</h3>'+list+
 '<section class="admin-panel"><h3 id="sf-title">Ajouter : '+K.one+'</h3><form id="sf"><input type="hidden" name="id"><div class="admin-grid"><div><h4>Français</h4>'+K.fields.map(f=>fieldHtml(f,"fr")).join("")+'</div><div><h4>Anglais (automatique, modifiable)</h4>'+K.fields.map(f=>fieldHtml(f,"en")).join("")+'</div></div><div class="admin-grid"><label>Ordre d’affichage<input name="sort" type="number" value="0"></label><label>Statut<select name="status"><option value="draft">Brouillon</option><option value="published">Publié sur le site</option><option value="archived">Archivé</option></select></label></div><p><button class="button" type="button" id="sf-tr">Traduire en anglais</button> <button class="button" type="submit">Enregistrer</button> <button class="button" type="button" id="sf-reset">Nouveau</button></p><p class="admin-status" id="sf-msg" aria-live="polite"></p></form></section>';
 const form=content.querySelector("#sf"),fb=content.querySelector("#sf-msg");
 content.querySelectorAll("[data-sk]").forEach(b=>b.onclick=()=>renderSiteManager(content,supabase,b.dataset.sk));
 const val=(side,f)=>{const el=form.elements.namedItem(side+"_"+f.k);return el?el.value.trim():""};
 const reset=()=>{form.reset();form.elements.id.value="";content.querySelector("#sf-title").textContent="Ajouter : "+K.one;fb.textContent=""};
 content.querySelector("#sf-reset").onclick=reset;
 content.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>{const r=rows.find(x=>x.id===b.dataset.edit);reset();form.elements.id.value=r.id;form.elements.sort.value=r.sort;form.elements.status.value=r.status;K.fields.forEach(f=>{const a=form.elements.namedItem("fr_"+f.k),e=form.elements.namedItem("en_"+f.k);if(a)a.value=r.fr[f.k]??"";if(e)e.value=r.en?.[f.k]??""});content.querySelector("#sf-title").textContent="Modifier : "+K.one;form.scrollIntoView({behavior:"smooth"})});
 content.querySelectorAll("[data-toggle]").forEach(b=>b.onclick=async()=>{const r=rows.find(x=>x.id===b.dataset.toggle);const {error}=await supabase.from("site_items").update({status:r.status==="published"?"draft":"published"}).eq("id",r.id);if(error)alert(error.message);renderSiteManager(content,supabase,kind)});
 content.querySelectorAll("[data-del]").forEach(b=>b.onclick=async()=>{if(!confirm("Supprimer définitivement cet élément ?"))return;const {error}=await supabase.from("site_items").delete().eq("id",b.dataset.del);if(error)alert(error.message);renderSiteManager(content,supabase,kind)});
 content.querySelector("#sf-tr").onclick=async()=>{
  const texts={};K.fields.filter(f=>f.tr).forEach(f=>{const v=val("fr",f);if(v)texts[f.k]=v});
  if(!Object.keys(texts).length){fb.textContent="Écrivez d’abord le texte en français.";return}
  fb.textContent="Traduction en cours…";
  try{
   const {data,error}=await supabase.functions.invoke("translate",{body:{texts,to:"en"}});
   if(error){let m=error.message;try{const j=await error.context.json();m=j.error||m}catch(e){}throw new Error(m)}
   const tr=data?.translations||{};Object.entries(tr).forEach(([k,v])=>{const el=form.elements.namedItem("en_"+k);if(el)el.value=v});
   fb.textContent="Traduction prête. Relisez-la puis enregistrez.";
  }catch(e){fb.textContent="Traduction impossible : "+(e.message||e)+" (la clé ANTHROPIC_API_KEY doit être ajoutée dans Supabase). Vous pouvez aussi écrire l’anglais à la main."}
 };
 form.onsubmit=async e=>{
  e.preventDefault();
  const fr={},en={};K.fields.forEach(f=>{let v=val("fr",f);if(f.num)v=v===""?0:Number(v);if(v!==""&&v!==undefined)fr[f.k]=v;if(f.tr){const t=val("en",f);if(t)en[f.k]=t}});
  const key=fr.title||fr.name||fr.text,id=form.elements.id.value;
  const row={kind,fr,en,sort:+form.elements.sort.value||0,status:form.elements.status.value};
  fb.textContent="Enregistrement…";
  let r;
  if(id)r=await supabase.from("site_items").update(row).eq("id",id);
  else r=await supabase.from("site_items").insert({...row,slug:slugify(key)});
  if(r.error){fb.textContent=r.error.message.includes("duplicate")?"Un élément porte déjà ce nom. Changez le titre.":r.error.message;return}
  if(row.status==="published"&&K.fields.some(f=>f.tr)&&!Object.keys(en).length)alert("Publié sans version anglaise : le visiteur EN verra le français. Utilisez « Traduire en anglais ».");
  renderSiteManager(content,supabase,kind);
 };
}

export async function renderPartners(content,supabase){
 content.innerHTML="<h2>Partenaires</h2><p>Chargement…</p>";
 const {data:msgs,error}=await supabase.from("messages").select("*").order("created_at",{ascending:false}).limit(200);
 if(error){content.innerHTML="<p>"+esc(error.message)+"</p>";return}
 const parts=msgs.filter(m=>/partenaire|partner/i.test((m.subject||"")+" "+(m.body||"").slice(0,80)));
 const wa=m=>"https://wa.me/"+String(m.phone||"").replace(/\D/g,"");
 content.innerHTML="<h2>Demandes de partenariat</h2><p>Lisez la fiche reçue, créez la fiche publique (avec traduction anglaise) puis publiez-la.</p>"+(parts.length?parts.map(m=>'<article class="admin-panel" style="padding:16px"><strong>'+esc(m.full_name)+"</strong> · "+esc(m.email||"")+"<br><small>"+new Date(m.created_at).toLocaleString("fr-FR")+' · '+esc(m.status)+'</small><pre style="white-space:pre-wrap;font:inherit;margin:10px 0">'+esc(m.body)+'</pre><button class="button" data-mk="'+m.id+'" type="button">Créer la fiche publique</button> <button class="button" data-ok="'+m.id+'" type="button">Marquer traitée</button></article>').join(""):"<p>Aucune demande de partenariat reçue pour le moment.</p>")+'<p><button class="button" id="pgo" type="button">Gérer les fiches publiées</button></p>';
 content.querySelector("#pgo").onclick=()=>renderSiteManager(content,supabase,"partner");
 content.querySelectorAll("[data-ok]").forEach(b=>b.onclick=async()=>{await supabase.from("messages").update({status:"closed"}).eq("id",b.dataset.ok);renderPartners(content,supabase)});
 content.querySelectorAll("[data-mk]").forEach(b=>b.onclick=async()=>{
  await renderSiteManager(content,supabase,"partner");const m=msgs.find(x=>x.id===b.dataset.mk),f=content.querySelector("#sf");
  f.elements.fr_name.value=m.full_name||"";f.elements.fr_description.value=String(m.body||"").slice(0,600);f.scrollIntoView({behavior:"smooth"});
 });
}

export async function renderStats(content,supabase){
 content.innerHTML="<h2>Statistiques</h2><p>Chargement…</p>";
 const {data,error}=await supabase.from("bookings").select("nationality,tour_name,status,party_size,created_at,preferred_date");
 if(error){content.innerHTML="<p>"+esc(error.message)+"</p>";return}
 const count=(arr,fn)=>{const m={};arr.forEach(r=>{const k=fn(r)||"Non précisé";m[k]=(m[k]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1])};
 const bars=e=>{const mx=Math.max(1,...e.map(x=>x[1]));return e.length?e.slice(0,12).map(([k,v])=>'<div style="display:flex;gap:10px;align-items:center;margin:5px 0"><span style="width:170px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(k)+'</span><span style="height:14px;border-radius:7px;background:#E8832F;width:'+Math.round(v/mx*100)+'%;min-width:6px"></span><b>'+v+"</b></div>").join(""):"<p>Pas encore de données.</p>"};
 const people=data.reduce((s,r)=>s+(r.party_size||0),0);
 const month=r=>(r.created_at||"").slice(0,7);
 content.innerHTML='<h2>Statistiques</h2><div class="booking-stats"><div><span>Demandes</span><strong>'+data.length+"</strong></div><div><span>Voyageurs</span><strong>"+people+"</strong></div><div><span>Confirmées</span><strong>"+data.filter(r=>r.status==="confirmed").length+"</strong></div></div><h3>Par nationalité</h3>"+bars(count(data,r=>r.nationality))+"<h3>Par mois</h3>"+bars(count(data,month).sort((a,b)=>a[0]<b[0]?1:-1))+"<h3>Par statut</h3>"+bars(count(data,r=>r.status));
}

// Message de rappel prêt à envoyer (WhatsApp) pour une réservation
export function reminderLink(b,kind){
 const n=b.full_name||"", ref=b.reference||"";
 const T={
  pay:"*Rappel de paiement — AFA TOURS*\n\nBonjour "+n+",\n\nVotre demande _"+ref+"_ est en attente de paiement pour confirmer votre place.\nPaiement possible par *Mobile Money* ou *carte bancaire*.\n\nMerci,\n_AFA TOURS · Découvrez l’Afrique à travers le Bénin_",
  date:"*Votre circuit approche — AFA TOURS*\n\nBonjour "+n+",\n\nNous vous attendons le *"+(b.preferred_date||"")+"* pour _"+(b.tour_name||"votre circuit")+"_ (réf. "+ref+").\nRépondez à ce message pour confirmer le point de rendez-vous.\n\n_AFA TOURS_",
  review:"*Merci pour votre visite — AFA TOURS*\n\nBonjour "+n+",\n\nComment s’est passé votre séjour ? Votre avis aide d’autres voyageurs :\nhttps://leonel-affognon.github.io/afa-tours-website/#avis\n\n_Merci !_"
 };
 const phone=String(b.phone||"").replace(/\D/g,"");
 return (phone?"https://wa.me/"+phone:"https://wa.me/")+"?text="+encodeURIComponent(T[kind]);
}
