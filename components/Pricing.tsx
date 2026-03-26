
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Globe, Zap, MessageSquare, Bot, ArrowRight, Minus, Sparkles, Box, Webhook, Image as ImageIcon, Building2, Phone, Info } from 'lucide-react';
import { Button, SectionBadge } from './UI';

type BillingCycle = 'monthly' | 'yearly';
type PlanId = 'solo' | 'team' | 'enterprise';

export default function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('team');
  
  // Add-on States
  const [addons, setAddons] = useState({
    website: false,
    automation: false,
    inbox: false,
    api: false
  });

  // AI Slider State (0-4)
  const [aiTier, setAiTier] = useState(0);

  const aiOptions = [
    { credits: 100, label: "100", price: 0, desc: "Included" },
    { credits: 500, label: "500", price: 29, desc: "+$29" },
    { credits: 2000, label: "2k", price: 89, desc: "+$89" },
    { credits: 5000, label: "5k", price: 199, desc: "+$199" },
    { credits: 10000, label: "10k", price: 349, desc: "+$349" },
  ];

  const aiUsageRates = [
    { action: "Chat Queries", cost: 1, icon: MessageSquare },
    { action: "Listing Descriptions", cost: 5, icon: Sparkles },
    { action: "Photo Enhancements", cost: 10, icon: ImageIcon },
  ];

  // Reset add-ons when switching to Enterprise (as they are included)
  useEffect(() => {
    if (selectedPlan === 'enterprise') {
      setAddons({ 
        website: true, automation: true, inbox: true, 
        api: true 
      });
      setAiTier(4); // Max AI visually (though custom in reality)
    }
  }, [selectedPlan]);

  const basePlans = {
    solo: {
      name: 'Solo',
      desc: 'Perfect for individual agents getting started.',
      price: { monthly: 49, yearly: 39 },
      badge: null,
      categories: [
        {
            name: "INCLUDED",
            items: [
                { text: "1 User Seat", hint: "Full access for one administrator account." },
                { text: "100 AI Credits", hint: "Monthly allowance for AI tasks like descriptions." }
            ]
        },
        {
            name: "CORE MODULES",
            items: [
                { text: "Properties & Requests", hint: "Manage unlimited listings and buyer requirements." },
                { text: "Owners & Applicants", hint: "CRM for landlords and potential tenants." },
                { text: "Partners & Tasks", hint: "Collaborate with external agents and track to-dos." },
                { text: "Viewings & Follow Ups", hint: "Schedule visits and automate feedback collection." },
                { text: "Offers & Deals", hint: "Track negotiations from initial offer to closing." }
            ]
        },
        {
            name: "CORE FEATURES",
            items: [
                { text: "Pipeline Management", hint: "Visual Kanban boards for your sales process." },
                { text: "Qualification", hint: "Score leads and properties based on data." },
                { text: "Smart Matching", hint: "AI-driven property suggestions for your leads." },
                { text: "Synced Agenda", hint: "Calendar integration with Google and Outlook." },
                { text: "Accounting", hint: "Track commissions, expenses, and revenue." },
                { text: "Analytics & Reporting", hint: "Real-time performance dashboards and exports." }
            ]
        }
      ]
    },
    team: {
      name: 'Team',
      desc: 'Best for growing agencies with more traffic.',
      price: { monthly: 99, yearly: 79 },
      badge: "POPULAR",
      categories: [
        {
            name: "INCLUDED",
            items: [
                { text: "2 User Seats", hint: "Includes 1 Admin and 1 Agent seat." },
                { text: "300 AI Credits", hint: "Higher monthly allowance for your team." }
            ]
        },
        {
            name: "CORE MODULES",
            items: [
                { text: "Properties & Requests", hint: "Manage unlimited listings and buyer requirements." },
                { text: "Owners & Applicants", hint: "CRM for landlords and potential tenants." },
                { text: "Partners & Tasks", hint: "Collaborate with external agents and track to-dos." },
                { text: "Viewings & Follow Ups", hint: "Schedule visits and automate feedback collection." },
                { text: "Offers & Deals", hint: "Track negotiations from initial offer to closing." }
            ]
        },
        {
            name: "CORE FEATURES",
            items: [
                { text: "Pipeline Management", hint: "Visual Kanban boards for your sales process." },
                { text: "Qualification", hint: "Score leads and properties based on data." },
                { text: "Smart Matching", hint: "AI-driven property suggestions for your leads." },
                { text: "Synced Agenda", hint: "Calendar integration with Google and Outlook." },
                { text: "Accounting", hint: "Track commissions, expenses, and revenue." },
                { text: "Analytics & Reporting", hint: "Real-time performance dashboards and exports." }
            ]
        },
        {
            name: "COLLABORATION",
            items: [
                { text: "Role Permissions", hint: "Control access levels for different team members." },
                { text: "Team Chat", hint: "Internal messaging and collaboration tools." },
                { text: "Team Performance", hint: "Leaderboards and agent activity tracking." }
            ]
        }
      ]
    },
    enterprise: {
      name: 'Enterprise',
      desc: 'For large brokerages needing scale.',
      price: { monthly: 0, yearly: 0 },
      badge: "ADVANCED",
      categories: []
    }
  };

  const addonData = {
    website: { name: "Website Builder", price: 39, icon: Globe, desc: "SEO-Optimized public agency site." },
    automation: { name: "Advanced Automations", price: 29, icon: Zap, desc: "Visual workflow builder & triggers." },
    inbox: { name: "Unified Inbox", price: 19, icon: MessageSquare, desc: "Email, WhatsApp & SMS in one view." },
    api: { name: "API Access", price: 49, icon: Webhook, desc: "Connect to Zapier & custom tools." }
  };

  // Calculate Total Cost
  const calculateTotal = () => {
    if (selectedPlan === 'enterprise') return 0;

    const plan = basePlans[selectedPlan];
    let total = billing === 'monthly' ? plan.price.monthly : plan.price.yearly;

    // Add-ons
    if (addons.website) total += addonData.website.price;
    if (addons.automation) total += addonData.automation.price;
    if (addons.inbox) total += addonData.inbox.price;
    if (addons.api) total += addonData.api.price;
    
    // AI Cost
    total += aiOptions[aiTier].price;
    
    return total;
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-black relative overflow-hidden" id="pricing">
      
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <SectionBadge color="blue">Guaranteed Positive ROI</SectionBadge>
          <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            <span className="text-gradient">Affordable</span> Pricing,<br />
            Massive <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-10">
            Propflow pays for itself in happier, more productive agents.
          </p>

          {/* Billing Toggle - Bigger, cleaner design */}
          <div className="flex items-center justify-center bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 w-fit mx-auto shadow-sm">
            <button 
              onClick={() => setBilling('monthly')}
              className={`px-8 py-3 rounded-lg text-base font-bold transition-all duration-300 ${
                  billing === 'monthly' 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-inner' 
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBilling('yearly')}
              className={`px-8 py-3 rounded-lg text-base font-bold transition-all duration-300 relative ${
                  billing === 'yearly' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              Yearly <span className="ml-2 text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-medium">-20%</span>
            </button>
          </div>
        </div>

        {/* 1. PLAN CARDS - Unified Width with Addons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-20 px-4 items-start">
          {(Object.entries(basePlans) as [PlanId, typeof basePlans['solo']][]).map(([id, plan]) => (
            <div 
                key={id}
                onClick={() => setSelectedPlan(id)}
                className={`flex flex-col p-6 md:p-8 rounded-xl border transition-all duration-300 relative group cursor-pointer
                ${selectedPlan === id 
                    ? 'bg-white dark:bg-zinc-950 border-blue-600 ring-2 ring-blue-600 shadow-2xl scale-[1.01] z-10' 
                    : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
            >
                {/* Badge */}
                {plan.badge && (
                    <span className={`absolute top-6 right-6 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm border ${
                        selectedPlan === id 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                    }`}>
                        {plan.badge}
                    </span>
                )}

                {/* Header */}
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
                
                <p className="text-base mt-2 mb-4 leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {plan.desc}
                </p>

                {/* Price */}
                <div className="mt-2 mb-8">
                    {id === 'enterprise' ? (
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-zinc-900 dark:text-white">Custom</span>
                        </div>
                    ) : (
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                ${billing === 'monthly' ? plan.price.monthly : plan.price.yearly}
                            </span>
                            <span className="text-lg text-zinc-500 dark:text-zinc-400">/mo</span>
                        </div>
                    )}
                    <div className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">
                        {id === 'enterprise' ? 'Contact us for volume pricing' : `Billed ${billing}`}
                    </div>
                </div>

                {/* Button */}
                <button className={`w-full py-3.5 rounded-lg font-bold text-base transition-all mb-8 ${
                    id === 'enterprise' 
                        ? (selectedPlan === id ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90' : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90')
                        : (selectedPlan === id ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700')
                }`}>
                    {id === 'enterprise' ? 'Talk to us' : 'Start for free'}
                </button>

                {/* Divider */}
                {plan.categories.length > 0 && (
                    <div className="h-px w-full mb-8 bg-zinc-100 dark:bg-zinc-800" />
                )}

                {/* Features */}
                <div className="space-y-8 flex-1">
                    {plan.categories.map((cat, i) => (
                        <div key={i}>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-zinc-500 dark:text-zinc-400">
                                {cat.name}
                            </h4>
                            <ul className="space-y-4">
                                {cat.items.map((item, j) => (
                                    <li key={j} className="flex items-center justify-between text-lg group/item">
                                        <span className="text-zinc-700 dark:text-zinc-300">
                                            {item.text}
                                        </span>
                                        <div className="relative group/icon cursor-help">
                                            <Info size={16} className="text-zinc-300 dark:text-zinc-600 group-hover/item:text-zinc-400 transition-colors" />
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium rounded-xl opacity-0 group-hover/icon:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-xl text-center transform translate-y-2 group-hover/icon:translate-y-0">
                                                {item.hint}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-white" />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
          ))}
        </div>

        {/* 2. BUILDER LAYOUT */}
        
        <div className="text-center mb-8">
             <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">Need more power?</h3>
             <p className="text-xl text-zinc-500">Supercharge your workflow with add-ons and AI credits.</p>
        </div>

        <AnimatePresence mode="wait">
            <motion.div 
                key={selectedPlan === 'enterprise' ? 'ent' : 'std'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4"
            >
            {selectedPlan === 'enterprise' ? (
                 <div className="text-center p-12 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                    <Building2 className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <p className="text-zinc-500">Enterprise includes all available add-ons and custom AI limits.</p>
                 </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-24">
                    
                    {/* UNIFIED CONTAINER (2/3) - Modules AND AI */}
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col md:flex-row">
                        
                        {/* Premium Modules Column (50%) */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800">
                             <div className="flex items-center gap-2 mb-6">
                                <Box size={20} className="text-blue-600" />
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Premium Modules</h3>
                             </div>
                             
                             <div className="flex flex-col gap-3 flex-1">
                                {(Object.entries(addonData) as [keyof typeof addons, typeof addonData['website']][]).map(([key, item]) => (
                                    <div 
                                        key={key}
                                        onClick={() => setAddons(prev => ({ ...prev, [key]: !prev[key] }))}
                                        className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                            addons[key] 
                                                ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/10' 
                                                : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            {/* Left: Icon & Text */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <item.icon size={16} className={addons[key] ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400'} />
                                                    <h4 className={`text-sm font-bold ${addons[key] ? 'text-blue-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
                                                        {item.name}
                                                    </h4>
                                                </div>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                                                    {item.desc}
                                                </p>
                                            </div>

                                            {/* Right: Price */}
                                            <div className="text-right shrink-0">
                                                <div className={`text-xl font-bold ${addons[key] ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-900 dark:text-white'}`}>
                                                    ${item.price}
                                                </div>
                                                <div className="text-[10px] text-zinc-400 font-medium text-right">/mo</div>
                                            </div>
                                        </div>

                                        {/* Active Indicator Ring */}
                                        {addons[key] && (
                                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Credits Column (50%) */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col bg-zinc-50/30 dark:bg-zinc-900/30">
                             <div className="flex items-center gap-2 mb-6">
                                <Bot size={20} className="text-cyan-600 dark:text-cyan-500" />
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">AI Credits</h3>
                             </div>

                             <div className="flex flex-col justify-between flex-1">
                                
                                {/* Header Info */}
                                <div className="mb-2">
                                    <div className="flex justify-between items-end mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Selected Tier</span>
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-3xl font-bold text-zinc-900 dark:text-white">{aiOptions[aiTier].label}</span>
                                                <span className="text-sm text-zinc-500 font-medium">credits</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                                                {aiTier === 0 ? '$0' : `$${aiOptions[aiTier].price}`}
                                            </div>
                                            <div className="text-[10px] text-zinc-400 font-medium">{aiTier === 0 ? 'Included' : '/month'}</div>
                                        </div>
                                    </div>
                                    
                                    {/* Slider */}
                                    <div className="relative mb-6 pt-4 pb-2">
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="4" 
                                            step="1" 
                                            value={aiTier}
                                            onChange={(e) => setAiTier(parseInt(e.target.value))}
                                            className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-600 relative z-10"
                                        />
                                        <div className="flex justify-between mt-3 px-1">
                                            {aiOptions.map((opt, i) => (
                                                <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setAiTier(i)}>
                                                    <div className={`w-1 h-2 rounded-full transition-colors ${i === aiTier ? 'bg-cyan-600 h-2.5' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                                                    <span className={`text-[10px] font-medium transition-colors ${i === aiTier ? 'text-cyan-600 dark:text-cyan-400' : 'text-zinc-400 group-hover:text-zinc-500'}`}>
                                                        {opt.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Capacity Table */}
                                <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-zinc-50/80 dark:bg-zinc-900/50 text-[10px] uppercase text-zinc-500 font-bold border-b border-zinc-100 dark:border-zinc-700">
                                            <tr>
                                                <th className="px-3 py-2">Action</th>
                                                <th className="px-3 py-2 text-center">Cost</th>
                                                <th className="px-3 py-2 text-right">Capacity</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                                            {aiUsageRates.map((item, i) => {
                                                const capacity = Math.floor(aiOptions[aiTier].credits / item.cost);
                                                return (
                                                    <tr key={i} className="group hover:bg-zinc-50 dark:hover:bg-zinc-700/20 transition-colors">
                                                        <td className="px-3 py-2.5 text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2">
                                                            <item.icon size={12} className="text-zinc-400 group-hover:text-cyan-500 transition-colors" />
                                                            {item.action}
                                                        </td>
                                                        <td className="px-3 py-2.5 text-center text-zinc-500 text-xs">
                                                            {item.cost}
                                                        </td>
                                                        <td className="px-3 py-2.5 text-right font-mono font-bold text-zinc-900 dark:text-white">
                                                           {capacity > 1000 ? `${(capacity/1000).toFixed(1)}k` : capacity}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="px-3 py-2 bg-zinc-50/50 dark:bg-zinc-900/20 text-[9px] text-zinc-400 text-center border-t border-zinc-100 dark:border-zinc-700">
                                        Estimated monthly capacity based on {aiOptions[aiTier].label} credits.
                                    </div>
                                </div>

                             </div>
                        </div>

                    </div>

                    {/* RIGHT SECTION (1/3) - Sticky Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-3xl p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
                                {/* Decor Gradient */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-end mb-8">
                                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 text-right">Estimated Monthly Cost</span>
                                    <div className="flex items-baseline gap-1 justify-end">
                                        <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">${calculateTotal()}</span>
                                        <span className="text-lg font-medium text-zinc-400">/mo</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-4 mb-8 relative z-10">
                                    {/* Base Plan */}
                                    <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                                <Box size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-zinc-900 dark:text-white">{basePlans[selectedPlan].name} Plan</span>
                                                <span className="text-[10px] text-zinc-500">{billing === 'monthly' ? 'Billed Monthly' : 'Billed Yearly'}</span>
                                            </div>
                                        </div>
                                        <span className="font-mono font-bold text-lg text-zinc-900 dark:text-white">
                                            ${billing === 'monthly' ? basePlans[selectedPlan].price.monthly : basePlans[selectedPlan].price.yearly}
                                        </span>
                                    </div>

                                    {/* AI Credits */}
                                    <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                                                <Bot size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-zinc-900 dark:text-white">AI Credits</span>
                                                <span className="text-[10px] text-zinc-500">{aiOptions[aiTier].label} Credits</span>
                                            </div>
                                        </div>
                                        <span className="font-mono font-bold text-lg text-zinc-900 dark:text-white">
                                            {aiTier === 0 ? 'Included' : `+$${aiOptions[aiTier].price}`}
                                        </span>
                                    </div>

                                    {/* Add-ons List */}
                                    {(addons.website || addons.automation || addons.inbox || addons.api) && (
                                        <div className="pt-2 space-y-3">
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Add-ons</p>
                                            {addons.website && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-zinc-600 dark:text-zinc-300">Website Builder</span>
                                                    <span className="font-mono text-zinc-900 dark:text-white">+${addonData.website.price}</span>
                                                </div>
                                            )}
                                            {addons.automation && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-zinc-600 dark:text-zinc-300">Automations</span>
                                                    <span className="font-mono text-zinc-900 dark:text-white">+${addonData.automation.price}</span>
                                                </div>
                                            )}
                                            {addons.inbox && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-zinc-600 dark:text-zinc-300">Unified Inbox</span>
                                                    <span className="font-mono text-zinc-900 dark:text-white">+${addonData.inbox.price}</span>
                                                </div>
                                            )}
                                            {addons.api && (
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-zinc-600 dark:text-zinc-300">API Access</span>
                                                    <span className="font-mono text-zinc-900 dark:text-white">+${addonData.api.price}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <Button variant="primary" className="w-full h-14 rounded-xl text-xl font-semibold shadow-lg shadow-blue-500/20">
                                    Start Free Trial
                                </Button>
                                <div className="text-center mt-4">
                                    <span className="text-xs text-zinc-400 font-medium">No credit card required • Cancel anytime</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
