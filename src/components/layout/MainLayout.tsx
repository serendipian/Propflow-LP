import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import ScrollToTop from '../shared/ScrollToTop';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
      <ScrollToTop />
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <Outlet />
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
