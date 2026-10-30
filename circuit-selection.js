(() => {
 const KEY="afa-selected-circuits";
 const cards=[...document.querySelectorAll(".destination-card")].filter(card=>card.querySelector(".destination-copy h2"));
 const names=cards.map(card=>card.querySelector(".destination-copy h2").textContent.trim());
 const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return []}};
 const save=list=>{try{localStorage.setItem(KEY,JSON.stringify([...new Set(list)]))}catch(e){}};
 let selected=read();
 const url=()=> "contact.html?circuits="+encodeURIComponent(selected.join("|"))+"#booking";
 const bar=document.createElement("aside");bar.className="circuit-selection-bar";bar.setAttribute("aria-live","polite");bar.innerHTML='<div class="circuit-selection-summary"><strong class="circuit-selection-count"></strong><span class="circuit-selection-names"></span></div><a class="button" href="contact.html#booking">Continuer ma demande ↗</a>';
 document.body.append(bar);
 const render=()=>{
  bar.querySelector(".circuit-selection-count").textContent=selected.length+" expérience"+(selected.length>1?"s":"")+" sélectionnée"+(selected.length>1?"s":"");
  bar.querySelector(".circuit-selection-names").textContent=selected.length?selected.join(" · "):"Votre sélection est conservée sur cet appareil";
  bar.querySelector("a").href=selected.length?url():"contact.html#booking";
  bar.classList.toggle("has-selection",selected.length>0);
  document.querySelectorAll("[data-circuit-pick]").forEach(btn=>{const active=selected.includes(btn.dataset.circuitPick);btn.textContent=active?"Retirer de ma sélection":"Ajouter à ma sélection";btn.classList.toggle("is-selected",active);btn.setAttribute("aria-pressed",String(active));});
 };
 cards.forEach(card=>{
  const title=card.querySelector(".destination-copy h2"),name=title?.textContent.trim(),link=card.querySelector(".destination-copy .text-link");
  if(!name||!link)return;
  const btn=document.createElement("button");btn.type="button";btn.className="text-link circuit-pick";btn.dataset.destinationPick=name;btn.textContent="Choisir cette destination";
  const panel=document.createElement("div");panel.className="destination-circuit-panel";panel.hidden=true;
  const toggle=()=>{panel.hidden=!panel.hidden;btn.textContent=panel.hidden?"Choisir cette destination":"Masquer les circuits";};
  btn.addEventListener("click",toggle);
  const map={
   "Porto-Novo":[["L’Axe du pouvoir","Musée Honmè, Abessan, mosquée afro-brésilienne et patrimoine historique.","3 à 4 h","15 000 FCFA / personne"]],
   "Adjarra":[["Les Secrets de la Rivière Noire","Traversée en pirogue, villages riverains, vannerie et savoir-faire locaux.","2 à 3 h","10 000 FCFA / personne"]],
   "Ganvié":[["La Vie entre ciel et eau","Navigation en pirogue, quartiers lacustres et découverte de la vie sur le lac.","Environ 3 h","Tarif sur demande"]],
   "Ouidah":[["La Route des mémoires","Route des Esclaves, forêt sacrée de Kpassè, Temple des Pythons et Porte du Non-Retour.","3 à 4 h","Tarif sur demande"]],
   "Abomey":[["Sur les traces du Danxomè","Palais royaux, histoire des souverains et patrimoine du royaume.","Environ 3 h","Tarif sur demande"]],
   "Cotonou":[["Cotonou, entre Amazone et Atlantique","Monument de l’Amazone, lieux emblématiques, marchés et littoral selon le parcours.","2 à 3 h","Tarif sur demande"]],
   "Grand-Popo":[["À la rencontre du fleuve et de l’océan","Bouche du Roy, paysages de mangrove, villages de pêcheurs et littoral.","Environ 3 h","Tarif sur demande"]],
   "Pendjari":[["Sur les pistes de la Pendjari","Safari accompagné et observation de la faune selon saison et conditions d’accès.","À définir","Tarif sur demande"]]
  };
  const items=map[name]||[];
  panel.innerHTML=items.length?items.map(([n,desc,duration,price])=>'<article class="destination-circuit-option"><div><strong>'+n+'</strong><p>'+desc+'</p><small>'+duration+' · '+price+'</small></div><button type="button" class="circuit-pick" data-circuit-pick="'+n.replace(/"/g,"&quot;")+'">Ajouter à ma sélection</button></article>').join(""):'<p class="form-hint">Nous pouvons concevoir une visite sur mesure dans cette destination. Contactez-nous pour définir les étapes et le tarif.</p><a class="text-link" href="contact.html?destination='+encodeURIComponent(name)+'#booking">Demander un itinéraire personnalisé ↗</a>';
  panel.addEventListener("click",e=>{const pick=e.target.closest("[data-circuit-pick]");if(!pick)return;const n=pick.dataset.circuitPick;selected=selected.includes(n)?selected.filter(x=>x!==n):[...selected,n];save(selected);render();});
  link.addEventListener("click",e=>{e.preventDefault();toggle();panel.scrollIntoView({behavior:"smooth",block:"nearest"});});
  link.textContent="Voir les expériences de cette destination";
  link.insertAdjacentElement("afterend",btn);btn.insertAdjacentElement("afterend",panel);
 });
 render();
})();