const css=String.raw`
/* ===== Animations pro ===== */
.sprog{position:fixed;left:0;top:0;height:3px;width:100%;z-index:70;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#E8832F,#B51D27);pointer-events:none}
.hd{transition:box-shadow .35s,background-color .35s,transform .4s cubic-bezier(.2,.8,.2,1)}
.hd.hdc{box-shadow:0 6px 24px rgba(42,12,7,.16)}
html.mo [data-rv]{opacity:0;transform:translate3d(0,28px,0);transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .9s cubic-bezier(.2,.8,.2,1);transition-delay:var(--d,0ms);will-change:opacity,transform}
html.mo [data-rv="l"]{transform:translate3d(-34px,0,0)}html.mo [data-rv="r"]{transform:translate3d(34px,0,0)}html.mo [data-rv="z"]{transform:scale(.94)}
html.mo [data-rv].in{opacity:1;transform:none}
html.mo .card[data-rv] .cimg{clip-path:inset(0 0 100% 0 round 18px);transition:clip-path 1s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--d,0ms) + 120ms)}
html.mo .card[data-rv].in .cimg{clip-path:inset(0 0 0 0 round 18px)}
.h2{position:relative}
html.mo .h2[data-rv]::after{content:"";display:block;height:3px;width:0;margin-top:12px;border-radius:3px;background:linear-gradient(90deg,#E8832F,#B51D27);transition:width .9s .3s cubic-bezier(.2,.8,.2,1)}
html.mo .h2[data-rv].in::after{width:64px}
.w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em}
.w>i{display:inline-block;font-style:normal;transform:translateY(108%);animation:wr .95s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(var(--i)*75ms + 250ms)}
@keyframes wr{to{transform:none}}
.btn{position:relative;overflow:hidden;transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s,background-color .25s}
.btn::after{content:"";position:absolute;inset:0;transform:translateX(-120%) skewX(-18deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent);transition:transform .7s}
@media(hover:hover){.btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(42,12,7,.22)}.btn:hover::after{transform:translateX(120%) skewX(-18deg)}.tm,.sjc,.pc,.val,.mb{transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s}.tm:hover,.sjc:hover,.pc:hover,.val:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(42,12,7,.14)}}
.mbar .btn-red,.fabs .btn-red{animation:bpulse 4.5s 3s infinite}
@keyframes bpulse{0%,86%,100%{box-shadow:0 0 0 0 rgba(181,29,39,.45)}93%{box-shadow:0 0 0 12px rgba(181,29,39,0)}}
.mbar .rw,.fabs .wa,.fabs .big{position:relative}
.mbar .rw::before{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #25D366;animation:wring 2.8s 2s infinite;pointer-events:none}
@keyframes wring{0%{transform:scale(1);opacity:.7}70%,100%{transform:scale(1.5);opacity:0}}
.slides{will-change:transform}
@media(prefers-reduced-motion:reduce){html.mo [data-rv],html.mo .card[data-rv] .cimg{opacity:1!important;transform:none!important;clip-path:none!important;transition:none!important}.w>i{transform:none!important;animation:none!important}.sprog{display:none}.mbar .btn-red,.mbar .rw::before{animation:none!important}}
`;
const js=String.raw`
(function(){
if(!('IntersectionObserver' in window))return;
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const de=document.documentElement,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* barre de progression + en-tête */
const pg=document.createElement('div');pg.className='sprog';pg.setAttribute('aria-hidden','true');document.body.appendChild(pg);
const hd=$('.hd'),hero=$('.hero'),sl=$('.slides');let tk=false;
function onS(){tk=false;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;pg.style.transform='scaleX('+(h>0?Math.min(1,y/h):0)+')';hd&&hd.classList.toggle('hdc',y>20);if(!RM&&sl&&hero&&y<hero.offsetHeight+200)sl.style.transform='translate3d(0,'+(y*.22).toFixed(1)+'px,0) scale(1.06)'}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});onS();
if(RM)return;
/* titre du hero : montée mot par mot */
const h1=$('.hero h1');if(h1&&!h1.querySelector('.w')){let i=0;h1.setAttribute('aria-label',h1.textContent);h1.innerHTML=h1.textContent.trim().split(/\s+/).map(t=>'<span class="w" aria-hidden="true"><i style="--i:'+(i++)+'">'+t.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</i></span>').join(' ')}
/* révélation au scroll */
de.classList.add('mo');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);const c=e.target.matches('.trust li')?$('b',e.target):null;if(c)cnt(c)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
const SEL=[['.xs .eyebrow,.sec .eyebrow','',0],['.h2','',0],['.lede','',80],['.trust li','',70,1],['.card','',90,1],['.tm','',90,1],['.sjc','',80,1],['.pc','z',70,1],['.val','',100,1],['.pgrid .pc','z',70,1],['.rv > *','',120,1],['.vlist > *','',70,1],['.steps > *','',90,1],['.agenda > *','',120,1],['.dgrid > *','',100,1],['.igg button','z',35,1]];
function tag(root){SEL.forEach(([s,k,st,stag])=>{$$(s,root).forEach((el,i)=>{if(el.hasAttribute('data-rv')||el.closest('dialog,.igv,.pop,.rvt,.hero'))return;el.setAttribute('data-rv',k);if(stag)el.style.setProperty('--d',Math.min(i%6,5)*st+'ms');else if(st)el.style.setProperty('--d',st+'ms');io.observe(el)})})}
tag(document);
const g=$('#grid');if(g)new MutationObserver(()=>tag(g)).observe(g,{childList:true});
['#forms','.pgrid','#ig','#avis'].forEach(s=>{const n=$(s);if(n)new MutationObserver(()=>tag(n)).observe(n,{childList:true,subtree:true})});
/* compteur sur « 8 destinations » */
function cnt(b){const m=/^(\d+)(\s[^\d]*)$/.exec(b.textContent.trim());if(!m||b.dataset.done)return;b.dataset.done=1;const n=+m[1],t=m[2],t0=performance.now();(function f(t1){const p=Math.min(1,(t1-t0)/1100),v=Math.round(n*(1-Math.pow(1-p,3)));b.textContent=v+t;if(p<1)requestAnimationFrame(f)})(t0)}
/* filet de sécurité : rien ne reste caché */
setTimeout(()=>$$('[data-rv]:not(.in)').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*1.2)el.classList.add('in')}),2500);
})();
`;
module.exports={css,js};
