import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const DoctorRegister = () => {
  const { setRegisteredDoctors, setCurrentDoctor, setRole, showToast, showView } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    regNo: '',
    specialty: 'Cardiology',
    hospital: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.regNo || !formData.password) {
      showToast('Please fill in all required fields.');
      return;
    }

    const newDoc = {
      ...formData,
      specialization: formData.specialty
    };

    setRegisteredDoctors(prev => [...prev, newDoc]);
    setCurrentDoctor(newDoc);
    setRole('doctor');
    showToast(`Doctor profile registered! Welcome, ${newDoc.name}!`);
  };

  return (
    <div className="view-container active" style={{ maxWidth: '540px', margin: '2rem auto' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🩺</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.35rem' }}>Doctor Registration</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Join MediKiosk hospital network for streamlined clinical consultations
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Doctor Full Name (with Title)</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              placeholder="e.g. Dr. Sneha Reddy" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input 
              type="tel" 
              className="form-input" 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
              placeholder="+91 98111 22334" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Medical Council Registration Number</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.regNo} 
              onChange={(e) => setFormData({ ...formData, regNo: e.target.value })} 
              placeholder="e.g. MCI / TSMC-44821" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Primary Specialty</label>
            <select 
              className="form-input" 
              value={formData.specialty} 
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            >
              <option value="Cardiology">Cardiology</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Neurology">Neurology</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Nephrology">Nephrology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Hospital / Clinic Affiliation</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.hospital} 
              onChange={(e) => setFormData({ ...formData, hospital: e.target.value })} 
              placeholder="e.g. Apollo / MediKiosk General Hospital" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              placeholder="Create doctor portal password" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-emerald" 
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontWeight: 800, marginTop: '0.5rem' }}
          >
            Register Doctor Account ➔
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Already registered?{' '}
            <a href="#login" onClick={(e) => { e.preventDefault(); showView('home'); }} style={{ color: 'var(--primary)', fontWeight: 700 }}>
              Go to Home &amp; Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
