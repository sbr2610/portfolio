// ═══════════════════════════════════════
//  DARK / LIGHT MODE TOGGLE
// ═══════════════════════════════════════
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const themeLabel  = document.getElementById('themeLabel');
const html        = document.documentElement;

// Lire la préférence sauvegardée (ou détecter le système)
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initTheme = saved || (prefersDark ? 'dark' : 'light');
applyTheme(initTheme);

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    themeIcon.textContent  = '🌙';
    themeLabel.textContent = 'Sombre';
  } else {
    themeIcon.textContent  = '☀️';
    themeLabel.textContent = 'Clair';
  }
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ═══════════════════════════════════════
//  SIDEBAR MOBILE
// ═══════════════════════════════════════
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const overlay = document.getElementById('mobileOverlay');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
});
document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
});

// ═══════════════════════════════════════
//  ACTIVE NAV ITEM ON SCROLL
// ═══════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item[data-section]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.section === id);
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => navObserver.observe(s));

// ═══════════════════════════════════════
//  SCROLL REVEAL
// ═══════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

const revealTargets = [
  '.tl-card', '.certif-card', '.situ-card', '.veille-card',
  '.hstat', '.soft-card', '.mission-item', '.contact-card',
  '.epreuve-def', '.tech-logo'
];
document.querySelectorAll(revealTargets.join(',')).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ═══════════════════════════════════════
//  SKILL BARS ANIMATION
// ═══════════════════════════════════════
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
        const target = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = target; }, i * 80);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const compSection = document.getElementById('competences');
if (compSection) skillObserver.observe(compSection);

// ═══════════════════════════════════════
//  SMOOTH SCROLL
// ═══════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ═══════════════════════════════════════
//  CARROUSEL — pause au survol (déjà géré en CSS)
//  + fix : duplique les items si pas assez larges
// ═══════════════════════════════════════
window.addEventListener('load', () => {
  const carousel = document.getElementById('techCarousel');
  if (!carousel) return;
  const wrap = carousel.parentElement;
  // s'assure que l'animation est bien lancée
  carousel.style.animationPlayState = 'running';
});