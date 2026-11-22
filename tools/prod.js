// Construit le vrai index.html du site à partir de la Synthèse (p3.html)
const fs=require('fs');const ROOT='/home/claude/afa-tours-website/';
let h=fs.readFileSync('/home/claude/pro/p3.html','utf8');
const rep=(a,b)=>{if(!h.includes(a)){console.error('MANQUE',String(a).slice(0,60));process.exit(1)}h=h.split(a).join(b)};
// 1. barre de maquette
h=h.replace(/<nav class="maq-bar".*?<\/nav>/s,'');
// 2. head : titre, description, partage, polices auto-hébergées
const ff=(fam,file,style,range)=>`@font-face{font-family:"${fam}";font-style:${style};font-weight:100 900;font-display:swap;src:url(fonts/${file}) format("woff2");unicode-range:${range}}`;
const LAT='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',EXT='U+0100-02AF,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF';
const fonts=`<style>${ff('Fraunces','fraunces-latin-ext-wght-normal.woff2','normal',EXT)}${ff('Fraunces','fraunces-latin-wght-normal.woff2','normal',LAT)}${ff('Fraunces','fraunces-latin-wght-italic.woff2','italic',LAT)}${ff('Manrope','manrope-latin-ext-wght-normal.woff2','normal',EXT)}${ff('Manrope','manrope-latin-wght-normal.woff2','normal',LAT)}</style><link rel="preload" href="fonts/fraunces-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>`;
h=h.replace(/<link rel="preconnect" href="https:\/\/fonts.googleapis.com">.*?rel="stylesheet">/s,fonts);
const TITLE='AFA Tours Innovant | Circuits, séjours et transport au Bénin';
const DESC='Découvrez le Bénin avec AFA Tours Innovant : circuits guidés de Porto-Novo à la Pendjari, séjours de 3 jours à 3 semaines, transport, hôtels et restaurants partenaires. Réservez en ligne.';
h=h.replace(/<title>.*?<\/title>/,`<title>${TITLE}</title><meta name="description" content="${DESC}"><meta name="theme-color" content="#2A0C07"><link rel="icon" href="afa-tours-logo.jpg"><meta property="og:type" content="website"><meta property="og:title" content="${TITLE}"><meta property="og:description" content="${DESC}"><meta property="og:image" content="afa-tours-logo.jpg"><meta property="og:locale" content="fr_FR">`);
const ld={"@context":"https://schema.org","@type":"TravelAgency",name:"AFA Tours Innovant",alternateName:"Afrique Authentique Innovant",slogan:"Découvrir l’Afrique à travers le Bénin",telephone:["+22901971656 46".replace(' ',''),"+2290161956804"],email:"afatours24@gmail.com",areaServed:"BJ",address:{"@type":"PostalAddress",addressLocality:"Porto-Novo",addressCountry:"BJ"},logo:"afa-tours-logo.jpg"};
ld.telephone=["+2290197165646","+2290161956804"];
h=h.replace('</head>',`<script type="application/ld+json">${JSON.stringify(ld)}</script></head>`);
// 3. logo : fichier du dépôt au lieu de l'image intégrée
h=h.replace(/data:image\/jpeg;base64,[A-Za-z0-9+\/=]+/g,'afa-tours-logo.jpg');
// 4. production : pas de données d'exemple, envoi réel
h=h.replace('<script>window.TRIPS',()=>`<script>window.AFA_PROD=true;</script><script type="module">import {supabase,submitIntake} from "./backend.js";window.AFA_SUBMIT=submitIntake;(async()=>{try{const {data}=await supabase.from("reviews").select("display_name,country,rating,body,published_at").eq("status","approved").order("published_at",{ascending:false}).limit(20);window.__rv=(data||[]).map(r=>({s:Math.max(1,Math.min(5,r.rating|0)),t:r.body,n:r.display_name,o:r.country||''}));dispatchEvent(new Event("afa-rv"))}catch(e){}})()</script><script>window.TRIPS`);
// 5. textes de maquette
h=h.replace('Maquette : aucune donnée n’est envoyée.','Site officiel d’AFA Tours Innovant.').replace('Mockup: no data is sent.','Official website of AFA Tours Innovant.');
h=h.replace('<a href="#" data-i="priv">','<a href="confidentialite.html" data-i="priv">').replace('<a href="#" data-i="team">','<a href="admin.html" data-i="team">');
// 6. équipe : uniquement ce qui est réel
h=h.replace(/<article class="tm"><div class="av"[^>]*>\?<\/div>.*?<\/article>/gs,'');
h=h.replace('</div></div></section><section class="sec rvsec"',()=>'<article class="tm"><div class="av" aria-hidden="true" style="background:linear-gradient(135deg,#25D366,#128C7E)">✉</div><h3>Parlons de votre voyage</h3><p class="ro">Réponse sous 24 h</p><p>Dites-nous vos dates et vos envies : nous construisons votre programme avec vous.</p><p style="margin-top:12px"><a class="btn btn-red btn-sm" href="https://wa.me/2290197165646" target="_blank" rel="noopener">Écrire sur WhatsApp</a></p></article></div></div></section><section class="sec rvsec"');
h=h.replace('<span class="badge-ex">Fiches d’exemple en attendant vos partenaires</span>','');
fs.writeFileSync(ROOT+'index.html',h);console.log('index.html',h.length);
