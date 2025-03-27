import { v4 as uuidv4 } from 'uuid';
import { CareerAssessmentQuestion } from './careerAssessmentData';

export const juniorAssessmentQuestions: CareerAssessmentQuestion[] = [
  {
    id: uuidv4(),
    text: 'What kind of activities do you enjoy most in your free time?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Solving puzzles and brain teasers', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'technology', value: 3 }] },
      { text: 'B) Creating art or music', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 2 }] },
      { text: 'C) Helping others with their problems', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Building or fixing things', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'technology', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which school subject interests you the most?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Science and Mathematics', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Languages and Literature', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'education', value: 4 }] },
      { text: 'C) Social Studies', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'business', value: 3 }] },
      { text: 'D) Computer Science', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you prefer to learn new things?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Through hands-on experiments', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) By reading and researching', clusterWeightage: [{ clusterId: 'education', value: 4 }, { clusterId: 'business', value: 3 }] },
      { text: 'C) Through group discussions', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'D) Using computers and technology', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What role do you usually take in group projects?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) The leader who organizes everything', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'B) The creative one with new ideas', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) The helper who supports others', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) The problem solver', clusterWeightage: [{ clusterId: 'engineering', value: 4 }, { clusterId: 'science', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What kind of future job interests you most?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) One where I can help people', clusterWeightage: [{ clusterId: 'healthcare', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) One where I can be creative', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) One where I can solve complex problems', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'D) One where I can work with technology', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'business', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Do you enjoy working with computers and technology?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Yes, I love exploring technology', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Sometimes, when needed', clusterWeightage: [{ clusterId: 'business', value: 3 }, { clusterId: 'science', value: 3 }] },
      { text: 'C) Only for basic tasks', clusterWeightage: [{ clusterId: 'social', value: 2 }, { clusterId: 'healthcare', value: 2 }] },
      { text: 'D) Not really interested', clusterWeightage: [{ clusterId: 'arts', value: 2 }, { clusterId: 'education', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you like to express yourself?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Through art, music, or writing', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'B) By helping and teaching others', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'C) Through solving problems', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'D) By organizing and planning', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'technology', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What type of books or content do you enjoy reading?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Science and technology', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Stories and literature', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Self-help and psychology', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Business and current affairs', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'engineering', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you prefer to spend your weekends?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Learning new skills online', clusterWeightage: [{ clusterId: 'technology', value: 4 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Creating or building things', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'arts', value: 4 }] },
      { text: 'C) Volunteering or helping others', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Reading and researching', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'business', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What would you like to be known for?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Making scientific discoveries', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Creating beautiful art or music', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Helping people in need', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Building successful businesses', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'technology', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you approach problem-solving?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Analyze data and facts', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Think creatively and try new solutions', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'C) Discuss with others to find solutions', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Follow established procedures', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'education', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What kind of activities make you lose track of time?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Working on science projects', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Creating art or music', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Helping friends with their problems', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Playing with gadgets and technology', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'business', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What type of YouTube videos do you enjoy watching?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Educational and science videos', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Art and music tutorials', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Motivational and self-help content', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Tech reviews and gadget unboxings', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you prefer to work on school projects?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Independently, focusing on details', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) In a team, sharing ideas', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'C) Leading and organizing the team', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'D) Handling the creative aspects', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'engineering', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What would you do if you saw someone struggling with a problem?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Help them find a solution', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'B) Analyze the problem systematically', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'C) Offer emotional support', clusterWeightage: [{ clusterId: 'healthcare', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'D) Suggest practical solutions', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'technology', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What excites you most about the future?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) New scientific discoveries', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Creating something meaningful', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'C) Making the world better', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Future technologies', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'business', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which extracurricular activity interests you the most?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Science club or robotics team', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Drama or music club', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Student council or debate team', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'business', value: 4 }] },
      { text: 'D) Sports team or fitness club', clusterWeightage: [{ clusterId: 'healthcare', value: 4 }, { clusterId: 'engineering', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you organize your study materials?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Digital notes and apps', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'business', value: 3 }] },
      { text: 'B) Color-coded and visually organized', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'education', value: 4 }] },
      { text: 'C) Systematic folders and labels', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 3 }] },
      { text: 'D) Collaborative study guides', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'healthcare', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What type of science projects interest you most?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Environmental and ecology studies', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'B) Computer programming and apps', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'C) Social behavior studies', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'education', value: 3 }] },
      { text: 'D) Design and innovation projects', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'business', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you prefer to solve math problems?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Using logical steps and formulas', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) With visual diagrams and graphs', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Using calculator or computer tools', clusterWeightage: [{ clusterId: 'technology', value: 4 }, { clusterId: 'business', value: 3 }] },
      { text: 'D) In study groups, explaining to others', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'healthcare', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What kind of mobile apps do you use most?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Educational and learning apps', clusterWeightage: [{ clusterId: 'education', value: 5 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) Creative and design apps', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Social and communication apps', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'business', value: 3 }] },
      { text: 'D) Health and fitness apps', clusterWeightage: [{ clusterId: 'healthcare', value: 5 }, { clusterId: 'engineering', value: 2 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What would you do during a free period at school?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Help classmates with studies', clusterWeightage: [{ clusterId: 'education', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) Work on personal projects', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'science', value: 4 }] },
      { text: 'C) Organize study groups', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'D) Explore new software or tools', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'Which type of museum would you most like to visit?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Science and technology museum', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Art and history museum', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Natural history and medical museum', clusterWeightage: [{ clusterId: 'healthcare', value: 4 }, { clusterId: 'science', value: 4 }] },
      { text: 'D) Interactive and hands-on exhibits', clusterWeightage: [{ clusterId: 'engineering', value: 4 }, { clusterId: 'social', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What kind of volunteer work interests you?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Teaching or tutoring others', clusterWeightage: [{ clusterId: 'education', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'B) Environmental conservation', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'C) Community service projects', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'business', value: 3 }] },
      { text: 'D) Technical support for others', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you like to present your ideas in class?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Using digital presentations', clusterWeightage: [{ clusterId: 'technology', value: 4 }, { clusterId: 'business', value: 4 }] },
      { text: 'B) Through creative demonstrations', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) With detailed explanations', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'D) Interactive group activities', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What interests you most about current events?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Scientific discoveries', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'technology', value: 4 }] },
      { text: 'B) Social and cultural issues', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'C) Health and wellness news', clusterWeightage: [{ clusterId: 'healthcare', value: 5 }, { clusterId: 'social', value: 3 }] },
      { text: 'D) Technology trends', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you prefer to take notes in class?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Detailed written notes', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Visual sketches and diagrams', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'engineering', value: 3 }] },
      { text: 'C) Digital notes on device', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'business', value: 3 }] },
      { text: 'D) Collaborative note-sharing', clusterWeightage: [{ clusterId: 'social', value: 4 }, { clusterId: 'healthcare', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What type of school events do you enjoy most?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Science fairs and competitions', clusterWeightage: [{ clusterId: 'science', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Cultural and artistic performances', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Community service activities', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Tech workshops and seminars', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'business', value: 3 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you deal with challenging tasks?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Break them down systematically', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) Find creative alternative solutions', clusterWeightage: [{ clusterId: 'arts', value: 4 }, { clusterId: 'technology', value: 4 }] },
      { text: 'C) Seek help and collaborate', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Research and plan thoroughly', clusterWeightage: [{ clusterId: 'business', value: 4 }, { clusterId: 'education', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What kind of online content do you create?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Educational or informative content', clusterWeightage: [{ clusterId: 'education', value: 5 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) Creative or artistic content', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Social or community content', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 3 }] },
      { text: 'D) Technical tutorials or reviews', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What aspects of group work do you enjoy most?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Planning and organizing tasks', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Coming up with creative ideas', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'technology', value: 3 }] },
      { text: 'C) Supporting and motivating others', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Solving technical challenges', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'science', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What would you like to improve in your school?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Learning resources and facilities', clusterWeightage: [{ clusterId: 'education', value: 5 }, { clusterId: 'science', value: 4 }] },
      { text: 'B) Creative and artistic opportunities', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'social', value: 3 }] },
      { text: 'C) Student support and wellness', clusterWeightage: [{ clusterId: 'healthcare', value: 5 }, { clusterId: 'social', value: 4 }] },
      { text: 'D) Technology and innovation', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'How do you prefer to learn about careers?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Research and read about them', clusterWeightage: [{ clusterId: 'science', value: 4 }, { clusterId: 'education', value: 4 }] },
      { text: 'B) Talk to professionals', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'business', value: 4 }] },
      { text: 'C) Watch videos and documentaries', clusterWeightage: [{ clusterId: 'technology', value: 4 }, { clusterId: 'arts', value: 3 }] },
      { text: 'D) Try hands-on experiences', clusterWeightage: [{ clusterId: 'engineering', value: 5 }, { clusterId: 'healthcare', value: 4 }] }
    ]
  },
  {
    id: uuidv4(),
    text: 'What type of after-school activities interest you?',
    gradeLevel: '8-10',
    options: [
      { text: 'A) Coding or robotics club', clusterWeightage: [{ clusterId: 'technology', value: 5 }, { clusterId: 'engineering', value: 4 }] },
      { text: 'B) Art or music lessons', clusterWeightage: [{ clusterId: 'arts', value: 5 }, { clusterId: 'education', value: 3 }] },
      { text: 'C) Volunteer work', clusterWeightage: [{ clusterId: 'social', value: 5 }, { clusterId: 'healthcare', value: 4 }] },
      { text: 'D) Business or entrepreneurship club', clusterWeightage: [{ clusterId: 'business', value: 5 }, { clusterId: 'science', value: 3 }] }
    ]
  }
]; 