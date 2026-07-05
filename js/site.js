(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();

  ready(() => {
    const menu = document.querySelector('.menu');
    const nav = document.querySelector('.gnav');
    if (menu && nav) {
      const setOpen = (open) => {
        menu.setAttribute('aria-expanded', String(open));
        nav.classList.toggle('is-open', open);
        document.body.classList.toggle('no-scroll', open);
      };
      menu.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') !== 'true'));
      nav.addEventListener('click', (event) => {
        if (event.target.closest('a')) setOpen(false);
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setOpen(false);
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        const target = href === '#' ? document.documentElement : document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      });
    });

    const intro = document.querySelector('.anime');
    const main = document.querySelector('.mainSite');
    const skip = document.querySelector('.skip-intro');
    if (intro && main) {
      const hideIntro = () => {
        intro.classList.add('is-hidden');
        main.classList.remove('is-loading');
        sessionStorage.setItem('intro-seen', 'true');
      };
      skip?.addEventListener('click', hideIntro);
      if (sessionStorage.getItem('intro-seen') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        hideIntro();
      } else {
        window.setTimeout(hideIntro, 1200);
      }
    }
  });
})();
