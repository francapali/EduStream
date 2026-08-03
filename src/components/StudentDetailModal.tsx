import React, { useState } from 'react';
import { Student } from '../types';
import { SCENARIO_DETAILS, getScenarioDetails } from '../data/studentsData';
import { 
  X, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Plus, 
  Award, 
  Clock, 
  BookOpen, 
  UserCheck, 
  FileText
} from 'lucide-react';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
  onAddIntervention: (studentId: string, action: string, notes: string) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onAddIntervention
}) => {
  if (!student) return null;

  const [actionTaken, setActionTaken] = useState<string>('Attendance Warning Issued');
  const [notes, setNotes] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const scenarioDetails = getScenarioDetails(student.scenario);

  const handleSubmitIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionTaken || !notes) return;
    onAddIntervention(student.id, actionTaken, notes);
    setNotes('');
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#1C1C1E] w-full max-w-4xl rounded-[24px] border border-black/[0.08] dark:border-white/[0.12] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-[#F5F5F7] dark:bg-[#2C2C2E]">
          <div className="flex items-center gap-4">
            <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#0071E3]" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{student.name}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${scenarioDetails.badgeBg} ${scenarioDetails.badgeColor} border ${scenarioDetails.borderColor}`}>
                  {student.riskLevel}
                </span>
              </div>
              <p className="text-xs text-[#86868B]">
                Roll No: {student.rollNo} • {student.branch} • Batch {student.batch} (Sem {student.currentSemester})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-white rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-[#1D1D1F] dark:text-[#F5F5F7]">
          
          {/* Top Quick Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
              <span className="text-[10px] text-[#86868B] uppercase font-semibold block">CGPA</span>
              <span className="text-lg font-bold text-[#0071E3] dark:text-[#3898FF]">{student.cgpa.toFixed(2)}</span>
            </div>
            <div className="p-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
              <span className="text-[10px] text-[#86868B] uppercase font-semibold block">Predicted CGPA</span>
              <span className="text-lg font-bold text-[#34C759]">{student.predictedCgpa.toFixed(2)}</span>
            </div>
            <div className="p-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
              <span className="text-[10px] text-[#86868B] uppercase font-semibold block">Attendance</span>
              <span className={`text-lg font-bold ${student.overallAttendance >= 75 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                {student.overallAttendance.toFixed(1)}%
              </span>
            </div>
            <div className="p-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
              <span className="text-[10px] text-[#86868B] uppercase font-semibold block">Batch Rank</span>
              <span className="text-lg font-bold text-[#FF9500]">#{student.batchRank} / {student.totalBatchStudents}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0071E3]" />
              <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{student.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#0071E3]" />
              <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">Student: {student.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#FF3B30]" />
              <span className="font-semibold text-[#FF3B30]">Parent: {student.parentPhone}</span>
            </div>
          </div>

          {/* XAI SHAP Features Diagnostic Breakdown */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-[#0071E3]" />
              XAI SHAP Diagnostic Drivers for {student.name}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {(student.shapFeatures || []).map((f, idx) => (
                <div key={idx} className={`p-3 rounded-2xl border flex items-start gap-3 ${
                  f.isNegative 
                    ? 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20' 
                    : 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20'
                }`}>
                  {f.isNegative ? (
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between font-semibold">
                      <span>{f.featureName} ({f.actualValue})</span>
                      <span className="font-bold">{f.shapValue > 0 ? `+${f.shapValue}` : f.shapValue} CGPA Impact</span>
                    </div>
                    <p className="text-[11px] opacity-90 mt-0.5">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intervention Logs & Form */}
          <div className="space-y-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-[#0071E3]" />
                Faculty Early Intervention History ({(student.interventions || []).length})
              </h3>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-xl font-semibold transition-colors text-xs cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Log New Intervention
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmitIntervention} className="p-4 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl space-y-3 border border-black/[0.06] dark:border-white/[0.08]">
                <div>
                  <label className="block font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
                    Action Type
                  </label>
                  <select
                    value={actionTaken}
                    onChange={(e) => setActionTaken(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-xl text-[#1D1D1F] dark:text-[#F5F5F7]"
                  >
                    <option value="Attendance Warning Issued">Attendance Warning Issued</option>
                    <option value="Parent Phone Consultation">Parent Phone Consultation</option>
                    <option value="Remedial Lab Classes Assigned">Remedial Lab Classes Assigned</option>
                    <option value="Peer Tutor Assigned">Peer Tutor Assigned</option>
                    <option value="Student Counseling Session Scheduled">Student Counseling Session Scheduled</option>
                    <option value="Formal Debarment Warning">Formal Debarment Warning</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
                    Intervention Notes & Milestones
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe discussion details, agreed targets, or next review date..."
                    className="w-full p-2 bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] rounded-xl text-[#1D1D1F] dark:text-[#F5F5F7]"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-3 py-1.5 bg-[#E5E5EA] dark:bg-[#3A3A3C] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-xl font-semibold cursor-pointer shadow-xs"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            )}

            {(!student.interventions || student.interventions.length === 0) ? (
              <p className="text-[#86868B] italic">No previous interventions recorded for this student.</p>
            ) : (
              <div className="space-y-2">
                {(student.interventions || []).map((int) => (
                  <div key={int.id} className="p-3 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl border border-black/[0.06] dark:border-white/[0.08]">
                    <div className="flex justify-between font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      <span>{int.actionTaken}</span>
                      <span className="text-[#86868B] font-normal">{int.date}</span>
                    </div>
                    <p className="text-[#86868B] dark:text-[#A1A1A6] mt-1">{int.notes}</p>
                    <span className="text-[10px] text-[#0071E3] font-semibold block mt-1">
                      Logged by {int.facultyName} • Status: {int.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
