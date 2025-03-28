
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../context/AuthContext';

interface UserInfo {
  name: string;
  email: string;
  phoneNumber?: string;
  age?: string;
  location?: string;
  grade: string;
}

interface ReportSection {
  title: string;
  content: string;
  visual?: string;
}

interface AIReportData {
  sections: ReportSection[];
  warnings: string[];
  recommendations: string[];
  error?: string;
}

const saveReportToSupabase = async (userId: string, reportData: AIReportData, careerMatches: any[]) => {
  try {
    // Check if userId exists
    if (!userId) {
      console.error('Cannot save report: No user ID provided');
      return false;
    }
    
    const { error } = await supabase
      .from('assessment_reports')
      .insert({
        user_id: userId,
        report_data: reportData,
        career_matches: careerMatches
      });
    
    if (error) {
      console.error('Error saving report to Supabase:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in saveReportToSupabase:', error);
    return false;
  }
};

export const generateGoogleAiReport = async (
  userInfo: UserInfo,
  answers: Record<string, string>,
  assessmentResult: any,
  careerMatches: any[]
): Promise<jsPDF> => {
  const doc = new jsPDF();
  
  try {
    console.log("Generating Google AI report for:", userInfo.name);
    console.log("Contacting Supabase edge function...");
    
    // Call Supabase edge function to generate AI content
    const { data, error } = await supabase.functions.invoke('generate-ai-report', {
      body: {
        userInfo,
        answers,
        assessmentResult,
        careerMatches
      }
    });
    
    if (error) {
      console.error('Error calling AI report generator:', error);
      throw new Error(`Failed to generate AI report: ${error.message}`);
    }
    
    const reportData: AIReportData = data;
    
    // If user is authenticated, save the report to Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.id) {
      console.log('Saving report to Supabase for user:', user.id);
      await saveReportToSupabase(user.id, reportData, careerMatches);
    }
    
    // Get today's date in DD-MM-YYYY format
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
    
    // Cover Page
    try {
      doc.addImage('/3iglobaledutech-logo.png', 'PNG', 15, 10, 40, 25);
    } catch (e) {
      console.warn('Failed to add logo to PDF:', e);
    }
    
    doc.setFontSize(22);
    doc.setTextColor(49, 46, 129); // indigo-900
    doc.text('AI-Enhanced Career Report', 105, 50, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229); // indigo-600
    doc.text('Powered by Google AI Studio', 105, 60, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('Prepared Exclusively For:', 105, 80, { align: 'center' });
    
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(userInfo.name, 105, 90, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Date: ${formattedDate}`, 105, 100, { align: 'center' });
    
    if (userInfo.grade) {
      doc.text(`Grade: ${userInfo.grade}`, 105, 110, { align: 'center' });
    }
    
    if (userInfo.location) {
      doc.text(`Location: ${userInfo.location}`, 105, 120, { align: 'center' });
    }
    
    // Add a decorative element - horizontal line
    doc.setDrawColor(79, 70, 229); // indigo-600
    doc.setLineWidth(1);
    doc.line(30, 140, 180, 140);
    
    // Add report sections
    let currentPage = 1;
    let yPosition = 200;
    
    // Top career matches summary on the first page
    doc.setFontSize(14);
    doc.setTextColor(49, 46, 129); // indigo-900
    doc.text('Top Career Matches', 105, yPosition, { align: 'center' });
    
    yPosition += 10;
    const topMatches = careerMatches.slice(0, 3);
    topMatches.forEach((match, index) => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`${index + 1}. ${match.path} - ${match.matchScore}% Match`, 105, yPosition + (index * 10), { align: 'center' });
    });
    
    // Footer on first page
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global Edutech - Advanced Career Assessment Platform', 105, 280, { align: 'center' });
    doc.text(`Page ${currentPage}`, 190, 280, { align: 'right' });
    
    // Process each section from the AI-generated content
    reportData.sections.forEach((section, index) => {
      // Add a new page for each section
      doc.addPage();
      currentPage++;
      yPosition = 20;
      
      // Section title
      doc.setFontSize(16);
      doc.setTextColor(49, 46, 129); // indigo-900
      doc.text(section.title, 15, yPosition);
      
      yPosition += 10;
      
      // Add decorative element
      doc.setDrawColor(79, 70, 229); // indigo-600
      doc.setLineWidth(0.5);
      doc.line(15, yPosition, 190, yPosition);
      
      yPosition += 15;
      
      // Section content
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      const contentLines = doc.splitTextToSize(section.content, 180);
      doc.text(contentLines, 15, yPosition);
      
      yPosition += (contentLines.length * 5) + 15;
      
      // Visual representation if available
      if (section.visual) {
        doc.setFontSize(11);
        doc.setTextColor(79, 70, 229); // indigo-600
        doc.text('Visual Representation:', 15, yPosition);
        
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const visualLines = section.visual.split('\n');
        visualLines.forEach((line, lineIndex) => {
          doc.text(line, 20, yPosition + (lineIndex * 7));
        });
      }
      
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('3i Global Edutech - Advanced Career Assessment Platform', 105, 280, { align: 'center' });
      doc.text(`Page ${currentPage}`, 190, 280, { align: 'right' });
    });
    
    // Add warnings and recommendations page
    doc.addPage();
    currentPage++;
    yPosition = 20;
    
    // Warnings section
    doc.setFontSize(16);
    doc.setTextColor(49, 46, 129); // indigo-900
    doc.text('Areas of Consideration', 15, yPosition);
    
    yPosition += 10;
    
    // Add decorative element
    doc.setDrawColor(79, 70, 229); // indigo-600
    doc.setLineWidth(0.5);
    doc.line(15, yPosition, 190, yPosition);
    
    yPosition += 15;
    
    // Warnings content
    if (reportData.warnings && reportData.warnings.length > 0) {
      reportData.warnings.forEach((warning, index) => {
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        const warningLines = doc.splitTextToSize(`${index + 1}. ${warning}`, 170);
        doc.text(warningLines, 20, yPosition);
        yPosition += (warningLines.length * 7) + 5;
      });
    }
    
    yPosition += 15;
    
    // Recommendations section
    doc.setFontSize(16);
    doc.setTextColor(49, 46, 129); // indigo-900
    doc.text('Key Recommendations', 15, yPosition);
    
    yPosition += 10;
    
    // Add decorative element
    doc.setDrawColor(79, 70, 229); // indigo-600
    doc.setLineWidth(0.5);
    doc.line(15, yPosition, 190, yPosition);
    
    yPosition += 15;
    
    // Recommendations content
    if (reportData.recommendations && reportData.recommendations.length > 0) {
      reportData.recommendations.forEach((recommendation, index) => {
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        const recLines = doc.splitTextToSize(`${index + 1}. ${recommendation}`, 170);
        doc.text(recLines, 20, yPosition);
        yPosition += (recLines.length * 7) + 5;
      });
    }
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global Edutech - Advanced Career Assessment Platform', 105, 280, { align: 'center' });
    doc.text(`Page ${currentPage}`, 190, 280, { align: 'right' });
    
    // Final page with disclaimer and next steps
    doc.addPage();
    currentPage++;
    
    doc.setFontSize(16);
    doc.setTextColor(49, 46, 129); // indigo-900
    doc.text('Next Steps & Resources', 105, 30, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text([
      '1. Schedule a one-on-one consultation with a career counselor',
      '2. Research educational institutions that offer programs in your top career matches',
      '3. Explore internship and shadowing opportunities in your fields of interest',
      '4. Develop a personalized skill development plan based on identified gaps',
      '5. Join relevant professional or student organizations to build your network'
    ], 30, 50);
    
    // Disclaimer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    const disclaimer = 'DISCLAIMER: This report is based on your assessment responses and AI analysis. It is intended for informational purposes only and should not be considered as definitive career advice. We recommend consulting with career counselors and education professionals for personalized guidance.';
    const disclaimerLines = doc.splitTextToSize(disclaimer, 180);
    doc.text(disclaimerLines, 15, 230);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('3i Global Edutech - Advanced Career Assessment Platform', 105, 280, { align: 'center' });
    doc.text(`Page ${currentPage} of ${currentPage}`, 190, 280, { align: 'right' });
    
    // Add page numbers to all pages
    for (let i = 1; i <= currentPage; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Page ${i} of ${currentPage}`, 190, 280, { align: 'right' });
    }
    
    console.log("Google AI PDF generation complete");
    return doc;
  } catch (error) {
    console.error('Error generating Google AI PDF report:', error);
    
    // Create a simple error report
    doc.setFontSize(16);
    doc.setTextColor(220, 38, 38); // red-600
    doc.text('Error Generating Report', 105, 50, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('There was an error generating your AI-enhanced career report.', 105, 70, { align: 'center' });
    doc.text('Please try again later or contact support.', 105, 80, { align: 'center' });
    
    return doc;
  }
};
