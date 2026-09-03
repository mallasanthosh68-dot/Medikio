import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const DoctorPatients = () => {
  const { doctorPatients, openModal, showView } = useApp();
  const [filter, setFilter] = useState('All');

  const patients = doctorPatients.length > 0 ? doctorPatients : [
    {
      id: "pt-1",
      name: "Ravi Kumar",
      phone: "+91 98765 43210",
      age: 45,
      gender: "Male",
      concern: "Chest discomfort on exertion",
      priority: "HIGH",
      reviewStatus: "Waiting",
      symptoms: "Chest discomfort started yesterday, radiates slightly, heavier when walking."
    },
    {
      id: "pt-2",
      name: "Sunita Verma",
      phone: "+91 98111 22334",
      age: 52,
      gender: "Female",
      concern: "Persistent dry cough",
      priority: "NORMAL",
      reviewStatus: "Reviewed",
      symptoms: "Dry cough with low grade fever in evening."
    }
  ];

  const filtered = filter === 'All' ? patients : patients.filter(p => p.priority === filter);

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Patient Consultations Directory</h1>
          <p className="portal-sub">All incoming patient intakes organized by clinical triage priority</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className={`btn btn-sm ${filter === 'All' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('All')}>
            All ({patients.length})
          </button>
          <button className={`btn btn-sm ${filter === 'HIGH' ? 'btn-danger' : 'btn-secondary'}`} onClick={() => setFilter('HIGH')}>
            High Priority ({patients.filter(p => p.priority === 'HIGH').length})
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(pt => (
          <div key={pt.id} className="card" style={{ borderLeft: pt.priority === 'HIGH' ? '4px solid var(--red)' : '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <span className={pt.priority === 'HIGH' ? 'badge badge-danger' : 'badge badge-primary'}>
                  {pt.priority} PRIORITY
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.35rem' }}>{pt.name}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  {pt.age} Y • {pt.gender} • {pt.phone}
                </div>
              </div>
              <span className={pt.reviewStatus === 'Reviewed' ? 'badge badge-emerald' : 'badge badge-secondary'}>
                {pt.reviewStatus === 'Reviewed' ? '✓ Reviewed' : '⏳ Waiting'}
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
              <strong>Chief Complaint:</strong> {pt.concern}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => openModal('doctor-review', { patient: pt })}>
                Review Summary
              </button>
              <button className="btn btn-emerald btn-sm" onClick={() => showView('doctor-builder')}>
                Prescribe ➔
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
