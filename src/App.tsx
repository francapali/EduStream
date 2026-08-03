import React, { useState, useEffect } from 'react';
import { UserRole, Student } from './types';
import { INITIAL_STUDENTS } from './data/studentsData';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { StudentDetailModal } from './components/StudentDetailModal';
import { UsefulNumbersModal } from './components/UsefulNumbersModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { ToastContainer, ToastMessage, ToastType } from './components/Toast';
import { Language, translations } from './utils/i18n';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [role, setRole] = useState<UserRole>('teacher');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std-101');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Customization & i18n
  const [lang, setLang] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('edu_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showAdvice, setShowAdvice] = useState<boolean>(true);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals & Chat triggers
  const [detailStudent, setDetailStudent] = useState<Student | null>(null);
  const [isUsefulNumbersOpen, setIsUsefulNumbersOpen] = useState<boolean>(false);
  const [chatbotExternalQuery, setChatbotExternalQuery] = useState<string | undefined>(undefined);

  const addToast = (title: string, message?: string, type: ToastType = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync Dark Mode class with HTML element and Body
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('edu_theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('edu_theme', 'light');
    }
  }, [isDarkMode]);

  // Fetch student data from Express / Python SQLite API on boot
  useEffect(() => {
    const fetchStudentsFromDb = async () => {
      try {
        const res = await fetch('/api/students');
        if (res.ok) {
          const dbStudents = await res.json();
          if (Array.isArray(dbStudents) && dbStudents.length > 0) {
            setStudents(dbStudents);
          }
        }
      } catch (err) {
        console.warn("Express backend API not reachable yet, fallback to seed state", err);
      }
    };
    fetchStudentsFromDb();
  }, []);

  // Active student object
  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handleLogin = (userRole: UserRole, studentId?: string) => {
    setRole(userRole);
    if (studentId) {
      setSelectedStudentId(studentId);
      setActiveTab('student_dashboard');
    } else {
      setActiveTab('overview');
    }
    setIsLoggedIn(true);
    addToast(userRole === 'teacher' ? 'Signed in as Faculty' : 'Signed in as Student', undefined, 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'student') {
      setActiveTab('student_dashboard');
    } else {
      setActiveTab('overview');
    }
    addToast(`Switched to ${newRole === 'teacher' ? 'Faculty Portal' : 'Student View'}`, undefined, 'info');
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    const st = students.find(s => s.id === studentId);
    if (st) {
      addToast(translations[lang].toastStudentSelected, `${st.name} (${st.rollNo})`, 'info');
    }
  };

  const handleOpenStudentDetail = (student: Student) => {
    setDetailStudent(student);
  };

  const handleAddIntervention = async (studentId: string, action: string, notes: string) => {
    const newInt = {
      id: `int-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      facultyName: 'Dr. Ramesh Kumar',
      actionTaken: action,
      notes: notes,
      status: 'In Progress' as const
    };

    // Update local state
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, interventions: [newInt, ...s.interventions] };
      }
      return s;
    }));

    if (detailStudent && detailStudent.id === studentId) {
      setDetailStudent(prev => prev ? { ...prev, interventions: [newInt, ...prev.interventions] } : null);
    }

    // Persist to backend database
    try {
      await fetch('/api/interventions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          actionTaken: action,
          notes,
          facultyName: 'Dr. Ramesh Kumar'
        })
      });
      addToast(translations[lang].toastInterventionSaved, action, 'success');
    } catch (err) {
      console.error("Failed to save intervention to DB:", err);
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    addToast(translations[newLang].toastLangChanged, undefined, 'info');
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    addToast(translations[lang].toastThemeToggled, undefined, 'info');
  };

  const atRiskCount = students.filter(s => s.scenario === 'facing_difficulties' || s.scenario === 'in_difficulty').length;

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} students={students} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] flex flex-col font-sans antialiased selection:bg-[#0071E3] selection:text-white">
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Header */}
      <Header
        role={role}
        currentStudent={currentStudent}
        students={students}
        onSelectStudent={handleSelectStudent}
        onRoleSwitch={handleRoleSwitch}
        onLogout={handleLogout}
        onOpenUsefulNumbers={() => setIsUsefulNumbersOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        lang={lang}
        onChangeLang={handleLanguageChange}
        onToggleAdvice={() => setShowAdvice(prev => !prev)}
      />

      {/* Proactive Usability Advice Banner */}
      {showAdvice && (
        <div className="bg-[#0071E3] text-white text-xs px-4 py-2 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
            <Sparkles className="w-4 h-4 shrink-0 text-[#60A5FA]" />
            <span>
              <strong>{translations[lang].smartAdviceTitle}:</strong> {translations[lang].smartAdviceText}
            </span>
          </div>
          <button onClick={() => setShowAdvice(false)} className="hover:opacity-80 p-1 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Navigation Sidebar */}
        <Sidebar
          role={role}
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'useful_numbers') {
              setIsUsefulNumbersOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          atRiskCount={atRiskCount}
          lang={lang}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          
          {role === 'teacher' ? (
            <TeacherDashboard
              students={students}
              onSelectStudent={handleOpenStudentDetail}
              activeTab={activeTab}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onLogIntervention={handleAddIntervention}
              lang={lang}
            />
          ) : (
            <StudentDashboard
              student={currentStudent}
              activeTab={activeTab}
              onOpenUsefulNumbers={() => setIsUsefulNumbersOpen(true)}
              onOpenChatbotWithQuery={(query) => setChatbotExternalQuery(query)}
              lang={lang}
              onShowToast={addToast}
            />
          )}

        </main>
      </div>

      {/* Apple Minimalist Footer */}
      <footer className="h-10 bg-white/80 dark:bg-[#1C1C1E]/80 border-t border-black/[0.08] dark:border-white/[0.12] text-[#86868B] text-[11px] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <span> EduStream ML Engine</span>
          <span>•</span>
          <span>Python RandomForest Classifier</span>
          <span>•</span>
          <span>Coimbatore District, TN</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34C759]"></span>
          <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">SQLite Database Stream Live</span>
        </div>
      </footer>

      {/* Student Detail Modal (Faculty View) */}
      <StudentDetailModal
        student={detailStudent}
        onClose={() => setDetailStudent(null)}
        onAddIntervention={handleAddIntervention}
      />

      {/* Useful Helplines Modal */}
      <UsefulNumbersModal
        isOpen={isUsefulNumbersOpen}
        onClose={() => setIsUsefulNumbersOpen(false)}
        lang={lang}
      />

      {/* Floating Assistant Widget */}
      <ChatbotWidget
        currentStudent={currentStudent}
        externalQuery={chatbotExternalQuery}
      />

    </div>
  );
}
