
import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAssessment, CareerMatch } from '../hooks/useAssessment';
import { generateAssessmentReport } from '../utils/pdfReportGenerator';
import { generateGoogleAiReport } from '../utils/googleAiPdfGenerator';
import { supabase } from '@/integrations/supabase/client';
import PageTransition from '../components/layout/PageTransition';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { DownloadIcon, ArrowRightIcon, Brain, FileText } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

type Report = {
  id: string;
  created_at: string;
  report_data: any;
  career_matches: CareerMatch[];
};

const Results: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [previousReports, setPreviousReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load previous reports
  useEffect(() => {
    const fetchPreviousReports = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('assessment_reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching reports:', error);
          toast({
            variant: "destructive",
            title: "Error fetching reports",
            description: error.message,
          });
          return;
        }
        
        if (data) {
          setPreviousReports(data);
        }
      } catch (err) {
        console.error('Error in fetchPreviousReports:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPreviousReports();
  }, [user]);
  
  const { result } = useAssessment();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!result) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">No Assessment Results</h1>
            <p className="mb-8 text-muted-foreground">
              You haven't completed an assessment yet. Take an assessment to see your results.
            </p>
            <Link to="/assessment">
              <Button>
                Take Assessment
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  const careerMatches = result ? result.personalityTraits : [];
  
  const generateBasicReport = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You must be logged in to generate a report.",
      });
      return;
    }
    
    try {
      setIsGenerating(true);
      
      const userInfo = {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        age: user.age,
        location: user.location,
        grade: user.grade || '11-12',
      };
      
      const doc = generateAssessmentReport(userInfo, [], 0, 0);
      doc.save(`${user.name.replace(/\s+/g, '_')}_Career_Report.pdf`);
      
      toast({
        title: "Report Generated",
        description: "Your career assessment report has been generated successfully.",
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        variant: "destructive",
        title: "Report Generation Failed",
        description: "There was an error generating your report. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generateAIReport = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You must be logged in to generate an AI report.",
      });
      return;
    }
    
    try {
      setIsGeneratingAI(true);
      
      const userInfo = {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        age: user.age,
        location: user.location,
        grade: user.grade || '11-12',
      };
      
      // Simplified answer format for demo
      const answers = {
        'q1': 'I enjoy solving complex problems',
        'q2': 'I prefer working with data and numbers',
        'q3': 'I am interested in technology',
      };
      
      const doc = await generateGoogleAiReport(userInfo, answers, result, []);
      doc.save(`${user.name.replace(/\s+/g, '_')}_AI_Career_Report.pdf`);
      
      toast({
        title: "AI Report Generated",
        description: "Your AI-enhanced career report has been generated successfully.",
      });
      
      // Refresh reports list
      const { data, error } = await supabase
        .from('assessment_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (data && !error) {
        setPreviousReports(data);
      }
    } catch (error) {
      console.error('Error generating AI report:', error);
      toast({
        variant: "destructive",
        title: "AI Report Generation Failed",
        description: "There was an error generating your AI report. Please try again.",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };
  
  const downloadPreviousReport = async (report: Report) => {
    try {
      const userInfo = {
        name: user?.name || 'User',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber,
        age: user?.age,
        location: user?.location,
        grade: user?.grade || '11-12',
      };
      
      // Use the saved report data
      const answers = {};
      const doc = await generateGoogleAiReport(
        userInfo, 
        answers, 
        {}, 
        report.career_matches || []
      );
      
      doc.save(`${userInfo.name.replace(/\s+/g, '_')}_AI_Career_Report_${new Date(report.created_at).toLocaleDateString()}.pdf`);
      
      toast({
        title: "Report Downloaded",
        description: "Your saved report has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error downloading previous report:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was an error downloading your report. Please try again.",
      });
    }
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Assessment Results</h1>
          <p className="text-muted-foreground">
            View your assessment results and generate detailed reports.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Basic Report</CardTitle>
              <CardDescription>
                Generate a standard PDF report with your assessment results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This report includes your assessment results, career matches, and basic recommendations.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={generateBasicReport} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Basic Report
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI-Enhanced Report</CardTitle>
              <CardDescription>
                Generate a comprehensive report powered by Google AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This premium report uses AI to provide personalized insights, detailed career path analysis, and tailored recommendations.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={generateAIReport} 
                disabled={isGeneratingAI}
                className="w-full"
                variant="default"
              >
                {isGeneratingAI ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Generating AI Report...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate AI Report
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Previous Reports Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Previous Reports</h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-2 text-muted-foreground">Loading your reports...</p>
            </div>
          ) : previousReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {previousReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle>Assessment Report</CardTitle>
                    <CardDescription>
                      Generated on {new Date(report.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {report.report_data?.sections?.[0]?.title || 'AI-Generated Report'}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => downloadPreviousReport(report)}
                    >
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                You haven't generated any reports yet. Generate a report to see it here.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Results;
