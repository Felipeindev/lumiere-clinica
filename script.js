(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');

  // Número de WhatsApp (placeholder): troque aqui e no href do botão final
  const WHATSAPP = 'https://wa.me/5500000000000';

  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');

  // Header ao rolar
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    header.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { setMenu(false); burger.focus(); }
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', (m) => m.matches && setMenu(false));

  // Revelação ao rolar
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  // FAQ (um item aberto por vez)
  const qs = document.querySelectorAll('.faq__q');
  qs.forEach((q) => {
    q.addEventListener('click', () => {
      const open = q.getAttribute('aria-expanded') === 'true';
      qs.forEach((o) => {
        o.setAttribute('aria-expanded', 'false');
        document.getElementById(o.getAttribute('aria-controls')).classList.remove('is-open');
      });
      if (!open) {
        q.setAttribute('aria-expanded', 'true');
        document.getElementById(q.getAttribute('aria-controls')).classList.add('is-open');
      }
    });
  });

  // "Saiba mais" dos tratamentos: abre o WhatsApp com o tratamento escolhido
  document.querySelectorAll('[data-treat]').forEach((a) => {
    const msg = `Olá! Gostaria de saber mais sobre: ${a.dataset.treat}.`;
    a.href = `${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Instagram placeholder: não navega, apenas avisa
  document.querySelectorAll('[data-placeholder]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Este é um perfil de exemplo. Substitua pelo Instagram real da clínica.');
    });
  });

  // Imagem externa indisponível: mantém o layout com fundo bege
  document.querySelectorAll('img[data-img]').forEach((img) => {
    img.addEventListener('error', () => { img.style.visibility = 'hidden'; });
  });

  // Ano do rodapé
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
