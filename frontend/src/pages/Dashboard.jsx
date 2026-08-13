import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ExternalLink, CheckCircle2, Trophy, Target, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const [task, setTask] = useState(null);
  const [stats, setStats] = useState({ totalSolved: 0, streak: 0 });
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [completing, setCompleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [todayRes, statsRes] = await Promise.allSettled([
        client.get('/api/daily/today'),
        client.get('/api/user/stats')
      ]);

      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.data);
      }

      if (todayRes.status === 'fulfilled') {
        setTask(todayRes.value.data);
      } else if (todayRes.reason.response?.status === 404) {
        setTask(null);
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await client.post('/api/daily/generate');
      setTask(res.data);
      toast.success('Generated new revision task!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to generate task');
    } finally {
      setGenerating(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      const res = await client.post('/api/daily/complete');
      toast.success('Task marked as complete! 🔥');
      
      setTask(prev => ({ ...prev, status: 'completed' }));
      setStats(prev => ({ ...prev, streak: res.data.streak || prev.streak + 1 }));
      
      if (user) {
        setUser({ ...user, streak: res.data.streak || user.streak + 1 });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to complete task');
    } finally {
      setCompleting(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-emerald-50 text-emerald-600 border-emerald-200/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-200/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]';
      case 'hard': return 'bg-rose-50 text-rose-600 border-rose-200/60 shadow-[0_0_12px_rgba(225,29,72,0.2)]';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-32 bg-slate-200/60 rounded-2xl"></div>
          <div className="h-32 bg-slate-200/60 rounded-2xl"></div>
        </div>
        <div className="h-[400px] bg-slate-200/60 rounded-3xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto w-full">
      {/* Stats Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 flex items-center justify-between border border-slate-100 shadow-soft relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Streak</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">{stats.streak}</span>
              <span className="text-lg font-bold text-slate-400">days</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <Trophy size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 flex items-center justify-between border border-slate-100 shadow-soft relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Solved</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">{stats.totalSolved}</span>
              <span className="text-lg font-bold text-slate-400">problems</span>
            </div>
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
            <Target size={28} />
          </div>
        </div>
      </div>

      {/* Main Task Area */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-indigo-500 to-purple-500"></div>
        
        <div className="p-8 md:p-12">
          {stats.totalSolved === 0 ? (
            <div className="text-center max-w-md mx-auto py-12">
              <div className="mx-auto w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <AlertCircle size={32} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">No Questions Synced</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Connect your LeetCode account to sync your solved history and unlock personalized daily revision tasks.
              </p>
              <Link 
                to="/profile" 
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 hover:shadow-lg transition-all"
              >
                Go to Profile
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : !task ? (
            <div className="text-center max-w-md mx-auto py-12">
              <div className="mx-auto w-20 h-20 bg-primary-50 border border-primary-100 rounded-full flex items-center justify-center mb-6 shadow-sm relative">
                {generating && <div className="absolute inset-0 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>}
                <Sparkles size={32} className="text-primary-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Ready for today's challenge?</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                We'll pick a random question from your previously solved list using spaced repetition to keep it fresh.
              </p>
              <button 
                onClick={handleGenerate}
                disabled={generating}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 hover:shadow-glow disabled:opacity-70 disabled:hover:shadow-none transition-all"
              >
                {generating ? 'Selecting Problem...' : 'Generate My Revision'}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center animate-fade-in-up">
              <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-slate-200/60">
                Today's Revision
              </span>
              
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight leading-tight max-w-2xl">
                {task.question.title}
              </h2>
              
              <div className="flex items-center gap-4 mb-10">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getDifficultyColor(task.question.difficulty)}`}>
                  {task.question.difficulty}
                </span>
                
                <a 
                  href={task.question.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors group"
                >
                  View on LeetCode
                  <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <div className="w-full max-w-md bg-slate-50 rounded-2xl p-6 border border-slate-100">
                {task.status === 'completed' ? (
                  <div className="flex flex-col items-center justify-center gap-3 animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2 animate-[bounce_1s_ease-in-out]">
                      <CheckCircle2 size={32} strokeWidth={3} />
                    </div>
                    <p className="text-xl font-bold text-slate-900 tracking-tight">Revision Complete!</p>
                    <p className="text-sm text-slate-500">Come back tomorrow to keep the streak alive.</p>
                  </div>
                ) : (
                  <button 
                    onClick={handleComplete}
                    disabled={completing}
                    className="w-full relative overflow-hidden group bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {completing ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span className="relative z-10 flex items-center gap-2">
                          <CheckCircle2 size={20} />
                          Mark as Revised
                        </span>
                        {/* Hover flare effect */}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
