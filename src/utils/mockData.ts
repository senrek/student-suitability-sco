
import { v4 as uuidv4 } from 'uuid';

export interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    clusterWeightage: {
      clusterId: string;
      value: number;
    }[];
  }[];
  // Optional fields for aptitude questions
  category?: string;
  correctAnswer?: number;
  imageUrl?: string;
  gradeLevel?: string;
}

export interface CareerCluster {
  id: string;
  name: string;
  description: string;
  careers: string[];
  resources: {
    title: string;
    url: string;
  }[];
}

// Career clusters data
export const mockCareerClusters: CareerCluster[] = [
  {
    id: 'science',
    name: 'Science & Research',
    description: 'This cluster focuses on investigating, researching, and understanding natural phenomena through systematic observation and experimentation.',
    careers: ['Research Scientist', 'Biochemist', 'Astronomer', 'Ecologist', 'Laboratory Technician'],
    resources: [
      { title: 'Science Career Resources for Students', url: 'https://www.sciencebuddies.org/science-engineering-careers' },
      { title: 'STEM Education Guide', url: 'https://www.usa.gov/stem' }
    ]
  },
  {
    id: 'technology',
    name: 'Technology & Computing',
    description: 'This cluster involves developing, maintaining, and using computer systems, software, and related technologies to process and distribute information.',
    careers: ['Software Developer', 'Web Designer', 'Data Scientist', 'IT Support Specialist', 'Cybersecurity Analyst'],
    resources: [
      { title: 'Computer Science Education Resources', url: 'https://code.org/' },
      { title: 'Tech Career Pathways', url: 'https://www.comptia.org/content/it-careers-path-roadmap' }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medicine',
    description: 'This cluster focuses on the diagnosis, treatment, and prevention of disease, injury, and other physical and mental impairments in humans.',
    careers: ['Physician', 'Nurse', 'Physical Therapist', 'Medical Technologist', 'Healthcare Administrator'],
    resources: [
      { title: 'Health Careers Information', url: 'https://explorehealthcareers.org/' },
      { title: 'Medical Education Resources', url: 'https://www.aamc.org/students' }
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering & Design',
    description: 'This cluster involves the application of scientific and mathematical principles to design, build, and maintain structures, machines, systems, and processes.',
    careers: ['Civil Engineer', 'Mechanical Engineer', 'Electrical Engineer', 'Aerospace Engineer', 'Biomedical Engineer'],
    resources: [
      { title: 'Engineering Career Resources', url: 'https://www.tryengineering.org/' },
      { title: 'Engineering Design Process', url: 'https://www.teachengineering.org/' }
    ]
  },
  {
    id: 'arts',
    name: 'Creative Arts & Design',
    description: 'This cluster involves creating and designing visual, performing, and literary arts for aesthetic and communicative purposes.',
    careers: ['Graphic Designer', 'Animator', 'Fashion Designer', 'Photographer', 'Interior Designer'],
    resources: [
      { title: 'Arts Education Resources', url: 'https://www.arteducators.org/' },
      { title: 'Creative Career Paths', url: 'https://www.creativelive.com/' }
    ]
  },
  {
    id: 'business',
    name: 'Business & Management',
    description: 'This cluster involves planning, organizing, directing, and evaluating business functions to ensure efficiency and effectiveness.',
    careers: ['Business Analyst', 'Marketing Manager', 'Financial Advisor', 'Human Resources Specialist', 'Entrepreneur'],
    resources: [
      { title: 'Business Education Resources', url: 'https://www.sba.gov/business-guide' },
      { title: 'Management Career Paths', url: 'https://www.bls.gov/ooh/management/' }
    ]
  },
  {
    id: 'education',
    name: 'Education & Training',
    description: 'This cluster involves teaching, training, and supporting the learning and development of individuals across different age groups and subjects.',
    careers: ['Teacher', 'School Counselor', 'Education Administrator', 'Special Education Specialist', 'Corporate Trainer'],
    resources: [
      { title: 'Teaching Career Resources', url: 'https://teach.org/' },
      { title: 'Education Career Paths', url: 'https://www.bls.gov/ooh/education-training-and-library/' }
    ]
  },
  {
    id: 'social',
    name: 'Social Services & Community',
    description: 'This cluster involves providing services to improve the social and psychological functioning of individuals, families, and communities.',
    careers: ['Social Worker', 'Counselor', 'Community Outreach Coordinator', 'Nonprofit Manager', 'Child Welfare Specialist'],
    resources: [
      { title: 'Social Work Resources', url: 'https://www.socialworkers.org/' },
      { title: 'Community Service Careers', url: 'https://www.nationalservice.gov/' }
    ]
  }
];

// Assessment questions - Updated with new comprehensive question set
export const mockQuestions: Question[] = [
  // Leadership & Decision-Making Questions
  {
    id: uuidv4(),
    text: 'How do you make crucial decisions?',
    options: [
      {
        text: 'My decision goes along with the majority.',
        clusterWeightage: [
          { clusterId: 'social', value: 4 },
          { clusterId: 'education', value: 3 }
        ]
      },
      {
        text: 'I make decisions on my own.',
        clusterWeightage: [
          { clusterId: 'business', value: 5 },
          { clusterId: 'engineering', value: 3 }
        ]
      },
      {
        text: 'I take advice before deciding.',
        clusterWeightage: [
          { clusterId: 'healthcare', value: 4 },
          { clusterId: 'education', value: 4 },
          { clusterId: 'business', value: 3 }
        ]
      },
      {
        text: 'I follow others\' decisions.',
        clusterWeightage: [
          { clusterId: 'social', value: 2 }
        ]
      },
      {
        text: 'Others decide for me.',
        clusterWeightage: [
          { clusterId: 'social', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'If a team member struggles, what would you do?',
    options: [
      {
        text: 'Take over their tasks.',
        clusterWeightage: [
          { clusterId: 'business', value: 3 },
          { clusterId: 'engineering', value: 2 }
        ]
      },
      {
        text: 'Assign easier tasks.',
        clusterWeightage: [
          { clusterId: 'business', value: 3 },
          { clusterId: 'education', value: 3 }
        ]
      },
      {
        text: 'Offer help and support.',
        clusterWeightage: [
          { clusterId: 'healthcare', value: 5 },
          { clusterId: 'education', value: 5 },
          { clusterId: 'social', value: 5 }
        ]
      },
      {
        text: 'Ignore and focus on your work.',
        clusterWeightage: [
          { clusterId: 'science', value: 2 },
          { clusterId: 'technology', value: 2 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'I can determine the best solution to a problem.',
    options: [
      {
        text: 'Almost always',
        clusterWeightage: [
          { clusterId: 'engineering', value: 5 },
          { clusterId: 'business', value: 5 },
          { clusterId: 'science', value: 5 }
        ]
      },
      {
        text: 'Usually',
        clusterWeightage: [
          { clusterId: 'engineering', value: 4 },
          { clusterId: 'business', value: 4 },
          { clusterId: 'science', value: 4 }
        ]
      },
      {
        text: 'Sometimes',
        clusterWeightage: [
          { clusterId: 'engineering', value: 3 },
          { clusterId: 'business', value: 3 },
          { clusterId: 'science', value: 3 }
        ]
      },
      {
        text: 'Rarely',
        clusterWeightage: [
          { clusterId: 'arts', value: 2 },
          { clusterId: 'social', value: 2 }
        ]
      },
      {
        text: 'Never',
        clusterWeightage: [
          { clusterId: 'arts', value: 1 },
          { clusterId: 'social', value: 1 }
        ]
      }
    ]
  },
  
  // Administrative & Organizational Skills
  {
    id: uuidv4(),
    text: 'Do you plan your work?',
    options: [
      {
        text: 'Plan at the last moment.',
        clusterWeightage: [
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'Plan when time is minimal.',
        clusterWeightage: [
          { clusterId: 'technology', value: 2 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'Schedule before starting.',
        clusterWeightage: [
          { clusterId: 'business', value: 5 },
          { clusterId: 'engineering', value: 4 },
          { clusterId: 'healthcare', value: 4 }
        ]
      },
      {
        text: 'No planning (waste of time).',
        clusterWeightage: [
          { clusterId: 'arts', value: 2 }
        ]
      },
      {
        text: 'Plan while working.',
        clusterWeightage: [
          { clusterId: 'technology', value: 3 },
          { clusterId: 'arts', value: 3 }
        ]
      }
    ]
  },
  
  // Mechanical/Logical Reasoning
  {
    id: uuidv4(),
    text: 'Pendulums with the same weight: Which swings faster?',
    options: [
      {
        text: 'A',
        clusterWeightage: [
          { clusterId: 'science', value: 2 },
          { clusterId: 'engineering', value: 2 }
        ]
      },
      {
        text: 'B',
        clusterWeightage: [
          { clusterId: 'science', value: 4 },
          { clusterId: 'engineering', value: 4 }
        ]
      },
      {
        text: 'Both swing at the same pace',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: 'Not Sure',
        clusterWeightage: [
          { clusterId: 'arts', value: 1 },
          { clusterId: 'social', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'If a car and a bowling ball went off a 100-metre cliff at the same time, which would hit the ground first? (Do not consider air friction)',
    options: [
      {
        text: 'Car',
        clusterWeightage: [
          { clusterId: 'science', value: 1 }
        ]
      },
      {
        text: 'Bowling Ball',
        clusterWeightage: [
          { clusterId: 'science', value: 1 }
        ]
      },
      {
        text: 'Both will hit the ground at the same time',
        clusterWeightage: [
          { clusterId: 'science', value: 5 },
          { clusterId: 'engineering', value: 5 }
        ]
      },
      {
        text: 'Not Sure',
        clusterWeightage: [
          { clusterId: 'arts', value: 1 },
          { clusterId: 'social', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'In which direction will the gear on the right turn?',
    options: [
      {
        text: 'Clockwise',
        clusterWeightage: [
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: 'Anti-Clockwise',
        clusterWeightage: [
          { clusterId: 'engineering', value: 5 },
          { clusterId: 'science', value: 4 }
        ]
      },
      {
        text: 'It will be steady',
        clusterWeightage: [
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: 'Not sure',
        clusterWeightage: [
          { clusterId: 'arts', value: 1 },
          { clusterId: 'social', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'A sister weighs 100 Kg and her brother weighs 50 Kg. If the brother is sitting 6 meters from the pivot (midpoint), how many meters should the sister sit to balance the seesaw?',
    options: [
      {
        text: '6 meters',
        clusterWeightage: [
          { clusterId: 'engineering', value: 1 },
          { clusterId: 'science', value: 1 }
        ]
      },
      {
        text: '5 meters',
        clusterWeightage: [
          { clusterId: 'engineering', value: 1 },
          { clusterId: 'science', value: 1 }
        ]
      },
      {
        text: '4 meters',
        clusterWeightage: [
          { clusterId: 'engineering', value: 1 },
          { clusterId: 'science', value: 1 }
        ]
      },
      {
        text: '3 meters',
        clusterWeightage: [
          { clusterId: 'engineering', value: 5 },
          { clusterId: 'science', value: 5 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Two men are carrying a heavy box using a plank. Who is carrying most of the load?',
    options: [
      {
        text: 'A',
        clusterWeightage: [
          { clusterId: 'engineering', value: 1 },
          { clusterId: 'science', value: 1 }
        ]
      },
      {
        text: 'B',
        clusterWeightage: [
          { clusterId: 'engineering', value: 5 },
          { clusterId: 'science', value: 4 }
        ]
      },
      {
        text: 'Both are carrying equal amount.',
        clusterWeightage: [
          { clusterId: 'engineering', value: 1 },
          { clusterId: 'science', value: 1 }
        ]
      },
      {
        text: 'None of the above',
        clusterWeightage: [
          { clusterId: 'arts', value: 1 },
          { clusterId: 'social', value: 1 }
        ]
      }
    ]
  },
  
  // Verbal Ability
  {
    id: uuidv4(),
    text: 'Find the verb in the sentence: The goats crossed the stream.',
    options: [
      {
        text: 'The',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      },
      {
        text: 'goats',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      },
      {
        text: 'crossed',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'the',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      },
      {
        text: 'stream',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Find the word with the correct spelling.',
    options: [
      {
        text: 'Sacrifice',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'Occasion',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'Ocurrence',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      },
      {
        text: 'Intelligence',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'Continuous',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'arts', value: 3 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Spot the grammatical error in: (A)/ The teacher was angry (B)/ when he found that (C)/ you are not there (D)/ in the class.',
    options: [
      {
        text: 'Error in clause A',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      },
      {
        text: 'Error in clause B',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      },
      {
        text: 'Error in clause C',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'Error in clause D',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Fill in the blanks: I have ______ the presentation for you. I ______ it during my lunch break.',
    options: [
      {
        text: 'wrote & done',
        clusterWeightage: [
          { clusterId: 'education', value: 2 }
        ]
      },
      {
        text: 'prepared & did',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'write & did',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      },
      {
        text: 'prepared & done',
        clusterWeightage: [
          { clusterId: 'education', value: 2 }
        ]
      },
      {
        text: 'None of the above',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Pick the most appropriate word: The grapes are now ….. enough to be picked.',
    options: [
      {
        text: 'Ready',
        clusterWeightage: [
          { clusterId: 'education', value: 2 }
        ]
      },
      {
        text: 'Mature',
        clusterWeightage: [
          { clusterId: 'education', value: 3 }
        ]
      },
      {
        text: 'Ripe',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'Advanced',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      },
      {
        text: 'Full',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      }
    ]
  },
  
  // Numerical Ability
  {
    id: uuidv4(),
    text: 'Which one is a prime number?',
    options: [
      {
        text: '33',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: '81',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: '93',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: '83',
        clusterWeightage: [
          { clusterId: 'science', value: 5 },
          { clusterId: 'engineering', value: 5 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'If 7 spiders spin 7 webs in 7 days, then how many days will a spider take to spin a web?',
    options: [
      {
        text: '7',
        clusterWeightage: [
          { clusterId: 'science', value: 5 },
          { clusterId: 'engineering', value: 5 }
        ]
      },
      {
        text: '5',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: '3',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: '2',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: '1',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Find the series: 4, 8, 16, 32, ---?',
    options: [
      {
        text: '48',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: '64',
        clusterWeightage: [
          { clusterId: 'science', value: 5 },
          { clusterId: 'engineering', value: 5 }
        ]
      },
      {
        text: '40',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: '50',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      }
    ]
  },
  
  // Logical Reasoning
  {
    id: uuidv4(),
    text: 'Some greens are blue. No blues are white. Therefore:',
    options: [
      {
        text: 'Some greens are white',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: 'No whites are green',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: 'No greens are white',
        clusterWeightage: [
          { clusterId: 'science', value: 5 },
          { clusterId: 'engineering', value: 5 }
        ]
      },
      {
        text: 'None of the above',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'engineering', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Pick the odd one out:',
    options: [
      {
        text: 'Index',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'Glossary',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      },
      {
        text: 'Chapter',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      },
      {
        text: 'Book',
        clusterWeightage: [
          { clusterId: 'education', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Complete the following series: BD CEF DFGH ?',
    options: [
      {
        text: 'EGHIJ',
        clusterWeightage: [
          { clusterId: 'science', value: 5 },
          { clusterId: 'technology', value: 4 }
        ]
      },
      {
        text: 'EGHI',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'technology', value: 1 }
        ]
      },
      {
        text: 'EHGIJ',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'technology', value: 1 }
        ]
      },
      {
        text: 'EGHIJK',
        clusterWeightage: [
          { clusterId: 'science', value: 1 },
          { clusterId: 'technology', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Statement I - The government has imported large quantities of sugar as per trade agreement with other countries. Statement II - The prices of sugar in the domestic market have fallen sharply in the recent months.',
    options: [
      {
        text: 'Statement I is the cause and statement II is its effect.',
        clusterWeightage: [
          { clusterId: 'business', value: 5 },
          { clusterId: 'science', value: 3 }
        ]
      },
      {
        text: 'Statement II is the cause and statement I is its effect.',
        clusterWeightage: [
          { clusterId: 'business', value: 1 },
          { clusterId: 'science', value: 1 }
        ]
      },
      {
        text: 'Both the statements I and II are independent causes.',
        clusterWeightage: [
          { clusterId: 'business', value: 1 },
          { clusterId: 'science', value: 1 }
        ]
      },
      {
        text: 'Both the statements I and II are effects of another common cause.',
        clusterWeightage: [
          { clusterId: 'business', value: 1 },
          { clusterId: 'science', value: 1 }
        ]
      }
    ]
  },
  
  // Career Preferences & Personality
  {
    id: uuidv4(),
    text: 'What do you like most?',
    options: [
      {
        text: 'Social Activities',
        clusterWeightage: [
          { clusterId: 'social', value: 5 },
          { clusterId: 'education', value: 3 }
        ]
      },
      {
        text: 'Managing tasks',
        clusterWeightage: [
          { clusterId: 'business', value: 5 },
          { clusterId: 'engineering', value: 3 }
        ]
      },
      {
        text: 'Influencing People',
        clusterWeightage: [
          { clusterId: 'business', value: 4 },
          { clusterId: 'social', value: 4 }
        ]
      },
      {
        text: 'Creativity',
        clusterWeightage: [
          { clusterId: 'arts', value: 5 },
          { clusterId: 'technology', value: 2 }
        ]
      },
      {
        text: 'Research',
        clusterWeightage: [
          { clusterId: 'science', value: 5 },
          { clusterId: 'healthcare', value: 3 }
        ]
      },
      {
        text: 'Outdoor and Physical Activities',
        clusterWeightage: [
          { clusterId: 'social', value: 3 },
          { clusterId: 'healthcare', value: 2 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you see yourself?',
    options: [
      {
        text: 'Precise, Scientific, Intellectual',
        clusterWeightage: [
          { clusterId: 'science', value: 5 },
          { clusterId: 'engineering', value: 4 },
          { clusterId: 'healthcare', value: 3 }
        ]
      },
      {
        text: 'Expressive, Imaginative, Creative',
        clusterWeightage: [
          { clusterId: 'arts', value: 5 },
          { clusterId: 'education', value: 3 }
        ]
      },
      {
        text: 'Helpful, Friendly, Trustworthy',
        clusterWeightage: [
          { clusterId: 'social', value: 5 },
          { clusterId: 'education', value: 4 },
          { clusterId: 'healthcare', value: 4 }
        ]
      },
      {
        text: 'Energetic, Influential, Sociable',
        clusterWeightage: [
          { clusterId: 'business', value: 5 },
          { clusterId: 'social', value: 4 }
        ]
      },
      {
        text: 'Planned, Organized, Accurate',
        clusterWeightage: [
          { clusterId: 'business', value: 4 },
          { clusterId: 'engineering', value: 4 },
          { clusterId: 'technology', value: 4 }
        ]
      },
      {
        text: 'Practical, Mechanical, Physically Active',
        clusterWeightage: [
          { clusterId: 'engineering', value: 5 },
          { clusterId: 'healthcare', value: 3 }
        ]
      }
    ]
  },
  
  // Self-Assessment Questions
  {
    id: uuidv4(),
    text: 'Which describes you best?',
    options: [
      {
        text: 'I prefer having people around me',
        clusterWeightage: [
          { clusterId: 'social', value: 5 },
          { clusterId: 'business', value: 4 },
          { clusterId: 'education', value: 4 }
        ]
      },
      {
        text: 'I prefer spending time alone',
        clusterWeightage: [
          { clusterId: 'science', value: 4 },
          { clusterId: 'technology', value: 4 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'I talk more than I listen',
        clusterWeightage: [
          { clusterId: 'business', value: 4 },
          { clusterId: 'social', value: 3 }
        ]
      },
      {
        text: 'I listen more than I talk',
        clusterWeightage: [
          { clusterId: 'science', value: 3 },
          { clusterId: 'healthcare', value: 4 },
          { clusterId: 'education', value: 4 }
        ]
      },
      {
        text: 'I approach others easily',
        clusterWeightage: [
          { clusterId: 'business', value: 5 },
          { clusterId: 'social', value: 5 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you work?',
    options: [
      {
        text: 'I act first, then think',
        clusterWeightage: [
          { clusterId: 'business', value: 3 },
          { clusterId: 'arts', value: 3 }
        ]
      },
      {
        text: 'I think first, then act',
        clusterWeightage: [
          { clusterId: 'science', value: 5 },
          { clusterId: 'engineering', value: 5 },
          { clusterId: 'healthcare', value: 4 }
        ]
      },
      {
        text: 'I develop ideas through discussion',
        clusterWeightage: [
          { clusterId: 'social', value: 4 },
          { clusterId: 'education', value: 4 },
          { clusterId: 'business', value: 3 }
        ]
      },
      {
        text: 'I develop ideas through introspection',
        clusterWeightage: [
          { clusterId: 'science', value: 4 },
          { clusterId: 'arts', value: 4 },
          { clusterId: 'technology', value: 3 }
        ]
      },
      {
        text: 'I easily get distracted',
        clusterWeightage: [
          { clusterId: 'arts', value: 3 }
        ]
      }
    ]
  },
  
  // Learning Style Questions
  {
    id: uuidv4(),
    text: 'To learn a computer, would you rather:',
    options: [
      {
        text: 'Watch a video',
        clusterWeightage: [
          { clusterId: 'arts', value: 4 },
          { clusterId: 'education', value: 3 }
        ]
      },
      {
        text: 'Listen to instructions',
        clusterWeightage: [
          { clusterId: 'social', value: 3 },
          { clusterId: 'education', value: 3 }
        ]
      },
      {
        text: 'Disassemble and explore it',
        clusterWeightage: [
          { clusterId: 'technology', value: 5 },
          { clusterId: 'engineering', value: 5 }
        ]
      },
      {
        text: 'Read instructions',
        clusterWeightage: [
          { clusterId: 'science', value: 4 },
          { clusterId: 'technology', value: 3 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'When studying, you learn better by:',
    options: [
      {
        text: 'Rewriting notes',
        clusterWeightage: [
          { clusterId: 'science', value: 4 },
          { clusterId: 'education', value: 4 }
        ]
      },
      {
        text: 'Listening & discussing',
        clusterWeightage: [
          { clusterId: 'social', value: 5 },
          { clusterId: 'education', value: 4 }
        ]
      },
      {
        text: 'Practicums & experiments',
        clusterWeightage: [
          { clusterId: 'science', value: 5 },
          { clusterId: 'engineering', value: 5 },
          { clusterId: 'healthcare', value: 4 }
        ]
      },
      {
        text: 'Visual diagrams & charts',
        clusterWeightage: [
          { clusterId: 'arts', value: 4 },
          { clusterId: 'technology', value: 3 }
        ]
      }
    ]
  },
  
  // Scenario-Based Questions
  {
    id: uuidv4(),
    text: 'You find that your friend\'s performance in school is going down. What will you do?',
    options: [
      {
        text: 'Inform parents/teachers for help.',
        clusterWeightage: [
          { clusterId: 'education', value: 4 },
          { clusterId: 'social', value: 3 }
        ]
      },
      {
        text: 'Help improve their performance.',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'social', value: 4 }
        ]
      },
      {
        text: 'Understand the reason behind the decline.',
        clusterWeightage: [
          { clusterId: 'social', value: 5 },
          { clusterId: 'healthcare', value: 4 }
        ]
      },
      {
        text: 'Ask a common friend to help.',
        clusterWeightage: [
          { clusterId: 'social', value: 3 }
        ]
      },
      {
        text: 'Feel good about outperforming them.',
        clusterWeightage: [
          { clusterId: 'business', value: 1 }
        ]
      }
    ]
  },
  
  // Career Interest Questions
  {
    id: uuidv4(),
    text: 'Would you like to work in managing airports and airline operations?',
    options: [
      {
        text: 'Yes',
        clusterWeightage: [
          { clusterId: 'business', value: 5 },
          { clusterId: 'engineering', value: 3 }
        ]
      },
      {
        text: 'Not Sure',
        clusterWeightage: [
          { clusterId: 'business', value: 2 },
          { clusterId: 'engineering', value: 1 }
        ]
      },
      {
        text: 'No',
        clusterWeightage: [
          { clusterId: 'arts', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Would you like to work in creating art using visual techniques?',
    options: [
      {
        text: 'Yes',
        clusterWeightage: [
          { clusterId: 'arts', value: 5 }
        ]
      },
      {
        text: 'Not Sure',
        clusterWeightage: [
          { clusterId: 'arts', value: 2 }
        ]
      },
      {
        text: 'No',
        clusterWeightage: [
          { clusterId: 'engineering', value: 1 },
          { clusterId: 'science', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Would you like to work in analyzing data for business decisions?',
    options: [
      {
        text: 'Yes',
        clusterWeightage: [
          { clusterId: 'business', value: 5 },
          { clusterId: 'technology', value: 4 }
        ]
      },
      {
        text: 'Not Sure',
        clusterWeightage: [
          { clusterId: 'business', value: 2 },
          { clusterId: 'technology', value: 2 }
        ]
      },
      {
        text: 'No',
        clusterWeightage: [
          { clusterId: 'arts', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Would you like to work in designing everyday products?',
    options: [
      {
        text: 'Yes',
        clusterWeightage: [
          { clusterId: 'arts', value: 4 },
          { clusterId: 'engineering', value: 4 }
        ]
      },
      {
        text: 'Not Sure',
        clusterWeightage: [
          { clusterId: 'arts', value: 2 },
          { clusterId: 'engineering', value: 2 }
        ]
      },
      {
        text: 'No',
        clusterWeightage: [
          { clusterId: 'science', value: 1 }
        ]
      }
    ]
  },
  {
    id: uuidv4(),
    text: 'Would you like to work in humanities research (history, philosophy, etc.)?',
    options: [
      {
        text: 'Yes',
        clusterWeightage: [
          { clusterId: 'education', value: 5 },
          { clusterId: 'social', value: 4 }
        ]
      },
      {
        text: 'Not Sure',
        clusterWeightage: [
          { clusterId: 'education', value: 2 },
          { clusterId: 'social', value: 2 }
        ]
      },
      {
        text: 'No',
        clusterWeightage: [
          { clusterId: 'engineering', value: 1 },
          { clusterId: 'technology', value: 1 }
        ]
      }
    ]
  }
];

