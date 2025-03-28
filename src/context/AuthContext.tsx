
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Define User type
export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  phoneNumber?: string;
  age?: string;
  location?: string;
  grade?: string;
  school?: string;
  interests?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Create Context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  loading: false,
  error: null
});

// Auth Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is logged in on initial load and set up auth state listener
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      
      // Check for existing session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        setLoading(false);
        return;
      }
      
      if (session?.user) {
        const userData = await getUserProfile(session.user.id);
        setUser(userData);
      }
      
      setLoading(false);
    };
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const userData = await getUserProfile(session.user.id);
          setUser(userData);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    initAuth();
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Helper function to get user profile data
  const getUserProfile = async (userId: string): Promise<User> => {
    try {
      // Check if profile exists in database
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }
      
      // Get user data from auth
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error fetching user:', userError);
        throw userError;
      }
      
      // Combine auth data with profile data if it exists
      if (profile) {
        return {
          id: userId,
          name: profile.full_name || userData.user.email?.split('@')[0] || 'User',
          email: userData.user.email || '',
          photoURL: profile.avatar_url,
          phoneNumber: profile.phone || '',
          age: profile.age || '',
          location: profile.location || '',
          grade: profile.grade || '11-12',
          school: profile.school || '',
          interests: profile.interests || []
        };
      }
      
      // Return basic user data if no profile found
      return {
        id: userId,
        name: userData.user.email?.split('@')[0] || 'User',
        email: userData.user.email || '',
        grade: '11-12'
      };
    } catch (err) {
      console.error('Error in getUserProfile:', err);
      
      // Return a minimal user object to prevent errors
      return {
        id: userId,
        name: 'User',
        email: '',
        grade: '11-12'
      };
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        setError(signInError.message);
        throw signInError;
      }
      
      if (data.user) {
        // User profile is fetched by the auth listener
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Sign up with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });
      
      if (signUpError) {
        setError(signUpError.message);
        throw signUpError;
      }
      
      if (data.user) {
        // Profile is created by the database trigger
        // User will be set by the auth state listener
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      // Update profile in database
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: userData.name || user.name,
          phone: userData.phoneNumber || user.phoneNumber,
          age: userData.age || user.age,
          location: userData.location || user.location,
          grade: userData.grade || user.grade,
          school: userData.school || user.school,
          interests: userData.interests || user.interests,
          updated_at: new Date().toISOString()
        });
      
      if (updateError) {
        setError(updateError.message);
        throw updateError;
      }
      
      // Update local user state
      setUser(prev => prev ? { ...prev, ...userData } : null);
      
      return Promise.resolve();
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      console.error('Profile update error:', err);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // User state is cleared by the auth listener
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout,
      updateProfile,
      loading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth Guard Component
export const RequireAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};
