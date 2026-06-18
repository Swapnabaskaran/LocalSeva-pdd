import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Earnings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-4xl mx-auto w-full pb-24">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800 dark:hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Earnings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-3 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-3xl p-8 shadow-md text-white flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <span className="text-emerald-100 font-medium mb-2 block uppercase tracking-wider text-sm">Available for Payout</span>
            <span className="text-5xl md:text-6xl font-black">$1,240.50</span>
          </div>
          <button className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition w-full md:w-auto shadow-sm">
            Withdraw Funds
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">This Week</span>
          <span className="text-slate-800 dark:text-white text-3xl font-black">$450.00</span>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Jobs</span>
          <span className="text-slate-800 dark:text-white text-3xl font-black">24</span>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Pending Escrow</span>
          <span className="text-slate-800 dark:text-white text-3xl font-black">$120.00</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Recent Transactions</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">AC Repair Service</h3>
                <span className="text-xs text-slate-400">Oct 12 • ID: #902{item}</span>
              </div>
            </div>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">+$85.00</span>
          </div>
        ))}
      </div>
    </div>
  );
};
