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
async function init(){const {data:{user}}=await supabase.auth.getUser();if(!user)return;const {data:role,error}=await supabase.from("admin_users").select("role").eq("user_id",user.id).maybeSingle();if(error||!role){msg.textContent="Compte authentifié. Terminez la configuration MFA puis utilisez le code propriétaire pour activer le premier administrateur.";return;}loginPanel.classList.add("hidden");dashboard.classList.remove("hidden");document.getElementById("adminWelcome").textContent="Connecté : "+user.email+" · rôle "+role.role;render();}
async function render(){if(active==="content"){await renderContentManager(content);return;}const cfg=config[active];content.innerHTML="<h2>"+cfg.title+"</h2><p>Chargement…</p>";const {data,error}=await supabase.from(cfg.table).select("*").order("created_at",{ascending:false}).limit(100);if(error){content.innerHTML="<p>Impossible de charger ces données. Vérifiez les droits du compte.</p>";return;}
if(active==="bookings"){
 const {data:voiceRows,error:voiceError}=await supabase.from("booking_voice_notes").select("booking_reference,audio_path,audio_mime_type").order("created_at",{ascending:false});
 if(!voiceError&&voiceRows){for(const voice of voiceRows){const row=data.find(item=>item.reference===voice.booking_reference);if(!row)continue;const {data:signed}=await supabase.storage.from("afa-submissions").createSignedUrl(voice.audio_path,3600);row.audio_url=signed?.signedUrl||"";}}
}
if(active==="media"){
 const yes=data.filter(x=>x.consent_marketing===true).length;
 const no=data.filter(x=>x.consent_marketing===false).length;
 const missing=data.filter(x=>x.consent_marketing==null).length;
 const visible=data.filter(x=>mediaConsentFilter==="all"||(mediaConsentFilter==="yes"&&x.consent_marketing===true)||(mediaConsentFilter==="no"&&x.consent_marketing===false)||(mediaConsentFilter==="unknown"&&x.consent_marketing==null));
 content.innerHTML="<h2>"+cfg.title+"</h2>"+"<form id=\"adminMediaForm\" class=\"admin-grid\"><h3>Ajouter plusieurs photos ou vidéos</h3><label>Fichiers<input name=\"admin_media\" type=\"file\" accept=\"image/*,video/*\" multiple required></label><label><input name=\"admin_publication\" type=\"checkbox\"> Autorisation de publication</label><label><input name=\"admin_marketing\" type=\"checkbox\"> Autorisation marketing</label><button class=\"button\" type=\"submit\">Téléverser</button><p id=\"adminMediaFeedback\"></p></form>"+"<div class='media-consent-summary'><button data-media-filter='all'>Tous ("+data.length+")</button><button data-media-filter='yes'>Marketing : oui ("+yes+")</button><button data-media-filter='no'>Marketing : non ("+no+")</button>"+(missing?"<button data-media-filter='unknown'>Non renseigné ("+missing+")</button>":"")+"</div><p>Les autorisations de publication sur le site et d’utilisation marketing sont distinctes. La publication est bloquée sans accord explicite.</p>"+table(visible,cfg.cols);
 content.querySelectorAll("[data-media-filter]").forEach(button=>button.addEventListener("click",()=>{mediaConsentFilter=button.dataset.mediaFilter;render();}));
 const adminForm=document.getElementById("adminMediaForm");
 if(adminForm)adminForm.addEventListener("submit",async event=>{
  event.preventDefault();const form=event.currentTarget,files=[...form.elements.admin_media.files],feedback=document.getElementById("adminMediaFeedback"),button=form.querySelector("button");button.disabled=true;
  try{const {data:{user}}=await supabase.auth.getUser();const rows=[];
   for(let i=0;i<files.length;i++){const file=files[i];if(!file.type.startsWith("image/")&&!file.type.startsWith("video/"))throw new Error("Type de fichier non pris en charge.");
    feedback.textContent="Envoi "+(i+1)+"/"+files.length;const ext=(file.name.split(".").pop()||"bin").toLowerCase().replace(/[^a-z0-9]/g,"")||"bin",path="incoming/admin-"+crypto.randomUUID()+"."+ext;
    const {error}=await supabase.storage.from("afa-submissions").upload(path,file,{contentType:file.type||"application/octet-stream"});if(error)throw error;
    rows.push({display_name:"Équipe AFA",email:user?.email||"",caption:file.name,object_path:path,media_type:file.type.startsWith("video/")?"video":"image",consent_publication:form.elements.admin_publication.checked,consent_marketing:form.elements.admin_marketing.checked,status:"pending"});
   }
   const {error}=await supabase.from("media_submissions").insert(rows);if(error)throw error;feedback.textContent=rows.length+" média(s) ajouté(s).";form.reset();render();
  }catch(error){feedback.textContent=error.message||"Erreur d’envoi.";}finally{button.disabled=false;}
 });
 return;
}
if(active==="tours"){content.innerHTML=tourForm()+table(data,cfg.cols);document.getElementById("tourForm").addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget),p=Object.fromEntries(f);p.price_from=p.price_from?Number(p.price_from):null;const {error}=await supabase.from("tours").insert(p);if(error)alert(error.message);else render();});return;}
content.innerHTML="<h2>"+cfg.title+"</h2>"+table(data,cfg.cols);}
function tourForm(){return '<h2>Circuits</h2><form id="tourForm" class="admin-grid"><label>Titre<input name="title" required></label><label>Identifiant URL<input name="slug" required></label><label>Lieu<input name="location" value="Bénin"></label><label>Durée<input name="duration"></label><label>Prix à partir de (FCFA)<input name="price_from" type="number" min="0"></label><label>Image (URL)<input name="cover_image" type="url"></label><label>Résumé<textarea name="summary"></textarea></label><label>Statut<select name="status"><option value="draft">Brouillon</option><option value="published">Publié</option></select></label><button class="button">Ajouter le circuit</button></form>';}
function table(rows,cols){if(!rows.length)return "<p>Aucun élément pour le moment.</p>";return '<div style="overflow:auto"><table class="admin-table"><thead><tr>'+cols.map(c=>"<th>"+esc(c)+"</th>").join("")+"<th>Actions</th></tr></thead><tbody>"+rows.map(row=>"<tr>"+cols.map(c=>c==="audio_path"?(row.audio_url?`<td><audio controls preload="none" src="${esc(row.audio_url)}"></audio></td>`:"<td>—</td>"):"<td>"+esc(row[c]??"—")+"</td>").join("")+"<td>"+(active==="tours"?'<button data-edit-tour="'+row.id+'">Modifier</button>':"")+(row.status?'<select data-status="'+row.id+'">'+(statuses[active]||[]).map(s=>'<option value="'+s+'" '+(row.status===s?"selected":"")+'>'+s+"</option>").join("")+' </select><button data-save="'+row.id+'">Enregistrer</button>':"")+"</td></tr>").join("")+"</tbody></table></div>";}
function esc(v){if(v===true)return "Oui";if(v===false)return "Non";return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
content.addEventListener("click",async e=>{
 const edit=e.target.closest("[data-edit-tour]");
 if(edit){const id=edit.dataset.editTour;const {data,error}=await supabase.from("tours").select("*").eq("id",id).single();if(error){alert(error.message);return;}const title=prompt("Titre",data.title);if(title===null)return;const summary=prompt("Résumé",data.summary);if(summary===null)return;const price=prompt("Prix de départ en FCFA (vide = sur devis)",data.price_from??"");if(price===null)return;const image=prompt("URL de l'image",data.cover_image??"");if(image===null)return;const {error:updateError}=await supabase.from("tours").update({title,summary,price_from:price===""?null:Number(price),cover_image:image||null}).eq("id",id);if(updateError)alert(updateError.message);else render();return;}
 const b=e.target.closest("[data-save]");if(!b)return;const id=b.dataset.save,status=content.querySelector('[data-status="'+id+'"]').value;let extra={};
 if(active==="media"&&status==="approved"){const {data:row,error:readError}=await supabase.from("media_submissions").select("*").eq("id",id).single();if(readError){alert(readError.message);return;}if(row.consent_publication!==true){alert("Publication impossible : aucune autorisation de publication n’a été donnée.");render();return;}const {data:file,error:downloadError}=await supabase.storage.from("afa-submissions").download(row.object_path);if(downloadError){alert(downloadError.message);return;}const ext=row.object_path.split(".").pop();const publicPath="visitor/"+id+"."+ext;const {error:uploadError}=await supabase.storage.from("afa-public-media").upload(publicPath,file,{upsert:true});if(uploadError){alert(uploadError.message);return;}const {data:publicData}=supabase.storage.from("afa-public-media").getPublicUrl(publicPath);const {error:galleryError}=await supabase.from("public_media").insert({display_name:row.display_name,caption:row.caption,media_type:row.media_type,public_url:publicData.publicUrl});if(galleryError){alert(galleryError.message);return;}extra={object_path:publicPath};}
 const {error}=await supabase.from(config[active].table).update({status,...extra,...(active==="reviews"&&status==="approved"?{published_at:new Date().toISOString()}: {})}).eq("id",id);if(error)alert(error.message);else render();
});
const {data:{session}}=await supabase.auth.getSession();if(session)await init();
