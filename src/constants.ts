import type { Evaluation, QuestionFeedback, ApiEvaluationResponse } from './types';

export const MOCK_EVALUATIONS: Evaluation[] = [
  { id: 1, title: 'Mid-Term Physics Test', student: 'Harry Potter', date: '2024-11-09', status: 'Graded', score: 92, subject: 'Physics' },
  { id: 2, title: 'Science Set 1 QP', student: 'Anan Sharma', date: '2024-11-09', status: 'Needs Review', score: 37, subject: 'Science' },
  { id: 3, title: 'Potions Final Exam', student: 'Hermione Granger', date: '2024-11-08', status: 'Graded', score: 100, subject: 'Potions' },
  { id: 4, title: 'Transfiguration Quiz', student: 'Neville Longbottom', date: '2024-11-08', status: 'Processing', score: null, subject: 'Transfiguration' },
  { id: 5, title: 'Defense Against Dark Arts', student: 'Draco Malfoy', date: '2024-11-07', status: 'Graded', score: 85, subject: 'DADA' },
];

export const DETAILED_EVALUATION_DATA: ApiEvaluationResponse = {
    "id": "ac338709-cfef-4fa1-813d-b148a3f3bcde",
    "owner_id": "1fb7e392-3487-44b7-8c19-c874bb989eeb",
    "exam_template_id": null,
    "student_name": null,
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
            },
            {
                "question_id": 2,
                "component_id": null,
                "question_summary": "Which is the correct direction of flow of electrical impulses? The question is accompanied by four diagrams (a, b, c, d) depicting neurons and the direction of impulse flow.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 1,
                "marks_available": 1,
                "mark_scheme": "The correct option is 'b', which depicts the electrical impulses flowing from the dendrites towards the cell body, and then along the axon to the axon terminals.",
                "chapter_name": "Control and Coordination",
                "concepts_required": [
                    "Nerve impulse transmission",
                    "Structure of neuron",
                    "Direction of signal flow in nervous system"
                ],
                "student_answer": "2. a.x",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student initially selected option 'a', which is incorrect. Although they crossed it out, no correct final answer was provided. The correct option is 'b'.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.423728813559322,
                        "page_number": 1
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To answer this question correctly, one must recall the basic structure of a neuron (dendrites, cell body, axon) and the physiological direction of nerve impulse transmission. Nerve impulses always travel from the dendrites, through the cell body, and then down the axon to the axon terminals, where they are transmitted to the next neuron or effector cell. By comparing this biological principle with the diagrams provided, option 'b' clearly illustrates this correct unidirectional flow.",
                "student_approach": "The student attempted the question by marking 'a' but then crossed it out, indicating an initial incorrect choice and subsequent uncertainty or realization of error. However, a correct alternative was not provided as a final answer.",
                "feedback": "The student needs to reinforce their understanding of the direction of electrical impulse flow in a neuron. Nerve impulses consistently travel from the dendrites, through the cell body, and along the axon towards the axon terminals. It is essential to choose the correct option and ensure a clear final answer.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student demonstrated a conceptual gap regarding the correct direction of electrical impulse transmission in a neuron, as evidenced by the initial incorrect choice ('a') and the lack of a final correct answer. The correct direction is represented by option 'b'.",
                        "lacking_competencies": [
                            "C-3.2: Understanding the mechanism of nerve impulse transmission"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.423728813559322,
                        "page_number": 1
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.423728813559322,
                "evaluation_score": "high"
            },
            {
                "question_id": 3,
                "component_id": null,
                "question_summary": "The question asks for the correct sequence of organs in the male reproductive system for the transport of sperms. It is a multiple-choice question with four options.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 1,
                "marks_available": 1,
                "mark_scheme": "The correct sequence of organs in the male reproductive system for transport of sperms is a) Testes → Vas Deferens → Urethra. Award 1 mark for choosing option 'a'.",
                "chapter_name": "Reproduction",
                "concepts_required": [
                    "Male reproductive system",
                    "Sperm transport pathway"
                ],
                "student_answer": "d. Testes → vas deferens → Ureter.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student chose option 'd' which states Testes → vas deferens → Ureter. However, the correct sequence for sperm transport is Testes → Vas Deferens → Urethra, as given in option 'a'. The student incorrectly identified Ureter as part of the sperm transport pathway instead of Urethra.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.4745762711864407,
                        "page_number": 1
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To answer this question, one should recall the anatomical pathway of sperm transport in the male reproductive system. Sperms are produced in the testes, then travel through the vas deferens, and finally exit the body via the urethra. The ureter is part of the urinary system and carries urine from the kidneys, not sperms.",
                "student_approach": "The student attempted to identify the pathway for sperm transport. They correctly identified 'Testes' and 'vas deferens' but incorrectly included 'Ureter' as the final organ in the sequence, instead of 'Urethra'. This indicates a confusion between the urinary and reproductive tracts.",
                "feedback": "Your answer for the sequence of sperm transport in the male reproductive system is incorrect. While you correctly identified the initial parts (Testes and vas deferens), you incorrectly chose 'Ureter' as the final part. The correct sequence is Testes → Vas Deferens → Urethra. The ureter is involved in urine transport, not sperm transport. Please review the anatomy of the male reproductive and excretory systems to distinguish between the roles of the urethra and ureter.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Incorrectly identified the sequence of organs for sperm transport, confusing Ureter with Urethra.",
                        "lacking_competencies": [
                            "C-3.2 Analyses similarities and differences in the life processes involved in reproduction"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.4745762711864407,
                        "page_number": 1
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.4745762711864407,
                "evaluation_score": "high"
            },
            {
                "question_id": 4,
                "component_id": null,
                "question_summary": "The question describes the similar structures of haemoglobin and chlorophyll. It states that haemoglobin is composed of carbon, hydrogen, oxygen, and nitrogen, organized around iron, while chlorophyll is organized around magnesium. Based on this information, the student needs to identify which element in haemoglobin is most likely responsible for the red colour of blood.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 1,
                "marks_available": 1,
                "mark_scheme": "The element of haemoglobin most likely responsible for the red colour of our blood is iron. (d) iron",
                "chapter_name": "Life Processes",
                "concepts_required": [
                    "Composition of blood",
                    "Role of Haemoglobin",
                    "Elements in biological molecules",
                    "Interpreting given information"
                ],
                "student_answer": "4 b. nitrogen",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student incorrectly chose 'nitrogen'. The question explicitly states that haemoglobin is organized around 'iron', which is the element responsible for the red color of blood.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.5254237288135594,
                        "page_number": 1
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The question provides a direct clue: 'A molecule of haemoglobin is composed of the atoms of four elements – carbon, hydrogen, oxygen and nitrogen, all four organised around iron.' Since the question asks which element is MOST LIKELY responsible for the red colour of our blood and points out iron as the central organizing element for haemoglobin, the correct approach is to infer that iron is the answer. General biological knowledge also supports that iron in haemoglobin is responsible for its oxygen-carrying capacity and red colour.",
                "student_approach": "The student attempted to answer the multiple-choice question by selecting option 'b) nitrogen'. This indicates a misunderstanding or misinterpretation of the information provided in the question itself, which clearly states that haemoglobin is organized around 'iron'.",
                "feedback": "For question 4, you incorrectly chose 'nitrogen'. The question text explicitly mentions that haemoglobin is structured around 'iron'. This detail is a crucial clue. Remembering that iron is the central element in haemoglobin and is responsible for binding oxygen, giving blood its characteristic red colour, would have led you to the correct answer. Always pay close attention to the information given directly in the question, as it often contains key hints.",
                "mistakes_made": [
                    {
                        "mistake_type": "question_understanding",
                        "mistake_description": "The student failed to correctly identify iron as the element responsible for the red colour of blood, despite the information that haemoglobin is organized around iron being explicitly provided in the question stem.",
                        "lacking_competencies": [
                            "C-3.2 Analyses similarities and differences in the life processes involved in nutrition (photosynthesis in plants; absorption of nutrients in fungi; digestion in animals), transport (transport of water in plants; circulation in animals), exchange of materials (respiration and excretion), and reproduction"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.5254237288135594,
                        "page_number": 1
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.5254237288135594,
                "evaluation_score": "high"
            },
            {
                "question_id": 5,
                "component_id": null,
                "question_summary": "Read the following two statements and answer the question. 1. Gastroparesis is a disease in which the muscles of the stomach become paralysed and cannot contract or relax. 2. Foods high in fat can delay the process of digestion and the emptying of the stomach. Which of the following foods would be advised to a patient suffering from gastroparesis? Options: a) soups and juices only b) soups and chicken salads c) fried chicken and fried rice d) ice cream and milk only",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "MCQ",
                "page_number": 1,
                "marks_available": 1,
                "mark_scheme": "a) soups and juices only",
                "chapter_name": "Life Processes",
                "concepts_required": [
                    "Nutrition in humans",
                    "Digestion",
                    "Impact of diet on health",
                    "Understanding of disease conditions from provided text"
                ],
                "student_answer": "5. a. Soups and juices only",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified 'soups and juices only' as the advised food for a patient with gastroparesis, demonstrating an understanding of the provided information regarding the disease and the effect of fatty foods on digestion. Soups and juices are low in fat and easily digestible, which is suitable for a paralysed stomach.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.5932203389830508,
                        "page_number": 1
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "The ideal approach is to first understand the condition of gastroparesis as described: stomach muscles are paralysed, affecting contraction and relaxation. Second, note the effect of high-fat foods: they delay digestion. Combining these, a patient with gastroparesis should consume foods that are easy to digest and low in fat. Evaluating the given options, 'soups and juices only' fit this criterion best, while other options contain high-fat or solid foods that would be difficult for a paralysed stomach to process.",
                "student_approach": "The student correctly selected option (a) 'Soups and juices only'. This indicates that the student successfully processed the information provided in the question about gastroparesis and the impact of high-fat foods, and applied this understanding to choose the most appropriate dietary recommendation.",
                "feedback": "Excellent work! You correctly identified that soups and juices are the most appropriate food for a patient with gastroparesis. This demonstrates a clear understanding of the provided information about the condition and the physiological effects of different food types on digestion.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.5762711864406779,
                "evaluation_score": "high"
            },
            {
                "question_id": 6,
                "component_id": null,
                "question_summary": "The image shows a bud developing on a Hydra. How does the bud develop in the Hydra? Options: a) Bud develops due to separation of body parts of Hydra b) Bud develops due to repetitive cell division at a specific site c)Bud develops due to change in the environmental conditions d) Bud develops due to attachment of another Hydra at a specific site",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 1,
                "marks_available": 1,
                "mark_scheme": "b. Bud develops due to repetitive cell division at a specific site",
                "chapter_name": "The World of the Living",
                "concepts_required": [
                    "Asexual Reproduction",
                    "Budding in Hydra",
                    "Cell Division"
                ],
                "student_answer": "6. b. Bud develops due to repetitive cell division at a specific site.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified that the bud in Hydra develops due to repetitive cell division at a specific site, which matches option (b) and the mark scheme.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.6271186440677966,
                        "page_number": 1
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To answer this question, one needs to recall the process of asexual reproduction, specifically budding, in Hydra. Budding in Hydra occurs when repetitive cell divisions at a specific site on the parent's body lead to the formation of a small outgrowth or bud. This bud then develops into a new individual.",
                "student_approach": "The student chose option 'b' and wrote the correct statement: 'Bud develops due to repetitive cell division at a specific site.' This directly aligns with the biological process of budding in Hydra.",
                "feedback": "Excellent answer! You have accurately explained how budding occurs in Hydra, demonstrating a clear understanding of asexual reproduction. Keep up the good work!",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.6271186440677966,
                "evaluation_score": "high"
            },
            {
                "question_id": 7,
                "component_id": null,
                "question_summary": "Which of the following best explains why sexual reproduction is important for evolution? a) It produces more offspring than asexual reproduction b) It produces variations which may help organisms adapt c) It prevents environmental changes d) It keeps all offspring identical to parents",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 1,
                "marks_available": 1,
                "mark_scheme": "b) It produces variations which may help organisms adapt",
                "chapter_name": "Heredity and Evolution",
                "concepts_required": [
                    "Sexual Reproduction",
                    "Variation",
                    "Evolution",
                    "Heredity"
                ],
                "student_answer": "b. It produces variations which may help organisms adapt.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified that sexual reproduction is important for evolution because it produces variations that help organisms adapt, which aligns with the mark scheme.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.711864406779661,
                        "page_number": 1
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To answer this question, one should recall the fundamental principles of sexual reproduction and its role in evolution. Sexual reproduction involves the combination of genetic material from two parents, leading to genetic recombination and hence variations in the offspring. These variations are crucial for natural selection, allowing populations to adapt to changing environments over generations and driving the process of evolution. Therefore, the option stating that sexual reproduction produces variations which may help organisms adapt is the most accurate explanation.",
                "student_approach": "The student correctly selected option 'b', demonstrating an understanding of the relationship between sexual reproduction, variation, and adaptation in the context of evolution.",
                "feedback": "Excellent answer! You have correctly identified that sexual reproduction is crucial for evolution because it introduces variations, which are essential for organisms to adapt to changing environments. Keep up the good work in understanding fundamental biological processes.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.6949152542372882,
                "evaluation_score": "high"
            },
            {
                "question_id": 8,
                "component_id": null,
                "question_summary": "The following two questions consist of two statements Assertion (A) and Reason (R). Answer these questions by selecting the appropriate option given below: Assertion (A): Auxins promote the elongation of cells in shoots. Reason (R): Auxins accumulate on the side of the shoot exposed to sunlight.",
                "typology": "Assertion-Reasoning type questions",
                "question_type": "MCQ",
                "page_number": 1,
                "marks_available": 1,
                "mark_scheme": "C. A is true but R is false.",
                "chapter_name": "Control and Co-ordination in Plants",
                "concepts_required": [
                    "Plant hormones",
                    "Auxins",
                    "Phototropism",
                    "Plant growth and development"
                ],
                "student_answer": "A. Both A and R are true, and R is the correct explanation of A",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student incorrectly chose option A. While Assertion (A) is true (auxins promote cell elongation), Reason (R) is false. Auxins move away from light and accumulate on the shaded side of the shoot, not the side exposed to sunlight. Therefore, the student's reasoning for R and the explanation provided is incorrect.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.7627118644067797,
                        "page_number": 1
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To answer this assertion-reasoning question correctly, one must first evaluate the truthfulness of Assertion (A) and Reason (R) independently, and then determine if Reason (R) correctly explains Assertion (A). Assertion (A) states that Auxins promote the elongation of cells in shoots, which is a correct physiological function of auxins. Reason (R) states that Auxins accumulate on the side of the shoot exposed to sunlight. This is incorrect; auxins migrate to the shaded side of the shoot, causing cells on that side to elongate more, leading to phototropism (bending towards light). Since Assertion (A) is true and Reason (R) is false, the correct option is C.",
                "student_approach": "The student has identified option A, which states that both Assertion (A) and Reason (R) are true, and R is the correct explanation of A. This indicates that the student correctly understood Assertion (A) but has a misconception regarding the effect of sunlight on auxin distribution in shoots, leading to an incorrect assessment of Reason (R).",
                "feedback": "Your understanding that auxins are involved in cell elongation (Assertion A) is correct. However, there is a misunderstanding regarding how auxins respond to light. Auxins actually move *away* from light and accumulate on the *shaded* side of the shoot. This unequal distribution causes the cells on the shaded side to grow longer, bending the shoot towards the light source (phototropism). Therefore, Reason (R) is false, making option C the correct answer. Review the concept of phototropism and auxin distribution in plants.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Misconception about the effect of sunlight on auxin distribution in plant shoots. The student incorrectly believes auxins accumulate on the sun-exposed side rather than the shaded side.",
                        "lacking_competencies": [
                            "Understanding the mechanism of plant hormones",
                            "Knowledge of phototropism in plants"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.7627118644067797,
                        "page_number": 1
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.7627118644067797,
                "evaluation_score": "high"
            },
            {
                "question_id": 9,
                "component_id": null,
                "question_summary": "The question consists of two statements, Assertion (A) and Reason (R). Assertion (A) states: 'Pollen grains from the carpel stick to the stigma of stamen'. Reason (R) states: 'The fertilized egg cells grow inside the ovules and become seeds'. The task is to select the appropriate option: A. Both A and R are true, and R is the correct explanation of A. B. Both A and R are true, and R is not the correct explanation of A. C. A is true but R is false. D. A is false but R is true.",
                "typology": "Assertion – Reasoning type question",
                "question_type": "MCQ",
                "page_number": 1,
                "marks_available": 1,
                "mark_scheme": "(d) A is False but R is true.",
                "chapter_name": "How do organisms reproduce",
                "concepts_required": [
                    "Plant Reproduction",
                    "Parts of a flower (carpel, stigma, stamen, anther)",
                    "Pollination",
                    "Fertilization in plants",
                    "Development of ovule into seed"
                ],
                "student_answer": "D. A is false but R. is true.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified that Assertion (A) is false because pollen grains are produced by the stamen and stick to the stigma of the carpel, not vice-versa. The student also correctly identified that Reason (R) is true, as fertilized egg cells (zygotes) develop into embryos within the ovules, which then become seeds. The chosen option D aligns with the correct analysis.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.847457627118644,
                        "page_number": 1
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To answer this assertion-reasoning question, one must first evaluate the truthfulness of Assertion (A) and Reason (R) independently. Assertion (A) states 'Pollen grains from the carpel stick to the stigma of stamen'. This is incorrect. Pollen grains are produced by the anther (part of the stamen) and are transferred to the stigma (part of the carpel). Therefore, Assertion (A) is False. Reason (R) states 'The fertilized egg cells grow inside the ovules and become seeds'. This statement is correct. After fertilization, the zygote (fertilized egg cell) develops into an embryo inside the ovule, and the ovule matures into a seed. Since A is False and R is True, the correct option is D.",
                "student_approach": "The student directly chose option D, 'A is false but R. is true.', which is the correct answer. This indicates a correct understanding of the biological facts presented in both the assertion and the reason.",
                "feedback": "Excellent work! You have correctly identified that Assertion (A) is false and Reason (R) is true. This demonstrates a clear understanding of the process of plant reproduction, including the roles of different floral parts and the outcomes of fertilization. Keep up the good work!",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.847457627118644,
                "evaluation_score": "high"
            },
            {
                "question_id": 10,
                "component_id": "a",
                "question_summary": "State one role of Hydrochloric acid in the human digestive system.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 1,
                "marks_available": 1,
                "mark_scheme": "Hydrochloric acid creates an acidic medium which facilitates the action of the enzyme pepsin aiding in the digestion of proteins into smaller peptides.",
                "chapter_name": "Life Processes",
                "concepts_required": [
                    "Human digestive system",
                    "Role of Hydrochloric acid",
                    "Enzyme action (pepsin)"
                ],
                "student_answer": "Hydrochloric acid is located in the stomach and it heips in breaking down down food.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identifies the location of Hydrochloric acid (stomach) and its general role (breaking down food), but fails to mention the specific details regarding creating an acidic medium and facilitating the action of the enzyme pepsin for protein digestion, as required by the mark scheme for the full mark.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.9322033898305084,
                        "page_number": 1
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The ideal approach is to state that Hydrochloric acid creates an acidic medium in the stomach, which is essential for the activation and optimal functioning of the enzyme pepsin, thereby aiding in the digestion of proteins into smaller peptides.",
                "student_approach": "The student identifies that Hydrochloric acid is in the stomach and helps in breaking down food, which is a generalized and incomplete function. The specific enzymatic role and the acidic medium creation are missing.",
                "feedback": "Your answer correctly identifies the location of Hydrochloric acid in the stomach and its general role in breaking down food. However, for a complete answer, it is crucial to mention that it creates an acidic medium, which is necessary for the enzyme pepsin to act and digest proteins. Focus on the specific biochemical role in digestion.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student's answer lacked specific details about how Hydrochloric acid functions in digestion, specifically omitting its role in creating an acidic medium and activating pepsin for protein digestion.",
                        "lacking_competencies": [
                            "C-3.2 Analyses similarities and differences in the life processes involved in nutrition (digestion in animals)"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.9322033898305084,
                        "page_number": 1
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.9152542372881355,
                "evaluation_score": "medium"
            },
            {
                "question_id": 10,
                "component_id": "b",
                "question_summary": "State one role of Villi in the human digestive system.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "Villi are finger-like projections in the small intestine that increase the surface area for nutrient absorption. They play a vital role in absorbing nutrients such as amino acids, fatty acids, and glucose into the bloodstream.",
                "chapter_name": "Life Processes",
                "concepts_required": [
                    "Human Digestive System",
                    "Structure and Function of Villi",
                    "Nutrient Absorption"
                ],
                "student_answer": "not found",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student did not attempt to answer this question.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 3
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The ideal approach is to identify that villi are finger-like projections in the small intestine and state their primary role, which is to increase the surface area for efficient absorption of digested nutrients (like amino acids, fatty acids, and glucose) into the bloodstream.",
                "student_approach": "The student did not attempt this question.",
                "feedback": "The student did not attempt question 10 (b). It is essential to attempt all questions to secure marks. This question tests the basic understanding of the role of villi in the human digestive system, a fundamental concept in Life Processes.",
                "mistakes_made": [
                    {
                        "mistake_type": "skipped",
                        "mistake_description": "The student did not attempt to answer question 10 (b).",
                        "lacking_competencies": [
                            "Demonstrate Knowledge and Understanding"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 3
                    }
                ],
                "x_coordinate": 0.0,
                "y_coordinate": 0.0,
                "evaluation_score": "high"
            },
            {
                "question_id": 11,
                "component_id": "A(a)",
                "question_summary": "Ravi noticed changes such as a deeper voice and growth of facial hair. Name the hormone responsible for the changes seen in Ravi.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 2,
                "marks_available": 1,
                "mark_scheme": "The hormone responsible for the changes seen in Ravi is testosterone. (1 mark)",
                "chapter_name": "Control and Co-ordination in animals and plants",
                "concepts_required": [
                    "Hormonal regulation in humans",
                    "Puberty",
                    "Male hormones"
                ],
                "student_answer": "a. Testosterone",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified 'Testosterone' as the hormone responsible for the changes seen in Ravi.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.23728813559322035,
                        "page_number": 2
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "The ideal approach is to recall the male sex hormone responsible for secondary sexual characteristics during puberty, which is testosterone.",
                "student_approach": "The student directly provided the correct name of the hormone, 'Testosterone'.",
                "feedback": "Excellent work! You have correctly identified the hormone responsible for the changes observed in Ravi. This shows a clear understanding of hormonal functions during puberty.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.23728813559322035,
                "evaluation_score": "high"
            },
            {
                "question_id": 11,
                "component_id": "A(b)",
                "question_summary": "Name the hormone that helps regulate the cousin's blood sugar level.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 2,
                "marks_available": 1,
                "mark_scheme": "The hormone that regulates blood sugar level in his cousin is insulin. (1 mark)",
                "chapter_name": "Control and Co-ordination",
                "concepts_required": [
                    "Hormonal regulation",
                    "Insulin",
                    "Blood sugar level regulation",
                    "Endocrine system"
                ],
                "student_answer": "not found",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student did not attempt this part of the question.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.2542372881355932,
                        "page_number": 2
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To answer this question, one should recall the endocrine system and the specific hormones involved in regulating blood sugar levels. Insulin, secreted by the pancreas, is the primary hormone responsible for lowering blood glucose.",
                "student_approach": "The student did not attempt this part of the question.",
                "feedback": "The question asked to name the hormone responsible for regulating blood sugar levels. The correct answer is 'Insulin'. It is important to know the functions of various hormones in the human body, especially their roles in crucial physiological processes like blood sugar regulation. Make sure to review the endocrine system and the specific roles of its hormones.",
                "mistakes_made": [
                    {
                        "mistake_type": "skipped",
                        "mistake_description": "The student did not attempt this part of the question.",
                        "lacking_competencies": [
                            "Conceptual understanding of hormonal regulation in animals",
                            "Recall of specific hormones and their functions"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.2542372881355932,
                        "page_number": 2
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.2542372881355932,
                "evaluation_score": "high"
            },
            {
                "question_id": 12,
                "component_id": "a",
                "question_summary": "A farmer bought some strawberries and liked the taste. He decided to grow his own strawberries that should have the same taste. Which method of cultivation should the farmer adopt?",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 6,
                "marks_available": 1,
                "mark_scheme": "(a) asexual reproduction / vegetative propagation",
                "chapter_name": "Reproduction",
                "concepts_required": [
                    "Asexual Reproduction",
                    "Vegetative Propagation"
                ],
                "student_answer": "a. The farmer should use vegetative propogation",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly identified vegetative propagation as the suitable method of cultivation.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.23728813559322035,
                        "page_number": 6
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "The farmer's goal is to grow strawberries with the exact same taste as the original plant. To ensure genetic identicalness, an asexual method of reproduction is necessary. Vegetative propagation, a form of asexual reproduction, involves growing new plants from parts of the parent plant (like runners, which strawberries produce). This process results in genetically identical offspring, thus preserving the desired taste and other characteristics.",
                "student_approach": "The student correctly identified 'vegetative propagation' as the method the farmer should use to cultivate strawberries to achieve the same taste.",
                "feedback": "Excellent answer! You correctly identified vegetative propagation as the most appropriate method for the farmer to ensure the new strawberries have the same desired taste. This shows a clear understanding of asexual reproduction in plants.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.23728813559322035,
                "evaluation_score": "high"
            },
            {
                "question_id": 12,
                "component_id": "b",
                "question_summary": "A farmer bought some strawberries and liked the taste. He decided to grow his own strawberries that should have the same taste. Why would the farmer choose a specific cultivation method for this purpose?",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 6,
                "marks_available": 1,
                "mark_scheme": "because fruit produced through vegetative propagation would carry conserved parental characteristics",
                "chapter_name": "Reproduction",
                "concepts_required": [
                    "Asexual reproduction",
                    "Vegetative propagation",
                    "Inheritance of traits"
                ],
                "student_answer": "ne should choose this method because to achieve the same taste. it should grow fasier",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly identifies 'same taste' as a benefit of the method, showing partial understanding that traits are maintained.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.288135593220339,
                        "page_number": 6
                    }
                ],
                "score_awarded": 0.5,
                "ideal_approach": "The ideal approach is to state that vegetative propagation results in offspring that are genetically identical to the parent plant. Therefore, the fruit produced will carry the same conserved parental characteristics, ensuring the desired taste is maintained.",
                "student_approach": "The student identifies 'same taste' as a reason for choosing the method, which is a correct outcome. However, they also mention 'it should grow faster', which, while a benefit of vegetative propagation, is not the specific reason for ensuring the 'same taste'. The answer lacks the explicit biological principle of conserved parental characteristics.",
                "feedback": "Your answer correctly identifies that vegetative propagation helps achieve the 'same taste'. This is a good observation. To earn full marks, you should explicitly state the biological reason: vegetative propagation produces genetically identical offspring, thus conserving all parental characteristics, including taste. The mention of 'growing faster' is a benefit but not the reason for ensuring the same taste.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Failed to explicitly state the underlying biological principle that vegetative propagation preserves conserved parental characteristics due to genetic identicality, which is the direct reason for maintaining the 'same taste'.",
                        "lacking_competencies": [
                            "Explaining mechanisms of reproduction",
                            "Understanding genetic basis of traits"
                        ],
                        "marks_lost": 0.5,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.288135593220339,
                        "page_number": 6
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.2711864406779661,
                "evaluation_score": "medium"
            },
            {
                "question_id": 13,
                "component_id": "a",
                "question_summary": "We often hear people complain about 'acidity' in the stomach. Overproduction of what substance is most likely the reason for the complaint?",
                "typology": "Understanding",
                "question_type": "SA",
                "page_number": 2,
                "marks_available": 1,
                "mark_scheme": "(a) hydrochloric acid",
                "chapter_name": "Life Processes",
                "concepts_required": [
                    "Human Digestive System",
                    "Function of stomach acid",
                    "Acidity"
                ],
                "student_answer": "Over production of hydrochloric acid",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified 'hydrochloric acid' as the substance whose overproduction causes acidity in the stomach.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.3389830508474576,
                        "page_number": 2
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "The ideal approach is to recall the name of the acid produced in the stomach that, when overproduced, leads to acidity. The correct answer is hydrochloric acid.",
                "student_approach": "The student directly stated 'hydrochloric acid' as the cause of overproduction leading to acidity, which is correct.",
                "feedback": "Excellent. You have correctly identified the substance responsible for stomach acidity. Keep up the good work.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.3220338983050847,
                "evaluation_score": "high"
            },
            {
                "question_id": 13,
                "component_id": "b",
                "question_summary": "Why is the production of hydrochloric acid necessary in the stomach?",
                "typology": "Understanding",
                "question_type": "SA",
                "page_number": 2,
                "marks_available": 1,
                "mark_scheme": "It creates an acidic medium for functioning of enzyme pepsin.",
                "chapter_name": "Life Processes",
                "concepts_required": [
                    "Human Digestion",
                    "Role of Hydrochloric Acid",
                    "Enzyme Function (Pepsin)"
                ],
                "student_answer": "the production of hydrochloric acid is necessary because it helps in breaking down food.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student provides a general reason that HCl 'helps in breaking down food,' which is a consequence, but does not state the specific biological necessity of creating an acidic medium for the functioning of enzyme pepsin, as required by the mark scheme.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.3559322033898305,
                        "page_number": 2
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The ideal approach is to state that hydrochloric acid creates an acidic medium in the stomach. This acidic medium is crucial for the activation and optimal functioning of the enzyme pepsin, which is responsible for protein digestion.",
                "student_approach": "The student's approach was to state a general function of hydrochloric acid in digestion ('helps in breaking down food'). While partially true, it lacks the specific biological mechanism involving enzyme activity, which is the core of the expected answer.",
                "feedback": "Your answer correctly identifies that hydrochloric acid plays a role in breaking down food. However, for a complete answer, you need to specify the exact mechanism: hydrochloric acid creates an acidic environment that is essential for the enzyme pepsin to effectively digest proteins in the stomach. Focus on the specific enzymatic function rather than a general outcome.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Failed to mention the specific function of hydrochloric acid in creating an acidic medium for the activation and optimal functioning of the enzyme pepsin.",
                        "lacking_competencies": [
                            "C-3.2 Analyses similarities and differences in the life processes involved in nutrition (digestion in animals)"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.3559322033898305,
                        "page_number": 2
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.3389830508474576,
                "evaluation_score": "medium"
            },
            {
                "question_id": 13,
                "component_id": "c",
                "question_summary": "How does the stomach prevent itself from the harmful effects of overproduction of the substance (hydrochloric acid)?",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "The stomach also produces mucus that coats the lining to prevent damage by hydrochloric acid.",
                "chapter_name": "Life Processes",
                "concepts_required": [
                    "Stomach",
                    "Hydrochloric acid",
                    "Mucus",
                    "Digestive system protection mechanisms"
                ],
                "student_answer": "not found",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student did not attempt this question.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 3
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To answer this question, the student should recall the protective mechanisms of the stomach lining. Specifically, the student should identify that the stomach produces mucus, which forms a protective layer, safeguarding the stomach wall from the corrosive action of hydrochloric acid.",
                "student_approach": "Student did not attempt the question.",
                "feedback": "It is crucial to attempt all questions in the examination. Even if you are unsure of the complete answer, writing down any relevant information might earn you partial marks. For this specific question, revising the topic of 'Life Processes', particularly the 'Human Digestive System' and its protective mechanisms, would be beneficial. Ensure you understand how the stomach's inner lining is protected from its own acidic secretions.",
                "mistakes_made": [
                    {
                        "mistake_type": "skipped",
                        "mistake_description": "The student did not attempt question 13 (c).",
                        "lacking_competencies": [
                            "C-3.2 Analyses similarities and differences in the life processes involved in nutrition (digestion in animals)",
                            "Demonstrate Knowledge and Understanding"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 3
                    }
                ],
                "x_coordinate": 0.0,
                "y_coordinate": 0.0,
                "evaluation_score": "high"
            },
            {
                "question_id": 14,
                "component_id": null,
                "question_summary": "Define reflex action. With the help of a flow chart show the path of reflex action such as sneezing.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 6,
                "marks_available": 3,
                "mark_scheme": "Reflex action is a sudden and involuntary response to stimuli. It helps organisms to quickly adapt to an adverse circumstance that could have the potential to cause bodily harm or even death. (1 mark for definition). Flowchart for sneezing reflex: Stimulus (Receptors in Nose) -> Sensory Neuron -> Spinal Cord (CNS) -> Motor Neuron -> Sneezing (Response). (2 marks for flow chart, components and arrows).",
                "chapter_name": "Control and Co-ordination in Animals and Plants",
                "concepts_required": [
                    "Reflex action",
                    "Reflex arc",
                    "Components of nervous system (receptors, sensory neuron, spinal cord, motor neuron, effector)"
                ],
                "student_answer": "14. Reflex Action is such an action that happens instantly when we feel harm or want to do actions even as Sneezing. Bram gets the urge to sends signal to Sneeze Spinal cora to arm YFNour arm when sneezing",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student provided a partial definition of reflex action, mentioning its instant nature and response to harm, but missed key aspects like involuntary response to stimuli and its adaptive purpose.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.33898305084745767,
                        "page_number": 6
                    },
                    {
                        "reasoning": "The student's flowchart is largely incorrect, including 'Brain gets the urge to' and 'sends signal to' as components, and failing to identify the specific neural pathway (sensory neuron, relay neuron, motor neuron) accurately. Only 'Spinal cora' is a correct component.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.4406779661016949,
                        "page_number": 6
                    }
                ],
                "score_awarded": 0.5,
                "ideal_approach": "To answer this question, first, accurately define reflex action as a sudden, involuntary, and rapid response to a stimulus, occurring without conscious thought. Second, construct a detailed flowchart illustrating the reflex arc for sneezing. This should include the stimulus (e.g., irritants in the nasal passage), the receptor (sensory nerve endings in the nose), the afferent (sensory) neuron, the relay neuron in the spinal cord, the efferent (motor) neuron, and the effector (muscles involved in sneezing, like diaphragm and abdominal muscles), leading to the response (sneezing).",
                "student_approach": "The student attempted to define reflex action by stating it happens instantly in response to harm, which is partially correct. For the flowchart, the student tried to depict a sequence of events for sneezing, starting with the brain and including the spinal cord, but failed to correctly identify the specific neural components and their accurate sequence within a reflex arc.",
                "feedback": "Your definition of reflex action is a good start, mentioning the instant nature of the response. However, it needs to be more comprehensive by including that it is an involuntary response to a specific stimulus, and its purpose is often to protect the body. For the flowchart of the sneezing reflex, there are significant conceptual gaps. The brain is generally not directly involved in the immediate reflex arc; it's primarily mediated by the spinal cord. You need to clearly identify the components of a reflex arc: stimulus, receptor, sensory neuron, relay neuron (in spinal cord), motor neuron, and effector. Please review the specific neural pathways involved in a reflex arc to ensure you can accurately represent them.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Incomplete definition of reflex action, missing crucial aspects like involuntary nature and protective function.",
                        "lacking_competencies": [
                            "C-3.2 Analyses similarities and differences in the life processes involved in nutrition... control and coordination"
                        ],
                        "marks_lost": 0.5,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.33898305084745767,
                        "page_number": 6
                    },
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Incorrect and incomplete representation of the reflex arc in the flowchart. Key neural components (sensory neuron, relay neuron, motor neuron) were not identified, and irrelevant/incorrect components like 'Brain gets the urge to' were included.",
                        "lacking_competencies": [
                            "C-3.2 Analyses similarities and differences in the life processes involved in nutrition... control and coordination"
                        ],
                        "marks_lost": 2.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.4406779661016949,
                        "page_number": 6
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.33898305084745767,
                "evaluation_score": "medium"
            },
            {
                "question_id": 15,
                "component_id": "a",
                "question_summary": "Define fertilisation.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 2,
                "marks_available": 1,
                "mark_scheme": "The fusion of the male gamete (sperm) with the female gamete (ovum) to form a zygote.",
                "chapter_name": "How do Organisms Reproduce",
                "concepts_required": [
                    "Fertilisation",
                    "Gametes",
                    "Zygote formation",
                    "Sexual Reproduction"
                ],
                "student_answer": "X",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student did not attempt the question. An 'X' is marked, indicating it was either skipped or incorrectly marked by the student.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.45762711864406774,
                        "page_number": 2
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The ideal approach is to define fertilisation as the process of fusion of male gamete (sperm) and female gamete (ovum) to form a zygote.",
                "student_approach": "The student did not attempt to answer this question.",
                "feedback": "The question was not attempted. To score marks, it is crucial to provide a clear and accurate definition of fertilisation, including the fusion of male and female gametes to form a zygote.",
                "mistakes_made": [
                    {
                        "mistake_type": "skipped",
                        "mistake_description": "The student did not attempt to answer question 15 (a).",
                        "lacking_competencies": [
                            "C-3.2 Analyses similarities and differences in the life processes involved in reproduction."
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.45762711864406774,
                        "page_number": 2
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.45762711864406774,
                "evaluation_score": "high"
            },
            {
                "question_id": 15,
                "component_id": "b",
                "question_summary": "Question 15 (b) asks: Why is only one sperm able to fertilise the egg even though many reach it?",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 2,
                "marks_available": 1,
                "mark_scheme": "As soon as one sperm enters the egg, the membrane of the egg becomes impermeable to other sperms, preventing polyspermy.",
                "chapter_name": "How do Organisms Reproduce",
                "concepts_required": [
                    "Fertilization",
                    "Sperm",
                    "Egg",
                    "Polyspermy prevention"
                ],
                "student_answer": "Only one sperm is abic to fertilize the egg even movgn many reach it is because only and sperm rs required.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student states that only one sperm is required, which is a tautological statement and does not explain the biological mechanism by which polyspermy is prevented. The answer lacks the key scientific explanation of the egg membrane becoming impermeable after the first sperm entry.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.4915254237288135,
                        "page_number": 2
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The ideal approach is to explain that upon the entry of one sperm, the egg's membrane undergoes changes, making it impermeable to other sperms, thus preventing polyspermy.",
                "student_approach": "The student stated that 'only one sperm is required' as the reason, which is an incorrect and incomplete explanation. They failed to describe the biological mechanism that ensures only one sperm fertilizes the egg.",
                "feedback": "Your answer for this question is incomplete and does not explain the scientific mechanism. While it is true that only one sperm fertilizes an egg, you need to explain *how* the egg ensures this, especially when many sperms are present. After one sperm enters the egg, the egg's membrane changes to prevent any other sperm from entering. This mechanism is crucial for proper development.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student incorrectly explained the mechanism of single sperm fertilization by stating that 'only one sperm is required' instead of detailing the changes in the egg membrane to prevent polyspermy.",
                        "lacking_competencies": [
                            "C-3.2 Analyses similarities and differences in the life processes involved in reproduction",
                            "C-7.1 States concepts that represent the most current understanding of the matter being studied"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.4915254237288135,
                        "page_number": 2
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.4745762711864407,
                "evaluation_score": "medium"
            },
            {
                "question_id": 15,
                "component_id": "c",
                "question_summary": "What is the cell formed immediately after fertilisation called?",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 2,
                "marks_available": 1,
                "mark_scheme": "c) Zygote",
                "chapter_name": "How do Organisms Reproduce",
                "concepts_required": [
                    "Fertilisation",
                    "Zygote formation",
                    "Embryo development"
                ],
                "student_answer": "The cell formed immediately is called after fertilisation is called embryo.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student incorrectly identified the cell formed immediately after fertilisation as an 'embryo' instead of a 'zygote'. The embryo is formed after repeated divisions of the zygote, not immediately after fertilisation.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.559322033898305,
                        "page_number": 2
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The fusion of the male gamete (sperm) with the female gamete (ovum) results in the formation of a single cell called a zygote. This zygote is the cell formed immediately after fertilisation.",
                "student_approach": "The student states that the cell formed immediately after fertilisation is an 'embryo'. This shows a misunderstanding of the initial product of fertilisation.",
                "feedback": "You have confused the 'zygote' with the 'embryo'. The cell formed immediately after fertilisation is the zygote. The embryo develops from the zygote after it undergoes several rounds of cell division. Review the stages of development after fertilisation to understand the sequence correctly.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Confused 'zygote' (the initial cell formed by fertilisation) with 'embryo' (which develops from the zygote after cell division).",
                        "lacking_competencies": [
                            "C-3.2: Analyses similarities and differences in the life processes involved in reproduction"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.559322033898305,
                        "page_number": 2
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.5423728813559322,
                "evaluation_score": "medium"
            },
            {
                "question_id": 15,
                "component_id": "e",
                "question_summary": "State the importance of placenta during pregnancy.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 2,
                "marks_available": 1,
                "mark_scheme": "Placenta allows exchange of nutrients, oxygen, and waste products between the mother and the foetus. It also secretes hormones required to maintain pregnancy.",
                "chapter_name": "How do Organisms Reproduce (The World of the Living)",
                "concepts_required": [
                    "Human Reproduction",
                    "Placenta",
                    "Pregnancy",
                    "Nutrient exchange",
                    "Gas exchange",
                    "Waste removal",
                    "Hormone secretion"
                ],
                "student_answer": "Placenta is where the foetus gets food from",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified one major function of the placenta, which is to provide food/nutrients to the foetus. This covers a part of the expected answer.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.5932203389830508,
                        "page_number": 2
                    }
                ],
                "score_awarded": 0.5,
                "ideal_approach": "The ideal approach is to state that the placenta facilitates the exchange of nutrients, oxygen, and waste products between the mother and the foetus, and also secretes hormones necessary for maintaining pregnancy.",
                "student_approach": "The student mentioned that the placenta is where the foetus gets food from, correctly identifying its role in nutrient supply. However, the answer was incomplete as it missed other critical functions.",
                "feedback": "Your answer correctly identifies that the placenta is responsible for providing food to the foetus. To improve, remember that the placenta has multiple vital functions during pregnancy, including the exchange of oxygen and waste products, and the secretion of essential hormones.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student's answer was incomplete, missing the other crucial functions of the placenta such as the exchange of oxygen and waste products, and its role in hormone secretion.",
                        "lacking_competencies": [
                            "C-3.2: Analyses similarities and differences in the life processes involved in reproduction"
                        ],
                        "marks_lost": 0.5,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.5932203389830508,
                        "page_number": 2
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.5932203389830508,
                "evaluation_score": "high"
            },
            {
                "question_id": 16,
                "component_id": "A(i)",
                "question_summary": "What is meant by inherited traits? How do such differences arise among students even though they are of the same species?",
                "typology": "Heredity - Analysis-Application",
                "question_type": "LA",
                "page_number": 2,
                "marks_available": 2,
                "mark_scheme": "A. a) Traits or characteristics that are passed from parents to offspring through genes. Because of variations in the combination of genes inherited from parents during sexual reproduction.",
                "chapter_name": "Heredity and Evolution",
                "concepts_required": [
                    "Inherited traits",
                    "Genes",
                    "Heredity",
                    "Genetic variation",
                    "Sexual reproduction"
                ],
                "student_answer": "i. Inherited traits are such traits which a person inherits from the older generations of his/her family. Even though students are of the same species, differences arised when there was a very ting tiny change in the gene which was inherited by the students",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly defined inherited traits as characteristics inherited from older generations/family, which aligns with the mark scheme's 'passed from parents to offspring'.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.6779661016949152,
                        "page_number": 2
                    },
                    {
                        "reasoning": "The student vaguely mentioned 'tiny change in the gene' for differences, which is insufficient. The mark scheme requires explaining variations in the combination of genes inherited during sexual reproduction.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.6949152542372882,
                        "page_number": 2
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "Inherited traits are characteristics or features passed from parents to their offspring through genes. Differences among individuals of the same species arise primarily due to variations in the combination of genes inherited from parents during sexual reproduction. Genetic recombination during meiosis and the random fusion of gametes contribute to these variations.",
                "student_approach": "The student correctly defined inherited traits as characteristics inherited from older generations. However, their explanation for how differences arise within the same species was vague, attributing it to a 'tiny change in the gene' rather than the recombination and variation of genes through sexual reproduction.",
                "feedback": "Your definition of inherited traits is good, clearly stating they are passed down from older generations. To improve, for the second part of the question, ensure you explain that differences within a species arise due to the unique combination of genes inherited from parents during sexual reproduction, which leads to genetic variation, rather than just a 'tiny change in the gene'.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student did not adequately explain how genetic differences arise among individuals of the same species, failing to mention the role of gene combination during sexual reproduction.",
                        "lacking_competencies": [
                            "C-3.3 Describes mechanisms of heredity (in terms of DNA, genes, chromosomes) and variation (as changes in the sequence of DNA)"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.6949152542372882,
                        "page_number": 2
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.6779661016949152,
                "evaluation_score": "medium"
            },
            {
                "question_id": 16,
                "component_id": "A(ii)",
                "question_summary": "Explain why some traits, like earlobes, remain consistent in families, and how small variations contribute to the survival of species over time.",
                "typology": "Heredity - Analysis-Application",
                "question_type": "LA",
                "page_number": 2,
                "marks_available": 3,
                "mark_scheme": "a) Traits or characteristics that are passed from parents to offspring through genes. Because of variations in the combination of genes inherited from parents during sexual reproduction. b) These traits are controlled by specific genes that are reliably transmitted across generations, following the rules of heredity. Variations create diversity in a population. Some variations may give individuals an advantage in adapting to environmental changes, improving survival and contributing to evolution of species.",
                "chapter_name": "Heredity and Evolution",
                "concepts_required": [
                    "Heredity",
                    "Genetic inheritance",
                    "Genetic variation",
                    "Natural selection",
                    "Survival of species",
                    "Evolution"
                ],
                "student_answer": "ii. Some traits, like Carlobes, remain consistent in the family because it gers inherited by multiple generations. Variations in genes are made such that a person can survive in off their surroundings.",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly identifies that traits remain consistent due to being inherited across multiple generations.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.847457627118644,
                        "page_number": 2
                    },
                    {
                        "reasoning": "Student vaguely mentions variations help survival but lacks the detailed explanation of how (diversity, adaptation to environmental changes, evolution).",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.8813559322033898,
                        "page_number": 2
                    }
                ],
                "score_awarded": 1.5,
                "ideal_approach": "To explain consistency, one should state that traits like earlobes are controlled by specific genes that are reliably transmitted across generations, following the rules of heredity. For variations, the ideal approach is to explain that variations create diversity in a population, which can give individuals an advantage in adapting to environmental changes, thereby improving their chances of survival and contributing to the evolution of species over time.",
                "student_approach": "The student correctly identified that consistency of traits is due to inheritance over multiple generations. However, for the second part, the student only vaguely stated that variations help a person survive, without detailing the mechanism of how variations lead to adaptation to environmental changes or contribute to the evolution of species. There were also grammatical errors in this part.",
                "feedback": "You correctly identified that traits remain consistent due to being inherited across generations. Good job on that part. However, your explanation of how variations contribute to the survival of species over time needs more detail. Focus on how variations create diversity, enabling better adaptation to changing environments, and ultimately contributing to the process of evolution. Also, pay attention to grammatical correctness and clarity in your sentences.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Lack of detailed explanation on how variations contribute to the survival of species, missing points about diversity, adaptation to environmental changes, and evolution.",
                        "lacking_competencies": [
                            "C-4.5 Analyses evidences of biological evolution demonstrating the consequences of the process of natural selection"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.8813559322033898,
                        "page_number": 2
                    },
                    {
                        "mistake_type": "execution_issue",
                        "mistake_description": "Grammatical error and awkward phrasing: 'in off their surroundings' instead of 'in their surroundings' or 'to their surroundings'.",
                        "lacking_competencies": [],
                        "marks_lost": 0.5,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.8983050847457628,
                        "page_number": 2
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.8305084745762711,
                "evaluation_score": "medium"
            },
            {
                "question_id": 17,
                "component_id": null,
                "question_summary": "Identify which of the listed processes are endothermic: (i) Dilution of sulphuric acid, (ii) Sublimation of dry ice, (iii) Condensation of water vapours, (iv) Evaporation of water. Choose the correct combination from the given options.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "d) (ii) and (iv)",
                "chapter_name": "Chemical Reactions & Equations",
                "concepts_required": [
                    "Endothermic Processes",
                    "Sublimation",
                    "Evaporation",
                    "Exothermic Processes"
                ],
                "student_answer": "b. (ii) only",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified sublimation of dry ice as an endothermic process but failed to identify evaporation of water as also endothermic. The correct option 'd' includes both (ii) and (iv).",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.2711864406779661,
                        "page_number": 3
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To solve this question, one must understand the definition of endothermic processes, which are processes that absorb heat from the surroundings. Each option should be analyzed:\n(i) Dilution of sulphuric acid: This is an exothermic process, releasing heat.\n(ii) Sublimation of dry ice: This is a phase change from solid to gas, which requires absorption of heat, hence it is endothermic.\n(iii) Condensation of water vapours: This is a phase change from gas to liquid, which releases latent heat, hence it is exothermic.\n(iv) Evaporation of water: This is a phase change from liquid to gas, which requires absorption of heat from the surroundings to break intermolecular bonds, hence it is endothermic.\nTherefore, the endothermic processes are (ii) and (iv), corresponding to option (d).",
                "student_approach": "The student identified 'b. (ii) only' as the correct option, indicating that they correctly recognized sublimation of dry ice as an endothermic process. However, they failed to acknowledge that evaporation of water is also an endothermic process.",
                "feedback": "Your answer correctly identified sublimation of dry ice as an endothermic process. However, it's crucial to remember that evaporation of water is also an endothermic process, as it absorbs heat from the surroundings to change from liquid to gas. To improve, review the concepts of endothermic and exothermic reactions and physical processes, paying close attention to phase changes and their associated energy transfers.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Failed to identify evaporation of water as an endothermic process.",
                        "lacking_competencies": [
                            "Understanding of Endothermic Processes",
                            "Knowledge of Phase Changes"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.2711864406779661,
                        "page_number": 3
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.2711864406779661,
                "evaluation_score": "high"
            },
            {
                "question_id": 18,
                "component_id": null,
                "question_summary": "A sample of soil is mixed with water and allowed to settle. The clear supernatant solution turns the pH paper yellowish-orange. Which of the following would change the colour of this pH paper to greenish-blue? The options are a) Lemon juice, b) Vinegar, c) Common salt, d) An antacid.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "The clear supernatant solution turns the pH paper yellowish-orange, indicating it is acidic. To change the colour to greenish-blue (basic), a basic substance is required. Among the given options, antacid is basic. Therefore, option (d) An antacid is the correct answer.",
                "chapter_name": "Acids, Bases and Salts",
                "concepts_required": [
                    "pH scale",
                    "Acids",
                    "Bases",
                    "pH indicators",
                    "Neutralization"
                ],
                "student_answer": "d. Antacid",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified 'Antacid' as the substance that would change the acidic soil solution (yellowish-orange pH) to a basic one (greenish-blue pH).",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.3220338983050848,
                        "page_number": 3
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To solve this question, one must first understand that a yellowish-orange pH paper indicates an acidic solution (pH < 7). To change this to greenish-blue, a basic solution is required (pH > 7). The options should then be evaluated for their acidic, basic, or neutral properties. Lemon juice and vinegar are acidic, common salt is neutral, and antacids are basic. Therefore, an antacid would be the correct choice to achieve the desired colour change.",
                "student_approach": "The student correctly selected 'Antacid', demonstrating an understanding that antacids are basic substances capable of neutralizing an acidic solution and shifting the pH into the alkaline range, which is indicated by a greenish-blue colour on pH paper.",
                "feedback": "Excellent! You correctly identified that an antacid, being a basic substance, would neutralize the acidic soil solution and cause the pH paper to turn greenish-blue. This shows a clear understanding of the properties of acids and bases and the use of pH indicators.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.3220338983050848,
                "evaluation_score": "high"
            },
            {
                "question_id": 19,
                "component_id": null,
                "question_summary": "Which of the following is an example of simple displacement? a) the electrolysis of water b) the burning of methane c) the reaction of a metal with an acid d) the reaction of two salt solutions to form a precipitate",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "c) the reaction of a metal with an acid",
                "chapter_name": "Chemical Reactions and Equations",
                "concepts_required": [
                    "Simple Displacement Reaction",
                    "Types of Chemical Reactions"
                ],
                "student_answer": "b. Burning of methane",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student incorrectly identified 'burning of methane' as a simple displacement reaction. Burning of methane is a combustion reaction.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.3728813559322034,
                        "page_number": 3
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To answer this question, one must recall the definition of a simple displacement reaction: a reaction where a more reactive element displaces a less reactive element from its compound. Then, evaluate each option: (a) electrolysis of water is a decomposition reaction; (b) burning of methane is a combustion reaction; (c) the reaction of a metal with an acid (e.g., Zn + HCl -> ZnCl2 + H2) involves a more reactive metal displacing hydrogen, which is a simple displacement reaction; (d) the reaction of two salt solutions forming a precipitate is a double displacement reaction. Therefore, option (c) is the correct answer.",
                "student_approach": "The student selected option 'b', 'burning of methane', as an example of a simple displacement reaction. This indicates a misunderstanding of the definition of simple displacement reactions and confusing it with combustion.",
                "feedback": "The student needs to review the different types of chemical reactions, particularly distinguishing between combustion, decomposition, simple displacement, and double displacement reactions. Burning of methane is a combustion reaction, not a simple displacement reaction. A simple displacement reaction involves a more reactive element displacing a less reactive element from its compound.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Incorrectly identified a combustion reaction (burning of methane) as a simple displacement reaction.",
                        "lacking_competencies": [
                            "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.3728813559322034,
                        "page_number": 3
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.3728813559322034,
                "evaluation_score": "high"
            },
            {
                "question_id": 20,
                "component_id": null,
                "question_summary": "Consider the following compounds: FeSO4; CuSO4; CaSO4; Na2CO3. The compound having maximum number of water of crystallisation in its crystalline form in one molecule is: a) FeSO4 b) CuSO4 c) CaSO4 d) Na2CO3",
                "typology": "VSA",
                "question_type": "MCQ",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "The correct answer is d) Na2CO3, which typically exists as Na2CO3·10H2O (Washing Soda), containing 10 molecules of water of crystallization. FeSO4 exists as FeSO4·7H2O (Green Vitriol) with 7 water molecules, CuSO4 as CuSO4·5H2O (Blue Vitriol) with 5 water molecules, and CaSO4 as CaSO4·2H2O (Gypsum) with 2 water molecules.",
                "chapter_name": "Acids, Bases & Salts",
                "concepts_required": [
                    "Water of Crystallization",
                    "Chemical Formulas of Common Salts",
                    "Properties of Ionic Compounds"
                ],
                "student_answer": "20. a. FeSO4",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student incorrectly identified FeSO4 as having the maximum water of crystallization. The correct answer is Na2CO3, which has 10 molecules of water of crystallization (Na2CO3·10H2O), whereas FeSO4 has 7 (FeSO4·7H2O).",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.423728813559322,
                        "page_number": 3
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To solve this, one needs to recall the number of water molecules of crystallization for each given compound: Ferrous Sulfate (FeSO4·7H2O has 7 molecules), Copper Sulfate (CuSO4·5H2O has 5 molecules), Calcium Sulfate (CaSO4·2H2O has 2 molecules), and Sodium Carbonate (Na2CO3·10H2O has 10 molecules). By comparing these values, it becomes evident that Na2CO3 has the maximum number of water molecules of crystallization.",
                "student_approach": "The student chose option 'a' (FeSO4). This indicates a misunderstanding or a lack of recall regarding the number of water molecules of crystallization for common hydrated salts. They might have known that FeSO4 is a hydrated salt but failed to correctly compare its water content with other options, especially Na2CO3.",
                "feedback": "To improve on such questions, it is crucial to commit to memory the common chemical formulas of important hydrated salts along with their associated number of water molecules of crystallization. Pay particular attention to compounds like washing soda (Na2CO3·10H2O), gypsum (CaSO4·2H2O), blue vitriol (CuSO4·5H2O), and green vitriol (FeSO4·7H2O). Consistent recall and comparison of these compositions are key.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student incorrectly identified the compound with the maximum number of water molecules of crystallization, indicating a conceptual gap in recalling the chemical composition and properties of common hydrated salts.",
                        "lacking_competencies": [
                            "Demonstrate Knowledge and Understanding",
                            "Recall of Chemical Formulas and Properties of Hydrated Salts"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.423728813559322,
                        "page_number": 3
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.423728813559322,
                "evaluation_score": "high"
            },
            {
                "question_id": 21,
                "component_id": null,
                "question_summary": "A metal and a non-metal that exists in liquid state at the room temperature are respectively: a) Bromine and Mercury b) Mercury and Iodine c) Mercury and Bromine d) Iodine and Mercury",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "c) Mercury and Bromine",
                "chapter_name": "Metals and Non-metals",
                "concepts_required": [
                    "Properties of metals",
                    "Properties of non-metals",
                    "Elements existing in liquid state"
                ],
                "student_answer": "C. Mercury and Bromine",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified Mercury as the metal and Bromine as the non-metal that exists in liquid state at room temperature, which aligns with option (c) in the mark scheme.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.4745762711864407,
                        "page_number": 3
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To answer this question, one must recall the physical properties of common elements, specifically their states at room temperature. Mercury is the only metal that is liquid at room temperature. Bromine is the only non-metal that is liquid at room temperature. Therefore, the correct pair is Mercury and Bromine.",
                "student_approach": "The student directly chose option 'C. Mercury and Bromine', which is the correct answer, indicating knowledge of the elements that are liquid at room temperature.",
                "feedback": "Excellent work! You correctly identified both the metal (Mercury) and the non-metal (Bromine) that exist in a liquid state at room temperature. This shows a strong understanding of the physical properties of elements.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.4745762711864407,
                "evaluation_score": "high"
            },
            {
                "question_id": 22,
                "component_id": null,
                "question_summary": "Generally, non-metals are not lustrous. Which of the following nonmetals is lustrous? a) Sulphur b) Oxygen c) Nitrogen d) Iodine",
                "typology": "Recall",
                "question_type": "MCQ",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "The correct option is (d) Iodine. Iodine is the non-metal that exhibits a lustrous appearance.",
                "chapter_name": "Metals and Non-metals",
                "concepts_required": [
                    "Properties of Non-metals",
                    "Exceptions to Non-metal Properties (Lustre)"
                ],
                "student_answer": "a. Sulphur",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student incorrectly identified Sulphur as the lustrous non-metal. The correct answer is Iodine.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.5254237288135594,
                        "page_number": 3
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To answer this question, one must recall the general properties of non-metals, specifically their lack of lustre. Then, one must remember the exceptions to this rule, where certain non-metals, such as Iodine, are known to be lustrous. By recalling this specific exception, the correct option can be identified.",
                "student_approach": "The student attempted to answer by selecting 'Sulphur'. This indicates they have some knowledge about non-metals but incorrectly identified Sulphur as the lustrous one, confusing it with the actual exception, Iodine.",
                "feedback": "The student attempted the question but incorrectly identified Sulphur as the lustrous non-metal. It is crucial to remember that Iodine is the non-metal that exhibits lustre, acting as an exception to the general property that non-metals are not lustrous. A thorough review of the properties of metals and non-metals, focusing on exceptions, is recommended.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Incorrectly identified Sulphur as the lustrous non-metal instead of Iodine, demonstrating a lack of knowledge regarding exceptions to the general properties of non-metals.",
                        "lacking_competencies": [
                            "C-1.1 Describes classification of elements in the Periodic Table, and explains how compounds (including carbon compounds) are formed based on atomic structure (Bohr's model) and properties (valency)"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.5254237288135594,
                        "page_number": 3
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.5254237288135594,
                "evaluation_score": "high"
            },
            {
                "question_id": 23,
                "component_id": null,
                "question_summary": "On undergoing complete combustion in an adequate supply of oxygen, an organic compound produces only carbon dioxide and water vapour as the products. Based on this information, which of the following homologous series could the compound belong to? P) alkanes Q) alcohols R) aldehydes a) only P b) only P or Q c) only Q or R d) any – P, Q or R",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "(d) any – P, Q or R",
                "chapter_name": "Carbon and its Compounds",
                "concepts_required": [
                    "Homologous series",
                    "Combustion of organic compounds",
                    "Alkanes",
                    "Alcohols",
                    "Aldehydes"
                ],
                "student_answer": "d. any- P, Q, R",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student has correctly identified that alkanes, alcohols, and aldehydes can all produce carbon dioxide and water vapour on complete combustion in adequate oxygen. The answer matches the mark scheme.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.576271186440678,
                        "page_number": 3
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "The ideal approach is to understand that the complete combustion of any organic compound (containing carbon, hydrogen, and sometimes oxygen) in an adequate supply of oxygen will yield carbon dioxide and water vapor as products. Alkanes, alcohols, and aldehydes are all organic compounds that fit this description. Therefore, the compound could belong to any of these homologous series.",
                "student_approach": "The student correctly selected option (d) 'any – P, Q or R', indicating a correct understanding that all three listed homologous series (alkanes, alcohols, and aldehydes) can undergo complete combustion to produce carbon dioxide and water.",
                "feedback": "Excellent work! Your answer is correct. You have a clear understanding of the complete combustion of various organic compounds and their homologous series. Keep up the good work!",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.576271186440678,
                "evaluation_score": "high"
            },
            {
                "question_id": 24,
                "component_id": null,
                "question_summary": "This question consists of two statements - Assertion (A): Hydrogen gas is not evolved when zinc reacts with nitric acid, and Reason (R): Nitric acid oxidizes the hydrogen gas, produced, to water and itself gets reduced. The student needs to select the appropriate option from the given choices (A. Both A and R are true, and R is the correct explanation of A; B. Both A and R are true, and R is not the correct explanation of A; C. A is true and R is false; D. A is false and R is true).",
                "typology": "Assertion-Reasoning type question",
                "question_type": "MCQ",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "D. A is false and R is true",
                "chapter_name": "Chemical Reactions and Equations",
                "concepts_required": [
                    "Reactions of metals with acids",
                    "Oxidizing and reducing agents",
                    "Properties of nitric acid",
                    "Assertion-Reason analysis"
                ],
                "student_answer": "D. A is false and R is true",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified that Assertion (A) is false (as hydrogen gas can be evolved with very dilute nitric acid) and Reason (R) is true (nitric acid acts as an oxidizing agent, oxidizing hydrogen to water and getting reduced itself). This aligns with option D in the mark scheme.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.6271186440677966,
                        "page_number": 3
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To answer this question, one must first analyze both the Assertion (A) and the Reason (R) individually. Assertion (A) states that hydrogen gas is not evolved when zinc reacts with nitric acid. While nitric acid is an oxidizing agent and often oxidizes the produced hydrogen to water, hydrogen gas can be evolved when reactive metals like zinc react with *very dilute* nitric acid. Therefore, the absolute statement 'is not evolved' makes Assertion (A) false. Reason (R) states that nitric acid oxidizes the hydrogen gas, produced, to water and itself gets reduced. This is a true statement describing the oxidizing nature of nitric acid. Based on this analysis (A is false and R is true), the correct option is D.",
                "student_approach": "The student correctly understood that Assertion (A) is false and Reason (R) is true, leading to the selection of option D, which is the correct answer according to the mark scheme. This indicates a clear understanding of the chemical properties of nitric acid and its reactions with metals.",
                "feedback": "Excellent work! You have correctly identified that Assertion (A) is false because hydrogen can be evolved with very dilute nitric acid, and Reason (R) is true regarding nitric acid's oxidizing properties. Keep up the strong conceptual understanding.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.6101694915254238,
                "evaluation_score": "high"
            },
            {
                "question_id": 25,
                "component_id": null,
                "question_summary": "A carbon compound of molecular formula C5H10O contains a ketone functional group. Draw the structures of two isomers of this compound having a ketone group.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 3,
                "marks_available": 2,
                "mark_scheme": "For drawing two correct structural isomers of C5H10O having a ketone functional group. Examples include Pentan-2-one (CH3-CO-CH2-CH2-CH3) and Pentan-3-one (CH3-CH2-CO-CH2-CH3) or 3-Methylbutan-2-one (CH3-CO-CH(CH3)-CH3). 1 mark for each correct structure.",
                "chapter_name": "Carbon and its Compounds",
                "concepts_required": [
                    "Structural Isomerism",
                    "Ketone Functional Group",
                    "Drawing Structural Formulas",
                    "Valency of Carbon and Oxygen"
                ],
                "student_answer": "The student has drawn a linear chain of 5 carbons with an oxygen atom at the end, saturated with hydrogen atoms. The drawing at L41-L44 depicts a structure that is neither a ketone nor consistent with the molecular formula C5H10O. It appears to be an open chain with single bonds, potentially an alcohol or ether, but incorrectly drawn with respect to valencies and the given molecular formula.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The drawn structure (C-C-C-C-C-O with single bonds) does not correctly represent a ketone functional group (which requires a C=O group within the carbon chain). The valencies of carbon and oxygen are also incorrectly depicted, and the overall molecular formula C5H10O is not maintained.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.6779661016949153,
                        "page_number": 3
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To solve this, first identify the characteristics of a ketone functional group (C=O bonded to two alkyl groups). The molecular formula C5H10O indicates five carbon atoms, ten hydrogen atoms, and one oxygen atom with one degree of unsaturation. This unsaturation must be due to the carbonyl (C=O) bond. Start by drawing a 5-carbon straight chain. Place the ketone functional group at the C2 position to form Pentan-2-one (CH3-CO-CH2-CH2-CH3) or at the C3 position to form Pentan-3-one (CH3-CH2-CO-CH2-CH3). Both are valid isomers. Another valid isomer involves a branched chain, like 3-Methylbutan-2-one (CH3-CO-CH(CH3)-CH3). Ensure all carbon atoms have four bonds and oxygen atoms have two bonds.",
                "student_approach": "The student attempted to draw a linear chain of 5 carbons and 1 oxygen, indicating hydrogens. However, the oxygen is placed at the end of the carbon chain and is shown with single bonds, not as a ketone (C=O). The valency of oxygen is depicted inconsistently, and the entire structure does not adhere to the C5H10O molecular formula or the ketone functional group requirement.",
                "feedback": "The student needs to thoroughly review the concept of functional groups, specifically the ketone group, and how to accurately represent them in structural formulas. Pay close attention to the valency of carbon (4 bonds) and oxygen (2 bonds) in organic compounds. The drawn structure incorrectly represents the ketone functional group and does not match the given molecular formula. Practice drawing various isomers for different functional groups, ensuring correct bonding and molecular formula adherence.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student has a fundamental misunderstanding of the ketone functional group and its representation in structural isomers. The drawn structure is not a ketone and does not correspond to the molecular formula C5H10O, indicating incorrect valency understanding.",
                        "lacking_competencies": [
                            "C-1.1: Describes how compounds (including carbon compounds) are formed based on atomic structure (Bohr's model) and properties (valency)",
                            "C-8.1: Develops accurate and appropriate models (including geometric, mathematical, graphical) to represent real-life events and phenomena using scientific principles and use these models to manipulate variables and predict results"
                        ],
                        "marks_lost": 2.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.6779661016949153,
                        "page_number": 3
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.6610169491525424,
                "evaluation_score": "high"
            },
            {
                "question_id": 26,
                "component_id": "A(a)",
                "question_summary": "Write one chemical equation for a chemical reaction in which a change in colour has taken place. Mention the colour change along with the equation.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "The reaction between lead nitrate solution and potassium iodide solution. Pb(NO3)2 (aq) + 2KI → Pbl2(s) + 2KNO3(aq). In this reaction colour changes from colourless to yellow due to formation of Pbl2 (yellow precipitate). (1 Mark for correct equation and observation)",
                "chapter_name": "Chemical Reactions and Equations",
                "concepts_required": [
                    "Types of chemical reactions",
                    "Observations in chemical reactions",
                    "Writing balanced chemical equations"
                ],
                "student_answer": "Citric acid",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student has identified 'Citric acid' which is a substance, not a chemical equation demonstrating a change in colour due to a reaction.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.7627118644067797,
                        "page_number": 3
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To answer this question, the student should recall chemical reactions that exhibit a visible change in colour. A common example is the double displacement reaction between lead nitrate and potassium iodide, where a yellow precipitate of lead iodide is formed from colourless solutions, indicating a clear colour change. The chemical equation for this reaction should be correctly balanced.",
                "student_approach": "The student has provided 'Citric acid' as the answer, which is the name of a substance, not a chemical equation depicting a reaction involving a change in colour. This indicates a misunderstanding of the question's requirement to provide a chemical equation.",
                "feedback": "Your answer 'Citric acid' is incorrect as it is a substance, not a chemical equation showing a change in colour. The question specifically asked for a chemical equation where a change in colour occurs. For instance, the reaction between lead nitrate solution and potassium iodide solution (Pb(NO3)2(aq) + 2KI(aq) → PbI2(s) + 2KNO3(aq)) results in the formation of a yellow precipitate, indicating a colour change from colourless to yellow. You need to provide a balanced chemical equation along with the observed colour change.",
                "mistakes_made": [
                    {
                        "mistake_type": "question_understanding",
                        "mistake_description": "The student misunderstood the question and provided the name of a substance instead of a chemical equation demonstrating a change in colour.",
                        "lacking_competencies": [
                            "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.7627118644067797,
                        "page_number": 3
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.7627118644067797,
                "evaluation_score": "high"
            },
            {
                "question_id": 26,
                "component_id": "A(b)",
                "question_summary": "Write one chemical equation for a chemical reaction in which a change in temperature has taken place.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "Change in temperature: The action of dilute sulphuric acid on calcium. Ca(s) + H2SO4(aq) → CaSO4(s) + H2(g). In this reaction, heat evolves.",
                "chapter_name": "Chemical Reactions and Equations",
                "concepts_required": [
                    "Types of Chemical Reactions",
                    "Exothermic Reactions",
                    "Writing Chemical Equations",
                    "Chemical Formulas"
                ],
                "student_answer": "Б. Саон + H20 ↑",
                "scoring_breakdown": [
                    {
                        "reasoning": "The chemical formula 'Саон' is incorrect and not a recognized chemical compound. The equation provided does not represent a valid chemical reaction demonstrating a change in temperature as per the mark scheme.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.7966101694915255,
                        "page_number": 3
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To correctly answer this question, one should recall a chemical reaction that is characterized by a significant change in temperature (e.g., an exothermic or endothermic reaction). A good example is the reaction of a metal like calcium with dilute sulfuric acid, which is an exothermic reaction. The balanced chemical equation should be provided: Ca(s) + H2SO4(aq) → CaSO4(s) + H2(g), mentioning that heat evolves.",
                "student_approach": "The student attempted to provide a chemical equation. However, the student wrote 'Саон' which is an incorrect chemical formula, and the overall equation 'Саон + H2O ↑' does not represent a correct chemical reaction demonstrating a change in temperature.",
                "feedback": "The student needs to revise fundamental chemical formulas and common examples of chemical reactions that exhibit temperature changes. The formula 'Саон' is not correct, and therefore the entire equation is invalid. Focus on learning standard chemical equations and their correct representation, especially for characteristic reactions like those involving heat changes.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Incorrect chemical formula 'Саон' and an incorrect chemical equation. The student failed to provide a valid reaction demonstrating a temperature change.",
                        "lacking_competencies": [
                            "Writing Chemical Equations",
                            "Knowledge of Chemical Formulas",
                            "Identifying Types of Chemical Reactions (Exothermic/Endothermic)"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.7966101694915255,
                        "page_number": 3
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.7966101694915255,
                "evaluation_score": "high"
            },
            {
                "question_id": 26,
                "component_id": "A(c)",
                "question_summary": "The question requires writing a balanced chemical equation for a reaction that results in the formation of a precipitate, and to mention the colour/nature of the precipitate formed.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "c) Formation of precipitate: The action of barium chloride on sodium sulphate. BaCl2(aq) + Na2SO4(aq) → BaSO4(s) + 2NaCl(aq) Here, BaSO4(s) is a white precipitate. (1 mark for correct equation and precipitate description)",
                "chapter_name": "Chemical Reactions and Equations",
                "concepts_required": [
                    "Chemical reactions",
                    "Precipitation reactions",
                    "Writing balanced chemical equations",
                    "States of matter"
                ],
                "student_answer": "C.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student only wrote 'C.' and did not provide any chemical equation or description of a precipitate, indicating the question was skipped.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.8135593220338982,
                        "page_number": 3
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To answer this question, the student should recall an example of a precipitation reaction, such as the reaction between barium chloride and sodium sulphate. The balanced chemical equation should be written as BaCl2(aq) + Na2SO4(aq) → BaSO4(s) + 2NaCl(aq). Additionally, the student must mention the nature of the precipitate, in this case, BaSO4(s) is a white precipitate.",
                "student_approach": "The student wrote 'C.' for this sub-part but did not provide any chemical equation or description, indicating that they skipped attempting this specific question.",
                "feedback": "The student skipped this part of the question. To earn marks, you needed to provide a balanced chemical equation for a reaction that forms a precipitate and clearly state the colour or nature of the precipitate (e.g., 'white precipitate'). Revisiting precipitation reactions and practicing writing balanced equations will be beneficial.",
                "mistakes_made": [
                    {
                        "mistake_type": "skipped",
                        "mistake_description": "The student did not attempt to answer question 26 A(c), leaving the space blank after writing 'C.'.",
                        "lacking_competencies": [
                            "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.8135593220338982,
                        "page_number": 3
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.8135593220338982,
                "evaluation_score": "high"
            },
            {
                "question_id": 27,
                "component_id": "a",
                "question_summary": "The pH of a sample of tomato juice is 4.6. How is this juice likely to taste? Give reason to justify your answer.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 3,
                "marks_available": 1,
                "mark_scheme": "Tomato juice with a pH of 4.6 is considered slightly acidic. The taste of tomato juice at this pH level is likely to be tangy or slightly sour. This is because acidic substances tend to impart sourness or tanginess to foods and beverages.",
                "chapter_name": "Acids, Bases and Salts",
                "concepts_required": [
                    "pH scale",
                    "Properties of Acids"
                ],
                "student_answer": "the juice will taste sour as it is an acid and acids taste sour",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified the taste as 'sour' and provided a valid reason that acids taste sour due to their acidic nature (pH 4.6).",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.9322033898305084,
                        "page_number": 3
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "The ideal approach is to first identify that a pH of 4.6 indicates an acidic substance. Then, recall that acidic substances are characterized by a sour taste. Finally, justify the taste by explaining that the juice is acidic.",
                "student_approach": "The student correctly identified the taste as sour. They then justified this by stating that the juice is an acid and acids taste sour, which is a correct and complete explanation.",
                "feedback": "Excellent answer! You correctly identified the sour taste of the tomato juice and provided a clear and accurate reason based on its acidic pH. Keep up the good work.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.9152542372881356,
                "evaluation_score": "high"
            },
            {
                "question_id": 27,
                "component_id": "b",
                "question_summary": "The question asks how to differentiate between a strong acid and a weak base in terms of ion-formation in aqueous solutions.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 4,
                "marks_available": 1,
                "mark_scheme": "(b) Strong Acids : Ionize fully in water to give H+ ions in large numbers. Weak Base : Ionize partially in water to give OH ions in small numbers.",
                "chapter_name": "Acids, Bases and Salts",
                "concepts_required": [
                    "Acids",
                    "Bases",
                    "Ionization",
                    "pH scale",
                    "Strong acids",
                    "Weak bases"
                ],
                "student_answer": "b. We can differentiate between a strong acid and a weak base by their pH. A strong acid will have a pH of around 1-2 and a weak base will have a pH OF 8-9.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student differentiated based on pH values, which is not what the question explicitly asked for ('in terms of ion-formation in aqueous solutions'). The core concept of ionization was not addressed.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.20338983050847456,
                        "page_number": 4
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To differentiate between a strong acid and a weak base in terms of ion-formation in aqueous solutions, one should explain that strong acids completely dissociate/ionize in water to produce a large concentration of H+ ions, whereas weak bases partially dissociate/ionize in water to produce a small concentration of OH- ions.",
                "student_approach": "The student attempted to differentiate a strong acid and a weak base by referring to their pH values. They stated that a strong acid has a pH of 1-2 and a weak base has a pH of 8-9. While these pH ranges are generally correct for strong acids and weak bases, this approach did not address the specific criterion of 'ion-formation in aqueous solutions' as requested in the question.",
                "feedback": "The student correctly associates pH ranges with strong acids and weak bases. However, the question specifically asked for differentiation based on 'ion-formation in aqueous solutions'. The answer provided does not address the extent of ionization (full for strong acid, partial for weak base) or the type of ions formed in water. Please pay close attention to the specific terms and conditions mentioned in the question to ensure your answer is directly relevant.",
                "mistakes_made": [
                    {
                        "mistake_type": "question_understanding",
                        "mistake_description": "The student failed to differentiate between a strong acid and a weak base in terms of 'ion-formation in aqueous solutions' as explicitly requested by the question, instead focusing on pH values.",
                        "lacking_competencies": [
                            "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations (acid and base, metal, and non-metal, reversible, and irreversible)"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.20338983050847456,
                        "page_number": 4
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.20338983050847456,
                "evaluation_score": "high"
            },
            {
                "question_id": 27,
                "component_id": "c",
                "question_summary": "The acid rain can make the survival of aquatic animals difficult. How?",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 4,
                "marks_available": 1,
                "mark_scheme": "(c) Acid rain lowers the pH of water, directly harming aquatic animals by damaging their gills and skin. It mobilizes toxic metals like aluminum, which can poison aquatic organisms. Acidic conditions disrupt reproduction, affecting spawning success and offspring viability. Additionally, it alters habitats and food chains, leading to reduced biodiversity and population declines among aquatic species.",
                "chapter_name": "Acids, Bases & Salts",
                "concepts_required": [
                    "pH scale",
                    "Acid rain",
                    "Effects of pH on aquatic life"
                ],
                "student_answer": "Acid raia when acid rain falls in a body of water with aquatic animals in it, the water becomes acidic when the warr becomes acidic, the water becomes cumagious for the aquatic animals.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identifies that acid rain makes the water acidic. However, the explanation of 'how' this makes survival difficult is vague and uses a non-scientific term ('cumagious') instead of specific biological or chemical effects as required by the mark scheme.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.3728813559322034,
                        "page_number": 4
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The ideal approach is to state that acid rain lowers the pH of water and then provide specific mechanisms by which this harms aquatic life. Examples include: directly damaging gills and skin, mobilizing toxic metals (like aluminum) from sediment into the water, disrupting reproduction, or altering habitats and food chains.",
                "student_approach": "The student identifies that acid rain causes the water to become acidic, which is a correct initial step. However, the explanation for 'how' this affects aquatic animals is incomplete and uses the term 'cumagious' (likely meaning damaging/injurious), which lacks the scientific specificity required to demonstrate understanding of the mechanisms of harm.",
                "feedback": "Your answer correctly identifies that acid rain makes the water acidic. To improve, you need to elaborate on *how* this acidic condition makes survival difficult for aquatic animals. For example, mention that it can damage their gills and skin, or lead to the release of toxic metals like aluminum into the water, which then poisons them. Always aim for specific scientific explanations.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student failed to provide specific scientific mechanisms explaining how acidic water makes survival difficult for aquatic animals (e.g., damage to gills/skin, mobilization of toxic metals, disruption of reproduction). The term 'cumagious' is vague and not a precise scientific explanation.",
                        "lacking_competencies": [
                            "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations (acid and base, metal, and non-metal, reversible, and irreversible)"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.3728813559322034,
                        "page_number": 4
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.3220338983050848,
                "evaluation_score": "medium"
            },
            {
                "question_id": 28,
                "component_id": "a",
                "question_summary": "Ethyl propanoate is a colourless compound with a pineapple-like smell, found naturally in some fruits such as kiwis and strawberries. The structural formula of ethyl propanoate is given as CH3-CH2-CO-O-CH2-CH3. For part (a), write the names of the carboxylic acid and the alcohol from which this compound is formed.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "CASE_STUDY",
                "page_number": 6,
                "marks_available": 2,
                "mark_scheme": "(a) 1 mark for each name: acid - propanoic acid / propionic acid alcohol - ethanol / ethyl alcohol",
                "chapter_name": "Carbon and its Compounds",
                "concepts_required": [
                    "Esters and Esterification",
                    "Functional groups (Carboxylic acid, Alcohol, Ester)",
                    "IUPAC Nomenclature of organic compounds",
                    "Structure of organic compounds"
                ],
                "student_answer": "not found",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student did not attempt this question.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 6
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To identify the parent carboxylic acid and alcohol from an ester, the ester linkage (-COO-) needs to be broken. The part of the chain connected to the carbonyl carbon (C=O) corresponds to the carboxylic acid, and the part connected to the oxygen (O-) corresponds to the alcohol. Given ethyl propanoate (CH3-CH2-COO-CH2-CH3), the carboxylic acid component is CH3-CH2-COOH (Propanoic acid) and the alcohol component is HO-CH2-CH3 (Ethanol).",
                "student_approach": "Student did not attempt this question.",
                "feedback": "The student did not attempt this question. To score marks, it is essential to attempt all questions. Effective time management during exams can help ensure all parts of the paper are addressed.",
                "mistakes_made": [
                    {
                        "mistake_type": "skipped",
                        "mistake_description": "The student did not attempt question 28 (a).",
                        "lacking_competencies": [
                            "C-1.1 Describes classification of elements in the Periodic Table, and explains how compounds (including carbon compounds) are formed based on atomic structure (Bohr's model) and properties (valency)"
                        ],
                        "marks_lost": 2.0,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 6
                    }
                ],
                "x_coordinate": 0.0,
                "y_coordinate": 0.0,
                "evaluation_score": "high"
            },
            {
                "question_id": 28,
                "component_id": "b",
                "question_summary": "Ethyl propanoate is a colourless compound with a pineapple-like smell. It is present naturally in some fruits such as kiwis and strawberries. The structural formula of ethyl propanoate is given. Apart from mixing the carboxylic acid and the alcohol, what should be done to form this compound?",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "CASE_STUDY",
                "page_number": 6,
                "marks_available": 2,
                "mark_scheme": "(b) 1 mark for each of the following: - add an acid catalyst - heat the reaction mixture",
                "chapter_name": "Carbon and its Compounds",
                "concepts_required": [
                    "Esterification reaction",
                    "Role of acid catalyst",
                    "Effect of heating on reaction rate"
                ],
                "student_answer": "not found",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student did not attempt this question, therefore no marks can be awarded.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 6
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To form ethyl propanoate from a carboxylic acid (propanoic acid) and an alcohol (ethanol), the reaction mixture needs to be heated in the presence of an acid catalyst, typically concentrated sulphuric acid. This process is called esterification.",
                "student_approach": "Student did not attempt the question.",
                "feedback": "This question was not attempted. It is crucial to attempt all questions to gain marks. Even partial answers or showing relevant knowledge could have earned some credit. For this question, you needed to recall the conditions required for esterification, which involves heating and an acid catalyst.",
                "mistakes_made": [
                    {
                        "mistake_type": "skipped",
                        "mistake_description": "The student did not attempt question 28 (b).",
                        "lacking_competencies": [
                            "C-1.1 Describes classification of elements in the Periodic Table, and explains how compounds (including carbon compounds) are formed based on atomic structure (Bohr's model) and properties (valency)",
                            "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations (acid and base, metal, and non-metal, reversible, and irreversible)"
                        ],
                        "marks_lost": 2.0,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 6
                    }
                ],
                "x_coordinate": 0.0,
                "y_coordinate": 0.0,
                "evaluation_score": "high"
            },
            {
                "question_id": 29,
                "component_id": "B(a)",
                "question_summary": "List in tabular form three chemical properties on the basis of which we can differentiate between a metal and a non-metal.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "LA",
                "page_number": 4,
                "marks_available": 3,
                "mark_scheme": "i. Difference between Metals and Non-metals: (Any three correct chemical properties) - 3 marks (1 mark for each correct chemical property and its corresponding non-metal property, presented in tabular form). Examples include: reaction with oxygen (forming basic vs acidic/neutral oxides), reaction with water, reaction with dilute acids, reaction with hydrogen.",
                "chapter_name": "Metals and Non-metals",
                "concepts_required": [
                    "Chemical properties of metals",
                    "Chemical properties of non-metals",
                    "Differentiation between metals and non-metals"
                ],
                "student_answer": "29B(a)\nMetals:\n• Good conductors of heat and electricity\n• Mostly found in Solid State\n• Sonorous, lustrous, malleable, ductill\nNon-Metals:\n• Bad conductors of heat and electricity\n• can be found in either solid, liquid and gas\n• Not sonorous, lustrous, malleable, ductile",
                "scoring_breakdown": [
                    {
                        "reasoning": "The question specifically asked for 'chemical properties'. The student has listed three physical properties (conductivity, state, sonority/lustre/malleability/ductility) for both metals and non-metals instead of chemical properties. Therefore, no marks are awarded for these points as they do not address the core requirement of the question.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.5084745762711864,
                        "page_number": 4
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The ideal approach is to list three distinct chemical properties in tabular form to differentiate between metals and non-metals. For example:\n1.  Reaction with oxygen: Metals form basic oxides (e.g., MgO), while non-metals form acidic or neutral oxides (e.g., CO2, H2O).\n2.  Reaction with water: Most metals react with water to form metal hydroxides and hydrogen gas, while non-metals generally do not react with water.\n3.  Reaction with dilute acids: Metals generally react with dilute acids to produce salt and hydrogen gas, whereas non-metals do not react with dilute acids.",
                "student_approach": "The student attempted to differentiate between metals and non-metals in tabular form but incorrectly focused on physical properties instead of chemical properties. They listed properties like electrical/thermal conductivity, physical state, and physical characteristics (sonorous, lustrous, malleable, ductile) which are not chemical in nature.",
                "feedback": "To improve, ensure you carefully read and understand the keywords in the question, especially terms like 'chemical properties'. While your differentiation points were accurate for physical properties, they did not answer the specific question asked. Focus on chemical reactions and transformations when asked for chemical properties. Practice identifying and distinguishing between physical and chemical properties of substances.",
                "mistakes_made": [
                    {
                        "mistake_type": "question_understanding",
                        "mistake_description": "The student misinterpreted 'chemical properties' and instead listed 'physical properties' for differentiation between metals and non-metals.",
                        "lacking_competencies": [
                            "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations (acid and base, metal, and non-metal, reversible, and irreversible)"
                        ],
                        "marks_lost": 3.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.5084745762711864,
                        "page_number": 4
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.4915254237288136,
                "evaluation_score": "high"
            },
            {
                "question_id": 29,
                "component_id": "B(b)(i)",
                "question_summary": "Explain why most metals conduct electricity well.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "LA",
                "page_number": 4,
                "marks_available": 1,
                "mark_scheme": "Metals conduct electricity well due to the presence of free/delocalized electrons in their structure. These electrons are mobile and can carry charge, allowing for the flow of electric current.",
                "chapter_name": "Metals and Non-metals",
                "concepts_required": [
                    "Properties of Metals",
                    "Electrical Conductivity",
                    "Metallic Bonding/Free Electrons"
                ],
                "student_answer": "Most metals conduct electricity well because of their ionic properties",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student provided an incorrect reason for electrical conductivity in metals, attributing it to ionic properties instead of free/delocalized electrons.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.6949152542372882,
                        "page_number": 4
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "Metals have a unique type of bonding called metallic bonding, characterized by a 'sea' of delocalized electrons that move freely throughout the metal lattice. These free electrons are mobile charge carriers and are responsible for conducting electricity when a potential difference is applied across the metal.",
                "student_approach": "The student correctly identified that metals conduct electricity well but provided an incorrect reason, attributing it to 'ionic properties' rather than the presence of free/delocalized electrons.",
                "feedback": "The student correctly stated that metals conduct electricity well. However, the reason provided, 'ionic properties', is incorrect. Metals conduct electricity due to the presence of mobile/free electrons (delocalized electrons) within their metallic structure. Ionic properties are characteristic of ionic compounds, which conduct electricity only in molten or aqueous states when ions are free to move, not in solid metallic form. To improve, focus on the fundamental atomic structure and bonding in metals.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Misconception about the fundamental reason for electrical conductivity in metals, confusing the role of free electrons with 'ionic properties'.",
                        "lacking_competencies": [
                            "Understanding properties of metals based on their atomic structure"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.6949152542372882,
                        "page_number": 4
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.6949152542372882,
                "evaluation_score": "high"
            },
            {
                "question_id": 29,
                "component_id": "B(b)(ii)",
                "question_summary": "Give reasons for the following: Little addition of carbon in iron makes it more useful.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "LA",
                "page_number": 6,
                "marks_available": 1,
                "mark_scheme": "Adding a small amount of carbon to iron forms an alloy (steel). Carbon atoms, being smaller, fit into the interstitial spaces within the iron crystal lattice. This interstitial impurity disrupts the regular arrangement of iron atoms, making it harder for layers of iron atoms to slide over each other. This process increases the hardness and tensile strength of the iron, making the alloy (steel) much more useful and versatile for various structural and industrial applications than pure iron.",
                "chapter_name": "Metals and Non-metals",
                "concepts_required": [
                    "Alloys",
                    "Properties of Metals",
                    "Interstitial impurities",
                    "Steel manufacturing"
                ],
                "student_answer": "not found",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student did not attempt this question.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 6
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The question asks for the reason why adding a small amount of carbon makes iron more useful. The ideal approach is to recall the concept of alloys and specifically, how carbon affects the properties of iron to form steel. Carbon atoms, being smaller, fit into the interstitial spaces between iron atoms, disrupting the regular arrangement of iron atoms. This makes it harder for layers of iron atoms to slide over each other, thereby increasing the hardness and tensile strength of the iron, making the alloy (steel) more useful for various applications than pure iron.",
                "student_approach": "The student did not attempt this question.",
                "feedback": "The student did not attempt this question. To improve, it is crucial to attempt all questions to demonstrate understanding. For this particular question, revising the chapter on 'Metals and Non-metals', specifically the section on alloys and the properties of iron and steel, would be beneficial.",
                "mistakes_made": [
                    {
                        "mistake_type": "skipped",
                        "mistake_description": "The student did not attempt this question.",
                        "lacking_competencies": [
                            "C-1.3 Describes and represents chemical interactions and changes",
                            "Application of Knowledge/Concepts"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 6
                    }
                ],
                "x_coordinate": 0.0,
                "y_coordinate": 0.0,
                "evaluation_score": "high"
            },
            {
                "question_id": 30,
                "component_id": null,
                "question_summary": "At what distance from a convex lens should an object be placed to get an image of the same size as that of the object on a screen? a) Beyond twice the focal length of the lens b) At the principal focus of the lens c) At twice the focal length of the lens d) Between the optical center of the lens and its principal focus",
                "typology": "Recall",
                "question_type": "MCQ",
                "page_number": 4,
                "marks_available": 1,
                "mark_scheme": "The object should be placed at twice the focal length (2F) of the convex lens to obtain an image of the same size as the object on a screen. (Option c)",
                "chapter_name": "Natural Phenomena",
                "concepts_required": [
                    "Convex lens image formation",
                    "Ray diagrams for lenses",
                    "Focal length",
                    "Optical centre"
                ],
                "student_answer": "d. Between the optical center of the lens and its principal focus",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student incorrectly identified the object position for a same-sized image. For a convex lens, an object placed between the optical center and the principal focus forms a virtual, erect, and magnified image, not a real and same-sized image.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.847457627118644,
                        "page_number": 4
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To get an image of the same size as the object on a screen using a convex lens, the object must be placed at 2F (twice the focal length) on one side, and the image will also be formed at 2F on the other side. This is a standard case in ray diagrams for convex lenses.",
                "student_approach": "The student chose option 'd' which states 'Between the optical center of the lens and its principal focus'. This position would result in a virtual, erect, and magnified image, not a real, same-sized image on a screen.",
                "feedback": "Your answer is incorrect. For a convex lens to form a real image of the same size as the object on a screen, the object must be placed at twice its focal length (2F). Placing the object between the optical center and the principal focus (F) results in a virtual, erect, and magnified image. Review the different cases of image formation by convex lenses and their corresponding object positions, particularly focusing on the conditions for forming a real and same-sized image.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Incorrect understanding of image formation by a convex lens, specifically the object position required to obtain an image of the same size.",
                        "lacking_competencies": [
                            "C-2.3 Manipulates the position of object and properties of lenses (focus, centre of curvature) to observe image characteristics and correspondence with a ray diagram"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.847457627118644,
                        "page_number": 4
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.8305084745762712,
                "evaluation_score": "high"
            },
            {
                "question_id": 31,
                "component_id": null,
                "question_summary": "The clear sky appears blue during the daytime because: a) The atmosphere absorbs blue light most strongly. b) Blue light is scattered the least by air molecules. c) The wavelength of blue light is shorter, so it is scattered more by air molecules. d) The Sun emits more blue light than red light.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 4,
                "marks_available": 1,
                "mark_scheme": "c) The wavelength of blue light is shorter, so it is scattered more by air molecules.",
                "chapter_name": "Natural Phenomena (Human Eye & Colourful World)",
                "concepts_required": [
                    "Scattering of light",
                    "Wavelength of visible light",
                    "Rayleigh scattering"
                ],
                "student_answer": "C. The wavelength of blue light is Shorter, so it is scattered by more air molecules.",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly identified that the shorter wavelength of blue light leads to greater scattering by air molecules, making the sky appear blue.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.8983050847457626,
                        "page_number": 4
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To answer this question, one must recall the phenomenon of scattering of light in the atmosphere, specifically Rayleigh scattering. This principle states that the intensity of scattered light is inversely proportional to the fourth power of the wavelength. Blue light has a shorter wavelength compared to other colors in the visible spectrum, making it scatter significantly more by the fine particles in the Earth's atmosphere. This greater scattering of blue light in all directions makes the sky appear blue.",
                "student_approach": "The student correctly selected option C and provided the exact reasoning that blue light has a shorter wavelength and is scattered more by air molecules.",
                "feedback": "Excellent work! You have correctly identified the reason for the clear sky appearing blue during the daytime. Your understanding of light scattering and its relation to wavelength is accurate.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.8983050847457626,
                "evaluation_score": "high"
            },
            {
                "question_id": 32,
                "component_id": null,
                "question_summary": "Assertion(A): A compass needle is placed near a current carrying wire. The deflection of the compass needle decreases when the magnitude of an electric current in the wire is increased. Reason (R) : Strength of a magnetic field at a point near the conductor increases on increasing the current..",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "MCQ",
                "page_number": 7,
                "marks_available": 1,
                "mark_scheme": "Magnetic effects of electric current - Recall D. A is false but R is true",
                "chapter_name": "Magnetic Effects of Current",
                "concepts_required": [
                    "Magnetic field due to a current carrying conductor",
                    "Factors affecting magnetic field strength"
                ],
                "student_answer": "D. A is false but R is true",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student has correctly identified that Assertion A is false and Reason R is true, which matches option D in the mark scheme.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.20338983050847456,
                        "page_number": 7
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To answer this assertion-reasoning question, one must first evaluate the truthfulness of Assertion (A) and Reason (R) independently. Assertion (A) states that deflection decreases with increased current, which is incorrect as magnetic field strength (and thus deflection) increases with current. Therefore, A is false. Reason (R) correctly states that magnetic field strength increases with current. Therefore, R is true. Combining these, the correct option is 'A is false but R is true', which corresponds to option D.",
                "student_approach": "The student correctly identified option D, stating 'A is false but R is true'. This indicates a correct understanding of both the assertion and the reason.",
                "feedback": "Excellent work! You have accurately evaluated both the assertion and the reason, demonstrating a clear understanding of how the strength of a magnetic field produced by a current-carrying wire is related to the magnitude of the current. Your choice of 'D. A is false but R is true' is perfectly aligned with the principles of magnetic effects of electric current.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.20338983050847456,
                "evaluation_score": "high"
            },
            {
                "question_id": 33,
                "component_id": null,
                "question_summary": "The image below shows the refraction of light in three transparent rectangular blocks, X, Y and Z, made of different materials when they are placed in air. The angle of incidence is different in each case but the angle of refraction is the same in all three blocks. Compare the speed of light in the three blocks, justify your answer.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 7,
                "marks_available": 2,
                "mark_scheme": "1 mark for correct comparison of speed (speed in X > speed in Y > speed in Z). 1 mark for justification using Snell's law (n = sin i / sin r) and the inverse relationship between refractive index (n) and speed of light (v = c/n), explaining that since angle of refraction (r) is constant, n is proportional to sin i. As i_X < i_Y < i_Z, then n_X < n_Y < n_Z, leading to v_X > v_Y > v_Z. Award full marks even if Snell's law is not explicitly mentioned.",
                "chapter_name": "Natural Phenomena",
                "concepts_required": [
                    "Refraction of light",
                    "Snell's Law",
                    "Refractive Index",
                    "Speed of light in different media"
                ],
                "student_answer": "L4 has the lowest refractive index whereas L2 has a lower refractive index than L3 but more than L1. L3 has the highest refractive index. In terms of speed.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly deduced the order of refractive indices (n_X < n_Y < n_Z) from the diagram, which is the core part of the justification based on Snell's law. Although confusing labels were used (L1, L2, L3 instead of X, Y, Z), the relative order is correct.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.288135593220339,
                        "page_number": 7
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "1. Observe the angles of incidence (i) for blocks X, Y, and Z from the diagram, noting that i_X < i_Y < i_Z, while the angle of refraction (r) is the same for all three.2. Recall Snell's Law: n = sin(i) / sin(r). Since 'r' is constant, the refractive index (n) is directly proportional to sin(i).3. Therefore, the order of refractive indices is n_X < n_Y < n_Z.4. Recall the relationship between the speed of light (v) in a medium and its refractive index (n): v = c/n, where c is the speed of light in vacuum.5. Since the speed of light is inversely proportional to the refractive index, the order of speeds will be the reverse of the refractive indices.6. Thus, the speed of light in block X > speed in block Y > speed in block Z. ",
                "student_approach": "The student observed the diagram and attempted to compare the refractive indices. They correctly inferred that n_X < n_Y < n_Z, despite using confusing labels like 'L1', 'L2', 'L3', and an inexplicable 'L4'. However, the student failed to translate this understanding into an explicit comparison of the speed of light in the blocks, which was the primary requirement of the question.",
                "feedback": "You correctly identified the order of refractive indices based on the angles of incidence, demonstrating a good understanding of the relationship between incidence angle and refractive index when refraction angle is constant. This forms a strong basis for the justification. However, you missed explicitly stating the comparison of the speed of light in the three blocks, which was a key part of the question. Remember that speed of light is inversely proportional to the refractive index. Also, pay close attention to the labels provided in the diagram (X, Y, Z) to avoid confusion in your answer.",
                "mistakes_made": [
                    {
                        "mistake_type": "question_understanding",
                        "mistake_description": "Failed to explicitly compare the speed of light in the three blocks, which was the main part of the question. The student only mentioned 'In terms of speed.' without providing the actual comparison. Additionally, confusing labels (L1, L2, L3, L4) were used instead of X, Y, Z, indicating an issue with interpreting diagram labels.",
                        "lacking_competencies": [
                            "Application of Knowledge/Concepts"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.33898305084745767,
                        "page_number": 7
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.2542372881355932,
                "evaluation_score": "medium"
            },
            {
                "question_id": 34,
                "component_id": "B(a)",
                "question_summary": "An object of height 5 cm is placed in front of a spherical mirror and its image is found to have a height of -10 cm. Calculate the magnification produced by the mirror.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 7,
                "marks_available": 1,
                "mark_scheme": "m = h'/h = -10/5 = -2 (1 mark)",
                "chapter_name": "Natural Phenomena - Light: Reflection by Spherical Mirrors",
                "concepts_required": [
                    "Magnification by spherical mirrors",
                    "Sign conventions for heights"
                ],
                "student_answer": "a M= v/u = -10/5 = -2 M=-2",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly substituted the image height (-10 cm) and object height (5 cm) into the magnification calculation and arrived at the correct answer of -2. Although the initial formula written M=v/u is for magnification in terms of object and image distances, the numerical application used the heights correctly, which aligns with the mark scheme's expected calculation.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.711864406779661,
                        "page_number": 7
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To calculate the magnification (M), use the formula M = h'/h, where h' is the image height and h is the object height. Given h = 5 cm and h' = -10 cm. Substitute these values into the formula: M = -10 cm / 5 cm = -2.",
                "student_approach": "The student wrote the magnification formula as M=v/u, which is typically for distances. However, they then proceeded to substitute the given heights for the image (-10) and object (5) into this formula, effectively calculating M = h'/h. The calculation -10/5 resulted in the correct magnification of -2.",
                "feedback": "Your calculation for magnification is correct, yielding M = -2. This indicates a good understanding of how to apply the given heights. However, ensure you use the correct formula M = h'/h when dealing with image and object heights, as M = v/u is used for object and image distances.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.6440677966101696,
                "evaluation_score": "high"
            },
            {
                "question_id": 34,
                "component_id": "B(b)",
                "question_summary": "Based on the given object height (5 cm) and image height (-10 cm) for a spherical mirror, after calculating the magnification, conclude about the nature of the image formed.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 7,
                "marks_available": 1,
                "mark_scheme": "Since magnification is negative and greater than 1, the image is real, inverted, and magnified. (1 mark)",
                "chapter_name": "Natural Phenomena (Light - Reflection and Refraction)",
                "concepts_required": [
                    "Magnification by spherical mirrors",
                    "Relation between magnification sign and image nature (real/virtual, erect/inverted)",
                    "Relation between magnification magnitude and image size (magnified/diminished)"
                ],
                "student_answer": "b. The image is virtual and erect. & magnified",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student incorrectly states the image is 'virtual and erect'. A negative magnification (m=-2 from part a) indicates a real and inverted image. Only 'magnified' is correct.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.8135593220338982,
                        "page_number": 7
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "First, calculate the magnification. Given h_o = 5cm and h_i = -10cm, magnification m = h_i / h_o = -10cm / 5cm = -2. The negative sign of magnification indicates that the image is real and inverted. The magnitude of magnification, |m| = |-2| = 2, which is greater than 1, indicates that the image is magnified. Therefore, the image is real, inverted, and magnified.",
                "student_approach": "The student states 'virtual and erect' which is incorrect for a negative magnification. However, they correctly identify it as 'magnified'. Due to the incorrect nature, no marks are awarded.",
                "feedback": "Your answer correctly identifies that the image is magnified. However, a negative value of magnification (m = -2, as calculated in part a) signifies that the image formed is real and inverted, not virtual and erect. Please review the conventions for magnification sign and the nature of images formed by spherical mirrors.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Misinterpretation of the sign of magnification. A negative magnification value indicates a real and inverted image, not virtual and erect.",
                        "lacking_competencies": [
                            "C-2.3 Manipulates the position of object and properties of lenses (focus, centre of curvature) to observe image characteristics and correspondence with a ray diagram, and extends this understanding to a combination of lenses (telescope, microscope)"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.8135593220338982,
                        "page_number": 7
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.8135593220338982,
                "evaluation_score": "high"
            },
            {
                "question_id": 35,
                "component_id": "a",
                "question_summary": "Identify the possible phenomena that can occur when light falls on a surface.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 7,
                "marks_available": 1,
                "mark_scheme": "a) Reflection, Refraction, Absorption ......... 1 mark",
                "chapter_name": "Natural Phenomena",
                "concepts_required": [
                    "Reflection of light",
                    "Refraction of light",
                    "Absorption of light"
                ],
                "student_answer": "When light falls on a surface, either reflection or refraction takes place.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identified two of the three possible phenomena (reflection and refraction) but missed absorption.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.8983050847457626,
                        "page_number": 7
                    }
                ],
                "score_awarded": 0.5,
                "ideal_approach": "The ideal approach is to recall the three main phenomena that occur when light interacts with a surface: reflection (bouncing back), refraction (bending as it passes through), and absorption (energy conversion).",
                "student_approach": "The student correctly listed two of the three possible phenomena (reflection and refraction) but did not mention absorption.",
                "feedback": "You correctly identified reflection and refraction as phenomena when light falls on a surface. To achieve full marks, remember that light can also be absorbed by the surface, converting its energy into other forms like heat. Make sure to list all possible phenomena in such questions.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Failed to mention 'absorption' as a possible phenomenon when light falls on a surface.",
                        "lacking_competencies": [
                            "C-7.1 States concepts that represent the most current understanding of the matter being studied"
                        ],
                        "marks_lost": 0.5,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.8983050847457626,
                        "page_number": 7
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.8813559322033898,
                "evaluation_score": "high"
            },
            {
                "question_id": 35,
                "component_id": "b",
                "question_summary": "Explain why the refractive index of any material with respect to air is always greater than 1.",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 8,
                "marks_available": 1,
                "mark_scheme": "Since the speed of light in the medium is always less than the speed of light in air, hence the above ratio is always greater than 1. (1 mark)",
                "chapter_name": "Natural Phenomena",
                "concepts_required": [
                    "Refractive index",
                    "Speed of light in different media"
                ],
                "student_answer": "Refractive index of any material with respect to air is always greater than 1, because the speed of air compared to the speed of light as less light in air. Med",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly states that the refractive index is greater than 1 but provides an incorrect explanation by comparing 'speed of air' to 'speed of light' instead of comparing the speed of light in air to the speed of light in the medium. This demonstrates a conceptual misunderstanding of the definition of refractive index.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.1864406779661017,
                        "page_number": 8
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "The ideal approach is to define the refractive index as the ratio of the speed of light in air (or vacuum) to the speed of light in the given material. Since the speed of light is maximum in air/vacuum and decreases when it enters any other medium, the denominator of this ratio (speed of light in material) will always be less than the numerator (speed of light in air). Consequently, the refractive index will always be greater than 1.",
                "student_approach": "The student attempted to explain that the refractive index is greater than 1 due to a comparison of speeds. They stated, 'because the speed of air compared to the speed of light is less'. This phrasing incorrectly attributes 'speed of air' as a factor in the refractive index calculation rather than the 'speed of light in air'. The comparison made is not scientifically accurate in the context of refractive index.",
                "feedback": "You correctly stated that the refractive index of any material with respect to air is always greater than 1. However, your explanation for this is inaccurate. The refractive index is determined by the ratio of the speed of *light* in a vacuum (or air) to the speed of *light* in the specific material. Light always travels slower in any material medium than it does in a vacuum or air. Therefore, the ratio of (speed of light in air / speed of light in medium) will always be greater than 1. Ensure you differentiate between the speed of light in a medium and the properties of the medium itself.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student incorrectly explained the reason for the refractive index being greater than 1 by stating 'speed of air compared to the speed of light is less'. This shows a conceptual misunderstanding of the definition of refractive index, which involves the speed of *light* in different media, not the speed of air itself.",
                        "lacking_competencies": [
                            "C-7.1 States concepts that represent the most current understanding of the matter being studied, ranging from mere familiarity to conceptual understanding of the matter as appropriate to the developmental stage of the students"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.22033898305084745,
                        "page_number": 8
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.1864406779661017,
                "evaluation_score": "medium"
            },
            {
                "question_id": 35,
                "component_id": "c",
                "question_summary": "A light ray enters from medium A to medium B. Based on an implied figure (not provided in the question paper extract), what is the refractive index of medium B relative to medium A?",
                "typology": "Demonstrate Knowledge and Understanding",
                "question_type": "SA",
                "page_number": 8,
                "marks_available": 1,
                "mark_scheme": "Greater than unity (1 mark)",
                "chapter_name": "Natural Phenomena",
                "concepts_required": [
                    "Refractive index",
                    "Relative refractive index",
                    "Optical density"
                ],
                "student_answer": "The refractive index of medium B is greater than refractive index of medium A. greater than unity",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly states that the refractive index of medium B is greater than unity relative to medium A, which aligns with the provided mark scheme.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.3559322033898305,
                        "page_number": 8
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "The ideal approach is to state that the refractive index of medium B relative to medium A is greater than unity. This implies that medium B is optically denser than medium A, causing light to bend towards the normal when entering medium B from medium A.",
                "student_approach": "The student directly provided the correct answer, stating that the refractive index of medium B is 'greater than unity' relative to medium A.",
                "feedback": "Excellent! You have correctly identified that the refractive index of medium B relative to medium A is greater than unity. This demonstrates a clear understanding of relative refractive index concepts.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.288135593220339,
                "evaluation_score": "high"
            },
            {
                "question_id": 36,
                "component_id": "a",
                "question_summary": "Name the defect of vision represented in the diagram. Give reason for your answer.",
                "typology": "Recall & Understanding",
                "question_type": "SA",
                "page_number": 8,
                "marks_available": 1,
                "mark_scheme": "a) Hypermetropia as the image is formed beyond the retina.",
                "chapter_name": "Natural Phenomena - Human Eye and Colourful World",
                "concepts_required": [
                    "Defects of vision",
                    "Hypermetropia",
                    "Image formation in the human eye"
                ],
                "student_answer": "The defect in the alsove image is hypermetropia (far Significantness) as the image is formed benind the retina.",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly identified the defect as hypermetropia.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.4067796610169491,
                        "page_number": 8
                    },
                    {
                        "reasoning": "Student correctly stated the reason that the image is formed behind the retina.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.4406779661016949,
                        "page_number": 8
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To answer this question, first, observe the given diagram of the eye and the position where the image is formed. The diagram shows the image forming behind the retina, which is characteristic of hypermetropia. Therefore, name the defect as 'Hypermetropia' and state the reason as 'the image is formed behind the retina'.",
                "student_approach": "The student correctly identified the defect as hypermetropia and accurately provided the reason that the image is formed behind the retina. The additional phrase '(far Significantness)' is slightly redundant but does not detract from the correctness of the answer.",
                "feedback": "Excellent work! You have correctly identified the defect of vision as hypermetropia and accurately explained that the image is formed behind the retina. This demonstrates a strong understanding of eye defects.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.38983050847457623,
                "evaluation_score": "high"
            },
            {
                "question_id": 36,
                "component_id": "b",
                "question_summary": "With the help of a diagram show how the defect of vision (hypermetropia, where the image is formed behind the retina) is corrected.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "SA",
                "page_number": 8,
                "marks_available": 2,
                "mark_scheme": "A hypermetropic eye is corrected by using a convex lens such that the lens will bring the image back to the retina. Depending on how much the focal length has been altered due to the effects of hypermetropia, powered convex lenses can correct this problem. A diagram showing the correction of hypermetropia using a convex lens should be drawn.",
                "chapter_name": "The Human Eye and the Colourful World",
                "concepts_required": [
                    "Defects of vision (Hypermetropia)",
                    "Correction of defects of vision",
                    "Ray diagrams for convex lenses",
                    "Functioning of the human eye"
                ],
                "student_answer": "Student has drawn a diagram showing a convex lens placed in front of an eye. Parallel rays from N and N' pass through the convex lens, then the eye lens, and converge on the retina. The lens is labeled 'conver Lens' (convex lens) and 'Retina' is also labeled.",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student has correctly drawn a ray diagram illustrating the correction of hypermetropia using a convex lens. The placement of the convex lens and the path of the rays leading to image formation on the retina are accurate. Labels are also provided.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 2.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.5423728813559322,
                        "page_number": 8
                    }
                ],
                "score_awarded": 2.0,
                "ideal_approach": "The ideal approach is to draw a clear ray diagram. First, illustrate hypermetropia where parallel rays from a distant object converge behind the retina. Then, show how a convex lens placed in front of the eye causes the incident parallel rays to converge slightly before entering the eye's natural lens, thereby ensuring that the final image is formed precisely on the retina. All relevant parts like the convex lens, eye lens, and retina should be clearly labeled, and ray paths accurately depicted.",
                "student_approach": "The student has drawn a ray diagram showing the correction of hypermetropia. The diagram includes a convex lens in front of the eye, and light rays from a distant object (labeled N and N') are shown to converge on the retina after passing through the convex lens and the eye's lens. The diagram is clear and correctly depicts the corrective action of the convex lens.",
                "feedback": "Excellent work! Your diagram clearly and accurately illustrates how hypermetropia is corrected using a convex lens. The path of light rays and the labeling are precise, demonstrating a strong understanding of the concept.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.5254237288135594,
                "evaluation_score": "high"
            },
            {
                "question_id": 37,
                "component_id": "a",
                "question_summary": "In the given circuit diagram, a 3V battery is connected across a 10-ohm resistor and a 15-ohm resistor in parallel. Calculate the current that would flow through the 10-ohm resistor and the 15-ohm resistor individually.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "CASE_STUDY",
                "page_number": 8,
                "marks_available": 1,
                "mark_scheme": "10 ohm = 0.3A; 15 ohm = 0.2 A",
                "chapter_name": "Effects of Current",
                "concepts_required": [
                    "Ohm's Law",
                    "Electric Current",
                    "Voltage",
                    "Resistance",
                    "Parallel Circuits"
                ],
                "student_answer": "a. Current in 10Ω resistor = V/R = 3/10 A\nCurrent in 15Ω resistor = V/R = 3/15 A = 1/5 A",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly applied Ohm's Law (I=V/R) and calculated the current for the 10Ω resistor as 3/10 A (0.3A).",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.8135593220338982,
                        "page_number": 8
                    },
                    {
                        "reasoning": "Student correctly applied Ohm's Law (I=V/R) and calculated the current for the 15Ω resistor as 3/15 A (1/5 A or 0.2A).",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.9152542372881356,
                        "page_number": 8
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "The circuit shows a 3V battery connected across two resistors, 10Ω and 15Ω. Since the resistors are connected in parallel, the voltage across each resistor is the same as the source voltage, which is 3V. To find the current through each resistor, Ohm's Law (I = V/R) should be applied separately for each resistor. For the 10Ω resistor: I_10Ω = V / R_10Ω = 3V / 10Ω = 0.3A. For the 15Ω resistor: I_15Ω = V / R_15Ω = 3V / 15Ω = 0.2A.",
                "student_approach": "The student correctly identified that Ohm's Law (I = V/R) is applicable. They correctly used the 3V supply voltage for both parallel resistors and substituted the respective resistance values to calculate the current for both the 10Ω and 15Ω resistors, providing the answers in fractional form.",
                "feedback": "Excellent work! You have correctly identified that the resistors are in parallel and applied Ohm's law accurately for both resistors. Your calculations for current through both the 10-ohm and 15-ohm resistors are perfectly correct. Keep up the good work in applying fundamental physics principles to circuit analysis.",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.7627118644067797,
                "evaluation_score": "high"
            },
            {
                "question_id": 37,
                "component_id": "b",
                "question_summary": "Three V-I graphs (A, B, C) are drawn individually for two resistors and their series combination. Identify which graph represents the series combination of the other two and provide a reason.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "CASE_STUDY",
                "page_number": 5,
                "marks_available": 2,
                "mark_scheme": "Identify line C as the series combination (1 mark). Reason: Series combination has maximum resistance, and resistance is represented by the slope of the V-I graph (V on y-axis, I on x-axis), so the series combination has the maximum slope (1 mark).",
                "chapter_name": "Effects of Current",
                "concepts_required": [
                    "Ohm's Law",
                    "Resistance in series",
                    "V-I graphs",
                    "Slope of V-I graph and its relation to resistance"
                ],
                "student_answer": "b. Out Of A, B, C. graph C represents the resistors for the series combination",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly identified graph C as representing the series combination.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 1.0,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.22033898305084745,
                        "page_number": 5
                    },
                    {
                        "reasoning": "Student did not provide a reason for why graph C represents the series combination, failing to explain the relationship between series resistance and the slope of the V-I graph.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.23728813559322035,
                        "page_number": 5
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To solve this, one should recall that for a V-I graph where voltage (V) is plotted on the y-axis and current (I) on the x-axis, the slope of the graph (V/I) represents the resistance (R). In a series combination of resistors, the total equivalent resistance is the sum of the individual resistances (Req = R1 + R2 + ...), which means the series combination will have the highest resistance. Therefore, the graph representing the series combination will have the steepest slope. Graph C has the steepest slope, correctly indicating it as the series combination.",
                "student_approach": "The student correctly identified graph C as the representation of the series combination. However, they did not provide any reasoning or explanation for their choice, which was required by the question.",
                "feedback": "You correctly identified graph C as representing the series combination of resistors, which is a good start. However, to earn full marks, it's crucial to provide the 'why' behind your answer. Remember that in a V-I graph where voltage is on the y-axis, the slope represents resistance. Since a series combination has the highest equivalent resistance, its graph should exhibit the steepest slope. Always include the reasoning in your answers, especially when asked.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student did not provide the reason for their choice, indicating a lack of understanding or inability to articulate why graph C (with the steepest slope) represents the series combination (highest resistance).",
                        "lacking_competencies": [
                            "C-2.4: Manipulates and analyses different characteristics of the circuit (current, voltage, resistance) and mathematises their relationship (Ohm's law)."
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.23728813559322035,
                        "page_number": 5
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.22033898305084745,
                "evaluation_score": "high"
            },
            {
                "question_id": 38,
                "component_id": "a",
                "question_summary": "B1, B2 and B3 are three identical bulbs connected as shown in the figure. When all the three bulbs glow, a current of 3A is recorded by the ammeter A. What happens to the glow of the other two bulbs when the bulb B1 gets fused?",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "CASE_STUDY",
                "page_number": 5,
                "marks_available": 2,
                "mark_scheme": "a) When B1 gets fused, bulbs B2 and B3 continue to glow with the same brightness. Reason: In a parallel connection, current through one branch does not affect the others.",
                "chapter_name": "Electricity",
                "concepts_required": [
                    "Parallel circuits",
                    "Current distribution in parallel circuits",
                    "Independence of branches in parallel circuits",
                    "Effect of fusing a component in a parallel circuit"
                ],
                "student_answer": "If B. gels fused, the glow of the other two bulbs will increase because they have more current Flowing to them because it is parallel combination In parallel the current splits",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student correctly identifies that the bulbs are in a parallel combination.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.3898305084745763,
                        "page_number": 5
                    }
                ],
                "score_awarded": 0.5,
                "ideal_approach": "The ideal approach is to recognize that bulbs B1, B2, and B3 are connected in parallel. In a parallel circuit, each branch operates independently. Therefore, if bulb B1 gets fused, the current path through B1 is broken, but the current paths through B2 and B3 remain unaffected. Consequently, bulbs B2 and B3 will continue to glow with the same brightness, as the voltage across them and their individual currents do not change.",
                "student_approach": "The student correctly identifies that the bulbs are in a parallel combination and that current splits in parallel circuits. However, they incorrectly conclude that the glow of the other two bulbs will increase due to more current flowing to them, which is a conceptual error regarding the independence of parallel branches.",
                "feedback": "You correctly identified that the bulbs are in a parallel combination, which is a good start. However, your conclusion about the glow increasing is incorrect. In a parallel circuit, when one component fuses, the other components connected in parallel continue to operate independently, maintaining their original current and brightness. The total current from the source might change, but the current through each *individual* parallel branch remains the same as long as the voltage supply is constant.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "The student incorrectly concluded that the glow of the other bulbs would increase due to more current, indicating a misunderstanding of how current and brightness are affected in independent parallel branches when one branch fails.",
                        "lacking_competencies": [
                            "Application of Knowledge/Concepts (C-2.4: Manipulates and analyses different characteristics of the circuit)"
                        ],
                        "marks_lost": 1.5,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.3559322033898305,
                        "page_number": 5
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.33898305084745767,
                "evaluation_score": "high"
            },
            {
                "question_id": 38,
                "component_id": "b",
                "question_summary": "B1, B2 and B3 are three identical bulbs connected as shown in the figure. When all the three bulbs glow, a current of 3A is recorded by the ammeter A. What will be the reading of ammeter A when bulb B2 gets fused?",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "CASE_STUDY",
                "page_number": 5,
                "marks_available": 1,
                "mark_scheme": "When B2 gets fused, total current decreases to 2 A (only B1 and B3 are working, each drawing 1 A).",
                "chapter_name": "Effects of Current",
                "concepts_required": [
                    "Parallel combination of resistors/bulbs",
                    "Current distribution in parallel circuits",
                    "Effect of open circuit in parallel branch",
                    "Ohm's Law"
                ],
                "student_answer": "the reading of ammeter A wont change because the current will get divided into the other two bulbs.",
                "scoring_breakdown": [],
                "score_awarded": 0.0,
                "ideal_approach": "1. Identify that the bulbs B1, B2, and B3 are connected in parallel, and ammeter A measures the total current from the source. 2. Recognize that when all three identical bulbs glow, the total current is 3A, implying each bulb draws 1A (3A / 3 bulbs = 1A/bulb). 3. Understand that in a parallel circuit, if one bulb (B2) fuses, its branch becomes open, and no current flows through it. 4. The remaining bulbs (B1 and B3) are still connected in parallel to the main voltage source and will continue to draw their individual currents (1A each, assuming the voltage remains constant). 5. Calculate the new total current measured by ammeter A: Current through B1 + Current through B3 = 1A + 1A = 2A. 6. Therefore, the reading of ammeter A will decrease to 2A.",
                "student_approach": "The student incorrectly states that the reading of ammeter A 'wont change'. While they correctly infer that 'current will get divided into the other two bulbs', they fail to understand that the total current drawn from the source will decrease when one of the parallel branches is removed, even if the remaining branches continue to operate individually.",
                "feedback": "Your understanding that current will still flow through the other two bulbs is correct. However, you've missed a critical point about total current in a parallel circuit. When one branch (bulb B2) fuses, it no longer draws current. This means the total current drawn from the main supply (measured by ammeter A) will decrease, as there are now only two active branches instead of three. The initial total current was 3A (1A per bulb). With B2 fused, only B1 and B3 will draw current, resulting in a total current of 2A. Always consider how the total load on the circuit changes.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Failed to understand that the total current in a parallel circuit decreases when a branch is removed, even if other branches continue to operate.",
                        "lacking_competencies": [
                            "C-2.4 Manipulates and analyses different characteristics of the circuit (current, voltage, resistance) and mathematises their relationship (Ohm's law), and applies it to everyday usage (electricity bill, short circuit, safety measures)"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.4406779661016949,
                        "page_number": 5
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.4406779661016949,
                "evaluation_score": "high"
            },
            {
                "question_id": 38,
                "component_id": "d",
                "question_summary": "Explain why household appliances are never connected in series, though it would save wiring.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "CASE_STUDY",
                "page_number": 5,
                "marks_available": 1,
                "mark_scheme": "Appliances are never connected in series because if one appliance fails, all others stop working, and they would not get the proper voltage.",
                "chapter_name": "Effects of Current",
                "concepts_required": [
                    "Series combination of resistors",
                    "Parallel combination of resistors",
                    "Household circuits",
                    "Voltage distribution in series circuits",
                    "Current flow in series circuits"
                ],
                "student_answer": "Even though it would save wiring, household appliances are never connected in series because if we turn off one appliance, all other appliances will also get turned off.",
                "scoring_breakdown": [
                    {
                        "reasoning": "Correctly identifies that if one appliance is turned off/fails, others will also stop working.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.576271186440678,
                        "page_number": 5
                    }
                ],
                "score_awarded": 0.5,
                "ideal_approach": "The ideal approach is to explain that household appliances are not connected in series for two main reasons: 1. If one appliance fails or is switched off, all other appliances in the circuit will stop working. 2. Appliances would not receive the proper operating voltage, as the voltage gets divided across each appliance in a series circuit, leading to inefficient or non-functional operation.",
                "student_approach": "The student correctly states that household appliances are not connected in series. They identify one major reason: if one appliance is turned off, all others will also turn off. However, the student misses the crucial point about appliances not receiving their proper operating voltage in a series connection.",
                "feedback": "The student demonstrated a partial understanding of why household appliances are not connected in series by correctly identifying that turning off one appliance would affect all others. To improve, the student should also explain that appliances in a series connection would not get the necessary operating voltage, which is critical for their individual functioning and performance.",
                "mistakes_made": [
                    {
                        "mistake_type": "conceptual_gap",
                        "mistake_description": "Did not mention that appliances in a series circuit would not get the proper operating voltage, which is essential for their individual optimal functioning.",
                        "lacking_competencies": [
                            "C-2.4"
                        ],
                        "marks_lost": 0.5,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.5423728813559322,
                        "page_number": 5
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.5423728813559322,
                "evaluation_score": "high"
            },
            {
                "question_id": 39,
                "component_id": "A(a)",
                "question_summary": "The question asks in which of the two given circuits (Madhu's or Rahul's) the bulb will glow when the switch is closed, and to provide an explanation. Madhu's circuit has the switch on the neutral wire while the bulb is connected to the live and neutral before the switch. Rahul's circuit has the switch on the live wire controlling the connection to the bulb.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "LA",
                "page_number": 5,
                "marks_available": 1,
                "mark_scheme": "A. (a) 0.5 marks each for the following: The bulb will glow in both the circuits. The circuits will be closed / complete.",
                "chapter_name": "Magnetic Effects of Electric Current - Application & Analysis",
                "concepts_required": [
                    "Electric circuits",
                    "Live wire and Neutral wire",
                    "Current flow in a circuit",
                    "Closed and Open circuits"
                ],
                "student_answer": "In Madhu's circuit, the bulb will glow even when the switch is closed is because current enters From the live wire and exits through the neutral wire over here / when we close the switch we are giving it a connection to exit through the neutral wire. Both circuit will glow",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly identifies that the bulb will glow in Madhu's circuit and later states 'Both circuit will glow', covering the first point of the mark scheme.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.7796610169491526,
                        "page_number": 5
                    },
                    {
                        "reasoning": "The student explains the current flow from the live wire and exit through the neutral wire, which implicitly explains the circuit completion for the bulb to glow.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.711864406779661,
                        "page_number": 5
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "To answer this question, one should analyze both circuits. In Madhu's circuit, the switch is placed in the neutral wire after the bulb. When the switch is closed, the neutral path is completed, allowing current to flow through the live wire to the bulb and then back through the neutral wire. In Rahul's circuit, the switch is placed in the live wire before the bulb. When the switch is closed, the live wire connection to the bulb is completed, allowing current to flow from the live wire through the bulb and back through the neutral wire. Therefore, the bulb will glow in both circuits when the switches are closed because a complete circuit path for current flow is established in both cases.",
                "student_approach": "The student first mentions that the bulb in Madhu's circuit will glow when the switch is closed, then provides an explanation focusing on current flow from the live wire and exit through the neutral wire. Finally, the student concludes that both circuits will glow, indicating a complete understanding that both circuits will function upon closing the switch.",
                "feedback": "Excellent work! You have correctly identified that the bulb will glow in both circuits when the switch is closed. Your explanation of current entering from the live wire and exiting through the neutral wire is accurate and demonstrates a good understanding of how circuits function. Keep up the good work!",
                "mistakes_made": [],
                "x_coordinate": 0.05,
                "y_coordinate": 0.6610169491525424,
                "evaluation_score": "high"
            },
            {
                "question_id": 39,
                "component_id": "A(b)",
                "question_summary": "Observe Madhu's circuit (where the switch is on the neutral wire) and Rahul's circuit (where the switch is on the live wire). Both Madhu and Rahul open the switches in their circuits to change the bulbs. For whom will changing the bulb be safe and for whom will it be dangerous? Explain why.",
                "typology": "Formulate, Analyze, Evaluate and Create",
                "question_type": "LA",
                "page_number": 5,
                "marks_available": 2,
                "mark_scheme": "0.5 marks for each point: Changing the bulb will be dangerous for Madhu. Changing the bulb will be safe for Rahul. In Madhu's circuit, the bulb point is still connected to the live wire and can give an electric shock even when the switch is in the open position. In Rahul's circuit, the bulb point is no longer connected to the live wire when the switch is in the open position.",
                "chapter_name": "Electricity: Domestic Circuits",
                "concepts_required": [
                    "Live wire",
                    "Neutral wire",
                    "Electrical switches",
                    "Current flow",
                    "Electrical safety in household circuits"
                ],
                "student_answer": "It will be dangerous to change the bulb in Madhu's circuit because the current is constantly flowing to the bulb which can get overheated.",
                "scoring_breakdown": [
                    {
                        "reasoning": "Student correctly stated that changing the bulb in Madhu's circuit would be dangerous.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.7966101694915255,
                        "page_number": 5
                    },
                    {
                        "reasoning": "Student correctly explained the danger in Madhu's circuit by mentioning constant current flow to the bulb, even with the switch open.",
                        "mark_awarded": true,
                        "partial_mark_awarded": 0.5,
                        "x_coordinate": 0.9,
                        "y_coordinate": 0.8135593220338982,
                        "page_number": 5
                    }
                ],
                "score_awarded": 1.0,
                "ideal_approach": "The ideal approach involves analyzing both Madhu's and Rahul's circuits with respect to the position of the switch (live or neutral wire). In Madhu's circuit, the switch is in the neutral wire, meaning the live wire is always connected to the bulb, making it dangerous to change the bulb even when the switch is open. In Rahul's circuit, the switch is in the live wire, so opening the switch disconnects the live wire from the bulb, making it safe to change the bulb.",
                "student_approach": "The student correctly identified that it is dangerous to change the bulb in Madhu's circuit and provided a partial explanation regarding continuous current flow. However, the student completely omitted any mention of Rahul's circuit and its safety implications, which constitutes half of the answer required by the question.",
                "feedback": "You correctly identified that changing the bulb in Madhu's circuit would be dangerous and provided a good reason for it, stating that current constantly flows to the bulb. To improve, remember to address all parts of the question comprehensively. You missed explaining why it would be safe to change the bulb in Rahul's circuit, indicating a gap in understanding the full safety implications of switch placement in household circuits.",
                "mistakes_made": [
                    {
                        "mistake_type": "question_understanding",
                        "mistake_description": "Failed to address the safety aspect for Rahul's circuit and the corresponding explanation, which was a required part of the question.",
                        "lacking_competencies": [
                            "C-2.4 Manipulates and analyses different characteristics of the circuit",
                            "C-2.4 Applies to everyday usage (safety measures)"
                        ],
                        "marks_lost": 1.0,
                        "x_coordinate": 0.95,
                        "y_coordinate": 0.8135593220338982,
                        "page_number": 5
                    }
                ],
                "x_coordinate": 0.05,
                "y_coordinate": 0.8135593220338982,
                "evaluation_score": "medium"
            },
            {
                "question_id": 39,
                "component_id": "A(c)",
                "question_summary": "In a household circuit, an electric iron of power 1000 W and a microwave oven of power 1200 W are connected in parallel to a 240 V supply. A fuse rated for 8 A is connected to the circuit. Calculate the total current drawn by the iron and the microwave.",
                "typology": "Application of Knowledge/Concepts",
                "question_type": "LA",
                "page_number": 9,
                "marks_available": 2,
                "mark_scheme": "Current drawn by electric iron (I1) = P/V = 1000W / 240V = 4.17 A (0.5 mark). Current drawn by microwave oven (I2) = P/V = 1200W / 240V = 5.0 A (0.5 mark). Total current = I = I1 + I2 = 4.17 + 5.0 = 9.17 A (1 mark).",
                "chapter_name": "Effects of Current",
                "concepts_required": [
                    "Electric Power (P=VI)",
                    "Current calculation in parallel circuits",
                    "Basic arithmetic calculations"
                ],
                "student_answer": "not found",
                "scoring_breakdown": [
                    {
                        "reasoning": "The student did not attempt the question.",
                        "mark_awarded": false,
                        "partial_mark_awarded": null,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 9
                    }
                ],
                "score_awarded": 0.0,
                "ideal_approach": "To calculate the total current, first determine the current drawn by each appliance using the formula P = VI, where P is power, V is voltage, and I is current. For the electric iron, I_iron = P_iron / V_supply. For the microwave oven, I_microwave = P_microwave / V_supply. Since the appliances are connected in parallel, the total current drawn from the supply is the sum of the individual currents: I_total = I_iron + I_microwave.",
                "student_approach": "The student did not attempt the question.",
                "feedback": "The question was not attempted. To earn marks, it is crucial to at least attempt the problem. Even partial attempts showing correct formulas or initial calculations can sometimes earn partial credit. In this case, you would need to calculate the current for each appliance and then sum them up.",
                "mistakes_made": [
                    {
                        "mistake_type": "skipped",
                        "mistake_description": "The student did not attempt question 39 A(c).",
                        "lacking_competencies": [
                            "C-2.4 Manipulates and analyses different characteristics of the circuit (current, voltage, resistance) and mathematises their relationship (Ohm's law), and applies it to everyday usage (electricity bill, short circuit, safety measures)"
                        ],
                        "marks_lost": 2.0,
                        "x_coordinate": 0.0,
                        "y_coordinate": 0.0,
                        "page_number": 9
                    }
                ],
                "x_coordinate": 0.0,
                "y_coordinate": 0.0,
                "evaluation_score": "high"
            }
        ],
        "typology_performance": {
            "Application of Knowledge/Concepts": {
                "score_awarded": 10.5,
                "total_possible": 28.0,
                "percentage": 37.5,
                "question_count": 22
            },
            "Demonstrate Knowledge and Understanding": {
                "score_awarded": 11.5,
                "total_possible": 36.0,
                "percentage": 31.94,
                "question_count": 30
            },
            "Assertion-Reasoning type questions": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Assertion – Reasoning type question": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Understanding": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 2
            },
            "Heredity - Analysis-Application": {
                "score_awarded": 2.5,
                "total_possible": 5.0,
                "percentage": 50.0,
                "question_count": 2
            },
            "VSA": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Recall": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 2
            },
            "Assertion-Reasoning type question": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Recall & Understanding": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Formulate, Analyze, Evaluate and Create": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            }
        },
        "concept_performance": {
            "Plant hormones": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 2
            },
            "Auxin": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Apical dominance": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Pruning": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Nerve impulse transmission": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Structure of neuron": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Direction of signal flow in nervous system": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Male reproductive system": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Sperm transport pathway": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Composition of blood": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Role of Haemoglobin": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Elements in biological molecules": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Interpreting given information": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Nutrition in humans": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Digestion": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Impact of diet on health": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Understanding of disease conditions from provided text": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Asexual Reproduction": {
                "score_awarded": 2.0,
                "total_possible": 2.0,
                "percentage": 100.0,
                "question_count": 2
            },
            "Budding in Hydra": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Cell Division": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Sexual Reproduction": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 2
            },
            "Variation": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Evolution": {
                "score_awarded": 2.5,
                "total_possible": 4.0,
                "percentage": 62.5,
                "question_count": 2
            },
            "Heredity": {
                "score_awarded": 3.5,
                "total_possible": 6.0,
                "percentage": 58.33,
                "question_count": 3
            },
            "Auxins": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Phototropism": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Plant growth and development": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Plant Reproduction": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Parts of a flower (carpel, stigma, stamen, anther)": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Pollination": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Fertilization in plants": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Development of ovule into seed": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Human digestive system": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Role of Hydrochloric acid": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Enzyme action (pepsin)": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Human Digestive System": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 2
            },
            "Structure and Function of Villi": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Nutrient Absorption": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Hormonal regulation in humans": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Puberty": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Male hormones": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Hormonal regulation": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Insulin": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Blood sugar level regulation": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Endocrine system": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Vegetative Propagation": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Asexual reproduction": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Vegetative propagation": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Inheritance of traits": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Function of stomach acid": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Acidity": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Human Digestion": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Role of Hydrochloric Acid": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Enzyme Function (Pepsin)": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Stomach": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Hydrochloric acid": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Mucus": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Digestive system protection mechanisms": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Reflex action": {
                "score_awarded": 0.5,
                "total_possible": 3.0,
                "percentage": 16.67,
                "question_count": 1
            },
            "Reflex arc": {
                "score_awarded": 0.5,
                "total_possible": 3.0,
                "percentage": 16.67,
                "question_count": 1
            },
            "Components of nervous system (receptors, sensory neuron, spinal cord, motor neuron, effector)": {
                "score_awarded": 0.5,
                "total_possible": 3.0,
                "percentage": 16.67,
                "question_count": 1
            },
            "Fertilisation": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 2
            },
            "Gametes": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Zygote formation": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 2
            },
            "Fertilization": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Sperm": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Egg": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Polyspermy prevention": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Embryo development": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Human Reproduction": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Placenta": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Pregnancy": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Nutrient exchange": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Gas exchange": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Waste removal": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Hormone secretion": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Inherited traits": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Genes": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Genetic variation": {
                "score_awarded": 2.5,
                "total_possible": 5.0,
                "percentage": 50.0,
                "question_count": 2
            },
            "Sexual reproduction": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Genetic inheritance": {
                "score_awarded": 1.5,
                "total_possible": 3.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Natural selection": {
                "score_awarded": 1.5,
                "total_possible": 3.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Survival of species": {
                "score_awarded": 1.5,
                "total_possible": 3.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Endothermic Processes": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Sublimation": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Evaporation": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Exothermic Processes": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "pH scale": {
                "score_awarded": 2.0,
                "total_possible": 4.0,
                "percentage": 50.0,
                "question_count": 4
            },
            "Acids": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 2
            },
            "Bases": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 2
            },
            "pH indicators": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Neutralization": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Simple Displacement Reaction": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Types of Chemical Reactions": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 2
            },
            "Water of Crystallization": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Chemical Formulas of Common Salts": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Properties of Ionic Compounds": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Properties of metals": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Properties of non-metals": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Elements existing in liquid state": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Properties of Non-metals": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Exceptions to Non-metal Properties (Lustre)": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Homologous series": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Combustion of organic compounds": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Alkanes": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Alcohols": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Aldehydes": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Reactions of metals with acids": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Oxidizing and reducing agents": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Properties of nitric acid": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Assertion-Reason analysis": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Structural Isomerism": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Ketone Functional Group": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Drawing Structural Formulas": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Valency of Carbon and Oxygen": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Types of chemical reactions": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Observations in chemical reactions": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Writing balanced chemical equations": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 2
            },
            "Exothermic Reactions": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Writing Chemical Equations": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Chemical Formulas": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Chemical reactions": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Precipitation reactions": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "States of matter": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Properties of Acids": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Ionization": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Strong acids": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Weak bases": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Acid rain": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Effects of pH on aquatic life": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Esters and Esterification": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Functional groups (Carboxylic acid, Alcohol, Ester)": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "IUPAC Nomenclature of organic compounds": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Structure of organic compounds": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Esterification reaction": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Role of acid catalyst": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Effect of heating on reaction rate": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Chemical properties of metals": {
                "score_awarded": 0.0,
                "total_possible": 3.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Chemical properties of non-metals": {
                "score_awarded": 0.0,
                "total_possible": 3.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Differentiation between metals and non-metals": {
                "score_awarded": 0.0,
                "total_possible": 3.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Properties of Metals": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 2
            },
            "Electrical Conductivity": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Metallic Bonding/Free Electrons": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Alloys": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Interstitial impurities": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Steel manufacturing": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Convex lens image formation": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Ray diagrams for lenses": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Focal length": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Optical centre": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Scattering of light": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Wavelength of visible light": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Rayleigh scattering": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Magnetic field due to a current carrying conductor": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Factors affecting magnetic field strength": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Refraction of light": {
                "score_awarded": 1.5,
                "total_possible": 3.0,
                "percentage": 50.0,
                "question_count": 2
            },
            "Snell's Law": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Refractive Index": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Speed of light in different media": {
                "score_awarded": 1.0,
                "total_possible": 3.0,
                "percentage": 33.33,
                "question_count": 2
            },
            "Magnification by spherical mirrors": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 2
            },
            "Sign conventions for heights": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Relation between magnification sign and image nature (real/virtual, erect/inverted)": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Relation between magnification magnitude and image size (magnified/diminished)": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Reflection of light": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Absorption of light": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Refractive index": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 2
            },
            "Relative refractive index": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Optical density": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Defects of vision": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Hypermetropia": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Image formation in the human eye": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Defects of vision (Hypermetropia)": {
                "score_awarded": 2.0,
                "total_possible": 2.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Correction of defects of vision": {
                "score_awarded": 2.0,
                "total_possible": 2.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Ray diagrams for convex lenses": {
                "score_awarded": 2.0,
                "total_possible": 2.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Functioning of the human eye": {
                "score_awarded": 2.0,
                "total_possible": 2.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Ohm's Law": {
                "score_awarded": 2.0,
                "total_possible": 4.0,
                "percentage": 50.0,
                "question_count": 3
            },
            "Electric Current": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Voltage": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Resistance": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Parallel Circuits": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Resistance in series": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "V-I graphs": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Slope of V-I graph and its relation to resistance": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Parallel circuits": {
                "score_awarded": 0.5,
                "total_possible": 2.0,
                "percentage": 25.0,
                "question_count": 1
            },
            "Current distribution in parallel circuits": {
                "score_awarded": 0.5,
                "total_possible": 3.0,
                "percentage": 16.67,
                "question_count": 2
            },
            "Independence of branches in parallel circuits": {
                "score_awarded": 0.5,
                "total_possible": 2.0,
                "percentage": 25.0,
                "question_count": 1
            },
            "Effect of fusing a component in a parallel circuit": {
                "score_awarded": 0.5,
                "total_possible": 2.0,
                "percentage": 25.0,
                "question_count": 1
            },
            "Parallel combination of resistors/bulbs": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Effect of open circuit in parallel branch": {
                "score_awarded": 0.0,
                "total_possible": 1.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Series combination of resistors": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Parallel combination of resistors": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Household circuits": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Voltage distribution in series circuits": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Current flow in series circuits": {
                "score_awarded": 0.5,
                "total_possible": 1.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Electric circuits": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Live wire and Neutral wire": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Current flow in a circuit": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Closed and Open circuits": {
                "score_awarded": 1.0,
                "total_possible": 1.0,
                "percentage": 100.0,
                "question_count": 1
            },
            "Live wire": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Neutral wire": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Electrical switches": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Current flow": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Electrical safety in household circuits": {
                "score_awarded": 1.0,
                "total_possible": 2.0,
                "percentage": 50.0,
                "question_count": 1
            },
            "Electric Power (P=VI)": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Current calculation in parallel circuits": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            },
            "Basic arithmetic calculations": {
                "score_awarded": 0.0,
                "total_possible": 2.0,
                "percentage": 0.0,
                "question_count": 1
            }
        },
        "question_type_performance": {
            "MCQ": {
                "score_awarded": 10.0,
                "total_possible": 20.0,
                "percentage": 50.0,
                "question_count": 20
            },
            "SA": {
                "score_awarded": 12.0,
                "total_possible": 34.0,
                "percentage": 35.29,
                "question_count": 29
            },
            "LA": {
                "score_awarded": 4.5,
                "total_possible": 15.0,
                "percentage": 30.0,
                "question_count": 8
            },
            "CASE_STUDY": {
                "score_awarded": 3.0,
                "total_possible": 11.0,
                "percentage": 27.27,
                "question_count": 7
            }
        },
        "mistake_type_performance": {
            "conceptual_gap": {
                "score_awarded": 0.0,
                "total_possible": 30.0,
                "percentage": 0.0,
                "question_count": 30
            },
            "question_understanding": {
                "score_awarded": 0.0,
                "total_possible": 8.0,
                "percentage": 0.0,
                "question_count": 6
            },
            "skipped": {
                "score_awarded": 0.0,
                "total_possible": 12.0,
                "percentage": 0.0,
                "question_count": 9
            },
            "execution_issue": {
                "score_awarded": 0.0,
                "total_possible": 0.5,
                "percentage": 0.0,
                "question_count": 1
            }
        },
        "chapter_performance": {
            "Control and Co-ordination": {
                "score_awarded": 0.0,
                "total_possible": 2,
                "percentage": 0.0,
                "question_count": 2,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 0.0,
                        "total_possible": 1.0,
                        "percentage": 0.0,
                        "question_count": 1
                    },
                    "SA": {
                        "score_awarded": 0.0,
                        "total_possible": 1.0,
                        "percentage": 0.0,
                        "question_count": 1
                    }
                }
            },
            "Control and Coordination": {
                "score_awarded": 0.0,
                "total_possible": 1,
                "percentage": 0.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 0.0,
                        "total_possible": 1.0,
                        "percentage": 0.0,
                        "question_count": 1
                    }
                }
            },
            "Reproduction": {
                "score_awarded": 1.5,
                "total_possible": 3,
                "percentage": 50.0,
                "question_count": 3,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 0.0,
                        "total_possible": 1.0,
                        "percentage": 0.0,
                        "question_count": 1
                    },
                    "SA": {
                        "score_awarded": 1.5,
                        "total_possible": 2.0,
                        "percentage": 75.0,
                        "question_count": 2
                    }
                }
            },
            "Life Processes": {
                "score_awarded": 2.0,
                "total_possible": 7,
                "percentage": 28.57,
                "question_count": 7,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 1.0,
                        "total_possible": 2.0,
                        "percentage": 50.0,
                        "question_count": 2
                    },
                    "SA": {
                        "score_awarded": 1.0,
                        "total_possible": 5.0,
                        "percentage": 20.0,
                        "question_count": 5
                    }
                }
            },
            "The World of the Living": {
                "score_awarded": 1.0,
                "total_possible": 1,
                "percentage": 100.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    }
                }
            },
            "Heredity and Evolution": {
                "score_awarded": 3.5,
                "total_possible": 6,
                "percentage": 58.33,
                "question_count": 3,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    },
                    "LA": {
                        "score_awarded": 2.5,
                        "total_possible": 5.0,
                        "percentage": 50.0,
                        "question_count": 2
                    }
                }
            },
            "Control and Co-ordination in Plants": {
                "score_awarded": 0.0,
                "total_possible": 1,
                "percentage": 0.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 0.0,
                        "total_possible": 1.0,
                        "percentage": 0.0,
                        "question_count": 1
                    }
                }
            },
            "How do organisms reproduce": {
                "score_awarded": 1.0,
                "total_possible": 1,
                "percentage": 100.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    }
                }
            },
            "Control and Co-ordination in animals and plants": {
                "score_awarded": 1.0,
                "total_possible": 1,
                "percentage": 100.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "SA": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    }
                }
            },
            "Control and Co-ordination in Animals and Plants": {
                "score_awarded": 0.5,
                "total_possible": 3,
                "percentage": 16.67,
                "question_count": 1,
                "question_type_breakdown": {
                    "SA": {
                        "score_awarded": 0.5,
                        "total_possible": 3.0,
                        "percentage": 16.67,
                        "question_count": 1
                    }
                }
            },
            "How do Organisms Reproduce": {
                "score_awarded": 0.0,
                "total_possible": 3,
                "percentage": 0.0,
                "question_count": 3,
                "question_type_breakdown": {
                    "SA": {
                        "score_awarded": 0.0,
                        "total_possible": 3.0,
                        "percentage": 0.0,
                        "question_count": 3
                    }
                }
            },
            "How do Organisms Reproduce (The World of the Living)": {
                "score_awarded": 0.5,
                "total_possible": 1,
                "percentage": 50.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "SA": {
                        "score_awarded": 0.5,
                        "total_possible": 1.0,
                        "percentage": 50.0,
                        "question_count": 1
                    }
                }
            },
            "Chemical Reactions & Equations": {
                "score_awarded": 0.0,
                "total_possible": 1,
                "percentage": 0.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 0.0,
                        "total_possible": 1.0,
                        "percentage": 0.0,
                        "question_count": 1
                    }
                }
            },
            "Acids, Bases and Salts": {
                "score_awarded": 2.0,
                "total_possible": 3,
                "percentage": 66.67,
                "question_count": 3,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    },
                    "SA": {
                        "score_awarded": 1.0,
                        "total_possible": 2.0,
                        "percentage": 50.0,
                        "question_count": 2
                    }
                }
            },
            "Chemical Reactions and Equations": {
                "score_awarded": 1.0,
                "total_possible": 5,
                "percentage": 20.0,
                "question_count": 5,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 1.0,
                        "total_possible": 2.0,
                        "percentage": 50.0,
                        "question_count": 2
                    },
                    "SA": {
                        "score_awarded": 0.0,
                        "total_possible": 3.0,
                        "percentage": 0.0,
                        "question_count": 3
                    }
                }
            },
            "Acids, Bases & Salts": {
                "score_awarded": 0.0,
                "total_possible": 2,
                "percentage": 0.0,
                "question_count": 2,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 0.0,
                        "total_possible": 1.0,
                        "percentage": 0.0,
                        "question_count": 1
                    },
                    "SA": {
                        "score_awarded": 0.0,
                        "total_possible": 1.0,
                        "percentage": 0.0,
                        "question_count": 1
                    }
                }
            },
            "Metals and Non-metals": {
                "score_awarded": 1.0,
                "total_possible": 7,
                "percentage": 14.29,
                "question_count": 5,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 1.0,
                        "total_possible": 2.0,
                        "percentage": 50.0,
                        "question_count": 2
                    },
                    "LA": {
                        "score_awarded": 0.0,
                        "total_possible": 5.0,
                        "percentage": 0.0,
                        "question_count": 3
                    }
                }
            },
            "Carbon and its Compounds": {
                "score_awarded": 1.0,
                "total_possible": 7,
                "percentage": 14.29,
                "question_count": 4,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    },
                    "SA": {
                        "score_awarded": 0.0,
                        "total_possible": 2.0,
                        "percentage": 0.0,
                        "question_count": 1
                    },
                    "CASE_STUDY": {
                        "score_awarded": 0.0,
                        "total_possible": 4.0,
                        "percentage": 0.0,
                        "question_count": 2
                    }
                }
            },
            "Natural Phenomena": {
                "score_awarded": 2.5,
                "total_possible": 6,
                "percentage": 41.67,
                "question_count": 5,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 0.0,
                        "total_possible": 1.0,
                        "percentage": 0.0,
                        "question_count": 1
                    },
                    "SA": {
                        "score_awarded": 2.5,
                        "total_possible": 5.0,
                        "percentage": 50.0,
                        "question_count": 4
                    }
                }
            },
            "Natural Phenomena (Human Eye & Colourful World)": {
                "score_awarded": 1.0,
                "total_possible": 1,
                "percentage": 100.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    }
                }
            },
            "Magnetic Effects of Current": {
                "score_awarded": 1.0,
                "total_possible": 1,
                "percentage": 100.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "MCQ": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    }
                }
            },
            "Natural Phenomena - Light: Reflection by Spherical Mirrors": {
                "score_awarded": 1.0,
                "total_possible": 1,
                "percentage": 100.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "SA": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    }
                }
            },
            "Natural Phenomena (Light - Reflection and Refraction)": {
                "score_awarded": 0.0,
                "total_possible": 1,
                "percentage": 0.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "SA": {
                        "score_awarded": 0.0,
                        "total_possible": 1.0,
                        "percentage": 0.0,
                        "question_count": 1
                    }
                }
            },
            "Natural Phenomena - Human Eye and Colourful World": {
                "score_awarded": 1.0,
                "total_possible": 1,
                "percentage": 100.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "SA": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    }
                }
            },
            "The Human Eye and the Colourful World": {
                "score_awarded": 2.0,
                "total_possible": 2,
                "percentage": 100.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "SA": {
                        "score_awarded": 2.0,
                        "total_possible": 2.0,
                        "percentage": 100.0,
                        "question_count": 1
                    }
                }
            },
            "Effects of Current": {
                "score_awarded": 2.5,
                "total_possible": 7,
                "percentage": 35.71,
                "question_count": 5,
                "question_type_breakdown": {
                    "CASE_STUDY": {
                        "score_awarded": 2.5,
                        "total_possible": 5.0,
                        "percentage": 50.0,
                        "question_count": 4
                    },
                    "LA": {
                        "score_awarded": 0.0,
                        "total_possible": 2.0,
                        "percentage": 0.0,
                        "question_count": 1
                    }
                }
            },
            "Electricity": {
                "score_awarded": 0.5,
                "total_possible": 2,
                "percentage": 25.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "CASE_STUDY": {
                        "score_awarded": 0.5,
                        "total_possible": 2.0,
                        "percentage": 25.0,
                        "question_count": 1
                    }
                }
            },
            "Magnetic Effects of Electric Current - Application & Analysis": {
                "score_awarded": 1.0,
                "total_possible": 1,
                "percentage": 100.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "LA": {
                        "score_awarded": 1.0,
                        "total_possible": 1.0,
                        "percentage": 100.0,
                        "question_count": 1
                    }
                }
            },
            "Electricity: Domestic Circuits": {
                "score_awarded": 1.0,
                "total_possible": 2,
                "percentage": 50.0,
                "question_count": 1,
                "question_type_breakdown": {
                    "LA": {
                        "score_awarded": 1.0,
                        "total_possible": 2.0,
                        "percentage": 50.0,
                        "question_count": 1
                    }
                }
            }
        },
        "chapter_mistake_mapping": {
            "Control and Co-ordination": [
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
                },
                {
                    "mistake_type": "skipped",
                    "mistake_description": "The student did not attempt this part of the question.",
                    "lacking_competencies": [
                        "Conceptual understanding of hormonal regulation in animals",
                        "Recall of specific hormones and their functions"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.2542372881355932,
                    "page_number": 2
                }
            ],
            "Control and Coordination": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student demonstrated a conceptual gap regarding the correct direction of electrical impulse transmission in a neuron, as evidenced by the initial incorrect choice ('a') and the lack of a final correct answer. The correct direction is represented by option 'b'.",
                    "lacking_competencies": [
                        "C-3.2: Understanding the mechanism of nerve impulse transmission"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.423728813559322,
                    "page_number": 1
                }
            ],
            "Reproduction": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Incorrectly identified the sequence of organs for sperm transport, confusing Ureter with Urethra.",
                    "lacking_competencies": [
                        "C-3.2 Analyses similarities and differences in the life processes involved in reproduction"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.4745762711864407,
                    "page_number": 1
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Failed to explicitly state the underlying biological principle that vegetative propagation preserves conserved parental characteristics due to genetic identicality, which is the direct reason for maintaining the 'same taste'.",
                    "lacking_competencies": [
                        "Explaining mechanisms of reproduction",
                        "Understanding genetic basis of traits"
                    ],
                    "marks_lost": 0.5,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.288135593220339,
                    "page_number": 6
                }
            ],
            "Life Processes": [
                {
                    "mistake_type": "question_understanding",
                    "mistake_description": "The student failed to correctly identify iron as the element responsible for the red colour of blood, despite the information that haemoglobin is organized around iron being explicitly provided in the question stem.",
                    "lacking_competencies": [
                        "C-3.2 Analyses similarities and differences in the life processes involved in nutrition (photosynthesis in plants; absorption of nutrients in fungi; digestion in animals), transport (transport of water in plants; circulation in animals), exchange of materials (respiration and excretion), and reproduction"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.5254237288135594,
                    "page_number": 1
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student's answer lacked specific details about how Hydrochloric acid functions in digestion, specifically omitting its role in creating an acidic medium and activating pepsin for protein digestion.",
                    "lacking_competencies": [
                        "C-3.2 Analyses similarities and differences in the life processes involved in nutrition (digestion in animals)"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.9322033898305084,
                    "page_number": 1
                },
                {
                    "mistake_type": "skipped",
                    "mistake_description": "The student did not attempt to answer question 10 (b).",
                    "lacking_competencies": [
                        "Demonstrate Knowledge and Understanding"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.0,
                    "y_coordinate": 0.0,
                    "page_number": 3
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Failed to mention the specific function of hydrochloric acid in creating an acidic medium for the activation and optimal functioning of the enzyme pepsin.",
                    "lacking_competencies": [
                        "C-3.2 Analyses similarities and differences in the life processes involved in nutrition (digestion in animals)"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.3559322033898305,
                    "page_number": 2
                },
                {
                    "mistake_type": "skipped",
                    "mistake_description": "The student did not attempt question 13 (c).",
                    "lacking_competencies": [
                        "C-3.2 Analyses similarities and differences in the life processes involved in nutrition (digestion in animals)",
                        "Demonstrate Knowledge and Understanding"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.0,
                    "y_coordinate": 0.0,
                    "page_number": 3
                }
            ],
            "Control and Co-ordination in Plants": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Misconception about the effect of sunlight on auxin distribution in plant shoots. The student incorrectly believes auxins accumulate on the sun-exposed side rather than the shaded side.",
                    "lacking_competencies": [
                        "Understanding the mechanism of plant hormones",
                        "Knowledge of phototropism in plants"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.7627118644067797,
                    "page_number": 1
                }
            ],
            "Control and Co-ordination in Animals and Plants": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Incomplete definition of reflex action, missing crucial aspects like involuntary nature and protective function.",
                    "lacking_competencies": [
                        "C-3.2 Analyses similarities and differences in the life processes involved in nutrition... control and coordination"
                    ],
                    "marks_lost": 0.5,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.33898305084745767,
                    "page_number": 6
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Incorrect and incomplete representation of the reflex arc in the flowchart. Key neural components (sensory neuron, relay neuron, motor neuron) were not identified, and irrelevant/incorrect components like 'Brain gets the urge to' were included.",
                    "lacking_competencies": [
                        "C-3.2 Analyses similarities and differences in the life processes involved in nutrition... control and coordination"
                    ],
                    "marks_lost": 2.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.4406779661016949,
                    "page_number": 6
                }
            ],
            "How do Organisms Reproduce": [
                {
                    "mistake_type": "skipped",
                    "mistake_description": "The student did not attempt to answer question 15 (a).",
                    "lacking_competencies": [
                        "C-3.2 Analyses similarities and differences in the life processes involved in reproduction."
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.45762711864406774,
                    "page_number": 2
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student incorrectly explained the mechanism of single sperm fertilization by stating that 'only one sperm is required' instead of detailing the changes in the egg membrane to prevent polyspermy.",
                    "lacking_competencies": [
                        "C-3.2 Analyses similarities and differences in the life processes involved in reproduction",
                        "C-7.1 States concepts that represent the most current understanding of the matter being studied"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.4915254237288135,
                    "page_number": 2
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Confused 'zygote' (the initial cell formed by fertilisation) with 'embryo' (which develops from the zygote after cell division).",
                    "lacking_competencies": [
                        "C-3.2: Analyses similarities and differences in the life processes involved in reproduction"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.559322033898305,
                    "page_number": 2
                }
            ],
            "How do Organisms Reproduce (The World of the Living)": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student's answer was incomplete, missing the other crucial functions of the placenta such as the exchange of oxygen and waste products, and its role in hormone secretion.",
                    "lacking_competencies": [
                        "C-3.2: Analyses similarities and differences in the life processes involved in reproduction"
                    ],
                    "marks_lost": 0.5,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.5932203389830508,
                    "page_number": 2
                }
            ],
            "Heredity and Evolution": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student did not adequately explain how genetic differences arise among individuals of the same species, failing to mention the role of gene combination during sexual reproduction.",
                    "lacking_competencies": [
                        "C-3.3 Describes mechanisms of heredity (in terms of DNA, genes, chromosomes) and variation (as changes in the sequence of DNA)"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.6949152542372882,
                    "page_number": 2
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Lack of detailed explanation on how variations contribute to the survival of species, missing points about diversity, adaptation to environmental changes, and evolution.",
                    "lacking_competencies": [
                        "C-4.5 Analyses evidences of biological evolution demonstrating the consequences of the process of natural selection"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.8813559322033898,
                    "page_number": 2
                },
                {
                    "mistake_type": "execution_issue",
                    "mistake_description": "Grammatical error and awkward phrasing: 'in off their surroundings' instead of 'in their surroundings' or 'to their surroundings'.",
                    "lacking_competencies": [],
                    "marks_lost": 0.5,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.8983050847457628,
                    "page_number": 2
                }
            ],
            "Chemical Reactions & Equations": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Failed to identify evaporation of water as an endothermic process.",
                    "lacking_competencies": [
                        "Understanding of Endothermic Processes",
                        "Knowledge of Phase Changes"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.2711864406779661,
                    "page_number": 3
                }
            ],
            "Chemical Reactions and Equations": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Incorrectly identified a combustion reaction (burning of methane) as a simple displacement reaction.",
                    "lacking_competencies": [
                        "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.3728813559322034,
                    "page_number": 3
                },
                {
                    "mistake_type": "question_understanding",
                    "mistake_description": "The student misunderstood the question and provided the name of a substance instead of a chemical equation demonstrating a change in colour.",
                    "lacking_competencies": [
                        "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.7627118644067797,
                    "page_number": 3
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Incorrect chemical formula 'Саон' and an incorrect chemical equation. The student failed to provide a valid reaction demonstrating a temperature change.",
                    "lacking_competencies": [
                        "Writing Chemical Equations",
                        "Knowledge of Chemical Formulas",
                        "Identifying Types of Chemical Reactions (Exothermic/Endothermic)"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.7966101694915255,
                    "page_number": 3
                },
                {
                    "mistake_type": "skipped",
                    "mistake_description": "The student did not attempt to answer question 26 A(c), leaving the space blank after writing 'C.'.",
                    "lacking_competencies": [
                        "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.8135593220338982,
                    "page_number": 3
                }
            ],
            "Acids, Bases & Salts": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student incorrectly identified the compound with the maximum number of water molecules of crystallization, indicating a conceptual gap in recalling the chemical composition and properties of common hydrated salts.",
                    "lacking_competencies": [
                        "Demonstrate Knowledge and Understanding",
                        "Recall of Chemical Formulas and Properties of Hydrated Salts"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.423728813559322,
                    "page_number": 3
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student failed to provide specific scientific mechanisms explaining how acidic water makes survival difficult for aquatic animals (e.g., damage to gills/skin, mobilization of toxic metals, disruption of reproduction). The term 'cumagious' is vague and not a precise scientific explanation.",
                    "lacking_competencies": [
                        "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations (acid and base, metal, and non-metal, reversible, and irreversible)"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.3728813559322034,
                    "page_number": 4
                }
            ],
            "Metals and Non-metals": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Incorrectly identified Sulphur as the lustrous non-metal instead of Iodine, demonstrating a lack of knowledge regarding exceptions to the general properties of non-metals.",
                    "lacking_competencies": [
                        "C-1.1 Describes classification of elements in the Periodic Table, and explains how compounds (including carbon compounds) are formed based on atomic structure (Bohr's model) and properties (valency)"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.5254237288135594,
                    "page_number": 3
                },
                {
                    "mistake_type": "question_understanding",
                    "mistake_description": "The student misinterpreted 'chemical properties' and instead listed 'physical properties' for differentiation between metals and non-metals.",
                    "lacking_competencies": [
                        "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations (acid and base, metal, and non-metal, reversible, and irreversible)"
                    ],
                    "marks_lost": 3.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.5084745762711864,
                    "page_number": 4
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Misconception about the fundamental reason for electrical conductivity in metals, confusing the role of free electrons with 'ionic properties'.",
                    "lacking_competencies": [
                        "Understanding properties of metals based on their atomic structure"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.6949152542372882,
                    "page_number": 4
                },
                {
                    "mistake_type": "skipped",
                    "mistake_description": "The student did not attempt this question.",
                    "lacking_competencies": [
                        "C-1.3 Describes and represents chemical interactions and changes",
                        "Application of Knowledge/Concepts"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.0,
                    "y_coordinate": 0.0,
                    "page_number": 6
                }
            ],
            "Carbon and its Compounds": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student has a fundamental misunderstanding of the ketone functional group and its representation in structural isomers. The drawn structure is not a ketone and does not correspond to the molecular formula C5H10O, indicating incorrect valency understanding.",
                    "lacking_competencies": [
                        "C-1.1: Describes how compounds (including carbon compounds) are formed based on atomic structure (Bohr's model) and properties (valency)",
                        "C-8.1: Develops accurate and appropriate models (including geometric, mathematical, graphical) to represent real-life events and phenomena using scientific principles and use these models to manipulate variables and predict results"
                    ],
                    "marks_lost": 2.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.6779661016949153,
                    "page_number": 3
                },
                {
                    "mistake_type": "skipped",
                    "mistake_description": "The student did not attempt question 28 (a).",
                    "lacking_competencies": [
                        "C-1.1 Describes classification of elements in the Periodic Table, and explains how compounds (including carbon compounds) are formed based on atomic structure (Bohr's model) and properties (valency)"
                    ],
                    "marks_lost": 2.0,
                    "x_coordinate": 0.0,
                    "y_coordinate": 0.0,
                    "page_number": 6
                },
                {
                    "mistake_type": "skipped",
                    "mistake_description": "The student did not attempt question 28 (b).",
                    "lacking_competencies": [
                        "C-1.1 Describes classification of elements in the Periodic Table, and explains how compounds (including carbon compounds) are formed based on atomic structure (Bohr's model) and properties (valency)",
                        "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations (acid and base, metal, and non-metal, reversible, and irreversible)"
                    ],
                    "marks_lost": 2.0,
                    "x_coordinate": 0.0,
                    "y_coordinate": 0.0,
                    "page_number": 6
                }
            ],
            "Acids, Bases and Salts": [
                {
                    "mistake_type": "question_understanding",
                    "mistake_description": "The student failed to differentiate between a strong acid and a weak base in terms of 'ion-formation in aqueous solutions' as explicitly requested by the question, instead focusing on pH values.",
                    "lacking_competencies": [
                        "C-1.3 Describes and represents chemical interactions and changes using symbols and chemical equations (acid and base, metal, and non-metal, reversible, and irreversible)"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.20338983050847456,
                    "page_number": 4
                }
            ],
            "Natural Phenomena": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Incorrect understanding of image formation by a convex lens, specifically the object position required to obtain an image of the same size.",
                    "lacking_competencies": [
                        "C-2.3 Manipulates the position of object and properties of lenses (focus, centre of curvature) to observe image characteristics and correspondence with a ray diagram"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.847457627118644,
                    "page_number": 4
                },
                {
                    "mistake_type": "question_understanding",
                    "mistake_description": "Failed to explicitly compare the speed of light in the three blocks, which was the main part of the question. The student only mentioned 'In terms of speed.' without providing the actual comparison. Additionally, confusing labels (L1, L2, L3, L4) were used instead of X, Y, Z, indicating an issue with interpreting diagram labels.",
                    "lacking_competencies": [
                        "Application of Knowledge/Concepts"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.33898305084745767,
                    "page_number": 7
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Failed to mention 'absorption' as a possible phenomenon when light falls on a surface.",
                    "lacking_competencies": [
                        "C-7.1 States concepts that represent the most current understanding of the matter being studied"
                    ],
                    "marks_lost": 0.5,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.8983050847457626,
                    "page_number": 7
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student incorrectly explained the reason for the refractive index being greater than 1 by stating 'speed of air compared to the speed of light is less'. This shows a conceptual misunderstanding of the definition of refractive index, which involves the speed of *light* in different media, not the speed of air itself.",
                    "lacking_competencies": [
                        "C-7.1 States concepts that represent the most current understanding of the matter being studied, ranging from mere familiarity to conceptual understanding of the matter as appropriate to the developmental stage of the students"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.22033898305084745,
                    "page_number": 8
                }
            ],
            "Natural Phenomena (Light - Reflection and Refraction)": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Misinterpretation of the sign of magnification. A negative magnification value indicates a real and inverted image, not virtual and erect.",
                    "lacking_competencies": [
                        "C-2.3 Manipulates the position of object and properties of lenses (focus, centre of curvature) to observe image characteristics and correspondence with a ray diagram, and extends this understanding to a combination of lenses (telescope, microscope)"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.8135593220338982,
                    "page_number": 7
                }
            ],
            "Effects of Current": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student did not provide the reason for their choice, indicating a lack of understanding or inability to articulate why graph C (with the steepest slope) represents the series combination (highest resistance).",
                    "lacking_competencies": [
                        "C-2.4: Manipulates and analyses different characteristics of the circuit (current, voltage, resistance) and mathematises their relationship (Ohm's law)."
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.23728813559322035,
                    "page_number": 5
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Failed to understand that the total current in a parallel circuit decreases when a branch is removed, even if other branches continue to operate.",
                    "lacking_competencies": [
                        "C-2.4 Manipulates and analyses different characteristics of the circuit (current, voltage, resistance) and mathematises their relationship (Ohm's law), and applies it to everyday usage (electricity bill, short circuit, safety measures)"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.4406779661016949,
                    "page_number": 5
                },
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "Did not mention that appliances in a series circuit would not get the proper operating voltage, which is essential for their individual optimal functioning.",
                    "lacking_competencies": [
                        "C-2.4"
                    ],
                    "marks_lost": 0.5,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.5423728813559322,
                    "page_number": 5
                },
                {
                    "mistake_type": "skipped",
                    "mistake_description": "The student did not attempt question 39 A(c).",
                    "lacking_competencies": [
                        "C-2.4 Manipulates and analyses different characteristics of the circuit (current, voltage, resistance) and mathematises their relationship (Ohm's law), and applies it to everyday usage (electricity bill, short circuit, safety measures)"
                    ],
                    "marks_lost": 2.0,
                    "x_coordinate": 0.0,
                    "y_coordinate": 0.0,
                    "page_number": 9
                }
            ],
            "Electricity": [
                {
                    "mistake_type": "conceptual_gap",
                    "mistake_description": "The student incorrectly concluded that the glow of the other bulbs would increase due to more current, indicating a misunderstanding of how current and brightness are affected in independent parallel branches when one branch fails.",
                    "lacking_competencies": [
                        "Application of Knowledge/Concepts (C-2.4: Manipulates and analyses different characteristics of the circuit)"
                    ],
                    "marks_lost": 1.5,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.3559322033898305,
                    "page_number": 5
                }
            ],
            "Electricity: Domestic Circuits": [
                {
                    "mistake_type": "question_understanding",
                    "mistake_description": "Failed to address the safety aspect for Rahul's circuit and the corresponding explanation, which was a required part of the question.",
                    "lacking_competencies": [
                        "C-2.4 Manipulates and analyses different characteristics of the circuit",
                        "C-2.4 Applies to everyday usage (safety measures)"
                    ],
                    "marks_lost": 1.0,
                    "x_coordinate": 0.95,
                    "y_coordinate": 0.8135593220338982,
                    "page_number": 5
                }
            ]
        },
        "question_summaries": [
            {
                "question_id": 1,
                "score_awarded": 0.0,
                "total_possible": 1,
                "page_number": 1,
                "x_coordinate": 0.05,
                "y_coordinate": 0.3359322033898305
            },
            {
                "question_id": 2,
                "score_awarded": 0.0,
                "total_possible": 1,
                "page_number": 1,
                "x_coordinate": 0.05,
                "y_coordinate": 0.403728813559322
            },
            {
                "question_id": 3,
                "score_awarded": 0.0,
                "total_possible": 1,
                "page_number": 1,
                "x_coordinate": 0.05,
                "y_coordinate": 0.4545762711864407
            },
            {
                "question_id": 4,
                "score_awarded": 0.0,
                "total_possible": 1,
                "page_number": 1,
                "x_coordinate": 0.05,
                "y_coordinate": 0.5054237288135593
            },
            {
                "question_id": 5,
                "score_awarded": 1.0,
                "total_possible": 1,
                "page_number": 1,
                "x_coordinate": 0.05,
                "y_coordinate": 0.5562711864406779
            },
            {
                "question_id": 6,
                "score_awarded": 1.0,
                "total_possible": 1,
                "page_number": 1,
                "x_coordinate": 0.05,
                "y_coordinate": 0.6071186440677966
            },
            {
                "question_id": 7,
                "score_awarded": 1.0,
                "total_possible": 1,
                "page_number": 1,
                "x_coordinate": 0.05,
                "y_coordinate": 0.6749152542372882
            },
            {
                "question_id": 8,
                "score_awarded": 0.0,
                "total_possible": 1,
                "page_number": 1,
                "x_coordinate": 0.05,
                "y_coordinate": 0.7427118644067797
            },
            {
                "question_id": 9,
                "score_awarded": 1.0,
                "total_possible": 1,
                "page_number": 1,
                "x_coordinate": 0.05,
                "y_coordinate": 0.827457627118644
            },
            {
                "question_id": 10,
                "score_awarded": 0.0,
                "total_possible": 2,
                "page_number": 1,
                "x_coordinate": 0.05,
                "y_coordinate": 0.8952542372881355
            },
            {
                "question_id": 11,
                "score_awarded": 1.0,
                "total_possible": 2,
                "page_number": 2,
                "x_coordinate": 0.05,
                "y_coordinate": 0.21728813559322036
            },
            {
                "question_id": 12,
                "score_awarded": 1.5,
                "total_possible": 2,
                "page_number": 6,
                "x_coordinate": 0.05,
                "y_coordinate": 0.21728813559322036
            },
            {
                "question_id": 13,
                "score_awarded": 1.0,
                "total_possible": 3,
                "page_number": 2,
                "x_coordinate": 0.05,
                "y_coordinate": 0.3020338983050847
            },
            {
                "question_id": 14,
                "score_awarded": 0.5,
                "total_possible": 3,
                "page_number": 6,
                "x_coordinate": 0.05,
                "y_coordinate": 0.31898305084745765
            },
            {
                "question_id": 15,
                "score_awarded": 0.5,
                "total_possible": 4,
                "page_number": 2,
                "x_coordinate": 0.05,
                "y_coordinate": 0.4376271186440677
            },
            {
                "question_id": 16,
                "score_awarded": 2.5,
                "total_possible": 5,
                "page_number": 2,
                "x_coordinate": 0.05,
                "y_coordinate": 0.6579661016949152
            },
            {
                "question_id": 17,
                "score_awarded": 0.0,
                "total_possible": 1,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.2511864406779661
            },
            {
                "question_id": 18,
                "score_awarded": 1.0,
                "total_possible": 1,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.30203389830508476
            },
            {
                "question_id": 19,
                "score_awarded": 0.0,
                "total_possible": 1,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.3528813559322034
            },
            {
                "question_id": 20,
                "score_awarded": 0.0,
                "total_possible": 1,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.403728813559322
            },
            {
                "question_id": 21,
                "score_awarded": 1.0,
                "total_possible": 1,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.4545762711864407
            },
            {
                "question_id": 22,
                "score_awarded": 0.0,
                "total_possible": 1,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.5054237288135593
            },
            {
                "question_id": 23,
                "score_awarded": 1.0,
                "total_possible": 1,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.556271186440678
            },
            {
                "question_id": 24,
                "score_awarded": 1.0,
                "total_possible": 1,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.5901694915254238
            },
            {
                "question_id": 25,
                "score_awarded": 0.0,
                "total_possible": 2,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.6410169491525424
            },
            {
                "question_id": 26,
                "score_awarded": 0.0,
                "total_possible": 3,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.7427118644067797
            },
            {
                "question_id": 27,
                "score_awarded": 1.0,
                "total_possible": 3,
                "page_number": 3,
                "x_coordinate": 0.05,
                "y_coordinate": 0.8952542372881356
            },
            {
                "question_id": 28,
                "score_awarded": 0.0,
                "total_possible": 4,
                "page_number": 6,
                "x_coordinate": 0.0,
                "y_coordinate": 0.0
            },
            {
                "question_id": 29,
                "score_awarded": 0.0,
                "total_possible": 5,
                "page_number": 4,
                "x_coordinate": 0.05,
                "y_coordinate": 0.47152542372881356
            },
            {
                "question_id": 30,
                "score_awarded": 0.0,
                "total_possible": 1,
                "page_number": 4,
                "x_coordinate": 0.05,
                "y_coordinate": 0.8105084745762712
            },
            {
                "question_id": 31,
                "score_awarded": 1.0,
                "total_possible": 1,
                "page_number": 4,
                "x_coordinate": 0.05,
                "y_coordinate": 0.8783050847457626
            },
            {
                "question_id": 32,
                "score_awarded": 1.0,
                "total_possible": 1,
                "page_number": 7,
                "x_coordinate": 0.05,
                "y_coordinate": 0.18338983050847457
            },
            {
                "question_id": 33,
                "score_awarded": 1.0,
                "total_possible": 2,
                "page_number": 7,
                "x_coordinate": 0.05,
                "y_coordinate": 0.23423728813559322
            },
            {
                "question_id": 34,
                "score_awarded": 1.0,
                "total_possible": 2,
                "page_number": 7,
                "x_coordinate": 0.05,
                "y_coordinate": 0.6240677966101695
            },
            {
                "question_id": 35,
                "score_awarded": 1.5,
                "total_possible": 3,
                "page_number": 7,
                "x_coordinate": 0.05,
                "y_coordinate": 0.8613559322033898
            },
            {
                "question_id": 36,
                "score_awarded": 3.0,
                "total_possible": 3,
                "page_number": 8,
                "x_coordinate": 0.05,
                "y_coordinate": 0.3698305084745762
            },
            {
                "question_id": 37,
                "score_awarded": 2.0,
                "total_possible": 3,
                "page_number": 5,
                "x_coordinate": 0.05,
                "y_coordinate": 0.20033898305084746
            },
            {
                "question_id": 38,
                "score_awarded": 1.0,
                "total_possible": 4,
                "page_number": 5,
                "x_coordinate": 0.05,
                "y_coordinate": 0.31898305084745765
            },
            {
                "question_id": 39,
                "score_awarded": 2.0,
                "total_possible": 5,
                "page_number": 5,
                "x_coordinate": 0.05,
                "y_coordinate": 0.6410169491525424
            }
        ],
        "manual_annotations": []
    },
    "processing_status": "completed",
    "created_at": "2025-11-09T12:09:50.865813Z",
    "original_filename": "Science Set 1 QP.pdf + Anan Science 10A Set 1.pdf",
    "download_url": "./src/assets/science-exam-paper.pdf",
    "metadata": {
        "class_level": "9",
        "subject": "Science",
        "year": "2025"
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
    x_coordinate: apiQuestion.x_coordinate,
    y_coordinate: apiQuestion.y_coordinate,
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