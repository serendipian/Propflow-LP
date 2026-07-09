import React from 'react';
import LegalPageLayout from './LegalPageLayout';

export default function TermsPage() {
  return (
    <LegalPageLayout
      documentTitle="Terms of Service — Propflow"
      title="Terms of Service"
      updated="Last updated: July 9, 2026"
      intro="These Terms of Service govern your access to and use of Propflow's website and services. By accessing or using Propflow, you agree to be bound by these terms."
      sections={[
        {
          heading: 'Acceptance of terms',
          body: [
            'By creating an account, requesting a demo, or otherwise using our services, you confirm that you have read, understood, and agree to these Terms of Service and our Privacy Policy.',
          ],
        },
        {
          heading: 'Use of the service',
          body: ['You agree to use Propflow only for lawful purposes and in accordance with these terms. You agree not to:'],
          bullets: [
            'Use the service in any way that violates applicable laws or regulations.',
            'Attempt to gain unauthorized access to our systems or another user’s account.',
            'Interfere with or disrupt the integrity or performance of the service.',
            'Reverse engineer, copy, or resell any part of the service except as expressly permitted.',
          ],
        },
        {
          heading: 'Accounts',
          body: [
            'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us promptly of any unauthorized use.',
          ],
        },
        {
          heading: 'Free trial and billing',
          body: [
            'We may offer a free trial or promotional period. Unless otherwise stated, paid plans are billed in advance on a recurring basis. You may cancel at any time; cancellation takes effect at the end of the current billing period. We will notify you before any charge applies following a trial or promotional period.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            'Propflow and its licensors retain all rights, title, and interest in and to the service, including all related intellectual property. These terms do not grant you any rights to our trademarks or branding.',
          ],
        },
        {
          heading: 'Disclaimers and limitation of liability',
          body: [
            'The service is provided “as is” and “as available” without warranties of any kind, whether express or implied. To the fullest extent permitted by law, Propflow shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.',
          ],
        },
        {
          heading: 'Changes to these terms',
          body: [
            'We may update these terms from time to time. If we make material changes, we will provide notice as appropriate. Your continued use of the service after changes take effect constitutes acceptance of the revised terms.',
          ],
        },
        {
          heading: 'Contact us',
          body: [
            'Questions about these Terms of Service can be directed to hello@propflow.app.',
          ],
        },
      ]}
    />
  );
}
