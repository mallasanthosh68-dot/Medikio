import React from 'react';
import { useApp } from '../../context/AppContext';

export const PrintableRxModal = () => {
  const { activeModal, closeModal, currentDoctor, currentPatient, activeDoctorDraftMeds } = useApp();

  if (activeModal !== 'printable-rx') return null;

  const doctor = currentDoctor || {
    name: "Dr. Arun Kumar",
    specialty: "Cardiology",
    regNo: "MCI-48291",
    hospital: "MediKiosk General Hospital",
    phone: "+91 98111 11222"
  };

  const patient = currentPatient || {
    name: "Ravi Kumar",
    age: 45,
    gender: "Male",
    mkId: "MK-10284"
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop show" style={{ display: 'grid' }}>
      <div className="modal-content" style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto', background: '#ffffff', color: '#090d16', padding: '2.5rem' }}>
        <button className="modal-close-x" onClick={closeModal} style={{ color: '#090d16' }}>✕</button>

        {/* Prescription Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #06b6d4', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              {doctor.name}
            </h2>
            <div style={{ fontSize: '0.9rem', color: '#0284c7', fontWeight: 700 }}>
              MD, DM ({doctor.specialty || doctor.specialization})
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
              Reg No: {doctor.regNo} • {doctor.hospital || "MediKiosk Hospital"}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#06b6d4' }}>MediKiosk e-Rx</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
              Date: {new Date().toLocaleDateString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Rx ID: RX-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        </div>

        {/* Patient Details Row */}
        <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '6px', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', fontSize: '0.85rem' }}>
          <div><strong>Patient:</strong> {patient.name}</div>
          <div><strong>Age / Sex:</strong> {patient.age} Y / {patient.gender}</div>
          <div><strong>Patient ID:</strong> {patient.mkId}</div>
          <div><strong>Diagnosis:</strong> Acute Exertional Angina / Eval</div>
        </div>

        {/* Symbol */}
        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0284c7', marginBottom: '0.75rem', fontFamily: 'serif' }}>
          ℞
        </div>

        {/* Medicines Table */}
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                <th style={{ padding: '0.6rem' }}>Medicine &amp; Strength</th>
                <th style={{ padding: '0.6rem' }}>Dose</th>
                <th style={{ padding: '0.6rem' }}>Frequency</th>
                <th style={{ padding: '0.6rem' }}>Timing</th>
                <th style={{ padding: '0.6rem' }}>Duration</th>
                <th style={{ padding: '0.6rem' }}>Instructions</th>
              </tr>
            </thead>
            <tbody>
              {activeDoctorDraftMeds.map((m, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.6rem' }}>
                    <strong>{m.name}</strong><br />
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.strength}</span>
                  </td>
                  <td style={{ padding: '0.6rem' }}>{m.dosage}</td>
                  <td style={{ padding: '0.6rem' }}>{m.frequency}</td>
                  <td style={{ padding: '0.6rem' }}>{m.food}</td>
                  <td style={{ padding: '0.6rem' }}>{m.duration}</td>
                  <td style={{ padding: '0.6rem', color: '#475569' }}>{m.instructions || 'As directed'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Advice */}
        <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          <strong>Doctor's Advice &amp; Lifestyle Guidance:</strong>
          <p style={{ margin: '0.25rem 0 0 0', color: '#334155' }}>
            Regular walking 30 mins daily. Restrict dietary sodium (&lt;2g/day). Avoid heavy lifting. Follow up in Cardiology OPD after 14 days with repeat ECG and lipid profile.
          </p>
        </div>

        {/* Signature & QR Code */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
          {/* QR Code */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '64px', height: '64px', background: '#0f172a', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '0.65rem', textAlign: 'center', fontWeight: 800 }}>
              SCAN QR VERIFY
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', maxWidth: '200px' }}>
              Scan QR code at hospital pharmacy counter to dispense medications digitally.
            </div>
          </div>

          {/* Doctor Stamp */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ border: '2px solid #047857', padding: '0.5rem 1rem', borderRadius: '6px', background: '#ecfdf5', display: 'inline-block', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 800 }}>DIGITALLY VERIFIED &amp; SIGNED</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#065f46' }}>{doctor.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#047857' }}>Reg: {doctor.regNo}</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
          <button className="btn btn-secondary" onClick={closeModal} style={{ color: '#090d16', borderColor: '#cbd5e1' }}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            🖨️ Print Official Prescription
          </button>
        </div>
      </div>
    </div>
  );
};
