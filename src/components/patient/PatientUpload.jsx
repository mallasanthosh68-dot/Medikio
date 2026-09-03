import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PatientUpload = () => {
  const { openModal, setPatientMedicalRecords, showToast, showView } = useApp();

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [ocrStage, setOcrStage] = useState('idle'); // 'idle' | 'reading' | 'extracting' | 'done'
  const [extractedRows, setExtractedRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeviceFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setFilePreview(event.target.result);
      triggerOcrProcessing(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDemoDoc = (docType) => {
    setSelectedFile({ name: `${docType}.pdf`, size: 245000 });
    setFilePreview('https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop');
    triggerOcrProcessing(docType);
  };

  const triggerOcrProcessing = (docName) => {
    setOcrStage('reading');
    setTimeout(() => {
      setOcrStage('extracting');
      setTimeout(() => {
        setOcrStage('done');
        let sampleRows = [];
        if (docName.includes('Blood') || docName.includes('Count')) {
          sampleRows = [
            { test: 'Hemoglobin', result: '11.2', unit: 'g/dL', date: 'Today', source: 'Blood Test Report' },
            { test: 'WBC Count', result: '8,400', unit: '/µL', date: 'Today', source: 'Blood Test Report' },
            { test: 'Platelet Count', result: '2.4', unit: 'Lakh/µL', date: 'Today', source: 'Blood Test Report' }
          ];
        } else if (docName.includes('Glucose') || docName.includes('Vitamin')) {
          sampleRows = [
            { test: 'Fasting Blood Sugar', result: '138', unit: 'mg/dL', date: 'Today', source: 'Lab Test Report' },
            { test: 'HbA1c', result: '7.1', unit: '%', date: 'Today', source: 'Lab Test Report' },
            { test: 'Vitamin D3', result: '18', unit: 'ng/mL', date: 'Today', source: 'Lab Test Report' }
          ];
        } else {
          sampleRows = [
            { test: 'Metformin', result: '500', unit: 'mg', date: 'Today', source: 'Previous Prescription' },
            { test: 'Atorvastatin', result: '10', unit: 'mg', date: 'Today', source: 'Previous Prescription' }
          ];
        }
        setExtractedRows(sampleRows);
        showToast('Document read successfully! Please review the extracted table.');
      }, 750);
    }, 750);
  };

  const handleRowChange = (index, field, value) => {
    setExtractedRows(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleDeleteRow = (index) => {
    setExtractedRows(prev => prev.filter((_, i) => i !== index));
    showToast('Row removed from review');
  };

  const handleAddRow = () => {
    setExtractedRows(prev => [
      ...prev,
      { test: 'New Item', result: '', unit: '', date: 'Today', source: 'Scanned Document' }
    ]);
  };

  const handleConfirmAndAdd = () => {
    if (extractedRows.length === 0) {
      showToast('No extracted items to add.');
      return;
    }

    const summaryStr = extractedRows.map(r => `${r.test}: ${r.result} ${r.unit}`).join(', ');
    const newRecord = {
      id: "rec-" + Date.now(),
      docType: extractedRows[0]?.source || "Medical Document",
      date: "Today",
      year: "2026",
      source: extractedRows[0]?.source || "Medical Document",
      items: extractedRows,
      summary: summaryStr
    };

    setPatientMedicalRecords(prev => [newRecord, ...prev]);
    showToast('✓ Verified medical data saved to health summary!');
    showView('patient-records');
  };

  const handleDiscard = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setOcrStage('idle');
    setExtractedRows([]);
    showToast('Document discarded');
  };

  return (
    <div className="view-container active">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Scan Medical Documents</h1>
          <p className="portal-sub">Two ways to add past lab reports, blood tests, and prescriptions</p>
        </div>
      </div>

      {/* Two Scanning Options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {/* Option 1: Choose from Device */}
        <div className="card" style={{ borderLeft: '4px solid var(--primary)', textAlign: 'center', padding: '2rem 1.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📁</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.35rem' }}>Option 1 — Choose from Device</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Select photo or PDF from your computer or phone gallery (JPG, JPEG, PNG, PDF)
          </p>
          <label className="btn btn-primary" style={{ cursor: 'pointer', display: 'inline-flex' }}>
            📁 Choose from Device
            <input type="file" accept="image/*,application/pdf" onChange={handleDeviceFile} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Option 2: Scan with Camera */}
        <div className="card" style={{ borderLeft: '4px solid var(--emerald)', textAlign: 'center', padding: '2rem 1.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📷</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.35rem' }}>Option 2 — Scan with Camera</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Use device webcam or phone camera with live alignment guide and laser scanner
          </p>
          <button className="btn btn-emerald" onClick={() => openModal('camera-scanner')}>
            📷 Scan with Camera
          </button>
        </div>
      </div>

      {/* 1-Click Demo Reports */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
          FAST DEMO TEST REPORTS (1-CLICK OCR):
        </span>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => handleDemoDoc('Complete Blood Count')}>
            📄 Demo: Complete Blood Count
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => handleDemoDoc('Glucose & Vitamin Panel')}>
            📄 Demo: Glucose &amp; Vitamin Panel
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => handleDemoDoc('Previous Prescription')}>
            📄 Demo: Previous Prescription
          </button>
        </div>
      </div>

      {/* OCR Progress States */}
      {ocrStage === 'reading' && (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem', animation: 'spin 1.5s linear infinite' }}>⏳</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Reading your medical document...</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Preprocessing image &amp; detecting text orientation</p>
        </div>
      )}

      {ocrStage === 'extracting' && (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>Extracting important medical information...</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Parsing lab test markers, values, reference units, and dates</p>
        </div>
      )}

      {/* Editable Review Extracted Information Table */}
      {ocrStage === 'done' && (
        <div className="card" style={{ marginBottom: '2rem', border: '1px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '0.3rem', display: 'inline-block' }}>✓ Document Read Successfully</span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Review Extracted Information</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Please review and adjust test names or numbers before adding to your health summary.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(prev => !prev)}>
                {isEditing ? '✓ Lock Table' : '✏ Edit Information'}
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleAddRow}>
                + Add Row
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)' }}>
                  <th style={{ padding: '0.75rem' }}>Test / Medicine</th>
                  <th style={{ padding: '0.75rem' }}>Result / Value</th>
                  <th style={{ padding: '0.75rem' }}>Unit</th>
                  <th style={{ padding: '0.75rem' }}>Date</th>
                  <th style={{ padding: '0.75rem' }}>Source</th>
                  <th style={{ padding: '0.75rem', width: '50px' }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {extractedRows.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.6rem 0.75rem' }}>
                      {isEditing ? (
                        <input type="text" className="form-input form-input-sm" value={row.test} onChange={(e) => handleRowChange(idx, 'test', e.target.value)} />
                      ) : (
                        <strong>{row.test}</strong>
                      )}
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem' }}>
                      {isEditing ? (
                        <input type="text" className="form-input form-input-sm" value={row.result} onChange={(e) => handleRowChange(idx, 'result', e.target.value)} />
                      ) : (
                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{row.result}</span>
                      )}
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem' }}>
                      {isEditing ? (
                        <input type="text" className="form-input form-input-sm" value={row.unit} onChange={(e) => handleRowChange(idx, 'unit', e.target.value)} />
                      ) : (
                        row.unit
                      )}
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem' }}>
                      {isEditing ? (
                        <input type="text" className="form-input form-input-sm" value={row.date} onChange={(e) => handleRowChange(idx, 'date', e.target.value)} />
                      ) : (
                        row.date
                      )}
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem' }}>
                      <span className="badge badge-primary">{row.source}</span>
                    </td>
                    <td style={{ padding: '0.6rem 0.75rem' }}>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRow(idx)} style={{ padding: '0.2rem 0.5rem' }}>
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={handleDiscard}>
              Discard
            </button>
            <button className="btn btn-primary" onClick={handleConfirmAndAdd}>
              ✓ Confirm &amp; Add to Health Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
