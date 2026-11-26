// Gestion du contenu du site (français saisi, anglais automatique) + partenaires + statistiques
const THEMES=[["ville","Villes et patrimoine"],["memoire","Histoire et mémoire"],["eau","Eau et savoir-faire"],["nature","Nature et safari"],["vodun","Vodun et spiritualités"]];
const KINDS={
 circuit:{label:"Circuits et excursions",one:"circuit",intro:"Les excursions proposées aux visiteurs. Seuls les circuits <b>affichés</b> apparaissent sur le site.",fields:[
  {k:"title",l:"Titre du circuit",tr:1,req:1},{k:"destination",l:"Ville / destination",req:1},{k:"category",l:"Catégorie (ex. HISTOIRE · PATRIMOINE)",tr:1},
  {k:"shortDescription",l:"Résumé court (1–2 phrases)",tr:1,area:1},{k:"description",l:"Description complète",tr:1,area:1,req:1},
  {k:"stops",l:"Étapes (une par ligne)",tr:1,area:1},{k:"duration",l:"Durée (ex. 3 à 4 h)",tr:1},{k:"incl",l:"Ce qui est inclus (une ligne par élément)",tr:1,area:1,rows:3,h:"Exemple : Guide francophone ou anglophone. Entrées aux sites. Eau. Si vide : Visite guidée, accès aux sites."},{k:"excl",l:"Ce qui n’est pas inclus (une ligne par élément)",tr:1,area:1,rows:3,h:"Exemple : Repas. Transport. Hébergement. Si vide : Repas, transport, hébergement."},
  {k:"priceValue",l:"Prix en FCFA (0 = sur devis)",num:1},{k:"priceUnit",l:"Le prix est calculé…",sel:[["","Par personne"],["group","Par groupe (forfait unique pour tout le groupe)"]],h:"Choisissez « Par groupe » pour les circuits vendus au forfait : le prix ne dépend pas du nombre de voyageurs."},{k:"priceFrom",l:"Afficher « à partir de » devant le prix",sel:[["","Non"],["true","Oui"]]},{k:"theme",l:"Thème",theme:1,h:"Choisit la couleur de la carte si aucune photo n’est ajoutée."},{k:"img",l:"Photo principale (lien https)"},{k:"gallery",l:"Galerie photos (un lien https par ligne)",gal:1,h:"Photos supplémentaires du circuit. Vous pouvez aussi en importer plusieurs d’un coup ci-dessous."}]},
 sejour:{label:"Séjours",one:"séjour",intro:"Les formules de plusieurs jours (3, 7, 14, 21 jours ou sur mesure). Seuls les séjours affichés apparaissent sur le site.",fields:[
  {k:"name",l:"Nom du séjour",tr:1,req:1},{k:"days",l:"Nombre de jours (vide = sur mesure)",num:1,step:1},{k:"incl",l:"Ce qui est inclus (une ligne par élément)",tr:1,area:1,rows:3,h:"Exemple : Guide francophone ou anglophone. Entrées aux sites. Eau. Si vide : Visite guidée, accès aux sites."},{k:"excl",l:"Ce qui n’est pas inclus (une ligne par élément)",tr:1,area:1,rows:3,h:"Exemple : Repas. Transport. Hébergement. Si vide : Repas, transport, hébergement."},{k:"summary",l:"Résumé (1–2 phrases)",tr:1,area:1,req:1,rows:3},{k:"priceValue",l:"Prix en FCFA (0 = sur devis)",num:1},{k:"priceUnit",l:"Le prix est calculé…",sel:[["","Par personne"],["group","Par groupe (forfait unique)"]]},{k:"priceFrom",l:"Afficher « à partir de » devant le prix",sel:[["","Non"],["true","Oui"]]},{k:"route",l:"Programme (une étape par ligne)",tr:1,area:1,h:"Exemple : Jour 1 · Porto-Novo"}]},
 event:{label:"Événements et festivals",one:"événement",art:"un ",intro:"Festivals et rendez-vous à ne pas manquer. Le premier événement affiché devient la grande vedette du site ; sans événement affiché, la section disparaît.",empty:"Aucun événement affiché : la section « Événements » est cachée sur le site.",fields:[
  {k:"title",l:"Nom de l’événement",tr:1,req:1},{k:"place",l:"Lieu",req:1},{k:"start",l:"Date de début",date:1,req:1},{k:"end",l:"Date de fin",date:1},{k:"description",l:"Texte qui donne envie",tr:1,area:1,req:1,h:"Créez la curiosité et l’urgence : places limitées, compte à rebours…"},{k:"packages",l:"Formules (une par ligne : Nom | prix FCFA | détail)",tr:1,area:1,rows:5,h:"Exemple : Découverte · 1 journée | 25000 | Accompagnement sur une journée"},{k:"img",l:"Photo de l’événement"},{k:"gallery",l:"Galerie photos (un lien https par ligne)",gal:1,h:"Photos supplémentaires de l’événement. Vous pouvez aussi en importer plusieurs d’un coup ci-dessous."}]},
 team:{label:"Équipe",one:"membre",intro:"Les personnes présentées sur le site.",fields:[
  {k:"name",l:"Nom complet",req:1},{k:"role",l:"Fonction",tr:1,req:1},{k:"bio",l:"Présentation courte",tr:1,area:1},{k:"photo",l:"Photo (lien https, facultatif)"}]},
 transport:{label:"Offres de transport",one:"offre de transport",art:"une ",intro:"Trajets et tarifs affichés dans la section Partenaires.",fields:[
  {k:"title",l:"Nom de l’offre (ex. Cotonou ⇄ Porto-Novo)",tr:1,req:1},{k:"description",l:"Détail",tr:1,area:1},{k:"price",l:"Prix affiché (ex. 25 000 FCFA / trajet)",tr:1}]},
 partner:{label:"Fiches partenaires",one:"partenaire",intro:"Hôtels, restaurants, hébergements et transporteurs partenaires.",fields:[
  {k:"name",l:"Nom du partenaire",req:1},{k:"ptype",l:"Type",sel:[["hotel","Hôtel"],["resto","Restaurant"],["heb","Hébergement"],["trans","Transport"],["other","Autre"]]},
  {k:"city",l:"Ville"},{k:"description",l:"Présentation",tr:1,area:1},{k:"price",l:"Tarif indicatif",tr:1},{k:"img",l:"Photo (lien https)"},{k:"link",l:"Lien (site, Facebook, vidéo)"},{k:"note",l:"Note sur 5 (ex. 4,5)"}]},
 social:{label:"Réseaux sociaux",one:"réseau social",intro:"Les liens vers vos pages. Ils apparaissent au pied du site.",fields:[
  {k:"net",l:"Réseau",sel:[["facebook","Facebook"],["instagram","Instagram"],["tiktok","TikTok"],["youtube","YouTube"],["linkedin","LinkedIn"]],req:1},{k:"url",l:"Lien complet de votre page (https://…)",req:1}]},
 blog:{label:"Blog",one:"article",intro:"De vrais articles : titre, photo de couverture, intertitres, images dans le texte, citations. Utilisez la barre d’outils au-dessus du texte : aucun code à connaître.",fields:[
  {k:"title",l:"Titre de l’article",tr:1,req:1},{k:"cat",l:"Catégorie",sel:[["Culture","Culture"],["Gastronomie","Gastronomie"],["Vodun et spiritualités","Vodun et spiritualités"],["Histoire","Histoire"],["Nature","Nature"],["Conseils de voyage","Conseils de voyage"],["Coulisses","Coulisses"]]},{k:"img",l:"Photo de couverture"},{k:"excerpt",l:"Résumé (2 phrases, affiché sur la carte et en chapeau)",tr:1,area:1,rows:3},{k:"body",l:"Texte de l’article",tr:1,area:1,req:1,rich:1,rows:16},{k:"author",l:"Auteur (par défaut : Équipe AFA TOURS)"},{k:"date",l:"Date affichée (ex. 12 décembre 2026)"}]},
 text:{label:"Textes à corriger",one:"texte",intro:"Corrections de textes existants du site (avancé).",fields:[
  {k:"text",l:"Texte français tel qu’il est écrit sur le site",tr:1,area:1,req:1}]}
};
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slugify=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60)||"item-"+Date.now().toString(36);
const STAT={draft:"Brouillon",published:"Publié sur le site",archived:"Archivé"};

// ---- utilitaires d'interface partagés ----
export function toast(msg,bad){let t=document.getElementById("adToast");if(!t){t=document.createElement("div");t.id="adToast";t.setAttribute("role","status");t.setAttribute("aria-live","polite");document.body.appendChild(t)}t.textContent=msg;t.className="show"+(bad?" bad":"");clearTimeout(t._h);t._h=setTimeout(()=>{t.className=""},bad?6000:3200)}
let keepDepth=0;
// Recharge le contenu sur place : la page ne remonte pas en haut
export async function keep(content,fn){
 const top=window.scrollY,h=content.offsetHeight;
 if(keepDepth===0)content.style.minHeight=h+"px";
 keepDepth++;
 try{return await fn()}finally{
  keepDepth--;
  if(keepDepth===0){window.scrollTo(0,top);requestAnimationFrame(()=>{window.scrollTo(0,top);content.style.minHeight=""})}
 }
}
export const renderSiteManager=(content,supabase,kind="circuit",opt={})=>keep(content,()=>siteManager(content,supabase,kind,opt));

async function siteManager(content,supabase,kind,opt){
 const K=KINDS[kind];
 content.innerHTML="<h2>"+K.label+"</h2><p>Chargement…</p>";
 const {data:rows,error}=await supabase.from("site_items").select("*").eq("kind",kind).order("sort").order("created_at");
 if(error){content.innerHTML="<h2>"+K.label+"</h2><p>"+esc(error.message)+"</p>";return}
 const fieldHtml=(f,side)=>{
  const n=side+"_"+f.k;
  if(side==="en"&&!f.tr)return"";
  const hint=f.h?'<small class="ad-h">'+esc(f.h)+"</small>":"";
  const req=f.req&&side==="fr"?" required":"";
  if(f.sel)return '<label>'+esc(f.l)+'<select name="'+n+'">'+f.sel.map(o=>'<option value="'+o[0]+'">'+o[1]+"</option>").join("")+"</select>"+hint+"</label>";
  if(f.theme)return '<label>'+esc(f.l)+'<select name="'+n+'">'+THEMES.map(o=>'<option value="'+o[0]+'">'+o[1]+"</option>").join("")+"</select>"+hint+"</label>";
  if(f.rich&&side==="fr")return '<div class="wide ad-rich"><label>'+esc(f.l)+'</label><div class="rt-bar" role="toolbar" aria-label="Mise en forme"><button type="button" data-rt="## ">Titre</button><button type="button" data-rt="### ">Sous-titre</button><button type="button" data-rt="**">Gras</button><button type="button" data-rt="> ">Citation</button><button type="button" data-rt="- ">Liste</button><button type="button" data-rt="!! ">Astuce</button><button type="button" data-rt="---">Séparateur</button><label class="rt-img">🖼 Insérer des images<input type="file" accept="image/*" multiple data-rtimg="'+n+'"></label><button type="button" data-rtprev>Aperçu</button></div><textarea name="'+n+'" rows="'+(f.rows||14)+'"'+req+'></textarea><div class="rt-prev art-body" hidden></div>'+hint+'<small class="ad-h">Astuce : une ligne vide sépare deux paragraphes. Pour une image avec légende : ![légende](lien). Plusieurs images à la suite forment une galerie.</small></div>';
  if(f.area)return '<label class="wide">'+esc(f.l)+'<textarea name="'+n+'" rows="'+(f.rows||(f.k==="description"||f.k==="body"?6:3))+'"'+req+"></textarea>"+hint+"</label>";
  if(f.gal&&side==="fr")return '<div class="wide ad-photo"><label>'+esc(f.l)+'<textarea name="'+n+'" rows="4" placeholder="https://…"></textarea>'+hint+'</label><label class="sx-upl">Ou importer plusieurs photos depuis cet appareil<input type="file" accept="image/*" multiple data-upmulti="'+n+'"></label><small class="sx-upm" data-upm="'+n+'"></small></div>';
  if((f.k==="img"||f.k==="photo")&&side==="fr")return '<div class="wide ad-photo"><label>'+esc(f.l)+'<input name="'+n+'" placeholder="https://…">'+hint+'</label><label class="sx-upl">Ou choisir une photo sur cet appareil<input type="file" accept="image/*" data-up="'+n+'"></label><small class="sx-upm" data-upm="'+n+'"></small><img class="ad-prev" alt="" hidden data-prev="'+n+'"></div>';
  return '<label>'+esc(f.l)+'<input name="'+n+'"'+(f.num?' type="number" min="0" step="'+(f.step||500)+'"':f.date?' type="date"':"")+req+">"+hint+"</label>";
 };
 const titleOf=r=>r.fr.title||r.fr.name||r.fr.text||(r.fr.net?(r.fr.net+" : "+(r.fr.url||"")):"")||r.slug;
 const subOf=r=>{const f=r.fr;if(kind==="circuit")return [f.destination,f.duration].filter(Boolean).join(" · ");if(kind==="sejour")return f.days?f.days+" jours":"Sur mesure";if(kind==="event")return [f.place,f.start].filter(Boolean).join(" · ");if(kind==="partner")return [f.ptype,f.city].filter(Boolean).join(" · ");if(kind==="team")return f.role||"";if(kind==="blog")return f.date||"";return ""};
 const list=rows.length?rows.map(r=>{const pub=r.status==="published",hasEn=Object.keys(r.en||{}).length,img=r.fr.img||r.fr.photo;return '<article class="ad-item'+(pub?"":" off")+'">'+(img?'<img class="ad-th" loading="lazy" alt="" src="'+esc(img)+'" onerror="this.remove()">':"")+'<div class="ad-it"><b>'+esc(String(titleOf(r)).slice(0,90))+'</b><small>'+esc(subOf(r))+'</small><span class="sx-st '+(pub?"pub":r.status==="archived"?"ar":"dr")+'">'+(pub?"Affiché sur le site":r.status==="archived"?"Archivé":"Masqué")+'</span>'+(K.fields.some(f=>f.tr)?'<small>Anglais : '+(hasEn?"prêt":"à traduire")+'</small>':"")+'</div><div class="sx-act"><button class="sx-btn" data-edit="'+r.id+'" type="button">Modifier</button><button class="sx-btn '+(pub?"":"pri")+'" data-toggle="'+r.id+'" type="button">'+(pub?"Masquer":"Afficher")+'</button><button class="sx-btn dg" data-del="'+r.id+'" type="button">Supprimer</button></div></article>'}).join(""):'<div class="ad-empty"><b>Rien d’enregistré pour le moment.</b><p>'+esc(K.empty||"Ajoutez le premier élément : il apparaîtra sur le site dès qu’il est affiché.")+'</p></div>';
 content.innerHTML='<div class="ad-head"><div><h2>'+K.label+" <small>("+rows.length+')</small></h2><p class="ad-intro">'+(K.intro||"")+'</p></div><button class="sx-btn pri big" type="button" id="sf-new">+ Ajouter '+(K.art||"un ")+K.one+'</button></div>'+
 '<section class="sx-form" id="sf-wrap" hidden><div class="ad-fh"><h3 id="sf-title" class="sx-h">Ajouter</h3><button type="button" class="sx-btn" id="sf-close">Fermer</button></div><form id="sf"><input type="hidden" name="id"><div class="ad-grid">'+K.fields.map(f=>fieldHtml(f,"fr")).join("")+'</div>'+(K.fields.some(f=>f.tr)?'<details id="sf-en" class="ad-en"><summary>Version anglaise (facultatif, automatique)</summary><p class="ad-h">Pour les visiteurs qui choisissent EN. Cliquez sur « Traduire en anglais » puis relisez.</p><div class="ad-grid">'+K.fields.map(f=>fieldHtml(f,"en")).join("")+'</div><button class="sx-btn" type="button" id="sf-tr">Traduire en anglais</button></details>':"")+'<label class="ad-sw"><input type="checkbox" name="show" checked> <span><b>Afficher sur le site</b><small>Décoché : l’élément reste enregistré mais les visiteurs ne le voient pas.</small></span></label><details class="ad-en"><summary>Réglages avancés</summary><div class="ad-grid"><label>Ordre d’affichage<input name="sort" type="number" value="0"><small class="ad-h">0 = en premier. Plus le nombre est grand, plus l’élément est loin.</small></label><label>Statut précis<select name="status"><option value="published">Affiché sur le site</option><option value="draft">Masqué (brouillon)</option><option value="archived">Archivé</option></select></label></div></details><p class="sx-msg" id="sf-msg" aria-live="polite"></p><div class="sx-bar"><button class="sx-btn pri big" type="submit">Enregistrer</button><button class="sx-btn" type="button" id="sf-reset">Vider le formulaire</button></div></form></section>'+
 '<div class="ad-list">'+list+"</div>";
 const form=content.querySelector("#sf"),fb=content.querySelector("#sf-msg"),wrap=content.querySelector("#sf-wrap");
 const val=(side,f)=>{const el=form.elements.namedItem(side+"_"+f.k);return el?el.value.trim():""};
 const showPrev=n=>{const p=content.querySelector('[data-prev="'+n+'"]'),v=form.elements.namedItem(n)?.value;if(p){p.hidden=!v;if(v)p.src=v}};
 form.addEventListener("input",e=>{if(e.target.name&&/^fr_(img|photo)$/.test(e.target.name))showPrev(e.target.name);if(e.target.name==="show")form.elements.status.value=e.target.checked?"published":"draft"});
 const open=(title)=>{wrap.hidden=false;content.querySelector("#sf-title").textContent=title;wrap.scrollIntoView({behavior:"smooth",block:"start"})};
 const reset=()=>{form.reset();form.elements.id.value="";form.elements.show.checked=true;form.elements.status.value="published";fb.textContent="";content.querySelectorAll(".ad-prev").forEach(p=>p.hidden=true)};
 const mdPrev=src=>{const E=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));const inl=t=>E(t).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,"<a>$1</a>");return String(src).split(/\n/).map(l=>{l=l.trim();let m;if(!l)return"";if(m=l.match(/^!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)$/))return'<figure><img alt="" src="'+E(m[2])+'"><figcaption>'+E(m[1])+"</figcaption></figure>";if(l.startsWith("## "))return"<h2>"+inl(l.slice(3))+"</h2>";if(l.startsWith("### "))return"<h3>"+inl(l.slice(4))+"</h3>";if(l==="---")return"<hr>";if(l.startsWith("> "))return"<blockquote>"+inl(l.slice(2))+"</blockquote>";if(l.startsWith("!! "))return'<div class="tip">'+inl(l.slice(3))+"</div>";if(l.startsWith("- "))return"<ul><li>"+inl(l.slice(2))+"</li></ul>";return"<p>"+inl(l)+"</p>"}).join("")};
 const rtTa=()=>form.elements.namedItem("fr_body");
 const ins=(txt,sel)=>{const t=rtTa();if(!t)return;const a=t.selectionStart,b=t.selectionEnd;t.setRangeText(txt,a,b,"end");t.focus();t.dispatchEvent(new Event("input",{bubbles:true}))};
 content.querySelectorAll("[data-rt]").forEach(b=>b.onclick=()=>{const t=rtTa(),k=b.dataset.rt,sel=t.value.slice(t.selectionStart,t.selectionEnd);if(k==="**"){ins("**"+(sel||"texte en gras")+"**")}else if(k==="---"){ins("\n\n---\n\n")}else{const pre=t.selectionStart>0&&t.value[t.selectionStart-1]!=="\n"?"\n\n":"";ins(pre+k+(sel||(k==="> "?"Une citation marquante — Nom":k==="!! "?"Conseil pratique à retenir":k==="- "?"Premier point":"Votre titre"))+"\n\n")}});
 content.querySelectorAll("[data-rtimg]").forEach(inp=>inp.onchange=async()=>{const fs=[...inp.files];if(!fs.length)return;for(let i=0;i<fs.length;i++){fb.textContent="Envoi de l’image "+(i+1)+"/"+fs.length+"…";try{const bmp=await createImageBitmap(fs[i]),sc=Math.min(1,1600/Math.max(bmp.width,bmp.height)),cv=document.createElement("canvas");cv.width=Math.round(bmp.width*sc);cv.height=Math.round(bmp.height*sc);cv.getContext("2d").drawImage(bmp,0,0,cv.width,cv.height);const blob=await new Promise(r=>cv.toBlob(r,"image/jpeg",.86)),path="site/"+crypto.randomUUID()+".jpg",up=await supabase.storage.from("afa-public-media").upload(path,blob,{contentType:"image/jpeg"});if(up.error)throw up.error;const url=supabase.storage.from("afa-public-media").getPublicUrl(path).data.publicUrl,t=rtTa(),pre=t.selectionStart>0&&t.value[t.selectionStart-1]!=="\n"?"\n\n":"";ins(pre+"![Légende de l’image]("+url+")\n")}catch(e){fb.textContent="Échec : "+(e.message||"image non envoyée");return}}fb.textContent="Image(s) insérée(s). Remplacez « Légende de l’image » par votre texte.";inp.value=""});
 const pv=content.querySelector("[data-rtprev]");if(pv)pv.onclick=()=>{const box=content.querySelector(".rt-prev"),t=rtTa();box.hidden=!box.hidden;t.hidden=!box.hidden;pv.textContent=box.hidden?"Aperçu":"Modifier";if(!box.hidden)box.innerHTML=mdPrev(t.value)};
 content.querySelector("#sf-new").onclick=()=>{reset();open("Ajouter "+(K.art||"un ")+K.one)};
 content.querySelector("#sf-close").onclick=()=>{wrap.hidden=true};
 content.querySelector("#sf-reset").onclick=reset;
 content.querySelectorAll("[data-up]").forEach(inp=>inp.onchange=async()=>{const f=inp.files&&inp.files[0],m=content.querySelector('[data-upm="'+inp.dataset.up+'"]');if(!f)return;m.textContent="Envoi de la photo…";try{const bmp=await createImageBitmap(f),sc=Math.min(1,1400/Math.max(bmp.width,bmp.height)),cv=document.createElement("canvas");cv.width=Math.round(bmp.width*sc);cv.height=Math.round(bmp.height*sc);cv.getContext("2d").drawImage(bmp,0,0,cv.width,cv.height);const blob=await new Promise(r=>cv.toBlob(r,"image/jpeg",.86));const path="site/"+crypto.randomUUID()+".jpg";const up=await supabase.storage.from("afa-public-media").upload(path,blob,{contentType:"image/jpeg"});if(up.error)throw up.error;form.elements.namedItem(inp.dataset.up).value=supabase.storage.from("afa-public-media").getPublicUrl(path).data.publicUrl;showPrev(inp.dataset.up);m.textContent="Photo envoyée. Cliquez sur Enregistrer."}catch(e){m.textContent="Échec de l’envoi : "+(e.message||"essayez une autre photo.")}});
 content.querySelectorAll("[data-upmulti]").forEach(inp=>inp.onchange=async()=>{const fs=[...(inp.files||[])],m=content.querySelector('[data-upm="'+inp.dataset.upmulti+'"]'),ta=form.elements.namedItem(inp.dataset.upmulti);if(!fs.length)return;const added=[];try{for(let i=0;i<fs.length;i++){m.textContent="Envoi de la photo "+(i+1)+"/"+fs.length+"…";const bmp=await createImageBitmap(fs[i]),sc=Math.min(1,1400/Math.max(bmp.width,bmp.height)),cv=document.createElement("canvas");cv.width=Math.round(bmp.width*sc);cv.height=Math.round(bmp.height*sc);cv.getContext("2d").drawImage(bmp,0,0,cv.width,cv.height);const blob=await new Promise(r=>cv.toBlob(r,"image/jpeg",.86));const path="site/"+crypto.randomUUID()+".jpg";const up=await supabase.storage.from("afa-public-media").upload(path,blob,{contentType:"image/jpeg"});if(up.error)throw up.error;added.push(supabase.storage.from("afa-public-media").getPublicUrl(path).data.publicUrl)}ta.value=[ta.value.trim(),...added].filter(Boolean).join("\n");m.textContent=added.length+" photo(s) ajoutée(s). Cliquez sur Enregistrer."}catch(e){m.textContent="Échec de l’envoi : "+(e.message||"essayez une autre photo.")}finally{inp.value=""}});
content.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>{const r=rows.find(x=>x.id===b.dataset.edit);reset();form.elements.id.value=r.id;form.elements.sort.value=r.sort;form.elements.status.value=r.status;form.elements.show.checked=r.status==="published";K.fields.forEach(f=>{const a=form.elements.namedItem("fr_"+f.k),e=form.elements.namedItem("en_"+f.k);if(a)a.value=f.gal?(Array.isArray(r.fr.gallery)?r.fr.gallery:[]).join("\n"):(r.fr[f.k]??"");if(e)e.value=r.en?.[f.k]??"";if(a&&(f.k==="img"||f.k==="photo"))showPrev("fr_"+f.k)});const en=content.querySelector("#sf-en");if(en&&Object.keys(r.en||{}).length)en.open=true;open("Modifier : "+String(titleOf(r)).slice(0,60))});
 content.querySelectorAll("[data-toggle]").forEach(b=>b.onclick=async()=>{const r=rows.find(x=>x.id===b.dataset.toggle),to=r.status==="published"?"draft":"published";const {error}=await supabase.from("site_items").update({status:to}).eq("id",r.id);if(error){toast(error.message,1);return}toast(to==="published"?"Affiché sur le site":"Masqué : les visiteurs ne le voient plus");siteManager(content,supabase,kind,opt)});
 content.querySelectorAll("[data-del]").forEach(b=>b.onclick=async()=>{if(!confirm("Supprimer définitivement cet élément ? (Pour seulement le cacher, utilisez « Masquer ».)"))return;const {error}=await supabase.from("site_items").delete().eq("id",b.dataset.del);if(error){toast(error.message,1);return}toast("Supprimé");siteManager(content,supabase,kind,opt)});
 const trBtn=content.querySelector("#sf-tr");
 if(trBtn)trBtn.onclick=async()=>{
  const texts={};K.fields.filter(f=>f.tr).forEach(f=>{const v=val("fr",f);if(v)texts[f.k]=v});
  if(!Object.keys(texts).length){fb.textContent="Écrivez d’abord le texte en français.";return}
  fb.textContent="Traduction en cours…";
  try{
   const {data,error}=await supabase.functions.invoke("translate",{body:{texts,to:"en"}});
   if(error){let m=error.message;try{const j=await error.context.json();m=j.error||m}catch(e){}throw new Error(m)}
   const tr=data?.translations||{};Object.entries(tr).forEach(([k,v])=>{const el=form.elements.namedItem("en_"+k);if(el)el.value=v});
   fb.textContent="Traduction prête. Relisez-la puis enregistrez.";
  }catch(e){fb.textContent="Traduction impossible pour l’instant ("+(e.message||e)+"). Vous pouvez écrire l’anglais à la main ou laisser vide."}
 };
 if(opt.add){reset();open("Ajouter "+(K.art||"un ")+K.one)}
 form.onsubmit=async e=>{
  e.preventDefault();
  const fr={},en={};K.fields.forEach(f=>{if(f.gal){const g=val("fr",f).split(/\n/).map(x=>x.trim()).filter(x=>/^https?:\/\//.test(x));if(g.length)fr.gallery=g;return}let v=val("fr",f);if(f.num)v=v===""?0:Number(v);if(v!==""&&v!==undefined)fr[f.k]=v;if(f.tr){const t=val("en",f);if(t)en[f.k]=t}});
  const key=fr.title||fr.name||fr.text||fr.net,id=form.elements.id.value;
  const status=form.elements.show.checked?(form.elements.status.value==="draft"?"published":form.elements.status.value):"draft";
  const row={kind,fr,en,sort:+form.elements.sort.value||0,status};
  fb.textContent="Enregistrement…";
  let r;
  if(id)r=await supabase.from("site_items").update(row).eq("id",id);
  else r=await supabase.from("site_items").insert({...row,slug:slugify(key)});
  if(r.error){fb.textContent=r.error.message.includes("duplicate")?"Un élément porte déjà ce nom. Changez le titre.":r.error.message;return}
  toast(status==="published"?"Enregistré et affiché sur le site":"Enregistré (masqué sur le site)");
  siteManager(content,supabase,kind,opt);
 };
}

export async function renderPartners(content,supabase,st={}){
 st.f=st.f||"new";
 content.innerHTML="<h2>Demandes de partenariat</h2><p>Chargement…</p>";
 const {data:msgs,error}=await supabase.from("messages").select("*").order("created_at",{ascending:false}).limit(300);
 if(error){content.innerHTML="<p>"+esc(error.message)+"</p>";return}
 const all=msgs.filter(m=>/partenaire|partner/i.test((m.subject||"")+" "+(m.body||"").slice(0,80)));
 const S=m=>["approved","rejected","correction"].includes(m.status)?m.status:(m.status==="closed"?"approved":"new");
 const LBL={new:"À traiter",approved:"Approuvées",correction:"Corrections demandées",rejected:"Rejetées",all:"Toutes"};
 const cnt=k=>k==="all"?all.length:all.filter(m=>S(m)===k).length;
 const list=all.filter(m=>st.f==="all"||S(m)===st.f);
 const phoneOf=m=>{const x=String(m.body||"").match(/\+?\d[\d\s().-]{7,}\d/);return x?x[0].replace(/\D/g,""):""};
 const parse=m=>{const subj=String(m.subject||"");const mt=subj.match(/\(([a-z]+)\)\s*:\s*(.+)$/i);const blocks=String(m.body||"").split(/\n\s*\n/).map(b=>{const i=b.indexOf("\n");return i<0?[b.trim(),""]:[b.slice(0,i).trim(),b.slice(i+1).trim()]});const g=re=>{const x=blocks.find(b=>re.test(b[0]));return x?x[1]:""};
  const desc=g(/pr[ée]sent|descri|activit|services?/i);return {ptype:(mt&&mt[1])||"other",name:(mt&&mt[2])||m.full_name||"Partenaire",city:g(/ville|lieu|localisation|adresse|quartier/i),description:desc||""}};
 content.innerHTML='<div class="ad-head"><div><h2>Demandes de partenariat</h2><p class="ad-intro">Approuvez, rejetez, demandez des corrections ou supprimez. Une demande approuvée crée la fiche publique que vous pouvez ensuite compléter dans « Fiches publiées ».</p></div></div>'
 +'<div class="sx-bar">'+Object.keys(LBL).map(k=>'<button type="button" class="sx-btn'+(st.f===k?' pri':'')+'" data-f="'+k+'">'+LBL[k]+' ('+cnt(k)+')</button>').join("")+'<button type="button" class="sx-btn" id="pgo">Fiches publiées</button></div>'
 +(list.length?list.map(m=>{const s=S(m);return '<article class="sx-row" data-id="'+m.id+'"><div class="t">'+esc(m.full_name||"")+" · "+esc(m.email||"")+'</div><small>'+new Date(m.created_at).toLocaleString("fr-FR")+" · <b>"+LBL[s]+'</b></small><pre class="sx-pre">'+esc(m.body)+'</pre><div class="sx-act"><button class="sx-btn pri" data-a="ok" type="button">Approuver et publier</button><button class="sx-btn" data-a="fix" type="button">Demander des corrections</button><button class="sx-btn" data-a="no" type="button">Rejeter</button><button class="sx-btn dg" data-a="del" type="button">Supprimer</button></div><div class="fixbox" hidden></div></article>'}).join(""):"<p>Aucune demande dans cette catégorie.</p>");
 content.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{st.f=b.dataset.f;renderPartners(content,supabase,st)});
 content.querySelector("#pgo").onclick=()=>renderSiteManager(content,supabase,"partner");
 const setSt=async(id,status)=>{const r=await supabase.from("messages").update({status}).eq("id",id);if(r.error){toast(r.error.message,1);return false}return true};
 content.querySelectorAll(".sx-row").forEach(row=>{const id=row.dataset.id,m=msgs.find(x=>x.id===id);
  row.querySelector('[data-a=ok]').onclick=async()=>{const p=parse(m);const slug=slugify(p.name)+"-"+Date.now().toString(36).slice(-3);const fr={name:p.name,ptype:p.ptype,city:p.city,description:p.description||"Partenaire AFA Tours."};
   const r=await supabase.from("site_items").insert({kind:"partner",slug,sort:99,status:"published",fr,en:{}});if(r.error){toast(r.error.message,1);return}
   await setSt(id,"approved");toast("Partenaire approuvé et publié sur le site");renderPartners(content,supabase,st)};
  row.querySelector('[data-a=no]').onclick=async()=>{if(await setSt(id,"rejected")){toast("Demande rejetée");renderPartners(content,supabase,st)}};
  row.querySelector('[data-a=del]').onclick=function(){const b=this;if(b.dataset.arm){supabase.from("messages").delete().eq("id",id).then(r=>{if(r.error)toast(r.error.message,1);else{toast("Demande supprimée");renderPartners(content,supabase,st)}});return}b.dataset.arm=1;b.textContent="Confirmer la suppression";setTimeout(()=>{b.dataset.arm="";b.textContent="Supprimer"},4000)};
  row.querySelector('[data-a=fix]').onclick=()=>{const bx=row.querySelector(".fixbox");bx.hidden=!bx.hidden;if(bx.hidden)return;const nm=m.full_name||"";const txt="Bonjour "+nm+",\n\nMerci pour votre demande de partenariat avec AFA Tours. Avant de publier votre fiche, pouvez-vous nous préciser ou corriger les points suivants :\n- \n- \n\nMerci d’avance.\nAFA Tours · +229 01 97 16 56 46";bx.innerHTML='<textarea class="sx-in" rows="7" style="width:100%;margin-top:10px">'+esc(txt)+'</textarea><div class="sx-act"><button class="sx-btn pri" data-s="mail" type="button">Envoyer par e-mail</button><button class="sx-btn" data-s="wa" type="button">Envoyer par WhatsApp</button></div>';
   const ta=bx.querySelector("textarea"),ph=phoneOf(m);
   bx.querySelector('[data-s=mail]').onclick=async()=>{await setSt(id,"correction");location.href="mailto:"+encodeURIComponent(m.email||"")+"?subject="+encodeURIComponent("Votre demande de partenariat — AFA Tours")+"&body="+encodeURIComponent(ta.value)};
   const w=bx.querySelector('[data-s=wa]');if(!ph)w.disabled=true,w.title="Aucun numéro trouvé dans la demande";
   w.onclick=async()=>{await setSt(id,"correction");window.open("https://wa.me/"+ph+"?text="+encodeURIComponent(ta.value),"_blank")}}
 });
}

export const renderStats=(content,supabase,st={})=>keep(content,()=>stats(content,supabase,st));
async function stats(content,supabase,st){
 st.p=st.p||"all";
 content.innerHTML="<h2>Statistiques</h2><p>Chargement…</p>";
 const [bk,it,vi]=await Promise.all([supabase.from("bookings").select("nationality,tour_name,status,party_size,created_at"),supabase.from("site_items").select("kind,slug,status,fr").in("kind",["circuit","sejour","event","transport"]).order("sort"),supabase.from("visits").select("visit_date,tour,pax,income_xof,expenses_xof")]);
 if(bk.error){content.innerHTML="<p>"+esc(bk.error.message)+"</p>";return}
 const now=new Date(),y=now.getFullYear(),pad=n=>String(n).padStart(2,"0"),iso=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
 let from="0000",to="9999-99",lab="Depuis le début";
 if(st.p==="year"){from=y+"-01-01";to=y+"-12-31";lab="Année "+y}
 if(st.p==="month"){from=y+"-"+pad(now.getMonth()+1)+"-01";to=y+"-"+pad(now.getMonth()+1)+"-31";lab="Mois en cours"}
 if(st.p==="week"){const d=(now.getDay()+6)%7,s0=new Date(now);s0.setDate(now.getDate()-d);const e0=new Date(s0);e0.setDate(s0.getDate()+6);from=iso(s0);to=iso(e0);lab="Semaine en cours"}
 const inR=d=>{const x=String(d||"").slice(0,10);return x>=from&&x<=to};
 const B=bk.data.filter(r=>inR(r.created_at)),V=(vi.data||[]).filter(r=>inR(r.visit_date)),items=it.data||[];
 const norm=v=>String(v||"").toLowerCase();
 const money=n=>Math.round(n||0).toLocaleString("fr-FR")+" FCFA";
 const count=(arr,fn)=>{const m={};arr.forEach(r=>{const k=fn(r)||"Non précisé";m[k]=(m[k]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1])};
 const bars=e=>{const mx=Math.max(1,...e.map(x=>x[1]));return e.length?e.slice(0,15).map(([k,v])=>'<div class="st-b"><span class="sx-lb">'+esc(k)+'</span><span class="st-bar" style="width:'+Math.round(v/mx*100)+'%"></span><b>'+v+"</b></div>").join(""):"<p>Pas encore de données.</p>"};
 const names=r=>norm(r.fr.title||r.fr.name);
 const rowFor=(r)=>{const n=names(r),key=norm(String(r.fr.title||r.fr.name).replace(/\s*\d{4}\s*$/,""));const bb=B.filter(x=>key&&norm(x.tour_name).includes(key)),vv=V.filter(x=>key&&norm(x.tour).includes(key));return {n:r.fr.title||r.fr.name,on:r.status==="published",d:bb.length,p:bb.reduce((s,x)=>s+(x.party_size||0),0),c:bb.filter(x=>x.status==="confirmed"||x.status==="completed").length,v:vv.length,vp:vv.reduce((s,x)=>s+(x.pax||0),0),inc:vv.reduce((s,x)=>s+Number(x.income_xof||0)-Number(x.expenses_xof||0),0)}};
 const G=[["circuit","Circuits et excursions"],["sejour","Séjours"],["event","Événements et festivals"],["transport","Offres de transport"]];
 const tabs=G.map(([k,l])=>{const rs=items.filter(i=>i.kind===k).map(rowFor).sort((a,b)=>b.d-a.d||b.v-a.v);return {l,rs}});
 const tbl=({l,rs})=>'<h3 class="sx-h">'+l+'</h3>'+(rs.length?'<div class="st-w"><table class="admin-table st-t"><thead><tr><th>Nom</th><th>Demandes</th><th>Nombre de personnes</th><th>Confirmées</th><th>Visites</th><th>Résultat visites</th></tr></thead><tbody>'+rs.map(r=>"<tr"+(r.d+r.v===0?' class="st-z"':"")+"><td><b>"+esc(r.n)+"</b>"+(r.on?"":' <small>(masqué)</small>')+(r.d+r.v===0?"<br><small>Jamais réservé ni visité</small>":"")+"</td><td>"+r.d+"</td><td>"+r.p+"</td><td>"+r.c+"</td><td>"+r.v+" ("+r.vp+" pers.)</td><td>"+money(r.inc)+"</td></tr>").join("")+"</tbody></table></div>":"<p>Rien d’enregistré.</p>");
 const people=B.reduce((s,r)=>s+(r.party_size||0),0),SL={new:"Nouvelles",contacted:"Contactées",quoted:"Devis envoyés",confirmed:"Confirmées",cancelled:"Annulées",completed:"Terminées"};
 const P=[["week","Semaine"],["month","Mois"],["year","Année"],["all","Tout"]];
 const html='<div class="ad-head"><div><h2>Statistiques</h2><p class="ad-intro">Chaque circuit, séjour, événement et offre de transport figure ici, même s’il n’a jamais été réservé.</p></div><button class="sx-btn pri big" type="button" id="st-pdf">Télécharger en PDF</button></div><div class="vs-per">'+P.map(x=>'<button type="button" data-p="'+x[0]+'" class="'+(st.p===x[0]?"on":"")+'">'+x[1]+"</button>").join("")+'</div><p class="vs-lab"><b>'+lab+'</b></p><div class="booking-stats"><div><span>Demandes</span><strong>'+B.length+"</strong></div><div><span>Nombre de personnes</span><strong>"+people+"</strong></div><div><span>Confirmées</span><strong>"+B.filter(r=>r.status==="confirmed"||r.status==="completed").length+"</strong></div><div><span>Visites notées</span><strong>"+V.length+"</strong></div></div>"+tabs.map(tbl).join("")+"<h3 class='sx-h'>Par nationalité</h3>"+bars(count(B,r=>r.nationality))+"<h3 class='sx-h'>Par mois</h3>"+bars(count(B,r=>(r.created_at||"").slice(0,7)).sort((a,b)=>a[0]<b[0]?1:-1))+"<h3 class='sx-h'>Par statut</h3>"+bars(count(B,r=>SL[r.status]||r.status));
 content.innerHTML=html;
 content.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>stats(content,supabase,{p:b.dataset.p}));
 content.querySelector("#st-pdf").onclick=async()=>{const bt=content.querySelector("#st-pdf");bt.disabled=true;try{await (await import("./afa-pdf-loader.js")).pdf();const bl=[{t:"stats",v:[["Demandes",String(B.length)],["Nombre de personnes",String(people)],["Confirmées",String(B.filter(r=>r.status==="confirmed"||r.status==="completed").length)],["Visites notées",String(V.length)]]}];tabs.forEach(x=>{bl.push({t:"h",v:x.l});bl.push(x.rs.length?{t:"table",head:["Nom","Demandes","Nombre de personnes","Confirmées","Visites","Résultat visites"],w:[3,1,1,1,1.2,1.6],rows:x.rs.map(r=>[r.n+(r.on?"":" (masqué)"),String(r.d),String(r.p),String(r.c),r.v+" ("+r.vp+" pers.)",money(r.inc)])}:{t:"p",v:"Rien d’enregistré."})});await window.AFAPDF.make({title:"Statistiques AFA TOURS",subtitle:lab+" · édité le "+now.toLocaleDateString("fr-FR"),file:"statistiques-afa-tours",blocks:bl})}catch(e){toast(e.message,1)}bt.disabled=false};

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

export async function renderTeamAdmin(content,supabase){
 const call=async body=>{const {data,error}=await supabase.functions.invoke("manage-team",{body});if(error){let m=error.message;try{m=(await error.context.json()).error||m}catch(e){}throw new Error(m)}return data};
 content.innerHTML="<h2>Comptes administrateurs</h2><p>Chargement…</p>";
 let members=[];
 try{members=(await call({action:"list"})).members||[]}catch(e){content.innerHTML="<h2>Comptes administrateurs</h2><p>"+esc(e.message)+"</p>";return}
 const RL={owner:"Propriétaire",admin:"Administrateur",editor:"Éditeur"};
 content.innerHTML='<h2>Comptes administrateurs</h2><p>Invitez une personne par e-mail. Elle reçoit un lien pour choisir son mot de passe, puis active la double vérification à sa première connexion.</p>'+members.map(m=>'<article class="sx-row"><div style="flex:1;min-width:200px"><strong>'+esc(m.email)+'</strong><br><small>'+esc(RL[m.role]||m.role)+'</small></div>'+(m.role==="owner"?"":'<button class="sx-btn dg" data-rm="'+m.user_id+'" type="button">Retirer l’accès</button>')+"</article>").join("")+'<section class="sx-form"><h3 class="sx-h">Inviter un administrateur</h3><form id="tf"><label>E-mail<input name="email" type="email" required></label><label>Rôle<select name="role"><option value="admin">Administrateur (tout gérer)</option><option value="editor">Éditeur (contenu)</option></select></label><div class="sx-bar"><button class="sx-btn pri" type="submit">Envoyer l’invitation</button></div><p class="sx-msg" id="tm" aria-live="polite"></p></form></section>';
 const tm=content.querySelector("#tm");
 content.querySelector("#tf").onsubmit=async e=>{e.preventDefault();const f=e.target;tm.textContent="Envoi…";try{await call({action:"invite",email:f.email.value,role:f.role.value});renderTeamAdmin(content,supabase)}catch(er){tm.textContent=er.message}};
 content.querySelectorAll("[data-rm]").forEach(b=>b.onclick=async()=>{if(!confirm("Retirer l’accès de ce compte ?"))return;try{await call({action:"remove",user_id:b.dataset.rm});renderTeamAdmin(content,supabase)}catch(er){alert(er.message)}});
}
