
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { 
  UserRound, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Building, 
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [name, setName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [age, setAge] = useState(user?.age || '');
  const [location, setLocation] = useState(user?.location || '');
  const [grade, setGrade] = useState(user?.grade || '');
  const [school, setSchool] = useState(user?.school || '');
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const availableInterests = [
    'Science', 'Technology', 'Engineering', 'Mathematics', 
    'Arts', 'Music', 'Literature', 'History',
    'Social Studies', 'Physical Education', 'Business', 'Economics'
  ];
  
  const handleToggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      await updateProfile({
        name,
        phoneNumber,
        age,
        location,
        grade,
        school,
        interests
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            View and update your personal information.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your personal details are used to personalize your career assessment experience.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {isEditing ? (
              // Edit mode
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)} 
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      value={age} 
                      onChange={(e) => setAge(e.target.value)} 
                      placeholder="Enter your age"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="Enter your location"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="grade">Grade</Label>
                    <Select value={grade} onValueChange={setGrade}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8th Grade</SelectItem>
                        <SelectItem value="9">9th Grade</SelectItem>
                        <SelectItem value="10">10th Grade</SelectItem>
                        <SelectItem value="11-12">11-12th Grade</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="school">School</Label>
                    <Input 
                      id="school" 
                      value={school} 
                      onChange={(e) => setSchool(e.target.value)} 
                      placeholder="Enter your school name"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Interests</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {availableInterests.map((interest) => (
                      <div
                        key={interest}
                        className={`
                          p-2 border rounded cursor-pointer transition-colors
                          ${interests.includes(interest) 
                            ? 'bg-primary/10 border-primary/30 text-primary' 
                            : 'border-border hover:bg-accent/50'}
                        `}
                        onClick={() => handleToggleInterest(interest)}
                      >
                        {interest}
                        {interests.includes(interest) && (
                          <CheckCircle className="h-4 w-4 inline ml-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // View mode
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-md bg-background">
                  <UserRound className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{user?.name || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-md bg-background">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-md bg-background">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-medium">{user?.phoneNumber || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-md bg-background">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{user?.age || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-md bg-background">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{user?.location || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-md bg-background">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Grade</p>
                      <p className="font-medium">{user?.grade || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-md bg-background">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">School</p>
                      <p className="font-medium">{user?.school || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-md bg-background">
                  <p className="text-sm text-muted-foreground mb-2">Interests</p>
                  {user?.interests && user.interests.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest) => (
                        <span 
                          key={interest}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No interests selected</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Reset form
                    setName(user?.name || '');
                    setPhoneNumber(user?.phoneNumber || '');
                    setAge(user?.age || '');
                    setLocation(user?.location || '');
                    setGrade(user?.grade || '');
                    setSchool(user?.school || '');
                    setInterests(user?.interests || []);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
};

export default Profile;
