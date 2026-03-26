import './index.css';
import './lib/i18n';
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import ErrorBoundary from './components/layout/ErrorBoundary';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';

const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
