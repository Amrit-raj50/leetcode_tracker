import React from 'react';
import highlightImage from '../../assets/highlight-blue.png';

const QuestionCard = ({ question, onComplete, completing, status, onSync }) => {
  const difficultyColors = {
    Easy: 'text-emerald-600',
    Medium: 'text-amber-600',
    Hard: 'text-rose-600'
  };

  const difficultyEmojis = {
    Easy: '🟢',
    Medium: '🟡',
    Hard: '🔴'
  };

  if (!question) {
    return (
      <div className="sketch-box p-6 text-center mt-[48px] relative z-10 bg-white/80">
        <div className="text-4xl mb-2">🔔</div>
        <h3 className="text-2xl font-handwriting font-bold text-slate-800 mb-2">No questions available</h3>
        <p className="text-xl font-handwriting text-slate-600 mb-6">You haven't synced any solved questions yet.</p>
        <button 
          onClick={onSync} 
          className="group relative h-[48px] px-8 flex items-center justify-center text-2xl font-handwriting font-bold text-slate-900 mx-auto"
        >
          <img 
            src={highlightImage} 
            alt="" 
            className="absolute w-[110%] max-w-none h-[180%] -top-[40%] -left-[5%] mix-blend-multiply hue-rotate-[220deg] brightness-110 saturate-[2] -z-10 transition-transform group-hover:scale-[1.03] group-hover:rotate-1 object-fill opacity-90 pointer-events-none" 
          />
          🔄 Sync Now
        </button>
      </div>
    );
  }

  return (
    <div className="sketch-box p-6 sm:px-8 mt-[48px] relative z-10 bg-white/80">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 h-auto min-h-[48px]">
        <div>
          <h3 className="text-3xl font-handwriting font-bold text-slate-900 leading-none">{question.title}</h3>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className={`text-xl font-handwriting font-bold ${difficultyColors[question.difficulty]}`}>
              {difficultyEmojis[question.difficulty]} {question.difficulty}
            </span>
            <span className="text-xl font-handwriting text-slate-500 font-bold">📊 {question.acceptanceRate ? Math.round(question.acceptanceRate) : '—'}%</span>
            <span className="text-xl font-handwriting text-slate-400">#{question.frontendId || '—'}</span>
          </div>
        </div>
        {status === 'completed' && (
          <div className="relative mt-4 sm:mt-0">
            <img 
              src={highlightImage} 
              alt="" 
              className="absolute w-[120%] max-w-none h-[180%] -top-[40%] -left-[10%] mix-blend-multiply hue-rotate-[250deg] brightness-120 saturate-[1.5] -z-10 object-fill opacity-80 pointer-events-none" 
            />
            <span className="text-2xl font-handwriting font-bold text-slate-900 px-2">
              ✅ Completed Today!
            </span>
          </div>
        )}
      </div>

      {question.topicTags && question.topicTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 min-h-[48px] items-center">
          <span className="text-xl font-handwriting font-bold text-slate-700 mr-2">Tags:</span>
          {question.topicTags.map((tag, i) => (
            <span key={i} className="text-xl font-handwriting font-medium text-blue-600 underline decoration-wavy decoration-blue-300 underline-offset-4">
              {tag.name || tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6 mt-6 pt-4 border-t-2 border-dashed border-slate-300 min-h-[48px] items-center justify-between">
        <a
          href={question.link || (question.slug ? `https://leetcode.com/problems/${question.slug}/` : '#')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-handwriting font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-2"
        >
          🔗 Open on LeetCode
        </a>
        
        {status !== 'completed' ? (
          <button
            onClick={onComplete}
            disabled={completing}
            className="group relative h-[48px] px-8 flex items-center justify-center text-2xl font-handwriting font-bold text-slate-900 hover:text-slate-800 transition-all focus:outline-none disabled:opacity-70"
          >
            <img 
              src={highlightImage} 
              alt="" 
              className="absolute w-[110%] max-w-none h-[180%] -top-[40%] -left-[5%] mix-blend-multiply hue-rotate-[240deg] brightness-110 saturate-[1.5] -z-10 transition-transform group-hover:scale-[1.03] group-hover:rotate-1 object-fill opacity-90 pointer-events-none" 
            />
            {completing ? '⏳ Completing...' : '✅ Mark as Revised'}
          </button>
        ) : (
          <button className="text-2xl font-handwriting font-bold text-slate-400 cursor-not-allowed" disabled>
            ✅ Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
