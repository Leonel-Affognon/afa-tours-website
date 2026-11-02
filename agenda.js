import { supabase } from "./backend.js";
const root=document.getElementById("agendaGrid");
const safeHttpUrl=value=>{try{const url=new URL(value);return ["https:","http:"].includes(url.protocol)?url.href:"";}catch{return "";}};
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
async function loadAgenda(){
 if(!root)return;
 root.innerHTML="<p>Chargement de l’agenda…</p>";
 const {data,error}=await supabase.from("tours").select("id,slug,title,summary,description,location,country,city,duration,price_from,ticket_price,currency,cover_image,event_start_date,event_end_date,organizer,booking_mode,registration_url,contact_whatsapp,content_type").eq("status","published").in("content_type",["festival","event"]).order("event_start_date",{ascending:true,nullsFirst:false});
 if(error){root.innerHTML="<p>Impossible de charger l’agenda pour le moment.</p>";return;}
 if(!data?.length){root.innerHTML="<p>Les prochaines dates et manifestations seront annoncées ici. Revenez bientôt.</p>";return;}
 root.innerHTML=data.map(item=>{
  const type=item.content_type==="festival"?"Festival":"Événement";
  const date=item.event_start_date?new Date(item.event_start_date+"T12:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}):"Date à confirmer";
  const end=item.event_end_date&&item.event_end_date!==item.event_start_date?" – "+new Date(item.event_end_date+"T12:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"}):"";
  const externalUrl=safeHttpUrl(item.registration_url||"");
  const action=item.booking_mode==="external"&&externalUrl?'<a class="button" href="'+esc(externalUrl)+'" target="_blank" rel="noopener">S’inscrire ↗</a>':item.booking_mode==="information"?"":'<a class="button" href="contact.html?content='+encodeURIComponent(item.slug)+'#booking">Demander des informations ↗</a>';
  return '<article class="tour-card"><div class="tour-image" style="'+(safeHttpUrl(item.cover_image||'')?'background-image:url(&quot;'+esc(safeHttpUrl(item.cover_image))+'&quot;)':"")+'"><span class="image-label">'+type.toUpperCase()+'</span></div><div class="tour-info"><div class="tour-meta">'+type.toUpperCase()+' · '+esc(date+end)+'</div><h3>'+esc(item.title)+'</h3><p>'+esc(item.summary||item.description)+'</p><p>'+esc(item.city||item.location||"")+' · '+esc(item.country||"Bénin")+'</p>'+(item.organizer?'<p>Organisé par '+esc(item.organizer)+'</p>':"")+(item.ticket_price!==null&&item.ticket_price!==undefined?'<p>Participation : '+Number(item.ticket_price).toLocaleString("fr-FR")+' '+esc(item.currency||"XOF")+'</p>':"")+action+'</div></article>';
 }).join("");
}
loadAgenda();
