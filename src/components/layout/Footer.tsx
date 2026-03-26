
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 pt-20 pb-10 border-t border-zinc-200 dark:border-zinc-900 text-sm">
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm opacity-90" />
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-white">Propflow</span>
          </div>
          <p className="text-zinc-500 mb-6">The operating system for modern real estate agencies.</p>
          <div className="flex gap-4">
            {/* Social icons placeholder */}
            <div className="w-8 h-8 rounded bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800" />
            <div className="w-8 h-8 rounded bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800" />
            <div className="w-8 h-8 rounded bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800" />
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Product</h4>
          <ul className="space-y-2 text-zinc-500">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Pipeline</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Listings</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Automations</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Mobile App</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Company</h4>
          <ul className="space-y-2 text-zinc-500">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Customers</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Careers</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-zinc-500">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Security</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-screen-2xl mx-auto px-6 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center text-zinc-500">
        <p>&copy; 2024 Propflow Inc. All rights reserved.</p>
        <p>Designed for the future.</p>
      </div>
    </footer>
  );
}
