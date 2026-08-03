import { Student, ScenarioDetails, ScenarioType } from '../types';

export const getScenarioDetails = (scenario: string): ScenarioDetails => {
  if (scenario === 'good_performer' || scenario === 'good') {
    return SCENARIO_DETAILS.good;
  }
  return SCENARIO_DETAILS[scenario as ScenarioType] || SCENARIO_DETAILS.good;
};

export const SCENARIO_DETAILS: Record<ScenarioType, ScenarioDetails> = {
  perfect: {
    type: 'perfect',
    title: 'Category 1: High Achiever (Perfect)',
    badgeColor: 'text-[#34C759] dark:text-[#30D158]',
    badgeBg: 'bg-[#34C759]/10',
    borderColor: 'border-[#34C759]/20',
    summary: 'Demonstrates stellar academic performance (CGPA ≥ 9.0) and high attendance discipline. Ready for high-impact growth.',
    careerAdvice: [
      'Target top-tier Research Internships (e.g., IISc, IITs, MIT Media Lab, DAAD Working Internships).',
      'Begin early preparation for competitive milestones: GATE (for PSU/M.Tech) or GRE/TOEFL (for MS abroad).',
      'Explore publishing undergraduate research papers in IEEE/Springer conferences.',
      'Take on technical leadership in campus clubs and mentor junior peers.'
    ],
    readingSuggestions: [
      { title: 'Deep Work: Rules for Focused Success in a Distracted World', author: 'Cal Newport', topic: 'Productivity & Focus' },
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', topic: 'Software Craftsmanship' },
      { title: 'Zero to One: Notes on Startups', author: 'Peter Thiel', topic: 'Innovation & Tech Strategy' }
    ],
    studyMethods: [
      'Feynman Technique for mastering advanced theoretical concepts.',
      'Synthesis Mapping: Cross-link concepts across multi-disciplinary subjects.',
      'Self-Directed Deep Dive into IEEE transactions and open-source codebases.'
    ],
    timeManagementTips: [
      '80/20 Time Allocation: Reserve 20% of study time for core subjects and 80% for research/side projects.',
      'Audit free time to avoid burnout: schedule structured hobbies, gym/sports, and mindfulness.',
      'Use Eisenhower Matrix to delegate routine task management.'
    ]
  },
  good: {
    type: 'good',
    title: 'Category 2: Consistent Performer (Good)',
    badgeColor: 'text-[#0071E3] dark:text-[#0A84FF]',
    badgeBg: 'bg-[#0071E3]/10',
    borderColor: 'border-[#0071E3]/20',
    summary: 'Solid academic baseline (CGPA 7.5–8.9) with good lecture attendance. Great potential to break into the 9.0+ tier.',
    careerAdvice: [
      'Optimize semester course selection towards core electives matching industry demand.',
      'Build 2-3 full-stack/domain-specific capstone projects for placement portfolio.',
      'Participate in national hackathons and competitive programming / core design challenges.'
    ],
    readingSuggestions: [
      { title: 'Atomic Habits', author: 'James Clear', topic: 'Habit Formation & Routine' },
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', topic: 'System Engineering' },
      { title: 'Make It Stick: The Science of Successful Learning', author: 'Peter C. Brown', topic: 'Learning Science' }
    ],
    studyMethods: [
      'Active Recall + Spaced Repetition using Anki for formula-heavy subjects.',
      'Timed Mock Exam Solving 2 weeks prior to Mid-Sem and End-Sem exams.',
      'Group problem-solving sessions focusing on previous year university papers (PYQs).'
    ],
    timeManagementTips: [
      'Time-blocking 2 hours daily for high-value subject practice.',
      'Maintain a strict boundary between study hours and relaxation to sustain endurance.',
      'Track study-to-leisure ratio: Aim for 60% academics, 25% skill building, 15% recreation.'
    ]
  },
  intermediate: {
    type: 'intermediate',
    title: 'Category 3: Moderate Performer (Intermediate)',
    badgeColor: 'text-[#AF52DE] dark:text-[#BF5AF2]',
    badgeBg: 'bg-[#AF52DE]/10',
    borderColor: 'border-[#AF52DE]/20',
    summary: 'Maintains passing baseline (CGPA 6.5–7.4) but struggles in specific core courses or lab evaluations.',
    careerAdvice: [
      'Identify 1-2 weakness subjects (e.g., Mathematics, Algorithms) and seek targeted faculty assistance.',
      'Focus on steady grade elevation to clear campus placement eligibility cutoffs (typically 7.0+ CGPA).',
      'Engage in peer-tutoring circles to solidify core fundamentals.'
    ],
    readingSuggestions: [
      { title: 'A Mind for Numbers: How to Excel at Math and Science', author: 'Barbara Oakley', topic: 'Stem Learning' },
      { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', topic: 'Personal Effectiveness' },
      { title: 'Essentialism: The Disciplined Pursuit of Less', author: 'Greg McKeown', topic: 'Prioritization' }
    ],
    studyMethods: [
      'Pomodoro Technique (25 min study / 5 min break) to eliminate continuous distraction.',
      'Subject Diagnostics: Break complex syllabus units into bite-sized concept checklists.',
      'Formula & Concept Flashcards reviewed right after lab sessions.'
    ],
    timeManagementTips: [
      'Schedule mandatory daily 1.5-hour review slots right after university lectures.',
      'Limit weekend passive scrolling; replace with structured 3-hour weekend recap.',
      'Set clear study goals before opening textbooks or lecture slides.'
    ]
  },
  facing_difficulties: {
    type: 'facing_difficulties',
    title: 'Category 4: Facing Difficulties (Moderate At-Risk)',
    badgeColor: 'text-[#FF9500] dark:text-[#FF9F0A]',
    badgeBg: 'bg-[#FF9500]/10',
    borderColor: 'border-[#FF9500]/20',
    summary: 'Experiencing grade dips (CGPA 5.5–6.4) or borderline attendance (65–74%). Requires targeted intervention.',
    careerAdvice: [
      'Immediate consultation with Faculty Class Coordinator to draft an Academic Recovery Plan.',
      'Prioritize clearing active subject backlogs before end-of-semester evaluations.',
      'Utilize university remedial classes and lab repeat hours to boost internal assessment marks.'
    ],
    readingSuggestions: [
      { title: 'So Good They Can’t Ignore You', author: 'Cal Newport', topic: 'Skill Focus' },
      { title: 'The Organized Mind', author: 'Daniel Levitin', topic: 'Cognitive Organization' }
    ],
    studyMethods: [
      'Targeted Previous Year Paper (PYQ) Drills: Solve last 5 years of exam papers.',
      'Concept Mapping with Faculty Mentors during official Office Hours.',
      'Peer Study Buddy System with a high-performing batch mate.'
    ],
    timeManagementTips: [
      'Daily Attendance Audit: Track every single missed lecture to ensure >75% cutoff compliance.',
      'Remove non-essential commitments until CGPA stabilizes above 6.5.',
      'Use fixed study hours (e.g., 6 PM to 9 PM) as a non-negotiable daily appointment.'
    ],
    helplineNumbers: [
      { title: 'Student Academic Advisory Office', number: '+91-11-2659-1000', description: 'Academic counseling, backlog guidance & course adjustments.' },
      { title: 'Campus Wellness & Counseling Cell', number: '+91-11-2659-6666', description: 'Stress management, exam anxiety support & personal guidance.' },
      { title: 'Dean of Student Affairs Helpline', number: '+91-11-2659-1234', description: 'Official academic hardship petitions & attendance condonation inquiry.' }
    ]
  },
  in_difficulty: {
    type: 'in_difficulty',
    title: 'Category 5: In Critical Difficulty (High At-Risk)',
    badgeColor: 'text-[#FF3B30] dark:text-[#FF453A]',
    badgeBg: 'bg-[#FF3B30]/10',
    borderColor: 'border-[#FF3B30]/20',
    summary: 'Severe academic risk (CGPA < 5.5 or Attendance < 65%). High probability of debarment or semester loss without immediate action.',
    careerAdvice: [
      'Urgent 1-on-1 meeting with Head of Department (HOD) and assigned Faculty Mentor.',
      'Formal evaluation of attendance shortage and submission of medical/hardship documentation if eligible.',
      'Drafting a mandatory remedial roadmap to prevent semester probation or year-back.'
    ],
    readingSuggestions: [
      { title: 'Mini Habits: Smaller Habits, Bigger Results', author: 'Stephen Guise', topic: 'Overcoming Paralysis' },
      { title: 'Mindset: The New Psychology of Success', author: 'Carol S. Dweck', topic: 'Growth Mindset' }
    ],
    studyMethods: [
      'Micro-Learning: Study in 15-minute ultra-focused bursts targeting essential passing topics.',
      'Direct faculty-assisted syllabus pruning focusing on high-weightage topics.',
      'Daily assignment verification with class teacher before submission deadlines.'
    ],
    timeManagementTips: [
      'Strict Mandatory Class Attendance: Attend 100% of remaining lectures without exception.',
      'Emergency Daily Routine Reset: Sleep at 11 PM, wake at 6 AM, eliminate phone distractions during university hours.',
      'Daily Check-in with assigned Student Mentor or Counselor.'
    ],
    helplineNumbers: [
      { title: 'Emergency Academic Intervention Cell', number: '+91-11-2659-9999', description: 'Immediate debarment prevention, HOD escalation & academic rescue.' },
      { title: '24/7 Campus Psychological Helpline', number: '+91-11-2659-7777', description: 'Confidential 24/7 mental health, anxiety & crisis counseling.' },
      { title: 'Hostel & Medical Assistance Office', number: '+91-11-2659-8888', description: 'Medical certificate verification for attendance condonation.' }
    ]
  }
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-101',
    rollNo: '2023CSE042',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@univ.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    department: 'School of Computer Engineering',
    branch: 'Computer Science & Engineering',
    batch: '2023-2027',
    currentSemester: 5,
    cgpa: 9.38,
    currentSgpa: 9.50,
    predictedCgpa: 9.42,
    batchRank: 2,
    totalBatchStudents: 120,
    overallAttendance: 92.5,
    lectureAttendance: 94.0,
    labAttendance: 90.0,
    scenario: 'perfect',
    riskLevel: 'Low Risk',
    mentorName: 'Dr. Ramesh Kumar',
    phone: '+91-98765-43210',
    parentPhone: '+91-98765-11111',
    semesterGrades: [
      { semester: 1, semName: 'Sem 1 (Fall 23)', sgpa: 9.20, cgpa: 9.20, credits: 22, status: 'Completed' },
      { semester: 2, semName: 'Sem 2 (Spr 24)', sgpa: 9.35, cgpa: 9.28, credits: 24, status: 'Completed' },
      { semester: 3, semName: 'Sem 3 (Fall 24)', sgpa: 9.45, cgpa: 9.33, credits: 24, status: 'Completed' },
      { semester: 4, semName: 'Sem 4 (Spr 25)', sgpa: 9.50, cgpa: 9.38, credits: 22, status: 'Completed' },
      { semester: 5, semName: 'Sem 5 (Current)', sgpa: 9.50, cgpa: 9.42, credits: 24, status: 'Current' },
      { semester: 6, semName: 'Sem 6 (Upcoming)', sgpa: 0, cgpa: 0, credits: 22, status: 'Upcoming' },
      { semester: 7, semName: 'Sem 7 (Upcoming)', sgpa: 0, cgpa: 0, credits: 20, status: 'Upcoming' },
      { semester: 8, semName: 'Sem 8 (Upcoming)', sgpa: 0, cgpa: 0, credits: 18, status: 'Upcoming' },
    ],
    assessments: [
      { id: 'a1', subject: 'Data Structures & Algo', type: 'Quiz 1', maxMarks: 20, scoredMarks: 19, weightage: 10, date: '2026-06-10' },
      { id: 'a2', subject: 'Data Structures & Algo', type: 'Quiz 2', maxMarks: 20, scoredMarks: 20, weightage: 10, date: '2026-06-25' },
      { id: 'a3', subject: 'Data Structures & Algo', type: 'Mid-Sem', maxMarks: 50, scoredMarks: 48, weightage: 30, date: '2026-07-15' },
      { id: 'a4', subject: 'Database Management', type: 'Lab Assignment', maxMarks: 20, scoredMarks: 19, weightage: 15, date: '2026-07-20' },
    ],
    subjectAttendances: [
      { subjectCode: 'CS301', subjectName: 'Data Structures & Algo', totalLectures: 32, attendedLectures: 30, totalLabs: 16, attendedLabs: 15 },
      { subjectCode: 'CS302', subjectName: 'Database Management', totalLectures: 30, attendedLectures: 28, totalLabs: 15, attendedLabs: 14 },
      { subjectCode: 'CS303', subjectName: 'Operating Systems', totalLectures: 28, attendedLectures: 26, totalLabs: 14, attendedLabs: 13 },
      { subjectCode: 'CS304', subjectName: 'Computer Networks', totalLectures: 30, attendedLectures: 28, totalLabs: 12, attendedLabs: 11 },
    ],
    shapFeatures: [
      { featureName: 'High Quiz 2 Score (20/20)', category: 'Assessment', actualValue: '100%', shapValue: 0.35, description: 'Top score in algorithm evaluation boosted confidence.', isNegative: false },
      { featureName: 'Consistent Lecture Attendance (94%)', category: 'Attendance', actualValue: '94%', shapValue: 0.28, description: 'High engagement prevents learning gaps.', isNegative: false },
      { featureName: 'Mid-Sem Performance (48/50)', category: 'Assessment', actualValue: '96%', shapValue: 0.30, description: 'Solid mastery over core concepts.', isNegative: false },
      { featureName: 'Prerequisite DSA Mastery', category: 'Historical', actualValue: '9.5 SGPA', shapValue: 0.22, description: 'Strong foundational background in Sem 3.', isNegative: false },
      { featureName: 'Minor Lab Assignment Delay (-1 day)', category: 'Behavioral', actualValue: '1 Day Late', shapValue: -0.05, description: 'Slight delay in DB lab submission.', isNegative: true },
    ],
    interventions: []
  },
  {
    id: 'std-102',
    rollNo: '2023CSE089',
    name: 'Priya Patel',
    email: 'priya.patel@univ.edu.in',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    department: 'School of Computer Engineering',
    branch: 'Computer Science & Engineering',
    batch: '2023-2027',
    currentSemester: 5,
    cgpa: 8.24,
    currentSgpa: 8.40,
    predictedCgpa: 8.35,
    batchRank: 18,
    totalBatchStudents: 120,
    overallAttendance: 86.0,
    lectureAttendance: 88.0,
    labAttendance: 82.0,
    scenario: 'good',
    riskLevel: 'Low Risk',
    mentorName: 'Prof. Sunita Rao',
    phone: '+91-98765-43211',
    parentPhone: '+91-98765-22222',
    semesterGrades: [
      { semester: 1, semName: 'Sem 1 (Fall 23)', sgpa: 8.00, cgpa: 8.00, credits: 22, status: 'Completed' },
      { semester: 2, semName: 'Sem 2 (Spr 24)', sgpa: 8.20, cgpa: 8.10, credits: 24, status: 'Completed' },
      { semester: 3, semName: 'Sem 3 (Fall 24)', sgpa: 8.30, cgpa: 8.17, credits: 24, status: 'Completed' },
      { semester: 4, semName: 'Sem 4 (Spr 25)', sgpa: 8.45, cgpa: 8.24, credits: 22, status: 'Completed' },
      { semester: 5, semName: 'Sem 5 (Current)', sgpa: 8.40, cgpa: 8.35, credits: 24, status: 'Current' },
      { semester: 6, semName: 'Sem 6 (Upcoming)', sgpa: 0, cgpa: 0, credits: 22, status: 'Upcoming' },
      { semester: 7, semName: 'Sem 7 (Upcoming)', sgpa: 0, cgpa: 0, credits: 20, status: 'Upcoming' },
      { semester: 8, semName: 'Sem 8 (Upcoming)', sgpa: 0, cgpa: 0, credits: 18, status: 'Upcoming' },
    ],
    assessments: [
      { id: 'a10', subject: 'Data Structures & Algo', type: 'Quiz 1', maxMarks: 20, scoredMarks: 16, weightage: 10, date: '2026-06-10' },
      { id: 'a11', subject: 'Data Structures & Algo', type: 'Quiz 2', maxMarks: 20, scoredMarks: 17, weightage: 10, date: '2026-06-25' },
      { id: 'a12', subject: 'Data Structures & Algo', type: 'Mid-Sem', maxMarks: 50, scoredMarks: 41, weightage: 30, date: '2026-07-15' },
      { id: 'a13', subject: 'Database Management', type: 'Lab Assignment', maxMarks: 20, scoredMarks: 18, weightage: 15, date: '2026-07-20' },
    ],
    subjectAttendances: [
      { subjectCode: 'CS301', subjectName: 'Data Structures & Algo', totalLectures: 32, attendedLectures: 28, totalLabs: 16, attendedLabs: 13 },
      { subjectCode: 'CS302', subjectName: 'Database Management', totalLectures: 30, attendedLectures: 26, totalLabs: 15, attendedLabs: 12 },
      { subjectCode: 'CS303', subjectName: 'Operating Systems', totalLectures: 28, attendedLectures: 25, totalLabs: 14, attendedLabs: 12 },
      { subjectCode: 'CS304', subjectName: 'Computer Networks', totalLectures: 30, attendedLectures: 27, totalLabs: 12, attendedLabs: 10 },
    ],
    shapFeatures: [
      { featureName: 'Solid Mid-Sem Score (41/50)', category: 'Assessment', actualValue: '82%', shapValue: 0.25, description: 'Good performance in written evaluation.', isNegative: false },
      { featureName: 'Lecture Attendance (88%)', category: 'Attendance', actualValue: '88%', shapValue: 0.18, description: 'Regular attendance maintains subject clarity.', isNegative: false },
      { featureName: 'Steady Upward SGPA Trajectory', category: 'Historical', actualValue: '+0.45 SGPA', shapValue: 0.20, description: 'Consistently improving performance.', isNegative: false },
      { featureName: 'Lab Attendance Drop in OS (-8%)', category: 'Attendance', actualValue: '82%', shapValue: -0.12, description: 'Missed 2 OS lab sessions in July.', isNegative: true },
      { featureName: 'Quiz 1 Score Margin (16/20)', category: 'Assessment', actualValue: '80%', shapValue: -0.06, description: 'Slight room for improvement in speed.', isNegative: true },
    ],
    interventions: []
  },
  {
    id: 'std-103',
    rollNo: '2023CSE114',
    name: 'Rohan Verma',
    email: 'rohan.verma@univ.edu.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    department: 'School of Computer Engineering',
    branch: 'Computer Science & Engineering',
    batch: '2023-2027',
    currentSemester: 5,
    cgpa: 6.95,
    currentSgpa: 6.80,
    predictedCgpa: 6.85,
    batchRank: 64,
    totalBatchStudents: 120,
    overallAttendance: 78.0,
    lectureAttendance: 80.0,
    labAttendance: 74.0,
    scenario: 'intermediate',
    riskLevel: 'Moderate Risk',
    mentorName: 'Dr. Ramesh Kumar',
    phone: '+91-98765-43212',
    parentPhone: '+91-98765-33333',
    semesterGrades: [
      { semester: 1, semName: 'Sem 1 (Fall 23)', sgpa: 7.10, cgpa: 7.10, credits: 22, status: 'Completed' },
      { semester: 2, semName: 'Sem 2 (Spr 24)', sgpa: 7.00, cgpa: 7.05, credits: 24, status: 'Completed' },
      { semester: 3, semName: 'Sem 3 (Fall 24)', sgpa: 6.80, cgpa: 6.97, credits: 24, status: 'Completed' },
      { semester: 4, semName: 'Sem 4 (Spr 25)', sgpa: 6.90, cgpa: 6.95, credits: 22, status: 'Completed' },
      { semester: 5, semName: 'Sem 5 (Current)', sgpa: 6.80, cgpa: 6.85, credits: 24, status: 'Current' },
      { semester: 6, semName: 'Sem 6 (Upcoming)', sgpa: 0, cgpa: 0, credits: 22, status: 'Upcoming' },
      { semester: 7, semName: 'Sem 7 (Upcoming)', sgpa: 0, cgpa: 0, credits: 20, status: 'Upcoming' },
      { semester: 8, semName: 'Sem 8 (Upcoming)', sgpa: 0, cgpa: 0, credits: 18, status: 'Upcoming' },
    ],
    assessments: [
      { id: 'a20', subject: 'Data Structures & Algo', type: 'Quiz 1', maxMarks: 20, scoredMarks: 13, weightage: 10, date: '2026-06-10' },
      { id: 'a21', subject: 'Data Structures & Algo', type: 'Quiz 2', maxMarks: 20, scoredMarks: 12, weightage: 10, date: '2026-06-25' },
      { id: 'a22', subject: 'Data Structures & Algo', type: 'Mid-Sem', maxMarks: 50, scoredMarks: 32, weightage: 30, date: '2026-07-15' },
      { id: 'a23', subject: 'Database Management', type: 'Lab Assignment', maxMarks: 20, scoredMarks: 14, weightage: 15, date: '2026-07-20' },
    ],
    subjectAttendances: [
      { subjectCode: 'CS301', subjectName: 'Data Structures & Algo', totalLectures: 32, attendedLectures: 25, totalLabs: 16, attendedLabs: 11 },
      { subjectCode: 'CS302', subjectName: 'Database Management', totalLectures: 30, attendedLectures: 24, totalLabs: 15, attendedLabs: 11 },
      { subjectCode: 'CS303', subjectName: 'Operating Systems', totalLectures: 28, attendedLectures: 22, totalLabs: 14, attendedLabs: 10 },
      { subjectCode: 'CS304', subjectName: 'Computer Networks', totalLectures: 30, attendedLectures: 25, totalLabs: 12, attendedLabs: 9 },
    ],
    shapFeatures: [
      { featureName: 'Lab Attendance Shortage (74%)', category: 'Attendance', actualValue: '74%', shapValue: -0.32, description: 'Lab attendance is below 75% threshold.', isNegative: true },
      { featureName: 'Low Quiz 2 Score (12/20)', category: 'Assessment', actualValue: '60%', shapValue: -0.25, description: 'Gaps in dynamic programming concepts.', isNegative: true },
      { featureName: 'Mid-Sem Score (32/50)', category: 'Assessment', actualValue: '64%', shapValue: -0.18, description: 'Average performance in core theory.', isNegative: true },
      { featureName: 'Passing Grade in Database Lab', category: 'Assessment', actualValue: '14/20', shapValue: 0.10, description: 'Demonstrated basic SQL competency.', isNegative: false },
      { featureName: 'Cleared All Previous Prerequisites', category: 'Historical', actualValue: '0 Backlogs', shapValue: 0.15, description: 'No active backlogs carried forward.', isNegative: false },
    ],
    interventions: [
      { id: 'int-1', date: '2026-07-02', facultyName: 'Dr. Ramesh Kumar', actionTaken: 'Lab Attendance Warning Issued', notes: 'Advised student to attend all remaining DSA lab sessions.', status: 'In Progress' }
    ]
  },
  {
    id: 'std-104',
    rollNo: '2023CSE015',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@univ.edu.in',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    department: 'School of Computer Engineering',
    branch: 'Computer Science & Engineering',
    batch: '2023-2027',
    currentSemester: 5,
    cgpa: 6.12,
    currentSgpa: 5.75,
    predictedCgpa: 5.80,
    batchRank: 98,
    totalBatchStudents: 120,
    overallAttendance: 68.5,
    lectureAttendance: 71.0,
    labAttendance: 64.0,
    scenario: 'facing_difficulties',
    riskLevel: 'High Risk',
    mentorName: 'Prof. Sunita Rao',
    phone: '+91-98765-43213',
    parentPhone: '+91-98765-44444',
    semesterGrades: [
      { semester: 1, semName: 'Sem 1 (Fall 23)', sgpa: 6.80, cgpa: 6.80, credits: 22, status: 'Completed' },
      { semester: 2, semName: 'Sem 2 (Spr 24)', sgpa: 6.40, cgpa: 6.59, credits: 24, status: 'Completed' },
      { semester: 3, semName: 'Sem 3 (Fall 24)', sgpa: 5.90, cgpa: 6.36, credits: 24, status: 'Completed' },
      { semester: 4, semName: 'Sem 4 (Spr 25)', sgpa: 5.50, cgpa: 6.12, credits: 22, status: 'Completed' },
      { semester: 5, semName: 'Sem 5 (Current)', sgpa: 5.75, cgpa: 5.80, credits: 24, status: 'Current' },
      { semester: 6, semName: 'Sem 6 (Upcoming)', sgpa: 0, cgpa: 0, credits: 22, status: 'Upcoming' },
      { semester: 7, semName: 'Sem 7 (Upcoming)', sgpa: 0, cgpa: 0, credits: 20, status: 'Upcoming' },
      { semester: 8, semName: 'Sem 8 (Upcoming)', sgpa: 0, cgpa: 0, credits: 18, status: 'Upcoming' },
    ],
    assessments: [
      { id: 'a30', subject: 'Data Structures & Algo', type: 'Quiz 1', maxMarks: 20, scoredMarks: 10, weightage: 10, date: '2026-06-10' },
      { id: 'a31', subject: 'Data Structures & Algo', type: 'Quiz 2', maxMarks: 20, scoredMarks: 0, weightage: 10, date: '2026-06-25' },
      { id: 'a32', subject: 'Data Structures & Algo', type: 'Mid-Sem', maxMarks: 50, scoredMarks: 24, weightage: 30, date: '2026-07-15' },
      { id: 'a33', subject: 'Database Management', type: 'Lab Assignment', maxMarks: 20, scoredMarks: 9, weightage: 15, date: '2026-07-20' },
    ],
    subjectAttendances: [
      { subjectCode: 'CS301', subjectName: 'Data Structures & Algo', totalLectures: 32, attendedLectures: 22, totalLabs: 16, attendedLabs: 9 },
      { subjectCode: 'CS302', subjectName: 'Database Management', totalLectures: 30, attendedLectures: 21, totalLabs: 15, attendedLabs: 10 },
      { subjectCode: 'CS303', subjectName: 'Operating Systems', totalLectures: 28, attendedLectures: 20, totalLabs: 14, attendedLabs: 8 },
      { subjectCode: 'CS304', subjectName: 'Computer Networks', totalLectures: 30, attendedLectures: 22, totalLabs: 12, attendedLabs: 8 },
    ],
    shapFeatures: [
      { featureName: 'Quiz 2 Missed / 0 Score', category: 'Assessment', actualValue: '0 Marks (Absent)', shapValue: -0.55, description: 'Absence in Quiz 2 significantly pulled down current internal score.', isNegative: true },
      { featureName: 'Lab Attendance Drop (64%)', category: 'Attendance', actualValue: '64%', shapValue: -0.48, description: 'Lab attendance is below 65% critical debarment cutoff.', isNegative: true },
      { featureName: 'Recent SGPA Decline (-0.90)', category: 'Historical', actualValue: '5.50 SGPA', shapValue: -0.38, description: 'Downward trend across Sem 3, Sem 4, and Sem 5.', isNegative: true },
      { featureName: 'Mid-Sem Barely Passed (24/50)', category: 'Assessment', actualValue: '48%', shapValue: -0.22, description: 'Struggled with theory questions in algorithms.', isNegative: true },
      { featureName: 'Good Quiz 1 Attendance', category: 'Behavioral', actualValue: 'Present', shapValue: 0.08, description: 'Attempted Quiz 1 in early semester.', isNegative: false },
    ],
    interventions: [
      { id: 'int-2', date: '2026-07-18', facultyName: 'Prof. Sunita Rao', actionTaken: 'Parent Notification & Counseling Session', notes: 'Contacted student regarding missed Quiz 2 and attendance drop. Scheduled peer tutoring.', status: 'Pending' }
    ]
  },
  {
    id: 'std-105',
    rollNo: '2023CSE132',
    name: 'Vikramaditya Singh',
    email: 'vikram.singh@univ.edu.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    department: 'School of Computer Engineering',
    branch: 'Computer Science & Engineering',
    batch: '2023-2027',
    currentSemester: 5,
    cgpa: 5.18,
    currentSgpa: 4.80,
    predictedCgpa: 4.95,
    batchRank: 118,
    totalBatchStudents: 120,
    overallAttendance: 56.0,
    lectureAttendance: 58.0,
    labAttendance: 52.0,
    scenario: 'in_difficulty',
    riskLevel: 'Critical At-Risk',
    mentorName: 'Dr. Ramesh Kumar',
    phone: '+91-98765-43214',
    parentPhone: '+91-98765-55555',
    semesterGrades: [
      { semester: 1, semName: 'Sem 1 (Fall 23)', sgpa: 6.20, cgpa: 6.20, credits: 22, status: 'Completed' },
      { semester: 2, semName: 'Sem 2 (Spr 24)', sgpa: 5.50, cgpa: 5.83, credits: 24, status: 'Completed' },
      { semester: 3, semName: 'Sem 3 (Fall 24)', sgpa: 4.90, cgpa: 5.52, credits: 24, status: 'Completed' },
      { semester: 4, semName: 'Sem 4 (Spr 25)', sgpa: 4.80, cgpa: 5.34, credits: 22, status: 'Completed' },
      { semester: 5, semName: 'Sem 5 (Current)', sgpa: 4.80, cgpa: 4.95, credits: 24, status: 'Current' },
      { semester: 6, semName: 'Sem 6 (Upcoming)', sgpa: 0, cgpa: 0, credits: 22, status: 'Upcoming' },
      { semester: 7, semName: 'Sem 7 (Upcoming)', sgpa: 0, cgpa: 0, credits: 20, status: 'Upcoming' },
      { semester: 8, semName: 'Sem 8 (Upcoming)', sgpa: 0, cgpa: 0, credits: 18, status: 'Upcoming' },
    ],
    assessments: [
      { id: 'a40', subject: 'Data Structures & Algo', type: 'Quiz 1', maxMarks: 20, scoredMarks: 6, weightage: 10, date: '2026-06-10' },
      { id: 'a41', subject: 'Data Structures & Algo', type: 'Quiz 2', maxMarks: 20, scoredMarks: 0, weightage: 10, date: '2026-06-25' },
      { id: 'a42', subject: 'Data Structures & Algo', type: 'Mid-Sem', maxMarks: 50, scoredMarks: 16, weightage: 30, date: '2026-07-15' },
      { id: 'a43', subject: 'Database Management', type: 'Lab Assignment', maxMarks: 20, scoredMarks: 5, weightage: 15, date: '2026-07-20' },
    ],
    subjectAttendances: [
      { subjectCode: 'CS301', subjectName: 'Data Structures & Algo', totalLectures: 32, attendedLectures: 17, totalLabs: 16, attendedLabs: 7 },
      { subjectCode: 'CS302', subjectName: 'Database Management', totalLectures: 30, attendedLectures: 16, totalLabs: 15, attendedLabs: 8 },
      { subjectCode: 'CS303', subjectName: 'Operating Systems', totalLectures: 28, attendedLectures: 15, totalLabs: 14, attendedLabs: 6 },
      { subjectCode: 'CS304', subjectName: 'Computer Networks', totalLectures: 30, attendedLectures: 18, totalLabs: 12, attendedLabs: 7 },
    ],
    shapFeatures: [
      { featureName: 'Critical Attendance Deficit (56%)', category: 'Attendance', actualValue: '56%', shapValue: -0.85, description: 'Facing imminent exam hall ticket debarment across 3 subjects.', isNegative: true },
      { featureName: 'Severe Mid-Sem Failure (16/50)', category: 'Assessment', actualValue: '32%', shapValue: -0.65, description: 'Scored well below passing threshold in mid-term evaluation.', isNegative: true },
      { featureName: 'Quiz 2 Absenteeism', category: 'Assessment', actualValue: '0 Marks', shapValue: -0.45, description: 'Missed mandatory quiz without prior permission.', isNegative: true },
      { featureName: 'Backlog in Sem 3 Mathematics', category: 'Historical', actualValue: '1 Active Backlog', shapValue: -0.35, description: 'Carrying uncleared backlog in Engineering Mathematics III.', isNegative: true },
      { featureName: 'Mentor Consultation Attendance', category: 'Behavioral', actualValue: '1 Session Attended', shapValue: 0.05, description: 'Attended initial counseling meeting with Dr. Ramesh.', isNegative: false },
    ],
    interventions: [
      { id: 'int-3', date: '2026-07-22', facultyName: 'Dr. Ramesh Kumar', actionTaken: 'HOD & Emergency Parent Meeting Scheduled', notes: 'Issued formal debarment warning notice. Parent phone consultation completed. Remedial classes assigned.', status: 'In Progress' }
    ]
  },
  {
    id: 'std-106',
    rollNo: '2023ECE019',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@univ.edu.in',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    department: 'School of Electronics Engineering',
    branch: 'Electronics & Communication Engineering',
    batch: '2023-2027',
    currentSemester: 5,
    cgpa: 9.15,
    currentSgpa: 9.20,
    predictedCgpa: 9.25,
    batchRank: 3,
    totalBatchStudents: 100,
    overallAttendance: 91.0,
    lectureAttendance: 92.0,
    labAttendance: 89.0,
    scenario: 'perfect',
    riskLevel: 'Low Risk',
    mentorName: 'Prof. K. V. Subramanian',
    phone: '+91-98765-43215',
    parentPhone: '+91-98765-66666',
    semesterGrades: [
      { semester: 1, semName: 'Sem 1 (Fall 23)', sgpa: 8.90, cgpa: 8.90, credits: 22, status: 'Completed' },
      { semester: 2, semName: 'Sem 2 (Spr 24)', sgpa: 9.10, cgpa: 9.00, credits: 24, status: 'Completed' },
      { semester: 3, semName: 'Sem 3 (Fall 24)', sgpa: 9.25, cgpa: 9.09, credits: 24, status: 'Completed' },
      { semester: 4, semName: 'Sem 4 (Spr 25)', sgpa: 9.30, cgpa: 9.15, credits: 22, status: 'Completed' },
      { semester: 5, semName: 'Sem 5 (Current)', sgpa: 9.20, cgpa: 9.25, credits: 24, status: 'Current' },
      { semester: 6, semName: 'Sem 6 (Upcoming)', sgpa: 0, cgpa: 0, credits: 22, status: 'Upcoming' },
      { semester: 7, semName: 'Sem 7 (Upcoming)', sgpa: 0, cgpa: 0, credits: 20, status: 'Upcoming' },
      { semester: 8, semName: 'Sem 8 (Upcoming)', sgpa: 0, cgpa: 0, credits: 18, status: 'Upcoming' },
    ],
    assessments: [
      { id: 'a50', subject: 'Digital Signal Processing', type: 'Quiz 1', maxMarks: 20, scoredMarks: 18, weightage: 10, date: '2026-06-12' },
      { id: 'a51', subject: 'Digital Signal Processing', type: 'Quiz 2', maxMarks: 20, scoredMarks: 19, weightage: 10, date: '2026-06-27' },
      { id: 'a52', subject: 'Digital Signal Processing', type: 'Mid-Sem', maxMarks: 50, scoredMarks: 46, weightage: 30, date: '2026-07-16' },
      { id: 'a53', subject: 'VLSI Design Lab', type: 'Lab Assignment', maxMarks: 20, scoredMarks: 20, weightage: 15, date: '2026-07-22' },
    ],
    subjectAttendances: [
      { subjectCode: 'EC301', subjectName: 'Digital Signal Processing', totalLectures: 32, attendedLectures: 29, totalLabs: 16, attendedLabs: 14 },
      { subjectCode: 'EC302', subjectName: 'VLSI Design', totalLectures: 30, attendedLectures: 27, totalLabs: 15, attendedLabs: 14 },
      { subjectCode: 'EC303', subjectName: 'Microcontrollers', totalLectures: 28, attendedLectures: 26, totalLabs: 14, attendedLabs: 12 },
      { subjectCode: 'EC304', subjectName: 'Electromagnetic Waves', totalLectures: 30, attendedLectures: 28, totalLabs: 12, attendedLabs: 11 },
    ],
    shapFeatures: [
      { featureName: 'Flawless VLSI Lab Score (20/20)', category: 'Assessment', actualValue: '100%', shapValue: 0.38, description: 'Outstanding performance in FPGA circuit design.', isNegative: false },
      { featureName: 'High DSP Mid-Sem Score (46/50)', category: 'Assessment', actualValue: '92%', shapValue: 0.32, description: 'Excellence in MATLAB simulation & Fourier transform theory.', isNegative: false },
      { featureName: 'Consistent Attendance (91%)', category: 'Attendance', actualValue: '91%', shapValue: 0.24, description: 'Regular presence in lectures & lab hours.', isNegative: false },
      { featureName: 'Strong Core Electronics CGPA', category: 'Historical', actualValue: '9.15 CGPA', shapValue: 0.20, description: 'Solid track record in Sem 1-4.', isNegative: false },
      { featureName: 'Minor Quiz 1 Mark Loss (-2)', category: 'Assessment', actualValue: '18/20', shapValue: -0.04, description: 'Minor computational slip in Quiz 1.', isNegative: true },
    ],
    interventions: []
  },
  {
    id: 'std-107',
    rollNo: '2023ME055',
    name: 'Karan Joshi',
    email: 'karan.joshi@univ.edu.in',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    department: 'School of Mechanical Engineering',
    branch: 'Mechanical Engineering',
    batch: '2023-2027',
    currentSemester: 5,
    cgpa: 7.72,
    currentSgpa: 7.80,
    predictedCgpa: 7.85,
    batchRank: 24,
    totalBatchStudents: 90,
    overallAttendance: 83.5,
    lectureAttendance: 85.0,
    labAttendance: 80.0,
    scenario: 'good',
    riskLevel: 'Low Risk',
    mentorName: 'Dr. Anand Kulkarni',
    phone: '+91-98765-43216',
    parentPhone: '+91-98765-77777',
    semesterGrades: [
      { semester: 1, semName: 'Sem 1 (Fall 23)', sgpa: 7.40, cgpa: 7.40, credits: 22, status: 'Completed' },
      { semester: 2, semName: 'Sem 2 (Spr 24)', sgpa: 7.60, cgpa: 7.50, credits: 24, status: 'Completed' },
      { semester: 3, semName: 'Sem 3 (Fall 24)', sgpa: 7.80, cgpa: 7.60, credits: 24, status: 'Completed' },
      { semester: 4, semName: 'Sem 4 (Spr 25)', sgpa: 7.90, cgpa: 7.72, credits: 22, status: 'Completed' },
      { semester: 5, semName: 'Sem 5 (Current)', sgpa: 7.80, cgpa: 7.85, credits: 24, status: 'Current' },
      { semester: 6, semName: 'Sem 6 (Upcoming)', sgpa: 0, cgpa: 0, credits: 22, status: 'Upcoming' },
      { semester: 7, semName: 'Sem 7 (Upcoming)', sgpa: 0, cgpa: 0, credits: 20, status: 'Upcoming' },
      { semester: 8, semName: 'Sem 8 (Upcoming)', sgpa: 0, cgpa: 0, credits: 18, status: 'Upcoming' },
    ],
    assessments: [
      { id: 'a60', subject: 'Fluid Mechanics', type: 'Quiz 1', maxMarks: 20, scoredMarks: 15, weightage: 10, date: '2026-06-11' },
      { id: 'a61', subject: 'Fluid Mechanics', type: 'Quiz 2', maxMarks: 20, scoredMarks: 16, weightage: 10, date: '2026-06-26' },
      { id: 'a62', subject: 'Fluid Mechanics', type: 'Mid-Sem', maxMarks: 50, scoredMarks: 38, weightage: 30, date: '2026-07-14' },
      { id: 'a63', subject: 'Thermodynamics Lab', type: 'Lab Assignment', maxMarks: 20, scoredMarks: 17, weightage: 15, date: '2026-07-21' },
    ],
    subjectAttendances: [
      { subjectCode: 'ME301', subjectName: 'Fluid Mechanics', totalLectures: 32, attendedLectures: 27, totalLabs: 16, attendedLabs: 13 },
      { subjectCode: 'ME302', subjectName: 'Thermodynamics II', totalLectures: 30, attendedLectures: 25, totalLabs: 15, attendedLabs: 12 },
      { subjectCode: 'ME303', subjectName: 'Kinematics of Machines', totalLectures: 28, attendedLectures: 24, totalLabs: 14, attendedLabs: 11 },
      { subjectCode: 'ME304', subjectName: 'Manufacturing Processes', totalLectures: 30, attendedLectures: 26, totalLabs: 12, attendedLabs: 10 },
    ],
    shapFeatures: [
      { featureName: 'Mid-Sem Fluid Mechanics (38/50)', category: 'Assessment', actualValue: '76%', shapValue: 0.22, description: 'Good problem solving in Navier-Stokes equations.', isNegative: false },
      { featureName: 'Attendance Compliance (83.5%)', category: 'Attendance', actualValue: '83.5%', shapValue: 0.16, description: 'Above the mandatory 75% cutoff threshold.', isNegative: false },
      { featureName: 'Lab Performance (17/20)', category: 'Assessment', actualValue: '85%', shapValue: 0.18, description: 'Consistent lab logbook submissions.', isNegative: false },
      { featureName: 'Theory vs Lab Gap (-5%)', category: 'Behavioral', actualValue: '5% Gap', shapValue: -0.08, description: 'Lab attendance slightly lower than lecture attendance.', isNegative: true },
      { featureName: 'Quiz 1 Calculation Errors', category: 'Assessment', actualValue: '15/20', shapValue: -0.06, description: 'Minor numerical errors in Bernoullis equation.', isNegative: true },
    ],
    interventions: []
  },
  {
    id: 'std-108',
    rollNo: '2023EE077',
    name: 'Diya Choudhury',
    email: 'diya.c@univ.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    department: 'School of Electrical Engineering',
    branch: 'Electrical Engineering',
    batch: '2023-2027',
    currentSemester: 5,
    cgpa: 5.68,
    currentSgpa: 5.40,
    predictedCgpa: 5.50,
    batchRank: 78,
    totalBatchStudents: 85,
    overallAttendance: 66.0,
    lectureAttendance: 68.0,
    labAttendance: 62.0,
    scenario: 'facing_difficulties',
    riskLevel: 'High Risk',
    mentorName: 'Dr. S. N. Banerjee',
    phone: '+91-98765-43217',
    parentPhone: '+91-98765-88888',
    semesterGrades: [
      { semester: 1, semName: 'Sem 1 (Fall 23)', sgpa: 6.20, cgpa: 6.20, credits: 22, status: 'Completed' },
      { semester: 2, semName: 'Sem 2 (Spr 24)', sgpa: 5.90, cgpa: 6.04, credits: 24, status: 'Completed' },
      { semester: 3, semName: 'Sem 3 (Fall 24)', sgpa: 5.50, cgpa: 5.86, credits: 24, status: 'Completed' },
      { semester: 4, semName: 'Sem 4 (Spr 25)', sgpa: 5.20, cgpa: 5.68, credits: 22, status: 'Completed' },
      { semester: 5, semName: 'Sem 5 (Current)', sgpa: 5.40, cgpa: 5.50, credits: 24, status: 'Current' },
      { semester: 6, semName: 'Sem 6 (Upcoming)', sgpa: 0, cgpa: 0, credits: 22, status: 'Upcoming' },
      { semester: 7, semName: 'Sem 7 (Upcoming)', sgpa: 0, cgpa: 0, credits: 20, status: 'Upcoming' },
      { semester: 8, semName: 'Sem 8 (Upcoming)', sgpa: 0, cgpa: 0, credits: 18, status: 'Upcoming' },
    ],
    assessments: [
      { id: 'a70', subject: 'Control Systems', type: 'Quiz 1', maxMarks: 20, scoredMarks: 9, weightage: 10, date: '2026-06-12' },
      { id: 'a71', subject: 'Control Systems', type: 'Quiz 2', maxMarks: 20, scoredMarks: 8, weightage: 10, date: '2026-06-27' },
      { id: 'a72', subject: 'Control Systems', type: 'Mid-Sem', maxMarks: 50, scoredMarks: 22, weightage: 30, date: '2026-07-16' },
      { id: 'a73', subject: 'Power Electronics Lab', type: 'Lab Assignment', maxMarks: 20, scoredMarks: 10, weightage: 15, date: '2026-07-22' },
    ],
    subjectAttendances: [
      { subjectCode: 'EE301', subjectName: 'Control Systems', totalLectures: 32, attendedLectures: 21, totalLabs: 16, attendedLabs: 9 },
      { subjectCode: 'EE302', subjectName: 'Power Electronics', totalLectures: 30, attendedLectures: 20, totalLabs: 15, attendedLabs: 9 },
      { subjectCode: 'EE303', subjectName: 'Electrical Machines II', totalLectures: 28, attendedLectures: 19, totalLabs: 14, attendedLabs: 8 },
      { subjectCode: 'EE304', subjectName: 'Power Systems', totalLectures: 30, attendedLectures: 21, totalLabs: 12, attendedLabs: 8 },
    ],
    shapFeatures: [
      { featureName: 'Lab Attendance Warning (62%)', category: 'Attendance', actualValue: '62%', shapValue: -0.52, description: 'Lab attendance is dangerously close to 60% failure threshold.', isNegative: true },
      { featureName: 'Low Mid-Sem Control Systems (22/50)', category: 'Assessment', actualValue: '44%', shapValue: -0.38, description: 'Struggling with Root Locus & Bode plot stability problems.', isNegative: true },
      { featureName: 'Continuous Grade Drop in EE', category: 'Historical', actualValue: '5.40 SGPA', shapValue: -0.30, description: 'Drop from 6.20 in Sem 1 to 5.40 in Sem 5.', isNegative: true },
      { featureName: 'Quiz 2 Low Marks (8/20)', category: 'Assessment', actualValue: '40%', shapValue: -0.22, description: 'Weak performance in time domain response quiz.', isNegative: true },
      { featureName: 'Completed Lab Manual Submission', category: 'Behavioral', actualValue: 'Submitted', shapValue: 0.06, description: 'Punctual with lab record writing.', isNegative: false },
    ],
    interventions: [
      { id: 'int-4', date: '2026-07-20', facultyName: 'Dr. S. N. Banerjee', actionTaken: 'Special Tutoring & Attendance Review', notes: 'Enrolled in Saturday remedial tutorial for Control Systems. Parent notified.', status: 'In Progress' }
    ]
  }
];
