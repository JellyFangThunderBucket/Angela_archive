(()=>{
  const press=document.getElementById('pressModal');
  const classified=document.getElementById('classifiedModal');
  const open=(el)=>{el.classList.add('open');el.setAttribute('aria-hidden','false')};
  const close=(el)=>{el.classList.remove('open');el.setAttribute('aria-hidden','true')};
  document.getElementById('doNotPress').addEventListener('click',()=>open(press));
  document.getElementById('classifiedBtn').addEventListener('click',()=>open(classified));
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>close(document.getElementById(b.dataset.close))));
  [press,classified].forEach(m=>m.addEventListener('click',e=>{if(e.target===m)close(m)}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){close(press);close(classified)}});
  const form=document.getElementById('codeForm'), input=document.getElementById('codeInput'), gate=document.getElementById('codeGate'), content=document.getElementById('classifiedContent'), err=document.getElementById('codeError');
  form.addEventListener('submit',e=>{e.preventDefault();if(input.value.trim()==='211'){gate.hidden=true;content.hidden=false;err.textContent=''}else{err.textContent='ACCESS DENIED.';input.select()}});
})();