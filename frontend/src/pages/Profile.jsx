import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import toast from 'react-hot-toast';
import { UserCircle2, Code, RefreshCw, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (user?.leetcodeUsername) {
      setLeetcodeUsername(user.leetcodeUsername);
    }
  }, [user]);

  const handleSync = async (e) => {
    e.preventDefault();
    if (!leetcodeUsername.trim()) {
      toast.error('Please enter a LeetCode username');
      return;
    }

    setSyncing(true);
    try {
      const res = await client.post('/api/user/sync', { leetcodeUsername: leetcodeUsername.trim() });
      toast.success(`Successfully synced ${res.data.totalSolved} questions!`);
      
      if (user) {
        setUser({ 
          ...user, 
          leetcodeUsername: leetcodeUsername.trim(),
          totalSolved: res.data.totalSolved 
        });
      }
    } catch (error) {
      const msg = error.response?.data?.error || 'Failed to sync with LeetCode';
      toast.error(msg);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Profile Settings</h1>
        <p className="text-slate-500 text-lg">Manage your account and integration preferences.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden relative">
        <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
            <UserCircle2 size={48} strokeWidth={1.5} />
          </div>
          <div className="text-center sm:text-left pt-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{user?.email}</h2>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold shadow-sm">
              <CheckCircle2 size={14} />
              Active Member
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                <Code size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">LeetCode Integration</h3>
            </div>
            
            <p className="text-slate-500 mb-8 leading-relaxed">
              Link your LeetCode account to automatically sync your solved questions. This allows the system to generate targeted daily revision tasks based on your actual history.
            </p>

            <form onSubmit={handleSync} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700" htmlFor="leetcodeUsername">
                  LeetCode Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                    <span className="font-medium">leetcode.com/</span>
                  </div>
                  <input
                    id="leetcodeUsername"
                    type="text"
                    className="w-full pl-[110px] pr-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all hover:border-slate-300"
                    placeholder="username"
                    value={leetcodeUsername}
                    onChange={(e) => setLeetcodeUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={syncing || !leetcodeUsername.trim()}
                  className="w-full sm:w-auto bg-slate-900 text-white font-semibold py-3 px-8 rounded-xl hover:bg-slate-800 hover:shadow-lg focus:ring-4 focus:ring-slate-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
                >
                  {syncing ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      Syncing Data...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={18} />
                      Sync Account
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {user?.leetcodeUsername && (
              <div className="mt-8 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl animate-fade-in shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                  <p className="text-emerald-800 leading-relaxed">
                    Successfully linked to LeetCode account <strong className="font-black text-emerald-900">{user.leetcodeUsername}</strong>. 
                    You currently have <strong className="font-black text-emerald-900">{user.totalSolved || 0}</strong> questions synced to your profile.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
