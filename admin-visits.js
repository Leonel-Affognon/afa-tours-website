// Suivi des visites de l'agence : saisie, bilan par période, export
import {keep,toast} from "./admin-site.js";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const iso=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const money=n=>Math.round(n||0).toLocaleString("fr-FR").replace(/ /g," ")+" FCFA";
function range(p,from,to){
 const n=new Date(),t=new Date(n.getFullYear(),n.getMonth(),n.getDate());
 if(p==="week"){const d=(t.getDay()+6)%7,s=new Date(t);s.setDate(t.getDate()-d);const e=new Date(s);e.setDate(s.getDate()+6);return [iso(s),iso(e),"Cette semaine"]}
 if(p==="month")return [iso(new Date(n.getFullYear(),n.getMonth(),1)),iso(new Date(n.getFullYear(),n.getMonth()+1,0)),"Ce mois-ci"];
 if(p==="year")return [n.getFullYear()+"-01-01",n.getFullYear()+"-12-31","Cette année"];
 if(p==="all")return ["0000-01-01","9999-12-31","Depuis le début"];
 return [from||"0000-01-01",to||"9999-12-31","Période choisie"];
}
export const renderVisits=(content,supabase,st={})=>keep(content,()=>visits(content,supabase,st));
async function visits(content,supabase,st){
 st.p=st.p||"month";
 content.innerHTML="<h2>Visites</h2><p>Chargement…</p>";
 const {data:all,error}=await supabase.from("visits").select("*").order("visit_date",{ascending:false}).limit(2000);
 if(error){content.innerHTML="<h2>Visites</h2><p>"+esc(error.message)+"</p>";return}
 const [a,b,label]=range(st.p,st.from,st.to);
 const rows=all.filter(r=>r.visit_date>=a&&r.visit_date<=b);
 const sum=(f)=>rows.reduce((s,r)=>s+Number(f(r)||0),0);
 const inc=sum(r=>r.income_xof),exp=sum(r=>r.expenses_xof),pax=sum(r=>r.pax);
 const group=(fn)=>{const m={};rows.forEach(r=>{const k=fn(r)||"Non précisé";m[k]=m[k]||{n:0,pax:0,inc:0};m[k].n++;m[k].pax+=r.pax||0;m[k].inc+=Number(r.income_xof||0)-Number(r.expenses_xof||0)});return Object.entries(m).sort((x,y)=>y[1].n-x[1].n)};
 const tbl=(title,g)=>g.length?'<div class="vs-box"><h4>'+title+'</h4>'+g.slice(0,10).map(([k,v])=>'<div class="vs-r"><span>'+esc(k)+'</span><b>'+v.n+' visite'+(v.n>1?"s":"")+' · '+v.pax+' pers.</b></div>').join("")+"</div>":"";
 const P=[["week","Semaine"],["month","Mois"],["year","Année"],["all","Tout"],["custom","Période…"]];
 const dow=d=>new Date(d+"T00:00:00").toLocaleDateString("fr-FR",{weekday:"short",day:"2-digit",month:"short",year:"numeric"});
 content.innerHTML='<div class="ad-head"><div><h2>Visites de l’agence</h2><p class="ad-intro">Notez chaque visite faite avec des clients. Choisissez ensuite une période pour faire le point : semaine, mois, année ou dates libres.</p></div><button class="sx-btn pri big" type="button" id="vs-new">+ Noter une visite</button></div>'+
 '<div class="vs-per">'+P.map(x=>'<button type="button" data-p="'+x[0]+'" class="'+(st.p===x[0]?"on":"")+'">'+x[1]+"</button>").join("")+'</div>'+
 (st.p==="custom"?'<div class="vs-cu"><label>Du<input type="date" id="vs-f" value="'+esc(st.from||"")+'"></label><label>Au<input type="date" id="vs-t" value="'+esc(st.to||"")+'"></label><button class="sx-btn pri" type="button" id="vs-go">Afficher</button></div>':"")+
 '<p class="vs-lab"><b>'+label+"</b>"+(st.p!=="all"?" · du "+dow(a)+" au "+dow(b):"")+'</p>'+
 '<div class="booking-stats"><div><span>Visites</span><strong>'+rows.length+'</strong></div><div><span>Personnes accueillies</span><strong>'+pax+'</strong></div><div><span>Recettes</span><strong class="vs-m">'+money(inc)+'</strong></div><div><span>Résultat (recettes − dépenses)</span><strong class="vs-m">'+money(inc-exp)+'</strong></div></div>'+
 '<section class="sx-form" id="vs-wrap" hidden><div class="ad-fh"><h3 class="sx-h" id="vs-title">Noter une visite</h3><button type="button" class="sx-btn" id="vs-close">Fermer</button></div><form id="vs-f2"><input type="hidden" name="id"><div class="ad-grid"><label>Date<input name="visit_date" type="date" required></label><label>Circuit ou lieu visité<input name="tour" required list="vs-tours" placeholder="Ex. Ganvié"></label><datalist id="vs-tours">'+[...new Set(all.map(r=>r.tour).filter(Boolean))].map(t=>'<option value="'+esc(t)+'">').join("")+'</datalist><label>Client ou groupe<input name="client" placeholder="Ex. Famille Martin"></label><label>Nombre de personnes<input name="pax" type="number" min="1" value="1"></label><label>Guide<input name="guide" list="vs-guides" placeholder="Qui a accompagné ?"></label><datalist id="vs-guides">'+[...new Set(all.map(r=>r.guide).filter(Boolean))].map(t=>'<option value="'+esc(t)+'">').join("")+'</datalist><label>Comment le client nous a connus<input name="source" placeholder="Facebook, bouche à oreille…"></label><label>Recette encaissée (FCFA)<input name="income_xof" type="number" min="0" step="500" value="0"></label><label>Dépenses (FCFA)<input name="expenses_xof" type="number" min="0" step="500" value="0"></label><label class="wide">Remarques<textarea name="notes" rows="3"></textarea></label></div><p class="sx-msg" id="vs-msg" aria-live="polite"></p><div class="sx-bar"><button class="sx-btn pri big" type="submit">Enregistrer la visite</button></div></form></section>'+
 '<div class="vs-grid">'+tbl("Par circuit ou lieu",group(r=>r.tour))+tbl("Par guide",group(r=>r.guide))+tbl("Par provenance",group(r=>r.source))+"</div>"+
 '<div class="ad-head" style="margin-top:22px"><h3 class="sx-h">Visites de la période ('+rows.length+')</h3><button class="sx-btn" type="button" id="vs-csv"'+(rows.length?"":" disabled")+'>Télécharger (Excel/CSV)</button></div>'+
 '<div class="ad-list">'+(rows.length?rows.map(r=>'<article class="ad-item"><div class="ad-it"><b>'+esc(r.tour||"Visite")+'</b><small>'+dow(r.visit_date)+" · "+r.pax+" pers."+(r.guide?" · guide "+esc(r.guide):"")+(r.client?" · "+esc(r.client):"")+'</small><small>Recette '+money(r.income_xof)+" · dépenses "+money(r.expenses_xof)+"</small>"+(r.notes?'<small>'+esc(r.notes)+"</small>":"")+'</div><div class="sx-act"><button class="sx-btn" data-e="'+r.id+'" type="button">Modifier</button><button class="sx-btn dg" data-d="'+r.id+'" type="button">Supprimer</button></div></article>').join(""):'<div class="ad-empty"><b>Aucune visite sur cette période.</b><p>Cliquez sur « + Noter une visite » après chaque sortie avec des clients.</p></div>')+"</div>";
 const form=content.querySelector("#vs-f2"),wrap=content.querySelector("#vs-wrap"),msg=content.querySelector("#vs-msg");
 const open=t=>{wrap.hidden=false;content.querySelector("#vs-title").textContent=t;wrap.scrollIntoView({behavior:"smooth",block:"start"})};
 content.querySelector("#vs-new").onclick=()=>{form.reset();form.elements.id.value="";form.elements.visit_date.value=iso(new Date());msg.textContent="";open("Noter une visite")};
 content.querySelector("#vs-close").onclick=()=>{wrap.hidden=true};
 content.querySelectorAll("[data-p]").forEach(x=>x.onclick=()=>visits(content,supabase,{...st,p:x.dataset.p}));
 const go=content.querySelector("#vs-go");if(go)go.onclick=()=>visits(content,supabase,{p:"custom",from:content.querySelector("#vs-f").value,to:content.querySelector("#vs-t").value});
 content.querySelectorAll("[data-e]").forEach(x=>x.onclick=()=>{const r=all.find(y=>y.id===x.dataset.e);form.reset();form.elements.id.value=r.id;["visit_date","tour","client","pax","guide","source","income_xof","expenses_xof","notes"].forEach(k=>form.elements[k].value=r[k]??"");open("Modifier la visite")});
 content.querySelectorAll("[data-d]").forEach(x=>x.onclick=async()=>{if(!confirm("Supprimer cette visite ?"))return;const {error}=await supabase.from("visits").delete().eq("id",x.dataset.d);if(error){toast(error.message,1);return}toast("Visite supprimée");visits(content,supabase,st)});
 content.querySelector("#vs-csv").onclick=()=>{const H=["Date","Circuit ou lieu","Client","Personnes","Guide","Provenance","Recette FCFA","Dépenses FCFA","Remarques"],q=v=>'"'+String(v??"").replace(/"/g,'""')+'"';const csv="﻿"+[H.map(q).join(";")].concat(rows.map(r=>[r.visit_date,r.tour,r.client,r.pax,r.guide,r.source,r.income_xof,r.expenses_xof,r.notes].map(q).join(";"))).join("\r\n");const l=document.createElement("a");l.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));l.download="visites-afa-tours-"+a+"-"+b+".csv";document.body.appendChild(l);l.click();l.remove()};
 form.onsubmit=async e=>{e.preventDefault();const f=form.elements,id=f.id.value,row={visit_date:f.visit_date.value,tour:f.tour.value.trim(),client:f.client.value.trim(),pax:Math.max(1,+f.pax.value||1),guide:f.guide.value.trim(),source:f.source.value.trim(),income_xof:+f.income_xof.value||0,expenses_xof:+f.expenses_xof.value||0,notes:f.notes.value.trim()};msg.textContent="Enregistrement…";const r=id?await supabase.from("visits").update(row).eq("id",id):await supabase.from("visits").insert(row);if(r.error){msg.textContent=r.error.message;return}toast("Visite enregistrée");visits(content,supabase,st)};
}
