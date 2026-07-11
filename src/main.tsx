import './index.css';
import './lib/i18n';
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './hooks/useTheme';
import ErrorBoundary from './components/layout/ErrorBoundary';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';

const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const SecurityPage = lazy(() => import('./pages/legal/SecurityPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        {/* reducedMotion="user" makes every framer-motion animation honor the OS
            prefers-reduced-motion setting (the CSS media query can't reach JS animations) */}
        <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="pricing" element={
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
                  <PricingPage />
                </Suspense>
              } />
              <Route path="contact" element={
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
                  <ContactPage />
                </Suspense>
              } />
              <Route path="book-a-demo" element={
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
                  <DemoPage />
                </Suspense>
              } />
              <Route path="features" element={
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
                  <FeaturesPage />
                </Suspense>
              } />
              <Route path="solutions" element={
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
                  <SolutionsPage />
                </Suspense>
              } />
              <Route path="privacy" element={
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
                  <PrivacyPage />
                </Suspense>
              } />
              <Route path="terms" element={
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
                  <TermsPage />
                </Suspense>
              } />
              <Route path="security" element={
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
                  <SecurityPage />
                </Suspense>
              } />
              {/* Catch-all: direct hits on unknown URLs are served dist/404.html
                  (real 404 status) by Vercel; this route covers client-side
                  navigation to broken in-app links. */}
              <Route path="*" element={
                <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-950" />}>
                  <NotFoundPage />
                </Suspense>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
        </MotionConfig>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
