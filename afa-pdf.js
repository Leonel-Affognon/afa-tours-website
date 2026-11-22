/* AFA TOURS · générateur de PDF officiel (logo, charte, pied de page). Utilisé par le site et l'admin. */
(function(){
var C={brown:[42,12,7],orange:[232,131,47],red:[181,29,39],cream:[251,246,239],ink:[42,12,7],mute:[110,90,84],line:[226,214,200]};
var CONTACT={fr:'+229 01 97 16 56 46 (Français)',en:'+229 01 61 95 68 04 (English)',mail:'afatours23@gmail.com',web:'leonel-affognon.github.io/afa-tours-website'};
function loadJs(src){return new Promise(function(ok,ko){if(window.jspdf)return ok();var s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=function(){ko(new Error('PDF indisponible'))};document.head.appendChild(s)})}
function logo(){return new Promise(function(ok){var i=new Image();i.onload=function(){try{var c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;c.getContext('2d').drawImage(i,0,0);ok(c.toDataURL('image/jpeg',.92))}catch(e){ok(null)}};i.onerror=function(){ok(null)};i.src=base+'afa-tours-logo.jpg'})}
var base=(function(){var s=document.currentScript;return s&&s.src?s.src.replace(/[^\/]*$/,''):location.href.replace(/[^\/]*$/,'')})();
function clean(t){return String(t==null?'':t).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/→/g,'->').replace(/[–—]/g,'-').replace(/ | /g,' ').replace(/[^\x09\x0A\x0D\x20-\x7E -ÿ€]/g,'')}
async function make(o){
 await loadJs(base+'vendor/jspdf.umd.min.js');var lg=await logo();
 var J=window.jspdf.jsPDF,d=new J({unit:'mm',format:'a4'}),W=210,H=297,M=16,y=0,pg=1,en=o.lang==='en';
 function head(first){d.setFillColor.apply(d,C.brown);d.rect(0,0,W,first?40:18,'F');d.setFillColor.apply(d,C.orange);d.rect(0,first?40:18,W,1.6,'F');
  var s=first?26:12,x=M;if(lg){d.addImage(lg,'JPEG',M,first?7:3,s,s);x=M+s+5}
  d.setTextColor(255,255,255);d.setFont('helvetica','bold');d.setFontSize(first?20:12);d.text('AFA TOURS',x,first?20:10.5);
  if(first){d.setFont('helvetica','normal');d.setFontSize(9.5);d.setTextColor.apply(d,C.orange);d.text(clean(en?'Authentic Innovative Africa  -  Discover Africa through Benin':'Afrique Authentique Innovant  -  Découvrez l\'Afrique à travers le Bénin'),x,27)}
  y=first?54:30}
 function foot(){d.setDrawColor.apply(d,C.line);d.setLineWidth(.3);d.line(M,H-17,W-M,H-17);d.setFont('helvetica','normal');d.setFontSize(8);d.setTextColor.apply(d,C.mute);
  d.text(clean(CONTACT.fr+'   |   '+CONTACT.en),M,H-12);d.text(clean(CONTACT.mail+'   |   '+CONTACT.web),M,H-8);d.text(String(pg),W-M,H-8,{align:'right'})}
 function need(h){if(y+h>H-22){foot();d.addPage();pg++;head(false)}}
 function wrap(t,w,fs){d.setFontSize(fs);return d.splitTextToSize(clean(t),w)}
 head(true);
 d.setFont('helvetica','bold');d.setFontSize(22);d.setTextColor.apply(d,C.red);var tl=wrap(o.title,W-2*M,22);d.text(tl,M,y);y+=tl.length*9;
 if(o.subtitle){d.setFont('helvetica','normal');d.setFontSize(11);d.setTextColor.apply(d,C.mute);var sl=wrap(o.subtitle,W-2*M,11);d.text(sl,M,y);y+=sl.length*5.2}
 y+=4;d.setFillColor.apply(d,C.orange);d.rect(M,y,24,1.2,'F');y+=9;
 (o.blocks||[]).forEach(function(b){
  if(b.t==='h'){need(14);d.setFont('helvetica','bold');d.setFontSize(13);d.setTextColor.apply(d,C.brown);d.text(clean(b.v),M,y);y+=2;d.setDrawColor.apply(d,C.orange);d.setLineWidth(.6);d.line(M,y,M+14,y);y+=7}
  else if(b.t==='p'){d.setFont('helvetica','normal');d.setTextColor.apply(d,C.ink);var L=wrap(b.v,W-2*M,10.5);L.forEach(function(l){need(6);d.setFontSize(10.5);d.text(l,M,y);y+=5.4});y+=3}
  else if(b.t==='list'){b.v.forEach(function(it,i){var L=wrap(it,W-2*M-10,10.5);need(L.length*5.4+2);d.setFillColor.apply(d,C.orange);d.circle(M+2,y-1.3,1.1,'F');d.setFont('helvetica','normal');d.setTextColor.apply(d,C.ink);d.setFontSize(10.5);d.text(L,M+8,y);y+=L.length*5.4+1.6});y+=3}
  else if(b.t==='stats'){var n=b.v.length,w=(W-2*M-(n-1)*4)/n;need(24);b.v.forEach(function(s,i){var x=M+i*(w+4);d.setFillColor.apply(d,C.cream);d.setDrawColor.apply(d,C.line);d.roundedRect(x,y,w,20,3,3,'FD');d.setFont('helvetica','normal');d.setFontSize(8);d.setTextColor.apply(d,C.mute);d.text(wrap(s[0],w-6,8),x+4,y+6);d.setFont('helvetica','bold');d.setFontSize(14);d.setTextColor.apply(d,C.red);d.text(clean(s[1]),x+4,y+15.5)});y+=28}
  else if(b.t==='kv'){b.v.forEach(function(r){var L=wrap(r[1],W-2*M-48,10.5);need(L.length*5.4+2);d.setFont('helvetica','bold');d.setFontSize(10);d.setTextColor.apply(d,C.mute);d.text(clean(r[0]),M,y);d.setFont('helvetica','normal');d.setFontSize(10.5);d.setTextColor.apply(d,C.ink);d.text(L,M+46,y);y+=L.length*5.4+1.5});y+=3}
  else if(b.t==='box'){var L=wrap(b.v,W-2*M-12,10.5),h=L.length*5.4+10;need(h+4);d.setFillColor.apply(d,C.cream);d.setDrawColor.apply(d,C.orange);d.setLineWidth(.5);d.roundedRect(M,y,W-2*M,h,3,3,'FD');d.setFont('helvetica','normal');d.setFontSize(10.5);d.setTextColor.apply(d,C.ink);d.text(L,M+6,y+7.5);y+=h+6}
  else if(b.t==='table'){var cw=b.w||b.head.map(function(){return 1}),tot=cw.reduce(function(a,c){return a+c},0),TW=W-2*M,xs=[],acc=M;cw.forEach(function(c){xs.push(acc);acc+=TW*c/tot});
   function row(cells,hd,alt){var fs=hd?8.5:9,ls=cells.map(function(c,i){return wrap(c,TW*cw[i]/tot-4,fs)}),h=Math.max.apply(null,ls.map(function(l){return l.length}))*4.4+4;need(h);
    if(hd){d.setFillColor.apply(d,C.brown)}else if(alt){d.setFillColor.apply(d,C.cream)}else d.setFillColor(255,255,255);d.rect(M,y-4,TW,h,'F');
    d.setFont('helvetica',hd?'bold':'normal');d.setFontSize(fs);if(hd)d.setTextColor(255,255,255);else d.setTextColor.apply(d,C.ink);
    ls.forEach(function(l,i){d.text(l,xs[i]+2,y)});y+=h;if(!hd){d.setDrawColor.apply(d,C.line);d.setLineWidth(.2);d.line(M,y-4,W-M,y-4)}}
   row(b.head,true);b.rows.forEach(function(r,i){row(r.map(clean),false,i%2)});y+=6}
 });
 foot();d.save((o.file||'afa-tours')+'.pdf');
}
window.AFAPDF={make:make};
})();
