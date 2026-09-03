import React, { useState, useEffect } from 'react';

export const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className={`splash-screen-overlay ${progress >= 100 ? 'splash-fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <svg className="medikiosk-logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="splashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <rect x="6" y="6" width="88" height="88" rx="24" fill="url(#splashGrad)" />
            <path d="M50 20 V80 M20 50 H80" stroke="rgba(255,255,255,0.22)" strokeWidth="8" strokeLinecap="round" />
            <path d="M26 68 V36 L50 56 L74 36 V68" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="76" cy="24" r="14" fill="#10b981" stroke="#090d16" strokeWidth="3" />
            <path d="M76 16 V32 M68 24 H84" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="splash-title">MediKiosk</h1>
        <div className="splash-subtitle">Your Smart Hospital Assistant</div>
        <div className="splash-badge">AI Intake • Document OCR • Instant Prescriptions</div>

        <div className="splash-progress-bar">
          <div className="splash-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <button className="splash-skip-btn" onClick={() => setVisible(false)}>
          Skip Splash Screen ➔
        </button>
      </div>
    </div>
  );
};
