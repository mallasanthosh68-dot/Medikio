import React from 'react';
import { useApp } from '../../context/AppContext';

export const PatientTimeline = () => {
  const { patientMedicalRecords } = useApp();

  const timelineItems = [
    {
      year: '2026',
      date: 'Today / Present',
      title: 'Current Acute Consultation Intake',
      category: 'AI Intake',
      color: 'var(--red)',
      source: 'AI Health Interview',
      content: 'Chest discomfort on exertion, breathing difficulty when walking, and general weakness. Triage Priority: HIGH.'
    },
    ...patientMedicalRecords.map(rec => ({
      year: rec.year || '2025',
      date: rec.date,
      title: rec.docType,
      category: rec.docType.includes('Blood') ? 'Lab Test' : 'Prescription',
      color: rec.docType.includes('Blood') ? 'var(--primary)' : 'var(--emerald)',
      source: rec.source,
      content: rec.summary
    }))
  ];

  // Sort descending by year
  timelineItems.sort((a, b) => b.year.localeCompare(a.year));

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Medical History Timeline</h1>
          <p className="portal-sub">Chronological overview of past hospital visits, tests, and prescriptions</p>
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '1rem auto 3rem auto', paddingLeft: '2rem' }}>
        {/* Rail Line */}
        <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '3px', background: 'var(--border)' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {timelineItems.map((item, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              {/* Node Dot */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '-2rem', 
                  top: '1.25rem', 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  background: item.color, 
                  boxShadow: `0 0 10px ${item.color}`,
                  border: '3px solid var(--bg-surface)' 
                }} 
              />

              <div className="card" style={{ borderLeft: `4px solid ${item.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <span className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: item.color, fontSize: '0.72rem' }}>
                      {item.category}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '0.35rem' }}>{item.title}</h3>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 700 }}>
                    {item.date} ({item.year})
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
                  {item.content}
                </p>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>Source:</span>
                  <span className="badge badge-secondary">{item.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
