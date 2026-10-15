/**
 * PORTAFOLIO PERSONAL – Marlon David Palacios Parra
 * main.js – Interactividad principal
 *
 * Módulos:
 *  1. Navbar: scroll transparente → sólido + toggle móvil
 *  2. Active nav link según sección visible (IntersectionObserver)
 *  3. Toggle de tema claro / oscuro (persiste en localStorage)
 *  4. Filtros de habilidades con animación suave
 *  5. Animaciones de entrada (fade-up) al hacer scroll
 *  6. Formulario de contacto con validación básica
 *  7. Cerrar menú al hacer clic en un enlace (móvil)
 */

'use strict';

/* ─── Helpers ─────────────────────────────────────────────── */

/** Selecciona un elemento del DOM */
const $ = (selector, context = document) => context.querySelector(selector);

/** Selecciona múltiples elementos del DOM */
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

/* ─── 1. NAVBAR – scroll y toggle móvil ──────────────────── */

const initNavbar = () => {
  const navbar    = $('#navbar');
  const navToggle = $('#navToggle');
  const navMenu   = $('#navMenu');

  if (!navbar) return;

  /* Cambiar apariencia al hacer scroll */
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // ejecutar al cargar

  /* Toggle menú móvil */
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');

      /* Animación hamburguesa → X */
      const bars = $$('.hamburger', navToggle);
      if (bars.length === 3) {
        if (isOpen) {
          bars[0].style.transform = 'translateY(7px) rotate(45deg)';
          bars[1].style.opacity   = '0';
          bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
          bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
        }
      }
    });
  }
};

/* ─── 2. ACTIVE LINK según sección visible ────────────────── */

const initActiveLinks = () => {
  const sections  = $$('section[id]');
  const navLinks  = $$('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = navLinks.find(
            link => link.getAttribute('href') === `#${entry.target.id}`
          );
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
};

/* ─── 3. TOGGLE DE TEMA ───────────────────────────────────── */

const initThemeToggle = () => {
  const btn = $('#themeToggle');
  if (!btn) return;

  const STORAGE_KEY = 'portfolio-theme';

  /* Íconos PNG personalizados */
  const iconSun  = `<img src="assets/icons/01_sol.png"  width="18" height="18" alt="" aria-hidden="true" class="theme-icon" />`;
  const iconMoon = `<img src="assets/icons/02_luna.png" width="18" height="18" alt="" aria-hidden="true" class="theme-icon" />`;

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      btn.innerHTML = iconMoon;
      btn.setAttribute('aria-label', 'Cambiar a modo oscuro');
    } else {
      document.body.classList.remove('light-theme');
      btn.innerHTML = iconSun;
      btn.setAttribute('aria-label', 'Cambiar a modo claro');
    }
  };

  /* Leer preferencia guardada o del sistema */
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved ?? (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  btn.addEventListener('click', () => {
    const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
};

/* ─── 4. FILTROS DE HABILIDADES ───────────────────────────── */

const initSkillsFilter = () => {
  const filterBtns = $$('.filter-btn');
  const skillCards = $$('.skill-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Actualizar botón activo */
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      skillCards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          /* Animación de entrada suave */
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'skillAppear 0.3s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
};

/* Definir keyframe para aparición de skill cards */
const addSkillKeyframe = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes skillAppear {
      from { opacity: 0; transform: scale(0.92) translateY(6px); }
      to   { opacity: 1; transform: scale(1)    translateY(0);   }
    }
  `;
  document.head.appendChild(style);
};

/* ─── 5. ANIMACIONES FADE-UP AL SCROLL ────────────────────── */

const initFadeUp = () => {
  /* Elementos que recibirán la animación */
  const targets = [
    '.section-label',
    '.section-title',
    '.about-title',
    '.about-description',
    '.about-focuses',
    '.about-card',
    '.skill-card',
    '.project-card',
    '.hero-greeting',
    '.hero-name',
    '.hero-role',
    '.hero-description',
    '.hero-actions',
    '.hero-metrics',
    '.contact-info',
    '.contact-form-wrapper',
    '.footer-brand',
  ];

  const allTargets = $$(targets.join(', '));
  allTargets.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          /* Delay escalonado para grupos de elementos (ej. tarjetas) */
          const siblings = [...entry.target.parentElement.children]
            .filter(c => c.classList.contains(entry.target.classList[0]));
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 400);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  allTargets.forEach(el => observer.observe(el));
};

/* ─── 6. FORMULARIO DE CONTACTO – Web3Forms ──────────────── */

const initContactForm = () => {
  const form     = $('#contactForm');
  const feedback = $('#formFeedback');

  if (!form || !feedback) return;

  const showFeedback = (msg, type) => {
    feedback.textContent = msg;
    feedback.className   = `form-feedback ${type}`;
    setTimeout(() => { feedback.textContent = ''; feedback.className = 'form-feedback'; }, 5000);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = form.elements['name'].value.trim();
    const email   = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();

    /* Validación */
    if (!name || !email || !message) {
      showFeedback('Por favor, completa todos los campos.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showFeedback('Ingresa un correo electrónico válido.', 'error');
      return;
    }

    /* Estado de envío */
    const submitBtn    = form.querySelector('[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    /* Protección honeypot: si el botcheck está marcado, es un bot — cancelar silenciosamente */
    if (form.elements['botcheck'] && form.elements['botcheck'].checked) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
      return;
    }

    try {
      /* Envío real a Web3Forms */
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: form.elements['access_key'].value,
          subject:    form.elements['subject'].value,
          from_name:  form.elements['from_name'].value,
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        /* Éxito */
        showFeedback('Mensaje enviado correctamente. ¡Te responderé pronto!', 'success');
        form.reset();
      } else {
        /* La API respondió pero con error lógico */
        showFeedback('No se pudo enviar el mensaje. Inténtalo nuevamente.', 'error');
      }
    } catch {
      /* Error de red u otro fallo inesperado */
      showFeedback('No se pudo enviar el mensaje. Inténtalo nuevamente.', 'error');
    } finally {
      /* Restaurar botón siempre */
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    }
  });
};

/* ─── 7. CERRAR MENÚ MÓVIL AL HACER CLIC EN ENLACE ──────── */

const initMobileMenuClose = () => {
  const navLinks  = $$('.nav-link');
  const navMenu   = $('#navMenu');
  const navToggle = $('#navToggle');

  if (!navMenu || !navToggle) return;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú');
        const bars = $$('.hamburger', navToggle);
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });
  });
};

/* ─── 8. SMOOTH SCROLL para navegadores sin soporte nativo ── */

const initSmoothScroll = () => {
  /* CSS scroll-behavior ya lo maneja; esto es fallback */
  const links = $$('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
};

/* ─── INICIALIZACIÓN ─────────────────────────────────────── */

const init = () => {
  addSkillKeyframe();
  initNavbar();
  initActiveLinks();
  initThemeToggle();
  initSkillsFilter();
  initFadeUp();
  initContactForm();
  initMobileMenuClose();
  initSmoothScroll();
};

/* Ejecutar cuando el DOM esté listo */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
