import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const NavbarPatient = () => {
  const { currentView, showView, currentPatient, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'patient-home', label: 'Home' },
    { id: 'patient-health', label: 'My Health' },
    { id: 'patient-records', label: 'Past Records' },
    { id: 'patient-interview', label: 'AI Health Check-Up' },
    { id: 'patient-upload', label: 'Scan Documents' },
    { id: 'patient-timeline', label: 'My History' },
    { id: 'patient-medicines', label: 'My Medicines' },
    { id: 'patient-summary', label: 'My Summary' }
  ];

  return (
    <nav className="main-navbar" id="navbar-patient">
      <div className="nav-logo" onClick={() => showView('patient-home')}>
        <div className="nav-logo-icon">
          <svg className="medikiosk-logo-svg" viewBox="0 0 100 100" fill="none">
            <rect x="6" y="6" width="88" height="88" rx="24" fill="#06b6d4" />
            <path d="M26 68 V36 L50 56 L74 36 V68" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="76" cy="24" r="14" fill="#10b981" />
          </svg>
        </div>
        <span className="nav-logo-text">MediKiosk</span>
        <span className="portal-tag patient">Patient Portal</span>
      </div>

      <ul className="nav-links">
        {navItems.map(item => (
          <li key={item.id}>
            <a 
              className={`nav-link ${currentView === item.id ? 'active' : ''}`}
              onClick={() => showView(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right-actions">
        <button className="btn btn-secondary btn-sm" onClick={() => showView('patient-health')}>
          👤 {currentPatient ? currentPatient.name : 'Profile'}
        </button>
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(prev => !prev)}>☰</button>
      </div>
    </nav>
  );
};
