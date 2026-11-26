const pageName = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
const schedulePage = pageName === 'schedule' || pageName === 'schedule.html';

if (schedulePage) {
  const scheduleStyle = document.createElement('style');
  scheduleStyle.textContent = `
    .schedule-masthead {
      width: 100% !important;
      max-width: none !important;
      min-height: 0 !important;
      padding: clamp(48px, 6vw, 72px) clamp(24px, 7vw, 112px) 42px !important;
    }
    .schedule-masthead h1 {
      width: 100% !important;
      max-width: none !important;
      white-space: nowrap !important;
      font-size: clamp(48px, 8vw, 108px) !important;
    }
    .schedule-masthead h1 em {
      color: var(--olive) !important;
      font-style: italic !important;
    }
    .timeline.section-shell,
    .schedule-note.section-shell {
      width: 100% !important;
      max-width: none !important;
      padding-left: clamp(24px, 7vw, 112px) !important;
      padding-right: clamp(24px, 7vw, 112px) !important;
    }
    .timeline .day-heading h2 { font-size: clamp(32px, 4vw, 48px) !important; }
    .timeline .day-heading > span { font-size: clamp(13px, 1.3vw, 17px) !important; }
    .timeline .timeline-item { font-size: clamp(18px, 1.6vw, 22px) !important; }
    .timeline .timeline-item time { font-size: 1.05em !important; }
    .timeline .timeline-item h3 { font-size: clamp(25px, 2.4vw, 32px) !important; }
    .timeline .timeline-item p,
    .timeline .timeline-item .under-link { font-size: 1.08em !important; }
    .schedule-note p,
    .schedule-note .under-link { font-size: clamp(17px, 1.6vw, 21px) !important; }
  `;
  document.head.append(scheduleStyle);
}

const masthead = document.querySelector('.page-masthead:not(.favorite-masthead)');
const mastheadHeading = masthead?.querySelector('h1');
if (masthead && mastheadHeading) {
  masthead.style.setProperty('min-height', '0', 'important');
  masthead.style.setProperty('padding-top', 'clamp(48px, 6vw, 72px)', 'important');
  masthead.style.setProperty('padding-bottom', '36px', 'important');
  mastheadHeading.querySelectorAll('br').forEach((lineBreak) => lineBreak.remove());
  mastheadHeading.style.setProperty('max-width', 'none', 'important');
  mastheadHeading.style.setProperty('width', '100%', 'important');
  mastheadHeading.style.setProperty('font-size', 'clamp(42px, 7vw, 96px)', 'important');
  mastheadHeading.style.setProperty('white-space', 'nowrap', 'important');
}

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
