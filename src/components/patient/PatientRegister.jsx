import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PatientRegister = () => {
  const { setRegisteredPatients, setCurrentPatient, setRole, showToast, showView } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    age: '',
    gender: 'Male',
    blood: 'O+'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.password) {
      showToast('Please fill in all required fields.');
      return;
    }

    const newPt = {
      ...formData,
      age: parseInt(formData.age) || 35,
      mkId: "MK-" + Math.floor(10000 + Math.random() * 90000)
    };

    setRegisteredPatients(prev => [...prev, newPt]);
    setCurrentPatient(newPt);
    setRole('patient');
    showToast(`Account created! Welcome, ${newPt.name}!`);
  };

  return (
    <div className="view-container active" style={{ maxWidth: '520px', margin: '2rem auto' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🧑‍⚕️</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.35rem' }}>Patient Registration</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Create your MediKiosk self-service health profile
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              placeholder="e.g. Ramesh Chandra" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-input" 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
              placeholder="+91 98765 43210" 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              placeholder="Create a secure password" 
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Age</label>
              <input 
                type="number" 
                className="form-input" 
                value={formData.age} 
                onChange={(e) => setFormData({ ...formData, age: e.target.value })} 
                placeholder="Age" 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select 
                className="form-input" 
                value={formData.gender} 
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Blood</label>
              <select 
                className="form-input" 
                value={formData.blood} 
                onChange={(e) => setFormData({ ...formData, blood: e.target.value })}
              >
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontWeight: 800, marginTop: '0.5rem' }}
          >
            Create Patient Account ➔
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
