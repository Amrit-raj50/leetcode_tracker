import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { LogOut, LayoutDashboard, History, UserCircle2, Code2 } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      {user && (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold shadow-md transition-transform group-hover:scale-105">
                <Code2 size={16} />
              </div>
              <span className="font-bold text-slate-900 text-lg tracking-tight">LeetTracker</span>
            </Link>
            
            <nav className="flex items-center gap-1 md:gap-2">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/') 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              
              <Link
                to="/history"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/history') 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <History size={16} />
                <span className="hidden sm:inline">History</span>
              </Link>
              
              <Link
                to="/profile"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/profile') 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <UserCircle2 size={16} />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </nav>
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
