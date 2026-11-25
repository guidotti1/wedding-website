const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !expanded);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
  }));
}

const rsvpForm = document.querySelector('#rsvp-form');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector('#form-message');
    message.textContent = 'Thanks! This is a front-end RSVP preview only; submissions are not sent or stored. Connect a form service before sharing it with guests.';
    message.classList.add('form-alert');
  });
}

const carousel = document.querySelector('.home-carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.carousel-image')];
  const count = carousel.querySelector('[data-carousel-current]');
  let activeIndex = 0;
  let timer;
  const showSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === activeIndex);
      slide.setAttribute('aria-hidden', String(index !== activeIndex));
    });
    count.textContent = String(activeIndex + 1).padStart(2, '0');
  };
  const startRotation = () => {
    window.clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = window.setInterval(() => showSlide(activeIndex + 1), 5000);
    }
  };
  carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => { showSlide(activeIndex - 1); startRotation(); });
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => { showSlide(activeIndex + 1); startRotation(); });
  carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
  carousel.addEventListener('mouseleave', startRotation);
  carousel.addEventListener('focusin', () => window.clearInterval(timer));
  carousel.addEventListener('focusout', startRotation);
  showSlide(0);
  startRotation();
}
