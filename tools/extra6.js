const css=`
/* ===== correctifs interface (extra6) ===== */
.snav:not(.live){opacity:0!important;pointer-events:none!important}
.snav.live{opacity:.96!important;pointer-events:auto!important}
.snav{transition:opacity .35s!important}
@media(min-width:701px){.snav.inl{position:fixed!important;right:22px!important;top:50%!important;bottom:auto!important;transform:translateY(-50%)!important;flex-direction:column!important;width:auto!important;padding:5px!important;gap:2px!important;margin:0!important}.snav.inl button{width:40px;height:40px}}
@media(max-width:700px){.avtab{display:none!important}.snav{right:6px!important}}
html.kb .mbar,html.kb .fabs,html.kb .snav,html.kb .avtab,html.kb .cwl{display:none!important}
.kbdone{position:fixed;right:10px;z-index:2147483000;display:none;border:0;border-radius:999px;background:#2A0C07;color:#fff;font:700 .9rem var(--b,inherit);padding:.6em 1.1em;box-shadow:0 8px 24px rgba(0,0,0,.35)}
html.kb .kbdone{display:block}
@media(hover:hover) and (pointer:fine){html.kb .kbdone{display:none}}
#mm{top:var(--mmtop,72px)!important;max-height:calc(100dvh - var(--mmtop,72px) - 88px)!important;overflow-y:auto!important;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding-bottom:40px!important}
html.nscr,html.nscr body{overflow:hidden!important;overscroll-behavior:none}
dialog{overscroll-behavior:contain;max-width:calc(100vw - 16px);overflow-wrap:anywhere}
dialog img,dialog video{max-width:100%;height:auto}
dialog[open]{animation:dgi .42s cubic-bezier(.2,.9,.3,1.12) both}
dialog[open]::backdrop{animation:bgi .3s both}
@keyframes dgi{from{opacity:0;transform:translateY(26px) scale(.95)}to{opacity:1;transform:none}}
@keyframes bgi{from{opacity:0}to{opacity:1}}
.cw,.cw *{overscroll-behavior:contain}
@media(hover:none){.card .peek{display:block!important;transform:translateY(140%)!important;opacity:0;transition:transform .5s cubic-bezier(.2,.9,.3,1.3),opacity .3s!important}.card.pk .peek{transform:none!important;opacity:1}.card .cimg:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(30,8,4,.45),transparent 55%);opacity:0;transition:opacity .3s;pointer-events:none}.card.pk .cimg:after{opacity:1}}
.bgrid{grid-template-columns:repeat(auto-fill,minmax(230px,1fr))!important;gap:14px!important}
.bc .bi{aspect-ratio:16/9!important}.bc h3{font-size:1.08rem!important}.bc p{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:.86rem!important}
.bc .bxt{padding:12px 14px 14px!important}
@media(max-width:700px){.bgrid{grid-template-columns:1fr!important;gap:10px!important}.bc{flex-direction:row!important;align-items:stretch}.bc .bi{aspect-ratio:auto!important;width:96px;min-width:96px}.bc .bxt{padding:10px 12px!important}.bc h3{font-size:1rem!important;margin:2px 0 4px!important}.bc .more{margin-top:4px!important;font-size:.82rem}}
.bmore{display:block;margin:18px auto 0}
.ph:not(.ok) .phl{display:block;position:absolute;inset:auto 12px 12px 12px;color:#fff;font:700 1.05rem var(--d,inherit);text-shadow:0 2px 10px rgba(0,0,0,.4)}
`;
const js=`
(function(){
var D=document,H=D.documentElement,$=function(s,r){return(r||D).querySelector(s)};
/* menu : position réelle sous l'en-tête */
D.addEventListener('click',function(e){if(e.target.closest('#menub')){setTimeout(function(){var hd=$('.hd'),r=hd?hd.getBoundingClientRect():{bottom:72};H.style.setProperty('--mmtop',Math.max(0,Math.round(r.bottom))+'px');var m=$('#mm');H.classList.toggle('nscr',!!(m&&m.classList.contains('open')))},30)}if(e.target.closest('#mm a'))H.classList.remove('nscr')},true);
/* verrouiller le défilement du fond quand une fenêtre est ouverte */
var n=0;function lock(){H.classList.toggle('nscr',n>0||!!($('#mm.open')))}
var os=HTMLDialogElement.prototype.showModal,oc=HTMLDialogElement.prototype.close;
HTMLDialogElement.prototype.showModal=function(){var was=this.open;os.apply(this,arguments);if(!was){n++;lock()}};
HTMLDialogElement.prototype.close=function(){var was=this.open;oc.apply(this,arguments);if(was){n=Math.max(0,n-1);lock()}};
D.addEventListener('close',function(e){if(e.target&&e.target.tagName==='DIALOG'){n=D.querySelectorAll('dialog[open]').length;lock()}},true);
D.addEventListener('cancel',function(){setTimeout(function(){n=D.querySelectorAll('dialog[open]').length;lock()},0)},true);
/* clavier */
var ED='input:not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]),textarea,select';
var btn=D.createElement('button');btn.type='button';btn.className='kbdone';btn.textContent='Fermer le clavier';D.body.appendChild(btn);
function vv(){var v=window.visualViewport;btn.style.top=((v?v.offsetTop:0)+10)+'px'}
btn.addEventListener('click',function(){var a=D.activeElement;a&&a.blur&&a.blur()});
D.addEventListener('focusin',function(e){if(e.target.matches&&e.target.matches(ED)){if(e.target.tagName==='INPUT')e.target.setAttribute('enterkeyhint','done');H.classList.add('kb');vv()}});
D.addEventListener('focusout',function(){setTimeout(function(){var a=D.activeElement;if(!(a&&a.matches&&a.matches(ED)))H.classList.remove('kb')},120)});
if(window.visualViewport){visualViewport.addEventListener('resize',vv);visualViewport.addEventListener('scroll',vv)}
D.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target.tagName==='INPUT'&&e.target.type!=='submit'&&!e.target.closest('form[data-keepfocus]')&&e.target.type==='search'){e.target.blur()}});
D.addEventListener('touchstart',function(e){var a=D.activeElement;if(a&&a.matches&&a.matches(ED)&&!e.target.closest(ED+',label,.kbdone,button,a'))a.blur()},{passive:true});
/* aperçu des circuits au toucher */
var tmr;D.addEventListener('click',function(e){if(!matchMedia('(hover:none)').matches)return;var c=e.target.closest('.card .cimg');if(!c||e.target.closest('.peek,.heart'))return;var card=c.closest('.card'),on=card.classList.contains('pk');D.querySelectorAll('.card.pk').forEach(function(x){x.classList.remove('pk')});if(!on){card.classList.add('pk');clearTimeout(tmr);tmr=setTimeout(function(){card.classList.remove('pk')},6000)}});
})();
`;
module.exports={css,js};
