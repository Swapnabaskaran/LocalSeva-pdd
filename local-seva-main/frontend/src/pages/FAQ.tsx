import React from 'react';
import { LayoutList, ChevronRight, CheckCircle2 } from 'lucide-react';

export const FAQ: React.FC = () => {
  const formattedTitle = "FAQ".replace(/([A-Z])/g, ' $1').trim();
  
  return (
    <div className="p-6 max-w-5xl mx-auto page-fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
            <LayoutList className="w-8 h-8 text-primary" />
            {formattedTitle}
          </h1>
          <p className="text-slate-500 mt-2">Manage and view details for your {formattedTitle.toLowerCase()}.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-orange-600 transition-colors">
          New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Statistic {i}</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">{(Math.random() * 1000).toFixed(0)}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="p-6 border-b dark:border-slate-800 last:border-0 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">{formattedTitle} Item {i}</h3>
                <p className="text-sm text-slate-500">Active status • Updated recently</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  );
};
