import React from 'react';
import { useApp } from '../../context/AppContext';

export const TopUtilityBar = () => {
  const { 
    toggleHighContrast, 
    adjustFontSize, 
    toggleTextToSpeech, 
    textToSpeechActive,
    triggerEmergencyAlert, 
    resetDemoData 
  } = useApp();

  return (
    <div className="top-utility-bar">
      <div className="demo-mode-pill">
        <span className="demo-mode-dot"></span>
        <span>● DEMO MODE • Synthetic Data Only</span>
      </div>

      <div className="utility-actions">
        <button className="util-btn" onClick={toggleHighContrast} title="Toggle High Contrast">
          🌓 Contrast
        </button>
        <button className="util-btn" onClick={() => adjustFontSize(1)} title="Increase Font Size">
          A+
        </button>
        <button className="util-btn" onClick={() => adjustFontSize(-1)} title="Decrease Font Size">
          A-
        </button>
        <button className="util-btn" onClick={toggleTextToSpeech} title="Toggle Voice Assistance">
          {textToSpeechActive ? '🔊 Voice On' : '🔇 Voice Off'}
        </button>
        <button className="util-btn" style={{ color: 'var(--red)' }} onClick={triggerEmergencyAlert}>
          🚨 SOS
        </button>
        <button className="util-btn" onClick={resetDemoData}>
          🔄 Reset Demo
        </button>
      </div>
    </div>
  );
};
