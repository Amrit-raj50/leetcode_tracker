import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, History, UserCircle2, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="pl-14 sm:pl-20 pr-4 sm:pr-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 relative">
      <Link to="/" className="flex items-center gap-2 group text-slate-800 hover:text-blue-600 transition-colors">
        <span className="text-3xl">🔥</span>
        <span className="font-bold text-3xl tracking-tight font-handwriting">LeetTracker</span>
      </Link>
      
      <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
        <Link 
          to="/" 
          className={`flex items-center gap-2 px-3 py-2 text-lg font-bold font-handwriting transition-all ${
            isActive('/') 
              ? 'bg-blue-200/50 text-blue-800 sketch-box' 
              : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 rounded-lg'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        
        <Link 
          to="/history" 
          className={`flex items-center gap-2 px-3 py-2 text-lg font-bold font-handwriting transition-all ${
            isActive('/history') 
              ? 'bg-pink-200/50 text-pink-800 sketch-box' 
              : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 rounded-lg'
          }`}
        >
          <History size={20} />
          <span className="hidden sm:inline">History</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex items-center gap-2 px-3 py-2 text-lg font-bold font-handwriting transition-all ${
            isActive('/profile') 
              ? 'bg-green-200/50 text-green-800 sketch-box' 
              : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 rounded-lg'
          }`}
        >
          <UserCircle2 size={20} />
          <span className="hidden sm:inline">Profile</span>
        </Link>
        
        <div className="flex items-center gap-3 ml-2 pl-2 border-l-2 border-slate-300">
          <span className="hidden md:inline text-slate-800 text-xl font-bold font-handwriting">
            {user?.username || user?.email || 'User'}
          </span>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-3 py-2 text-rose-600 font-bold font-handwriting text-lg hover:bg-rose-100 transition-all sketch-box"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
