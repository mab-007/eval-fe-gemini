
import type { Evaluation, QuestionFeedback } from './types';

export const MOCK_EVALUATIONS: Evaluation[] = [
  { id: 1, title: 'Mid-Term Physics Test', student: 'Harry Potter', date: '2024-11-09', status: 'Graded', score: 92, subject: 'Physics' },
  { id: 2, title: 'History Essay - Goblins', student: 'Ron Weasley', date: '2024-11-09', status: 'Needs Review', score: null, subject: 'History' },
  { id: 3, title: 'Potions Final Exam', student: 'Hermione Granger', date: '2024-11-08', status: 'Graded', score: 100, subject: 'Potions' },
  { id: 4, title: 'Transfiguration Quiz', student: 'Neville Longbottom', date: '2024-11-08', status: 'Processing', score: null, subject: 'Transfiguration' },
  { id: 5, title: 'Defense Against Dark Arts', student: 'Draco Malfoy', date: '2024-11-07', status: 'Graded', score: 85, subject: 'DADA' },
];

export const MOCK_EVALUATION_DETAIL: QuestionFeedback[] = [
  {
    questionNumber: 1,
    score: 7,
    maxScore: 10,
    feedback: 'The student correctly identified the main goblin rebellions but missed some key dates.',
    isCorrect: false,
    steps: [
      { description: 'Identified main rebellions', score: 5, maxScore: 5 },
      { description: 'Mentioned key dates correctly', score: 2, maxScore: 5 },
    ],
    pageNumber: 1,
  },
  {
    questionNumber: 2,
    score: 10,
    maxScore: 10,
    feedback: 'Excellent and detailed answer regarding the Gringotts founding treaty.',
    isCorrect: true,
    steps: [
      { description: 'Clarity of argument', score: 5, maxScore: 5 },
      { description: 'Supporting evidence', score: 5, maxScore: 5 },
    ],
    pageNumber: 1,
  },
  {
    questionNumber: 3,
    score: 3,
    maxScore: 10,
    feedback: 'The answer confuses the 18th-century goblin rights movement with earlier conflicts.',
    isCorrect: false,
    steps: [
      { description: 'Historical accuracy', score: 1, maxScore: 5 },
      { description: 'Chronological order', score: 2, maxScore: 5 },
    ],
    pageNumber: 2,
  },
  {
    questionNumber: 4,
    score: 8,
    maxScore: 10,
    feedback: 'Good understanding of the role of Griphook, but could have elaborated more on his motivations.',
    isCorrect: true,
    steps: [
        { description: 'Identified Griphook\'s role', score: 5, maxScore: 5 },
        { description: 'Explained motivations', score: 3, maxScore: 5 },
    ],
    pageNumber: 2,
  },
  {
    questionNumber: 5,
    score: 5,
    maxScore: 5,
    feedback: 'Perfectly recalled the key clauses of the Code of Wand Use.',
    isCorrect: true,
    steps: [
      { description: 'Recalled Clause 1', score: 2, maxScore: 2 },
      { description: 'Recalled Clause 3', score: 3, maxScore: 3 },
    ],
    pageNumber: 3,
  },
  {
    questionNumber: 6,
    score: 0,
    maxScore: 5,
    feedback: 'The student completely misunderstood the question about goblin metallurgy.',
    isCorrect: false,
    steps: [
      { description: 'Relevance to question', score: 0, maxScore: 5 },
    ],
    pageNumber: 3,
  },
];
