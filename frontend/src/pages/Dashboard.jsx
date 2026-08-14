import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Highlighter from '../components/Highlighter';

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

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 animate-pulse flex flex-col items-center">
        <div className="w-32 h-8 bg-slate-200 rounded mb-4"></div>
        <div className="w-48 h-8 bg-slate-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      
      <div className="relative w-full max-w-3xl bg-paper-card rounded-t-3xl rounded-b-3xl shadow-2xl animate-fade-in-up torn-paper-edge font-handwriting">
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 paper-texture mix-blend-multiply opacity-60"></div>
        
        {/* Margin Line */}
        <div className="paper-margin-line"></div>

        {/* Inner Content - Baseline grid spacing (multiples of 48px) */}
        <div className="relative z-10 pt-[48px] pb-[96px] px-8 sm:px-12">
          
          {/* Header Block: exactly 2 lines (96px) */}
          <div className="h-[96px] relative flex flex-col justify-end pb-[8px]">
            <div className="relative inline-block mt-auto mb-[8px] pl-4 sm:pl-8">
              <Highlighter type="scribble" color="yellow" className="w-[110%] h-[180%] -top-[40%] -left-[5%] opacity-50" />
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-none relative z-10">🚀 Dashboard</h2>
            </div>
          </div>

          {/* Stat 1: Current Streak */}
          <div className="h-[48px] flex flex-row items-end pb-[8px] pl-4 sm:pl-8">
            <span className="text-2xl font-bold text-slate-800 mr-3">Current Streak:</span>
            <span className="text-2xl text-slate-700 font-sans tracking-wide relative">
              <span className="relative z-10 font-bold">{stats.streak} days</span>
              <Highlighter type="circle" color="orange" className="w-[130%] h-[160%] -top-[30%] -left-[15%] opacity-50" />
            </span>
          </div>

          {/* Stat 2: Total Solved */}
          <div className="h-[48px] flex flex-row items-end pb-[8px] pl-4 sm:pl-8">
            <span className="text-2xl font-bold text-slate-800 mr-3">Total Solved:</span>
            <span className="text-2xl text-slate-700 font-sans tracking-wide">
              <span className="font-bold">{stats.totalSolved}</span> problems
            </span>
          </div>

          {/* Divider */}
          <div className="h-[48px] mt-[48px] flex items-end pb-[24px] pl-4 sm:pl-8 pr-4 sm:pr-8">
            <div className="w-full border-t-[3px] border-dashed border-slate-300 opacity-60"></div>
          </div>

          {stats.totalSolved === 0 ? (
            <>
              {/* No Questions Synced */}
              <div className="h-[96px] mt-[48px] relative flex flex-col justify-end pb-[8px] pl-4 sm:pl-8">
                <div className="relative inline-block mt-auto mb-[8px]">
                  <Highlighter type="scribble-dense" color="pink" className="w-[110%] h-[150%] -top-[25%] -left-[5%] opacity-40" />
                  <h3 className="text-4xl font-bold text-slate-900 tracking-tight leading-none relative z-10">No Questions Synced</h3>
                </div>
              </div>
              <div className="h-[48px] flex flex-row items-end pb-[8px] pl-4 sm:pl-8">
                <p className="text-2xl text-slate-700">Connect your account to generate tasks.</p>
              </div>
              <div className="h-[48px] mt-[48px] flex flex-col justify-end pl-4 sm:pl-8 pb-[4px]">
                <Link 
                  to="/profile" 
                  className="w-64 h-[40px] flex items-center justify-center text-2xl font-bold text-slate-900 hover:text-slate-800 sketch-box bg-white/90 relative z-10"
                >
                  Go to Profile <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            </>
          ) : !task ? (
            <>
              {/* Ready for today's challenge? */}
              <div className="h-[96px] mt-[48px] relative flex flex-col justify-end pb-[8px] pl-4 sm:pl-8">
                <div className="relative inline-block mt-auto mb-[8px]">
                  <Highlighter type="underline" color="blue" className="w-[105%] h-[100%] -bottom-[20%] -left-[2.5%] opacity-60" />
                  <h3 className="text-4xl font-bold text-slate-900 tracking-tight leading-none relative z-10">Ready for today's challenge?</h3>
                </div>
              </div>
              <div className="h-[48px] mt-[48px] flex flex-row items-end pb-[8px] pl-4 sm:pl-8">
                <p className="text-2xl text-slate-700">We'll pick a random question for you to revise.</p>
              </div>
              <div className="h-[48px] mt-[48px] flex flex-col justify-end pl-4 sm:pl-8 pb-[4px]">
                <div className="relative inline-block">
                  <button 
                    onClick={handleGenerate}
                    disabled={generating}
                    className="w-72 h-[40px] flex items-center justify-center text-2xl font-bold text-slate-900 hover:text-slate-800 sketch-box bg-white/90 relative z-10 disabled:opacity-70"
                  >
                    {generating ? 'Selecting...' : 'Generate My Revision'}
                  </button>
                  {!generating && (
                    <Highlighter type="arrow" color="yellow" className="absolute -right-16 -top-10 w-24 h-24 rotate-[150deg] opacity-80" />
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Active Task */}
              <div className="h-[48px] mt-[48px] flex flex-row items-end pb-[8px] pl-4 sm:pl-8">
                <span className="text-xl font-bold text-slate-600 uppercase tracking-widest relative">
                  <Highlighter type="box" color="green" className="w-[110%] h-[140%] -top-[15%] -left-[5%] opacity-40" />
                  <span className="relative z-10">Today's Revision</span>
                </span>
              </div>
              
              <div className="h-[96px] relative flex flex-col justify-end pb-[8px] pl-4 sm:pl-8">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none truncate max-w-full">
                  {task.question.title}
                </h2>
              </div>
              
              <div className="h-[48px] flex flex-row items-end pb-[8px] pl-4 sm:pl-8 gap-6">
                <span className={`text-2xl font-bold ${task.question.difficulty === 'Easy' ? 'text-emerald-600' : task.question.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'}`}>
                  {task.question.difficulty}
                </span>
                <a 
                  href={task.question.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-2xl font-bold text-primary-600 hover:text-primary-800 hover:underline"
                >
                  View on LeetCode
                </a>
              </div>
              
              <div className="h-[48px] mt-[48px] flex flex-col justify-end pl-4 sm:pl-8 pb-[4px]">
                {task.status === 'completed' ? (
                  <div className="flex items-center gap-3 h-[40px]">
                    <CheckCircle2 size={32} className="text-emerald-600 relative z-10" />
                    <span className="text-3xl font-bold text-slate-900 relative">
                      <Highlighter type="scribble" color="green" className="w-[110%] h-[150%] -top-[20%] -left-[5%] opacity-40" />
                      <span className="relative z-10">Revision Complete!</span>
                    </span>
                  </div>
                ) : (
                  <button 
                    onClick={handleComplete}
                    disabled={completing}
                    className="w-64 h-[40px] flex items-center justify-center text-2xl font-bold text-slate-900 hover:text-slate-800 sketch-box sketch-box-error bg-white/90 relative z-10"
                  >
                    <CheckCircle2 size={24} className="mr-2" />
                    Mark as Revised
                  </button>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
