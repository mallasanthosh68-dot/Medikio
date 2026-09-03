import React from 'react';
import { useApp } from '../../context/AppContext';

export const HomeView = () => {
  const { openModal } = useApp();

  return (
    <div className="view-container active">
      {/* 3. HERO SECTION */}
      <div className="hero-section">
        <div className="hero-badge">
          ✨ Smart Hospital Assistant • Built for SIH 2026
        </div>
        <h1 className="hero-title">MediKiosk</h1>
        <div className="hero-subtitle">Your Smart Hospital Assistant</div>
        <p className="hero-desc">
          A smart digital assistant that helps patients share their health information and helps doctors review it more easily.
        </p>

        {/* 4. WHO ARE YOU? SECTION (CENTER OF HOMEPAGE) */}
        <div className="role-selection-box" id="section-who-are-you">
          <h2 className="role-selection-title">Who are you?</h2>
          <p className="role-selection-sub">Select your role to learn how MediKiosk simplifies healthcare intake.</p>

          <div className="role-cards-grid">
            
            {/* PATIENT CARD (No Login or Register buttons) */}
            <div className="role-choice-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="role-card-icon" style={{ fontSize: '2.2rem' }}>🧑‍⚕️</span>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>PATIENT PORTAL</span>
              </div>
              <h3 className="role-card-title" style={{ color: 'var(--primary)', fontSize: '1.35rem', marginBottom: '0.35rem' }}>PATIENT</h3>
              <p className="role-card-desc" style={{ fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--text-muted)', marginBottom: '1rem' }}>
                As a patient, you can easily organize your health background before meeting your doctor:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.86rem', color: 'var(--text-main)', textAlign: 'left' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span> <span><strong>Talk to the AI</strong> naturally using speech in your preferred language</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span> <span><strong>Type health information</strong> &amp; describe symptoms at your own pace</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span> <span><strong>Scan previous medical reports</strong> via camera or device upload</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span> <span><strong>Upload medical documents</strong> (prescriptions, blood tests, certificates)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span> <span><strong>View health summaries</strong> arranged into clear chronological timelines</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✔</span> <span><strong>Receive prescriptions</strong> digitally from your consulting doctor</span>
                </li>
              </ul>
              <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => openModal('role-overview', { role: 'patient' })}
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 700, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                >
                  Explore Patient Portal
                </button>
              </div>
            </div>

            {/* DOCTOR CARD (No Login or Register buttons) */}
            <div className="role-choice-card doctor">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="role-card-icon" style={{ fontSize: '2.2rem' }}>🩺</span>
                <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>DOCTOR DASHBOARD</span>
              </div>
              <h3 className="role-card-title" style={{ color: 'var(--emerald)', fontSize: '1.35rem', marginBottom: '0.35rem' }}>DOCTOR</h3>
              <p className="role-card-desc" style={{ fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--text-muted)', marginBottom: '1rem' }}>
                As a doctor, save consultation time with structured clinical triage &amp; instant prescription tools:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.86rem', color: 'var(--text-main)', textAlign: 'left' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--emerald)', fontWeight: 'bold' }}>✔</span> <span><strong>Review patient summaries</strong> with AI triage &amp; priority screening</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--emerald)', fontWeight: 'bold' }}>✔</span> <span><strong>Review medical documents</strong> with verified OCR test extractions</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--emerald)', fontWeight: 'bold' }}>✔</span> <span><strong>Review patient history</strong> through an intuitive year-by-year timeline</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--emerald)', fontWeight: 'bold' }}>✔</span> <span><strong>Search medicines</strong> across a database of 100+ standard medications</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--emerald)', fontWeight: 'bold' }}>✔</span> <span><strong>Create prescriptions</strong> with customized dosages &amp; food instructions</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--emerald)', fontWeight: 'bold' }}>✔</span> <span><strong>Send prescriptions to patients</strong> directly with digital QR confirmation</span>
                </li>
              </ul>
              <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => openModal('role-overview', { role: 'doctor' })}
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 700, borderColor: 'rgba(16, 185, 129, 0.4)' }}
                >
                  Explore Doctor Portal
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 5. FEATURES SECTION */}
      <div className="section-wrap" id="features">
        <div className="section-header">
          <div className="section-tag">WHAT MEDIKIOSK DOES</div>
          <h2 className="section-title">Simple &amp; Powerful Features</h2>
          <p className="section-desc">Easy to understand without complex medical jargon.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-box">🗣</div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>Talk to AI</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Type or speak naturally in your preferred language.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">📝</div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>Smart Questions</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Questions change automatically based on what you answer.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">⚠</div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>Health Alerts</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Important warning signs are highlighted for quick attention.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">📄</div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>Read Documents</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Upload old prescriptions and lab reports by taking a photo.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">🔍</div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>Find Important Info</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Medicines, tests, and doses are extracted automatically.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">📅</div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>Health Timeline</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>See your past hospital visits and tests clearly arranged.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">📋</div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>Doctor Summary</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>A concise 1-page health summary prepared for the doctor.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">💊</div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>Digital Prescriptions</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Doctor selects from 100+ medicines, sets timing &amp; food instructions.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-box">🌐</div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>Multiple Languages</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Use MediKiosk in English, Telugu, Hindi, Tamil, or Kannada.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. HOW IT WORKS SECTION */}
      <div className="section-wrap" id="how-it-works">
        <div className="section-header">
          <div className="section-tag">SIMPLE 5-STEP PROCESS</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">Everything is designed so anyone can use it easily within 3 minutes.</p>
        </div>

        <div className="how-grid">
          <div className="how-card">
            <div className="how-number">1</div>
            <div className="how-icon">📝</div>
            <div className="how-card-title">Register</div>
            <div className="how-card-desc">Patient creates an account with basic details and password.</div>
          </div>
          <div className="how-card">
            <div className="how-number">2</div>
            <div className="how-icon">💬</div>
            <div className="how-card-title">Tell Us</div>
            <div className="how-card-desc">Patient talks or types about their health problem naturally.</div>
          </div>
          <div className="how-card">
            <div className="how-number">3</div>
            <div className="how-icon">📷</div>
            <div className="how-card-title">Upload</div>
            <div className="how-card-desc">Patient uploads old prescriptions or lab test reports.</div>
          </div>
          <div className="how-card">
            <div className="how-number">4</div>
            <div className="how-icon">📊</div>
            <div className="how-card-title">Organize</div>
            <div className="how-card-desc">MediKiosk reads the reports and creates a clear timeline.</div>
          </div>
          <div className="how-card">
            <div className="how-number">5</div>
            <div className="how-icon">🩺</div>
            <div className="how-card-title">Doctor Review</div>
            <div className="how-card-desc">Doctor checks summary, prescribes medicines, and confirms.</div>
          </div>
        </div>

        {/* Information Flow Visual */}
        <div className="flow-graphic-card" style={{ marginTop: '2rem' }}>
          <div className="flow-graphic-title">HOW INFORMATION FLOWS</div>
          <div className="flow-steps">
            <div className="flow-node">
              <div className="flow-node-icon">🧑</div>
              <div className="flow-node-title">Patient</div>
              <div className="flow-node-sub">Gives basic details &amp; symptoms</div>
            </div>
            <div className="flow-arrow">➔</div>
            <div className="flow-node" style={{ borderColor: 'var(--primary)' }}>
              <div className="flow-node-icon">🤖</div>
              <div className="flow-node-title" style={{ color: 'var(--primary)' }}>MediKiosk</div>
              <div className="flow-node-sub">Organizes &amp; finds key info</div>
            </div>
            <div className="flow-arrow">➔</div>
            <div className="flow-node">
              <div className="flow-node-icon">🩺</div>
              <div className="flow-node-title">Doctor</div>
              <div className="flow-node-sub">Reviews &amp; creates prescription</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. TEAM SECTION */}
      <div className="section-wrap" id="team">
        <div className="section-header">
          <div className="section-tag">PROJECT TEAM</div>
          <h2 className="section-title">Our Team</h2>
          <p className="section-desc">"Our goal is to make healthcare intake simpler, faster, and more accessible."</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          <div className="how-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👨‍💻</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Team Member 1</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary)' }}>AI &amp; NLP Lead</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Clinical Interview &amp; Reasoning</div>
          </div>
          <div className="how-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👩‍💻</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Team Member 2</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary)' }}>Document OCR Lead</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Prescription &amp; Lab Data Extraction</div>
          </div>
          <div className="how-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👨‍⚕️</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Team Member 3</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary)' }}>Clinical UX &amp; Safety</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Doctor Dashboard &amp; Prescriptions</div>
          </div>
          <div className="how-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👨‍💼</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Team Member 4</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--primary)' }}>Systems Architect</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Kiosk Touchscreen &amp; Voice Engine</div>
          </div>
        </div>
      </div>

      {/* 8. ABOUT SECTION */}
      <div className="section-wrap" id="about">
        <div className="section-header">
          <div className="section-tag">OUR MISSION</div>
          <h2 className="section-title">About MediKiosk</h2>
          <p className="section-desc" style={{ lineHeight: 1.8 }}>
            In busy hospitals, doctors spend up to 40% of their consultation time asking repetitive background questions and sorting through disorganized paper records. MediKiosk bridges this gap by preparing everything before the patient enters the consultation room — saving precious time and improving care.
          </p>
        </div>
      </div>
    </div>
  );
};
