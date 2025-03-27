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
  // Add more questions here...
];

const CAREER_PATHS = [
  {
    path: 'Software Development',
    traits: ['analytical', 'technical', 'innovative'],
    skills: ['programming', 'problem-solving', 'logical-thinking'],
    outlook: 'Excellent',
    salary: '$70,000 - $150,000'
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
      const maxScore = Math.max(...Object.values(scores));
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
        requirements: ['Education requirement 1', 'Requirement 2'],
        skills: career.skills,
        outlook: career.outlook,
        salary: career.salary
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [result]);

  return {
    currentQuestion,
    setCurrentQuestion,
    submitAnswer,
    calculateResults,
    getCareerMatches,
    result,
    totalQuestions: QUESTIONS.length,
    questions: QUESTIONS
  };
};

// Helper function to calculate question score
function calculateQuestionScore(answer: string, question: Question): number {
  const optionIndex = question.options.indexOf(answer);
  // Simple scoring mechanism - can be made more sophisticated
  return Math.max(0, 4 - optionIndex); // 4,3,2,1 points based on option order
}
