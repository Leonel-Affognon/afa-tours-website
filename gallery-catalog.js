import { supabase } from "./backend.js";
const grid=document.querySelector(".destination-grid-section .destination-grid");
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeUrl=v=>{try{const u=new URL(v);return ["https:","http:"].includes(u.protocol)?u.href:"";}catch{return "";}};
async function loadGallery(){
 if(!grid)return;
 const [media,tours,destinations]=await Promise.all([
  supabase.from("public_media").select("id,display_name,caption,media_type,public_url,published_at").order("published_at",{ascending:false}).limit(60),
  supabase.from("tours").select("id,title,location,cover_image,gallery,content_type").eq("status","published").order("sort_order").limit(60),
  supabase.from("destinations").select("id,name,region,cover_image,gallery").eq("status","published").order("sort_order").limit(60)
 ]);
 if(media.error)console.warn("AFA public media:",media.error);
 const items=[];
 (media.data||[]).forEach(m=>{const url=safeUrl(m.public_url);if(url)items.push({url,title:m.caption||m.display_name||"Galerie AFA TOURS",type:m.media_type||"image"});});
 (tours.data||[]).forEach(t=>{const cover=safeUrl(t.cover_image);if(cover)items.push({url:cover,title:t.title+" — "+(t.location||"Bénin"),type:"image"});(Array.isArray(t.gallery)?t.gallery:[]).forEach(url=>{const safe=safeUrl(url);if(safe)items.push({url:safe,title:t.title+" — Galerie",type:"image"});});});
 (destinations.data||[]).forEach(d=>{const cover=safeUrl(d.cover_image);if(cover)items.push({url:cover,title:d.name+" — "+(d.region||"Bénin"),type:"image"});(Array.isArray(d.gallery)?d.gallery:[]).forEach(url=>{const safe=safeUrl(url);if(safe)items.push({url:safe,title:d.name+" — Galerie",type:"image"});});});
 const unique=[...new Map(items.map(x=>[x.url,x])).values()].slice(0,60);
 if(!unique.length)return;
 grid.innerHTML=unique.map((m,i)=>'<article class="destination-card reveal"><a class="destination-image" href="'+esc(m.url)+'" target="_blank" rel="noopener" aria-label="Ouvrir '+esc(m.title)+'"><span>'+String(i+1).padStart(2,"0")+'</span>'+(m.type==="video"?'<video src="'+esc(m.url)+'" muted playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0"></video>':'<img src="'+esc(m.url)+'" alt="'+esc(m.title)+'" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">')+'</a><div class="destination-copy"><p class="eyebrow">AFA TOURS · BÉNIN</p><h2>'+esc(m.title)+'</h2><p>Découvrez ce lieu et préparez votre visite avec notre équipe.</p><a class="text-link" href="contact.html#booking">Préparer ma visite <span>↗</span></a></div></article>').join("");
}
loadGallery();