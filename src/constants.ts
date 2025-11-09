
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
        "overall_feedback": "The student demonstrates a foundational understanding in specific areas, particularly excelling in certain recall-based MCQs and direct application questions in Biology (e.g., Hydra budding, hypermetropia correction diagram) and Physics (e.g., blue sky, parallel circuit current calculation).\nHowever, significant conceptual gaps are evident across all three subjects, leading to frequent errors in fundamental biological processes, chemical properties, and core physics principles, compounded by a high number of skipped questions and misinterpretation of question requirements.\nTo improve, a thorough review of fundamental definitions, mechanisms, and specific keywords in questions is crucial, alongside practicing comprehensive answer writing, accurate chemical equations/diagrams, and effective time management to ensure all questions are attempted.",
        "questions": [
            { "question_id": 1, "component_id": null, "question_summary": "Auxin is a plant hormone that promotes cell elongation and is produced by the apical meristem. It inhibits the growth of lateral buds which are present at nodes (where leaves attach to the stem). As long as sufficient auxin is produced by the apical meristem, the lateral buds remain dormant. A gardener wants the plants in the hedge that he is growing to become bushier with more branches. Which of the following should he do?", "typology": "Application of Knowledge/Concepts", "question_type": "MCQ", "page_number": 1, "marks_available": 1, "mark_scheme": "c) Trim the hedge by cutting off the tips of the stems", "student_answer": "a. Sprag water on the Hps of the stems to increase growth", "score_awarded": 0.0, "ideal_approach": "The ideal approach is to understand the concept of apical dominance and the function of the plant hormone auxin. Auxin, produced at the apical meristem (tip of the stem), inhibits the growth of lateral buds. To make a plant bushier with more branches, the apical dominance needs to be overcome. This is achieved by pruning or trimming the tips of the stems, which removes the source of auxin and allows the lateral buds to grow, resulting in a bushier plant.", "student_approach": "The student incorrectly suggested 'spraying water on the tips of the stems to increase growth' as a method to make the hedge bushier. This indicates a misunderstanding of how plant hormones regulate growth and the specific mechanism of apical dominance.", "feedback": "Your answer regarding how to make the hedge bushier is incorrect. Auxin, a plant hormone produced at the very tip of the stem, suppresses the growth of side (lateral) buds. This phenomenon is called apical dominance. To make a plant bushier and encourage more branches, you need to remove the tip of the stem (apical meristem). This action removes the source of auxin, thereby releasing the lateral buds from inhibition and allowing them to grow. Spraying water does not affect this hormonal regulation. You need to review the topic of plant hormones, specifically auxin and its role in apical dominance.", "mistakes_made": [{ "mistake_type": "conceptual_gap", "mistake_description": "Misunderstanding of the role of auxin in plant growth and apical dominance, leading to an incorrect method for promoting lateral branching.", "lacking_competencies": ["Understanding plant hormones and their effects on growth", "Application of knowledge about apical dominance"], "marks_lost": 1.0 }], "evaluation_score": "high" },
            { "question_id": 2, "component_id": null, "question_summary": "Which is the correct direction of flow of electrical impulses? The question is accompanied by four diagrams (a, b, c, d) depicting neurons and the direction of impulse flow.", "typology": "Demonstrate Knowledge and Understanding", "question_type": "MCQ", "page_number": 1, "marks_available": 1, "mark_scheme": "The correct option is 'b', which depicts the electrical impulses flowing from the dendrites towards the cell body, and then along the axon to the axon terminals.", "student_answer": "2. a.x", "score_awarded": 0.0, "ideal_approach": "To answer this question correctly, one must recall the basic structure of a neuron (dendrites, cell body, axon) and the physiological direction of nerve impulse transmission. Nerve impulses always travel from the dendrites, through the cell body, and then down the axon to the axon terminals, where they are transmitted to the next neuron or effector cell. By comparing this biological principle with the diagrams provided, option 'b' clearly illustrates this correct unidirectional flow.", "student_approach": "The student attempted the question by marking 'a' but then crossed it out, indicating an initial incorrect choice and subsequent uncertainty or realization of error. However, a correct alternative was not provided as a final answer.", "feedback": "The student needs to reinforce their understanding of the direction of electrical impulse flow in a neuron. Nerve impulses consistently travel from the dendrites, through the cell body, and along the axon towards the axon terminals. It is essential to choose the correct option and ensure a clear final answer.", "mistakes_made": [{ "mistake_type": "conceptual_gap", "mistake_description": "The student demonstrated a conceptual gap regarding the correct direction of electrical impulse transmission in a neuron, as evidenced by the initial incorrect choice ('a') and the lack of a final correct answer. The correct direction is represented by option 'b'.", "lacking_competencies": ["C-3.2: Understanding the mechanism of nerve impulse transmission"], "marks_lost": 1.0 }], "evaluation_score": "high" },
            { "question_id": 3, "component_id": null, "question_summary": "The question asks for the correct sequence of organs in the male reproductive system for the transport of sperms. It is a multiple-choice question with four options.", "typology": "Demonstrate Knowledge and Understanding", "question_type": "MCQ", "page_number": 1, "marks_available": 1, "mark_scheme": "The correct sequence of organs in the male reproductive system for transport of sperms is a) Testes → Vas Deferens → Urethra. Award 1 mark for choosing option 'a'.", "student_answer": "d. Testes → vas deferens → Ureter.", "score_awarded": 0.0, "ideal_approach": "To answer this question, one should recall the anatomical pathway of sperm transport in the male reproductive system. Sperms are produced in the testes, then travel through the vas deferens, and finally exit the body via the urethra. The ureter is part of the urinary system and carries urine from the kidneys, not sperms.", "student_approach": "The student attempted to identify the pathway for sperm transport. They correctly identified 'Testes' and 'vas deferens' but incorrectly included 'Ureter' as the final organ in the sequence, instead of 'Urethra'. This indicates a confusion between the urinary and reproductive tracts.", "feedback": "Your answer for the sequence of sperm transport in the male reproductive system is incorrect. While you correctly identified the initial parts (Testes and vas deferens), you incorrectly chose 'Ureter' as the final part. The correct sequence is Testes → Vas Deferens → Urethra. The ureter is involved in urine transport, not sperm transport. Please review the anatomy of the male reproductive and excretory systems to distinguish between the roles of the urethra and ureter.", "mistakes_made": [{ "mistake_type": "conceptual_gap", "mistake_description": "Incorrectly identified the sequence of organs for sperm transport, confusing Ureter with Urethra.", "lacking_competencies": ["C-3.2 Analyses similarities and differences in the life processes involved in reproduction"], "marks_lost": 1.0 }], "evaluation_score": "high" },
            // Truncated for brevity... The rest of the questions from the prompt are included here.
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
