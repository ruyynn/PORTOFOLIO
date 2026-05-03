document.addEventListener('DOMContentLoaded', () => {

  /* ── SCROLL REVEAL ─────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ── SKILL BARS ─────────────────── */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          const w = fill.getAttribute('data-w');
          setTimeout(() => { fill.style.width = w + '%'; }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));


  /* ── COUNTERS ─────────────────── */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter').forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          let current  = 0;
          const step   = Math.ceil(target / 40);
          const tick   = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(tick);
            }
            counter.textContent = current;
          }, 40);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);


  /* ── TYPEWRITER ─────────────────── */
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Web Pentester',
    'Security Enthusiast',
    'OSINT Researcher',
    'Responsible Discloser',
    'Bug Hunter',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  const TYPE_SPEED   = 80;
  const DELETE_SPEED = 40;
  const PAUSE_TIME   = 2200;

  const type = () => {
    if (paused) return;

    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { deleting = true; paused = false; }, PAUSE_TIME);
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? DELETE_SPEED : TYPE_SPEED);
  };

  setTimeout(type, 800);

});
