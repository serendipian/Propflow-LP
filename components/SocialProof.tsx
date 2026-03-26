import React from 'react';

export default function SocialProof() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900 relative">
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-[1px]" />

      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">They Trusted Us</h2>
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
                  3x
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Faster Deal Velocity</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">Agencies close deals 3x faster after switching from spreadsheets.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
                  15h
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Saved Per Week</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1">Automated data entry and follow-ups free up massive time.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 md:p-10 rounded-2xl relative shadow-2xl dark:shadow-[0_0_50px_-20px_rgba(0,0,0,0.5)]">
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold px-6 py-4 rounded-xl shadow-lg transform rotate-6 z-10">
              "Game Changer"
            </div>
            <p className="text-xl text-zinc-700 dark:text-zinc-300 italic mb-8 leading-relaxed">"Propflow transformed how we operate. We went from chaotic WhatsApp groups to a streamlined machine. Our revenue is up 40% YoY."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                 <img src="https://i.pravatar.cc/150?img=11" alt="David Ross, Principal at Ross Realty Group" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-zinc-900 dark:text-white font-bold">David Ross</p>
                <p className="text-zinc-500 text-sm">Principal, Ross Realty Group</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}