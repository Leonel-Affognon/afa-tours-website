(() => {
 const KEY="afa-selected-circuits";
 const params=new URLSearchParams(location.search);
 let selected=[];try{const saved=JSON.parse(localStorage.getItem(KEY)||"[]");selected=Array.isArray(saved)?saved:[]}catch(e){}
 const fromUrl=(params.get("circuits")||"").split("|").filter(Boolean);
 const eventName=params.get("event")||"";
 const formulaName=params.get("formula")||"";
 const destination=params.get("destination")||"";
 const contentName=params.get("content")||"";
 if(eventName)fromUrl.push(eventName);
 if(contentName)fromUrl.push(contentName);
 selected=[...new Set([...selected,...fromUrl])];
 if(selected.length){try{localStorage.setItem(KEY,JSON.stringify(selected))}catch(e){}}
 const group=document.getElementById("bookingCircuitOptions");
 if(!group)return;
 const summary=document.getElementById("selectedCircuitSummary");
 const escapeHtml=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const render=()=>{
  group.innerHTML=selected.length?selected.map(n=>'<div class="selected-circuit-item"><span>'+escapeHtml(n)+'</span><button type="button" data-remove-circuit="'+escapeHtml(n)+'" aria-label="Retirer '+escapeHtml(n)+'">Retirer</button><input type="hidden" name="tours" value="'+escapeHtml(n)+'"></div>').join(""):'<p class="form-hint">Vous n’avez pas encore choisi de circuit. Vous pouvez parcourir les destinations ou les circuits, puis revenir ici : votre sélection sera conservée.</p>';
  if(summary)summary.textContent=selected.length?selected.length+" expérience(s) dans votre demande : "+selected.join(" · "):"Aucune expérience sélectionnée pour le moment.";
  group.querySelectorAll("[data-remove-circuit]").forEach(btn=>btn.addEventListener("click",()=>{
   selected=selected.filter(n=>n!==btn.dataset.removeCircuit);
   try{localStorage.setItem(KEY,JSON.stringify(selected))}catch(e){}
   render();
  }));
 };
 render();
 const tour=document.getElementById("tourSelect");
 const requested=eventName||contentName||destination;
 if(requested&&tour){if(![...tour.options].some(o=>o.value===requested))tour.add(new Option(requested,requested));tour.value=requested;}
 if(formulaName){const message=document.querySelector("#bookingForm textarea[name=message]");if(message&&!message.value)message.value="Je souhaite réserver la formule « "+formulaName+" » pour "+(eventName||"cette expérience")+". Merci de me communiquer les disponibilités et les modalités.";}
})();