import { supabase } from "./backend.js";
const grid=document.querySelector(".destination-grid-section .destination-grid");
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl=v=>{try{const u=new URL(v);return ["https:","http:"].includes(u.protocol)?u.href:"";}catch{return "";}};
async function loadDestinations(){
 if(!grid)return;
 const {data,error}=await supabase.from("destinations").select("id,slug,name,country,region,summary,description,cover_image,gallery,status,sort_order,translations").eq("status","published").order("sort_order");
 if(error){console.error("AFA destinations:",error);return;}
 if(!data?.length)return;
 grid.innerHTML=data.map((d,i)=>{const tr=window.AFA_TRANSLATE?window.AFA_TRANSLATE(d,["name","summary","description"]):d;const image=safeUrl(d.cover_image);const alt=esc(tr.name+" — "+(d.country||"Bénin"));return '<article class="destination-card reveal"><a class="destination-image" href="contact.html?destination='+encodeURIComponent(tr.name)+'#booking"><span>'+String(i+1).padStart(2,"0")+'</span>'+(image?'<img src="'+esc(image)+'" alt="'+alt+'" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">':'')+'</a><div class="destination-copy"><p class="eyebrow">'+esc(d.region||d.country||"Bénin")+'</p><h2>'+esc(tr.name)+'</h2><p>'+esc(tr.summary||tr.description||"Découvrez cette destination avec AFA TOURS.")+'</p>'+(Array.isArray(d.gallery)&&d.gallery.length?'<div class="destination-mini-gallery" aria-label="Galerie de '+esc(tr.name)+'">'+d.gallery.slice(0,4).map((u,n)=>{const src=safeUrl(u);return src?'<img src="'+esc(src)+'" alt="'+esc(tr.name)+' — photo '+(n+1)+'" loading="lazy" decoding="async">':'';}).join('')+'</div>':'')+'<a class="text-link" href="contact.html?destination='+encodeURIComponent(tr.name)+'#booking">Préparer cette découverte <span>↗</span></a></div></article>';}).join("");
}
loadDestinations();