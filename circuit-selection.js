(() => {
 const KEY="afa-selected-circuits";
 const cards=[...document.querySelectorAll(".destination-card")].filter(card=>card.querySelector(".destination-copy h2"));
 const names=cards.map(card=>card.querySelector(".destination-copy h2").textContent.trim());
 const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return []}};
 const save=list=>{try{localStorage.setItem(KEY,JSON.stringify([...new Set(list)]))}catch(e){}};
 let selected=read().filter(n=>names.includes(n));
 const contactUrl=()=> "contact.html?circuits="+encodeURIComponent(selected.join("|"))+"#booking";
 const bar=document.createElement("aside");bar.className="circuit-selection-bar";bar.setAttribute("aria-live","polite");bar.innerHTML='<div class="circuit-selection-summary"><strong class="circuit-selection-count"></strong><span class="circuit-selection-names"></span></div><a class="button" href="contact.html#booking">Demander les circuits sélectionnés ↗</a>';
 document.body.append(bar);
 const render=()=>{bar.querySelector(".circuit-selection-count").textContent=selected.length+" circuit"+(selected.length>1?"s":"")+" sélectionné"+(selected.length>1?"s":"");bar.querySelector(".circuit-selection-names").textContent=selected.length?selected.join(" · "):"Choisissez un ou plusieurs circuits";bar.querySelector("a").href=selected.length?contactUrl():"contact.html#booking";bar.classList.toggle("has-selection",selected.length>0);cards.forEach(card=>{const name=card.querySelector(".destination-copy h2").textContent.trim(),btn=card.querySelector("[data-circuit-pick]");if(btn){const active=selected.includes(name);btn.textContent=active?"Retirer de ma sélection":"Ajouter à ma sélection";btn.setAttribute("aria-pressed",String(active));btn.classList.toggle("is-selected",active)}})};
 cards.forEach(card=>{const title=card.querySelector(".destination-copy h2"),name=title?.textContent.trim(),link=card.querySelector(".destination-copy .text-link");if(!name||!link)return;const btn=document.createElement("button");btn.type="button";btn.className="text-link circuit-pick";btn.dataset.circuitPick="";btn.textContent="Ajouter à ma sélection";btn.addEventListener("click",()=>{selected=selected.includes(name)?selected.filter(x=>x!==name):[...selected,name];save(selected);render()});link.insertAdjacentElement("afterend",btn)});
 render();
})();