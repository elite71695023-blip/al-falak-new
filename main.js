// Al Falak Transport — Shared JS
// Mobile nav toggle
function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.toggle('open');
}

// Scroll reveal
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings inside a grid
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')]
          : [];
        const idx = siblings.indexOf(entry.target);
        const delay = Math.max(0, (idx % 4)) * 75;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach(el => obs.observe(el));
});

// Minimal counter animation for stat boxes
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '+';
      let start = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          el.textContent = target + suffix;
          clearInterval(timer);
        } else {
          el.textContent = start + suffix;
        }
      }, 30);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
});
