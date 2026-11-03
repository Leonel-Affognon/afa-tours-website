/* Shared language preference. Pages without a verified translation stay in French. */
(() => {
 const supported=["fr","en","de","es","pt"];
 const get=k=>{try{return localStorage.getItem(k)}catch(_){return null}};
 let selected=supported.includes(get("afa-language"))?get("afa-language"):"fr";
 const select=document.getElementById("language");
 const isHome=["","index.html"].includes(location.pathname.split("/").pop());
 const set=value=>{selected=value;try{localStorage.setItem("afa-language",value)}catch(_){}document.documentElement.lang=value;if(select)select.value=value;};
 set(selected);
 if(select){select.value=selected;select.addEventListener("change",()=>{if(!supported.includes(select.value))return;set(select.value);location.reload();});}
 window.AFA_LANGUAGE=selected;
 window.AFA_TRANSLATE=(record,fields)=>{const translated=record?.translations?.[selected]||{};const out={};for(const field of fields)out[field]=translated[field]||record?.[field]||"";return out;};
 document.documentElement.lang=selected;
})();