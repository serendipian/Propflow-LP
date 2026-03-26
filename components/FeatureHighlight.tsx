
import React, { useState } from 'react';
import { 
  Building, Users, Search,
  CheckSquare, UserCircle, Handshake,
  Eye, FileSignature, Receipt, History,
  MapPin, BedDouble, Bath, Maximize, Filter, Plus,
  ChevronDown, LayoutGrid, AlignJustify, Map, Columns3
} from 'lucide-react';
import { SectionBadge } from './UI';
import { motion, AnimatePresence } from 'framer-motion';

const modules = [
  { id: 'properties', label: 'Properties', icon: Building, color: 'blue', desc: 'Manage Sales & Rentals. Auto-match listings with active Requests instantly.' },
  { id: 'requests', label: 'Requests', icon: Search, color: 'blue', desc: 'Track buyer & tenant criteria. Receive AI-driven match alerts.' },
  { id: 'owners', label: 'Owners', icon: UserCircle, color: 'blue', desc: 'Link properties to owners. Manage mandates and communication history.' },
  { id: 'applicants', label: 'Applicants', icon: Users, color: 'blue', desc: 'Qualify buyers & tenants. Smart scoring and requirement tracking.' },
  { id: 'partners', label: 'Partners', icon: Handshake, color: 'blue', desc: 'Collaborate with external agents, track referrals, and split commissions.' },
  { id: 'expenses', label: 'Expenses', icon: Receipt, color: 'blue', desc: 'Log property-specific costs, maintenance fees, and marketing spend.' },
  { id: 'followups', label: 'Follow Ups', icon: History, color: 'blue', desc: 'Never lose a lead. Automated reminders for calls, emails, and check-ins.' },
  { id: 'viewings', label: 'Viewings', icon: Eye, color: 'blue', desc: 'Schedule visits, sync with calendars, and collect feedback automatically.' },
  { id: 'offers', label: 'Offers', icon: FileSignature, color: 'blue', desc: 'Digital offer management workflow. From initial bid to closed deal.' },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare, color: 'blue', desc: 'Smart checklists and team assignments. Never drop the ball on a lead.' },
];

export default function FeatureHighlight() {
  const [activeId, setActiveId] = useState('properties');

  const activeModule = modules.find(m => m.id === activeId) || modules[0];

  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <SectionBadge color="blue">10+ Connected Modules</SectionBadge>
          <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
             Centralize Your <br className="hidden md:block"/> Agency's <span className="text-gradient">Database</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
             Centralize Your Agency's Workflow. Link people, properties, and processes seamlessly.
          </p>
        </div>

        {/* BOXED LAYOUT CONTAINER - Width Reduced to 1100px */}
        <div className="max-w-[1100px] mx-auto bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[600px]">
            
            {/* SIDEBAR (TABS) - Evenly Distributed */}
            <div className="lg:w-64 bg-zinc-50/50 dark:bg-zinc-950/50 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full shrink-0">
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 lg:hidden">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Select Module</span>
                </div>
                {/* Removed padding and gap, added flex-1 to buttons to distribute height evenly */}
                <div className="flex-1 overflow-y-auto lg:overflow-hidden custom-scrollbar flex flex-col h-full">
                    {modules.map((module) => {
                    const isActive = activeId === module.id;
                    return (
                        <button
                        key={module.id}
                        onClick={() => setActiveId(module.id)}
                        className={`flex-1 flex items-center gap-3 px-6 text-left transition-all duration-200 group relative border-b border-zinc-100/50 dark:border-zinc-800/50 last:border-0 ${
                            isActive 
                            ? 'bg-white dark:bg-zinc-900 z-10' 
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400'
                        }`}
                        >
                        {/* Active Indicator Line */}
                        {isActive && (
                            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-blue-500`} />
                        )}
                        
                        <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center transition-colors ${
                            isActive 
                            ? `text-blue-600 dark:text-blue-400` 
                            : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                        }`}>
                            <module.icon size={18} />
                        </div>
                        {/* Increased font size to text-base */}
                        <span className={`block font-medium text-base ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                            {module.label}
                        </span>
                        </button>
                    );
                    })}
                </div>
            </div>

            {/* PREVIEW CONTENT */}
            <div className="flex-1 bg-white dark:bg-zinc-900 relative flex flex-col min-w-0 h-[600px] lg:h-auto">
                
                {/* Header - Compact Version */}
                <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-500/10`}>
                                <activeModule.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-0.5">{activeModule.label}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-snug max-w-lg line-clamp-1">
                                    {activeModule.desc}
                                </p>
                            </div>
                        </div>

                        {/* Decorative Tag */}
                         <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 self-start mt-1">
                            <div className={`w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse`} />
                            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Live</span>
                         </div>
                    </div>
                </div>

                {/* Visualization Canvas */}
                <div className="flex-1 bg-zinc-50 dark:bg-black/20 p-4 md:p-6 relative overflow-hidden">
                     <AnimatePresence mode="wait">
                        <motion.div
                            key={activeId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="w-full h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden flex flex-col"
                        >
                            {/* Inner App Bar */}
                            <div className="h-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-3 gap-2 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                </div>
                            </div>
                            
                            {/* Content Area */}
                            <div className="flex-1 relative bg-zinc-50/50 dark:bg-zinc-900/50 overflow-hidden">
                                <ModuleVisualization id={activeId} color={activeModule.color} />
                            </div>
                        </motion.div>
                     </AnimatePresence>
                </div>

            </div>

        </div>

      </div>
    </section>
  );
}

// --- Reusable Screen Components ---

const ModuleToolbar = ({ color, actionLabel, searchPlaceholder = "Search..." }: { color: string, actionLabel: string, searchPlaceholder?: string }) => (
  <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center gap-4 shrink-0 bg-white dark:bg-zinc-900">
    <div className="relative flex-1 max-w-md">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
      <input 
        type="text" 
        placeholder={searchPlaceholder} 
        className="w-full pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400"
      />
    </div>
    <button className={`flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors`}>
      <Plus size={14} strokeWidth={2.5} />
      <span className="hidden sm:inline">{actionLabel}</span>
    </button>
  </div>
);

const ModuleFilters = ({ filters = [] }: { filters: string[] }) => {
  const [view, setView] = useState('card');
  return (
    <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
        {filters.map((filter) => (
          <button key={filter} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
            {filter}
            <ChevronDown size={10} className="opacity-50" />
          </button>
        ))}
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap">
          Clear
        </button>
      </div>
      <div className="flex items-center bg-zinc-200/50 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700 self-start sm:self-auto shrink-0">
        {[
            { id: 'list', icon: AlignJustify, label: 'Table' },
            { id: 'card', icon: LayoutGrid, label: 'Card' },
            { id: 'kanban', icon: Columns3, label: 'Kanban' },
            { id: 'map', icon: Map, label: 'Map' }
        ].map((v) => (
            <button 
                key={v.id}
                onClick={() => setView(v.id)}
                title={v.label}
                className={`p-1.5 rounded-md transition-all ${view === v.id ? 'bg-white dark:bg-zinc-600 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}
            >
                <v.icon size={14} />
            </button>
        ))}
      </div>
    </div>
  );
};

// --- Dynamic Visualization Component ---

const ModuleVisualization = ({ id, color }: { id: string, color: string }) => {
   switch (id) {
      case 'properties':
         return (
            <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
               <ModuleToolbar color={color} actionLabel="Add Property" searchPlaceholder="Search address..." />
               <ModuleFilters filters={['Type', 'City', 'Area', 'Price', 'Status']} />

               {/* Property Grid - 3 Columns */}
               <div className="flex-1 bg-zinc-50/30 dark:bg-black/20 overflow-y-auto custom-scrollbar p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { img: "1605276374104-dee2a0ed3cd6", price: "$4,500,000", address: "128 Golden Oak Dr, CA", beds: 4, baths: 3, sqft: "2,400", status: "Active" },
                        { img: "1512917774080-9991f1c4c750", price: "$2,100,000", address: "85 North Lake Ave, NY", beds: 3, baths: 2, sqft: "1,850", status: "Pending" },
                        { img: "1600585154340-be6161a56a0c", price: "$850,000", address: "42 Pine Street, TX", beds: 2, baths: 2, sqft: "1,200", status: "Active" },
                        { img: "1600047509807-ba8f99d2cdde", price: "$3,250,000", address: "90210 Beverly Hills, CA", beds: 5, baths: 4, sqft: "4,200", status: "Sold" },
                        { img: "1600607687939-ce8a6c25118c", price: "$1,200,000", address: "15 Westfield Blvd, UK", beds: 3, baths: 2, sqft: "1,500", status: "Active" },
                        { img: "1600566753190-17f0baa2a6c3", price: "$6,800,000", address: "220 Central Park S, NY", beds: 4, baths: 4.5, sqft: "3,100", status: "Active" }
                      ].map((prop, i) => (
                        <div key={i} className="group bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg dark:hover:shadow-blue-900/10 hover:border-blue-300 dark:hover:border-blue-700/50 transition-all duration-300 flex flex-col">
                            {/* Image Section - Reduced Height */}
                            <div className="h-28 relative overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                              <img 
                                  src={`https://images.unsplash.com/photo-${prop.img}?auto=format&fit=crop&w=400&q=80`} 
                                  alt={prop.address}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold text-white uppercase tracking-wide">
                                  For Sale
                              </div>
                              <div className={`absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shadow-sm ${
                                  prop.status === 'Active' ? 'bg-blue-600 text-white' : 
                                  prop.status === 'Pending' ? 'bg-amber-500 text-white' : 
                                  'bg-zinc-50 text-white'
                              }`}>
                                  {prop.status}
                              </div>
                            </div>

                            {/* Details Section */}
                            <div className="p-2.5 flex flex-col gap-2 flex-1">
                              <div className="flex justify-between items-start">
                                  <div>
                                    <div className="text-sm font-bold text-zinc-900 dark:text-white">{prop.price}</div>
                                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                                        <MapPin size={10} /> {prop.address}
                                    </div>
                                  </div>
                              </div>

                              <div className="h-px bg-zinc-100 dark:bg-zinc-800 w-full my-1" />

                              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                                  <div className="flex items-center gap-1 text-[10px]">
                                    <BedDouble size={12} className="text-zinc-400" /> {prop.beds}
                                  </div>
                                  <div className="flex items-center gap-1 text-[10px]">
                                    <Bath size={12} className="text-zinc-400" /> {prop.baths}
                                  </div>
                                  <div className="flex items-center gap-1 text-[10px]">
                                    <Maximize size={12} className="text-zinc-400" /> {prop.sqft}
                                  </div>
                              </div>
                            </div>
                        </div>
                      ))}
                  </div>
               </div>
            </div>
         );

      case 'requests':
         return (
            <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
               <ModuleToolbar color={color} actionLabel="Add Request" searchPlaceholder="Search requests..." />
               <ModuleFilters filters={['Budget', 'Type', 'Location', 'Urgency']} />
               
               <div className="p-4 grid grid-cols-1 gap-3 h-full overflow-y-auto custom-scrollbar content-start bg-zinc-50/30 dark:bg-black/20">
                  {[1, 2, 3, 4].map(i => (
                      <div key={i} className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col gap-2 relative">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center font-bold text-xs`}>
                                    {['JD', 'AS', 'MK', 'LB'][i-1]}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-zinc-900 dark:text-white">3 Bed Apartment</div>
                                    <div className="text-[10px] text-zinc-500">Budget: $4k - $5k/mo</div>
                                </div>
                            </div>
                            <div className={`px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-[9px] font-bold`}>
                                2 Matches
                            </div>
                        </div>
                        <div className="flex gap-1 flex-wrap mt-1">
                            <span className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[9px] rounded">Downtown</span>
                            <span className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[9px] rounded">Balcony</span>
                        </div>
                      </div>
                  ))}
               </div>
            </div>
         );

      case 'owners':
      case 'applicants':
      case 'partners':
         const entity = id === 'owners' ? 'Owner' : id === 'applicants' ? 'Applicant' : 'Partner';
         return (
            <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
               <ModuleToolbar color={color} actionLabel={`Add ${entity}`} searchPlaceholder={`Search ${id}...`} />
               <ModuleFilters filters={['Status', 'Type', 'Date Added']} />

               <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 content-start h-full overflow-y-auto custom-scrollbar bg-zinc-50/30 dark:bg-black/20">
                  {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                        <div className={`w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600`}>
                            <UserCircle size={18} />
                        </div>
                        <div className="flex-1 space-y-1.5">
                            <div className="h-2.5 w-1/3 bg-zinc-200 dark:bg-zinc-700 rounded" />
                            <div className="h-2 w-1/4 bg-zinc-100 dark:bg-zinc-800 rounded" />
                        </div>
                        <div className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-[9px] text-zinc-500">View</div>
                      </div>
                  ))}
               </div>
            </div>
         );
      
      case 'expenses':
         return (
            <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
               <ModuleToolbar color={color} actionLabel="Add Expense" searchPlaceholder="Search expenses..." />
               <ModuleFilters filters={['Category', 'Date', 'Status']} />

               <div className="p-4 flex flex-col gap-3 h-full overflow-y-auto custom-scrollbar bg-zinc-50/30 dark:bg-black/20">
                  <div className="flex justify-between items-end pb-2 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="text-xs font-semibold text-zinc-500">Recent Transactions</span>
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">-$2,450.00</span>
                  </div>
                  {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500`}>
                              <Receipt size={14} />
                            </div>
                            <div className="flex flex-col">
                              <div className="h-2 w-24 bg-zinc-200 dark:bg-zinc-700 rounded mb-1.5" />
                              <div className="h-1.5 w-16 bg-zinc-100 dark:bg-zinc-800 rounded" />
                            </div>
                        </div>
                        <div className="h-2 w-12 bg-zinc-200 dark:bg-zinc-700 rounded" />
                      </div>
                  ))}
               </div>
            </div>
         );

      case 'followups':
         return (
            <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
               <ModuleToolbar color={color} actionLabel="Add Task" searchPlaceholder="Search tasks..." />
               <ModuleFilters filters={['Due Date', 'Type', 'Priority']} />

               <div className="p-4 grid grid-cols-1 gap-3 h-full overflow-y-auto custom-scrollbar content-start bg-zinc-50/30 dark:bg-black/20">
                  {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex gap-3 relative pl-4">
                        <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 ${i === 2 ? 'bg-gradient-to-b from-zinc-200 to-transparent dark:from-zinc-800' : ''}`} />
                        <div className={`absolute left-[-2.5px] top-4 w-1.5 h-1.5 rounded-full ${i===0 ? 'bg-blue-500' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                        <div className="flex-1 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
                            <div className="flex justify-between mb-2">
                              <div className="h-2 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
                              <div className="h-2 w-8 bg-zinc-100 dark:bg-zinc-800 rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                              <div className="h-1.5 w-32 bg-zinc-100 dark:bg-zinc-800 rounded" />
                            </div>
                        </div>
                      </div>
                  ))}
               </div>
            </div>
         );

      case 'viewings':
         return (
            <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
               <ModuleToolbar color={color} actionLabel="Add Viewing" searchPlaceholder="Search viewings..." />
               <ModuleFilters filters={['Agent', 'Date', 'Status']} />
               
               <div className="p-4 flex flex-col h-full overflow-y-auto custom-scrollbar bg-zinc-50/30 dark:bg-black/20">
                  <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                      {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
                  </div>
                  <div className="flex-1 grid grid-cols-7 grid-rows-4 gap-1">
                      {Array.from({length: 28}).map((_, i) => (
                        <div key={i} className={`rounded-md border relative transition-colors ${i === 12 || i === 22 ? `bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800` : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                            <span className="absolute top-1 left-1 text-[8px] text-zinc-400">{i + 1}</span>
                            {(i === 12 || i === 22) && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`w-1.5 h-1.5 rounded-full bg-blue-500`} />
                                </div>
                            )}
                        </div>
                      ))}
                  </div>
               </div>
            </div>
         );

      case 'tasks':
         return (
            <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
               <ModuleToolbar color={color} actionLabel="Add Task" searchPlaceholder="Search tasks..." />
               <ModuleFilters filters={['My Tasks', 'Due Date', 'Priority', 'Assignee']} />

               <div className="flex-1 bg-zinc-50/30 dark:bg-black/20 overflow-y-auto custom-scrollbar p-4">
                  <div className="flex flex-col gap-2">
                     {[
                        { title: "Prepare contract for 128 Golden Oak", due: "Today", priority: "High", user: "1", status: false },
                        { title: "Follow up with Sarah regarding viewing", due: "Tomorrow", priority: "Medium", user: "2", status: true },
                        { title: "Update listing photos for Downtown Loft", due: "Fri", priority: "Low", user: "3", status: false },
                        { title: "Send monthly report to Landlord Mike", due: "Next Week", priority: "High", user: "1", status: false },
                        { title: "Key handover for Unit 4B", due: "Oct 12", priority: "Medium", user: "4", status: true },
                        { title: "Review applicant documents", due: "Oct 15", priority: "High", user: "5", status: false },
                     ].map((task, i) => (
                        <div key={i} className="group flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm">
                           
                           <div className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${task.status ? 'bg-blue-500 border-blue-500' : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 group-hover:border-blue-400'}`}>
                              {task.status && <CheckSquare size={12} className="text-white" />}
                           </div>

                           <div className="flex-1 min-w-0">
                              <div className={`text-sm font-medium truncate ${task.status ? 'text-zinc-400 line-through' : 'text-zinc-900 dark:text-white'}`}>
                                 {task.title}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                 <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400`}>
                                    {task.priority}
                                 </span>
                                 <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                                    Due {task.due}
                                 </span>
                              </div>
                           </div>

                           <div className="flex -space-x-2 shrink-0">
                               <img src={`https://i.pravatar.cc/150?img=${task.user}`} alt={`Assigned to task: ${task.title}`} className="w-6 h-6 rounded-full border border-white dark:border-zinc-900" />
                           </div>
                           
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         );

      case 'offers':
      default:
         return (
            <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
               <ModuleToolbar color={color} actionLabel="Add Offer" searchPlaceholder={`Search ${id}...`} />
               <ModuleFilters filters={['Priority', 'Status', 'Date']} />

               <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2 content-start h-full overflow-y-auto custom-scrollbar bg-zinc-50/30 dark:bg-black/20">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="flex items-center gap-3 p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-sm transition-all">
                        <div className={`w-4 h-4 rounded border-2 border-blue-200 dark:border-blue-800 flex items-center justify-center`}>
                            {i < 3 && <div className={`w-2.5 h-2.5 bg-blue-500 rounded-[1px]`} />}
                        </div>
                        <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded" />
                        {i === 1 && <div className={`px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded text-[8px] font-bold text-blue-500 uppercase`}>Urgent</div>}
                      </div>
                  ))}
               </div>
            </div>
         );
   }
}
