import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, ArrowRight, Copy, CheckCircle } from 'lucide-react';
import highlightImage from '../assets/highlight-blue.png';

const Setup = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* The Notebook Card with Torn Edges */}
      <div className="relative w-full max-w-2xl bg-paper-card rounded-t-3xl rounded-b-3xl shadow-2xl animate-fade-in-up torn-paper-edge font-handwriting mt-8 mb-8">
        
        {/* Paper Texture Overlay inside the card */}
        <div className="absolute inset-0 paper-texture mix-blend-multiply opacity-60 pointer-events-none"></div>
        
        {/* Margin Line inside the card */}
        <div className="paper-margin-line pointer-events-none"></div>

        {/* Inner Content */}
        <div className="relative z-10 pt-[48px] pb-[48px] px-8 sm:px-12">
          
          {/* Header Block */}
          <div className="relative flex flex-col items-center justify-end pb-[8px] mb-6">
            <div className="absolute -top-12 mx-auto w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
              <BookOpen size={24} className="text-primary-600" />
            </div>
            
            <div className="relative inline-block mt-8 mb-[20px] text-center">
              {/* Organic Marker Highlight Image */}
              <img 
                src={highlightImage} 
                alt="" 
                className="absolute w-[120%] max-w-none h-[180%] -top-[45%] -left-[10%] mix-blend-multiply hue-rotate-[50deg] brightness-105 -z-10 object-fill opacity-90" 
              />
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-none">Extension Setup</h2>
            </div>
            <p className="text-xl font-medium text-slate-700 text-center mt-2 font-sans">
              Follow these steps to sync your LeetCode progress:
            </p>
          </div>

          <div className="relative z-20 space-y-6">
            {/* Steps Container */}
            <div className="space-y-4">
              
              {/* Step 1 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 border border-primary-300 flex items-center justify-center text-primary-800 font-bold text-xl mr-4 shadow-sm">1</div>
                <div className="flex-grow">
                  <p className="text-2xl font-bold text-slate-800 mt-1">Copy your secret token:</p>
                  <div className="mt-2 flex items-center bg-white border-2 border-slate-200 rounded-lg p-2 shadow-sm sketch-box group relative">
                    <input 
                      type="text" 
                      readOnly 
                      value={token || ''} 
                      className="flex-grow bg-transparent text-slate-600 font-mono text-sm focus:outline-none px-2"
                    />
                    <button 
                      onClick={handleCopy}
                      className="ml-2 p-2 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-md transition-colors"
                      title="Copy Token"
                    >
                      {copied ? <CheckCircle size={20} className="text-green-600" /> : <Copy size={20} />}
                    </button>
                    {copied && <span className="absolute -top-8 right-0 text-green-600 text-sm font-bold bg-white px-2 py-1 rounded shadow animate-fade-in font-sans">Copied!</span>}
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 border border-primary-300 flex items-center justify-center text-primary-800 font-bold text-xl mr-4 shadow-sm">2</div>
                <div className="flex-grow">
                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    Download the <a href="https://addons.mozilla.org/en-US/firefox/addon/beatcode-sync-leetcode-tracker/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 hover:underline">BeatCode Sync Extension</a>.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 border border-primary-300 flex items-center justify-center text-primary-800 font-bold text-xl mr-4 shadow-sm">3</div>
                <div className="flex-grow">
                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    Click on the <span className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded">Options</span> in the extension, paste your token in the blank field, and <span className="text-green-600">save it</span>.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 border border-primary-300 flex items-center justify-center text-primary-800 font-bold text-xl mr-4 shadow-sm">4</div>
                <div className="flex-grow">
                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    Open the <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 hover:underline">LeetCode page</a> and login to your account.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 border border-primary-300 flex items-center justify-center text-primary-800 font-bold text-xl mr-4 shadow-sm">5</div>
                <div className="flex-grow">
                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    Open the extension again, click the <span className="text-blue-600">Sync button</span>, and wait 1-2 minutes.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 border border-green-300 flex items-center justify-center text-green-800 font-bold text-xl mr-4 shadow-sm">✓</div>
                <div className="flex-grow">
                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    All things done now! You're ready to track.
                  </p>
                </div>
              </div>

            </div>

            {/* Button Group */}
            <div className="pt-4 flex flex-col justify-end relative pl-4 sm:pl-8">
              <button
                onClick={() => navigate('/')}
                className="group relative w-full h-[56px] flex items-center justify-center text-3xl font-handwriting font-bold text-slate-900 hover:text-slate-800 transition-all focus:outline-none mt-4"
              >
                <img 
                  src={highlightImage} 
                  alt="" 
                  className="absolute w-[110%] max-w-none h-[180%] -top-[40%] -left-[5%] mix-blend-multiply -z-10 transition-transform object-fill opacity-90 pointer-events-none" 
                />
                Go to Dashboard
                <ArrowRight size={24} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
