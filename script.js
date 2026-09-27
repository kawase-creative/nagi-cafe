(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nav = document.querySelector('#navigation');
  const toggle = document.querySelector('.menu-toggle');
  const content = [document.querySelector('main'), document.querySelector('footer')];
  let savedScroll = 0;
  function setMenu(open, returnFocus = true) {
    if (open) savedScroll = window.scrollY;
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    nav.inert = !open;
    content.forEach(el => el.inert = open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) nav.querySelector('a').focus({preventScroll: true});
    else if (returnFocus) toggle.focus({preventScroll: true});
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    setMenu(false, false);
    target.scrollIntoView({behavior: reduce.matches ? 'instant' : 'smooth'});
    target.setAttribute('tabindex', '-1');
    target.focus({preventScroll:true});
  }));
  document.querySelector('.logo').addEventListener('click', () => {if (document.body.classList.contains('menu-open')) setMenu(false);});
  document.addEventListener('keydown', e => {
    if (!document.body.classList.contains('menu-open')) return;
    if (e.key === 'Escape') setMenu(false);
    if (e.key === 'Tab') {
      const focusable = [document.querySelector('.logo'), toggle, ...nav.querySelectorAll('a')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {e.preventDefault(); last.focus();}
      else if (!e.shiftKey && document.activeElement === last) {e.preventDefault(); first.focus();}
    }
  });
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {entry.target.classList.add('visible'); observer.unobserve(entry.target);}
      });
    }, {threshold: 0.08, rootMargin: '0px 0px -20px 0px'});
    document.querySelectorAll('.reveal,[data-reveal]').forEach(el => observer.observe(el));
  }
  const photos = [...document.querySelectorAll('[data-parallax]')];
  let scheduled = false;
  function paint() {
    scheduled = false;
    if (reduce.matches) {photos.forEach(el => el.style.transform = ''); return;}
    photos.forEach(el => {
      const rect = el.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const progress = (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight;
      const shift = Math.max(-1, Math.min(1, progress)) * Number(el.dataset.parallax);
      el.style.transform = `translate3d(0,${shift.toFixed(2)}px,0)`;
    });
  }
  function schedule() {if (!scheduled) {scheduled = true; requestAnimationFrame(paint);}}
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule, {passive:true});
  reduce.addEventListener('change', schedule);
  paint();
})();
