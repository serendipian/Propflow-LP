import { brand } from './brand';

export const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '#resources' },
  { label: 'Help', href: '/contact' },
] as const;

export const siteConfig = {
  name: brand.name,
  tagline: 'The OS for Modern Real Estate',
  trialCta: 'Start Free Trial',
  demoCta: 'Book Demo',
  promoBar: {
    text: 'Free 30 Days Trial',
    subtext: 'No Credit Card Required!',
  },
} as const;

// The web app lives on its own subdomain. Its root sends signed-out visitors to
// /auth/sign-in and signed-in users straight into the app.
export const appUrl = brand.appUrl;
export const signUpUrl = `${appUrl}/auth/sign-up`;

// Footer icons; '#' until the brand's real accounts are added to brands.json.
export const socialLinks = brand.socials;
