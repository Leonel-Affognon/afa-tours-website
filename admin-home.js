// Accueil de l'administration : chiffres clés, tâches du jour, raccourcis
import {keep} from "./admin-site.js";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export const renderHome=(content,supabase,go)=>keep(content,()=>home(content,supabase,go));
async function home(content,supabase,go){
 content.innerHTML="<h2>Accueil</h2><p>Chargement…</p>";
 const cnt=async(t,f)=>{let q=supabase.from(t).select("id",{count:"exact",head:true});if(f)q=f(q);const {count}=await q;return count||0};
 const m0=new Date();m0.setDate(1);const mi=m0.toISOString().slice(0,10);
 const [nb,nm,nr,nmed,items,vm]=await Promise.all([
  cnt("bookings",q=>q.eq("status","new")),cnt("messages",q=>q.eq("status","new")),cnt("reviews",q=>q.eq("status","pending")),cnt("media_submissions",q=>q.eq("status","pending")),
  supabase.from("site_items").select("kind,status").then(r=>r.data||[]),cnt("visits",q=>q.gte("visit_date",mi))]);
 const on=(k)=>items.filter(i=>i.kind===k&&i.status==="published").length,tot=k=>items.filter(i=>i.kind===k).length;
 const todo=[[nb,"nouvelle(s) réservation(s)","bookings"],[nm,"nouveau(x) message(s)","messages"],[nr,"avis à valider","reviews"],[nmed,"photo(s) ou vidéo(s) à valider","media"]].filter(x=>x[0]);
 const SITE=[["circuit","Circuits et excursions","k:circuit"],["sejour","Séjours","k:sejour"],["event","Événements et festivals","k:event"],["blog","Articles du blog","k:blog"],["partner","Partenaires","k:partner"],["team","Équipe","k:team"]];
 content.innerHTML='<div class="ad-head"><div><h2>Bienvenue</h2><p class="ad-intro">Voici l’essentiel. Tout ce que vous enregistrez ici et que vous <b>affichez</b> apparaît sur le site. Ce qui n’est pas enregistré n’est pas montré aux visiteurs.</p></div></div>'+
 '<h3 class="sx-h">À traiter</h3>'+(todo.length?'<div class="hm-todo">'+todo.map(x=>'<button type="button" class="hm-t" data-go="'+x[2]+'"><b>'+x[0]+"</b><span>"+x[1]+"</span></button>").join("")+"</div>":'<div class="ad-empty"><b>Tout est à jour.</b><p>Aucune réservation, message, avis ou photo en attente.</p></div>')+
 '<h3 class="sx-h">Ajouter rapidement</h3><div class="hm-quick">'+[["k:circuit","+ Circuit"],["k:sejour","+ Séjour"],["k:event","+ Événement"],["k:blog","+ Article"],["visits","+ Visite"]].map(x=>'<button type="button" class="sx-btn pri" data-go="'+x[0]+'" data-add="1">'+x[1]+"</button>").join("")+"</div>"+
 '<h3 class="sx-h">Ce que les visiteurs voient sur le site</h3><div class="hm-site">'+SITE.map(x=>{const a=on(x[0]),t=tot(x[0]);return '<button type="button" class="hm-s" data-go="'+x[2]+'"><b>'+a+'</b><span>'+x[1]+'</span><small>'+(t===0?"rien d’enregistré · section cachée":a===0?"tout est masqué · section cachée":a+" affiché"+(a>1?"s":"")+(t>a?" · "+(t-a)+" masqué"+(t-a>1?"s":""):""))+"</small></button>"}).join("")+'<button type="button" class="hm-s" data-go="visits"><b>'+vm+'</b><span>Visites ce mois-ci</span><small>ouvrir le suivi</small></button></div>'+
 '<h3 class="sx-h">Comment ça marche</h3><ol class="hm-how"><li><b>Choisissez une rubrique</b> dans le menu à gauche (sur téléphone : bouton « Menu »).</li><li><b>Cliquez sur « + Ajouter »</b>, remplissez le formulaire en français. L’anglais se prépare en un clic.</li><li><b>Enregistrez</b> : si « Afficher sur le site » est coché, c’est en ligne. Pour retirer, cliquez sur « Masquer ».</li></ol>';
 content.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go,{add:!!b.dataset.add}));
}
