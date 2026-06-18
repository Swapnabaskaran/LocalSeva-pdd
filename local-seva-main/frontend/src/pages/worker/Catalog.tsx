import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([
    { id: 1, name: 'Basic Plumbing Repair', price: '$50', active: true },
    { id: 2, name: 'Pipe Installation', price: '$120', active: true },
    { id: 3, name: 'Water Heater Service', price: '$80', active: false },
  ]);

  const toggleService = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto w-full pb-24">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800 dark:hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Catalog</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Service
        </button>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-xl">
        Manage the services you offer. Toggle the switch to hide a service from your public profile when you are too busy, and click Edit to update pricing and descriptions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition duration-300 ${service.active ? 'border-blue-100 dark:border-blue-900/50 hover:shadow-md' : 'border-slate-100 dark:border-slate-700 opacity-60'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-bold text-slate-800 dark:text-white text-xl pr-4">{service.name}</h3>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input type="checkbox" className="sr-only peer" checked={service.active} onChange={() => toggleService(service.id)} />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-end pt-4 border-t border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-1">Base Price</span>
                <span className="text-blue-600 dark:text-blue-400 font-black text-2xl">{service.price}</span>
              </div>
              <button className="flex items-center bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <svg className="w-4 h-4 text-slate-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                <span className="text-slate-600 dark:text-slate-300 font-bold text-sm">Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
