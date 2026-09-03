import React from 'react';
import { useApp } from '../../context/AppContext';

export const DoctorDocs = () => {
  const { patientMedicalRecords } = useApp();

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Patient Medical Documents Library</h1>
          <p className="portal-sub">Inspect OCR-extracted lab reports, blood panels, and past prescriptions</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {patientMedicalRecords.map(rec => (
          <div key={rec.id} className="card" style={{ borderLeft: '4px solid var(--emerald)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-emerald">{rec.docType}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{rec.date}</span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>Patient: Ravi Kumar</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
              {rec.summary}
            </p>
            {rec.items && (
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
                {rec.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '0.2rem 0' }}>
                    <span>{item.test}</span>
                    <strong style={{ color: 'var(--emerald)' }}>{item.result} {item.unit}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
