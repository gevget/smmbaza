import { siteConfig, isConfiguredUrl } from './config/site-config.js';
import { mediaManifest } from './content/media.js';
import { calculatorDefaults, calculatorLimits, processSteps } from './content/site-content.js';

const iconPaths = {
  ArrowDown: '<path d="M12 5v14m7-7-7 7-7-7"/>',
  ArrowLeft: '<path d="m15 18-6-6 6-6"/>',
  ArrowRight: '<path d="m9 18 6-6-6-6"/>',
  ArrowUpRight: '<path d="M7 17 17 7M7 7h10v10"/>',
  BadgeCheck: '<path d="M3.85 8.62a2.4 2.4 0 0 0 0 6.76 2.4 2.4 0 0 0 3.77 3.77 2.4 2.4 0 0 0 6.76 0 2.4 2.4 0 0 0 3.77-3.77 2.4 2.4 0 0 0 0-6.76 2.4 2.4 0 0 0-3.77-3.77 2.4 2.4 0 0 0-6.76 0 2.4 2.4 0 0 0-3.77 3.77Z"/><path d="m9 12 2 2 4-4"/>',
  CalendarDays: '<path d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  CalendarRange: '<path d="M3 4h18v17H3zM8 2v4m8-4v4M3 10h18M7 14h10m-7 4h7"/>',
  Camera: '<path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3h5Z"/><circle cx="12" cy="13" r="3"/>',
  ChartNoAxesCombined: '<path d="M3 3v18h18"/><path d="m7 16 4-5 3 3 5-7"/>',
  Check: '<path d="m5 12 4 4L19 6"/>',
  ChevronDown: '<path d="m6 9 6 6 6-6"/>',
  Clock3: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  Database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12v7c0 1.66 3.58 3 8 3s8-1.34 8-3v-7"/>',
  FileCheck2: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/>',
  FileDown: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6m-6 5v5m0 0 3-3m-3 3-3-3"/>',
  FolderKanban: '<path d="M4 4h6l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M8 11v5m4-3v3m4-7v7"/>',
  Image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  Images: '<rect width="14" height="14" x="3" y="3" rx="2"/><path d="m3 17 5-5 4 4 3-3 6 6"/><path d="M17 3h2a2 2 0 0 1 2 2v12"/>',
  Layers3: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
  Link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  LogIn: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5m5 5H3"/>',
  MapPin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  Menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  Monitor: '<rect width="18" height="12" x="3" y="3" rx="2"/><path d="M8 21h8m-4-6v6"/>',
  MousePointerClick: '<path d="m3 3 7.07 16.97 2.51-7.39L20 10.07 3 3Z"/><path d="m13 13 6 6"/>',
  Send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  Sparkles: '<path d="m12 3-1.9 5.8L4 11l6.1 2.2L12 19l1.9-5.8L20 11l-6.1-2.2L12 3ZM5 3l-.7 2.3L2 6l2.3.7L5 9l.7-2.3L8 6l-2.3-.7L5 3ZM19 16l-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7L19 16Z"/>',
  Stamp: '<path d="M7 22h10M5 18h14a2 2 0 0 0 2-2v-1H3v1a2 2 0 0 0 2 2ZM8 15V9a4 4 0 1 1 8 0v6"/>',
  Store: '<path d="M3 9h18l-1-5H4L3 9Zm1 0v11h16V9M3 9c0 2 1.5 3 3 3s3-1 3-3c0 2 1.5 3 3 3s3-1 3-3c0 2 1.5 3 3 3s3-1 3-3"/><path d="M9 20v-5h6v5"/>',
  Type: '<path d="M4 7V4h16v3M12 4v16m-3 0h6"/>',
  Users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-1a4 4 0 0 1 3 6m-1-13a4 4 0 0 1 0 8"/>',
  UsersRound: '<path d="M18 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
};

const icon = (name, className = '') => `<svg class="${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.Image}</svg>`;

function mountIcons() {
  document.querySelectorAll('[data-icon]').forEach((element) => {
    element.innerHTML = icon(element.dataset.icon);
  });
}

function renderMediaSlots() {
  document.querySelectorAll('[data-media-id]').forEach((mount) => {
    const media = mediaManifest[mount.dataset.mediaId];
    if (!media) return;
    if (media.status === 'approved' && media.src && media.width && media.height) {
      const imageClass = media.kind === 'real-screenshot' ? 'media-image media-image-screenshot' : 'media-image';
      const loading = media.id === 'hero-system' ? 'eager' : 'lazy';
      const fetchPriority = media.id === 'hero-system' ? 'high' : 'auto';
      const sizes = media.id === 'hero-system' ? '(max-width: 820px) 100vw, 560px' : '(max-width: 820px) 100vw, 1240px';
      mount.innerHTML = `<div class="media-frame" data-media-kind="${media.kind}" style="--desktop-aspect:${media.desktopAspect};--mobile-aspect:${media.mobileAspect}" role="group" aria-label="${media.label}. ${media.description}"><img class="${imageClass}" data-lightbox-image tabindex="0" role="button" aria-label="Открыть изображение: ${media.alt}" src="${media.src}" alt="${media.alt}" width="${media.width}" height="${media.height}" loading="${loading}" fetchpriority="${fetchPriority}" sizes="${sizes}" decoding="async" /></div>`;
      return;
    }
    mount.innerHTML = `<div class="media-placeholder" data-media-kind="${media.kind}" style="--desktop-aspect:${media.desktopAspect};--mobile-aspect:${media.mobileAspect}" role="img" aria-label="${media.label}. ${media.description}"><div class="placeholder-icon">${icon(media.kind === 'real-screenshot' ? 'Camera' : 'Image')}</div><div><p class="placeholder-label">${media.label}</p><p class="placeholder-description">Место для утверждённого изображения. ${media.description}</p></div><div class="placeholder-meta"><span>ID: ${media.id}</span><span>${media.kind}</span><span>Desktop ${media.desktopAspect}</span><span>Mobile ${media.mobileAspect}</span></div></div>`;
  });
}

function configureLinks() {
  const linkConfig = [
    ['[data-vk-login]', siteConfig.VK_AUTH_URL],
    ['[data-market-link]', siteConfig.MARKET_URL],
    ['[data-terms-link]', siteConfig.TERMS_URL],
    ['[data-privacy-link]', siteConfig.PRIVACY_URL],
    ['[data-privacy-link-footer]', siteConfig.PRIVACY_URL],
  ];
  linkConfig.forEach(([selector, url]) => {
    document.querySelectorAll(selector).forEach((link) => {
      if (isConfiguredUrl(url)) {
        link.href = url;
        link.hidden = false;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  });
  if (isConfiguredUrl(siteConfig.PRIVACY_URL)) {
    document.querySelector('[data-privacy-fallback]')?.setAttribute('hidden', '');
  }
  if (isConfiguredUrl(siteConfig.PRIVACY_URL) || isConfiguredUrl(siteConfig.TERMS_URL)) {
    document.querySelector('[data-legal-fallback]')?.setAttribute('hidden', '');
  }
  if (isConfiguredUrl(siteConfig.SITE_URL)) {
    document.querySelector('meta[name="robots"]')?.setAttribute('content', 'index, follow');
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = siteConfig.SITE_URL;
    document.head.appendChild(canonical);
    const ogUrl = document.querySelector('meta[property="og:url"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { property: 'og:url' }));
    ogUrl.setAttribute('content', siteConfig.SITE_URL);
    const data = JSON.parse(document.querySelector('#structured-data').textContent);
    data.url = siteConfig.SITE_URL;
    if (isConfiguredUrl(siteConfig.OG_IMAGE_URL)) data.image = siteConfig.OG_IMAGE_URL;
    document.querySelector('#structured-data').textContent = JSON.stringify(data);
  }
}

function trackEvent(name, payload = {}) {
  if (!siteConfig.ANALYTICS_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
}

function setupMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!toggle || !menu) return;
  const firstLink = menu.querySelector('a');
  let previousOverflow = '';
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menu.hidden = !open;
    previousOverflow = open ? document.body.style.overflow : previousOverflow;
    document.body.style.overflow = open ? 'hidden' : previousOverflow;
    if (open) firstLink?.focus();
    else toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  menu.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || menu.hidden) return;
    const focusable = [...menu.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((element) => !element.hasAttribute('disabled'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) setOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820 && !menu.hidden) setOpen(false);
  });
}

function clampNumber(value, [min, max], fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function formatNumber(value) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(value);
}

function formatDuration(minutes) {
  const rounded = Math.max(0, Math.round(minutes));
  const hours = Math.floor(rounded / 60);
  const mins = rounded % 60;
  if (!hours) return `${mins} мин`;
  if (!mins) return `${hours} ч`;
  return `${hours} ч ${mins} мин`;
}

function calculateWork(values) {
  const communities = clampNumber(values.communities, calculatorLimits.communities, calculatorDefaults.communities);
  const posts = clampNumber(values.posts, calculatorLimits.posts, calculatorDefaults.posts);
  const screenshotsPerPost = clampNumber(values.screenshotsPerPost, calculatorLimits.screenshotsPerPost, calculatorDefaults.screenshotsPerPost);
  const manualMinutesPerScreenshot = clampNumber(values.manualMinutesPerScreenshot, calculatorLimits.manualMinutesPerScreenshot, calculatorDefaults.manualMinutesPerScreenshot);
  const setupMinutes = clampNumber(values.setupMinutes, calculatorLimits.setupMinutes, calculatorDefaults.setupMinutes);
  const placements = communities * posts;
  const screenshots = placements * screenshotsPerPost;
  const manualMinutes = screenshots * manualMinutesPerScreenshot;
  return { placements, screenshots, manualMinutes, setupMinutes, difference: Math.max(0, manualMinutes - setupMinutes) };
}

function setupCalculator() {
  const form = document.querySelector('[data-calculator]');
  const results = document.querySelector('[data-calculator-results]');
  if (!form || !results) return;
  const update = () => {
    const values = Object.fromEntries(new FormData(form).entries());
    const result = calculateWork(values);
    form.querySelectorAll('[data-slider-input]').forEach((input) => {
      const value = Number(input.value);
      const min = Number(input.min);
      const max = Number(input.max);
      const progress = max > min ? ((value - min) / (max - min)) * 100 : 0;
      input.style.setProperty('--range-progress', `${progress}%`);
      const output = form.querySelector(`[data-slider-value="${input.name}"]`);
      if (output) output.textContent = `${formatNumber(value)}${input.dataset.sliderUnit ? ` ${input.dataset.sliderUnit}` : ''}`;
    });
    results.querySelector('[data-result="placements"]').textContent = formatNumber(result.placements);
    results.querySelector('[data-result="screenshots"]').textContent = formatNumber(result.screenshots);
    results.querySelector('[data-result="manualHours"]').textContent = formatNumber(result.manualMinutes / 60);
    results.querySelector('[data-result="setupMinutes"]').textContent = formatNumber(result.setupMinutes);
    results.querySelector('[data-result="difference"]').textContent = formatDuration(result.difference);
    trackEvent('calculator_change', { communities: result.placements ? Number(values.communities) : undefined });
  };
  form.addEventListener('input', update);
  update();
}

function setupPlatformCarousel() {
  const carousel = document.querySelector('[data-platform-carousel]');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('[data-platform-slide]')];
  const previous = carousel.querySelector('[data-platform-prev]');
  const next = carousel.querySelector('[data-platform-next]');
  const counter = carousel.querySelector('[data-platform-counter]');
  if (!slides.length || !previous || !next || !counter) return;
  let activeIndex = 0;
  const setActive = (index) => {
    const nextIndex = (index + slides.length) % slides.length;
    const changed = activeIndex !== nextIndex;
    activeIndex = nextIndex;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.hidden = !active;
      slide.setAttribute('aria-hidden', String(!active));
    });
    counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    if (changed) trackEvent('platform_slide_change', { slide: activeIndex + 1 });
  };
  previous.addEventListener('click', () => setActive(activeIndex - 1));
  next.addEventListener('click', () => setActive(activeIndex + 1));
  setActive(0);
}

function setupLightbox() {
  const lightbox = document.querySelector('[data-lightbox]');
  const dialog = lightbox?.querySelector('.lightbox-dialog');
  const preview = lightbox?.querySelector('[data-lightbox-preview]');
  const closeButtons = lightbox?.querySelectorAll('[data-lightbox-close]');
  if (!lightbox || !preview || !closeButtons?.length) return;
  let previouslyFocused = null;
  const close = () => {
    lightbox.hidden = true;
    preview.removeAttribute('src');
    document.body.style.overflow = '';
    previouslyFocused?.focus();
    previouslyFocused = null;
  };
  const open = (image) => {
    previouslyFocused = document.activeElement;
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close')?.focus();
    trackEvent('lightbox_open', { image: image.alt });
  };
  document.addEventListener('click', (event) => {
    const image = event.target.closest('[data-lightbox-image]');
    if (image) open(image);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      close();
      return;
    }
    if (event.key === 'Tab' && !lightbox.hidden && dialog) {
      const focusable = [...dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((element) => !element.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-lightbox-image]')) {
      event.preventDefault();
      open(event.target);
    }
  });
  closeButtons.forEach((button) => button.addEventListener('click', close));
}

function setupScrollSpy() {
  const links = [...document.querySelectorAll('.desktop-nav a[href^="#"], .mobile-menu a[href^="#"]')];
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (!links.length || !sections.length) return;
  const update = () => {
    const active = sections.filter((section) => section.getBoundingClientRect().top <= 150).at(-1);
    links.forEach((link) => {
      const isActive = active && link.getAttribute('href') === `#${active.id}`;
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function setupFloatingDemoCta() {
  const cta = document.querySelector('.floating-demo-cta');
  const demo = document.querySelector('#demo');
  if (!cta) return;
  const update = () => {
    const demoVisible = demo && demo.getBoundingClientRect().top < window.innerHeight * 0.72 && demo.getBoundingClientRect().bottom > 0;
    cta.classList.toggle('is-visible', window.scrollY > 420 && !demoVisible);
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

function setFieldError(name, message) {
  const field = document.querySelector(`[name="${name}"]`)?.closest('.form-field, .checkbox-label');
  const error = document.querySelector(`[data-error-for="${name}"]`);
  field?.classList.toggle('has-error', Boolean(message));
  if (error) error.textContent = message;
}

function setupDemoForm() {
  const form = document.querySelector('[data-demo-form]');
  const status = document.querySelector('[data-form-status]');
  const submit = form?.querySelector('button[type="submit"]');
  if (!form || !status || !submit) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    ['name', 'contact', 'consent'].forEach((name) => setFieldError(name, ''));
    status.textContent = '';
    status.classList.remove('is-error');
    const data = Object.fromEntries(new FormData(form).entries());
    let firstInvalid = null;
    if (!String(data.name || '').trim() || String(data.name).trim().length < 2) {
      setFieldError('name', 'Укажите имя.');
      firstInvalid ||= form.elements.name;
    }
    if (!String(data.contact || '').trim()) {
      setFieldError('contact', 'Укажите рабочий контакт.');
      firstInvalid ||= form.elements.contact;
    }
    if (!form.elements.consent.checked) {
      setFieldError('consent', 'Нужно согласие с политикой конфиденциальности.');
      firstInvalid ||= form.elements.consent;
    }
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    trackEvent('demo_form_submit');
    submit.disabled = true;
    submit.querySelector('[data-submit-label]').textContent = 'Проверяем заявку…';
    try {
      if (siteConfig.DEMO_MODE || !isConfiguredUrl(siteConfig.DEMO_FORM_ENDPOINT)) {
        await new Promise((resolve) => window.setTimeout(resolve, 350));
        status.textContent = 'Демо-успех: заявка прошла проверку, но данные не отправлялись. Подключите endpoint формы для production.';
        trackEvent('demo_form_success', { mode: 'demo' });
      } else {
        const response = await fetch(siteConfig.DEMO_FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (!response.ok) throw new Error('request_failed');
        status.textContent = 'Заявка отправлена. Команда SMMБазы свяжется с вами.';
        form.reset();
        trackEvent('demo_form_success');
      }
    } catch {
      status.classList.add('is-error');
      status.textContent = 'Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.';
    } finally {
      submit.disabled = false;
      submit.querySelector('[data-submit-label]').textContent = 'Получить разбор сценария';
    }
  });
}

function setupAnalyticsClicks() {
  document.querySelectorAll('.js-demo-cta').forEach((button) => button.addEventListener('click', () => trackEvent('demo_cta_click', { source: button.closest('header') ? 'header' : 'page' })));
  document.querySelectorAll('[data-vk-login]').forEach((link) => link.addEventListener('click', () => trackEvent('vk_login_click')));
  document.querySelectorAll('[data-market-link]').forEach((link) => link.addEventListener('click', () => trackEvent('market_click')));
  document.querySelectorAll('details').forEach((detail) => detail.addEventListener('toggle', () => { if (detail.open) trackEvent('faq_open', { question_id: detail.querySelector('summary')?.textContent?.trim() }); }));
}

document.querySelector('[data-year]').textContent = String(new Date().getFullYear());
mountIcons();
renderMediaSlots();
configureLinks();
setupMenu();
setupCalculator();
setupPlatformCarousel();
setupLightbox();
setupFloatingDemoCta();
setupScrollSpy();
setupDemoForm();
setupAnalyticsClicks();
