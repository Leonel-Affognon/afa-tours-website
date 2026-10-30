(() => {
 const KEY="afa-selected-circuits";
 const names=["L’Axe du pouvoir","Les Secrets de la Rivière Noire","La Vie entre ciel et eau","La Route des mémoires","Sur les traces du Danxomè","Cotonou, entre Amazone et Atlantique","À la rencontre du fleuve et de l’océan","Sur les pistes de la Pendjari"];
 const params=new URLSearchParams(location.search);
 const fromUrl=(params.get("circuits")||"").split("|").filter(Boolean);
 let saved=[];try{saved=JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){}
 const selected=[...new Set([...saved,...fromUrl])].filter(n=>names.includes(n));
 const group=document.getElementById("bookingCircuitOptions");
 if(!group)return;
 group.innerHTML=names.map((name,i)=>'<label><input type="checkbox" name="tours" value="'+name.replace(/&/g,"&amp;").replace(/"/g,"&quot;")+'" '+(selected.includes(name)?"checked":"")+'><span>'+name+'</span></label>').join("");
 const update=()=>{const list=[...group.querySelectorAll('input[name="tours"]:checked')].map(x=>x.value);try{localStorage.setItem(KEY,JSON.stringify(list))}catch(e){};const summary=document.getElementById("selectedCircuitSummary");if(summary)summary.textContent=list.length?list.length+" circuit(s) choisi(s) : "+list.join(" · "):"Aucun circuit sélectionné pour le moment.";};
 group.addEventListener("change",update);update();
})();