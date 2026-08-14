import React from 'react';
import highlightImage from '../assets/highlight-blue.png';

const HighlighterHeadline = ({ icon, title, color = 'yellow' }) => {
  // Hue rotation mapping for different highlighter colors
  const hueRotations = {
    yellow: 'hue-rotate-[220deg] brightness-125 saturate-[2]', // Yellow-ish
    pink: 'hue-rotate-[300deg] brightness-105 saturate-[1.5]', // Pink-ish
    blue: 'hue-rotate-[0deg] brightness-100', // Default blue
    green: 'hue-rotate-[250deg] brightness-120 saturate-[1.5]', // Green-ish
  };

  return (
    <div className="h-[48px] relative flex flex-row items-end pb-[4px] mb-[48px]">
      <div className="relative inline-block ml-4 sm:ml-8">
        <img 
          src={highlightImage} 
          alt="" 
          className={`absolute w-[120%] max-w-none h-[160%] -top-[30%] -left-[10%] mix-blend-multiply ${hueRotations[color] || hueRotations.yellow} -z-10 object-fill opacity-85 pointer-events-none`} 
        />
        <h2 className="text-3xl font-handwriting font-bold text-slate-900 tracking-tight leading-none">
          {icon} {title}
        </h2>
      </div>
    </div>
  );
};

export default HighlighterHeadline;
