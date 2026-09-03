import React from 'react';
import { useApp } from '../../context/AppContext';

export const DoctorDashboard = () => {
  const { currentDoctor, doctorPatients, openModal, showView } = useApp();

  const doctorName = currentDoctor ? currentDoctor.name : "Dr. Arun Kumar";
  const specialty = currentDoctor ? (currentDoctor.specialty || currentDoctor.specialization || "Cardiology") : "Cardiology";

  // If no patients yet, provide standard demo patients
  const queue = doctorPatients.length > 0 ? doctorPatients : [
    {
      id: "pt-demo-1",
      name: "Ravi Kumar",
      phone: "+91 98765 43210",
      age: 45,
      gender: "Male",
      concern: "Chest discomfort on exertion & breathing difficulty",
      priority: "HIGH",
      reviewStatus: "Waiting",
      symptoms: "Chest discomfort started yesterday, radiates slightly, heavier when walking. Accompanied by shortness of breath.",
      uncertainty: "Patient is unsure about exact dates/details (Preserved without forcing)",
      history: "Type 2 Diabetes (5 yrs), Hypertension",
      medicines: "Metformin 500 mg, Atorvastatin 10 mg",
      labResults: "Hemoglobin: 11.2 g/dL, WBC: 8,400 /µL, Vitamin D: 18 ng/mL"
    },
    {
      id: "pt-demo-2",
      name: "Sunita Verma",
      phone: "+91 98111 22334",
      age: 52,
      gender: "Female",
      concern: "Persistent cough & mild fever for 4 days",
      priority: "NORMAL",
      reviewStatus: "Waiting",
      symptoms: "Dry cough with low grade fever in evening. No chest pain.",
      uncertainty: "None",
      history: "Seasonal allergies",
      medicines: "Cetirizine 10 mg as needed",
      labResults: "WBC: 6,800 /µL, ESR: 14 mm/hr"
    }
  ];

  const highPriorityPatients = queue.filter(p => p.priority === 'HIGH');

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Doctor Dashboard</h1>
          <p className="portal-sub">
            Welcome, <strong>{doctorName}</strong> ({specialty}) • Clinical Triage &amp; Consultations
          </p>
        </div>
        <button className="btn btn-emerald" onClick={() => showView('doctor-builder')}>
          💊 New Prescription Builder
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TOTAL PATIENTS TODAY</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)', marginTop: '0.25rem' }}>{queue.length}</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--red)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>HIGH PRIORITY (TRIAGE)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--red)', marginTop: '0.25rem' }}>{highPriorityPatients.length}</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--amber)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PENDING CLINICAL REVIEW</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--amber)', marginTop: '0.25rem' }}>
            {queue.filter(p => p.reviewStatus !== 'Reviewed').length}
          </div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--emerald)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PRESCRIPTIONS ISSUED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--emerald)', marginTop: '0.25rem' }}>
            {queue.filter(p => p.reviewStatus === 'Reviewed').length}
          </div>
        </div>
      </div>

      {/* High Priority Alert Banner */}
      {highPriorityPatients.length > 0 && (
        <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid var(--red)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🚨</span>
            <div>
              <strong style={{ color: 'var(--red)', fontSize: '0.95rem' }}>
                Urgent Clinical Alert: {highPriorityPatients[0].name} ({highPriorityPatients[0].age} Y, {highPriorityPatients[0].gender})
              </strong>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Primary Concern: <strong>{highPriorityPatients[0].concern}</strong> • Priority triage flagged from AI intake
              </div>
            </div>
          </div>
          <button 
            className="btn btn-danger btn-sm" 
            onClick={() => openModal('doctor-review', { patient: highPriorityPatients[0] })}
            style={{ fontWeight: 800 }}
          >
            Review Patient Now ➔
          </button>
        </div>
      )}

      {/* Intake Queue */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Pre-Consultation Intake Queue</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Patients who have completed MediKiosk AI intake and transferred summaries
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '0.75rem' }}>Patient Name</th>
                <th style={{ padding: '0.75rem' }}>Chief Complaint</th>
                <th style={{ padding: '0.75rem' }}>Priority</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {queue.map(pt => (
                <tr key={pt.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <strong>{pt.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {pt.age} Y • {pt.gender} • {pt.blood || "O+"}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem', maxWidth: '300px' }}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pt.concern}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={pt.priority === 'HIGH' ? 'badge badge-danger' : 'badge badge-primary'}>
                      {pt.priority}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={pt.reviewStatus === 'Reviewed' ? 'badge badge-emerald' : 'badge badge-secondary'}>
                      {pt.reviewStatus === 'Reviewed' ? '✓ Reviewed' : '⏳ Waiting'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => openModal('doctor-review', { patient: pt })}
                      >
                        Review Summary
                      </button>
                      <button 
                        className="btn btn-emerald btn-sm"
                        onClick={() => showView('doctor-builder')}
                      >
                        Write Rx ➔
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
