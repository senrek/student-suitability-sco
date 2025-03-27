
import { v4 as uuidv4 } from 'uuid';
import { Question } from './mockData';

// Define different categories of aptitude test questions
export type AptitudeCategory = 'Numerical Ability' | 'Logical Ability' | 'Verbal Ability';

// Extending the Question type to include aptitude-specific fields
export interface AptitudeQuestion extends Question {
  category: AptitudeCategory;
  gradeLevel: string; // '8', '9', '10', or 'all'
  correctAnswer: number; // The index of the correct option
  imageUrl?: string; // For questions with images
}

export const aptitudeQuestions: AptitudeQuestion[] = [
  // Numerical Ability questions from the provided images
  {
    id: uuidv4(),
    category: 'Numerical Ability',
    gradeLevel: '8',
    text: 'If 7 spiders spin 7 webs in 7 days, then how many days will a spider take to spin a web?',
    correctAnswer: 2, // Index of the correct option (corresponding to '7')
    options: [
      { text: '7', clusterWeightage: [] },
      { text: '5', clusterWeightage: [] },
      { text: '3', clusterWeightage: [] },
      { text: '2', clusterWeightage: [] },
      { text: '1', clusterWeightage: [] }
    ]
  },
  {
    id: uuidv4(),
    category: 'Numerical Ability',
    gradeLevel: '8',
    text: 'A jar is filled with an even number of chocolates by a shopkeeper. How many chocolates did he put in the jar? Choose an option below -',
    correctAnswer: 4, // Index of the correct option (corresponding to '13')
    options: [
      { text: '999', clusterWeightage: [] },
      { text: '903', clusterWeightage: [] },
      { text: '900', clusterWeightage: [] },
      { text: '997', clusterWeightage: [] },
      { text: '13', clusterWeightage: [] }
    ]
  },
  {
    id: uuidv4(),
    category: 'Numerical Ability',
    gradeLevel: '8',
    text: 'Find the circle colored by 3/4th',
    correctAnswer: 0, // Index of the correct option (corresponding to 'D')
    imageUrl: '/lovable-uploads/15459de0-89ca-4036-bcd5-2f04773ee238.png',
    options: [
      { text: 'D', clusterWeightage: [] },
      { text: 'A', clusterWeightage: [] },
      { text: 'C', clusterWeightage: [] },
      { text: 'B', clusterWeightage: [] },
      { text: 'E', clusterWeightage: [] }
    ]
  },
  {
    id: uuidv4(),
    category: 'Numerical Ability',
    gradeLevel: '9',
    text: 'Find the series\n4, 8, 16, 32, ---?',
    correctAnswer: 1, // Index of the correct option (corresponding to '64')
    options: [
      { text: '48', clusterWeightage: [] },
      { text: '64', clusterWeightage: [] },
      { text: '40', clusterWeightage: [] },
      { text: '50', clusterWeightage: [] }
    ]
  },
  // Logical Ability questions
  {
    id: uuidv4(),
    category: 'Logical Ability',
    gradeLevel: '9',
    text: 'Some greens are blue. No blues are white. Therefore',
    correctAnswer: 2, // Index of the correct option (for example)
    options: [
      { text: 'Some greens are white', clusterWeightage: [] },
      { text: 'No whites are green', clusterWeightage: [] },
      { text: 'No greens are white', clusterWeightage: [] },
      { text: 'None of the above', clusterWeightage: [] }
    ]
  },
  {
    id: uuidv4(),
    category: 'Logical Ability',
    gradeLevel: '9',
    text: 'Pick the odd one out-',
    correctAnswer: 0, // Index of the correct option (for example)
    options: [
      { text: 'Index', clusterWeightage: [] },
      { text: 'Glossary', clusterWeightage: [] },
      { text: 'Chapter', clusterWeightage: [] },
      { text: 'Book', clusterWeightage: [] }
    ]
  },
  {
    id: uuidv4(),
    category: 'Logical Ability',
    gradeLevel: '10',
    text: 'Complete the following series-\nBD CEF DFGH ?',
    correctAnswer: 2, // Index of the correct option (for example)
    options: [
      { text: 'EGHIJ', clusterWeightage: [] },
      { text: 'EGHI', clusterWeightage: [] },
      { text: 'EHGIJ', clusterWeightage: [] },
      { text: 'EGHIJK', clusterWeightage: [] }
    ]
  },
  {
    id: uuidv4(),
    category: 'Logical Ability',
    gradeLevel: '10',
    text: 'There may be cause and effect relationship between the two statements given below.\nStatement I - The government has imported large quantities of sugar as per trade agreement with other countries.\nStatement II- The prices of sugar in the domestic market have fallen sharply in the recent months.\nSelect the most appropriate reasoning from the options below –',
    correctAnswer: 0, // Index of the correct option (for example)
    options: [
      { text: 'Statement I is the cause and statement II is its effect.', clusterWeightage: [] },
      { text: 'Statement II is the cause and statement I is its effect.', clusterWeightage: [] },
      { text: 'Both the statements I and II are independent causes.', clusterWeightage: [] },
      { text: 'Both the statements I and II are effects of another common cause.', clusterWeightage: [] }
    ]
  },
  {
    id: uuidv4(),
    category: 'Logical Ability',
    gradeLevel: '10',
    text: 'Complete the series-',
    correctAnswer: 3, // Index of the correct option (for example)
    imageUrl: '/lovable-uploads/0b5b2f46-c97d-4c7e-8a5a-8ad7f3568bcd.png',
    options: [
      { text: 'A', clusterWeightage: [] },
      { text: 'B', clusterWeightage: [] },
      { text: 'C', clusterWeightage: [] },
      { text: 'D', clusterWeightage: [] }
    ]
  },
  // Verbal Ability questions
  {
    id: uuidv4(),
    category: 'Verbal Ability',
    gradeLevel: 'all',
    text: 'Instruction: Spot the grammatical error.\n(A)/ The teacher was angry (B)/ when he found that (C)/ you are not there (D)/ in the class.',
    correctAnswer: 2, // Index of the correct option (for example)
    options: [
      { text: 'Error in clause A', clusterWeightage: [] },
      { text: 'Error in clause B', clusterWeightage: [] },
      { text: 'Error in clause C', clusterWeightage: [] },
      { text: 'Error in clause D', clusterWeightage: [] }
    ]
  }
];

// Add more aptitude questions as needed from the remaining images
