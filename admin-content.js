import { supabase } from "./backend.js";
const TYPES=[["tour","Circuit"],["excursion","Excursion"],["experience","Expérience"],["festival","Festival"],["event","Événement"]];
const STATES=[["draft","Brouillon"],["published","Publié"],["archived","Archivé"]];
const safeHttpUrl=(value,label)=>{if(!value)return null;let url;try{url=new URL(value);}catch{throw new Error(label+" : URL invalide.");}if(!["https:","http:"].includes(url.protocol))throw new Error(label+" : utilisez une adresse HTTPS ou HTTP.");return url.href;};
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const opts=(a,s)=>a.map(x=>'<option value="'+x[0]+'" '+(x[0]===s?'selected':'')+'>'+x[1]+'</option>').join("");
export async function renderContentManager(root){
 const loaded=await supabase.from("tours").select("*").order("updated_at",{ascending:false}).limit(500);
 if(loaded.error){root.innerHTML="<h2>Catalogue complet</h2><p>"+esc(loaded.error.message)+"</p>";return;}
 const rows=loaded.data||[];
 root.innerHTML='<h2>Catalogue complet AFA TOURS</h2><p>Ajoutez, modifiez, publiez, archivez ou supprimez vos circuits, excursions, expériences, festivals et événements sans coder.</p>'+
 '<div class="admin-tabs" id="catalogTabs">'+TYPES.map((t,i)=>'<button type="button" data-kind="'+t[0]+'" class="'+(i===0?'active':'')+'">'+t[1]+'</button>').join("")+'<button type="button" data-kind="all">Tout</button></div>'+
 '<div class="admin-panel"><h3 id="editorTitle">Ajouter un contenu</h3><form id="catalogForm" class="admin-grid">'+
 '<input type="hidden" name="id">'+
 '<label>Type<select name="content_type">'+opts(TYPES,"tour")+'</select></label>'+
 '<label>Titre<input name="title" required maxlength="180"></label>'+
 '<label>Slug URL<input name="slug" required pattern="[a-z0-9-]+"></label>'+
 '<label>Pays<input name="country" value="Bénin" required></label>'+
 '<label>Ville / destination<input name="city"></label>'+
 '<label>Lieu / zone<input name="location" value="Bénin"></label>'+
 '<label>Durée<input name="duration"></label>'+
 '<label>Prix à partir de<input name="price_from" type="number" min="0" step="0.01"></label>'+
 '<label>Devise<select name="currency">'+["XOF","EUR","USD","GBP","NGN","GHS"].map(c=>'<option>'+c+'</option>').join("")+'</select></label>'+
 '<label>Prix billet / participation<input name="ticket_price" type="number" min="0" step="0.01"></label>'+
 '<label>Date de début<input name="event_start_date" type="date"></label>'+
 '<label>Date de fin<input name="event_end_date" type="date"></label>'+
 '<label>Capacité<input name="max_capacity" type="number" min="0"></label>'+
 '<label>Organisateur<input name="organizer"></label>'+
 '<label>Point de rencontre<input name="meeting_point"></label>'+
 '<label>Image couverture (URL)<input name="cover_image" type="url"></label>'+ 
 '<label>Galerie photos (URLs, une par ligne)<textarea name="gallery_urls" rows="3" placeholder="https://..."></textarea></label>'+\n '<label class="catalog-wide">Importer des photos ou vidéos (50 Mo maximum par fichier)<input name="media_files" type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" multiple></label>'+\n '<label class="catalog-wide"><input name="media_rights_confirmed" type="checkbox"> Je confirme que AFA TOURS dispose des droits ou autorisations nécessaires pour publier ces fichiers.</label>'+ 
 '<label>Vidéo YouTube ou Vimeo (URL)<input name="video_url" type="url" placeholder="https://www.youtube.com/watch?v=..."></label>'+ 
 '<label class="catalog-wide">Formules et prix (JSON)<textarea name="pricing_options_text" rows="5" placeholder="Exemple de formule JSON"></textarea><small>Chaque formule : name, duration, price, currency, description. Laissez vide si sans formules.</small></label>'+
 '<label>Réservation<select name="booking_mode"><option value="request">Demande à AFA</option><option value="external">Lien externe</option><option value="information">Information seulement</option></select></label>'+
 '<label>Lien d’inscription<input name="registration_url" type="url"></label>'+
 '<label>WhatsApp contact<input name="contact_whatsapp"></label>'+
 '<label>Statut<select name="status">'+opts(STATES,"draft")+'</select></label>'+
 '<label>Ordre affichage<input name="sort_order" type="number" value="0"></label>'+
 '<label class="catalog-wide">Résumé<textarea name="summary" required maxlength="500"></textarea></label>'+
 '<label class="catalog-wide">Description complète<textarea name="description" rows="4"></textarea></label>'+
 '<label class="catalog-wide">Programme / itinéraire<textarea name="itinerary" rows="4"></textarea></label>'+
 '<label class="catalog-wide">Inclus<textarea name="inclusions" rows="2"></textarea></label>'+
 '<label class="catalog-wide">Non inclus<textarea name="exclusions" rows="2"></textarea></label>'+
 '<label>Langues (fr,en)<input name="languages" value="fr,en"></label>'+
 '<label><input name="featured" type="checkbox"> Mettre en avant</label>'+
 '<label>Titre SEO<input name="seo_title"></label>'+
 '<label class="catalog-wide">Description SEO<textarea name="seo_description" rows="2"></textarea></label>'+
 '<div class="catalog-wide"><button class="button" type="submit">Enregistrer</button> <button class="button" type="button" id="catalogReset">Nouveau / Réinitialiser</button> <span id="catalogFeedback" aria-live="polite"></span></div></form></div>'+
 '<div class="admin-panel"><h3>Contenus enregistrés</h3><label>Recherche<input id="catalogSearch" placeholder="Titre, destination, pays..."></label><div id="catalogRows"></div></div>';
 const form=root.querySelector("#catalogForm"),feedback=root.querySelector("#catalogFeedback"),list=root.querySelector("#catalogRows"),search=root.querySelector("#catalogSearch");
 let kind="tour";
 function reset(){form.reset();form.elements.id.value="";form.elements.country.value="Bénin";form.elements.location.value="Bénin";form.elements.currency.value="XOF";form.elements.languages.value="fr,en";form.elements.status.value="draft";form.elements.booking_mode.value="request";form.elements.sort_order.value="0";root.querySelector("#editorTitle").textContent="Ajouter un contenu";feedback.textContent="";}
 function draw(){const q=search.value.toLowerCase().trim();const visible=rows.filter(r=>(kind==="all"||(r.content_type||"tour")===kind)&&(!q||[r.title,r.country,r.city,r.location,r.slug].some(v=>String(v||"").toLowerCase().includes(q))));
 list.innerHTML=visible.length?'<div style="overflow:auto"><table class="admin-table"><thead><tr><th>Type</th><th>Titre</th><th>Destination</th><th>Dates</th><th>Statut</th><th>Actions</th></tr></thead><tbody>'+visible.map(r=>'<tr><td>'+esc((TYPES.find(t=>t[0]===(r.content_type||"tour"))||[])[1]||r.content_type)+'</td><td><b>'+esc(r.title)+'</b><br><small>'+esc(r.slug)+'</small></td><td>'+esc(r.city||r.location)+' · '+esc(r.country)+'</td><td>'+esc(r.event_start_date||"—")+(r.event_end_date&&r.event_end_date!==r.event_start_date?" → "+esc(r.event_end_date):"")+'</td><td>'+esc(r.status)+'</td><td><button type="button" data-edit="'+r.id+'">Modifier</button><button type="button" data-archive="'+r.id+'">Archiver</button><button type="button" data-delete="'+r.id+'">Supprimer</button></td></tr>').join("")+'</tbody></table></div>':'<p>Aucun contenu trouvé.</p>';
 }
 root.querySelectorAll("[data-kind]").forEach(b=>b.addEventListener("click",()=>{kind=b.dataset.kind;root.querySelectorAll("[data-kind]").forEach(x=>x.classList.toggle("active",x===b));draw();}));
 search.addEventListener("input",draw);root.querySelector("#catalogReset").addEventListener("click",reset);
 form.addEventListener("submit",async e=>{e.preventDefault();const button=form.querySelector('[type="submit"]');button.disabled=true;feedback.textContent="Enregistrement…";
 try{const f=new FormData(form),id=String(f.get("id")||"");const p={content_type:f.get("content_type"),title:String(f.get("title")).trim(),slug:String(f.get("slug")).trim().toLowerCase(),country:String(f.get("country")).trim(),city:String(f.get("city")||"").trim()||null,location:String(f.get("location")||"").trim()||"Bénin",duration:String(f.get("duration")||"").trim()||null,price_from:f.get("price_from")?Number(f.get("price_from")):null,currency:f.get("currency")||"XOF",ticket_price:f.get("ticket_price")?Number(f.get("ticket_price")):null,event_start_date:f.get("event_start_date")||null,event_end_date:f.get("event_end_date")||null,max_capacity:f.get("max_capacity")?Number(f.get("max_capacity")):null,organizer:String(f.get("organizer")||"").trim()||null,meeting_point:String(f.get("meeting_point")||"").trim()||null,cover_image:safeHttpUrl(String(f.get("cover_image")||"").trim(),"Image de couverture"),gallery:String(f.get("gallery_urls")||"").split(/\r?\n/).map(x=>safeHttpUrl(x.trim(),"Galerie")).filter(Boolean),video_url:safeHttpUrl(String(f.get("video_url")||"").trim(),"Vidéo"),pricing_options:(()=>{const raw=String(f.get("pricing_options_text")||"").trim();if(!raw)return [];let items;try{items=JSON.parse(raw);}catch{throw new Error("Les formules doivent être au format JSON valide.");}if(!Array.isArray(items))throw new Error("Les formules doivent être une liste JSON.");return items;})(),booking_mode:f.get("booking_mode"),registration_url:safeHttpUrl(String(f.get("registration_url")||"").trim(),"Lien d’inscription"),contact_whatsapp:String(f.get("contact_whatsapp")||"").trim()||null,status:f.get("status"),sort_order:Number(f.get("sort_order")||0),summary:String(f.get("summary")||"").trim(),description:String(f.get("description")||"").trim(),itinerary:String(f.get("itinerary")||"").trim()||null,inclusions:String(f.get("inclusions")||"").trim()||null,exclusions:String(f.get("exclusions")||"").trim()||null,languages:String(f.get("languages")||"fr,en").split(",").map(x=>x.trim()).filter(Boolean),featured:f.get("featured")==="on",seo_title:String(f.get("seo_title")||"").trim()||null,seo_description:String(f.get("seo_description")||"").trim()||null};
 if(p.event_start_date&&p.event_end_date&&p.event_end_date<p.event_start_date)throw new Error("La date de fin doit être après la date de début.");
 if(p.booking_mode==="external"&&!p.registration_url)throw new Error("Le lien d'inscription externe est obligatoire.");
 const uploads=[...(form.elements.media_files?.files||[])];
 if(uploads.length){
  if(!form.elements.media_rights_confirmed.checked)throw new Error("Confirmez les droits de publication des fichiers importés.");
  const gallery=[...(p.gallery||[])];let video=p.video_url||null;
  for(const file of uploads){
   const allowed=["image/jpeg","image/png","image/webp","video/mp4","video/webm"];
   if(!allowed.includes(file.type)||file.size>50*1024*1024)throw new Error("Fichier non accepté : JPEG, PNG, WebP, MP4 ou WebM de 50 Mo maximum.");
   const ext=file.name.split(".").pop().toLowerCase(),path="events/"+p.slug+"/"+crypto.randomUUID()+"."+ext;
   const uploaded=await supabase.storage.from("afa-public-media").upload(path,file,{contentType:file.type,upsert:false});
   if(uploaded.error)throw uploaded.error;
   const publicUrl=supabase.storage.from("afa-public-media").getPublicUrl(path).data.publicUrl;
   if(file.type.startsWith("image/"))gallery.push(publicUrl);else if(!video)video=publicUrl;
  }
  p.gallery=gallery;p.video_url=video;
 }
 const res=id?await supabase.from("tours").update(p).eq("id",id):await supabase.from("tours").insert(p);if(res.error)throw res.error;
 const reload=await supabase.from("tours").select("*").order("updated_at",{ascending:false}).limit(500);if(reload.error)throw reload.error;rows.splice(0,rows.length,...reload.data);reset();draw();feedback.textContent=id?"Contenu modifié.":"Contenu ajouté.";
 }catch(err){feedback.textContent=err.message||"Erreur d'enregistrement.";}finally{button.disabled=false;}});
 list.addEventListener("click",async e=>{const edit=e.target.closest("[data-edit]");if(edit){const r=rows.find(x=>x.id===edit.dataset.edit);if(!r)return;reset();Object.entries(r).forEach(([k,v])=>{const el=form.elements.namedItem(k);if(!el)return;if(el.type==="checkbox")el.checked=Boolean(v);else if(k==="languages")el.value=(v||["fr","en"]).join(",");else if(k==="gallery_urls")el.value=(r.gallery||[]).join("\\n");else if(k==="pricing_options_text")el.value=JSON.stringify(r.pricing_options||[],null,2);else el.value=v??"";});root.querySelector("#editorTitle").textContent="Modifier : "+r.title;form.scrollIntoView({behavior:"smooth"});return;}
 const arch=e.target.closest("[data-archive]");if(arch){const r=rows.find(x=>x.id===arch.dataset.archive);if(!r||!confirm("Archiver « "+r.title+" » ?"))return;const result=await supabase.from("tours").update({status:"archived"}).eq("id",r.id);if(result.error){feedback.textContent=result.error.message;return;}r.status="archived";draw();feedback.textContent="Contenu archivé.";return;}
 const del=e.target.closest("[data-delete]");if(del){const r=rows.find(x=>x.id===del.dataset.delete);if(!r||!confirm("Supprimer définitivement « "+r.title+" » ? Cette action est irréversible. Si une réservation y est liée, la base peut refuser la suppression."))return;const result=await supabase.from("tours").delete().eq("id",r.id);if(result.error){feedback.textContent="Suppression refusée : "+result.error.message+" Archivez plutôt ce contenu.";return;}rows.splice(rows.findIndex(x=>x.id===r.id),1);reset();draw();feedback.textContent="Contenu supprimé.";}}); 
 draw();
}
