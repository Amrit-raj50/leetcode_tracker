import React from 'react';

const StatsCard = ({ icon, label, value, subtext, color }) => {
  // Pastel colors corresponding to sticky notes
  const colorStyles = {
    orange: { bg: 'bg-[#fde68a]', tape: 'bg-yellow-500/20' }, // Yellow-ish sticky note
    blue: { bg: 'bg-[#bae6fd]', tape: 'bg-sky-500/20' }, // Blue sticky note
    green: { bg: 'bg-[#bbf7d0]', tape: 'bg-emerald-500/20' }, // Green sticky note
    purple: { bg: 'bg-[#e9d5ff]', tape: 'bg-purple-500/20' }, // Purple sticky note
  };

  const currentStyle = colorStyles[color] || colorStyles.orange;

  // Slight random rotation for organic feel (-2deg to 2deg)
  const rotation = Math.random() > 0.5 ? 'rotate-1' : '-rotate-1';

  return (
    <div className={`relative flex-1 min-w-[140px] h-[144px] ${rotation} transition-transform hover:scale-105 hover:z-10 group`}>
      
      {/* Tape on top */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${currentStyle.tape} backdrop-blur-[2px] shadow-sm -rotate-2 z-20`}></div>
      
      {/* Sticky Note Body */}
      <div className={`w-full h-full ${currentStyle.bg} shadow-md flex flex-col justify-center items-center relative overflow-hidden px-4`}>
        
        {/* Horizontal Ruled Lines for Sticky Note */}
        <div 
          className="absolute inset-0 pointer-events-none z-0" 
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, rgba(0,0,0,0.08) 23px, rgba(0,0,0,0.08) 24px)',
            backgroundPositionY: '12px'
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full mt-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{icon}</span>
            <span className="text-xl font-handwriting font-bold text-slate-800">{label}</span>
          </div>
          <div className="text-5xl font-handwriting font-black tracking-tight text-slate-900 drop-shadow-sm">
            {value}
          </div>
          <div className="text-lg font-handwriting text-slate-600 font-medium leading-none mt-2">{subtext}</div>
        </div>
        
        {/* Torn/Rough bottom edge illusion using a slightly transparent jagged border */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20" style={{
          maskImage: `url("data:image/svg+xml,%3Csvg width='24' height='8' viewBox='0 0 24 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8L6 2L12 8L18 0L24 8H0Z' fill='black'/%3E%3C/svg%3E")`,
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='24' height='8' viewBox='0 0 24 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8L6 2L12 8L18 0L24 8H0Z' fill='black'/%3E%3C/svg%3E")`,
          maskRepeat: 'repeat-x',
          WebkitMaskRepeat: 'repeat-x'
        }}></div>
      </div>
    </div>
  );
};

export default StatsCard;
