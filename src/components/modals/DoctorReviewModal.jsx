import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const DoctorReviewModal = () => {
  const { activeModal, closeModal, modalData, setDoctorPatients, showToast, showView } = useApp();
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (activeModal !== 'doctor-review') return null;

  const pt = modalData.patient || {
    id: "pt-1",
    name: "Ravi Kumar",
    phone: "+91 98765 43210",
    age: 45,
    gender: "Male",
    blood: "O+",
    concern: "Chest discomfort on exertion & breathing difficulty",
    priority: "HIGH",
    reviewStatus: "Waiting",
    symptoms: "Chest discomfort started yesterday, radiates slightly, heavier when walking. Shortness of breath on mild exertion.",
    uncertainty: "Patient is unsure about exact dates/details (Preserved without forcing)",
    history: "Type 2 Diabetes (5 yrs), Hypertension",
    medicines: "Metformin 500 mg, Atorvastatin 10 mg",
    labResults: "Hemoglobin: 11.2 g/dL, WBC: 8,400 /µL, Vitamin D: 18 ng/mL"
  };

  const handleConfirmReview = () => {
    setIsConfirmed(true);
    setDoctorPatients(prev => prev.map(p => p.id === pt.id ? { ...p, reviewStatus: 'Reviewed' } : p));
    showToast(`✓ Clinical summary for ${pt.name} officially reviewed and stamped!`);
  };

  return (
    <div className="modal-backdrop show" style={{ display: 'grid' }}>
      <div className="modal-content" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close-x" onClick={closeModal}>✕</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <div>
            <span className={pt.priority === 'HIGH' ? 'badge badge-danger' : 'badge badge-primary'}>
              {pt.priority} PRIORITY
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.35rem' }}>{pt.name}</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              {pt.age} Y • {pt.gender} • Blood: {pt.blood || "O+"} • Contact: {pt.phone}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className={pt.reviewStatus === 'Reviewed' || isConfirmed ? 'badge badge-emerald' : 'badge badge-secondary'}>
              {pt.reviewStatus === 'Reviewed' || isConfirmed ? '✓ REVIEWED' : '⏳ PENDING REVIEW'}
            </span>
          </div>
        </div>

        {/* Clinical Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          <div>
            <h4 style={{ color: 'var(--primary)', fontWeight: 800, marginBottom: '0.35rem' }}>
              1. Chief Complaint &amp; Adaptive AI Symptoms
            </h4>
            <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: 1.5, background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              {pt.symptoms}
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--amber)', fontWeight: 800, marginBottom: '0.35rem' }}>
              2. Preserved Patient Uncertainty
            </h4>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              "{pt.uncertainty}"
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--emerald)', fontWeight: 800, marginBottom: '0.35rem' }}>
              3. Verified Historical Lab Values (OCR)
            </h4>
            <p style={{ margin: 0, color: 'var(--text-main)', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              {pt.labResults}
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-main)', fontWeight: 800, marginBottom: '0.35rem' }}>
              4. Chronic Conditions &amp; Past Medications
            </h4>
            <p style={{ margin: 0, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              Conditions: {pt.history}<br />
              Medications: {pt.medicines}
            </p>
          </div>
        </div>

        {/* Official Stamped Confirmation Box */}
        {(pt.reviewStatus === 'Reviewed' || isConfirmed) && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '2px solid var(--emerald)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>✅</span>
            <div>
              <strong style={{ color: 'var(--emerald)', fontSize: '1rem' }}>OFFICIAL CLINICAL REVIEW CONFIRMED</strong>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Reviewed by <strong>Dr. Arun Kumar, MD (Cardiology)</strong> • Stamped at {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
          {!isConfirmed && pt.reviewStatus !== 'Reviewed' && (
            <button className="btn btn-primary" onClick={handleConfirmReview}>
              ✓ Confirm Patient Review &amp; Stamp
            </button>
          )}
          <button className="btn btn-emerald" onClick={() => { closeModal(); showView('doctor-builder'); }}>
            Proceed to Prescription Builder ➔
          </button>
        </div>
      </div>
    </div>
  );
};
