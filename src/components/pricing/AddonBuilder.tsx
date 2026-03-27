import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Box, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/UI';
import { formatPrice } from '../../lib/currency';
import { aiOptions, aiUsageRates, basePlans, addonData } from '../../data/pricing';
import type { BillingCycle, PlanId } from '../../data/pricing';

interface AddonBuilderProps {
  billing: BillingCycle;
  selectedPlan: PlanId;
}

export default function AddonBuilder({ billing, selectedPlan }: AddonBuilderProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [addons, setAddons] = useState({
    website: false,
    automation: false,
    inbox: false,
    api: false,
  });
  const [aiTier, setAiTier] = useState(0);

  const isEnterprise = selectedPlan === 'enterprise';

  const calculateTotal = () => {
    if (isEnterprise) return 0;
    const plan = basePlans[selectedPlan];
    let total = billing === 'monthly' ? plan.price.monthly : plan.price.yearly;
    if (addons.website) total += addonData.website.price;
    if (addons.automation) total += addonData.automation.price;
    if (addons.inbox) total += addonData.inbox.price;
    if (addons.api) total += addonData.api.price;
    total += aiOptions[aiTier].price;
    return total;
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
          Need more power?
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Supercharge your workflow with add-ons and AI credits.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isEnterprise ? 'ent' : 'std'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {isEnterprise ? (
            <div className="text-center p-12 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <Building2 className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500">
                Enterprise includes all available add-ons and custom AI limits.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Modules + AI Container (2/3) */}
              <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col md:flex-row">
                {/* Premium Modules Column */}
                <div className="flex-1 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-6">
                    <Box size={20} className="text-blue-600" />
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      Premium Modules
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    {(
                      Object.entries(addonData) as [
                        keyof typeof addons,
                        (typeof addonData)['website'],
                      ][]
                    ).map(([key, item]) => (
                      <div
                        key={key}
                        onClick={() => setAddons((prev) => ({ ...prev, [key]: !prev[key] }))}
                        className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          addons[key]
                            ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/10'
                            : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <item.icon
                                size={16}
                                className={
                                  addons[key]
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-zinc-400'
                                }
                              />
                              <h4
                                className={`text-sm font-bold ${
                                  addons[key]
                                    ? 'text-blue-900 dark:text-white'
                                    : 'text-zinc-700 dark:text-zinc-300'
                                }`}
                              >
                                {item.name}
                              </h4>
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                              {item.desc}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <div
                              className={`text-xl font-bold ${
                                addons[key]
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-zinc-900 dark:text-white'
                              }`}
                            >
                              {formatPrice(item.price, lang)}
                            </div>
                            <div className="text-[10px] text-zinc-400 font-medium text-right">
                              {t('pricing.perMonth')}
                            </div>
                          </div>
                        </div>
                        {addons[key] && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Credits Column */}
                <div className="flex-1 p-6 md:p-8 flex flex-col bg-zinc-50/30 dark:bg-zinc-900/30">
                  <div className="flex items-center gap-2 mb-6">
                    <Bot size={20} className="text-cyan-600 dark:text-cyan-500" />
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">AI Credits</h3>
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div className="mb-2">
                      <div className="flex justify-between items-end mb-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
                            Selected Tier
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                              {aiOptions[aiTier].label}
                            </span>
                            <span className="text-sm text-zinc-500 font-medium">credits</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                            {aiTier === 0
                              ? formatPrice(0, lang)
                              : formatPrice(aiOptions[aiTier].price, lang)}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-medium">
                            {aiTier === 0 ? 'Included' : t('pricing.perMonth')}
                          </div>
                        </div>
                      </div>

                      <div className="relative mb-6 pt-4 pb-2">
                        <input
                          type="range"
                          min="0"
                          max="4"
                          step="1"
                          value={aiTier}
                          onChange={(e) => setAiTier(parseInt(e.target.value))}
                          aria-label="AI credits tier"
                          aria-valuetext={`${aiOptions[aiTier].label} credits`}
                          className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-600 relative z-10"
                        />
                        <div className="flex justify-between mt-3 px-1">
                          {aiOptions.map((opt, i) => (
                            <div
                              key={i}
                              className="flex flex-col items-center gap-2 cursor-pointer group"
                              onClick={() => setAiTier(i)}
                            >
                              <div
                                className={`w-1 h-2 rounded-full transition-colors ${
                                  i === aiTier
                                    ? 'bg-cyan-600 h-2.5'
                                    : 'bg-zinc-300 dark:bg-zinc-700'
                                }`}
                              />
                              <span
                                className={`text-[10px] font-medium transition-colors ${
                                  i === aiTier
                                    ? 'text-cyan-600 dark:text-cyan-400'
                                    : 'text-zinc-400 group-hover:text-zinc-500'
                                }`}
                              >
                                {opt.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

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
                            const capacity = Math.floor(
                              aiOptions[aiTier].credits / item.cost
                            );
                            return (
                              <tr
                                key={i}
                                className="group hover:bg-zinc-50 dark:hover:bg-zinc-700/20 transition-colors"
                              >
                                <td className="px-3 py-2.5 text-zinc-700 dark:text-zinc-300 font-medium flex items-center gap-2">
                                  <item.icon
                                    size={12}
                                    className="text-zinc-400 group-hover:text-cyan-500 transition-colors"
                                  />
                                  {item.action}
                                </td>
                                <td className="px-3 py-2.5 text-center text-zinc-500 text-xs">
                                  {item.cost}
                                </td>
                                <td className="px-3 py-2.5 text-right font-mono font-bold text-zinc-900 dark:text-white">
                                  {capacity > 1000
                                    ? `${(capacity / 1000).toFixed(1)}k`
                                    : capacity}
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

              {/* Summary Panel (1/3) */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-3xl p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-end mb-8">
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 text-right">
                        Estimated Monthly Cost
                      </span>
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                          {formatPrice(calculateTotal(), lang)}
                        </span>
                        <span className="text-lg font-medium text-zinc-400">
                          {t('pricing.perMonth')}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4 mb-8 relative z-10">
                      <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <Box size={16} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-zinc-900 dark:text-white">
                              {basePlans[selectedPlan].name} Plan
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {billing === 'monthly' ? 'Billed Monthly' : 'Billed Yearly'}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-lg text-zinc-900 dark:text-white">
                          {formatPrice(
                            billing === 'monthly'
                              ? basePlans[selectedPlan].price.monthly
                              : basePlans[selectedPlan].price.yearly,
                            lang
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                            <Bot size={16} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-zinc-900 dark:text-white">
                              AI Credits
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {aiOptions[aiTier].label} Credits
                            </span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-lg text-zinc-900 dark:text-white">
                          {aiTier === 0
                            ? 'Included'
                            : `+${formatPrice(aiOptions[aiTier].price, lang)}`}
                        </span>
                      </div>
                      {(addons.website || addons.automation || addons.inbox || addons.api) && (
                        <div className="pt-2 space-y-3">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                            Add-ons
                          </p>
                          {addons.website && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-zinc-600 dark:text-zinc-300">
                                Website Builder
                              </span>
                              <span className="font-mono text-zinc-900 dark:text-white">
                                +{formatPrice(addonData.website.price, lang)}
                              </span>
                            </div>
                          )}
                          {addons.automation && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-zinc-600 dark:text-zinc-300">Automations</span>
                              <span className="font-mono text-zinc-900 dark:text-white">
                                +{formatPrice(addonData.automation.price, lang)}
                              </span>
                            </div>
                          )}
                          {addons.inbox && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-zinc-600 dark:text-zinc-300">
                                Unified Inbox
                              </span>
                              <span className="font-mono text-zinc-900 dark:text-white">
                                +{formatPrice(addonData.inbox.price, lang)}
                              </span>
                            </div>
                          )}
                          {addons.api && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-zinc-600 dark:text-zinc-300">API Access</span>
                              <span className="font-mono text-zinc-900 dark:text-white">
                                +{formatPrice(addonData.api.price, lang)}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      className="w-full h-14 rounded-xl text-xl font-semibold shadow-lg shadow-blue-500/20"
                    >
                      Start Free Trial
                    </Button>
                    <div className="text-center mt-4">
                      <span className="text-xs text-zinc-400 font-medium">
                        No credit card required &bull; Cancel anytime
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
