import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import ErrorBoundary from './components/layout/ErrorBoundary';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<LandingPage />} />
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
