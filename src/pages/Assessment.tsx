import React, { useState, useEffect } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../hooks/useAssessment';
import PageTransition from '../components/layout/PageTransition';
import QuestionCard from '../components/assessment/QuestionCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, FileText, GraduationCap, Briefcase, School, RefreshCw } from 'lucide-react';
import { generateAssessmentReport } from '../utils/pdfReportGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';

const Assessment: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const assessmentTypeParam = queryParams.get('type');
  
  const { 
    currentQuestion, 
    currentIndex, 
    totalQuestions, 
    answers, 
    completed, 
    results,
    answerQuestion, 
    goToNext,
    goToPrevious, 
    skipQuestion,
    autoAnswer,
    resetAssessment,
    progress,
    assessmentType,
    setAssessmentType,
    loadHighSchoolQuestions
  } = useAssessment();
  
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [showMilestoneSelection, setShowMilestoneSelection] = useState(true);
  const [userName, setUserName] = useState("");
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<string>(assessmentTypeParam || "grade_8_10");
  
  useEffect(() => {
    if (assessmentTypeParam) {
      setSelectedAssessmentType(assessmentTypeParam);
      if (assessmentTypeParam === 'grade_11_12') {
        handleStartAssessment('grade_11_12');
      } else if (assessmentTypeParam === 'grade_8_10') {
        handleStartAssessment('grade_8_10');
      }
    }
  }, [assessmentTypeParam]);

  // Add effect to set user name from profile
  useEffect(() => {
    if (user?.name) {
      setUserName(user.name);
    }
  }, [user]);

  const handleGenerateReport = () => {
    if (!user || !results) return;
    
    setGeneratingPDF(true);
    
    try {
      const userInfo = {
        name: user.name || 'Student',
        email: user.email || 'student@example.com',
        grade: selectedAssessmentType === 'grade_11_12' ? '11-12' : '8-10'
      };
      
      const answeredQuestions = Object.keys(answers).length;
      const doc = generateAssessmentReport(userInfo, results, answeredQuestions, totalQuestions);
      
      // Save the PDF with a meaningful filename
      const fileName = `Career_Assessment_Report_${user.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Error generating PDF report:', error);
      alert('There was an error generating your PDF report. Please try again.');
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handleStartAssessment = async (type: string) => {
    if (type === 'grade_11_12') {
      loadHighSchoolQuestions();
      setAssessmentType('high-school');
    } else if (type === 'grade_8_10') {
      setAssessmentType('career');
      resetAssessment();
    }
    
    setShowMilestoneSelection(false);
    
    // Create assessment session in Supabase
    if (user) {
      try {
        const { error } = await supabase
          .from('assessment_sessions')
          .insert({
            user_id: user.id,
            assessment_type: type,
            current_question: 0,
            completed: false
          });
          
        if (error) {
          console.error('Error creating assessment session:', error);
        }
      } catch (err) {
        console.error('Error saving session to Supabase:', err);
      }
    }
  };

  // Creating content conditionally without early returns
  let content;
  
  if (!user) {
    content = <Navigate to="/login" replace />;
  } else if (completed && results) {
    content = (
      <PageTransition>
        <div className="page-container max-w-5xl pb-20">
          <div className="flex flex-col items-center mb-8 text-center">
            <img 
              src="/3iglobaledutech-logo.png" 
              alt="3i Global Edutech" 
              className="h-24 w-auto mb-2"
            />
            <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
            <p className="text-xl text-muted-foreground mb-6">
              You have successfully completed the Career Assessment Test.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Your personalized career assessment report is ready for download.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleGenerateReport}
                disabled={generatingPDF}
                className="flex items-center bg-primary hover:bg-primary/90"
              >
                <FileText className="mr-2 h-4 w-4" />
                {generatingPDF ? 'Generating...' : 'Download Your Report'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowMilestoneSelection(true)}
                className="flex items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Take Another Assessment
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  } else {
    content = (
      <PageTransition>
        <div className="page-container max-w-5xl pb-20">
          <div className="flex flex-col items-center mb-8 text-center">
            <img 
              src="/3iglobaledutech-logo.png" 
              alt="3i Global Edutech" 
              className="h-24 w-auto mb-2"
            />
            <p className="text-muted-foreground mt-2">
              Discover careers that match your interests and strengths
            </p>
          </div>

          {showMilestoneSelection ? (
            <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary/20">
              <CardHeader className="bg-primary/5 border-b border-primary/20">
                <CardTitle className="text-center text-2xl font-bold text-primary">
                  SET YOUR MILESTONE
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  SELECT YOUR CURRENT STAGE
                </p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)}
                      className="mt-1"
                      disabled={!!user?.name}
                      title={user?.name ? "Name is automatically filled from your profile" : ""}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Label className="mb-3 block">I need Guidance for (Select Any One):</Label>
                    <RadioGroup 
                      value={selectedAssessmentType} 
                      onValueChange={setSelectedAssessmentType}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 bg-background p-3 rounded-md border">
                        <RadioGroupItem value="grade_8_10" id="grade_8_10" />
                        <Label htmlFor="grade_8_10" className="font-medium cursor-pointer">
                          Career Analysis for 8th, 9th & 10th Class
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-background p-3 rounded-md border">
                        <RadioGroupItem value="grade_11_12" id="grade_11_12" />
                        <Label htmlFor="grade_11_12" className="font-medium cursor-pointer">
                          Career Analysis for 11th & 12th Class
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-background p-3 rounded-md border">
                        <RadioGroupItem value="graduate" id="graduate" />
                        <Label htmlFor="graduate" className="font-medium cursor-pointer">
                          Career Analysis for Graduates
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-background p-3 rounded-md border">
                        <RadioGroupItem value="professional" id="professional" />
                        <Label htmlFor="professional" className="font-medium cursor-pointer">
                          Career Analysis for Professionals
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Button variant="outline" asChild>
                  <Link to="/dashboard">Go Back</Link>
                </Button>
                <Button 
                  onClick={() => handleStartAssessment(selectedAssessmentType)}
                  disabled={!selectedAssessmentType || userName.trim() === ""}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-2 font-semibold"
                >
                  START ASSESSMENT
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="w-full">
              {selectedAssessmentType === 'grade_8_10' && (
                <div className="w-full">
                  {totalQuestions === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-primary border-background rounded-full animate-spin" />
                      <p className="text-muted-foreground">Loading assessment questions...</p>
                    </div>
                  ) : currentQuestion && assessmentType === 'career' ? (
                    <QuestionCard
                      question={currentQuestion}
                      currentIndex={currentIndex}
                      totalQuestions={totalQuestions}
                      selectedAnswer={answers[currentIndex]}
                      onAnswer={answerQuestion}
                      onNext={goToNext}
                      onPrevious={goToPrevious}
                      onSkip={skipQuestion}
                      onAuto={autoAnswer}
                      progress={progress}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <School className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-semibold mb-2">Grade 8-10 Career Assessment</h2>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        This assessment will help identify career paths that match your interests, skills, and preferences for students in grades 8-10.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          onClick={() => handleStartAssessment('grade_8_10')} 
                          className="flex items-center"
                        >
                          Start Grade 8-10 Assessment
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        
                        {completed && results && (
                          <Button 
                            variant="outline" 
                            onClick={handleGenerateReport}
                            disabled={generatingPDF}
                            className="flex items-center"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {generatingPDF ? 'Generating...' : 'Generate PDF Report'}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedAssessmentType === 'grade_11_12' && (
                <div className="w-full">
                  {currentQuestion && assessmentType === 'high-school' ? (
                    <QuestionCard
                      question={currentQuestion}
                      currentIndex={currentIndex}
                      totalQuestions={totalQuestions}
                      selectedAnswer={answers[currentIndex]}
                      onAnswer={answerQuestion}
                      onNext={goToNext}
                      onPrevious={goToPrevious}
                      onSkip={skipQuestion}
                      onAuto={autoAnswer}
                      progress={progress}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-semibold mb-2">Grade 11-12 Career Assessment</h2>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        This comprehensive assessment is designed specifically for higher secondary students to help them identify suitable career paths based on their interests, skills, and personality traits.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          onClick={() => handleStartAssessment('grade_11_12')} 
                          className="flex items-center"
                        >
                          Start Grade 11-12 Assessment
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        
                        {completed && results && (
                          <Button 
                            variant="outline" 
                            onClick={handleGenerateReport}
                            disabled={generatingPDF}
                            className="flex items-center"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {generatingPDF ? 'Generating...' : 'Generate PDF Report'}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </PageTransition>
    );
  }

  return content;
};

export default Assessment;
