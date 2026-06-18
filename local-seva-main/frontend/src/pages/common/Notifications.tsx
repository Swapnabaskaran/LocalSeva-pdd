import React from 'react';
import { useNavigate } from 'react-router-dom';

const NOTIFICATIONS = [
  { id: 1, title: 'Booking Confirmed!', desc: 'Your plumber has accepted the request.', time: '10 mins ago', read: false },
  { id: 2, title: 'Service Completed', desc: 'Please rate your recent electrical service.', time: '2 hours ago', read: false },
  { id: 3, title: 'Promo Offer', desc: 'Get 20% off your next cleaning booking.', time: '1 day ago', read: true },
];

export const Notifications: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-2xl mx-auto w-full pb-24">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Notifications</h1>
      </div>

      <div className="space-y-3">
        {NOTIFICATIONS.map((item) => (
          <div 
            key={item.id} 
            className={`p-4 rounded-xl flex items-center border cursor-pointer transition ${item.read ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 hover:bg-blue-100/50'}`}
          >
            <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center mr-4 ${item.read ? 'bg-slate-100 dark:bg-slate-700' : 'bg-blue-100 dark:bg-blue-800'}`}>
              <svg className={`w-6 h-6 ${item.read ? 'text-slate-500' : 'text-blue-600 dark:text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className={`font-bold ${item.read ? 'text-slate-700 dark:text-slate-200' : 'text-blue-900 dark:text-blue-300'}`}>{item.title}</h3>
                <span className="text-xs text-slate-500">{item.time}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
