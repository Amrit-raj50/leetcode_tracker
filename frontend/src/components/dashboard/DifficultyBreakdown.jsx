import React from 'react';

const DifficultyBreakdown = ({ stats }) => {
  const difficulties = [
    { label: 'Easy', count: stats?.easySolved || 0, total: stats?.easyTotal || 1, color: 'bg-emerald-400', emoji: '🟢' },
    { label: 'Medium', count: stats?.mediumSolved || 0, total: stats?.mediumTotal || 1, color: 'bg-amber-400', emoji: '🟡' },
    { label: 'Hard', count: stats?.hardSolved || 0, total: stats?.hardTotal || 1, color: 'bg-rose-400', emoji: '🔴' }
  ];

  return (
    <div className="sketch-box p-6 sm:px-8 mt-[48px] relative z-10 bg-white/80">
      <div className="flex flex-col gap-6">
        {difficulties.map((diff, idx) => {
          const percentage = Math.round((diff.count / diff.total) * 100) || 0;
          return (
            <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-h-[48px]">
              <div className="w-32 flex-shrink-0 text-2xl font-handwriting font-bold text-slate-800 flex items-center gap-2">
                <span>{diff.emoji}</span>
                <span>{diff.label}:</span>
                <span className="text-slate-600">{diff.count}</span>
              </div>
              
              <div className="flex-grow w-full h-[24px] bg-slate-200 border-2 border-slate-300 rounded-full overflow-hidden relative">
                {/* Hand-drawn scribble texture overlay could go here, but a solid color looks good enough in the sketchy border */}
                <div 
                  className={`h-full ${diff.color} transition-all duration-1000 ease-out border-r-2 border-slate-800/20`}
                  style={{ width: `${percentage}%` }}
                ></div>
                
                {/* Overlay diagonal hatch pattern for sketchy feel */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #000 5px, #000 7px)' }}
                ></div>
              </div>
              
              <div className="w-16 flex-shrink-0 text-right text-xl font-handwriting font-bold text-slate-500">
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultyBreakdown;
