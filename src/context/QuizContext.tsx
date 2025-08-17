
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for our quiz data
export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  resources: {
    name: string;
    description: string;
    link: string;
  }[];
}

// Expanded quiz questions for a more comprehensive 5-minute assessment
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'stage',
    question: 'What stage is your startup currently in?',
    options: [
      { id: 'idea', text: 'Idea stage - I have a concept but haven\'t built anything yet' },
      { id: 'mvp', text: 'MVP stage - I have a prototype or early product' },
      { id: 'market', text: 'Market validation - I have some users/customers and testing fit' },
      { id: 'growth', text: 'Growth stage - I\'m focused on scaling my user/customer base' },
      { id: 'scale', text: 'Scale stage - I have validated business model and raising capital' },
    ],
  },
  {
    id: 'needs',
    question: 'What is your most immediate need?',
    options: [
      { id: 'ideation', text: 'Help with ideation and concept validation' },
      { id: 'productDev', text: 'Product development support' },
      { id: 'networking', text: 'Networking and mentorship' },
      { id: 'funding', text: 'Funding and investment' },
      { id: 'talent', text: 'Finding talent and team building' },
    ],
  },
  {
    id: 'industry',
    question: 'Which industry best describes your startup?',
    options: [
      { id: 'tech', text: 'Software/Technology' },
      { id: 'health', text: 'Healthcare/Biotech' },
      { id: 'consumer', text: 'Consumer Products' },
      { id: 'fintech', text: 'FinTech' },
      { id: 'education', text: 'Education' },
      { id: 'agtech', text: 'Agriculture/Food Tech' },
      { id: 'other', text: 'Other' },
    ],
  },
  {
    id: 'time',
    question: 'How much time can you dedicate to your startup?',
    options: [
      { id: 'partTime', text: 'Part-time (10-20 hours/week)' },
      { id: 'fullTime', text: 'Full-time (40+ hours/week)' },
      { id: 'team', text: 'I have a team working full-time' },
    ],
  },
  {
    id: 'background',
    question: 'What is your primary background or expertise?',
    options: [
      { id: 'business', text: 'Business/Management' },
      { id: 'tech', text: 'Technical/Engineering' },
      { id: 'creative', text: 'Creative/Design' },
      { id: 'research', text: 'Research/Academia' },
      { id: 'other', text: 'Other' },
    ],
  },
  {
    id: 'community',
    question: 'What type of startup community experience interests you most?',
    options: [
      { id: 'structured', text: 'Structured programs with deadlines and milestones' },
      { id: 'competitions', text: 'Pitch competitions and funding opportunities' },
      { id: 'casual', text: 'Casual networking and peer collaboration' },
      { id: 'mentorship', text: 'One-on-one mentoring and expert guidance' },
      { id: 'academic', text: 'Academic courses and formal training' },
    ],
  },
  {
    id: 'ip',
    question: 'Does your startup involve intellectual property or research from Purdue?',
    options: [
      { id: 'yes', text: 'Yes, it\'s based on Purdue research or technology' },
      { id: 'partially', text: 'Partially, we\'re adapting or building on Purdue research' },
      { id: 'no', text: 'No, it\'s independent from Purdue research' },
      { id: 'unsure', text: 'I\'m not sure' },
    ],
  },
  {
    id: 'prototype',
    question: 'What resources do you need for prototyping or product development?',
    options: [
      { id: 'makerspace', text: 'Physical maker space and equipment' },
      { id: 'software', text: 'Software development tools and expertise' },
      { id: 'lab', text: 'Lab space or specialized research equipment' },
      { id: 'design', text: 'Design thinking and user testing tools' },
      { id: 'none', text: 'None at this time' },
    ],
  },
];

// Enhanced results based on combinations, with comprehensive Purdue-specific resources
export const quizResults: { [key: string]: QuizResult } = {
  'earlystage_incubator': {
    id: 'earlystage_incubator',
    title: 'Early-Stage Incubator Programs',
    description: 'Based on your responses, you would benefit most from Purdue\'s early-stage incubator programs that can help develop your idea and build an initial prototype.',
    resources: [
      {
        name: 'Firestarter Program',
        description: 'A six-week pre-accelerator cohort program for students planning to launch in 3-9 months, focusing on MVP development and business model design.',
        link: 'https://purdueinnovates.org'
      },
      {
        name: 'The Anvil',
        description: 'Student-run incubator and coworking space creating a peer-led environment for collaboration and early-stage experimentation.',
        link: 'https://theanvil.us'
      },
      {
        name: 'Burton D. Morgan Business Competition',
        description: 'Campus-wide contest for early-stage ideas offering grants up to $10K and mentorship across several months.',
        link: 'https://www.purdue.edu/discoverypark/bdmce/'
      }
    ]
  },
  'accelerator': {
    id: 'accelerator',
    title: 'Growth-Ready Accelerator Programs',
    description: 'Your startup is at the right stage for Purdue\'s accelerator programs that can help you scale quickly and connect with investors.',
    resources: [
      {
        name: 'Market Readiness Program',
        description: '5-week structured workshop series for startups with MVPs seeking product-market fit, ending with an executive summary and pitch deck.',
        link: 'https://purdueinnovates.org'
      },
      {
        name: 'Purdue Accelerator',
        description: '13-week equity-based accelerator offering up to $100K via SAFE note, designed for startups with traction aiming to scale.',
        link: 'https://purdueinnovates.org'
      },
      {
        name: 'John Martinson Entrepreneurial Center',
        description: 'Engineering-focused center helping growth-stage student startups scale and connect with industry.',
        link: 'https://engineering.purdue.edu/JMEC'
      }
    ]
  },
  'funding': {
    id: 'funding',
    title: 'Funding & Investment Resources',
    description: 'You\'re ready to raise capital. Purdue offers several funding options that can connect you with relevant investors.',
    resources: [
      {
        name: 'Purdue Strategic Ventures',
        description: 'Manages Purdue\'s institutional venture funds supporting startups across life sciences, ag, deep tech, and digital sectors.',
        link: 'https://strategicventures.prf.org/'
      },
      {
        name: 'Student Managed Venture Fund',
        description: 'Graduate student-run fund that performs real due diligence and invests in Purdue-linked ventures.',
        link: 'https://krannert.purdue.edu/centers/entrepreneurship/initiatives.php'
      },
      {
        name: 'Purdue New Venture Challenge',
        description: 'Three-part program with workshops and investor pitches designed for student startups with MVPs and traction.',
        link: 'https://purdueinnovates.org/events/new-venture-challenge/'
      }
    ]
  },
  'pitch_competitions': {
    id: 'pitch_competitions',
    title: 'Pitch Competitions & Challenges',
    description: 'Your startup could benefit from pitch competitions to gain visibility, feedback, and potential non-dilutive funding.',
    resources: [
      {
        name: 'Moonshot Pitch Challenge',
        description: '2-minute pitch competition for bold, world-changing ideas with a $5,500 total prize pool and low-barrier entry point.',
        link: 'https://purdueinnovates.org/incubator/moonshot/'
      },
      {
        name: 'Schurz Innovation Challenge',
        description: 'Prototype competition focused on digital media and technology offering industry mentorship and $10K+ prize pool.',
        link: 'https://www.purdue.edu/entrepreneurship/events/'
      },
      {
        name: 'Student Soybean Innovation Competition',
        description: 'Product-based competition with a $20K grand prize for soy-based inventions; cross-disciplinary opportunity.',
        link: 'https://www.purdue.edu/entrepreneurship/events/'
      }
    ]
  },
  'mentorship': {
    id: 'mentorship',
    title: 'Mentorship Networks',
    description: 'You would benefit from connecting with Purdue\'s network of experienced mentors who can guide your business decisions.',
    resources: [
      {
        name: 'Entrepreneurs-in-Residence',
        description: 'Professional coaching on business, tech, pitch, and scaling through Purdue Innovates.',
        link: 'https://purdueinnovates.org'
      },
      {
        name: 'Silicon Valley Boilermaker Innovation Group (SVBIG)',
        description: 'Mentor matching program for high-growth, venture-scale Purdue startups run by alumni in tech hubs.',
        link: 'https://svbig.org'
      },
      {
        name: 'Executive-in-Residence Program',
        description: 'Access to visiting executives through Purdue Housing & Residence for informal leadership development.',
        link: 'https://www.housing.purdue.edu/learning/eir/'
      }
    ]
  },
  'maker_resources': {
    id: 'maker_resources',
    title: 'Prototyping & Maker Resources',
    description: 'You need access to prototyping tools and spaces to bring your physical product to life.',
    resources: [
      {
        name: 'Bechtel Innovation Design Center',
        description: 'Advanced machine shop and 3D prototyping facility with peer mentors, open to all students after safety training.',
        link: 'https://www.purdue.edu/bidc/'
      },
      {
        name: 'Knowledge Lab',
        description: 'Creative, low-tech prototyping space for mockups, early concepts, and design thinking projects.',
        link: 'https://lib.purdue.edu/knowledgelab'
      },
      {
        name: 'Convergence Center for Innovation',
        description: 'Co-working and innovation hub for Purdue startups, housing Purdue Innovates, mentors, and programs.',
        link: 'https://purdueinnovates.org'
      }
    ]
  },
  'academic_resources': {
    id: 'academic_resources',
    title: 'Academic Entrepreneurship Programs',
    description: 'You could benefit from formal entrepreneurial education through Purdue\'s academic programs.',
    resources: [
      {
        name: 'Certificate in Entrepreneurship and Innovation',
        description: 'Open to all majors, a 5-course sequence with experiential components forming a top-ranked entrepreneurship credential.',
        link: 'https://www.purdue.edu/entrepreneurship/'
      },
      {
        name: 'Graduate Tech Entrepreneurship Course',
        description: 'Focus on research translation and commercialization, ideal for graduate researchers forming ventures around IP.',
        link: 'https://www.purdue.edu/entrepreneurship/'
      },
      {
        name: 'Design & Innovation Living Learning Community',
        description: 'First-year residential program for students exploring innovation, mixing majors to encourage team formation.',
        link: 'https://www.purdue.edu/entrepreneurship/'
      }
    ]
  },
  'ip_commercialization': {
    id: 'ip_commercialization',
    title: 'IP & Research Commercialization',
    description: 'Your venture involves Purdue intellectual property or research that requires specialized commercialization support.',
    resources: [
      {
        name: 'Office of Technology Commercialization (OTC)',
        description: 'Handles IP disclosures, patenting, and licensing of Purdue tech - a required partner for IP-based startups.',
        link: 'https://www.prf.org/otc/'
      },
      {
        name: 'Trask Innovation Fund',
        description: 'Up to $100K per technology for Purdue-owned IP development for research-based startups needing lab/prototype funds.',
        link: 'https://www.prf.org/otc/funding/trask-innovation-fund/'
      },
      {
        name: 'I-Corps Site Program',
        description: 'NSF-funded lean startup program for research commercialization with $2,500 grant and customer discovery training.',
        link: 'https://purdue.edu/discoverypark/entrepreneurship/icorps'
      }
    ]
  },
  'agtech_ventures': {
    id: 'agtech_ventures',
    title: 'Agricultural Technology Resources',
    description: 'Your ag-related venture could benefit from Purdue\'s specialized agricultural technology resources.',
    resources: [
      {
        name: 'Ag-Celerator',
        description: 'Focused on ag-tech startups commercializing Purdue ag innovations, awarding up to $100K in seed funding per team.',
        link: 'https://purdueinnovates.org'
      },
      {
        name: 'Student Soybean Innovation Competition',
        description: 'Product-based competition with a $20K grand prize for soy-based inventions; cross-disciplinary opportunity.',
        link: 'https://www.purdue.edu/entrepreneurship/events/'
      },
      {
        name: 'College of Agriculture Entrepreneurship Program',
        description: 'Specialized support for agriculture, food, and sustainability ventures.',
        link: 'https://ag.purdue.edu'
      }
    ]
  },
  'student_community': {
    id: 'student_community',
    title: 'Student Entrepreneurship Community',
    description: 'Connect with Purdue\'s vibrant student entrepreneurship community to find collaborators and support.',
    resources: [
      {
        name: 'The Anvil',
        description: 'Student-run coworking space and startup community offering workspace and networking.',
        link: 'https://theanvil.us'
      },
      {
        name: 'Entrepreneurship Society',
        description: 'Student-run group hosting pitch nights and peer mentorship in a cross-disciplinary, beginner-friendly environment.',
        link: 'https://boilerlink.purdue.edu'
      },
      {
        name: 'Launch Purdue',
        description: 'Student consulting club supporting real startups with teams providing strategy and growth analysis.',
        link: 'https://boilerlink.purdue.edu'
      }
    ]
  }
};

interface QuizContextType {
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetQuiz: () => void;
  determineResult: () => QuizResult;
  getTopResults: () => QuizResult[];
  updateAnswer: (questionId: string, answer: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  // Add the updateAnswer function
  const updateAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Enhanced algorithm to determine the most relevant result based on answers
  const determineResult = (): QuizResult => {
    const { 
      stage, 
      needs, 
      industry, 
      community, 
      ip, 
      prototype, 
      background 
    } = answers;
    
    // Early-stage incubator matching
    if ((stage === 'idea' || stage === 'mvp') && 
        (needs === 'ideation' || needs === 'productDev')) {
      return quizResults['earlystage_incubator'];
    }
    
    // Accelerator program matching
    if ((stage === 'market' || stage === 'growth') && 
        (needs === 'networking' || needs === 'productDev' || needs === 'talent')) {
      return quizResults['accelerator'];
    }
    
    // Funding resources matching
    if ((stage === 'growth' || stage === 'scale') && 
        needs === 'funding') {
      return quizResults['funding'];
    }
    
    // Pitch competitions matching
    if (community === 'competitions' || 
        (stage === 'mvp' && needs === 'funding')) {
      return quizResults['pitch_competitions'];
    }
    
    // Mentorship networks matching
    if (needs === 'networking' || 
        community === 'mentorship') {
      return quizResults['mentorship'];
    }
    
    // Maker resources matching
    if (prototype === 'makerspace' || 
        prototype === 'lab' || 
        prototype === 'design') {
      return quizResults['maker_resources'];
    }
    
    // Academic resources matching
    if (community === 'academic' || 
        background === 'research') {
      return quizResults['academic_resources'];
    }
    
    // IP commercialization matching
    if (ip === 'yes' || ip === 'partially') {
      return quizResults['ip_commercialization'];
    }
    
    // Ag-tech ventures matching
    if (industry === 'agtech') {
      return quizResults['agtech_ventures'];
    }
    
    // Student community matching
    if ((stage === 'idea' || stage === 'mvp') && 
        community === 'casual') {
      return quizResults['student_community'];
    }
    
    // Default to early-stage incubator if no strong match
    return quizResults['earlystage_incubator'];
  };

  // Get top 3 most relevant results
  const getTopResults = (): QuizResult[] => {
    // Calculate scores for each result type based on answers
    const scores: Record<string, number> = {};
    
    // Initialize scores for all result types
    Object.keys(quizResults).forEach(key => {
      scores[key] = 0;
    });
    
    // Score based on stage
    if (answers.stage) {
      switch(answers.stage) {
        case 'idea':
          scores['earlystage_incubator'] += 3;
          scores['academic_resources'] += 2;
          scores['student_community'] += 2;
          break;
        case 'mvp':
          scores['earlystage_incubator'] += 2;
          scores['maker_resources'] += 2;
          scores['pitch_competitions'] += 1;
          break;
        case 'market':
          scores['accelerator'] += 3;
          scores['mentorship'] += 2;
          scores['pitch_competitions'] += 2;
          break;
        case 'growth':
          scores['accelerator'] += 3;
          scores['funding'] += 2;
          scores['mentorship'] += 1;
          break;
        case 'scale':
          scores['funding'] += 3;
          scores['accelerator'] += 2;
          break;
      }
    }
    
    // Score based on needs
    if (answers.needs) {
      switch(answers.needs) {
        case 'ideation':
          scores['earlystage_incubator'] += 3;
          scores['academic_resources'] += 2;
          scores['student_community'] += 1;
          break;
        case 'productDev':
          scores['maker_resources'] += 3;
          scores['earlystage_incubator'] += 2;
          break;
        case 'networking':
          scores['mentorship'] += 3;
          scores['student_community'] += 2;
          scores['accelerator'] += 1;
          break;
        case 'funding':
          scores['funding'] += 3;
          scores['pitch_competitions'] += 2;
          break;
        case 'talent':
          scores['student_community'] += 2;
          scores['accelerator'] += 1;
          break;
      }
    }
    
    // Score based on industry
    if (answers.industry === 'agtech') {
      scores['agtech_ventures'] += 3;
    }
    
    // Score based on IP
    if (answers.ip === 'yes' || answers.ip === 'partially') {
      scores['ip_commercialization'] += 3;
    }
    
    // Score based on prototype needs
    if (answers.prototype === 'makerspace' || answers.prototype === 'lab') {
      scores['maker_resources'] += 3;
    }
    
    // Score based on community preference
    if (answers.community) {
      switch(answers.community) {
        case 'structured':
          scores['accelerator'] += 2;
          scores['earlystage_incubator'] += 1;
          break;
        case 'competitions':
          scores['pitch_competitions'] += 3;
          break;
        case 'casual':
          scores['student_community'] += 3;
          break;
        case 'mentorship':
          scores['mentorship'] += 3;
          break;
        case 'academic':
          scores['academic_resources'] += 3;
          break;
      }
    }
    
    // Sort results by score
    const sortedResults = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => quizResults[id]);
    
    // Return top 3 results
    return sortedResults.slice(0, 3);
  };

  const value = {
    currentQuestionIndex,
    questions: quizQuestions,
    answers,
    setAnswers,
    nextQuestion,
    previousQuestion,
    resetQuiz,
    determineResult,
    getTopResults,
    updateAnswer,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
