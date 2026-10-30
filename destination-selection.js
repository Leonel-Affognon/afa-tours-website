(() => {
 const KEY="afa-selected-circuits";
 const cards=[...document.querySelectorAll(".destination-card")].filter(card=>card.querySelector(".destination-copy h2"));
 const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return []}};
 const save=list=>{try{localStorage.setItem(KEY,JSON.stringify([...new Set(list)]))}catch(e){}};
 let selected=read();
 const makeContact=()=> "contact.html?circuits="+encodeURIComponent(selected.join("|"))+"#booking";
 const bar=document.createElement("aside");bar.className="circuit-selection-bar";bar.setAttribute("aria-live","polite");bar.innerHTML='<div class="circuit-selection-summary"><strong class="circuit-selection-count"></strong><span class="circuit-selection-names"></span></div><a class="button" href="contact.html#booking">Continuer ma demande ↗</a>';
 document.body.append(bar);
 const update=()=>{
  bar.querySelector(".circuit-selection-count").textContent=selected.length+" circuit"+(selected.length>1?"s":"")+" sélectionné"+(selected.length>1?"s":"");
  bar.querySelector(".circuit-selection-names").textContent=selected.length?selected.join(" · "):"Votre sélection est conservée pendant votre visite";
  bar.querySelector("a").href=selected.length?makeContact():"contact.html#booking";
  bar.classList.toggle("has-selection",selected.length>0);
  document.querySelectorAll("[data-circuit-pick]").forEach(btn=>{const on=selected.includes(btn.dataset.circuitPick);btn.textContent=on?"Retirer de ma sélection":"Ajouter à ma sélection";btn.classList.toggle("is-selected",on);btn.setAttribute("aria-pressed",String(on));});
 };
 const catalog={
  "Porto-Novo":[["L’Axe du pouvoir","Musée Honmè, Abessan, mosquée afro-brésilienne et patrimoine historique.","3 à 4 h","15 000 FCFA / personne"]],
  "Adjarra":[["Les Secrets de la Rivière Noire","Traversée en pirogue, villages riverains, vannerie et savoir-faire locaux.","2 à 3 h","10 000 FCFA / personne"]],
  "Ganvié":[["La Vie entre ciel et eau","Navigation en pirogue, quartiers lacustres et découverte de la vie sur le lac.","Environ 3 h","Tarif sur demande"]],
  "Ouidah":[["La Route des mémoires","Route des Esclaves, forêt sacrée de Kpassè, Temple des Pythons et Porte du Non-Retour.","3 à 4 h","Tarif sur demande"]],
  "Abomey":[["Sur les traces du Danxomè","Palais royaux, histoire des souverains et patrimoine du royaume.","Environ 3 h","Tarif sur demande"]],
  "Cotonou":[["Cotonou, entre Amazone et Atlantique","Monument de l’Amazone, lieux emblématiques, marchés et littoral selon le parcours.","2 à 3 h","Tarif sur demande"]],
  "Grand-Popo":[["À la rencontre du fleuve et de l’océan","Bouche du Roy, paysages de mangrove, villages de pêcheurs et littoral.","Environ 3 h","Tarif sur demande"]],
  "Pendjari":[["Sur les pistes de la Pendjari","Safari accompagné et observation de la faune selon saison et conditions d’accès.","À définir","Tarif sur demande"]]
 };
 cards.forEach(card=>{
  const name=card.querySelector(".destination-copy h2")?.textContent.trim();
  const link=card.querySelector(".destination-copy .text-link");
  if(!name||!link)return;
  const button=document.createElement("button");button.type="button";button.className="text-link circuit-pick destination-open";button.textContent="Voir les circuits et choisir";
  const panel=document.createElement("div");panel.className="destination-circuit-panel";panel.hidden=true;
  const entries=catalog[name]||[];
  panel.innerHTML=entries.length?entries.map(([title,description,duration,price])=>'<article class="destination-circuit-option"><div><strong>'+title+'</strong><p>'+description+'</p><small>'+duration+' · '+price+'</small></div><button type="button" class="circuit-pick" data-circuit-pick="'+title.replace(/"/g,"&quot;")+'">Ajouter à ma sélection</button></article>').join(""):'<p class="form-hint">Aucun circuit signature n’est encore publié pour cette destination. Nous pouvons préparer un parcours personnalisé avec vous.</p><a class="text-link" href="contact.html?destination='+encodeURIComponent(name)+'#booking">Demander un parcours personnalisé ↗</a>';
  const toggle=()=>{panel.hidden=!panel.hidden;button.textContent=panel.hidden?"Voir les circuits et choisir":"Masquer les circuits";};
  button.addEventListener("click",toggle);
  link.addEventListener("click",e=>{e.preventDefault();if(panel.hidden)toggle();panel.scrollIntoView({behavior:"smooth",block:"nearest"});});
  link.textContent="Découvrir les expériences proposées";
  link.insertAdjacentElement("afterend",button);button.insertAdjacentElement("afterend",panel);
  panel.addEventListener("click",e=>{const pick=e.target.closest("[data-circuit-pick]");if(!pick)return;const title=pick.dataset.circuitPick;selected=selected.includes(title)?selected.filter(x=>x!==title):[...selected,title];save(selected);update();});
 });
 update();
})();