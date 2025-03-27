
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CareerMatch } from '../hooks/useAssessment';

interface UserInfo {
  name: string;
  email: string;
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
    // Add logo
    try {
      doc.addImage('/3iglobaledutech-logo.png', 'PNG', 15, 10, 40, 25);
    } catch (e) {
      console.warn('Failed to add logo to PDF:', e);
    }
    
    // Add title
    doc.setFontSize(22);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Assessment Report', 105, 30, { align: 'center' });
    
    // Add user info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${userInfo.name}`, 15, 50);
    doc.text(`Email: ${userInfo.email}`, 15, 58);
    doc.text(`Grade: ${userInfo.grade}`, 15, 66);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 74);
    
    // Add completion info
    doc.setFontSize(11);
    doc.text(`Assessment Progress: ${answeredQuestions} of ${totalQuestions} questions answered`, 15, 85);
    const completionRate = Math.round((answeredQuestions / totalQuestions) * 100);
    doc.text(`Completion Rate: ${completionRate}%`, 15, 93);
    
    // Add results summary
    doc.setFontSize(14);
    doc.setTextColor(33, 53, 120);
    doc.text('Career Matches', 15, 110);
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // Add top 3 career matches
    const topMatches = results.slice(0, 3);
    
    // Career matches table
    const matchesData = topMatches.map((match, index) => [
      `${index + 1}`,
      match.clusterName,
      `${match.score}%`
    ]);
    
    autoTable(doc, {
      startY: 120,
      head: [['Rank', 'Career Cluster', 'Match Score']],
      body: matchesData,
      theme: 'grid',
      headStyles: { fillColor: [33, 53, 120] },
    });
    
    // Add detailed analysis for top career
    if (topMatches.length > 0) {
      const topCareer = topMatches[0];
      
      doc.setFontSize(14);
      doc.setTextColor(33, 53, 120);
      doc.text('Top Career Match Analysis', 15, doc.autoTable.previous.finalY + 20);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Career Field: ${topCareer.clusterName}`, 15, doc.autoTable.previous.finalY + 30);
      
      doc.setFontSize(11);
      doc.text('Description:', 15, doc.autoTable.previous.finalY + 40);
      
      const descriptionLines = doc.splitTextToSize(topCareer.description, 180);
      doc.text(descriptionLines, 15, doc.autoTable.previous.finalY + 48);
      
      // Career paths table
      if (topCareer.careers && topCareer.careers.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(33, 53, 120);
        doc.text('Potential Career Paths', 15, doc.autoTable.previous.finalY + 70);
        
        const careersData = topCareer.careers.map(career => [career]);
        
        autoTable(doc, {
          startY: doc.autoTable.previous.finalY + 80,
          head: [['Career Options']],
          body: careersData,
          theme: 'grid',
          headStyles: { fillColor: [33, 53, 120] },
        });
      }
      
      // Education and resources
      if (topCareer.education && topCareer.education.length > 0) {
        doc.addPage();
        
        doc.setFontSize(14);
        doc.setTextColor(33, 53, 120);
        doc.text('Education Pathways', 15, 30);
        
        const educationData = topCareer.education.map(edu => [edu]);
        
        autoTable(doc, {
          startY: 40,
          head: [['Recommended Education']],
          body: educationData,
          theme: 'grid',
          headStyles: { fillColor: [33, 53, 120] },
        });
      }
      
      // Resources
      if (topCareer.resources && topCareer.resources.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(33, 53, 120);
        doc.text('Additional Resources', 15, doc.autoTable.previous.finalY + 20);
        
        const resourcesData = topCareer.resources.map(resource => [
          resource.title,
          resource.url
        ]);
        
        autoTable(doc, {
          startY: doc.autoTable.previous.finalY + 30,
          head: [['Resource', 'URL']],
          body: resourcesData,
          theme: 'grid',
          headStyles: { fillColor: [33, 53, 120] },
        });
      }
    }
    
    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('3i Global Edutech - Career Assessment Report', 105, 285, { align: 'center' });
      doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
    }
    
    return doc;
  } catch (error) {
    console.error('Error generating PDF report:', error);
    // Return a basic PDF with error message
    doc.text('Error generating report. Please try again.', 20, 20);
    return doc;
  }
};
