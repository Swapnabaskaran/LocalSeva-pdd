import React from 'react';
import { Star, CheckCircle, XCircle, Award, MessageSquare, TrendingUp } from 'lucide-react';

export const PerformanceMetrics: React.FC = () => {
  const metrics = {
    rating: 4.8,
    jobsCompleted: 142,
    cancellationRate: '2.1%',
    badge: 'Gold Tier',
    pointsToNext: 150
  };

  const reviews = [
    { id: 1, name: 'Rahul M.', rating: 5, comment: 'Excellent and punctual service! Will hire again.', date: '2 days ago' },
    { id: 2, name: 'Priya K.', rating: 4, comment: 'Good work, but arrived 10 mins late.', date: '1 week ago' },
    { id: 3, name: 'Anil D.', rating: 5, comment: 'Very professional. Fixed the AC in no time.', date: '2 weeks ago' },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto page-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Performance Metrics
          </h1>
          <p className="text-slate-500 text-sm">Track your progress and customer satisfaction</p>
        </div>
        
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 shadow-lg shadow-orange-500/20 text-white flex items-center gap-4">
          <Award className="w-10 h-10" />
          <div>
            <p className="text-xs uppercase tracking-wider font-bold opacity-80">Current Status</p>
            <p className="text-xl font-black">{metrics.badge}</p>
            <p className="text-xs mt-1">{metrics.pointsToNext} pts to Platinum</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Star className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Overall Rating</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">{metrics.rating} <span className="text-sm text-slate-400">/ 5.0</span></p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Jobs Completed</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">{metrics.jobsCompleted}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <XCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Cancellation Rate</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">{metrics.cancellationRate}</p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary" />
        Recent Customer Feedback
      </h2>
      <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        {reviews.map((review, index) => (
          <div key={review.id} className={`p-6 ${index !== reviews.length - 1 ? 'border-b dark:border-slate-800' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <span className="font-bold text-slate-800 dark:text-white">{review.name}</span>
              </div>
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                {review.date}
              </span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-slate-700'}`} />
              ))}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};
