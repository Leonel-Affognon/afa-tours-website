import { supabase } from "./backend.js";
const root=document.getElementById("afa-media-gallery");
if(root){
 const mode=root.dataset.mode||"gallery";
 const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const safeUrl=v=>{try{const u=new URL(v);return ["https:","http:"].includes(u.protocol)?u.href:""}catch{return ""}};
 const mediaType=(type,url)=>String(type||"").toLowerCase().includes("video")||/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(url)?"video":"image";
 const asMedia=(url,title,type)=>{const src=safeUrl(url);return src?{url:src,title:title||"",type:mediaType(type,src)}:null};
 let albums=[];
 function album(title,description,items,category="Album"){const clean=items.filter(Boolean);if(clean.length)albums.push({title:title||"Album AFA TOURS",description:description||"",items:clean,category});}
 async function load(){
  try{
   if(mode==="experiences"){
    const {data,error}=await supabase.from("tours").select("id,title,summary,description,location,cover_image,gallery,content_type").eq("status","published").eq("content_type","experience").order("sort_order");
    if(error)throw error;
    (data||[]).forEach(t=>{const items=[asMedia(t.cover_image,t.title,"image"),...(Array.isArray(t.gallery)?t.gallery.map((u,i)=>asMedia(u,t.title+" — "+(i+1))):[])];album(t.title,t.summary||t.description||t.location,items,"Expérience");});
   }else{
    const [media,tours,destinations]=await Promise.all([
     supabase.from("public_media").select("id,display_name,caption,media_type,public_url,published_at").order("published_at",{ascending:false}).limit(150),
     supabase.from("tours").select("id,title,location,cover_image,gallery,content_type").eq("status","published").order("sort_order").limit(100),
     supabase.from("destinations").select("id,name,region,cover_image,gallery").eq("status","published").order("sort_order").limit(100)
    ]);
    if(media.error)console.warn("AFA public media:",media.error);
    const grouped=new Map();
    (media.data||[]).forEach(m=>{const item=asMedia(m.public_url,m.caption||m.display_name,m.media_type);if(!item)return;const name=(m.display_name||"Moments AFA").trim();if(!grouped.has(name))grouped.set(name,[]);grouped.get(name).push(item);});
    grouped.forEach((items,title)=>album(title,items[0]?.title||"Moments partagés avec AFA TOURS",items,"Album photo & vidéo"));
    (tours.data||[]).forEach(t=>{const items=[asMedia(t.cover_image,t.title,"image"),...(Array.isArray(t.gallery)?t.gallery.map((u,i)=>asMedia(u,t.title+" — "+(i+1))):[])];album(t.title+" · "+(t.location||"Bénin"),"Découvrez les images de cette expérience touristique.",items,t.content_type==="experience"?"Expérience":"Circuit");});
    (destinations.data||[]).forEach(d=>{const items=[asMedia(d.cover_image,d.name,"image"),...(Array.isArray(d.gallery)?d.gallery.map((u,i)=>asMedia(u,d.name+" — "+(i+1))):[])];album(d.name+" · "+(d.region||"Bénin"),"Explorez cette destination en images.",items,"Destination");});
   }
   render();
  }catch(error){console.error("AFA media gallery:",error);root.innerHTML='<div class="afa-media-empty">La galerie ne peut pas être chargée pour le moment. Veuillez réessayer plus tard.</div>';}
 }
 let gridColumns=window.matchMedia("(max-width:600px)").matches?1:window.matchMedia("(max-width:900px)").matches?2:3;
 function changeGrid(delta,filter="Tous"){const min=window.matchMedia("(max-width:600px)").matches?1:2;const max=window.matchMedia("(max-width:600px)").matches?3:5;gridColumns=Math.max(min,Math.min(max,gridColumns+delta));render(filter);}
 function render(filter="Tous"){
  const filtered=albums.filter(a=>filter==="Tous"||a.category===filter||(filter==="Vidéos"&&a.items.some(x=>x.type==="video"))||(filter==="Photos"&&a.items.some(x=>x.type==="image")));
  const filters=mode==="experiences"?["Tous","Expérience"]:["Tous","Photos","Vidéos","Album photo & vidéo","Circuit","Destination","Expérience"];
  root.innerHTML='<div class="afa-media-toolbar" role="group" aria-label="Filtrer les albums">'+filters.map(f=>'<button type="button" class="afa-media-filter" data-filter="'+esc(f)+'" aria-pressed="'+(f===filter)+'">'+esc(f)+'</button>').join("")+'</div><div class="afa-grid-tools" role="group" aria-label="Taille des albums"><span>Affichage</span><button type="button" data-grid-out aria-label="Afficher moins d’albums par ligne">−</button><button type="button" data-grid-in aria-label="Afficher plus d’albums par ligne">+</button></div><div class="afa-album-grid" style="--afa-grid-columns:'+gridColumns+'">'+filtered.map((a,i)=>{const preview=a.items.slice(0,4);const pics=preview.map((m,j)=>m.type==="video"?'<div style="position:relative;min-width:0;min-height:0"><video src="'+esc(m.url)+'#t=0.1" muted playsinline preload="metadata"></video><span class="afa-album-play">▶</span></div>':'<img class="'+(preview.length===1?"afa-cover-single":"")+'" src="'+esc(m.url)+'" alt="'+esc(a.title)+'" loading="lazy" decoding="async">').join("");return '<article class="afa-album-card" tabindex="0" role="button" data-album="'+i+'" aria-label="Ouvrir l’album '+esc(a.title)+'"><div class="afa-album-cover">'+pics+'<span class="afa-album-count">'+a.items.length+' média'+(a.items.length>1?"s":"")+'</span></div><div class="afa-album-copy"><small>'+esc(a.category)+'</small><h3>'+esc(a.title)+'</h3><p>'+esc(a.description||"Voir les photos et vidéos de cet album.")+'</p></div></article>'}).join("")+'</div>';
  if(!filtered.length)root.querySelector(".afa-album-grid").innerHTML='<div class="afa-media-empty">Aucun album dans cette catégorie pour le moment.</div>';
  root.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>render(b.dataset.filter)));
  root.querySelector("[data-grid-out]")?.addEventListener("click",()=>changeGrid(-1,filter));
  root.querySelector("[data-grid-in]")?.addEventListener("click",()=>changeGrid(1,filter));
  const grid=root.querySelector(".afa-album-grid");
  let gridPinchStart=0,gridPinchColumns=gridColumns;
  grid?.addEventListener("touchstart",e=>{if(e.touches.length===2){gridPinchStart=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);gridPinchColumns=gridColumns;}},{passive:true});
  grid?.addEventListener("touchmove",e=>{if(e.touches.length===2&&gridPinchStart){const distance=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);if(Math.abs(distance-gridPinchStart)>55){changeGrid(distance>gridPinchStart?1:-1,filter);gridPinchStart=0;}}},{passive:true});
  grid?.addEventListener("touchend",()=>{gridPinchStart=0;},{passive:true});
  root.querySelectorAll("[data-album]").forEach(card=>{const open=()=>openAlbum(filtered[Number(card.dataset.album)]);card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});});
 }
 let lightbox=null,currentItems=[],index=0,scale=1,pointerStart=null,pinchStart=0,pinchScale=1;
 function buildLightbox(){
  if(lightbox)return;
  lightbox=document.createElement("div");lightbox.className="afa-lightbox";lightbox.setAttribute("role","dialog");lightbox.setAttribute("aria-modal","true");lightbox.setAttribute("aria-label","Visionneuse de médias");
  lightbox.innerHTML='<div class="afa-lightbox-top"><div class="afa-lightbox-title"></div><div class="afa-lightbox-actions"><button class="afa-lightbox-btn" data-zoom-out aria-label="Dézoomer">−</button><button class="afa-lightbox-btn" data-zoom-in aria-label="Zoomer">+</button><button class="afa-lightbox-btn" data-full aria-label="Plein écran">⛶</button><button class="afa-lightbox-btn" data-close aria-label="Fermer">×</button></div></div><div class="afa-lightbox-stage"><button class="afa-lightbox-nav afa-lightbox-prev" aria-label="Précédent">‹</button><div class="afa-lightbox-content"></div><button class="afa-lightbox-nav afa-lightbox-next" aria-label="Suivant">›</button></div><div class="afa-lightbox-caption"></div><div class="afa-lightbox-counter"></div><div class="afa-lightbox-thumbs"></div>';
  document.body.append(lightbox);
  lightbox.querySelector("[data-close]").onclick=closeLightbox;
  lightbox.querySelector(".afa-lightbox-prev").onclick=()=>show(index-1);
  lightbox.querySelector(".afa-lightbox-next").onclick=()=>show(index+1);
  lightbox.querySelector("[data-zoom-in]").onclick=()=>setZoom(scale+.35);
  lightbox.querySelector("[data-zoom-out]").onclick=()=>setZoom(scale-.35);
  lightbox.querySelector("[data-full]").onclick=()=>{const el=lightbox.querySelector(".afa-lightbox-stage");if(!document.fullscreenElement)el.requestFullscreen?.();else document.exitFullscreen?.();};
  lightbox.addEventListener("wheel",e=>{if(currentItems[index]?.type!=="image")return;e.preventDefault();setZoom(scale+(e.deltaY<0?.12:-.12));},{passive:false});
  const stage=lightbox.querySelector(".afa-lightbox-stage");
  stage.addEventListener("pointerdown",e=>{pointerStart={x:e.clientX,y:e.clientY,id:e.pointerId};});
  stage.addEventListener("pointerup",e=>{if(!pointerStart)return;const dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)&&scale<=1.05)show(index+(dx<0?1:-1));pointerStart=null;});
  stage.addEventListener("touchstart",e=>{if(e.touches.length===2){pinchStart=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);pinchScale=scale;}},{passive:true});
  stage.addEventListener("touchmove",e=>{if(e.touches.length===2&&pinchStart){e.preventDefault();setZoom(pinchScale*Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)/pinchStart);}}, {passive:false});
  stage.addEventListener("touchend",()=>{pinchStart=0;},{passive:true});
  document.addEventListener("keydown",e=>{if(!lightbox?.classList.contains("is-open"))return;if(e.key==="Escape")closeLightbox();if(e.key==="ArrowRight")show(index+1);if(e.key==="ArrowLeft")show(index-1);if(e.key==="+")setZoom(scale+.25);if(e.key==="-")setZoom(scale-.25);});
 }
 function openAlbum(a){if(!a)return;buildLightbox();currentItems=a.items;index=0;lightbox.querySelector(".afa-lightbox-title").textContent=a.title;lightbox.classList.add("is-open");document.body.style.overflow="hidden";show(0);}
 function closeLightbox(){if(!lightbox)return;lightbox.classList.remove("is-open");lightbox.querySelector(".afa-lightbox-content").innerHTML="";document.body.style.overflow="";scale=1;}
 function setZoom(next){scale=Math.min(4,Math.max(1,next));const media=lightbox?.querySelector(".afa-lightbox-media");if(media&&currentItems[index]?.type==="image")media.style.transform="scale("+scale+")";}
 function show(next){if(!currentItems.length)return;index=(next+currentItems.length)%currentItems.length;scale=1;const item=currentItems[index],content=lightbox.querySelector(".afa-lightbox-content");content.innerHTML="";let media;if(item.type==="video"){media=document.createElement("video");media.src=item.url;media.controls=true;media.autoplay=true;media.playsInline=true;media.className="afa-lightbox-media is-video";}else{media=document.createElement("img");media.src=item.url;media.alt=item.title||"Photo AFA TOURS";media.draggable=false;media.className="afa-lightbox-media";}content.append(media);lightbox.querySelector(".afa-lightbox-caption").textContent=item.title||"";lightbox.querySelector(".afa-lightbox-counter").textContent=(index+1)+" / "+currentItems.length;lightbox.querySelectorAll(".afa-lightbox-nav").forEach(b=>b.style.display=currentItems.length>1?"":"none");lightbox.querySelector("[data-zoom-in]").style.display=item.type==="image"?"":"none";lightbox.querySelector("[data-zoom-out]").style.display=item.type==="image"?"":"none";lightbox.querySelector(".afa-lightbox-thumbs").innerHTML=currentItems.map((m,i)=>'<button type="button" style="padding:0;border:0;background:none" data-thumb="'+i+'" aria-label="Afficher le média '+(i+1)+'"><img class="afa-lightbox-thumb" src="'+esc(m.url)+'" alt="" aria-current="'+(i===index)+'"></button>').join("");lightbox.querySelectorAll("[data-thumb]").forEach(b=>b.onclick=()=>show(Number(b.dataset.thumb)));}
 load();
}
