import { supabase } from "./backend.js";
const grid=document.querySelector(".destination-grid-section .destination-grid");
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl=v=>{try{const u=new URL(v);return ["https:","http:"].includes(u.protocol)?u.href:"";}catch{return "";}};
async function loadCircuits(){
 if(!grid)return;
 const {data,error}=await supabase.from("tours").select("id,slug,title,summary,description,location,country,duration,price_from,currency,cover_image,itinerary,inclusions,exclusions,translations,destination:destinations(name)").eq("status","published").eq("content_type","tour").not("slug","in", '("porto-novo-patrimoine","adjarra-au-fil-de-leau")').order("sort_order");
 if(error){console.error("AFA circuits:",error);return;}
 if(!data?.length)return;
 grid.innerHTML=data.map((t,i)=>{const tr=window.AFA_TRANSLATE?window.AFA_TRANSLATE(t,["title","summary","description","itinerary"]):t;const image=safeUrl(t.cover_image);const destination=t.destination?.name||t.location||"Bénin";const price=t.price_from?Number(t.price_from).toLocaleString("fr-FR")+" "+esc(t.currency||"XOF"):"Tarif sur demande";return '<article class="destination-card reveal" id="'+esc(t.slug)+'"><a class="destination-image" href="contact.html?content='+encodeURIComponent(t.slug)+'#booking"><span>'+String(i+1).padStart(2,"0")+'</span>'+(image?'<img src="'+esc(image)+'" alt="'+esc(tr.title+" — "+destination)+'" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">':'')+'</a><div class="destination-copy"><p class="eyebrow">'+esc(destination.toUpperCase())+' · CIRCUIT AFA</p><h2>'+esc(tr.title)+'</h2><p>'+esc(tr.description||tr.summary||"")+'</p>'+(t.itinerary?'<p><strong>Étapes : </strong>'+esc(tr.itinerary)+'</p>':'')+'<p><strong>Durée indicative : </strong>'+esc(t.duration||"À confirmer")+'</p><p><strong>Tarif : </strong>'+price+'</p><a class="text-link" href="contact.html?content='+encodeURIComponent(t.slug)+'#booking">Demander ce circuit <span>↗</span></a></div></article>';}).join("");
}
loadCircuits();