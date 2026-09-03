import React from 'react';
import { useApp } from '../../context/AppContext';

export const DoctorProfileModal = () => {
  const { activeModal, closeModal, modalData } = useApp();

  if (activeModal !== 'doctor-profile') return null;

  const doc = modalData.doctor || {
    name: "Dr. Arun Kumar",
    specialty: "Cardiology",
    regNo: "MCI-48291",
    experience: "14 Years",
    hospital: "MediKiosk General Hospital",
    degrees: "MBBS, MD, DM (Cardiology)",
    languages: "English, Hindi, Telugu",
    focus: "Coronary artery evaluation, hypertension, preventative cardiology",
    avatar: "👨‍⚕️"
  };

  return (
    <div className="modal-backdrop show" style={{ display: 'grid' }}>
      <div className="modal-content" style={{ maxWidth: '480px' }}>
        <button className="modal-close-x" onClick={closeModal}>✕</button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '3rem' }}>{doc.avatar || '👨‍⚕️'}</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: '0.35rem' }}>{doc.name}</h2>
          <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem' }}>{doc.specialty}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
            Reg No: {doc.regNo} • {doc.experience} Experience
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
          <div><strong>Qualifications:</strong> {doc.degrees || "MBBS, MD, DM"}</div>
          <div><strong>Hospital Affiliation:</strong> {doc.hospital || "MediKiosk Hospital"}</div>
          <div><strong>Languages Spoken:</strong> {doc.languages || "English, Hindi, Telugu"}</div>
          <div><strong>Clinical Focus:</strong> {doc.focus || "General evaluation and consultation"}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};
