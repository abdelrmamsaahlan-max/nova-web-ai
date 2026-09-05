/* Nova Web AI — stable core interactions */
const legacyPricing=document.querySelector('#pricing .pricing-grid');
if(legacyPricing){legacyPricing.innerHTML='';legacyPricing.id='pricing-catalog';}
const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
const progress=document.querySelector('.progress');
window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',scrollY>12);const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=`${max>0?scrollY/max*100:0}%`},{passive:true});
menu?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu')});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('visible');el.style.opacity='1';el.style.visibility='visible';el.style.transform='none';el.style.animation='none'});
const form=document.getElementById('contactForm');const status=document.querySelector('.form-status');form?.addEventListener('submit',e=>{const data=new FormData(form);const name=(data.get('name')||'there').toString().trim();if(status)status.textContent=`Thanks, ${name||'there'} — your project request is being sent to Nova.`});
document.querySelectorAll('.faq-list details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==d)other.open=false})}));
const commerce=document.createElement('script');commerce.src='commerce.js';document.head.appendChild(commerce);
