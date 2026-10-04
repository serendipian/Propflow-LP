import { brand } from '../data/brand';
import { signUpUrl } from '../data/navigation';

// Google Analytics 4 in Consent Mode "basic": gtag.js is not loaded and nothing
// is sent to Google until the visitor accepts the cookie banner. With no
// gaMeasurementId in brands.json, everything here is a no-op.
// Page views: gtag's config sends the first one, and the GA4 stream's enhanced
// measurement ("page changes based on browser history events", on by default)
// records client-side route changes, so the app never sends page_view itself.
const GA_ID = brand.gaMeasurementId;
const STORAGE_KEY = 'analytics-consent';

export type Consent = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const analyticsEnabled = Boolean(GA_ID);

export function getConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

let loaded = false;

// Tiny store so the banner can read consent with useSyncExternalStore.
const listeners = new Set<() => void>();
let settingsOpen = false;
const notify = () => listeners.forEach((listener) => listener());

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The banner shows until the visitor chooses, or when they reopen it from the footer. */
export function isBannerVisible() {
  return getConsent() === null || settingsOpen;
}

function load() {
  if (loaded || !GA_ID) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

// GA sets _ga and _ga_<container> on the site's root domain.
function clearGaCookies() {
  const domain = location.hostname.replace(/^www\./, '');
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!name.startsWith('_ga')) continue;
    for (const d of [domain, `.${domain}`, '']) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    }
  }
}

/** Call once on startup: resumes analytics for visitors who already accepted. */
export function initAnalytics() {
  if (getConsent() === 'granted') load();
}

export function setConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Private mode etc.: the choice just won't be remembered.
  }
  if (consent === 'granted') {
    load();
  } else {
    if (loaded) window.gtag('consent', 'update', { analytics_storage: 'denied' });
    clearGaCookies();
  }
  settingsOpen = false;
  notify();
}

/** Sends a GA4 event; a no-op until the visitor has accepted analytics. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!loaded) return;
  window.gtag('event', name, params);
}

// Conversions that happen outside React state: clicks on any sign-up link (they
// leave for the app's domain) and bookings inside the Calendly iframe, which
// Calendly reports with a postMessage.
let listening = false;
export function listenForConversions() {
  if (listening) return;
  listening = true;
  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a');
      if (link?.href.startsWith(signUpUrl)) trackEvent('sign_up_click', { link_url: link.href });
    },
    { capture: true },
  );
  window.addEventListener('message', (event) => {
    if (event.origin === 'https://calendly.com' && event.data?.event === 'calendly.event_scheduled') {
      trackEvent('book_demo');
    }
  });
}

/** Re-opens the cookie banner (footer "Cookie settings" link). */
export function openCookieSettings() {
  settingsOpen = true;
  notify();
}
