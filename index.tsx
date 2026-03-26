
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import FeatureHighlight from './components/FeatureHighlight';
import OperationsSection from './components/OperationsSection';
import AISection from './components/AISection';
import IntegrationsSection from './components/IntegrationsSection';
import AutomationSection from './components/AutomationSection';
import WebsiteBuilderSection from './components/WebsiteBuilderSection';
import TeamSection from './components/TeamSection';
import SocialProof from './components/SocialProof';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import BlogSection from './components/BlogSection';
import ResourcesSection from './components/ResourcesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
        <Navigation />
        
        <main>
          <Hero />
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
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
