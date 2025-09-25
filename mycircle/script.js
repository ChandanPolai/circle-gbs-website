// Mobile menu toggle
const toggleBtn = document.querySelector('.nav-toggle');
const menu = document.querySelector('.menu');
if (toggleBtn && menu) {
  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      menu && menu.classList.remove('show');
    }
  });
});

// Tabs
document.querySelectorAll('[data-tabs]').forEach(tabs => {
  const buttons = tabs.querySelectorAll('.tab');
  const panels = tabs.querySelectorAll('.tab-panel');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-tab');
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const active = tabs.querySelector('#' + id);
      active && active.classList.add('active');
    });
  });
});

// Counters when visible
function animateCounter(el, target) {
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 100));
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toString();
  }, 16);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target;
      const target = parseInt(num.getAttribute('data-target') || '0', 10);
      animateCounter(num, target);
      observer.unobserve(num);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.num[data-target]').forEach(el => observer.observe(el));

// Back to top
const toTop = document.querySelector('.to-top');
if (toTop) {
  toTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Form demo submit
const form = document.getElementById('join-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks! We will reach out shortly.');
    form.reset();
  });
}

