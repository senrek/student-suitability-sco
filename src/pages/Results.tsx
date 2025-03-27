import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../hooks/useAssessment';
import { useEnhancedAssessment } from '../hooks/useEnhancedAssessment';
import PageTransition from '../components/layout/PageTransition';
import CareerMatchCard from '../components/results/CareerMatch';
import { Button } from '@/components/ui/button';
import { RefreshCw, Share, BookOpen, Download, FileText, CheckCircle } from 'lucide-react';
import { generateEnhancedReport } from '../utils/enhancedPdfGenerator';
import { Card } from '@/components/ui/card';

const Results: React.FC = () => {
  const { user } = useAuth();
  const { results, resetAssessment, answers, enhancedResult } = useAssessment();
  const [generating, setGenerating] = useState(false);

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

  const getCareerMatches = () => {
    // Transform the results into the required CareerPathAnalysis format
    return results.map(match => ({
      path: match.clusterName,
      matchScore: match.score,
      requirements: ['Bachelor\'s degree recommended', 'Industry certifications beneficial'],
      skills: ['Technical skills', 'Problem-solving', 'Communication'],
      outlook: 'Positive growth expected',
      salary: '$50,000 - $120,000'
    }));
  };

  const handleShareResults = () => {
    // In a real app, this would open a share dialog
    alert('Sharing functionality would be implemented here.');
  };

  const handleDownloadResults = async () => {
    try {
      setGenerating(true);
      
      // Get career matches from enhanced assessment
      const careerMatches = getCareerMatches();
      
      // Generate and download the enhanced PDF report
      await generateEnhancedReport(
        user,
        Object.entries(answers).map(([id, answer]) => ({
          questionId: id,
          question: "Question text",
          answer: answer.toString(),
          category: "assessment"
        })),
        enhancedResult || {
          personalityTraits: {},
          skillStrengths: {},
          careerPreferences: {},
          workStyle: {}
        },
        careerMatches
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating your report. Please try again.');
    } finally {
      setGenerating(false);
    }
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
          <div className="flex justify-center gap-4">
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
                  Download Your Report
                </>
              )}
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
                  key={match.clusterId} 
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
                    key={match.clusterId} 
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
      </div>
    </PageTransition>
  );
};

export default Results;
