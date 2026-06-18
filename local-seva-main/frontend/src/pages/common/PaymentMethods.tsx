import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PaymentMethods: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-2xl mx-auto w-full pb-24">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Payment Methods</h1>
      </div>

      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 ml-1">Saved Cards</h2>
      
      {/* Card 1 */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-2xl p-6 mb-6 shadow-md text-white">
        <div className="flex justify-between items-center mb-8">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          <span className="font-bold text-xl italic tracking-wider">VISA</span>
        </div>
        <p className="tracking-[0.2em] text-xl mb-3 text-slate-200">**** **** **** 4242</p>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase">Expires</span>
            <span className="text-sm font-medium">12/28</span>
          </div>
          <span className="bg-slate-700/50 px-3 py-1 rounded-full text-xs font-medium border border-slate-600">Default</span>
        </div>
      </div>

      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 ml-1 mt-8">Other Methods</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm mb-6 border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-slate-900 flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-blue-800" fill="currentColor" viewBox="0 0 24 24"><path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/></svg>
            </div>
            <span className="text-slate-700 dark:text-slate-200 font-medium">PayPal</span>
          </div>
          <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">Link</button>
        </div>
        <div className="p-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-slate-900 flex items-center justify-center mr-4">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <span className="text-slate-700 dark:text-slate-200 font-medium">UPI / Wallet</span>
          </div>
          <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">Link</button>
        </div>
      </div>

      <button className="w-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex justify-center items-center hover:bg-blue-100 dark:hover:bg-blue-900/40 transition mt-2 text-blue-600 dark:text-blue-400 font-bold">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        Add New Payment Method
      </button>
    </div>
  );
};
