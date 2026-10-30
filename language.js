/* AFA site-wide language preference and translation bridge.
   French is the source language on inner pages. The home page keeps its native
   five-language dictionary in script.js; this bridge synchronizes its choice. */
(() => {
  const supported=["fr","en","de","es","pt"];
  const labels={fr:"Français",en:"English",de:"Deutsch",es:"Español",pt:"Português"};
  const readSaved=()=>{try{return localStorage.getItem("afa-language")}catch(e){return null}};
  const browser=(navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.language||"fr").slice(0,2).toLowerCase();
  let language=readSaved();
  if(!supported.includes(language)) language=supported.includes(browser)?browser:"fr";
  const setCookie=(lang)=>{document.cookie="googtrans=/fr/"+lang+";path=/;max-age=31536000;SameSite=Lax";document.cookie="googtrans=/fr/"+lang+";path="+location.pathname.substring(0,location.pathname.lastIndexOf("/")+1)+";max-age=31536000;SameSite=Lax";};
  const save=(lang)=>{if(!supported.includes(lang))return;language=lang;try{localStorage.setItem("afa-language",lang)}catch(e){};setCookie(lang);};
  const isHome=/^(|index\.html)$/.test(location.pathname.split("/").pop());
  let select=document.getElementById("language");
  if(!select){
    const actions=document.querySelector(".header-actions");
    if(actions){const label=document.createElement("label");label.className="language-label";label.htmlFor="language";label.textContent="Langue";select=document.createElement("select");select.id="language";select.setAttribute("aria-label","Choisir la langue");for(const code of supported){const option=document.createElement("option");option.value=code;option.textContent=labels[code];select.append(option)}actions.prepend(select);actions.prepend(label);}
  }
  if(select){select.value=language;select.addEventListener("change",()=>{save(select.value);if(isHome){return;}const combo=document.querySelector(".goog-te-combo");if(combo){combo.value=select.value;combo.dispatchEvent(new Event("change"));}else location.reload();});}
  if(isHome){save(language);return;}
  window.googleTranslateElementInit=()=>{new google.translate.TranslateElement({pageLanguage:"fr",includedLanguages:"en,de,es,pt",autoDisplay:false,multilanguagePage:true}, "google_translate_element");const apply=()=>{const combo=document.querySelector(".goog-te-combo");if(combo&&language!=="fr"){combo.value=language;combo.dispatchEvent(new Event("change"));} };setTimeout(apply,700);setTimeout(apply,1800);};
  const holder=document.createElement("div");holder.id="google_translate_element";holder.hidden=true;document.body.append(holder);
  if(language!=="fr")setCookie(language);
  const script=document.createElement("script");script.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";script.async=true;document.head.append(script);
})();