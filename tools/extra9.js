const css=`
html.pgs .pgoff{display:none!important}
html[data-pg="2"] .ann,html[data-pg="3"] .ann{display:none}
html[data-pg="2"] main,html[data-pg="3"] main{padding-top:84px}
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
 {id:1,fr:'Voyager',en:'Travel',sf:'Circuits, séjours et Vodun Days',ids:['circuits','agenda','approche','sejours']},
 {id:2,fr:'Découvrir',en:'Discover',sf:'Partenaires, galerie et blog',ids:['galerie','partenaires','blog']},
 {id:3,fr:'Nous connaître',en:'About us',sf:'Équipe, avis et contact',ids:['equipe','avis','pratique','devis']}];
var main=D.getElementById('top');if(!main)return;
var secs=[].slice.call(main.children).filter(function(e){return e.tagName==='SECTION'});
var map={};PG.forEach(function(p){p.ids.forEach(function(i){map[i]=p.id})});
secs.forEach(function(s){s.dataset.pg=map[s.id]||1});
H.classList.add('pgs');
var cur=1,bar=D.createElement('nav'),nx=D.createElement('div');bar.className='pgbar';bar.setAttribute('aria-label','Pages du site');nx.className='pgnext';
function lg(){return (typeof lang!=='undefined'&&lang==='en')?'en':'fr'}
function nm(p){return p[lg()]}
function draw(){
 bar.innerHTML=PG.map(function(p){return '<a href="#page-'+p.id+'"'+(p.id===cur?' aria-current="page"':'')+'><b>'+nm(p)+'</b><small>'+p.sf+'</small></a>'}).join('');
 var pv=PG[cur-2],n=PG[cur];
 nx.innerHTML=(pv?'<a class="pv" href="#page-'+pv.id+'"><i aria-hidden="true">←</i><span><small>Page précédente</small>'+nm(pv)+'</span></a>':'')+(n?'<a href="#page-'+n.id+'"><span><small>Page suivante</small>'+nm(n)+'</span><i aria-hidden="true">→</i></a>':'');
 if(window.__trDom)try{window.__trDom(bar);window.__trDom(nx)}catch(e){}
}
function place(){
 var vis=secs.filter(function(s){return+s.dataset.pg===cur&&!s.hidden});
 var tr=main.querySelector('.trust');
 if(cur===1&&tr&&tr.parentNode===main)main.insertBefore(bar,tr.nextSibling);else if(vis[0])main.insertBefore(bar,vis[0]);else main.insertBefore(bar,main.firstChild);
 var f=D.querySelector('footer');if(f)f.parentNode.insertBefore(nx,f);
}
function show(n){cur=n;
 [].slice.call(main.children).forEach(function(e){if(e===bar||e.tagName==='SECTION'&&e.dataset.pg)return;e.classList.toggle('pgoff',n!==1)});
 secs.forEach(function(s){s.classList.toggle('pgoff',+s.dataset.pg!==n)});
 H.dataset.pg=n;draw();place();
 window.dispatchEvent(new Event('resize'));
}
function pageOfEl(el){var s=el&&el.closest&&el.closest('main>section');return s?+s.dataset.pg:(el&&el.closest&&el.closest('.hero,.trust')?1:0)}
function scrollTo(el){var y=el.getBoundingClientRect().top+scrollY-(parseFloat(getComputedStyle(H).scrollPaddingTop)||76);window.scrollTo({top:Math.max(0,y),behavior:'auto'})}
function route(first){
 var h=decodeURIComponent((location.hash||'').slice(1));var m=/^page-([123])$/.exec(h);
 if(m){show(+m[1]);if(!first)window.scrollTo({top:0,behavior:'auto'});return}
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
 nxb.onclick=function(){var y=scrollY+Math.min(innerHeight*.3,160);var n=vs().find(function(s){return s.getBoundingClientRect().top+scrollY>y+10});if(n)g(n.getBoundingClientRect().top+scrollY-70);else if(cur<3)goPage(cur+1);else g(D.documentElement.scrollHeight)};
 setInterval(function(){pv.disabled=(cur===1&&scrollY<60);nxb.disabled=(cur===3&&scrollY+innerHeight>=D.documentElement.scrollHeight-60)},300);
}
ready();
route(true);
setTimeout(function(){show(cur)},1500);
window.__pg={show:show,cur:function(){return cur}};
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
`;
module.exports={css,js};
