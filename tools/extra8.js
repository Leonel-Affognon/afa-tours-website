const css=`
html,body,a,button,input,select,textarea,label,summary,.card,.pc,.tm,.sjc,.val,.gi,.peek{touch-action:manipulation}
html{-webkit-tap-highlight-color:rgba(232,131,47,.25)}
dialog .dfx{position:sticky;top:10px;float:none;margin:10px 10px -56px auto;z-index:2147483000;width:46px;height:46px;border-radius:50%;border:2px solid #2A0C07;background:#FBF6EF;color:#2A0C07;font:700 1.7rem/1 system-ui,sans-serif;display:grid;place-items:center;padding:0;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.3)}
dialog .dfx:active{transform:scale(.92);background:#E8832F}
dialog.hasfx #dx,dialog.hasfx #rvx,dialog.hasfx #bdx,dialog.hasfx #lbx,dialog.hasfx .xx,dialog.hasfx .x{display:none!important}
`;
const js=`
(function(){
var D=document;
/* 1. touche = survol : .tp posé sur la cible et ses parents pendant le toucher */
var tpEls=[];function clr(){tpEls.forEach(function(e){e.classList.remove('tp')});tpEls=[]}
var tpT;D.addEventListener('touchstart',function(e){clr();clearTimeout(tpT);var n=e.target;while(n&&n.nodeType===1&&n!==D.body){n.classList.add('tp');tpEls.push(n);n=n.parentElement}},{passive:true});
function endT(){clearTimeout(tpT);tpT=setTimeout(clr,450)}
D.addEventListener('touchend',endT,{passive:true});D.addEventListener('touchcancel',endT,{passive:true});
/* 2. pas de zoom au double toucher */
var lastT=0;D.addEventListener('touchend',function(e){var n=Date.now();if(n-lastT<350&&!e.target.closest('input,textarea,select'))e.preventDefault();lastT=n},{passive:false});
D.addEventListener('dblclick',function(e){if(!e.target.closest('input,textarea,select,p,h1,h2,h3,li'))e.preventDefault()});
['gesturestart','gesturechange'].forEach(function(g){D.addEventListener(g,function(e){e.preventDefault()},{passive:false})});
/* 3. croix toujours visible sur chaque fenêtre */
function addFx(d){if(d.querySelector(':scope>.dfx'))return;var b=D.createElement('button');b.type='button';b.className='dfx';b.setAttribute('aria-label',(typeof lang!=='undefined'&&lang==='en')?'Close':'Fermer');b.textContent='\\u00d7';b.addEventListener('click',function(ev){ev.stopPropagation();d.close()});d.insertBefore(b,d.firstChild);d.classList.add('hasfx')}
var sm=HTMLDialogElement.prototype.showModal;HTMLDialogElement.prototype.showModal=function(){addFx(this);return sm.apply(this,arguments)};
D.addEventListener('keydown',function(e){if(e.key==='Escape'){var o=D.querySelector('dialog[open]');if(o)o.close()}});
})();
`;
module.exports={css,js};
