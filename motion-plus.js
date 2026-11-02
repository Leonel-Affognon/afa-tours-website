/* AFA motion enhancements: progressive reveal, image depth and pointer light. */
(() => {
 const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
 document.body.classList.add("afa-motion-ready");
 const targets=document.querySelectorAll(".trust-strip,.experience-band,.reviews-overview,.media-section,.contact-section");
 if(!reduce.matches&&"IntersectionObserver"in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("afa-motion-visible");observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -24px 0px"});
  targets.forEach(el=>{el.classList.add("afa-motion-reveal");observer.observe(el);});
 }else targets.forEach(el=>el.classList.add("afa-motion-visible"));
 const hero=document.querySelector(".hero,.inner-hero");
 if(hero&&!reduce.matches&&matchMedia("(hover:hover) and (pointer:fine)").matches){
  let frame=0;hero.addEventListener("pointermove",event=>{if(!["mouse","pen"].includes(event.pointerType))return;if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const rect=hero.getBoundingClientRect();hero.style.setProperty("--afa-spot-x",((event.clientX-rect.left)/rect.width*100).toFixed(1)+"%");hero.style.setProperty("--afa-spot-y",((event.clientY-rect.top)/rect.height*100).toFixed(1)+"%");});},{passive:true});
 }
 if(!reduce.matches)document.querySelectorAll(".button").forEach(button=>button.addEventListener("pointerdown",event=>{if(event.pointerType!=="touch")return;button.classList.add("afa-tap-feedback");setTimeout(()=>button.classList.remove("afa-tap-feedback"),140);},{passive:true}));
 reduce.addEventListener?.("change",event=>{if(event.matches)document.querySelectorAll(".afa-motion-reveal").forEach(el=>el.classList.add("afa-motion-visible"));});
})();
