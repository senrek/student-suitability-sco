
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../hooks/useAssessment';
import PageTransition from '../components/layout/PageTransition';
import CareerMatchCard from '../components/results/CareerMatch';
import { Button } from '@/components/ui/button';
import { RefreshCw, Share, BookOpen, Download, FileText, CheckCircle } from 'lucide-react';
import { generateAssessmentReport } from '../utils/pdfReportGenerator';
import { generateDeepseekReport } from '../utils/deepseekPdfGenerator';
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

const Results: React.FC = () => {
  const { user } = useAuth();
  const { results, resetAssessment, answers } = useAssessment();
  const [generating, setGenerating] = useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
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

  const handleShareResults = () => {
    // In a real app, this would open a share dialog
    alert('Sharing functionality would be implemented here.');
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
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating your report. Please try again.');
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
        
        // Call the DeepSeek AI-enhanced PDF generator
        const doc = await generateDeepseekReport(userInfo, answers, {
          personalityTraits: {},
          skillStrengths: {},
          careerPreferences: {},
          workStyle: {}
        }, results);
        
        doc.save(`Advanced_Career_Report_${user.name.replace(/\s+/g, '_')}.pdf`);
      }
    } catch (error) {
      console.error('Error generating AI PDF:', error);
      alert('There was an error generating your AI-enhanced report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const PremiumDialog = () => {
    const DialogComponent = isMobile ? Drawer : Dialog;
    const DialogTriggerComponent = isMobile ? DrawerTrigger : DialogTrigger;
    
    return (
      <DialogComponent open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        {isMobile ? (
          <DrawerContent>
            <DrawerHeader className="text-center">
              <DrawerTitle>Premium AI-Enhanced Report</DrawerTitle>
              <DrawerDescription>
                Upgrade to our advanced AI-enhanced career report
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
                  <p className="text-sm">AI-powered insights using advanced DeepSeek AI technology</p>
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
        ) : (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Premium AI-Enhanced Report</DialogTitle>
              <DialogDescription>
                Upgrade to our advanced AI-enhanced career report
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2 mb-6">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm">10-page comprehensive analysis based on your assessment</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm">AI-powered insights using advanced DeepSeek AI technology</p>
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
        )}
      </DialogComponent>
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
