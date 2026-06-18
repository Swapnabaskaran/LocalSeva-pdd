import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Schedule: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-4xl mx-auto w-full pb-24">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800 dark:hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Schedule</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Block Time
        </button>
      </div>

      {/* Calendar Strip */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex justify-between items-center mb-8 overflow-x-auto">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
          <div key={i} className={`flex flex-col items-center justify-center w-14 h-20 rounded-xl cursor-pointer transition ${i === 2 ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
            <span className={`text-xs uppercase font-bold mb-1 ${i === 2 ? 'text-blue-200' : 'text-slate-400'}`}>{day}</span>
            <span className={`text-xl font-black ${i === 2 ? 'text-white' : 'text-slate-800 dark:text-white'}`}>{10 + i}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Wednesday, Oct 12</h2>

      <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-16 space-y-8">
        {[
          { time: '09:00 AM', title: 'Plumbing Repair', address: '123 Main St, Apt 4B', color: 'bg-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { time: '11:30 AM', title: 'Pipe Installation', address: '450 West Ave', color: 'bg-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { time: '02:00 PM', title: 'Blocked Drain', address: '88 North Road', color: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' }
        ].map((item, index) => (
          <div key={index} className="relative pl-6">
            <div className={`absolute -left-[9px] top-4 w-4 h-4 rounded-full ${item.color} border-4 border-slate-50 dark:border-slate-950 z-10`} />
            <div className="absolute -left-20 top-3 w-16 text-right">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.time}</span>
            </div>
            
            <div className={`${item.bg} p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition cursor-pointer`}>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">{item.title}</h3>
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {item.address}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
