import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQS = [
  'How do I cancel a booking?',
  'How is pricing calculated?',
  'Is my payment secure?',
  'How do I become a provider?'
];

export const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="p-4 max-w-2xl mx-auto w-full pb-24">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Help & Support</h1>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-3 flex items-center mb-8 shadow-sm border border-slate-200 dark:border-slate-700">
        <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input 
          type="text" 
          placeholder="Search for help..." 
          className="bg-transparent border-none outline-none text-slate-700 dark:text-white w-full placeholder-slate-400"
        />
      </div>

      <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Frequently Asked Questions</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm mb-8 border border-slate-200 dark:border-slate-700 overflow-hidden">
        {FAQS.map((q, i) => (
          <div key={i} className="border-b border-slate-100 dark:border-slate-700 last:border-0">
            <button 
              className="w-full p-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-slate-700 dark:text-slate-200 font-medium text-left">{q}</span>
              <svg className={`w-5 h-5 text-slate-400 transform transition-transform ${openIndex === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {openIndex === i && (
              <div className="p-4 pt-0 text-slate-500 dark:text-slate-400 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/50">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Contact Us</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center hover:border-blue-500 transition">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </div>
          <span className="font-bold text-slate-800 dark:text-white">Live Chat</span>
          <span className="text-xs text-slate-500 mt-1">24/7 Available</span>
        </button>
        
        <button className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center hover:border-emerald-500 transition">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </div>
          <span className="font-bold text-slate-800 dark:text-white">Call Us</span>
          <span className="text-xs text-slate-500 mt-1">Mon-Fri, 9am-6pm</span>
        </button>
      </div>
    </div>
  );
};
