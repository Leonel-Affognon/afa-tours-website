// Simplification des boutons de réservation : un seul « Réserver » ouvre le choix des parcours.
// Module ajouté après les autres : n'altère pas les parcours existants (ils restent appelés via openBook).
const css=`.hubd{opacity:1!important;transform:none!important;border:0;border-radius:22px;padding:0;max-width:min(560px,calc(100% - 24px));width:100%;background:#fff;color:#2A0C07;box-shadow:0 30px 80px rgba(0,0,0,.4)}
.hubd,.hubd *{opacity:1}.hubd::backdrop{background:rgba(20,6,3,.55)}
.hubd .hh{padding:24px 26px 6px}.hubd h3{margin:0;font-size:1.35rem}.hubd .hh p{margin:6px 0 0;opacity:.75;font-size:.95rem}
.hubd .hg{display:grid;gap:12px;padding:16px 26px 26px}
.hubd button.hc{all:unset;cursor:pointer;display:flex;gap:14px;align-items:center;padding:16px 18px;border:1px solid #ecd6bd;border-radius:16px;background:#fbf6ef}
.hubd button.hc:hover,.hubd button.hc:focus-visible{border-color:#B51D27;background:#fff}
.hubd .hc b{display:block;font-size:1.02rem}.hubd .hc span{display:block;font-size:.88rem;opacity:.75;margin-top:3px}
.hubd .hx{position:absolute;top:12px;right:12px;border:0;background:none;font-size:1.4rem;cursor:pointer;color:#2A0C07}`;
const html=`<dialog class="hubd" id="hubDlg" aria-labelledby="hubT"><button class="hx" type="button" aria-label="Fermer" data-hubx>×</button>
<div class="hh"><h3 id="hubT" data-hi="t">Que souhaitez-vous réserver ?</h3><p data-hi="p">Choisissez l’option qui vous correspond : vous pourrez compléter votre demande ensuite.</p></div>
<div class="hg">
<button class="hc" type="button" data-hubact="circuit"><div><b data-hi="c1">Un circuit</b><span data-hi="d1">Choisissez une ou plusieurs visites et réservez-les</span></div></button>
<button class="hc" type="button" data-hubact="sejour"><div><b data-hi="c2">Demander mon séjour</b><span data-hi="d2">Un séjour préparé, à compléter avec d’autres visites si vous le souhaitez</span></div></button>
<button class="hc" type="button" data-hubact="plan"><div><b data-hi="c3">Composer mon séjour sur mesure</b><span data-hi="d3">Choisissez vos jours, vos visites et vos repas</span></div></button>
<button class="hc" type="button" data-hubact="partners"><div><b data-hi="c4">Hôtels, transport, chauffeurs</b><span data-hi="d4">Nos partenaires, à réserver séparément</span></div></button>
</div></dialog>`;
const js=`(function(){
var d=document.getElementById('hubDlg');if(!d)return;var hubPick=null;
var EN={t:'What would you like to book?',p:'Choose the option that suits you: you can complete your request afterwards.',c1:'A tour',d1:'Choose one or several visits and book them',c2:'Request my stay',d2:'A prepared stay, to complete with other visits if you wish',c3:'Build my custom stay',d3:'Choose your days, visits and meals',c4:'Hotels, transport, drivers',d4:'Our partners, booked separately'};
function hubLang(){var en=document.documentElement.lang==='en';d.querySelectorAll('[data-hi]').forEach(function(x){var k=x.getAttribute('data-hi');if(!x.dataset.fr)x.dataset.fr=x.textContent;x.textContent=en?EN[k]:x.dataset.fr})}
var REL={'Réserver ce circuit':'Réserver','Réserver un circuit':'Réserver','Composer un séjour':'Séjour sur mesure','Composer mon séjour sur mesure':'Séjour sur mesure','Demander un devis':'Demander mon séjour','Book this tour':'Book','Book a tour':'Book','Build a stay':'Custom stay','Build my custom stay':'Custom stay','Request a quote':'Request my stay'};
function relabel(){document.querySelectorAll('button,a').forEach(function(b){if(b.closest('dialog[open]'))return;var t=(b.textContent||'').trim();if(REL[t]&&b.children.length===0)b.textContent=REL[t]})}
var RULES=[['#approche','a,button',/^(Plan my stay|Request my stay|Planifier mon séjour|Demander mon séjour)$/i],['#devis','a,button',/^(Book my trip|Réserver mon voyage)$/i],['#partenaires','a,button',/^(Book|Réserver)$/i],['#sejours','a,button',/^(Book this stay|Réserver ce séjour)$/i]];
function hide(){RULES.forEach(function(r){var sec=document.querySelector(r[0]);if(!sec)return;sec.querySelectorAll(r[1]).forEach(function(el){if(r[2].test((el.textContent||'').trim())){el.style.display='none';el.setAttribute('data-ess','hidden')}})})}
document.addEventListener('click',function(e){
 if(e.target.closest('#hubDlg'))return;
 if(e.target.closest('dialog[open]:not(#hubDlg)'))return;
 var b=e.target.closest('[data-book],[data-plan]');
 if(b){e.preventDefault();e.stopImmediatePropagation();hubPick=b.hasAttribute('data-plan')?{kind:'plan'}:{kind:b.getAttribute('data-kind')||'circuit',id:b.getAttribute('data-id')};d.showModal();hubLang();return}
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
relabel();hide();
new MutationObserver(function(){relabel();hide()}).observe(document.body,{childList:true,subtree:true});
})();`;
module.exports={css,html,js};
