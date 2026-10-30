import { supabase, submitIntake } from "./backend.js";

const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const form = event.currentTarget;
    const button = form.querySelector('[type="submit"]');
    const original = button.textContent;
    const data = new FormData(form);
    button.disabled = true; button.textContent = "Envoi en cours…";
    try {
      const result = await submitIntake({
        action: "booking",
        request_type: data.get("bookingType") === "Demander un circuit personnalisé" ? "custom_trip" : "existing_tour",
        full_name: data.get("name"), email: data.get("email"),
        preferred_date: data.get("date"), party_size: Number(data.get("people") || 1),
        tour_name: data.get("tour"), message: data.get("message")
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
  e.preventDefault();const f=new FormData(reviewForm),button=reviewForm.querySelector("button"),note=document.getElementById("reviewFeedback");button.disabled=true;note.hidden=false;note.textContent="Envoi en cours…";
  try{await submitIntake({action:"review",full_name:f.get("full_name"),email:f.get("email"),rating:Number(f.get("rating")),tour_name:f.get("tour_name"),body:f.get("body")});reviewForm.reset();note.textContent="Merci. Votre avis a été reçu et sera publié après modération.";}
  catch(err){note.textContent=err.message;}finally{button.disabled=false;}
});
const mediaForm=document.getElementById("mediaForm");
if(mediaForm) mediaForm.addEventListener("submit",async e=>{
  e.preventDefault();const f=new FormData(mediaForm),file=f.get("media"),button=mediaForm.querySelector("button"),note=document.getElementById("mediaFeedback");note.hidden=false;
  if(!file||!file.size){note.textContent="Choisissez un fichier.";return;}
  const allowed=["image/jpeg","image/png","image/webp","video/mp4","video/webm"];
  const max=file.type.startsWith("video/")?50*1024*1024:10*1024*1024;
  if(!allowed.includes(file.type)||file.size>max){note.textContent="Format non accepté ou fichier trop volumineux (10 Mo pour une image, 50 Mo pour une vidéo).";return;}
  button.disabled=true;note.textContent="Téléversement sécurisé…";
  try{
    const ext=file.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g,"");
    const path="incoming/"+crypto.randomUUID()+"."+ext;
    const {error:uploadError}=await supabase.storage.from("afa-submissions").upload(path,file,{contentType:file.type,upsert:false});
    if(uploadError)throw uploadError;
    await submitIntake({action:"media",full_name:f.get("full_name"),email:f.get("email"),caption:f.get("caption"),object_path:path,media_type:file.type.startsWith("video/")?"video":"image",consent_publication:f.get("consent_publication")==="on",consent_marketing:f.get("consent_marketing")==="on"});
    mediaForm.reset();note.textContent="Votre média a été reçu. Il restera privé jusqu'à sa validation.";
  }catch(err){note.textContent=err.message||"Impossible d'envoyer le fichier.";}finally{button.disabled=false;}
});
async function loadReviews(){
  const target=document.getElementById("publishedReviews");if(!target)return;
  const {data,error}=await supabase.from("reviews").select("display_name,country,rating,title,body,tour_name,published_at").eq("status","approved").order("published_at",{ascending:false}).limit(12);
  if(error||!data?.length)return;
  target.innerHTML=data.map(r=>`<article class="review-card"><div class="review-stars" aria-label="${r.rating} sur 5">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div><h3>${escapeHtml(r.title||r.tour_name||"Expérience au Bénin")}</h3><p>${escapeHtml(r.body)}</p><small>${escapeHtml(r.display_name)}${r.country?" · "+escapeHtml(r.country):""}</small></article>`).join("");
}
loadReviews();
