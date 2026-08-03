import React from 'react';
import { UserRole, Student } from '../types';
import { LogOut, PhoneCall, Search, Sun, Moon, Globe, Sparkles } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface HeaderProps {
  role: UserRole;
  currentStudent: Student;
  students: Student[];
  onSelectStudent: (studentId: string) => void;
  onRoleSwitch: (role: UserRole) => void;
  onLogout: () => void;
  onOpenUsefulNumbers: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  lang: Language;
  onChangeLang: (l: Language) => void;
  onToggleAdvice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  currentStudent,
  students,
  onSelectStudent,
  onRoleSwitch,
  onLogout,
  onOpenUsefulNumbers,
  searchTerm,
  onSearchChange,
  isDarkMode,
  onToggleDarkMode,
  lang,
  onChangeLang,
  onToggleAdvice
}) => {
  const t = translations[lang];

  return (
    <header className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md border-b border-black/[0.08] dark:border-white/[0.12] sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0071E3] text-white flex items-center justify-center font-semibold text-lg shadow-sm">
              
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight text-base">
                  {t.appName}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#0071E3]/10 text-[#0071E3] dark:bg-[#0071E3]/20 dark:text-[#3898FF] border border-[#0071E3]/20 uppercase tracking-wider">
                  Random Forest ML
                </span>
              </div>
              <p className="text-[11px] text-[#86868B] hidden sm:block">
                {t.appSubName}
              </p>
            </div>
          </div>

          {/* Middle Search Bar */}
          <div className="flex-1 max-w-sm hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868B]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-1.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] focus:border-[#0071E3] rounded-full text-xs text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick Student Switcher */}
            <div className="hidden lg:flex items-center gap-2 bg-[#F5F5F7] dark:bg-[#2C2C2E] p-1 rounded-full text-xs border border-black/[0.06] dark:border-white/[0.08]">
              <span className="text-[#86868B] pl-2 font-medium text-[11px]">Active:</span>
              <select
                value={currentStudent.id}
                onChange={(e) => onSelectStudent(e.target.value)}
                className="bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-full px-2.5 py-1 text-[#1D1D1F] dark:text-[#F5F5F7] font-medium focus:outline-none cursor-pointer text-xs"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.rollNo})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Switcher Dropdown */}
            <div className="flex items-center bg-[#F5F5F7] dark:bg-[#2C2C2E] px-2 py-1 rounded-full border border-black/[0.06] dark:border-white/[0.08] text-xs">
              <Globe className="w-3.5 h-3.5 text-[#86868B] mr-1" />
              <select
                value={lang}
                onChange={(e) => onChangeLang(e.target.value as Language)}
                className="bg-transparent text-[#1D1D1F] dark:text-[#F5F5F7] font-medium focus:outline-none cursor-pointer text-xs pr-1"
              >
                <option value="en" className="bg-white dark:bg-[#1C1C1E]">🇬🇧 EN</option>
                <option value="ta" className="bg-white dark:bg-[#1C1C1E]">🇮🇳 தமிழ்</option>
                <option value="fr" className="bg-white dark:bg-[#1C1C1E]">🇫🇷 FR</option>
                <option value="it" className="bg-white dark:bg-[#1C1C1E]">🇮🇹 IT</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] transition-colors cursor-pointer"
              title={isDarkMode ? t.lightMode : t.darkMode}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#FF9500]" /> : <Moon className="w-4 h-4 text-[#0071E3]" />}
            </button>

            {/* Smart Usability Advice Toggle */}
            <button
              onClick={onToggleAdvice}
              className="p-2 rounded-full text-[#0071E3] bg-[#0071E3]/10 dark:bg-[#0071E3]/20 border border-[#0071E3]/20 hover:bg-[#0071E3]/20 transition-colors cursor-pointer hidden sm:flex"
              title="Toggle Smart Advice"
            >
              <Sparkles className="w-4 h-4 text-[#0071E3]" />
            </button>

            {/* Role Switch Pill */}
            <div className="flex bg-[#F5F5F7] dark:bg-[#2C2C2E] p-1 rounded-full border border-black/[0.06] dark:border-white/[0.08]">
              <button
                onClick={() => onRoleSwitch('teacher')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  role === 'teacher'
                    ? 'bg-white text-[#1D1D1F] shadow-xs dark:bg-[#3A3A3C] dark:text-white'
                    : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                {t.teacherPortal}
              </button>
              <button
                onClick={() => onRoleSwitch('student')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  role === 'student'
                    ? 'bg-white text-[#1D1D1F] shadow-xs dark:bg-[#3A3A3C] dark:text-white'
                    : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                {t.studentView}
              </button>
            </div>

            {/* Useful Helplines Trigger */}
            <button
              onClick={onOpenUsefulNumbers}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[#FF3B30]/10 text-[#FF3B30] hover:bg-[#FF3B30]/20 transition-colors border border-[#FF3B30]/20 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FF3B30]" />
              <span className="hidden sm:inline">{t.helplinesBtn}</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 rounded-full text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-colors cursor-pointer"
              title={t.logoutBtn}
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
