const css=`.cmore[hidden]{display:none!important}#dlg ul.stops{counter-reset:stp}#dlg ul.stops li:not(.lg){counter-increment:stp}#dlg ul.stops li{position:relative;padding-left:54px!important;min-height:48px;align-content:center}#dlg ul.stops li.lg{background:#faf4ec;opacity:.85}#dlg ul.stops li.lg::before{content:'';position:absolute;top:50%;transform:translateY(-50%);border-radius:50%;background:#cdb9ad;width:10px;height:10px;left:23px}#dlg ul.stops li:not(.lg)::before{content:counter(stp);position:absolute;left:14px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;background:#B51D27;color:#fff;font:800 .88rem/1 system-ui,sans-serif;display:grid;place-items:center}
.grp{display:block;font-size:.78rem;font-weight:600;color:#7a5a4a;margin-top:2px}.grp small{font-size:inherit}

/* ===== couche design : rythme, contrastes, compositions variées ===== */
main>section{position:relative;isolation:isolate}
.kt{height:12px;background:repeating-linear-gradient(90deg,#E8832F 0 44px,#2A0C07 44px 58px,#B51D27 58px 104px,#FBF6EF 104px 112px,#2A0C07 112px 126px)}
main>section.kts::before{content:"";position:absolute;left:0;right:0;top:0;height:10px;z-index:2;background:repeating-linear-gradient(90deg,#E8832F 0 44px,#2A0C07 44px 58px,#B51D27 58px 104px,#FBF6EF 104px 112px,#2A0C07 112px 126px)}
.wm{position:absolute;z-index:-1;pointer-events:none;font:700 clamp(8rem,23vw,21rem)/.78 var(--d,Georgia,serif);letter-spacing:-.045em;color:transparent;background:linear-gradient(180deg,rgba(232,131,47,.24),rgba(232,131,47,0) 82%);-webkit-background-clip:text;background-clip:text;-webkit-text-stroke:2px rgba(181,29,39,.12);white-space:nowrap;top:.32em;right:3vw;will-change:transform}
.wm.l{right:auto;left:3vw}
.dk .wm,#approche .wm,#agenda .wm{background-image:linear-gradient(180deg,rgba(232,131,47,.3),rgba(232,131,47,0) 82%);-webkit-text-stroke-color:rgba(232,131,47,.3)}
main>section{overflow-x:clip}
/* titres : plus de caractère */
main .sec .h2,main .xs h2{font-size:clamp(2.1rem,4.6vw,3.7rem);line-height:1.02;letter-spacing:-.022em}
/* CIRCUITS : en-tête centré + carte vedette */
#circuits>.wrap>.eyebrow,#circuits>.wrap>.h2,#circuits>.wrap>.lede{text-align:center;margin-left:auto;margin-right:auto;justify-content:center}
#circuits>.wrap>.lede{max-width:56ch}
#circuits{background:linear-gradient(180deg,#fff 0,#FBF6EF 100%)}
@media(min-width:1000px){
 #grid.coll>*:nth-child(n+6){display:none!important}
 #grid{grid-auto-flow:dense}
 #grid>.card:first-child{grid-column:1/-1;display:grid;grid-template-columns:1.15fr 1fr;background:#2A0C07;color:#FBF6EF;border:0;min-height:0;overflow:hidden}
 #grid>.card:first-child .cimg{position:relative;inset:auto;height:100%!important;min-height:440px;aspect-ratio:auto;border-radius:0}
 #grid>.card:first-child .cimg img{object-position:50% 52%}
 #grid>.card:first-child .cb{display:flex;flex-direction:column;justify-content:center;padding:44px 44px 40px;background:none;color:#FBF6EF}
 #grid>.card:first-child .cb *{color:#FBF6EF}
 #grid>.card:first-child h3{font-size:clamp(2.4rem,3.6vw,3.4rem);line-height:1}
 #grid>.card:first-child .ct{font-size:1.15rem;margin:6px 0 14px;opacity:.85}
 #grid>.card:first-child .cd{font-size:1.02rem;line-height:1.6;max-width:44ch}
 #grid>.card:first-child .ctheme{color:#E8832F!important}
 #grid>.card:first-child .cft{border-top:1px solid rgba(251,246,239,.25)!important;margin-top:20px}
 #grid>.card:first-child .price{color:#E8832F!important}
 #grid>.card:first-child .add{align-self:flex-start;margin-top:18px;background:#E8832F;color:#2A0C07!important;text-decoration:none!important;padding:13px 24px;border-radius:999px;font-weight:800}
 #grid>.card:first-child .add.is-in{background:#2f9e5b;color:#fff!important}
}
#grid>.card .heart{z-index:5}
#dlg ul.stops{display:grid;gap:8px;padding:0;margin:8px 0 14px;list-style:none}#dlg ul.stops li{display:grid;gap:2px;width:100%;border-radius:16px;padding:10px 14px;background:#FFF1E0;border:0}#dlg ul.stops li b{color:#B51D27;font-weight:700}#dlg ul.stops li span{color:#4a2a23;font-size:.96rem}
#da{display:none!important}
/* SEJOURS : fond chaud, grands chiffres en contour */
#sejours{background:#FFF1E0!important;overflow:hidden;padding-top:0!important}
#sejours>.wrap{padding-top:clamp(64px,8vw,104px)}
#sejours h2{color:#2A0C07}#sejours .lede{color:#4a2a23}
#sejours .sjc{background:#fff;border:1px solid #ecd6bd;box-shadow:0 18px 40px -26px rgba(42,12,7,.45)}
#sejours .sjc .dn{font-size:clamp(4rem,6vw,5.6rem);color:transparent;-webkit-text-stroke:2px #B51D27;line-height:.9}
#sejours .sjc .dn small{-webkit-text-stroke:0;color:#7a3a2c}
#sejours .sjc.hl{background:linear-gradient(150deg,#B51D27,#6e0d15);border:0;color:#fff}
#sejours .sjc.hl *{color:#fff}#sejours .sjc.hl .dn{-webkit-text-stroke-color:#fff}#sejours .sjc.hl .dn small{color:#ffd9b8}
#sejours .sjc.hl .btn{background:#E8832F;border-color:#E8832F;color:#2A0C07}
#sejours .sjc .pr2{color:#9d1620}#sejours .sjc.hl .pr2{color:#ffd9b8}
#sejours>.wrap>p:not(.ey),#sejours>.wrap>small,#sejours .fnote{color:#4a2a23!important}
@media(min-width:1000px){#sejours .sj{align-items:start}#sejours .sjc:nth-child(2n){margin-top:44px}}
.mq{overflow:hidden;white-space:nowrap;background:#E8832F;color:#2A0C07;margin:0 calc(50% - 50vw);border-block:2px solid #2A0C07;position:relative}
.mq>div{display:inline-block;padding:13px 0;font:700 1.05rem var(--d,Georgia,serif);letter-spacing:.04em;animation:mq 38s linear infinite}
.mq span{margin:0 22px}.mq i{font-style:normal;color:#2A0C07}
@keyframes mq{to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.mq>div{animation:none}}
#sejours .btn-red{color:#fff}
/* GALERIE & BLOG */
#galerie>.wrap>.eyebrow,#galerie>.wrap>.h2,#galerie>.wrap>.lede{text-align:center;margin-inline:auto;justify-content:center}
#blog{background:#fff!important}
@media(min-width:900px){
 #bgrid{grid-template-columns:1.35fr 1fr 1fr}
 #bgrid>.bc:first-child{grid-row:span 2}
 #bgrid>.bc:first-child h3{font-size:1.9rem}
}
/* PARTENAIRES : fond chaud */
#partenaires{background:#FFF1E0!important;clip-path:polygon(0 3vw,100% 0,100% 100%,0 100%);padding-top:calc(clamp(64px,9vw,112px) + 3vw)!important;margin-top:-3vw}
#partenaires .pc{border-top:5px solid #E8832F}
/* PRATIQUE : FAQ en deux colonnes */
@media(min-width:960px){
 #pratique>.wrap{display:grid;grid-template-columns:.8fr 1.4fr;gap:clamp(30px,6vw,90px);align-items:start}
 #pratique>.wrap>div:first-child{position:sticky;top:150px}
}
/* APPROCHE : section brune */
#approche{background:#2A0C07;color:#FBF6EF}
#approche .eyebrow,#approche .eyebrow *{color:#E8832F}
#approche .h2{color:#FBF6EF}
#approche .apl .lede{color:#e9d9cb}
#approche .vlist{border:0}
#approche .vlist>div{border-color:rgba(251,246,239,.2)!important;border-top:1px solid rgba(251,246,239,.2)}
#approche .vlist h3{color:#E8832F}#approche .vlist p{color:#e9d9cb}
#approche .btn-out{color:#FBF6EF;border-color:#FBF6EF}
@media(min-width:900px){#approche .vlist{display:grid;grid-template-columns:1fr 1fr;gap:0 34px}#approche .vlist>div:nth-child(odd):last-child{grid-column:1/-1}}
/* EQUIPE : cartes décalées */
#equipe{background:#FBF6EF!important}
@media(min-width:900px){#equipe .team{align-items:start}#equipe .tm:nth-child(2){margin-top:44px}#equipe .tm:nth-child(3){margin-top:12px}}
#equipe .tm{border-radius:26px;box-shadow:0 18px 40px -22px rgba(42,12,7,.4)}
/* AVIS : grande citation */
#avis{background:#fff;overflow:hidden}
#avis::after{content:"\\201C";position:absolute;z-index:-1;left:3%;top:-.12em;font:700 clamp(14rem,30vw,26rem)/1 Georgia,serif;color:rgba(232,131,47,.16);pointer-events:none}
#avis>.wrap>.eyebrow,#avis>.wrap>.h2{text-align:right;justify-content:flex-end}
/* DEVIS : rouge + motif */
#devis{background:linear-gradient(135deg,#B51D27,#8d1019)}
#devis::after{content:"";position:absolute;inset:0;z-index:-1;opacity:.12;background:repeating-linear-gradient(45deg,#fff 0 2px,transparent 2px 22px)}
/* lisibilité */
.pgbar a[aria-current=page] small{opacity:1}
.rvs .stars2 button{color:#C77A12}
.rate label{color:#a8938a}.rate label.on{color:var(--red)}
#sejours .lede,#sejours .lede.in,#sejours p.lede{color:#4a2a23!important;opacity:1}
.btn-or{color:#2A0C07!important}
/* remplissage : questions, devis */
.sidecard{margin-top:28px;background:#fff;border:1px solid #ecd6bd;border-radius:22px;padding:22px 24px;box-shadow:0 18px 40px -28px rgba(42,12,7,.5)}
.sidecard b{display:block;font:700 1.15rem var(--d,Georgia,serif);color:#2A0C07;margin-bottom:6px}
.sidecard p{margin:0 0 14px;color:#4a2a23;font-size:.98rem}
.sidecard .row{display:flex;flex-wrap:wrap;gap:10px}
.steps{list-style:none;margin:34px 0 0;padding:0;display:grid;gap:14px;max-width:34em}
.steps li{display:flex;gap:14px;align-items:flex-start;color:#fff;font-size:1.02rem;line-height:1.45}
.steps li i{flex:none;width:38px;height:38px;border-radius:50%;border:2px solid #fff;display:grid;place-items:center;font:700 1rem var(--d,Georgia,serif);font-style:normal}
.steps li b{display:block;font-size:1.05rem}
#avis .rv>*:nth-child(2){align-self:start}

/* EN-TETES DE PAGE */
.phero{position:relative;isolation:isolate;padding:168px 0 64px;color:#FBF6EF;overflow:hidden}
.phero.pb{background:#2A0C07}
.phero.po{background:#E8832F;color:#2A0C07}
.phero.pr{background:#B51D27}
.phero .wrap{position:relative;z-index:1}
.phero .eyebrow{color:inherit!important;opacity:.85;margin:0 0 14px}
.phero h1{font-family:var(--d,Georgia,serif);font-weight:700;font-size:clamp(2.2rem,6vw,4.6rem);line-height:1.02;letter-spacing:-.02em;margin:0 0 18px;max-width:15ch;color:inherit}
.phero .lede{color:inherit!important;opacity:.92;max-width:46ch;font-size:clamp(1rem,1.6vw,1.2rem);margin:0 0 28px}
.phero .chips{display:flex;flex-wrap:wrap;gap:10px}
.phero .chips a{display:inline-block;padding:11px 20px;border:2px solid currentColor;border-radius:999px;color:inherit;text-decoration:none;font-weight:700;font-size:.95rem;transition:background .2s,color .2s}
.phero.pb .chips a:hover,.phero.pr .chips a:hover{background:#FBF6EF;color:#2A0C07}
.phero.po .chips a:hover{background:#2A0C07;color:#FBF6EF}
.phero::after{content:"";position:absolute;left:0;right:0;bottom:0;height:12px;background:repeating-linear-gradient(90deg,#E8832F 0 26px,#2A0C07 26px 40px,#B51D27 40px 66px,#FBF6EF 66px 80px)}
.phero.po::after{background:repeating-linear-gradient(90deg,#2A0C07 0 26px,#B51D27 26px 40px,#FBF6EF 40px 66px,#2A0C07 66px 80px)}
.phero::before{content:"";position:absolute;right:-8%;top:-30%;width:min(60vw,640px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(251,246,239,.16),rgba(251,246,239,0) 68%);z-index:0}
@media(min-width:900px){.phero{padding-top:190px}}
/* MOTS GEANTS : cadre qui coupe */
.wmw{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:-1}
.wmw .wm{z-index:auto}
/* PAGES 2-4 : cartes */
#approche .vlist{display:grid;grid-template-columns:1fr;gap:14px}
#approche .vlist>div{background:#fff;border:1px solid rgba(42,12,7,.1);border-left:6px solid #E8832F;border-radius:14px;padding:18px 20px;box-shadow:0 8px 24px rgba(42,12,7,.06)}
#approche .vlist>div:nth-child(3n+2){border-left-color:#B51D27}
#approche .vlist>div:nth-child(3n){border-left-color:#2A0C07}
#approche .vlist h3{margin:0 0 6px;color:#2A0C07!important}#approche .vlist p{color:#4a2a23!important}
@media(min-width:900px){#approche .vlist{grid-template-columns:1fr 1fr}#approche .vlist>div:last-child:nth-child(odd){grid-column:1/-1}}
#faq{display:grid;gap:12px;border-top:0!important}
#faq>*{background:#fff;border:1px solid rgba(42,12,7,.12)!important;border-radius:14px;padding:6px 18px;box-shadow:0 6px 18px rgba(42,12,7,.05)}
@media(min-width:900px){#faq{grid-template-columns:1fr 1fr;align-items:start}}
@media(min-width:900px){#bgrid>.bc:first-child:last-child{grid-column:1/-1;flex-direction:row}}
#equipe .team .tm{border-radius:18px;box-shadow:0 12px 30px rgba(42,12,7,.08)}
#galerie .shcard{border-radius:18px;box-shadow:0 14px 34px rgba(42,12,7,.1)}
@media(min-width:900px){#galerie .share{grid-template-columns:1fr 1.1fr;align-items:start}}

#grid .add.is-in{color:#1c7a3d!important;text-decoration:none!important;font-weight:800;cursor:default;opacity:1}
#dbk:disabled{background:#2f9e5b!important;border-color:#2f9e5b!important;color:#fff!important;opacity:1;cursor:default}
/* PROTECTION LEGERE DES IMAGES */
img,.ph,.cimg,.ig a{-webkit-touch-callout:none;-webkit-user-drag:none}
img{user-select:none;-webkit-user-select:none}
@media print{body>*{display:none!important}body::before{content:"© AFA TOURS — Afrique Authentique Innovant";display:block;padding:40px;font:700 20px Georgia,serif}}
/* ALLEGEMENT : moins de boutons flottants, séjours sur une ligne, bandeau de confiance sobre */
.fabs .mb.ph1,.fabs .mb.ml,.fabs .mb.mr,.snav #sup,.snav #sdn{display:none!important}
#sejours .sjc.hl .dn{font-size:clamp(1.9rem,2.5vw,2.7rem)!important;-webkit-text-stroke:0!important;color:#fff!important;line-height:1.02;overflow-wrap:anywhere;hyphens:auto}
@media(min-width:1100px){#sejours .sj{grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:16px}#sejours .sjc{padding:20px}}
@media(min-width:701px) and (max-width:1099px){#sejours .sj{grid-template-columns:repeat(2,minmax(0,1fr))!important}#sejours .sjc.hl{grid-column:1/-1}#sejours .sjc:nth-child(2n){margin-top:0}}
@media(min-width:701px){.trust ul{display:flex!important;flex-wrap:wrap;justify-content:center;gap:8px 34px!important;padding:0}.trust li{display:flex!important;align-items:baseline;gap:.55em;border:0!important;padding:6px 0!important;text-align:left}.trust li b{font-size:1rem!important}.trust li span{display:none}.trust li{white-space:nowrap}.trust ul{gap:4px 30px!important}@media(min-width:1100px){.trust ul{flex-wrap:nowrap!important}}.trust li+li::before{content:"✦";color:#E8832F;margin-right:26px;font-size:.8rem}}
/* TÉLÉPHONE */
@media(max-width:700px){
 #sejours>.wrap{max-width:100vw;overflow:hidden}
 #sejours .sj{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory;gap:14px;margin-inline:-18px;padding:6px 18px 18px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
 #sejours .sj::-webkit-scrollbar{display:none}
 #sejours .sjc{flex:0 0 80%;scroll-snap-align:center;margin-top:0!important}
 .wm{top:.6em}
 #sejours .sjc .dn{font-size:3.8rem}
 #avis>.wrap>.eyebrow,#avis>.wrap>.h2{text-align:left;justify-content:flex-start}
 #partenaires{clip-path:polygon(0 18px,100% 0,100% 100%,0 100%);padding-top:calc(52px + 18px)!important;margin-top:-18px}
 #grid>.card:first-child{grid-column:1/-1}
}
`;
const js=String.raw`
(function(){
var D=document;
function wm(id,fr,en,left){var s=D.getElementById(id);if(!s||s.querySelector('.wm'))return;var c=D.createElement('div');c.className='wmw';c.setAttribute('aria-hidden','true');var w=D.createElement('span');w.className='wm'+(left?' l':'');w.textContent=fr;w.dataset.fr=fr;w.dataset.en=en;c.appendChild(w);s.insertBefore(c,s.firstChild)}
function fit(){var vw=D.documentElement.clientWidth||innerWidth;D.querySelectorAll('.wm').forEach(function(w){w.style.fontSize='100px';var bw=w.getBoundingClientRect().width||1;var f=Math.min(100*vw*.84/bw,vw*.23,336);w.style.fontSize=Math.max(f,48).toFixed(1)+'px'})}
function lg(){return document.documentElement.lang==='en'}
function sync(){var ch=0;D.querySelectorAll('.wm').forEach(function(w){var t=lg()?w.dataset.en:w.dataset.fr;if(w.textContent!==t){w.textContent=t;ch=1}});if(ch)fit()}
[['circuits','BÉNIN','BENIN',0],['agenda','VODUN','VODUN',1],['approche','AUTHENTIQUE','AUTHENTIC',1]].forEach(function(a){wm(a[0],a[1],a[2],a[3])});
var tk=0;var rz;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(fit,120)});addEventListener('orientationchange',function(){setTimeout(fit,250)});if(D.fonts&&D.fonts.ready)D.fonts.ready.then(fit);addEventListener('load',fit);function par(){tk=0;var vh=innerHeight;D.querySelectorAll('.wm').forEach(function(w){var s=w.parentNode,r=s.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;var p=(r.top+r.height/2-vh/2)/vh;w.style.transform='translate3d('+(p*-22)+'px,'+(p*40)+'px,0)'})}
addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(par)}},{passive:true});
['galerie','partenaires','approche','avis','devis','pratique'].forEach(function(i){var s=D.getElementById(i);if(s)s.classList.add('kts')});
var sj=D.getElementById('sejours');
if(sj&&!sj.querySelector('.mq')){var P=['Porto-Novo','Ouidah','Ganvié','Abomey','Cotonou','Grand-Popo','Adjarra','Dassa-Zoumè','Natitingou','Possotomé'],h=P.map(function(p){return '<span>'+p+'</span><i>✦</i>'}).join('');var m=D.createElement('div');m.className='mq';m.setAttribute('aria-hidden','true');m.innerHTML='<div>'+h+h+h+h+'</div>';sj.insertBefore(m,sj.firstChild)}
new MutationObserver(sync).observe(D.documentElement,{attributes:true,attributeFilter:['lang']});
setInterval(sync,1500);sync();fit();par();
})();

(function(){
var D=document;function en(){return D.documentElement.lang==='en'}
function sc(){var w=D.querySelector('#pratique>.wrap>div:first-child');if(w&&!w.querySelector('.sidecard')){var c=D.createElement('div');c.className='sidecard';c.innerHTML='<b data-sc="t"></b><p data-sc="p"></p><div class="row"><a class="btn btn-red btn-sm" data-wa href="https://wa.me/2290197165646" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn-out btn-sm" href="mailto:afatours23@gmail.com">E-mail</a></div>';w.appendChild(c)}
 var c2=D.querySelector('.sidecard');if(c2){c2.querySelector('[data-sc=t]').textContent=en()?'Still a question?':'Une autre question ?';c2.querySelector('[data-sc=p]').textContent=en()?'Write to us in English or French. A real person answers, usually within 24 hours.':'Écrivez-nous en français ou en anglais. Une vraie personne vous répond, en général sous 24 h.'}
 var d=D.querySelector('#devis>.wrap>div:first-child');if(d){var st=d.querySelector('.steps');if(!st){st=D.createElement('ol');st.className='steps';d.appendChild(st)}var T=en()?[['You write to us','Tell us your dates and what you would like to see.'],['We reply within 24 h','With a clear proposal and a price.'],['You approve, we organise','Guides, transport, meals: we take care of the rest.']]:[['Vous nous écrivez','Dites-nous vos dates et ce que vous aimeriez voir.'],['Nous répondons sous 24 h','Avec une proposition claire et un prix.'],['Vous validez, nous organisons','Guides, transport, repas : nous nous occupons du reste.']];st.innerHTML=T.map(function(x,i){return '<li><i>'+(i+1)+'</i><span><b>'+x[0]+'</b>'+x[1]+'</span></li>'}).join('')}}
sc();setInterval(sc,1500);
})();

/* chargement fiable des photos : certains navigateurs mobiles n'amorcent pas le chargement différé après changement de page */
(function(){
function kick(){var vh=innerHeight;document.querySelectorAll('#gal img,#grid img,.bc img,.rv img').forEach(function(i){if(i.complete&&i.naturalWidth)return;var p=i.closest('button,div,article,figure')||i;var r=p.getBoundingClientRect();if(r.height===0&&r.width===0)return;if(r.top<vh*3&&r.bottom>-vh*2){if(i.loading!=='eager'){i.loading='eager';var s=i.getAttribute('src');if(s){i.removeAttribute('src');i.setAttribute('src',s)}}}})}
addEventListener('scroll',kick,{passive:true});addEventListener('hashchange',function(){setTimeout(kick,200);setTimeout(kick,900)});setInterval(kick,1200);setTimeout(kick,300);
})();
`;
module.exports={css,js};
