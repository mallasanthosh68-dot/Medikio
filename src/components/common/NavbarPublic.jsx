import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const NavbarPublic = () => {
  const { currentView, showView, currentLang, setLanguage, openModal } = useApp();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    showView('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getLangName = (l) => {
    if (l === 'te') return 'తెలుగు';
    if (l === 'hi') return 'हिन्दी';
    if (l === 'ta') return 'தமிழ்';
    if (l === 'kn') return 'ಕನ್ನಡ';
    return 'English';
  };

  return (
    <>
      <nav className="main-navbar" id="navbar-public">
        <div className="nav-logo" onClick={() => showView('home')}>
          <div className="nav-logo-icon">
            <svg className="medikiosk-logo-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mkGradPubReact" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <rect x="6" y="6" width="88" height="88" rx="24" fill="url(#mkGradPubReact)" />
              <path d="M50 20 V80 M20 50 H80" stroke="rgba(255,255,255,0.22)" strokeWidth="8" strokeLinecap="round" />
              <path d="M26 68 V36 L50 56 L74 36 V68" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="76" cy="24" r="14" fill="#10b981" stroke="#090d16" strokeWidth="3" />
              <path d="M76 16 V32 M68 24 H84" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="nav-logo-text">MediKiosk</span>
        </div>

        {/* CENTER NAVIGATION LINKS */}
        <ul className="nav-links">
          <li>
            <a 
              className={`nav-link ${currentView === 'home' ? 'active' : ''}`} 
              onClick={() => showView('home')}
            >
              Home
            </a>
          </li>
          <li>
            <a className="nav-link" onClick={() => scrollToSection('how-it-works')}>
              How It Works
            </a>
          </li>
          <li>
            <a className="nav-link" onClick={() => scrollToSection('features')}>
              Features
            </a>
          </li>
          <li>
            <a className="nav-link" onClick={() => scrollToSection('team')}>
              Team
            </a>
          </li>
          <li>
            <a className="nav-link" onClick={() => scrollToSection('about')}>
              About
            </a>
          </li>
        </ul>

        {/* FAR RIGHT: AUTHENTICATION CONTROLS (LOGIN & CREATE ACCOUNT) */}
        <div className="nav-right-actions">
          {/* Language Selector */}
          <div className="lang-dropdown-wrapper">
            <button className="lang-select-btn" onClick={() => setLangMenuOpen(prev => !prev)}>
              <span>🌐</span>
              <span>{getLangName(currentLang)}</span>
              <span style={{ fontSize: '0.7rem' }}>▼</span>
            </button>
            {langMenuOpen && (
              <div className="lang-menu show">
                <button className={`lang-item ${currentLang === 'en' ? 'selected' : ''}`} onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}>English</button>
                <button className={`lang-item ${currentLang === 'te' ? 'selected' : ''}`} onClick={() => { setLanguage('te'); setLangMenuOpen(false); }}>తెలుగు (Telugu)</button>
                <button className={`lang-item ${currentLang === 'hi' ? 'selected' : ''}`} onClick={() => { setLanguage('hi'); setLangMenuOpen(false); }}>हिन्दी (Hindi)</button>
                <button className={`lang-item ${currentLang === 'ta' ? 'selected' : ''}`} onClick={() => { setLanguage('ta'); setLangMenuOpen(false); }}>தமிழ் (Tamil)</button>
                <button className={`lang-item ${currentLang === 'kn' ? 'selected' : ''}`} onClick={() => { setLanguage('kn'); setLangMenuOpen(false); }}>ಕನ್ನಡ (Kannada)</button>
              </div>
            )}
          </div>

          <button 
            className="btn btn-secondary btn-sm" 
            id="nav-btn-login"
            onClick={() => openModal('unified-login')}
            style={{ fontWeight: 700, padding: '0.45rem 1.1rem' }}
          >
            Login
          </button>

          <button 
            className="btn btn-primary btn-sm" 
            id="nav-btn-register"
            onClick={() => openModal('unified-register')}
            style={{ fontWeight: 700, padding: '0.45rem 1.15rem' }}
          >
            Create Account
          </button>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu active" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.25rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
          <button className="nav-link" onClick={() => { showView('home'); setMobileMenuOpen(false); }}>Home</button>
          <button className="nav-link" onClick={() => scrollToSection('how-it-works')}>How It Works</button>
          <button className="nav-link" onClick={() => scrollToSection('features')}>Features</button>
          <button className="nav-link" onClick={() => scrollToSection('team')}>Team</button>
          <button className="nav-link" onClick={() => scrollToSection('about')}>About</button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={() => { setMobileMenuOpen(false); openModal('unified-login'); }}>Login</button>
            <button className="btn btn-primary" onClick={() => { setMobileMenuOpen(false); openModal('unified-register'); }}>Create Account</button>
          </div>
        </div>
      )}
    </>
  );
};
