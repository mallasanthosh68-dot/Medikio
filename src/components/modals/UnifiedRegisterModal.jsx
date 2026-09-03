import React from 'react';
import { useApp } from '../../context/AppContext';

export const UnifiedRegisterModal = () => {
  const { activeModal, closeModal, openModal, showView } = useApp();

  if (activeModal !== 'unified-register') return null;

  const handleSelectRole = (role) => {
    closeModal();
    if (role === 'patient') {
      showView('patient-reg');
    } else {
      showView('doctor-reg');
    }
  };

  return (
    <div className="modal-backdrop show" style={{ display: 'grid' }}>
      <div className="modal-content" style={{ maxWidth: '460px' }}>
        <button className="modal-close-x" onClick={closeModal}>✕</button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.35rem' }}>✨</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>Create Your Account</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Select your role to register your dedicated account
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
          {/* Patient Option */}
          <div
            className="card"
            onClick={() => handleSelectRole('patient')}
            style={{ cursor: 'pointer', transition: 'all 0.2s', border: '1px solid var(--border)', padding: '1.1rem' }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'space-between', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem' }}>🧑‍⚕️</span>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>Patient</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Explain symptoms, scan reports &amp; view health summary
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 800 }}>➔</span>
            </div>
          </div>

          {/* Doctor Option */}
          <div
            className="card"
            onClick={() => handleSelectRole('doctor')}
            style={{ cursor: 'pointer', transition: 'all 0.2s', border: '1px solid var(--border)', padding: '1.1rem' }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--emerald)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'space-between', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem' }}>🩺</span>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--emerald)', fontSize: '1.1rem' }}>Doctor</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Review patient queues, clinical triage &amp; issue prescriptions
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '1.2rem', color: 'var(--emerald)', fontWeight: 800 }}>➔</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
          Already have an account?{' '}
          <a
            href="#login"
            onClick={(e) => { e.preventDefault(); openModal('unified-login'); }}
            style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};
