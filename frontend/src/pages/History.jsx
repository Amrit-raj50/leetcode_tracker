import React, { useState, useEffect } from 'react';
import client from '../api/client';
import toast from 'react-hot-toast';
import { Calendar as CalendarIcon, CheckCircle2, ChevronRight } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await client.get('/api/history?days=30');
        setHistory(res.data.history || []);
      } catch (error) {
        toast.error('Failed to load history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }

  const formatDateString = (date) => {
    const offset = date.getTimezoneOffset()
    const offsetDate = new Date(date.getTime() - (offset*60*1000))
    return offsetDate.toISOString().split('T')[0]
  };

  const todayStr = formatDateString(today);

  const historyMap = history.reduce((acc, curr) => {
    const dateStr = curr.date.split('T')[0];
    acc[dateStr] = curr;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse max-w-4xl mx-auto w-full">
        <div className="h-24 bg-slate-200/60 rounded-3xl"></div>
        <div className="h-96 bg-slate-200/60 rounded-3xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Revision History</h1>
        <p className="text-slate-500 text-lg">Track your consistency over the last 30 days.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden relative">
        <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <CalendarIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Activity Heatmap</h2>
              <p className="text-slate-500 text-sm mt-0.5">Your daily commitment visualised</p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200">
            <span className="text-3xl font-black text-slate-900 tracking-tighter">{history.length}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider leading-tight">Days<br/>Active</span>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex justify-center mb-10">
            <div className="grid grid-cols-7 gap-3 sm:gap-4 max-w-3xl w-full">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: days[0].getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded-2xl"></div>
              ))}

              {days.map((date) => {
                const dateStr = formatDateString(date);
                const isToday = dateStr === todayStr;
                const completedData = historyMap[dateStr];
                const isCompleted = !!completedData;

                return (
                  <div 
                    key={dateStr}
                    className="relative group flex items-center justify-center aspect-square"
                  >
                    <div
                      className={`w-full h-full rounded-2xl transition-all duration-300 flex items-center justify-center text-sm font-bold cursor-default
                        ${isCompleted 
                          ? 'bg-primary-500 text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:scale-105 hover:bg-primary-400' 
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }
                        ${isToday ? 'ring-2 ring-slate-900 ring-offset-4' : ''}
                      `}
                    >
                      {date.getDate()}
                    </div>
                    
                    {/* Premium Tooltip */}
                    <div className="absolute bottom-full mb-3 hidden group-hover:block z-20 w-max max-w-[240px] pointer-events-none animate-fade-in-up">
                      <div className="bg-slate-900 text-white rounded-xl p-3 shadow-xl border border-white/10 relative">
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          {isCompleted && <CheckCircle2 size={14} className="text-emerald-400" />}
                        </div>
                        {isCompleted ? (
                          <p className="font-semibold text-sm leading-snug line-clamp-2">
                            {completedData.questionTitle || completedData.questionSlug || 'Task completed'}
                          </p>
                        ) : (
                          <p className="text-slate-400 text-sm font-medium">No revision</p>
                        )}
                        
                        {/* Tooltip Arrow */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-b border-r border-white/10 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-8 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200"></div>
              <span className="text-sm font-semibold text-slate-600">Pending</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-primary-500 shadow-sm shadow-primary-500/30"></div>
              <span className="text-sm font-semibold text-slate-600">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
