/* AFA language controller — one persistent preference across every public page.
   The visitor's explicit choice wins; otherwise use the browser's preferred language. */
(() => {
  const supported=["fr","en","de","es","pt"];
  const labels={fr:"Français",en:"English",de:"Deutsch",es:"Español",pt:"Português"};
  const read=(key)=>{try{return localStorage.getItem(key)}catch(_){return null}};
  const browserPreferences=[...(navigator.languages||[]),navigator.language||"fr"]
    .map(value=>String(value).slice(0,2).toLowerCase());
  const browserLanguage=browserPreferences.find(value=>supported.includes(value))||"fr";
  const saved=read("afa-language");
  let language=supported.includes(saved)?saved:browserLanguage;
  const isHome=/^(|index\.html)$/.test(location.pathname.split("/").pop());
  const cookieValue="/fr/"+language;
  const writeCookie=()=>{
    const base=";path=/;max-age=31536000;SameSite=Lax";
    document.cookie="googtrans="+cookieValue+base;
    document.cookie="googtrans="+cookieValue+";path="+location.pathname.substring(0,location.pathname.lastIndexOf("/")+1)+";max-age=31536000;SameSite=Lax";
  };
  const persist=(value)=>{
    if(!supported.includes(value))return;
    language=value;
    try{localStorage.setItem("afa-language",value)}catch(_){}
    writeCookie();
  };
  // Set translation preference before loading any page content or Google Translate.
  persist(language);
  let select=document.getElementById("language");
  if(!select){
    const actions=document.querySelector(".header-actions");
    if(actions){
      select=document.createElement("select");select.id="language";
      select.setAttribute("aria-label","Choose website language");
      for(const code of supported){const option=document.createElement("option");option.value=code;option.textContent=labels[code];select.append(option)}
      actions.prepend(select);
    }
  }
  if(select){
    select.value=language;
    select.addEventListener("change",()=>{
      const chosen=select.value;
      if(!supported.includes(chosen))return;
      persist(chosen);
      // Reload the whole document so every section uses exactly the same language.
      location.reload();
    });
  }
  // The home page also has hand-written translations for its key marketing copy.
  // Google Translate completes the rest of the page, matching all inner pages.
  window.googleTranslateElementInit=()=>{
    if(!window.google?.translate?.TranslateElement)return;
    new google.translate.TranslateElement({
      pageLanguage:"fr",includedLanguages:"en,de,es,pt",autoDisplay:false,
      multilanguagePage:false, gaTrack:false
    },"google_translate_element");
    const apply=()=>{
      const combo=document.querySelector(".goog-te-combo");
      if(!combo)return false;
      if(language!=="fr"&&combo.value!==language){
        combo.value=language;combo.dispatchEvent(new Event("change"));
      }
      return true;
    };
    let attempts=0;
    const retry=()=>{
      if(apply()||attempts++>24)return;
      window.setTimeout(retry,250);
    };
    retry();
  };
  const holder=document.createElement("div");holder.id="google_translate_element";holder.hidden=true;document.body.append(holder);
  if(language!=="fr"){
    const script=document.createElement("script");
    script.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async=true;script.onerror=()=>{document.documentElement.dataset.translationUnavailable="true"};
    document.head.append(script);
  }else{
    // Keep the source language clean if a previous translated session left a cookie.
    document.cookie="googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie="googtrans=;path="+location.pathname.substring(0,location.pathname.lastIndexOf("/")+1)+";expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
  document.documentElement.lang=language;
})();
