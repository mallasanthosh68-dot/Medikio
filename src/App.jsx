import React from 'react';
import { useApp } from './context/AppContext';

// Common Components
import { SplashScreen } from './components/common/SplashScreen';
import { TopUtilityBar } from './components/common/TopUtilityBar';
import { NavbarPublic } from './components/common/NavbarPublic';
import { NavbarPatient } from './components/common/NavbarPatient';
import { NavbarDoctor } from './components/common/NavbarDoctor';
import { AppFooter } from './components/common/AppFooter';

// Public Components
import { HomeView } from './components/public/HomeView';

// Patient Components
import { PatientHome } from './components/patient/PatientHome';
import { PatientHealth } from './components/patient/PatientHealth';
import { PatientRecords } from './components/patient/PatientRecords';
import { PatientInterview } from './components/patient/PatientInterview';
import { PatientUpload } from './components/patient/PatientUpload';
import { PatientTimeline } from './components/patient/PatientTimeline';
import { PatientMedicines } from './components/patient/PatientMedicines';
import { PatientSummary } from './components/patient/PatientSummary';
import { PatientRegister } from './components/patient/PatientRegister';

// Doctor Components
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { DoctorPatients } from './components/doctor/DoctorPatients';
import { DoctorDocs } from './components/doctor/DoctorDocs';
import { DoctorPrescriptions } from './components/doctor/DoctorPrescriptions';
import { PrescriptionBuilder } from './components/doctor/PrescriptionBuilder';
import { DoctorRegister } from './components/doctor/DoctorRegister';

// Modals
import { UnifiedLoginModal } from './components/modals/UnifiedLoginModal';
import { UnifiedRegisterModal } from './components/modals/UnifiedRegisterModal';
import { RoleOverviewModal } from './components/modals/RoleOverviewModal';
import { CameraScannerModal } from './components/modals/CameraScannerModal';
import { DoctorReviewModal } from './components/modals/DoctorReviewModal';
import { DoctorProfileModal } from './components/modals/DoctorProfileModal';
import { SendingSummaryModal } from './components/modals/SendingSummaryModal';
import { PrintableRxModal } from './components/modals/PrintableRxModal';

export const App = () => {
  const { userRole, currentView, toasts } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      // Patient Portal Views
      case 'patient-home':
        return <PatientHome />;
      case 'patient-health':
        return <PatientHealth />;
      case 'patient-records':
        return <PatientRecords />;
      case 'patient-interview':
        return <PatientInterview />;
      case 'patient-upload':
        return <PatientUpload />;
      case 'patient-timeline':
        return <PatientTimeline />;
      case 'patient-medicines':
        return <PatientMedicines />;
      case 'patient-summary':
        return <PatientSummary />;
      case 'patient-reg':
        return <PatientRegister />;

      // Doctor Portal Views
      case 'doctor-dashboard':
        return <DoctorDashboard />;
      case 'doctor-patients':
        return <DoctorPatients />;
      case 'doctor-docs':
        return <DoctorDocs />;
      case 'doctor-prescriptions':
        return <DoctorPrescriptions />;
      case 'doctor-builder':
        return <PrescriptionBuilder />;
      case 'doctor-reg':
        return <DoctorRegister />;

      // Default Public Views
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="app-container">
      {/* 5-second Splash Screen */}
      <SplashScreen />

      {/* Accessibility & Utility Bar */}
      <TopUtilityBar />

      {/* Dynamic Navbar based on role */}
      {userRole === 'patient' ? (
        <NavbarPatient />
      ) : userRole === 'doctor' ? (
        <NavbarDoctor />
      ) : (
        <NavbarPublic />
      )}

      {/* Main View Area */}
      <main className="main-content">
        {renderCurrentView()}
      </main>

      {/* Global Modals */}
      <UnifiedLoginModal />
      <UnifiedRegisterModal />
      <RoleOverviewModal />
      <CameraScannerModal />
      <DoctorReviewModal />
      <DoctorProfileModal />
      <SendingSummaryModal />
      <PrintableRxModal />

      {/* Toast Notification Container */}
      <div className="toast-container" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px', pointerEvents: 'none' }}>
        {toasts.map(t => (
          <div key={t.id} className="toast-msg show" style={{ pointerEvents: 'auto', background: 'rgba(9, 13, 22, 0.95)', border: '1px solid var(--primary)', color: '#ffffff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-sm)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', fontSize: '0.88rem', fontWeight: 600 }}>
            {t.message}
          </div>
        ))}
      </div>

      {/* Official Footer */}
      <AppFooter />
    </div>
  );
};
