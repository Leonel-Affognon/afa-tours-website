const css=String.raw`
@media(max-width:900px){.hero-in p,.hero-in .lede{padding-right:54px}}

/* ===== Animations pro ===== */
.sprog{position:fixed;left:0;top:0;height:3px;width:100%;z-index:70;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#E8832F,#B51D27);pointer-events:none}
.hd{transition:box-shadow .35s,background-color .35s,transform .4s cubic-bezier(.2,.8,.2,1)}
.hd.hdc{box-shadow:0 6px 24px rgba(42,12,7,.16)}
html.mo [data-rv]{opacity:0;transform:translate3d(0,28px,0);transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .9s cubic-bezier(.2,.8,.2,1);transition-delay:var(--rd,0ms);will-change:opacity,transform}
html.mo [data-rv="l"]{transform:translate3d(-34px,0,0)}html.mo [data-rv="r"]{transform:translate3d(34px,0,0)}html.mo [data-rv="z"]{transform:scale(.94)}
html.mo [data-rv].in{opacity:1;transform:none}
html.mo .card[data-rv] .cimg{clip-path:inset(0 0 100% 0 round 18px);transition:clip-path 1s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--rd,0ms) + 120ms)}
html.mo .card[data-rv].in .cimg{clip-path:inset(0 0 0 0 round 18px)}
.h2{position:relative}
html.mo .h2[data-rv]::after{content:"";display:block;height:3px;width:0;margin-top:12px;border-radius:3px;background:linear-gradient(90deg,#E8832F,#B51D27);transition:width .9s .3s cubic-bezier(.2,.8,.2,1)}
html.mo .h2[data-rv].in::after{width:64px}
.w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em}
.w>i{display:inline-block;font-style:normal;transform:translateY(108%);animation:wr .95s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(var(--i)*75ms + 250ms)}
@keyframes wr{to{transform:none}}
.btn{position:relative;overflow:hidden;transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s,background-color .25s}
.btn::after{content:"";position:absolute;inset:0;transform:translateX(-120%) skewX(-18deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent);transition:transform .7s}
@media(hover:none){.tm:active,.sjc:active,.pc:active,.val:active,.card:active{transform:translateY(-4px);box-shadow:0 14px 32px rgba(42,12,7,.16)}.btn:active{transform:translateY(-2px) scale(1.02)}.btn:active::after{transform:translateX(120%) skewX(-18deg)}.tm,.sjc,.pc,.val,.mb,.card{transition:transform .25s,box-shadow .25s}}
@media(hover:hover){.btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(42,12,7,.22)}.btn:hover::after{transform:translateX(120%) skewX(-18deg)}.tm,.sjc,.pc,.val,.mb{transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s}.tm:hover,.sjc:hover,.pc:hover,.val:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(42,12,7,.14)}}
.mbar .btn-red,.fabs .btn-red{animation:bpulse 4.5s 3s infinite}
@keyframes bpulse{0%,86%,100%{box-shadow:0 0 0 0 rgba(181,29,39,.45)}93%{box-shadow:0 0 0 12px rgba(181,29,39,0)}}
.mbar .rw,.fabs .wa,.fabs .big{position:relative}
.mbar .rw::before{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #25D366;animation:wring 2.8s 2s infinite;pointer-events:none}
@keyframes wring{0%{transform:scale(1);opacity:.7}70%,100%{transform:scale(1.5);opacity:0}}
.slides{will-change:transform}
@media(prefers-reduced-motion:reduce){html.mo [data-rv],html.mo .card[data-rv] .cimg{opacity:1!important;transform:none!important;clip-path:none!important;transition:none!important}.w>i{transform:none!important;animation:none!important}.sprog{display:none}.mbar .btn-red,.mbar .rw::before{animation:none!important}}

/* ===== Bandeau Vodun Days ===== */
.ann{background:linear-gradient(90deg,#2A0C07,#4a1710 50%,#2A0C07);background-size:200% 100%;animation:annbg 12s linear infinite;overflow:hidden}
@keyframes annbg{to{background-position:200% 0}}
.ann .wrap.av{display:flex;align-items:center;justify-content:center;gap:10px 18px;flex-wrap:wrap;padding-block:7px}
.ann .tag{display:inline-flex;align-items:center;gap:8px;font:800 .78rem/1 var(--b,inherit);letter-spacing:.06em;text-transform:uppercase;color:#2A0C07;background:#F5B14A;padding:.45em .85em;border-radius:999px}
.ann .tag i{width:8px;height:8px;border-radius:50%;background:#B51D27;animation:ping 1.6s infinite}
@keyframes ping{0%{box-shadow:0 0 0 0 rgba(181,29,39,.7)}100%{box-shadow:0 0 0 9px rgba(181,29,39,0)}}
.ann .msg{position:relative;height:1.4em;width:min(540px,100%);text-align:center;font-weight:600;overflow:hidden}
.ann .msg span{position:absolute;inset:0;text-overflow:ellipsis;overflow:hidden;opacity:0;transform:translateY(60%);transition:opacity .5s,transform .6s cubic-bezier(.2,.8,.2,1);white-space:nowrap}
.ann .msg span.on{opacity:1;transform:none}
.ann .cd{display:inline-flex;gap:6px;align-items:stretch}
.ann .cd b{display:grid;place-items:center;min-width:2.6em;padding:.3em .45em .2em;border-radius:8px;background:rgba(255,255,255,.12);font:800 .98rem/1 var(--d,inherit);font-variant-numeric:tabular-nums;color:#fff}
.ann .cd b small{display:block;font:600 .56rem/1 var(--b,inherit);opacity:.85;letter-spacing:.04em;margin-top:2px}
.ann .cd b.tk{animation:tkk .45s}
@keyframes tkk{0%{transform:translateY(-35%);opacity:.3}100%{transform:none;opacity:1}}
.ann .go{display:inline-flex;align-items:center;font-weight:800;font-size:.84rem;color:#2A0C07;background:#fff;border-radius:999px;padding:.5em 1em;text-decoration:none;white-space:nowrap}
.ann .go:hover{background:#F5B14A}
@media(max-width:700px){.ann .wrap.av{gap:5px 10px;padding-block:6px}.ann .tag{font-size:.68rem}.ann .msg{order:3;flex-basis:100%;min-width:0;font-size:.76rem}.ann .msg span{white-space:normal;line-height:1.25}.ann .msg{height:2.5em}.ann .cd b{font-size:.84rem}.ann .go{display:inline-flex;order:4;flex-basis:100%;justify-content:center;font-size:.92rem;padding:.7em 1em;min-height:44px}}
@media(prefers-reduced-motion:reduce){.ann{animation:none}.ann .tag i{animation:none}}

/* ===== Lisibilité sur photos ===== */
.hero::before{content:"";position:absolute;left:0;right:0;top:0;height:240px;z-index:2;background:linear-gradient(180deg,rgba(30,8,4,.72),rgba(30,8,4,0));pointer-events:none}
.hero::after{background:linear-gradient(90deg,rgba(42,12,7,.84) 0%,rgba(42,12,7,.55) 55%,rgba(42,12,7,.38) 100%),linear-gradient(0deg,rgba(42,12,7,.78),transparent 45%)!important}
.hero .sub,.hero h1,.hero .eyebrow{text-shadow:0 2px 14px rgba(20,5,2,.45)}
.hero .ctl2,.hero .sl{text-shadow:0 1px 10px rgba(20,5,2,.7)}
.hd:not(.hdc) .nav a,.hd:not(.hdc) .brand{text-shadow:0 1px 8px rgba(20,5,2,.5)}
.cimg .phl{text-shadow:0 2px 12px rgba(20,5,2,.7)}
.cimg::after{content:"";position:absolute;left:0;right:0;bottom:0;height:42%;background:linear-gradient(0deg,rgba(30,8,4,.55),transparent);pointer-events:none;z-index:1;border-radius:inherit}
.cimg .heart,.cimg .peek{z-index:4}
.pi .city,.pi .kd{backdrop-filter:blur(6px)}
@media(min-width:701px){.hero .sl{margin-right:96px}}
@media(min-width:701px) and (max-width:1100px){.ann .msg{width:100%;order:3;flex-basis:100%}}
/* ===== Animations v2 ===== */
.tilt{transform-style:preserve-3d;will-change:transform}
.glare{position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.35),transparent 55%);z-index:5}
.tilt:hover .glare{opacity:1}
.spot{position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(520px circle at var(--sx,70%) var(--sy,40%),rgba(255,190,110,.22),transparent 60%);mix-blend-mode:screen;transition:opacity .4s}
.w2{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.1em;margin-bottom:-.1em}.w2>i{display:inline-block;font-style:normal;transform:translateY(110%);transition:transform .9s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i)*55ms)}
.in .w2>i,.h2.in .w2>i{transform:none}
.cimg .ph{will-change:transform}
.bt{position:relative;display:inline-flex}
@media(prefers-reduced-motion:reduce){.w2>i{transform:none!important}.spot{display:none}}

/* ===== Hero : diaporama haut de gamme ===== */
.slides .slide{opacity:1!important;clip-path:inset(0 0 0 100%);transition:clip-path 1.25s cubic-bezier(.77,0,.18,1)!important;z-index:0}
.slides .slide.prev{clip-path:inset(0);z-index:1;transition:none!important}
.slides .slide.on{clip-path:inset(0);z-index:2}
.slides .slide .ph{animation:none}
.slides .slide.on .ph{animation:kb2 9s cubic-bezier(.2,.6,.2,1) both}
.slides .slide.prev .ph{animation:none;transform:scale(1.04)}
@keyframes kb2{from{transform:scale(1.26) translate3d(2.5%,1.5%,0)}to{transform:scale(1.04) translate3d(0,0,0)}}
.hero .sl .nm.cp{animation:capin .9s cubic-bezier(.2,.8,.2,1)}
@keyframes capin{from{opacity:0;transform:translateY(14px);letter-spacing:.06em}to{opacity:1;transform:none;letter-spacing:0}}
.segs{position:absolute;left:max(18px,4vw);right:max(18px,4vw);bottom:18px;z-index:5;display:flex;gap:6px}
.segs button{flex:1;height:18px;border:0;background:none;padding:7px 0;cursor:pointer}
.segs button i{display:block;height:3px;border-radius:3px;background:rgba(255,255,255,.32);position:relative;overflow:hidden}
.segs button i::after{content:"";position:absolute;inset:0;transform:scaleX(0);transform-origin:0 50%;background:#fff}
.segs button.done i::after{transform:scaleX(1)}
.segs button.on i::after{animation:sfill 7s linear forwards}
.segs.paused button.on i::after{animation-play-state:paused}
@keyframes sfill{to{transform:scaleX(1)}}
@media(prefers-reduced-motion:reduce){.slides .slide{transition:none!important}.slides .slide.on .ph{animation:none}.segs button.on i::after{animation:none;transform:scaleX(1)}}
/* ===== Boutons flottants sans chevauchement ===== */
.cwl{display:none!important}
.fabs .mb{position:relative}
.fabs .mb svg{width:20px;height:20px;fill:currentColor}
.fabs .mb.mc{color:#2A0C07}.fabs .mb.mr{color:#C77A12}
.mb.has::after,.rb.has::after{content:"";position:absolute;top:1px;right:1px;width:12px;height:12px;border-radius:50%;background:#B51D27;border:2px solid #fff;animation:ping 1.6s infinite}
.mbar .rb{position:relative}.mbar .rb.rch{background:#fff;color:#2A0C07;border:1.5px solid #e6d8cc}.mbar .rb.rrv{background:#fff;color:#C77A12;border:1.5px solid #f0dcb8}
@media(max-width:700px){
.snav{opacity:1!important;pointer-events:auto!important;right:6px;top:auto;bottom:calc(env(safe-area-inset-bottom) + 84px);transform:none;background:rgba(42,12,7,.82);padding:3px;gap:0}
.snav #sdn{display:grid!important}.snav button{width:34px;height:34px}
.snav,.snav.live{transition:none}
body{padding-right:0}
}
@media(min-width:701px) and (max-width:1099px){.snav{right:10px;top:50%;transform:translateY(-50%);bottom:auto}.snav #sdn{display:grid!important}}
/* ===== Bandeau avis visible ===== */
.rvs{background:linear-gradient(110deg,#FFF3DC,#FBE3D2);border-block:1px solid #f0d9c0}
.rvs .wrap{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px 28px;padding-block:18px}
.rvs .l{display:flex;align-items:center;gap:16px;min-width:0}
.rvs .stars2{display:flex;gap:4px}.rvs .stars2 button{border:0;background:none;cursor:pointer;padding:2px;font-size:1.9rem;line-height:1;color:#E3B05A;transition:transform .2s,color .2s}
.rvs .stars2 button:hover,.rvs .stars2 button:focus-visible{transform:scale(1.25) rotate(-8deg);color:#C77A12}
.rvs b{display:block;font:600 1.25rem var(--d,serif);color:#2A0C07}.rvs small{display:block;color:#5a3a32;font-size:.92rem}
.rvs .btn{flex:none}
@media(max-width:700px){.rvs .wrap{padding-block:14px}.rvs .stars2 button{font-size:1.7rem}.rvs b{font-size:1.05rem}.rvs .btn{width:100%;justify-content:center}}
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
function tag(root){SEL.forEach(([s,k,st,stag])=>{$$(s,root).forEach((el,i)=>{if(el.hasAttribute('data-rv')||el.closest('dialog,.igv,.pop,.rvt,.hero'))return;el.setAttribute('data-rv',k);if(stag)el.style.setProperty('--rd',Math.min(i%6,5)*st+'ms');else if(st)el.style.setProperty('--rd',st+'ms');io.observe(el)})})}
tag(document);
const g=$('#grid');if(g)new MutationObserver(()=>tag(g)).observe(g,{childList:true});
['#forms','.pgrid','#ig','#avis'].forEach(s=>{const n=$(s);if(n)new MutationObserver(()=>tag(n)).observe(n,{childList:true,subtree:true})});
/* compteur sur « 8 destinations » */
function cnt(b){const m=/^(\d+)(\s[^\d]*)$/.exec(b.textContent.trim());if(!m||b.dataset.done)return;b.dataset.done=1;const n=+m[1],t=m[2],t0=performance.now();(function f(t1){const p=Math.min(1,(t1-t0)/1100),v=Math.round(n*(1-Math.pow(1-p,3)));b.textContent=v+t;if(p<1)requestAnimationFrame(f)})(t0)}
/* filet de sécurité : rien ne reste caché */
setTimeout(()=>$$('[data-rv]:not(.in)').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*1.2)el.classList.add('in')}),2500);
})();

/* ===== Bandeau Vodun Days : chrono vivant ===== */
(function(){
const an=document.querySelector('.ann');if(!an)return;const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const T=new Date('2027-01-02T00:00:00+01:00').getTime(),E=new Date('2027-01-09T23:59:59+01:00').getTime();
const M={fr:{tag:'Vodun Days 2027',m:['Ouidah · du 2 au 9 janvier : le rendez-vous vodun à ne pas manquer','Places limitées : réservez votre accompagnement dès maintenant','Guide, transport, hébergement : nous nous occupons de tout'],u:['jours','heures','min','sec'],go:'Réserver ma place',live:'Vodun Days a commencé à Ouidah !',end:'Merci d’avoir fêté les Vodun Days. Rendez-vous en 2028.'},en:{tag:'Vodun Days 2027',m:['Ouidah · January 2–9: the vodun festival you cannot miss','Limited places: book your guided visit now','Guide, transport, stay: we take care of everything'],u:['days','hours','min','sec'],go:'Book my place',live:'Vodun Days is on in Ouidah!',end:'Thank you for celebrating Vodun Days. See you in 2028.'}};
let mi=0,mt=null,last=[];
const L=()=>(typeof lang!=='undefined'&&lang==='en')?'en':'fr';
function build(){const t=M[L()];an.innerHTML='<div class="wrap av"><span class="tag"><i></i>'+t.tag+'</span><div class="msg" aria-live="off">'+t.m.map((x,i)=>'<span'+(i===mi?' class="on"':'')+'>'+x+'</span>').join('')+'</div><div class="cd" role="timer" aria-label="'+t.tag+'">'+t.u.map((u,i)=>'<b data-k="'+i+'">00<small>'+u+'</small></b>').join('')+'</div><a class="go" href="#agenda" data-book data-kind="sejour" data-id="s7">'+t.go+'</a></div>';last=[];tick();setTimeout(()=>{const h=an.offsetHeight;document.documentElement.style.setProperty('--annh',h+'px')},40)}
function pad(n){return String(n).padStart(2,'0')}
function tick(){const now=Date.now(),t=M[L()];const cd=an.querySelector('.cd');if(!cd)return;
if(now>=T){const msg=an.querySelector('.msg');if(msg&&!msg.dataset.live){msg.dataset.live=1;clearInterval(mt);msg.innerHTML='<span class="on">'+(now<E?t.live:t.end)+'</span>'}cd.style.display='none';return}
let d=Math.floor((T-now)/1000);const v=[Math.floor(d/86400),Math.floor(d%86400/3600),Math.floor(d%3600/60),d%60];
$$('b',cd).forEach((b,i)=>{const val=i===0?String(v[i]):pad(v[i]);if(last[i]!==val){b.firstChild.nodeValue=val;if(last.length){b.classList.remove('tk');void b.offsetWidth;b.classList.add('tk')}last[i]=val}})}
function rot(){const sp=$$('.msg span',an);if(sp.length<2)return;sp[mi].classList.remove('on');mi=(mi+1)%sp.length;sp[mi].classList.add('on')}
build();setInterval(tick,1000);mt=setInterval(rot,4200);
if(typeof applyLang==='function'){const o=applyLang;applyLang=function(){o.apply(this,arguments);build()}}
})();

/* ===== Animations v2 (JS) ===== */
(function(){
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
if(RM)return;
/* titres : montée mot par mot au scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.3});
$$('.h2').forEach(h=>{if(h.querySelector('.w2')||h.children.length>0&&h.querySelector('*:not(br)'))return;let i=0;const tx=h.textContent;h.setAttribute('aria-label',tx);h.innerHTML=tx.trim().split(/\s+/).map(w=>'<span class="w2" aria-hidden="true"><i style="--i:'+(i++)+'">'+w.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</i></span>').join(' ');io.observe(h)});
/* hero : spot lumineux qui suit la souris + pastilles flottantes */
const hero=$('.hero');
if(hero){const sp=document.createElement('div');sp.className='spot';hero.appendChild(sp);hero.addEventListener('pointerdown',e=>hero.dispatchEvent(new PointerEvent('pointermove',e)));hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();sp.style.setProperty('--sx',(e.clientX-r.left)+'px');sp.style.setProperty('--sy',(e.clientY-r.top)+'px')})}
/* inclinaison 3D + reflet sur les cartes (souris uniquement) */
if(true){const bind=el=>{if(el.dataset.tl)return;el.dataset.tl=1;el.classList.add('tilt');const g=document.createElement('span');g.className='glare';el.appendChild(g);el.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')el.dispatchEvent(new PointerEvent('pointermove',e))});el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;el.style.transition='transform .08s';el.style.transform='perspective(900px) rotateX('+((.5-y)*7).toFixed(2)+'deg) rotateY('+((x-.5)*9).toFixed(2)+'deg) translateY(-4px)';g.style.setProperty('--gx',x*100+'%');g.style.setProperty('--gy',y*100+'%')});el.addEventListener('pointerleave',()=>{el.style.transition='transform .6s cubic-bezier(.2,.8,.2,1)';el.style.transform=''})};
const scan=()=>$$('.card .cimg,.tm,.sjc,.pc,.val').forEach(bind);scan();const g=$('#grid');if(g)new MutationObserver(scan).observe(g,{childList:true});
/* boutons magnétiques */
$$('.hero .btn,.ann .go,.hd .btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;b.style.transform='translate('+(x*.18).toFixed(1)+'px,'+(y*.28).toFixed(1)+'px)'});b.addEventListener('pointerleave',()=>{b.style.transform=''})})}
/* parallaxe douce des images de cartes et de la galerie */
let tk=false;function par(){tk=false;$$('.cimg .ph').forEach(p=>{const r=p.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const k=((r.top+r.height/2)-innerHeight/2)/innerHeight;p.style.transform='scale(1.12) translate3d(0,'+(k*-26).toFixed(1)+'px,0)'})}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(par)}},{passive:true});par();
})();
`;


module.exports={css,js};
