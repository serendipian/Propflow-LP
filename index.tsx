import './index.css';
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

const ProblemSection = lazy(() => import('./components/ProblemSection'));
const SolutionSection = lazy(() => import('./components/SolutionSection'));
const FeatureHighlight = lazy(() => import('./components/FeatureHighlight'));
const OperationsSection = lazy(() => import('./components/OperationsSection'));
const AISection = lazy(() => import('./components/AISection'));
const IntegrationsSection = lazy(() => import('./components/IntegrationsSection'));
const AutomationSection = lazy(() => import('./components/AutomationSection'));
const WebsiteBuilderSection = lazy(() => import('./components/WebsiteBuilderSection'));
const TeamSection = lazy(() => import('./components/TeamSection'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const Pricing = lazy(() => import('./components/Pricing'));
const FAQ = lazy(() => import('./components/FAQ'));
const BlogSection = lazy(() => import('./components/BlogSection'));
const ResourcesSection = lazy(() => import('./components/ResourcesSection'));
const CTASection = lazy(() => import('./components/CTASection'));
const Footer = lazy(() => import('./components/Footer'));

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Navigation />

          <main id="main-content">
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
              <Pricing />
              <FAQ />
              <BlogSection />
              <ResourcesSection />
              <CTASection />
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
