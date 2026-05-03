document.addEventListener('DOMContentLoaded', () => {
  const navbar     = document.getElementById('navbar');
  const burger     = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks   = document.querySelectorAll('.nav-link');
  const mobileLinks= document.querySelectorAll('.mobile-menu a');
  let menuOpen     = false;

  // Scroll → sticky style
  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Burger toggle
  const openMenu  = () => { menuOpen = true;  mobileMenu.classList.add('open'); burger.setAttribute('aria-expanded','true'); };
  const closeMenu = () => { menuOpen = false; mobileMenu.classList.remove('open'); burger.setAttribute('aria-expanded','false'); };

  burger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });
});
