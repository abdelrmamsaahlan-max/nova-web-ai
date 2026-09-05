/* Nova Web AI — stable hover interactions only. */
(()=>{
  const cards=document.querySelectorAll('.service-card,.project,.price-card');
  cards.forEach(card=>{
    card.addEventListener('pointermove',()=>{}, {passive:true});
  });
})();
