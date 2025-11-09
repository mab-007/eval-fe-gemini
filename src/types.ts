
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

export interface QuestionFeedback {
  questionNumber: number;
  score: number;
  maxScore: number;
  feedback: string;
  isCorrect: boolean;
}

export type ViewMode = 'list' | 'grid';
export type ActiveTab = 'study' | 'evaluate' | 'create';