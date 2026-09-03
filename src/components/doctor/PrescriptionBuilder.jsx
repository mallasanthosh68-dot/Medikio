import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PrescriptionBuilder = () => {
  const { 
    medicinesDatabase, 
    activeDoctorDraftMeds, 
    setActiveDoctorDraftMeds, 
    openModal, 
    showToast 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [patientNotes, setPatientNotes] = useState('Advised regular walking, low sodium diet, and blood pressure monitoring.');

  const categories = [
    'All',
    'Antibiotics',
    'Pain & Fever',
    'Cardiology & BP',
    'Diabetes',
    'Gastric & Antacids',
    'Respiratory & Cough',
    'Vitamins & Supplements',
    'Neurology & Psych'
  ];

  const filteredCatalog = medicinesDatabase.filter(m => {
    const matchCat = selectedCat === 'All' || m.category === selectedCat;
    const matchSearch = searchTerm === '' || 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (m.composition && m.composition.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleAddMed = (med) => {
    const exists = activeDoctorDraftMeds.find(m => m.name === med.name);
    if (exists) {
      showToast(`${med.name} is already added to the prescription.`);
      return;
    }

    const newMed = {
      id: "draft-" + Date.now(),
      name: med.name,
      strength: med.strength || "",
      dosage: med.defaultDose || "1 tablet",
      frequency: med.defaultFreq || "Once a day",
      food: med.defaultFood || "After Food",
      duration: med.defaultDuration || "5 Days",
      instructions: ""
    };

    setActiveDoctorDraftMeds(prev => [...prev, newMed]);
    showToast(`Added ${med.name} to prescription draft.`);
  };

  const handleUpdateDraft = (index, field, val) => {
    setActiveDoctorDraftMeds(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const handleRemoveDraft = (index) => {
    setActiveDoctorDraftMeds(prev => prev.filter((_, i) => i !== index));
    showToast('Medicine removed from draft.');
  };

  const applyTemplate = (templateName) => {
    if (templateName === 'Cardio') {
      setActiveDoctorDraftMeds([
        { id: 't1', name: 'Atorvastatin', strength: '10 mg', dosage: '1 tablet', frequency: 'Once a day', food: 'Night', duration: '30 Days', instructions: 'Take with water after dinner' },
        { id: 't2', name: 'Aspirin (Cardio)', strength: '75 mg', dosage: '1 tablet', frequency: 'Once a day', food: 'After Food', duration: '30 Days', instructions: 'Take after breakfast' },
        { id: 't3', name: 'Metoprolol Succinate', strength: '25 mg', dosage: '1 tablet', frequency: 'Once a day', food: 'After Food', duration: '30 Days', instructions: 'Monitor pulse daily' }
      ]);
      showToast('Loaded template: Hypertension & Cholesterol Care');
    } else if (templateName === 'Bronchitis') {
      setActiveDoctorDraftMeds([
        { id: 't4', name: 'Amoxicillin + Clavulanic Acid', strength: '625 mg', dosage: '1 tablet', frequency: 'Twice a day', food: 'After Food', duration: '5 Days', instructions: 'Complete full course' },
        { id: 't5', name: 'Paracetamol', strength: '650 mg', dosage: '1 tablet', frequency: 'Three times a day', food: 'After Food', duration: '3 Days', instructions: 'Take when fever > 100°F' },
        { id: 't6', name: 'Acebrophylline + Montelukast', strength: '200 mg', dosage: '1 capsule', frequency: 'Once a day', food: 'Night', duration: '7 Days', instructions: 'Take at bedtime' }
      ]);
      showToast('Loaded template: Acute Bronchitis & Fever Care');
    } else if (templateName === 'Gastric') {
      setActiveDoctorDraftMeds([
        { id: 't7', name: 'Pantoprazole', strength: '40 mg', dosage: '1 tablet', frequency: 'Once a day', food: 'Before Food', duration: '14 Days', instructions: 'Take 30 mins before breakfast' },
        { id: 't8', name: 'Domperidone', strength: '10 mg', dosage: '1 tablet', frequency: 'Twice a day', food: 'Before Food', duration: '5 Days', instructions: 'Take before meals' }
      ]);
      showToast('Loaded template: Gastric Acidity & Dyspepsia Care');
    }
  };

  const handleIssuePrescription = () => {
    if (activeDoctorDraftMeds.length === 0) {
      showToast('Please add at least one medicine to the prescription.');
      return;
    }

    openModal('printable-rx', {
      medicines: activeDoctorDraftMeds,
      advice: patientNotes
    });
  };

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Digital Prescription Builder</h1>
          <p className="portal-sub">
            Search 100+ standard medications, adjust dosages, food directions, and issue signed Rx
          </p>
        </div>
        <button className="btn btn-emerald" onClick={handleIssuePrescription}>
          🖨️ Preview &amp; Issue Official Rx ➔
        </button>
      </div>

      {/* Clinical Template Quick-Fills */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>
          ⚡ 1-CLICK CLINICAL TEMPLATES:
        </span>
        <button className="btn btn-secondary btn-sm" onClick={() => applyTemplate('Cardio')}>
          Hypertension &amp; Cholesterol
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => applyTemplate('Bronchitis')}>
          Acute Bronchitis &amp; Fever
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => applyTemplate('Gastric')}>
          Gastric Acidity &amp; Dyspepsia
        </button>
      </div>

      {/* Two Column Layout: Catalog on Left, Prescription Draft on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Left Column: 100+ Medicines Catalog */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem' }}>Medicines Catalog</h3>

          <input
            type="text"
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search medicine or formula..."
            style={{ marginBottom: '0.75rem' }}
          />

          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`btn btn-sm ${selectedCat === cat ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedCat(cat)}
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', whiteSpace: 'nowrap' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ maxHeight: '480px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {filteredCatalog.slice(0, 30).map(m => (
              <div 
                key={m.id}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '0.6rem 0.75rem', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--border)' 
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{m.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {m.strength} • <span style={{ color: 'var(--primary)' }}>{m.category}</span>
                  </div>
                </div>
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => handleAddMed(m)}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Draft Table */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Draft Prescription</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {activeDoctorDraftMeds.length} medicine{activeDoctorDraftMeds.length === 1 ? '' : 's'} added
              </p>
            </div>
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={() => setActiveDoctorDraftMeds([])}
              style={{ fontSize: '0.75rem' }}
            >
              Clear All
            </button>
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)' }}>
                  <th style={{ padding: '0.6rem' }}>Medicine</th>
                  <th style={{ padding: '0.6rem' }}>Dose</th>
                  <th style={{ padding: '0.6rem' }}>Frequency</th>
                  <th style={{ padding: '0.6rem' }}>Food Timing</th>
                  <th style={{ padding: '0.6rem' }}>Duration</th>
                  <th style={{ padding: '0.6rem' }}>Notes</th>
                  <th style={{ padding: '0.6rem' }}>Del</th>
                </tr>
              </thead>
              <tbody>
                {activeDoctorDraftMeds.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>
                      No medicines added yet. Search and click "+ Add" from the catalog on the left.
                    </td>
                  </tr>
                ) : (
                  activeDoctorDraftMeds.map((m, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.5rem 0.6rem' }}>
                        <strong>{m.name}</strong><br />
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{m.strength}</span>
                      </td>
                      <td style={{ padding: '0.5rem 0.6rem' }}>
                        <input 
                          type="text" 
                          className="form-input form-input-sm" 
                          value={m.dosage} 
                          onChange={(e) => handleUpdateDraft(idx, 'dosage', e.target.value)} 
                          style={{ width: '85px' }} 
                        />
                      </td>
                      <td style={{ padding: '0.5rem 0.6rem' }}>
                        <select 
                          className="form-input form-input-sm" 
                          value={m.frequency} 
                          onChange={(e) => handleUpdateDraft(idx, 'frequency', e.target.value)}
                        >
                          <option>Once a day</option>
                          <option>Twice a day</option>
                          <option>Three times a day</option>
                          <option>As needed</option>
                          <option>Once a week</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.5rem 0.6rem' }}>
                        <select 
                          className="form-input form-input-sm" 
                          value={m.food} 
                          onChange={(e) => handleUpdateDraft(idx, 'food', e.target.value)}
                        >
                          <option>After Food</option>
                          <option>Before Food</option>
                          <option>With Food</option>
                          <option>Empty Stomach</option>
                          <option>Night</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.5rem 0.6rem' }}>
                        <input 
                          type="text" 
                          className="form-input form-input-sm" 
                          value={m.duration} 
                          onChange={(e) => handleUpdateDraft(idx, 'duration', e.target.value)} 
                          style={{ width: '75px' }} 
                        />
                      </td>
                      <td style={{ padding: '0.5rem 0.6rem' }}>
                        <input 
                          type="text" 
                          className="form-input form-input-sm" 
                          value={m.instructions} 
                          placeholder="Optional notes" 
                          onChange={(e) => handleUpdateDraft(idx, 'instructions', e.target.value)} 
                          style={{ width: '130px' }} 
                        />
                      </td>
                      <td style={{ padding: '0.5rem 0.6rem' }}>
                        <button 
                          className="btn btn-danger btn-sm" 
                          onClick={() => handleRemoveDraft(idx)} 
                          style={{ padding: '0.2rem 0.45rem' }}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Doctor Advice &amp; Lifestyle Instructions</label>
            <textarea
              className="form-input"
              rows="2"
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              placeholder="e.g. Drink plenty of water, monitor blood pressure, follow up in 2 weeks..."
            ></textarea>
          </div>

          <button 
            className="btn btn-emerald" 
            onClick={handleIssuePrescription}
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontWeight: 800, fontSize: '1rem' }}
          >
            Issue Signed Prescription with QR Verification ➔
          </button>
        </div>

      </div>
    </div>
  );
};
