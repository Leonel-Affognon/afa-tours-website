/* Shared language preference for all public AFA pages. */
(() => {
 const supported=["fr","en","de","es","pt"], labels={fr:"Français",en:"English",de:"Deutsch",es:"Español",pt:"Português"};
 const get=k=>{try{return localStorage.getItem(k)}catch(_){return null}};
 const langs=[...(navigator.languages||[]),navigator.language||"fr"].map(x=>String(x).slice(0,2).toLowerCase());
 const browser=langs.find(x=>supported.includes(x))||"fr";
 let selected=supported.includes(get("afa-language"))?get("afa-language"):browser;
 const select=document.getElementById("language");
 const set=value=>{selected=value;try{localStorage.setItem("afa-language",value)}catch(_){}document.documentElement.lang=value;if(select)select.value=value;};
 set(selected);
 if(select){select.value=selected;select.addEventListener("change",()=>{if(!supported.includes(select.value))return;set(select.value);location.reload();});}
 // Google Translate handles the static content on inner pages without mixing two translators on the home page.
 if(selected!=="fr"){
  window.googleTranslateElementInit=()=>{
   if(!window.google?.translate?.TranslateElement)return;
   new google.translate.TranslateElement({pageLanguage:"fr",includedLanguages:"en,de,es,pt",autoDisplay:false,multilanguagePage:false},"google_translate_element");
   let tries=0;const apply=()=>{const combo=document.querySelector(".goog-te-combo");if(combo){combo.value=selected;combo.dispatchEvent(new Event("change"));return;}if(tries++<30)setTimeout(apply,200);};apply();
  };
  const holder=document.createElement("div");holder.id="google_translate_element";holder.hidden=true;document.body.append(holder);
  const script=document.createElement("script");script.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";script.async=true;document.head.append(script);
 }
})();
