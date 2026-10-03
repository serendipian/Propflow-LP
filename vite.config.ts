/// <reference types="vitest/config" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import brands from './src/data/brands.json';

// index.html carries %BRAND_NAME% / %SITE_URL% / %OG_IMAGE% placeholders, filled
// from the brand being built (VITE_BRAND, default propflow; see src/data/brand.ts).
const brand = brands[(process.env.VITE_BRAND ?? 'propflow') as keyof typeof brands];
if (!brand) throw new Error(`Unknown VITE_BRAND "${process.env.VITE_BRAND}"`);
const brandHtml = {
  name: 'brand-html',
  transformIndexHtml: (html: string) =>
    html
      .replaceAll('%BRAND_NAME%', brand.name)
      .replaceAll('%SITE_URL%', brand.siteUrl)
      .replaceAll('%OG_IMAGE%', brand.siteUrl + brand.ogImage),
};

export default defineConfig({
  server: {
    port: 3000,
    host: 'localhost',
  },
  plugins: [react(), brandHtml],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});
