import { Student, ShapFeature, ScenarioType } from '../types';

export interface XaiInsightSummary {
  predictedCgpa: number;
  shapFeatures: ShapFeature[];
  scenario: ScenarioType;
  riskLevel: Student['riskLevel'];
  topPositiveFeature: ShapFeature | null;
  topNegativeFeature: ShapFeature | null;
  summary: string;
  recommendedAction: string;
}

export function classifyStudentScenario(cgpa: number, attendance: number): ScenarioType {
  if (cgpa >= 9.0 && attendance >= 85) {
    return 'perfect';
  } else if (cgpa >= 7.5 && attendance >= 75) {
    return 'good';
  } else if (cgpa >= 6.5 && attendance >= 70) {
    return 'intermediate';
  } else if (cgpa >= 5.5 || (attendance >= 65 && attendance < 75)) {
    return 'facing_difficulties';
  } else {
    return 'in_difficulty';
  }
}

export function calculateRiskLevel(scenario: ScenarioType): Student['riskLevel'] {
  switch (scenario) {
    case 'perfect':
      return 'Low Risk';
    case 'good':
      return 'Low Risk';
    case 'intermediate':
      return 'Moderate Risk';
    case 'facing_difficulties':
      return 'High Risk';
    case 'in_difficulty':
      return 'Critical At-Risk';
  }
}

export function generateDynamicShap(
  student: Student,
  customAttendance?: number,
  customMidSemScore?: number,
  customQuiz2Score?: number
): { predictedCgpa: number; shapFeatures: ShapFeature[]; scenario: ScenarioType; riskLevel: Student['riskLevel'] } {
  const attendance = customAttendance ?? student.overallAttendance;
  
  // Find Mid-Sem assessment score
  const midSem = student.assessments.find(a => a.type === 'Mid-Sem');
  const midSemScore = customMidSemScore ?? (midSem ? (midSem.scoredMarks / midSem.maxMarks) * 100 : 70);
  
  // Find Quiz 2 assessment score
  const quiz2 = student.assessments.find(a => a.type === 'Quiz 2');
  const quiz2Score = customQuiz2Score ?? (quiz2 ? (quiz2.scoredMarks / quiz2.maxMarks) * 100 : 70);

  const baseCgpa = student.cgpa;
  let delta = 0;
  const features: ShapFeature[] = [];

  // 1. Attendance Impact
  if (attendance >= 90) {
    const val = 0.35;
    delta += val;
    features.push({
      featureName: `High Lecture & Lab Attendance (${attendance.toFixed(1)}%)`,
      category: 'Attendance',
      actualValue: `${attendance.toFixed(1)}%`,
      shapValue: val,
      description: 'Excellent classroom engagement prevents knowledge gaps.',
      isNegative: false
    });
  } else if (attendance >= 75) {
    const val = 0.12;
    delta += val;
    features.push({
      featureName: `Satisfactory Attendance (${attendance.toFixed(1)}%)`,
      category: 'Attendance',
      actualValue: `${attendance.toFixed(1)}%`,
      shapValue: val,
      description: 'Meets mandatory university cutoff requirements.',
      isNegative: false
    });
  } else if (attendance >= 65) {
    const val = -0.38;
    delta += val;
    features.push({
      featureName: `Attendance Shortage Warning (${attendance.toFixed(1)}%)`,
      category: 'Attendance',
      actualValue: `${attendance.toFixed(1)}%`,
      shapValue: val,
      description: 'Below 75% threshold. Risk of attendance condonation fine.',
      isNegative: true
    });
  } else {
    const val = -0.75;
    delta += val;
    features.push({
      featureName: `Critical Attendance Deficit (${attendance.toFixed(1)}%)`,
      category: 'Attendance',
      actualValue: `${attendance.toFixed(1)}%`,
      shapValue: val,
      description: 'Imminent debarment threat for end-semester examinations.',
      isNegative: true
    });
  }

  // 2. Mid-Sem Assessment Impact
  if (midSemScore >= 85) {
    const val = 0.40;
    delta += val;
    features.push({
      featureName: `Mid-Sem Assessment Mastery (${midSemScore.toFixed(0)}%)`,
      category: 'Assessment',
      actualValue: `${midSemScore.toFixed(0)}%`,
      shapValue: val,
      description: 'Top marks in high-weightage mid-term written exam.',
      isNegative: false
    });
  } else if (midSemScore >= 65) {
    const val = 0.15;
    delta += val;
    features.push({
      featureName: `Mid-Sem Score (${midSemScore.toFixed(0)}%)`,
      category: 'Assessment',
      actualValue: `${midSemScore.toFixed(0)}%`,
      shapValue: val,
      description: 'Average performance in written evaluation.',
      isNegative: false
    });
  } else if (midSemScore > 0) {
    const val = -0.45;
    delta += val;
    features.push({
      featureName: `Low Mid-Sem Evaluation (${midSemScore.toFixed(0)}%)`,
      category: 'Assessment',
      actualValue: `${midSemScore.toFixed(0)}%`,
      shapValue: val,
      description: 'Scored below passing cutoff in core mid-term evaluation.',
      isNegative: true
    });
  } else {
    const val = -0.80;
    delta += val;
    features.push({
      featureName: 'Mid-Sem Examination Missed',
      category: 'Assessment',
      actualValue: '0%',
      shapValue: val,
      description: 'Absent from major written evaluation.',
      isNegative: true
    });
  }

  // 3. Quiz 2 / Continuous Evaluation Impact
  if (quiz2Score >= 80) {
    const val = 0.25;
    delta += val;
    features.push({
      featureName: `Quiz 2 Score (${quiz2Score.toFixed(0)}%)`,
      category: 'Assessment',
      actualValue: `${quiz2Score.toFixed(0)}%`,
      shapValue: val,
      description: 'Strong performance in continuous quiz testing.',
      isNegative: false
    });
  } else if (quiz2Score > 0) {
    const val = -0.15;
    delta += val;
    features.push({
      featureName: `Quiz 2 Scored (${quiz2Score.toFixed(0)}%)`,
      category: 'Assessment',
      actualValue: `${quiz2Score.toFixed(0)}%`,
      shapValue: val,
      description: 'Moderate quiz performance with room for improvement.',
      isNegative: true
    });
  } else {
    const val = -0.50;
    delta += val;
    features.push({
      featureName: 'Quiz 2 Missed / Zero Score',
      category: 'Assessment',
      actualValue: '0 Marks',
      shapValue: val,
      description: 'Zero internal marks recorded for Quiz 2.',
      isNegative: true
    });
  }

  // 4. Historical Trajectory Impact
  if (student.semesterGrades.length >= 4) {
    const past4 = student.semesterGrades.slice(0, 4);
    const firstGpa = past4[0].sgpa;
    const lastGpa = past4[3].sgpa;
    const diff = lastGpa - firstGpa;

    if (diff > 0.4) {
      const val = 0.30;
      delta += val;
      features.push({
        featureName: `Upward Grade Trajectory (+${diff.toFixed(2)})`,
        category: 'Historical',
        actualValue: `+${diff.toFixed(2)} SGPA`,
        shapValue: val,
        description: 'Consistent improvement across past semesters.',
        isNegative: false
      });
    } else if (diff < -0.4) {
      const val = -0.35;
      delta += val;
      features.push({
        featureName: `Downward Grade Trend (${diff.toFixed(2)})`,
        category: 'Historical',
        actualValue: `${diff.toFixed(2)} SGPA`,
        shapValue: val,
        description: 'Notable drop in GPA over recent semesters.',
        isNegative: true
      });
    } else {
      features.push({
        featureName: 'Stable Historical Performance',
        category: 'Historical',
        actualValue: `${student.cgpa.toFixed(2)} CGPA`,
        shapValue: 0.05,
        description: 'Maintained steady grade average across semesters.',
        isNegative: false
      });
    }
  }

  // Calculate final predicted CGPA bounded between 0.00 and 10.00
  const predictedCgpa = Math.min(10.0, Math.max(0.0, +(baseCgpa + delta * 0.3).toFixed(2)));
  const scenario = classifyStudentScenario(predictedCgpa, attendance);
  const riskLevel = calculateRiskLevel(scenario);

  return {
    predictedCgpa,
    shapFeatures: features,
    scenario,
    riskLevel
  };
}

export function buildXaiInsight(
  student: Student,
  customAttendance?: number,
  customMidSemScore?: number,
  customQuiz2Score?: number
): XaiInsightSummary {
  const base = generateDynamicShap(student, customAttendance, customMidSemScore, customQuiz2Score);
  const positiveFeatures = [...base.shapFeatures].filter((f) => !f.isNegative).sort((a, b) => b.shapValue - a.shapValue);
  const negativeFeatures = [...base.shapFeatures].filter((f) => f.isNegative).sort((a, b) => a.shapValue - b.shapValue);

  const topPositiveFeature = positiveFeatures[0] ?? null;
  const topNegativeFeature = negativeFeatures[0] ?? null;

  let summary = 'The model is mostly balanced, with no single driver dominating the prediction.';
  if (topNegativeFeature && topPositiveFeature) {
    summary = `${topNegativeFeature.featureName} is the strongest drag on the prediction, while ${topPositiveFeature.featureName} is the main support.}`;
  } else if (topNegativeFeature) {
    summary = `${topNegativeFeature.featureName} is the strongest drag on the prediction.`;
  } else if (topPositiveFeature) {
    summary = `${topPositiveFeature.featureName} is the strongest support for the prediction.`;
  }

  let recommendedAction = 'Maintain the current rhythm and keep a short weekly review routine.';
  if (topNegativeFeature?.category === 'Attendance') {
    recommendedAction = 'Recover attendance first by attending the next lectures and labs, then protect the next assessment cycle.';
  } else if (topNegativeFeature?.category === 'Assessment') {
    recommendedAction = 'Focus on the next assessment with targeted revision and extra practice on the weakest topic.';
  } else if (topNegativeFeature?.category === 'Historical') {
    recommendedAction = 'Stabilize the recent trend with a small recovery plan and regular check-ins.';
  }

  return {
    ...base,
    topPositiveFeature,
    topNegativeFeature,
    summary,
    recommendedAction
  };
}
