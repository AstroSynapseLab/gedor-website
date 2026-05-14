const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvyzwne';

function setButtonState(btn, text, bg, color, border) {
  btn.textContent = text;
  btn.style.background = bg;
  btn.style.color = color;
  btn.style.border = border;
}

function resetFormState(btn, input, originalText, originalPlaceholder) {
  btn.textContent = originalText;
  btn.style.background = '';
  btn.style.color = '';
  btn.style.border = '';
  btn.disabled = false;
  input.placeholder = originalPlaceholder;
}

function getErrorEl(form) {
  const id = form.querySelector('input[aria-describedby]')?.getAttribute('aria-describedby');
  return id ? document.getElementById(id) : null;
}

function showError(form, msg) {
  const input = form.querySelector('input[type="email"]');
  const err = getErrorEl(form);
  input.classList.add('waitlist__input--error');
  if (err) err.textContent = msg;
}

function clearError(form) {
  const input = form.querySelector('input[type="email"]');
  const err = getErrorEl(form);
  input.classList.remove('waitlist__input--error');
  if (err) err.textContent = '';
}

function validateEmail(val) {
  if (!val) return 'Your email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address.';
  return null;
}

async function submitWaitlistForm(form) {
  const input = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button');
  const email = input.value.trim();

  const validationError = validateEmail(email);
  if (validationError) {
    showError(form, validationError);
    input.focus();
    return;
  }
  clearError(form);

  const originalText = btn.textContent;
  const originalPlaceholder = input.placeholder;

  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: form.dataset.source || 'unknown',
        page: 'gedor.ai landing',
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = data.errors?.[0]?.message || 'Submission failed. Try again?';
      throw new Error(msg);
    }

    clearError(form);
    setButtonState(btn, 'You\u2019re in.', '#1c1c1c', '#ffd100', '1px solid rgba(255,209,0,0.4)');
    input.value = '';
    input.placeholder = 'Welcome aboard.';

    setTimeout(() => resetFormState(btn, input, originalText, originalPlaceholder), 4000);

  } catch (err) {
    const msg = err.message.length < 28 ? err.message : 'Try again';
    setButtonState(btn, msg, '#2a1a1a', '#ff8b8b', '1px solid rgba(255,139,139,0.3)');
    setTimeout(() => resetFormState(btn, input, originalText, originalPlaceholder), 3000);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  submitWaitlistForm(event.target);
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('back-to-top--visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function selectTab(tabs, panels, idx) {
  tabs.forEach((tab, i) => tab.setAttribute('aria-selected', String(i === idx)));
  panels.forEach((panel, i) => {
    panel.setAttribute('aria-hidden', String(i !== idx));
    panel.classList.toggle('tabs__panel--active', i === idx);
  });
}

function initTabs() {
  const tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  selectTab(tabs, panels, 0);

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tabs, panels, i));

    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (i + 1) % tabs.length;
        tabs[next].focus();
        selectTab(tabs, panels, next);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = (i - 1 + tabs.length) % tabs.length;
        tabs[prev].focus();
        selectTab(tabs, panels, prev);
      }
    });
  });
}


function initNavCta() {
  const cta = document.querySelector('a[href="#waitlist"]');
  if (!cta) return;
  cta.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.getElementById('waitlist');
    if (!form) return;
    const top = form.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: 'smooth' });
    const input = form.querySelector('input[type="email"]');
    if (input && !input.disabled) setTimeout(() => input.focus(), 400);
  });
}

function initWaitlistForms() {
  document.querySelectorAll('form.waitlist').forEach((form) => {
    form.addEventListener('submit', handleSubmit);
    form.querySelector('input[type="email"]').addEventListener('input', () => clearError(form));
  });
}

function setConsent(value) {
  localStorage.setItem('cookie_consent', value);
}

function getConsent() {
  return localStorage.getItem('cookie_consent');
}

function openCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.add('cookie-banner--visible');
}

function disableWaitlistInputs() {
  document.querySelectorAll('form.waitlist').forEach((form) => {
    if (form.dataset.consentDeclined) return;
    form.dataset.consentDeclined = '1';
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"]');
    input.disabled = true;
    input.placeholder = 'Email collection declined';

    const reopen = document.createElement('button');
    reopen.type = 'button';
    reopen.className = 'waitlist__btn waitlist__btn--reopen';
    reopen.setAttribute('aria-label', 'Change cookie settings');
    reopen.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
        <path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/>
      </svg>
      Change consent
    `;
    reopen.addEventListener('click', openCookieBanner);
    btn.replaceWith(reopen);
  });
}

function enableWaitlistInputs() {
  document.querySelectorAll('form.waitlist').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const reopen = form.querySelector('.waitlist__btn--reopen');
    input.disabled = false;
    input.placeholder = 'you@company.eu';

    if (reopen) {
      const submit = document.createElement('button');
      submit.type = 'submit';
      submit.className = 'waitlist__btn';
      submit.textContent = 'Join the waitlist';
      reopen.replaceWith(submit);
    }
    delete form.dataset.consentDeclined;
  });
}

function initPrivacyModal() {
  const overlay = document.getElementById('privacyModal');
  if (!overlay) return;

  function open(e) {
    e.preventDefault();
    overlay.classList.add('modal-overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('modal-overlay--visible');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.js-privacy-modal').forEach((el) => el.addEventListener('click', open));
  document.getElementById('privacyModalClose').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');
  if (!banner || !acceptBtn || !declineBtn) return;

  const choice = getConsent();
  if (choice === 'declined') {
    disableWaitlistInputs();
  } else if (!choice) {
    setTimeout(() => banner.classList.add('cookie-banner--visible'), 800);
  }

  function dismiss() {
    banner.classList.remove('cookie-banner--visible');
  }

  acceptBtn.addEventListener('click', () => {
    setConsent('accepted');
    dismiss();
    enableWaitlistInputs();
  });

  declineBtn.addEventListener('click', () => {
    setConsent('declined');
    dismiss();
    disableWaitlistInputs();
  });
}

function init() {
  initHexGrid();
  initNavCta();
  initWaitlistForms();
  initBackToTop();
  initTabs();
  initCookieBanner();
  initPrivacyModal();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', init);
