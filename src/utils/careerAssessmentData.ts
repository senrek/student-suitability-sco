import { v4 as uuidv4 } from 'uuid';
import { Question } from './mockData';

export interface CareerAssessmentQuestion extends Question {
  gradeLevel: string; // '11-12' or 'all'
}

export const careerAssessmentQuestions: CareerAssessmentQuestion[] = [
  // Academic Interests
  {
    id: uuidv4(),
    text: 'Which academic subjects do you find most engaging?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Mathematics and Sciences', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Humanities and Social Sciences', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'C) Business and Economics', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'technology', value: 3 }] },
      { text: 'D) Arts and Creative Subjects', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you prefer to study and learn?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Through practical experiments and hands-on activities', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 5 }] },
      { text: 'B) Through discussions and group work', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'education', value: 4 }] },
      { text: 'C) Through case studies and real-world examples', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'technology', value: 3 }] },
      { text: 'D) Through creative projects and visual learning', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'education', value: 3 }] }
    ]
  },

  // Career Preferences
  {
    id: uuidv4(),
    text: 'What type of work environment do you prefer?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Research labs and scientific facilities', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'B) Corporate offices and business settings', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Creative studios and design spaces', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 2 }] },
      { text: 'D) Community centers and social service organizations', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 3 }] }
    ]
  },

  // Skills and Abilities
  {
    id: uuidv4(),
    text: 'Which of these skills do you consider your strongest?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Analytical thinking and problem-solving', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Communication and interpersonal skills', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'business', value: 3 }] },
      { text: 'C) Creative thinking and innovation', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'technology', value: 3 }] },
      { text: 'D) Leadership and decision-making', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'education', value: 3 }] }
    ]
  },

  // Future Goals
  {
    id: uuidv4(),
    text: 'What are your primary career goals?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Making scientific discoveries and innovations', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Helping others and making a social impact', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'C) Building a successful business or organization', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'technology', value: 3 }] },
      { text: 'D) Creating artistic or cultural contributions', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] }
    ]
  },

  // Extracurricular Activities
  {
    id: uuidv4(),
    text: 'Which extracurricular activities interest you most?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Science clubs and competitions', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Social service and community programs', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'C) Business and entrepreneurship clubs', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'technology', value: 3 }] },
      { text: 'D) Art and cultural activities', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'education', value: 3 }] }
    ]
  },

  // Work Style
  {
    id: uuidv4(),
    text: 'How do you prefer to work?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Independently on detailed tasks', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Collaboratively in teams', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'business', value: 3 }] },
      { text: 'C) Leading and managing projects', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'education', value: 3 }] },
      { text: 'D) Creatively with flexible schedules', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'technology', value: 3 }] }
    ]
  },

  // Technology Interest
  {
    id: uuidv4(),
    text: 'How interested are you in technology and digital tools?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Very interested in programming and development', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Interested in using technology for business', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Interested in digital art and design', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'technology', value: 3 }] },
      { text: 'D) Interested in technology for social impact', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'technology', value: 3 }] }
    ]
  },

  // Problem-Solving Approach
  {
    id: uuidv4(),
    text: 'How do you typically approach problems?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Using systematic analysis and data', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Through discussion and collaboration', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'business', value: 3 }] },
      { text: 'C) Using creative and innovative solutions', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'technology', value: 3 }] },
      { text: 'D) Through strategic planning and organization', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'education', value: 3 }] }
    ]
  },

  // Career Values
  {
    id: uuidv4(),
    text: 'What matters most to you in a career?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Making scientific contributions', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Helping and supporting others', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'C) Achieving financial success', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'technology', value: 3 }] },
      { text: 'D) Expressing creativity and innovation', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you prefer physically active tasks over sitting and observing?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I enjoy active tasks', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'B) Sometimes, depending on the activity', clusterWeightage: [{ clusterId: 'engineering', value: 3 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'C) Rarely, I prefer balanced tasks', clusterWeightage: [{ clusterId: 'technology', value: 3 }, { clusterId: 'business', value: 3 }] },
      { text: 'D) No, I prefer passive activities', clusterWeightage: [{ clusterId: 'technology', value: 4 }, { clusterId: 'science', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy participating in stage performances, events, or art competitions?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love performing', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) Occasionally, if the event interests me', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 3 }] },
      { text: 'C) Rarely, I prefer to watch rather than participate', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'technology', value: 3 }] },
      { text: 'D) No, I avoid such activities', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'technology', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Are you comfortable speaking in debates, delivering speeches, or making presentations?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I enjoy public speaking', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'education', value: 5 }] },
      { text: 'B) Sometimes, if I feel prepared', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Only in small groups or familiar settings', clusterWeightage: [{ clusterId: 'social', value: 3 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'D) No, I dislike speaking in public', clusterWeightage: [{ clusterId: 'technology', value: 3 }, { clusterId: 'science', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like working with colors, patterns, and creative designs?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love creative work', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'B) Sometimes, if it interests me', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'education', value: 2 }] },
      { text: 'C) Rarely, but I appreciate creativity', clusterWeightage: [{ clusterId: 'science', value: 2 }, { clusterId: 'business', value: 2 }] },
      { text: 'D) No, I prefer non-creative tasks', clusterWeightage: [{ clusterId: 'engineering', value: 3 }, { clusterId: 'technology', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Can you visualize different designs, colors, and perspectives when imagining a scene?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I can clearly visualize details', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Somewhat, but not in detail', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'engineering', value: 3 }] },
      { text: 'C) Rarely, but I can imagine basic structures', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'business', value: 2 }] },
      { text: 'D) No, I struggle with visualization', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'social', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Are you good at persuading others to see things from your perspective?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I am very persuasive', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) Sometimes, depending on the situation', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'social', value: 3 }] },
      { text: 'C) Only with people I know well', clusterWeightage: [{ clusterId: 'education', value: 3 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'D) No, I find persuasion difficult', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'technology', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy participating in social events, volunteering, or community service?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love social engagement', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Sometimes, if it\'s a cause I care about', clusterWeightage: [{ clusterId: 'social', value: 3 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'C) Rarely, but I don\'t mind helping occasionally', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'science', value: 2 }] },
      { text: 'D) No, I prefer to stay away from such activities', clusterWeightage: [{ clusterId: 'technology', value: 3 }, { clusterId: 'science', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Are you curious about new technologies and how things work?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love learning about technology', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Sometimes, if it seems useful', clusterWeightage: [{ clusterId: 'technology', value: 3 }, { clusterId: 'engineering', value: 3 }] },
      { text: 'C) Rarely, I use technology but don\'t explore it deeply', clusterWeightage: [{ clusterId: 'arts', value: 2 }, { clusterId: 'social', value: 2 }] },
      { text: 'D) No, I have little interest in technology', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy fixing or repairing gadgets, appliances, or mechanical objects?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love fixing things', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Sometimes, if it\'s not too complex', clusterWeightage: [{ clusterId: 'engineering', value: 3 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Rarely, but I try when needed', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'healthcare', value: 2 }] },
      { text: 'D) No, I avoid such tasks', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you have an affinity for numbers and an interest in business and the economy?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I enjoy working with numbers and analyzing the economy', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'science', value: 3 }] },
      { text: 'B) Somewhat, I have a basic interest in business topics', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'science', value: 2 }] },
      { text: 'C) Rarely, I only focus on it when necessary', clusterWeightage: [{ clusterId: 'arts', value: 2 }, { clusterId: 'social', value: 2 }] },
      { text: 'D) No, I am not interested in numbers or business', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy taking part in science projects?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love science-related activities', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Sometimes, if the project interests me', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'education', value: 2 }] },
      { text: 'C) Rarely, but I find science useful', clusterWeightage: [{ clusterId: 'healthcare', value: 2 }, { clusterId: 'technology', value: 2 }] },
      { text: 'D) No, I do not enjoy science projects', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like taking photographs and collecting pictures?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love photography and visuals', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'technology', value: 3 }] },
      { text: 'B) Sometimes, I take pictures occasionally', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 2 }] },
      { text: 'C) Rarely, but I enjoy looking at photos', clusterWeightage: [{ clusterId: 'social', value: 2 }, { clusterId: 'education', value: 2 }] },
      { text: 'D) No, I am not interested in photography', clusterWeightage: [{ clusterId: 'engineering', value: 2 }, { clusterId: 'science', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like to put objects together or assemble them?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I enjoy assembling and building things', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Sometimes, if the task is interesting', clusterWeightage: [{ clusterId: 'engineering', value: 3 }, { clusterId: 'arts', value: 2 }] },
      { text: 'C) Rarely, I do it only when necessary', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'social', value: 2 }] },
      { text: 'D) No, I do not enjoy assembling objects', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'education', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy reading or watching science-related content (e.g., Discovery Channel, science magazines, etc.)?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love science-related media', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'B) Sometimes, if the topic is engaging', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'healthcare', value: 2 }] },
      { text: 'C) Rarely, but I do come across such content', clusterWeightage: [{ clusterId: 'technology', value: 2 }, { clusterId: 'engineering', value: 2 }] },
      { text: 'D) No, I am not interested in science content', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like to take command of situations and lead others?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I naturally take leadership roles', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) Sometimes, when needed', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Rarely, but I can lead if necessary', clusterWeightage: [{ clusterId: 'healthcare', value: 2 }, { clusterId: 'technology', value: 2 }] },
      { text: 'D) No, I prefer following others\' lead', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'technology', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Are you good at influencing people?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I can persuade and convince others easily', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) Sometimes, if I feel strongly about something', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Rarely, but I try to express my views', clusterWeightage: [{ clusterId: 'healthcare', value: 2 }, { clusterId: 'technology', value: 2 }] },
      { text: 'D) No, I do not like influencing others', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'engineering', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you often take part in outdoor sports, activities, or adventures?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love outdoor activities', clusterWeightage: [{ clusterId: 'healthcare', value: 4 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) Sometimes, depending on the sport or adventure', clusterWeightage: [{ clusterId: 'healthcare', value: 3 }, { clusterId: 'social', value: 3 }] },
      { text: 'C) Rarely, but I enjoy it occasionally', clusterWeightage: [{ clusterId: 'education', value: 2 }, { clusterId: 'business', value: 2 }] },
      { text: 'D) No, I prefer indoor activities', clusterWeightage: [{ clusterId: 'technology', value: 3 }, { clusterId: 'science', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy working with data, written records, and details?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love analyzing and organizing data', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) Sometimes, if it\'s necessary for my work', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Rarely, I prefer less detailed work', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 2 }] },
      { text: 'D) No, I do not like working with data', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'social', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like to plan, organize, and prioritize activities?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I am highly organized and enjoy planning', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Sometimes, when I need to manage tasks', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'C) Rarely, I prefer flexibility over planning', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'technology', value: 2 }] },
      { text: 'D) No, I do not like planning activities', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'social', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Are you very observant and notice creative things that others miss?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I often notice details others overlook', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) Sometimes, if it catches my interest', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Rarely, but I do appreciate creativity', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'engineering', value: 2 }] },
      { text: 'D) No, I don\'t usually notice such things', clusterWeightage: [{ clusterId: 'business', value: 1 }, { clusterId: 'technology', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy learning about other cultures?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love exploring different cultures', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Sometimes, if the topic interests me', clusterWeightage: [{ clusterId: 'social', value: 3 }, { clusterId: 'arts', value: 3 }] },
      { text: 'C) Rarely, but I do learn occasionally', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'science', value: 2 }] },
      { text: 'D) No, I have little interest in other cultures', clusterWeightage: [{ clusterId: 'engineering', value: 2 }, { clusterId: 'technology', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Can you concentrate for a long period without being distracted?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I have strong focus and concentration', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Sometimes, if the task is engaging', clusterWeightage: [{ clusterId: 'engineering', value: 3 }, { clusterId: 'business', value: 3 }] },
      { text: 'C) Rarely, I get distracted easily', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 2 }] },
      { text: 'D) No, I struggle to stay focused', clusterWeightage: [{ clusterId: 'arts', value: 2 }, { clusterId: 'social', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you love to explore more than what is being taught to you?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I always seek extra knowledge', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Sometimes, if I find the topic interesting', clusterWeightage: [{ clusterId: 'technology', value: 3 }, { clusterId: 'engineering', value: 3 }] },
      { text: 'C) Rarely, I prefer sticking to what is taught', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'healthcare', value: 2 }] },
      { text: 'D) No, I don\'t like going beyond the syllabus', clusterWeightage: [{ clusterId: 'business', value: 1 }, { clusterId: 'social', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like reading business news, newspapers, journals, and articles?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I regularly follow business updates', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'science', value: 3 }] },
      { text: 'B) Sometimes, if the news interests me', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'education', value: 2 }] },
      { text: 'C) Rarely, but I glance at headlines', clusterWeightage: [{ clusterId: 'social', value: 2 }, { clusterId: 'arts', value: 2 }] },
      { text: 'D) No, I don\'t enjoy business news', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'healthcare', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like power, status, and thrive on taking risks?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love leadership and taking risks', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'engineering', value: 3 }] },
      { text: 'B) Sometimes, if the situation demands it', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'technology', value: 2 }] },
      { text: 'C) Rarely, I prefer security over risk', clusterWeightage: [{ clusterId: 'healthcare', value: 3 }, { clusterId: 'education', value: 2 }] },
      { text: 'D) No, I avoid power struggles and risks', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'arts', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy working with a toolkit?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love using tools and fixing things', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Sometimes, if needed', clusterWeightage: [{ clusterId: 'engineering', value: 3 }, { clusterId: 'arts', value: 2 }] },
      { text: 'C) Rarely, but I can use tools when required', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'healthcare', value: 2 }] },
      { text: 'D) No, I don\'t enjoy working with tools', clusterWeightage: [{ clusterId: 'education', value: 2 }, { clusterId: 'social', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like documentation and preparing notes?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I am very organized with documentation', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'education', value: 5 }] },
      { text: 'B) Sometimes, if it helps me', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'C) Rarely, I don\'t enjoy writing detailed notes', clusterWeightage: [{ clusterId: 'arts', value: 2 }, { clusterId: 'engineering', value: 2 }] },
      { text: 'D) No, I dislike documentation', clusterWeightage: [{ clusterId: 'technology', value: 2 }, { clusterId: 'arts', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like to be involved in social welfare activities?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I actively participate in social work', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'B) Sometimes, if I feel connected to the cause', clusterWeightage: [{ clusterId: 'social', value: 3 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Rarely, but I support in small ways', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'science', value: 2 }] },
      { text: 'D) No, I don\'t involve in social activities', clusterWeightage: [{ clusterId: 'technology', value: 2 }, { clusterId: 'engineering', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy writing stories, fiction, plays, and other creative pieces?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love writing and storytelling', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Sometimes, if I get inspired', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 2 }] },
      { text: 'C) Rarely, but I appreciate good writing', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'science', value: 2 }] },
      { text: 'D) No, I am not interested in writing', clusterWeightage: [{ clusterId: 'engineering', value: 2 }, { clusterId: 'technology', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy taking part in hands-on projects to build objects or things?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love building and creating things', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Sometimes, if the project is interesting', clusterWeightage: [{ clusterId: 'engineering', value: 3 }, { clusterId: 'arts', value: 3 }] },
      { text: 'C) Rarely, but I can do it if needed', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'science', value: 2 }] },
      { text: 'D) No, I don\'t enjoy hands-on projects', clusterWeightage: [{ clusterId: 'social', value: 2 }, { clusterId: 'education', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like to interact, listen, and solve the personal issues of others?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I enjoy helping people with their problems', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'B) Sometimes, if I feel connected to the person', clusterWeightage: [{ clusterId: 'social', value: 3 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Rarely, but I try to be supportive', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'science', value: 2 }] },
      { text: 'D) No, I don\'t like dealing with personal issues', clusterWeightage: [{ clusterId: 'technology', value: 3 }, { clusterId: 'engineering', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you generally identify the flaws or mistakes in a document that others miss?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I have a keen eye for details', clusterWeightage: [{ clusterId: 'education', value: 4 }, { clusterId: 'business', value: 4 }] },
      { text: 'B) Sometimes, if I focus on it', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Rarely, but I notice obvious mistakes', clusterWeightage: [{ clusterId: 'arts', value: 2 }, { clusterId: 'social', value: 2 }] },
      { text: 'D) No, I don\'t pay much attention to details', clusterWeightage: [{ clusterId: 'social', value: 1 }, { clusterId: 'healthcare', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you ask lots of questions to understand how things work?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I am very curious about everything', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Sometimes, if something interests me', clusterWeightage: [{ clusterId: 'technology', value: 3 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Rarely, but I do ask occasionally', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'arts', value: 2 }] },
      { text: 'D) No, I don\'t ask many questions', clusterWeightage: [{ clusterId: 'social', value: 2 }, { clusterId: 'healthcare', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like to participate in a health camp?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I actively participate in health-related activities', clusterWeightage: [{ clusterId: 'healthcare', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) Sometimes, if it\'s a cause I support', clusterWeightage: [{ clusterId: 'healthcare', value: 3 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Rarely, but I don\'t mind helping', clusterWeightage: [{ clusterId: 'science', value: 2 }, { clusterId: 'business', value: 2 }] },
      { text: 'D) No, I am not interested in health camps', clusterWeightage: [{ clusterId: 'technology', value: 2 }, { clusterId: 'engineering', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like solving mind games or puzzles that require logic, such as chess, checkers, and Sudoku?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love logical puzzles and games', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Sometimes, if I find them interesting', clusterWeightage: [{ clusterId: 'engineering', value: 3 }, { clusterId: 'business', value: 3 }] },
      { text: 'C) Rarely, but I can play occasionally', clusterWeightage: [{ clusterId: 'healthcare', value: 2 }, { clusterId: 'education', value: 2 }] },
      { text: 'D) No, I don\'t enjoy logical games', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like to spend your time with nature, plants, or animals?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love being around nature and animals', clusterWeightage: [{ clusterId: 'healthcare', value: 4 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) Sometimes, if I get the chance', clusterWeightage: [{ clusterId: 'healthcare', value: 3 }, { clusterId: 'education', value: 2 }] },
      { text: 'C) Rarely, but I appreciate nature', clusterWeightage: [{ clusterId: 'social', value: 2 }, { clusterId: 'arts', value: 2 }] },
      { text: 'D) No, I don\'t enjoy spending time with nature', clusterWeightage: [{ clusterId: 'technology', value: 2 }, { clusterId: 'business', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy applying logic to solve complex problems?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I enjoy solving logical problems', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Sometimes, if I have enough time', clusterWeightage: [{ clusterId: 'technology', value: 3 }, { clusterId: 'business', value: 3 }] },
      { text: 'C) Rarely, but I can solve simple problems', clusterWeightage: [{ clusterId: 'healthcare', value: 2 }, { clusterId: 'education', value: 2 }] },
      { text: 'D) No, I don\'t like logical problem-solving', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like to show creativity using your imagination?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love expressing my creativity', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'B) Sometimes, if I feel inspired', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 2 }] },
      { text: 'C) Rarely, but I appreciate creativity', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'technology', value: 2 }] },
      { text: 'D) No, I don\'t enjoy creative tasks', clusterWeightage: [{ clusterId: 'science', value: 2 }, { clusterId: 'engineering', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy observing people and understanding their behavior?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love analyzing human behavior', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'B) Sometimes, if it interests me', clusterWeightage: [{ clusterId: 'social', value: 3 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Rarely, but I notice basic behaviors', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'science', value: 2 }] },
      { text: 'D) No, I don\'t focus on people\'s behavior', clusterWeightage: [{ clusterId: 'technology', value: 2 }, { clusterId: 'engineering', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like subjects like social science or psychology?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I enjoy these subjects a lot', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Sometimes, if the topic interests me', clusterWeightage: [{ clusterId: 'social', value: 3 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'C) Rarely, but I find some parts useful', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'arts', value: 2 }] },
      { text: 'D) No, I don\'t enjoy these subjects', clusterWeightage: [{ clusterId: 'engineering', value: 2 }, { clusterId: 'technology', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like working indoors and doing paperwork?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I prefer indoor tasks and paperwork', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) Sometimes, if necessary', clusterWeightage: [{ clusterId: 'education', value: 3 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Rarely, but I can manage it', clusterWeightage: [{ clusterId: 'arts', value: 2 }, { clusterId: 'social', value: 2 }] },
      { text: 'D) No, I dislike paperwork', clusterWeightage: [{ clusterId: 'healthcare', value: 3 }, { clusterId: 'engineering', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Are you good at arguing your point of view?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I am very confident in debates', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) Sometimes, if I feel strongly about the topic', clusterWeightage: [{ clusterId: 'education', value: 3 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Rarely, but I can try', clusterWeightage: [{ clusterId: 'healthcare', value: 2 }, { clusterId: 'science', value: 2 }] },
      { text: 'D) No, I don\'t like arguments', clusterWeightage: [{ clusterId: 'arts', value: 2 }, { clusterId: 'engineering', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy opening gadgets or toys to see their mechanism and how they work?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I have done it many times', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'technology', value: 5 }] },
      { text: 'B) Sometimes, if I\'m curious', clusterWeightage: [{ clusterId: 'engineering', value: 3 }, { clusterId: 'science', value: 3 }] },
      { text: 'C) Rarely, but I have tried it before', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'arts', value: 2 }] },
      { text: 'D) No, I\'m not interested in that', clusterWeightage: [{ clusterId: 'social', value: 2 }, { clusterId: 'healthcare', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Can you analyze and solve problems quickly in your head?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I am very good at quick problem-solving', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Sometimes, depending on the problem', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'engineering', value: 3 }] },
      { text: 'C) Rarely, but I can do basic analysis', clusterWeightage: [{ clusterId: 'healthcare', value: 2 }, { clusterId: 'education', value: 2 }] },
      { text: 'D) No, I struggle with quick problem-solving', clusterWeightage: [{ clusterId: 'arts', value: 2 }, { clusterId: 'social', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you find it easy to get involved in creative activities?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love engaging in creativity', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'B) Sometimes, if I find the activity interesting', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 2 }] },
      { text: 'C) Rarely, but I appreciate creativity', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'healthcare', value: 2 }] },
      { text: 'D) No, I don\'t enjoy creative activities', clusterWeightage: [{ clusterId: 'engineering', value: 2 }, { clusterId: 'technology', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you often discuss social issues in society?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I actively talk about social issues', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Sometimes, if I find the topic important', clusterWeightage: [{ clusterId: 'social', value: 3 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'C) Rarely, but I listen to discussions', clusterWeightage: [{ clusterId: 'business', value: 2 }, { clusterId: 'science', value: 2 }] },
      { text: 'D) No, I don\'t engage in such discussions', clusterWeightage: [{ clusterId: 'technology', value: 2 }, { clusterId: 'engineering', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you follow a budget, economic policies, or financial news?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I regularly keep track of financial updates', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'science', value: 3 }] },
      { text: 'B) Sometimes, if it\'s relevant to me', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'education', value: 2 }] },
      { text: 'C) Rarely, but I check financial news occasionally', clusterWeightage: [{ clusterId: 'social', value: 2 }, { clusterId: 'healthcare', value: 2 }] },
      { text: 'D) No, I don\'t follow finance-related topics', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'technology', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you like to demonstrate new ideas or concepts?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Yes, I love sharing and presenting ideas', clusterWeightage: [{ clusterId: 'education', value: 5 }, { clusterId: 'business', value: 4 }] },
      { text: 'B) Sometimes, if the concept interests me', clusterWeightage: [{ clusterId: 'science', value: 3 }, { clusterId: 'social', value: 3 }] },
      { text: 'C) Rarely, but I can explain when needed', clusterWeightage: [{ clusterId: 'healthcare', value: 2 }, { clusterId: 'arts', value: 2 }] },
      { text: 'D) No, I don\'t enjoy demonstrating concepts', clusterWeightage: [{ clusterId: 'engineering', value: 2 }, { clusterId: 'technology', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which activity would you like the most?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Lead People', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) Help People', clusterWeightage: [{ clusterId: 'healthcare', value: 5 }, { clusterId: 'education', value: 5 }] },
      { text: 'C) Organize Data or Things', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'technology', value: 4 }] },
      { text: 'D) Analyze Problems', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'E) Build or Fix Objects', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'F) Design or Decorate Objects', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What do you like most?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Social Activities', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'B) Managing Tasks', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'engineering', value: 3 }] },
      { text: 'C) Influencing People', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'social', value: 4 }] },
      { text: 'D) Creativity', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'technology', value: 2 }] },
      { text: 'E) Research', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'F) Outdoor and Physical Activities', clusterWeightage: [{ clusterId: 'healthcare', value: 4 }, { clusterId: 'engineering', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you see yourself?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Precise, Scientific, and Intellectual', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Expressive, Imaginative, and Creative', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Helpful, Friendly, and Trustworthy', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Energetic, Influential, and Sociable', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'E) Planned, Organized, and Accurate', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'F) Practical, Mechanical, and Physically Active', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'healthcare', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I usually like to have many people around me', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'business', value: 4 }] },
      { text: 'B) I enjoy spending time with myself', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'arts', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I talk more than I listen', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) I listen more than I talk', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'healthcare', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) It is easy for me to approach other individuals and make new friends', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'business', value: 4 }] },
      { text: 'B) I am more likely to be the reserved type and I approach new relationships carefully', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'technology', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I usually act first before I think', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'social', value: 3 }] },
      { text: 'B) I usually think first before I act', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I develop new ideas through discussion', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) I develop new ideas when I focus within myself', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'arts', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I can easily be distracted while doing a task', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 3 }] },
      { text: 'B) I can focus on a task for a longer duration without being distracted easily', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I like to learn new things through observation and practical activities', clusterWeightage: [{ clusterId: 'engineering', value: 4 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'B) I like to learn new things through intensive thinking and imagination', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'arts', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I like to do things in proven ways', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'B) I like to do things in new ways', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'technology', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I usually begin with facts and then build a bigger idea', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) I usually build a bigger idea and then find out facts', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'business', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I prefer to trust my actual experience', clusterWeightage: [{ clusterId: 'healthcare', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) I prefer to trust my gut instincts', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'social', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I apply details and facts in my assignments', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'business', value: 4 }] },
      { text: 'B) I apply new ideas in my assignments', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'technology', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I prefer practical solutions in solving issues', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'B) I prefer creative solutions in solving issues', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'technology', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I prefer to learn step by step in a structured way', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'business', value: 4 }] },
      { text: 'B) I prefer to learn in a non-orderly, random manner', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'social', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you take decisions?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I usually take decisions with my head and focus on facts', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) I usually take decisions with my heart and consider others\' feelings', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) Usually, I am not sensitive to other people\'s opinions and comments about me', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) I am sensitive to other people\'s opinions and comments about me', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'social', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I see myself as a precise, scientific, and intellectual person', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) I see myself as a helpful, friendly, and caring person', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 5 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I am usually tough-minded', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) I am usually soft-hearted', clusterWeightage: [{ clusterId: 'healthcare', value: 5 }, { clusterId: 'social', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I usually give direct and honest opinions to others', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) I am usually careful not to hurt others with my comments', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I am motivated by achievement', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) I am motivated by appreciation', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'arts', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I give more importance to facts, tasks, and logical considerations', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) I give more importance to the personal value system and social considerations', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I like to make plans and schedules and try to stick with them', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) I like to be flexible and keep plans to a minimum', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'social', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I usually take tasks without making a plan', clusterWeightage: [{ clusterId: 'arts', value: 3 }, { clusterId: 'social', value: 3 }] },
      { text: 'B) I usually plan everything first in advance before moving into action', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'business', value: 5 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which option describes you best?',
    gradeLevel: '11-12',
    options: [
      { text: 'A) I often juggle multiple tasks at a time', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'social', value: 3 }] },
      { text: 'B) I usually do one task at a time', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 4 }] }
    ]
  }
];

