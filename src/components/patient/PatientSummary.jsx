import React from 'react';
import { useApp } from '../../context/AppContext';

export const PatientSummary = () => {
  const { currentPatient, patientMedicalRecords, doctorPatients } = useApp();

  const patient = currentPatient || {
    name: "Ravi Kumar",
    phone: "+91 98765 43210",
    age: 45,
    gender: "Male",
    blood: "O+",
    mkId: "MK-10284"
  };

  const consultation = doctorPatients[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">My Health Summary</h1>
          <p className="portal-sub">One-page comprehensive clinical record prepared for consulting doctors</p>
        </div>
        <button className="btn btn-primary" onClick={handlePrint}>
          🖨️ Print / Download PDF
        </button>
      </div>

      <div className="card" style={{ maxWidth: '850px', margin: '0 auto 2rem auto', padding: '2.5rem', background: '#ffffff', color: '#090d16', borderRadius: 'var(--radius-md)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #06b6d4', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#090d16', margin: 0 }}>MediKiosk Clinical Summary</h2>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>Automated AI Intake &amp; OCR Report Synthesis</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, background: '#e0f2fe', color: '#0284c7', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
              {patient.mkId}
            </span>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.35rem' }}>
              Generated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Patient Demographics Banner */}
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', fontSize: '0.85rem' }}>
          <div><strong>Patient:</strong> {patient.name}</div>
          <div><strong>Age / Sex:</strong> {patient.age} Y / {patient.gender}</div>
          <div><strong>Blood Group:</strong> {patient.blood}</div>
          <div><strong>Contact:</strong> {patient.phone}</div>
        </div>

        {/* Clinical Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
          <div>
            <h4 style={{ color: '#0284c7', fontWeight: 800, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.3rem', marginBottom: '0.5rem' }}>
              1. CHIEF COMPLAINT &amp; PRESENTING SYMPTOMS (AI Intake)
            </h4>
            <p style={{ margin: 0 }}>
              {consultation ? consultation.symptoms : "Patient reports chest discomfort on exertion starting yesterday, accompanied by mild breathing difficulty when walking. Symptoms feel heavy and radiate slightly. Triage: HIGH PRIORITY."}
            </p>
          </div>

          <div>
            <h4 style={{ color: '#0284c7', fontWeight: 800, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.3rem', marginBottom: '0.5rem' }}>
              2. HISTORICAL MEDICAL RECORDS &amp; LAB TESTS (OCR Extracted)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {patientMedicalRecords.map((rec, i) => (
                <li key={i} style={{ marginBottom: '0.35rem' }}>
                  <strong>{rec.docType} ({rec.date}):</strong> {rec.summary}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#0284c7', fontWeight: 800, borderBottom: '1px solid #e2e8f0', paddingBottom: '0.3rem', marginBottom: '0.5rem' }}>
              3. CURRENT MEDICATIONS &amp; ALLERGIES
            </h4>
            <p style={{ margin: 0 }}>
              <strong>Current Meds:</strong> Metformin 500mg BD, Atorvastatin 10mg OD.<br />
              <strong>Allergies:</strong> Penicillin (Skin rash).
            </p>
          </div>

          {consultation && consultation.reviewStatus === 'Reviewed' && (
            <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '6px', padding: '1rem' }}>
              <div style={{ fontWeight: 800, color: '#047857', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>✓</span> DOCTOR REVIEW CONFIRMATION
              </div>
              <div style={{ fontSize: '0.85rem', color: '#065f46', marginTop: '0.25rem' }}>
                Reviewed &amp; Approved by <strong>Dr. Arun Kumar, MD (Cardiology)</strong> • Prescription generated digitally.
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>
          <strong>CLINICAL NOTICE:</strong> This summary was prepared with automated assistance from the MediKiosk platform to facilitate physician review. It does not constitute a final clinical diagnosis. The consulting doctor retains ultimate diagnostic and prescribing authority.
        </div>
      </div>
    </div>
  );
};
