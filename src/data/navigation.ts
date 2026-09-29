export const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '#resources' },
  { label: 'Help', href: '/contact' },
] as const;

export const siteConfig = {
  name: 'Propareto',
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
export const appUrl = 'https://app.propareto.com';
export const signUpUrl = `${appUrl}/auth/sign-up`;

// TODO: confirm these handles once the accounts are set up.
export const socialLinks = [
  { network: 'LinkedIn', href: 'https://www.linkedin.com/company/propareto' },
  { network: 'X', href: 'https://x.com/propareto' },
  { network: 'Instagram', href: 'https://www.instagram.com/propareto' },
  { network: 'Facebook', href: 'https://www.facebook.com/propareto' },
] as const;
