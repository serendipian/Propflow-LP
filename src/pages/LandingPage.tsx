import React, { Suspense, lazy } from 'react';
import Hero from '../components/landing/Hero';

const ProblemSection = lazy(() => import('../components/landing/ProblemSection'));
const SolutionSection = lazy(() => import('../components/landing/SolutionSection'));
const FeatureHighlight = lazy(() => import('../components/landing/FeatureHighlight'));
const OperationsSection = lazy(() => import('../components/landing/OperationsSection'));
const AISection = lazy(() => import('../components/landing/AISection'));
const IntegrationsSection = lazy(() => import('../components/landing/IntegrationsSection'));
const AutomationSection = lazy(() => import('../components/landing/AutomationSection'));
const WebsiteBuilderSection = lazy(() => import('../components/landing/WebsiteBuilderSection'));
const TeamSection = lazy(() => import('../components/landing/TeamSection'));
const SocialProof = lazy(() => import('../components/landing/SocialProof'));
const PricingSection = lazy(() => import('../components/landing/PricingSection'));
const FAQ = lazy(() => import('../components/landing/FAQ'));
const BlogSection = lazy(() => import('../components/landing/BlogSection'));
const ResourcesSection = lazy(() => import('../components/landing/ResourcesSection'));
const CTASection = lazy(() => import('../components/landing/CTASection'));

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <ProblemSection />
        <SolutionSection />
        <FeatureHighlight />
        <OperationsSection />
        <AISection />
        <IntegrationsSection />
        <AutomationSection />
        <WebsiteBuilderSection />
        <TeamSection />
        <SocialProof />
        <PricingSection />
        <FAQ />
        <BlogSection />
        <ResourcesSection />
        <CTASection />
      </Suspense>
    </>
  );
}
