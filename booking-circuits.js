(() => {
 const KEY="afa-selected-circuits";
 const params=new URLSearchParams(location.search);
 let selected=[];try{selected=JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){}
 const fromUrl=(params.get("circuits")||"").split("|").filter(Boolean);
 selected=[...new Set([...selected,...fromUrl])];
 if(selected.length){try{localStorage.setItem(KEY,JSON.stringify(selected))}catch(e){}}
 const group=document.getElementById("bookingCircuitOptions");
 if(!group)return;
 const summary=document.getElementById("selectedCircuitSummary");
 const render=()=>{
  group.innerHTML=selected.length?selected.map(n=>'<div class="selected-circuit-item"><span>'+n.replace(/&/g,"&amp;").replace(/</g,"&lt;")+'</span><button type="button" data-remove-circuit="'+n.replace(/"/g,"&quot;")+'" aria-label="Retirer '+n.replace(/"/g,"&quot;")+'">Retirer</button><input type="hidden" name="tours" value="'+n.replace(/&/g,"&amp;").replace(/"/g,"&quot;")+'"></div>').join(""):'<p class="form-hint">Vous n’avez pas encore choisi de circuit. Vous pouvez parcourir les destinations ou les circuits, puis revenir ici : votre sélection sera conservée.</p>';
  if(summary)summary.textContent=selected.length?selected.length+" expérience(s) dans votre demande : "+selected.join(" · "):"Aucune expérience sélectionnée pour le moment.";
  group.querySelectorAll("[data-remove-circuit]").forEach(btn=>btn.addEventListener("click",()=>{selected=selected.filter(n=>n!==btn.dataset.removeCircuit);persist();render();}));
 };
 const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(selected))}catch(e){}};
 render();
 const fieldset=group.closest("fieldset");
 if(fieldset&&!fieldset.querySelector(".selection-browse-links")){
  const links=document.createElement("p");links.className="selection-browse-links";links.innerHTML='<a class="text-link" href="destinations.html">Choisir depuis les destinations</a> · <a class="text-link" href="circuits.html">Parcourir tous les circuits</a>';
  fieldset.append(links);
 }
 const destination=params.get("destination"),tour=document.getElementById("tourSelect");
 if(destination&&tour){const opt=[...tour.options].find(o=>o.value===destination);if(opt)tour.value=destination;else{tour.add(new Option(destination,destination));tour.value=destination;}}
})();