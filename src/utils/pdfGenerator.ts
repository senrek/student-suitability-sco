
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CareerMatch } from '../hooks/useAssessment';

export const generatePDF = (user: any, results: CareerMatch[]) => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add logo
  try {
    const imgData = '/3iglobaledutech-logo.png';
    doc.addImage(imgData, 'PNG', 15, 10, 40, 25, undefined, 'FAST');
  } catch (e) {
    console.error('Error adding logo to PDF', e);
  }
  
  // Add title
  doc.setFontSize(22);
  doc.setTextColor(33, 53, 137);
  doc.text('Career Assessment Report', 105, 30, { align: 'center' });
  
  // Add student info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Student: ${user.name}`, 15, 50);
  doc.text(`Grade: ${user.grade}`, 15, 58);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 66);
  
  // Add description
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(
    'This personalized career assessment report provides insights into career paths that align with your interests, skills, and preferences based on your responses to our assessment questions.',
    15, 80, { maxWidth: 180 }
  );
  
  // Add top matches heading
  doc.setFontSize(14);
  doc.setTextColor(33, 53, 137);
  doc.text('Top Career Matches', 15, 105);
  
  // Add top matches as a table
  const topMatchesData = results.slice(0, 5).map((match, index) => [
    `${index + 1}`,
    match.clusterName,
    `${match.score}%`,
  ]);
  
  autoTable(doc, {
    startY: 110,
    head: [['Rank', 'Career Cluster', 'Match Score']],
    body: topMatchesData,
    theme: 'grid',
    headStyles: {
      fillColor: [33, 53, 137],
    },
  });
  
  // Add career details for top match
  if (results.length > 0) {
    const topMatch = results[0];
    
    // Add heading for top match details
    const topMatchY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 137);
    doc.text(`About Your Top Match: ${topMatch.clusterName}`, 15, topMatchY);
    
    // Add description
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(topMatch.description, 15, topMatchY + 10, { maxWidth: 180 });
    
    // Add potential careers
    const careersY = topMatchY + 30;
    doc.setFontSize(12);
    doc.setTextColor(33, 53, 137);
    doc.text('Potential Careers in this Field:', 15, careersY);
    
    doc.setTextColor(80, 80, 80);
    let careerText = '';
    topMatch.careers.forEach((career, index) => {
      careerText += `• ${career}\n`;
    });
    doc.text(careerText, 15, careersY + 8, { maxWidth: 180 });
    
    // Add resources
    if (topMatch.resources.length > 0) {
      const resourcesY = careersY + 8 + (topMatch.careers.length * 6);
      doc.setFontSize(12);
      doc.setTextColor(33, 53, 137);
      doc.text('Recommended Resources:', 15, resourcesY);
      
      doc.setTextColor(80, 80, 80);
      let resourceText = '';
      topMatch.resources.forEach((resource, index) => {
        resourceText += `• ${resource.title}\n`;
      });
      doc.text(resourceText, 15, resourcesY + 8, { maxWidth: 180 });
    }
  }
  
  // Add personalized insights
  doc.addPage();
  
  doc.setFontSize(16);
  doc.setTextColor(33, 53, 137);
  doc.text('Personalized Insights', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  
  // This would be based on actual assessment data in a real implementation
  // For now we're using placeholder text based on interests inferred from top matches
  
  doc.setFontSize(14);
  doc.setTextColor(33, 53, 137);
  doc.text('Your Strengths', 15, 35);
  
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  
  let strengthsText = '';
  if (results.some(match => match.clusterName.includes('Science') || match.clusterName.includes('Engineering'))) {
    strengthsText += '• Analytical thinking and problem-solving\n';
    strengthsText += '• Mathematical and logical reasoning\n';
  }
  if (results.some(match => match.clusterName.includes('Art') || match.clusterName.includes('Creative'))) {
    strengthsText += '• Creative expression and design thinking\n';
    strengthsText += '• Visual and spatial awareness\n';
  }
  if (results.some(match => match.clusterName.includes('Business') || match.clusterName.includes('Management'))) {
    strengthsText += '• Organization and planning skills\n';
    strengthsText += '• Leadership potential\n';
  }
  
  // Default strengths if none matched
  if (!strengthsText) {
    strengthsText = '• Good communication skills\n';
    strengthsText += '• Adaptability and flexibility\n';
    strengthsText += '• Strong work ethic\n';
  }
  
  doc.text(strengthsText, 15, 45, { maxWidth: 180 });
  
  // Add career development recommendations
  doc.setFontSize(14);
  doc.setTextColor(33, 53, 137);
  doc.text('Next Steps for Career Development', 15, 85);
  
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  
  let recommendationsText = '';
  recommendationsText += '• Take related elective courses at school to explore your interests further\n';
  recommendationsText += '• Look for volunteer opportunities or internships in your areas of interest\n';
  recommendationsText += '• Connect with professionals in your preferred career fields for mentorship\n';
  recommendationsText += '• Develop key skills through online courses and workshops\n';
  recommendationsText += '• Participate in extracurricular activities related to your potential careers\n';
  
  doc.text(recommendationsText, 15, 95, { maxWidth: 180 });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'Generated by 3i Global Edutech Career Assessment Platform',
      105,
      285,
      { align: 'center' }
    );
    doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
  }
  
  // Save the PDF
  doc.save(`Career_Assessment_Report_${user.name.replace(/\s+/g, '_')}.pdf`);
};
