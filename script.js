const wideMastheadPages = new Set(['schedule.html', 'gallery.html', 'accommodation.html']);
const currentPage = window.location.pathname.split('/').pop();
if (wideMastheadPages.has(currentPage)) {
  document.querySelector('.page-masthead')?.classList.add('wide-single-line-masthead');
}

const mastheadLayout = document.createElement('style');
mastheadLayout.textContent = `
  .wide-single-line-masthead { padding-left: max(var(--gutter), 3vw); padding-right: max(var(--gutter), 3vw); min-height: 0; }
  .wide-single-line-masthead h1 { width: 100%; max-width: none; font-size: clamp(38px, 6vw, 82px); white-space: nowrap; }
  .wide-single-line-masthead h1 br { display: none; }
  .wide-single-line-masthead > p:not(.eyebrow) { width: 100%; max-width: none; white-space: nowrap; }
  @media (max-width: 760px) {
    .wide-single-line-masthead h1 { white-space: normal; }
    .wide-single-line-masthead h1 br { display: initial; }
    .wide-single-line-masthead > p:not(.eyebrow) { white-space: normal; }
  }
  .favorite-list > .eyebrow { display: none; }
  .favorite-list > h2 { font-size: clamp(42px, 6vw, 72px); }
`;
document.head.append(mastheadLayout);

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (nav && !nav.querySelector('a[href="favorite-places.html"]')) {
  const favoritePlacesLink = document.createElement('a');
  favoritePlacesLink.href = 'favorite-places.html';
  favoritePlacesLink.textContent = 'Favorite places';
  const rsvpLink = nav.querySelector('.nav-rsvp');
  if (rsvpLink) nav.insertBefore(favoritePlacesLink, rsvpLink);
  else nav.append(favoritePlacesLink);
}
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
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
  let timer;

  const showSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === activeIndex);
      slide.setAttribute('aria-hidden', String(index !== activeIndex));
    });
    if (count) count.textContent = String(activeIndex + 1).padStart(2, '0');
  };

  const stopRotation = () => window.clearInterval(timer);
  const startRotation = () => {
    stopRotation();
    if (slides.length > 1 && !document.hidden) {
      timer = window.setInterval(() => showSlide(activeIndex + 1), 5000);
    }
  };

  carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => {
    showSlide(activeIndex - 1);
    startRotation();
  });
  carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => {
    showSlide(activeIndex + 1);
    startRotation();
  });
  carousel.addEventListener('mouseenter', stopRotation);
  carousel.addEventListener('mouseleave', startRotation);
  carousel.addEventListener('focusin', stopRotation);
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) startRotation();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopRotation();
    else startRotation();
  });

  showSlide(activeIndex);
  startRotation();
}
