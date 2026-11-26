const pageName = window.location.pathname.split('/').pop();
const schedulePage = pageName === 'schedule' || pageName === 'schedule.html';

// Keep the full Weekend subtitle on one line, including on the /schedule route.
if (schedulePage) {
  const subtitle = document.querySelector('.schedule-masthead > p:not(.eyebrow)');
  if (subtitle) {
    const fitSubtitle = () => {
      subtitle.style.setProperty('display', 'block', 'important');
      subtitle.style.setProperty('width', '100%', 'important');
      subtitle.style.setProperty('max-width', 'none', 'important');
      subtitle.style.setProperty('white-space', 'nowrap', 'important');
      subtitle.style.setProperty('overflow', 'visible', 'important');
      subtitle.style.setProperty('font-size', '24px', 'important');
      subtitle.style.setProperty('line-height', '1.35', 'important');

      const parentWidth = subtitle.parentElement.getBoundingClientRect().width;
      const styles = window.getComputedStyle(subtitle.parentElement);
      const availableWidth = parentWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      let fontSize = 24;
      while (subtitle.scrollWidth > availableWidth && fontSize > 10) {
        fontSize -= 0.5;
        subtitle.style.setProperty('font-size', `${fontSize}px`, 'important');
      }
    };
    fitSubtitle();
    window.addEventListener('resize', fitSubtitle);
    if (document.fonts?.ready) document.fonts.ready.then(fitSubtitle);
  }
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
