import React from 'react';
import { useNavigate } from 'react-router-dom';

const REVIEWS = [
  { id: 1, provider: 'John Doe (Plumber)', rating: 5, date: 'Oct 12, 2023', comment: 'Excellent service! Arrived on time and fixed the leak quickly.' },
  { id: 2, provider: 'Sarah Smith (Cleaner)', rating: 4, date: 'Sep 28, 2023', comment: 'Very thorough cleaning, but was 10 minutes late.' },
  { id: 3, provider: 'Mike Johnson (Electrician)', rating: 5, date: 'Aug 15, 2023', comment: 'Professional and courteous. Highly recommended.' },
];

export const ReviewsRatings: React.FC = () => {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star} 
            className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} 
            fill={star <= rating ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto w-full pb-24">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Reviews</h1>
      </div>

      <div className="space-y-4">
        {REVIEWS.map((review) => (
          <div key={review.id} className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-base">{review.provider}</h3>
                <span className="text-xs text-slate-400 mt-1 block">{review.date}</span>
              </div>
              {renderStars(review.rating)}
            </div>
            <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed italic border-l-4 border-blue-100 dark:border-blue-900 pl-3">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};
