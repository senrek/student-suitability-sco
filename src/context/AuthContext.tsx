import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

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

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // This is a mock login. In a real app, you would call your authentication API
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email: email,
        phoneNumber: '123-456-7890',
        age: '17',
        location: 'Mumbai, India',
        grade: '11-12',
        school: 'Delhi Public School',
        interests: ['Science', 'Technology', 'Mathematics']
      };
      
      // Store user in localStorage for session persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
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
      
      // This is a mock registration. In a real app, you would call your registration API
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        phoneNumber: '',
        age: '',
        location: '',
        grade: '11-12',
        school: '',
        interests: []
      };
      
      // Store user in localStorage for session persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
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
      
      if (user) {
        // Update the user object with new data
        const updatedUser = { ...user, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      
      return Promise.resolve();
    } catch (err) {
      setError('Failed to update profile');
      console.error('Profile update error:', err);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
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
