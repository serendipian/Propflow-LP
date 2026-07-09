import React from 'react';
import LegalPageLayout from './LegalPageLayout';

export default function SecurityPage() {
  return (
    <LegalPageLayout
      documentTitle="Security — Propflow"
      title="Security"
      updated="Last updated: July 9, 2026"
      intro="Security is foundational to how we build Propflow. We follow industry best practices to protect your data and the integrity of our platform."
      sections={[
        {
          heading: 'Data encryption',
          body: [
            'All data is encrypted in transit using TLS and at rest using strong, industry-standard encryption. Sensitive credentials are hashed and never stored in plain text.',
          ],
        },
        {
          heading: 'Infrastructure',
          body: [
            'Propflow runs on reputable cloud infrastructure providers with robust physical and network security. Our systems are designed with redundancy and regular backups to protect against data loss.',
          ],
        },
        {
          heading: 'Access controls',
          body: [
            'We enforce the principle of least privilege. Access to production systems and customer data is restricted to authorized personnel, protected by strong authentication, and logged for accountability.',
          ],
        },
        {
          heading: 'Monitoring and response',
          body: [
            'We continuously monitor our systems for suspicious activity and maintain an incident response process to detect, contain, and remediate potential security issues promptly.',
          ],
        },
        {
          heading: 'Data privacy',
          body: [
            'We handle personal data in accordance with our Privacy Policy and applicable data protection laws. We are committed to transparency about how your data is collected, used, and protected.',
          ],
        },
        {
          heading: 'Report a vulnerability',
          body: [
            'If you believe you have found a security vulnerability, we want to hear from you. Please contact us at security@propflow.app so we can investigate and address it responsibly.',
          ],
        },
      ]}
    />
  );
}
