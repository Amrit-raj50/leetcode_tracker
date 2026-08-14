import React from 'react';

const colors = {
  yellow: '#fef08a', // vibrant yellow
  pink: '#f472b6',   // vibrant pink
  green: '#4ade80',  // vibrant green
  blue: '#60a5fa',   // vibrant blue
  orange: '#fb923c'  // vibrant orange
};

const Highlighter = ({ type = 'underline', color = 'yellow', className = '', style = {} }) => {
  const strokeColor = colors[color] || colors.yellow;
  const baseClasses = `absolute pointer-events-none mix-blend-multiply opacity-80 ${className}`;

  // Unique ID for the filter to avoid conflicts if multiple are rendered
  const filterId = `marker-texture-${Math.random().toString(36).substr(2, 9)}`;

  const filterDef = (
    <defs>
      <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  );

  switch (type) {
    case 'circle':
      return (
        <svg className={baseClasses} style={style} viewBox="0 0 100 100" preserveAspectRatio="none">
          {filterDef}
          <path
            d="M 50,5 C 80,5 95,25 95,50 C 95,80 75,95 50,95 C 25,95 5,75 5,50 C 5,20 25,5 65,10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            filter={`url(#${filterId})`}
          />
        </svg>
      );
    case 'underline':
      return (
        <svg className={baseClasses} style={style} viewBox="0 0 100 20" preserveAspectRatio="none">
          {filterDef}
          <path
            d="M 2,10 Q 30,5 60,12 T 98,10"
            fill="none"
            stroke={strokeColor}
            strokeWidth="10"
            strokeLinecap="round"
            filter={`url(#${filterId})`}
          />
        </svg>
      );
    case 'check':
      return (
        <svg className={baseClasses} style={style} viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
          {filterDef}
          <path
            d="M 8,25 L 20,38 L 45,8"
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${filterId})`}
          />
        </svg>
      );
    case 'arrow':
      return (
        <svg className={baseClasses} style={style} viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
          {filterDef}
          <path
            d="M 5,25 Q 40,20 85,25 M 70,10 L 90,25 L 70,40"
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${filterId})`}
          />
        </svg>
      );
    case 'box':
      return (
        <svg className={baseClasses} style={style} viewBox="0 0 100 100" preserveAspectRatio="none">
          {filterDef}
          <path
            d="M 5,5 L 95,8 L 92,95 L 8,92 Z"
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${filterId})`}
          />
        </svg>
      );
    case 'scribble':
      return (
        <svg className={baseClasses} style={style} viewBox="0 0 100 40" preserveAspectRatio="none">
          {filterDef}
          <path
            d="M 2,10 L 98,5 L 5,20 L 95,22 L 8,32 L 98,35"
            fill="none"
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${filterId})`}
          />
        </svg>
      );
    case 'scribble-dense':
      return (
        <svg className={baseClasses} style={style} viewBox="0 0 100 100" preserveAspectRatio="none">
          {filterDef}
          <path
            d="M 10,10 L 90,15 L 5,30 L 95,45 L 8,60 L 92,75 L 12,90 L 88,95"
            fill="none"
            stroke={strokeColor}
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${filterId})`}
          />
        </svg>
      );
    default:
      return null;
  }
};

export default Highlighter;
