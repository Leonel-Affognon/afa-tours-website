(function(){
  var header=document.querySelector('.site-header'),btn=document.getElementById('menuButton'),panel=document.getElementById('navPanel');
  function solid(){header.classList.toggle('is-solid',window.scrollY>24)}
  solid();window.addEventListener('scroll',solid,{passive:true});
  function setMenu(open){panel.classList.toggle('is-open',open);header.classList.toggle('menu-open',open);btn.setAttribute('aria-expanded',String(open));btn.querySelector('span').textContent=open?'Fermer':'Menu'}
  btn.addEventListener('click',function(){setMenu(!panel.classList.contains('is-open'))});
  panel.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
  document.querySelectorAll('[data-tour]').forEach(function(a){
    a.addEventListener('click',function(){
      var sel=document.getElementById('tourSelect'),type=document.getElementById('bookingType');
      if(!sel)return;var id=a.getAttribute('data-tour');
      for(var i=0;i<sel.options.length;i++){if(sel.options[i].value===id||sel.options[i].textContent.trim()===a.getAttribute('data-title')){sel.selectedIndex=i;break}}
      if(type){type.value=type.options[0].value;type.dispatchEvent(new Event('change'))}
    });
  });
})();
