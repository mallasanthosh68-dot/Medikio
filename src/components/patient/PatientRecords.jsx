import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PatientRecords = () => {
  const { patientMedicalRecords, showView, openModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Past Lab Reports',
    'Blood Test Reports',
    'Previous Prescriptions',
    'Medicine Reports',
    'Discharge Summaries',
    'Medical Certificates',
    'Other Documents'
  ];

  const filteredRecords = selectedCategory === 'All' 
    ? patientMedicalRecords 
    : patientMedicalRecords.filter(r => r.docType === selectedCategory || (selectedCategory === 'Blood Test Reports' && r.docType.includes('Blood')));

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Past Medical Records</h1>
          <p className="portal-sub">
            Add and review past lab reports, blood tests, previous prescriptions, and discharge summaries
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" onClick={() => showView('patient-upload')}>
            📁 Choose from Device
          </button>
          <button className="btn btn-emerald" onClick={() => openModal('camera-scanner')}>
            📷 Scan with Camera
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedCategory(cat)}
            style={{ whiteSpace: 'nowrap' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Records Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredRecords.map(rec => (
          <div key={rec.id} className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{rec.docType}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.35rem' }}>{rec.docType}</h3>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>{rec.date}</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
              {rec.summary}
            </p>

            {rec.items && rec.items.length > 0 && (
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  VERIFIED EXTRACTED ITEMS:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {rec.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span><strong>{item.test}</strong>:</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{item.result} {item.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
