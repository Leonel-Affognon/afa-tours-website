// Messages, avis et réservations : cartes lisibles, suppression, sélection multiple
import {keep,toast} from "./admin-site.js";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const dt=v=>{const d=new Date(v);return isNaN(d)?"":d.toLocaleString("fr-FR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})};
const CFG={
 messages:{table:"messages",title:"Messages reçus",intro:"Les messages envoyés depuis le formulaire de contact.",status:[["new","Nouveau"],["read","Lu"],["replied","Répondu"],["closed","Clos"]],empty:"Aucun message pour le moment.",
  head:r=>r.subject||"Sans objet",who:r=>[r.full_name,r.email,r.phone].filter(Boolean).join(" · "),body:r=>r.body,
  reply:r=>r.phone?"https://wa.me/"+String(r.phone).replace(/\D/g,""):(r.email?"mailto:"+r.email:"")},
 reviews:{table:"reviews",title:"Avis des voyageurs",intro:"Validez les avis avant qu’ils apparaissent sur le site. Un avis « Approuvé » est visible, « Refusé » reste caché.",status:[["pending","À valider"],["approved","Approuvé"],["rejected","Refusé"]],empty:"Aucun avis pour le moment.",
  head:r=>"★".repeat(Math.max(0,Math.min(5,r.rating|0)))+" "+(r.title||""),who:r=>[r.display_name,r.country].filter(Boolean).join(" · "),body:r=>r.body}
};
export const bulkBar=(root,supabase,table,reload)=>{
 if(root.querySelector(".bk-bar"))return;
 const bar=document.createElement("div");bar.className="bk-bar";
 bar.innerHTML='<label class="bk-all"><input type="checkbox" data-all> Tout sélectionner</label><span class="bk-n" data-n>0 sélectionné</span><button type="button" class="sx-btn dg" data-bdel disabled>Supprimer la sélection</button>';
 root.prepend(bar);
 const upd=()=>{const n=root.querySelectorAll("[data-pick]:checked").length;bar.querySelector("[data-n]").textContent=n+" sélectionné"+(n>1?"s":"");bar.querySelector("[data-bdel]").disabled=!n};
 root.addEventListener("change",e=>{if(e.target.matches("[data-all]")){root.querySelectorAll("[data-pick]").forEach(c=>{if(!c.closest("[hidden]"))c.checked=e.target.checked});upd()}else if(e.target.matches("[data-pick]"))upd()});
 bar.querySelector("[data-bdel]").onclick=async()=>{const ids=[...root.querySelectorAll("[data-pick]:checked")].map(c=>c.dataset.pick);if(!ids.length||!confirm("Supprimer définitivement "+ids.length+" élément"+(ids.length>1?"s":"")+" ?"))return;const {error}=await supabase.from(table).delete().in("id",ids);if(error){toast("Suppression impossible : "+error.message,1);return}toast(ids.length+" supprimé"+(ids.length>1?"s":""));reload()}
};
export const renderInbox=(content,supabase,kind)=>keep(content,()=>inbox(content,supabase,kind));
async function inbox(content,supabase,kind){
 const C=CFG[kind];
 content.innerHTML="<h2>"+C.title+"</h2><p>Chargement…</p>";
 const {data:rows,error}=await supabase.from(C.table).select("*").order("created_at",{ascending:false}).limit(300);
 if(error){content.innerHTML="<h2>"+C.title+"</h2><p>"+esc(error.message)+"</p>";return}
 const cnt=s=>rows.filter(r=>r.status===s).length;
 content.innerHTML='<div class="ad-head"><div><h2>'+C.title+' <small>('+rows.length+')</small></h2><p class="ad-intro">'+C.intro+'</p></div><button class="sx-btn" type="button" id="ib-r">↻ Actualiser</button></div><div class="booking-tools"><input id="ib-s" type="search" placeholder="Rechercher…" aria-label="Rechercher"><div class="booking-filters"><button type="button" data-f="all" class="active">Tous ('+rows.length+')</button>'+C.status.map(s=>'<button type="button" data-f="'+s[0]+'">'+s[1]+" ("+cnt(s[0])+")</button>").join("")+'</div></div><div id="ib-l" class="ad-list">'+(rows.length?rows.map(r=>{const st=r.status||C.status[0][0],rp=C.reply?C.reply(r):"";return '<article class="ad-item ib" data-st="'+esc(st)+'" data-q="'+esc((C.head(r)+" "+C.who(r)+" "+C.body(r)).toLowerCase())+'"><label class="bk-pick"><input type="checkbox" data-pick="'+r.id+'" aria-label="Sélectionner"></label><div class="ad-it"><b>'+esc(C.head(r))+'</b><small>'+esc(C.who(r))+" · "+dt(r.created_at)+'</small><p class="ib-b">'+esc(C.body(r))+'</p></div><div class="sx-act"><select data-s="'+r.id+'" aria-label="Statut">'+C.status.map(s=>'<option value="'+s[0]+'"'+(s[0]===st?" selected":"")+">"+s[1]+"</option>").join("")+'</select>'+(rp?'<a class="sx-btn" target="_blank" rel="noopener" href="'+esc(rp)+'">Répondre</a>':"")+'<button class="sx-btn dg" type="button" data-d="'+r.id+'">Supprimer</button></div></article>'}).join(""):'<div class="ad-empty"><b>'+C.empty+"</b></div>")+"</div>";
 const L=content.querySelector("#ib-l");let f="all";
 const apply=()=>{const q=content.querySelector("#ib-s").value.trim().toLowerCase();L.querySelectorAll(".ib").forEach(el=>{el.hidden=(f!=="all"&&el.dataset.st!==f)||(q&&!el.dataset.q.includes(q))})};
 content.querySelector("#ib-s").oninput=apply;
 content.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{f=b.dataset.f;content.querySelectorAll("[data-f]").forEach(x=>x.classList.toggle("active",x===b));apply()});
 content.querySelector("#ib-r").onclick=()=>inbox(content,supabase,kind);
 L.querySelectorAll("[data-s]").forEach(s=>s.onchange=async()=>{const {error}=await supabase.from(C.table).update({status:s.value}).eq("id",s.dataset.s);if(error){toast(error.message,1);return}s.closest(".ib").dataset.st=s.value;toast("Statut enregistré")});
 L.querySelectorAll("[data-d]").forEach(b=>b.onclick=async()=>{if(!confirm("Supprimer définitivement cet élément ?"))return;const {error}=await supabase.from(C.table).delete().eq("id",b.dataset.d);if(error){toast(error.message,1);return}toast("Supprimé");inbox(content,supabase,kind)});
 if(rows.length)bulkBar(L,supabase,C.table,()=>inbox(content,supabase,kind));
}
