const css=`
/* ===== couche design : rythme, contrastes, compositions variées ===== */
main>section{position:relative;isolation:isolate}
.kt{height:12px;background:repeating-linear-gradient(90deg,#E8832F 0 44px,#2A0C07 44px 58px,#B51D27 58px 104px,#FBF6EF 104px 112px,#2A0C07 112px 126px)}
main>section.kts::before{content:"";position:absolute;left:0;right:0;top:0;height:10px;z-index:2;background:repeating-linear-gradient(90deg,#E8832F 0 44px,#2A0C07 44px 58px,#B51D27 58px 104px,#FBF6EF 104px 112px,#2A0C07 112px 126px)}
.wm{position:absolute;z-index:-1;pointer-events:none;font:700 clamp(8rem,23vw,21rem)/.78 var(--d,Georgia,serif);letter-spacing:-.045em;color:transparent;background:linear-gradient(180deg,rgba(232,131,47,.24),rgba(232,131,47,0) 82%);-webkit-background-clip:text;background-clip:text;-webkit-text-stroke:2px rgba(181,29,39,.12);white-space:nowrap;top:.32em;right:-2vw;will-change:transform}
.wm.l{right:auto;left:-2vw}
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
 #grid>.card:first-child{grid-column:span 2;grid-row:span 2;position:relative;color:#fff;background:#2A0C07;border:0;min-height:560px}
 #grid>.card:first-child .cimg{position:absolute;inset:0;height:100%!important;aspect-ratio:auto;border-radius:0}
 #grid>.card:first-child .cb{position:relative;margin-top:auto;padding:150px 30px 30px;background:linear-gradient(180deg,transparent,rgba(42,12,7,.55) 38%,rgba(42,12,7,.94));color:#fff}
 #grid>.card:first-child .cb *{color:#fff}
 #grid>.card:first-child h3{font-size:clamp(2.2rem,3.4vw,3.2rem);line-height:1}
 #grid>.card:first-child .ctheme{color:#E8832F!important}
 #grid>.card:first-child .add,#grid>.card:first-child .cb a{color:#fff!important;text-decoration:underline}
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
#sejours>.wrap>p:not(.ey),#sejours .fnote{color:#e9d9cb!important}#sejours .btn-red{color:#fff}
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
/* TÉLÉPHONE */
@media(max-width:700px){
 #sejours>.wrap{max-width:100vw;overflow:hidden}
 #sejours .sj{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory;gap:14px;margin-inline:-18px;padding:6px 18px 18px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
 #sejours .sj::-webkit-scrollbar{display:none}
 #sejours .sjc{flex:0 0 80%;scroll-snap-align:center;margin-top:0!important}
 .wm{font-size:5.5rem;top:.6em}
 #sejours .sjc .dn{font-size:3.8rem}
 #avis>.wrap>.eyebrow,#avis>.wrap>.h2{text-align:left;justify-content:flex-start}
 #partenaires{clip-path:polygon(0 18px,100% 0,100% 100%,0 100%);padding-top:calc(52px + 18px)!important;margin-top:-18px}
 #grid>.card:first-child{grid-column:1/-1}
}
`;
const js=String.raw`
(function(){
var D=document;
function wm(id,fr,en,left){var s=D.getElementById(id);if(!s||s.querySelector('.wm'))return;var w=D.createElement('span');w.className='wm'+(left?' l':'');w.setAttribute('aria-hidden','true');w.textContent=fr;w.dataset.fr=fr;w.dataset.en=en;s.insertBefore(w,s.firstChild)}
function lg(){return document.documentElement.lang==='en'}
function sync(){D.querySelectorAll('.wm').forEach(function(w){w.textContent=lg()?w.dataset.en:w.dataset.fr})}
[['circuits','BÉNIN','BENIN',0],['agenda','VODUN','VODUN',1],['sejours','AFRIQUE','AFRICA',0],['galerie','IMAGES','IMAGES',1],['blog','RÉCITS','STORIES',0],['partenaires','ACCUEIL','WELCOME',1],['pratique','ASTUCES','TIPS',0],['approche','AUTHENTIQUE','AUTHENTIC',1],['equipe','NOUS','US',0],['avis','MERCI','THANKS',1],['devis','PARLONS','HELLO',0]].forEach(function(a){wm(a[0],a[1],a[2],a[3])});
var tk=0;function par(){tk=0;var vh=innerHeight;D.querySelectorAll('.wm').forEach(function(w){var s=w.parentNode,r=s.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;var p=(r.top+r.height/2-vh/2)/vh;w.style.transform='translate3d('+(p*-70)+'px,'+(p*40)+'px,0)'})}
addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(par)}},{passive:true});
['galerie','partenaires','approche','avis','devis','pratique'].forEach(function(i){var s=D.getElementById(i);if(s)s.classList.add('kts')});
var sj=D.getElementById('sejours');
if(sj&&!sj.querySelector('.mq')){var P=['Porto-Novo','Ouidah','Ganvié','Abomey','Cotonou','Grand-Popo','Adjarra','Dassa-Zoumè','Natitingou','Possotomé'],h=P.map(function(p){return '<span>'+p+'</span><i>✦</i>'}).join('');var m=D.createElement('div');m.className='mq';m.setAttribute('aria-hidden','true');m.innerHTML='<div>'+h+h+h+h+'</div>';sj.insertBefore(m,sj.firstChild)}
new MutationObserver(sync).observe(D.documentElement,{attributes:true,attributeFilter:['lang']});
setInterval(sync,1500);sync();par();
})();

(function(){
var D=document;function en(){return D.documentElement.lang==='en'}
function sc(){var w=D.querySelector('#pratique>.wrap>div:first-child');if(w&&!w.querySelector('.sidecard')){var c=D.createElement('div');c.className='sidecard';c.innerHTML='<b data-sc="t"></b><p data-sc="p"></p><div class="row"><a class="btn btn-red btn-sm" data-wa href="https://wa.me/2290197165646" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn-out btn-sm" href="mailto:afatours23@gmail.com">E-mail</a></div>';w.appendChild(c)}
 var c2=D.querySelector('.sidecard');if(c2){c2.querySelector('[data-sc=t]').textContent=en()?'Still a question?':'Une autre question ?';c2.querySelector('[data-sc=p]').textContent=en()?'Write to us in English or French. A real person answers, usually within 24 hours.':'Écrivez-nous en français ou en anglais. Une vraie personne vous répond, en général sous 24 h.'}
 var d=D.querySelector('#devis>.wrap>div:first-child');if(d){var st=d.querySelector('.steps');if(!st){st=D.createElement('ol');st.className='steps';d.appendChild(st)}var T=en()?[['You write to us','Tell us your dates and what you would like to see.'],['We reply within 24 h','With a clear proposal and a price.'],['You approve, we organise','Guides, transport, meals: we take care of the rest.']]:[['Vous nous écrivez','Dites-nous vos dates et ce que vous aimeriez voir.'],['Nous répondons sous 24 h','Avec une proposition claire et un prix.'],['Vous validez, nous organisons','Guides, transport, repas : nous nous occupons du reste.']];st.innerHTML=T.map(function(x,i){return '<li><i>'+(i+1)+'</i><span><b>'+x[0]+'</b>'+x[1]+'</span></li>'}).join('')}}
sc();setInterval(sc,1500);
})();
`;
module.exports={css,js};
