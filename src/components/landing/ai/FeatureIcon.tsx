import React from 'react';
import type { LucideIcon } from 'lucide-react';

const FeatureIcon = ({ icon: Icon }: { icon: LucideIcon }) => (
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
       <Icon size={24} />
    </div>
);

export default FeatureIcon;
