import React, { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';

const Layout = () => {
  const paperRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const updateScroll = () => {
      if (paperRef.current) {
        // Clamp scrollY between 0 and 120 for a smoother animation
        const scrollY = window.scrollY;
        const opacity = Math.min(1, scrollY / 120);
        paperRef.current.style.setProperty('--scroll-opacity', opacity);
      }
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    animationFrameId = requestAnimationFrame(updateScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0e17] font-sans flex flex-col p-2 md:p-6">
      <div 
        ref={paperRef}
        className="relative flex-1 w-full max-w-[95%] mx-auto bg-paper-card rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] torn-paper-edge flex flex-col"
      >
        {/* Paper Texture Overlay inside the card */}
        <div className="absolute inset-0 paper-texture mix-blend-multiply opacity-60 pointer-events-none"></div>
        
        {/* Main margin line for the body */}
        <div className="paper-margin-line pointer-events-none"></div>

        <div className="relative z-10 flex flex-col flex-1">
          <div className="sticky top-0 z-[100] bg-paper-card shadow-sm">
            {/* Texture and Margin for Sticky Header */}
            <div className="absolute inset-0 paper-texture mix-blend-multiply opacity-60 pointer-events-none"></div>
            <div className="paper-margin-line pointer-events-none"></div>
            
            <div className="relative z-10">
              <Navbar />
            </div>

            {/* Crease Fold Effect */}
            <div className="crease-fold"></div>
          </div>

          <main className="flex-1 w-full px-4 sm:px-8 pl-16 sm:pl-24 py-8 animate-fade-in flex flex-col items-center text-slate-800">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
