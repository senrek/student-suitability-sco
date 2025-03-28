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
      
      try {
        // Check for existing session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          return;
        }
        
        if (session?.user) {
          const userData = await getUserProfile(session.user.id);
          setUser(userData);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        setLoading(false);
      }
    };
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        if (event === 'SIGNED_IN' && session?.user) {
          const userData = await getUserProfile(session.user.id);
          setUser(userData);
          setError(null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setError(null);
        } else if (event === 'USER_UPDATED' && session?.user) {
          const userData = await getUserProfile(session.user.id);
          setUser(userData);
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
      
      if (!email || !password) {
        const errorMsg = 'Email and password are required';
        setError(errorMsg);
        throw new Error(errorMsg);
      }
      
      console.log('Attempting login with email:', email);
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        console.error('Login error:', signInError);
        let errorMessage = signInError.message;
        
        // Provide more user-friendly error messages
        if (errorMessage.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        }
        
        setError(errorMessage);
        throw new Error(errorMessage);
      }
      
      if (data.user) {
        console.log('Login successful for user:', data.user.id);
        setError(null);
        // User profile is fetched by the auth listener
        navigate('/dashboard');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to login';
      setError(errorMessage);
      console.error('Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!name || !email || !password) {
        const errorMsg = 'Name, email and password are required';
        setError(errorMsg);
        throw new Error(errorMsg);
      }
      
      if (password.length < 6) {
        const errorMsg = 'Password must be at least 6 characters';
        setError(errorMsg);
        throw new Error(errorMsg);
      }
      
      console.log('Attempting registration with email:', email);
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
        console.error('Registration error:', signUpError);
        setError(signUpError.message);
        throw signUpError;
      }
      
      if (data.user) {
        console.log('Registration successful for user:', data.user.id);
        // Profile is created by the database trigger
        // User will be set by the auth state listener
        navigate('/dashboard');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      console.error('Registration error:', err);
      throw err;
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
    return <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};
