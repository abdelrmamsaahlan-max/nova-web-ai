/* Nova Web AI — core interactions + clean motion */
const legacyPricing=document.querySelector('#pricing .pricing-grid');
if(legacyPricing){legacyPricing.innerHTML='';legacyPricing.id='pricing-catalog';}
const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
const progress=document.querySelector('.progress');
window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',scrollY>12);const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=`${max>0?scrollY/max*100:0}%`},{passive:true});
menu?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu')});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
const revealEls=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});revealEls.forEach(el=>observer.observe(el))}else revealEls.forEach(el=>el.classList.add('visible'));
const form=document.getElementById('contactForm');const status=document.querySelector('.form-status');
form?.addEventListener('submit',async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form).entries());const name=(data.name||'there').toString().trim();const button=form.querySelector('button[type=submit]');if(button){button.disabled=true;button.dataset.originalText=button.textContent;button.textContent='Sending…'}if(status)status.textContent='Sending your project request…';try{const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(result.error||'Unable to send');if(status)status.textContent=`Thanks, ${name||'there'} — your project request has been sent.`;form.reset();if(window.NovaCart?.clear)window.NovaCart.clear()}catch(error){console.error(error);if(status)status.textContent='Something went wrong while sending. Please try again in a moment.'}finally{if(button){button.disabled=false;button.textContent=button.dataset.originalText||'Send Project Request'}}});
document.querySelectorAll('.faq-list details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==d)other.open=false})}));
const commerce=document.createElement('script');commerce.src='commerce.js';document.head.appendChild(commerce);
