import React from 'react';
import { useApp } from '../../context/AppContext';

export const PatientHome = () => {
  const { currentPatient, showView, patientDoctorRequests, doctorPatients } = useApp();

  const patientName = currentPatient ? currentPatient.name : "Patient";
  const mkId = currentPatient ? currentPatient.mkId : "MK-10284";

  // Check if any consultation request is waiting for or completed by doctor
  const activeReq = patientDoctorRequests[0];
  const activeConsultation = doctorPatients[0];

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Welcome back, {patientName}</h1>
          <p className="portal-sub">
            MediKiosk ID: <strong style={{ color: 'var(--primary)' }}>{mkId}</strong> • Self-Service Health Intake
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => showView('patient-interview')}>
          🗣️ Start AI Health Check-Up
        </button>
      </div>

      {/* Consultation Status Banner */}
      {activeReq && (
        <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>
              {activeConsultation && activeConsultation.reviewStatus === 'Reviewed' ? '✓ Consultation Reviewed by Doctor' : '⏳ Consultation Sent to Doctor'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Doctor: <strong>{activeReq.doctorName}</strong> ({activeReq.specialty}) • Status: {activeConsultation && activeConsultation.reviewStatus === 'Reviewed' ? 'Completed & Prescribed' : 'In Doctor Queue'}
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => showView('patient-summary')}>
            View Summary ➔
          </button>
        </div>
      )}

      {/* Action Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="card" onClick={() => showView('patient-interview')} style={{ cursor: 'pointer', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🗣️</div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.35rem' }}>AI Health Check-Up</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Speak or type your symptoms. AI conducts an adaptive pre-consultation interview.
          </p>
        </div>

        <div className="card" onClick={() => showView('patient-upload')} style={{ cursor: 'pointer', borderLeft: '4px solid var(--emerald)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.35rem' }}>Scan Medical Documents</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Choose from device or scan with camera using automated OCR text extraction.
          </p>
        </div>

        <div className="card" onClick={() => showView('patient-records')} style={{ cursor: 'pointer', borderLeft: '4px solid var(--amber)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.35rem' }}>Past Medical Records</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            View categorized blood reports, previous prescriptions, and lab tests.
          </p>
        </div>

        <div className="card" onClick={() => showView('patient-timeline')} style={{ cursor: 'pointer', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.35rem' }}>Medical History Timeline</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Explore your chronological health history across 2024, 2025, and 2026.
          </p>
        </div>
      </div>
    </div>
  );
};
