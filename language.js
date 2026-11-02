/* Shared language preference. Pages without a verified translation stay in French. */
(() => {
 const supported=["fr","en","de","es","pt"];
 const get=k=>{try{return localStorage.getItem(k)}catch(_){return null}};
 const browser=[...(navigator.languages||[]),navigator.language||"fr"].map(x=>String(x).slice(0,2).toLowerCase()).find(x=>supported.includes(x))||"fr";
 let selected=supported.includes(get("afa-language"))?get("afa-language"):browser;
 const select=document.getElementById("language");
 const isHome=["","index.html"].includes(location.pathname.split("/").pop());
 const set=value=>{selected=value;try{localStorage.setItem("afa-language",value)}catch(_){}document.documentElement.lang=value;if(select)select.value=value;};
 set(selected);
 if(select){select.value=selected;select.addEventListener("change",()=>{if(!supported.includes(select.value))return;set(select.value);location.reload();});}
 window.AFA_LANGUAGE=selected;
 window.AFA_TRANSLATE=(record,fields)=>{const translated=record?.translations?.[selected]||{};const out={};for(const field of fields)out[field]=translated[field]||record?.[field]||"";return out;};
 if(!isHome&&selected!=="fr"){document.documentElement.lang="fr";if(select)select.value=selected;const note=document.createElement("p");note.className="language-availability-note";note.setAttribute("role","status");note.textContent="Cette page est encore disponible en français. Les contenus traduits apparaîtront lorsqu’ils auront été validés.";const main=document.querySelector("main");if(main)main.prepend(note);}
})();