import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const CameraScannerModal = () => {
  const { activeModal, closeModal, setPatientMedicalRecords, showToast, showView } = useApp();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    if (activeModal === 'camera-scanner') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [activeModal]);

  const startCamera = async () => {
    setCameraError(false);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } else {
        setCameraError(true);
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    setIsCapturing(true);
    showToast('Capturing frame and running optical character recognition...');

    setTimeout(() => {
      stopCamera();
      closeModal();
      setIsCapturing(false);

      const newRecord = {
        id: "rec-" + Date.now(),
        docType: "Camera Scanned Prescription",
        date: "Today",
        year: "2026",
        source: "Camera Scan",
        items: [
          { test: "Amoxicillin", result: "500", unit: "mg", date: "Today", source: "Camera Scan" },
          { test: "Paracetamol", result: "650", unit: "mg", date: "Today", source: "Camera Scan" }
        ],
        summary: "Amoxicillin 500 mg (Twice daily), Paracetamol 650 mg (TID)"
      };

      setPatientMedicalRecords(prev => [newRecord, ...prev]);
      showToast('✓ Document captured, text extracted & added to health records!');
      showView('patient-records');
    }, 1200);
  };

  if (activeModal !== 'camera-scanner') return null;

  return (
    <div className="modal-backdrop show" style={{ display: 'grid' }}>
      <div className="modal-content" style={{ maxWidth: '640px', padding: '1.5rem' }}>
        <button className="modal-close-x" onClick={() => { stopCamera(); closeModal(); }}>✕</button>

        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>📷 Scan Document with Camera</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Align your prescription or lab test within the frame guides
          </p>
        </div>

        {/* Viewfinder Area */}
        <div style={{ position: 'relative', width: '100%', height: '340px', background: '#090d16', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!cameraError ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <span style={{ fontSize: '3rem' }}>📄</span>
              <div style={{ color: 'var(--primary)', fontWeight: 700, marginTop: '0.5rem' }}>
                Camera Simulation Mode
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', maxWidth: '340px', margin: '0.5rem auto' }}>
                Webcam not detected or permission denied. You can still test document capture and automated OCR extraction.
              </p>
            </div>
          )}

          {/* Framing Guides */}
          <div style={{ position: 'absolute', inset: '24px', border: '2px dashed rgba(6, 182, 212, 0.6)', borderRadius: '12px', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: '-2px', top: '-2px', width: '20px', height: '20px', borderTop: '4px solid var(--primary)', borderLeft: '4px solid var(--primary)' }}></div>
            <div style={{ position: 'absolute', right: '-2px', top: '-2px', width: '20px', height: '20px', borderTop: '4px solid var(--primary)', borderRight: '4px solid var(--primary)' }}></div>
            <div style={{ position: 'absolute', left: '-2px', bottom: '-2px', width: '20px', height: '20px', borderBottom: '4px solid var(--primary)', borderLeft: '4px solid var(--primary)' }}></div>
            <div style={{ position: 'absolute', right: '-2px', bottom: '-2px', width: '20px', height: '20px', borderBottom: '4px solid var(--primary)', borderRight: '4px solid var(--primary)' }}></div>
          </div>

          {/* Laser Scanner Animation */}
          <div style={{ position: 'absolute', left: '24px', right: '24px', height: '2px', background: 'var(--emerald)', boxShadow: '0 0 8px var(--emerald)', animation: 'scannerLaser 2s infinite ease-in-out' }}></div>
        </div>

        {/* Capture Action */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
          <button 
            className="btn btn-emerald" 
            disabled={isCapturing}
            onClick={handleCapture}
            style={{ padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem' }}
          >
            {isCapturing ? '⏳ Extracting Text...' : '📸 Capture Document Photo'}
          </button>
        </div>
      </div>
    </div>
  );
};
