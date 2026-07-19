(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();

  ready(() => {
    const isNested = location.pathname.includes('/about/');
    const root = isNested ? '../' : '';
    const menuItems = [
      ['HOME', `${root}index.html`],
      ['MUSIC作品一覧', `${root}music.html#music`],
      ['WORKS制作実績', `${root}music.html#works`],
      ['PROFILE', `${root}music.html#profile`],
      ['ABOUT ENGLISH', `${root}about/index.html`],
      ['LOG更新履歴', `${root}log.html`],
    ];
    const socials = [
      ['Twitter', 'https://twitter.com/anji_teraoka', 'twitter'],
      ['Instagram', 'https://www.instagram.com/anji_teraoka/', 'instagram'],
      ['YouTube', 'https://www.youtube.com/channel/UCvtMMAForO_xiLVogFC0wxw', 'youtube'],
      ['配信リンク', 'https://big-up.style/artists/165623/tune_packages', 'play'],
    ];
    const socialHtml = (className) => `<nav class="${className}" aria-label="SNS links"><ul>${socials.map(([label, href, icon]) => `<li><a href="${href}" target="_blank" rel="noopener noreferrer" class="sns"><span class="fa fa-${icon}" aria-hidden="true"></span><span class="sr-only">${label}</span></a></li>`).join('')}</ul></nav>`;
    const menuHtml = menuItems.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('');
    const siteBlock = (prefix) => `
      <div class="${prefix}A">
        <h2>AnjiTeraoka.COM</h2>
        <p><a href="https://anjiteraoka.com/">https://anjiteraoka.com/</a></p>
        <p class="site-summary">寺岡アンジ / Anji Teraoka：宅録、ローファイ、サイケデリックポップ、録音・ミックス・マスタリング。</p>
        ${socialHtml(`${prefix}D`)}
      </div>
      <nav class="${prefix}B" aria-label="${prefix === 'g' ? 'Global' : 'Footer'} navigation">
        <div><h3>MENU - 作品と情報</h3><ul>${menuHtml}</ul></div>
      </nav>
      <div class="${prefix}C">&#169; AnjiTeraoka.COM All rights reserved.</div>`;

    const header = document.querySelector('header');
    if (header) {
      header.innerHTML = `<button class="menu" type="button" aria-label="メニューを開閉" aria-controls="global-nav" aria-expanded="false"><span class="menu__line menu__line--top"></span><span class="menu__line menu__line--center"></span><span class="menu__line menu__line--bottom"></span></button><div class="gnav" id="global-nav"><div class="container">${siteBlock('g')}</div></div>`;
    }
    document.querySelectorAll('footer').forEach((footer) => {
      footer.innerHTML = `<div class="container">${siteBlock('foot')}</div>`;
    });

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
  });
})();
