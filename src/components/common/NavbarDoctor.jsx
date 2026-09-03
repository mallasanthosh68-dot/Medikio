import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const NavbarDoctor = () => {
  const { currentView, showView, currentDoctor, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'doctor-dashboard', label: 'Dashboard' },
    { id: 'doctor-patients', label: 'Patients' },
    { id: 'doctor-docs', label: 'Documents' },
    { id: 'doctor-prescriptions', label: 'Prescriptions' },
    { id: 'doctor-builder', label: 'Rx Builder' }
  ];

  return (
    <nav className="main-navbar" id="navbar-doctor">
      <div className="nav-logo" onClick={() => showView('doctor-dashboard')}>
        <div className="nav-logo-icon">
          <svg className="medikiosk-logo-svg" viewBox="0 0 100 100" fill="none">
            <rect x="6" y="6" width="88" height="88" rx="24" fill="#10b981" />
            <path d="M50 20 V80 M20 50 H80" stroke="rgba(255,255,255,0.22)" strokeWidth="8" strokeLinecap="round" />
            <circle cx="76" cy="24" r="14" fill="#06b6d4" />
          </svg>
        </div>
        <span className="nav-logo-text">MediKiosk</span>
        <span className="portal-tag doctor">Doctor Portal</span>
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
        <span style={{ fontSize: '0.85rem', color: 'var(--emerald)', fontWeight: 700 }} className="doc-name-badge">
          {currentDoctor ? currentDoctor.name : 'Dr. Arun Kumar'}
        </span>
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(prev => !prev)}>☰</button>
      </div>
    </nav>
  );
};
