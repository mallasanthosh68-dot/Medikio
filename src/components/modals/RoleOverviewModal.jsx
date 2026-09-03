import React from 'react';
import { useApp } from '../../context/AppContext';

export const RoleOverviewModal = () => {
  const { activeModal, closeModal, modalData } = useApp();

  if (activeModal !== 'role-overview') return null;

  const role = modalData.role || 'patient';

  return (
    <div className="modal-backdrop show" style={{ display: 'grid' }}>
      <div className="modal-content" style={{ maxWidth: '520px' }}>
        <button className="modal-close-x" onClick={closeModal}>✕</button>

        {role === 'patient' ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🧑‍⚕️</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.35rem' }}>
                Patient Portal Overview
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Self-service healthcare intake made simple
              </p>
            </div>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', background: 'rgba(6, 182, 212, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary)' }}>
                <span>🗣️</span>
                <div><strong>Talk to the AI:</strong> Explain symptoms using speech or text in English, Telugu, or Hindi.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', background: 'rgba(6, 182, 212, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary)' }}>
                <span>📷</span>
                <div><strong>Scan medical reports:</strong> Upload past lab tests or snap prescriptions with automated OCR extraction.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', background: 'rgba(6, 182, 212, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary)' }}>
                <span>📋</span>
                <div><strong>Organized Summary:</strong> View your clean chronological health history and receive digital doctor prescriptions.</div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🩺</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald)', marginTop: '0.35rem' }}>
                Doctor Dashboard Overview
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Faster consultations, smarter clinical intake
              </p>
            </div>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', background: 'rgba(16, 185, 129, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--emerald)' }}>
                <span>⏱️</span>
                <div><strong>Pre-Consultation Clinical Triage:</strong> Immediate insight into patient complaints, duration, and red flags.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', background: 'rgba(16, 185, 129, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--emerald)' }}>
                <span>📊</span>
                <div><strong>OCR Document Review:</strong> Inspect historical blood test values and previous medications verified side-by-side.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', background: 'rgba(16, 185, 129, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--emerald)' }}>
                <span>💊</span>
                <div><strong>Fast Prescription Builder:</strong> Select from 100+ medicines, set dosages and food instructions, and issue stamped Rx.</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={closeModal}>Got It</button>
        </div>
      </div>
    </div>
  );
};
