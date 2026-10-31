(() => {
 const catalog=window.AFA_TOUR_CATALOG||[];
 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const price=t=>t.priceValue?esc(t.price):"Tarif sur demande";
 const image=(t)=>'<div class="tour-image" style="background-image:url(\''+esc(t.image)+'\')"><span class="image-label">'+esc(t.destination.toUpperCase())+'</span></div>';
 const card=t=>'<article class="tour-card"><a class="tour-card-image-link" href="circuits.html#'+esc(t.id)+'" aria-label="Découvrir '+esc(t.title)+'">'+image(t)+'</a><div class="tour-info"><div class="tour-meta">'+esc(t.category)+'</div><h3>'+esc(t.title)+'</h3><p>'+esc(t.shortDescription)+'</p><p class="tour-facts"><strong>'+esc(t.duration)+'</strong><span>'+price(t)+'</span></p><a href="circuits.html#'+esc(t.id)+'" class="text-link">Découvrir ce circuit <span>↗</span></a></div></article>';
 const grid=document.querySelector(".tour-grid");
 if(grid){
  const featured=catalog.filter(t=>t.featured);
  grid.innerHTML=featured.map(card).join("")+'<article class="tour-card tour-custom-card"><div class="tour-image image-benin"><span class="image-label">SUR MESURE</span></div><div class="tour-info"><div class="tour-meta">ITINÉRAIRE PERSONNALISÉ</div><h3>Le Bénin selon vos envies</h3><p>Vous souhaitez combiner plusieurs régions ou créer un parcours différent ? Construisons ensemble votre itinéraire.</p><a href="destinations.html" class="text-link">Choisir mes destinations <span>↗</span></a></div></article>';
  const section=grid.closest(".tours-section");
  if(section&&!section.querySelector(".all-tours-link")){const p=document.createElement("p");p.className="all-tours-link";p.innerHTML='<a class="button button-light" href="circuits.html">Voir les 8 circuits signature ↗</a>';grid.insertAdjacentElement("afterend",p);}
  const note=section?.querySelector(".notice");if(note)note.textContent="Durées et tarifs affichés sur les fiches circuits. Les prix indiqués sont par personne ; les autres prestations sont précisées sur demande.";
 }
 const circuitGrid=document.querySelector("circuits.html .destination-grid");
 const isCircuitPage=document.title.toLowerCase().includes("circuits signature");
 const list=document.querySelector(".destination-grid-section .destination-grid");
 if(isCircuitPage&&list){
  list.innerHTML=catalog.map((t,i)=>'<article class="destination-card reveal" id="'+esc(t.id)+'"><a class="destination-image" href="contact.html?circuits='+encodeURIComponent(t.title)+'#booking" style="background-image:url(\''+esc(t.image)+'\')"><span>'+String(i+1).padStart(2,"0")+'</span></a><div class="destination-copy"><p class="eyebrow">'+esc(t.destination.toUpperCase())+' · '+esc(t.category)+'</p><h2>'+esc(t.title)+'</h2><p>'+esc(t.description)+'</p><p><strong>Étapes : </strong>'+esc(t.stops)+'</p><p><strong>Durée indicative : '+esc(t.duration)+'</strong></p><p><strong>Tarif : '+price(t)+'</strong></p><a class="text-link" href="contact.html?circuits='+encodeURIComponent(t.title)+'#booking">Demander ce circuit <span>↗</span></a></div></article>').join("");
 }
})();
