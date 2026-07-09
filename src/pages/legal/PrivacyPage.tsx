import React from 'react';
import LegalPageLayout from './LegalPageLayout';

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      documentTitle="Privacy Policy — Propflow"
      title="Privacy Policy"
      updated="Last updated: July 9, 2026"
      intro="This Privacy Policy explains how Propflow collects, uses, and protects your information when you use our website and services. By using Propflow, you agree to the practices described here."
      sections={[
        {
          heading: 'Information we collect',
          body: [
            'We collect information you provide directly to us, such as your name, work email, company name, and any details you share when you request a demo, contact us, or create an account.',
            'We also collect certain information automatically when you use our website, including your IP address, browser type, device information, and pages visited, through cookies and similar technologies.',
          ],
        },
        {
          heading: 'How we use your information',
          body: ['We use the information we collect to:'],
          bullets: [
            'Provide, operate, and improve our products and services.',
            'Respond to your requests, including demo bookings and support inquiries.',
            'Send you administrative and, where you have opted in, marketing communications.',
            'Analyze usage to improve the performance and security of our website.',
            'Comply with legal obligations and enforce our terms.',
          ],
        },
        {
          heading: 'How we share your information',
          body: [
            'We do not sell your personal information. We may share information with trusted service providers who process data on our behalf (for example, hosting, analytics, email, and scheduling providers), subject to appropriate confidentiality and security obligations.',
            'We may also disclose information where required by law, to protect our rights, or in connection with a business transfer such as a merger or acquisition.',
          ],
        },
        {
          heading: 'Data retention',
          body: [
            'We retain personal information for as long as necessary to provide our services and fulfil the purposes described in this policy, unless a longer retention period is required or permitted by law.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal information, and to object to certain processing. To exercise these rights, contact us at the address below.',
          ],
        },
        {
          heading: 'Cookies',
          body: [
            'We use cookies and similar technologies to operate our website, remember your preferences, and understand how our site is used. You can control cookies through your browser settings, though some features may not function properly without them.',
          ],
        },
        {
          heading: 'Contact us',
          body: [
            'If you have questions about this Privacy Policy or our data practices, please contact us at hello@propflow.app.',
          ],
        },
      ]}
    />
  );
}
