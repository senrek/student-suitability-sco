import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CareerMatch } from '../hooks/useAssessment';

interface UserInfo {
  name: string;
  email: string;
  grade?: string;
  age?: number;
}

interface CareerClusterInfo {
  [key: string]: {
    name: string;
    description: string;
    skills: string[];
    careers: string[];
    education: string[];
    resources: { title: string; url: string }[];
    salaryRange: string;
    growthRate: string;
    alternativePaths: string[];
    industryTrends: string[];
    requiredCertifications: string[];
  };
}

// Career cluster information with detailed data
const careerClusterInfo: CareerClusterInfo = {
  science: {
    name: 'Science & Research',
    description: 'Careers focused on scientific research, analysis, and discovery.',
    skills: ['Analytical thinking', 'Research methodology', 'Data analysis', 'Scientific writing'],
    careers: ['Research Scientist', 'Data Analyst', 'Environmental Scientist', 'Biotechnologist'],
    education: ['Bachelor\'s in relevant science field', 'Master\'s for research positions', 'PhD for advanced research'],
    resources: [
      { title: 'Science Careers Guide', url: 'https://www.sciencecareers.org' },
      { title: 'Research Opportunities', url: 'https://www.researchgate.net' }
    ],
    salaryRange: '$45,000 - $120,000',
    growthRate: '8% (Above Average)',
    alternativePaths: ['Science Communication', 'Science Policy', 'Science Education'],
    industryTrends: ['AI in Research', 'Green Technology', 'Biotechnology Advances'],
    requiredCertifications: ['Laboratory Safety', 'Research Ethics']
  },
  technology: {
    name: 'Technology & Computing',
    description: 'Careers in software development, IT, and digital innovation.',
    skills: ['Programming', 'Problem-solving', 'System design', 'Digital literacy'],
    careers: ['Software Developer', 'IT Specialist', 'Data Scientist', 'Cybersecurity Analyst'],
    education: ['Bachelor\'s in Computer Science or IT', 'Industry certifications'],
    resources: [
      { title: 'Tech Career Resources', url: 'https://www.techcareers.org' },
      { title: 'Coding Bootcamps', url: 'https://www.codingbootcamps.com' }
    ],
    salaryRange: '$60,000 - $150,000',
    growthRate: '12% (Very High)',
    alternativePaths: ['Tech Sales', 'Technical Writing', 'Tech Education'],
    industryTrends: ['Cloud Computing', 'AI/ML', 'Cybersecurity'],
    requiredCertifications: ['AWS/Azure', 'CompTIA', 'CISSP']
  },
  // Add similar detailed information for other clusters...
};

// Normalize scores to 0-100% range
function normalizeScore(score: number): number {
  return Math.min(Math.max(Math.round(score), 0), 100);
}

// Enhanced alignment level with more detailed analysis
function getAlignmentLevel(score: number): string {
  if (score >= 90) return 'Exceptional Alignment';
  if (score >= 80) return 'Strong Alignment';
  if (score >= 70) return 'Good Alignment';
  if (score >= 60) return 'Moderate Alignment';
  if (score >= 50) return 'Basic Alignment';
  return 'Limited Alignment';
}

// Enhanced cluster icon function with more categories
function getClusterIcon(clusterName: string): string {
  if (clusterName.includes('Science')) return '🔬';
  if (clusterName.includes('Technology')) return '💻';
  if (clusterName.includes('Engineering')) return '⚙️';
  if (clusterName.includes('Healthcare')) return '🏥';
  if (clusterName.includes('Arts')) return '🎨';
  if (clusterName.includes('Business')) return '💼';
  if (clusterName.includes('Education')) return '📚';
  if (clusterName.includes('Social')) return '🤝';
  return '🎯';
}

// Generate personalized insights based on assessment patterns
function generatePersonalizedInsights(results: CareerMatch[], userInfo: UserInfo): string {
  const topMatch = results[0];
  const secondaryMatches = results.slice(1, 3);
  const clusterInfo = careerClusterInfo[topMatch.clusterName.toLowerCase()];
  
  let insight = `Based on your assessment responses, you demonstrate ${getAlignmentLevel(normalizeScore(topMatch.score))} with ${topMatch.clusterName} careers (${normalizeScore(topMatch.score)}% match). `;
  
  // Add specific strengths based on cluster
  if (clusterInfo) {
    insight += `Your profile aligns well with careers in ${clusterInfo.name}, which offers a salary range of ${clusterInfo.salaryRange} and shows a ${clusterInfo.growthRate} growth rate. `;
    
    // Add industry trends
    if (clusterInfo.industryTrends.length > 0) {
      insight += `Key industry trends include ${clusterInfo.industryTrends.join(', ')}. `;
    }
  }
  
  // Add secondary interests analysis
  if (secondaryMatches.length > 0) {
    insight += `Your secondary interests in ${secondaryMatches.map(m => m.clusterName).join(' and ')} `;
    insight += `(${secondaryMatches.map(m => `${normalizeScore(m.score)}%`).join(' and ')} matches respectively) `;
    insight += 'suggest a diverse skill set that could lead to unique career opportunities. ';
  }
  
  // Add grade-specific insights
  if (userInfo.grade) {
    const grade = parseInt(userInfo.grade.split('-')[0]);
    if (grade >= 11) {
      insight += 'As you approach college, consider exploring specialized programs and internships in your areas of interest. ';
    } else {
      insight += 'Focus on building a strong foundation in core subjects while exploring extracurricular activities related to your interests. ';
    }
  }
  
  return insight;
}

// Generate career recommendations based on assessment results
function generateCareerRecommendations(results: CareerMatch[], userInfo: UserInfo): string[] {
  const topMatch = results[0];
  const recommendations: string[] = [];
  const clusterInfo = careerClusterInfo[topMatch.clusterName.toLowerCase()];
  
  // Base recommendations on top match
  if (clusterInfo) {
    // Add cluster-specific recommendations
    recommendations.push(`Focus on developing ${clusterInfo.skills.join(', ')}`);
    recommendations.push(`Explore ${clusterInfo.careers.join(', ')} as potential career paths`);
    
    // Add certification recommendations
    if (clusterInfo.requiredCertifications.length > 0) {
      recommendations.push(`Consider obtaining certifications in ${clusterInfo.requiredCertifications.join(', ')}`);
    }
    
    // Add alternative path recommendations
    if (clusterInfo.alternativePaths.length > 0) {
      recommendations.push(`Explore alternative paths like ${clusterInfo.alternativePaths.join(', ')}`);
    }
  }
  
  // Add general recommendations
  recommendations.push('Develop strong communication and presentation skills');
  recommendations.push('Build a professional network through LinkedIn');
  recommendations.push('Seek mentorship from professionals in your field of interest');
  
  // Grade-specific recommendations
  if (userInfo.grade) {
    const grade = parseInt(userInfo.grade.split('-')[0]);
    if (grade >= 11) {
      recommendations.push('Research college programs and majors aligned with your career interests');
      recommendations.push('Seek summer internships or job shadowing opportunities');
      recommendations.push('Build a professional network through LinkedIn and industry events');
    } else {
      recommendations.push('Focus on maintaining strong grades in core subjects');
      recommendations.push('Explore different career paths through informational interviews');
      recommendations.push('Develop time management and study skills for future success');
    }
  }
  
  return recommendations;
}

// Generate action plan based on assessment results
function generateActionPlan(results: CareerMatch[], userInfo: UserInfo): string[] {
  const topMatch = results[0];
  const plan: string[] = [];
  const clusterInfo = careerClusterInfo[topMatch.clusterName.toLowerCase()];
  
  // Immediate actions (next 3 months)
  plan.push('Immediate Actions (Next 3 Months):');
  plan.push(`• Research specific careers in ${topMatch.clusterName}`);
  plan.push('• Join relevant professional associations or student organizations');
  plan.push('• Start building a portfolio of relevant projects or achievements');
  
  if (clusterInfo) {
    plan.push(`• Explore salary expectations (${clusterInfo.salaryRange})`);
    plan.push(`• Research industry growth trends (${clusterInfo.growthRate})`);
  }
  
  // Short-term goals (3-6 months)
  plan.push('\nShort-term Goals (3-6 Months):');
  plan.push('• Identify and enroll in relevant courses or workshops');
  plan.push('• Connect with professionals in your target field');
  plan.push('• Develop key skills through online learning platforms');
  
  if (clusterInfo?.requiredCertifications.length > 0) {
    plan.push(`• Begin preparation for ${clusterInfo.requiredCertifications[0]} certification`);
  }
  
  // Medium-term objectives (6-12 months)
  plan.push('\nMedium-term Objectives (6-12 Months):');
  plan.push('• Apply for internships or part-time jobs in your field');
  plan.push('• Create a professional development plan');
  plan.push('• Build a strong academic foundation for your chosen career path');
  
  if (clusterInfo?.alternativePaths.length > 0) {
    plan.push(`• Explore alternative career paths like ${clusterInfo.alternativePaths[0]}`);
  }
  
  return plan;
}

// Generate skill gap analysis
function generateSkillGapAnalysis(results: CareerMatch[], userInfo: UserInfo): string[] {
  const topMatch = results[0];
  const analysis: string[] = [];
  const clusterInfo = careerClusterInfo[topMatch.clusterName.toLowerCase()];
  
  if (clusterInfo) {
    analysis.push('Skill Gap Analysis:');
    analysis.push(`Required Skills for ${clusterInfo.name}:`);
    
    clusterInfo.skills.forEach(skill => {
      analysis.push(`• ${skill}`);
    });
    
    analysis.push('\nDevelopment Recommendations:');
    analysis.push('• Take relevant courses and workshops');
    analysis.push('• Participate in hands-on projects');
    analysis.push('• Seek mentorship from professionals');
    analysis.push('• Join industry-specific communities');
  }
  
  return analysis;
}

// Generate college program recommendations
function generateCollegeRecommendations(results: CareerMatch[], userInfo: UserInfo): string[] {
  const topMatch = results[0];
  const recommendations: string[] = [];
  const clusterInfo = careerClusterInfo[topMatch.clusterName.toLowerCase()];
  
  if (clusterInfo) {
    recommendations.push('Recommended College Programs:');
    clusterInfo.education.forEach(edu => {
      recommendations.push(`• ${edu}`);
    });
    
    recommendations.push('\nAdditional Considerations:');
    recommendations.push('• Look for programs with strong industry connections');
    recommendations.push('• Consider programs offering internship opportunities');
    recommendations.push('• Research program rankings and alumni success');
  }
  
  return recommendations;
}

export const generateAssessmentReport = (
  userInfo: UserInfo,
  results: CareerMatch[],
  answeredQuestions: number,
  totalQuestions: number
): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Set default font
  doc.setFont('helvetica');
  
  // Add 3i Global EduTech logo
  try {
    doc.addImage('/3iglobaledutech-logo.png', 'PNG', 15, 10, 40, 20);
  } catch (error) {
    console.error('Error adding logo to PDF:', error);
  }
  
  // Add report title with consistent branding
  doc.setFontSize(20);
  doc.setTextColor(0, 71, 171);
  doc.text('Career Assessment Report', pageWidth / 2, 20, { align: 'center' });
  
  // Add date and confidentiality notice
  const today = new Date();
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${today.toLocaleDateString()}`, pageWidth - 15, 30, { align: 'right' });
  
  // Add user information with privacy notice
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Name: ${userInfo.name}`, 15, 45);
  doc.text(`Grade: ${userInfo.grade}`, 15, 52);
  
  // Add assessment summary with completion rate
  doc.setFontSize(14);
  doc.setTextColor(0, 71, 171);
  doc.text('Assessment Summary', 15, 80);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const completionRate = Math.round((answeredQuestions / totalQuestions) * 100);
  doc.text(`Questions Answered: ${answeredQuestions} of ${totalQuestions}`, 15, 90);
  doc.text(`Completion Rate: ${completionRate}%`, 15, 97);
  
  // Add career matches table with normalized scores
  doc.setFontSize(14);
  doc.setTextColor(0, 71, 171);
  doc.text('Your Career Cluster Matches', 15, 115);
  
  const matchesData = results.map((match, index) => {
    const clusterInfo = careerClusterInfo[match.clusterName.toLowerCase()];
    return [
    index + 1,
    match.clusterName,
    `${normalizeScore(match.score)}%`,
    getAlignmentLevel(normalizeScore(match.score)),
      getClusterIcon(match.clusterName),
      clusterInfo?.salaryRange || 'N/A',
      clusterInfo?.growthRate || 'N/A'
    ];
  });
  
  autoTable(doc, {
    startY: 125,
    head: [['Rank', 'Career Cluster', 'Match Score', 'Alignment', '', 'Salary Range', 'Growth Rate']],
    body: matchesData,
    theme: 'striped',
    headStyles: { 
      fillColor: [0, 71, 171],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    styles: { 
      fontSize: 10,
      cellPadding: 5
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 50 },
      2: { cellWidth: 25 },
      3: { cellWidth: 35 },
      4: { cellWidth: 20 },
      5: { cellWidth: 35 },
      6: { cellWidth: 25 }
    }
  });

  // Add career cluster analysis chart with proper labels
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(0, 71, 171);
  doc.text('Career Cluster Analysis', pageWidth / 2, 20, { align: 'center' });
  
  // Draw bar chart for top 5 matches with proper spacing and labels
  const chartY = 40;
  const barWidth = 20;
  const spacing = 35;
  const maxScore = 100; // Normalized max score
  
  results.slice(0, 5).forEach((match, index) => {
    const x = 15 + (index * spacing);
    const normalizedScore = normalizeScore(match.score);
    const barHeight = (normalizedScore / maxScore) * 100;
    
    // Draw bar with gradient
    doc.setFillColor(0, 71, 171);
    doc.rect(x, chartY + 100 - barHeight, barWidth, barHeight, 'F');
    
    // Add label with proper spacing
    doc.setFontSize(8);
    const label = match.clusterName.length > 10 
      ? match.clusterName.substring(0, 10) + '...' 
      : match.clusterName;
    doc.text(label, x, chartY + 110, { align: 'center' });
    doc.text(`${normalizedScore}%`, x + barWidth/2, chartY + 120, { align: 'center' });
  });

  // Add chart legend
  doc.setFontSize(10);
  doc.text('Match Score (%)', 15, chartY + 130);
  doc.text('Career Clusters', pageWidth / 2, chartY + 130, { align: 'center' });

  // Top 3 Career Clusters Detailed Analysis
  results.slice(0, 3).forEach((match, index) => {
    doc.addPage();
    const clusterInfo = careerClusterInfo[match.clusterName.toLowerCase()];
    
    // Cluster title with icon and normalized score
    doc.setFontSize(16);
    doc.setTextColor(0, 71, 171);
    doc.text(`Career Cluster #${index + 1}: ${match.clusterName}`, pageWidth / 2, 20, { align: 'center' });
    doc.text(`Match Score: ${normalizeScore(match.score)}% (${getAlignmentLevel(normalizeScore(match.score))})`, pageWidth / 2, 30, { align: 'center' });
    
    if (clusterInfo) {
      // Salary and Growth Information
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Salary Range: ${clusterInfo.salaryRange}`, 15, 45);
      doc.text(`Industry Growth Rate: ${clusterInfo.growthRate}`, 15, 52);
    
    // Description
    doc.setFontSize(12);
      doc.text('Overview:', 15, 65);
      const descriptionLines = doc.splitTextToSize(clusterInfo.description, pageWidth - 30);
      doc.text(descriptionLines, 15, 75);
    
    // Key Skills
      let currentY = 75 + (descriptionLines.length * 7);
    doc.setFontSize(12);
    doc.setTextColor(0, 71, 171);
    doc.text('Key Skills Required:', 15, currentY);
    
    doc.setTextColor(0, 0, 0);
      clusterInfo.skills.forEach((skill, i) => {
      doc.text(`• ${skill}`, 20, currentY + 10 + (i * 7));
    });
    
    // Potential Careers with salary ranges
      currentY = currentY + 10 + (clusterInfo.skills.length * 7);
    doc.setTextColor(0, 71, 171);
    doc.text('Potential Careers:', 15, currentY);
    
    doc.setTextColor(0, 0, 0);
      clusterInfo.careers.forEach((career, i) => {
      doc.text(`• ${career}`, 20, currentY + 10 + (i * 7));
    });
    
    // Education Requirements
      currentY = currentY + 10 + (clusterInfo.careers.length * 7);
    doc.setTextColor(0, 71, 171);
    doc.text('Education Requirements:', 15, currentY);
    
    doc.setTextColor(0, 0, 0);
      clusterInfo.education.forEach((edu, i) => {
      doc.text(`• ${edu}`, 20, currentY + 10 + (i * 7));
    });
      
      // Industry Trends
      currentY = currentY + 10 + (clusterInfo.education.length * 7);
      doc.setTextColor(0, 71, 171);
      doc.text('Industry Trends:', 15, currentY);
      
      doc.setTextColor(0, 0, 0);
      clusterInfo.industryTrends.forEach((trend, i) => {
        doc.text(`• ${trend}`, 20, currentY + 10 + (i * 7));
      });
      
      // Required Certifications
      currentY = currentY + 10 + (clusterInfo.industryTrends.length * 7);
      doc.setTextColor(0, 71, 171);
      doc.text('Required Certifications:', 15, currentY);
      
      doc.setTextColor(0, 0, 0);
      clusterInfo.requiredCertifications.forEach((cert, i) => {
        doc.text(`• ${cert}`, 20, currentY + 10 + (i * 7));
      });
      
      // Alternative Career Paths
      currentY = currentY + 10 + (clusterInfo.requiredCertifications.length * 7);
      doc.setTextColor(0, 71, 171);
      doc.text('Alternative Career Paths:', 15, currentY);
      
      doc.setTextColor(0, 0, 0);
      clusterInfo.alternativePaths.forEach((path, i) => {
        doc.text(`• ${path}`, 20, currentY + 10 + (i * 7));
      });
    
    // Resources with clickable links
      currentY = currentY + 10 + (clusterInfo.alternativePaths.length * 7);
    doc.setTextColor(0, 71, 171);
    doc.text('Recommended Resources:', 15, currentY);
    
    doc.setTextColor(0, 0, 0);
      clusterInfo.resources.forEach((resource, i) => {
      doc.text(`• ${resource.title}`, 20, currentY + 10 + (i * 12));
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 255);
      doc.text(`  ${resource.url}`, 25, currentY + 10 + (i * 12) + 5);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
    });
    }
  });

  // Add personalized insights page
  doc.addPage();
  
  doc.setFontSize(16);
  doc.setTextColor(0, 71, 171);
  doc.text('Personalized Career Insights', pageWidth / 2, 20, { align: 'center' });
  
  // Career Cluster Analysis with normalized scores
  doc.setFontSize(14);
  doc.text('Career Cluster Analysis:', 15, 40);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const analysis = generatePersonalizedInsights(results, userInfo);
  const analysisLines = doc.splitTextToSize(analysis, pageWidth - 30);
  doc.text(analysisLines, 15, 50);
  
  // Skills Development with specific recommendations
  doc.setFontSize(14);
  doc.setTextColor(0, 71, 171);
  doc.text('Skills Development Focus:', 15, 70);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const skills = generateCareerRecommendations(results, userInfo);
  
  skills.forEach((skill, index) => {
    doc.text(`${index + 1}. ${skill}`, 20, 85 + (index * 10));
  });
  
  // Skill Gap Analysis
  doc.setFontSize(14);
  doc.setTextColor(0, 71, 171);
  doc.text('Skill Gap Analysis:', 15, 150);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const skillGapAnalysis = generateSkillGapAnalysis(results, userInfo);
  
  skillGapAnalysis.forEach((item, index) => {
    doc.text(item, 20, 165 + (index * 10));
  });
  
  // College Program Recommendations
  doc.setFontSize(14);
  doc.setTextColor(0, 71, 171);
  doc.text('College Program Recommendations:', 15, 220);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const collegeRecommendations = generateCollegeRecommendations(results, userInfo);
  
  collegeRecommendations.forEach((item, index) => {
    doc.text(item, 20, 235 + (index * 10));
  });
  
  // Career Development Plan with SMART goals
  doc.addPage();
  doc.setFontSize(14);
  doc.setTextColor(0, 71, 171);
  doc.text('Career Development Plan:', 15, 20);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const plan = generateActionPlan(results, userInfo);
  
  plan.forEach((item, index) => {
    doc.text(item, 20, 35 + (index * 10));
  });
  
  // Add conclusion with privacy notice
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const conclusion = 'Remember that this assessment is a starting point for your career exploration journey. Your interests and skills will continue to develop over time. Stay open to new opportunities and regularly reassess your goals as you gain more experience and knowledge in your chosen fields.';
  
  const conclusionLines = doc.splitTextToSize(conclusion, pageWidth - 30);
  doc.text(conclusionLines, 15, 250);
  
  // Add footer with privacy notice and page numbers to all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('© 3i Global EduTech - Career Assessment Report | Confidential Report – Data stored securely per GDPR guidelines', pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 15, pageHeight - 10, { align: 'right' });
  }
  
  return doc;
};
