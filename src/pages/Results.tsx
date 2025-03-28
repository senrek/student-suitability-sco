import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../hooks/useAssessment';
import PageTransition from '../components/layout/PageTransition';
import CareerMatchCard from '../components/results/CareerMatch';
import { Button } from '@/components/ui/button';
import { RefreshCw, Share, BookOpen, Download, FileText, CheckCircle } from 'lucide-react';
import { generateAssessmentReport } from '../utils/pdfReportGenerator';
import { generateGoogleAiReport } from '../utils/googleAiPdfGenerator';
import { Card } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

const Results: React.FC = () => {
  const { user } = useAuth();
  const { results, resetAssessment, answers } = useAssessment();
  const [generating, setGenerating] = useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [savedReports, setSavedReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if no results
  if (!results) {
    return <Navigate to="/assessment" replace />;
  }

  // Get top 3 matches for the main display
  const topMatches = results.slice(0, 3);
  const otherMatches = results.slice(3, 8);

  // Fetch saved reports from Supabase when the user loads the page
  useEffect(() => {
    const fetchSavedReports = async () => {
      if (!user?.id) return;
      
      try {
        setLoadingReports(true);
        
        const { data, error } = await supabase
          .from('assessment_reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching saved reports:', error);
          return;
        }
        
        if (data) {
          setSavedReports(data);
        }
      } catch (err) {
        console.error('Error in fetchSavedReports:', err);
      } finally {
        setLoadingReports(false);
      }
    };
    
    fetchSavedReports();
  }, [user?.id]);

  const handleShareResults = () => {
    // In a real app, this would open a share dialog
    toast.info('Sharing functionality would be implemented here.');
  };

  const handleDownloadResults = async () => {
    try {
      setGenerating(true);
      
      if (user && results) {
        const userInfo = {
          name: user.name || 'Student',
          email: user.email || 'student@example.com',
          phoneNumber: user.phoneNumber || '',
          age: user.age || '',
          location: user.location || '',
          grade: user.grade || 'High School'
        };
        
        const answeredQuestions = Object.keys(answers).length;
        const totalQuestions = 100; // This is an example, adapt to your actual total
        
        const doc = generateAssessmentReport(userInfo, results, answeredQuestions, totalQuestions);
        doc.save(`Career_Assessment_Report_${user.name.replace(/\s+/g, '_')}.pdf`);
        
        toast.success('Basic report downloaded successfully');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('There was an error generating your report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadAIResults = async () => {
    try {
      setGenerating(true);
      setShowPremiumDialog(false);
      
      if (user && results) {
        const userInfo = {
          name: user.name || 'Student',
          email: user.email || 'student@example.com',
          phoneNumber: user.phoneNumber || '',
          age: user.age || '',
          location: user.location || '',
          grade: user.grade || '11-12'
        };
        
        // Convert Record<number, number> to Record<string, string>
        const formattedAnswers: Record<string, string> = {};
        Object.entries(answers).forEach(([key, value]) => {
          formattedAnswers[key] = value.toString();
        });
        
        // Define the assessment result structure
        const assessmentResult = {
          personalityTraits: {
            analytical: 80,
            creative: 65,
            logical: 75,
            social: 60
          },
          skillStrengths: {
            problemSolving: 85,
            communication: 70,
            technical: 80,
            leadership: 65
          },
          careerPreferences: {
            teamwork: 70,
            independence: 80,
            structure: 75,
            flexibility: 65
          },
          workStyle: {
            detail: 85,
            bigPicture: 70,
            deadline: 75,
            planning: 80
          }
        };
        
        // Add the required outlook property to each career match
        const enhancedResults = results.map(result => ({
          ...result,
          outlook: "Positive" // Default value
        }));
        
        // Call the Google AI-enhanced PDF generator
        console.log("Generating Google AI report with:", {
          userInfo,
          formattedAnswers: Object.keys(formattedAnswers).length + " answers",
          enhancedResults: enhancedResults.length + " career matches"
        });
        
        try {
          const doc = await generateGoogleAiReport(userInfo, formattedAnswers, assessmentResult, enhancedResults);
          doc.save(`AI_Enhanced_Career_Report_${user.name.replace(/\s+/g, '_')}.pdf`);
          console.log("Google AI report generated successfully");
          toast.success('AI-enhanced report downloaded successfully');
        } catch (err) {
          console.error("Failed to generate Google AI report:", err);
          toast.error("There was an error generating your AI-enhanced report. Please try again.");
        }
      }
    } catch (error) {
      console.error('Error generating AI PDF:', error);
      toast.error('There was an error generating your AI-enhanced report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const viewSavedReport = (reportId: string) => {
    const report = savedReports.find(r => r.id === reportId);
    if (report) {
      // In a real implementation, you would open the report or redirect to a report view page
      toast.info('Viewing saved report functionality would be implemented here.');
    }
  };

  const PremiumDialog = () => {
    return isMobile ? (
      <Drawer open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DrawerContent>
          <DrawerHeader className="text-center">
            <DrawerTitle>Premium AI-Enhanced Report</DrawerTitle>
            <DrawerDescription>
              Upgrade to our advanced Google AI-powered career report
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2">
            <div className="space-y-4 mt-2 mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm">10-page comprehensive analysis based on your assessment</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm">AI-powered insights using advanced Google AI technology</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm">Personalized recommendations and skill gap analysis</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm">Customized education roadmap for your career goals</p>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button 
              onClick={handleDownloadAIResults} 
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={generating}
            >
              {generating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating Premium Report...
                </>
              ) : (
                "Generate Premium Report"
              )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ) : (
      <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Premium AI-Enhanced Report</DialogTitle>
            <DialogDescription>
              Upgrade to our advanced Google AI-powered career report
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2 mb-6">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm">10-page comprehensive analysis based on your assessment</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm">AI-powered insights using advanced Google AI technology</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm">Personalized recommendations and skill gap analysis</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <p className="text-sm">Customized education roadmap for your career goals</p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleDownloadAIResults} 
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={generating}
            >
              {generating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Premium Report"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <PageTransition>
      <div className="page-container max-w-6xl pb-20">
        <div className="flex justify-center mb-6">
          <img 
            src="/3iglobaledutech-logo.png" 
            alt="3i Global Edutech" 
            className="h-16"
          />
        </div>

        {/* Thank You Card */}
        <Card className="mb-8 p-6 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-6">
            You have successfully completed the Career Assessment Test.
            Your personalized career assessment report is ready for download.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button
              onClick={handleDownloadResults}
              disabled={generating}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {generating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Basic Report
                </>
              )}
            </Button>
            <Button
              onClick={() => setShowPremiumDialog(true)}
              size="lg"
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              <FileText className="mr-2 h-4 w-4" />
              Get AI-Enhanced Report
            </Button>
          </div>
        </Card>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Your Career Matches</h1>
              <p className="text-muted-foreground mt-2">
                Based on your responses, these career paths align with your interests and strengths
              </p>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-2">
              <Button variant="outline" size="sm" onClick={handleShareResults} className="flex items-center">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              Top Career Matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topMatches.map((match, index) => (
                <CareerMatchCard 
                  key={index} 
                  careerMatch={match} 
                  index={index} 
                />
              ))}
            </div>
          </div>

          {otherMatches.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Other Compatible Careers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherMatches.map((match, index) => (
                  <CareerMatchCard 
                    key={index} 
                    careerMatch={match} 
                    index={index + 3} 
                  />
                ))}
              </div>
            </div>
          )}

          {savedReports.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Previous Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedReports.map((report) => (
                  <Card key={report.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{new Date(report.created_at).toLocaleDateString()}</h3>
                        <p className="text-sm text-muted-foreground">
                          {report.career_matches?.length || 0} career matches
                        </p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => viewSavedReport(report.id)}>
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center pt-4 border-t border-border/40">
            <p className="text-muted-foreground mb-4">
              Want to explore other possibilities? You can retake the assessment anytime.
            </p>
            <Button onClick={resetAssessment} variant="outline" className="flex items-center mx-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake Assessment
            </Button>
          </div>
        </div>

        {/* Premium Dialog */}
        <PremiumDialog />
      </div>
    </PageTransition>
  );
};

export default Results;
