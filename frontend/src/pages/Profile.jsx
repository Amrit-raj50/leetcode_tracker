import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import toast from 'react-hot-toast';
import { ArrowLeft, RefreshCw, Lock, LogOut } from 'lucide-react';
import Highlighter from '../components/Highlighter';

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
sumit
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
    <div className="w-full flex flex-col items-center justify-center py-4">
      
      {/* Back Link - Outside the card */}
      <div className="w-full max-w-2xl mb-6 pl-4 sm:pl-12 animate-fade-in-up">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 font-handwriting text-2xl transition-colors font-bold relative group">
          <ArrowLeft size={24} className="mr-2 z-10" />
          <span className="z-10">Back to Dashboard</span>
          <Highlighter type="underline" color="yellow" className="w-[110%] h-[100%] -bottom-[20%] -left-[5%] opacity-50 group-hover:opacity-80 transition-opacity" />
        </Link>
      </div>

      <div className="relative w-full max-w-2xl bg-paper-card rounded-t-3xl rounded-b-3xl shadow-2xl animate-fade-in-up torn-paper-edge font-handwriting">
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 paper-texture mix-blend-multiply opacity-60"></div>
        
        {/* Margin Line */}
        <div className="paper-margin-line"></div>

        {/* Inner Content - Baseline grid spacing (multiples of 48px) */}
        <div className="relative z-10 pt-[48px] pb-[48px] px-8 sm:px-12">
          
          {/* Header Block: exactly 2 lines (96px) */}
          <div className="h-[96px] relative flex flex-col justify-end pb-[8px]">
            <div className="relative inline-block mt-auto mb-[8px] pl-4 sm:pl-8">
              <Highlighter type="scribble" color="blue" className="w-[110%] h-[180%] -top-[40%] -left-[5%] opacity-50" />
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-none relative z-10">👤 Profile Settings</h2>
            </div>
          </div>

          {/* Email: exactly 1 line (48px) */}
          <div className="h-[48px] flex flex-row items-end pb-[8px] pl-4 sm:pl-8">
            <span className="text-2xl font-bold text-slate-800 mr-3">Email:</span>
            <span className="text-2xl text-slate-700 font-sans tracking-wide relative">
               <Highlighter type="circle" color="orange" className="w-[120%] h-[160%] -top-[30%] -left-[10%] opacity-40" />
               <span className="relative z-10">{user?.email || 'test@example.com'}</span>
            </span>
          </div>

          {/* LeetCode Username: exactly 1 line (48px) with 48px gap above */}
          <div className="h-[48px] mt-[48px] flex flex-row items-end pb-[8px] pl-4 sm:pl-8">
            <span className="text-2xl font-bold text-slate-800 mr-3">LeetCode Username:</span>
            {isEditing || !user?.leetcodeUsername ? (
               <input 
                 type="text" 
                 className="sketch-box h-[40px] px-3 text-2xl font-medium focus:outline-none focus:ring-0 w-48 mb-[-4px] bg-white/80 relative z-10"
                 value={leetcodeUsername}
                 onChange={e => setLeetcodeUsername(e.target.value)}
                 placeholder="username"
                 autoFocus
               />
            ) : (
               <>
                 <span className="text-2xl text-slate-700 mr-4 font-sans font-medium tracking-wide">{user.leetcodeUsername}</span>
                 <button onClick={() => setIsEditing(true)} className="text-xl font-bold text-primary-600 hover:text-primary-800 hover:underline mb-0.5 transition-colors relative z-10">
                   [Edit]
                 </button>
               </>
            )}
          </div>

          {/* Sync Button: exactly 1 line (48px) with 48px gap above */}
          <div className="h-[48px] mt-[48px] flex flex-col justify-end pl-4 sm:pl-8 relative pb-[4px]">
             <div className="absolute -left-12 -top-6 w-20 h-20 rotate-[15deg]">
                 <Highlighter type="arrow" color="pink" className="w-full h-full opacity-60" />
             </div>
             <button 
               onClick={handleSync}
               disabled={syncing}
               className="group relative z-10 w-56 h-[40px] flex items-center justify-center text-2xl font-bold text-slate-900 hover:text-slate-800 transition-all focus:outline-none disabled:opacity-70 sketch-box bg-white/90"
             >
               {syncing ? (
                 <RefreshCw size={20} className="animate-spin mr-2" />
               ) : (
                 <RefreshCw size={20} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
               )}
               Sync Now
             </button>
          </div>

          {/* Stats: Last Synced (1 line) */}
          <div className="h-[48px] mt-[48px] flex flex-row items-end pb-[8px] pl-4 sm:pl-8">
            <span className="text-2xl font-bold text-slate-800 mr-3">Last Synced:</span>
            <span className="text-2xl text-slate-700 font-sans tracking-wide">{user?.lastSynced ? 'Just now' : 'Just now'}</span>
          </div>
          
          {/* Stats: Total Solved (1 line) */}
          <div className="h-[48px] flex flex-row items-end pb-[8px] pl-4 sm:pl-8">
            <span className="text-2xl font-bold text-slate-800 mr-3">Total Solved:</span>
            <span className="text-2xl text-slate-700 font-sans tracking-wide relative">
               <span className="relative z-10">{user?.totalSolved || 0} questions</span>
               <Highlighter type="check" color="green" className="w-8 h-8 absolute -right-10 -top-2" />
            </span>
          </div>

          {/* Divider: exactly 1 line (48px) with 48px gap above */}
          <div className="h-[48px] mt-[48px] flex items-end pb-[24px] pl-4 sm:pl-8 pr-4 sm:pr-8">
            <div className="w-full border-t-[3px] border-dashed border-slate-300 opacity-60"></div>
          </div>

          {/* API Token: exactly 2 lines (96px) */}
          <div className="h-[96px] flex flex-col justify-end pb-[8px] pl-4 sm:pl-8">
            <span className="text-2xl font-bold text-slate-800 mb-1 flex items-center">
              🔑 API Token (for extension)
            </span>
            <div className="flex items-center mb-1 h-[32px]">
              <div className="relative">
                <Highlighter type="box" color="green" className="w-[105%] h-[140%] -top-[20%] -left-[2.5%] opacity-50" />
                <code className="text-lg text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-200 shadow-sm truncate w-64 mr-3 font-sans font-medium relative z-10">
                  {token ? `${token.substring(0, 24)}...` : 'No token'}
                </code>
              </div>
              <button 
                onClick={copyToken}
                className="text-xl font-bold text-primary-600 hover:text-primary-800 hover:underline flex items-center transition-colors relative z-10"
              >
                [📋 Copy]
              </button>
            </div>
          </div>

          {/* Change Password: exactly 1 line (48px) with 48px gap above */}
          <div className="h-[48px] mt-[48px] flex flex-col justify-end pl-4 sm:pl-8 pb-[4px]">
            <button 
              onClick={() => toast.error('Change password not implemented yet')}
              className="w-64 h-[40px] flex items-center justify-center text-2xl font-bold text-slate-700 hover:text-slate-900 transition-all sketch-box bg-white/90 relative z-10"
            >
              <Lock size={20} className="mr-2" />
              Change Password
            </button>
          </div>

          {/* Logout: exactly 1 line (48px) with 48px gap above */}
          <div className="h-[48px] mt-[48px] flex flex-col justify-end pl-4 sm:pl-8 pb-[4px]">
            <button 
              onClick={logout}
              className="w-48 h-[40px] flex items-center justify-center text-2xl font-bold text-red-600 hover:text-red-700 transition-all sketch-box sketch-box-error bg-white/90 relative z-10"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
