// Blog : lecteur d'article professionnel + rendu des articles (mise en forme simple)
const css=`
dialog#bdlg{border:0;padding:0;width:min(880px,96vw);max-width:none;max-height:94dvh;border-radius:24px;overflow:auto;background:#fff;box-shadow:0 40px 110px rgba(20,5,2,.55);overscroll-behavior:contain}
dialog#bdlg::backdrop{background:rgba(30,8,4,.66);backdrop-filter:blur(5px)}
#bdlg .xc{position:sticky;top:12px;display:grid;float:none;margin:12px 12px -56px auto;z-index:12;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.95);color:#2A0C07;font-size:1.6rem;line-height:1;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.25);display:grid;place-items:center}
#bdlg .xc:hover{background:#E8832F;color:#fff}
.art-bar{position:sticky;top:0;height:4px;z-index:11;background:transparent}.art-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#E8832F,#B51D27)}
.art-hero{position:relative;min-height:clamp(240px,42vw,400px);display:flex;align-items:flex-end;color:#fff;background:#2A0C07 center/cover no-repeat}
.art-hero::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(42,12,7,.15) 0%,rgba(42,12,7,.88) 100%)}
.art-hero .in{position:relative;padding:clamp(22px,5vw,48px);max-width:760px}
.art-cat{display:inline-block;background:#E8832F;color:#2A0C07;font-weight:800;font-size:.78rem;letter-spacing:.06em;padding:.4em .9em;border-radius:99px;margin-bottom:12px}
.art-hero h1{font:600 clamp(1.8rem,5vw,3rem)/1.08 var(--d);margin:0 0 14px;text-wrap:balance}
.art-meta{display:flex;gap:6px 16px;flex-wrap:wrap;font-size:.9rem;opacity:.92}
.art-body{max-width:690px;margin:0 auto;padding:clamp(24px,5vw,46px) clamp(18px,5vw,28px) 10px;font:400 1.1rem/1.82 Georgia,'Times New Roman',serif;color:#33211b}
.art-body .lead{font-size:1.28rem;line-height:1.6;color:#5a4038;margin:0 0 1.2em;font-style:italic;border-left:4px solid #E8832F;padding-left:16px}
.art-body p{margin:0 0 1.15em}
.art-body>p.first::first-letter{float:left;font:700 3.5rem/.86 var(--d);color:#B51D27;padding:.04em .12em 0 0}
.art-body h2{font:600 1.75rem/1.2 var(--d);color:#2A0C07;margin:1.7em 0 .5em;padding-top:.5em;position:relative}
.art-body h2::before{content:"";display:block;width:46px;height:4px;border-radius:4px;background:#E8832F;margin-bottom:12px}
.art-body h3{font:600 1.3rem/1.3 var(--d);margin:1.4em 0 .4em;color:#B51D27}
.art-body a{color:#B51D27;text-underline-offset:3px}
.art-body ul{margin:0 0 1.2em;padding-left:1.2em}.art-body li{margin:.35em 0}.art-body li::marker{color:#E8832F}
.art-body figure{margin:1.8em -4%;text-align:center}.art-body figure img{width:100%;max-height:520px;object-fit:cover;border-radius:16px;display:block;box-shadow:0 14px 38px rgba(42,12,7,.18)}
.art-body figcaption{font:italic .9rem/1.4 Georgia,serif;color:#7a6358;margin-top:10px}
.art-body .fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin:1.8em -4%}.art-body .fgrid figure{margin:0}.art-body .fgrid img{height:230px}
.art-body blockquote{margin:1.9em 0;padding:22px 26px;background:#FBF6EF;border-radius:16px;border-left:5px solid #B51D27;font:italic 500 1.35rem/1.45 var(--d);color:#2A0C07}
.art-body blockquote cite{display:block;margin-top:10px;font:600 .85rem var(--b,sans-serif);font-style:normal;color:#B51D27}
.art-body .tip{margin:1.6em 0;padding:16px 18px;border-radius:14px;background:#FFF1E2;border:1px solid #f3cfa3;font:500 1rem/1.6 var(--b,sans-serif);color:#5a3410}.art-body .tip b{color:#B51D27}
.art-body hr{border:0;height:1px;background:#e8d9cc;margin:2em 0}
.art-end{max-width:690px;margin:10px auto 0;padding:0 clamp(18px,5vw,28px) 34px}
.art-cta{background:linear-gradient(120deg,#2A0C07,#5b1a10);color:#fff;border-radius:20px;padding:24px;display:flex;gap:16px;align-items:center;flex-wrap:wrap}.art-cta div{flex:1 1 220px}.art-cta b{display:block;font:600 1.3rem var(--d);margin-bottom:4px}.art-cta span{opacity:.85;font-size:.95rem}
.art-share{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:20px 0}.art-share span{font-weight:700;margin-right:4px}.art-share a,.art-share button{border:1px solid #e0d0c2;background:#fff;color:#2A0C07;border-radius:99px;padding:10px 16px;font-weight:700;font-size:.9rem;cursor:pointer;text-decoration:none;min-height:44px;display:inline-flex;align-items:center}
.art-more{display:grid;gap:10px}.art-more h4{font:600 1.15rem var(--d);margin:10px 0 0}.art-more button{display:flex;gap:12px;align-items:center;text-align:left;border:1px solid #eadfd3;background:#fff;border-radius:14px;padding:10px;cursor:pointer;font:inherit;color:#2A0C07;min-height:64px}.art-more button i{width:72px;height:56px;border-radius:10px;background:#eadfd3 center/cover;flex:0 0 auto}.art-more button b{font:600 1rem var(--d)}
.bc .bi{position:relative}.bcat{position:absolute;left:10px;top:10px;background:#E8832F;color:#2A0C07;font:800 .7rem/1 var(--b,sans-serif);letter-spacing:.05em;padding:.5em .8em;border-radius:99px}
@media(max-width:700px){dialog#bdlg{width:100vw;max-height:100dvh;height:100dvh;border-radius:0}.art-body{font-size:1.04rem}.art-body figure,.art-body .fgrid{margin-left:0;margin-right:0}.art-body blockquote{font-size:1.15rem;padding:16px 18px}}
`;
const js=`
(function(){
var E=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
function inl(t){t=E(t);return t.replace(/\\*\\*([^*]+)\\*\\*/g,'<b>$1</b>').replace(/\\*([^*\\n]+)\\*/g,'<i>$1</i>').replace(/\\[([^\\]]+)\\]\\((https?:\\/\\/[^)\\s]+)\\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')}
window.__md=function(src){var lines=String(src||'').replace(/\\r/g,'').split('\\n'),out=[],para=[],list=[],imgs=[],first=true,isLead=true;
function fp(){if(para.length){var t=inl(para.join(' '));out.push('<p'+(first?' class="first"':'')+'>'+t+'</p>');first=false;para=[]}}
function fl(){if(list.length){out.push('<ul>'+list.map(function(x){return '<li>'+inl(x)+'</li>'}).join('')+'</ul>');list=[]}}
function fi(){if(imgs.length){var f=imgs.map(function(m){return '<figure><img loading="lazy" alt="'+E(m[1])+'" src="'+E(m[2])+'">'+(m[1]?'<figcaption>'+E(m[1])+'</figcaption>':'')+'</figure>'}).join('');out.push(imgs.length>1?'<div class="fgrid">'+f+'</div>':f);imgs=[]}}
function fa(){fp();fl();fi()}
lines.forEach(function(raw){var l=raw.trim(),m;
if(!l){fa();return}
if(m=l.match(/^!\\[([^\\]]*)\\]\\((https?:\\/\\/[^)\\s]+)\\)$/)){fp();fl();imgs.push(m);return}
fi();
if(l.indexOf('## ')===0){fa();out.push('<h2>'+inl(l.slice(3))+'</h2>');return}
if(l.indexOf('### ')===0){fa();out.push('<h3>'+inl(l.slice(4))+'</h3>');return}
if(l==='---'){fa();out.push('<hr>');return}
if(l.indexOf('> ')===0){fa();var q=l.slice(2),a='',k=q.lastIndexOf(' — ');if(k>0){a=q.slice(k+3);q=q.slice(0,k)}out.push('<blockquote>'+inl(q)+(a?'<cite>— '+E(a)+'</cite>':'')+'</blockquote>');return}
if(l.indexOf('!! ')===0){fa();out.push('<div class="tip">'+inl(l.slice(3))+'</div>');return}
if(l.indexOf('>> ')===0){fa();out.push('<p class="lead">'+inl(l.slice(3))+'</p>');return}
if(/^[-•] /.test(l)){fp();list.push(l.slice(2));return}
fl();para.push(l);fp()});
fa();return out.join('')};
function cur(){return (typeof lang!=='undefined'&&lang)||'fr'}
function pk(b,k){var v=cur()==='en'&&b.en&&b.en[k]?b.en[k]:b.fr[k];return v||''}
window.__openArt=function(i){var B=window.__blog||[],b=B[i];if(!b)return;var en=cur()==='en',body=pk(b,'body'),words=body.split(/\\s+/).length,mins=Math.max(1,Math.round(words/190));
var url=location.href.split('#')[0]+'#blog',title=pk(b,'title');
var more=B.map(function(x,j){return [x,j]}).filter(function(p){return p[1]!==i}).slice(0,3);
var h='<div class="art-bar"><i></i></div><div class="art-hero"'+(b.fr.img?' style="background-image:url('+E(b.fr.img)+')"':'')+'><div class="in">'+(b.fr.cat?'<span class="art-cat">'+E(b.fr.cat)+'</span>':'')+'<h1>'+E(title)+'</h1><div class="art-meta"><span>'+E(b.fr.author||'Équipe AFA TOURS')+'</span>'+(b.fr.date?'<span>'+E(b.fr.date)+'</span>':'')+'<span>'+mins+' min '+(en?'read':'de lecture')+'</span></div></div></div>'+
'<article class="art-body">'+(pk(b,'excerpt')&&body.indexOf('>> ')<0?'<p class="lead">'+E(pk(b,'excerpt'))+'</p>':'')+window.__md(body)+'</article>'+
'<div class="art-end"><div class="art-cta"><div><b>'+(en?'Live this experience':'Vivez cette expérience')+'</b><span>'+(en?'Tell us your dates: we build the programme with you.':'Dites-nous vos dates : nous construisons le programme avec vous.')+'</span></div><button type="button" class="btn btn-or" data-book data-kind="circuit" data-art-close>'+(en?'Book a tour':'Réserver un circuit')+'</button></div>'+
'<div class="art-share"><span>'+(en?'Share':'Partager')+'</span><a target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent(title+' '+url)+'">WhatsApp</a><a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url)+'">Facebook</a><button type="button" data-copy="'+E(url)+'">'+(en?'Copy link':'Copier le lien')+'</button></div>'+
(more.length?'<div class="art-more"><h4>'+(en?'Keep reading':'À lire aussi')+'</h4>'+more.map(function(p){return '<button type="button" data-art="'+p[1]+'"><i'+(p[0].fr.img?' style="background-image:url('+E(p[0].fr.img)+')"':'')+'></i><b>'+E(pk(p[0],'title'))+'</b></button>'}).join('')+'</div>':'')+'</div>';
var d=document.getElementById('bdlg'),bd=document.getElementById('bdb');bd.innerHTML=h;if(!d.open)d.showModal();d.scrollTop=0;
var bar=bd.querySelector('.art-bar i');d.onscroll=function(){var m=d.scrollHeight-d.clientHeight;bar.style.width=(m>0?Math.min(100,d.scrollTop/m*100):0)+'%'}};
document.addEventListener('click',function(e){var a=e.target.closest('[data-art]');if(a){window.__openArt(+a.dataset.art);return}
var c=e.target.closest('[data-copy]');if(c){try{navigator.clipboard.writeText(c.dataset.copy);c.textContent=cur()==='en'?'Copied ✓':'Lien copié ✓'}catch(x){}return}
if(e.target.closest('[data-art-close]')){var d=document.getElementById('bdlg');if(d&&d.open)d.close()}});
})();

(function(){document.addEventListener('click',function(e){var d=e.target;if(!d||d.tagName!=='DIALOG'||!d.open)return;var r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()});
document.addEventListener('click',function(e){var x=e.target.closest('dialog [data-x],dialog [data-close]');if(x){var d=x.closest('dialog');if(d&&d.open)d.close()}})})();
`;
module.exports={css,js};
