const css=String.raw`
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
`;
module.exports={css,js};
