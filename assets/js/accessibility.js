document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('navigation');
  if (!menu || !nav) return;
  const update = () => {
    const open = nav.classList.contains('opened');
    menu.setAttribute('aria-expanded', String(open));
    nav.inert = window.innerWidth < 1200 && !open;
  };
  new MutationObserver(update).observe(nav, {attributes: true, attributeFilter: ['class']});
  window.addEventListener('resize', update);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('opened')) {
      nav.classList.remove('opened');
      menu.querySelector('.nav-icon').classList.remove('open');
      menu.focus();
    }
  });
  update();
});
