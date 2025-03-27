
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CareerMatch } from '../hooks/useAssessment';

interface UserInfo {
  name: string;
  email: string;
  phoneNumber?: string;
  age?: string;
  location?: string;
  grade: string;
}

export const generateAssessmentReport = (
  userInfo: UserInfo,
  results: CareerMatch[],
  answeredQuestions: number,
  totalQuestions: number
) => {
  const doc = new jsPDF();
  
  try {
    // Get today's date in DD-MM-YYYY format
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
    
    // Cover Page
    try {
      doc.addImage('/3iglobaledutech-logo.png', 'PNG', 15, 10, 40, 25);
    } catch (e) {
      console.warn('Failed to add logo to PDF:', e);
    }
    
    doc.setFontSize(18);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Report', 105, 30, { align: 'center' });
    
    if (userInfo.grade.includes('8') || userInfo.grade.includes('9') || userInfo.grade.includes('10')) {
      doc.text(`Career Report for ${userInfo.grade}`, 105, 40, { align: 'center' });
    } else {
      doc.text(`Career Report for High School`, 105, 40, { align: 'center' });
    }
    
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Report Prepared for', 105, 60, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(userInfo.name, 105, 70, { align: 'center' });
    
    doc.setFontSize(11);
    doc.text(`Ph No ${userInfo.phoneNumber || 'Not provided'}`, 105, 80, { align: 'center' });
    doc.text(`Email ID ${userInfo.email}`, 105, 87, { align: 'center' });
    doc.text(`Age ${userInfo.age || 'Not provided'}`, 105, 94, { align: 'center' });
    doc.text(`Location ${userInfo.location || 'Not provided'}`, 105, 101, { align: 'center' });
    doc.text(`Date ${formattedDate}`, 105, 108, { align: 'center' });
    
    // Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    const disclaimer = 'This report is intended only for the use of the individual or entity to which it is addressed and may contain information that is non-public, proprietary, privileged, confidential, and exempt from disclosure under applicable law or may constitute as attorney work product. No part of this report may be reproduced in any form or manner without prior written permission from Company';
    doc.text(disclaimer, 15, 230, { maxWidth: 180 });
    
    doc.setFontSize(9);
    doc.text('3i Global Edutech - Contact: info@3iglobaledutech.com', 105, 250, { align: 'center' });
    doc.text(`${userInfo.name} Page 1`, 105, 260, { align: 'center' });
    
    // Add second page - Career Path
    doc.addPage();
    
    doc.setFontSize(16);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Report', 105, 20, { align: 'center' });
    
    // Get top career match
    const topCareer = results[0];
    
    doc.setFontSize(14);
    doc.text(`Career Path: ${topCareer.clusterName}`, 15, 40);
    
    // Occupations list
    doc.setFontSize(12);
    doc.text('Occupations:', 15, 50);
    
    if (topCareer.careers && topCareer.careers.length > 0) {
      const occupations = topCareer.careers.join('; ');
      doc.text(occupations, 80, 50);
    }
    
    // Suitability Meter
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Suitability Meter', 15, 70);
    
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(220, 220, 220);
    doc.roundedRect(15, 80, 180, 15, 3, 3, 'FD');
    
    const suitabilityScore = topCareer.score;
    doc.setFillColor(33, 150, 83);
    doc.roundedRect(15, 80, (180 * suitabilityScore) / 100, 15, 3, 3, 'FD');
    
    doc.setTextColor(255, 255, 255);
    doc.text(`${suitabilityScore}%`, 20, 90);
    
    // Suitability rating
    doc.setTextColor(0, 0, 0);
    let rating = 'Fair';
    if (suitabilityScore >= 80) rating = 'Excellent';
    else if (suitabilityScore >= 70) rating = 'Good';
    else if (suitabilityScore >= 60) rating = 'Above Average';
    else if (suitabilityScore >= 50) rating = 'Average';
    doc.text(rating, 185, 90, { align: 'right' });
    
    // Psychometric Score
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Psychometric Score', 15, 115);
    
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(220, 220, 220);
    doc.roundedRect(15, 125, 180, 15, 3, 3, 'FD');
    
    // This is just an example - in a real app, this would be calculated from actual psychometric data
    const psychometricScore = Math.round(suitabilityScore * 0.95);
    doc.setFillColor(33, 100, 183);
    doc.roundedRect(15, 125, (180 * psychometricScore) / 100, 15, 3, 3, 'FD');
    
    doc.setTextColor(255, 255, 255);
    doc.text(`${psychometricScore}%`, 20, 135);
    
    // Psychometric rating
    doc.setTextColor(0, 0, 0);
    let psychRating = 'Fair';
    if (psychometricScore >= 80) psychRating = 'Excellent';
    else if (psychometricScore >= 70) psychRating = 'Good';
    else if (psychometricScore >= 60) psychRating = 'Above Average';
    else if (psychometricScore >= 50) psychRating = 'Average';
    doc.text(psychRating, 185, 135, { align: 'right' });
    
    // Skills & Abilities
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Skills & Abilities', 15, 160);
    
    // Get skills from top career
    if (topCareer.skills && topCareer.skills.length > 0) {
      let skillsY = 170;
      topCareer.skills.forEach((skill, index) => {
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(`• ${skill}`, 20, skillsY);
        skillsY += 8;
        
        // If there are many skills, we might need to handle overflow
        if (skillsY > 240 && index < topCareer.skills.length - 1) {
          skillsY = 20;
          doc.addPage();
        }
      });
    }
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global Edutech - Contact: info@3iglobaledutech.com', 105, 280, { align: 'center' });
    doc.text(`${userInfo.name} Page 2`, 185, 280, { align: 'right' });
    
    // Add third page - Work Nature
    doc.addPage();
    
    doc.setFontSize(16);
    doc.setTextColor(33, 53, 120);
    doc.text('Milestone Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('Work Nature', 105, 40, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('About Career', 15, 60);
    
    // Career description
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const descriptionLines = doc.splitTextToSize(topCareer.description, 180);
    doc.text(descriptionLines, 15, 70);
    
    // Work Nature details (these would be dynamically generated based on the career)
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Work Nature', 15, 120);
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // Example work nature bullets - these would come from a more detailed data source in a real app
    const workNaturePoints = [
      'Examines or conducts tests on patient to provide information on a medical condition.',
      'Prescribes or administers treatment, therapy, medication, vaccination, and other specialized medical care.',
      "Monitors patients' condition and progress and re-evaluates treatments as necessary.",
      'Explains procedures and discusses test results on prescribed treatments with patents.',
      'Collects, records, and maintains patient information, such as medical history and reports.'
    ];
    
    let workNatureY = 130;
    workNaturePoints.forEach(point => {
      doc.text(`• ${point}`, 15, workNatureY);
      workNatureY += 10;
    });
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global Edutech - Contact: info@3iglobaledutech.com', 105, 280, { align: 'center' });
    doc.text(`${userInfo.name} Page 3`, 185, 280, { align: 'right' });
    
    // Add fourth page - Career Path Analysis
    doc.addPage();
    
    doc.setFontSize(16);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('Career Path Analysis', 15, 40);
    
    // Key Skills
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Key Skills', 15, 60);
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // Skills would be dynamically generated based on career path
    const keySkills = topCareer.skills.slice(0, 5); // Take first 5 skills
    let keySkillsY = 70;
    keySkills.forEach(skill => {
      doc.text(`• ${skill}`, 15, keySkillsY);
      keySkillsY += 8;
    });
    
    // Career Path Analysis
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text(`Your Career Path Analysis : ${topCareer.clusterName}`, 15, 120);
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('The Career Path Analysis contains four important parameters to have a better insight into the most suitable', 15, 130);
    doc.text('career path. These factors are fees for studying the primary courses needed for this career, demand for the', 15, 138);
    doc.text('skills in this career path, salary offered, level of preparation required on your part to pursue this career.', 15, 146);
    
    // Example analysis points - would be dynamically generated based on career data
    const analysisPoints = [
      { label: 'Fees', value: 'High' },
      { label: 'Demand', value: 'High' },
      { label: 'Salary', value: 'High' },
      { label: 'Level Of Preparation', value: 'High' }
    ];
    
    let analysisY = 160;
    analysisPoints.forEach((point, index) => {
      doc.text(`${index + 1}. ${point.label}`, 15, analysisY);
      doc.text(point.value, 75, analysisY);
      analysisY += 8;
    });
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global Edutech - Contact: info@3iglobaledutech.com', 105, 280, { align: 'center' });
    doc.text(`${userInfo.name} Page 4`, 185, 280, { align: 'right' });
    
    // Add fifth page - Career Navigator
    doc.addPage();
    
    doc.setFontSize(16);
    doc.setTextColor(33, 53, 120);
    doc.text('Milestone Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('Career Navigator', 105, 40, { align: 'center' });
    
    // Career Navigator 1
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Navigator 1', 15, 60);
    
    // This would be customized based on the specific career path
    const navigator1Steps = [
      '12-Science (Biology recommended)',
      'MBBS',
      'MD in select specialization',
      'Ph.D. in select specialization'
    ];
    
    // Draw navigator boxes
    let boxY = 70;
    let arrowY = 88;
    
    navigator1Steps.forEach((step, index) => {
      // Step box
      doc.setDrawColor(33, 53, 120);
      doc.setFillColor(240, 240, 250);
      doc.roundedRect(60, boxY, 120, 20, 3, 3, 'FD');
      
      doc.setFontSize(11);
      doc.setTextColor(33, 53, 120);
      doc.text(step, 120, boxY + 12, { align: 'center' });
      
      // Arrow (except for last item)
      if (index < navigator1Steps.length - 1) {
        doc.setDrawColor(33, 53, 120);
        doc.setFillColor(33, 53, 120);
        // Draw arrow
        doc.line(120, arrowY, 120, arrowY + 15);
        // Draw arrowhead
        doc.triangle(115, arrowY + 10, 120, arrowY + 15, 125, arrowY + 10, 'F');
        
        boxY += 45;
        arrowY += 45;
      }
    });
    
    // Career Navigator 2 (if appropriate)
    if (topCareer.clusterName.includes('Doctor') || topCareer.clusterName.includes('Medical') || topCareer.clusterName.includes('Health')) {
      doc.setFontSize(14);
      doc.setTextColor(33, 53, 120);
      doc.text('Career Navigator 2', 15, 220);
      
      const navigator2Steps = [
        '12-Science (Biology recommended)',
        'MBBS',
        'Master in Surgery (MS)'
      ];
      
      // Draw navigator boxes for second path
      boxY = 230;
      arrowY = 248;
      
      navigator2Steps.forEach((step, index) => {
        // Step box
        doc.setDrawColor(33, 53, 120);
        doc.setFillColor(240, 240, 250);
        doc.roundedRect(60, boxY, 120, 20, 3, 3, 'FD');
        
        doc.setFontSize(11);
        doc.setTextColor(33, 53, 120);
        doc.text(step, 120, boxY + 12, { align: 'center' });
        
        // Arrow (except for last item)
        if (index < navigator2Steps.length - 1) {
          doc.setDrawColor(33, 53, 120);
          doc.setFillColor(33, 53, 120);
          doc.line(120, arrowY, 120, arrowY + 15);
          doc.triangle(115, arrowY + 10, 120, arrowY + 15, 125, arrowY + 10, 'F');
          
          boxY += 45;
          arrowY += 45;
        }
      });
    }
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global', 15, 280);
    doc.text('Email: info@3iglobaledutech.com', 105, 280, { align: 'center' });
    doc.text('Contact: +1234567890', 185, 280, { align: 'right' });
    doc.text(`${userInfo.name} Page 5`, 185, 270, { align: 'right' });
    
    // Add sixth page - Career Analysis
    doc.addPage();
    
    doc.setFontSize(16);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('Career Analysis', 15, 40);
    
    // Positive analysis
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Analysis - Positive (+)', 15, 60);
    
    // These would be dynamically generated based on assessment responses
    const positivePoints = [
      'You are quiet, reserved and like to spend your time alone.',
      'Your primary mode of living is focused internally.',
      'You are passionate but not usually aggressive.',
      'You are a good listener.',
      'You are more of an inside-out person.',
      'You seem to make decisions based on logic rather than the circumstances.',
      'You seem to look for logical explanations or solutions to almost everything.',
      'You are a very task-oriented person.',
      'You are ruled by your head instead of your heart.',
      'You are a critical thinker and oriented toward problem-solving.',
      'Your interest to involve in analytical, intellectual and logical related activities are high.',
      'You enjoy using logic and solving complex problems.',
      'You are interested in occupations that require observation, learning and investigation.',
      'You enjoy hands-on or manual activities.',
      'You like practicals and physical activities.',
      'Your Career motivators are Independence, Continuous Learning, Social Service'
    ];
    
    let positiveY = 70;
    positivePoints.forEach(point => {
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${point}`, 15, positiveY);
      positiveY += 8;
      
      // Check if we need a new page
      if (positiveY > 250 && point !== positivePoints[positivePoints.length - 1]) {
        doc.addPage();
        
        doc.setFontSize(16);
        doc.setTextColor(33, 53, 120);
        doc.text('Career Report', 105, 20, { align: 'center' });
        
        positiveY = 40;
      }
    });
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global Edutech - Contact: info@3iglobaledutech.com', 105, 280, { align: 'center' });
    doc.text(`${userInfo.name} Page 6`, 185, 280, { align: 'right' });
    
    // Add seventh page - GAP Analysis
    doc.addPage();
    
    doc.setFontSize(16);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('GAP Analysis', 15, 40);
    
    // Negative analysis
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('GAP Analysis - Negative (-)', 15, 60);
    
    // These would be dynamically generated based on assessment responses
    const negativePoints = [
      'Your interest to involve in hands-on work or manual activities are lesser than required. This profile requires higher interest in physical activities or practicals.',
      'Your interest to involve in social activities, cooperation and work with people are lesser than required. You need to work on this.'
    ];
    
    let negativeY = 70;
    negativePoints.forEach(point => {
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      const lines = doc.splitTextToSize(point, 180);
      doc.text(`• ${lines[0]}`, 15, negativeY);
      
      // If point has multiple lines
      if (lines.length > 1) {
        for (let i = 1; i < lines.length; i++) {
          negativeY += 8;
          doc.text(`  ${lines[i]}`, 15, negativeY);
        }
      }
      
      negativeY += 15;
    });
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global Edutech - Contact: info@3iglobaledutech.com', 105, 280, { align: 'center' });
    doc.text(`${userInfo.name} Page 7`, 185, 280, { align: 'right' });
    
    // Add eighth page - Skills and Abilities Analysis
    doc.addPage();
    
    doc.setFontSize(16);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('Skills and Abilities Analysis', 15, 40);
    
    // Skills strengths 
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Your skill and abilities strength', 15, 60);
    
    // These would be dynamically generated based on assessment
    const strengthPoints = [
      'Your Numerical Ability are Good',
      'Your Logical Ability are Good',
      'Your Verbal Ability are Good',
      'Your Spatial & Visualization Ability are Good',
      'Your Leadership & Decision making skills are Good',
      'Your Social & Co-operation Skills are Good'
    ];
    
    let strengthY = 70;
    strengthPoints.forEach(point => {
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${point}`, 15, strengthY);
      strengthY += 8;
    });
    
    // Skills to develop
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Your skill and abilities need to be developed', 15, strengthY + 10);
    
    // These would be dynamically generated based on assessment
    const developPoints = [
      'Your Administrative and Organizing Skills need development',
      'Your Mechanical Abilities need development'
    ];
    
    let developY = strengthY + 20;
    developPoints.forEach(point => {
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${point}`, 15, developY);
      developY += 8;
    });
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global Edutech - Contact: info@3iglobaledutech.com', 105, 280, { align: 'center' });
    doc.text(`${userInfo.name} Page 8`, 185, 280, { align: 'right' });
    
    // Add ninth page - Report Activation
    doc.addPage();
    
    doc.setFontSize(16);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Report', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('Report Activation', 15, 40);
    
    // Promo content
    doc.setFontSize(12);
    doc.setTextColor(33, 53, 120);
    doc.text('We have Shortlisted 43 Top Career Paths and 23 Good Career', 15, 60);
    doc.text('Paths for you with Execution plan. Activate your Report NOW.', 15, 70);
    
    // Benefits
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('• 25+ Pages Career Report', 15, 90);
    doc.text('• Detailed Execution Plan', 15, 100);
    doc.text('• Career Analysis across 3000+ Occupations', 15, 110);
    doc.text('• Generate unlimited reports of different Career Paths', 15, 120);
    
    // CTA
    doc.setFontSize(12);
    doc.setTextColor(33, 53, 120);
    doc.text('Do you want to explore other career options and activate 32 pages career', 15, 150);
    doc.text('report? Make a payment and Upgrade to comprehensive report.', 15, 160);
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global Edutech - Contact: info@3iglobaledutech.com', 105, 280, { align: 'center' });
    
    // Page numbers for all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`${userInfo.name} Page ${i}`, 185, 280, { align: 'right' });
    }
    
    return doc;
  } catch (error) {
    console.error('Error generating PDF report:', error);
    // Return a basic PDF with error message
    doc.text('Error generating report. Please try again.', 20, 20);
    return doc;
  }
};
