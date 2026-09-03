import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MULTILINGUAL_INTAKE } from '../../data/multilingualIntake';

export const PatientInterview = () => {
  const { 
    interviewLanguage, 
    setInterviewLanguage, 
    speakText, 
    hospitalDoctors, 
    openModal, 
    setDoctorPatients, 
    setPatientDoctorRequests, 
    currentPatient, 
    showToast,
    showView 
  } = useApp();

  const [hasStarted, setHasStarted] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [inputText, setInputText] = useState('');
  const [interviewStep, setInterviewStep] = useState(0);
  const [isHighPriority, setIsHighPriority] = useState(false);
  const [showUnderstood, setShowUnderstood] = useState(false);

  // Extracted data
  const [extractedData, setExtractedData] = useState({
    mainConcern: '',
    details: [],
    previousConditions: 'Type 2 Diabetes (5 yrs)',
    medicinesMentioned: 'Metformin 500 mg',
    uncertaintyNotes: ''
  });

  // Doctor selection & consent
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [doctorSearch, setDoctorSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');

  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  const handleSelectLanguage = (lang) => {
    setInterviewLanguage(lang);
    setHasStarted(true);
    const config = MULTILINGUAL_INTAKE[lang] || MULTILINGUAL_INTAKE.en;
    
    const initialGreeting = {
      role: 'ai',
      text: config.greeting,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setConversation([initialGreeting]);
    speakText(config.greeting, lang);
  };

  const handleSend = (customText) => {
    const text = (customText !== undefined ? customText : inputText).trim();
    if (!text) return;

    setInputText('');
    const userMsg = {
      role: 'patient',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation(prev => [...prev, userMsg]);

    setTimeout(() => {
      processAdaptiveAnswer(text);
    }, 450);
  };

  const processAdaptiveAnswer = (text) => {
    const lower = text.toLowerCase();
    const lang = interviewLanguage || 'en';
    const config = MULTILINGUAL_INTAKE[lang] || MULTILINGUAL_INTAKE.en;

    // Multilingual symptom detection
    const isChest = lower.includes('chest') || lower.includes('सीने') || lower.includes('छाती') || lower.includes('ఛాతీ') || lower.includes('గుండె');
    const isBreath = lower.includes('breath') || lower.includes('shortness') || lower.includes('सांस') || lower.includes('दम') || lower.includes('శ్వాస');
    const isWalk = lower.includes('walk') || lower.includes('moving') || lower.includes('चलने') || lower.includes('నడవ');
    const isStomach = lower.includes('stomach') || lower.includes('abdomen') || lower.includes('belly') || lower.includes('पेट') || lower.includes('కడుపు');
    const isHeadache = lower.includes('head') || lower.includes('migraine') || lower.includes('सिरदर्द') || lower.includes('तలనొప్పి');
    const isFever = lower.includes('fever') || lower.includes('temperature') || lower.includes('बुखार') || lower.includes('ताप') || lower.includes('జ్వరం');

    if (isChest || (lower.includes('pain') && isWalk)) {
      setIsHighPriority(true);
    }

    // Add extracted details
    setExtractedData(prev => {
      const nextDetails = [...prev.details];
      if (isChest && !nextDetails.includes('Chest discomfort')) nextDetails.push('Chest discomfort');
      if (isBreath && !nextDetails.includes('Breathing difficulty')) nextDetails.push('Breathing difficulty');
      if (isWalk && !nextDetails.includes('Pain while walking')) nextDetails.push('Pain while walking');
      if (isStomach && !nextDetails.includes('Abdominal discomfort')) nextDetails.push('Abdominal discomfort');
      if (isHeadache && !nextDetails.includes('Headache')) nextDetails.push('Headache');
      if (isFever && !nextDetails.includes('Fever')) nextDetails.push('Fever');

      let concern = prev.mainConcern;
      if (!concern) {
        if (isChest) concern = "Chest discomfort";
        else if (isStomach) concern = "Stomach pain";
        else if (isHeadache) concern = "Headache";
        else concern = text.slice(0, 45);
      }

      let uncertainty = prev.uncertaintyNotes;
      if (lower.includes("don't know") || lower.includes("not sure") || lower.includes("पता नहीं") || lower.includes("తెలియదు")) {
        uncertainty = "Patient is unsure about exact dates/details (Preserved without forcing)";
      }

      return {
        ...prev,
        mainConcern: concern,
        details: nextDetails,
        uncertaintyNotes: uncertainty
      };
    });

    // Form adaptive question in the selected language
    let nextQ = "";
    if (interviewStep === 0) {
      if (isChest) nextQ = config.chest1 || config.general1;
      else if (isBreath) nextQ = config.breath1 || config.general1;
      else if (isStomach) nextQ = config.stomach1 || config.general1;
      else nextQ = config.general1;
    } else if (interviewStep === 1) {
      if (isChest) nextQ = config.chest2 || config.general2;
      else if (isBreath) nextQ = config.breath2 || config.general2;
      else nextQ = config.general2;
    } else if (interviewStep === 2) {
      nextQ = config.followUpMore;
    } else {
      nextQ = config.finishMsg;
      setShowUnderstood(true);
    }

    setInterviewStep(prev => prev + 1);

    const aiMsg = {
      role: 'ai',
      text: nextQ,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation(prev => [...prev, aiMsg]);
    speakText(nextQ, interviewLanguage);
  };

  const handleFinishAndReview = () => {
    setShowUnderstood(true);
    setTimeout(() => {
      const el = document.getElementById('understood-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDispatchToDoctor = () => {
    if (!selectedDoctor || !consentChecked) return;

    const req = {
      id: "req-" + Date.now(),
      patientName: currentPatient ? currentPatient.name : "Ravi Kumar",
      patientPhone: currentPatient ? currentPatient.phone : "+91 98765 43210",
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      status: "Sent",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const consultation = {
      id: "pt-" + Date.now(),
      name: currentPatient ? currentPatient.name : "Ravi Kumar",
      phone: currentPatient ? currentPatient.phone : "+91 98765 43210",
      age: 45,
      gender: "Male",
      blood: "O+",
      concern: extractedData.mainConcern || "Chest discomfort",
      priority: isHighPriority ? "HIGH" : "NORMAL",
      reviewStatus: "Waiting",
      symptoms: extractedData.details.join(", ") || "Chest discomfort, Breathing difficulty, Pain while walking",
      uncertainty: extractedData.uncertaintyNotes || "Patient is unsure about exact dates/details (Preserved without forcing)",
      history: "Type 2 Diabetes (5 yrs), Hypertension",
      medicines: "Metformin 500 mg, Atorvastatin 10 mg",
      labResults: "Hemoglobin: 11.2 g/dL, WBC: 8,400 /µL, Vitamin D: 18 ng/mL"
    };

    setPatientDoctorRequests([req]);
    setDoctorPatients(prev => [consultation, ...prev]);

    openModal('sending-summary', {
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty
    });
  };

  const filteredDoctors = hospitalDoctors.filter(d => {
    const matchSpec = specialtyFilter === 'All' || d.specialty === specialtyFilter;
    const matchSearch = doctorSearch === '' || 
      d.name.toLowerCase().includes(doctorSearch.toLowerCase()) || 
      d.specialty.toLowerCase().includes(doctorSearch.toLowerCase());
    return matchSpec && matchSearch;
  });

  return (
    <div className="view-container active">
      {/* 1. Language Selection Screen */}
      {!hasStarted && (
        <div style={{ maxWidth: '680px', margin: '2rem auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🌐</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Choose Your Conversation Language
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            The MediKiosk AI will speak and ask questions in your chosen language.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div 
              className="card" 
              onClick={() => handleSelectLanguage('en')}
              style={{ cursor: 'pointer', padding: '1.75rem 1rem', border: interviewLanguage === 'en' ? '2px solid var(--primary)' : '1px solid var(--border)' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🇬🇧</div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>English</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Speak in English</div>
            </div>

            <div 
              className="card" 
              onClick={() => handleSelectLanguage('hi')}
              style={{ cursor: 'pointer', padding: '1.75rem 1rem', border: interviewLanguage === 'hi' ? '2px solid var(--primary)' : '1px solid var(--border)' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🇮🇳</div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>हिन्दी (Hindi)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>हिन्दी में बात करें</div>
            </div>

            <div 
              className="card" 
              onClick={() => handleSelectLanguage('te')}
              style={{ cursor: 'pointer', padding: '1.75rem 1rem', border: interviewLanguage === 'te' ? '2px solid var(--primary)' : '1px solid var(--border)' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🇮🇳</div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>తెలుగు (Telugu)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>తెలుగులో మాట్లాడండి</div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Active Session */}
      {hasStarted && (
        <div>
          <div className="portal-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-primary">
                  {interviewLanguage === 'hi' ? '🇮🇳 हिन्दी' : interviewLanguage === 'te' ? '🇮🇳 తెలుగు' : '🇬🇧 English'}
                </span>
                <button className="btn btn-secondary btn-sm" onClick={() => setHasStarted(false)} style={{ fontSize: '0.75rem' }}>
                  Change Language
                </button>
              </div>
              <h1 className="portal-title">AI Clinical Health Interview</h1>
              <p className="portal-sub">Speak naturally or type. No fixed multiple-choice forms.</p>
            </div>

            <button className="btn btn-emerald" onClick={handleFinishAndReview}>
              ✓ Finish Interview &amp; Review
            </button>
          </div>

          {/* Red-Flag Alert */}
          {isHighPriority && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--red)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.8rem' }}>🚨</span>
              <div>
                <strong style={{ color: 'var(--red)', fontSize: '0.95rem' }}>
                  Attention: Symptoms require urgent evaluation
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                  Chest discomfort and breathing difficulty have been flagged for priority medical attention.
                </p>
              </div>
            </div>
          )}

          {/* Chat Stream */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', maxHeight: '450px', overflowY: 'auto', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {conversation.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.role}`} style={{ display: 'flex', gap: '0.75rem', alignSelf: msg.role === 'patient' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                <div style={{ fontSize: '1.5rem' }}>{msg.role === 'ai' ? '🤖' : '👤'}</div>
                <div style={{ background: msg.role === 'ai' ? 'var(--bg-card)' : 'var(--primary)', color: msg.role === 'ai' ? 'var(--text-main)' : '#020617', padding: '0.85rem 1.1rem', borderRadius: 'var(--radius-md)', border: msg.role === 'ai' ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>{msg.text}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', fontSize: '0.72rem', opacity: 0.8 }}>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      onClick={() => speakText(msg.text, interviewLanguage)}
                      style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}
                    >
                      🔊 Listen
                    </button>
                    <span>{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Bar */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            <input
              type="text"
              className="form-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              placeholder={interviewLanguage === 'hi' ? "अपनी स्वास्थ्य समस्या बताएं..." : interviewLanguage === 'te' ? "మీ సమస్యను టైప్ చేయండి..." : "Describe your symptoms naturally..."}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={() => handleSend()}>
              Send ➔
            </button>
          </div>

          {/* 3. "What I Understood" Review Section */}
          {showUnderstood && (
            <div id="understood-section" className="card" style={{ marginBottom: '2rem', border: '1px solid var(--primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📋</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>What I Understood From Our Conversation</h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <div>
                  <strong>Primary Concern:</strong> {extractedData.mainConcern || "Chest discomfort & breathing difficulty"}
                </div>
                <div>
                  <strong>Recorded Symptoms:</strong> {extractedData.details.join(", ") || "Chest discomfort, Breathing difficulty, Pain while walking"}
                </div>
                <div>
                  <strong>Preserved Uncertainty:</strong> {extractedData.uncertaintyNotes || "Patient is unsure about exact dates/details (Preserved without forcing)"}
                </div>
                <div>
                  <strong>Clinical Priority:</strong> <span className={isHighPriority ? "badge badge-danger" : "badge badge-primary"}>{isHighPriority ? "HIGH PRIORITY" : "NORMAL"}</span>
                </div>
              </div>

              {/* 4. "Which Doctor Can Help?" Section */}
              <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '1.5rem' }}>
                <div className="section-tag" style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>SPECIALIST RECOMMENDATIONS</div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.25rem' }}>Which Doctor Can Help?</h2>
                <div style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid var(--amber)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                  <strong>Disclaimer:</strong> The AI does not diagnose disease. Based on the information you provided, you may consider speaking with:
                </div>

                {/* Suggested Specialties */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>❤️</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Cardiology</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Specialist in heart, chest discomfort, troponin &amp; circulation</div>
                    <span className="badge badge-primary" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Primary Suggestion</span>
                  </div>

                  <div className="card" style={{ borderLeft: '4px solid #06b6d4' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>🫁</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Pulmonology</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Specialist in lungs, breathing difficulty &amp; oxygenation</div>
                    <span className="badge badge-secondary" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Alternative Consideration</span>
                  </div>

                  <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>🩺</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>General Medicine</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Comprehensive primary clinical evaluation &amp; blood tests</div>
                    <span className="badge badge-secondary" style={{ marginTop: '0.5rem', display: 'inline-block' }}>General Evaluation</span>
                  </div>
                </div>

                {/* Doctor Selection List */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem' }}>Select a Consulting Doctor:</h3>
                
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={doctorSearch}
                    onChange={(e) => setDoctorSearch(e.target.value)}
                    placeholder="Search doctor by name or specialty..."
                    style={{ flex: 1, minWidth: '220px' }}
                  />
                  <select 
                    className="form-input" 
                    value={specialtyFilter} 
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                    style={{ width: '180px' }}
                  >
                    <option value="All">All Specialties</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  {filteredDoctors.slice(0, 4).map(doc => (
                    <div 
                      key={doc.id} 
                      className="card"
                      onClick={() => setSelectedDoctor(doc)}
                      style={{ 
                        cursor: 'pointer', 
                        border: selectedDoctor && selectedDoctor.id === doc.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                        background: selectedDoctor && selectedDoctor.id === doc.id ? 'rgba(6, 182, 212, 0.05)' : 'var(--bg-card)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <span style={{ fontSize: '2rem' }}>{doc.avatar}</span>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{doc.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{doc.specialty}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Reg: {doc.regNo} • {doc.experience}</div>
                          </div>
                        </div>
                        <input 
                          type="radio" 
                          checked={selectedDoctor && selectedDoctor.id === doc.id} 
                          onChange={() => setSelectedDoctor(doc)}
                        />
                      </div>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={(e) => { e.stopPropagation(); openModal('doctor-profile', { doctor: doc }); }}
                        style={{ width: '100%', marginTop: '0.75rem', fontSize: '0.75rem' }}
                      >
                        View Full Credentials ➔
                      </button>
                    </div>
                  ))}
                </div>

                {/* Mandatory Consent Checkbox */}
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                    <input 
                      type="checkbox" 
                      checked={consentChecked} 
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      style={{ marginTop: '0.2rem', width: '18px', height: '18px' }}
                    />
                    <span>
                      I authorize MediKiosk to securely transfer my AI clinical health summary, scanned medical documents, and health history to <strong>{selectedDoctor ? selectedDoctor.name : "the selected doctor"}</strong> for medical consultation review.
                    </span>
                  </label>
                </div>

                {/* Dispatch Button */}
                <button
                  className="btn btn-primary"
                  disabled={!selectedDoctor || !consentChecked}
                  onClick={handleDispatchToDoctor}
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontWeight: 800, fontSize: '1rem' }}
                >
                  {selectedDoctor ? `Send Health Summary to ${selectedDoctor.name} ➔` : "Select a Doctor to Send Summary"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
