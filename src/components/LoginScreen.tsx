import React, { useState } from 'react';
import { UserRole, Student } from '../types';
import { UserCheck, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: UserRole, studentId?: string) => void;
  students: Student[];
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, students }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 'std-101');
  const [email, setEmail] = useState<string>('dr.ramesh@univ.edu.in');
  const [password, setPassword] = useState<string>('••••••••');

  const handleRoleToggle = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'teacher') {
      setEmail('dr.ramesh@univ.edu.in');
    } else {
      const std = students.find(s => s.id === selectedStudentId) || students[0];
      setEmail(std ? std.email : 'aarav.sharma@univ.edu.in');
    }
  };

  const handleStudentSelect = (id: string) => {
    setSelectedStudentId(id);
    const std = students.find(s => s.id === id);
    if (std) {
      setEmail(std.email);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole, selectedRole === 'student' ? selectedStudentId : undefined);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#000000] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-[#1D1D1F] dark:text-[#F5F5F7]">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0071E3] text-white mb-4 shadow-lg shadow-[#0071E3]/20 font-bold text-2xl">
          
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
          EduStream Analytics
        </h2>
        <p className="mt-2 text-xs text-[#86868B] max-w-sm mx-auto">
          Steve Jobs Apple Aesthetic • Python RandomForest & XAI Trajectory Engine
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg z-10">
        <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md py-8 px-8 shadow-2xl rounded-[28px] border border-black/[0.08] dark:border-white/[0.12]">
          
          {/* Role Toggle Buttons */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-[#86868B] uppercase tracking-wider mb-2 text-center">
              Select Access Role
            </label>
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-full border border-black/[0.06] dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => handleRoleToggle('teacher')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedRole === 'teacher'
                    ? 'bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs'
                    : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4 text-[#0071E3]" />
                Faculty / Teacher
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle('student')}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedRole === 'student'
                    ? 'bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-xs'
                    : 'text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#34C759]" />
                Student Portal
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {selectedRole === 'student' && (
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] uppercase tracking-wider mb-1.5">
                  Select Demo Student Profile
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl text-[#1D1D1F] dark:text-[#F5F5F7] text-xs focus:ring-2 focus:ring-[#0071E3] focus:border-[#0071E3] transition-all font-medium"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.rollNo}) — [CGPA {s.cgpa.toFixed(2)}]
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] uppercase tracking-wider mb-1.5">
                University Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl text-[#1D1D1F] dark:text-[#F5F5F7] text-xs focus:ring-2 focus:ring-[#0071E3] focus:border-[#0071E3] transition-all font-medium"
                placeholder="user@univ.edu.in"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl text-[#1D1D1F] dark:text-[#F5F5F7] text-xs focus:ring-2 focus:ring-[#0071E3] focus:border-[#0071E3] transition-all font-medium"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-full text-xs font-semibold text-white bg-[#0071E3] hover:bg-[#0058B3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0071E3] shadow-md shadow-[#0071E3]/20 transition-all cursor-pointer"
            >
              Sign In to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Pre-sets */}
          <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.08]">
            <p className="text-xs text-center font-semibold text-[#86868B] mb-3">
              ⚡ Quick Demo Shortcuts:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('teacher');
                  onLogin('teacher');
                }}
                className="text-xs px-3 py-1.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors font-semibold border border-black/[0.06] dark:border-white/[0.08] cursor-pointer"
              >
                👨‍🏫 Faculty Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('student');
                  setSelectedStudentId('std-101');
                  onLogin('student', 'std-101');
                }}
                className="text-xs px-3 py-1.5 bg-[#34C759]/10 text-[#34C759] rounded-full hover:bg-[#34C759]/20 transition-colors font-semibold border border-[#34C759]/20 cursor-pointer"
              >
                ⭐ High Standing (Aarav)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('student');
                  setSelectedStudentId('std-105');
                  onLogin('student', 'std-105');
                }}
                className="text-xs px-3 py-1.5 bg-[#FF3B30]/10 text-[#FF3B30] rounded-full hover:bg-[#FF3B30]/20 transition-colors font-semibold border border-[#FF3B30]/20 cursor-pointer"
              >
                🚨 Priority Support (Vikram)
              </button>
            </div>
          </div>

        </div>

        <div className="mt-6 text-center text-xs text-[#86868B]">
          <p className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
            Explainable AI (SHAP) & HMI Compliant Educational Analytics Engine
          </p>
        </div>
      </div>
    </div>
  );
};
