import { supabase } from "./backend.js";
const root=document.getElementById("agendaGrid");
const safeHttpUrl=value=>{try{const url=new URL(value);return ["https:","http:"].includes(url.protocol)?url.href:"";}catch{return "";}};
const tr=s=>window.AFA_TEXT?window.AFA_TEXT(s):s;
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fallbackVodun={
 id:"vodun-days-2027-fallback",slug:"vodun-days-2027",title:"Vodun Days 2027 – Ouidah",
 summary:"Du 2 au 9 janvier 2027, vivez les Vodun Days à Ouidah avec AFA TOURS : accompagnement, découverte du patrimoine et formules adaptées à votre séjour.",
 description:"Les Vodun Days reviennent à Ouidah du 2 au 9 janvier 2027.",
 location:"Ouidah, Bénin",country:"Bénin",city:"Ouidah",duration:"Du 2 au 9 janvier 2027",
 price_from:25000,ticket_price:null,currency:"XOF",
 cover_image:"https://www.gouv.bj/upload/images/albums/802360682082001736762573.jpg",
 gallery:["https://www.gouv.bj/upload/images/albums/037610193924001736715700.jpg","https://vodundays.bj/wp-content/uploads/2024/11/Ceremonie.jpg"],
 video_url:null,
 pricing_options:[
 {name:"Découverte – 1 journée",duration:"1 jour",price:25000,currency:"XOF",description:"Accompagnement AFA TOURS sur une journée, selon programme et disponibilité."},
 {name:"Immersion – 2 jours",duration:"2 jours",price:45000,currency:"XOF",description:"Accompagnement AFA TOURS sur deux journées."},
 {name:"Expérience complète – 7 jours",duration:"7 jours",price:120000,currency:"XOF",description:"Formule d’accompagnement sur sept jours pendant le festival."},
 {name:"VIP – 7 jours",duration:"7 jours",price:200000,currency:"XOF",description:"Formule premium sur sept jours, prestations exactes à confirmer dans le devis."}
 ],
 event_start_date:"2027-01-02",event_end_date:"2027-01-09",organizer:"Organisateurs officiels des Vodun Days",
 booking_mode:"request",registration_url:null,
 contact_whatsapp:"",content_type:"festival",
 itinerary:"Temps forts publics du festival, animations culturelles, village Vodun Days et découverte du patrimoine de Ouidah. Le programme détaillé 2027 sera confirmé à sa publication officielle.",
 inclusions:"Accompagnement et coordination AFA TOURS selon la formule choisie.",
 exclusions:"Billets officiels, transport longue distance, hébergement, repas et dépenses personnelles sauf mention au devis.",
 meeting_point:"Ouidah – point de rendez-vous communiqué après confirmation"
};
const currencyButton=(amount,currency="XOF")=>'<span class="afa-price-currency" data-price-currency data-amount="'+Number(amount)+'" data-base="'+esc(currency)+'"><button type="button" class="afa-price-currency-button" data-price-currency-toggle aria-expanded="false">Voir dans ma monnaie</button><span class="afa-price-currency-panel" data-currency-panel hidden><span class="afa-price-currency-value" data-currency-output="EUR">EUR : chargement…</span><span class="afa-price-currency-value" data-currency-output="USD">USD : chargement…</span><select aria-label="Choisir une autre devise" data-currency-select><option value="">Autre monnaie…</option></select><span class="afa-price-currency-value" data-currency-custom hidden></span><small data-currency-date>Taux indicatifs</small></span></span>';
async function loadAgenda(){
 if(!root)return;
 let data=[];
 try{
  const result=await Promise.race([
   supabase.from("tours").select("id,slug,title,summary,description,location,country,city,duration,price_from,ticket_price,currency,cover_image,gallery,video_url,pricing_options,event_start_date,event_end_date,organizer,booking_mode,content_type,itinerary,inclusions,exclusions,meeting_point,translations").eq("status","published").in("content_type",["festival","event"]).order("event_start_date",{ascending:true,nullsFirst:false}),
   new Promise((_,reject)=>setTimeout(()=>reject(new Error("timeout")),8000))
  ]);
  if(result.error)throw result.error;
  data=result.data||[];
 }catch(error){console.warn("Agenda fallback",error);data=[fallbackVodun];}
 if(!data.length)data=[fallbackVodun];
 root.innerHTML=data.map(item=>{
  const tr=window.AFA_TRANSLATE?window.AFA_TRANSLATE(item,["title","summary","description","itinerary","inclusions","exclusions"]):item;const title=esc(tr.title),slug=encodeURIComponent(item.slug||"festival");
  const date=item.event_start_date?new Date(item.event_start_date+"T12:00:00").toLocaleDateString(({fr:"fr-FR",en:"en-GB",de:"de-DE",es:"es-ES",pt:"pt-PT"})[window.AFA_LANGUAGE]||"fr-FR",{day:"numeric",month:"long",year:"numeric"}):"Dates à confirmer";
  const end=item.event_end_date?new Date(item.event_end_date+"T12:00:00").toLocaleDateString(({fr:"fr-FR",en:"en-GB",de:"de-DE",es:"es-ES",pt:"pt-PT"})[window.AFA_LANGUAGE]||"fr-FR",{day:"numeric",month:"long",year:"numeric"}):"";
  const cover=safeHttpUrl(item.cover_image||"");
  const photos=Array.isArray(item.gallery)?item.gallery.filter(x=>safeHttpUrl(x)).slice(0,6):[];
  const video=safeHttpUrl(item.video_url||"");
  const direct=video&&/\.(mp4|webm)(?:[?#]|$)/i.test(new URL(video).pathname);
  const videoBlock=direct?'<section class="festival-film"><div><p class="section-kicker">EN VIDÉO</p><h3>'+esc(tr("Un aperçu du festival"))+'</h3><p>'+esc(tr("Découvrez l’ambiance des éditions précédentes."))+'</p></div><video controls playsinline preload="metadata" poster="'+esc(cover)+'"><source src="'+esc(video)+'">Votre navigateur ne prend pas en charge la vidéo.</video></section>':"";
  const prices=Array.isArray(item.pricing_options)?item.pricing_options:[];
  const packages=prices.length?'<section class="festival-packages"><p class="section-kicker">'+esc(tr("NOS FORMULES"))+'</p><h3>'+esc(tr("Choisissez votre expérience"))+'</h3><div class="festival-package-grid">'+prices.map((p,i)=>'<article class="festival-package"><span class="package-index">0'+(i+1)+'</span><h4>'+esc(tr(p.name||"Formule"))+'</h4><p class="package-duration">'+esc(p.duration||"")+'</p><p>'+esc(p.description||"")+'</p><p class="package-price">'+Number(p.price||0).toLocaleString("fr-FR")+' '+esc(p.currency||"XOF")+' '+currencyButton(p.price,p.currency||"XOF")+'</p><a class="button" href="contact.html?event='+slug+'&formula='+encodeURIComponent(p.name||"")+'#booking">'+esc(tr("Réserver chez AFA TOURS"))+'</a></article>').join("")+'</div><p class="festival-note">Tarifs des prestations AFA TOURS. Nous confirmons avec vous le programme et les prestations avant validation.</p></section>':"";
  const gallery=photos.length?'<section class="festival-gallery"><p class="section-kicker">'+esc(tr("EN IMAGES"))+'</p><h3>'+esc(tr("Souvenirs des éditions précédentes"))+'</h3><div class="festival-photo-grid">'+photos.map((url,i)=>'<figure><img src="'+esc(url)+'" alt="'+title+' – photo '+(i+1)+'" loading="lazy" decoding="async"><figcaption>'+esc(tr("Édition précédente"))+'</figcaption></figure>').join("")+'</div></section>':"";
  const itinerary=esc(tr.itinerary||tr.description||"");
  const inclusions=esc(tr.inclusions||"");
  const exclusions=esc(tr.exclusions||"");
  return '<article class="festival-feature"><div class="festival-cover" style="'+(cover?'background-image:url(&quot;'+esc(cover)+'&quot;)':"")+'"><div class="festival-cover-shade"></div><div class="festival-cover-copy"><span class="festival-tag">'+esc(tr("FESTIVAL · OUIDAH"))+'</span><h2>'+title+'</h2><p>'+esc(tr.summary||"")+'</p><div class="festival-dates">'+esc(date)+(end?" — "+esc(end):"")+'</div><a class="button" href="contact.html?event='+slug+'#booking">'+esc(tr("Organiser mon séjour avec AFA TOURS"))+'</a></div></div><div class="festival-body"><section class="festival-intro"><p class="section-kicker">'+esc(tr("VOTRE RENDEZ-VOUS CULTUREL"))+'</p><h3>'+esc(tr("Vivez Ouidah au rythme du Vodun"))+'</h3><p>'+esc(tr.description||tr.summary||"")+'</p><div class="festival-facts"><span><b>'+esc(tr("Lieu"))+'</b> Ouidah, Bénin</span><span><b>'+esc(tr("Dates"))+'</b> '+esc(date)+(end?" – "+esc(end):"")+'</span><span><b>'+esc(tr("Organisation"))+'</b> AFA TOURS</span></div></section>'+videoBlock+packages+'<section class="festival-practical"><div><p class="section-kicker">'+esc(tr("INFORMATIONS PRATIQUES"))+'</p><h3>'+esc(tr("Préparez votre visite"))+'</h3><p>'+itinerary+'</p></div><div><h4>'+esc(tr("Inclus"))+'</h4><p>'+inclusions+'</p><h4>'+esc(tr("Non inclus"))+'</h4><p>'+exclusions+'</p><p><b>'+esc(tr("Rendez-vous :"))+'</b> '+esc(item.meeting_point||"Ouidah, point communiqué après confirmation")+'</p></div></section>'+gallery+'<section class="festival-final-cta"><h3>'+esc(tr("Vous souhaitez participer ?"))+'</h3><p>'+esc(tr("Contactez directement AFA TOURS pour choisir votre formule et organiser votre réservation."))+'</p><a class="button" href="contact.html?event='+slug+'#booking">'+esc(tr("Faire ma réservation"))+'</a></section></div></article>';
 }).join("");
}
loadAgenda();
