import { supabase } from "./backend.js";
import { renderContentManager } from "./admin-content.js";
const loginPanel=document.getElementById("loginPanel"), dashboard=document.getElementById("dashboard"), content=document.getElementById("adminContent"), msg=document.getElementById("loginMessage");
const config={
 bookings:{table:"bookings",cols:["reference","full_name","email","tour_name","preferred_date","party_size","status","created_at","audio_path"],title:"Demandes de réservation"},
 messages:{table:"messages",cols:["full_name","email","subject","body","status","created_at"],title:"Messages reçus"},
 reviews:{table:"reviews",cols:["display_name","rating","title","body","status","created_at"],title:"Avis à modérer"},
 media:{table:"media_submissions",cols:["display_name","media_type","caption","consent_publication","consent_marketing","status","created_at"],title:"Photos et vidéos"},
 tours:{table:"tours",cols:["title","location","duration","status","price_from","currency"],title:"Circuits"}
};
const statuses={bookings:["new","contacted","quoted","confirmed","cancelled","completed"],messages:["new","read","replied","closed"],reviews:["pending","approved","rejected"],media:["pending","approved","rejected"],tours:["draft","published","archived"]};
let active="bookings";
let currentAdminRole="";
let mediaConsentFilter="all";
document.getElementById("loginForm").addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget),button=e.currentTarget.querySelector('button[type="submit"],button:not([type])');if(button)button.disabled=true;msg.textContent="Connexion…";try{const {error}=await supabase.auth.signInWithPassword({email:f.get("email"),password:f.get("password")});if(error)throw error;await completeMfa();}catch(error){msg.textContent="Connexion refusée : "+(error.message||"vérifiez vos identifiants.");}finally{if(button)button.disabled=false;}});

async function completeMfa(){
 const {data:aal,error:aalError}=await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
 if(aalError)throw aalError;
 if(aal?.currentLevel==="aal2"){await init();return;}
 const {data:factors,error:factorError}=await supabase.auth.mfa.listFactors();
 if(factorError)throw factorError;
 const verified=(factors?.totp||[]).find(f=>f.status==="verified");
 let factorId=verified?.id,qrCode="",secret="";
 if(!factorId){
  const {data:enrollment,error:enrollError}=await supabase.auth.mfa.enroll({factorType:"totp",friendlyName:"AFA TOURS Administration"});
  if(enrollError)throw enrollError;
  factorId=enrollment.id;qrCode=enrollment.totp?.qr_code||"";secret=enrollment.totp?.secret||"";
 }
 showMfaPanel({factorId,qrCode,secret});
}

function showMfaPanel({factorId,qrCode,secret}){
 document.getElementById("mfaPanel")?.remove();
 const panel=document.createElement("section");panel.id="mfaPanel";panel.className="admin-panel";
 const title=document.createElement("h3");title.textContent=qrCode?"Sécuriser votre compte administrateur":"Vérification en deux étapes";
 const instruction=document.createElement("p");instruction.textContent=qrCode?"Scannez ce QR code avec Google Authenticator, Microsoft Authenticator ou une application TOTP, puis saisissez le code à 6 chiffres.":"Saisissez le code à 6 chiffres affiché dans votre application d’authentification.";
 panel.append(title,instruction);
 if(qrCode){const image=document.createElement("img");image.alt="QR code de configuration MFA";image.src=qrCode;image.style.cssText="display:block;width:210px;max-width:100%;height:auto;background:white;padding:12px;border:1px solid #ddd";panel.append(image);if(secret){const label=document.createElement("p");label.textContent="Clé de configuration manuelle :";const key=document.createElement("code");key.textContent=secret;key.style.cssText="display:block;overflow-wrap:anywhere;padding:10px;background:white";panel.append(label,key);}}
 const form=document.createElement("form");form.innerHTML='<label>Code de vérification<input name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" minlength="6" maxlength="6" required></label><button class="button" type="submit">Vérifier et continuer</button><p class="admin-status" aria-live="polite"></p>';
 form.addEventListener("submit",async event=>{event.preventDefault();const button=form.querySelector("button"),feedback=form.querySelector(".admin-status"),code=form.elements.code.value.trim();button.disabled=true;feedback.textContent="Vérification…";try{const {data:challenge,error:challengeError}=await supabase.auth.mfa.challenge({factorId});if(challengeError)throw challengeError;const {error:verifyError}=await supabase.auth.mfa.verify({factorId,challengeId:challenge.id,code});if(verifyError)throw verifyError;panel.remove();msg.textContent="Vérification MFA réussie.";await init();}catch(error){feedback.textContent=error.message||"Code invalide. Réessayez.";}finally{button.disabled=false;}});
 panel.append(form);loginPanel.append(panel);
}


document.addEventListener("click",e=>{const t=e.target.closest("[data-toggle-password]");if(!t)return;const i=t.parentElement.querySelector("input");i.type=i.type==="password"?"text":"password";t.textContent=i.type==="password"?"Afficher":"Masquer";});
document.getElementById("signupForm").addEventListener("submit",async e=>{e.preventDefault();const form=e.currentTarget,f=new FormData(form),p=f.get("password");if(p!==f.get("confirmPassword")){msg.textContent="Les deux mots de passe ne correspondent pas.";return;}if(p.length<12){msg.textContent="Le mot de passe doit contenir au moins 12 caractères.";return;}const b=form.querySelector("button");b.disabled=true;try{const {data,error}=await supabase.auth.signUp({email:f.get("email"),password:p,options:{emailRedirectTo:"https://leonel-affognon.github.io/afa-tours-website/admin.html"}});if(error)throw error;msg.textContent=data.session?"Compte créé. Connectez-vous puis activez-le.":"Compte créé. Vérifiez votre boîte e-mail et utilisez le nouveau lien.";form.reset();}catch(error){msg.textContent=error.message||"Création impossible.";}finally{b.disabled=false;}});
document.getElementById("showForgotPassword").addEventListener("click",()=>document.getElementById("forgotPasswordForm").classList.toggle("hidden"));
document.getElementById("forgotPasswordForm").addEventListener("submit",async e=>{e.preventDefault();const form=e.currentTarget,b=form.querySelector("button"),email=new FormData(form).get("email");b.disabled=true;try{const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:"https://leonel-affognon.github.io/afa-tours-website/admin.html"});if(error)throw error;msg.textContent="Si cette adresse correspond à un compte, un lien de réinitialisation a été envoyé. Vérifiez aussi les courriers indésirables.";}catch(error){msg.textContent="Envoi impossible. Réessayez plus tard.";}finally{b.disabled=false;}});
document.getElementById("newPasswordForm").addEventListener("submit",async e=>{e.preventDefault();const form=e.currentTarget,f=new FormData(form),p=f.get("password");if(p!==f.get("confirmPassword")){msg.textContent="Les deux mots de passe ne correspondent pas.";return;}const b=form.querySelector("button");b.disabled=true;try{const {error}=await supabase.auth.updateUser({password:p});if(error)throw error;msg.textContent="Mot de passe modifié. Vous pouvez vous connecter.";form.reset();form.classList.add("hidden");await supabase.auth.signOut();}catch(error){msg.textContent="Réinitialisation impossible. Le lien a peut-être expiré.";}finally{b.disabled=false;}});
supabase.auth.onAuthStateChange(event=>{if(event==="PASSWORD_RECOVERY"){document.getElementById("forgotPasswordForm").classList.add("hidden");document.getElementById("newPasswordForm").classList.remove("hidden");msg.textContent="Lien valide. Choisissez votre nouveau mot de passe.";}});
document.getElementById("bootstrapForm").addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget);msg.textContent="Activation…";const {data:{session}}=await supabase.auth.getSession();if(!session){msg.textContent="Connectez-vous d'abord après avoir vérifié votre email.";return;}const {data,error}=await supabase.functions.invoke("bootstrap-owner",{body:{token:f.get("token")}});if(error||!data?.success){msg.textContent=data?.error||error?.message||"Activation impossible.";return;}msg.textContent="Compte propriétaire activé. Configurez maintenant la vérification en deux étapes.";await completeMfa();});

document.getElementById("logoutButton").addEventListener("click",async()=>{await supabase.auth.signOut();dashboard.classList.add("hidden");loginPanel.classList.remove("hidden");});
document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>{active=b.dataset.tab;document.querySelectorAll("[data-tab]").forEach(x=>x.classList.toggle("active",x===b));render();}));
async function init(){const {data:{user}}=await supabase.auth.getUser();if(!user)return;const {data:role,error}=await supabase.from("admin_users").select("role").eq("user_id",user.id).maybeSingle();if(error||!role){msg.textContent="Compte authentifié. Terminez la configuration MFA puis utilisez le code propriétaire pour activer le premier administrateur.";return;}currentAdminRole=role.role;loginPanel.classList.add("hidden");dashboard.classList.remove("hidden");document.getElementById("adminWelcome").textContent="Connecté : "+user.email+" · rôle "+role.role;const settingsTab=document.querySelector('[data-tab="settings"]');if(settingsTab)settingsTab.hidden=currentAdminRole!=="owner";render();}

async function renderDestinations(){
 content.innerHTML="<h2>Destinations</h2><p>Gestion des destinations publiques reliées aux circuits, expériences et événements.</p><p>Chargement…</p>";
 const {data:rows,error}=await supabase.from("destinations").select("*").order("sort_order");
 if(error){content.innerHTML="<p>Impossible de charger les destinations : "+esc(error.message)+"</p>";return;}
 content.innerHTML='<h2>Destinations</h2><p>Ajoutez, modifiez, publiez ou archivez les destinations. Les contenus du catalogue peuvent ensuite être reliés à chacune d’elles.</p><section class="admin-panel"><form id="destinationForm" class="admin-grid"><input type="hidden" name="id"><label>Nom<input name="name" required maxlength="120"></label><label>Slug<input name="slug" required pattern="[a-z0-9-]+"></label><label>Pays<input name="country" value="Bénin" required></label><label>Région / département<input name="region"></label><label>Image de couverture (URL)<input name="cover_image" type="url"></label><label class="catalog-wide">Importer des photos (JPEG, PNG, WebP — 15 Mo maximum chacune)<input name="destination_media_files" type="file" accept="image/jpeg,image/png,image/webp" multiple><small>Les photos importées sont ajoutées à la galerie.</small></label><label class="catalog-wide"><input name="replace_cover_with_first_upload" type="checkbox"> Remplacer l’image de couverture par la première photo importée</label><label class="catalog-wide">Galerie de la destination (une URL HTTPS par ligne)<textarea name="gallery_urls" rows="4" placeholder="https://..."></textarea><small>Ajoutez les liens des photos autorisées. Une photo par ligne.</small></label><label>Ordre d’affichage<input name="sort_order" type="number" value="0"></label><label class="catalog-wide">Résumé<textarea name="summary" maxlength="500" required></textarea></label><label class="catalog-wide">Description<textarea name="description" rows="4"></textarea></label><label class="catalog-wide">Traductions (JSON : en, de, es, pt)<textarea name="translations_json" rows="8" placeholder="{&quot;en&quot;:{&quot;name&quot;:&quot;...&quot;,&quot;summary&quot;:&quot;...&quot;,&quot;description&quot;:&quot;...&quot;}}"></textarea><small>Renseignez name, summary et description pour chaque langue. Le français reste la version principale.</small></label><label>Statut<select name="status"><option value="draft">Brouillon</option><option value="published">Publié</option><option value="archived">Archivé</option></select></label><label>Titre SEO<input name="seo_title"></label><label class="catalog-wide">Description SEO<textarea name="seo_description"></textarea></label><div class="catalog-wide"><button class="button" type="submit">Enregistrer la destination</button> <button type="button" id="destinationReset">Nouveau / Réinitialiser</button><span id="destinationFeedback" aria-live="polite"></span></div></form></section><section class="admin-panel"><h3>Destinations enregistrées</h3><div style="overflow:auto"><table class="admin-table"><thead><tr><th>Nom</th><th>Région</th><th>Statut</th><th>Actions</th></tr></thead><tbody>'+rows.map(r=>'<tr><td><b>'+esc(r.name)+'</b><br><small>'+esc(r.slug)+'</small></td><td>'+esc(r.region||r.country)+'</td><td>'+esc(r.status)+'</td><td><button type="button" data-dest-edit="'+r.id+'">Modifier</button> <button type="button" data-dest-archive="'+r.id+'">Archiver</button></td></tr>').join("")+'</tbody></table></div></section>';
 const form=content.querySelector("#destinationForm"),feedback=content.querySelector("#destinationFeedback");
 function reset(){form.reset();form.elements.id.value="";form.elements.country.value="Bénin";form.elements.status.value="draft";form.elements.sort_order.value="0";feedback.textContent="";}
 content.querySelector("#destinationReset").addEventListener("click",reset);
 form.addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(form),id=f.get("id");let translations={};try{const raw=String(f.get("translations_json")||"").trim();if(raw){translations=JSON.parse(raw);if(!translations||Array.isArray(translations)||typeof translations!=="object"||Object.keys(translations).some(k=>!["en","de","es","pt"].includes(k)))throw new Error("Langue non prise en charge dans les traductions.");}}catch(err){feedback.textContent=err.message||"Traductions invalides.";return;}const gallery=String(f.get("gallery_urls")||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean).map(x=>{try{const u=new URL(x);return u.protocol==="https:"?u.href:null;}catch{return null;}});if(gallery.some(x=>!x)){feedback.textContent="Une adresse de galerie est invalide. Utilisez uniquement des liens HTTPS.";return;}let coverImage=String(f.get("cover_image")||"").trim()||null;const mediaFiles=[...(form.elements.destination_media_files?.files||[])];for(let i=0;i<mediaFiles.length;i++){const file=mediaFiles[i];if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>15*1024*1024){feedback.textContent="Photo non acceptée : JPEG, PNG ou WebP de 15 Mo maximum.";return;}const ext=file.name.split(".").pop().toLowerCase();const path="destinations/"+String(f.get("slug")).trim().toLowerCase()+"/"+crypto.randomUUID()+"."+ext;feedback.textContent="Envoi de la photo "+(i+1)+"/"+mediaFiles.length+"…";const uploaded=await supabase.storage.from("afa-public-media").upload(path,file,{contentType:file.type,upsert:false});if(uploaded.error){feedback.textContent="Échec de l’envoi : "+uploaded.error.message;return;}const url=supabase.storage.from("afa-public-media").getPublicUrl(path).data.publicUrl;if(i===0&&(!coverImage||form.elements.replace_cover_with_first_upload.checked))coverImage=url;gallery.push(url);}const p={translations,gallery,name:String(f.get("name")).trim(),slug:String(f.get("slug")).trim().toLowerCase(),country:String(f.get("country")).trim(),region:String(f.get("region")||"").trim()||null,cover_image:coverImage,summary:String(f.get("summary")||"").trim(),description:String(f.get("description")||"").trim(),status:f.get("status"),sort_order:Number(f.get("sort_order")||0),seo_title:String(f.get("seo_title")||"").trim()||null,seo_description:String(f.get("seo_description")||"").trim()||null};const button=form.querySelector('[type="submit"]');button.disabled=true;feedback.textContent="Enregistrement…";try{const result=id?await supabase.from("destinations").update(p).eq("id",id):await supabase.from("destinations").insert(p);if(result.error)throw result.error;feedback.textContent="Destination enregistrée.";await renderDestinations();}catch(err){feedback.textContent=err.message||"Erreur d’enregistrement.";}finally{button.disabled=false;}});
 content.querySelectorAll("[data-dest-edit]").forEach(b=>b.addEventListener("click",()=>{const r=rows.find(x=>x.id===b.dataset.destEdit);if(!r)return;Object.entries(r).forEach(([k,v])=>{const el=form.elements.namedItem(k);if(el)el.value=v??"";});form.elements.translations_json.value=JSON.stringify(r.translations||{},null,2);form.elements.gallery_urls.value=(r.gallery||[]).join("\n");form.scrollIntoView({behavior:"smooth"});}));
 content.querySelectorAll("[data-dest-archive]").forEach(b=>b.addEventListener("click",async()=>{const r=rows.find(x=>x.id===b.dataset.destArchive);if(!r||!confirm("Archiver la destination « "+r.name+" » ?"))return;const result=await supabase.from("destinations").update({status:"archived"}).eq("id",r.id);if(result.error){feedback.textContent=result.error.message;return;}await renderDestinations();}));
}
async function render(){if(active==="destinations"){await renderDestinations();return;}if(active==="settings"){await renderCurrencySettings();return;}if(active==="content"){await renderContentManager(content);return;}const cfg=config[active];content.innerHTML="<h2>"+cfg.title+"</h2><p>Chargement…</p>";const {data,error}=await supabase.from(cfg.table).select("*").order("created_at",{ascending:false}).limit(100);if(error){content.innerHTML="<p>Impossible de charger ces données. Vérifiez les droits du compte.</p>";return;}
if(active==="bookings"){
 const {data:voiceRows,error:voiceError}=await supabase.from("booking_voice_notes").select("booking_reference,audio_path,audio_mime_type").order("created_at",{ascending:false});
 if(!voiceError&&voiceRows){for(const voice of voiceRows){const row=data.find(item=>item.reference===voice.booking_reference);if(!row)continue;const {data:signed}=await supabase.storage.from("afa-submissions").createSignedUrl(voice.audio_path,3600);row.audio_url=signed?.signedUrl||"";}}
}
if(active==="media"){await renderMediaManager(data);return;}
if(active==="tours"){await renderContentManager(content);return;}
content.innerHTML="<h2>"+cfg.title+"</h2>"+table(data,cfg.cols);}


async function renderMediaManager(rows){
 const {data:pub,error:pubError}=await supabase.from("public_media").select("*").order("published_at",{ascending:false}).limit(100);
 if(pubError){content.innerHTML="<h2>Médias</h2><p>"+esc(pubError.message)+"</p>";return;}
 const cards=await Promise.all(rows.map(async r=>{
  let url="";
  if(r.object_path?.startsWith("visitor/")) url=supabase.storage.from("afa-public-media").getPublicUrl(r.object_path).data.publicUrl;
  else {const {data}=await supabase.storage.from("afa-submissions").createSignedUrl(r.object_path,3600);url=data?.signedUrl||"";}
  return mediaCard(r,url,false);
 }));
 const legacy=(pub||[]).filter(p=>!p.source_submission_id).map(p=>mediaCard(p,p.public_url||"",true));
 content.innerHTML='<h2>Gestion des médias</h2><p>Modifie le titre et la légende, puis approuve, rejette ou supprime chaque photo ou vidéo.</p><form id="adminMediaForm" class="admin-grid"><h3>Ajouter des médias</h3><label>Photos / vidéos<input name="files" type="file" accept="image/*,video/*" multiple required></label><label>Nom affiché par défaut<input name="name" value="AFA TOURS INNOVANT" required maxlength="120"></label><label><input name="publication" type="checkbox"> Autorisation de publication</label><label><input name="marketing" type="checkbox"> Autorisation marketing</label><button class="button" type="submit">Téléverser</button><p id="mediaUploadFeedback" aria-live="polite"></p></form><h3>Médias enregistrés ('+rows.length+')</h3><div class="admin-grid">'+(cards.join("")||"<p>Aucun média.</p>")+'</div>'+(legacy.length?'<h3>Anciennes publications</h3><div class="admin-grid">'+legacy.join("")+'</div>':"");
 document.getElementById("adminMediaForm").addEventListener("submit",async e=>{
  e.preventDefault();const form=e.currentTarget,btn=form.querySelector("button"),feedback=document.getElementById("mediaUploadFeedback"),files=[...form.elements.files.files],paths=[];btn.disabled=true;
  try{
   const {data:{user}}=await supabase.auth.getUser();const records=[];
   for(let i=0;i<files.length;i++){const file=files[i];if(!file.type.startsWith("image/")&&!file.type.startsWith("video/"))throw new Error("Format non pris en charge : "+file.name);
    feedback.textContent="Envoi "+(i+1)+"/"+files.length;
    const ext=(file.name.split(".").pop()||"bin").toLowerCase().replace(/[^a-z0-9]/g,"")||"bin",path="incoming/admin-"+crypto.randomUUID()+"."+ext;
    const {error}=await supabase.storage.from("afa-submissions").upload(path,file,{contentType:file.type||"application/octet-stream"});if(error)throw error;paths.push(path);
    records.push({display_name:form.elements.name.value.trim(),email:user?.email||"",caption:"",object_path:path,media_type:file.type.startsWith("video/")?"video":"image",consent_publication:form.elements.publication.checked,consent_marketing:form.elements.marketing.checked,status:"pending"});
   }
   const {error}=await supabase.from("media_submissions").insert(records);if(error)throw error;
   await render();
  }catch(err){if(paths.length)await supabase.storage.from("afa-submissions").remove(paths);feedback.textContent=err.message||"Erreur de téléversement.";}
  finally{btn.disabled=false;}
 });
}
function mediaCard(r,url,legacy){
 const id=esc(r.id),type=r.media_type||"image",status=legacy?"PUBLIÉ SUR LE SITE":({pending:"EN ATTENTE DE VALIDATION",approved:"PUBLIÉ SUR LE SITE",rejected:"REJETÉ — NON VISIBLE"}[r.status]||String(r.status||"STATUT INCONNU").toUpperCase());
 const preview=url?(type==="video"?'<video controls playsinline preload="metadata" src="'+esc(url)+'"></video>':'<img loading="lazy" src="'+esc(url)+'" alt="'+esc(r.display_name||"Média AFA")+'">'):'<div>Aperçu indisponible</div>';
 return '<article class="admin-panel media-edit-card" data-id="'+id+'" data-legacy="'+legacy+'"><style>.media-edit-card{padding:12px;min-width:0}.media-edit-card .preview{aspect-ratio:16/10;background:#eee;margin-bottom:10px;overflow:hidden}.media-edit-card .preview img,.media-edit-card .preview video{width:100%;height:100%;object-fit:cover}.media-edit-card label{display:block;margin:8px 0;font-weight:600}.media-edit-card input,.media-edit-card textarea{width:100%;box-sizing:border-box;padding:9px}.media-edit-card .actions{display:flex;flex-wrap:wrap;gap:7px}.media-edit-card button{padding:9px;border:1px solid #ccc;background:#fff}.media-edit-card button[data-action=approve]{background:#245c3b;color:#fff}.media-edit-card .status{display:inline-block;padding:5px 8px;background:#eee;margin:6px 0}</style><div class="preview">'+preview+'</div><span class="status" data-media-status style="font-weight:700;border-radius:4px;padding:7px 10px;background:'+(legacy||r.status==="approved"?"#e5f4e9":r.status==="rejected"?"#fde8e7":"#fff3d6")+' ;color:'+(legacy||r.status==="approved"?"#176536":r.status==="rejected"?"#a12622":"#805400")+'">'+esc(status)+'</span><label>Nom / titre<input data-name maxlength="120" value="'+esc(r.display_name||"")+'"></label><label>Légende / description<textarea data-caption rows="2" maxlength="500">'+esc(r.caption||"")+'</textarea></label>'+
 (legacy?'<label>Remplacer la photo (JPEG, PNG ou WebP — 15 Mo maximum)<input data-replacement-file type="file" accept="image/jpeg,image/png,image/webp"></label><div class="actions"><button data-action="save-legacy">Enregistrer</button><button data-action="delete-legacy">Supprimer</button></div>':
 '<label><input data-publication type="checkbox" '+(r.consent_publication===true?"checked":"")+'> Autorisation de publication</label><label><input data-marketing type="checkbox" '+(r.consent_marketing===true?"checked":"")+'> Autorisation marketing</label><div class="actions"><button data-action="save">Enregistrer</button><button data-action="approve">Approuver et publier</button><button data-action="reject">Rejeter</button><button data-action="delete">Supprimer</button></div>')+
 '<p data-feedback aria-live="polite"></p></article>';
}
function setMediaCardStatus(card,label,state){const badge=card.querySelector("[data-media-status]");if(!badge)return;badge.textContent=label;badge.style.background=state==="published"?"#e5f4e9":"#fde8e7";badge.style.color=state==="published"?"#176536":"#a12622";}
function updateMediaCount(){const heading=[...content.querySelectorAll("h3")].find(x=>x.textContent.startsWith("Médias enregistrés"));if(heading){const grid=heading.nextElementSibling;const count=grid?.querySelectorAll(".media-edit-card").length??0;heading.textContent="Médias enregistrés ("+count+")";if(!count)grid.innerHTML="<p>Aucun média.</p>";}}
async function removePublicEntry(id){
 const {data:p,error}=await supabase.from("public_media").select("id,public_url").eq("source_submission_id",id).maybeSingle();if(error)throw error;
 if(p){const {error:del}=await supabase.from("public_media").delete().eq("id",p.id);if(del)throw del;}
}
function publicObjectPath(url){try{const marker="/storage/v1/object/public/afa-public-media/";const p=new URL(url).pathname;const i=p.indexOf(marker);return i<0?null:decodeURIComponent(p.slice(i+marker.length));}catch{return null;}}
async function handleMediaAction(e){
 const b=e.target.closest("[data-action]");if(!b)return false;const card=b.closest("[data-id]");if(!card)return false;
 const id=card.dataset.id,legacy=card.dataset.legacy==="true",action=b.dataset.action,feedback=card.querySelector("[data-feedback]"),name=card.querySelector("[data-name]").value.trim(),caption=card.querySelector("[data-caption]").value.trim();
 if(!name){feedback.textContent="Le nom est obligatoire.";return true;}b.disabled=true;feedback.textContent="Traitement…";
 try{
  if(legacy){
   if(action==="save-legacy"){
    const file=card.querySelector("[data-replacement-file]")?.files?.[0];
    const patch={display_name:name,caption};
    if(file){
     if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>15*1024*1024)throw new Error("Photo non acceptée : JPEG, PNG ou WebP de 15 Mo maximum.");
     const ext=({"image/jpeg":"jpg","image/png":"png","image/webp":"webp"})[file.type];
     const path="gallery/legacy-"+id+"-"+crypto.randomUUID()+"."+ext;
     feedback.textContent="Téléversement de la nouvelle photo…";
     const {error:uploadError}=await supabase.storage.from("afa-public-media").upload(path,file,{contentType:file.type,upsert:false});
     if(uploadError)throw uploadError;
     patch.public_url=supabase.storage.from("afa-public-media").getPublicUrl(path).data.publicUrl;
    }
    const {error}=await supabase.from("public_media").update(patch).eq("id",id);if(error)throw error;
    if(file){const image=card.querySelector(".preview img");if(image)image.src=patch.public_url;card.querySelector("[data-replacement-file]").value="";}
    feedback.textContent=file?"Informations et photo enregistrées.":"Informations enregistrées.";
   }
   if(action==="delete-legacy"){if(!confirm("Supprimer définitivement ce média ?"))return true;const {data:p,error}=await supabase.from("public_media").select("public_url").eq("id",id).single();if(error)throw error;const path=publicObjectPath(p.public_url);if(path){const {error:rm}=await supabase.storage.from("afa-public-media").remove([path]);if(rm)throw rm;}const {error:del}=await supabase.from("public_media").delete().eq("id",id);if(del)throw del;card.remove();updateMediaCount();}
   return true;
  }
  const {data:r,error:read}=await supabase.from("media_submissions").select("*").eq("id",id).single();if(read)throw read;
  const patch={display_name:name,caption,consent_publication:card.querySelector("[data-publication]").checked,consent_marketing:card.querySelector("[data-marketing]").checked};
  if(action==="save"){const {error}=await supabase.from("media_submissions").update(patch).eq("id",id);if(error)throw error;const {error:pe}=await supabase.from("public_media").update({display_name:name,caption}).eq("source_submission_id",id);if(pe)throw pe;feedback.textContent="Informations enregistrées.";return true;}
  if(action==="approve"){
   if(!patch.consent_publication)throw new Error("Coche d'abord l'autorisation de publication, puis enregistre.");
   let publicPath="visitor/"+id+"."+(r.object_path.split(".").pop()||"jpg");
   if(r.object_path.startsWith("visitor/")) publicPath=r.object_path;
   else {const {data:file,error:dl}=await supabase.storage.from("afa-submissions").download(r.object_path);if(dl)throw dl;const {error:up}=await supabase.storage.from("afa-public-media").upload(publicPath,file,{upsert:true,contentType:file.type||undefined});if(up)throw up;}
   const url=supabase.storage.from("afa-public-media").getPublicUrl(publicPath).data.publicUrl;
   const record={source_submission_id:id,display_name:name,caption,media_type:r.media_type,public_url:url};
   const {data:old,error:oe}=await supabase.from("public_media").select("id").eq("source_submission_id",id).maybeSingle();if(oe)throw oe;
   const result=old?await supabase.from("public_media").update(record).eq("id",old.id):await supabase.from("public_media").insert(record);if(result.error)throw result.error;
   const {error:up2}=await supabase.from("media_submissions").update({...patch,status:"approved"}).eq("id",id);if(up2)throw up2;setMediaCardStatus(card,"PUBLIÉ SUR LE SITE","published");feedback.textContent="Publication confirmée : ce média est maintenant visible dans la galerie du site.";return true;
  }
  if(action==="reject"){if(!confirm("Rejeter ce média ? Il sera retiré de la galerie publique."))return true;await removePublicEntry(id);const {error}=await supabase.from("media_submissions").update({...patch,status:"rejected"}).eq("id",id);if(error)throw error;setMediaCardStatus(card,"REJETÉ — NON VISIBLE","rejected");feedback.textContent="Média rejeté et retiré de la galerie publique.";return true;}
  if(action==="delete"){if(!confirm("Supprimer définitivement ce média et son fichier ?"))return true;await removePublicEntry(id);if(r.object_path.startsWith("incoming/")){const {error}=await supabase.storage.from("afa-submissions").remove([r.object_path]);if(error)throw error;}if(r.object_path.startsWith("visitor/")){const {error}=await supabase.storage.from("afa-public-media").remove([r.object_path]);if(error)throw error;}const {error}=await supabase.from("media_submissions").delete().eq("id",id);if(error)throw error;card.remove();updateMediaCount();return true;}
 }catch(err){feedback.textContent=err.message||"Erreur.";}finally{b.disabled=false;}
 return true;
}

async function renderCurrencySettings(){
 if(currentAdminRole!=="owner"){content.innerHTML="<p>Seul le propriétaire peut modifier les paramètres de change.</p>";return;}
 content.innerHTML="<h2>Paramètres internationaux et devises</h2><p>Ces réglages s’appliquent à tous les circuits, excursions, expériences, festivals et événements du site.</p><p>Chargement…</p>";
 const {data,error}=await supabase.from("afa_site_settings").select("currency_converter_enabled,exchange_margin_percent,updated_at").eq("id",true).maybeSingle();
 if(error){content.innerHTML="<p>Impossible de charger les paramètres : "+esc(error.message)+"</p>";return;}
 const settings=data||{currency_converter_enabled:true,exchange_margin_percent:3};
 content.innerHTML='<h2>Paramètres internationaux et devises</h2><p>Ces réglages s’appliquent à tous les circuits, excursions, expériences, festivals et événements du site.</p><form id="currencySettingsForm" class="admin-grid"><label class="catalog-wide"><input type="checkbox" name="enabled" '+(settings.currency_converter_enabled?'checked':'')+'> Activer le convertisseur sur le site public</label><label>Marge de change AFA (%)<input name="margin" type="number" min="0" max="25" step="0.1" value="'+esc(settings.exchange_margin_percent)+'" required></label><div class="catalog-wide"><button class="button" type="submit">Enregistrer les paramètres</button><span id="currencySettingsFeedback" aria-live="polite"></span></div></form><p>Devise de référence : XOF (FCFA). Les taux sont fournis par un service externe et leur date de mise à jour est affichée aux visiteurs. La marge est ajoutée au taux de référence et annoncée séparément.</p>';
 document.getElementById("currencySettingsForm").addEventListener("submit",async e=>{e.preventDefault();const form=e.currentTarget,button=form.querySelector("button"),feedback=document.getElementById("currencySettingsFeedback"),margin=Number(form.elements.margin.value);if(!Number.isFinite(margin)||margin<0||margin>25){feedback.textContent="La marge doit être comprise entre 0 et 25 %.";return;}button.disabled=true;feedback.textContent="Enregistrement…";const {error:saveError}=await supabase.from("afa_site_settings").update({currency_converter_enabled:form.elements.enabled.checked,exchange_margin_percent:margin,updated_at:new Date().toISOString()}).eq("id",true);button.disabled=false;if(saveError){feedback.textContent="Enregistrement refusé : "+saveError.message;return;}feedback.textContent="Paramètres enregistrés. Le site public les prendra en compte au prochain chargement.";});
}

function tourForm(){return '<h2>Circuits</h2><form id="tourForm" class="admin-grid"><label>Titre<input name="title" required></label><label>Identifiant URL<input name="slug" required></label><label>Lieu<input name="location" value="Bénin"></label><label>Durée<input name="duration"></label><label>Prix à partir de (FCFA)<input name="price_from" type="number" min="0"></label><label>Image (URL)<input name="cover_image" type="url"></label><label>Résumé<textarea name="summary"></textarea></label><label>Statut<select name="status"><option value="draft">Brouillon</option><option value="published">Publié</option></select></label><button class="button">Ajouter le circuit</button></form>';}
function table(rows,cols){if(!rows.length)return "<p>Aucun élément pour le moment.</p>";return '<div style="overflow:auto"><table class="admin-table"><thead><tr>'+cols.map(c=>"<th>"+esc(c)+"</th>").join("")+"<th>Actions</th></tr></thead><tbody>"+rows.map(row=>"<tr>"+cols.map(c=>c==="audio_path"?(row.audio_url?`<td><audio controls preload="none" src="${esc(row.audio_url)}"></audio></td>`:"<td>—</td>"):"<td>"+esc(row[c]??"—")+"</td>").join("")+"<td>"+(active==="tours"?'<button data-edit-tour="'+row.id+'">Modifier</button>':"")+(row.status?'<select data-status="'+row.id+'">'+(statuses[active]||[]).map(s=>'<option value="'+s+'" '+(row.status===s?"selected":"")+'>'+s+"</option>").join("")+' </select><button data-save="'+row.id+'">Enregistrer</button>':"")+"</td></tr>").join("")+"</tbody></table></div>";}
function esc(v){if(v===true)return "Oui";if(v===false)return "Non";return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
content.addEventListener("click",async e=>{
 if(await handleMediaAction(e))return;
 const edit=e.target.closest("[data-edit-tour]");
 if(edit){const id=edit.dataset.editTour;const {data,error}=await supabase.from("tours").select("*").eq("id",id).single();if(error){alert(error.message);return;}const title=prompt("Titre",data.title);if(title===null)return;const summary=prompt("Résumé",data.summary);if(summary===null)return;const price=prompt("Prix de départ en FCFA (vide = sur devis)",data.price_from??"");if(price===null)return;const image=prompt("URL de l'image",data.cover_image??"");if(image===null)return;const {error:updateError}=await supabase.from("tours").update({title,summary,price_from:price===""?null:Number(price),cover_image:image||null}).eq("id",id);if(updateError)alert(updateError.message);else render();return;}
 const b=e.target.closest("[data-save]");if(!b)return;const id=b.dataset.save,status=content.querySelector('[data-status="'+id+'"]').value;let extra={};
 if(active==="media"&&status==="rejected"){
  const {data:row,error:readError}=await supabase.from("media_submissions").select("id,object_path").eq("id",id).single();
  if(readError){alert(readError.message);return;}
  const {data:publicRow,error:publicReadError}=await supabase.from("public_media").select("id,source_submission_id,public_url").eq("source_submission_id",id).maybeSingle();
  if(publicReadError){alert(publicReadError.message);return;}
  if(publicRow){
   const publicPath=(()=>{try{return new URL(publicRow.public_url).pathname.split("/storage/v1/object/public/afa-public-media/")[1]||null}catch{return null}})();
   const {error:removeRowError}=await supabase.from("public_media").delete().eq("id",publicRow.id);
   if(removeRowError){alert(removeRowError.message);return;}
   if(publicPath){const {error:removeFileError}=await supabase.storage.from("afa-public-media").remove([decodeURIComponent(publicPath)]);if(removeFileError){alert("Entrée publique retirée, mais le fichier doit être supprimé manuellement : "+removeFileError.message);return;}}
  }
 }
 if(active==="media"&&status==="approved"){const {data:row,error:readError}=await supabase.from("media_submissions").select("*").eq("id",id).single();if(readError){alert(readError.message);return;}if(row.consent_publication!==true){alert("Publication impossible : aucune autorisation de publication n’a été donnée.");render();return;}const {data:file,error:downloadError}=await supabase.storage.from("afa-submissions").download(row.object_path);if(downloadError){alert(downloadError.message);return;}const ext=row.object_path.split(".").pop();const publicPath="visitor/"+id+"."+ext;const {error:uploadError}=await supabase.storage.from("afa-public-media").upload(publicPath,file,{upsert:true});if(uploadError){alert(uploadError.message);return;}const {data:publicData}=supabase.storage.from("afa-public-media").getPublicUrl(publicPath);const mediaRecord={source_submission_id:row.id,display_name:row.display_name,caption:row.caption,media_type:row.media_type,public_url:publicData.publicUrl};const {data:existingMedia,error:existingError}=await supabase.from("public_media").select("id").eq("source_submission_id",row.id).maybeSingle();if(existingError){alert(existingError.message);return;}const galleryResult=existingMedia?await supabase.from("public_media").update(mediaRecord).eq("id",existingMedia.id):await supabase.from("public_media").insert(mediaRecord);if(galleryResult.error){alert(galleryResult.error.message);return;}extra={object_path:publicPath};}
 const {error}=await supabase.from(config[active].table).update({status,...extra,...(active==="reviews"&&status==="approved"?{published_at:new Date().toISOString()}: {})}).eq("id",id);if(error)alert(error.message);else render();
});
const {data:{session}}=await supabase.auth.getSession();if(session)await init();
