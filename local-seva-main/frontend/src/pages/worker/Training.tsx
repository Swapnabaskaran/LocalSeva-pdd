import React from 'react';
import { useNavigate } from 'react-router-dom';

const VIDEOS = [
  { title: 'Customer Interaction Guidelines', duration: '5:20', icon: 'people' },
  { title: 'Using the Payment System', duration: '3:45', icon: 'card' },
  { title: 'Handling Disputes', duration: '8:10', icon: 'warning' }
];

export const Training: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-4xl mx-auto w-full pb-24">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800 dark:hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Training Center</h1>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 mb-8 shadow-lg text-white flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Safety First Module</h2>
          <p className="text-blue-100 mb-0 max-w-md">Complete the new safety guidelines module to earn your verified badge and unlock premium jobs in your area.</p>
        </div>
        <button className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-sm w-full md:w-auto">
          Start Module
        </button>
      </div>

      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Video Tutorials</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VIDEOS.map((item, index) => (
          <div key={index} className="flex items-center bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer hover:shadow-md transition hover:border-blue-200 dark:hover:border-blue-800 group">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-xl flex items-center justify-center mr-4 relative overflow-hidden flex-shrink-0">
              <svg className="w-8 h-8 text-slate-400 group-hover:scale-110 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-black/0 transition"></div>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{item.title}</h3>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Video • {item.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
