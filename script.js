const pageName = window.location.pathname.split('/').pop();
const consistentMastheadPages = new Set(['schedule.html', 'gallery.html', 'accommodation.html', 'favorite-places.html']);

if (consistentMastheadPages.has(pageName)) {
  const layoutStyle = document.createElement('style');
  layoutStyle.textContent = `
    .site-nav a { color: #000 !important; font-weight: 700 !important; }
    .page-masthead h1 { color: #000 !important; font-weight: 700 !important; font-style: normal !important; }
    .page-masthead h1 em { color: inherit !important; font-style: normal !important; font-weight: 700 !important; }
    .schedule-masthead h1 em { color: var(--olive) !important; font-style: italic !important; }
    .page-masthead > p:not(.eyebrow) { color: #000 !important; font-weight: 700 !important; max-width: none !important; }
    .page-masthead:not(.favorite-masthead) { min-height: 0 !important; padding-top: clamp(48px, 6vw, 72px) !important; padding-bottom: 36px !important; }
    .page-masthead h1 { display: block !important; width: 100% !important; max-width: none !important; white-space: nowrap !important; margin-bottom: 18px !important; }
    .page-masthead > p:not(.eyebrow) { white-space: nowrap !important; }
    .masthead-index { display: none !important; }
    .travel-section[aria-labelledby="airport-heading"] > .eyebrow { display: none !important; }
    .schedule-masthead > p:not(.eyebrow) { font-size: clamp(20px, 2.4vw, 30px) !important; }
    .timeline .timeline-item { font-size: 1.25rem; }
    .timeline .timeline-item time { font-size: 1.1em; }
    .timeline .timeline-item h3 { font-size: 1.3em; }
    .timeline .timeline-item p, .timeline .timeline-item .under-link { font-size: 1.08em; }
    .timeline .day-heading h2 { font-size: clamp(28px, 3.5vw, 40px); }
  `;
  document.head.append(layoutStyle);

  const masthead = document.querySelector('.page-masthead');
  const heading = masthead?.querySelector('h1');
  if (heading) {
    heading.querySelectorAll('br').forEach((lineBreak) => lineBreak.replaceWith(document.createTextNode(' ')));
  }

  const fitTextToLine = (element, minFontSize) => {
    if (!element) return;
    element.style.maxWidth = 'none';
    element.style.whiteSpace = 'nowrap';
    const startingSize = parseFloat(window.getComputedStyle(element).fontSize);
    let size = startingSize;
    while (element.scrollWidth > element.parentElement.clientWidth && size > minFontSize) {
      size -= 0.5;
      element.style.fontSize = `${size}px`;
    }
  };

  const fitMasthead = () => {
    fitTextToLine(heading, 14);
    fitTextToLine(masthead?.querySelector(':scope > p:not(.eyebrow)'), 14);
  };
  fitMasthead();
  window.addEventListener('resize', fitMasthead);

  if (pageName === 'accommodation.html') {
    const gettingHereLabel = [...document.querySelectorAll('.travel-section > .eyebrow')]
      .find((label) => label.textContent.trim().toLowerCase() === 'getting here');
    gettingHereLabel?.remove();
  }
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
