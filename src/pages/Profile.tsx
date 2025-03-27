
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, School, BookOpen, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    grade: user?.grade || '',
    school: user?.school || '',
    interests: user?.interests || []
  });

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset form data to current user data when entering edit mode
      setFormData({
        name: user.name,
        email: user.email,
        grade: user.grade,
        school: user.school || '',
        interests: user.interests || []
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGradeChange = (value: string) => {
    setFormData({
      ...formData,
      grade: value
    });
  };

  const handleInterestChange = (interest: string) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];

    setFormData({
      ...formData,
      interests: updatedInterests
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        grade: formData.grade,
        school: formData.school,
        interests: formData.interests
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="page-container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    <CardTitle>Personal Information</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleEditToggle}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Select 
                        value={formData.grade} 
                        onValueChange={handleGradeChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8">8th Grade</SelectItem>
                          <SelectItem value="9">9th Grade</SelectItem>
                          <SelectItem value="10">10th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="school">School</Label>
                      <Input 
                        id="school" 
                        name="school" 
                        value={formData.school} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Interests</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          'Science', 'Art', 'Technology', 'Sports',
                          'Music', 'Writing', 'Mathematics', 'Social Studies'
                        ].map((interest) => (
                          <div 
                            key={interest}
                            className={`
                              p-2 border rounded-md text-center text-sm cursor-pointer transition-all
                              ${formData.interests.includes(interest) 
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
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                            Saving...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                        <p>{user.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Grade</h3>
                        <p>{user.grade}th Grade</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">School</h3>
                        <p>{user.school || 'Not specified'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {user.interests && user.interests.length > 0 ? (
                          user.interests.map((interest) => (
                            <div 
                              key={interest} 
                              className="text-xs bg-secondary text-secondary-foreground rounded-full px-2.5 py-1"
                            >
                              {interest}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No interests specified</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <School className="h-5 w-5 mr-2 text-primary" />
                    <CardTitle>Education</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Current Grade</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user.grade}th Grade
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium">School</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user.school || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    <CardTitle>Assessment History</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground">
                      No completed assessments yet
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      asChild
                    >
                      <Link to="/assessment">Take Assessment</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
