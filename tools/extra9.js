const css=`
html.pgs .pgoff{display:none!important}
.segs{display:none!important}
#grid.coll>*:nth-child(n+5){display:none}@media(min-width:701px){#grid.coll>*:nth-child(n+5){display:initial}#grid.coll>*:nth-child(n+7){display:none}}
.cmore{display:block;margin:22px auto 0;border:2px solid #2A0C07;background:#fff;color:#2A0C07;border-radius:99px;padding:14px 28px;font:700 1rem inherit;cursor:pointer}.cmore:active,.cmore.tp{transform:scale(.97);background:#E8832F}
html .appsec .apl{top:150px}
@media(max-width:859px){
.dock{margin-top:-48px}
.dock .finder{grid-template-columns:1fr 1fr;gap:0;border-radius:24px;padding:14px;background:#fff;border:0;box-shadow:0 26px 60px -18px rgba(42,12,7,.55);overflow:visible}
.dock .finder label{padding:0;border:0;gap:5px;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;color:#8a6a60;margin:0 0 12px}
.dock .finder label:first-of-type{grid-column:1/-1}
.dock .finder label:nth-of-type(2){padding-right:6px}.dock .finder label:nth-of-type(3){padding-left:6px}
.dock .finder select{width:100%;padding:13px 12px;border:2px solid #f0e4d6;border-radius:14px;background:#FBF6EF;font:700 .98rem var(--b,inherit);color:#2A0C07;text-transform:none;letter-spacing:0}
.dock .finder>button,.dock .finder .btn{grid-column:1/-1;border-radius:14px;padding:15px;font-size:1.02rem}
}
html[data-pg="2"] .ann,html[data-pg="3"] .ann,html[data-pg="4"] .ann{display:none}
html[data-pg="2"] main,html[data-pg="3"] main,html[data-pg="4"] main,html.pgfx[data-pg="2"] main,html.pgfx[data-pg="3"] main,html.pgfx[data-pg="4"] main{padding-top:0}
html.pgfx{scroll-padding-top:128px}
.pgfix{position:fixed;left:0;right:0;z-index:48;display:none;justify-content:center;gap:6px;padding:6px 10px;background:rgba(251,246,239,.97);backdrop-filter:blur(8px);border-bottom:1px solid rgba(42,12,7,.12);box-shadow:0 6px 16px rgba(42,12,7,.08)}
html.pgfx .pgfix{display:flex}
.pgfix a{flex:0 1 190px;text-align:center;padding:9px 12px;border-radius:99px;color:#2A0C07;text-decoration:none;font:700 .92rem var(--b,inherit);border:2px solid transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pgfix a[aria-current=page]{background:#E8832F;border-color:#E8832F}
@media(hover:hover){.pgfix a:not([aria-current]):hover{border-color:#E8832F}}
.pgfix a.tp{transform:scale(.96)}
@media(max-width:700px){.pgfix{gap:3px;padding:5px 6px}.pgfix a{flex:1 1 0;padding:9px 2px;font-size:.8rem}}
.rvs.rvs2{margin:0}
html:not([data-pg="1"]) .pgbar{display:none}
.pgbar{max-width:1180px;margin:0 auto;padding:18px clamp(18px,4vw,56px) 0;display:flex;gap:8px;flex-wrap:wrap;align-items:stretch}
.pgbar a{flex:1 1 180px;display:flex;flex-direction:column;gap:2px;padding:12px 18px;border-radius:18px;background:#fff;border:2px solid rgba(42,12,7,.14);color:#2A0C07;text-decoration:none;transition:transform .2s,border-color .2s,background .2s}
.pgbar a b{font:800 1.02rem var(--d,Georgia,serif)}.pgbar a small{font-size:.8rem;opacity:.72}
.pgbar a[aria-current=page]{background:#E8832F;border-color:#E8832F;color:#2A0C07}
@media(max-width:700px){.pgbar{gap:6px}.pgbar a{flex:1 1 0;padding:11px 6px;text-align:center;border-radius:14px}.pgbar a small{display:none}.pgbar a b{font-size:.92rem}}
@media(hover:hover){.pgbar a:hover{transform:translateY(-2px);border-color:#E8832F}}
.pgbar a.tp,.pgbar a:active{transform:scale(.97);border-color:#E8832F}
.pgnext{max-width:1180px;margin:0 auto;padding:36px clamp(18px,4vw,56px) 56px;display:flex;gap:12px;flex-wrap:wrap;justify-content:space-between}
.pgnext a{flex:1 1 240px;display:flex;align-items:center;gap:14px;padding:18px 22px;border-radius:22px;background:#2A0C07;color:#FBF6EF;text-decoration:none;font-weight:700;transition:transform .2s}
.pgnext a.pv{background:#fff;color:#2A0C07;border:2px solid rgba(42,12,7,.18)}
.pgnext a span{display:flex;flex-direction:column}.pgnext a small{font-weight:500;opacity:.75;font-size:.8rem}.pgnext a i{font:normal 1.6rem/1 system-ui;margin-left:auto}.pgnext a.pv i{margin:0 6px 0 0}
.pgnext a:only-child{max-width:520px;margin-left:auto}.pgnext a.pv:only-child{margin:0}
@media(hover:hover){.pgnext a:hover{transform:translateY(-2px)}}.pgnext a.tp{transform:scale(.97)}
`;
const js=String.raw`
(function(){
var D=document,H=D.documentElement;
var PG=[
 {id:1,fr:'Circuits',en:'Tours',sf:'Circuits, séjours, Vodun Days',ids:['circuits','agenda','sejours']},
 {id:2,fr:'Bibliothèque',en:'Library',sf:'Photos, blog, souvenirs',ids:['phero2','galerie','blog']},
 {id:3,fr:'Réservations',en:'Bookings',sf:'Devis, partenaires, questions',ids:['phero3','devis','partenaires','pratique']},
 {id:4,fr:'Notre équipe',en:'Our team',sf:'Approche, équipe, avis',ids:['phero4','approche','equipe','avis']}];
var HERO={
 2:{c:'pb',fr:{e:'Bibliothèque',t:'Photos, blog et souvenirs du Bénin',l:'Regardez, lisez, partagez : les images de nos voyages, les histoires du pays et vos propres photos.',ch:[['Photos','#galerie'],['Blog','#blog'],['Partager mes photos','#galerie|.share']]},en:{e:'Library',t:'Photos, blog and memories of Benin',l:'Look, read, share: pictures from our trips, stories from the country and your own photos.',ch:[['Photos','#galerie'],['Blog','#blog'],['Share my photos','#galerie|.share']]}},
 3:{c:'po',fr:{e:'Réservations',t:'Réservez votre voyage, sans stress',l:'Choisissez un circuit ou décrivez votre envie : nous répondons sous 24 h et nous organisons le reste.',ch:[['Demander un devis','#devis'],['Hôtels, restaurants, transport','#partenaires'],['Questions fréquentes','#pratique']]},en:{e:'Bookings',t:'Book your trip, stress-free',l:'Pick a tour or describe what you want: we reply within 24 hours and organise the rest.',ch:[['Request a quote','#devis'],['Hotels, restaurants, transport','#partenaires'],['Frequently asked questions','#pratique']]}},
 4:{c:'pr',fr:{e:'Notre équipe',t:'Des Béninois qui vous accueillent',l:'Une équipe jeune et passionnée, qui connaît chaque lieu et chaque personne que vous allez rencontrer.',ch:[['Notre approche','#approche'],['L’équipe','#equipe'],['Avis des voyageurs','#avis']]},en:{e:'Our team',t:'Beninese hosts who welcome you',l:'A young, passionate team that knows every place and every person you will meet.',ch:[['Our approach','#approche'],['The team','#equipe'],['Traveller reviews','#avis']]}}};

var main=D.getElementById('top');if(!main)return;
[2,3,4].forEach(function(n){if(D.getElementById('phero'+n))return;var s=D.createElement('section');s.id='phero'+n;s.className='phero '+HERO[n].c;s.dataset.pg=n;s.innerHTML='<div class="wrap"></div>';main.appendChild(s)});
function heroes(){var L=(typeof lang!=='undefined'&&lang==='en')?'en':'fr';[2,3,4].forEach(function(n){var s=D.getElementById('phero'+n);if(!s)return;var h=HERO[n][L];s.firstChild.innerHTML='<p class="eyebrow">'+h.e+'</p><h1>'+h.t+'</h1><p class="lede">'+h.l+'</p><div class="chips">'+h.ch.map(function(c){var u=c[1].split('|');return '<a href="'+u[0]+'"'+(u[1]?' data-go="'+u[1]+'"':'')+'>'+c[0]+'</a>'}).join('')+'</div>'})}
document.addEventListener('click',function(e){var a=e.target.closest('a[data-go]');if(!a)return;e.preventDefault();var t=a.getAttribute('data-go');if(location.hash!=='#galerie'){location.hash='#galerie'}setTimeout(function(){var el=document.querySelector('#galerie '+t)||document.querySelector(t);if(el){reveal(el);window.scrollTo({top:Math.max(0,el.getBoundingClientRect().top+pageYOffset-150),behavior:'smooth'})}},450)});
var secs=[].slice.call(main.children).filter(function(e){return e.tagName==='SECTION'&&!e.classList.contains('rvs')});
var rvs=main.querySelector('.rvs'),rvs2=null;setInterval(function(){if(rvs&&rvs2&&rvs2.innerHTML!==rvs.innerHTML)rvs2.innerHTML=rvs.innerHTML},700);
var map={};PG.forEach(function(p){p.ids.forEach(function(i){map[i]=p.id})});
secs.forEach(function(s){s.dataset.pg=map[s.id]||s.dataset.pg||1});heroes();
PG.forEach(function(p){p.ids.forEach(function(i){var e=D.getElementById(i);if(e&&e.parentNode===main)main.appendChild(e)})});
H.classList.add('pgs');
var SAVE={},RS=false,TAB=false,fx=D.createElement('nav');fx.className='pgfix';fx.setAttribute('aria-label','Pages du site');D.body.appendChild(fx);
var cur=1,bar=D.createElement('nav'),nx=D.createElement('div');bar.className='pgbar';bar.setAttribute('aria-label','Pages du site');nx.className='pgnext';
function lg(){return (typeof lang!=='undefined'&&lang==='en')?'en':'fr'}
function nm(p){return p[lg()]}
function draw(){try{heroes()}catch(e){}
 bar.innerHTML=PG.map(function(p){return '<a href="#page-'+p.id+'"'+(p.id===cur?' aria-current="page"':'')+'><b>'+nm(p)+'</b><small>'+p.sf+'</small></a>'}).join('');
 fx.innerHTML=PG.map(function(p){return '<a href="#page-'+p.id+'"'+(p.id===cur?' aria-current="page"':'')+'>'+nm(p)+'</a>'}).join('');
 var pv=PG[cur-2],n=PG[cur];
 nx.innerHTML=(pv?'<a class="pv" href="#page-'+pv.id+'"><i aria-hidden="true">←</i><span><small>Page précédente</small>'+nm(pv)+'</span></a>':'')+(n?'<a href="#page-'+n.id+'"><span><small>Page suivante</small>'+nm(n)+'</span><i aria-hidden="true">→</i></a>':'');
 if(window.__trDom)try{window.__trDom(bar);window.__trDom(nx)}catch(e){}
}
function place(){
 var vis=[].slice.call(main.children).filter(function(s){return s.tagName==='SECTION'&&+s.dataset.pg===cur&&!s.hidden});
 var tr=main.querySelector('.trust');
 if(cur===1&&tr&&tr.parentNode===main)main.insertBefore(bar,tr.nextSibling);else if(vis[0])main.insertBefore(bar,vis[0]);else main.insertBefore(bar,main.firstChild);
 var f=D.querySelector('footer');if(f)f.parentNode.insertBefore(nx,f);
 if(rvs){if(!rvs2){rvs2=rvs.cloneNode(true);rvs2.classList.add('rvs2')}if(cur===1){if(rvs2.parentNode)rvs2.remove()}else if(f)f.parentNode.insertBefore(rvs2,nx)}
}
function show(n,keep){if(n!==cur)SAVE[cur]=scrollY;cur=n;
 [].slice.call(main.children).forEach(function(e){if(e===bar||e.tagName==='SECTION'&&e.dataset.pg)return;e.classList.toggle('pgoff',n!==1)});
 secs.forEach(function(s){s.classList.toggle('pgoff',+s.dataset.pg!==n)});
 H.dataset.pg=n;draw();place();
 window.dispatchEvent(new Event('resize'));fxu();
}
function fxu(){var hd=D.querySelector('.hd');var hb=hd?Math.round(hd.getBoundingClientRect().bottom):76;H.classList.toggle('pgfx',cur!==1||(bar.isConnected&&bar.getBoundingClientRect().bottom<hb+4));fx.style.top=hb+'px'}
addEventListener('scroll',fxu,{passive:true});addEventListener('resize',fxu);
function reveal(el){var pn=pageOfEl(el);if(pn&&pn!==cur)show(pn)}
function pageOfEl(el){var s=el&&el.closest&&el.closest('main>section');return s?+s.dataset.pg:(el&&el.closest&&el.closest('.hero,.trust')?1:0)}
function scrollTo(el){var y=el.getBoundingClientRect().top+scrollY-(parseFloat(getComputedStyle(H).scrollPaddingTop)||76);window.scrollTo({top:Math.max(0,y),behavior:'auto'})}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.pgfix a,.pgbar a,.pgnext a');if(!a)return;var m=/#page-(\d)$/.exec(a.getAttribute('href')||'');if(!m)return;if(+m[1]===cur){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});return}TAB=true},true);
function route(first){
 var h=decodeURIComponent((location.hash||'').slice(1));var m=/^page-([1234])$/.exec(h);
 if(m){var to=+m[1];show(to);if(!first){var y=TAB?0:(SAVE[to]||0);TAB=false;window.scrollTo({top:y,behavior:'auto'})}return}
 if(!h){if(first)show(1);return}
 var el=D.getElementById(h);if(!el)return;
 var pn=pageOfEl(el);if(pn&&pn!==cur)show(pn);
 setTimeout(function(){scrollTo(el)},30)}
addEventListener('hashchange',function(){route(false)});
/* scrollIntoView : ouvre la bonne page d'abord */
var sv=Element.prototype.scrollIntoView;Element.prototype.scrollIntoView=function(){var pn=pageOfEl(this);if(pn&&pn!==cur)show(pn);return sv.apply(this,arguments)};
/* applyLang : rafraîchit les libellés */
var al=window.applyLang;if(typeof al==='function')window.applyLang=function(){var r=al.apply(this,arguments);try{draw()}catch(e){}return r};
['afa-lang','afa-rv'].forEach(function(){});
new MutationObserver(function(){draw()}).observe(H,{attributes:true,attributeFilter:['lang']});
D.addEventListener('click',function(e){var b=e.target.closest('[data-lang],.lang button,[data-l]');if(b)setTimeout(draw,60)});
/* flèches : par page */
function ready(){
 var up=D.getElementById('sup'),dn=D.getElementById('sdn'),pv=D.getElementById('spv'),nxb=D.getElementById('snx');if(!up)return;
 function g(y){window.scrollTo({top:y,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}
 function vs(){return secs.filter(function(s){return+s.dataset.pg===cur&&!s.hidden&&s.offsetHeight>0})}
 function goPage(n,end){location.hash='#page-'+n;if(end)setTimeout(function(){window.scrollTo({top:D.documentElement.scrollHeight,behavior:'auto'})},50)}
 up.onclick=function(){g(0)};dn.onclick=function(){g(D.documentElement.scrollHeight)};
 pv.onclick=function(){var y=scrollY+5;var l=vs().filter(function(s){return s.getBoundingClientRect().top+scrollY-70<y-12}).pop();if(l)g(l.getBoundingClientRect().top+scrollY-70);else if(scrollY>40)g(0);else if(cur>1)goPage(cur-1,true)};
 nxb.onclick=function(){var y=scrollY+Math.min(innerHeight*.3,160);var n=vs().find(function(s){return s.getBoundingClientRect().top+scrollY>y+10});if(n)g(n.getBoundingClientRect().top+scrollY-70);else if(cur<4)goPage(cur+1);else g(D.documentElement.scrollHeight)};
 setInterval(function(){pv.disabled=(cur===1&&scrollY<60);nxb.disabled=(cur===4&&scrollY+innerHeight>=D.documentElement.scrollHeight-60)},300);
}
ready();
route(true);
setTimeout(function(){show(cur)},1500);
window.__pg={show:show,reveal:reveal,cur:function(){return cur}};
})();

/* avis : lus dans la langue du visiteur */
(function(){
var KEY='afa_rvtr1',C={};try{C=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
function sv(){try{localStorage.setItem(KEY,JSON.stringify(C))}catch(e){}}
function lg(){return (typeof lang!=='undefined'&&lang==='en')?'en':'fr'}
function det(t){var f=(t.match(/[éèêàùçôîâû]|\b(le|la|les|des|une|est|très|nous|vous|merci|pour|avec|était|super|bien|je|j’|c’est)\b/gi)||[]).length,e=(t.match(/\b(the|and|was|were|very|we|you|great|trip|thank|thanks|amazing|our|with|had|really|would)\b/gi)||[]).length;return e>f?'en':f>e?'fr':''}
function chunks(t){var o=[],c='';t.split(/(?<=[.!?])\s+/).forEach(function(p){if((c+' '+p).length>440&&c){o.push(c);c=p}else c=c?c+' '+p:p});if(c)o.push(c);return o}
function tr(t,from,to){var k=from+to+'|'+t;if(C[k])return Promise.resolve(C[k]);
 return Promise.all(chunks(t).map(function(c){return fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(c.slice(0,480))+'&langpair='+from+'|'+to).then(function(r){return r.json()}).then(function(j){return (j&&j.responseData&&j.responseData.translatedText)||c})})).then(function(a){var r=a.join(' ');if(/MYMEMORY WARNING|INVALID/i.test(r))throw 0;C[k]=r;sv();return r})}
function run(){var L=lg();document.querySelectorAll('#rvlist .rvi').forEach(function(a){var p=a.querySelectorAll('p')[1];if(!p)return;
 if(!a.dataset.orig)a.dataset.orig=p.textContent;var o=a.dataset.orig,d=det(o);
 var old=a.querySelector('.rvt');if(old)old.remove();
 if(!d||d===L){p.textContent=o;return}
 p.textContent=o;
 tr(o,d,L).then(function(t){if(lg()!==L||!a.isConnected)return;p.textContent=t;var n=document.createElement('small');n.className='rvt';n.style.cssText='display:block;opacity:.65;margin-top:4px';n.textContent=L==='en'?'Automatically translated from French':'Traduit automatiquement de l’anglais';p.after(n)}).catch(function(){})})}
var o=window.renderRv;if(typeof o==='function')window.renderRv=function(){var r=o.apply(this,arguments);try{run()}catch(e){}return r};
var al=window.applyLang;if(typeof al==='function')window.applyLang=function(){var r=al.apply(this,arguments);try{run()}catch(e){}return r};
setTimeout(run,1800);
})();

/* langue mémorisée */
(function(){
function lg(){return (typeof lang!=='undefined'&&lang==='en')?'en':'fr'}
function sync(){try{localStorage.setItem('afa_lang',lg())}catch(e){}var a=document.querySelector('footer a[href^="confidentialite.html"]');if(a)a.href='confidentialite.html?lang='+lg()}
var al=window.applyLang;if(typeof al==='function')window.applyLang=function(){var r=al.apply(this,arguments);sync();return r};
var st;try{st=localStorage.getItem('afa_lang')}catch(e){}
var want=st||((navigator.language||'fr').slice(0,2)==='en'?'en':'fr');
if(want==='en'&&lg()!=='en'){var b=[].slice.call(document.querySelectorAll('button')).find(function(x){return x.textContent.trim()==='EN'});if(b)b.click()}
sync();
})();

/* circuits : 4 cartes (6 sur grand écran) puis « Voir tous » */
(function(){
var g=document.getElementById('grid');if(!g)return;var exp=false,btn=document.createElement('button');btn.type='button';btn.className='cmore';
function lg(){return (typeof lang!=='undefined'&&lang==='en')?'en':'fr'}
function lim(){return innerWidth>700?6:4}
function apply(){var n=g.querySelectorAll(':scope>:not(.vsep)').length;if(n<=lim()||exp){g.classList.remove('coll');btn.hidden=true;return}g.classList.add('coll');btn.hidden=false;btn.textContent=lg()==='en'?'See all '+n+' tours':'Voir les '+n+' circuits';if(window.__trDom)try{window.__trDom(btn)}catch(e){}}
g.after(btn);btn.onclick=function(){exp=true;apply()};
var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(apply,60)}).observe(g,{childList:true});
var bar=document.querySelector('#circuits .bar'),fd=document.getElementById('finder');
[bar,fd].forEach(function(e){if(e)['input','change','click'].forEach(function(ev){e.addEventListener(ev,function(x){if(ev==='click'&&!x.target.closest('button,.chip'))return;exp=true;apply()})})});
addEventListener('resize',apply);apply();
var al=window.applyLang;if(typeof al==='function')window.applyLang=function(){var r=al.apply(this,arguments);apply();return r};
})();
/* réserver = ajouter à la demande ; retour sur la fiche du circuit */
(function(){

try{(window.__SEL0||[]).forEach(function(id){if(id.indexOf('vd')===0||T.find(function(y){return y.id===id}))sel.add(id)});if(sel.size)renderSel()}catch(x){}
var EN=function(){return typeof lang!=='undefined'&&lang==='en'},rn=+(function(){try{return sessionStorage.getItem('afa_rn')||0}catch(x){return 0}})(),rt=null,lastAct=Date.now();
var st=document.createElement('style');st.textContent='#rmd{position:fixed;left:12px;right:12px;bottom:84px;z-index:60;max-width:440px;background:#2A0C07;color:#FBF6EF;border-radius:18px;padding:16px 16px 14px;box-shadow:0 18px 44px rgba(0,0,0,.35);border:2px solid #E8832F;animation:rmi .28s ease-out}@media(min-width:701px){#rmd{left:24px;right:auto;bottom:24px}}#rmd b{display:block;font:700 1.05rem/1.25 var(--d,Georgia,serif);margin:0 28px 4px 0}#rmd p{margin:0 0 12px;font-size:.92rem;line-height:1.45;color:#f1e3d6}#rmd .rb{display:flex;flex-wrap:wrap;gap:8px}#rmd .btn{padding:10px 16px;font-size:.92rem}#rmd .x{position:absolute;top:8px;right:8px;width:34px;height:34px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff;font-size:1.2rem;line-height:1;cursor:pointer}#rmd a.btn-w{background:#25D366;color:#073b1a;border:0;font-weight:700;border-radius:999px;text-decoration:none;display:inline-flex;align-items:center}@keyframes rmi{from{opacity:0;transform:translateY(14px)}}@media(prefers-reduced-motion:reduce){#rmd{animation:none}}';document.head.appendChild(st);
function names(){try{return items().map(function(i){return i.name})}catch(x){return []}}
function dbkSync(){var k=document.getElementById('dbk');if(!k)return;try{var inn=sel.has(cur2.id);k.disabled=false;var t=inn?(EN()?'✓ Added · Finish my booking':'✓ Ajouté · Finaliser ma réservation'):(EN()?'Book this tour':'Réserver ce circuit');if(k.textContent!==t)k.textContent=t}catch(e){}}
setInterval(dbkSync,400);
document.addEventListener('contextmenu',function(e){if(e.target.closest('img,.ph,.cimg,.ig,.gimg,#lb'))e.preventDefault()});
document.addEventListener('dragstart',function(e){if(e.target.tagName==='IMG')e.preventDefault()});
var bb0=document.getElementById('bqw');
if(bb0)new MutationObserver(function(){if(bb0.querySelector('.okb')){rn=99;sv();hide()}var ok=bb0.querySelector('.okb .ck'),en=EN();if(!ok||ok.textContent.indexOf('✓')<0||bb0.querySelector('[data-again]'))return;
 try{var ids=Array.from(sel);if(ids.length){sel.clear();renderSel()}}catch(e){}hide();
 var bqa=bb0.querySelector('.bqa');if(!bqa)return;var mb=document.createElement('button');mb.type='button';mb.className='btn btn-out';mb.setAttribute('data-again','more');mb.textContent=en?'Book another tour':'Réserver un autre circuit';bqa.appendChild(mb);var nb=bqa.querySelector('[data-bqagain]');if(nb)nb.textContent=en?'New booking for other people':'Nouvelle réservation pour d’autres personnes'
 }).observe(bb0,{childList:true,subtree:true});
document.addEventListener('click',function(e){var a=e.target.closest('[data-again]');if(!a)return;var d=document.getElementById('bq');
 if(d&&d.open)d.close();var g=document.getElementById('circuits');if(g)g.scrollIntoView({behavior:'smooth'})});
function sv(){try{sessionStorage.setItem('afa_rn',rn)}catch(x){}}
function hide(){var o=document.getElementById('rmd');if(o)o.remove()}
function snz(){try{return +localStorage.getItem('afa_rmd_snz')>Date.now()}catch(x){return false}}
function show(added){if(!sel.size)return;if(!added&&snz())return;hide();var n=sel.size,en=EN(),nm=names(),last=added?nm[nm.length-1]:'';
 var box=document.createElement('div');box.id='rmd';box.setAttribute('role','status');
 var t=added?(en?'✓ '+last+' added to your booking':'✓ '+last+' ajouté à votre réservation'):(en?'Your booking is not finished':'Votre réservation n’est pas terminée');
 var p=added?(en?n+' choice'+(n>1?'s':'')+' saved. Keep exploring, then finish: dates, travellers and contact.':n+' choix enregistré'+(n>1?'s':'')+'. Continuez à explorer, puis terminez : dates, voyageurs et contact.'):(en?n+' choice'+(n>1?'s':'')+' waiting: '+nm.slice(0,3).join(', ')+'. Add more, send your request, or write to us.':n+' choix en attente : '+nm.slice(0,3).join(', ')+'. Ajoutez-en d’autres, envoyez votre demande ou écrivez-nous.');
 var wa='https://wa.me/2290197165646?text='+encodeURIComponent((en?'Hello AFA Tours, I would like to book: ':'Bonjour AFA Tours, je souhaite réserver : ')+nm.join(', '));
 box.innerHTML='<button class="x" type="button" aria-label="'+(en?'Close':'Fermer')+'">×</button><b></b><p></p><div class="rb"><button type="button" class="btn btn-or" data-fin>'+(en?'Finish my booking':'Finaliser ma réservation')+'</button>'+(added?'<button type="button" class="btn btn-out" data-more style="color:#FBF6EF;border-color:#FBF6EF">'+(en?'Keep exploring':'Voir d’autres circuits')+'</button>':'<a class="btn btn-w" target="_blank" rel="noopener" href="'+wa+'">WhatsApp</a>')+'</div>';
 box.querySelector('b').textContent=t;box.querySelector('p').textContent=p;
 var dl=document.getElementById('dlg');(dl&&dl.open?dl:document.body).appendChild(box);
 box.addEventListener('click',function(e){if(e.target.closest('.x,[data-fin],a.btn-w'))rn=99;if(e.target.closest('.x')&&!added){try{localStorage.setItem('afa_rmd_snz',Date.now()+216e5)}catch(x){}}sv();if(e.target.closest('.x,[data-more]')){hide();var d=document.getElementById('dlg');if(e.target.closest('[data-more]')&&d&&d.open)d.close()}else if(e.target.closest('[data-fin]')){hide();var d2=document.getElementById('dlg');if(d2&&d2.open)d2.close();window.__retD=null;if(window.openBook)openBook('circuit')}});
 clearTimeout(rt);rt=setTimeout(function(){if(added)hide()},added?14000:30000);}
window.__remind=function(){lastAct=Date.now();show(true)};
document.addEventListener('click',function(e){var b=e.target.closest('#dbk');if(!b)return;e.preventDefault();e.stopImmediatePropagation();try{if(sel.has(cur2.id)){var dd=document.getElementById('dlg');if(dd&&dd.open)dd.close();window.__retD=null;if(window.openBook)openBook('circuit');return}sel.add(cur2.id);renderSel()}catch(x){}dbkSync();window.__remind()},true);
setInterval(function(){var bq=document.getElementById('bq');if(!sel.size||rn>=3||(bq&&bq.open)||document.getElementById('rmd')||document.hidden)return;if(Date.now()-lastAct>60000){rn++;sv();lastAct=Date.now();show(false)}},5000);
addEventListener('hashchange',function(){if(/^#page-[234]/.test(location.hash)&&sel.size&&rn<3&&!document.getElementById('rmd')){rn++;sv();lastAct=Date.now();setTimeout(function(){show(false)},1200)}});
document.addEventListener('visibilitychange',function(){if(!document.hidden&&sel.size&&rn<3&&Date.now()-lastAct>20000){rn++;sv();lastAct=Date.now();show(false)}});

var d=document.getElementById('bq');
if(d)d.addEventListener('close',function(){var id=window.__retD;window.__retD=null;if(id&&typeof openD==='function')setTimeout(function(){try{openD(id)}catch(e){}},60)});
function pdfbtn(after){var o=document.getElementById('dpdf');if(o)o.remove();var b=document.createElement('button');b.type='button';b.id='dpdf';b.className='btn btn-out';b.style.cssText='margin-top:10px;justify-self:start';b.textContent=(typeof lang!=='undefined'&&lang==='en')?'Download the PDF sheet':'Télécharger la fiche PDF';after.insertAdjacentElement('afterend',b)}
function lp(){return new Promise(function(ok,ko){if(window.AFAPDF)return ok();var s=document.createElement('script');s.src='afa-pdf.js';s.onload=ok;s.onerror=function(){ko()};document.head.appendChild(s)})}
document.addEventListener('click',function(e){var b=e.target.closest('#dpdf');if(!b)return;var en=typeof lang!=='undefined'&&lang==='en',t0=b.textContent;b.disabled=true;b.textContent=en?'Preparing…':'Préparation…';
 var q=function(s){var n=document.querySelector(s);return n?n.textContent.trim():''};
 lp().then(function(){var st=[].map.call(document.querySelectorAll('#ds li'),function(l){return l.textContent.trim()});
  return window.AFAPDF.make({lang:en?'en':'fr',title:q('#dt'),subtitle:q('#dp'),file:'afa-tours-'+q('#dt').toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,40),blocks:[{t:'h',v:en?'About this tour':'Présentation'},{t:'p',v:q('#dd')},{t:'h',v:en?'Itinerary':'Programme'},{t:'list',v:st},{t:'box',v:en?'Prices are indicative and confirmed by our team. To book, write to us on WhatsApp or by email: transport, guide and meals can be adjusted to your group.':'Les prix sont indicatifs et confirmés par notre équipe. Pour réserver, écrivez-nous sur WhatsApp ou par e-mail : transport, guide et repas s’adaptent à votre groupe.'}]})}).catch(function(){}).then(function(){b.disabled=false;b.textContent=t0})});
function hint(){var da=document.getElementById('da');if(!da)return;var old=document.getElementById('dhint');if(old)old.remove();var p=document.createElement('p');p.id='dhint';p.className='fnote';p.style.cssText='margin:10px 0 0;font-size:.86rem;opacity:.8';p.innerHTML=(typeof lang!=='undefined'&&lang==='en')?'<b>Book</b>: you send your request for this tour. <b>Add</b>: you keep it in your request to combine several tours before sending.':'<b>Réserver</b> : vous envoyez votre demande pour ce circuit. <b>Ajouter</b> : vous le gardez dans ma demande pour en combiner plusieurs avant d’envoyer.';var k=document.getElementById('dbk');if(k)k.insertAdjacentElement('afterend',da);da.style.display='none';pdfbtn(k||da);if(window.__trDom)try{window.__trDom(document.getElementById('dlg'))}catch(e){}}
var o=window.openD;if(typeof o==='function')window.openD=function(){var r=o.apply(this,arguments);setTimeout(hint,0);return r};
setTimeout(hint,2000);
})();

`;
module.exports={css,js};
