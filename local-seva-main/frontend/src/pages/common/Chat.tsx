import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="mr-3 text-slate-500 hover:text-slate-800 dark:hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">John Doe</h2>
          <span className="text-xs text-emerald-500 font-medium">Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Provider Message */}
        <div className="flex">
          <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none p-3 max-w-[80%] shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-200 text-sm">Hello! I'm on my way to your location. Should be there in 15 mins.</p>
            <span className="text-[10px] text-slate-400 mt-1 block text-right">10:42 AM</span>
          </div>
        </div>

        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-blue-600 rounded-2xl rounded-tr-none p-3 max-w-[80%] shadow-sm">
            <p className="text-white text-sm">Great, thanks for letting me know! The gate code is 1234.</p>
            <span className="text-[10px] text-blue-200 mt-1 block text-right">10:45 AM</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center sticky bottom-0">
        <button className="mr-3 text-slate-400 hover:text-slate-600 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
        <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-full px-4 py-2 mr-3 flex items-center border border-slate-200 dark:border-slate-700">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..." 
            className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-white text-sm"
          />
        </div>
        <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-sm transition">
          <svg className="w-4 h-4 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </button>
      </div>
    </div>
  );
};
