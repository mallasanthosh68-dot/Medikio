import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_HOSPITAL_DOCTORS } from '../data/doctors';
import { MEDICINES_DATABASE } from '../data/medicines';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('public'); // 'public' | 'patient' | 'doctor'
  const [currentView, setCurrentView] = useState('home');
  const [currentLang, setCurrentLang] = useState('en');
  const [interviewLanguage, setInterviewLanguage] = useState('en');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [textToSpeechActive, setTextToSpeechActive] = useState(true);
  const [fontScale, setFontScale] = useState(0); // -2 to +3
  const [toasts, setToasts] = useState([]);

  // Active contexts
  const [currentPatient, setCurrentPatient] = useState(null);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  // Registries
  const [registeredPatients, setRegisteredPatients] = useState([]);
  const [registeredDoctors, setRegisteredDoctors] = useState([]);
  const [hospitalDoctors, setHospitalDoctors] = useState(BASE_HOSPITAL_DOCTORS);

  // Consultation Queues & Records
  const [doctorPatients, setDoctorPatients] = useState([]);
  const [patientDoctorRequests, setPatientDoctorRequests] = useState([]);
  const [currentPrescription, setCurrentPrescription] = useState(null);
  const [activeDoctorDraftMeds, setActiveDoctorDraftMeds] = useState([
    {
      id: "m84",
      name: "Atorvastatin",
      strength: "10 mg",
      dosage: "1 tablet",
      frequency: "Once a day",
      food: "Night",
      duration: "30 Days",
      instructions: "Take with water after dinner"
    },
    {
      id: "m90",
      name: "Aspirin (Cardio)",
      strength: "75 mg",
      dosage: "1 tablet",
      frequency: "Once a day",
      food: "After Food",
      duration: "30 Days",
      instructions: "Take in the morning after breakfast"
    }
  ]);

  // Medical Records State
  const [patientMedicalRecords, setPatientMedicalRecords] = useState([
    {
      id: "rec-2024-1",
      docType: "Blood Test Report",
      date: "14 May 2024",
      year: "2024",
      source: "Blood Test Report",
      items: [
        { test: "Hemoglobin", result: "11.2", unit: "g/dL", date: "14 May 2024", source: "Blood Test Report" },
        { test: "WBC Count", result: "8,400", unit: "/µL", date: "14 May 2024", source: "Blood Test Report" },
        { test: "Vitamin D", result: "18", unit: "ng/mL", date: "14 May 2024", source: "Blood Test Report" }
      ],
      summary: "Hemoglobin: 11.2 g/dL, WBC: 8,400 /µL, Vitamin D: 18 ng/mL (Mild deficiency)"
    },
    {
      id: "rec-2025-1",
      docType: "Previous Prescription",
      date: "22 Jan 2025",
      year: "2025",
      source: "Previous Prescription",
      items: [
        { test: "Metformin", result: "500", unit: "mg", date: "22 Jan 2025", source: "Previous Prescription" },
        { test: "Atorvastatin", result: "10", unit: "mg", date: "22 Jan 2025", source: "Previous Prescription" }
      ],
      summary: "Metformin 500 mg (Twice daily), Atorvastatin 10 mg (Night)"
    }
  ]);

  const [activeExtractedOcrRows, setActiveExtractedOcrRows] = useState([]);
  const [patientScheduleTaken, setPatientScheduleTaken] = useState({});

  // Active Modals & Data
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState({});

  // Speech synthesis voice cache
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Toast helper
  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  // View Navigation with Role Guarding
  const showView = (viewId) => {
    if (userRole === 'patient' && viewId.startsWith('doctor-')) {
      showToast('Access restricted: Doctor area');
      return;
    }
    if (userRole === 'doctor' && viewId.startsWith('patient-')) {
      showToast('Access restricted: Patient intake area');
      return;
    }
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setRole = (role) => {
    setUserRole(role);
    if (role === 'patient') {
      setCurrentView('patient-home');
    } else if (role === 'doctor') {
      setCurrentView('doctor-dashboard');
    } else {
      setCurrentView('home');
    }
  };

  const logout = () => {
    setUserRole('public');
    setCurrentView('home');
    showToast('Logged out successfully');
  };

  // Modals
  const openModal = (modalName, data = {}) => {
    setModalData(data);
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData({});
  };

  // Accessibility helpers
  const toggleHighContrast = () => {
    setIsHighContrast(prev => {
      const next = !prev;
      document.body.classList.toggle('high-contrast', next);
      showToast(next ? 'High Contrast Mode ON' : 'High Contrast Mode OFF');
      return next;
    });
  };

  const toggleTextToSpeech = () => {
    setTextToSpeechActive(prev => {
      const next = !prev;
      showToast(next ? 'Voice Audio Enabled' : 'Voice Audio Muted');
      return next;
    });
  };

  const adjustFontSize = (delta) => {
    setFontScale(prev => {
      const next = Math.max(-2, Math.min(3, prev + delta));
      document.documentElement.style.fontSize = `${100 + next * 8}%`;
      showToast(`Font Size ${next > 0 ? '+' + next : next}`);
      return next;
    });
  };

  const setLanguage = (lang) => {
    setCurrentLang(lang);
    setInterviewLanguage(lang);
    const langLabel = lang === 'hi' ? 'हिन्दी (Hindi)' : lang === 'te' ? 'తెలుగు (Telugu)' : 'English';
    showToast('AI Voice & Language set to: ' + langLabel);
  };

  // Multilingual Speech Synthesis Engine
  const speakText = (text, lang) => {
    if (!('speechSynthesis' in window) || !textToSpeechActive || !text) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const targetLang = (lang || interviewLanguage || currentLang || 'en').toLowerCase();
      let bcpCode = 'en-US';
      if (targetLang === 'hi') bcpCode = 'hi-IN';
      else if (targetLang === 'te') bcpCode = 'te-IN';
      else if (targetLang === 'ta') bcpCode = 'ta-IN';
      else if (targetLang === 'kn') bcpCode = 'kn-IN';

      utterance.lang = bcpCode;

      const availableVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
      if (availableVoices && availableVoices.length > 0) {
        let matched = availableVoices.find(v => v.lang === bcpCode || v.lang.replace('_', '-') === bcpCode);
        if (!matched) {
          matched = availableVoices.find(v => v.lang.toLowerCase().startsWith(targetLang));
        }
        if (!matched && targetLang === 'hi') {
          matched = availableVoices.find(v => {
            const n = v.name.toLowerCase();
            return n.includes('hindi') || n.includes('kalpana') || n.includes('hemant') || n.includes('swara') || n.includes('madhur');
          });
        }
        if (!matched && targetLang === 'te') {
          matched = availableVoices.find(v => {
            const n = v.name.toLowerCase();
            return n.includes('telugu') || n.includes('mohan') || n.includes('chitra') || n.includes('shruti');
          });
        }
        if (matched) utterance.voice = matched;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  const resetDemoData = () => {
    setDoctorPatients([]);
    setPatientDoctorRequests([]);
    setCurrentPatient(null);
    setCurrentDoctor(null);
    setUserRole('public');
    setCurrentView('home');
    showToast('Demo data reset: Accounts and queues cleared.');
  };

  const triggerEmergencyAlert = () => {
    showToast('🚨 EMERGENCY CALL DISPATCHED: Ambulance & ER Triage Notified.');
  };

  return (
    <AppContext.Provider value={{
      userRole,
      setUserRole,
      currentView,
      setCurrentView,
      showView,
      setRole,
      logout,
      currentLang,
      setLanguage,
      interviewLanguage,
      setInterviewLanguage,
      isHighContrast,
      toggleHighContrast,
      textToSpeechActive,
      toggleTextToSpeech,
      adjustFontSize,
      fontScale,
      toasts,
      showToast,
      currentPatient,
      setCurrentPatient,
      currentDoctor,
      setCurrentDoctor,
      registeredPatients,
      setRegisteredPatients,
      registeredDoctors,
      setRegisteredDoctors,
      hospitalDoctors,
      setHospitalDoctors,
      doctorPatients,
      setDoctorPatients,
      patientDoctorRequests,
      setPatientDoctorRequests,
      currentPrescription,
      setCurrentPrescription,
      activeDoctorDraftMeds,
      setActiveDoctorDraftMeds,
      patientMedicalRecords,
      setPatientMedicalRecords,
      activeExtractedOcrRows,
      setActiveExtractedOcrRows,
      patientScheduleTaken,
      setPatientScheduleTaken,
      activeModal,
      modalData,
      openModal,
      closeModal,
      speakText,
      resetDemoData,
      triggerEmergencyAlert,
      medicinesDatabase: MEDICINES_DATABASE
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
