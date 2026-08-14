import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import HighlighterHeadline from '../components/common/HighlighterHeadline';
import StatsCard from '../components/dashboard/StatsCard';
import QuestionCard from '../components/dashboard/QuestionCard';
import ActivityHeatmap from '../components/dashboard/ActivityHeatmap';
import DifficultyBreakdown from '../components/dashboard/DifficultyBreakdown';

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const [task, setTask] = useState(null);
  const [stats, setStats] = useState({
    totalSolved: 0,
    streak: 0,
    easySolved: 0, easyTotal: 1,
    mediumSolved: 0, mediumTotal: 1,
    hardSolved: 0, hardTotal: 1
  });
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [activityData, setActivityData] = useState([]);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      // 1. Map Stats from Real User Data
      const getStat = (difficulty) => {
        const ac = user.submitStats?.acSubmissionNum?.find(s => s.difficulty === difficulty);
        const total = user.platformStats?.find(s => s.difficulty === difficulty);
        return {
          solved: ac?.count || 0,
          total: total?.count || 100 // fallback if platformStats is missing
        };
      };

      const easy = getStat('Easy');
      const medium = getStat('Medium');
      const hard = getStat('Hard');

      setStats({
        totalSolved: user.totalSolved || 0,
        streak: user.userCalendar?.streak || 0,
        easySolved: easy.solved, easyTotal: easy.total,
        mediumSolved: medium.solved, mediumTotal: medium.total,
        hardSolved: hard.solved, hardTotal: hard.total
      });

      // 2. Map Activity Heatmap Data
      let parsedDates = [];
      if (user.userCalendar?.submissionCalendar) {
        try {
          const calendarObj = typeof user.userCalendar.submissionCalendar === 'string'
            ? JSON.parse(user.userCalendar.submissionCalendar)
            : user.userCalendar.submissionCalendar;
          
          parsedDates = Object.keys(calendarObj).map(timestamp => {
            return new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
          });
        } catch (err) {
          console.error("Failed to parse calendar", err);
        }
      }
      setActivityData(parsedDates);

      // 3. Fetch Today's Task (with Fallback)
      try {
        const res = await client.get('/api/daily/today');
        setTask(res.data);
      } catch (err) {
        // API not ready – use mock data with "Coming Soon" flag
        setTask({
          status: 'pending',
          isDemo: true, // Used to show a 'Coming Soon' badge
          question: {
            title: 'Two Sum',
            difficulty: 'Easy',
            acceptanceRate: 45.2,
            frontendId: 1,
            topicTags: [{ name: 'Array' }, { name: 'Hash Table' }],
            link: 'https://leetcode.com/problems/two-sum/'
          }
        });
      }
    } catch (error) {
      toast.error('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

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

      const todayStr = new Date().toISOString().split('T')[0];
      if (!activityData.includes(todayStr)) {
        setActivityData(prev => [...prev, todayStr]);
      }

      if (user) {
        setUser({ ...user, streak: res.data.streak || user.streak + 1 });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to complete task');
    } finally {
      setCompleting(false);
    }
  };

  const progress = Math.round((stats.totalSolved / Math.max(1, (stats.easyTotal + stats.mediumTotal + stats.hardTotal))) * 100) || 0;

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <span className="w-12 h-12 border-4 border-slate-600/30 border-t-slate-300 rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mb-16 relative z-10 animate-fade-in-up">
      {/* Inner Content - Baseline grid spacing (multiples of 48px) */}
      <div className="pt-[24px] pb-[48px]">

        <HighlighterHeadline icon="📊" title="Dashboard" color="yellow" />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <StatsCard
            icon="🔥"
            label="Streak"
            value={stats.streak || 0}
            subtext={stats.streak === 0 ? 'Start today!' : 'days'}
            color="orange"
          />
          <StatsCard
            icon="📚"
            label="Solved"
            value={stats.totalSolved || 0}
            subtext="questions"
            color="blue"
          />
          <StatsCard
            icon="⏳"
            label="Synced"
            value={user?.lastSynced ? formatDistanceToNow(new Date(user.lastSynced)) + ' ago' : 'Never'}
            subtext={user?.lastSynced ? new Date(user.lastSynced).toLocaleDateString() : 'Sync your data'}
            color="green"
          />
          <StatsCard
            icon="📈"
            label="Progress"
            value={`${progress}%`}
            subtext="completed"
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-12">
            <div>
              <HighlighterHeadline icon="📝" title="Today's Revision" color="pink" />
              <QuestionCard
                question={task?.question}
                status={task?.status}
                isDemo={task?.isDemo}
                completing={completing}
                onComplete={handleComplete}
                onSync={handleGenerate}
              />
            </div>

            <div>
              <HighlighterHeadline icon="📈" title="Difficulty Breakdown" color="green" />
              <DifficultyBreakdown stats={stats} />
            </div>
          </div>

          <div>
            <HighlighterHeadline icon="📊" title="Activity Heatmap" color="blue" />
            <ActivityHeatmap activityData={activityData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
