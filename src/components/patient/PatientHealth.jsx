import React from 'react';
import { useApp } from '../../context/AppContext';

export const PatientHealth = () => {
  const { currentPatient } = useApp();

  const patient = currentPatient || {
    name: "Ravi Kumar",
    phone: "+91 98765 43210",
    age: 45,
    gender: "Male",
    blood: "O+",
    weight: 68,
    height: 174,
    mkId: "MK-10284"
  };

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">My Health Profile</h1>
          <p className="portal-sub">Basic demographics, vitals, and recorded medical history</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)' }}>
            👤 Demographics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <div><strong>Full Name:</strong> {patient.name}</div>
            <div><strong>MediKiosk ID:</strong> {patient.mkId}</div>
            <div><strong>Phone:</strong> {patient.phone}</div>
            <div><strong>Age / Gender:</strong> {patient.age} Yrs / {patient.gender}</div>
            <div><strong>Blood Group:</strong> <span className="badge badge-primary">{patient.blood}</span></div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--emerald)' }}>
            📊 Vitals &amp; Body Metrics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <div><strong>Height:</strong> {patient.height} cm</div>
            <div><strong>Weight:</strong> {patient.weight} kg</div>
            <div><strong>BMI:</strong> 22.5 kg/m² (Normal)</div>
            <div><strong>Resting Pulse:</strong> 74 bpm</div>
            <div><strong>Blood Pressure:</strong> 128 / 82 mmHg</div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--amber)' }}>
            ⚠️ Chronic Conditions &amp; Allergies
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <div><strong>Chronic Conditions:</strong> Type 2 Diabetes (Mild), Hypertension</div>
            <div><strong>Known Drug Allergies:</strong> Penicillin (Skin Rash)</div>
            <div><strong>Previous Surgeries:</strong> None reported / unsure</div>
            <div><strong>Emergency Contact:</strong> Suman Kumar (+91 98765 00000 - Spouse)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
