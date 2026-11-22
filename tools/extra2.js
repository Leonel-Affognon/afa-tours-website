const css=String.raw`
.maq-bar{display:none!important}
.fab.up{display:none!important}
.fabs{gap:10px;align-items:flex-end}.fabs .mini{display:flex;flex-direction:column;gap:8px}.mb{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:#fff;color:var(--ink);box-shadow:0 8px 22px rgba(30,8,4,.32);transition:transform .2s}.mb:hover{transform:scale(1.08)}.mb svg{width:22px;height:22px;fill:currentColor}.mb.ph1{color:#1b8a3b}.mb.ml{color:var(--red)}
.snav{position:fixed;right:12px;top:50%;transform:translateY(-50%);z-index:44;display:flex;flex-direction:column;border-radius:999px;background:rgba(42,12,7,.92);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(8px);padding:5px;gap:2px;box-shadow:0 8px 24px rgba(30,8,4,.35)}.snav button{width:38px;height:38px;border:0;border-radius:50%;background:transparent;color:#fff;font-size:1.05rem;cursor:pointer;display:grid;place-items:center;transition:background .2s,opacity .2s}.snav button:hover{background:rgba(255,255,255,.18)}.snav button[disabled]{opacity:.3;cursor:default}.snav svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}@media(max-width:700px){.snav{right:6px;top:auto;bottom:150px;transform:none}.snav button{width:34px;height:34px}}
.soc{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.soc a{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.12);color:#fff;font:800 1rem var(--d);text-decoration:none;transition:background .2s,transform .2s}.soc a:hover{background:var(--or);transform:translateY(-2px);text-decoration:none}.soc svg{width:20px;height:20px;fill:currentColor}.socl{font-weight:800;color:var(--or);margin-top:22px;font-size:.95rem}
.rvt{top:96px;bottom:auto!important}.rvt .rl{display:inline-block;margin-top:8px;font-weight:800;font-size:.82rem;color:var(--red);text-decoration:underline}
.count div{padding:4px 18px!important}.count b{font-variant-numeric:tabular-nums}.count b.s{animation:tkin .45s ease-out}@keyframes tkin{from{opacity:.2;transform:translateY(-8px)}to{opacity:1;transform:none}}
.agsec :where(legend,h3,.fl,.flab,label>span:first-child){color:#fff}.agsec [class*=lab]{color:#f5e6d8}.agsec p[data-i=choose]{color:#fff!important;font-size:1.05rem}
/* partenaires : cartes plus claires */
.pc .pi{height:170px}.pc .pi .city{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.92);color:var(--ink);font-size:.76rem;font-weight:800;padding:.3em .8em;border-radius:999px}.pc .pi .kd{position:absolute;left:14px;bottom:12px;font-size:.78rem;font-weight:800;background:rgba(0,0,0,.35);padding:.25em .75em;border-radius:999px}.pc .chips{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 2px}.pc .chips span{font-size:.76rem;font-weight:700;background:#FBF6EF;border:1px solid #eadfd3;color:#6c4a3c;border-radius:999px;padding:.2em .7em}.pc .pf{flex-direction:column;align-items:stretch;gap:10px}.pc .pr{display:block;white-space:nowrap}.pc .pr small{color:#7a6258;font-weight:600}.pc .pf .btn{width:100%;justify-content:center}.pc .from{font-size:.74rem;font-weight:700;color:#7a6258;display:block}
#partenaires{background:#FBF6EF}#equipe{background:#fff!important}#transport,#galerie{background:#fff}#sejours{background:#FBF6EF!important}
/* avis visibles sur la page */
#avis .rv{align-items:start}#avis .sum h3.wr{font:600 1.5rem var(--d);margin:14px 0 12px}#avis form{display:grid;gap:12px}
/* galerie façon Photos */
.igg button:has(.ph.bad){display:none}.ig{margin-top:26px}.igh{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}.igt{display:flex;align-items:center;gap:10px}.igt b{font:700 1.5rem var(--d)}.igt span{color:#7a6258;font-weight:600;font-size:.95rem}.iseg{display:inline-flex;background:#eee4d8;border-radius:12px;padding:3px}.iseg button{border:0;background:transparent;padding:.45em 1.3em;border-radius:9px;font-weight:700;cursor:pointer;color:#5a4038}.iseg button[aria-pressed=true]{background:#fff;color:var(--ink);box-shadow:0 1px 4px rgba(0,0,0,.18)}.iback{border:0;background:none;color:var(--red);font-weight:800;font-size:1rem;cursor:pointer;padding:.3em 0}
.igg{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:3px;border-radius:16px;overflow:hidden}.igg button{padding:0;border:0;aspect-ratio:1;position:relative;cursor:pointer;background:#2a0c07;overflow:hidden}.igg button .ph{position:absolute;inset:0;border-radius:0;width:100%;height:100%}.igg .phl,.igv .strip .phl,.ial .phl{font-size:.78rem;left:8px;bottom:8px}.igg button:hover .ph{filter:brightness(1.08)}.igg button:focus-visible{outline:3px solid var(--or);outline-offset:-3px}
.ial{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:18px 14px}.ial button{border:0;background:none;padding:0;text-align:left;cursor:pointer;color:var(--ink)}.ial .cv{aspect-ratio:1;border-radius:14px;overflow:hidden;position:relative;background:#2a0c07;display:block}.ial .cv .ph{position:absolute;inset:0;width:100%;height:100%;border-radius:0}.ial b{display:block;margin-top:7px;font-size:.95rem}.ial small{color:#7a6258;font-weight:600}
.igv{position:fixed;inset:0;z-index:95;background:#000;color:#fff;display:none;flex-direction:column;touch-action:none}.igv.on{display:flex;animation:ivin .28s ease-out}@keyframes ivin{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
.igv .top{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;gap:10px}.igv .top button,.igv .top a{border:0;background:rgba(255,255,255,.14);color:#fff;border-radius:999px;padding:.55em 1.1em;font-weight:700;cursor:pointer;text-decoration:none;font-size:.9rem}.igv .cnt{font-weight:700;opacity:.85}
.igv .stage{flex:1;position:relative;overflow:hidden;display:grid;place-items:center}.igv .vs{position:absolute;inset:0;display:grid;place-items:center;transition:transform .32s cubic-bezier(.2,.8,.2,1),opacity .32s}.igv .vs .ph{width:min(94vw,1000px);height:min(66vh,680px);border-radius:14px;aspect-ratio:auto}.igv .vs .ph img{object-fit:contain}.igv .ar{position:absolute;top:50%;transform:translateY(-50%);width:46px;height:46px;border-radius:50%;border:0;background:rgba(255,255,255,.16);color:#fff;font-size:1.4rem;cursor:pointer;z-index:3}.igv .ar.l{left:14px}.igv .ar.r{right:14px}@media(max-width:700px){.igv .ar{display:none}}
.igv .cap{padding:8px 18px 4px;text-align:center;font-weight:700;color:#fff}.igv .strip{display:flex;gap:4px;overflow-x:auto;padding:8px 12px 16px;justify-content:center;scrollbar-width:none}.igv .strip::-webkit-scrollbar{display:none}.igv .strip button{flex:0 0 auto;width:46px;height:46px;border:0;padding:0;border-radius:6px;overflow:hidden;position:relative;opacity:.55;transition:opacity .2s,transform .2s;cursor:pointer;background:#2a0c07}.igv .strip button .ph{position:absolute;inset:0;width:100%;height:100%;border-radius:0}.igv .strip button[aria-current=true]{opacity:1;transform:scale(1.18);box-shadow:0 0 0 2px #fff;z-index:2}

/* ===== adaptation tous appareils ===== */
html,body{overflow-x:hidden;max-width:100%}.share{grid-template-columns:minmax(0,1fr)}.share>*,.dgrid>*,.rv>*,.split>*,.agenda>*{min-width:0}.field input,.field textarea,.field select{max-width:100%;min-width:0}@media(max-width:560px){.row2{grid-template-columns:minmax(0,1fr)!important}}img,svg,video{max-width:100%}
#mm{top:calc(var(--annh,0px) + 72px)!important;inset-inline:0!important;max-height:calc(100dvh - var(--annh,0px) - 72px)!important}
@media(max-width:1099px){.hd .tools .btn-red.wish{display:none}.hd .tools [data-book]{display:inline-flex}}
@media(max-width:900px){.hd .tools [data-book]{display:none}}
@media(max-width:700px){
.hd .wrap{gap:8px;height:64px}.brand img{width:42px;height:42px}.brand span,.brand b,.brand small{display:none}.brand div{display:none}
.hd .tools{gap:6px;margin-left:auto}.cursel{max-width:92px;padding:.45em .5em;font-size:.82rem}.seg button{padding:.4em .7em}.menub{padding:.5em .9em}
input,select,textarea{font-size:16px!important}
.fabs{display:none!important}
.mbar{display:flex!important;position:fixed;inset:auto 0 0 0;z-index:60;gap:10px;align-items:center;padding:10px 12px calc(10px + env(safe-area-inset-bottom));background:#fff;box-shadow:0 -6px 22px rgba(30,8,4,.18)}
.mbar .btn{flex:1;justify-content:center;white-space:nowrap}.mbar .rb{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;flex:none;box-shadow:0 2px 8px rgba(0,0,0,.2);text-decoration:none}.mbar .rb svg{width:24px;height:24px;fill:currentColor}.mbar .rw{background:#25D366;color:#0b2e17}.mbar .rc{background:#fff;color:#1b8a3b;border:1.5px solid #cfe6d6}
body{padding-bottom:76px}
.snav{right:8px;top:auto;bottom:calc(env(safe-area-inset-bottom) + 92px);transform:none;opacity:0;pointer-events:none;transition:opacity .3s}.snav.live{opacity:.92;pointer-events:auto}.snav #sdn{display:none}.snav button{width:36px;height:36px}
.pop{left:12px!important;right:12px;width:auto!important;bottom:calc(env(safe-area-inset-bottom) + 84px)!important}.pop .pp{height:78px}.pop .pl b{font-size:1.1rem}.pop .pn{padding:10px 14px 14px;font-size:.9rem}.pop .pn p{margin-bottom:10px}
.rvt{left:12px!important;right:12px;width:auto!important;padding:10px 34px 10px 14px}.rvt .rq{font-size:.85rem;margin:2px 0 4px}
dialog.xd{width:100vw!important;max-width:100vw;max-height:100dvh;height:100dvh;border-radius:0}dialog.xd .xh{padding:18px 18px 16px}dialog.xd .xb{padding:18px}
.xs{padding-block:52px}.xs h2{font-size:clamp(1.7rem,7.2vw,2.2rem)}
.pjoin{padding:22px}.ptop{gap:8px}
.igg{grid-template-columns:repeat(3,1fr)}.ial{grid-template-columns:repeat(2,1fr)}
.igv .top{padding:calc(10px + env(safe-area-inset-top)) 12px 8px}
.count{flex-wrap:wrap}.count div{padding:4px 12px!important}.count b{font-size:2.3rem!important}
}
@media(max-width:700px){
html{font-size:15px}body{font-size:15px;line-height:1.5}
.wrap{padding-inline:18px}
.ann{font-size:.76rem}.ann .wrap{padding-block:6px;gap:0 10px;line-height:1.35}
.hd .wrap{height:56px}.brand img{width:38px;height:38px}.hd .tools{gap:5px}
.cursel{font-size:.72rem;padding:.38em .3em .38em .5em;max-width:78px;text-overflow:clip}.seg button{padding:.34em .55em;font-size:.72rem}.menub{padding:.42em .8em;font-size:.78rem}
.hero{min-height:calc(100svh - 30px);padding:92px 0 104px}
.hero h1{font-size:clamp(2rem,9vw,2.6rem);line-height:1.06;margin-top:12px}
.hero .sub{font-size:.98rem;line-height:1.5;margin-top:14px}
.hero .acts{margin-top:20px;gap:10px}.hero .acts .btn{flex:1 1 100%;justify-content:center}
.btn{padding:.78em 1.2em;font-size:.95rem}
.trust{padding:22px 0 0}.trust ul{grid-template-columns:1fr 1fr;gap:0}.trust li{padding:14px 12px;border-left:0!important;border-bottom:1px solid var(--line)}.trust li:nth-child(odd){padding-left:0;border-right:1px solid var(--line)}.trust li:last-child{grid-column:1/-1;border-right:0;border-bottom:0;padding-left:0}.trust b{font-size:1.08rem}.trust span{font-size:.8rem}
.filters{gap:6px 14px}.chip{font-size:.85rem;padding:.35em 0}
.bar{gap:10px;margin-top:22px}.ctl{width:100%}.ctl .search{flex:1 1 100%}.ctl .search input{width:100%}.sel2,.ctl .chip.box{font-size:.85rem;padding:.5em .9em}
.grid3{grid-template-columns:minmax(0,1fr);gap:26px}
.cimg{aspect-ratio:4/3}.peek{padding:.6em;font-size:.85rem;left:10px;right:10px;bottom:10px}
.cb{padding-top:12px}.cb h3{font-size:1.45rem}.cd{font-size:.9rem}.cft{flex-wrap:wrap;font-size:.92rem}.add{font-size:.92rem}
.snav{right:6px;bottom:calc(env(safe-area-inset-bottom) + 86px)}.snav button{width:32px;height:32px}.snav svg{width:16px;height:16px}
.mbar{padding:8px 12px calc(8px + env(safe-area-inset-bottom));gap:8px}.mbar .btn{padding:.7em 1em}.mbar .rb{width:44px;height:44px}.mbar .rb svg{width:22px;height:22px}
body{padding-bottom:68px}
.h2,.xs h2{font-size:clamp(1.6rem,7vw,2rem)!important}.lede{font-size:.95rem}
.pgrid{grid-template-columns:minmax(0,1fr)}
}
@media(max-width:380px){.cursel{max-width:84px}.seg button{padding:.38em .55em;font-size:.74rem}}
@media(min-width:701px){.mbar{display:none!important}}
@media(min-width:701px) and (max-width:1099px){.snav{right:8px}.fabs{right:12px;bottom:12px}}
@media(hover:none){.tm:hover,.sjc:hover,.mb:hover{transform:none}}
@supports(padding:max(0px)){.fabs{bottom:max(16px,env(safe-area-inset-bottom))}}

@media(prefers-reduced-motion:reduce){.igv.on,.igv .vs,.count b.s{animation:none!important;transition:none!important}}
`;
const fabs=`<div class="snav" role="group" aria-label="Navigation de page"><button id="sup" aria-label="Haut de la page" title="Haut de la page"><svg viewBox="0 0 24 24"><path d="M6 14l6-6 6 6M6 19l6-6 6 6" transform="translate(0,-3)"/></svg></button><button id="spv" aria-label="Section précédente" title="Section précédente"><svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg></button><button id="snx" aria-label="Section suivante" title="Section suivante"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button><button id="sdn" aria-label="Bas de la page" title="Bas de la page"><svg viewBox="0 0 24 24"><path d="M6 5l6 6 6-6M6 10l6 6 6-6" transform="translate(0,2)"/></svg></button></div>
<div class="fabs"><button class="fab up" id="up" aria-label="Haut de page">↑</button><div class="mini"><a class="mb ph1" id="mcall" href="tel:+2290197165646" aria-label="Appeler" title="Appeler"><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg></a><a class="mb ml" href="mailto:afatours24@gmail.com" aria-label="Écrire un e-mail" title="E-mail"><svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg></a></div>`;
const soc=`<p class="socl">Suivez-nous</p><div class="soc" id="soc"></div>`;
const igv=`<div class="igv" id="igv" role="dialog" aria-modal="true" aria-label="Photo"><div class="top"><button id="igc">Fermer</button><span class="cnt" id="igcn"></span><a id="igsh" target="_blank" rel="noopener">Partager</a></div><div class="stage" id="igs"><button class="ar l" id="igp" aria-label="Photo précédente">‹</button><button class="ar r" id="ign" aria-label="Photo suivante">›</button></div><p class="cap" id="igcap"></p><div class="strip" id="igst"></div></div>`;
const js=String.raw`
(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const LS={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}}};
const waNum=()=>lang==='en'?'2290161956804':'2290197165646';
window.waNum=waNum;
// numéros selon la langue
const mb=$('.mbar');if(mb){const wsv=($('.fab.wa svg')||{outerHTML:''}).outerHTML;mb.innerHTML='<button class="btn btn-red" data-book data-kind="circuit">Réserver</button><a class="rb rw" id="mwa" href="https://wa.me/2290197165646" target="_blank" rel="noopener" aria-label="WhatsApp">'+wsv+'</a><a class="rb rc" id="mcl" href="tel:+2290197165646" aria-label="Appeler"><svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg></a><span id="nb2" hidden>0</span>'}
function syncLang(){const mw=$('#mwa'),mc=$('#mcl');mw&&(mw.href='https://wa.me/'+waNum());mc&&(mc.href=lang==='en'?'tel:+2290161956804':'tel:+2290197165646');const wa=$('.fab.wa');wa&&(wa.href='https://wa.me/'+waNum());const c=$('#mcall');c&&(c.href=lang==='en'?'tel:+2290161956804':'tel:+2290197165646')}
const oa=applyLang;applyLang=function(){oa();syncLang()};syncLang();
// chrono dynamique (secondes)
L.fr.sec='secondes';L.en.sec='seconds';
tick=function(){const now=new Date(),s=new Date(VD.start+'T00:00:00'),e=new Date(VD.end+'T23:59:59'),el=$('#count');if(!el)return;if(now>e){el.innerHTML='<div style="min-width:0;padding:12px 18px"><b style="font-size:1.1rem">'+t('ended')+'</b></div>';return}if(now>=s){el.innerHTML='<div style="min-width:0;padding:12px 18px"><b style="font-size:1.1rem">'+t('started')+'</b></div>';return}const ms=s-now,d=Math.floor(ms/864e5),h=Math.floor(ms/36e5)%24,m=Math.floor(ms/6e4)%60,sc=Math.floor(ms/1e3)%60,p=n=>String(n).padStart(2,'0');el.innerHTML='<div><b>'+d+'</b>'+t('days')+'</div><div><b>'+p(h)+'</b>'+t('hrs')+'</div><div><b>'+p(m)+'</b>'+t('min')+'</div><div><b class="s">'+p(sc)+'</b>'+t('sec')+'</div>'};
setInterval(tick,1000);tick();
// navigation de page
$('.snav').addEventListener('touchstart',()=>{clearTimeout(snt)},{passive:true});const secs=()=>$$('body > section, main > section, section[id]').filter(s=>s.id&&s.offsetHeight>0).sort((a,b)=>a.offsetTop-b.offsetTop);
function go(y){scrollTo({top:y,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}
$('#sup').onclick=()=>go(0);$('#sdn').onclick=()=>go(document.documentElement.scrollHeight);
$('#spv').onclick=()=>{const y=scrollY+5;const l=secs().filter(s=>s.getBoundingClientRect().top+scrollY-70<y-12).pop();go(l?l.getBoundingClientRect().top+scrollY-70:0)};
$('#snx').onclick=()=>{const y=scrollY+Math.min(innerHeight*.3,160);const n=secs().find(s=>s.getBoundingClientRect().top+scrollY>y+10);if(n)go(n.getBoundingClientRect().top+scrollY-70);else go(document.documentElement.scrollHeight)};
let snt=null;function navst(){const sn=$('.snav');if(scrollY>300){sn.classList.add('live');clearTimeout(snt);snt=setTimeout(()=>sn.classList.remove('live'),2600)}else sn.classList.remove('live');const atTop=scrollY<60,atBot=scrollY+innerHeight>=document.documentElement.scrollHeight-60;$('#sup').disabled=atTop;$('#spv').disabled=atTop;$('#sdn').disabled=atBot;$('#snx').disabled=atBot}
addEventListener('scroll',navst,{passive:true});navst();
// réseaux sociaux
const SO=Object.assign({},(LS.get('afa_cfg',{})||{}).social||{});
const ICO={facebook:['f','Facebook'],instagram:['',"Instagram"],tiktok:['♪','TikTok'],youtube:['',"YouTube"],linkedin:['in','LinkedIn'],whatsapp:['','WhatsApp']};
const SV={instagram:'<svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.3 5.8a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/></svg>',youtube:'<svg viewBox="0 0 24 24"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"/></svg>'};
const wasvg=($('.fab.wa svg')||{outerHTML:''}).outerHTML;SV.whatsapp=wasvg;
window.__renderSoc=()=>{const sc=$('#soc');if(sc)sc.innerHTML=Object.keys(ICO).map(k=>{const u=k==='whatsapp'?'https://wa.me/2290197165646':((window.__SO||{})[k]||SO[k]||'');return '<a href="'+(u||'#')+'" '+(u?'target="_blank" rel="noopener"':'data-todo="1" title="Lien à renseigner dans l’espace admin"')+' aria-label="'+ICO[k][1]+'">'+(SV[k]||ICO[k][0])+'</a>'}).join('');};window.__renderSoc();
document.addEventListener('click',e=>{const a=e.target.closest('a[data-todo]');if(a)e.preventDefault()});
// avis visibles directement sur la page
(function(){const f=$('#rvf'),host=$('#avis .rv .sum'),b=$('#rvw');if(!f||!host)return;b&&(b.style.display='none');const h=document.createElement('h3');h.className='wr';h.textContent='Écrire un avis';host.appendChild(h);host.appendChild(f)})();
// toast d'avis : lien + position en haut
const rt=$('#rvt');if(rt&&!$('.rl',rt)){const a=document.createElement('a');a.className='rl';a.href='#avis';a.textContent='Écrire un avis';rt.appendChild(a)}
const hd=$('.hd');if(rt&&hd){const pos=()=>{rt.style.top=Math.round(hd.getBoundingClientRect().bottom+12)+'px'};pos();addEventListener('scroll',pos,{passive:true});addEventListener('resize',pos)}
// galerie façon Photos
const ig=$('#ig');if(ig&&typeof G!=='undefined'){
let ALB;const mkAlb=()=>{ALB=[['Histoire et mémoire',g=>g.x.theme==='memoire'&&g.x.destination!=='Vodun Days'],['Villes et patrimoine',g=>g.x.theme==='ville'],['Eau et savoir-faire',g=>g.x.theme==='eau'],['Nature et safari',g=>g.x.theme==='nature'],['Vodun Days',g=>g.x.destination==='Vodun Days']].map(([n,f])=>({n,it:G.map((g,i)=>({g,i})).filter(o=>f(o.g))})).filter(a=>a.it.length)};mkAlb();
let view='photos',alb=null,cur=0,list=[];
const sq=(o)=>'<button type="button" data-ph="'+o.i+'" aria-label="'+esc(o.g.cap)+'">'+ph(o.g.x)+'</button>';
function draw(){const all=G.map((g,i)=>({g,i}));let h='';
if(view==='photos'){h='<div class="igh"><div class="igt"><b>Photos</b><span>'+G.length+' photos</span></div><div class="iseg" role="group" aria-label="Affichage"><button data-iv="photos" aria-pressed="true">Photos</button><button data-iv="albums" aria-pressed="false">Albums</button></div></div><div class="igg">'+all.map(sq).join('')+'</div>'}
else if(!alb){h='<div class="igh"><div class="igt"><b>Albums</b><span>'+ALB.length+' albums</span></div><div class="iseg" role="group" aria-label="Affichage"><button data-iv="photos" aria-pressed="false">Photos</button><button data-iv="albums" aria-pressed="true">Albums</button></div></div><div class="ial">'+ALB.map((a,k)=>'<button type="button" data-ia="'+k+'"><span class="cv">'+ph(a.it[0].g.x)+'</span><b>'+esc(a.n)+'</b><small>'+a.it.length+' photo'+(a.it.length>1?'s':'')+'</small></button>').join('')+'</div>'}
else{const a=ALB[alb.k];h='<div class="igh"><button class="iback" data-iv="albums">‹ Albums</button><div class="igt"><b>'+esc(a.n)+'</b><span>'+a.it.length+'</span></div></div><div class="igg">'+a.it.map(sq).join('')+'</div>'}
ig.innerHTML=h}
function mk(i){return '<div class="vs">'+ph(G[i].x)+'</div>'}
function open(i,l){list=l;cur=list.indexOf(i);if(cur<0){cur=0}render(0);$('#igv').classList.add('on');document.body.style.overflow='hidden';$('#igc').focus()}
function render(dir){const i=list[cur],s=$('#igs');$$('.vs',s).forEach(x=>x.remove());const n=document.createElement('div');n.innerHTML=mk(i);const sl=n.firstChild;if(dir){sl.style.transform='translateX('+(dir*100)+'%)';s.appendChild(sl);sl.offsetWidth;sl.style.transform='none'}else s.appendChild(sl);
$('#igcn').textContent=(cur+1)+' / '+list.length;$('#igcap').textContent=G[i].cap;$('#igsh').href='https://wa.me/?text='+encodeURIComponent(G[i].cap+' — AFA Tours '+location.href.split('#')[0]);
$('#igst').innerHTML=list.map((k,j)=>'<button data-st="'+j+'" aria-label="Photo '+(j+1)+'"'+(j===cur?' aria-current="true"':'')+'>'+ph(G[k].x)+'</button>').join('');const c=$('#igst [aria-current]');c&&c.scrollIntoView({inline:'center',block:'nearest'})}
function step(d){cur=(cur+d+list.length)%list.length;render(d)}function close(){$('#igv').classList.remove('on');document.body.style.overflow=''}
document.addEventListener('click',e=>{const p=e.target.closest('[data-ph]');if(p){const i=+p.dataset.ph;open(i,alb?ALB[alb.k].it.map(o=>o.i):G.map((_,k)=>k));return}
const v=e.target.closest('[data-iv]');if(v){view=v.dataset.iv==='photos'?'photos':'albums';alb=null;draw();return}
const a=e.target.closest('[data-ia]');if(a){alb={k:+a.dataset.ia};draw();return}
const s=e.target.closest('[data-st]');if(s){const d=+s.dataset.st-cur;cur=+s.dataset.st;render(d>0?1:d<0?-1:0);return}
if(e.target.closest('#igc'))close();if(e.target.closest('#igp'))step(-1);if(e.target.closest('#ign'))step(1)});
document.addEventListener('keydown',e=>{if(!$('#igv').classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
let sx=0,sy=0,dn=false;const st=$('#igs');st.addEventListener('pointerdown',e=>{if(e.target.closest('.ar'))return;dn=true;sx=e.clientX;sy=e.clientY});st.addEventListener('pointerup',e=>{if(!dn)return;dn=false;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))step(dx<0?1:-1);else if(dy>90&&Math.abs(dy)>Math.abs(dx))close()});
window.__drawGal=()=>{mkAlb();alb=null;view='photos';draw()};draw()}
})();
`;
module.exports={css,fabs,soc,igv,js};
