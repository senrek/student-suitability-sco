import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';
import PageTransition from '../components/layout/PageTransition';

const Register: React.FC = () => {
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-background to-muted/30">
        <div className="w-full max-w-md mb-6 text-center">
          <img 
            src="/3iglobaledutech-logo.png" 
            alt="3i Global Edutech" 
            className="h-32 w-auto mx-auto mb-6"
          />
          <p className="text-muted-foreground mt-2">Discover your ideal career path</p>
        </div>
        
        <AuthForm type="register" />
      </div>
    </PageTransition>
  );
};

export default Register;
