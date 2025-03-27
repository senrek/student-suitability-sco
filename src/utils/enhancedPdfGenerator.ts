import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CareerMatch } from '../hooks/useAssessment';

interface UserAnswer {
  questionId: string;
  question: string;
  answer: string;
  category: string;
}

interface UserAssessment {
  personalityTraits: { [key: string]: number };
  skillStrengths: { [key: string]: number };
  careerPreferences: { [key: string]: number };
  workStyle: { [key: string]: number };
}

interface CareerPathAnalysis {
  path: string;
  matchScore: number;
  requirements: string[];
  skills: string[];
  outlook: string;
  salary: string;
}

export const generateEnhancedReport = async (
  user: any,
  answers: UserAnswer[],
  assessment: UserAssessment,
  topCareerPaths: CareerPathAnalysis[]
) => {
  const doc = new jsPDF();
  let currentY = 10;

  // Helper function to add section title
  const addSectionTitle = (title: string) => {
    doc.setFontSize(16);
    doc.setTextColor(33, 53, 137);
    doc.text(title, 15, currentY);
    currentY += 10;
  };

  // Helper function to add paragraph
  const addParagraph = (text: string, fontSize = 11) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 15, currentY);
    currentY += (lines.length * fontSize * 0.5) + 5;
  };

  // Add logo and header
  try {
    const imgData = '/3iglobaledutech-logo.png';
    doc.addImage(imgData, 'PNG', 15, currentY, 40, 25);
    currentY += 30;
  } catch (e) {
    console.error('Error adding logo:', e);
  }

  // Report Title
  doc.setFontSize(24);
  doc.setTextColor(33, 53, 137);
  doc.text('Career Assessment Report', 105, currentY, { align: 'center' });
  currentY += 20;

  // User Information
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Name: ${user.name}`, 15, currentY);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 120, currentY);
  currentY += 15;

  // 1. Personality Analysis
  addSectionTitle('1. Personality Analysis');
  const personalityInsight = generatePersonalityInsight(assessment.personalityTraits);
  addParagraph(personalityInsight);
  
  // Add personality traits chart
  currentY = addTraitsChart(doc, assessment.personalityTraits, currentY);
  currentY += 15;

  // 2. Career Path Analysis
  addSectionTitle('2. Career Path Analysis');
  
  // Top career paths table
  const topPathsData = topCareerPaths.slice(0, 5).map(path => [
    path.path,
    `${path.matchScore}%`,
    path.outlook,
    path.salary
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['Career Path', 'Match', 'Outlook', 'Salary Range']],
    body: topPathsData,
    theme: 'striped',
    headStyles: { fillColor: [33, 53, 137] },
  });

  currentY = (doc as any).lastAutoTable.finalY + 10;

  // 3. Skills and Abilities Analysis
  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }

  addSectionTitle('3. Skills and Abilities Analysis');
  const skillsAnalysis = generateSkillsAnalysis(assessment.skillStrengths);
  addParagraph(skillsAnalysis);

  // Add skills radar chart
  currentY = addSkillsChart(doc, assessment.skillStrengths, currentY);
  currentY += 15;

  // 4. GAP Analysis
  addSectionTitle('4. GAP Analysis');
  const gapAnalysis = generateGapAnalysis(assessment, topCareerPaths[0]);
  
  autoTable(doc, {
    startY: currentY,
    head: [['Area', 'Current Level', 'Required Level', 'Gap', 'Bridging Strategy']],
    body: gapAnalysis,
    theme: 'striped',
    headStyles: { fillColor: [33, 53, 137] },
  });

  currentY = (doc as any).lastAutoTable.finalY + 10;

  // 5. Career Navigator
  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }

  addSectionTitle('5. Career Navigator');
  const careerSteps = generateCareerSteps(topCareerPaths[0]);
  careerSteps.forEach(step => {
    addParagraph(`${step.phase}: ${step.description}`, 10);
  });

  // 6. Action Plan
  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }

  addSectionTitle('6. Personalized Action Plan');
  const actionPlan = generateActionPlan(assessment, topCareerPaths[0]);
  actionPlan.forEach((action, index) => {
    addParagraph(`${index + 1}. ${action}`, 10);
  });

  // Add randomization element
  const randomTip = getRandomCareerTip();
  currentY += 10;
  doc.setFontSize(11);
  doc.setTextColor(33, 53, 137);
  doc.text('Pro Tip:', 15, currentY);
  currentY += 7;
  doc.setTextColor(60, 60, 60);
  addParagraph(randomTip);

  // Save the PDF
  const timestamp = new Date().getTime();
  doc.save(`Career_Assessment_${user.name.replace(/\s+/g, '_')}_${timestamp}.pdf`);
};

// Enhanced personality insight generation
function generatePersonalityInsight(traits: Record<string, number>): string {
  const topTraits = Object.entries(traits)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);
  
  let insight = 'Your personality profile shows strong alignment with ';
  insight += topTraits.map(([trait, score]) => `${trait} (${Math.round(score)}%)`).join(', ');
  insight += '. ';
  
  // Add specific implications
  if (topTraits.some(([trait]) => trait.includes('Analytical'))) {
    insight += 'This analytical mindset suggests you excel in problem-solving and critical thinking tasks. ';
  }
  if (topTraits.some(([trait]) => trait.includes('Creative'))) {
    insight += 'Your creative nature indicates strong potential in innovative and design-oriented roles. ';
  }
  if (topTraits.some(([trait]) => trait.includes('Social'))) {
    insight += 'Your social skills suggest you thrive in collaborative environments and leadership positions. ';
  }
  
  return insight;
}

// Enhanced skills analysis
function generateSkillsAnalysis(skills: Record<string, number>): string {
  const topSkills = Object.entries(skills)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  
  let analysis = 'Your skill profile reveals several key strengths:\n\n';
  
  topSkills.forEach(([skill, score]) => {
    analysis += `• ${skill}: ${Math.round(score)}% proficiency\n`;
    analysis += `  - This skill is particularly valuable in ${getRelevantCareers(skill)}\n`;
    analysis += `  - Recommended development: ${getSkillDevelopmentTips(skill)}\n\n`;
  });
  
  return analysis;
}

// Get relevant careers for a skill
function getRelevantCareers(skill: string): string {
  const careerMap: Record<string, string[]> = {
    'Problem Solving': ['Engineering', 'Research', 'Technology'],
    'Communication': ['Business', 'Education', 'Healthcare'],
    'Creativity': ['Arts', 'Design', 'Marketing'],
    'Leadership': ['Management', 'Education', 'Public Service'],
    'Technical': ['Engineering', 'IT', 'Science']
  };
  
  return careerMap[skill]?.join(', ') || 'various professional fields';
}

// Get development tips for a skill
function getSkillDevelopmentTips(skill: string): string {
  const tipsMap: Record<string, string> = {
    'Problem Solving': 'Practice through puzzles, coding challenges, and real-world projects',
    'Communication': 'Join debate clubs, take public speaking courses, and participate in group discussions',
    'Creativity': 'Engage in artistic projects, design challenges, and brainstorming sessions',
    'Leadership': 'Take on team projects, join student government, and mentor others',
    'Technical': 'Enroll in specialized courses, work on technical projects, and stay updated with industry trends'
  };
  
  return tipsMap[skill] || 'Regular practice and real-world application';
}

// Enhanced gap analysis
function generateGapAnalysis(assessment: UserAssessment, targetCareer: CareerPathAnalysis) {
  const requiredSkills = getRequiredSkills(targetCareer.path);
  const currentSkills = assessment.skillStrengths;
  
  return Object.entries(requiredSkills).map(([skill, required]) => {
    const current = currentSkills[skill] || 0;
    const gap = required - current;
    
    return [
      skill,
      `${Math.round(current)}%`,
      `${Math.round(required)}%`,
      `${Math.round(gap)}%`,
      getGapBridgingStrategy(skill, gap)
    ];
  });
}

// Get required skills for a career path
function getRequiredSkills(careerPath: string): Record<string, number> {
  const skillRequirements: Record<string, Record<string, number>> = {
    'Engineering': {
      'Problem Solving': 90,
      'Technical': 85,
      'Analytical': 80,
      'Communication': 70,
      'Project Management': 75
    },
    'Business': {
      'Communication': 85,
      'Leadership': 80,
      'Analytical': 75,
      'Problem Solving': 70,
      'Strategic Thinking': 80
    },
    'Arts': {
      'Creativity': 90,
      'Communication': 80,
      'Technical': 70,
      'Problem Solving': 65,
      'Project Management': 70
    }
  };
  
  return skillRequirements[careerPath] || {
    'Problem Solving': 75,
    'Communication': 75,
    'Technical': 70,
    'Leadership': 70,
    'Creativity': 70
  };
}

// Get strategy to bridge skill gaps
function getGapBridgingStrategy(skill: string, gap: number): string {
  if (gap <= 10) return 'Maintain current development pace';
  if (gap <= 20) return 'Increase practice frequency';
  if (gap <= 30) return 'Seek specialized training';
  return 'Consider intensive development program';
}

// Enhanced career steps generation
function generateCareerSteps(targetCareer: CareerPathAnalysis) {
  const steps = [
    {
      phase: 'Foundation (0-6 months)',
      description: `Build core knowledge in ${targetCareer.path} through coursework and self-study`
    },
    {
      phase: 'Development (6-12 months)',
      description: 'Gain practical experience through projects and internships'
    },
    {
      phase: 'Specialization (1-2 years)',
      description: 'Focus on specific areas of interest within the field'
    },
    {
      phase: 'Professional Growth (2+ years)',
      description: 'Develop advanced skills and build professional network'
    }
  ];
  
  return steps;
}

// Enhanced action plan generation
function generateActionPlan(assessment: UserAssessment, targetCareer: CareerPathAnalysis) {
  const plan = [];
  const gapAnalysis = generateGapAnalysis(assessment, targetCareer);
  
  // Immediate actions based on largest gaps
  const topGaps = gapAnalysis
    .sort(([, , , gapA], [, , , gapB]) => Number(gapB) - Number(gapA))
    .slice(0, 3);
  
  plan.push('Priority Actions (Next 3 Months):');
  topGaps.forEach(([skill, , , gap, strategy]) => {
    plan.push(`• Focus on ${skill} development: ${strategy}`);
  });
  
  // Short-term goals
  plan.push('\nShort-term Goals (3-6 Months):');
  plan.push('• Enroll in relevant courses or workshops');
  plan.push('• Join professional organizations or communities');
  plan.push('• Start building a portfolio of work');
  
  // Long-term goals
  plan.push('\nLong-term Goals (6-12 Months):');
  plan.push('• Secure internship or entry-level position');
  plan.push('• Develop specialized expertise');
  plan.push('• Build professional network');
  
  return plan;
}

// Chart generation functions (simplified versions)
function addTraitsChart(doc: jsPDF, traits: { [key: string]: number }, startY: number): number {
  // Simplified chart representation
  const chartHeight = 60;
  doc.setFontSize(10);
  Object.entries(traits).forEach(([trait, value], index) => {
    doc.setFillColor(33, 53, 137);
    doc.rect(15, startY + (index * 12), value * 1.5, 8, 'F');
    doc.text(trait, 160, startY + (index * 12) + 6);
  });
  return startY + chartHeight;
}

function addSkillsChart(doc: jsPDF, skills: { [key: string]: number }, startY: number): number {
  // Simplified chart representation
  const chartHeight = 60;
  doc.setFontSize(10);
  Object.entries(skills).forEach(([skill, value], index) => {
    doc.setFillColor(33, 53, 137);
    doc.rect(15, startY + (index * 12), value * 1.5, 8, 'F');
    doc.text(skill, 160, startY + (index * 12) + 6);
  });
  return startY + chartHeight;
}

function getRandomCareerTip(): string {
  const tips = [
    'Consider informational interviews with professionals in your target field.',
    'Join professional associations related to your career interests.',
    'Create a learning roadmap for acquiring new skills.',
    'Build an online presence in your professional field.',
    'Seek mentorship opportunities in your chosen industry.'
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}
