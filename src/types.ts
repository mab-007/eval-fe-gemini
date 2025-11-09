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

export type AiConfidence = 'High' | 'Medium' | 'Low';

export interface QuestionFeedback {
  questionNumber: number;
  score: number;
  maxScore: number;
  feedback: string; // This is the AI's rationale
  isCorrect: boolean;
  steps?: QuestionFeedbackStep[];
  pageNumber: number;
  aiConfidence: AiConfidence;
  markingScheme: string;
  studentComment?: string;
  isEdited?: boolean;
}

export type ViewMode = 'list' | 'grid';
export type ActiveTab = 'study' | 'evaluate' | 'create';
