
import { useState, useCallback } from 'react';

interface Question {
  id: string;
  text: string;
  options: string[];
  category: 'personality' | 'skills' | 'preferences' | 'workStyle';
  trait?: string;
}

interface AssessmentResult {
  personalityTraits: { [key: string]: number };
  skillStrengths: { [key: string]: number };
  careerPreferences: { [key: string]: number };
  workStyle: { [key: string]: number };
}

export interface CareerPathAnalysis {
  path: string;
  matchScore: number;
  requirements: string[];
  skills: string[];
  outlook: string;
  salary: string;
}

// Extended with more comprehensive questions for 11-12th grade assessment
const QUESTIONS: Question[] = [
  // Personality Questions
  {
    id: 'p1',
    text: 'How do you prefer to solve problems?',
    options: [
      'Break them down systematically',
      'Use creative and innovative approaches',
      'Collaborate with others',
      'Trust my intuition'
    ],
    category: 'personality',
    trait: 'analytical'
  },
  {
    id: 'p2',
    text: 'When working on a group project, do you prefer to:',
    options: [
      'Take the lead and organize others',
      'Focus on specific tasks independently',
      'Support team members and mediate discussions',
      'Generate creative ideas and solutions'
    ],
    category: 'personality',
    trait: 'leadership'
  },
  {
    id: 'p3',
    text: 'How do you respond to new situations or environments?',
    options: [
      'Carefully observe before acting',
      'Dive in and learn through experience',
      'Research thoroughly beforehand',
      'Adapt quickly and go with the flow'
    ],
    category: 'personality',
    trait: 'adaptability'
  },
  // Skills Questions
  {
    id: 's1',
    text: 'Which of these activities do you find most engaging?',
    options: [
      'Analyzing data and statistics',
      'Creating art or design work',
      'Helping others solve personal problems',
      'Building or fixing things'
    ],
    category: 'skills',
    trait: 'technical'
  },
  {
    id: 's2',
    text: 'Which subject area do you excel in most naturally?',
    options: [
      'Mathematics and logical reasoning',
      'Languages and written expression',
      'Social studies and human behavior',
      'Sciences and research'
    ],
    category: 'skills',
    trait: 'academic'
  },
  // Preferences Questions
  {
    id: 'pref1',
    text: 'What type of work environment would you prefer?',
    options: [
      'Structured with clear rules and expectations',
      'Creative and flexible',
      'Collaborative and team-oriented',
      'Independent with autonomy'
    ],
    category: 'preferences',
    trait: 'environment'
  },
  {
    id: 'pref2',
    text: 'What would you value most in a career?',
    options: [
      'Financial stability and security',
      'Creativity and self-expression',
      'Helping others and making a difference',
      'Status and recognition'
    ],
    category: 'preferences',
    trait: 'values'
  },
  // Work Style Questions
  {
    id: 'w1',
    text: 'How do you prefer to manage your time?',
    options: [
      'Follow a detailed schedule',
      'Prioritize flexibly based on what needs attention',
      'Work in focused bursts of energy',
      'Multitask on several activities at once'
    ],
    category: 'workStyle',
    trait: 'timeManagement'
  },
  {
    id: 'w2',
    text: 'When learning something new, you prefer to:',
    options: [
      'Follow step-by-step instructions',
      'Understand the big picture first',
      'Try it out hands-on',
      'Discuss it with others'
    ],
    category: 'workStyle',
    trait: 'learningStyle'
  },
  // Add more questions as needed...
];

// Extended career paths with more details
const CAREER_PATHS = [
  {
    path: 'Software Development',
    traits: ['analytical', 'technical', 'innovative'],
    skills: ['programming', 'problem-solving', 'logical-thinking'],
    outlook: 'Excellent',
    salary: '$70,000 - $150,000',
    requirements: ['Computer Science degree or equivalent', 'Programming skills', 'Analytical abilities']
  },
  {
    path: 'Medical Practice',
    traits: ['analytical', 'compassionate', 'detail-oriented'],
    skills: ['science-knowledge', 'critical-thinking', 'communication'],
    outlook: 'Excellent',
    salary: '$80,000 - $200,000+',
    requirements: ['Medical degree', 'Strong sciences background', 'Interpersonal skills']
  },
  {
    path: 'Engineering',
    traits: ['analytical', 'technical', 'problem-solving'],
    skills: ['mathematics', 'physics', 'design-thinking'],
    outlook: 'Very Good',
    salary: '$65,000 - $130,000',
    requirements: ['Engineering degree', 'Strong mathematics', 'Technical aptitude']
  },
  {
    path: 'Creative Arts',
    traits: ['creative', 'expressive', 'observant'],
    skills: ['artistic-ability', 'visual-thinking', 'design'],
    outlook: 'Good',
    salary: '$40,000 - $120,000',
    requirements: ['Portfolio development', 'Creative skills', 'Technical proficiency in medium']
  },
  {
    path: 'Business Management',
    traits: ['leadership', 'strategic', 'decisive'],
    skills: ['communication', 'organization', 'analytical-thinking'],
    outlook: 'Very Good',
    salary: '$60,000 - $150,000',
    requirements: ['Business degree preferred', 'Leadership abilities', 'Communication skills']
  },
  // Add more career paths...
];

export const useEnhancedAssessment = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const submitAnswer = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const calculateResults = useCallback(() => {
    const traits: { [key: string]: number } = {};
    const skills: { [key: string]: number } = {};
    const preferences: { [key: string]: number } = {};
    const workStyle: { [key: string]: number } = {};

    // Process answers and calculate scores
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = QUESTIONS.find(q => q.id === questionId);
      if (!question) return;

      // Add weighted scores based on answers
      const score = calculateQuestionScore(answer, question);
      
      switch (question.category) {
        case 'personality':
          if (question.trait) {
            traits[question.trait] = (traits[question.trait] || 0) + score;
          }
          break;
        case 'skills':
          skills[question.trait || ''] = (skills[question.trait || ''] || 0) + score;
          break;
        case 'preferences':
          preferences[question.trait || ''] = (preferences[question.trait || ''] || 0) + score;
          break;
        case 'workStyle':
          workStyle[question.trait || ''] = (workStyle[question.trait || ''] || 0) + score;
          break;
      }
    });

    // Normalize scores to percentages
    const normalizeScores = (scores: { [key: string]: number }) => {
      const values = Object.values(scores);
      if (values.length === 0) return {};
      
      const maxScore = Math.max(...values);
      return Object.fromEntries(
        Object.entries(scores).map(([key, value]) => [
          key,
          Math.round((value / maxScore) * 100)
        ])
      );
    };

    setResult({
      personalityTraits: normalizeScores(traits),
      skillStrengths: normalizeScores(skills),
      careerPreferences: normalizeScores(preferences),
      workStyle: normalizeScores(workStyle)
    });
  }, [answers]);

  const getCareerMatches = useCallback(() => {
    if (!result) return [];

    return CAREER_PATHS.map(career => {
      let matchScore = 0;
      let totalFactors = 0;

      // Calculate trait match
      career.traits.forEach(trait => {
        if (result.personalityTraits[trait]) {
          matchScore += result.personalityTraits[trait];
          totalFactors++;
        }
      });

      // Calculate skills match
      career.skills.forEach(skill => {
        if (result.skillStrengths[skill]) {
          matchScore += result.skillStrengths[skill];
          totalFactors++;
        }
      });

      const averageScore = totalFactors > 0 ? Math.round(matchScore / totalFactors) : 0;

      return {
        path: career.path,
        matchScore: averageScore,
        requirements: career.requirements,
        skills: career.skills,
        outlook: career.outlook,
        salary: career.salary
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [result]);

  // Get formatted answers for AI processing
  const getFormattedAnswers = useCallback(() => {
    return Object.entries(answers).map(([questionId, answer]) => {
      const question = QUESTIONS.find(q => q.id === questionId);
      return {
        questionId,
        question: question?.text || '',
        answer,
        category: question?.category || ''
      };
    });
  }, [answers]);

  return {
    currentQuestion,
    setCurrentQuestion,
    submitAnswer,
    calculateResults,
    getCareerMatches,
    getFormattedAnswers,
    result,
    totalQuestions: QUESTIONS.length,
    questions: QUESTIONS,
    answers
  };
};

// Helper function to calculate question score
function calculateQuestionScore(answer: string, question: Question): number {
  const optionIndex = question.options.indexOf(answer);
  // Simple scoring mechanism - can be made more sophisticated
  return Math.max(0, 4 - optionIndex); // 4,3,2,1 points based on option order
}
