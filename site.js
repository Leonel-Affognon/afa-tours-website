(() => {
  const body=document.body;body.classList.add("page-ready");
  const progress=document.createElement("div");progress.className="reading-progress";body.prepend(progress);
  const topButton=document.createElement("button");topButton.className="back-to-top";topButton.type="button";topButton.setAttribute("aria-label","Retour en haut");topButton.innerHTML="↑";body.append(topButton);
  const nav=document.querySelector(".main-nav"),toggle=document.querySelector(".menu-toggle");
  if(toggle&&nav&&!document.querySelector('script[src="script.js"]'))toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle?.setAttribute("aria-expanded","false");}));
  const current=location.pathname.split("/").pop()||"index.html";
  nav?.querySelectorAll("a").forEach(a=>{if(a.getAttribute("href")===current)a.classList.add("active");});
  const revealTargets=document.querySelectorAll(".section,.tour-card,.destination-card,.editorial-intro,.about-story,.values-band article,.closing-banner,.booking-form,.gallery-tile");
  revealTargets.forEach(el=>el.classList.add("reveal"));
  if("IntersectionObserver" in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -35px 0px"});
    revealTargets.forEach(el=>observer.observe(el));
  }else revealTargets.forEach(el=>el.classList.add("is-visible"));
  const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform="scaleX("+(max>0?scrollY/max:0)+")";topButton.classList.toggle("visible",scrollY>550);};
  addEventListener("scroll",update,{passive:true});update();topButton.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
  document.querySelectorAll("[data-parallax]").forEach(el=>{addEventListener("scroll",()=>{if(innerWidth>760){const rect=el.getBoundingClientRect();el.style.setProperty("--parallax-y",((rect.top-innerHeight/2)*-.035)+"px");}},{passive:true});});
  document.querySelectorAll(".gallery-tile,.destination-image").forEach(el=>el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect();el.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");el.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");}));
  document.querySelectorAll(".tour-grid,.destination-grid").forEach(grid=>grid.classList.add("stagger-grid"));
  const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
})();

/* Mobile-first navigation: persistent shortcuts + an optional full page menu */
(() => {
  if (document.querySelector(".mobile-quick-nav")) return;
  const current = location.pathname.split("/").pop() || "index.html";
  const links = [
    ["index.html","⌂","Accueil"],
    ["circuits.html","◇","Circuits"],
    ["destinations.html","◎","Destinations"],
    ["contact.html","✉","Contact"]
  ];
  const nav = document.createElement("nav");
  nav.className = "mobile-quick-nav";
  nav.setAttribute("aria-label","Navigation rapide");
  links.forEach(([href,symbol,label]) => {
    const a=document.createElement("a");a.href=href;
    if(current===href)a.setAttribute("aria-current","page");
    const icon=document.createElement("span");icon.className="nav-symbol";icon.setAttribute("aria-hidden","true");icon.textContent=symbol;
    const text=document.createElement("span");text.textContent=label;
    a.append(icon,text);nav.append(a);
  });
  const more=document.createElement("button");more.type="button";more.setAttribute("aria-expanded","false");more.setAttribute("aria-controls","mobileMorePanel");
  const moreIcon=document.createElement("span");moreIcon.className="nav-symbol";moreIcon.setAttribute("aria-hidden","true");moreIcon.textContent="☰";
  const moreText=document.createElement("span");moreText.textContent="Plus";
  more.append(moreIcon,moreText);nav.append(more);
  const panel=document.createElement("div");panel.className="mobile-more-panel";panel.id="mobileMorePanel";
  panel.setAttribute("aria-label","Toutes les rubriques");
  [["experiences.html","Expériences"],["about.html","Notre agence"],["gallery.html","Galerie"],["confidentialite.html","Confidentialité"]].forEach(([href,label])=>{
    const a=document.createElement("a");a.href=href;a.textContent=label;panel.append(a);
  });
  more.addEventListener("click",()=>{
    const open=panel.classList.toggle("open");more.setAttribute("aria-expanded",String(open));
  });
  panel.addEventListener("click",e=>{if(e.target.closest("a")){panel.classList.remove("open");more.setAttribute("aria-expanded","false");}});
  document.addEventListener("click",e=>{if(!panel.contains(e.target)&&!more.contains(e.target)){panel.classList.remove("open");more.setAttribute("aria-expanded","false");}});
  document.body.append(panel,nav);

  // One gentle invitation per visit, never a recurring interruption.
  const nudge=document.createElement("aside");nudge.className="discovery-nudge";nudge.setAttribute("aria-label","Suggestion de découverte");
  nudge.innerHTML='<button class="nudge-close" type="button" aria-label="Fermer">×</button><strong>Et si vous exploriez le Bénin autrement ?</strong><p>Découvrez nos circuits et expériences conçus autour des lieux et des rencontres.</p><a href="circuits.html">Explorer les circuits →</a>';
  document.body.append(nudge);
  let alreadyShown=false;
  try{alreadyShown=sessionStorage.getItem("afaDiscoveryNudgeShown")==="1";}catch(e){}
  const close=()=>{nudge.classList.remove("visible");try{sessionStorage.setItem("afaDiscoveryNudgeShown","1");}catch(e){}};
  nudge.querySelector(".nudge-close").addEventListener("click",close);
  if(!alreadyShown&&window.matchMedia("(max-width: 760px)").matches){
    window.setTimeout(()=>{nudge.classList.add("visible");try{sessionStorage.setItem("afaDiscoveryNudgeShown","1");}catch(e){}},30000);
    nudge.querySelector("a").addEventListener("click",()=>nudge.classList.remove("visible"));
  }
})();

/* AFA Motion Intelligence — scroll state, section awareness and pointer micro-interactions */
(() => {
 const root=document.documentElement,header=document.querySelector(".site-header");
 const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const finePointer=window.matchMedia("(hover: hover) and (pointer: fine)").matches;
 let scrollTick=false;
 const update=()=>{
  const y=window.scrollY||0;header?.classList.toggle("is-scrolled",y>28);
  const max=root.scrollHeight-window.innerHeight,bar=document.querySelector(".reading-progress");
  if(bar)bar.style.transform="scaleX("+(max>0?y/max:0)+")";scrollTick=false;
 };
 window.addEventListener("scroll",()=>{if(!scrollTick){window.requestAnimationFrame(update);scrollTick=true;}},{passive:true});update();
 const navLinks=[...document.querySelectorAll(".main-nav a")];
 const sectionLinks=navLinks.map(a=>({a,id:(a.getAttribute("href")||"").startsWith("#")?(a.getAttribute("href")||"").slice(1):null})).filter(x=>x.id&&document.getElementById(x.id));
 if("IntersectionObserver" in window&&sectionLinks.length){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){navLinks.forEach(a=>a.classList.remove("active"));sectionLinks.find(x=>x.id===entry.target.id)?.a.classList.add("active");}
  }),{rootMargin:"-35% 0px -55% 0px",threshold:0});
  sectionLinks.forEach(x=>observer.observe(document.getElementById(x.id)));
 }
 if(finePointer&&!reduce){
  document.querySelectorAll(".tour-card,.destination-card").forEach(card=>{
   card.addEventListener("pointermove",event=>{
    const r=card.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;
    card.style.transform="perspective(900px) rotateX("+(-y*2.2).toFixed(2)+"deg) rotateY("+(x*2.8).toFixed(2)+"deg) translateY(-4px)";
   });
   card.addEventListener("pointerleave",()=>{card.style.transform="";});
  });
  document.querySelectorAll(".button").forEach(button=>button.addEventListener("pointermove",event=>{
   const r=button.getBoundingClientRect();button.style.setProperty("--pointer-x",(event.clientX-r.left)+"px");button.style.setProperty("--pointer-y",(event.clientY-r.top)+"px");
  }));
 }
 const hero=document.querySelector(".hero,.inner-hero");
 if(hero&&finePointer&&!reduce){
  let raf=0;window.addEventListener("pointermove",event=>{
   if(event.pointerType==="touch")return;if(raf)cancelAnimationFrame(raf);
   raf=requestAnimationFrame(()=>{
    const dx=(event.clientX/window.innerWidth-.5)*7,dy=(event.clientY/window.innerHeight-.5)*5;
    hero.style.setProperty("--hero-depth-x",dx.toFixed(2)+"px");hero.style.setProperty("--hero-depth-y",dy.toFixed(2)+"px");
   });
  },{passive:true});
 }
})();

/* Touch feedback and section timing */
(() => { if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; document.querySelectorAll(".button,.tour-card,.destination-card,.gallery-tile").forEach(el=>{el.addEventListener("touchstart",()=>el.classList.add("touch-active"),{passive:true});el.addEventListener("touchend",()=>el.classList.remove("touch-active"),{passive:true});el.addEventListener("touchcancel",()=>el.classList.remove("touch-active"),{passive:true});});})();

/* Load the optional Motion Plus layer after all original site effects. */
(() => {
  if (document.querySelector('link[data-afa-motion-plus]')) return;
  const stylesheet=document.createElement("link");
  stylesheet.rel="stylesheet";stylesheet.href="motion-plus.css";stylesheet.dataset.afaMotionPlus="true";
  document.head.append(stylesheet);
  const script=document.createElement("script");
  script.src="motion-plus.js";script.defer=true;
  document.body.append(script);
})();
