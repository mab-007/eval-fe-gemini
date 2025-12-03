import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, X, Pencil, Check, CheckCircle } from '../icons';
import { apiService } from '../../services/api.service';

interface PartBreakdown {
  part: string; // e.g., "a", "b", "c"
  marks: number;
}

interface QuestionSummary {
  question_number: number;
  score_awarded: number;
  marks_available: number;
  y_coordinate: number; // 0 to 1, mapped to 800px height
  question_summary?: string;
  feedback?: string;
  student_answer?: string;
  question_text?: string;
  mistakes_made?: Array<{
    mistake_type: string;
    mistake_description: string;
    lacking_competencies: string[];
    marks_lost: number;
    page_number?: number;
  }>;
  scoring_breakdown?: Array<{
    reasoning: string;
    mark_awarded: boolean;
    partial_mark_awarded: boolean;
    page_number?: number;
  }>;
  student_approach?: string;
  is_optional?: boolean;
  sub_part?: string;
  parts_breakdown?: PartBreakdown[]; // Breakdown by parts (a, b, c, etc.)
  is_verified?: boolean; // Track if the question has been verified by teacher
}

interface EvaluationReport {
  questions: QuestionSummary[];
}

interface AnswerSheetViewProps {
  evaluationReport: EvaluationReport;
  pdfUrl: string;
  studentName: string;
  studentRoll?: string;
  subject?: string;
  description?: string;
  submissionId?: number;
  status?: string;
  totalMarksAvailable?: number;
  onBack: () => void;
  onNavigateToPrevious?: () => void;
  onNavigateToNext?: () => void;
}

const AnswerSheetView: React.FC<AnswerSheetViewProps> = ({
  evaluationReport,
  pdfUrl,
  studentName,
  studentRoll,
  subject,
  description,
  submissionId,
  status,
  totalMarksAvailable: totalMarksFromBackend,
  onBack,
  onNavigateToPrevious,
  onNavigateToNext
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionSummary | null>(null);
  const [isEditingScore, setIsEditingScore] = useState(false);
  const [editedScoreAwarded, setEditedScoreAwarded] = useState<number>(0);
  const [editedMarksAvailable, setEditedMarksAvailable] = useState<number>(0);
  const [editedPartsBreakdown, setEditedPartsBreakdown] = useState<PartBreakdown[]>([]);

  // Maintain a local state of questions that can be updated
  const [questions, setQuestions] = useState<QuestionSummary[]>(evaluationReport.questions || []);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);

  // Determine if this is a graded submission
  const isGraded = status === 'Graded';

  // Calculate verified questions count and total marks
  const verifiedQuestions = questions.filter(q => q.is_verified);
  const verifiedQuestionsCount = verifiedQuestions.length;
  const totalScore = verifiedQuestions.reduce((sum, q) => sum + q.score_awarded, 0);
  // Use total marks from backend if available, otherwise calculate from questions
  const totalMarksAvailable = totalMarksFromBackend ?? questions.reduce((sum, q) => sum + q.marks_available, 0);

  // Track if score was edited but partial marks weren't updated
  const [scoreEdited, setScoreEdited] = useState(false);
  const [showPartialMarksWarning, setShowPartialMarksWarning] = useState(false);
  const [dontUpdatePartialMarks, setDontUpdatePartialMarks] = useState(false);
  // Session-level flag to suppress partial marks warning for entire session
  const [suppressPartialMarksWarning, setSuppressPartialMarksWarning] = useState(false);

  // Track which question badge is active (based on cursor proximity)
  const [activeQuestionNumber, setActiveQuestionNumber] = useState<number | null>(null);

  // Track which badge is being edited inline
  const [editingBadgeNumber, setEditingBadgeNumber] = useState<number | null>(null);
  const [tempScoreAwarded, setTempScoreAwarded] = useState<number>(0);

  // Welcome modal for non-evaluated papers
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);

  // User preferences for panel expansion (global defaults)
  const [keepQuestionOpen, setKeepQuestionOpen] = useState(false);
  const [keepAIReasoningOpen, setKeepAIReasoningOpen] = useState(false);
  const [keepScoringOpen, setKeepScoringOpen] = useState(false);

  // Local state for capsule expansion (per question instance)
  const [localQuestionOpen, setLocalQuestionOpen] = useState(false);
  const [localAIReasoningOpen, setLocalAIReasoningOpen] = useState(false);
  const [localScoringOpen, setLocalScoringOpen] = useState(false);

  // Sync local state with global preferences when question changes or preferences change
  useEffect(() => {
    setLocalQuestionOpen(keepQuestionOpen);
    setLocalAIReasoningOpen(keepAIReasoningOpen);
    setLocalScoringOpen(keepScoringOpen);
  }, [activeQuestionNumber, keepQuestionOpen, keepAIReasoningOpen, keepScoringOpen]);

  // Track reasoning editing state
  const [isEditingReasoning, setIsEditingReasoning] = useState(false);

  // FAQ modal state
  const [showFAQ, setShowFAQ] = useState(false);
  const [isFAQClosing, setIsFAQClosing] = useState(false);
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);

  // Track animation state for capsules
  const [showCapsulesAnimation, setShowCapsulesAnimation] = useState(false);

  // Teacher remarks for student
  const [teacherRemarks, setTeacherRemarks] = useState('');

  // Ref for marks_available input to focus when updating partial marks
  const marksAvailableInputRef = useRef<HTMLInputElement>(null);

  // PDF dimensions: Responsive based on viewport
  const getPDFDimensions = () => {
    if (typeof window === 'undefined') return { width: 950, height: 1481 };
    const vw = window.innerWidth;

    // Scale based on viewport, with constraints
    const baseWidth = Math.min(Math.max(vw * 0.45, 600), 1000);
    const aspectRatio = 1481 / 950; // Original aspect ratio
    const baseHeight = baseWidth * aspectRatio;

    return { width: baseWidth, height: baseHeight };
  };

  const [pdfDimensions, setPdfDimensions] = React.useState(getPDFDimensions());
  const PDF_WIDTH = pdfDimensions.width;
  const PDF_HEIGHT = pdfDimensions.height;

  // Update dimensions on resize
  React.useEffect(() => {
    const handleResize = () => {
      setPdfDimensions(getPDFDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get the page number for a question (from scoring_breakdown or mistakes_made)
  const getPageNumber = (question: QuestionSummary): number => {
    // Try to get page number from scoring_breakdown
    if (question.scoring_breakdown && question.scoring_breakdown.length > 0) {
      const pageNum = question.scoring_breakdown[0].page_number;
      if (pageNum) return pageNum;
    }
    // Try to get page number from mistakes_made
    if (question.mistakes_made && question.mistakes_made.length > 0) {
      const pageNum = question.mistakes_made[0].page_number;
      if (pageNum) return pageNum;
    }
    // Default to page 1 if not found
    return 1;
  };

  // Calculate total number of pages needed
  const totalPages = Math.max(
    ...questions.map(q => getPageNumber(q)),
    1 // At least 1 page
  );

  // Helper function to get badge style with verification colors
  const getBadgeStyle = (scoreAwarded: number, marksAvailable: number, isVerified: boolean) => {
    let color = 'bg-gray-400/90';
    let fillColor = '#9ca3af'; // gray-400

    // If verified, color based on marks awarded
    if (isVerified) {
      if (scoreAwarded === marksAvailable) {
        // Full marks - green
        color = 'bg-green-500/90';
        fillColor = '#22c55e'; // green-500
      } else if (scoreAwarded === 0) {
        // Zero marks - red
        color = 'bg-red-500/90';
        fillColor = '#ef4444'; // red-500
      } else {
        // Partial marks - yellow
        color = 'bg-yellow-500/90';
        fillColor = '#eab308'; // yellow-500
      }
    }

    return {
      color,
      fillColor,
      shape: scoreAwarded === 0 ? 'triangle' : scoreAwarded === marksAvailable ? 'star' : 'circle'
    };
  };

  // Find the first unverified question
  const findFirstUnverifiedQuestion = (): number | null => {
    if (questions.length === 0) return null;

    const unverified = questions.find(q => !q.is_verified);
    return unverified ? unverified.question_number : null;
  };

  const handleBadgeClick = (question: QuestionSummary) => {
    // Single click shows capsules on the right
    setActiveQuestionNumber(question.question_number);
  };

  const handleBadgeDoubleClick = (e: React.MouseEvent, question: QuestionSummary) => {
    e.stopPropagation();
    e.preventDefault();
    // Double click makes only the numerator editable
    setEditingBadgeNumber(question.question_number);
    setTempScoreAwarded(question.score_awarded);
  };

  const handleBadgeEditKeyDown = (e: React.KeyboardEvent, questionNumber: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveBadgeEdit(questionNumber);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setEditingBadgeNumber(null);
    }
  };

  const saveBadgeEdit = (questionNumber: number) => {
    const updatedQuestions = questions.map(q =>
      q.question_number === questionNumber
        ? { ...q, score_awarded: tempScoreAwarded }
        : q
    );
    setQuestions(updatedQuestions);
    setEditingBadgeNumber(null);

    // Mark as having unsaved changes if in review mode
    if (isReviewMode) {
      setHasUnsavedChanges(true);
    }
  };

  const closeModal = () => {
    // Check if score was edited but partial marks weren't updated
    // Only show warning if:
    // 1. Score was edited
    // 2. Marks available weren't changed
    // 3. Question has parts_breakdown
    // 4. User hasn't opted out for this question or session
    const hasPartsBreakdown = selectedQuestion?.parts_breakdown && selectedQuestion.parts_breakdown.length > 0;

    if (
      scoreEdited &&
      selectedQuestion &&
      editedMarksAvailable === selectedQuestion.marks_available &&
      hasPartsBreakdown &&
      !dontUpdatePartialMarks &&
      !suppressPartialMarksWarning
    ) {
      setShowPartialMarksWarning(true);
      return;
    }
    // Normal close - reset all states
    setSelectedQuestion(null);
    setIsEditingScore(false);
    setScoreEdited(false);
    setShowPartialMarksWarning(false);
    setDontUpdatePartialMarks(false);
  };

  const handleEditScore = () => {
    setIsEditingScore(true);
  };

  const handleSaveScore = () => {
    if (selectedQuestion) {
      // Mark that score was edited
      setScoreEdited(true);

      // Update the questions array with the new scores
      const updatedQuestions = questions.map(q =>
        q.question_number === selectedQuestion.question_number
          ? { ...q, score_awarded: editedScoreAwarded, marks_available: editedMarksAvailable, parts_breakdown: editedPartsBreakdown }
          : q
      );

      // Update the selected question with new scores
      const updatedQuestion = {
        ...selectedQuestion,
        score_awarded: editedScoreAwarded,
        marks_available: editedMarksAvailable,
        parts_breakdown: editedPartsBreakdown,
      };

      setQuestions(updatedQuestions);
      setSelectedQuestion(updatedQuestion);
      setIsEditingScore(false);

      // Mark as having unsaved changes if in review mode
      if (isReviewMode) {
        setHasUnsavedChanges(true);
      }
    }
  };

  const handleCancelEdit = () => {
    if (selectedQuestion) {
      setEditedScoreAwarded(selectedQuestion.score_awarded);
      setEditedMarksAvailable(selectedQuestion.marks_available);
      setEditedPartsBreakdown(selectedQuestion.parts_breakdown || []);
    }
    setIsEditingScore(false);
    // Reset score edited flag since changes were cancelled
    setScoreEdited(false);
  };

  // Helper function to generate mark suggestions
  const generateMarkSuggestions = (marksAvailable: number, currentScore: number): number[] => {
    const suggestions: number[] = [];

    // Add whole numbers from 0 to marks_available
    for (let i = 0; i <= marksAvailable; i++) {
      if (i !== currentScore) {
        suggestions.push(i);
      }
    }

    // Add half marks if marks_available is greater than 1
    if (marksAvailable > 1) {
      for (let i = 0; i < marksAvailable; i++) {
        const halfMark = i + 0.5;
        if (halfMark !== currentScore) {
          suggestions.push(halfMark);
        }
      }
    }

    // Sort suggestions
    return suggestions.sort((a, b) => a - b);
  };
  const handleVerifyQuestion = (e: React.MouseEvent, questionNumber: number) => {
    e.stopPropagation();

    // Get current verification status
    const currentQuestion = questions.find(q => q.question_number === questionNumber);
    const wasVerified = currentQuestion?.is_verified || false;

    // Toggle the question's is_verified status
    const updatedQuestions = questions.map(q =>
      q.question_number === questionNumber
        ? { ...q, is_verified: !q.is_verified }
        : q
    );
    setQuestions(updatedQuestions);

    // Mark as having unsaved changes if in review mode
    if (isReviewMode) {
      setHasUnsavedChanges(true);
    }

    // If question was just verified (not unverified), navigate to next unverified question
    if (!wasVerified) {
      const unverifiedQuestions = updatedQuestions.filter(q => !q.is_verified);

      if (unverifiedQuestions.length > 0) {
        let nextQuestionNumber = null;

        // Priority 1: Find next unverified question AFTER current one
        const nextQuestions = unverifiedQuestions.filter(q => q.question_number > questionNumber);
        if (nextQuestions.length > 0) {
          nextQuestionNumber = nextQuestions[0].question_number;
        } else {
          // Priority 2: All questions after current are verified, go back to skipped ones
          const skippedQuestions = unverifiedQuestions.filter(q => q.question_number < questionNumber);
          if (skippedQuestions.length > 0) {
            nextQuestionNumber = skippedQuestions[0].question_number;
          } else {
            // Fallback: Loop to first unverified
            nextQuestionNumber = unverifiedQuestions[0].question_number;
          }
        }

        // Navigate to the next unverified question
        if (nextQuestionNumber) {
          setActiveQuestionNumber(nextQuestionNumber);
          setTimeout(() => {
            const badgeElement = document.getElementById(`badge-q${nextQuestionNumber}`);
            if (badgeElement) {
              badgeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
              });
            }
          }, 300);
        }
      }
    }
  };

  const handleMilestoneClick = (question: QuestionSummary) => {
    // Set active question (same as badge click)
    setActiveQuestionNumber(question.question_number);

    // Find the badge element and scroll to it
    const badgeElement = document.getElementById(`badge-q${question.question_number}`);
    if (badgeElement) {
      badgeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });

      // Add a pulse animation to highlight the badge
      badgeElement.classList.add('animate-pulse');
      setTimeout(() => {
        badgeElement.classList.remove('animate-pulse');
      }, 2000);
    }
  };

  const handleWarningDone = () => {
    // User acknowledges the warning and wants to close
    // If they checked "don't want to update", suppress warnings for entire session
    if (dontUpdatePartialMarks) {
      setSuppressPartialMarksWarning(true);
    }

    setSelectedQuestion(null);
    setIsEditingScore(false);
    setScoreEdited(false);
    setShowPartialMarksWarning(false);
    setDontUpdatePartialMarks(false);
  };

  const handleUpdatePartialMarks = () => {
    // Close warning modal and allow user to update partial marks
    setShowPartialMarksWarning(false);
    setIsEditingScore(true);
    // Focus on the marks_available input after a short delay to ensure it's rendered
    setTimeout(() => {
      marksAvailableInputRef.current?.focus();
    }, 100);
  };

  const handleAddPart = () => {
    const nextPartLetter = String.fromCharCode(97 + editedPartsBreakdown.length); // a, b, c, etc.
    setEditedPartsBreakdown([...editedPartsBreakdown, { part: nextPartLetter, marks: 0 }]);
  };

  const handleRemovePart = (index: number) => {
    setEditedPartsBreakdown(editedPartsBreakdown.filter((_, i) => i !== index));
  };

  const handleUpdatePartMarks = (index: number, marks: number) => {
    const updated = [...editedPartsBreakdown];
    updated[index] = { ...updated[index], marks };
    setEditedPartsBreakdown(updated);
  };

  // Validate and handle score awarded changes
  const handleScoreAwardedChange = (value: string) => {
    const numValue = Number(value);

    // Allow empty string for editing
    if (value === '') {
      setEditedScoreAwarded(0);
      return;
    }

    // Validate: score must be between 0 and marks available
    if (!isNaN(numValue) && numValue >= 0 && numValue <= editedMarksAvailable) {
      setEditedScoreAwarded(numValue);
    }
    // If invalid, don't update (keeps previous valid value)
  };

  // Validate and handle marks available changes
  const handleMarksAvailableChange = (value: string) => {
    const numValue = Number(value);

    // Allow empty string for editing
    if (value === '') {
      setEditedMarksAvailable(0);
      return;
    }

    // Validate: marks must be positive
    if (!isNaN(numValue) && numValue >= 0) {
      setEditedMarksAvailable(numValue);

      // Auto-adjust score awarded if it exceeds new max
      if (editedScoreAwarded > numValue) {
        setEditedScoreAwarded(numValue);
      }
    }
    // If invalid, don't update (keeps previous valid value)
  };

  // Submit verification to backend API
  const submitVerification = async () => {
    if (!submissionId) {
      console.error('No submission ID provided');
      setVerificationError('Cannot verify: No submission ID');
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);

    try {
      // Prepare verification data
      const verificationData = {
        questions: questions.map(q => ({
          question_number: q.question_number,
          score_awarded: q.score_awarded,
          marks_available: q.marks_available,
          y_coordinate: q.y_coordinate,
          question_text: q.question_text,
          student_answer: q.student_answer,
          feedback: q.feedback,
          mistakes_made: q.mistakes_made,
          scoring_breakdown: q.scoring_breakdown,
          student_approach: q.student_approach,
          question_summary: q.question_summary,
          is_optional: q.is_optional,
          sub_part: q.sub_part,
          parts_breakdown: q.parts_breakdown,
          is_verified: q.is_verified || false
        })),
        status: 'Graded',
        score_awarded: totalScore,
        total_marks: totalMarksAvailable,
        description: description || `Evaluation completed for ${studentName}`,
        teacher_remarks: teacherRemarks.trim() || null
      };

      // Call API to verify submission
      const result = await apiService.verifySubmission(submissionId, verificationData);

      console.log('Verification successful:', result);

      // Show success for a moment before potentially navigating away
      setTimeout(() => {
        setIsVerifying(false);
        setHasUnsavedChanges(false);
      }, 1000);
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationError(error instanceof Error ? error.message : 'Failed to verify submission');
      setIsVerifying(false);
    }
  };

  // Handle exit review mode - save changes to backend
  const handleExitReviewMode = async () => {
    if (hasUnsavedChanges) {
      await submitVerification();
    }
    setIsReviewMode(false);
  };

  // Handle back button - check for unsaved changes
  const handleBack = () => {
    if (isReviewMode && hasUnsavedChanges) {
      setShowUnsavedChangesModal(true);
    } else {
      onBack();
    }
  };

  // Discard changes and go back
  const handleDiscardChanges = () => {
    setShowUnsavedChangesModal(false);
    setHasUnsavedChanges(false);
    setIsReviewMode(false);
    onBack();
  };

  // Save changes before going back
  const handleSaveAndBack = async () => {
    setShowUnsavedChangesModal(false);
    await submitVerification();
    setTimeout(() => {
      setIsReviewMode(false);
      onBack();
    }, 1500);
  };

  // Update questions when evaluationReport changes (when navigating between submissions)
  useEffect(() => {
    const newQuestions = evaluationReport.questions || [];
    setQuestions(newQuestions);

    // Show welcome modal for non-evaluated papers
    if (!isGraded) {
      setShowWelcomeModal(true);
    }

    // Reset all modal states when switching submissions
    setSelectedQuestion(null);
    setIsEditingScore(false);
    setShowCelebration(false);
    setIsVerifying(false);
    setVerificationError(null);
    setIsReviewMode(false);
    setHasUnsavedChanges(false);
    setShowUnsavedChangesModal(false);
    setScoreEdited(false);
    setShowPartialMarksWarning(false);
    setDontUpdatePartialMarks(false);
  }, [evaluationReport, isGraded]);

  // Reset expanded section when active question changes and trigger animation
  useEffect(() => {
    // Trigger exit animation
    setShowCapsulesAnimation(false);
    // Small delay then trigger entrance animation
    const timer = setTimeout(() => {
      setShowCapsulesAnimation(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeQuestionNumber]);

  // Set active question to first unverified question only on initial load or if current question doesn't exist
  useEffect(() => {
    // Only auto-set if there's no active question or if the active question no longer exists
    const currentQuestionExists = questions.some(q => q.question_number === activeQuestionNumber);

    if (!activeQuestionNumber || !currentQuestionExists) {
      const firstUnverified = findFirstUnverifiedQuestion();
      setActiveQuestionNumber(firstUnverified);
    }
  }, [questions]);

  // Reset capsules animation when active question changes
  useEffect(() => {
    setShowCapsulesAnimation(false);
    const timer = setTimeout(() => {
      setShowCapsulesAnimation(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeQuestionNumber]);

  // Check if all questions are verified and show celebration (only for non-Graded submissions)
  useEffect(() => {
    if (verifiedQuestionsCount === questions.length && questions.length > 0 && !showCelebration && !isGraded) {
      // Delay to allow the progress bar animation to complete
      setTimeout(() => {
        setShowCelebration(true);
        // Submit verification to backend when all questions are verified
        submitVerification();
      }, 800);
    }
  }, [verifiedQuestionsCount, questions.length, showCelebration, isGraded]);

  // Keyboard navigation for switching between submissions
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't navigate if user is typing in an input field or modal is open
      if (
        selectedQuestion ||
        showCelebration ||
        showUnsavedChangesModal ||
        showPartialMarksWarning ||
        showWelcomeModal ||
        showPreferencesModal ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.key === 'ArrowLeft' && onNavigateToPrevious) {
        event.preventDefault();
        onNavigateToPrevious();
      } else if (event.key === 'ArrowRight' && onNavigateToNext) {
        event.preventDefault();
        onNavigateToNext();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        // Navigate to previous question
        const currentIndex = questions.findIndex(q => q.question_number === activeQuestionNumber);
        if (currentIndex > 0) {
          const prevQuestion = questions[currentIndex - 1];
          setActiveQuestionNumber(prevQuestion.question_number);
          // Scroll to badge
          const badgeElement = document.getElementById(`badge-q${prevQuestion.question_number}`);
          if (badgeElement) {
            badgeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        // Navigate to next question
        const currentIndex = questions.findIndex(q => q.question_number === activeQuestionNumber);
        if (currentIndex < questions.length - 1) {
          const nextQuestion = questions[currentIndex + 1];
          setActiveQuestionNumber(nextQuestion.question_number);
          // Scroll to badge
          const badgeElement = document.getElementById(`badge-q${nextQuestion.question_number}`);
          if (badgeElement) {
            badgeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } else if (event.key === 'Enter') {
        event.preventDefault();
        // Mark question as verified and navigate to next unverified
        if (!activeQuestionNumber) return;

        const currentQuestion = questions.find(q => q.question_number === activeQuestionNumber);

        // Only verify if not already verified
        if (currentQuestion && !currentQuestion.is_verified) {
          const updatedQuestions = questions.map(q =>
            q.question_number === activeQuestionNumber
              ? { ...q, is_verified: true }
              : q
          );
          setQuestions(updatedQuestions);

          // Mark as having unsaved changes if in review mode
          if (isReviewMode) {
            setHasUnsavedChanges(true);
          }

          // Navigate to next unverified question
          setTimeout(() => {
            const unverifiedQuestions = updatedQuestions.filter(q => !q.is_verified);

            if (unverifiedQuestions.length > 0 && activeQuestionNumber) {
              let nextQuestionNumber = null;

              // Priority 1: Find next unverified question AFTER current one
              const nextQuestions = unverifiedQuestions.filter(q => q.question_number > activeQuestionNumber);
              if (nextQuestions.length > 0) {
                nextQuestionNumber = nextQuestions[0].question_number;
              } else {
                // Priority 2: All questions after current are verified, go back to skipped ones
                const skippedQuestions = unverifiedQuestions.filter(q => q.question_number < activeQuestionNumber);
                if (skippedQuestions.length > 0) {
                  nextQuestionNumber = skippedQuestions[0].question_number;
                } else {
                  // Fallback: Loop to first unverified
                  nextQuestionNumber = unverifiedQuestions[0].question_number;
                }
              }

              if (nextQuestionNumber) {
                setActiveQuestionNumber(nextQuestionNumber);
                const badgeElement = document.getElementById(`badge-q${nextQuestionNumber}`);
                if (badgeElement) {
                  badgeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                  });
                }
              }
            }
          }, 300);
        }
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        // Set marks to 0, verify, and navigate to next unverified
        if (!activeQuestionNumber) return;

        const updatedQuestions = questions.map(q =>
          q.question_number === activeQuestionNumber
            ? { ...q, score_awarded: 0, is_verified: true }
            : q
        );
        setQuestions(updatedQuestions);

        // Mark as having unsaved changes if in review mode
        if (isReviewMode) {
          setHasUnsavedChanges(true);
        }

        // Navigate to next unverified question
        setTimeout(() => {
          const unverifiedQuestions = updatedQuestions.filter(q => !q.is_verified);

          if (unverifiedQuestions.length > 0 && activeQuestionNumber) {
            let nextQuestionNumber = null;

            // Priority 1: Find next unverified question AFTER current one
            const nextQuestions = unverifiedQuestions.filter(q => q.question_number > activeQuestionNumber);
            if (nextQuestions.length > 0) {
              nextQuestionNumber = nextQuestions[0].question_number;
            } else {
              // Priority 2: All questions after current are verified, go back to skipped ones
              const skippedQuestions = unverifiedQuestions.filter(q => q.question_number < activeQuestionNumber);
              if (skippedQuestions.length > 0) {
                nextQuestionNumber = skippedQuestions[0].question_number;
              } else {
                // Fallback: Loop to first unverified
                nextQuestionNumber = unverifiedQuestions[0].question_number;
              }
            }

            if (nextQuestionNumber) {
              setActiveQuestionNumber(nextQuestionNumber);
              const badgeElement = document.getElementById(`badge-q${nextQuestionNumber}`);
              if (badgeElement) {
                badgeElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'center'
                });
              }
            }
          }
        }, 300);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    onNavigateToPrevious,
    onNavigateToNext,
    selectedQuestion,
    showCelebration,
    showUnsavedChangesModal,
    showPartialMarksWarning,
    showWelcomeModal,
    showPreferencesModal,
    activeQuestionNumber,
    questions,
    setQuestions,
    isReviewMode,
    setHasUnsavedChanges
  ]);

  return (
    <>
      {/* Blur effect when modals are open */}
      <style>{`
        .blur-background {
          filter: blur(4px);
          transition: filter 0.3s ease;
        }

        @keyframes minimizeToSwitches {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(50vw - 250px), calc(-50vh + 120px)) scale(0.05);
            opacity: 0;
          }
        }

        .minimizing {
          animation: minimizeToSwitches 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes switchPulse {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.15);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.15);
          }
        }

        .switch-pulse {
          animation: switchPulse 0.8s ease-in-out;
        }

        @keyframes switchGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }

        .switch-glow {
          animation: switchGlow 1s ease-out;
        }
      `}</style>
      {/* Custom CSS animations */}
      <style>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%) translateY(-50%);
            opacity: 0;
          }
          to {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
        }

        .capsules-slide-in {
          animation: slideInFromRight 0.4s ease-out forwards;
        }

        /* Hide scrollbar for marks suggestions */
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className={`animate-in -mx-6 lg:-mx-8 ${showWelcomeModal || showPreferencesModal ? 'blur-background' : ''}`}>
        {/* Header */}
        <div className="mb-8 px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Evaluations
          </button>
          <div className="text-sm text-stone-600">
            <span className="font-medium">{studentName}</span> - Answer Sheet Review
          </div>
        </div>

        {/* Student Details Section */}
        <div className="mb-6 px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
            {/* Basic Details - Name, Roll, Subject */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-4">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Student:</span>
                  <span className="text-base font-bold text-stone-900">{studentName}</span>
                </div>
                {studentRoll && (
                  <>
                    <div className="w-px h-5 bg-stone-300" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Roll:</span>
                      <span className="text-base font-bold text-stone-900">{studentRoll}</span>
                    </div>
                  </>
                )}
                {subject && (
                  <>
                    <div className="w-px h-5 bg-stone-300" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Subject:</span>
                      <span className="text-base font-bold text-stone-900">{subject}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Panel Preferences Controls */}
              <div className="flex items-center gap-4" id="preference-switches">
                {/* Question Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-purple-600">Q</span>
                  <button
                    onClick={() => setKeepQuestionOpen(!keepQuestionOpen)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${keepQuestionOpen ? 'bg-purple-600' : 'bg-stone-300'
                      }`}
                    title="Keep Question Open"
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${keepQuestionOpen ? 'translate-x-5' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                {/* AI Reasoning Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-600">AI</span>
                  <button
                    onClick={() => setKeepAIReasoningOpen(!keepAIReasoningOpen)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${keepAIReasoningOpen ? 'bg-blue-600' : 'bg-stone-300'
                      }`}
                    title="Keep AI Reasoning Open"
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${keepAIReasoningOpen ? 'translate-x-5' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                {/* Scoring Breakdown Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-green-600">✓</span>
                  <button
                    onClick={() => setKeepScoringOpen(!keepScoringOpen)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${keepScoringOpen ? 'bg-green-600' : 'bg-stone-300'
                      }`}
                    title="Keep Scoring Breakdown Open"
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${keepScoringOpen ? 'translate-x-5' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              </div>

              {/* Review Again Button for Graded submissions */}
              {isGraded && !isReviewMode && (
                <button
                  onClick={() => setIsReviewMode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium rounded-lg transition-colors border border-amber-200 hover:border-amber-300"
                >
                  <Pencil className="w-4 h-4" />
                  Review Again
                </button>
              )}

              {/* Exit Review Mode Button */}
              {isGraded && isReviewMode && (
                <button
                  onClick={handleExitReviewMode}
                  disabled={isVerifying}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-lg transition-colors border border-emerald-200 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Exit Review Mode
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Overall Summary */}
            {description && (
              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">Overall Summary</h4>
                <p className="text-sm text-stone-700 leading-relaxed">{description}</p>
              </div>
            )}

            {/* Badge Legend - Always show for tutors */}
            <div className="pt-4 border-t border-stone-200 mt-4">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">Badge Legend</h4>
              <div className="flex flex-wrap gap-4">
                {/* Star Badge */}
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 48 48" style={{ filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))' }}>
                    <path
                      d="M24 4 L28.5 18.5 L44 18.5 L31.5 28 L36 42 L24 33 L12 42 L16.5 28 L4 18.5 L19.5 18.5 Z"
                      fill="#10b981"
                      opacity="0.9"
                    />
                  </svg>
                  <span className="text-xs text-stone-700">
                    <strong className="font-semibold">Star:</strong> Full marks
                  </span>
                </div>

                {/* Circle Badge */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md" />
                  <span className="text-xs text-stone-700">
                    <strong className="font-semibold">Circle:</strong> Partial marks
                  </span>
                </div>

                {/* Triangle Badge */}
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 48 48" style={{ filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))' }}>
                    <polygon
                      points="24,6 44,42 4,42"
                      fill="#ef4444"
                      opacity="0.9"
                    />
                  </svg>
                  <span className="text-xs text-stone-700">
                    <strong className="font-semibold">Triangle:</strong> Incorrect / No marks
                  </span>
                </div>
              </div>

              {/* Keyboard Shortcuts Hint */}
              <div className="mt-3 pt-3 border-t border-stone-100">
                <p className="text-xs text-stone-500">
                  <strong className="font-semibold text-stone-600">Tip:</strong> Use <kbd className="px-1.5 py-0.5 bg-stone-200 rounded text-[10px] font-mono">←</kbd> <kbd className="px-1.5 py-0.5 bg-stone-200 rounded text-[10px] font-mono">→</kbd> arrow keys to navigate between submissions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="sticky top-0 py-2 sm:py-3 md:py-4 px-2 sm:px-4 md:px-6 lg:px-8 z-[9999]">
          <div className="max-w-6xl mx-auto">
            {/* Progress Header */}
            <div className="mb-2 sm:mb-3 text-center">
              <div className="text-xs sm:text-sm font-bold text-stone-700">Progress</div>
              <div className="text-[10px] sm:text-xs text-stone-500 mt-1">
                {verifiedQuestionsCount} / {questions.length} verified
              </div>
            </div>

            {/* Horizontal Progress Bar */}
            <div className="relative flex items-center gap-1 sm:gap-2">
              {/* Start Milestone */}
              <div className="flex flex-col items-center gap-0.5 sm:gap-1 flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 border-2 border-emerald-400 flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm sm:text-base font-bold">▶</span>
                </div>
                <span className="text-[8px] sm:text-[10px] font-bold text-emerald-600 uppercase tracking-wide hidden sm:block">Start</span>
              </div>

              {/* Progress Track */}
              <div className="flex-1 relative h-12 bg-white rounded-full shadow-inner overflow-hidden border-2 border-stone-300">
                {/* Segmented Progress based on individual question marks */}
                <div className="absolute left-0 top-0 bottom-0 flex w-full">
                  {questions.map((question) => {
                    const isVerified = question.is_verified || false;
                    const segmentWidth = 100 / questions.length;

                    // Progress bar fill with green fluid when verified
                    let segmentColor = 'bg-transparent';
                    if (isVerified) {
                      segmentColor = 'bg-gradient-to-r from-green-400 via-green-500 to-green-400';
                    }

                    return (
                      <div
                        key={question.question_number}
                        className={`h-full transition-all duration-500 ${segmentColor}`}
                        style={{ width: `${segmentWidth}%` }}
                      >
                        {isVerified && (
                          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-30"></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Question Milestones */}
                <div className="absolute inset-0 flex items-center justify-between px-1">
                  {questions.map((question, index) => {
                    const isVerified = question.is_verified || false;
                    const progress = (verifiedQuestionsCount / questions.length) * 100;
                    const milestonePosition = ((index) / (questions.length - 1)) * 100;
                    const isReached = progress >= milestonePosition;

                    // Determine color based on verification and marks
                    let bgColor = 'bg-white border-stone-300 text-stone-400';
                    if (isVerified) {
                      if (question.score_awarded === question.marks_available) {
                        bgColor = 'bg-gradient-to-br from-green-400 to-green-600 border-green-500 text-white scale-110 shadow-green-300';
                      } else if (question.score_awarded === 0) {
                        bgColor = 'bg-gradient-to-br from-red-400 to-red-600 border-red-500 text-white scale-110 shadow-red-300';
                      } else {
                        bgColor = 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-500 text-white scale-110 shadow-yellow-300';
                      }
                    } else if (isReached) {
                      bgColor = 'bg-gradient-to-br from-stone-200 to-stone-300 border-stone-400 text-stone-600';
                    }

                    return (
                      <button
                        key={question.question_number}
                        onClick={() => handleMilestoneClick(question)}
                        className={`
                          w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center text-[10px] sm:text-xs font-bold
                          transition-all duration-500 ease-out shadow-md cursor-pointer z-10
                          hover:scale-125 active:scale-105 relative
                          ${bgColor}
                        `}
                        title={`Jump to Question ${question.question_number}`}
                      >
                        <span>{question.question_number}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Completed Milestone */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-500 ${verifiedQuestionsCount === questions.length
                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-500 scale-110'
                  : 'bg-white border-stone-300'
                  }`}>
                  {verifiedQuestionsCount === questions.length ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-stone-400 text-base font-bold">✓</span>
                  )}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide ${verifiedQuestionsCount === questions.length ? 'text-emerald-700' : 'text-stone-500'
                  }`}>
                  Done
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - PDF pages stacked vertically */}
        <div className="flex justify-center bg-gradient-to-b from-stone-50 to-stone-100 py-4 md:py-8 relative px-4 sm:px-8 lg:px-16 xl:px-32">
          {/* PDF Container - Shifted left */}
          <div className="relative" style={{ width: `${PDF_WIDTH}px` }}>
            {/* Render each page */}
            {Array.from({ length: totalPages }, (_, pageIndex) => {
              const pageNumber = pageIndex + 1;

              // Filter questions for this page
              const questionsOnPage = questions.filter(q => getPageNumber(q) === pageNumber);

              return (
                <div
                  key={pageNumber}
                  className="relative bg-transparent mb-8 last:mb-0 overflow-hidden"
                  style={{
                    width: `${PDF_WIDTH}px`,
                    height: `${PDF_HEIGHT}px`,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  {/* PDF object for this page - scales to fit */}
                  <object
                    data={`${pdfUrl}#page=${pageNumber}&toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                    type="application/pdf"
                    className="pointer-events-none"
                    style={{
                      width: `${PDF_WIDTH}px`,
                      height: `${PDF_HEIGHT}px`,
                      border: 'none',
                      margin: 0,
                      padding: 0,
                      objectFit: 'contain',
                    }}
                  >
                    <p className="text-stone-500 text-sm p-4">
                      Your browser doesn't support PDF viewing.
                      <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[#AB896A] underline ml-1">
                        Download the PDF
                      </a>
                    </p>
                  </object>

                  {/* Overlay badges on this page - positioned using y_coordinate only */}
                  {questionsOnPage.map((question) => {
                    const isVerified = question.is_verified || false;
                    const badgeStyle = getBadgeStyle(question.score_awarded, question.marks_available, isVerified);
                    // y_coordinate is normalized: 0 = top, 1 = bottom
                    // Convert to pixel position within 800px height
                    const topPx = question.y_coordinate * PDF_HEIGHT;

                    // Render different shapes based on score
                    if (badgeStyle.shape === 'triangle') {
                      // Triangle for wrong answers
                      return (
                        <div
                          key={question.question_number}
                          id={`badge-q${question.question_number}`}
                          data-question-number={question.question_number}
                          className="absolute z-10 pointer-events-auto"
                          style={{
                            left: '10px',
                            top: `${topPx}px`,
                            transform: 'translateY(-50%)'
                          }}
                        >
                          <div className="relative flex flex-row items-center gap-1.5">
                            <button
                              onClick={() => handleBadgeClick(question)}
                              onDoubleClick={(e) => handleBadgeDoubleClick(e, question)}
                              className="relative w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform"
                              title={`Question ${question.question_number}: ${question.score_awarded}/${question.marks_available}`}
                            >
                              <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}>
                                <polygon
                                  points="32,8 58,56 6,56"
                                  fill={badgeStyle.fillColor}
                                  opacity="0.9"
                                />
                              </svg>
                              {editingBadgeNumber === question.question_number ? (
                                <div className="relative z-10 mt-3 flex gap-0.5 text-[10px]" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="number"
                                    value={tempScoreAwarded}
                                    onChange={(e) => setTempScoreAwarded(Number(e.target.value))}
                                    onKeyDown={(e) => handleBadgeEditKeyDown(e, question.question_number)}
                                    onBlur={() => saveBadgeEdit(question.question_number)}
                                    className="w-7 h-5 text-center bg-white border border-stone-300 rounded px-0.5 font-bold"
                                    autoFocus
                                  />
                                  <span className="self-center">/{question.marks_available}</span>
                                </div>
                              ) : (
                                <span className="text-[11px] font-bold text-stone-900 relative z-10  mt-3">
                                  {question.score_awarded}/{question.marks_available}
                                </span>
                              )}
                            </button>
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm px-2.5 py-0.5 z-10 rounded border border-stone-200 shadow-sm whitespace-nowrap">
                              <span className="text-[10px] font-bold text-stone-700">Q{question.question_number}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (badgeStyle.shape === 'star') {
                      // Star for correct answers
                      return (
                        <div
                          key={question.question_number}
                          id={`badge-q${question.question_number}`}
                          data-question-number={question.question_number}
                          className="absolute z-10 pointer-events-auto"
                          style={{
                            left: '10px',
                            top: `${topPx}px`,
                            transform: 'translateY(-50%)'
                          }}
                        >
                          <div className="relative flex flex-row items-center gap-1.5">
                            <button
                              onClick={() => handleBadgeClick(question)}
                              onDoubleClick={(e) => handleBadgeDoubleClick(e, question)}
                              className="relative w-16 h-16 flex items-center justify-center hover:scale-110 transition-transform"
                              title={`Question ${question.question_number}: ${question.score_awarded}/${question.marks_available}`}
                            >
                              <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}>
                                <path
                                  d="M32 5 L38 24.5 L58.5 24.5 L42 37 L48 56 L32 44 L16 56 L22 37 L5.5 24.5 L26 24.5 Z"
                                  fill={badgeStyle.fillColor}
                                  opacity="0.9"
                                />
                              </svg>
                              {editingBadgeNumber === question.question_number ? (
                                <div className="relative z-10 flex gap-0.5 text-[10px]" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="number"
                                    value={tempScoreAwarded}
                                    onChange={(e) => setTempScoreAwarded(Number(e.target.value))}
                                    onKeyDown={(e) => handleBadgeEditKeyDown(e, question.question_number)}
                                    onBlur={() => saveBadgeEdit(question.question_number)}
                                    className="w-7 h-5 text-center bg-white border border-stone-300 rounded px-0.5 font-bold"
                                    autoFocus
                                  />
                                  <span className="self-center">/{question.marks_available}</span>
                                </div>
                              ) : (
                                <span className="text-[11px] font-bold text-stone-900 relative z-10">
                                  {question.score_awarded}/{question.marks_available}
                                </span>
                              )}
                            </button>
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm px-2.5 py-0.5 z-10 rounded border border-stone-200 shadow-sm whitespace-nowrap">
                              <span className="text-[10px] font-bold text-stone-700">Q{question.question_number}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      // Circle for partial answers
                      return (
                        <div
                          key={question.question_number}
                          id={`badge-q${question.question_number}`}
                          data-question-number={question.question_number}
                          className="absolute z-10 pointer-events-auto"
                          style={{
                            left: '10px',
                            top: `${topPx}px`,
                            transform: 'translateY(-50%)'
                          }}
                        >
                          <div className="relative flex flex-row items-center gap-1.5">
                            <button
                              onClick={() => handleBadgeClick(question)}
                              onDoubleClick={(e) => handleBadgeDoubleClick(e, question)}
                              className={`${badgeStyle.color} text-stone-900 text-xs font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                              title={`Question ${question.question_number}: ${question.score_awarded}/${question.marks_available}`}
                            >
                              {editingBadgeNumber === question.question_number ? (
                                <div className="flex gap-0.5 text-[10px]" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="number"
                                    value={tempScoreAwarded}
                                    onChange={(e) => setTempScoreAwarded(Number(e.target.value))}
                                    onKeyDown={(e) => handleBadgeEditKeyDown(e, question.question_number)}
                                    onBlur={() => saveBadgeEdit(question.question_number)}
                                    className="w-7 h-5 text-center bg-white border border-stone-300 rounded px-0.5 font-bold"
                                    autoFocus
                                  />
                                  <span className="self-center">/{question.marks_available}</span>
                                </div>
                              ) : (
                                <span className="text-[11px] font-bold">
                                  {question.score_awarded}/{question.marks_available}
                                </span>
                              )}
                            </button>
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm px-2.5 py-0.5 z-10 rounded border border-stone-200 shadow-sm whitespace-nowrap">
                              <span className="text-[10px] font-bold text-stone-700">Q{question.question_number}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Floating Capsules Panel - Right Side - Always visible */}
      {activeQuestionNumber && (
        <div className={`fixed right-2 sm:right-4 md:right-6 lg:right-8 top-2/3 w-[300px] sm:w-[350px] md:w-[380px] lg:w-[420px] z-[9998] space-y-3 transition-all duration-300 ${showCapsulesAnimation ? 'capsules-slide-in' : 'opacity-0'} ${showWelcomeModal || showPreferencesModal ? 'blur-sm' : ''}`}>
          {(() => {
            const question = questions.find(q => q.question_number === activeQuestionNumber);
            if (!question) return null;

            return (
              <>
                {/* Question Capsule */}
                {question.question_text && (
                  <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xl">
                    <button
                      onClick={() => setLocalQuestionOpen(!localQuestionOpen)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#ebe3dd] to-[#e0d2c8] hover:from-[#e0d2c8] hover:to-[#d5c4b8] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d5c4b8] to-[#cbb8a8] flex items-center justify-center">
                          <span className="text-white text-xs font-bold">Q</span>
                        </div>
                        <span className="font-bold text-sm text-stone-900">Question {activeQuestionNumber}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-stone-600 transition-transform duration-300 ${localQuestionOpen ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out ${localQuestionOpen ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden'
                        }`}
                    >
                      <div className="p-4 bg-[#ebe3dd] animate-in slide-in-from-right duration-300">
                        <p className="text-sm text-stone-600 leading-relaxed break-words overflow-wrap-anywhere">
                          {question.question_text}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reasoning Capsule */}
                {question.feedback && (
                  <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xl">
                    <button
                      onClick={() => setLocalAIReasoningOpen(!localAIReasoningOpen)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#ebe3dd] to-[#e0d2c8] hover:from-[#e0d2c8] hover:to-[#d5c4b8] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c0a896] to-[#b59984] flex items-center justify-center">
                          <span className="text-white text-xs font-bold">R</span>
                        </div>
                        <span className="font-bold text-sm text-stone-900">Reasoning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isEditingReasoning && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsEditingReasoning(true);
                              setLocalAIReasoningOpen(true);
                            }}
                            className="p-1 hover:bg-[#d5c4b8] rounded transition-colors"
                            title="Edit reasoning"
                          >
                            <Pencil className="w-4 h-4 text-stone-700" />
                          </button>
                        )}
                        <svg
                          className={`w-5 h-5 text-stone-600 transition-transform duration-300 ${localAIReasoningOpen ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out ${localAIReasoningOpen ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden'
                        }`}
                    >
                      <div className="p-4 bg-[#ebe3dd] animate-in slide-in-from-right duration-300">
                        <div
                          contentEditable={isEditingReasoning}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            if (isEditingReasoning) {
                              const updatedQuestions = questions.map(q =>
                                q.question_number === question.question_number
                                  ? { ...q, feedback: e.currentTarget.textContent || '' }
                                  : q
                              );
                              setQuestions(updatedQuestions);
                              setIsEditingReasoning(false);
                              if (isReviewMode) {
                                setHasUnsavedChanges(true);
                              }
                            }
                          }}
                          onClick={() => {
                            if (isEditingReasoning) {
                              // Keep focus when editing
                            }
                          }}
                          className={`text-sm text-stone-600 leading-relaxed break-words overflow-wrap-anywhere ${isEditingReasoning ? 'outline-none cursor-text' : ''
                            }`}
                        >
                          {question.feedback}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scoring Breakdown Capsule */}
                {question.scoring_breakdown && question.scoring_breakdown.length > 0 && (
                  <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xl">
                    <button
                      onClick={() => setLocalScoringOpen(!localScoringOpen)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#ebe3dd] to-[#e0d2c8] hover:from-[#e0d2c8] hover:to-[#d5c4b8] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a89178] to-[#9d8066] flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="font-bold text-sm text-stone-900">Scoring Breakdown</span>
                      </div>
                      <svg
                        className={`w-5 h-5 text-stone-600 transition-transform duration-300 ${localScoringOpen ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out ${localScoringOpen ? 'max-h-[350px] overflow-y-auto' : 'max-h-0 overflow-hidden'
                        }`}
                    >
                      <div className="p-4 bg-[#ebe3dd] animate-in slide-in-from-right duration-300 space-y-3">
                        {question.scoring_breakdown.map((item, idx) => (
                          <div key={idx} className={`border rounded-lg p-3 ${item.mark_awarded ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                            <p className="text-sm text-stone-600 leading-relaxed break-words overflow-wrap-anywhere">
                              {item.reasoning}
                            </p>
                            <p className={`text-xs font-semibold mt-2 ${item.mark_awarded ? 'text-green-700' : 'text-red-700'}`}>
                              {item.mark_awarded ? '✓ Mark Awarded' : '✗ Mark Not Awarded'}
                            </p>
                          </div>
                        ))}

                        {/* Mistakes Section within Scoring */}
                        {question.mistakes_made && question.mistakes_made.length > 0 && (
                          <div className="pt-3 border-t border-stone-200">
                            <h5 className="text-xs font-bold text-red-700 mb-2">Mistakes Identified</h5>
                            <div className="space-y-2">
                              {question.mistakes_made.map((mistake, idx) => (
                                <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                                  <p className="text-xs font-bold text-red-700 mb-1 break-words">{mistake.mistake_type}</p>
                                  <p className="text-sm text-stone-600 mb-2 break-words overflow-wrap-anywhere">{mistake.mistake_description}</p>
                                  {mistake.lacking_competencies && mistake.lacking_competencies.length > 0 && (
                                    <div className="mt-2">
                                      <p className="text-xs font-semibold text-stone-700 mb-1">Lacking Competencies:</p>
                                      <ul className="list-disc list-inside text-xs text-stone-600">
                                        {mistake.lacking_competencies.map((comp, i) => (
                                          <li key={i}>{comp}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  <p className="text-xs text-red-600 mt-2 font-semibold">
                                    Marks Lost: {mistake.marks_lost}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Marks Suggestion - Horizontal scroll */}
                <div className="w-full flex justify-center px-4">
                  {/* Marks Suggestion - Horizontal scroll */}
                  <div className="flex items-center gap-1">
                    {/* Scroll Indicator - Left */}
                    <div className="flex-shrink-0 text-[#8c735a] px-1">
                      <div className="animate-pulse">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                    </div>

                    <div
                      className="flex gap-3 overflow-x-auto pb-2 scrollbar-hidden"
                      style={{
                        maxWidth: '220px',
                        scrollSnapType: 'x mandatory'
                      }}
                    >
                      {generateMarkSuggestions(question.marks_available, question.score_awarded).map((mark) => (
                        <button
                          key={mark}
                          onClick={() => {
                            const updatedQuestions = questions.map(q =>
                              q.question_number === activeQuestionNumber
                                ? { ...q, score_awarded: mark }
                                : q
                            );
                            setQuestions(updatedQuestions);
                            if (isReviewMode) {
                              setHasUnsavedChanges(true);
                            }
                          }}
                          className="flex-shrink-0 bg-gradient-to-br from-[#ebe3dd] to-[#e0d2c8] hover:from-[#e0d2c8] hover:to-[#d5c4b8] border-2 border-[#cbb8a8] hover:border-[#b59984] rounded-full font-bold text-stone-700 hover:text-stone-900 transition-all duration-200 shadow-md hover:shadow-lg text-base flex items-center justify-center"
                          style={{
                            width: '50px',
                            height: '50px',
                            scrollSnapAlign: 'start'
                          }}
                        >
                          {mark}
                        </button>
                      ))}
                    </div>

                    {/* Scroll Indicator - Right */}
                    <div className="flex-shrink-0 text-[#8c735a] px-1">
                      <div className="animate-pulse">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verify Icons - Below Marks Options */}
                <div className="w-full mt-4 flex justify-center gap-6">
                  <div className="group relative flex flex-col items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerifyQuestion(e, activeQuestionNumber);
                      }}
                      className="transition-all duration-200 flex items-center justify-center"
                    >
                      <CheckCircle
                        className={`w-8 h-8 transition-all duration-200 ${question.is_verified
                          ? 'text-green-500 scale-125'
                          : 'text-gray-400 hover:text-green-500 hover:scale-110'
                          }`}
                        fill={question.is_verified ? "currentColor" : "none"}
                      />
                    </button>
                    <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-medium text-stone-700 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md">
                      Mark as Verified
                    </span>
                  </div>

                  <div className="group relative flex flex-col items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Set marks to 0 and verify the question
                        const updatedQuestions = questions.map(q =>
                          q.question_number === activeQuestionNumber
                            ? { ...q, score_awarded: 0, is_verified: true }
                            : q
                        );
                        setQuestions(updatedQuestions);

                        // Mark as having unsaved changes if in review mode
                        if (isReviewMode) {
                          setHasUnsavedChanges(true);
                        }

                        // Navigate to next unverified question
                        setTimeout(() => {
                          const unverifiedQuestions = updatedQuestions.filter(q => !q.is_verified);

                          if (unverifiedQuestions.length > 0 && activeQuestionNumber) {
                            let nextQuestionNumber = null;

                            // Priority 1: Find next unverified question AFTER current one
                            const nextQuestions = unverifiedQuestions.filter(q => q.question_number > activeQuestionNumber);
                            if (nextQuestions.length > 0) {
                              nextQuestionNumber = nextQuestions[0].question_number;
                            } else {
                              // Priority 2: All questions after current are verified, go back to skipped ones
                              const skippedQuestions = unverifiedQuestions.filter(q => q.question_number < activeQuestionNumber);
                              if (skippedQuestions.length > 0) {
                                nextQuestionNumber = skippedQuestions[0].question_number;
                              } else {
                                // Fallback: Loop to first unverified
                                nextQuestionNumber = unverifiedQuestions[0].question_number;
                              }
                            }

                            if (nextQuestionNumber) {
                              setActiveQuestionNumber(nextQuestionNumber);
                              const badgeElement = document.getElementById(`badge-q${nextQuestionNumber}`);
                              if (badgeElement) {
                                badgeElement.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'center',
                                  inline: 'center'
                                });
                              }
                            }
                          }
                        }, 300);
                      }}
                      className="transition-all duration-200 flex items-center justify-center"
                    >
                      <X
                        className="w-8 h-8 transition-all duration-200 text-red-500 hover:text-red-700 hover:scale-110"
                      />
                    </button>
                    <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-medium text-stone-700 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md">
                      Mark as Zero
                    </span>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Running Total - Fixed Center Right (Outside main container) */}
      <div className={`fixed top-1/4 left-2 sm:left-4 md:left-6 -translate-y-1/4 z-[9997] pointer-events-none transition-all duration-300 ${showWelcomeModal || showPreferencesModal ? 'blur-sm' : ''}`}>
        <div className="bg-gradient-to-br from-[#d5c4b8] to-[#c0a896] text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#e0d2c8] pointer-events-auto">
          <div className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wide mb-1">Running Total</div>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold">{totalScore}</span>
            <span className="text-sm sm:text-base md:text-lg font-medium text-white">/</span>
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">{totalMarksAvailable}</span>
          </div>
          <div className="text-[10px] sm:text-xs text-white mt-1 sm:mt-2">
            {verifiedQuestionsCount} of {questions.length} verified
          </div>
        </div>
      </div>

      {/* Modal renders at root level, outside all containers */}
      {selectedQuestion && <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/20 z-[9998] animate-in fade-in duration-200"
          onClick={closeModal}
        />

        {/* Modal */}
        <div className="fixed bottom-4 right-4 w-full md:w-[500px] max-w-[calc(100vw-2rem)] h-[70vh] max-h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-2xl z-[9999] animate-in slide-in-from-right duration-300">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h3 className="text-lg font-bold text-stone-900">
              Question {selectedQuestion.question_number} Evaluation
            </h3>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-stone-600" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
            {/* Score Display/Edit */}
            <div className="mb-6">
              {isEditingScore ? (
                <div className="space-y-4">
                  {/* Two Column Layout */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left Column - Score */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-stone-500 uppercase">Score</h4>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-medium text-stone-600">Score Awarded:</label>
                          <input
                            type="number"
                            min="0"
                            max={editedMarksAvailable}
                            value={editedScoreAwarded}
                            onChange={(e) => handleScoreAwardedChange(e.target.value)}
                            className={`w-20 text-center text-sm font-bold bg-stone-50 border focus:ring-1 focus:outline-none px-2 py-1.5 rounded [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] ${editedScoreAwarded > editedMarksAvailable
                              ? 'border-red-300 text-red-700 focus:border-red-600 focus:ring-red-600'
                              : 'border-stone-300 text-stone-700 focus:border-stone-600 focus:ring-stone-600'
                              }`}
                            style={{ MozAppearance: 'textfield' }}
                            aria-label="Score awarded"
                            aria-invalid={editedScoreAwarded > editedMarksAvailable}
                          />
                          {editedScoreAwarded > editedMarksAvailable && (
                            <p className="text-xs text-red-600 mt-1">Score cannot exceed {editedMarksAvailable}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-medium text-stone-600">Total Marks:</label>
                          <input
                            ref={marksAvailableInputRef}
                            type="number"
                            min="0"
                            value={editedMarksAvailable}
                            onChange={(e) => handleMarksAvailableChange(e.target.value)}
                            className="w-20 text-center text-sm font-bold text-stone-700 bg-stone-50 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none px-2 py-1.5 rounded [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                            style={{ MozAppearance: 'textfield' }}
                            aria-label="Total marks available"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Breakdown */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-stone-500 uppercase">Breakdown</h4>
                        <button
                          onClick={handleAddPart}
                          className="text-xs px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded transition-colors font-medium"
                          title="Add part"
                        >
                          + Add Part
                        </button>
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {editedPartsBreakdown.length > 0 ? (
                          editedPartsBreakdown.map((part, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-xs font-medium text-stone-600 w-8">Part {part.part}:</span>
                              <input
                                type="number"
                                min="0"
                                value={part.marks}
                                onChange={(e) => handleUpdatePartMarks(index, Number(e.target.value))}
                                className="w-16 text-center text-xs font-bold text-stone-700 bg-stone-50 border border-stone-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none px-1.5 py-1 rounded [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                style={{ MozAppearance: 'textfield' }}
                              />
                              <button
                                onClick={() => handleRemovePart(index)}
                                className="p-1 hover:bg-red-50 rounded transition-colors"
                                title="Remove part"
                              >
                                <X className="w-3 h-3 text-red-500" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-stone-400 italic">No breakdown added yet</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
                    <button
                      onClick={handleSaveScore}
                      className="px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-lg transition-colors text-sm flex items-center gap-1"
                      title="Save changes"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors text-sm flex items-center gap-1"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {/* Left - Score Display */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-700">
                      Score: {selectedQuestion.score_awarded} / {selectedQuestion.marks_available}
                    </span>
                    <button
                      onClick={handleEditScore}
                      className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors"
                      title="Edit score"
                    >
                      <Pencil className="w-4 h-4 text-stone-600" />
                    </button>
                  </div>

                  {/* Right - Breakdown Display */}
                  <div>
                    {selectedQuestion.parts_breakdown && selectedQuestion.parts_breakdown.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-semibold text-stone-500">Breakdown:</span>
                        {selectedQuestion.parts_breakdown.map((part, index) => (
                          <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                            {part.part}: {part.marks}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-stone-400 italic">No breakdown</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Question Text */}
            {selectedQuestion.question_text && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-stone-700 mb-2">Question</h4>
                <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">
                  {selectedQuestion.question_text}
                </p>
              </div>
            )}

            {/* Student Answer */}
            {selectedQuestion.student_answer && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-stone-700 mb-2">Student Answer</h4>
                <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                  <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">
                    {selectedQuestion.student_answer}
                  </p>
                </div>
              </div>
            )}

            {/* Feedback */}
            {selectedQuestion.feedback && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-stone-700 mb-2">AI Feedback</h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">
                    {selectedQuestion.feedback}
                  </p>
                </div>
              </div>
            )}

            {/* Scoring Breakdown */}
            {selectedQuestion.scoring_breakdown && selectedQuestion.scoring_breakdown.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-stone-700 mb-2">Scoring Breakdown</h4>
                <div className="space-y-2">
                  {selectedQuestion.scoring_breakdown.map((item, idx) => (
                    <div key={idx} className={`border rounded-lg p-3 ${item.mark_awarded ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">
                        {item.reasoning}
                      </p>
                      <p className={`text-xs font-semibold mt-2 ${item.mark_awarded ? 'text-green-700' : 'text-red-700'}`}>
                        {item.mark_awarded ? '✓ Mark Awarded' : '✗ Mark Not Awarded'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mistakes */}
            {selectedQuestion.mistakes_made && selectedQuestion.mistakes_made.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-stone-700 mb-2">Mistakes Identified</h4>
                <div className="space-y-3">
                  {selectedQuestion.mistakes_made.map((mistake, idx) => (
                    <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-xs font-bold text-red-700 mb-1">{mistake.mistake_type}</p>
                      <p className="text-sm text-stone-600 mb-2 whitespace-pre-wrap">{mistake.mistake_description}</p>
                      {mistake.lacking_competencies && mistake.lacking_competencies.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-stone-700 mb-1">Lacking Competencies:</p>
                          <ul className="list-disc list-inside text-xs text-stone-600">
                            {mistake.lacking_competencies.map((comp, i) => (
                              <li key={i}>{comp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="text-xs text-red-600 mt-2 font-semibold">
                        Marks Lost: {mistake.marks_lost}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Partial Marks Warning Modal - Nested inside main modal */}
          {showPartialMarksWarning && (
            <>
              {/* Inner backdrop */}
              <div className="absolute inset-0 bg-black/30 z-[10] animate-in fade-in duration-200" />

              {/* Warning popup */}
              <div className="absolute inset-0 z-[11] flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in duration-300">
                  {/* Warning Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>

                  {/* Primary Text */}
                  <h3 className="text-lg font-bold text-stone-900 text-center mb-2">
                    You missed updating partial marks
                  </h3>

                  {/* Secondary Text */}
                  <p className="text-sm text-stone-600 text-center mb-6 leading-relaxed">
                    This will help us to improve our evaluation and get accurate insights for the student
                  </p>

                  {/* Checkbox */}
                  <label className="flex items-start gap-3 mb-6 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={dontUpdatePartialMarks}
                      onChange={(e) => setDontUpdatePartialMarks(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-amber-600 bg-stone-100 border-stone-300 rounded focus:ring-amber-500 focus:ring-2 cursor-pointer"
                    />
                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                      Don't want to update partial marks
                    </span>
                  </label>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleWarningDone}
                      className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm"
                    >
                      Done
                    </button>
                    <button
                      onClick={handleUpdatePartialMarks}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                    >
                      Update Partial Marks
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>}

      {/* Celebration Modal - All Questions Verified */}
      {showCelebration && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 z-[10000] animate-in fade-in duration-300" />

          {/* Confetti Animation */}
          <div className="fixed inset-0 z-[10001] pointer-events-none overflow-hidden">
            {/* Generate confetti pieces */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-[fall_3s_ease-in_infinite]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)],
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Celebration Modal */}
          <div className="fixed inset-0 z-[10002] flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full p-4 sm:p-6 md:p-8 animate-in zoom-in duration-500 relative overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 opacity-50" />

              {/* Content */}
              <div className="relative z-10">
                {/* Success Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Review Complete! 🎉
                </h2>

                {/* Subheading */}
                <p className="text-base sm:text-lg text-center text-stone-600 mb-1 sm:mb-2 font-semibold">
                  Excellent Work!
                </p>

                {/* Message */}
                <p className="text-sm sm:text-base text-center text-stone-500 mb-4 sm:mb-6 leading-relaxed">
                  You've successfully verified all <span className="font-bold text-emerald-600">{questions.length} questions</span> for {studentName}.
                  Your thorough review ensures accurate and fair grading.
                </p>

                {/* Stats */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-emerald-200">
                  <div className="flex items-center justify-center gap-3 sm:gap-6">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-emerald-600">{questions.length}</div>
                      <div className="text-[10px] sm:text-xs text-stone-600 mt-0.5 sm:mt-1">Questions</div>
                    </div>
                    <div className="w-px h-10 sm:h-12 bg-emerald-200" />
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-emerald-600">100%</div>
                      <div className="text-[10px] sm:text-xs text-stone-600 mt-0.5 sm:mt-1">Verified</div>
                    </div>
                    <div className="w-px h-10 sm:h-12 bg-emerald-200" />
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">{totalScore}/{totalMarksAvailable}</div>
                      <div className="text-[10px] sm:text-xs text-stone-600 mt-0.5 sm:mt-1">Total Marks</div>
                    </div>
                    <div className="w-px h-10 sm:h-12 bg-emerald-200" />
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-emerald-600">✓</div>
                      <div className="text-[10px] sm:text-xs text-stone-600 mt-0.5 sm:mt-1">Complete</div>
                    </div>
                  </div>
                </div>

                {/* Appreciation Message */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-center text-blue-800 italic">
                    "Your dedication to thorough evaluation helps students learn and grow.
                    Thank you for your commitment to educational excellence!"
                  </p>
                </div>

                {/* Teacher Remarks Section */}
                <div className="mb-4 sm:mb-6">
                  <label className="block mb-2">
                    <span className="text-xs sm:text-sm font-semibold text-stone-700 flex items-center gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Remarks for Student (Optional)
                    </span>
                    <span className="text-[10px] sm:text-xs text-stone-500 ml-5 sm:ml-6">Share feedback, encouragement, or areas for improvement</span>
                  </label>
                  <textarea
                    value={teacherRemarks}
                    onChange={(e) => setTeacherRemarks(e.target.value)}
                    placeholder="Example: Great work on question 3! Pay attention to calculation steps in question 5..."
                    rows={4}
                    maxLength={500}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-stone-200 rounded-lg sm:rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none text-xs sm:text-sm text-stone-700 placeholder-stone-400"
                  />
                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <span className="text-[10px] sm:text-xs text-stone-500">
                      {teacherRemarks.length}/500 characters
                    </span>
                    {teacherRemarks.length > 0 && (
                      <button
                        onClick={() => setTeacherRemarks('')}
                        className="text-[10px] sm:text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => setShowCelebration(false)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
                    >
                      Continue Review
                    </button>
                    <button
                      onClick={onBack}
                      className="flex-1 bg-white hover:bg-stone-50 text-stone-700 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 border-2 border-stone-200 hover:border-stone-300 text-sm sm:text-base"
                    >
                      Back to List
                    </button>
                  </div>

                  {/* Verification Status */}
                  {isVerifying && (
                    <div className="w-full bg-blue-50 text-blue-700 font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg sm:rounded-xl border border-blue-200 flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting verification...
                    </div>
                  )}

                  {verificationError && (
                    <div className="w-full bg-red-50 text-red-700 font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg sm:rounded-xl border border-red-200 flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {verificationError}
                    </div>
                  )}

                  {!isVerifying && !verificationError && (
                    <div className="w-full bg-emerald-50 text-emerald-700 font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg sm:rounded-xl border border-emerald-200 flex items-center justify-center gap-2 text-xs sm:text-sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" />
                      Verification submitted successfully!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Welcome Modal for Non-Evaluated Papers */}
      {showWelcomeModal && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 z-[10000] animate-in fade-in duration-300" />

          {/* Modal */}
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-2 sm:p-3 md:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full p-3 sm:p-4 md:p-6 lg:p-8 animate-in zoom-in duration-500 relative overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" />

              {/* Content */}
              <div className="relative z-10">
                {/* Welcome Icon */}
                <div className="flex justify-center mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center mb-1 sm:mb-2 md:mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to Answer Sheet Evaluation
                </h2>

                {/* Subheading */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-center text-stone-600 mb-2 sm:mb-3 md:mb-4 lg:mb-6 font-semibold">
                  Let's review {studentName}'s submission
                </p>

                {/* Instructions */}
                <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 mb-2 sm:mb-3 md:mb-4 lg:mb-6 border-2 border-blue-100 shadow-sm">
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-stone-900 mb-2 sm:mb-3 md:mb-4 flex items-center gap-1 sm:gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-[9px] sm:text-[10px] md:text-xs lg:text-sm flex-shrink-0">
                      i
                    </span>
                    What you need to do:
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4">
                    <li className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-stone-800">Review AI-Generated Evaluations</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-stone-600">Each question has been automatically evaluated. Review the scores, reasoning, and feedback provided by AI.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-stone-800">Adjust Scores (If Needed)</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-stone-600">Use the mark suggestions or click the edit button to modify scores. Update partial marks breakdown for better insights.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold">3</span>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-stone-800">Verify Each Question</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-stone-600">Click the checkmark (✓) icon to verify a question. The system will automatically move to the next unverified question.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-bold">4</span>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-stone-800">Complete the Review</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-stone-600">Once all questions are verified, your evaluation will be automatically submitted and marked as "Graded".</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Quick Tips */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                  <h4 className="text-[10px] sm:text-xs md:text-sm font-bold text-amber-900 mb-1 sm:mb-1.5 md:mb-2 flex items-center gap-1 sm:gap-2">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Quick Tips
                  </h4>
                  <ul className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-amber-900 space-y-0.5 sm:space-y-1 list-disc list-inside">
                    <li>Click on any badge on the left side of the PDF to view question details</li>
                    <li>Use the reasoning panel on the right to understand AI's evaluation logic</li>
                    <li>Navigate between submissions using ← → arrow keys</li>
                    <li>Gray badges indicate unverified questions; colored badges show verified ones</li>
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    setShowWelcomeModal(false);
                    setShowPreferencesModal(true);
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 sm:py-2.5 md:py-3 lg:py-4 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-xs sm:text-sm md:text-base"
                >
                  Got it! Let's Start Reviewing
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <>
          {/* Backdrop */}
          <div className={`fixed inset-0 bg-black/40 z-[10000] ${isMinimizing ? 'animate-out fade-out duration-500' : 'animate-in fade-in duration-300'}`} />

          {/* Modal */}
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-3 sm:p-4">
            <div className={`bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full p-4 sm:p-6 md:p-8 relative overflow-hidden ${isMinimizing ? 'minimizing' : 'animate-in zoom-in duration-500'}`}>
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 opacity-50" />

              {/* Content */}
              <div className="relative z-10">
                {/* Settings Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Set Your Preferences
                </h2>

                {/* Subheading */}
                <p className="text-xs sm:text-sm text-center text-stone-600 mb-4 sm:mb-6">
                  Customize which panel stays open while reviewing questions
                </p>

                {/* Preferences Options */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {/* Question Panel */}
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-purple-300 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs sm:text-sm font-bold">Q</span>
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-stone-900">Keep Question Open</h3>
                          <p className="text-[10px] sm:text-xs text-stone-600">Always show the question text</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newValue = !keepQuestionOpen;
                          setKeepQuestionOpen(newValue);
                        }}
                        className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors flex-shrink-0 ${keepQuestionOpen ? 'bg-purple-600' : 'bg-stone-300'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${keepQuestionOpen ? 'translate-x-6 sm:translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* AI Reasoning Panel */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-blue-300 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs sm:text-sm font-bold">AI</span>
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-stone-900">Keep AI Reasoning Open</h3>
                          <p className="text-[10px] sm:text-xs text-stone-600">Always show AI's evaluation reasoning</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newValue = !keepAIReasoningOpen;
                          setKeepAIReasoningOpen(newValue);
                        }}
                        className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors flex-shrink-0 ${keepAIReasoningOpen ? 'bg-blue-600' : 'bg-stone-300'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${keepAIReasoningOpen ? 'translate-x-6 sm:translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Scoring Breakdown Panel */}
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-green-300 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-stone-900">Keep Scoring Breakdown Open</h3>
                          <p className="text-[10px] sm:text-xs text-stone-600">Always show detailed scoring criteria</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newValue = !keepScoringOpen;
                          setKeepScoringOpen(newValue);
                        }}
                        className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors flex-shrink-0 ${keepScoringOpen ? 'bg-green-600' : 'bg-stone-300'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${keepScoringOpen ? 'translate-x-6 sm:translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-[10px] sm:text-xs text-blue-800 text-center">
                    <strong>Note:</strong> You can change these preferences anytime using the controls in the student details section
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    setIsMinimizing(true);
                    // Trigger pulse and glow animation on switches
                    const switches = document.getElementById('preference-switches');
                    const switchButtons = switches?.querySelectorAll('button');

                    if (switches) {
                      switches.classList.add('switch-pulse');
                    }

                    // Add glow effect to each switch button
                    switchButtons?.forEach(btn => {
                      btn.classList.add('switch-glow');
                    });

                    // Close modal after animation
                    setTimeout(() => {
                      setShowPreferencesModal(false);
                      setIsMinimizing(false);
                      if (switches) {
                        switches.classList.remove('switch-pulse');
                      }
                      switchButtons?.forEach(btn => {
                        btn.classList.remove('switch-glow');
                      });
                    }, 600);
                  }}
                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
                >
                  Start Reviewing
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Unsaved Changes Confirmation Modal */}
      {showUnsavedChangesModal && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 z-[10000] animate-in fade-in duration-200" />

          {/* Modal */}
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-6 animate-in zoom-in duration-300">
              {/* Warning Icon */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 text-center mb-2 sm:mb-3">
                Unsaved Changes
              </h3>

              {/* Message */}
              <p className="text-xs sm:text-sm text-stone-600 text-center mb-4 sm:mb-6 leading-relaxed">
                You have unsaved changes in your review. If you go back now, your review changes will be discarded.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <button
                  onClick={handleSaveAndBack}
                  disabled={isVerifying}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isVerifying ? (
                    <>
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      Save Changes & Go Back
                    </>
                  )}
                </button>
                <button
                  onClick={handleDiscardChanges}
                  disabled={isVerifying}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 border border-red-200 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  Discard Changes
                </button>
                <button
                  onClick={() => setShowUnsavedChangesModal(false)}
                  disabled={isVerifying}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Keyboard Shortcuts Legend - Bottom Left */}
      <div className="fixed bottom-20 sm:bottom-24 md:bottom-28 left-2 sm:left-4 md:left-8 z-[9998] p-2 sm:p-3 transition-opacity duration-300 opacity-100">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <kbd className="w-6 h-6 flex items-center justify-center bg-[#d5c4b8]/30 border border-[#d5c4b8]/50 rounded text-sm font-mono text-[#d5c4b8] shadow-sm">↑</kbd>
            <span className="text-xs text-[#d5c4b8]/90">Prev Q</span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="w-6 h-6 flex items-center justify-center bg-[#d5c4b8]/30 border border-[#d5c4b8]/50 rounded text-sm font-mono text-[#d5c4b8] shadow-sm">↓</kbd>
            <span className="text-xs text-[#d5c4b8]/90">Next Q</span>
          </div>
          <div className="w-full h-px bg-[#d5c4b8]/30 my-1"></div>
          <div className="flex items-center gap-3">
            <kbd className="w-6 h-6 flex items-center justify-center bg-[#d5c4b8]/30 border border-[#d5c4b8]/50 rounded text-sm font-mono text-[#d5c4b8] shadow-sm">←</kbd>
            <span className="text-xs text-[#d5c4b8]/90">Prev Subm.</span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="w-6 h-6 flex items-center justify-center bg-[#d5c4b8]/30 border border-[#d5c4b8]/50 rounded text-sm font-mono text-[#d5c4b8] shadow-sm">→</kbd>
            <span className="text-xs text-[#d5c4b8]/90">Next Subm.</span>
          </div>
          <div className="w-full h-px bg-[#d5c4b8]/30 my-1"></div>
          <div className="flex items-center gap-3">
            <kbd className="min-w-[24px] h-6 px-1.5 flex items-center justify-center bg-[#d5c4b8]/30 border border-[#d5c4b8]/50 rounded text-xs font-mono text-[#d5c4b8] shadow-sm">↵</kbd>
            <span className="text-xs text-[#d5c4b8]/90">Verify & Next</span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="min-w-[24px] h-6 px-1.5 flex items-center justify-center bg-[#d5c4b8]/30 border border-[#d5c4b8]/50 rounded text-xs font-mono text-[#d5c4b8] shadow-sm">⌫</kbd>
            <span className="text-xs text-[#d5c4b8]/90">0 & Next</span>
          </div>
        </div>
      </div>

      {/* FAQ Button - Bottom Left */}
      <button
        onClick={() => {
          if (showFAQ) {
            // Start closing animation
            setIsFAQClosing(true);
            setTimeout(() => {
              setShowFAQ(false);
              setIsFAQClosing(false);
            }, 500); // Match animation duration
          } else {
            setShowFAQ(true);
          }
        }}
        className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-2 sm:left-4 md:left-8 z-[9999] bg-gradient-to-br from-[#c0a896] to-[#b59984] hover:from-[#b59984] hover:to-[#a89178] text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="FAQ - Help"
      >
        <span className="text-2xl font-bold">?</span>
      </button>

      {/* FAQ Capsules Panel - Bottom Left */}
      {showFAQ && (
        <div
          className="fixed left-2 sm:left-4 md:left-8 bottom-20 sm:bottom-24 md:bottom-28 w-[90vw] sm:w-[450px] md:w-[500px] max-w-[500px] z-[9998] space-y-3 origin-bottom-left"
          style={{
            animation: isFAQClosing ? 'faqSlideOut 0.5s ease-out forwards' : 'faqSlideIn 0.5s ease-out forwards'
          }}
        >
          {/* FAQ 1 - How to complete review */}
          <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xl" style={{ animation: isFAQClosing ? 'faqSlideOut 0.5s ease-out forwards' : 'faqSlideIn 0.5s ease-out forwards', animationDelay: isFAQClosing ? '0s' : '0.1s', opacity: isFAQClosing ? 1 : 0 }}>
            <button
              onClick={() => setExpandedFAQs(prev =>
                prev.includes(1) ? prev.filter(id => id !== 1) : [...prev, 1]
              )}
              className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#ebe3dd] to-[#e0d2c8] hover:from-[#e0d2c8] hover:to-[#d5c4b8] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c0a896] to-[#b59984] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">?</span>
                </div>
                <span className="font-bold text-sm text-stone-900">How to complete review?</span>
              </div>
              <svg className={`w-5 h-5 text-stone-600 transition-transform duration-300 ${expandedFAQs.includes(1) ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${expandedFAQs.includes(1) ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden'}`}>
              <div className="p-4 bg-[#ebe3dd] animate-in slide-in-from-left duration-300">
                <div className="text-sm text-stone-600 space-y-2">
                  <p><strong>Step 1:</strong> Click on a badge (marks indicator) on the left side of the PDF to view question details in the capsules on the right.</p>
                  <p><strong>Step 2:</strong> Review the question text, AI reasoning, and scoring breakdown in the capsules.</p>
                  <p><strong>Step 3:</strong> Edit marks if needed by double-clicking the badge, or use the scoring capsule to adjust marks.</p>
                  <p><strong>Step 4:</strong> Click the green checkmark (✓) in the scoring capsule to verify the question.</p>
                  <p><strong>Step 5:</strong> Repeat for all questions. Once all are verified, you'll see a completion modal.</p>
                  <p><strong>Tip:</strong> Use arrow keys (↑/↓) to navigate between questions quickly!</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ 2 - How to edit marks */}
          <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xl" style={{ animation: isFAQClosing ? 'faqSlideOut 0.5s ease-out forwards' : 'faqSlideIn 0.5s ease-out forwards', animationDelay: isFAQClosing ? '0s' : '0.15s', opacity: isFAQClosing ? 1 : 0 }}>
            <button
              onClick={() => setExpandedFAQs(prev =>
                prev.includes(2) ? prev.filter(id => id !== 2) : [...prev, 2]
              )}
              className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#ebe3dd] to-[#e0d2c8] hover:from-[#e0d2c8] hover:to-[#d5c4b8] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c0a896] to-[#b59984] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">?</span>
                </div>
                <span className="font-bold text-sm text-stone-900">How to edit marks quickly?</span>
              </div>
              <svg className={`w-5 h-5 text-stone-600 transition-transform duration-300 ${expandedFAQs.includes(2) ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${expandedFAQs.includes(2) ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden'}`}>
              <div className="p-4 bg-[#ebe3dd] animate-in slide-in-from-left duration-300">
                <div className="text-sm text-stone-600 space-y-2">
                  <p><strong>Double-click badge:</strong> Double-click any badge to edit the score (numerator) directly.</p>
                  <p><strong>Use capsules:</strong> Click on suggested marks in the scoring capsule for quick selection.</p>
                  <p><strong>Set to zero:</strong> Click the red X button to instantly set marks to 0 and verify.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ 3 - Badge colors */}
          <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xl" style={{ animation: isFAQClosing ? 'faqSlideOut 0.5s ease-out forwards' : 'faqSlideIn 0.5s ease-out forwards', animationDelay: isFAQClosing ? '0s' : '0.2s', opacity: isFAQClosing ? 1 : 0 }}>
            <button
              onClick={() => setExpandedFAQs(prev =>
                prev.includes(3) ? prev.filter(id => id !== 3) : [...prev, 3]
              )}
              className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#ebe3dd] to-[#e0d2c8] hover:from-[#e0d2c8] hover:to-[#d5c4b8] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c0a896] to-[#b59984] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">?</span>
                </div>
                <span className="font-bold text-sm text-stone-900">What do the badge colors mean?</span>
              </div>
              <svg className={`w-5 h-5 text-stone-600 transition-transform duration-300 ${expandedFAQs.includes(3) ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${expandedFAQs.includes(3) ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden'}`}>
              <div className="p-4 bg-[#ebe3dd] animate-in slide-in-from-left duration-300">
                <div className="text-sm text-stone-600 space-y-2">
                  <p><strong className="text-gray-600">Gray:</strong> Question not yet verified</p>
                  <p><strong className="text-green-600">Green:</strong> Verified with full marks</p>
                  <p><strong className="text-yellow-600">Yellow:</strong> Verified with partial marks</p>
                  <p><strong className="text-red-600">Red:</strong> Verified with zero marks</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ 4 - Edit reasoning */}
          <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xl" style={{ animation: isFAQClosing ? 'faqSlideOut 0.5s ease-out forwards' : 'faqSlideIn 0.5s ease-out forwards', animationDelay: isFAQClosing ? '0s' : '0.25s', opacity: isFAQClosing ? 1 : 0 }}>
            <button
              onClick={() => setExpandedFAQs(prev =>
                prev.includes(4) ? prev.filter(id => id !== 4) : [...prev, 4]
              )}
              className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#ebe3dd] to-[#e0d2c8] hover:from-[#e0d2c8] hover:to-[#d5c4b8] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c0a896] to-[#b59984] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">?</span>
                </div>
                <span className="font-bold text-sm text-stone-900">Can I edit the AI reasoning?</span>
              </div>
              <svg className={`w-5 h-5 text-stone-600 transition-transform duration-300 ${expandedFAQs.includes(4) ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${expandedFAQs.includes(4) ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden'}`}>
              <div className="p-4 bg-[#ebe3dd] animate-in slide-in-from-left duration-300">
                <p className="text-sm text-stone-600">Yes! Click the pencil icon (✏️) in the Reasoning capsule header to edit the reasoning text. This is useful if you want to add notes or clarify the AI's explanation.</p>
              </div>
            </div>
          </div>

          {/* FAQ 5 - Keyboard shortcuts */}
          <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xl" style={{ animation: isFAQClosing ? 'faqSlideOut 0.5s ease-out forwards' : 'faqSlideIn 0.5s ease-out forwards', animationDelay: isFAQClosing ? '0s' : '0.3s', opacity: isFAQClosing ? 1 : 0 }}>
            <button
              onClick={() => setExpandedFAQs(prev =>
                prev.includes(5) ? prev.filter(id => id !== 5) : [...prev, 5]
              )}
              className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#ebe3dd] to-[#e0d2c8] hover:from-[#e0d2c8] hover:to-[#d5c4b8] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c0a896] to-[#b59984] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">?</span>
                </div>
                <span className="font-bold text-sm text-stone-900">What are the keyboard shortcuts?</span>
              </div>
              <svg className={`w-5 h-5 text-stone-600 transition-transform duration-300 ${expandedFAQs.includes(5) ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${expandedFAQs.includes(5) ? 'max-h-96 overflow-y-auto' : 'max-h-0 overflow-hidden'}`}>
              <div className="p-4 bg-[#ebe3dd] animate-in slide-in-from-left duration-300">
                <div className="text-sm text-stone-600 space-y-2">
                  <p><strong>↑ Up Arrow:</strong> Navigate to previous question</p>
                  <p><strong>↓ Down Arrow:</strong> Navigate to next question</p>
                  <p><strong>← Left Arrow:</strong> Go to previous submission</p>
                  <p><strong>→ Right Arrow:</strong> Go to next submission</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnswerSheetView;
