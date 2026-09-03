import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const SendingSummaryModal = () => {
  const { activeModal, closeModal, modalData, showView } = useApp();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (activeModal === 'sending-summary') {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 700);
      const t2 = setTimeout(() => setStep(2), 1600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [activeModal]);

  if (activeModal !== 'sending-summary') return null;

  const doctorName = modalData.doctorName || "Dr. Arun Kumar";
  const specialty = modalData.specialty || "Cardiology";

  return (
    <div className="modal-backdrop show" style={{ display: 'grid' }}>
      <div className="modal-content" style={{ maxWidth: '440px', textAlign: 'center', padding: '2rem 1.5rem' }}>
        {step < 2 ? (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'spin 1.5s linear infinite' }}>
              📡
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
              {step === 0 ? "Encrypting Health Summary..." : `Transmitting to ${doctorName}...`}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Specialty: <strong>{specialty}</strong> • Secure hospital protocol
            </p>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
              ✅
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--emerald)' }}>
              Summary Delivered Successfully!
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '0.5rem', lineHeight: 1.5 }}>
              Your AI health intake and verified medical records have been securely added to <strong>{doctorName}</strong>'s priority queue.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => { closeModal(); showView('patient-summary'); }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                View Transferred Summary ➔
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => { closeModal(); showView('patient-home'); }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Return to Patient Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
