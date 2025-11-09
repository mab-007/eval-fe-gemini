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

export type AiConfidence = 'High' | 'Medium' | 'Low' | 'high' | 'medium' | 'low';

export interface Mistake {
  mistake_type: string;
  mistake_description: string;
  lacking_competencies: string[];
  marks_lost: number;
}

export interface QuestionFeedback {
  questionNumber: number; // from question_id
  componentId?: string | null;
  questionSummary: string;
  score: number; // from score_awarded
  maxScore: number; // from marks_available
  feedback: string; // from feedback (AI rationale)
  isCorrect: boolean; // derived
  pageNumber: number;
  aiConfidence: AiConfidence; // from evaluation_score
  markingScheme: string; // from mark_scheme
  studentAnswer: string;
  idealApproach: string;
  studentApproach: string; 
  mistakesMade: Mistake[];
  typology: string;
  questionType: string;
  chapterName: string;
  
  // These are managed by the UI state
  studentComment?: string;
  isEdited?: boolean;
}


export type ViewMode = 'list' | 'grid';
export type ActiveTab = 'study' | 'evaluate' | 'create';

// Type for the detailed evaluation report JSON object
export interface DetailedEvaluationReport {
  id: string;
  evaluation_report: {
    overall_score: number;
    total_possible_score: number;
    overall_feedback: string;
    // FIX: Added `predicted_grade` property to align type with mock data.
    predicted_grade: string | null;
    questions: any[]; // Using any to avoid defining the full complex type for every sub-field
  }
}