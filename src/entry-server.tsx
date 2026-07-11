// Build-time server entry, used only by scripts/prerender.mjs. Renders a route
// to a full HTML string (React 19 `prerender` waits for lazy routes/Suspense to
// resolve) so the static files served to crawlers contain the real page content.
import './lib/i18n';
import React from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App';

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
  return await new Response(prelude).text();
}
