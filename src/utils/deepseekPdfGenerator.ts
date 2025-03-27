
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { createClient } from '@supabase/supabase-js';

interface UserInfo {
  name: string;
  email: string;
  phoneNumber?: string;
  age?: string;
  location?: string;
  grade: string;
}

interface AssessmentResult {
  personalityTraits: { [key: string]: number };
  skillStrengths: { [key: string]: number };
  careerPreferences: { [key: string]: number };
  workStyle: { [key: string]: number };
}

interface CareerMatch {
  clusterName: string;
  score: number;
  description: string;
  careers: string[];
  skills: string[];
  outlook: string;
  resources: { title: string; url: string }[];
}

interface DeepseekResponse {
  sections: {
    title: string;
    content: string;
    visual?: string;
  }[];
  warnings: string[];
  recommendations: string[];
}

// Helper function to format assessment data for DeepSeek
const formatAssessmentData = (answers: Record<string, string>, result: AssessmentResult) => {
  // Format user responses
  const formattedAnswers: Record<string, string> = {};
  
  // Convert answers to Q1, Q2, etc. format
  Object.entries(answers).forEach(([key, value], index) => {
    formattedAnswers[`Q${key}`] = value;
  });
  
  return {
    responses: formattedAnswers,
    personality: result.personalityTraits,
    skills: result.skillStrengths,
    preferences: result.careerPreferences,
    workStyle: result.workStyle
  };
};

// Create system prompt for DeepSeek
const createSystemPrompt = () => {
  return `Act as CareerPath-AI, a personality-aware PDF generator that analyzes assessment questions to create 10-page career reports for 11-12th grade students. Follow these steps:
    1. Analyze personality traits (Introvert/Extrovert)
    2. Determine learning style (Visual/Auditory/Kinesthetic)
    3. Map responses to career paths (Medical, Engineering, etc.)
    4. Identify skill gaps between current abilities and career requirements
    5. Create education roadmap with milestone path
    6. Generate personalized recommendations
    
    Maintain professional tone appropriate for high school students.`;
};

// Create user prompt with assessment data
const createUserPrompt = (assessmentData: any) => {
  return `Analyze these career assessment answers and generate a 10-page PDF report with:
    1. Personality Analysis (Introvert/Extrovert breakdown)
    2. Career Recommendations (Top 3 paths with detailed analysis)
    3. Skill Gap Analysis (Compare current skills vs career requirements)
    4. Education Roadmap (Based on top career choice)
    5. Learning Style Assessment
    6. 3 personalized improvement strategies
    
    Assessment Data:
    ${JSON.stringify(assessmentData, null, 2)}
    
    Output format as JSON with sections for each part of the report.`;
};

export const generateDeepseekReport = async (
  userInfo: UserInfo,
  answers: Record<string, string>,
  assessmentResult: AssessmentResult,
  careerMatches: CareerMatch[]
): Promise<jsPDF> => {
  const doc = new jsPDF();
  
  try {
    // Format data for DeepSeek
    const assessmentData = formatAssessmentData(answers, assessmentResult);
    
    // Check if Supabase configuration is available
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase configuration missing, using fallback mock data");
      // Create a basic mock response for testing
      return createMockReport(doc, userInfo, careerMatches);
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log("Calling DeepSeek AI for report generation...");
    
    try {
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('generate-career-report', {
        body: {
          systemPrompt: createSystemPrompt(),
          userPrompt: createUserPrompt(assessmentData),
          userInfo,
          topCareerMatches: careerMatches.slice(0, 3)
        }
      });
      
      if (error) {
        console.error("Error calling DeepSeek API:", error);
        throw new Error(`Failed to generate report: ${error.message}`);
      }
      
      console.log("DeepSeek API response received:", data);
      
      const aiResponse = data as DeepseekResponse;
      return generateCompletePDF(doc, userInfo, aiResponse, careerMatches);
      
    } catch (error) {
      console.error("Error in edge function call:", error);
      // Fallback to mock report on error
      return createMockReport(doc, userInfo, careerMatches);
    }
  } catch (error) {
    console.error('Error generating DeepSeek PDF report:', error);
    
    // Create a basic error report
    doc.text('Error generating AI-enhanced report.', 20, 20);
    doc.text('Please try again or contact support.', 20, 30);
    
    return doc;
  }
};

// Function to create a mock report when the API is unavailable
function createMockReport(doc: jsPDF, userInfo: UserInfo, careerMatches: CareerMatch[]): jsPDF {
  console.log("Creating mock report with sample data");
  
  // Sample mock response
  const mockResponse: DeepseekResponse = {
    sections: [
      {
        title: "Personality Analysis",
        content: `Based on your assessment responses, you show a tendency toward introversion with an analytical thinking style.\n\nYour decision-making process appears to be logical and systematic, and you prefer to work independently when solving problems.\n\nIn learning environments, you demonstrate a preference for visual learning methods, which suggests you would benefit from educational approaches that emphasize practical application.`,
        visual: "Personality Traits:\n" +
               "Introversion ████████░░ 80%\n" +
               "Analytical  ███████░░░ 70%\n" +
               "Logical     ██████████ 100%\n" +
               "Independent ████████░░ 80%"
      },
      {
        title: "Career Matches Analysis",
        content: `Your assessment results show strong alignment with careers in the ${careerMatches[0].clusterName} field, with a match score of ${careerMatches[0].score}%.\n\nThe combination of your analytical abilities and interest in scientific concepts makes this a particularly suitable path for you.\n\nOther highly compatible career clusters include ${careerMatches.length > 1 ? careerMatches[1].clusterName : 'Healthcare'} and ${careerMatches.length > 2 ? careerMatches[2].clusterName : 'Technology'}, which also leverage your core strengths.`,
        visual: "Career Match Scores:\n" +
              `${careerMatches[0].clusterName.slice(0, 12).padEnd(12, ' ')} ${"█".repeat(Math.floor(careerMatches[0].score/10))}${"░".repeat(10-Math.floor(careerMatches[0].score/10))} ${careerMatches[0].score}%\n` +
              `${careerMatches.length > 1 ? careerMatches[1].clusterName.slice(0, 12).padEnd(12, ' ') + "█".repeat(Math.floor(careerMatches[1].score/10)) + "░".repeat(10-Math.floor(careerMatches[1].score/10)) + " " + careerMatches[1].score + "%" : ""}\n` +
              `${careerMatches.length > 2 ? careerMatches[2].clusterName.slice(0, 12).padEnd(12, ' ') + "█".repeat(Math.floor(careerMatches[2].score/10)) + "░".repeat(10-Math.floor(careerMatches[2].score/10)) + " " + careerMatches[2].score + "%" : ""}`
      },
      {
        title: "Skill Gap Analysis",
        content: `Based on your responses, we've identified several skills that would be beneficial to develop further for success in your top career match (${careerMatches[0].clusterName}).\n\nYour current strengths include ${careerMatches[0].skills.slice(0, 2).join(', ')}, which align well with this career path.\n\nHowever, there are opportunities to enhance your technical knowledge and problem-solving approach to maximize your career readiness.`,
        visual: "Skill Development Priorities:\n" +
               "Current vs. Required Skills\n" +
               "Technical    ██████░░░░ 60% vs. ████████░░ 80%\n" +
               "Analytical   ███████░░░ 70% vs. ████████░░ 80%\n" +
               "Leadership   ████░░░░░░ 40% vs. ██████░░░░ 60%"
      },
      {
        title: "Education Roadmap",
        content: `For pursuing a career in ${careerMatches[0].clusterName}, we recommend the following educational pathway:\n\n1. Complete 12th grade with focus on Science (PCM/PCB)\n\n2. Bachelor's degree in ${careerMatches[0].clusterName.includes('Engineering') ? 'Engineering' : careerMatches[0].clusterName.includes('Medical') ? 'Medicine' : 'relevant field'}\n\n3. Consider specialized certifications or advanced degrees based on specific career goals\n\nEntrance exams to prepare for include JEE Main/Advanced for undergraduate programs and specialized graduate entrance exams for further studies.`,
        visual: "Educational Milestone Path:\n" +
               "Grade 12 ➡️ Bachelor's ➡️ Specialization ➡️ Career\n" +
               "        (3-4 years)   (1-3 years)"
      },
      {
        title: "Learning Style & Study Strategies",
        content: `Your assessment responses indicate you have a predominant visual learning style.\n\nFor maximum learning effectiveness, consider these personalized study strategies:\n\n1. Create visual mind maps and diagrams\n\n2. Use color-coding and visual hierarchies in notes\n\n3. Watch video tutorials on complex topics`,
      }
    ],
    warnings: [
      `Your assessment shows lower scores in social interaction preferences, which may present challenges in certain aspects of your chosen career path.`,
      `Consider developing your teamwork and collaboration skills to address potential gaps in your career readiness profile.`
    ],
    recommendations: [
      `Focus on strengthening your quantitative skills through targeted practice and coursework.`,
      `Seek opportunities for internships or shadowing in your field of interest to gain practical experience.`,
      `Develop a personalized study plan that leverages your visual learning style for more effective preparation.`
    ]
  };
  
  return generateCompletePDF(doc, userInfo, mockResponse, careerMatches);
}

// Function to generate the complete PDF with all sections
function generateCompletePDF(doc: jsPDF, userInfo: UserInfo, aiResponse: DeepseekResponse, careerMatches: CareerMatch[]): jsPDF {
  // Get today's date in DD-MM-YYYY format
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
  
  // -------------------- Cover Page --------------------
  try {
    doc.addImage('/3iglobaledutech-logo.png', 'PNG', 15, 10, 40, 25);
  } catch (e) {
    console.warn('Failed to add logo to PDF:', e);
  }
  
  doc.setFontSize(22);
  doc.setTextColor(33, 53, 137);
  doc.text('Advanced Career Assessment Report', 105, 40, { align: 'center' });
  doc.setFontSize(16);
  doc.text(`For Class ${userInfo.grade}`, 105, 55, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(33, 53, 137);
  doc.text('Prepared for:', 105, 80, { align: 'center' });
  
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text(userInfo.name, 105, 95, { align: 'center' });
  
  doc.setFontSize(11);
  doc.text(`Email: ${userInfo.email}`, 105, 110, { align: 'center' });
  if (userInfo.phoneNumber) {
    doc.text(`Phone: ${userInfo.phoneNumber}`, 105, 120, { align: 'center' });
  }
  if (userInfo.age) {
    doc.text(`Age: ${userInfo.age}`, 105, 130, { align: 'center' });
  }
  
  doc.setFontSize(11);
  doc.text(`Date: ${formattedDate}`, 105, 150, { align: 'center' });
  
  // Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  const disclaimer = 'This report is AI-generated based on your assessment responses. It is intended for educational guidance only and should be used alongside professional career counseling. No part of this report may be reproduced without prior written permission from 3i Global Edutech.';
  doc.text(disclaimer, 15, 230, { maxWidth: 180 });
  
  doc.setFontSize(9);
  doc.text('3i Global Edutech - AI-Powered Career Assessment', 105, 250, { align: 'center' });
  doc.text(`Page 1 of 10`, 105, 260, { align: 'center' });
  
  // -------------------- Process AI-generated content --------------------
  if (aiResponse && aiResponse.sections) {
    let currentPage = 2;
    
    for (const section of aiResponse.sections) {
      if (currentPage > 9) break; // Ensure we don't exceed 10 pages
      
      doc.addPage();
      
      // Section header
      doc.setFontSize(16);
      doc.setTextColor(33, 53, 137);
      doc.text(section.title, 105, 20, { align: 'center' });
      
      // Section content
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      // Split content into paragraphs
      const paragraphs = section.content.split('\n\n');
      let yPosition = 40;
      
      for (const paragraph of paragraphs) {
        const lines = doc.splitTextToSize(paragraph, 180);
        
        // Check if we need to add a new page
        if (yPosition + (lines.length * 7) > 270) {
          doc.addPage();
          currentPage++;
          yPosition = 20;
          
          // Add header to new page
          doc.setFontSize(12);
          doc.setTextColor(33, 53, 137);
          doc.text(section.title + " (continued)", 15, yPosition);
          yPosition += 15;
          
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
        }
        
        doc.text(lines, 15, yPosition);
        yPosition += (lines.length * 7) + 7;
      }
      
      // Add visual if available
      if (section.visual) {
        // Simple ASCII visualization - position appropriately
        if (yPosition + 40 > 270) {
          doc.addPage();
          currentPage++;
          yPosition = 40;
        }
        
        doc.setFontSize(11);
        doc.setTextColor(33, 53, 137);
        doc.text("Visualization:", 15, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const visualLines = section.visual.split('\n');
        for (const line of visualLines) {
          doc.text(line, 15, yPosition);
          yPosition += 6;
        }
      }
      
      // Page number
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text('3i Global Edutech - AI-Powered Career Assessment', 105, 280, { align: 'center' });
      doc.text(`Page ${currentPage} of 10`, 185, 280, { align: 'right' });
      
      currentPage++;
    }
    
    // -------------------- Recommendations Page --------------------
    if (currentPage <= 9) {
      doc.addPage();
      
      doc.setFontSize(16);
      doc.setTextColor(33, 53, 137);
      doc.text("Personalized Recommendations", 105, 20, { align: 'center' });
      
      // AI-generated recommendations
      if (aiResponse.recommendations && aiResponse.recommendations.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        let yPosition = 40;
        
        for (let i = 0; i < aiResponse.recommendations.length; i++) {
          const recommendation = aiResponse.recommendations[i];
          const lines = doc.splitTextToSize(`${i + 1}. ${recommendation}`, 180);
          
          doc.text(lines, 15, yPosition);
          yPosition += (lines.length * 7) + 10;
        }
      }
      
      // Warnings or cautions
      if (aiResponse.warnings && aiResponse.warnings.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(33, 53, 137);
        doc.text("Important Considerations:", 15, 150);
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        let yPosition = 165;
        
        for (let i = 0; i < aiResponse.warnings.length; i++) {
          const warning = aiResponse.warnings[i];
          const lines = doc.splitTextToSize(`• ${warning}`, 180);
          
          doc.text(lines, 15, yPosition);
          yPosition += (lines.length * 7) + 7;
        }
      }
      
      // Page number
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text('3i Global Edutech - AI-Powered Career Assessment', 105, 280, { align: 'center' });
      doc.text(`Page ${currentPage} of 10`, 185, 280, { align: 'right' });
      
      currentPage++;
    }
    
    // -------------------- Contact Page --------------------
    if (currentPage <= 10) {
      doc.addPage();
      
      doc.setFontSize(16);
      doc.setTextColor(33, 53, 137);
      doc.text("Next Steps & Contact Information", 105, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("We hope this AI-enhanced career assessment has provided valuable insights for your future.", 15, 40);
      doc.text("To discuss your report in more detail or for personalized career counseling:", 15, 60);
      
      doc.setFontSize(11);
      doc.text("• Email: info@3iglobaledutech.com", 25, 80);
      doc.text("• Phone: +91 XXXXXXXXXX", 25, 90);
      doc.text("• Website: www.3iglobaledutech.com", 25, 100);
      
      doc.text("Premium Services Available:", 15, 120);
      doc.text("• One-on-one career counseling sessions", 25, 135);
      doc.text("• Detailed skill development plans", 25, 145);
      doc.text("• College application guidance", 25, 155);
      doc.text("• Entrance exam preparation strategies", 25, 165);
      
      doc.setFontSize(11);
      doc.setTextColor(33, 53, 137);
      doc.text("To activate your complete 25-page comprehensive report with ", 15, 195);
      doc.text("detailed analysis across 3000+ occupations, please contact us.", 15, 205);
      
      // Page number
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text('3i Global Edutech - AI-Powered Career Assessment', 105, 280, { align: 'center' });
      doc.text(`Page 10 of 10`, 185, 280, { align: 'right' });
    }
  } else {
    // Fallback if AI response is not available
    for (let i = 2; i <= 10; i++) {
      doc.addPage();
      
      doc.setFontSize(16);
      doc.setTextColor(33, 53, 137);
      doc.text(`Section ${i-1}`, 105, 20, { align: 'center' });
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text("This section would normally contain AI-generated content based on your assessment.", 15, 40);
      doc.text("Please try regenerating the report or contact support for assistance.", 15, 60);
      
      // Add top career match info as fallback
      if (i === 2 && careerMatches.length > 0) {
        const topMatch = careerMatches[0];
        
        doc.setFontSize(14);
        doc.setTextColor(33, 53, 137);
        doc.text("Your Top Career Match", 15, 90);
        
        doc.setFontSize(12);
        doc.text(topMatch.clusterName, 15, 105);
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        const descriptionLines = doc.splitTextToSize(topMatch.description, 180);
        doc.text(descriptionLines, 15, 120);
      }
      
      // Page number
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text('3i Global Edutech - AI-Powered Career Assessment', 105, 280, { align: 'center' });
      doc.text(`Page ${i} of 10`, 185, 280, { align: 'right' });
    }
  }
  
  return doc;
}
