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
  x_coordinate?: number;
  y_coordinate?: number;
  page_number?: number;
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
  x_coordinate?: number;
  y_coordinate?: number;
  
  // These are managed by the UI state
  studentComment?: string;
  isEdited?: boolean;
}


export type ViewMode = 'list' | 'grid';
export type ActiveTab = 'study' | 'evaluate' | 'create';

// Type for the detailed evaluation API response
export interface ApiEvaluationResponse {
  id: string;
  owner_id: string;
  exam_template_id: string | null;
  student_name: string | null;
  evaluation_report: {
    overall_score: number;
    total_possible_score: number;
    overall_feedback: string;
    predicted_grade: string | null;
    questions: any[];
    typology_performance: Record<string, any>;
    concept_performance: Record<string, any>;
    question_type_performance: Record<string, any>;
    mistake_type_performance: Record<string, any>;
    chapter_performance: Record<string, any>;
    chapter_mistake_mapping: Record<string, any>;
    question_summaries: any[];
    manual_annotations: any[];
  };
  processing_status: string;
  created_at: string;
  original_filename: string;
  download_url: string;
  metadata: {
    class_level: string;
    subject: string;
    year: string;
  };
}
