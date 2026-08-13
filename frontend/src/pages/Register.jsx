import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import highlightImage from '../assets/highlight-blue.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await register(email, password);
    if (success) {
      toast.success('Registration successful! Please sign in.', { icon: '🎉' });
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      
      {/* The Notebook Card with Torn Edges */}
      <div className="relative w-full max-w-lg bg-paper-card rounded-t-3xl rounded-b-3xl shadow-2xl animate-fade-in-up torn-paper-edge font-handwriting">
        
        {/* Paper Texture Overlay inside the card */}
        <div className="absolute inset-0 paper-texture mix-blend-multiply opacity-60"></div>
        
        {/* Margin Line inside the card */}
        <div className="paper-margin-line"></div>

        {/* Inner Content - Baseline grid spacing (multiples of 48px) */}
        <div className="relative z-10 pt-[48px] pb-[48px] px-8 sm:px-12">
          
          {/* Header Block: exactly 3 lines (144px) */}
          <div className="h-[144px] relative flex flex-col items-center justify-end pb-[8px]">
            <div className="absolute top-0 mx-auto w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
              <BookOpen size={24} className="text-primary-600" />
            </div>
            
            <div className="relative inline-block mt-auto mb-[20px]">
              {/* Organic Marker Highlight Image */}
              <img 
                src={highlightImage} 
                alt="" 
                className="absolute w-[130%] max-w-none h-[180%] -top-[45%] -left-[20%] mix-blend-multiply hue-rotate-[130deg] brightness-105 -z-10 object-fill opacity-90" 
              />
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-none">Create Account</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative z-20">
            {/* Email Group: exactly 1 line (48px) */}
            <div className="h-[48px] flex flex-row items-center relative pl-4 sm:pl-8">
              <label className="flex-shrink-0 text-2xl font-handwriting font-bold text-slate-800 relative z-10 mr-3 mt-1" htmlFor="email">
                Email:
              </label>
              <div className="flex-grow flex items-center relative h-full">
                <input
                  id="email"
                  type="email"
                  className={`w-full h-[40px] px-3 text-2xl font-medium focus:outline-none focus:ring-0 transition-all shadow-sm ${
                    errors.email 
                      ? 'sketch-box sketch-box-error focus:shadow-md' 
                      : 'sketch-box focus:shadow-md'
                  }`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="absolute -top-6 right-0 text-red-500 text-sm font-bold bg-white/90 px-2 py-0.5 rounded shadow-sm animate-fade-in">{errors.email}</p>}
              </div>
            </div>

            {/* Password Group: exactly 1 line (48px) with 48px gap above */}
            <div className="h-[48px] mt-[48px] flex flex-row items-center relative pl-4 sm:pl-8">
              <label className="flex-shrink-0 text-2xl font-handwriting font-bold text-slate-800 relative z-10 mr-3 mt-1" htmlFor="password">
                Password:
              </label>
              <div className="flex-grow flex items-center relative h-full">
                <input
                  id="password"
                  type="password"
                  className={`w-full h-[40px] px-3 text-2xl font-medium focus:outline-none focus:ring-0 transition-all shadow-sm ${
                    errors.password 
                      ? 'sketch-box sketch-box-error focus:shadow-md' 
                      : 'sketch-box focus:shadow-md'
                  }`}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="absolute -top-6 right-0 text-red-500 text-sm font-bold bg-white/90 px-2 py-0.5 rounded shadow-sm animate-fade-in">{errors.password}</p>}
              </div>
            </div>

            {/* Confirm Password Group: exactly 1 line (48px) with 48px gap above */}
            <div className="h-[48px] mt-[48px] flex flex-row items-center relative pl-4 sm:pl-8">
              <label className="flex-shrink-0 text-2xl font-handwriting font-bold text-slate-800 relative z-10 mr-3 mt-1" htmlFor="confirmPassword">
                Confirm Password:
              </label>
              <div className="flex-grow flex items-center relative h-full">
                <input
                  id="confirmPassword"
                  type="password"
                  className={`w-full h-[40px] px-3 text-2xl font-medium focus:outline-none focus:ring-0 transition-all shadow-sm ${
                    errors.confirmPassword 
                      ? 'sketch-box sketch-box-error focus:shadow-md' 
                      : 'sketch-box focus:shadow-md'
                  }`}
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="absolute -top-6 right-0 text-red-500 text-sm font-bold bg-white/90 px-2 py-0.5 rounded shadow-sm animate-fade-in">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Button Group: exactly 1 line (48px) with 48px gap above */}
            <div className="h-[48px] mt-[48px] flex flex-col justify-end relative pl-4 sm:pl-8">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full h-[56px] flex items-center justify-center text-3xl font-handwriting font-bold text-slate-900 hover:text-slate-800 transition-all focus:outline-none disabled:opacity-70 mt-6"
              >
                <img 
                  src={highlightImage} 
                  alt="" 
                  className="absolute w-[110%] max-w-none h-[180%] -top-[40%] -left-[5%] mix-blend-multiply hue-rotate-[-90deg] brightness-110 -z-10 transition-transform group-hover:scale-[1.03] group-hover:rotate-1 object-fill opacity-90 pointer-events-none" 
                />
                {loading ? (
                  <span className="w-6 h-6 border-4 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></span>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={24} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Link: exactly 1 line (48px) with 48px gap above */}
          <div className="h-[48px] mt-[48px] flex items-center justify-center relative z-20">
            <span className="bg-white/90 px-4 py-1.5 rounded-full text-base font-medium text-slate-600 shadow-sm border border-slate-100">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-bold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
