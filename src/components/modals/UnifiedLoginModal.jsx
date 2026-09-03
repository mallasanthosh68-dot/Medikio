import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const UnifiedLoginModal = () => {
  const { 
    activeModal, 
    closeModal, 
    openModal, 
    registeredPatients, 
    registeredDoctors, 
    hospitalDoctors, 
    setCurrentPatient, 
    setCurrentDoctor, 
    setRole, 
    showToast 
  } = useApp();

  const [role, setRoleState] = useState('patient'); // 'patient' | 'doctor'
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  if (activeModal !== 'unified-login') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = phone.trim();

    if (role === 'patient') {
      const found = registeredPatients.find(p => p.phone === cleanPhone && p.password === password);
      const activeP = found || {
        name: "Patient " + (cleanPhone.slice(-4) || "User"),
        phone: cleanPhone || "+91 98765 43210",
        age: 45,
        gender: "Male",
        blood: "O+",
        weight: 68,
        height: 174,
        mkId: "MK-" + Math.floor(10000 + Math.random() * 90000)
      };
      setCurrentPatient(activeP);
      closeModal();
      setRole('patient');
      showToast(`Welcome back, ${activeP.name}! (Patient Portal)`);
    } else {
      const found = registeredDoctors.find(d => d.phone === cleanPhone && d.password === password);
      let activeDoc = found;
      if (!activeDoc) {
        const matched = hospitalDoctors.find(d => d.phone === cleanPhone);
        if (matched) {
          activeDoc = {
            name: matched.name,
            phone: matched.phone,
            regNo: matched.regNo,
            specialization: matched.specialty,
            hospital: matched.hospital
          };
        } else {
          activeDoc = {
            name: "Dr. Arun Kumar",
            phone: cleanPhone || "+91 98111 11222",
            regNo: "DEMO-12345",
            specialization: "Cardiology",
            hospital: "MediKiosk Demo Hospital"
          };
        }
      }
      setCurrentDoctor(activeDoc);
      closeModal();
      setRole('doctor');
      showToast(`Welcome back, ${activeDoc.name}! (Doctor Dashboard)`);
    }
  };

  const handleQuickFill = (targetRole) => {
    setRoleState(targetRole);
    if (targetRole === 'patient') {
      setPhone('+91 98765 43210');
      setPassword('patient123');
      showToast('Autofilled sample patient login: Ravi Kumar');
    } else {
      setPhone('+91 98111 11222');
      setPassword('doctor123');
      showToast('Autofilled sample doctor login: Dr. Arun Kumar');
    }
  };

  return (
    <div className="modal-backdrop show" style={{ display: 'grid' }}>
      <div className="modal-content" style={{ maxWidth: '440px' }}>
        <button className="modal-close-x" onClick={closeModal}>✕</button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '0.35rem' }}>
            {role === 'patient' ? '🧑‍⚕️' : '🩺'}
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>Login</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Select your role to access your dedicated portal
          </p>
        </div>

        {/* Role Selector Pills */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label className="form-label" style={{ textAlign: 'center', display: 'block', marginBottom: '0.6rem', fontWeight: 700 }}>
            Select your role:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button
              type="button"
              className={role === 'patient' ? 'btn btn-primary' : 'btn btn-secondary'}
              onClick={() => setRoleState('patient')}
              style={{ justifyContent: 'center', fontWeight: 700, opacity: role === 'patient' ? 1 : 0.75 }}
            >
              🧑‍⚕️ Patient
            </button>
            <button
              type="button"
              className={role === 'doctor' ? 'btn btn-emerald' : 'btn btn-secondary'}
              onClick={() => setRoleState('doctor')}
              style={{ justifyContent: 'center', fontWeight: 700, opacity: role === 'doctor' ? 1 : 0.75 }}
            >
              🩺 Doctor
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={role === 'patient' ? "Enter patient phone number" : "Enter doctor phone number"}
              required
            />
            <div className="helper-text">
              {role === 'patient' ? "Enter your patient registered mobile number" : "Enter your doctor registered mobile number"}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className={role === 'patient' ? 'btn btn-primary' : 'btn btn-emerald'}
            style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', fontWeight: 700, fontSize: '1rem', marginTop: '0.25rem' }}
          >
            {role === 'patient' ? 'Login to Patient Portal' : 'Login to Doctor Dashboard'}
          </button>

          {/* Testing Shortcuts */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.4rem' }}>
              Testing Shortcuts:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleQuickFill('patient')}
                style={{ fontSize: '0.75rem' }}
              >
                ⚡ Fill Patient
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleQuickFill('doctor')}
                style={{ fontSize: '0.75rem' }}
              >
                ⚡ Fill Doctor
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Don't have an account?{' '}
            <a
              href="#register"
              onClick={(e) => { e.preventDefault(); openModal('unified-register'); }}
              style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}
            >
              Create Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
