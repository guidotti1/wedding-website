const pageName = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
const schedulePage = pageName === 'schedule' || pageName === 'schedule.html';

// Keep secondary-page masthead subtitles consistent.
const mastheadSubtitleStyle = document.createElement('style');
mastheadSubtitleStyle.textContent = `
  .schedule-masthead > p:not(.eyebrow),
  .gallery-masthead > p:not(.eyebrow),
  .travel-masthead > p:not(.eyebrow),
  .favorite-masthead > p:not(.eyebrow) {
    font-size: clamp(16px, 1.5vw, 20px) !important;
    line-height: 1.5 !important;
    text-transform: none !important;
  }
  .gallery-masthead > .eyebrow,
  .travel-masthead > .eyebrow,
  .favorite-masthead > .eyebrow {
    display: none !important;
  }
`;
document.head.append(mastheadSubtitleStyle);

if (schedulePage) {
  const scheduleStyle = document.createElement('style');
  scheduleStyle.textContent = `
    .schedule-masthead {
      width: 100% !important;
      max-width: none !important;
      min-height: 0 !important;
      padding: clamp(48px, 6vw, 72px) clamp(24px, 7vw, 112px) 42px !important;
    }
    .schedule-masthead > .eyebrow {
      display: block !important;
      margin: 0 !important;
      font-size: clamp(16px, 1.5vw, 20px) !important;
      line-height: 1.5 !important;
      text-transform: none !important;
      letter-spacing: normal !important;
    }
    .schedule-masthead h1 {
      width: 100% !important;
      max-width: none !important;
      white-space: nowrap !important;
      font-size: clamp(48px, 8vw, 108px) !important;
      margin-bottom: 10px !important;
    }
    .schedule-masthead h1 em {
      color: var(--olive) !important;
      font-style: italic !important;
    }
    .schedule-masthead > p:not(.eyebrow) {
      display: block !important;
      margin-top: 0 !important;
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
    .timeline .timeline-item p {
      font-size: 22px !important;
      white-space: nowrap !important;
      max-width: none !important;
      line-height: 1.35 !important;
    }
    .timeline .timeline-item .under-link {
      font-size: clamp(13px, 1.1vw, 16px) !important;
      line-height: 1.3 !important;
    }
    .schedule-note {
      min-height: 220px !important;
      padding-top: 72px !important;
      padding-bottom: 72px !important;
      align-items: center !important;
      column-gap: clamp(28px, 5vw, 72px) !important;
    }
    .schedule-note p {
      max-width: none !important;
      flex: 1 1 auto !important;
      font-size: clamp(17px, 1.6vw, 21px) !important;
      line-height: 1.7 !important;
    }
    .schedule-note .under-link {
      font-size: clamp(16px, 1.5vw, 20px) !important;
      white-space: nowrap !important;
    }
  `;
  document.head.append(scheduleStyle);

  const descriptions = [...document.querySelectorAll('.schedule-masthead ~ .timeline .timeline-item p')];
  const fitDescriptions = () => {
    if (!descriptions.length) return;
    let size = 22;
    descriptions.forEach((paragraph) => paragraph.style.setProperty('font-size', `${size}px`, 'important'));
    while (size > 12 && descriptions.some((paragraph) => {
      paragraph.style.setProperty('font-size', `${size}px`, 'important');
      return paragraph.scrollWidth > paragraph.parentElement.getBoundingClientRect().width;
    })) {
      size -= 0.5;
    }
    descriptions.forEach((paragraph) => paragraph.style.setProperty('font-size', `${size}px`, 'important'));
  };
  fitDescriptions();
  window.addEventListener('resize', fitDescriptions);
  if (document.fonts?.ready) document.fonts.ready.then(fitDescriptions);
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

if (document.querySelector('.favorite-masthead h1')) {
  const favoriteHeadingStyle = document.createElement('style');
  favoriteHeadingStyle.textContent = `
    .favorite-masthead {
      height: auto !important;
      min-height: 0 !important;
      padding-top: clamp(40px, 4vw, 56px) !important;
      padding-bottom: 36px !important;
      overflow: visible !important;
    }
    .favorite-masthead h1 {
      display: block !important;
      height: auto !important;
      line-height: 1.25 !important;
      padding: 0.08em 0 0.2em !important;
      margin-bottom: 12px !important;
      overflow: visible !important;
    }
    .favorite-masthead h1 em {
      display: inline !important;
      line-height: inherit !important;
      padding: 0.08em 0.12em 0.08em !important;
      overflow: visible !important;
    }
  `;
  document.head.append(favoriteHeadingStyle);

  const favoriteHeading = document.querySelector('.favorite-masthead h1');
  const fitFavoriteHeading = () => {
    if (!favoriteHeading) return;
    favoriteHeading.style.setProperty('font-size', 'clamp(40px, 6vw, 82px)', 'important');
    const availableWidth = favoriteHeading.clientWidth;
    let size = parseFloat(getComputedStyle(favoriteHeading).fontSize);
    while (size > 24 && favoriteHeading.scrollWidth > availableWidth) {
      size -= 1;
      favoriteHeading.style.setProperty('font-size', `${size}px`, 'important');
    }
  };
  fitFavoriteHeading();
  window.addEventListener('resize', fitFavoriteHeading);
  if (document.fonts?.ready) document.fonts.ready.then(fitFavoriteHeading);
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
