import React from 'react';
import { useApp } from '../../context/AppContext';

export const DoctorPrescriptions = () => {
  const { currentPrescription, openModal, showView } = useApp();

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Issued Prescriptions Archive</h1>
          <p className="portal-sub">Digital prescription history with verified QR codes and doctor signatures</p>
        </div>
        <button className="btn btn-emerald" onClick={() => showView('doctor-builder')}>
          + Create New Prescription
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--emerald)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="badge badge-emerald">Active Prescription</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Issued: Today</span>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.25rem' }}>Patient: Ravi Kumar</h3>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
            Consultant: Dr. Arun Kumar, MD (Cardiology)
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>Prescribed Medicines:</div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.82rem', lineHeight: 1.6 }}>
              <li><strong>Atorvastatin (10 mg)</strong> — 1 tablet • Night • 30 Days</li>
              <li><strong>Aspirin (Cardio) (75 mg)</strong> — 1 tablet • After Food • 30 Days</li>
            </ul>
          </div>

          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => openModal('printable-rx')}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            View Full Stamped Rx &amp; QR Code ➔
          </button>
        </div>
      </div>
    </div>
  );
};
