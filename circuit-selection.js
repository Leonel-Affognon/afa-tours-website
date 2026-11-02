(() => {
 const KEY="afa-selected-circuits";
 const read=()=>{try{const value=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(value)?value:[]}catch(e){return []}};
 const save=list=>{try{localStorage.setItem(KEY,JSON.stringify([...new Set(list)]))}catch(e){}};
 let selected=read();
 const url=()=> "contact.html?circuits="+encodeURIComponent(selected.join("|"))+"#booking";
 const bar=document.createElement("aside");
 bar.className="circuit-selection-bar";
 bar.setAttribute("aria-live","polite");
 bar.innerHTML='<div class="circuit-selection-summary"><strong class="circuit-selection-count"></strong><span class="circuit-selection-names"></span></div><a class="button" href="contact.html#booking">Continuer ma demande ↗</a>';
 document.body.append(bar);
 const render=()=>{
  bar.querySelector(".circuit-selection-count").textContent=selected.length+" circuit"+(selected.length>1?"s":"")+" sélectionné"+(selected.length>1?"s":"");
  bar.querySelector(".circuit-selection-names").textContent=selected.length?selected.join(" · "):"Choisissez un circuit pour préparer votre demande";
  bar.querySelector("a").href=selected.length?url():"contact.html#booking";
  bar.classList.toggle("has-selection",selected.length>0);
  document.querySelectorAll("[data-circuit-pick]").forEach(btn=>{
   const on=selected.includes(btn.dataset.circuitPick);
   btn.textContent=on?"Retirer de ma sélection":"Ajouter à ma sélection";
   btn.classList.toggle("is-selected",on);
   btn.setAttribute("aria-pressed",String(on));
  });
 };
 const enhance=scope=>{
  const cards=[];
  if(scope.matches?.(".destination-card"))cards.push(scope);
  scope.querySelectorAll?.(".destination-card").forEach(card=>cards.push(card));
  cards.forEach(card=>{
   const title=card.querySelector(".destination-copy h2");
   const link=card.querySelector(".destination-copy .text-link");
   const name=title?.textContent.trim();
   if(!name||!link||card.querySelector("[data-circuit-pick]"))return;
   const button=document.createElement("button");
   button.type="button";
   button.className="text-link circuit-pick";
   button.dataset.circuitPick=name;
   button.addEventListener("click",()=>{
    selected=selected.includes(name)?selected.filter(x=>x!==name):[...selected,name];
    save(selected);
    render();
   });
   link.insertAdjacentElement("afterend",button);
  });
  render();
 };
 const grid=document.querySelector(".destination-grid-section .destination-grid");
 if(grid){
  enhance(grid);
  // The Supabase catalogue replaces the static cards asynchronously.
  // Watch the grid so selection controls are restored on the new cards.
  new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{
   if(node.nodeType===1)enhance(node);
  }))).observe(grid,{childList:true,subtree:true});
 }
 render();
})();