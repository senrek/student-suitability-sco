import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';
import DashboardCard from '../components/dashboard/DashboardCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lightbulb, BarChart3, ArrowRight, GraduationCap } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Mock data for dashboard
  const assessmentProgress: number = 0; // Explicitly typed as number
  const hasResults = false; // No results yet

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <PageTransition>
      <div className="page-container">
        <div className="flex justify-center mb-6">
          <img 
            src="/3iglobaledutech-logo.png" 
            alt="3i Global Edutech" 
            className="h-32 w-auto"
          />
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {getGreeting()}, <span className="text-primary">{user.name}</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your career exploration dashboard
          </p>
        </div>

        {assessmentProgress === 0 && !hasResults ? (
          <div className="mb-8 p-6 rounded-lg border bg-card shadow-sm animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-1 mb-4 md:mb-0">
                <h2 className="text-xl font-semibold mb-2">SET YOUR MILESTONE</h2>
                <p className="text-muted-foreground">
                  Discover which careers align with your interests, skills, and personality by taking our adaptive assessment.
                </p>
              </div>
              <div className="flex justify-start md:justify-end">
                <Button asChild>
                  <Link to="/assessment" className="flex items-center">
                    Begin Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <DashboardCard
              title="Assessment Progress"
              description="Continue your career assessment"
              contentClassName="flex justify-center py-6"
            >
              <div className="text-center">
                <ProgressChart 
                  progress={assessmentProgress} 
                  label="Questions Completed" 
                />
                <Button className="mt-6" asChild>
                  <Link to="/assessment">
                    {assessmentProgress === 100 ? "View Results" : "Continue Assessment"}
                  </Link>
                </Button>
              </div>
            </DashboardCard>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="How It Works"
            contentClassName="space-y-4 p-1"
          >
            <div className="flex p-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium">Complete Assessment</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Answer questions about your interests, skills, and preferences
                </p>
              </div>
            </div>
            
            <div className="flex p-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Lightbulb className="h-4 w-4" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium">Receive Insights</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Get personalized career recommendations based on your responses
                </p>
              </div>
            </div>
            
            <div className="flex p-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <BarChart3 className="h-4 w-4" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium">Explore Careers</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Discover pathways, skills needed, and resources for each career
                </p>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Grade Level Guidance"
            contentClassName="p-1"
          >
            <div className="space-y-3 py-2">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">Grade {user.grade}</h3>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {user.grade === '8' 
                  ? "Focus on exploring a wide range of careers and subjects to discover your interests." 
                  : user.grade === '9' 
                  ? "Start narrowing down your interests and identify which school subjects align with them." 
                  : "Begin connecting your strengths with specific career pathways and research requirements."}
              </p>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/assessment?type=grade_11_12" className="text-xs">
                    Career Analysis for 11th & 12th Class
                  </Link>
                </Button>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Career Exploration"
            contentClassName="p-1"
          >
            <div className="space-y-3 py-2">
              <p className="text-sm text-muted-foreground">
                Explore different career clusters to learn about various professions before taking your assessment.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">Science & Research</Button>
                <Button variant="outline" size="sm" className="text-xs">Technology</Button>
                <Button variant="outline" size="sm" className="text-xs">Healthcare</Button>
                <Button variant="outline" size="sm" className="text-xs">Engineering</Button>
                <Button variant="outline" size="sm" className="text-xs">Creative Arts</Button>
                <Button variant="outline" size="sm" className="text-xs">Business</Button>
              </div>
              
              <div className="pt-1">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View all clusters
                </Button>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
