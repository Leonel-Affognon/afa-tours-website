const css=String.raw`
.mbc{border:1.5px solid #eadfd3;border-radius:16px;padding:14px 16px;margin-bottom:12px;background:#fff;color:#2A0C07}.mbh{display:flex;justify-content:space-between;gap:8px;align-items:center}.mbs{background:#fff4e8;color:#B51D27;border-radius:999px;padding:4px 10px;font-weight:700;font-size:.78rem}.mbc h3{margin:6px 0 2px;font-size:1.05rem}.mbc p{margin:0 0 8px;color:#6b4a3f}.mbc pre{white-space:pre-wrap;font:inherit;font-size:.85rem;background:#FBF6EF;padding:10px;border-radius:10px}.mba{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
.orow{display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:8px;margin-bottom:8px}.orow input,.orow select{font:inherit;padding:10px;border:1.5px solid #d9c9b8;border-radius:10px;min-height:44px;min-width:0}.f .oth{margin-top:8px}.f .chks+input{margin-top:8px;width:100%;font:inherit;padding:10px;border:1.5px solid #d9c9b8;border-radius:10px;min-height:44px}@media(max-width:700px){.orow{grid-template-columns:1fr 1fr}.orow input:first-child{grid-column:1/-1}}
#pl{max-width:980px;width:calc(100vw - 20px);max-height:calc(100dvh - 20px);padding:0}
#pl .xb{padding:0}
.plw{display:grid;grid-template-columns:1fr;gap:0}
.pls{padding:18px 22px;background:#FBF6EF;border-bottom:1px solid #eadfd3;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;align-items:end}
.pls label{display:flex;flex-direction:column;gap:5px;font-weight:700;font-size:.82rem;color:#2A0C07}
.pls input,.pls select{font:inherit;padding:10px 12px;border:1.5px solid #d9c9b8;border-radius:10px;background:#fff;color:#2A0C07;min-height:44px}
.plc{display:flex;gap:6px;flex-wrap:wrap}.plc button{border:1.5px solid #d9c9b8;background:#fff;color:#2A0C07;border-radius:999px;padding:9px 14px;font:inherit;font-weight:700;cursor:pointer;min-height:44px}.plc button.on{background:#E8832F;border-color:#E8832F;color:#fff}
.pld{padding:16px 22px;display:grid;gap:14px;overflow:auto}
.pd{border:1.5px solid #eadfd3;border-radius:16px;background:#fff;color:#2A0C07;overflow:hidden}
.pd>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:12px;padding:14px 16px;font-weight:800}
.pd>summary::-webkit-details-marker{display:none}
.pd>summary b{background:#2A0C07;color:#fff;border-radius:10px;padding:6px 10px;font-size:.85rem;white-space:nowrap}
.pd>summary span{flex:1;font-weight:600;color:#6b4a3f;font-size:.88rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pd>summary i{font-style:normal;color:#E8832F;font-weight:800;white-space:nowrap}
.pdb{padding:4px 16px 16px;display:grid;gap:14px;border-top:1px solid #f1e7dc}
.pdb h4{margin:10px 0 6px;font-size:.9rem;color:#B51D27}
.pdb input[type=text],.pdb select,.pdb textarea{width:100%;font:inherit;padding:10px 12px;border:1.5px solid #d9c9b8;border-radius:10px;background:#fff;color:#2A0C07;min-height:44px}
.pck{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}
.pck label{display:flex;gap:10px;align-items:flex-start;border:1.5px solid #eadfd3;border-radius:12px;padding:10px;cursor:pointer;font-size:.88rem;line-height:1.3;background:#fff}
.pck label:has(input:checked){border-color:#E8832F;background:#fff4e8}
.pck input{margin-top:3px;width:18px;height:18px;accent-color:#E8832F;flex:none}
.pck small{display:block;color:#6b4a3f}.pck em{font-style:normal;color:#B51D27;font-weight:800}
.pck .mo{color:#E8832F;text-decoration:underline;cursor:pointer;font-weight:700;background:none;border:0;padding:0;font:inherit;font-size:.8rem}
.plf{position:sticky;bottom:0;background:#2A0C07;color:#fff;padding:14px 22px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;justify-content:space-between}
.plf .tt{font-size:1.25rem;font-weight:800;color:#F5B27A}.plf small{display:block;opacity:.8;font-weight:500;font-size:.78rem;max-width:46ch}
.plf .btn{min-height:46px}
.plq{padding:0 22px 16px;color:#6b4a3f;font-size:.85rem}
@media(max-width:700px){#pl{width:100vw;max-width:100vw;height:100dvh;max-height:100dvh;border-radius:0;margin:0}.pls,.pld{padding:14px}.plf{padding:12px 14px}.pck{grid-template-columns:1fr}}
`;
const js=String.raw`
/* ===== Traduction EN ===== */
(function(){
const D=window.__EN||{};
const RX=[[/^Jour (\d+)$/,'Day $1'],[/^Étape (\d) sur (\d)$/,'Step $1 of $2'],[/(\d+) jours$/,'$1 days'],[/^(\d+) jours · (\d+) voyageurs? · (\d+) chambres?/,'$1 days · $2 traveller(s) · $3 room(s)'],[/^Jours (\d+)-(\d+) · /,'Days $1-$2 · '],[/^Jours? (\d+) · /,'Day $1 · '],[/^Prix sur devis, établi selon vos dates et vos choix/,'Price on request, based on your dates and choices']];
const SUB=[['Sur les traces du Danxomè','In the footsteps of Dahomey'],['Les Secrets de la Rivière Noire','Secrets of the Black River'],['Cotonou, entre Amazone et Atlantique','Cotonou, between Amazon and Atlantic'],['La Vie entre ciel et eau','Life between sky and water'],['À la rencontre du fleuve et de l’océan','Meeting the river and the ocean'],['La Route des mémoires','The Route of Memory'],['Sur les pistes de la Pendjari','On the Pendjari trails'],['L’Axe du pouvoir','The Axis of Power'],[' retour et détente',' return and relaxation'],[' le programme d’une semaine',' the one-week programme'],[' route vers le Nord',' road north'],[' et Adjarra',' and Adjarra'],['Accueil à l’aéroport de Cotonou','Cotonou airport pickup'],['Véhicule avec chauffeur à la journée','Vehicle with driver by the day'],['Que voulez-vous réserver ?','What do you want to book?'],['Écrivez un message','Write a message'],['Porto-Novo, Ouidah et Cotonou : patrimoine, mémoire et lagune.','Porto-Novo, Ouidah and Cotonou: heritage, memory and lagoon.'],['Découvrez les paysages de la Bouche du Roy, les mangroves, les villages de pêcheurs et le littoral.','Discover the landscapes of the Bouche du Roy, mangroves, fishing villages and the coast.'],['Lien à renseigner dans l’espace admin','Link to be set in the admin area'],[' sur devis',' on request'],['/nuit','/night'],['personne(s)','person(s)'],[' jours',' days'],[' jour',' day'],[' voyageurs',' travellers'],[' voyageur',' traveller'],[' chambres',' rooms'],[' chambre',' room'],[' élément',' item'],['avis d’exemple','sample review'],[' avis',' reviews'],['Sans prix affiché, donc inclus dans le devis','No price shown, so included in the quote'],['Sans prix','No price'],['Sur devis','On request'],['Arrivée','Arrival']];
const lg=()=>(typeof lang!=='undefined'?lang:'fr');
function conv(s){const k=s.trim();if(!k)return s;let o=D[k];if(!o){let c=k,ch=false;for(const [r,v] of RX){if(r.test(c)){c=c.replace(r,v);ch=true;break}}for(const [a,b] of SUB)if(c.includes(a)){c=c.split(a).join(b);ch=true}if(ch)o=c}
if(!o)return s;return s.replace(k,o)}
let busy=false;
function node(n){if(n.nodeType===3){const p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName))return;if(n.__o===undefined||n.nodeValue!==n.__t)n.__o=n.nodeValue;const v=lg()==='en'?conv(n.__o):n.__o;n.__t=v;if(v!==n.nodeValue)n.nodeValue=v}
else if(n.nodeType===1){if(/^(SCRIPT|STYLE)$/.test(n.tagName))return;for(const a of ['placeholder','aria-label','title','alt']){if(n.hasAttribute(a)){const k='__o_'+a;const kt='__t_'+a;if(n[k]===undefined||n.getAttribute(a)!==n[kt])n[k]=n.getAttribute(a);const v=lg()==='en'?conv(n[k]):n[k];n[kt]=v;if(v!==n.getAttribute(a))n.setAttribute(a,v)}}
n.childNodes.forEach(node)}}
function run(root){busy=true;try{node(root||document.body)}finally{busy=false}}
window.__trDom=run;
let tm;const mo=new MutationObserver(ms=>{if(busy)return;clearTimeout(tm);tm=setTimeout(()=>{if(lg()==='en'||document.__trWas){busy=true;try{ms.forEach(m=>{m.addedNodes.forEach(node);if(m.type==='characterData')node(m.target)})}finally{busy=false}}},30)});
mo.observe(document.body,{childList:true,subtree:true,characterData:true});
function all(){document.__trWas=lg()==='en';run(document.body)}
document.addEventListener('click',e=>{if(e.target.closest('[data-lang]'))setTimeout(all,60);setTimeout(()=>{if(lg()==='en')run(document.body)},200)});
all();
})();

(function(){
const W=window.__AFA;if(!W)return;
const E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const KEY='afa_plan';
let P;try{P=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){P=null}
if(!P||!P.days)P={start:'',n:7,pax:2,rooms:1,days:[]};
function save(){try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}}
function ensure(){while(P.days.length<P.n)P.days.push({city:'',c:[],lod:P.days.length?'prev':'afa',r:[],t:[],note:''});P.days.length=P.n}
const d=document.createElement('dialog');d.className='xd';d.id='pl';d.setAttribute('aria-labelledby','plt');
d.innerHTML='<div class="xh"><h2 id="plt">Composer mon séjour</h2><p>Choisissez vos circuits, vos hôtels et vos transports jour par jour. Le prix se calcule tout seul.</p><button class="xx" type="button" aria-label="Fermer" id="plx">×</button></div><div class="xb"><div class="plw"><div class="pls" id="pls"></div><div class="pld" id="pld"></div><p class="plq" id="plq"></p></div><div class="plf"><div><div class="tt" id="pltt"></div><small id="plsm"></small></div><button class="btn btn-red" type="button" id="plgo">Envoyer ma demande</button></div></div>';
document.body.appendChild(d);
const $=s=>d.querySelector(s);
const circuits=()=>(window.TRIPS||[]);
const lodgings=()=>W.ALLP().filter(x=>x.k==='hotel'||x.k==='heb');
const restos=()=>W.ALLP().filter(x=>x.k==='resto');
const trans=()=>W.TR.map(x=>({id:x.id,n:x.n,p:x.p||0,u:''})).concat(W.ALLP().filter(x=>x.k==='trans').map(x=>({id:x.id,n:x.n,p:x.p||0,u:x.u||''})));
const m=n=>typeof money==='function'?money(n):n.toLocaleString('fr-FR')+' FCFA';
function setup(){
$('#pls').innerHTML='<label>Arrivée<input type="date" id="pst" value="'+E(P.start)+'"></label><label>Nombre de jours<div class="plc" id="pn">'+[3,5,7,10,14,21].map(n=>'<button type="button" data-n="'+n+'" class="'+(P.n===n?'on':'')+'">'+n+'</button>').join('')+'</div></label><label>Autre durée (1 à 60)<input type="number" min="1" max="60" id="pnc" value="'+P.n+'"></label><label>Voyageurs<input type="number" min="1" max="99" id="ppx" value="'+P.pax+'"></label><label>Chambres<input type="number" min="1" max="50" id="prm" value="'+P.rooms+'"></label>'}
function dateOf(i){if(!P.start)return'';const t=new Date(P.start+'T12:00:00');t.setDate(t.getDate()+i);return t.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})}
function lodOpts(i,v){const l=lodgings();return (i?'<option value="prev"'+(v==='prev'?' selected':'')+'>Même hébergement que la nuit précédente</option>':'')+'<option value="afa"'+(v==='afa'?' selected':'')+'>Laissez AFA TOURS me proposer</option><option value="own"'+(v==='own'?' selected':'')+'>J’ai déjà mon hébergement</option><option value="none"'+(v==='none'?' selected':'')+'>Pas de nuit ici</option>'+l.map(x=>'<option value="'+E(x.id)+'"'+(v===x.id?' selected':'')+'>'+E((W.KI[x.k]||'')+' '+x.n+(x.v?' — '+x.v:'')+(x.p?' · '+m(x.p)+'/nuit':' · sur devis'))+'</option>').join('')}
function chk(name,i,items,sel,priceFn){return '<div class="pck">'+items.map(x=>'<label><input type="checkbox" data-k="'+name+'" data-i="'+i+'" value="'+E(x.id)+'"'+(sel.includes(x.id)?' checked':'')+'><span>'+E(x.n)+'<small>'+(priceFn(x)||'')+'</small>'+(name==='c'?'<button type="button" class="mo" data-det="'+E(x.id)+'">Voir le détail</button>':'')+'</span></label>').join('')+'</div>'}
function days(){
ensure();const op=[...$('#pld').querySelectorAll('details')].map(x=>x.open);
$('#pld').innerHTML=P.days.map((x,i)=>'<details class="pd" data-i="'+i+'"'+(op[i]||(!op.length&&i===0)?' open':'')+'><summary><b>Jour '+(i+1)+'</b><span>'+E(dateOf(i)+(x.city?' · '+x.city:''))+'</span><i data-sub="'+i+'"></i></summary><div class="pdb"><div><h4>Ville ou lieu</h4><input type="text" data-f="city" data-i="'+i+'" value="'+E(x.city)+'" placeholder="Cotonou, Ouidah, Abomey, Grand-Popo…"></div><div><h4>Circuits et visites ce jour</h4>'+chk('c',i,circuits().map(t=>({id:t.id,n:t.destination+' — '+t.title,p:t.priceValue})),x.c,t=>t.p?'<em>'+m(t.p)+'</em> par personne':'Prix sur devis')+'</div><div><h4>Hébergement pour la nuit</h4><select data-f="lod" data-i="'+i+'">'+lodOpts(i,x.lod)+'</select></div>'+(restos().length?'<div><h4>Restaurants</h4>'+chk('r',i,restos(),x.r,r=>r.p?'<em>'+m(r.p)+'</em> par personne':'Prix sur devis')+'</div>':'')+'<div><h4>Transport</h4>'+chk('t',i,trans(),x.t,t=>t.p?'<em>'+m(t.p)+'</em>'+(t.u?' / '+E(t.u):''):'Prix sur devis')+'</div><div><h4>Précisions pour ce jour</h4><textarea rows="2" data-f="note" data-i="'+i+'" placeholder="Horaires, envies, contraintes…">'+E(x.note)+'</textarea></div></div></details>').join('');
calc()}
function resolveLod(i){let v=P.days[i].lod;while(v==='prev'&&i>0){i--;v=P.days[i].lod}return v==='prev'?'afa':v}
function calc(){
ensure();let total=0,quote=[],lines=[],txt=[];
const C=circuits(),L=lodgings(),R=restos(),TT=trans();
P.days.forEach((x,i)=>{let sub=0,parts=[];
x.c.forEach(id=>{const t=C.find(z=>z.id===id);if(!t)return;parts.push('Circuit : '+t.destination+' — '+t.title);if(t.priceValue)sub+=t.priceValue*P.pax;else quote.push('Jour '+(i+1)+' · '+t.destination)});
const lv=resolveLod(i);
if(lv==='afa')parts.push('Hébergement : à proposer par AFA TOURS');else if(lv==='own')parts.push('Hébergement : déjà réservé par le client');else if(lv!=='none'){const h=L.find(z=>z.id===lv);if(h){parts.push('Hébergement : '+h.n+(i&&x.lod==='prev'?' (même qu’avant)':''));if(h.p)sub+=h.p*P.rooms;else quote.push('Jour '+(i+1)+' · '+h.n)}}
x.r.forEach(id=>{const r=R.find(z=>z.id===id);if(!r)return;parts.push('Restaurant : '+r.n);if(r.p)sub+=r.p*P.pax;else quote.push('Jour '+(i+1)+' · '+r.n)});
x.t.forEach(id=>{const t=TT.find(z=>z.id===id);if(!t)return;parts.push('Transport : '+t.n);if(t.p)sub+=t.p;else quote.push('Jour '+(i+1)+' · '+t.n)});
if(x.note)parts.push('Note : '+x.note);
total+=sub;const el=$('[data-sub="'+i+'"]');if(el)el.textContent=sub?m(sub):'';
txt.push('Jour '+(i+1)+(P.start?' ('+dateOf(i)+')':'')+(x.city?' — '+x.city:'')+'\n  '+(parts.join('\n  ')||'À définir avec AFA TOURS'))});
const q=quote.length;
$('#pltt').textContent=total?m(total)+(q?' + devis':''):'Sur devis';
$('#plsm').textContent=P.n+' jours · '+P.pax+' voyageur'+(P.pax>1?'s':'')+' · '+P.rooms+' chambre'+(P.rooms>1?'s':'')+(q?' · '+q+' élément'+(q>1?'s':'')+' sans prix':'');
$('#plq').textContent=q?'Sans prix affiché, donc inclus dans le devis : '+quote.slice(0,8).join(' ; ')+(q>8?'…':'')+'.':'';
const full='SÉJOUR SUR MESURE — '+P.n+' jours'+(P.start?', arrivée le '+P.start:'')+'\nVoyageurs : '+P.pax+' · Chambres : '+P.rooms+'\n'+txt.join('\n')+'\n'+(total?'Estimation calculée : '+m(total)+(q?' (hors éléments sans prix)':''):'Prix à établir sur devis');
P.out={days:P.days.map((x,i)=>({i,city:x.city})),total:total,est:total,quote:!total||q>0,text:full};save();return P.out}
d.addEventListener('input',e=>{const t=e.target;
if(t.id==='pst'){P.start=t.value;days();return}
if(t.id==='ppx'){P.pax=Math.max(1,+t.value||1);calc();return}
if(t.id==='prm'){P.rooms=Math.max(1,+t.value||1);calc();return}
if(t.id==='pnc'){const n=Math.min(60,Math.max(1,+t.value||1));if(n!==P.n){P.n=n;setup();days()}return}
if(t.dataset.f){P.days[+t.dataset.i][t.dataset.f]=t.value;if(t.dataset.f==='city'){const s=t.closest('details').querySelector('summary span');s.textContent=dateOf(+t.dataset.i)+(t.value?' · '+t.value:'')}calc()}});
d.addEventListener('change',e=>{const t=e.target;
if(t.dataset.k){const a=P.days[+t.dataset.i][t.dataset.k==='c'?'c':t.dataset.k==='r'?'r':'t'];const v=t.value,ix=a.indexOf(v);if(t.checked&&ix<0)a.push(v);if(!t.checked&&ix>=0)a.splice(ix,1);calc();return}
if(t.dataset.f==='lod'){P.days[+t.dataset.i].lod=t.value;calc()}});
d.addEventListener('click',e=>{const t=e.target;
if(t.id==='plx'){d.close();return}
const n=t.closest('[data-n]');if(n){P.n=+n.dataset.n;setup();days();return}
const det=t.closest('[data-det]');if(det){e.preventDefault();e.stopPropagation();d.close();setTimeout(()=>{window.openD&&openD(det.dataset.det)},50);return}
if(t.id==='plgo'){const o=calc();d.close();W.setPlan({days:o.days,total:o.total,est:o.est,quote:o.quote,text:o.text},P.pax)}});
d.addEventListener('click',e=>{if(e.target===d)d.close()});
function open(){setup();days();d.showModal()}
window.__plan={open:open};
document.addEventListener('click',e=>{const b=e.target.closest('[data-plan],.cw [data-bk="plan"]');if(b){e.preventDefault();open()}});
})();

/* ===== Mes réservations ===== */
(function(){
const E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const get=()=>{try{return JSON.parse(localStorage.getItem('afa_bookings')||'[]')}catch(e){return[]}};
const set=a=>{try{localStorage.setItem('afa_bookings',JSON.stringify(a))}catch(e){}};
const m=n=>typeof money==='function'?money(n):n+' FCFA';
const d=document.createElement('dialog');d.className='xd';d.id='mb';d.setAttribute('aria-labelledby','mbt');
d.innerHTML='<div class="xh"><h2 id="mbt">Mes réservations</h2><p>Toutes vos demandes faites depuis cet appareil. Réservez autant de fois que vous voulez, pour vous, votre famille ou vos amis.</p><button class="xx" type="button" aria-label="Fermer" data-x>×</button></div><div class="xb"><div id="mbl"></div><p style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px"><button class="btn btn-red" type="button" data-mbnew>Nouvelle réservation</button><button class="btn btn-out" type="button" data-plan data-mbclose>Composer un séjour</button></p></div>';
document.body.appendChild(d);
function ics(r){const dt=r.d1||'';if(!dt)return null;const s=dt.replace(/-/g,'');const e=new Date(dt+'T12:00:00');e.setDate(e.getDate()+1);const en=e.toISOString().slice(0,10).replace(/-/g,'');
return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//AFA TOURS//FR','BEGIN:VEVENT','UID:'+r.ref+'@afa-tours','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z','DTSTART;VALUE=DATE:'+s,'DTEND;VALUE=DATE:'+en,'SUMMARY:AFA TOURS : '+(r.label||'Réservation'),'DESCRIPTION:Référence '+r.ref+'. Contact : +229 01 97 16 56 46','BEGIN:VALARM','TRIGGER:-P2D','ACTION:DISPLAY','DESCRIPTION:Dans 2 jours : '+(r.label||'')+'. Pensez au paiement et à vos documents.','END:VALARM','BEGIN:VALARM','TRIGGER:-P7D','ACTION:DISPLAY','DESCRIPTION:Dans 7 jours : '+(r.label||'')+'. Confirmez votre paiement.','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n')}
function draw(){const a=get();$('#mbl')&&0;const L=d.querySelector('#mbl');
L.innerHTML=a.length?a.map((r,i)=>'<article class="mbc"><div class="mbh"><b>'+E(r.ref)+'</b><span class="mbs">'+E(r.status||'')+'</span></div><h3>'+E(r.label||'')+'</h3><p>'+E([r.d1,(r.pax||1)+' personne(s)',r.total?m(r.total):'Sur devis'].filter(Boolean).join(' · '))+'</p>'+(r.x?'<details><summary>Détails</summary><pre>'+E(r.x)+'</pre></details>':'')+'<div class="mba"><a class="btn btn-out btn-sm" target="_blank" rel="noopener" href="https://wa.me/2290197165646?text='+encodeURIComponent('Bonjour AFA TOURS, je voudrais des nouvelles de ma demande '+r.ref+' ('+(r.label||'')+').')+'">Écrire à l’équipe</a>'+(r.d1?'<button class="btn btn-out btn-sm" data-ics="'+i+'">Ajouter un rappel au calendrier</button>':'')+'<button class="btn btn-out btn-sm" data-again="'+i+'">Réserver à nouveau</button><button class="btn btn-out btn-sm" data-rm="'+i+'">Retirer</button></div></article>').join(''):'<p style="text-align:center;padding:30px 0;color:#6b4a3f">Aucune réservation pour le moment. Vos prochaines demandes apparaîtront ici.</p>';
if(window.__trDom)window.__trDom(d)}
function open(){draw();d.showModal()}
window.__myBk={open:open};
function nav(){document.querySelectorAll('.nav,#mm').forEach(n=>{if(n.querySelector('[data-mybk]'))return;const a=document.createElement('a');a.href='#';a.setAttribute('data-mybk','');a.textContent='Mes réservations';n.appendChild(a)});if(window.__trDom)window.__trDom(document.body)}
nav();
document.addEventListener('click',e=>{const t=e.target;
if(t.closest('[data-mybk]')){e.preventDefault();const mm=document.getElementById('mm');mm&&mm.classList.remove('open');open();return}
if(t.closest('[data-mbnew]')){d.close();window.openBook&&openBook('circuit');return}
if(t.closest('[data-mbclose]')&&t.closest('#mb')){d.close();return}
const i=t.closest('[data-ics]');if(i){const r=get()[+i.dataset.ics];const c=ics(r);if(!c)return;const u=URL.createObjectURL(new Blob([c],{type:'text/calendar'}));const a=document.createElement('a');a.href=u;a.download='afa-tours-'+r.ref+'.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);return}
const ag=t.closest('[data-again]');if(ag){const r=get()[+ag.dataset.again];d.close();window.openBook&&openBook(r.kind==='plan'?'circuit':r.kind);return}
const rm=t.closest('[data-rm]');if(rm){const a=get();a.splice(+rm.dataset.rm,1);set(a);draw()}});
})();
`;
module.exports={css,js:'window.__EN='+JSON.stringify(require('./en.json'))+';'+js};
