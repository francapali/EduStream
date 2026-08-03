import { Student } from '../types';
import { SCENARIO_DETAILS } from './studentsData';

export interface ChatBotResponse {
  answer: string;
  quickReplies: string[];
}

export function parseAndAnswerQuery(userQuery: string, currentStudent?: Student): ChatBotResponse {
  const query = userQuery.toLowerCase().trim();

  // 1. CGPA / SGPA Formulas & Grading Scale
  if (
    query.includes('cgpa') || 
    query.includes('sgpa') || 
    query.includes('formula') || 
    query.includes('calculate') || 
    query.includes('grading scale')
  ) {
    let studentCtx = '';
    if (currentStudent) {
      studentCtx = `\n\n📌 **Your Stats:**\n• Current Cumulative CGPA: **${currentStudent.cgpa.toFixed(2)}** / 10.0\n• Current SGPA (Sem ${currentStudent.currentSemester}): **${currentStudent.currentSgpa.toFixed(2)}**`;
    }

    return {
      answer: `🎓 **Indian University 10-Point Grading Formula:**

1. **SGPA (Semester Grade Point Average):**
   $$\\text{SGPA} = \\frac{\\sum (C_i \\times G_i)}{\\sum C_i}$$
   *Where $C_i$ is course credit weightage and $G_i$ is grade points earned (O=10, A+=9, A=8, B+=7, B=6, C=5, F=0).*

2. **CGPA (Cumulative Grade Point Average):**
   $$\\text{CGPA} = \\frac{\\sum (\\text{SGPA}_k \\times \\text{Credits}_k)}{\\sum \\text{Total Credits}}$$
   *Weighted cumulative average across all 8 semesters.*${studentCtx}`,
      quickReplies: ['How to improve my CGPA?', 'Attendance Rules', 'What is XAI / SHAP?']
    };
  }

  // 2. Attendance Rules & Debarment
  if (
    query.includes('attendance') || 
    query.includes('debar') || 
    query.includes('cutoff') || 
    query.includes('shortage') || 
    query.includes('condonation')
  ) {
    let attCtx = '';
    if (currentStudent) {
      const remainingNeed = currentStudent.overallAttendance < 75 
        ? `⚠️ Your overall attendance is **${currentStudent.overallAttendance.toFixed(1)}%**. You need to attend **all upcoming classes** without absence to cross 75%.`
        : `✅ Your attendance is **${currentStudent.overallAttendance.toFixed(1)}%**, which is above the 75% cutoff threshold.`;
      attCtx = `\n\n📌 **Your Attendance Breakdown:**\n• Lecture Attendance: **${currentStudent.lectureAttendance}%**\n• Lab Attendance: **${currentStudent.labAttendance}%**\n${remainingNeed}`;
    }

    return {
      answer: `📋 **University Attendance Regulations:**

1. **Mandatory Cutoff (75%):** Minimum 75% aggregate attendance in lectures and practical labs is mandatory to sit for End-Semester examinations.
2. **Medical Condonation (65%–74%):** Condonation up to 10% may be granted by the Academic Dean upon submitting verified medical certificates or university sports participation proofs.
3. **Critical Debarment (< 65%):** Students with < 65% attendance are automatically flagged for **Hall Ticket Debarment** and must attend compulsory remedial sessions.${attCtx}`,
      quickReplies: ['Emergency Helplines', 'My Rank & Status', 'Study Tips']
    };
  }

  // 3. XAI / SHAP Explanation
  if (
    query.includes('xai') || 
    query.includes('shap') || 
    query.includes('explain') || 
    query.includes('why is my grade') || 
    query.includes('prediction') ||
    query.includes('risk')
  ) {
    let shapCtx = '';
    if (currentStudent) {
      const negativeFactors = currentStudent.shapFeatures.filter(f => f.isNegative).map(f => `• 🔻 **${f.featureName}**: ${f.description}`).join('\n');
      const positiveFactors = currentStudent.shapFeatures.filter(f => !f.isNegative).map(f => `• 🟢 **${f.featureName}**: ${f.description}`).join('\n');
      shapCtx = `\n\n🔍 **Your Personal SHAP Breakdown:**\n\n**Positive Contributors:**\n${positiveFactors || 'None'}\n\n**Negative Impactors:**\n${negativeFactors || 'None'}`;
    }

    return {
      answer: `🧠 **Explainable AI (XAI) & SHAP Framework:**

In our system, performance prediction is NOT a black box. We use **SHAP (SHapley Additive exPlanations)** from cooperative game theory to show exactly *why* our machine learning model predicts a given CGPA.

• **Base Value:** Expected average CGPA for your batch (~7.50).
• **SHAP Values:** Numerical impact (+ or -) of your lab attendance, quiz scores, mid-sem marks, and past SGPA trajectory toward your final predicted grade.${shapCtx}`,
      quickReplies: ['How to improve my CGPA?', 'Helplines & Counseling', 'My Scenario Category']
    };
  }

  // 4. Student Status & Personal Rank
  if (
    query.includes('rank') || 
    query.includes('my status') || 
    query.includes('how am i doing') || 
    query.includes('my performance') ||
    query.includes('scenario')
  ) {
    if (!currentStudent) {
      return {
        answer: 'Please select a student profile or log in as a student to view customized status analytics.',
        quickReplies: ['CGPA Formula', 'Attendance Rules', 'Helpline Numbers']
      };
    }

    const details = SCENARIO_DETAILS[currentStudent.scenario];

    return {
      answer: `📊 **Personal Performance Summary for ${currentStudent.name}:**

• **Roll Number:** \`${currentStudent.rollNo}\` | **Branch:** ${currentStudent.branch}
• **Batch Rank:** **#${currentStudent.batchRank}** out of ${currentStudent.totalBatchStudents} students
• **Current CGPA:** **${currentStudent.cgpa.toFixed(2)}** | **Predicted CGPA:** **${currentStudent.predictedCgpa.toFixed(2)}**
• **Attendance:** **${currentStudent.overallAttendance.toFixed(1)}%**
• **Classification:** **${details.title}**

💡 **Summary:** ${details.summary}`,
      quickReplies: ['Action Plan for Me', 'Recommended Reading', 'Helpline Numbers']
    };
  }

  // 5. Helplines & Counseling Support
  if (
    query.includes('helpline') || 
    query.includes('number') || 
    query.includes('contact') || 
    query.includes('counsel') || 
    query.includes('stress') || 
    query.includes('mental health') ||
    query.includes('dean')
  ) {
    return {
      answer: `☎️ **University Emergency & Advisory Contacts:**

• **Academic Advisory Cell:** \`+91-11-2659-1000\` (Course planning, backlog clearance)
• **24/7 Campus Psychological & Stress Helpline:** \`+91-11-2659-7777\` (Confidential mental health support)
• **Dean of Student Affairs:** \`+91-11-2659-1234\` (Hardship petitions & attendance condonation)
• **Emergency Intervention Cell:** \`+91-11-2659-9999\` (Debarment review & HOD escalation)
• **Hostel & Medical Assistance Office:** \`+91-11-2659-8888\` (Medical leave verification)`,
      quickReplies: ['Study Tips & Techniques', 'Attendance Rules', 'What is XAI / SHAP?']
    };
  }

  // 6. Action Plan & Study Tips
  if (
    query.includes('study') || 
    query.includes('improve') || 
    query.includes('action plan') || 
    query.includes('reading') || 
    query.includes('time management') ||
    query.includes('tip')
  ) {
    if (currentStudent) {
      const details = SCENARIO_DETAILS[currentStudent.scenario];
      const tips = details.studyMethods.map(m => `• ${m}`).join('\n');
      const books = details.readingSuggestions.map(b => `• *${b.title}* by ${b.author} (${b.topic})`).join('\n');

      return {
        answer: `🎯 **Customized Action Plan for Category (${currentStudent.scenario.toUpperCase()}):**

📚 **Recommended Study Techniques:**
${tips}

📖 **Suggested Reading List:**
${books}

⏰ **Time Management Guidance:**
${details.timeManagementTips.map(t => `• ${t}`).join('\n')}`,
        quickReplies: ['My Rank & Status', 'Emergency Helplines', 'CGPA Formula']
      };
    }

    return {
      answer: `🧠 **Proven Academic Study Frameworks:**

1. **Feynman Technique:** Teach complex concepts in simple terms without technical jargon to expose knowledge gaps.
2. **Active Recall + Spaced Repetition:** Test yourself with flashcards or previous year questions (PYQs) rather than passively re-reading slides.
3. **Pomodoro Method:** 25-minute deep focus sprints followed by 5-minute timed breaks to prevent cognitive fatigue.
4. **Time-Blocking:** Dedicate specific non-negotiable 2-hour daily slots for high-priority core subjects.`,
      quickReplies: ['CGPA Formula', 'Attendance Rules', 'Helpline Numbers']
    };
  }

  // Default fallback answer
  return {
    answer: `🤖 **EduBrain AI Assistant:**
I am an offline rule-based intelligent assistant designed to help you navigate university performance, CGPA formulas, attendance regulations, XAI SHAP predictions, and support helplines.

How can I assist you today? Try asking about:
• *"How is CGPA calculated?"*
• *"Why is my predicted grade dropping?"*
• *"What are the university attendance cutoff rules?"*
• *"Show me emergency helpline numbers"*
• *"What is my batch rank and category?"*`,
    quickReplies: ['CGPA Formula', 'Attendance Rules', 'Why is my grade dropping?', 'Emergency Helplines']
  };
}
