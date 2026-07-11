import './index.css';
import './lib/i18n';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import i18n from './lib/i18n';
import { getInitialTheme } from './hooks/useTheme';
import App from './App';

const container = document.getElementById('root')!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Pages are prerendered at build time in English with the dark theme (the
// build defaults). Hydrate only when this client would render the same thing;
// otherwise (French visitor, light theme) fall back to a fresh client render —
// createRoot discards the prerendered DOM, avoiding hydration mismatches.
const matchesPrerender =
  container.hasChildNodes() &&
  (i18n.resolvedLanguage ?? 'en') === 'en' &&
  getInitialTheme() === 'dark';

if (matchesPrerender) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
