const css=String.raw`
/* ===== Chat façon WhatsApp ===== */
.cwl{position:fixed;left:16px;bottom:16px;z-index:58;display:flex;align-items:center;gap:10px;border:0;cursor:pointer;background:#2A0C07;color:#fff;border-radius:999px;padding:12px 18px 12px 14px;font:700 .95rem var(--b,inherit);box-shadow:0 10px 28px rgba(42,12,7,.4);transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s}
.cwl:hover{transform:translateY(-3px)}.cwl svg{width:24px;height:24px;fill:#fff}.cwl .dot{position:absolute;top:-3px;right:-3px;min-width:20px;height:20px;border-radius:10px;background:#B51D27;color:#fff;font-size:.72rem;display:none;place-items:center;padding:0 5px;border:2px solid #fff}.cwl.has .dot{display:grid}
.cw{position:fixed;z-index:80;right:20px;bottom:20px;width:380px;max-width:calc(100vw - 24px);height:min(640px,calc(100dvh - 40px));display:none;flex-direction:column;border-radius:16px;overflow:hidden;background:#EFEAE2;box-shadow:0 24px 70px rgba(30,8,4,.45);font-family:var(--b,system-ui,sans-serif);color:#111B21}
.cw.on{display:flex;animation:cwin .35s cubic-bezier(.2,.8,.2,1)}
@keyframes cwin{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}
.cw .hd2{display:flex;align-items:center;gap:10px;padding:10px 10px 10px 8px;background:#008069;color:#fff;flex:none}
.cw .hd2 img{width:40px;height:40px;border-radius:50%;background:#fff;object-fit:cover;flex:none}
.cw .hd2 .nm{flex:1;min-width:0;line-height:1.2}.cw .hd2 b{display:block;font-size:1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cw .hd2 small{font-size:.76rem;opacity:.92}
.cw .ib{width:40px;height:40px;border:0;background:transparent;color:#fff;border-radius:50%;display:grid;place-items:center;cursor:pointer;flex:none}.cw .ib:hover{background:rgba(255,255,255,.14)}.cw .ib svg{width:22px;height:22px;fill:currentColor}
.cw .msgs{flex:1;overflow-y:auto;padding:12px 12px 6px;display:flex;flex-direction:column;gap:3px;background-color:#EFEAE2;background-image:radial-gradient(rgba(0,0,0,.045) 1.2px,transparent 1.3px);background-size:22px 22px;scroll-behavior:smooth}
.cw .day{align-self:center;background:#fff;color:#54656F;font-size:.74rem;padding:.3em .8em;border-radius:8px;margin:6px 0 8px;box-shadow:0 1px 1px rgba(0,0,0,.08)}
.cw .sys{align-self:center;background:#FFF3C4;color:#54656F;font-size:.76rem;line-height:1.35;padding:.5em .8em;border-radius:8px;margin:4px 10px 8px;text-align:center;box-shadow:0 1px 1px rgba(0,0,0,.08)}
.cw .b{max-width:84%;padding:6px 9px 5px;border-radius:9px;font-size:.93rem;line-height:1.38;box-shadow:0 1px 1px rgba(0,0,0,.12);position:relative;word-wrap:break-word;overflow-wrap:anywhere;animation:bpop .25s cubic-bezier(.2,.8,.2,1)}
@keyframes bpop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}
.cw .b.in{align-self:flex-start;background:#fff;border-top-left-radius:2px}.cw .b.out{align-self:flex-end;background:#D9FDD3;border-top-right-radius:2px}
.cw .b a{color:#027EB5;text-underline-offset:2px}.cw .b p{margin:0}.cw .b p+p{margin-top:6px}
.cw .b .t{float:right;margin:6px 0 -2px 10px;font-size:.68rem;color:#667781;display:inline-flex;gap:3px;align-items:center}.cw .b .t svg{width:16px;height:11px}.cw .tk{fill:none;stroke:#8696A0;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.cw .tk.rd{stroke:#53BDEB}
.cw .b img{display:block;max-width:100%;border-radius:6px;margin-bottom:3px}
.cw .typ{align-self:flex-start;background:#fff;border-radius:9px;border-top-left-radius:2px;padding:10px 12px;display:flex;gap:4px;box-shadow:0 1px 1px rgba(0,0,0,.12)}.cw .typ i{width:7px;height:7px;border-radius:50%;background:#8696A0;animation:tp 1.2s infinite}.cw .typ i:nth-child(2){animation-delay:.18s}.cw .typ i:nth-child(3){animation-delay:.36s}
@keyframes tp{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}
.cw .qr{display:flex;flex-wrap:wrap;gap:6px;padding:4px 12px 8px;background:transparent}.cw .qr button{border:1px solid #00806955;background:#fff;color:#00695C;font:700 .84rem var(--b,inherit);padding:.5em .9em;border-radius:999px;cursor:pointer}.cw .qr button:hover{background:#E7F6F2}
.cw .act{display:flex;gap:6px;flex-wrap:wrap;margin-top:7px}.cw .act a,.cw .act button{display:inline-flex;align-items:center;gap:6px;border:0;background:#E7F6F2;color:#00695C;font:700 .84rem var(--b,inherit);padding:.5em .85em;border-radius:8px;cursor:pointer;text-decoration:none}.cw .act a.wa{background:#25D366;color:#073B1A}
.cw .cbar{display:flex;align-items:flex-end;gap:6px;padding:8px;background:#F0F2F5;flex:none;position:relative}
.cw .cbar .box{flex:1;display:flex;align-items:flex-end;background:#fff;border-radius:22px;padding:2px 4px}
.cw .cbar .ib{color:#54656F;width:38px;height:38px}.cw .cbar .ib:hover{background:#0000000d}
.cw textarea{flex:1;border:0;outline:0;resize:none;font:400 16px/1.35 var(--b,inherit);padding:10px 4px;max-height:110px;background:transparent;color:#111B21;min-width:0}
.cw .snd{width:44px;height:44px;border-radius:50%;border:0;background:#00A884;color:#fff;display:grid;place-items:center;cursor:pointer;flex:none;transition:transform .2s}.cw .snd:hover{transform:scale(1.06)}.cw .snd svg{width:22px;height:22px;fill:#fff}
.cw .emo{position:absolute;left:8px;right:8px;bottom:62px;background:#fff;border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,.25);padding:10px;display:none;grid-template-columns:repeat(8,1fr);gap:2px;z-index:3}.cw .emo.on{display:grid}.cw .emo button{border:0;background:none;font-size:1.4rem;padding:4px;cursor:pointer;border-radius:8px}.cw .emo button:hover{background:#f0f2f5}
.cw .menu{position:absolute;right:8px;top:56px;background:#fff;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.28);padding:6px;display:none;z-index:4;min-width:220px}.cw .menu.on{display:block}.cw .menu button,.cw .menu a{display:block;width:100%;text-align:left;border:0;background:none;padding:.7em .9em;font:600 .92rem var(--b,inherit);color:#111B21;cursor:pointer;border-radius:8px;text-decoration:none}.cw .menu button:hover,.cw .menu a:hover{background:#f0f2f5}
@media(max-width:700px){.cwl{left:auto;right:10px;bottom:calc(env(safe-area-inset-bottom) + 84px);width:50px;height:50px;padding:0;justify-content:center}.cwl span:not(.dot){display:none}.snav{bottom:calc(env(safe-area-inset-bottom) + 144px)!important}.cw{inset:0;right:0;bottom:0;width:100%;max-width:100%;height:100dvh;border-radius:0}.cw .hd2{padding-top:calc(10px + env(safe-area-inset-top))}.cw .cbar{padding-bottom:calc(8px + env(safe-area-inset-bottom))}}
@media(prefers-reduced-motion:reduce){.cw.on,.cw .b{animation:none}.cw .typ i{animation:none}}
`;
const js=String.raw`
(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const KEY='afa_chat_v1',NUM_FR='2290197165646',NUM_EN='2290161956804';
const L=()=>(typeof lang!=='undefined'&&lang==='en')?'en':'fr';
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const ld=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}},sv=()=>{try{localStorage.setItem(KEY,JSON.stringify(H.slice(-80)))}catch(e){}};
let H=ld(),busy=false,lastLang=null;
const TK='<svg viewBox="0 0 16 11"><path class="tk RD" d="M1 5.8 4.2 9 10.6 1.4M6 8.6l.6.4L13 1.4"/></svg>';
const SEND='<svg viewBox="0 0 24 24"><path d="M3.4 20.4 20.85 12.9a1 1 0 0 0 0-1.8L3.4 3.6a1 1 0 0 0-1.4 1.2L4 11l9 1-9 1-2 6.2a1 1 0 0 0 1.4 1.2z"/></svg>';
const ICON={chat:'<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6 2 11c0 2.5 1.2 4.8 3.2 6.4L4 22l4.8-2.3c1 .2 2 .3 3.2.3 5.5 0 10-4 10-9s-4.5-9-10-9z"/></svg>',x:'<svg viewBox="0 0 24 24"><path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/></svg>',more:'<svg viewBox="0 0 24 24"><path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>',emo:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-3.5-9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 17.5c2.3 0 4.3-1.5 5-3.5H7c.7 2 2.7 3.5 5 3.5z"/></svg>',clip:'<svg viewBox="0 0 24 24"><path d="M16.5 6.5v9.7a4.5 4.5 0 0 1-9 0V5.8a3 3 0 0 1 6 0v9.9a1.5 1.5 0 0 1-3 0V6.5H9.5v9.2a3 3 0 0 0 6 0V5.8a4.5 4.5 0 0 0-9 0v10.4a6 6 0 0 0 12 0V6.5z"/></svg>',pin:'<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>'};
window.__ICON=ICON;
const EM='😀😊😍🙏👍🎉🌍🌴🦁🐘🛶🏨🍽️🚐✈️📍🔥✨❤️👏😉🤝🙌🌅'.match(/\p{Extended_Pictographic}️?/gu);
const T={fr:{name:'AFA Tours — Assistant',st:'assistant virtuel · répond tout de suite',online:'en ligne',typing:'écrit…',ph:'Écrivez un message',today:'Aujourd’hui',intro:'Les réponses viennent de l’assistant virtuel d’AFA Tours. Pour parler à un membre de l’équipe, utilisez le bouton WhatsApp.',hello:'Bonjour 👋 Je suis l’assistant virtuel d’AFA Tours. Je peux vous renseigner sur les circuits, les séjours, le transport, les hôtels et vos réservations. Que cherchez-vous ?',launch:'Discuter',menu:{clear:'Effacer la conversation',wa:'Continuer sur WhatsApp',call:'Appeler l’agence'},qr:['Les circuits','Les séjours','Le transport','Vodun Days','Réserver','Parler à l’équipe'],pos:'Ma position',photo:'Photo',sentpos:'📍 Ma position',photoNote:'Photo ajoutée à cette conversation. Pour l’envoyer à l’équipe, passez par WhatsApp.',wabtn:'Continuer sur WhatsApp',bookbtn:'Réserver maintenant',seeb:'Voir les circuits'},en:{name:'AFA Tours — Assistant',st:'virtual assistant · replies instantly',online:'online',typing:'typing…',ph:'Type a message',today:'Today',intro:'Replies come from AFA Tours’ virtual assistant. To speak with a team member, use the WhatsApp button.',hello:'Hello 👋 I’m AFA Tours’ virtual assistant. I can help with tours, longer stays, transport, hotels and your bookings. What are you looking for?',launch:'Chat',menu:{clear:'Clear chat',wa:'Continue on WhatsApp',call:'Call the agency'},qr:['Tours','Longer stays','Transport','Vodun Days','Book','Talk to the team'],pos:'My location',photo:'Photo',sentpos:'📍 My location',photoNote:'Photo added to this chat. To send it to the team, use WhatsApp.',wabtn:'Continue on WhatsApp',bookbtn:'Book now',seeb:'See the tours'}};
const t=()=>T[L()];
const num=()=>L()==='en'?NUM_EN:NUM_FR;
const hm=d=>new Date(d).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
const mny=n=>typeof money==='function'?money(n):n.toLocaleString('fr-FR')+' FCFA';
const trips=()=>window.TRIPS||[];
function wa(){const u=H.filter(m=>m.w==='out'&&m.k!=='img').slice(-3).map(m=>m.x).join(' / ');return 'https://wa.me/'+num()+'?text='+encodeURIComponent((L()==='en'?'Hello AFA Tours, I was chatting on your website. ':'Bonjour AFA Tours, je discutais sur votre site. ')+u)}
/* ---- cerveau local ---- */
const KB={
fr:{
greet:()=>['Bonjour ! Comment puis-je vous aider pour votre voyage au Bénin ?'],
circ:()=>{const a=trips().slice(0,8);return ['Nous proposons '+a.length+' circuits guidés par des Béninois : '+a.map(x=>x.destination).join(', ')+'.','La plupart durent de 2 à 4 heures. Dites-moi ce qui vous attire (histoire, ville, nature, savoir-faire) et je vous conseille.'].concat([{act:[{h:'#circuits',l:'Voir les circuits'}]}])},
price:()=>{const a=trips().filter(x=>x.priceValue).slice(0,4);return ['Voici quelques tarifs, par personne : '+a.map(x=>x.destination+' '+mny(x.priceValue)).join(' · ')+'.','Le prix s’affiche dans la monnaie de votre choix (marge de change de 7 % incluse). Un séjour, un groupe ou un transport sont chiffrés sur devis sous 24 / 72 h max.'].concat([{act:[{b:'book',l:'Demander mon séjour'}]}])},
sej:()=>['Oui, nous organisons des séjours de 3 jours, 1, 2 ou 3 semaines, ou sur mesure : circuits, hébergement et transport par une seule équipe.','Vous pouvez même choisir vous-même les circuits à inclure.',{act:[{h:'#sejours',l:'Voir les séjours'},{b:'book',kind:'sejour',l:'Réserver un séjour'}]}],
trn:()=>['Nous assurons l’accueil à l’aéroport de Cotonou, les transferts entre villes, la voiture avec chauffeur à la journée et le transport de groupe.',{act:[{h:'#partenaires',l:'Voir le transport'},{b:'book',kind:'transport',l:'Réserver un transport'}]}],
hot:()=>['Nous travaillons avec des hôtels, restaurants et hébergements partenaires, réservables en même temps que votre circuit. Vous tenez un établissement ? Vous pouvez aussi vous inscrire gratuitement comme partenaire.',{act:[{h:'#partenaires',l:'Voir les partenaires'},{j:1,l:'Devenir partenaire'}]}],
book:()=>['Avec plaisir ! La réservation se fait en quelques étapes, et vous pouvez partager votre position pour qu’on vous retrouve facilement.',{act:[{b:'book',l:'Réserver maintenant'}]}],
pay:()=>{let c={};try{c=JSON.parse(localStorage.getItem('afa_cfg'))||{}}catch(e){}const m=c.mode;return [m==='required'?'Le paiement en ligne est demandé pour confirmer votre réservation.':m==='deposit'?'Un acompte en ligne confirme votre réservation, le solde se règle ensuite.':'Vous choisissez le mode de paiement : Mobile Money, carte, virement ou paiement à l’agence, selon l’offre.','Les détails vous sont confirmés avec votre devis.']},
vod:()=>{const d=Math.max(0,Math.ceil((new Date('2027-01-02T00:00:00+01:00')-Date.now())/864e5));return ['Les Vodun Days ont lieu à Ouidah du 2 au 9 janvier 2027'+(d>0?' : il reste '+d+' jours.':'.'),'Nous organisons votre accompagnement : guide, transport et hébergement.',{act:[{h:'#agenda',l:'Voir les formules'},{b:'book',kind:'sejour',id:'s7',l:'Réserver ma place'}]}]},
contact:()=>['Vous pouvez nous joindre au +229 01 97 16 56 46 (français) ou au +229 01 61 95 68 04 (English), sur WhatsApp ou par appel.',{act:[{wa:1,l:'WhatsApp'}]}],
eng:()=>['Yes, we also work in English. The English-speaking team is on +229 01 61 95 68 04.',{act:[{wa:1,l:'WhatsApp'}]}],
human:()=>['Bien sûr. Un membre de l’équipe vous répond sur WhatsApp. Votre dernier message lui sera transmis.',{act:[{wa:1,l:'Parler à l’équipe'}]}],
cancel:()=>['Les conditions d’annulation et de modification vous sont confirmées avec votre devis, selon les prestations réservées. Pour une demande précise, l’équipe vous répond sous 24 / 72 h max.',{act:[{wa:1,l:'Écrire à l’équipe'}]}],
loc:()=>['Vous pouvez partager votre position avec le bouton 📍 en bas : c’est pratique pour une prise en charge. Pour un transport, on vous demande aussi l’adresse exacte.'],
thanks:()=>['Avec plaisir ! N’hésitez pas si vous avez d’autres questions 🙂'],
dflt:()=>['Merci pour votre message. Je n’ai pas bien compris, mais je peux vous aider sur : les circuits, les prix, les séjours, le transport, les hôtels et la réservation. Pour un cas précis, l’équipe vous répond sur WhatsApp.',{act:[{wa:1,l:'Parler à l’équipe'}]}]},
en:{
greet:()=>['Hello! How can I help you plan your trip to Benin?'],
circ:()=>{const a=trips().slice(0,8);return ['We offer '+a.length+' guided tours led by locals: '+a.map(x=>x.destination).join(', ')+'.','Most last 2 to 4 hours. Tell me what you enjoy (history, cities, nature, crafts) and I will suggest one.',{act:[{h:'#circuits',l:'See the tours'}]}]},
price:()=>{const a=trips().filter(x=>x.priceValue).slice(0,4);return ['Some prices, per person: '+a.map(x=>x.destination+' '+mny(x.priceValue)).join(' · ')+'.','Prices show in your currency (7% exchange margin included). Longer stays, groups and transport are quoted within 24 / 72 h max.',{act:[{b:'book',l:'Ask for a quote'}]}]},
sej:()=>['Yes, we organise stays of 3 days, 1, 2 or 3 weeks, or tailor-made: tours, accommodation and transport from one team.','You can even pick the tours to include yourself.',{act:[{h:'#sejours',l:'See the stays'},{b:'book',kind:'sejour',l:'Book a stay'}]}],
trn:()=>['We offer airport pick-up in Cotonou, transfers between cities, a car with driver by the day and group transport.',{act:[{h:'#partenaires',l:'See transport'},{b:'book',kind:'transport',l:'Book transport'}]}],
hot:()=>['We work with partner hotels, restaurants and guesthouses you can book together with your tour. Own a place? You can join the network for free.',{act:[{h:'#partenaires',l:'See partners'},{j:1,l:'Become a partner'}]}],
book:()=>['Gladly! Booking takes a few steps, and you can share your location so we find you easily.',{act:[{b:'book',l:'Book now'}]}],
pay:()=>['You choose how to pay: Mobile Money, card, bank transfer or at the agency, depending on the offer. Details are confirmed with your quote.'],
vod:()=>{const d=Math.max(0,Math.ceil((new Date('2027-01-02T00:00:00+01:00')-Date.now())/864e5));return ['Vodun Days take place in Ouidah from 2 to 9 January 2027'+(d>0?': '+d+' days to go.':'.'),'We arrange your guide, transport and stay.',{act:[{h:'#agenda',l:'See the packages'},{b:'book',kind:'sejour',id:'s7',l:'Book my place'}]}]},
contact:()=>['Reach us at +229 01 61 95 68 04 (English) or +229 01 97 16 56 46 (French), by WhatsApp or phone, and by e-mail at afatours23@gmail.com.',{act:[{wa:1,l:'WhatsApp'}]}],
eng:()=>['Yes, we work in English. Our English-speaking line is +229 01 61 95 68 04.',{act:[{wa:1,l:'WhatsApp'}]}],
human:()=>['Of course. A team member will answer you on WhatsApp, with your last message attached.',{act:[{wa:1,l:'Talk to the team'}]}],
cancel:()=>['Cancellation and change conditions are confirmed with your quote, depending on what you book. For a specific case, the team replies within 24 / 72 h max.',{act:[{wa:1,l:'Write to the team'}]}],
loc:()=>['Use the 📍 button below to share your location, handy for pick-ups.'],
thanks:()=>['You are welcome! Ask anything else 🙂'],
dflt:()=>['Thanks for your message. I did not quite get it, but I can help with tours, prices, stays, transport, hotels and booking. For a specific case, the team answers on WhatsApp.',{act:[{wa:1,l:'Talk to the team'}]}]}};
const RX=[['human',/\b(humain|equipe|conseiller|quelqu un|une personne|agent|parler a|human|team|person|speak to|talk to)\b/],['thanks',/\b(merci|thanks|thank you|super|parfait|ok merci|great)\b/],['cancel',/(annul|rembours|cancel|refund|modifier ma|change my)/],['pay',/(paie|payer|paiement|momo|mobile money|carte|virement|acompte|pay|card|deposit)/],['vod',/(vodun|vaudou|voodoo|festival|ouidah.*janvier|10 janvier|janvier|january)/],['price',/(prix|tarif|combien|cout|budget|price|cost|how much|fee)/],['sej',/(sejour|semaine|jours|week|stay|longer|nuit)/],['trn',/(transport|aeroport|airport|chauffeur|driver|taxi|voiture|car |navette|transfer)/],['hot',/(hotel|hebergement|dormir|loger|resto|restaurant|manger|partenaire|partner|guesthouse|accommodation|eat)/],['circ',/(circuit|visite|visiter|destination|tour|excursion|ganvie|abomey|pendjari|ouidah|porto|adjarra|safari)/],['loc',/(position|localisation|ou etes|where are you|location|adresse)/],['book',/(reserv|book|inscri|je veux venir|i want to come)/],['contact',/(contact|appel|telephone|numero|whatsapp|mail|joindre|phone|number)/],['eng',/(english|anglais|anglophone)/],['greet',/^(bonjour|salut|bonsoir|hello|hi|hey|coucou|salam|good (morning|evening|afternoon))/]];
function intent(m){const s=norm(m).replace(/[^a-z0-9 ]/g,' ');for(const [k,r] of RX)if(r.test(s))return k;return 'dflt'}
const looksEN=m=>{const s=' '+norm(m)+' ';return /\b(the|and|how|what|price|hello|hi|book|tour|where|please|can you|do you|want|need)\b/.test(s)&&!/\b(le|la|les|vous|je|bonjour|est|des|une|prix|combien)\b/.test(s)};
/* ---- rendu ---- */
const box=document.createElement('div');
box.innerHTML='<button class="cwl" id="cwl" aria-label="Discuter avec AFA Tours">'+ICON.chat+'<span id="cwlt"></span><span class="dot" id="cwd">1</span></button><section class="cw" id="cw" role="dialog" aria-label="Discussion avec AFA Tours"><div class="hd2"><button class="ib" id="cwx" aria-label="Fermer">'+ICON.x+'</button><img src="afa-tours-logo.jpg" alt="" width="40" height="40"><div class="nm"><b id="cwn"></b><small id="cws"></small></div><button class="ib" id="cwm" aria-label="Menu">'+ICON.more+'</button></div><div class="menu" id="cwmenu"></div><div class="msgs" id="cwm2" aria-live="polite"></div><div class="qr" id="cwq"></div><div class="emo" id="cwe"></div><div class="cbar"><div class="box"><button class="ib" id="cwemo" aria-label="Emoji">'+ICON.emo+'</button><textarea id="cwt" rows="1" aria-label="Message"></textarea><button class="ib" id="cwf" aria-label="Photo">'+ICON.clip+'</button><button class="ib" id="cwp" aria-label="Position">'+ICON.pin+'</button></div><button class="snd" id="cws2" aria-label="Envoyer">'+SEND+'</button></div><input type="file" id="cwfi" accept="image/*" hidden></section>';
document.body.appendChild(box);
const P=$('#cw'),M=$('#cwm2');
function lab(){const x=t();$('#cwn').textContent=x.name;$('#cws').textContent=typing?x.typing:x.st;$('#cwt').placeholder=x.ph;$('#cwlt').textContent=x.launch;$('#cwmenu').innerHTML='<button data-a="clear">'+x.menu.clear+'</button><a href="'+wa()+'" target="_blank" rel="noopener">'+x.menu.wa+'</a><a href="tel:+'+num()+'">'+x.menu.call+'</a>';$('#cwq').innerHTML=x.qr.map(q=>'<button>'+q+'</button>').join('')}
let typing=false;
function bubble(m){const mine=m.w==='out';const tm='<span class="t">'+hm(m.at)+(mine?TK.replace('RD',m.rd?'rd':''):'')+'</span>';let h='';
if(m.k==='img')h='<img src="'+m.x+'" alt="Photo">';else if(m.k==='pos')h='<p><a href="'+esc(m.x)+'" target="_blank" rel="noopener">'+t().sentpos+'</a></p>';else{h=(m.p||[m.x]).map(p=>'<p>'+esc(p).replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>')+'</p>').join('')}
if(m.act)h+='<div class="act">'+m.act.map(a=>a.wa?'<a class="wa" href="'+wa()+'" target="_blank" rel="noopener">'+a.l+'</a>':a.h?'<a href="'+a.h+'" data-cl>'+a.l+'</a>':'<button data-bk="'+(a.kind||'circuit')+'" data-id="'+(a.id||'')+'" '+(a.j?'data-j':'')+'>'+a.l+'</button>').join('')+'</div>';
return '<div class="b '+(mine?'out':'in')+'">'+h+tm+'</div>'}
function draw(){let h='<div class="day">'+t().today+'</div><div class="sys">'+esc(t().intro)+'</div>';H.forEach(m=>{h+=m.k==='sys'?'<div class="sys">'+esc(m.x)+'</div>':bubble(m)});M.innerHTML=h+(typing?'<div class="typ"><i></i><i></i><i></i></div>':'');M.scrollTop=M.scrollHeight;lab()}
function push(m){m.at=Date.now();H.push(m);sv();draw()}

function smart(txt,en){const s=' '+norm(txt).replace(/[^a-z0-9 ]/g,' ')+' ';const T=window.TRIPS||[];const m=window.money||(n=>n+' FCFA');
const num=(s.match(/\b(\d{1,3})\s*(personnes?|pers|adultes?|people|persons|travell?ers|voyageurs|pax)\b/)||[])[1];
const hit=T.filter(x=>{const d=norm(x.destination).split(/[ \-]/).filter(w=>w.length>3);const t=norm(x.title).split(/[ \-]/).filter(w=>w.length>4);return d.some(w=>s.includes(' '+w))||t.some(w=>s.includes(' '+w))});
const ask=/prix|tarif|cout|combien|price|cost|how much/.test(s);
if(hit.length&&hit.length<=3){const o=[];hit.forEach(x=>{let l=x.destination+' — '+x.title+' : '+x.description.split('. ')[0]+'.';if(x.priceValue){l+=en?' Price: '+m(x.priceValue)+' per person':' Prix : '+m(x.priceValue)+' par personne';if(num)l+=' → '+m(x.priceValue*num)+(en?' for ':' pour ')+num;l+='.'}else l+=en?' Price on request.':' Prix sur devis.';o.push(l)});o.push({act:[{l:en?'Compose my stay':'Composer mon séjour',kind:'plan'}]});o.push(en?'You can add it to your own stay with “Composer mon séjour”, or I can pass you to the team.':'Vous pouvez l’ajouter à votre séjour avec « Composer mon séjour », ou je vous mets en relation avec l’équipe.');return o}
if(/meilleure saison|quand partir|quelle periode|best time|when to (go|visit)|saison/.test(s))return[en?'The dry seasons are the easiest: November to March and a shorter window in July–August. Vodun Days (Ouidah) are on 2–9 January 2027.':'Les saisons sèches sont les plus agréables : de novembre à mars, et une courte période en juillet-août. Les Vodun Days (Ouidah) ont lieu du 2 au 9 janvier 2027.'];
if(/visa|passeport|passport|entree|entry/.test(s))return[en?'Most visitors need a visa or e-visa for Benin. Check the official site before travelling; we can help you prepare your documents.':'La plupart des visiteurs ont besoin d’un visa ou e-visa pour le Bénin. Vérifiez le site officiel avant de partir ; nous pouvons vous aider à préparer vos documents.'];
if(/monnaie|devise|franc|euro|dollar|currency|cfa/.test(s)&&!ask)return[en?'Prices are in FCFA. The site converts to your currency (with a 7% margin) using the selector at the top.':'Les prix sont en FCFA. Le site convertit dans votre devise (marge de 7 %) avec le sélecteur en haut de page.'];
if(/sante|vaccin|fievre|health|vaccine|malaria|paludisme/.test(s))return[en?'A yellow-fever vaccination certificate is usually required, and malaria prevention is advised. Please check with your doctor before travelling.':'Le certificat de vaccination contre la fièvre jaune est généralement exigé et une prévention du paludisme est conseillée. Parlez-en à votre médecin avant de partir.'];
if(/securite|danger|safe|security/.test(s))return[en?'The areas we visit are well known to our local guides, who stay with you the whole time. Ask us for advice before booking.':'Les zones que nous visitons sont bien connues de nos guides locaux, qui restent avec vous tout au long. Demandez-nous conseil avant de réserver.'];
if(/sejour|semaine|jours|organiser|composer|plan my|itinerar|stay/.test(s)&&/composer|organiser|construire|moi meme|build|plan my|itinerar|choisir/.test(s))return[en?'You can build your whole stay yourself: pick circuits, hotels and transport day by day, and the price is calculated for you.':'Vous pouvez construire tout votre séjour vous-même : circuits, hôtels et transport jour par jour, avec le prix calculé automatiquement.',{act:[{l:en?'Compose my stay':'Composer mon séjour',kind:'plan'}]}];
if(ask&&num&&!hit.length)return[(en?'Prices per person: ':'Prix par personne : ')+T.filter(x=>x.priceValue).slice(0,6).map(x=>x.destination+' '+m(x.priceValue)+' (×'+num+' = '+m(x.priceValue*num)+')').join(' ; ')+'.'];
return null}
function reply(txt){const k=intent(txt),en=L()==='en'||looksEN(txt);const kb=smart(txt,en)||KB[en?'en':'fr'][k]();const parts=kb.filter(x=>typeof x==='string'),act=(kb.find(x=>x.act)||{}).act;
const last=H.filter(m=>m.w==='out').pop();if(last)last.rd=1;typing=true;draw();
const delay=Math.min(2400,700+parts.join('').length*9);
setTimeout(()=>{typing=false;const cu=window.AFA_CHAT_URL;
const fin=(p,a)=>{push({w:'in',p:p,x:p.join(' '),act:a});busy=false};
if(cu){fetch(cu,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({lang:en?'en':'fr',messages:H.filter(m=>m.k!=='sys'&&m.x).slice(-12).map(m=>({role:m.w==='out'?'user':'assistant',content:m.x}))})}).then(r=>r.json()).then(j=>j.reply?fin(String(j.reply).split(/\n\n+/),j.handoff?[{wa:1,l:t().wabtn}]:undefined):fin(parts,act)).catch(()=>fin(parts,act))}else fin(parts,act)},delay)}
function send(x,kind){x=(x||'').trim();if(!x||busy)return;busy=true;push({w:'out',x:x,k:kind});reply(x)}
/* ---- événements ---- */
function open(){P.classList.add('on');$$('[data-chat]').forEach(x=>x.classList.remove('has'));if(!H.length){setTimeout(()=>push({w:'in',x:t().hello,p:[t().hello]}),300)}draw();setTimeout(()=>$('#cwt').focus({preventScroll:true}),350);try{history.replaceState(null,'',location.href)}catch(e){}}
function close(){P.classList.remove('on');$('#cwmenu').classList.remove('on');$('#cwe').classList.remove('on')}
$('#cwl').onclick=open;$('#cwx').onclick=close;$('#cws2').onclick=()=>{const v=$('#cwt').value;$('#cwt').value='';$('#cwt').style.height='';send(v)};
$('#cwt').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!/Mobi|Android|iPhone/i.test(navigator.userAgent)){e.preventDefault();$('#cws2').click()}});
$('#cwt').addEventListener('input',e=>{e.target.style.height='auto';e.target.style.height=Math.min(110,e.target.scrollHeight)+'px'});
$('#cwq').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const i=$$('#cwq button').indexOf(b),map=['circuits','séjours','transport','vodun days','réserver','équipe'];send(L()==='en'?['tours','longer stays','transport','vodun days','book','talk to the team'][i]:map[i])});
$('#cwm').onclick=()=>$('#cwmenu').classList.toggle('on');
$('#cwmenu').addEventListener('click',e=>{const b=e.target.closest('[data-a="clear"]');if(b){H=[];sv();$('#cwmenu').classList.remove('on');open()}else $('#cwmenu').classList.remove('on')});
$('#cwe').innerHTML=EM.map(x=>'<button type="button">'+x+'</button>').join('');$('#cwemo').onclick=()=>$('#cwe').classList.toggle('on');
$('#cwe').addEventListener('click',e=>{const b=e.target.closest('button');if(b){const t=$('#cwt');t.value+=b.textContent;t.focus()}});
$('#cwf').onclick=()=>$('#cwfi').click();
$('#cwfi').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas'),k=Math.min(1,640/im.width);c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);push({w:'out',k:'img',x:c.toDataURL('image/jpeg',.7)});setTimeout(()=>push({w:'in',k:'sys',x:t().photoNote}),600)};im.src=r.result};r.readAsDataURL(f);e.target.value=''};
$('#cwp').onclick=()=>{if(!navigator.geolocation){send(L()==='en'?'I cannot share my location from this device':'Je ne peux pas partager ma position depuis cet appareil');return}navigator.geolocation.getCurrentPosition(p=>{push({w:'out',k:'pos',x:'https://www.google.com/maps?q='+p.coords.latitude.toFixed(6)+','+p.coords.longitude.toFixed(6)});setTimeout(()=>push({w:'in',x:L()==='en'?'Thank you, I noted your location. The team will use it for pick-ups.':'Merci, j’ai noté votre position. L’équipe s’en servira pour la prise en charge.',p:[L()==='en'?'Thank you, I noted your location. The team will use it for pick-ups.':'Merci, j’ai noté votre position. L’équipe s’en servira pour la prise en charge.'],act:[{b:1,l:t().bookbtn}]}),700)},()=>send(L()==='en'?'I could not get my location':'Je n’ai pas pu envoyer ma position'),{timeout:10000})};
M.addEventListener('click',e=>{const a=e.target.closest('a[data-cl]');if(a){e.preventDefault();close();const el=document.querySelector(a.getAttribute('href'));el&&el.scrollIntoView({behavior:'smooth'});return}const b=e.target.closest('button[data-bk]');if(b){if(b.hasAttribute('data-j')){close();document.querySelector('[data-join]').click();return}close();window.openBook&&window.openBook(b.dataset.bk,b.dataset.id||undefined)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&P.classList.contains('on'))close()});
if(typeof applyLang==='function'){const o=applyLang;applyLang=function(){o.apply(this,arguments);lab();if(P.classList.contains('on'))draw()}}
lab();
/* petite invitation discrète : pastille sur le bouton après 40 s, sans popup */

document.addEventListener('click',e=>{if(e.target.closest('[data-chat]')){e.preventDefault();open()}});
})();

/* ===== intégration chat + avis dans les boutons flottants ===== */
(function(){const ICON=window.__ICON||{chat:''};
const mini=document.querySelector('.fabs .mini');
if(mini){const b=document.createElement('button');b.type='button';b.className='mb mc';b.setAttribute('data-chat','');b.setAttribute('aria-label','Discuter avec nous');b.title='Discuter';b.innerHTML=ICON.chat;mini.insertBefore(b,mini.firstChild);
const a=document.createElement('a');a.className='mb mr';a.href='#avis';a.setAttribute('data-rvgo','');a.setAttribute('aria-label','Laisser un avis');a.title='Laisser un avis';a.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z"/></svg>';mini.appendChild(a)}
const mb=document.querySelector('.mbar');
if(mb){const w=mb.querySelector('#mwa');const c=document.createElement('button');c.type='button';c.className='rb rch';c.setAttribute('data-chat','');c.setAttribute('aria-label','Discuter avec nous');c.innerHTML=ICON.chat;mb.insertBefore(c,w);}
setTimeout(()=>{let hl=0;try{hl=(JSON.parse(localStorage.getItem('afa_chat_v1'))||[]).length}catch(e){}if(!document.querySelector('#cw.on')&&!hl)document.querySelectorAll('[data-chat]').forEach(x=>x.classList.add('has'))},40000);
/* bandeau avis, visible dès l'arrivée */
const tr=document.querySelector('.trust');
if(tr&&!document.querySelector('.rvs')){const sec=document.createElement('section');sec.className='rvs';sec.setAttribute('aria-label','Votre avis');
sec.innerHTML='<div class="wrap"><div class="l"><div class="stars2" role="group" aria-label="Noter AFA Tours">'+[1,2,3,4,5].map(n=>'<button type="button" data-rate="'+n+'" aria-label="'+n+' étoile'+(n>1?'s':'')+'">★</button>').join('')+'</div><div><b>Vous avez voyagé avec nous ? Votre avis compte.</b><small>Notez en un clic, écrivez en 30 secondes : cela aide d’autres voyageurs.</small></div></div><a class="btn btn-red" href="#avis" data-rvgo>Laisser un avis</a></div>';
tr.insertAdjacentElement('afterend',sec)}
function goReview(n){const f=document.querySelector('#rvf'),sect=document.querySelector('#avis');if(!sect)return;if(window.__pg&&window.__pg.reveal)window.__pg.reveal(sect);if(n&&f){const r=f.querySelector('input[name=r][value="'+n+'"]');if(r){r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}));r.dispatchEvent(new Event('click',{bubbles:true}))}}
const y=(f||sect).getBoundingClientRect().top+scrollY-90;scrollTo({top:y,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});setTimeout(()=>{const t=f&&f.querySelector('textarea');t&&t.focus({preventScroll:true})},700)}
(function(){const go=()=>{const m=/^#donner-avis(?:-([1-5]))?$/.exec(location.hash);if(m)setTimeout(()=>goReview(+(m[1]||0)),700)};go();addEventListener('hashchange',go)})();
document.addEventListener('click',e=>{const s=e.target.closest('[data-rate]');if(s){e.preventDefault();goReview(+s.dataset.rate);return}const g=e.target.closest('[data-rvgo]');if(g){e.preventDefault();goReview(0)}});
})();
`;
module.exports={css,js};
