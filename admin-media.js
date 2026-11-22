// Photos et vidéos : envoi multiple, albums, déplacement, ordre, validation des envois des visiteurs
import {keep,toast} from "./admin-site.js";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const BUCKET="afa-public-media";
const pubPath=u=>{try{const m="/storage/v1/object/public/"+BUCKET+"/",p=new URL(u).pathname,i=p.indexOf(m);return i<0?null:decodeURIComponent(p.slice(i+m.length))}catch{return null}};
async function shrink(file){
 if(!file.type.startsWith("image/")||file.type==="image/gif")return file;
 try{const bmp=await createImageBitmap(file),sc=Math.min(1,1800/Math.max(bmp.width,bmp.height));if(sc===1&&file.size<1.5e6)return file;const cv=document.createElement("canvas");cv.width=Math.round(bmp.width*sc);cv.height=Math.round(bmp.height*sc);cv.getContext("2d").drawImage(bmp,0,0,cv.width,cv.height);const b=await new Promise(r=>cv.toBlob(r,"image/jpeg",.86));return b||file}catch(e){return file}
}
export const renderMedia=(content,supabase)=>keep(content,()=>media(content,supabase));
async function media(content,supabase){
 content.innerHTML="<h2>Photos et vidéos</h2><p>Chargement…</p>";
 const [pm,sub,ci]=await Promise.all([supabase.from("public_media").select("*").order("sort").order("published_at",{ascending:false}).limit(1000),supabase.from("media_submissions").select("*").eq("status","pending").order("created_at",{ascending:false}),supabase.from("site_items").select("fr").eq("kind","circuit")]);
 if(pm.error){content.innerHTML="<h2>Photos et vidéos</h2><p>"+esc(pm.error.message)+"</p>";return}
 const items=pm.data||[],pending=sub.data||[];
 const dests=[...new Set((ci.data||[]).map(r=>r.fr.destination).filter(Boolean))];
 const albums=[...new Set(["Vodun Days",...dests,"Équipe","Partenaires","Autres",...items.map(i=>i.album).filter(Boolean)])];
 const opt=(sel)=>albums.map(a=>'<option'+(a===sel?" selected":"")+">"+esc(a)+"</option>").join("");
 const by={};items.forEach(i=>{const a=i.album||"Autres";(by[a]=by[a]||[]).push(i)});
 const names=Object.keys(by).sort((a,b)=>a==="Autres"?1:b==="Autres"?-1:a.localeCompare(b,"fr"));
 const tile=(i)=>'<figure class="am-t" data-id="'+i.id+'"><label class="am-ck"><input type="checkbox" data-pick="'+i.id+'" aria-label="Sélectionner"></label>'+(i.media_type==="video"?'<video src="'+esc(i.public_url)+'#t=0.1" preload="metadata" muted playsinline></video><span class="am-pl">▶</span>':'<img loading="lazy" alt="" src="'+esc(i.public_url)+'">')+'<figcaption><input data-cap="'+i.id+'" value="'+esc(i.caption||i.display_name||"")+'" placeholder="Légende" aria-label="Légende"></figcaption><div class="am-a"><button type="button" class="sx-btn" data-mv="-1:'+i.id+'" aria-label="Avancer">←</button><button type="button" class="sx-btn" data-mv="1:'+i.id+'" aria-label="Reculer">→</button><button type="button" class="sx-btn dg" data-del="'+i.id+'" aria-label="Supprimer">🗑</button></div></figure>';
 content.innerHTML='<div class="ad-head"><div><h2>Photos et vidéos <small>('+items.length+')</small></h2><p class="ad-intro">Ajoutez plusieurs fichiers d’un coup, choisissez l’album, et c’est en ligne. Sur le site, les photos sont rangées automatiquement par album (destination, thème…). Vous pouvez les déplacer d’un album à un autre.</p></div><button class="sx-btn pri big" type="button" id="am-new">+ Ajouter des photos ou vidéos</button></div>'+
 '<section class="sx-form" id="am-up" hidden><div class="ad-fh"><h3 class="sx-h">Ajouter plusieurs fichiers</h3><button type="button" class="sx-btn" id="am-x">Fermer</button></div><div class="ad-grid"><label class="wide">Fichiers (photos et/ou vidéos, plusieurs possibles)<input id="am-f" type="file" accept="image/*,video/*" multiple><small class="ad-h">Astuce : sur téléphone ou ordinateur, sélectionnez toutes les photos d’un coup.</small></label><label>Album<select id="am-al">'+opt("Autres")+'<option value="__new">+ Nouvel album…</option></select></label><label id="am-nw" hidden>Nom du nouvel album<input id="am-nn" placeholder="Ex. Ganvié 2026"></label><label class="wide">Légende commune (facultatif)<input id="am-cp" placeholder="Ex. Pirogue sur le lac Nokoué"></label></div><div id="am-pv" class="am-pv"></div><div class="am-pg" id="am-pg" hidden><span></span></div><p class="sx-msg" id="am-m" aria-live="polite"></p><div class="sx-bar"><button class="sx-btn pri big" type="button" id="am-go" disabled>Mettre en ligne</button></div></section>'+
 (pending.length?'<h3 class="sx-h">À valider ('+pending.length+')</h3><p class="ad-intro">Photos envoyées par des visiteurs. Rien n’est visible tant que vous ne publiez pas.</p><div class="am-g" id="am-pd">'+pending.map(r=>'<figure class="am-t am-p" data-sid="'+r.id+'"><div class="am-ph" data-ph="'+r.id+'">Chargement…</div><figcaption><b>'+esc(r.display_name||"Visiteur")+'</b><small>'+esc(r.caption||"")+'</small><small>Publication autorisée : '+(r.consent_publication?"oui":"non")+'</small></figcaption><div class="am-a"><select data-sa="'+r.id+'" aria-label="Album">'+opt("Autres")+'</select><button type="button" class="sx-btn pri" data-ok="'+r.id+'">Publier</button><button type="button" class="sx-btn dg" data-no="'+r.id+'">Supprimer</button></div></figure>').join("")+"</div>":"")+
 '<div class="bk-bar am-bulk" id="am-bar" hidden><span class="bk-n" data-n>0 sélectionné</span><select id="am-mvs" aria-label="Déplacer vers">'+opt("Autres")+'</select><button type="button" class="sx-btn" id="am-mv">Déplacer vers cet album</button><button type="button" class="sx-btn dg" id="am-bd">Supprimer</button></div>'+
 (names.length?names.map(n=>'<section class="am-al" data-album="'+esc(n)+'"><div class="am-ah"><h3 class="sx-h">'+esc(n)+' <small>('+by[n].length+')</small></h3><div><button type="button" class="sx-btn" data-ren="'+esc(n)+'">Renommer l’album</button></div></div><div class="am-g">'+by[n].map(tile).join("")+"</div></section>").join(""):'<div class="ad-empty"><b>Aucune photo ni vidéo en ligne.</b><p>Cliquez sur « + Ajouter des photos ou vidéos ».</p></div>');
 const $=s=>content.querySelector(s),up=$("#am-up");let files=[];
 $("#am-new").onclick=()=>{up.hidden=false;up.scrollIntoView({behavior:"smooth"})};$("#am-x").onclick=()=>{up.hidden=true};
 $("#am-al").onchange=e=>{$("#am-nw").hidden=e.target.value!=="__new"};
 $("#am-f").onchange=e=>{files=[...e.target.files];$("#am-go").disabled=!files.length;$("#am-pv").innerHTML=files.slice(0,40).map(f=>f.type.startsWith("image/")?'<img alt="" src="'+URL.createObjectURL(f)+'">':'<span class="am-vid">🎞 '+esc(f.name.slice(0,18))+"</span>").join("")+(files.length>40?"<span>+"+(files.length-40)+"</span>":"");$("#am-m").textContent=files.length+" fichier"+(files.length>1?"s":"")+" prêt"+(files.length>1?"s":"")+"."};
 $("#am-go").onclick=async()=>{
  let album=$("#am-al").value;if(album==="__new")album=$("#am-nn").value.trim();if(!album){$("#am-m").textContent="Donnez un nom à l’album.";return}
  const cap=$("#am-cp").value.trim(),pg=$("#am-pg");pg.hidden=false;$("#am-go").disabled=true;let ok=0,bad=0;const base=Date.now();
  for(let i=0;i<files.length;i++){
   const f=files[i];$("#am-m").textContent="Envoi "+(i+1)+" sur "+files.length+"…";pg.firstElementChild.style.width=Math.round(i/files.length*100)+"%";
   try{
    const isV=f.type.startsWith("video/"),blob=isV?f:await shrink(f),ext=isV?(f.name.split(".").pop()||"mp4").toLowerCase().replace(/[^a-z0-9]/g,""):"jpg",path="gallery/"+crypto.randomUUID()+"."+ext;
    const u=await supabase.storage.from(BUCKET).upload(path,blob,{contentType:isV?f.type:(blob.type||"image/jpeg")});if(u.error)throw u.error;
    const url=supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    const r=await supabase.from("public_media").insert({display_name:cap||f.name.replace(/\.[^.]+$/,"").slice(0,80),caption:cap,media_type:isV?"video":"image",public_url:url,album,sort:i});if(r.error)throw r.error;ok++
   }catch(e){bad++;console.warn(e)}
  }
  pg.firstElementChild.style.width="100%";toast(ok+" fichier"+(ok>1?"s":"")+" en ligne"+(bad?" · "+bad+" échec"+(bad>1?"s":""):""),bad&&!ok);media(content,supabase)};
 // aperçus des envois en attente
 pending.forEach(async r=>{let url="";if(String(r.object_path).startsWith("visitor/"))url=supabase.storage.from(BUCKET).getPublicUrl(r.object_path).data.publicUrl;else{const {data}=await supabase.storage.from("afa-submissions").createSignedUrl(r.object_path,3600);url=data?.signedUrl||""}const el=content.querySelector('[data-ph="'+r.id+'"]');if(el)el.innerHTML=url?(r.media_type==="video"?'<video controls playsinline preload="metadata" src="'+esc(url)+'"></video>':'<img alt="" src="'+esc(url)+'">'):"Aperçu indisponible"});
 content.querySelectorAll("[data-ok]").forEach(b=>b.onclick=async()=>{
  const r=pending.find(x=>x.id===b.dataset.ok),album=content.querySelector('[data-sa="'+r.id+'"]').value;
  if(!r.consent_publication&&!confirm("Ce visiteur n’a pas coché l’autorisation de publication. Publier quand même ?"))return;
  b.disabled=true;toast("Publication…");
  try{let path=r.object_path;if(!path.startsWith("visitor/")){const {data:file,error:dl}=await supabase.storage.from("afa-submissions").download(path);if(dl)throw dl;path="visitor/"+r.id+"."+(r.object_path.split(".").pop()||"jpg");const {error:up2}=await supabase.storage.from(BUCKET).upload(path,file,{upsert:true,contentType:file.type||undefined});if(up2)throw up2}
   const url=supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;const ins=await supabase.from("public_media").insert({source_submission_id:r.id,display_name:r.display_name||"Visiteur",caption:r.caption||"",media_type:r.media_type,public_url:url,album});if(ins.error)throw ins.error;
   const u=await supabase.from("media_submissions").update({status:"approved"}).eq("id",r.id);if(u.error)throw u.error;toast("Publié dans l’album « "+album+" »");media(content,supabase)}catch(e){toast(e.message||"Échec",1);b.disabled=false}});
 content.querySelectorAll("[data-no]").forEach(b=>b.onclick=async()=>{if(!confirm("Supprimer cet envoi ?"))return;const r=pending.find(x=>x.id===b.dataset.no);const e1=await supabase.from("media_submissions").delete().eq("id",r.id);if(e1.error){toast(e1.error.message,1);return}if(r.object_path)await supabase.storage.from(String(r.object_path).startsWith("visitor/")?BUCKET:"afa-submissions").remove([r.object_path]);toast("Supprimé");media(content,supabase)});
 // légende
 content.querySelectorAll("[data-cap]").forEach(i=>i.onchange=async()=>{const {error}=await supabase.from("public_media").update({caption:i.value.trim(),display_name:i.value.trim()||"Photo"}).eq("id",i.dataset.cap);toast(error?error.message:"Légende enregistrée",!!error)});
 // supprimer une photo
 const rmFiles=async(rows)=>{const ps=rows.map(r=>pubPath(r.public_url)).filter(Boolean);if(ps.length)await supabase.storage.from(BUCKET).remove(ps)};
 content.querySelectorAll("[data-del]").forEach(b=>b.onclick=async()=>{if(!confirm("Supprimer cette photo ou vidéo ?"))return;const r=items.find(x=>x.id===b.dataset.del);const {error}=await supabase.from("public_media").delete().eq("id",r.id);if(error){toast(error.message,1);return}await rmFiles([r]);toast("Supprimé");media(content,supabase)});
 // ordre
 content.querySelectorAll("[data-mv]").forEach(b=>b.onclick=async()=>{const [d,id]=b.dataset.mv.split(":"),it=items.find(x=>x.id===id),alb=(it.album||"Autres"),list=by[alb],k=list.findIndex(x=>x.id===id),j=k+(+d);if(j<0||j>=list.length)return;const ord=list.map(x=>x.id);[ord[k],ord[j]]=[ord[j],ord[k]];const res=await Promise.all(ord.map((x,n)=>supabase.from("public_media").update({sort:n}).eq("id",x)));const er=res.find(r=>r.error);if(er){toast(er.error.message,1);return}media(content,supabase)});
 // renommer album
 content.querySelectorAll("[data-ren]").forEach(b=>b.onclick=async()=>{const old=b.dataset.ren,n=prompt("Nouveau nom de l’album",old);if(!n||n.trim()===old)return;const {error}=await supabase.from("public_media").update({album:n.trim()}).eq("album",old==="Autres"?"":old);if(error){toast(error.message,1);return}toast("Album renommé");media(content,supabase)});
 // sélection multiple
 const bar=$("#am-bar");const upd=()=>{const n=content.querySelectorAll("[data-pick]:checked").length;bar.hidden=!n;bar.querySelector("[data-n]").textContent=n+" sélectionné"+(n>1?"s":"")};
 content.addEventListener("change",e=>{if(e.target.matches("[data-pick]"))upd()});
 const picked=()=>[...content.querySelectorAll("[data-pick]:checked")].map(c=>c.dataset.pick);
 $("#am-mv").onclick=async()=>{const ids=picked(),a=$("#am-mvs").value;const {error}=await supabase.from("public_media").update({album:a}).in("id",ids);if(error){toast(error.message,1);return}toast(ids.length+" déplacé"+(ids.length>1?"s":"")+" vers « "+a+" »");media(content,supabase)};
 $("#am-bd").onclick=async()=>{const ids=picked();if(!confirm("Supprimer "+ids.length+" élément(s) ?"))return;const rows=items.filter(x=>ids.includes(x.id));const {error}=await supabase.from("public_media").delete().in("id",ids);if(error){toast(error.message,1);return}await rmFiles(rows);toast("Supprimé");media(content,supabase)};
}
