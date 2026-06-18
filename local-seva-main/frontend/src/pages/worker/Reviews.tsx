import React from 'react';
import { useNavigate } from 'react-router-dom';

const REVIEWS = [
  { id: 1, name: 'Alice M.', rating: 5, date: '2 days ago', comment: 'Very professional, arrived exactly on time and fixed my sink in under an hour.' },
  { id: 2, name: 'Bob T.', rating: 4, date: '1 week ago', comment: 'Good job, but a bit pricey.' },
  { id: 3, name: 'Carol K.', rating: 5, date: '2 weeks ago', comment: 'Lifesaver! Fixed a burst pipe at 2am.' }
];

export const Reviews: React.FC = () => {
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
    <div className="p-4 max-w-4xl mx-auto w-full pb-24">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-slate-500 hover:text-slate-800 dark:hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Customer Feedback</h1>
      </div>

      <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-8 mb-10 shadow-lg text-white flex justify-between items-center">
        <div>
          <span className="text-amber-100 font-medium mb-2 block uppercase tracking-wider text-sm">Average Rating</span>
          <div className="flex items-baseline">
            <span className="text-6xl font-black">4.8</span>
            <span className="text-amber-100 text-2xl font-bold ml-2">/ 5</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/20 p-6 rounded-2xl backdrop-blur-sm border border-white/30">
          <svg className="w-12 h-12 text-white mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
          <span className="text-white font-bold text-lg">124 Reviews</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Recent Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REVIEWS.map((review) => (
          <div key={review.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">{review.name}</h3>
              <div className="flex items-center bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-full border border-amber-100 dark:border-amber-800/50">
                {renderStars(review.rating)}
                <span className="text-amber-700 dark:text-amber-400 font-bold text-sm ml-2">{review.rating}.0</span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed mb-4 text-base">"{review.comment}"</p>
            <span className="text-xs text-slate-400 block text-right">{review.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
