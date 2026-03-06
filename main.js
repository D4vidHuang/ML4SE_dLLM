/* ===========================
   ML4SE – main.js
   =========================== */

// ── Navbar Scroll Effect ──────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Mobile Nav Toggle ──────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── Intersection Observer (fade-in animations) ─────────
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate a wide range of elements on scroll
const animatables = document.querySelectorAll(
  '.card, .stat-item, .pipeline-step, .timeline-item, ' +
  '.paper-card, .dataset-card, .method-step, .check-item, ' +
  '.report-section, .sidebar-card, .reading-step, .highlight-item, ' +
  '.req-block, .content-block, .research-category'
);

animatables.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  fadeObserver.observe(el);
});

// ── Research Page: Filter Papers ──────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter papers
      const paperCards = document.querySelectorAll('.paper-card');
      paperCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) card.classList.add('visible');
      });

      // Hide/show entire categories when filtering
      document.querySelectorAll('.research-category').forEach(cat => {
        if (filter === 'all') {
          cat.style.display = '';
          return;
        }
        const visiblePapers = cat.querySelectorAll(`.paper-card[data-category="${filter}"]`);
        cat.style.display = visiblePapers.length > 0 ? '' : 'none';
      });
    });
  });
}

// ── Active Nav Link Detection ──────────────────────────
(function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'nav-home',
    '': 'nav-home',
    'project.html': 'nav-project',
    'research.html': 'nav-research',
    'requirements.html': 'nav-requirements'
  };
  const activeId = map[page];
  if (activeId) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeEl = document.getElementById(activeId);
    if (activeEl) activeEl.classList.add('active');
  }
})();

// ── Smooth scroll for anchor links ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Code window typing animation (hero page only) ──────
const codeBody = document.querySelector('.code-body');
if (codeBody) {
  const originalContent = codeBody.innerHTML;
  codeBody.style.opacity = '0';
  setTimeout(() => {
    codeBody.style.transition = 'opacity 0.8s ease';
    codeBody.style.opacity = '1';
  }, 600);
}

// ── Add stagger to timeline items ─────────────────────
document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 100}ms`;
});
