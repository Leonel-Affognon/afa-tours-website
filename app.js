import { supabase, submitIntake } from "./backend.js";

const bookingForm = document.getElementById("bookingForm");
const bookingType = document.getElementById("bookingType");
const budgetField = document.getElementById("budgetField");
function syncBudgetField() {
  if (!bookingType || !budgetField) return;
  const custom = bookingType.value === "Demander un circuit personnalisé";
  budgetField.hidden = !custom;
  if (!custom) budgetField.querySelector("input").value = "";
}
bookingType?.addEventListener("change", syncBudgetField);
syncBudgetField();
// Optional voice-note recorder for booking requests.
let voiceBlob=null,voiceMime="",voiceUrl="",voiceRecorder=null,voiceStream=null,voiceChunks=[],voiceSeconds=0,voiceInterval=null;
const recordBtn=document.getElementById("recordAudioButton"),stopBtn=document.getElementById("stopAudioButton"),discardBtn=document.getElementById("discardAudioButton"),audioPreview=document.getElementById("audioPreview"),audioStatus=document.getElementById("audioRecordStatus"),audioTimer=document.getElementById("audioTimer");
const voiceStatus=t=>{if(audioStatus)audioStatus.textContent=t;};
if(recordBtn&&navigator.mediaDevices?.getUserMedia&&window.MediaRecorder){recordBtn.onclick=async()=>{try{voiceStream=await navigator.mediaDevices.getUserMedia({audio:true});const types=["audio/webm;codecs=opus","audio/mp4","audio/ogg;codecs=opus","audio/webm"];voiceMime=types.find(t=>MediaRecorder.isTypeSupported(t))||"";voiceRecorder=new MediaRecorder(voiceStream,voiceMime?{mimeType:voiceMime}:{});voiceChunks=[];voiceSeconds=0;voiceRecorder.ondataavailable=x=>{if(x.data.size)voiceChunks.push(x.data);};voiceRecorder.onstop=()=>{voiceBlob=new Blob(voiceChunks,{type:voiceRecorder.mimeType||voiceMime||"audio/webm"});voiceMime=voiceBlob.type;voiceUrl=URL.createObjectURL(voiceBlob);audioPreview.src=voiceUrl;audioPreview.hidden=false;discardBtn.hidden=false;voiceStream?.getTracks().forEach(t=>t.stop());voiceStream=null;voiceStatus("Message vocal prêt.");};voiceRecorder.start();recordBtn.disabled=true;stopBtn.disabled=false;voiceStatus("Enregistrement en cours (3 minutes maximum).");voiceInterval=setInterval(()=>{voiceSeconds++;audioTimer.textContent=String(Math.floor(voiceSeconds/60)).padStart(2,"0")+":"+String(voiceSeconds%60).padStart(2,"0");if(voiceSeconds>=180)stopBtn.click();},1000);}catch(x){voiceStatus("Microphone indisponible ou autorisation refusée.");}};stopBtn.onclick=()=>{if(voiceRecorder?.state!=="inactive")voiceRecorder.stop();clearInterval(voiceInterval);recordBtn.disabled=false;stopBtn.disabled=true;};discardBtn.onclick=()=>{voiceBlob=null;if(voiceUrl)URL.revokeObjectURL(voiceUrl);voiceUrl="";audioPreview.removeAttribute("src");audioPreview.hidden=true;discardBtn.hidden=true;voiceStatus("Audio supprimé.");};}else if(recordBtn){recordBtn.disabled=true;voiceStatus("Enregistrement indisponible. Utilisez HTTPS et un navigateur récent.");}
if (bookingForm) {
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const form = event.currentTarget;
    const button = form.querySelector('[type="submit"]');
    const original = button.textContent;
    const data = new FormData(form);\n    let uploadedAudioPath=null;\n    if(voiceBlob){if(voiceBlob.size>50*1024*1024)throw new Error("Le fichier audio dépasse la limite de 50 Mo.");const ext=voiceMime.includes("mp4")?"m4a":voiceMime.includes("ogg")?"ogg":"webm";uploadedAudioPath="incoming/voice-"+crypto.randomUUID()+"."+ext;const {error:uploadError}=await supabase.storage.from("afa-submissions").upload(uploadedAudioPath,voiceBlob,{contentType:voiceMime,upsert:false});if(uploadError)throw new Error("Impossible de téléverser le message vocal : "+uploadError.message);}
    button.disabled = true; button.textContent = "Envoi en cours…";
    try {
      const result = await submitIntake({
        action: "booking",
        request_type: data.get("bookingType") === "Demander un circuit personnalisé" ? "custom_trip" : "existing_tour",
        full_name: data.get("name"), email: data.get("email"), phone: data.get("phone"), budget: data.get("bookingType") === "Demander un circuit personnalisé" ? data.get("budget") : null,
        preferred_date: data.get("date"), party_size: Number(data.get("people") || 1),
        tour_name: [...data.getAll("tours"), data.get("tour")].filter(Boolean).join(" | "), message: data.get("message"), audio_path: uploadedAudioPath, audio_mime_type: voiceBlob ? voiceMime : null
      });
      form.reset();
      const note = document.getElementById("bookingFeedback");
      note.textContent = "Demande enregistrée. Référence : " + result.reference + ". Notre équipe vous contactera.";
      note.hidden = false;
    } catch (error) {
      const note = document.getElementById("bookingFeedback");
      note.textContent = error.message + " Vous pouvez aussi nous joindre sur WhatsApp.";
      note.hidden = false;
    } finally { button.disabled = false; button.textContent = original; }
  }, true);
}

async function loadPublishedTours() {
  const grid = document.querySelector(".tour-grid");
  if (!grid) return;
  const { data, error } = await supabase.from("tours").select("id,slug,title,summary,location,duration,price_from,currency,cover_image,featured").eq("status","published").order("sort_order");
  if (error || !data?.length) return; // Keep editorial fallback cards until tours are added in the admin.
  grid.innerHTML = data.map(t => `
    <article class="tour-card">
      <div class="tour-image" style="${t.cover_image ? `background-image:url('${t.cover_image.replace(/'/g,"%27")}')` : ""}"><span class="image-label">${escapeHtml(t.location || "BÉNIN")}</span></div>
      <div class="tour-info"><div class="tour-meta">${escapeHtml(t.duration || "CIRCUIT AFA")}</div>
      <h3>${escapeHtml(t.title)}</h3><p>${escapeHtml(t.summary)}</p>
      ${t.price_from ? `<p class="tour-price">À partir de ${Number(t.price_from).toLocaleString("fr-FR")} ${escapeHtml(t.currency)}</p>` : ""}
      <a href="#booking" class="text-link dynamic-tour" data-tour="${escapeHtml(t.title)}">Demander les détails <span>↗</span></a></div></article>`).join("");
  grid.querySelectorAll(".dynamic-tour").forEach(a => a.addEventListener("click", () => {
    const select = document.getElementById("tourSelect");
    if (select && ![...select.options].some(o => o.value === a.dataset.tour)) {
      select.add(new Option(a.dataset.tour, a.dataset.tour));
    }
    if (select) select.value = a.dataset.tour;
  }));
}
function escapeHtml(v) { return String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
loadPublishedTours();

const reviewForm=document.getElementById("reviewForm");
if(reviewForm) reviewForm.addEventListener("submit",async e=>{
  e.preventDefault();const f=new FormData(reviewForm),button=reviewForm.querySelector(".review-submit"),note=document.getElementById("reviewFeedback");button.disabled=true;note.hidden=false;note.textContent="Envoi en cours…";
  const rating=Number(f.get("rating"));if(!rating){note.textContent="Choisissez une note en étoiles avant de publier.";button.disabled=false;return;}
  try{await submitIntake({action:"review",full_name:f.get("full_name"),email:f.get("email"),rating,title:f.get("title"),tour_name:f.get("tour_name"),body:f.get("body")});reviewForm.reset();document.getElementById("reviewRating").value="";setRating(0);reviewDialog.close();note.textContent="Merci. Votre avis a été reçu et sera publié après vérification.";note.hidden=false;}
  catch(err){note.textContent=err.message;}finally{button.disabled=false;}
});
const mediaForm=document.getElementById("mediaForm");
const mediaInput=mediaForm?.querySelector('input[name="media"]');
const mediaSelection=document.getElementById("mediaSelection");
mediaInput?.addEventListener("change",()=>{if(mediaSelection)mediaSelection.textContent=[...(mediaInput.files||[])].map(x=>x.name+" · "+(x.size/1048576).toFixed(1)+" Mo").join(" | ");});
if(mediaForm)mediaForm.addEventListener("submit",async e=>{
 e.preventDefault();const f=new FormData(mediaForm),files=[...(mediaInput?.files||[])],button=mediaForm.querySelector('button[type="submit"]'),note=document.getElementById("mediaFeedback");
 note.hidden=false;if(!files.length){note.textContent="Sélectionnez au moins un fichier.";return;}
 button.disabled=true;const uploaded=[];
 try{
  for(let i=0;i<files.length;i++){const file=files[i];if(!file.type.startsWith("image/")&&!file.type.startsWith("video/"))throw new Error(file.name+" n'est pas une photo ou une vidéo.");
   const ext=(file.name.split(".").pop()||"bin").toLowerCase().replace(/[^a-z0-9]/g,"")||"bin",path="incoming/"+crypto.randomUUID()+"."+ext;
   button.textContent="Envoi "+(i+1)+"/"+files.length+"…";note.textContent="Envoi des fichiers originaux. Ne fermez pas cette page.";
   const {error}=await supabase.storage.from("afa-submissions").upload(path,file,{contentType:file.type||"application/octet-stream",upsert:false});if(error)throw error;
   uploaded.push({object_path:path,media_type:file.type.startsWith("video/")?"video":"image"});
  }
  await submitIntake({action:"media",full_name:f.get("full_name"),email:f.get("email"),caption:f.get("caption"),media_files:uploaded,consent_publication:f.get("consent_publication")==="true",consent_marketing:f.get("consent_marketing")==="true"});
  mediaForm.reset();if(mediaSelection)mediaSelection.textContent="";note.textContent=uploaded.length+" fichier(s) reçu(s). Les originaux sont conservés en attente de validation.";
 }catch(err){note.textContent=err.message||"Erreur pendant l'envoi.";}finally{button.disabled=false;button.textContent="Envoyer mes médias";}
});
async function loadReviews(){
  const target=document.getElementById("publishedReviews");if(!target)return;
  const {data,error}=await supabase.from("reviews").select("display_name,country,rating,title,body,tour_name,published_at").eq("status","approved").order("published_at",{ascending:false}).limit(12);
  if(error||!data?.length)return;
  const average=data.reduce((sum,r)=>sum+Number(r.rating||0),0)/data.length;
  const avg=document.getElementById("averageRating"),stars=document.getElementById("averageStars"),count=document.getElementById("reviewCount");
  if(avg)avg.textContent=average.toFixed(1).replace(".",",")+"/5";
  if(stars){const rounded=Math.round(average);stars.textContent="★".repeat(rounded)+"☆".repeat(5-rounded);stars.setAttribute("aria-label","Note moyenne "+average.toFixed(1)+" sur 5");}
  if(count)count.textContent=data.length+" avis publié"+(data.length>1?"s":"");
  target.innerHTML=data.map(r=>`<article class="review-card"><div class="review-stars" aria-label="${r.rating} sur 5">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div><h3>${escapeHtml(r.title||r.tour_name||"Expérience au Bénin")}</h3><p>${escapeHtml(r.body)}</p><small>${escapeHtml(r.display_name)}${r.country?" · "+escapeHtml(r.country):""}</small></article>`).join("");
}
loadReviews();

async function loadVisitorMedia(){
 const target=document.querySelector(".gallery-grid");if(!target)return;
 const {data,error}=await supabase.from("public_media").select("display_name,caption,media_type,public_url,published_at").order("published_at",{ascending:false}).limit(12);
 if(error||!data?.length)return;
 target.innerHTML=data.map(m=>m.media_type==="video"
  ? `<a class="gallery-tile visitor-media" href="${escapeHtml(m.public_url)}" target="_blank" rel="noopener"><video src="${escapeHtml(m.public_url)}" muted playsinline preload="metadata"></video><span>${escapeHtml(m.caption||m.display_name)}</span></a>`
  : `<a class="gallery-tile visitor-media" href="${escapeHtml(m.public_url)}" target="_blank" rel="noopener" style="background-image:url('${escapeHtml(m.public_url)}')"><span>${escapeHtml(m.caption||m.display_name)}</span></a>`).join("");
}
loadVisitorMedia();

const contactForm=document.getElementById("contactForm");
if(contactForm)contactForm.addEventListener("submit",async e=>{
 e.preventDefault();const f=new FormData(contactForm),button=contactForm.querySelector("button"),note=document.getElementById("contactFeedback");button.disabled=true;note.hidden=false;note.textContent="Envoi en cours…";
 try{await submitIntake({action:"message",full_name:f.get("full_name"),email:f.get("email"),subject:f.get("subject"),body:f.get("body")});contactForm.reset();note.textContent="Message transmis à l'équipe AFA TOURS. Merci.";}
 catch(err){note.textContent=err.message;}finally{button.disabled=false;}
});

const reviewDialog=document.getElementById("reviewDialog");
const openReviewDialog=document.getElementById("openReviewDialog");
if(openReviewDialog&&reviewDialog)openReviewDialog.addEventListener("click",()=>reviewDialog.showModal());
document.getElementById("closeReviewDialog")?.addEventListener("click",()=>reviewDialog.close());
reviewDialog?.addEventListener("click",e=>{if(e.target===reviewDialog)reviewDialog.close();});
function setRating(value){
 document.getElementById("reviewRating").value=value||"";
 document.querySelectorAll(".rating-star").forEach(star=>{const active=Number(star.dataset.rating)<=value;star.classList.toggle("active",active);star.setAttribute("aria-pressed",String(active));});
}
document.querySelectorAll(".rating-star").forEach(star=>star.addEventListener("click",()=>setRating(Number(star.dataset.rating))));
