(() => {
 const KEY="afa-selected-circuits",catalog=window.AFA_TOUR_CATALOG||[];
 const cards=[...document.querySelectorAll(".destination-card")].filter(card=>card.querySelector(".destination-copy h2"));
 const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return []}};
 const save=list=>{try{localStorage.setItem(KEY,JSON.stringify([...new Set(list)]))}catch(e){}};
 let selected=read();
 const bar=document.createElement("aside");bar.className="circuit-selection-bar";bar.setAttribute("aria-live","polite");bar.innerHTML='<div class="circuit-selection-summary"><strong class="circuit-selection-count"></strong><span class="circuit-selection-names"></span></div><a class="button" href="contact.html#booking">Continuer ma demande ↗</a>';document.body.append(bar);
 const update=()=>{
  bar.querySelector(".circuit-selection-count").textContent=selected.length+" circuit"+(selected.length>1?"s":"")+" sélectionné"+(selected.length>1?"s":"");
  bar.querySelector(".circuit-selection-names").textContent=selected.length?selected.join(" · "):"Choisissez une destination pour voir les circuits disponibles";
  bar.querySelector("a").href=selected.length?"contact.html?circuits="+encodeURIComponent(selected.join("|"))+"#booking":"contact.html#booking";bar.classList.toggle("has-selection",selected.length>0);
  document.querySelectorAll("[data-circuit-pick]").forEach(btn=>{const on=selected.includes(btn.dataset.circuitPick);btn.textContent=on?"Retirer de ma sélection":"Ajouter à ma sélection";btn.classList.toggle("is-selected",on);btn.setAttribute("aria-pressed",String(on));});
 };
 cards.forEach(card=>{
  const name=card.querySelector(".destination-copy h2")?.textContent.trim(),link=card.querySelector(".destination-copy .text-link");if(!name||!link)return;
  const tours=catalog.filter(t=>t.destination===name);
  const button=document.createElement("button");button.type="button";button.className="text-link circuit-pick destination-open";button.textContent=tours.length?"Voir le circuit associé":"Créer un itinéraire sur mesure";
  const panel=document.createElement("div");panel.className="destination-circuit-panel";panel.hidden=true;
  panel.innerHTML=tours.length?tours.map(t=>'<article class="destination-circuit-option"><div><strong>'+t.title+'</strong><p>'+t.shortDescription+'</p><small>'+t.duration+' · '+t.price+'</small><p><a class="text-link" href="circuits.html#'+t.id+'">Voir la fiche complète ↗</a></p></div><button type="button" class="circuit-pick" data-circuit-pick="'+t.title.replace(/"/g,"&quot;")+'">Ajouter à ma sélection</button></article>').join(""):'<p class="form-hint">Nous pouvons concevoir une visite sur mesure dans cette destination.</p><a class="text-link" href="contact.html?destination='+encodeURIComponent(name)+'#booking">Demander un itinéraire personnalisé ↗</a>';
  button.addEventListener("click",()=>{panel.hidden=!panel.hidden;button.textContent=panel.hidden?(tours.length?"Voir le circuit associé":"Créer un itinéraire sur mesure"):"Masquer les propositions";});
  link.addEventListener("click",e=>{e.preventDefault();panel.hidden=false;button.textContent="Masquer les propositions";panel.scrollIntoView({behavior:"smooth",block:"nearest"});});
  link.textContent="Découvrir cette destination";link.insertAdjacentElement("afterend",button);button.insertAdjacentElement("afterend",panel);
  panel.addEventListener("click",e=>{const pick=e.target.closest("[data-circuit-pick]");if(!pick)return;const n=pick.dataset.circuitPick;selected=selected.includes(n)?selected.filter(x=>x!==n):[...selected,n];save(selected);update();});
 });
 update();
})();