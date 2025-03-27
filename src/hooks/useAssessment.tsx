import { useState, useEffect } from 'react';
import { mockQuestions, mockCareerClusters, type Question, type CareerCluster } from '../utils/mockData';
import { aptitudeQuestions } from '../utils/aptitudeData';
import { careerAssessmentQuestions } from '../utils/careerAssessmentData';
import { juniorAssessmentQuestions } from '../utils/juniorAssessmentData';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../context/AuthContext';
import type { Database } from '@/integrations/supabase/types';

type AssessmentType = 'career' | 'aptitude' | 'high-school';
type SupabaseAssessmentType = Database['public']['Enums']['assessment_type'];

const additionalHighSchoolQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Do you prefer physically active tasks over sitting and observing?',
    category: 'Physical Activity Preference',
    options: [
      { 
        text: 'Yes, I enjoy active tasks', 
        clusterWeightage: [
          { clusterId: 'realistic', value: 5 },
          { clusterId: 'kinesthetic', value: 4 }
        ] 
      },
      { 
        text: 'Sometimes, depending on the activity', 
        clusterWeightage: [
          { clusterId: 'realistic', value: 3 },
          { clusterId: 'kinesthetic', value: 2 }
        ] 
      },
      { 
        text: 'Rarely, I prefer balanced tasks', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 3 },
          { clusterId: 'investigative', value: 2 }
        ] 
      },
      { 
        text: 'No, I prefer passive activities', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 4 },
          { clusterId: 'investigative', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q2',
    text: 'Do you enjoy participating in stage performances, events, or art competitions?',
    category: 'Artistic Expression',
    options: [
      { 
        text: 'Yes, I love performing', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 5 },
          { clusterId: 'social', value: 3 }
        ] 
      },
      { 
        text: 'Occasionally, if the event interests me', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 3 },
          { clusterId: 'social', value: 2 }
        ] 
      },
      { 
        text: 'Rarely, I prefer to watch rather than participate', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 3 },
          { clusterId: 'investigative', value: 2 }
        ] 
      },
      { 
        text: 'No, I avoid such activities', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 4 },
          { clusterId: 'investigative', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q83',
    text: 'Given an option, how much would you like to choose the given value in your dream job? Adventurous and excitement involving physical risk.',
    category: 'Work Values',
    options: [
      { 
        text: 'Always', 
        clusterWeightage: [
          { clusterId: 'adventure', value: 5 },
          { clusterId: 'outdoor', value: 4 }
        ] 
      },
      { 
        text: 'Most of the time', 
        clusterWeightage: [
          { clusterId: 'adventure', value: 3 },
          { clusterId: 'outdoor', value: 2 }
        ] 
      },
      { 
        text: 'Not really', 
        clusterWeightage: [
          { clusterId: 'academic', value: 3 },
          { clusterId: 'creative', value: 2 }
        ] 
      },
      { 
        text: 'Definitely No', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 4 },
          { clusterId: 'office', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q84',
    text: 'Given an option, how much would you like to choose the given value in your dream job? Freedom to work alone, make my own decisions, plan my own work.',
    category: 'Work Values',
    options: [
      { 
        text: 'Always, I like to work alone', 
        clusterWeightage: [
          { clusterId: 'investigative', value: 5 },
          { clusterId: 'artistic', value: 4 }
        ] 
      },
      { 
        text: 'Most of the time', 
        clusterWeightage: [
          { clusterId: 'investigative', value: 3 },
          { clusterId: 'artistic', value: 2 }
        ] 
      },
      { 
        text: 'Not really, mostly I like to work in groups', 
        clusterWeightage: [
          { clusterId: 'social', value: 4 },
          { clusterId: 'enterprising', value: 3 }
        ] 
      },
      { 
        text: 'Definitely No, in fact, I enjoy working in groups', 
        clusterWeightage: [
          { clusterId: 'social', value: 5 },
          { clusterId: 'enterprising', value: 4 }
        ] 
      }
    ]
  },
  {
    id: 'q85',
    text: 'Given an option, how much would you like to choose the given value in your dream job? Work on the frontiers of knowledge that requires continuous learning.',
    category: 'Work Values',
    options: [
      { 
        text: 'Always, I would like to upgrade my skills', 
        clusterWeightage: [
          { clusterId: 'investigative', value: 5 },
          { clusterId: 'realistic', value: 3 }
        ] 
      },
      { 
        text: 'Most of the time', 
        clusterWeightage: [
          { clusterId: 'investigative', value: 3 },
          { clusterId: 'realistic', value: 2 }
        ] 
      },
      { 
        text: 'Not really', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 3 },
          { clusterId: 'enterprising', value: 2 }
        ] 
      },
      { 
        text: 'Definitely No', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 4 },
          { clusterId: 'enterprising', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q86',
    text: 'Given an option, how much would you like to choose the given value in your dream job? Work that has a high degree of competition, challenge, pace, and excitement.',
    category: 'Work Values',
    options: [
      { 
        text: 'Always, I would like to work in a high-paced, challenging work environment', 
        clusterWeightage: [
          { clusterId: 'enterprising', value: 5 },
          { clusterId: 'investigative', value: 3 }
        ] 
      },
      { 
        text: 'Most of the time', 
        clusterWeightage: [
          { clusterId: 'enterprising', value: 3 },
          { clusterId: 'investigative', value: 2 }
        ] 
      },
      { 
        text: 'Not really', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 3 },
          { clusterId: 'social', value: 2 }
        ] 
      },
      { 
        text: 'Definitely No, the working environment should be pleasant and peaceful, requiring honesty', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 5 },
          { clusterId: 'social', value: 4 }
        ] 
      }
    ]
  },
  {
    id: 'q87',
    text: 'Given an option, how much would you like to choose the given value in your dream job? Structured work environment requiring a high level of accuracy, reliability, and set procedures in work.',
    category: 'Work Values',
    options: [
      { 
        text: 'Always', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 5 },
          { clusterId: 'realistic', value: 3 }
        ] 
      },
      { 
        text: 'Most of the time', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 3 },
          { clusterId: 'realistic', value: 2 }
        ] 
      },
      { 
        text: 'Not really', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 3 },
          { clusterId: 'enterprising', value: 2 }
        ] 
      },
      { 
        text: 'Definitely No', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 5 },
          { clusterId: 'enterprising', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q88',
    text: 'Given an option, how much would you like to choose the given value in your dream job? Engage in creative work in any form of art.',
    category: 'Work Values',
    options: [
      { 
        text: 'Always', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 5 },
          { clusterId: 'social', value: 2 }
        ] 
      },
      { 
        text: 'Most of the time', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 3 },
          { clusterId: 'social', value: 1 }
        ] 
      },
      { 
        text: 'Not really', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 3 },
          { clusterId: 'realistic', value: 2 }
        ] 
      },
      { 
        text: 'Definitely No', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 5 },
          { clusterId: 'realistic', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q89',
    text: 'Given an option, how much would you like to choose the given value in your dream job? Work should involve social services, responsibility, and welfare of people and society.',
    category: 'Work Values',
    options: [
      { 
        text: 'Always', 
        clusterWeightage: [
          { clusterId: 'social', value: 5 },
          { clusterId: 'enterprising', value: 2 }
        ] 
      },
      { 
        text: 'Most of the time', 
        clusterWeightage: [
          { clusterId: 'social', value: 3 },
          { clusterId: 'enterprising', value: 1 }
        ] 
      },
      { 
        text: 'Not really', 
        clusterWeightage: [
          { clusterId: 'realistic', value: 3 },
          { clusterId: 'conventional', value: 2 }
        ] 
      },
      { 
        text: 'Definitely No', 
        clusterWeightage: [
          { clusterId: 'realistic', value: 5 },
          { clusterId: 'conventional', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q90',
    text: 'You are not sure whether a word should be spelled \'dependent\' or \'dependant\'. You would:',
    category: 'Learning Style',
    options: [
      { 
        text: 'Look it up in the dictionary.', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 3 },
          { clusterId: 'investigative', value: 2 }
        ] 
      },
      { 
        text: 'Picturize the word in your mind and choose the way it looks.', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 4 },
          { clusterId: 'visual', value: 3 }
        ] 
      },
      { 
        text: 'Spell it out loud to see if it sounds right.', 
        clusterWeightage: [
          { clusterId: 'auditory', value: 4 },
          { clusterId: 'social', value: 2 }
        ] 
      },
      { 
        text: 'Write both versions down on paper and choose one.', 
        clusterWeightage: [
          { clusterId: 'kinesthetic', value: 4 },
          { clusterId: 'realistic', value: 2 }
        ] 
      }
    ]
  },
  {
    id: 'q91',
    text: 'When you study, what makes you learn better?',
    category: 'Learning Style',
    options: [
      { 
        text: 'Read and re-write notes, headings in a book.', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 3 },
          { clusterId: 'visual', value: 3 }
        ] 
      },
      { 
        text: 'Listen to a lecture, discuss it, or repeat loudly to yourself.', 
        clusterWeightage: [
          { clusterId: 'auditory', value: 5 },
          { clusterId: 'social', value: 3 }
        ] 
      },
      { 
        text: 'Move around and learn by practicals, demonstrations.', 
        clusterWeightage: [
          { clusterId: 'kinesthetic', value: 5 },
          { clusterId: 'realistic', value: 3 }
        ] 
      },
      { 
        text: 'Convert text to labeled diagrams, flowcharts, images, and illustrations.', 
        clusterWeightage: [
          { clusterId: 'visual', value: 5 },
          { clusterId: 'artistic', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q92',
    text: 'To learn how a computer works, would you rather:',
    category: 'Learning Style',
    options: [
      { 
        text: 'Watch a demo video about it?', 
        clusterWeightage: [
          { clusterId: 'visual', value: 5 },
          { clusterId: 'investigative', value: 2 }
        ] 
      },
      { 
        text: 'Listen to someone explaining it?', 
        clusterWeightage: [
          { clusterId: 'auditory', value: 5 },
          { clusterId: 'social', value: 2 }
        ] 
      },
      { 
        text: 'Take the computer apart and try to figure it out by myself?', 
        clusterWeightage: [
          { clusterId: 'kinesthetic', value: 5 },
          { clusterId: 'realistic', value: 4 }
        ] 
      },
      { 
        text: 'Read the instructions and catalogue?', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 4 },
          { clusterId: 'visual', value: 2 }
        ] 
      }
    ]
  },
  {
    id: 'q93',
    text: 'In a class or seminar, You usually:',
    category: 'Learning Style',
    options: [
      { 
        text: 'Make plenty of notes on what the teacher says.', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 4 },
          { clusterId: 'visual', value: 3 }
        ] 
      },
      { 
        text: 'Listen carefully and make some notes.', 
        clusterWeightage: [
          { clusterId: 'auditory', value: 4 },
          { clusterId: 'investigative', value: 3 }
        ] 
      },
      { 
        text: 'Draw pictures, illustrations while listening.', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 5 },
          { clusterId: 'visual', value: 4 }
        ] 
      },
      { 
        text: 'Prefer more examples, demos, and real-time applications.', 
        clusterWeightage: [
          { clusterId: 'kinesthetic', value: 5 },
          { clusterId: 'realistic', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q94',
    text: 'You have to present your ideas to your class. You would:',
    category: 'Learning Style',
    options: [
      { 
        text: 'Prefer creating a working model and demonstrating to others.', 
        clusterWeightage: [
          { clusterId: 'kinesthetic', value: 5 },
          { clusterId: 'realistic', value: 4 }
        ] 
      },
      { 
        text: 'Prefer creating diagrams, flowcharts, and graphs to explain ideas.', 
        clusterWeightage: [
          { clusterId: 'visual', value: 5 },
          { clusterId: 'artistic', value: 3 }
        ] 
      },
      { 
        text: 'Prefer to write and practice a few keywords by saying them over and over again.', 
        clusterWeightage: [
          { clusterId: 'auditory', value: 5 },
          { clusterId: 'conventional', value: 3 }
        ] 
      },
      { 
        text: 'Prefer to write down and practice my speech by reading it over and over again.', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 4 },
          { clusterId: 'investigative', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q11',
    text: 'Do you have an affinity for numbers and an interest in business and the economy?',
    category: 'Business & Economics',
    options: [
      { 
        text: 'Yes, I enjoy working with numbers and analyzing the economy', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 5 },
          { clusterId: 'enterprising', value: 4 }
        ] 
      },
      { 
        text: 'Somewhat, I have a basic interest in business topics', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 3 },
          { clusterId: 'enterprising', value: 2 }
        ] 
      },
      { 
        text: 'Rarely, I only focus on it when necessary', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 2 },
          { clusterId: 'social', value: 2 }
        ] 
      },
      { 
        text: 'No, I am not interested in numbers or business', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 3 },
          { clusterId: 'social', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q12',
    text: 'Do you enjoy taking part in science projects?',
    category: 'Scientific Interest',
    options: [
      { 
        text: 'Yes, I love science-related activities', 
        clusterWeightage: [
          { clusterId: 'investigative', value: 5 },
          { clusterId: 'realistic', value: 3 }
        ] 
      },
      { 
        text: 'Sometimes, if the project interests me', 
        clusterWeightage: [
          { clusterId: 'investigative', value: 3 },
          { clusterId: 'realistic', value: 2 }
        ] 
      },
      { 
        text: 'Rarely, but I find science useful', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 2 },
          { clusterId: 'social', value: 2 }
        ] 
      },
      { 
        text: 'No, I do not enjoy science projects', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 3 },
          { clusterId: 'social', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q13',
    text: 'Do you like taking photographs and collecting pictures?',
    category: 'Visual Arts',
    options: [
      { 
        text: 'Yes, I love photography and visuals', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 5 },
          { clusterId: 'visual', value: 4 }
        ] 
      },
      { 
        text: 'Sometimes, I take pictures occasionally', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 3 },
          { clusterId: 'visual', value: 2 }
        ] 
      },
      { 
        text: 'Rarely, but I enjoy looking at photos', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 2 },
          { clusterId: 'investigative', value: 2 }
        ] 
      },
      { 
        text: 'No, I am not interested in photography', 
        clusterWeightage: [
          { clusterId: 'conventional', value: 3 },
          { clusterId: 'realistic', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q14',
    text: 'Do you like to put objects together or assemble them?',
    category: 'Mechanical Skills',
    options: [
      { 
        text: 'Yes, I enjoy assembling and building things', 
        clusterWeightage: [
          { clusterId: 'realistic', value: 5 },
          { clusterId: 'kinesthetic', value: 4 }
        ] 
      },
      { 
        text: 'Sometimes, if the task is interesting', 
        clusterWeightage: [
          { clusterId: 'realistic', value: 3 },
          { clusterId: 'kinesthetic', value: 2 }
        ] 
      },
      { 
        text: 'Rarely, I do it only when necessary', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 2 },
          { clusterId: 'social', value: 2 }
        ] 
      },
      { 
        text: 'No, I do not enjoy assembling objects', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 3 },
          { clusterId: 'social', value: 3 }
        ] 
      }
    ]
  },
  {
    id: 'q15',
    text: 'Do you enjoy reading or watching science-related content (e.g., Discovery Channel, science magazines, etc.)?',
    category: 'Scientific Interest',
    options: [
      { 
        text: 'Yes, I love science-related media', 
        clusterWeightage: [
          { clusterId: 'investigative', value: 5 },
          { clusterId: 'visual', value: 3 }
        ] 
      },
      { 
        text: 'Sometimes, if the topic is engaging', 
        clusterWeightage: [
          { clusterId: 'investigative', value: 3 },
          { clusterId: 'visual', value: 2 }
        ] 
      },
      { 
        text: 'Rarely, but I do come across such content', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 2 },
          { clusterId: 'social', value: 2 }
        ] 
      },
      { 
        text: 'No, I am not interested in science content', 
        clusterWeightage: [
          { clusterId: 'artistic', value: 3 },
          { clusterId: 'social', value: 3 }
        ] 
      }
    ]
  }
];

type AssessmentState = {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, number>;
  completed: boolean;
  results: CareerMatch[] | null;
  assessmentType: AssessmentType;
};

export interface CareerMatch {
  clusterName: string;
  score: number;
  description: string;
  careers: string[];
  skills: string[];
  education: string[];
  resources: {
    title: string;
    url: string;
  }[];
}

export const useAssessment = () => {
  const { user } = useAuth();
  const [state, setState] = useState<AssessmentState>({
    questions: [],
    currentIndex: 0,
    answers: {},
    completed: false,
    results: null,
    assessmentType: 'career',
  });

  useEffect(() => {
    let questionsToUse: Question[] = [];
    
    if (state.assessmentType === 'career') {
      questionsToUse = juniorAssessmentQuestions;
    } else if (state.assessmentType === 'high-school') {
      const baseQuestions = careerAssessmentQuestions.filter(q => q.gradeLevel === '11-12');
      questionsToUse = [...baseQuestions, ...additionalHighSchoolQuestions];
    }
    
    setState(prev => ({
      ...prev,
      questions: questionsToUse,
    }));
  }, [state.assessmentType]);

  const setAssessmentType = (type: 'career' | 'aptitude' | 'high-school') => {
    setState(prev => ({
      ...prev,
      assessmentType: type,
      currentIndex: 0,
      answers: {},
      completed: false,
      results: null,
    }));
  };

  const loadAptitudeQuestions = (gradeLevel: string) => {
    const filteredQuestions = aptitudeQuestions.filter(
      q => q.gradeLevel === gradeLevel || q.gradeLevel === 'all'
    );

    setState(prev => ({
      ...prev,
      questions: filteredQuestions,
      currentIndex: 0,
      answers: {},
      completed: false,
      results: null,
    }));
  };

  const loadHighSchoolQuestions = () => {
    const baseQuestions = careerAssessmentQuestions.filter(
      q => q.gradeLevel === '11-12'
    );
    
    const allHighSchoolQuestions = [...baseQuestions, ...additionalHighSchoolQuestions];

    setState(prev => ({
      ...prev,
      questions: allHighSchoolQuestions,
      currentIndex: 0,
      answers: {},
      completed: false,
      results: null,
    }));
  };

  const answerQuestion = async (optionIndex: number) => {
    const newAnswers = { ...state.answers, [state.currentIndex]: optionIndex };
    
    setState(prev => ({
      ...prev,
      answers: newAnswers,
    }));
    
    if (user) {
      try {
        const { data: sessionData } = await supabase
          .from('assessment_sessions')
          .select('id')
          .eq('user_id', user.id)
          .order('started_at', { ascending: false })
          .limit(1);
          
        if (sessionData && sessionData.length > 0) {
          const sessionId = sessionData[0].id;
          
          await supabase
            .from('assessment_answers')
            .insert({
              session_id: sessionId,
              question_number: state.currentIndex + 1,
              answer: optionIndex.toString(),
              category: state.questions[state.currentIndex]?.category || 'General'
            });
        }
      } catch (err) {
        console.error('Error saving answer to Supabase:', err);
      }
    }
  };

  const goToNext = async () => {
    const isLastQuestion = state.currentIndex >= state.questions.length - 1;
    
    if (isLastQuestion) {
      setState(prev => ({
        ...prev,
        completed: true,
      }));
      
      if (user) {
        try {
          const { data: sessionData } = await supabase
            .from('assessment_sessions')
            .select('id')
            .eq('user_id', user.id)
            .order('started_at', { ascending: false })
            .limit(1);
            
          if (sessionData && sessionData.length > 0) {
            const sessionId = sessionData[0].id;
            
            await supabase
              .from('assessment_sessions')
              .update({ 
                completed: true,
                completed_at: new Date().toISOString()
              })
              .eq('id', sessionId);
          }
        } catch (err) {
          console.error('Error updating session status:', err);
        }
      }
      
      if (state.assessmentType === 'career' || state.assessmentType === 'high-school') {
        calculateResults(state.answers);
      } else {
        calculateAptitudeResults(state.answers);
      }
    } else {
      setState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        answers: {
          ...prev.answers,
          [prev.currentIndex + 1]: undefined
        }
      }));
    }
  };

  const goToPrevious = () => {
    if (state.currentIndex > 0) {
      setState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
      }));
    }
  };

  const skipQuestion = () => {
    const isLastQuestion = state.currentIndex >= state.questions.length - 1;
    
    setState(prev => ({
      ...prev,
      currentIndex: isLastQuestion ? prev.currentIndex : prev.currentIndex + 1,
      completed: isLastQuestion,
    }));
    
    if (isLastQuestion) {
      if (state.assessmentType === 'career' || state.assessmentType === 'high-school') {
        calculateResults(state.answers);
      } else {
        calculateAptitudeResults(state.answers);
      }
    }
  };

  const resetAssessment = () => {
    let questionsToUse: Question[] = [];
    
    if (state.assessmentType === 'career') {
      questionsToUse = juniorAssessmentQuestions;
    } else if (state.assessmentType === 'high-school') {
      const baseQuestions = careerAssessmentQuestions.filter(q => q.gradeLevel === '11-12');
      questionsToUse = [...baseQuestions, ...additionalHighSchoolQuestions];
    }
    
    setState({
      questions: questionsToUse,
      currentIndex: 0,
      answers: {},
      completed: false,
      results: null,
      assessmentType: state.assessmentType,
    });
  };

  const calculateResults = (answers: Record<number, number>) => {
    const clusterScores: Record<string, number> = {};
    mockCareerClusters.forEach(cluster => {
      clusterScores[cluster.id] = 0;
    });

    Object.entries(answers).forEach(([questionIndex, optionIndex]) => {
      const question = state.questions[parseInt(questionIndex)];
      if (!question) return;

      const selectedOption = question.options[optionIndex];
      if (!selectedOption) return;

      selectedOption.clusterWeightage.forEach(weight => {
        clusterScores[weight.clusterId] = (clusterScores[weight.clusterId] || 0) + weight.value;
      });
    });

    const results: CareerMatch[] = mockCareerClusters.map(cluster => {
      const maxPossible = state.questions.reduce((total, question) => {
        const maxOptionScore = Math.max(
          ...question.options.flatMap(option => 
            option.clusterWeightage
              .filter(w => w.clusterId === cluster.id)
              .map(w => w.value)
          ).filter(Boolean)
        );
        return total + (maxOptionScore || 0);
      }, 0);

      const score = Math.round((clusterScores[cluster.id] / Math.max(maxPossible, 1)) * 100);

      return {
        clusterName: cluster.name,
        score,
        description: cluster.description,
        careers: cluster.careers,
        skills: [],
        education: [],
        resources: cluster.resources,
      };
    }).sort((a, b) => b.score - a.score);

    setState(prev => ({
      ...prev,
      results,
    }));
  };

  const calculateAptitudeResults = (answers: Record<number, number>) => {
    const questionsAttempted = Object.keys(answers).length;
    
    let correctAnswers = 0;
    Object.entries(answers).forEach(([questionIndex, optionIndex]) => {
      const question = state.questions[parseInt(questionIndex)];
      if (!question || question.correctAnswer === undefined) return;
      
      if (question.correctAnswer === optionIndex) {
        correctAnswers++;
      }
    });
    
    const aptitudeScore = Math.round((correctAnswers / Math.max(questionsAttempted, 1)) * 100);
    
    const results: CareerMatch[] = [
      {
        clusterName: 'Aptitude Test Results',
        score: aptitudeScore,
        description: `You answered ${correctAnswers} out of ${questionsAttempted} questions correctly.`,
        careers: [],
        skills: [],
        education: [],
        resources: [
          { title: 'Study Resources', url: 'https://www.example.com/study' },
          { title: 'Practice Tests', url: 'https://www.example.com/practice' }
        ],
      }
    ];
    
    setState(prev => ({
      ...prev,
      results,
    }));
  };

  const autoAnswer = async () => {
    const newAnswers: Record<number, number> = { ...state.answers };

    state.questions.forEach((question, index) => {
      if (newAnswers[index] === undefined) {
        const randomOptionIndex = Math.floor(Math.random() * question.options.length);
        newAnswers[index] = randomOptionIndex;
      }
    });

    setState(prev => ({
      ...prev,
      answers: newAnswers,
      currentIndex: prev.questions.length - 1,
      completed: true,
    }));

    if (user) {
      try {
        const { data: sessionData } = await supabase
          .from('assessment_sessions')
          .select('id')
          .eq('user_id', user.id)
          .order('started_at', { ascending: false })
          .limit(1);

        if (sessionData?.[0]?.id) {
          const sessionId = sessionData[0].id;
          
          const answersToSave = Object.entries(newAnswers)
            .filter(([index]) => !(index in state.answers))
            .map(([questionIndex, answer]) => ({
              session_id: sessionId,
              question_number: parseInt(questionIndex) + 1,
              answer: answer.toString(),
              category: state.questions[parseInt(questionIndex)]?.category || 'General'
            }));

          if (answersToSave.length > 0) {
            await supabase
              .from('assessment_answers')
              .insert(answersToSave);
          }

          await supabase
            .from('assessment_sessions')
            .update({ 
              current_question: state.questions.length,
              completed: true,
              completed_at: new Date().toISOString()
            })
            .eq('id', sessionId);
        }
      } catch (err) {
        console.error('Error saving auto-answers:', err);
      }
    }

    if (state.assessmentType === 'career' || state.assessmentType === 'high-school') {
      calculateResults(newAnswers);
    } else {
      calculateAptitudeResults(newAnswers);
    }
  };

  const mapAssessmentTypeToSupabase = (type: AssessmentType): SupabaseAssessmentType => {
    switch (type) {
      case 'career':
        return 'grade_8_10';
      case 'high-school':
        return 'grade_11_12';
      default:
        return 'grade_8_10';
    }
  };

  return {
    currentQuestion: state.questions[state.currentIndex],
    currentIndex: state.currentIndex,
    totalQuestions: state.questions.length,
    answers: state.answers,
    completed: state.completed,
    results: state.results,
    assessmentType: state.assessmentType,
    setAssessmentType,
    loadAptitudeQuestions,
    loadHighSchoolQuestions,
    answerQuestion,
    goToNext,
    goToPrevious,
    skipQuestion,
    resetAssessment,
    autoAnswer,
    progress: state.questions.length ? 
      Math.round(((state.currentIndex) / state.questions.length) * 100) : 0
  };
};
