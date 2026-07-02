const weddingDate = new Date('2026-09-17T10:30:00');
const $ = (s) => document.querySelector(s);

function updateCountdown(){
  const distance = weddingDate - new Date();
  if(distance <= 0){
    $('#countdown').innerHTML = '<div>È il nostro grande giorno ❤️</div>';
    return;
  }
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance / 3600000) % 24);
  const minutes = Math.floor((distance / 60000) % 60);
  const seconds = Math.floor((distance / 1000) % 60);
  $('#days').textContent = days;
  $('#hours').textContent = String(hours).padStart(2,'0');
  $('#minutes').textContent = String(minutes).padStart(2,'0');
  $('#seconds').textContent = String(seconds).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

window.addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('hidden'),800));
window.addEventListener('scroll',()=>$('#navbar').classList.toggle('scrolled',window.scrollY>40));

$('#menuBtn').addEventListener('click',()=>$('#navLinks').classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('#navLinks').classList.remove('open')));

$('#copyIban').addEventListener('click', async ()=>{
  const iban = $('#iban').textContent.trim();
  try{ await navigator.clipboard.writeText(iban); }
  catch{
    const t=document.createElement('textarea'); t.value=iban; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
  }
  $('#copyMessage').classList.add('show');
  setTimeout(()=>$('#copyMessage').classList.remove('show'),2500);
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
