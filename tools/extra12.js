// Simplification des boutons de réservation : un seul « Réserver » ouvre le choix des parcours.
// Module ajouté après les autres : n'altère pas les parcours existants (ils restent appelés via openBook).
const css=`.hubd{opacity:1!important;transform:none!important;border:0;border-radius:22px;padding:0;max-width:min(560px,calc(100% - 24px));width:100%;background:#fff;color:#2A0C07;box-shadow:0 30px 80px rgba(0,0,0,.4)}
.hubd,.hubd *{opacity:1}.hubd::backdrop{background:rgba(20,6,3,.55)}
.hubd .hh{padding:24px 26px 6px}.hubd h3{margin:0;font-size:1.35rem}.hubd .hh p{margin:6px 0 0;opacity:.75;font-size:.95rem}
.hubd .hg{display:grid;gap:12px;padding:16px 26px 26px}
.hubd button.hc{all:unset;cursor:pointer;display:flex;gap:14px;align-items:center;padding:16px 18px;border:1px solid #ecd6bd;border-radius:16px;background:#fbf6ef}
.hubd button.hc:hover,.hubd button.hc:focus-visible{border-color:#B51D27;background:#fff}
.hubd .hc b{display:block;font-size:1.02rem}.hubd .hc span{display:block;font-size:.88rem;opacity:.75;margin-top:3px}
.hubd .hsel{margin:14px 26px 0;padding:12px 14px;border-radius:14px;background:#fbf6ef;border:1px solid #ecd6bd;font-size:.92rem}.hubd .hsel b{display:block;margin-bottom:6px}.hubd .hsel ul{margin:0;padding-left:18px}
.hubd .hx{position:absolute;top:12px;right:12px;border:0;background:none;font-size:1.4rem;cursor:pointer;color:#2A0C07}`;
const html=`<dialog class="hubd" id="hubDlg" aria-labelledby="hubT"><button class="hx" type="button" aria-label="Fermer" data-hubx>×</button>
<div class="hh"><h3 id="hubT" data-hi="t">Que souhaitez-vous réserver ?</h3><p data-hi="p">Choisissez l’option qui vous correspond : vous pourrez compléter votre demande ensuite.</p></div>
<div id="hubSel" class="hsel" hidden></div>
<div class="hg">
<button class="hc" type="button" data-hubact="circuit"><div><b data-hi="c1">Un circuit</b><span data-hi="d1">Choisissez une ou plusieurs visites et réservez-les</span></div></button>
<button class="hc" type="button" data-hubact="sejour"><div><b data-hi="c2">Demander mon séjour</b><span data-hi="d2">Un séjour préparé, à compléter avec d’autres visites si vous le souhaitez</span></div></button>
<button class="hc" type="button" data-hubact="plan"><div><b data-hi="c3">Composer mon séjour sur mesure</b><span data-hi="d3">Choisissez vos jours, vos visites et vos repas</span></div></button>
<button class="hc" type="button" data-hubact="partners"><div><b data-hi="c4">Hôtels, transport, chauffeurs</b><span data-hi="d4">Nos partenaires, à réserver séparément</span></div></button>
</div></dialog>`;
const js=`(function(){
var d=document.getElementById('hubDlg');if(!d)return;var hubPick=null;
var EN={t:'What would you like to book?',p:'Choose the option that suits you: you can complete your request afterwards.',c1:'A tour',d1:'Choose one or several visits and book them',c2:'Request my stay',d2:'A prepared stay, to complete with other visits if you wish',c3:'Build my custom stay',d3:'Choose your days, visits and meals',c4:'Hotels, transport, drivers',d4:'Our partners, booked separately'};
function hubLang(){var en=document.documentElement.lang==='en';d.querySelectorAll('[data-hi]').forEach(function(x){var k=x.getAttribute('data-hi');if(!x.dataset.fr)x.dataset.fr=x.textContent;x.textContent=en?EN[k]:x.dataset.fr});hubSum()}
function hubSum(){var el=document.getElementById('hubSel');if(!el)return;var it=(typeof window.__SEL_ITEMS==='function'?window.__SEL_ITEMS():[]);var en=document.documentElement.lang==='en';if(!it.length){el.hidden=true;el.innerHTML='';return}el.hidden=false;el.innerHTML='<b>'+(en?'Your selection':'Votre sélection')+'</b><ul>'+it.map(function(x){return '<li>'+escx(x.name)+'</li>'}).join('')+'</ul>'}
function addSej(id){try{if(typeof __ENG_SET==='function'&&typeof __ENG_SEL==='function'){var c=__ENG_SEL();if(c.indexOf('sj'+id)<0)__ENG_SET(c.concat(['sj'+id]))}}catch(err){}}
window.__sejName=function(sid){var c=document.querySelector('button[data-kind="sejour"][data-id="'+sid+'"]');var h=c&&c.closest('article')&&c.closest('article').querySelector('h3');return h?{n:h.textContent.trim()}:null};
 var origHG=null,origT=null;
function escx(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function vdPick(){
 if(typeof VD==='undefined'||!VD||!VD.opts||!VD.opts.length)return false;
 var g=d.querySelector('.hg'),h=d.querySelector('#hubT');if(!g||!h)return false;
 var en=document.documentElement.lang==='en',k=en?'en':'fr';
 if(origHG===null){origHG=g.innerHTML;origT=h.textContent}
 g.innerHTML=VD.opts.map(function(o,i){return '<button class="hc" type="button" data-vdpick="'+i+'"><div><b>'+escx(o.n[k]||o.n.fr)+'</b><span>'+escx(o.d[k]||o.d.fr||'')+' · '+Number(o.p||0).toLocaleString('fr-FR')+' FCFA</span></div></button>'}).join('');
 h.textContent=en?'Choose your Vodun Days formula':'Choisissez votre formule Vodun Days';
 d.showModal();return true;
}
function vdRestore(){var g=d.querySelector('.hg'),h=d.querySelector('#hubT');if(origHG!==null&&g){g.innerHTML=origHG;origHG=null}if(origT!==null&&h){h.textContent=origT;origT=null}}
d.addEventListener('close',vdRestore);
d.addEventListener('click',function(e){var v=e.target.closest('[data-vdpick]');if(!v)return;
 var i=v.getAttribute('data-vdpick');
 try{if(typeof __ENG_SET==='function'){var cur=(__ENG_SEL&&__ENG_SEL())||[];__ENG_SET(cur.filter(function(x){return x.indexOf('vd')!==0}).concat(['vd'+i]))}}catch(err){}
 d.close();var c=document.getElementById('circuits');if(c)c.scrollIntoView({behavior:'smooth'});
});
var REL={'Réserver ce circuit':'Réserver','Réserver un circuit':'Réserver','Composer un séjour':'Séjour sur mesure','Composer mon séjour sur mesure':'Séjour sur mesure','Demander un devis':'Demander mon séjour','Book this tour':'Book','Book a tour':'Book','Build a stay':'Custom stay','Build my custom stay':'Custom stay','Request a quote':'Request my stay'};
function relabel(){document.querySelectorAll('button,a').forEach(function(b){if(b.closest('dialog[open]'))return;var t=(b.textContent||'').trim();if(REL[t]&&b.children.length===0)b.textContent=REL[t]})}
var RULES=[['#approche','a,button',/^(Plan my stay|Request my stay|Planifier mon séjour|Demander mon séjour)$/i],['#devis','a,button',/^(Book my trip|Réserver mon voyage)$/i],['#partenaires','a,button',/^(Book|Réserver)$/i],['#sejours','a,button',/^(Book this stay|Réserver ce séjour)$/i]];
function hide(){RULES.forEach(function(r){var sec=document.querySelector(r[0]);if(!sec)return;sec.querySelectorAll(r[1]).forEach(function(el){if(r[2].test((el.textContent||'').trim())){el.style.display='none';el.setAttribute('data-ess','hidden')}})})}
document.addEventListener('click',function(e){
 if(e.target.closest('#hubDlg'))return;
 var ac=e.target.closest('[data-art-close][data-book]');if(ac){e.preventDefault();e.stopImmediatePropagation();var bd=document.getElementById('bdlg');if(bd&&bd.open)bd.close();hubPick=null;d.showModal();hubLang();return}
 if(e.target.closest('dialog[open]:not(#hubDlg)'))return;
 var vb=e.target.closest('button,a');
 if(vb&&/^(Réserver ma place|Book my place)$/.test((vb.textContent||'').trim())&&vdPick()){e.preventDefault();e.stopImmediatePropagation();return}
 var b=e.target.closest('[data-book],[data-plan]');
 if(b){e.preventDefault();e.stopImmediatePropagation();var bk=b.getAttribute('data-kind')||'circuit',bi=b.getAttribute('data-id');var sj=bk==='sejour'&&!!bi&&bi!=='sx';if(sj)addSej(bi);hubPick=b.hasAttribute('data-plan')?{kind:'plan'}:(sj?null:{kind:bk,id:bi});d.showModal();hubLang();return}
 var g=e.target.closest('[data-hub]');if(g){e.preventDefault();hubPick=null;d.showModal();hubLang();return}
 var sx=e.target.closest('a[href="#devis"]');if(sx){e.preventDefault();window.openBook&&openBook('sejour','sx');return}
},true);
d.addEventListener('click',function(e){if(e.target===d||e.target.closest('[data-hubx]'))d.close()});
d.addEventListener('click',function(e){var a=e.target.closest('[data-hubact]');if(!a)return;
 var k=a.getAttribute('data-hubact');d.close();var pk=hubPick;hubPick=null;
 if(pk&&pk.kind==='plan'&&k!=='partners'){k='plan'}
 if(k==='circuit'){window.openBook&&openBook('circuit',pk&&pk.kind==='circuit'?pk.id:null)}
 else if(k==='sejour'){window.openBook&&openBook('sejour',pk&&pk.kind==='sejour'&&pk.id?pk.id:'sx')}
 else if(k==='plan'){window.__plan&&window.__plan.open()}
 else if(k==='partners'){if(pk&&pk.id&&pk.kind!=='plan'&&pk.kind!=='circuit'&&pk.kind!=='sejour'){window.openBook&&openBook(pk.kind,pk.id)}else{var t=document.getElementById('partenaires');t&&t.scrollIntoView({behavior:'smooth'})}}
});
var _ob=window.openBook;window.openBook=function(kind,id){if(kind==='sejour'&&window.__dsd){window.__dsd.open();return}return _ob&&_ob(kind,id)};
relabel();hide();
new MutationObserver(function(){relabel();hide()}).observe(document.body,{childList:true,subtree:true});
})();`;
module.exports={css,html,js};
