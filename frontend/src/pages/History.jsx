import React, { useState, useEffect } from 'react';
import client from '../api/client';
import toast from 'react-hot-toast';
import { Calendar as CalendarIcon, CheckCircle2, ChevronRight } from 'lucide-react';

import HighlighterHeadline from '../components/common/HighlighterHeadline';

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
        <div className="h-24 bg-slate-200/60 rounded-3xl sketch-box"></div>
        <div className="h-96 bg-slate-200/60 rounded-3xl sketch-box"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full space-y-8 animate-fade-in-up pb-[48px]">
      <div className="pt-[24px]">
        <HighlighterHeadline icon="🗓️" title="Revision History" color="blue" />
        <p className="text-slate-600 text-xl font-handwriting font-bold mt-4 ml-4">Track your consistency over the last 30 days.</p>
      </div>

      <div className="sketch-box bg-transparent rounded-3xl relative">
        <div className="p-8 md:p-10 border-b-2 border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-200/50 rounded-2xl flex items-center justify-center text-blue-800 sketch-box">
              <CalendarIcon size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 font-handwriting tracking-tight">Activity Heatmap</h2>
              <p className="text-slate-600 font-handwriting font-bold text-lg mt-0.5">Your daily commitment visualised</p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 sketch-box bg-yellow-100/50 rounded-xl">
            <span className="text-3xl font-black text-slate-800 font-handwriting">{history.length}</span>
            <span className="text-sm font-bold text-slate-600 font-handwriting leading-tight">Days<br/>Active</span>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex justify-center mb-10">
            <div className="grid grid-cols-7 gap-3 sm:gap-4 max-w-xl w-full">
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
          
          <div className="flex items-center justify-center gap-8 pt-8 border-t-2 border-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-transparent sketch-box"></div>
              <span className="text-lg font-bold font-handwriting text-slate-600">Pending</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-blue-400/80 sketch-box"></div>
              <span className="text-lg font-bold font-handwriting text-slate-600">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
