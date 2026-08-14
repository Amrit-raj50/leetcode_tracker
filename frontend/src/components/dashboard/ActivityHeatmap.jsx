import React from 'react';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const ActivityHeatmap = ({ activityData }) => {
  const today = new Date();
  const startDate = subDays(today, 29);
  
  const days = eachDayOfInterval({ start: startDate, end: today });
  
  const getStatus = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    if (activityData?.includes(dateStr)) return 'active';
    if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) return 'today';
    return 'inactive';
  };

  return (
    <div className="sketch-box p-6 mt-8 relative z-10 bg-white/80 max-w-2xl mx-auto">
      <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i} className="text-center text-xl font-handwriting font-bold text-slate-500 py-1">
            {day}
          </div>
        ))}
        
        {/* We need to offset the first day to align with correct weekday column */}
        {Array.from({ length: startDate.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square opacity-0"></div>
        ))}

        {days.map((date, i) => {
          const status = getStatus(date);
          const day = format(date, 'd');
          
          let bgClass = 'border-2 border-slate-300 text-slate-400'; // inactive
          if (status === 'active') bgClass = 'bg-emerald-400 border-2 border-emerald-500 text-slate-900 hand-drawn-border';
          if (status === 'today') bgClass = 'bg-blue-300 border-2 border-blue-500 text-slate-900 hand-drawn-border scale-110 rotate-2';
          
          return (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center text-xl font-handwriting font-bold transition-all ${bgClass} ${status === 'inactive' ? 'rounded-lg border-dashed opacity-60' : 'shadow-sm'}`}
              title={`${format(date, 'MMM d, yyyy')}${status === 'active' ? ' ✅ Active' : status === 'today' ? ' 📍 Today' : ''}`}
            >
              {day}
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t-2 border-dashed border-slate-300 h-[48px]">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 bg-emerald-400 border-2 border-emerald-500 hand-drawn-border"></span>
          <span className="text-xl font-handwriting font-bold text-slate-600">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-300 border-2 border-blue-500 hand-drawn-border scale-110 rotate-2"></span>
          <span className="text-xl font-handwriting font-bold text-slate-600">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 border-2 border-slate-300 border-dashed rounded-lg opacity-60"></span>
          <span className="text-xl font-handwriting font-bold text-slate-600">Inactive</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
