import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import toast from 'react-hot-toast';
import { UserCircle2, Code, RefreshCw, CheckCircle2, Lock, LogOut, Key } from 'lucide-react';

import HighlighterHeadline from '../components/common/HighlighterHeadline';

const Profile = () => {
  const { user, setUser, token, logout } = useAuth();
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.leetcodeUsername) {
      setLeetcodeUsername(user.leetcodeUsername);
    }
  }, [user]);

  const handleSync = async (e) => {
    if (e) e.preventDefault();
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
          totalSolved: res.data.totalSolved,
          lastSynced: new Date().toISOString()
        });
      }
      setIsEditing(false);
    } catch (error) {
      const msg = error.response?.data?.error || 'Failed to sync with LeetCode';
      toast.error(msg);
    } finally {
      setSyncing(false);
    }
  };

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      toast.success('Token copied to clipboard');
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full space-y-8 animate-fade-in-up pb-[48px]">
      <div className="pt-[24px]">
        <HighlighterHeadline icon="👤" title="Profile Settings" color="green" />
        <p className="text-slate-600 text-xl font-handwriting font-bold mt-4 ml-4">Manage your account and integration preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="sketch-box bg-transparent rounded-3xl relative p-8 md:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 bg-green-200/50 rounded-full flex items-center justify-center text-green-800 sketch-box shrink-0">
            <UserCircle2 size={56} strokeWidth={2} />
          </div>
          <div className="text-center sm:text-left pt-2">
            <h2 className="text-3xl font-bold font-handwriting text-slate-800 tracking-tight">{user?.email}</h2>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 sketch-box bg-emerald-100/50 text-emerald-800 font-handwriting font-bold text-lg">
              <CheckCircle2 size={20} />
              Active Member
            </div>
          </div>
        </div>

        <div className="sketch-box bg-transparent rounded-3xl relative p-8 md:p-10">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pink-200/50 rounded-xl text-pink-800 flex items-center justify-center sketch-box shrink-0">
                <Code size={24} />
              </div>
              <h3 className="text-2xl font-bold font-handwriting text-slate-800 tracking-tight">LeetCode Integration</h3>
            </div>
            
            <p className="text-slate-600 font-handwriting font-bold text-lg mb-8 leading-relaxed">
              Link your LeetCode account to automatically sync your solved questions. This allows the system to generate targeted daily revision tasks based on your actual history.
            </p>

            <form onSubmit={handleSync} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xl font-bold font-handwriting text-slate-800" htmlFor="leetcodeUsername">
                  LeetCode Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <span className="font-bold font-handwriting text-lg">leetcode.com/</span>
                  </div>
                  <input
                    id="leetcodeUsername"
                    type="text"
                    className="w-full pl-[130px] pr-4 py-3 rounded-xl bg-transparent border-b-2 border-slate-300 focus:border-blue-500 outline-none font-handwriting text-xl font-bold transition-all text-slate-800"
                    placeholder="username"
                    value={leetcodeUsername}
                    onChange={(e) => setLeetcodeUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={syncing || !leetcodeUsername.trim()}
                  className="w-full sm:w-auto bg-blue-200/50 text-blue-800 font-bold font-handwriting text-xl py-3 px-8 sketch-box hover:bg-blue-300/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {syncing ? (
                    <>
                      <RefreshCw size={24} className="animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={24} />
                      Sync Account
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {user?.leetcodeUsername && (
              <><div className="mt-8 p-6 bg-emerald-100/50 sketch-box animate-fade-in">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="text-emerald-700 shrink-0 mt-1" size={24} />
                  <p className="text-emerald-900 font-handwriting font-bold text-lg leading-relaxed">
                    Successfully linked to LeetCode account <strong className="font-black text-xl">{user.leetcodeUsername}</strong>.
                    You currently have <strong className="font-black text-xl">{user.totalSolved || 0}</strong> questions synced to your profile.
                  </p>
                </div>
              </div>
              </>
            )}
            </div>
          </div>

        </div>

        {/* Extension Access Pass */}
        <div className="sketch-box bg-purple-50/50 rounded-3xl relative p-8 md:p-10 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-200/50 rounded-xl text-purple-800 flex items-center justify-center sketch-box shrink-0">
              <Key size={24} />
            </div>
            <h3 className="text-2xl font-bold font-handwriting text-slate-800 tracking-tight">Extension Access Pass</h3>
          </div>
          
          <p className="text-slate-600 font-handwriting font-bold text-lg mb-6 leading-relaxed">
            Use this secret pass to authenticate your browser extension with your account. Do not share this pass with anyone.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/60 p-4 sketch-box rounded-xl">
            <div className="flex-1 w-full font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap text-slate-500 font-bold bg-white p-3 sketch-box rounded-lg">
              {token ? `••••••••••••••••••••••••••••••••••••••••••••••••••••••••` : 'No token available'}
            </div>
            <button
              onClick={copyToken}
              className="w-full sm:w-auto flex items-center justify-center text-lg font-bold font-handwriting text-purple-700 hover:text-purple-900 transition-colors shrink-0 px-6 py-3 sketch-box bg-purple-200/50 hover:bg-purple-300/50"
            >
              [📋 Copy Pass]
            </button>
          </div>
        </div>

        {/* Action Buttons Container - Placed below the grid so they span correctly */}
        <div className="pt-8 flex flex-col sm:flex-row gap-8 items-start pl-4 sm:pl-8">
          {/* Change Password */}
          <button 
            onClick={() => toast.error('Change password not implemented yet')}
            className="w-64 h-[48px] flex items-center justify-center text-2xl font-bold font-handwriting text-slate-700 hover:text-slate-900 transition-all sketch-box bg-white/90 relative z-10"
          >
            <Lock size={20} className="mr-2" />
            Change Password
          </button>

          {/* Logout */}
          <button 
            onClick={logout}
            className="w-48 h-[48px] flex items-center justify-center text-2xl font-bold font-handwriting text-red-600 hover:text-red-700 transition-all sketch-box sketch-box-error bg-white/90 relative z-10"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
  );
};

export default Profile;
