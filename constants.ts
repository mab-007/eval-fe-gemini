import type { Evaluation, QuestionFeedback, DetailedEvaluationReport } from './types';

export const MOCK_EVALUATIONS: Evaluation[] = [
  { id: 1, title: 'Mid-Term Physics Test', student: 'Harry Potter', date: '2024-11-09', status: 'Graded', score: 92, subject: 'Physics' },
  { id: 2, title: 'Science Set 1 QP', student: 'Anan Sharma', date: '2024-11-09', status: 'Needs Review', score: 37, subject: 'Science' },
  { id: 3, title: 'Potions Final Exam', student: 'Hermione Granger', date: '2024-11-08', status: 'Graded', score: 100, subject: 'Potions' },
  { id: 4, title: 'Transfiguration Quiz', student: 'Neville Longbottom', date: '2024-11-08', status: 'Processing', score: null, subject: 'Transfiguration' },
  { id: 5, title: 'Defense Against Dark Arts', student: 'Draco Malfoy', date: '2024-11-07', status: 'Graded', score: 85, subject: 'DADA' },
];

export const DETAILED_EVALUATION_DATA: DetailedEvaluationReport = {
    "id": "ac338709-cfef-4fa1-813d-b148a3f3bcde",
    "evaluation_report": {
        "overall_score": 29.5,
        "total_possible_score": 80,
        "overall_feedback": "*   The student demonstrates a foundational understanding in specific areas, particularly excelling in certain recall-based MCQs and direct application questions in Biology (e.g., Hydra budding, hypermetropia correction diagram) and Physics (e.g., blue sky, parallel circuit current calculation).\n*   However, significant conceptual gaps are evident across all three subjects, leading to frequent errors in fundamental biological processes, chemical properties, and core physics principles, compounded by a high number of skipped questions and misinterpretation of question requirements.\n*   To improve, a thorough review of fundamental definitions, mechanisms, and specific keywords in questions is crucial, alongside practicing comprehensive answer writing, accurate chemical equations/diagrams, and effective time management to ensure all questions are attempted.",
        "predicted_grade": null,
        "questions": [
            {
                "question_id": 1,
                "component_id": null,
                "question_summary": "Auxin is a plant hormone that promotes cell elongation and is produced by the apical meristem. It inhibits the growth of lateral buds which are present at nodes (where leaves attach to the stem). As long as sufficient auxin is produced by the apical meristem, the lateral buds remain dormant. A gardener wants the plants in the hedge that he is growing to become bushier with more branches. Which of the following should he do?",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "MCQ",
                "page_number": 1,
                "marks_available": 1,
                "mark_scheme": "c) Trim the hedge by cutting off the tips of the stems",
                "chapter_name": "Control and Co-ordination",
                "concepts_required": [
                    "Plant hormones",
                    "Auxin",
                    "Apical dominance",
                    "Pruning"
                ],
                "student_answer": "a. Sprag water on the Hps of the stems to increase growth",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student chose option 'a', which is incorrect. Spraying water on the tips of stems does not promote bushier growth. The correct approach involves understanding the role of plant hormones.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.3559322033898305,
                        "page_number": 1
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The ideal approach is to understand the concept of apical dominance and the function of the plant hormone auxin. Auxin, produced at the apical meristem (tip of the stem), inhibits the growth of lateral buds. To make a plant bushier with more branches, the apical dominance needs to be overcome. This is achieved by pruning or trimming the tips of the stems, which removes the source of auxin and allows the lateral buds to grow, resulting in a bushier plant.",
                "student_approach": "The student incorrectly suggested 'spraying water on the tips of the stems to increase growth' as a method to make the hedge bushier. This indicates a misunderstanding of how plant hormones regulate growth and the specific mechanism of apical dominance.",
                "feedback": "Your answer regarding how to make the hedge bushier is incorrect. Auxin, a plant hormone produced at the very tip of the stem, suppresses the growth of side (lateral) buds. This phenomenon is called apical dominance. To make a plant bushier and encourage more branches, you need to remove the tip of the stem (apical meristem). This action removes the source of auxin, thereby releasing the lateral buds from inhibition and allowing them to grow. Spraying water does not affect this hormonal regulation. You need to review the topic of plant hormones, specifically auxin and its role in apical dominance.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Misunderstanding of the role of auxin in plant growth and apical dominance, leading to an incorrect method for promoting lateral branching.",
                        "lacking_competencies": [
                            "Understanding plant hormones and their effects on growth",
                            "Application of knowledge about apical dominance"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.3559322033898305,
                        "page_number": 1
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.3559322033898305,
                "evaluation_score": "high"
            }
        ]
    }
};

// Transformer function to map the detailed API response to the UI's data structure
function transformApiQuestionToQuestionFeedback(apiQuestion: any): QuestionFeedback {
  const isCorrect = apiQuestion.marks_available > 0 && apiQuestion.score_awarded === apiQuestion.marks_available;
  return {
    questionNumber: apiQuestion.question_id,
    componentId: apiQuestion.component_id,
    questionSummary: apiQuestion.question_summary,
    score: apiQuestion.score_awarded,
    maxScore: apiQuestion.marks_available,
    feedback: apiQuestion.feedback,
    isCorrect: isCorrect,
    pageNumber: apiQuestion.page_number,
    aiConfidence: apiQuestion.evaluation_score,
    markingScheme: apiQuestion.mark_scheme,
    studentAnswer: apiQuestion.student_answer,
    idealApproach: apiQuestion.ideal_approach,
    studentApproach: apiQuestion.student_approach,
    mistakesMade: apiQuestion.mistakes_made || [],
    typology: apiQuestion.typology,
    questionType: apiQuestion.question_type,
    chapterName: apiQuestion.chapter_name,
    isEdited: false, // Default UI state
    studentComment: '', // Default UI state
  };
}

// Export the transformed data for the UI to use
export const MOCK_DETAILED_QUESTIONS: QuestionFeedback[] = DETAILED_EVALUATION_DATA.evaluation_report.questions.map(transformApiQuestionToQuestionFeedback);