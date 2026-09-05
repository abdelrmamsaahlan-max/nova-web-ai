/* Nova Web AI — interaction layer intentionally kept stable on first paint. */
(() => {
  const cards = document.querySelectorAll('.service-card,.project,.price-card');
  cards.forEach(card => {
    card.addEventListener('pointermove', e => {
      if (matchMedia('(max-width:900px)').matches) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      card.style.transform = `perspective(1000px) rotateX(${-y*2}deg) rotateY(${x*3}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  const hero = document.querySelector('.hero-visual');
  hero?.addEventListener('pointermove', e => {
    if (matchMedia('(max-width:900px)').matches) return;
    const r = hero.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    const browser = hero.querySelector('.browser-card');
    if (browser) browser.style.transform = `perspective(1400px) rotateX(${2-y*2}deg) rotateY(${-2+x*4}deg)`;
  });
  hero?.addEventListener('pointerleave', () => {
    const browser = hero.querySelector('.browser-card');
    if (browser) browser.style.transform = '';
  });
})();
