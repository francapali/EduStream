export type UserRole = 'teacher' | 'student';

export type ScenarioType = 
  | 'perfect' 
  | 'good' 
  | 'intermediate' 
  | 'facing_difficulties' 
  | 'in_difficulty';

export interface SemesterGrade {
  semester: number; // 1 to 8
  semName: string;  // e.g. "Sem 1 (Fall 2021)"
  sgpa: number;     // 0.00 to 10.00
  cgpa: number;     // Cumulative
  credits: number;
  status: 'Completed' | 'Current' | 'Upcoming';
}

export interface AssessmentScore {
  id: string;
  subject: string;
  type: 'Quiz 1' | 'Quiz 2' | 'Mid-Sem' | 'Lab Assignment' | 'End-Sem' | 'Project';
  maxMarks: number;
  scoredMarks: number;
  weightage: number; // percentage
  date: string;
}

export interface SubjectAttendance {
  subjectCode: string;
  subjectName: string;
  totalLectures: number;
  attendedLectures: number;
  totalLabs: number;
  attendedLabs: number;
}

export interface ShapFeature {
  featureName: string;
  category: 'Attendance' | 'Assessment' | 'Historical' | 'Behavioral';
  actualValue: string;
  shapValue: number; // impact on predicted CGPA (-1.5 to +1.5)
  description: string;
  isNegative: boolean;
}

export interface InterventionLog {
  id: string;
  date: string;
  facultyName: string;
  actionTaken: string;
  notes: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
}

export interface ScenarioDetails {
  type: ScenarioType;
  title: string;
  badgeColor: string;
  badgeBg: string;
  borderColor: string;
  summary: string;
  careerAdvice: string[];
  readingSuggestions: { title: string; author: string; topic: string }[];
  studyMethods: string[];
  timeManagementTips: string[];
  helplineNumbers?: { title: string; number: string; description: string }[];
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  branch: string; // e.g. "Computer Science & Engineering"
  batch: string;  // e.g. "2023-2027"
  currentSemester: number; // e.g. 5
  cgpa: number;
  currentSgpa: number;
  predictedCgpa: number;
  batchRank: number;
  totalBatchStudents: number;
  overallAttendance: number; // %
  lectureAttendance: number; // %
  labAttendance: number;     // %
  scenario: ScenarioType;
  riskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical At-Risk';
  mentorName: string;
  phone: string;
  parentPhone: string;
  semesterGrades: SemesterGrade[];
  assessments: AssessmentScore[];
  subjectAttendances: SubjectAttendance[];
  shapFeatures: ShapFeature[];
  interventions: InterventionLog[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  relatedData?: any;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department?: string;
  studentId?: string; // if student
}
