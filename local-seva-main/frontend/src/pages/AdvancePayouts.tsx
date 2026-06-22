import React, { useState } from 'react';
import { IndianRupee, ArrowRight, History, AlertCircle, Clock, CheckCircle } from 'lucide-react';

export const AdvancePayouts: React.FC = () => {
  const [amount, setAmount] = useState('');
  const availableBalance = 4500;
  const earlyFeePercentage = 2.5;

  const history = [
    { id: 'TRX-9921', date: '12 Jun 2026', amount: 2000, status: 'Completed' },
    { id: 'TRX-8834', date: '05 May 2026', amount: 1500, status: 'Completed' },
    { id: 'TRX-7742', date: '18 Apr 2026', amount: 3000, status: 'Completed' },
  ];

  const calculateFee = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return 0;
    return (val * earlyFeePercentage) / 100;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto page-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
          <IndianRupee className="w-6 h-6 text-primary" />
          Advance Payouts
        </h1>
        <p className="text-slate-500 text-sm">Request early access to your hard-earned money.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Col: Request Form */}
        <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 p-6 rounded-3xl shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Eligible Balance</p>
            <p className="text-4xl font-black text-slate-800 dark:text-white mt-1">₹{availableBalance.toLocaleString()}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                Withdrawal Amount
              </label>
              <div className="relative">
                <IndianRupee className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-12 pr-4 py-3 border rounded-xl bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                  max={availableBalance}
                />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Requested Amount</span>
                <span className="font-bold text-slate-800 dark:text-white">₹{amount ? parseFloat(amount).toLocaleString() : '0'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Early Access Fee ({earlyFeePercentage}%)</span>
                <span className="font-bold text-red-500">- ₹{calculateFee().toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t dark:border-slate-700 flex justify-between">
                <span className="font-bold text-slate-800 dark:text-white">You will receive</span>
                <span className="font-black text-green-600 text-lg">
                  ₹{amount && !isNaN(parseFloat(amount)) ? (parseFloat(amount) - calculateFee()).toLocaleString() : '0'}
                </span>
              </div>
            </div>

            <button
              disabled={!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0 || parseFloat(amount) > availableBalance}
              className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-lg shadow-primary/30 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Request Transfer <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="flex items-start gap-2 text-xs text-slate-400 mt-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>Transfers are usually processed within 2 hours. A standard early access fee applies to all advance requests.</p>
            </div>
          </div>
        </div>

        {/* Right Col: History */}
        <div>
          <h2 className="text-lg font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Recent Payouts
          </h2>
          <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
            {history.map((item, idx) => (
              <div key={item.id} className={`p-5 flex items-center justify-between ${idx !== history.length - 1 ? 'border-b dark:border-slate-800' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">₹{item.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-400 font-medium">{item.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">{item.status}</p>
                  <p className="text-xs text-slate-400">{item.date}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-4 text-sm font-bold text-primary hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-t dark:border-slate-800">
              View All History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
