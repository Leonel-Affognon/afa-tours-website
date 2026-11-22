const css=``;
const js=String.raw`
(function(){
var FR='2290197165646',EN='2290161956804',MAIL='afatours23@gmail.com';
var D=document,ua=navigator.userAgent||'',AND=/Android/i.test(ua),IOS=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1),MOB=AND||IOS;
function lg(){return (typeof lang!=='undefined'&&lang==='en')?'en':'fr'}
function num(){return lg()==='en'?EN:FR}
/* le numéro suit la langue du visiteur : un anglophone tombe toujours sur la ligne anglaise */
function fix(a){if(!a.getAttribute||a.hasAttribute('data-nr'))return;var h=a.getAttribute('href')||'';if(h.indexOf(FR)<0&&h.indexOf(EN)<0)return;var n=num(),o=n===EN?FR:EN;if(h.indexOf(o)>=0)a.setAttribute('href',h.split(o).join(n))}
function all(){D.querySelectorAll('a[href*="'+FR+'"],a[href*="'+EN+'"]').forEach(fix);D.querySelectorAll('a[href^="mailto:"]').forEach(function(a){a.setAttribute('href',a.getAttribute('href').replace(/afatours2[0-9]@gmail\.com/,MAIL))})}
var tm;new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(all,120)}).observe(D.documentElement,{childList:true,subtree:true});all();
var al=window.applyLang;if(typeof al==='function')window.applyLang=function(){var r=al.apply(this,arguments);all();return r};
/* clic direct : WhatsApp ouvre l'application, e-mail ouvre la messagerie, sans page intermédiaire */
D.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button>0||e.metaKey||e.ctrlKey)return;fix(a);var h=a.getAttribute('href')||'';
 var U=null;try{U=new URL(h,location.href)}catch(x){}
 if(U&&(U.hostname==='wa.me'||U.hostname==='api.whatsapp.com'||U.hostname==='web.whatsapp.com')){
  var p=U.hostname==='wa.me'?U.pathname.replace(/\D/g,''):(U.searchParams.get('phone')||'').replace(/\D/g,''),tx=U.searchParams.get('text')||'',t=tx?encodeURIComponent(tx):'';
  if(p){e.preventDefault();var u;
  if(AND)u='intent://send?phone='+p+(t?'&text='+t:'')+'#Intent;scheme=whatsapp;package=com.whatsapp;S.browser_fallback_url='+encodeURIComponent('https://wa.me/'+p+(t?'?text='+t:''))+';end';
  else if(IOS)u='https://wa.me/'+p+(t?'?text='+t:'');
  else u='https://web.whatsapp.com/send?phone='+p+(t?'&text='+t:'');
  if(MOB)location.href=u;else window.open(u,'_blank','noopener');return}}
 if(/^mailto:/i.test(h)){var q=h.replace(/^mailto:/i,'').split('?'),to=decodeURIComponent(q[0]||MAIL).replace(/afatours2[0-9]@gmail\.com/,MAIL),par=new URLSearchParams(q[1]||'');
  if(!MOB){e.preventDefault();window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(to)+(par.get('subject')?'&su='+encodeURIComponent(par.get('subject')):'')+(par.get('body')?'&body='+encodeURIComponent(par.get('body')):''),'_blank','noopener')}}
},true);
})();
`;
module.exports={css,js};
