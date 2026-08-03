import React, { useState } from 'react';
import { Student, ScenarioType } from '../types';
import { SCENARIO_DETAILS, getScenarioDetails } from '../data/studentsData';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Search, 
  Filter, 
  Cpu, 
  PhoneCall, 
  ChevronRight, 
  ShieldAlert, 
  PlusCircle, 
  Mail, 
  Clock, 
  Award,
  Sliders
} from 'lucide-react';

import { Language, translations } from '../utils/i18n';
import { buildXaiInsight } from '../utils/xaiModel';

interface TeacherDashboardProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  activeTab: string;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onLogIntervention: (studentId: string, action: string, notes: string) => void;
  lang: Language;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  students,
  onSelectStudent,
  activeTab,
  searchTerm,
  onSearchChange,
  onLogIntervention,
  lang
}) => {
  const t = translations[lang];
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedScenario, setSelectedScenario] = useState<string>('All');

  // Interactive Batch What-If Simulator State (for 'what_if' tab & overview)
  const [batchSimAttendanceDelta, setBatchSimAttendanceDelta] = useState<number>(0);
  const [batchSimMidSemDelta, setBatchSimMidSemDelta] = useState<number>(0);

  // Filter logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.branch.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch = selectedBranch === 'All' || s.branch.includes(selectedBranch);
    const matchesRisk = selectedRisk === 'All' || s.riskLevel === selectedRisk || (activeTab === 'at_risk' && (s.scenario === 'facing_difficulties' || s.scenario === 'in_difficulty'));
    const matchesScenario = selectedScenario === 'All' || s.scenario === selectedScenario;

    return matchesSearch && matchesBranch && matchesRisk && matchesScenario;
  });

  // Calculate Macro Metrics
  const totalStudents = students.length;
  const criticalCount = students.filter(s => s.scenario === 'in_difficulty').length;
  const highRiskCount = students.filter(s => s.scenario === 'facing_difficulties').length;
  const totalAtRisk = criticalCount + highRiskCount;
  const avgCgpa = (students.reduce((acc, s) => acc + s.cgpa, 0) / totalStudents).toFixed(2);
  const avgAttendance = (students.reduce((acc, s) => acc + s.overallAttendance, 0) / totalStudents).toFixed(1);

  // Scenario breakdown for Pie Chart
  const scenarioCounts = {
    perfect: students.filter(s => s.scenario === 'perfect').length,
    good: students.filter(s => s.scenario === 'good').length,
    intermediate: students.filter(s => s.scenario === 'intermediate').length,
    facing_difficulties: students.filter(s => s.scenario === 'facing_difficulties').length,
    in_difficulty: students.filter(s => s.scenario === 'in_difficulty').length,
  };

  const scenarioPieData = [
    { name: 'Perfect (≥9.0)', value: scenarioCounts.perfect, color: '#34C759' },
    { name: 'Good (7.5-8.9)', value: scenarioCounts.good, color: '#0071E3' },
    { name: 'Intermediate (6.5-7.4)', value: scenarioCounts.intermediate, color: '#AF52DE' },
    { name: 'Facing Difficulties', value: scenarioCounts.facing_difficulties, color: '#FF9500' },
    { name: 'In Critical Difficulty', value: scenarioCounts.in_difficulty, color: '#FF3B30' },
  ];

  // Aggregate XAI factors across the batch from the real student signal
  const batchShapFactors = Object.entries(
    students.reduce<Record<string, { count: number; totalImpact: number }>>((acc, student) => {
      const insight = buildXaiInsight(student);
      const keyDriver = insight.topNegativeFeature?.featureName ?? 'Stable trajectory';
      if (!acc[keyDriver]) {
        acc[keyDriver] = { count: 0, totalImpact: 0 };
      }
      acc[keyDriver].count += 1;
      acc[keyDriver].totalImpact += insight.topNegativeFeature?.shapValue ?? 0;
      return acc;
    }, {})
  )
    .map(([factor, stats]) => ({
      factor,
      impactCount: stats.count,
      avgShap: Number((stats.totalImpact / stats.count).toFixed(2))
    }))
    .sort((a, b) => b.impactCount - a.impactCount)
    .slice(0, 5);

  return (
    <div className="space-y-6 pb-12 text-[#1D1D1F] dark:text-[#F5F5F7]">
      
      {/* Active Tab Indicator Header */}
      {activeTab !== 'overview' && (
        <div className="p-4 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/20 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
            <span>
              Active Filtered View: <strong>
                {activeTab === 'at_risk' ? '🚨 At-Risk Early Intervention List' : activeTab === 'what_if' ? '🎛️ Batch Grade Trajectory & What-If Simulator' : '📊 Batch Analytics & XAI SHAP Drivers'}
              </strong>
            </span>
          </div>
          <span className="text-[11px] opacity-80">Showing relevant metrics for {activeTab}</span>
        </div>
      )}

      {/* Macro Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-5 border border-black/[0.08] dark:border-white/[0.12] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Total Batch Roster</span>
            <div className="w-9 h-9 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3]">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{totalStudents}</span>
            <span className="text-xs text-[#86868B]">Students Enrolled</span>
          </div>
          <p className="text-[11px] text-[#86868B] mt-1">Computer, Electronics & Mech Depts</p>
        </div>

        <div className="bg-[#FF3B30]/10 dark:bg-[#FF3B30]/15 rounded-[24px] p-5 border border-[#FF3B30]/20 text-[#FF3B30] dark:text-[#FF453A] shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider">At-Risk Early Alert</span>
            <div className="w-9 h-9 rounded-2xl bg-[#FF3B30] flex items-center justify-center text-white shadow-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold">{totalAtRisk}</span>
            <span className="text-xs font-semibold opacity-90">
              ({criticalCount} Critical • {highRiskCount} High)
            </span>
          </div>
          <p className="text-[11px] opacity-80 mt-1">Requires immediate faculty intervention</p>
        </div>

        <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-5 border border-black/[0.08] dark:border-white/[0.12] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Batch Average CGPA</span>
            <div className="w-9 h-9 rounded-2xl bg-[#34C759]/10 flex items-center justify-center text-[#34C759]">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{avgCgpa}</span>
            <span className="text-xs text-[#86868B]">/ 10.0 Scale</span>
          </div>
          <p className="text-[11px] text-[#86868B] mt-1">Across 4 years (Semesters 1 - 8)</p>
        </div>

        <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-5 border border-black/[0.08] dark:border-white/[0.12] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">Avg Lecture Attendance</span>
            <div className="w-9 h-9 rounded-2xl bg-[#AF52DE]/10 flex items-center justify-center text-[#AF52DE]">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{avgAttendance}%</span>
            <span className="text-xs text-[#34C759] font-bold">Cutoff Cleared</span>
          </div>
          <p className="text-[11px] text-[#86868B] mt-1">Lecture & Lab aggregate compliance</p>
        </div>

      </div>

      {/* Batch What-If Simulator Section (Visible when what_if tab is selected or as part of overview) */}
      {(activeTab === 'what_if' || activeTab === 'overview') && (
        <div className="bg-white/95 dark:bg-[#1C1C1E] rounded-[24px] p-6 text-[#0F172A] dark:text-white shadow-xl border border-[#DCEBFF] dark:border-white/[0.12] relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#0F172A] dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#2563EB]" />
                {t.whatIfTitle} (Macro Batch Sensitivity)
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                Simulate how hypothetical shifts in attendance discipline or assessment scores impact total at-risk student count.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] uppercase font-semibold block">Simulated At-Risk Count</span>
              <span className="text-2xl font-bold text-[#16A34A] dark:text-[#34C759]">
                {Math.max(0, totalAtRisk + (batchSimAttendanceDelta < 0 ? 2 : batchSimAttendanceDelta > 0 ? -2 : 0) + (batchSimMidSemDelta < 0 ? 1 : batchSimMidSemDelta > 0 ? -1 : 0))} Students
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 bg-[#F8FBFF] dark:bg-white/5 p-4 rounded-2xl border border-[#DCEBFF] dark:border-white/10">
            <div>
              <div className="flex justify-between text-xs mb-1 font-semibold">
                <span>Batch Attendance Shift</span>
                <span className={batchSimAttendanceDelta >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}>
                  {batchSimAttendanceDelta > 0 ? `+${batchSimAttendanceDelta}%` : `${batchSimAttendanceDelta}%`}
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={batchSimAttendanceDelta}
                onChange={(e) => setBatchSimAttendanceDelta(parseInt(e.target.value))}
                className="w-full accent-[#0071E3] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-semibold">
                <span>Batch Mid-Sem Average Shift</span>
                <span className={batchSimMidSemDelta >= 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}>
                  {batchSimMidSemDelta > 0 ? `+${batchSimMidSemDelta}%` : `${batchSimMidSemDelta}%`}
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={batchSimMidSemDelta}
                onChange={(e) => setBatchSimMidSemDelta(parseInt(e.target.value))}
                className="w-full accent-[#0071E3] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-[#86868B]">
            <span>RandomForest Model Sensitivity Evaluation Live</span>
            <button
              onClick={() => {
                setBatchSimAttendanceDelta(0);
                setBatchSimMidSemDelta(0);
              }}
              className="text-[#0071E3] hover:underline font-semibold cursor-pointer"
            >
              Reset Batch Parameters
            </button>
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md p-4 rounded-[24px] border border-black/[0.08] dark:border-white/[0.12] shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#86868B] ml-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search roster by name, roll no, branch..."
            className="w-full bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-none focus:border-[#0071E3]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#86868B]" />
            <span className="font-semibold text-[#86868B]">Branch:</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-2.5 py-1 text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold"
            >
              <option value="All">All Branches</option>
              <option value="Computer">Computer Science</option>
              <option value="Electronics">Electronics Eng</option>
              <option value="Mechanical">Mechanical Eng</option>
              <option value="Electrical">Electrical Eng</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#86868B]">Scenario Category:</span>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-2.5 py-1 text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold"
            >
              <option value="All">All 5 Scenarios</option>
              <option value="perfect">Perfect (Category 1)</option>
              <option value="good">Good (Category 2)</option>
              <option value="intermediate">Intermediate (Category 3)</option>
              <option value="facing_difficulties">Facing Difficulties (Cat 4)</option>
              <option value="in_difficulty">In Critical Difficulty (Cat 5)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#86868B]">Risk Level:</span>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="bg-[#F5F5F7] dark:bg-[#2C2C2E] border border-black/[0.06] dark:border-white/[0.08] rounded-xl px-2.5 py-1 text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold"
            >
              <option value="All">All Risk Levels</option>
              <option value="Critical At-Risk">Critical At-Risk</option>
              <option value="High Risk">High Risk</option>
              <option value="Moderate Risk">Moderate Risk</option>
              <option value="Low Risk">Low Risk</option>
            </select>
          </div>

        </div>

      </div>

      {/* Early Intervention Center & Batch SHAP Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Early Intervention Action Table (2 Cols) */}
        <div className={`lg:col-span-2 bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-6 border shadow-xs ${
          activeTab === 'at_risk' ? 'ring-2 ring-[#0071E3] border-[#0071E3]' : 'border-black/[0.08] dark:border-white/[0.12]'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#FF3B30]" />
                At-Risk Early Intervention Control Center
              </h3>
              <p className="text-xs text-[#86868B]">
                Students flagged by the SHAP XAI model for attendance drops, missed assessments, or CGPA decline.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20">
              {students.filter(s => s.scenario === 'facing_difficulties' || s.scenario === 'in_difficulty').length} Flagged
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#86868B] font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-2xl">Student Details</th>
                  <th className="p-3">Scenario & Risk</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3">CGPA / Pred</th>
                  <th className="p-3">Primary SHAP Driver</th>
                  <th className="p-3 text-right rounded-r-2xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
                {students
                  .filter(s => s.scenario === 'facing_difficulties' || s.scenario === 'in_difficulty')
                  .map((s) => {
                    const primaryNegShap = (s.shapFeatures || []).find(f => f.isNegative);
                    const details = getScenarioDetails(s.scenario);
                    return (
                      <tr key={s.id} className="hover:bg-[#F5F5F7]/80 dark:hover:bg-[#2C2C2E]/50 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                            <div>
                              <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] block">{s.name}</span>
                              <span className="text-[#86868B] text-[11px]">{s.rollNo} • {s.branch.split(' ')[0]}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${details.badgeBg} ${details.badgeColor} border ${details.borderColor}`}>
                            {s.riskLevel}
                          </span>
                        </td>

                        <td className="p-3 font-semibold">
                          <span className={s.overallAttendance < 65 ? 'text-[#FF3B30] font-bold' : 'text-[#FF9500]'}>
                            {s.overallAttendance.toFixed(1)}%
                          </span>
                          <span className="text-[10px] text-[#86868B] block">Lec: {s.lectureAttendance}% | Lab: {s.labAttendance}%</span>
                        </td>

                        <td className="p-3">
                          <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{s.cgpa.toFixed(2)}</span>
                          <span className="text-[#86868B] text-[10px] block">Pred: {s.predictedCgpa.toFixed(2)}</span>
                        </td>

                        <td className="p-3 max-w-xs">
                          {primaryNegShap ? (
                            <span className="text-[#FF3B30] font-medium line-clamp-1">
                              ⚠️ {primaryNegShap.featureName}
                            </span>
                          ) : (
                            <span className="text-[#86868B]">Multiple factors</span>
                          )}
                        </td>

                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => onSelectStudent(s)}
                            className="px-3 py-1 bg-[#0071E3] hover:bg-[#0077ED] text-white rounded-xl text-[11px] font-semibold transition-colors shadow-xs cursor-pointer"
                          >
                            XAI Deep Dive
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Batch Scenario Distribution Pie Chart (1 Col) */}
        <div className={`bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-6 border shadow-xs ${
          activeTab === 'analytics' ? 'ring-2 ring-[#0071E3] border-[#0071E3]' : 'border-black/[0.08] dark:border-white/[0.12]'
        }`}>
          <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1">
            5-Type Scenario Distribution
          </h3>
          <p className="text-xs text-[#86868B] mb-4">
            Percentage of batch categorized into academic performance tiers.
          </p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scenarioPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {scenarioPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1C1C1E', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                  formatter={(value: any) => [`${value} Students`, 'Batch Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 mt-2">
            {scenarioPieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#1D1D1F] dark:text-[#F5F5F7]">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{item.value} students</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Aggregate Batch XAI SHAP Failure Drivers */}
      <div className={`bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-6 border shadow-xs ${
        activeTab === 'analytics' ? 'ring-2 ring-[#0071E3] border-[#0071E3]' : 'border-black/[0.08] dark:border-white/[0.12]'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#0071E3]" />
              Aggregate Batch SHAP Feature Impact Analysis
            </h3>
            <p className="text-xs text-[#86868B]">
              Macro XAI analytics showing what underlying factors most heavily pull down students across the department.
            </p>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={batchShapFactors} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
              <XAxis dataKey="factor" tick={{ fontSize: 11, fill: '#86868B' }} />
              <YAxis domain={[-1, 1]} tick={{ fontSize: 11, fill: '#86868B' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1C1C1E', borderRadius: '16px', border: 'none', color: '#fff', fontSize: '12px' }}
                formatter={(val: any) => [`${val} CGPA SHAP Impact`, 'Factor Impact']} 
              />
              <Bar dataKey="avgShap" radius={[6, 6, 0, 0]}>
                {batchShapFactors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.avgShap < 0 ? '#FF3B30' : '#0071E3'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Student Roster */}
      <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md rounded-[24px] p-6 border border-black/[0.08] dark:border-white/[0.12] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              Complete Student Roster ({filteredStudents.length} Students)
            </h3>
            <p className="text-xs text-[#86868B]">
              Click on any student row to open their full XAI breakdown and log faculty interventions.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F5F7] dark:bg-[#2C2C2E] text-[#86868B] font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3 rounded-l-2xl">Roll No & Name</th>
                <th className="p-3">Branch & Batch</th>
                <th className="p-3">Rank</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">CGPA / Pred</th>
                <th className="p-3">Scenario Tiers</th>
                <th className="p-3 text-right rounded-r-2xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
              {filteredStudents.map((s) => {
                const details = getScenarioDetails(s.scenario);
                return (
                  <tr 
                    key={s.id} 
                    onClick={() => onSelectStudent(s)}
                    className="hover:bg-[#F5F5F7]/80 dark:hover:bg-[#2C2C2E]/50 cursor-pointer transition-colors"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        <div>
                          <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] block">{s.name}</span>
                          <span className="text-[#86868B] text-[11px]">{s.rollNo}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 text-[#1D1D1F] dark:text-[#F5F5F7]">
                      <span className="font-semibold block">{s.branch}</span>
                      <span className="text-[10px] text-[#86868B]">Batch {s.batch} • Sem {s.currentSemester}</span>
                    </td>

                    <td className="p-3 font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      #{s.batchRank} / {s.totalBatchStudents}
                    </td>

                    <td className="p-3">
                      <span className={`font-semibold ${s.overallAttendance >= 75 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
                        {s.overallAttendance.toFixed(1)}%
                      </span>
                    </td>

                    <td className="p-3 font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {s.cgpa.toFixed(2)}
                      <span className="text-[10px] text-[#0071E3] block">Pred: {s.predictedCgpa.toFixed(2)}</span>
                    </td>

                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${details.badgeBg} ${details.badgeColor} border ${details.borderColor}`}>
                        {details.title.split(':')[1] || details.title}
                      </span>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStudent(s);
                        }}
                        className="px-3 py-1 bg-[#F5F5F7] dark:bg-[#2C2C2E] hover:bg-[#E5E5EA] dark:hover:bg-[#3A3A3C] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/[0.06] dark:border-white/[0.08] rounded-xl text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
