import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import { Language, translations } from '../utils/i18n';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  ReferenceLine
} from 'recharts';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Sliders, 
  Sparkles, 
  PhoneCall, 
  ChevronRight, 
  Clock, 
  Lightbulb,
  FileText,
  Heart,
  RefreshCw
} from 'lucide-react';

interface StudentDashboardProps {
  student: Student;
  activeTab: string;
  onOpenUsefulNumbers: () => void;
  onOpenChatbotWithQuery: (query: string) => void;
  lang: Language;
  onShowToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  activeTab,
  onOpenUsefulNumbers,
  onOpenChatbotWithQuery,
  lang,
  onShowToast
}) => {
  const t = translations[lang];

  // Simulator State
  const [simAttendance, setSimAttendance] = useState<number>(student.overallAttendance);
  const [simMidSem, setSimMidSem] = useState<number>(student.midSemScore || 70);
  const [simQuiz2, setSimQuiz2] = useState<number>(student.quiz2Score || 70);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [rfPredictedCgpa, setRfPredictedCgpa] = useState<number>(student.predictedCgpa);

  // Helper to map scenario to student progress metaphor
  const getMetaphorForStudent = (scenario: string) => {
    switch (scenario) {
      case 'perfect':
        return {
          title: t.metaphorCategory1,
          encouragement: t.encouragementCategory1,
          color: 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20',
          badge: '🌌 High Orbit'
        };
      case 'good':
      case 'good_performer':
        return {
          title: t.metaphorCategory2,
          encouragement: t.encouragementCategory2,
          color: 'bg-[#0071E3]/10 text-[#0071E3] border-[#0071E3]/20',
          badge: '🚀 Smooth Cruise'
        };
      case 'intermediate':
        return {
          title: t.metaphorCategory3,
          encouragement: t.encouragementCategory3,
          color: 'bg-[#FF9500]/10 text-[#FF9500] border-[#FF9500]/20',
          badge: '🌿 Rising Up'
        };
      case 'facing_difficulties':
        return {
          title: t.metaphorCategory4,
          encouragement: t.encouragementCategory4,
          color: 'bg-[#AF52DE]/10 text-[#AF52DE] border-[#AF52DE]/20',
          badge: '🧗 Climb Ahead'
        };
      default:
        return {
          title: t.metaphorCategory5,
          encouragement: t.encouragementCategory5,
          color: 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20',
          badge: '🌰 Golden Breakthrough'
        };
    }
  };

  if (!student) {
    return (
      <div className="p-12 text-center text-[#86868B]">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-[#0071E3]" />
        <p className="text-sm font-semibold">Loading Student Dashboard...</p>
      </div>
    );
  }

  const currentMetaphor = getMetaphorForStudent(student.scenario || 'good');

  // Run backend Random Forest ML simulation via Express API
  const handleRunSimulation = async (att: number, mid: number, q2: number) => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attendance: att,
          midSem: mid,
          quiz2: q2,
          backlogs: student.backlogsCount || 0
        })
      });
      if (res.ok) {
        const data = await res.json();
        setRfPredictedCgpa(data.rf_predicted_cgpa || student.predictedCgpa);
        onShowToast(t.toastSimulationComplete, `Random Forest model calculated CGPA: ${data.rf_predicted_cgpa}`, 'success');
      }
    } catch (err) {
      console.error("Simulation API error:", err);
    } finally {
      setIsSimulating(false);
    }
  };

  const trendData = (student.semesterGrades || []).map(s => ({
    name: `Sem ${s.semester}`,
    sgpa: s.sgpa > 0 ? s.sgpa : null,
    cgpa: s.cgpa > 0 ? s.cgpa : null,
  }));

  const shapChartData = (student.shapFeatures || []).map(f => ({
    name: (f.featureName || '').length > 22 ? (f.featureName || '').substring(0, 20) + '...' : (f.featureName || ''),
    fullName: f.featureName || '',
    value: f.shapValue || 0,
    isNegative: f.isNegative,
    actualValue: f.actualValue
  }));

  return (
    <div className="space-y-6 pb-12 text-[#1D1D1F] dark:text-[#F5F5F7]">
      
      {/* 1. Steve Jobs / Apple Aesthetic Header Banner */}
      <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-6 border border-black/[0.08] dark:border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-black/10 dark:ring-white/20 shadow-sm"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  {student.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/[0.06] dark:border-white/[0.08]">
                  Roll: {student.rollNo}
                </span>
                <span className={`text-xs px-3 py-0.5 rounded-full font-semibold border ${currentMetaphor.color}`}>
                  {currentMetaphor.badge}
                </span>
              </div>
              <p className="text-xs text-[#86868B]">
                {student.branch} • {student.department} • Batch {student.batch} (Sem {student.currentSemester})
              </p>
              <p className="text-xs text-[#86868B] mt-0.5">
                Faculty Mentor: <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{student.mentorName}</span>
              </p>
            </div>
          </div>

          {/* Apple Metrics Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#F5F5F7] dark:bg-[#2C2C2E] p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
              <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider block">{t.cgpaLabel}</span>
              <span className="text-xl font-bold text-[#0071E3] dark:text-[#3898FF]">
                {student.cgpa.toFixed(2)}
              </span>
              <span className="text-[10px] text-[#86868B] block">Out of 10.0</span>
            </div>

            <div className="bg-[#F5F5F7] dark:bg-[#2C2C2E] p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
              <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider block">{t.predictedCgpaLabel}</span>
              <span className="text-xl font-bold text-[#34C759]">
                {rfPredictedCgpa.toFixed(2)}
              </span>
              <span className="text-[10px] text-[#86868B] block">Python ML Engine</span>
            </div>

            <div className="bg-[#F5F5F7] dark:bg-[#2C2C2E] p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] text-center">
              <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider block">{t.batchRankLabel}</span>
              <span className="text-xl font-bold text-[#FF9500] flex items-center justify-center gap-1">
                <Award className="w-4 h-4" />
                #{student.batchRank}
              </span>
              <span className="text-[10px] text-[#86868B] block">Of {student.totalBatchStudents} Students</span>
            </div>

            <div className={`p-3 rounded-2xl border text-center ${
              student.overallAttendance >= 75
                ? 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20'
                : 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20'
            }`}>
              <span className="text-[10px] font-semibold uppercase tracking-wider block">{t.overallAttendanceLabel}</span>
              <span className="text-xl font-bold">
                {student.overallAttendance.toFixed(1)}%
              </span>
              <span className="text-[10px] block opacity-80">
                {student.overallAttendance >= 75 ? 'Satisfactory' : 'Below 75% Target'}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Kind & Empowering Student Progress Metaphor Banner */}
      <div className={`p-6 rounded-[24px] border ${currentMetaphor.color} shadow-xs space-y-2 relative overflow-hidden`}>
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 fill-current" />
          <h2 className="text-base font-semibold">
            {t.studentStatusTitle}
          </h2>
        </div>
        <p className="text-sm font-semibold leading-relaxed">
          {currentMetaphor.title}
        </p>
        <p className="text-xs opacity-90 leading-relaxed font-normal pt-1">
          {currentMetaphor.encouragement}
        </p>
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Charts & Visualizations */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 8-Semester Trend Chart */}
          <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-6 border border-black/[0.08] dark:border-white/[0.12] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#0071E3]" />
                  Semester-wise Grade Trend (4-Year Degree)
                </h3>
                <p className="text-xs text-[#86868B]">
                  Cumulative CGPA & Semester SGPA trajectory across 8 Semesters
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-[#0071E3]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3] inline-block" /> SGPA
                </span>
                <span className="flex items-center gap-1.5 text-[#34C759]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34C759] inline-block" /> CGPA
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSgpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0071E3" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#0071E3" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCgpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34C759" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#34C759" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                  <XAxis dataKey="name" tickLine={false} tick={{ fontSize: 11, fill: '#86868B' }} />
                  <YAxis domain={[0, 10]} tickLine={false} tick={{ fontSize: 11, fill: '#86868B' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1C1C1E', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(val: any) => [val ? `${val} / 10.0` : 'Upcoming', 'Grade']}
                  />
                  <ReferenceLine y={7.5} stroke="#FF9500" strokeDasharray="3 3" label={{ value: 'Target 7.5', fill: '#FF9500', fontSize: 10 }} />
                  <Area type="monotone" dataKey="sgpa" stroke="#0071E3" strokeWidth={3} fillOpacity={1} fill="url(#colorSgpa)" />
                  <Area type="monotone" dataKey="cgpa" stroke="#34C759" strokeWidth={3} fillOpacity={1} fill="url(#colorCgpa)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Visual XAI SHAP Breakdown */}
          <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-6 border border-black/[0.08] dark:border-white/[0.12] shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0071E3]" />
                  {t.shapTitle}
                </h3>
                <p className="text-xs text-[#86868B]">
                  Explainable AI drivers showing positive (+) and negative (-) factors behind your trajectory.
                </p>
              </div>
              <button
                onClick={() => onOpenChatbotWithQuery('Explain SHAP values and how to improve my grade')}
                className="text-xs text-[#0071E3] hover:underline font-semibold cursor-pointer"
              >
                Ask EduBrain →
              </button>
            </div>

            <div className="h-52 w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={shapChartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E5EA" />
                  <XAxis type="number" domain={[-1, 1]} tick={{ fontSize: 11, fill: '#86868B' }} />
                  <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 11, fill: '#86868B' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1C1C1E', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(value: any, name: any, props: any) => [
                      `${value > 0 ? '+' : ''}${value} Impact`,
                      props.payload.fullName
                    ]}
                  />
                  <ReferenceLine x={0} stroke="#86868B" />
                  <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                    {shapChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.isNegative ? '#FF3B30' : '#34C759'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Plain English XAI Insights List */}
            <div className="space-y-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
              {(student.shapFeatures || []).map((f, idx) => (
                <div key={idx} className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                  f.isNegative 
                    ? 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20' 
                    : 'bg-[#34C759]/10 text-[#34C759] border-[#34C759]/20'
                }`}>
                  {f.isNegative ? (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold">{f.featureName} ({f.actualValue}): </span>
                    <span className="opacity-90">{f.description} Impact: </span>
                    <span className="font-bold">{f.shapValue > 0 ? `+${f.shapValue}` : f.shapValue} CGPA</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Interactive What-If Grade Simulator */}
          <div className={`bg-[#1C1C1E] rounded-[24px] p-6 text-white shadow-xl relative overflow-hidden border ${
            activeTab === 'what_if' ? 'ring-2 ring-[#0071E3] border-[#0071E3]' : 'border-white/[0.12]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold flex items-center gap-2 text-white">
                  <Sliders className="w-5 h-5 text-[#0071E3]" />
                  {t.whatIfTitle}
                </h3>
                <p className="text-xs text-[#86868B]">
                  {t.whatIfSub}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#86868B] block uppercase font-medium">Random Forest CGPA</span>
                <span className="text-2xl font-bold text-[#34C759]">
                  {rfPredictedCgpa.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              
              {/* Slider 1: Attendance */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span>Target Attendance</span>
                  <span className="text-[#0071E3] font-bold">{simAttendance.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={simAttendance}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSimAttendance(val);
                    handleRunSimulation(val, simMidSem, simQuiz2);
                  }}
                  className="w-full accent-[#0071E3] cursor-pointer"
                />
              </div>

              {/* Slider 2: Mid-Sem Score */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span>Target Mid-Sem Score</span>
                  <span className="text-[#0071E3] font-bold">{simMidSem.toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={simMidSem}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSimMidSem(val);
                    handleRunSimulation(simAttendance, val, simQuiz2);
                  }}
                  className="w-full accent-[#0071E3] cursor-pointer"
                />
              </div>

              {/* Slider 3: Quiz 2 Score */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span>Target Quiz 2 Score</span>
                  <span className="text-[#0071E3] font-bold">{simQuiz2.toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={simQuiz2}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setSimQuiz2(val);
                    handleRunSimulation(simAttendance, simMidSem, val);
                  }}
                  className="w-full accent-[#0071E3] cursor-pointer"
                />
              </div>

            </div>

            <div className="text-xs text-[#86868B] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                {isSimulating && <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0071E3]" />}
                Python RandomForest Classifier calculation live.
              </span>
              <button
                onClick={() => {
                  setSimAttendance(student.overallAttendance);
                  setSimMidSem(student.midSemScore || 70);
                  setSimQuiz2(student.quiz2Score || 70);
                  handleRunSimulation(student.overallAttendance, student.midSemScore || 70, student.quiz2Score || 70);
                }}
                className="text-xs text-[#0071E3] hover:underline font-semibold cursor-pointer"
              >
                Reset Simulator
              </button>
            </div>
          </div>

        </div>

        {/* Right 1 Column: Attendance Breakdown & Learning Advice */}
        <div className="space-y-6">
          
          {/* Attendance Monitor Card */}
          <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-6 border border-black/[0.08] dark:border-white/[0.12] shadow-xs">
            <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0071E3]" />
              Classroom & Lab Attendance
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Lecture Attendance</span>
                  <span className="font-semibold">{student.lectureAttendance}%</span>
                </div>
                <div className="w-full h-2 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${student.lectureAttendance >= 75 ? 'bg-[#34C759]' : 'bg-[#FF9500]'}`}
                    style={{ width: `${student.lectureAttendance}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Lab Attendance</span>
                  <span className="font-semibold">{student.labAttendance}%</span>
                </div>
                <div className="w-full h-2 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${student.labAttendance >= 75 ? 'bg-[#34C759]' : 'bg-[#FF3B30]'}`}
                    style={{ width: `${student.labAttendance}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Attendance Subjects Table */}
            <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
              <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider mb-2">Subject Breakdown</p>
              <div className="space-y-2">
                {(student.subjectAttendances || []).map((s, idx) => {
                  const lecPct = Math.round((s.attendedLectures / s.totalLectures) * 100);
                  const labPct = Math.round((s.attendedLabs / s.totalLabs) * 100);
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs p-2.5 bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-2xl border border-black/[0.04]">
                      <div>
                        <span className="font-semibold block">{s.subjectCode}</span>
                        <span className="text-[#86868B] block text-[10px]">{s.subjectName}</span>
                      </div>
                      <div className="text-right">
                        <span className={`font-semibold ${lecPct >= 75 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                          Lec: {lecPct}%
                        </span>
                        <span className="text-[#86868B] mx-1">•</span>
                        <span className={`font-semibold ${labPct >= 75 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                          Lab: {labPct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Assessment Scores */}
          <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-6 border border-black/[0.08] dark:border-white/[0.12] shadow-xs">
            <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0071E3]" />
              Recent Evaluation Scores
            </h3>
            <div className="space-y-2.5">
              {(student.assessments || []).map((a) => {
                const pct = Math.round((a.scoredMarks / a.maxMarks) * 100);
                return (
                  <div key={a.id} className="p-3 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-[#F5F5F7] dark:bg-[#2C2C2E] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold block">{a.subject}</span>
                      <span className="text-[11px] text-[#86868B]">{a.type} • Weightage {a.weightage}%</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold block ${
                        pct >= 80 ? 'text-[#34C759]' : pct >= 50 ? 'text-[#FF9500]' : 'text-[#FF3B30]'
                      }`}>
                        {a.scoredMarks} / {a.maxMarks}
                      </span>
                      <span className="text-[10px] text-[#86868B]">{pct}% Scored</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Useful Helplines Prompt */}
          <div className="p-6 rounded-[24px] bg-[#0071E3]/10 dark:bg-[#0071E3]/20 border border-[#0071E3]/20 text-[#0071E3] space-y-3">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <PhoneCall className="w-4 h-4" />
              Coimbatore Support & Helplines
            </div>
            <p className="text-xs opacity-90 leading-relaxed">
              Official university dean offices, Tele-MANAS mental wellness counseling, and Coimbatore district emergency helplines are available anytime.
            </p>
            <button
              onClick={onOpenUsefulNumbers}
              className="w-full py-2.5 px-4 bg-[#0071E3] text-white rounded-full text-xs font-semibold hover:bg-[#0058B3] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              Open Helpline Directory
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
