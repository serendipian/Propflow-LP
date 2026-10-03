// The site is built for one brand at a time. Everything brand-specific (name,
// domains, emails, socials, share image, logo wordmark) comes from brands.json,
// so a second market (Propdeal for the UAE) is a new entry there plus its own
// wordmark in Logo.tsx, built with VITE_BRAND=<id> as a separate deployment.
// The build scripts (scripts/route-seo.mjs) read the same JSON.
import brands from './brands.json';

export type BrandId = keyof typeof brands;
export type Social = { network: 'LinkedIn' | 'X' | 'Instagram' | 'Facebook'; href: string };

const id = (import.meta.env.VITE_BRAND ?? 'propflow') as BrandId;
if (!(id in brands)) throw new Error(`Unknown VITE_BRAND "${id}"`);
const data = brands[id];

export const brand = {
  id,
  ...data,
  appHost: new URL(data.appUrl).host,
  socials: data.socials as Social[],
};
