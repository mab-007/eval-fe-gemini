
export type EvaluationStatus = 'Graded' | 'Needs Review' | 'Processing';

export interface Evaluation {
  id: number;
  title: string;
  student: string;
  date: string;
  status: EvaluationStatus;
  score: number | null;
  subject: string;
}

export interface QuestionFeedbackStep {
  description: string;
  score: number;
  maxScore: number;
}

export interface QuestionFeedback {
  questionNumber: number;
  score: number;
  maxScore: number;
  feedback: string;
  isCorrect: boolean;
  steps?: QuestionFeedbackStep[];
  pageNumber: number;
}

export type ViewMode = 'list' | 'grid';
export type ActiveTab = 'study' | 'evaluate' | 'create';
