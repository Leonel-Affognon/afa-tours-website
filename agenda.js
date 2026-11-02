import { supabase } from "./backend.js";
const root=document.getElementById("agendaGrid");
const safeHttpUrl=value=>{try{const url=new URL(value);return ["https:","http:"].includes(url.protocol)?url.href:"";}catch{return "";}};
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fallbackVodun={
 id:"vodun-days-2027-fallback",slug:"vodun-days-2027",title:"Vodun Days 2027 – Ouidah",
 summary:"Du 2 au 9 janvier 2027, vivez les Vodun Days à Ouidah avec AFA TOURS : accompagnement, découverte du patrimoine et formules adaptées à votre séjour.",
 description:"Les Vodun Days reviennent à Ouidah du 2 au 9 janvier 2027.",
 location:"Ouidah, Bénin",country:"Bénin",city:"Ouidah",duration:"Du 2 au 9 janvier 2027",
 price_from:25000,ticket_price:null,currency:"XOF",
 cover_image:"https://www.gouv.bj/upload/images/albums/802360682082001736762573.jpg",
 gallery:["https://www.gouv.bj/upload/images/albums/037610193924001736715700.jpg","https://vodundays.bj/wp-content/uploads/2024/11/Ceremonie.jpg"],
 video_url:"https://www.youtube.com/playlist?list=PL6nGRnf5v3jg5ByAAlBgMpCKWi743C2HC",
 pricing_options:[
 {name:"Découverte – 1 journée",duration:"1 jour",price:25000,currency:"XOF",description:"Accompagnement AFA TOURS sur une journée, selon programme et disponibilité."},
 {name:"Immersion – 2 jours",duration:"2 jours",price:45000,currency:"XOF",description:"Accompagnement AFA TOURS sur deux journées."},
 {name:"Expérience complète – 7 jours",duration:"7 jours",price:120000,currency:"XOF",description:"Formule d’accompagnement sur sept jours pendant le festival."},
 {name:"VIP – 7 jours",duration:"7 jours",price:200000,currency:"XOF",description:"Formule premium sur sept jours, prestations exactes à confirmer dans le devis."}
 ],
 event_start_date:"2027-01-02",event_end_date:"2027-01-09",organizer:"Organisateurs officiels des Vodun Days",
 booking_mode:"request",registration_url:"https://vodundays.bj/",
 contact_whatsapp:"",content_type:"festival",
 itinerary:"Temps forts publics du festival, animations culturelles, village Vodun Days et découverte du patrimoine de Ouidah. Le programme détaillé 2027 sera confirmé à sa publication officielle.",
 inclusions:"Accompagnement et coordination AFA TOURS selon la formule choisie.",
 exclusions:"Billets officiels, transport longue distance, hébergement, repas et dépenses personnelles sauf mention au devis.",
 meeting_point:"Ouidah – point de rendez-vous communiqué après confirmation"
};
const currencyButton=(amount,currency="XOF")=>'<span class="afa-price-currency" data-price-currency data-amount="'+Number(amount)+'" data-base="'+esc(currency)+'"><button type="button" class="afa-price-currency-button" data-price-currency-toggle aria-expanded="false">Voir dans ma monnaie</button><span class="afa-price-currency-panel" data-currency-panel hidden><span class="afa-price-currency-value" data-currency-output="EUR">EUR : chargement…</span><span class="afa-price-currency-value" data-currency-output="USD">USD : chargement…</span><select aria-label="Choisir une autre devise" data-currency-select><option value="">Autre monnaie…</option></select><span class="afa-price-currency-value" data-currency-custom hidden></span><small data-currency-date>Taux indicatifs</small></span></span>';
async function loadAgenda(){ if(!root)return;
 let data=[];
 try {
  const result=await Promise.race([
   supabase.from("tours").select("id,slug,title,summary,description,location,country,city,duration,price_from,ticket_price,currency,cover_image,gallery,video_url,pricing_options,event_start_date,event_end_date,organizer,booking_mode,registration_url,contact_whatsapp,content_type,itinerary,inclusions,exclusions,meeting_point").eq("status","published").in("content_type",["festival","event"]).order("event_start_date",{ascending:true,nullsFirst:false}),
   new Promise((_,reject)=>setTimeout(()=>reject(new Error("Agenda request timed out")),12000))
  ]);
  if(result.error)throw result.error;
  data=result.data||[];
 } catch(error) {
  console.error("AFA agenda database unavailable; rendering built-in event fallback:",error);
  data=[fallbackVodun];
 }
 if(!data.length)data=[fallbackVodun];
 root.innerHTML=data.map(item=>{
  const type=item.content_type==="festival"?"Festival":"Événement";
  const date=item.event_start_date?new Date(item.event_start_date+"T12:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}):"Date à confirmer";
  const end=item.event_end_date&&item.event_end_date!==item.event_start_date?" – "+new Date(item.event_end_date+"T12:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}):"";
  const externalUrl=safeHttpUrl(item.registration_url||"");
  const gallery=Array.isArray(item.gallery)?item.gallery.filter(x=>safeHttpUrl(x)).slice(0,8):[];
  const video=safeHttpUrl(item.video_url||"");
  let videoId=null,playlistId=null;
  if(video){try{const videoUrl=new URL(video);if(videoUrl.hostname==="youtu.be")videoId=videoUrl.pathname.split("/").filter(Boolean)[0]||null;else if(videoUrl.hostname.endsWith("youtube.com")){videoId=videoUrl.searchParams.get("v")||(videoUrl.pathname.startsWith("/embed/")?videoUrl.pathname.split("/")[2]:null);playlistId=videoUrl.searchParams.get("list");}}catch(e){}}
  let vimeoId=null, directVideo=false;
  if(video){try{const mediaUrl=new URL(video);if(mediaUrl.hostname==="vimeo.com"||mediaUrl.hostname==="www.vimeo.com")vimeoId=mediaUrl.pathname.split("/").filter(Boolean)[0]||null;directVideo=[".mp4",".webm"].some(ext=>mediaUrl.pathname.toLowerCase().endsWith(ext));}catch(e){}}
  const videoEmbed=videoId?`<div class="agenda-video"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}" title="Vidéo ${esc(item.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`:playlistId?`<div class="agenda-video"><iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(playlistId)}" title="Vidéos officielles ${esc(item.title)}" loading="lazy" allowfullscreen></iframe></div>`:directVideo?`<div class="agenda-video"><video controls playsinline preload="metadata" src="${esc(video)}"></video></div>`:vimeoId?`<div class="agenda-video"><iframe src="https://player.vimeo.com/video/${encodeURIComponent(vimeoId)}" title="Vidéo ${esc(item.title)}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`:"";
  const pricing=Array.isArray(item.pricing_options)?item.pricing_options:[];
  const priceCards=pricing.length?'<div class="agenda-pricing"><h4>Formules AFA TOURS</h4><div class="agenda-price-grid">'+pricing.map(p=>{const base=Number(p.price||0),currency=p.currency||"XOF";return '<div class="agenda-price"><b>'+esc(p.name||"Formule")+'</b><strong>'+base.toLocaleString("fr-FR")+' '+esc(currency)+' '+currencyButton(base,currency)+'</strong><small>'+esc(p.duration||"")+'</small><p>'+esc(p.description||"")+'</p><a class="text-link" href="contact.html?content='+encodeURIComponent(item.slug)+'&formula='+encodeURIComponent(p.name||"")+'#booking">Demander cette formule ↗</a></div>';}).join("")+'</div><small>Tarifs proposés par AFA TOURS, hors billets officiels et prestations non précisées. Les équivalents sont indicatifs et dépendent du taux de change.</small></div>':"";
  const galleryHtml=gallery.length?`<div class="agenda-gallery">${gallery.map((url,i)=>`<figure><a href="${esc(url)}" target="_blank" rel="noopener"><img src="${esc(url)}" alt="${esc(item.title)} – photo ${i+1}" loading="lazy" decoding="async"></a><figcaption>Photo d’une édition précédente · Source : ${url.includes("gouv.bj")?"Gouvernement du Bénin":"Vodun Days"}</figcaption></figure>`).join("")}</div>`:"";
  const officialLinks=`<div class="agenda-official-links"><a href="https://vodundays.bj/galerie/" target="_blank" rel="noopener">Galerie officielle des éditions précédentes ↗</a><a href="https://vodundays.bj/programme-vue-densemble/" target="_blank" rel="noopener">Programme officiel ↗</a><a href="https://boutique.vodundays.bj/tickets" target="_blank" rel="noopener">Billetterie officielle ↗</a></div>`;
  const action=item.booking_mode==="external"&&externalUrl?'<a class="button" href="'+esc(externalUrl)+'" target="_blank" rel="noopener">S’inscrire ↗</a>':item.booking_mode==="information"?"":'<a class="button" href="contact.html?content='+encodeURIComponent(item.slug)+'#booking">Demander des informations ↗</a>';
  return '<article class="tour-card"><div class="tour-image" style="'+(safeHttpUrl(item.cover_image||'')?'background-image:url(&quot;'+esc(safeHttpUrl(item.cover_image))+'&quot;)':"")+'"><span class="image-label">'+type.toUpperCase()+'</span></div><div class="tour-info"><div class="tour-meta">'+type.toUpperCase()+' · '+esc(date+end)+'</div><h3>'+esc(item.title)+'</h3><p>'+esc(item.summary||item.description)+'</p><p>'+esc(item.city||item.location||"")+' · '+esc(item.country||"Bénin")+'</p>'+(item.organizer?'<p>Organisé par '+esc(item.organizer)+'</p>':"")+(item.meeting_point?'<p><strong>Rendez-vous :</strong> '+esc(item.meeting_point)+'</p>':"")+(item.itinerary?'<details class="agenda-details"><summary>Programme et informations pratiques</summary><p>'+esc(item.itinerary).replace(/\n/g,"<br>")+"</p>"+(item.inclusions?'<p><strong>Inclus :</strong> '+esc(item.inclusions)+"</p>":"")+(item.exclusions?'<p><strong>Non inclus :</strong> '+esc(item.exclusions)+"</p>":"")+"</details>":"")+(item.ticket_price!==null&&item.ticket_price!==undefined?'<p>Participation officielle : '+Number(item.ticket_price).toLocaleString("fr-FR")+' '+esc(item.currency||"XOF")+' '+currencyButton(item.ticket_price,item.currency||"XOF")+'</p>':"")+priceCards+videoEmbed+galleryHtml+officialLinks+action+'</div></article>';
 }).join("");
}
loadAgenda();
