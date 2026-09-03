import React from 'react';
import { useApp } from '../../context/AppContext';

export const PatientMedicines = () => {
  const { patientScheduleTaken, setPatientScheduleTaken, showToast } = useApp();

  const scheduleMeds = [
    { id: 'med-1', name: 'Metformin', strength: '500 mg', timing: 'Morning', food: 'After Food', notes: 'Take with water after breakfast' },
    { id: 'med-2', name: 'Aspirin (Cardio)', strength: '75 mg', timing: 'Morning', food: 'After Food', notes: 'Cardiovascular prevention' },
    { id: 'med-3', name: 'Metformin', strength: '500 mg', timing: 'Afternoon', food: 'After Food', notes: 'Take after lunch' },
    { id: 'med-4', name: 'Atorvastatin', strength: '10 mg', timing: 'Night', food: 'Night', notes: 'Take with water after dinner' }
  ];

  const handleToggle = (id) => {
    setPatientScheduleTaken(prev => {
      const next = !prev[id];
      showToast(next ? 'Marked dose as taken!' : 'Dose unmarked');
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">My Medicines &amp; Daily Schedule</h1>
          <p className="portal-sub">Track your prescribed medications and check off your daily doses</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {['Morning', 'Afternoon', 'Night'].map(slot => (
          <div key={slot} className="card" style={{ borderTop: `4px solid ${slot === 'Morning' ? 'var(--amber)' : slot === 'Afternoon' ? 'var(--primary)' : 'var(--emerald)'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{slot === 'Morning' ? '🌅' : slot === 'Afternoon' ? '☀️' : '🌙'}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{slot} Doses</h3>
              </div>
              <span className="badge badge-secondary">{slot === 'Morning' ? '8:00 AM' : slot === 'Afternoon' ? '1:30 PM' : '9:00 PM'}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {scheduleMeds.filter(m => m.timing === slot).map(med => {
                const isChecked = !!patientScheduleTaken[med.id];
                return (
                  <div 
                    key={med.id}
                    onClick={() => handleToggle(med.id)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '0.75rem', 
                      background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.02)', 
                      borderRadius: 'var(--radius-sm)', 
                      border: isChecked ? '1px solid var(--emerald)' : '1px solid var(--border)',
                      cursor: 'pointer' 
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', textDecoration: isChecked ? 'line-through' : 'none', color: isChecked ? 'var(--emerald)' : 'var(--text-main)' }}>
                        {med.name} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({med.strength})</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                        {med.food} • {med.notes}
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={() => {}} 
                      style={{ width: '18px', height: '18px', accentColor: 'var(--emerald)' }} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
