(() => {
 const KEY="afa-selected-circuits",catalog=window.AFA_TOUR_CATALOG||[];
 const cards=[...document.querySelectorAll(".destination-card")].filter(card=>card.querySelector(".destination-copy h2"));
 const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return []}};
 const save=list=>{try{localStorage.setItem(KEY,JSON.stringify([...new Set(list)]))}catch(e){}};
 let selected=read();
 const url=()=> "contact.html?circuits="+encodeURIComponent(selected.join("|"))+"#booking";
 const bar=document.createElement("aside");bar.className="circuit-selection-bar";bar.setAttribute("aria-live","polite");bar.innerHTML='<div class="circuit-selection-summary"><strong class="circuit-selection-count"></strong><span class="circuit-selection-names"></span></div><a class="button" href="contact.html#booking">Continuer ma demande ↗</a>';document.body.append(bar);
 const render=()=>{
  bar.querySelector(".circuit-selection-count").textContent=selected.length+" circuit"+(selected.length>1?"s":"")+" sélectionné"+(selected.length>1?"s":"");
  bar.querySelector(".circuit-selection-names").textContent=selected.length?selected.join(" · "):"Choisissez un circuit pour préparer votre demande";
  bar.querySelector("a").href=selected.length?url():"contact.html#booking";bar.classList.toggle("has-selection",selected.length>0);
  document.querySelectorAll("[data-circuit-pick]").forEach(btn=>{const on=selected.includes(btn.dataset.circuitPick);btn.textContent=on?"Retirer de ma sélection":"Ajouter à ma sélection";btn.classList.toggle("is-selected",on);btn.setAttribute("aria-pressed",String(on));});
 };
 cards.forEach(card=>{
  const title=card.querySelector(".destination-copy h2"),name=title?.textContent.trim(),link=card.querySelector(".destination-copy .text-link");if(!name||!link)return;
  const tour=catalog.find(t=>t.title===name);if(!tour)return;
  const btn=document.createElement("button");btn.type="button";btn.className="text-link circuit-pick";btn.dataset.destinationPick=name;btn.textContent="Ajouter ce circuit";
  btn.addEventListener("click",()=>{selected=selected.includes(name)?selected.filter(x=>x!==name):[...selected,name];save(selected);render();});
  link.insertAdjacentElement("afterend",btn);
 });
 render();
})();