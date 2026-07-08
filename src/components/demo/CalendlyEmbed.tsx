import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

const WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js';

// Load Calendly's widget.js once, shared across mounts.
let scriptPromise: Promise<void> | null = null;

function loadCalendlyScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGET_SRC}"]`,
    );
    if (existing) {
      // Already present (e.g. HMR) — assume ready.
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null; // allow retry on a later mount
      reject(new Error('Failed to load Calendly widget script'));
    };
    document.body.appendChild(script);
  });

  return scriptPromise;
}

// Propflow brand blue, minus the leading '#' (Calendly expects bare hex).
const PRIMARY = '3b82f6';

function buildUrl(baseUrl: string, theme: 'dark' | 'light'): string {
  const url = new URL(baseUrl);
  url.searchParams.set('hide_gdpr_banner', '1');
  if (theme === 'dark') {
    url.searchParams.set('background_color', '18181b'); // zinc-900
    url.searchParams.set('text_color', 'e4e4e7'); // zinc-200
  }
  url.searchParams.set('primary_color', PRIMARY);
  return url.toString();
}

interface CalendlyEmbedProps {
  url: string;
  className?: string;
}

/**
 * Renders a Calendly inline booking widget that follows the site theme.
 *
 * Calendly's widget.js reads `data-url` when it initializes the inline widget.
 * To reflect a theme change we clear the container and re-initialize via
 * `window.Calendly.initInlineWidget` (falling back to a data-url div that the
 * script auto-initializes on load).
 */
export default function CalendlyEmbed({ url, className = '' }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    const themedUrl = buildUrl(url, theme === 'dark' ? 'dark' : 'light');

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        const node = containerRef.current;
        node.innerHTML = '';
        const calendly = (window as unknown as { Calendly?: {
          initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
        } }).Calendly;
        if (calendly?.initInlineWidget) {
          calendly.initInlineWidget({ url: themedUrl, parentElement: node });
        } else {
          // Fallback: the widget.js auto-scans for this class on load.
          const widget = document.createElement('div');
          widget.className = 'calendly-inline-widget';
          widget.dataset.url = themedUrl;
          widget.style.minWidth = '320px';
          widget.style.height = '100%';
          node.appendChild(widget);
        }
      })
      .catch(() => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = '';
      });

    return () => {
      cancelled = true;
      if (container) container.innerHTML = '';
    };
  }, [url, theme]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minWidth: 320 }}
      aria-label="Calendly scheduling"
    />
  );
}
