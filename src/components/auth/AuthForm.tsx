
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const handleInterestChange = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (type === 'login') {
        await login(email, password);
      } else {
        await register({
          name,
          email,
          password,
          grade,
          school,
          interests
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-card rounded-lg shadow-sm border border-border/50">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          {type === 'login' ? 'Sign In' : 'Create Account'}
        </h1>
        <p className="text-muted-foreground">
          {type === 'login' 
            ? 'Enter your credentials to access your account' 
            : 'Join us and discover your ideal career path'}
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>

        {type === 'register' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={grade} onValueChange={setGrade} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8th Grade</SelectItem>
                  <SelectItem value="9">9th Grade</SelectItem>
                  <SelectItem value="10">10th Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">School Name</Label>
              <Input
                id="school"
                placeholder="Your School"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Interests (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  'Science', 'Art', 'Technology', 'Sports',
                  'Music', 'Writing', 'Mathematics', 'Social Studies'
                ].map((interest) => (
                  <div 
                    key={interest}
                    className={`
                      p-2 border rounded-md text-center text-sm cursor-pointer transition-all
                      ${interests.includes(interest) 
                        ? 'bg-primary/10 border-primary/50 text-primary font-medium' 
                        : 'border-border hover:bg-accent'
                      }
                    `}
                    onClick={() => handleInterestChange(interest)}
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              {type === 'login' ? 'Signing in...' : 'Creating account...'}
            </div>
          ) : (
            type === 'login' ? 'Sign In' : 'Create Account'
          )}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        {type === 'login' ? (
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
