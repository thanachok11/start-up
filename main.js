/* ─────────────────────────────────────────
   main.js — AI Growth Assistant
   ───────────────────────────────────────── */

'use strict';

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initScrollReveal();
  initNavScroll();
  initSmoothScroll();
  initMobileMenu();
  initPricingButtons();
});

/* ─────────────────────────────────────────
   LANGUAGE TOGGLE
   ───────────────────────────────────────── */
function initLang() {
  const buttons = document.querySelectorAll('.lang-switch button');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLang(lang);
    });
  });
}

function setLang(lang) {
  const buttons  = document.querySelectorAll('.lang-switch button');
  const thEls    = document.querySelectorAll('.th');
  const enEls    = document.querySelectorAll('.en');

  /* update active button */
  buttons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));

  if (lang === 'en') {
    document.body.classList.add('en-mode');
    thEls.forEach(el => (el.style.display = 'none'));
    enEls.forEach(el => {
      el.style.display = el.tagName === 'SPAN' ? 'inline' : 'block';
    });
  } else {
    document.body.classList.remove('en-mode');
    enEls.forEach(el => (el.style.display = 'none'));
    thEls.forEach(el => {
      el.style.display = el.tagName === 'SPAN' ? 'inline' : 'block';
    });
  }

  /* persist preference */
  localStorage.setItem('lang', lang);
}

/* restore saved language */
(function restoreLang() {
  const saved = localStorage.getItem('lang');
  if (saved && saved !== 'th') setLang(saved);
})();

/* ─────────────────────────────────────────
   SCROLL REVEAL
   ───────────────────────────────────────── */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* fire only once */
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  items.forEach(el => observer.observe(el));

  /* hero elements reveal on load immediately */
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach(el =>
      el.classList.add('visible')
    );
  }, 100);
}

/* ─────────────────────────────────────────
   NAV SCROLL EFFECT
   ───────────────────────────────────────── */
function initNavScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const toggle = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle(); /* run on load */
}

/* ─────────────────────────────────────────
   SMOOTH SCROLL FOR ANCHOR LINKS
   ───────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href   = link.getAttribute('href');
      const target = document.querySelector(href);

      if (!target) return;

      e.preventDefault();

      const headerH = document.getElementById('site-header')?.offsetHeight || 64;
      const top     = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: 'smooth' });

      /* close mobile menu if open */
      closeMobileMenu();
    });
  });
}

/* ─────────────────────────────────────────
   MOBILE MENU
   ───────────────────────────────────────── */
let menuOpen = false;

function initMobileMenu() {
  const btn     = document.getElementById('mobileMenuBtn');
  const links   = document.querySelector('.nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    menuOpen ? closeMobileMenu() : openMobileMenu();
  });

  /* close on outside click */
  document.addEventListener('click', e => {
    if (menuOpen && !e.target.closest('.nav-inner')) {
      closeMobileMenu();
    }
  });
}

function openMobileMenu() {
  const links = document.querySelector('.nav-links');
  const btn   = document.getElementById('mobileMenuBtn');
  if (!links) return;

  links.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    padding: 12px 20px 20px;
    box-shadow: 0 8px 24px rgba(0,0,0,.08);
    z-index: 199;
  `;

  /* show all nav links on mobile */
  links.querySelectorAll('a').forEach(a => (a.style.display = ''));

  btn.querySelector('i').className = 'fa-solid fa-xmark';
  menuOpen = true;
}

function closeMobileMenu() {
  const links = document.querySelector('.nav-links');
  const btn   = document.getElementById('mobileMenuBtn');
  if (!links) return;

  links.style.cssText = '';
  if (btn) btn.querySelector('i').className = 'fa-solid fa-bars';
  menuOpen = false;
}

/* ─────────────────────────────────────────
   PRICING BUTTONS → SCROLL TO CTA
   ───────────────────────────────────────── */
function initPricingButtons() {
  const ids = ['proCtaBtn', 'proCtaBtnEn'];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('click', () => {
      const cta = document.getElementById('cta');
      if (!cta) return;

      const headerH = document.getElementById('site-header')?.offsetHeight || 64;
      const top     = cta.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}