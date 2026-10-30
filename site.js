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