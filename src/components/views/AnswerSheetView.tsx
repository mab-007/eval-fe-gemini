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
  const totalMarksAvailable = questions.reduce((sum, q) => sum + q.marks_available, 0);

  // Track if score was edited but partial marks weren't updated
  const [scoreEdited, setScoreEdited] = useState(false);
  const [showPartialMarksWarning, setShowPartialMarksWarning] = useState(false);
  const [dontUpdatePartialMarks, setDontUpdatePartialMarks] = useState(false);
  // Session-level flag to suppress partial marks warning for entire session
  const [suppressPartialMarksWarning, setSuppressPartialMarksWarning] = useState(false);

  // Ref for marks_available input to focus when updating partial marks
  const marksAvailableInputRef = useRef<HTMLInputElement>(null);

  // PDF dimensions: Increased width for better readability
  const PDF_WIDTH = 950;
  const PDF_HEIGHT = 1481;

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

  // Helper function to get badge style based on score and verification
  const getBadgeStyle = (scoreAwarded: number, marksAvailable: number, isVerified: boolean) => {
    // If not verified, always show gray
    if (!isVerified) {
      return {
        color: 'bg-gray-400/90',
        fillColor: '#9ca3af', // gray-400
        shape: scoreAwarded === 0 ? 'triangle' : scoreAwarded === marksAvailable ? 'star' : 'circle'
      };
    }

    // Verified badges show their respective colors
    if (scoreAwarded === 0) {
      // Wrong - Red Triangle
      return {
        color: 'bg-red-400/90',
        fillColor: '#f87171', // red-400
        shape: 'triangle'
      };
    }
    if (scoreAwarded === marksAvailable) {
      // Correct - Green Star
      return {
        color: 'bg-emerald-400/90',
        fillColor: '#34d399', // emerald-400
        shape: 'star'
      };
    }
    // Partial - Yellow Circle
    return {
      color: 'bg-amber-400/90',
      fillColor: '#fbbf24', // amber-400
      shape: 'circle'
    };
  };

  const handleBadgeClick = (question: QuestionSummary) => {
    setSelectedQuestion(question);
    setIsEditingScore(false);
    setEditedScoreAwarded(question.score_awarded);
    setEditedMarksAvailable(question.marks_available);
    setEditedPartsBreakdown(question.parts_breakdown || []);
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

  const handleVerifyQuestion = (e: React.MouseEvent, questionNumber: number) => {
    e.stopPropagation();
    // Update the question's is_verified status
    const updatedQuestions = questions.map(q =>
      q.question_number === questionNumber
        ? { ...q, is_verified: true }
        : q
    );
    setQuestions(updatedQuestions);

    // Mark as having unsaved changes if in review mode
    if (isReviewMode) {
      setHasUnsavedChanges(true);
    }

    // Scroll to next unverified question
    setTimeout(() => {
      // First, try to find the next unverified question after the current one
      let nextUnverified = updatedQuestions.find(
        q => !q.is_verified && q.question_number > questionNumber
      );

      // If no unverified question found after current, look for any unverified from the beginning
      if (!nextUnverified) {
        nextUnverified = updatedQuestions.find(q => !q.is_verified);
      }

      if (nextUnverified) {
        // Find the badge element for the next unverified question
        const badgeElement = document.querySelector(`[data-question-number="${nextUnverified.question_number}"]`);
        if (badgeElement) {
          badgeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        }
      }
    }, 300); // Small delay to allow state update
  };

  const handleEditBadge = (e: React.MouseEvent, question: QuestionSummary) => {
    e.stopPropagation();
    handleBadgeClick(question);
  };

  const handleMilestoneClick = (question: QuestionSummary) => {
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
        description: description || `Evaluation completed for ${studentName}`
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
    setQuestions(evaluationReport.questions || []);
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
  }, [evaluationReport]);

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
    showPartialMarksWarning
  ]);

  return (
    <>
      <div className="animate-in -mx-6 lg:-mx-8">
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
          </div>
        </div>

        {/* Main Content - PDF pages stacked vertically with Progress Bar */}
        <div className="flex justify-center gap-12 bg-gradient-to-b from-stone-50 to-stone-100 py-8 px-8">
          {/* PDF Container */}
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
                          <div className="relative w-16 flex flex-col items-center gap-1">
                            <button
                              onClick={() => handleBadgeClick(question)}
                              className="relative w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                              title={`Question ${question.question_number}: ${question.score_awarded}/${question.marks_available}`}
                            >
                              <svg width="48" height="48" viewBox="0 0 48 48" className="absolute inset-0" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}>
                                <polygon
                                  points="24,6 44,42 4,42"
                                  fill={badgeStyle.fillColor}
                                  opacity="0.9"
                                />
                              </svg>
                              <span className="text-xs font-bold text-white relative z-10 mt-2">{question.score_awarded}/{question.marks_available}</span>
                            </button>

                            {/* Action Icons - Only show for non-Graded OR in review mode */}
                            {(!isGraded || isReviewMode) && (
                              <div className="flex gap-1.5 bg-white/90 rounded-full px-2 py-1 shadow-sm">
                                <button
                                  onClick={(e) => handleVerifyQuestion(e, question.question_number)}
                                  className={`p-0.5 rounded-full transition-colors ${isVerified ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                                  title={isVerified ? "Verified" : "Click to verify"}
                                  disabled={isVerified}
                                >
                                  <CheckCircle className="w-5 h-5" fill={isVerified ? "currentColor" : "none"} />
                                </button>
                                <button
                                  onClick={(e) => handleEditBadge(e, question)}
                                  className="p-0.5 rounded-full text-amber-600 hover:text-amber-700 transition-colors"
                                  title="Edit score"
                                >
                                  <Pencil className="w-5 h-5" />
                                </button>
                              </div>
                            )}
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
                          <div className="relative w-16 flex flex-col items-center gap-1">
                            <button
                              onClick={() => handleBadgeClick(question)}
                              className="relative w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
                              title={`Question ${question.question_number}: ${question.score_awarded}/${question.marks_available}`}
                            >
                              <svg width="48" height="48" viewBox="0 0 48 48" className="absolute inset-0" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}>
                                <path
                                  d="M24 4 L28.5 18.5 L44 18.5 L31.5 28 L36 42 L24 33 L12 42 L16.5 28 L4 18.5 L19.5 18.5 Z"
                                  fill={badgeStyle.fillColor}
                                  opacity="0.9"
                                />
                              </svg>
                              <span className="text-xs font-bold text-white relative z-10">{question.score_awarded}/{question.marks_available}</span>
                            </button>

                            {/* Action Icons - Only show for non-Graded OR in review mode */}
                            {(!isGraded || isReviewMode) && (
                              <div className="flex gap-1.5 bg-white/90 rounded-full px-2 py-1 shadow-sm">
                                <button
                                  onClick={(e) => handleVerifyQuestion(e, question.question_number)}
                                  className={`p-0.5 rounded-full transition-colors ${isVerified ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                                  title={isVerified ? "Verified" : "Click to verify"}
                                  disabled={isVerified}
                                >
                                  <CheckCircle className="w-5 h-5" fill={isVerified ? "currentColor" : "none"} />
                                </button>
                                <button
                                  onClick={(e) => handleEditBadge(e, question)}
                                  className="p-0.5 rounded-full text-amber-600 hover:text-amber-700 transition-colors"
                                  title="Edit score"
                                >
                                  <Pencil className="w-5 h-5" />
                                </button>
                              </div>
                            )}
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
                          <div className="relative w-16 flex flex-col items-center gap-1">
                            <button
                              onClick={() => handleBadgeClick(question)}
                              className={`${badgeStyle.color} text-white text-xs font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                              title={`Question ${question.question_number}: ${question.score_awarded}/${question.marks_available}`}
                            >
                              <span className="text-xs">{question.score_awarded}/{question.marks_available}</span>
                            </button>

                            {/* Action Icons - Only show for non-Graded OR in review mode */}
                            {(!isGraded || isReviewMode) && (
                              <div className="flex gap-1.5 bg-white/90 rounded-full px-2 py-1 shadow-sm">
                                <button
                                  onClick={(e) => handleVerifyQuestion(e, question.question_number)}
                                  className={`p-0.5 rounded-full transition-colors ${isVerified ? 'text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                                  title={isVerified ? "Verified" : "Click to verify"}
                                  disabled={isVerified}
                                >
                                  <CheckCircle className="w-5 h-5" fill={isVerified ? "currentColor" : "none"} />
                                </button>
                                <button
                                  onClick={(e) => handleEditBadge(e, question)}
                                  className="p-0.5 rounded-full text-amber-600 hover:text-amber-700 transition-colors"
                                  title="Edit score"
                                >
                                  <Pencil className="w-5 h-5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>

          {/* Progress Bar - Cylindrical with Milestones */}
          <div className="sticky top-8 h-fit">
            <div className="flex flex-col items-center">
              {/* Progress Header */}
              <div className="mb-4 text-center">
                <div className="text-sm font-bold text-stone-700">Progress</div>
                <div className="text-xs text-stone-500 mt-1">
                  {verifiedQuestionsCount} / {questions.length} verified
                </div>
              </div>

              {/* Cylindrical Progress Bar */}
              <div className="relative flex flex-col items-center">
                {/* Vertical Cylinder Track */}
                <div
                  className="relative w-3 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300 rounded-full shadow-inner"
                  style={{
                    height: `${Math.max(questions.length * 60, 300)}px`,
                  }}
                >
                  {/* Progress Fill */}
                  <div
                    className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-lg"
                    style={{
                      height: `${(verifiedQuestionsCount / questions.length) * 100}%`,
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full"></div>
                  </div>
                </div>

                {/* Question Milestones */}
                <div
                  className="absolute inset-0 flex flex-col justify-between py-1"
                  style={{
                    height: `${Math.max(questions.length * 60, 300)}px`,
                  }}
                >
                  {questions.map((question, index) => {
                    const isVerified = question.is_verified || false;
                    const progress = (verifiedQuestionsCount / questions.length) * 100;
                    const milestonePosition = ((index) / (questions.length - 1)) * 100;
                    const isReached = progress >= milestonePosition;

                    return (
                      <div
                        key={question.question_number}
                        className="flex items-center gap-3 relative"
                        style={{
                          position: 'absolute',
                          top: `${(index / (questions.length - 1)) * 100}%`,
                          transform: 'translateY(-50%)',
                        }}
                      >
                        {/* Connector Line */}
                        <div className="absolute left-1/2 w-6 h-0.5 bg-stone-300"></div>

                        {/* Milestone Circle */}
                        <div className="relative z-10">
                          <button
                            onClick={() => handleMilestoneClick(question)}
                            className={`
                              w-8 h-8 rounded-full border-3 flex items-center justify-center text-xs font-bold
                              transition-all duration-500 ease-out shadow-md cursor-pointer
                              hover:scale-125 active:scale-105
                              ${isVerified
                                ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-500 text-white scale-110 shadow-emerald-300'
                                : isReached
                                ? 'bg-gradient-to-br from-stone-200 to-stone-300 border-stone-400 text-stone-600'
                                : 'bg-white border-stone-300 text-stone-400'
                              }
                            `}
                            style={{ borderWidth: '3px' }}
                            title={`Jump to Question ${question.question_number}`}
                          >
                            {isVerified ? (
                              <CheckCircle className="w-5 h-5" fill="currentColor" />
                            ) : (
                              <span>{question.question_number}</span>
                            )}
                          </button>
                        </div>

                        {/* Question Number Label */}
                        <button
                          onClick={() => handleMilestoneClick(question)}
                          className={`
                            text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap
                            transition-all duration-300 cursor-pointer hover:scale-105
                            ${isVerified
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200'
                              : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200'
                            }
                          `}
                          title={`Jump to Question ${question.question_number}`}
                        >
                          Q{question.question_number}
                          {isVerified && (
                            <span className="ml-1 text-emerald-500">✓</span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Completion Badge */}
                {verifiedQuestionsCount === questions.length && (
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 animate-in fade-in zoom-in duration-500">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" fill="currentColor" />
                      Complete!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Running Total - Fixed Center Right (Outside main container) */}
      <div className="fixed top-2/3 right-6 -translate-y-2/3 z-[9997] pointer-events-none">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-blue-400 pointer-events-auto">
          <div className="text-xs font-semibold text-blue-100 uppercase tracking-wide mb-1">Running Total</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{totalScore}</span>
            <span className="text-lg font-medium text-blue-100">/</span>
            <span className="text-2xl font-semibold text-blue-100">{totalMarksAvailable}</span>
          </div>
          <div className="text-xs text-blue-100 mt-2">
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
        <div className="fixed bottom-4 left-4 w-full md:w-[500px] max-w-[calc(100vw-2rem)] h-[70vh] max-h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-2xl z-[9999] animate-in slide-in-from-bottom-8 duration-300">
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
                                onChange={(e) => setEditedScoreAwarded(Number(e.target.value))}
                                className="w-20 text-center text-sm font-bold text-stone-700 bg-stone-50 border border-stone-300 focus:border-stone-600 focus:ring-1 focus:ring-stone-600 focus:outline-none px-2 py-1.5 rounded [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                style={{ MozAppearance: 'textfield' }}
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-medium text-stone-600">Total Marks:</label>
                              <input
                                ref={marksAvailableInputRef}
                                type="number"
                                min="0"
                                value={editedMarksAvailable}
                                onChange={(e) => setEditedMarksAvailable(Number(e.target.value))}
                                className="w-20 text-center text-sm font-bold text-stone-700 bg-stone-50 border border-stone-300 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none px-2 py-1.5 rounded [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                style={{ MozAppearance: 'textfield' }}
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
          <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-in zoom-in duration-500 relative overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 opacity-50" />

              {/* Content */}
              <div className="relative z-10">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <CheckCircle className="w-12 h-12 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Review Complete! 🎉
                </h2>

                {/* Subheading */}
                <p className="text-lg text-center text-stone-600 mb-2 font-semibold">
                  Excellent Work!
                </p>

                {/* Message */}
                <p className="text-center text-stone-500 mb-6 leading-relaxed">
                  You've successfully verified all <span className="font-bold text-emerald-600">{questions.length} questions</span> for {studentName}.
                  Your thorough review ensures accurate and fair grading.
                </p>

                {/* Stats */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 mb-6 border border-emerald-200">
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{questions.length}</div>
                      <div className="text-xs text-stone-600 mt-1">Questions</div>
                    </div>
                    <div className="w-px h-12 bg-emerald-200" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">100%</div>
                      <div className="text-xs text-stone-600 mt-1">Verified</div>
                    </div>
                    <div className="w-px h-12 bg-emerald-200" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{totalScore}/{totalMarksAvailable}</div>
                      <div className="text-xs text-stone-600 mt-1">Total Marks</div>
                    </div>
                    <div className="w-px h-12 bg-emerald-200" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">✓</div>
                      <div className="text-xs text-stone-600 mt-1">Complete</div>
                    </div>
                  </div>
                </div>

                {/* Appreciation Message */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-center text-blue-800 italic">
                    "Your dedication to thorough evaluation helps students learn and grow.
                    Thank you for your commitment to educational excellence!"
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowCelebration(false)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Continue Review
                    </button>
                    <button
                      onClick={onBack}
                      className="flex-1 bg-white hover:bg-stone-50 text-stone-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 border-2 border-stone-200 hover:border-stone-300"
                    >
                      Back to List
                    </button>
                  </div>

                  {/* Verification Status */}
                  {isVerifying && (
                    <div className="w-full bg-blue-50 text-blue-700 font-medium py-2.5 px-6 rounded-xl border border-blue-200 flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting verification...
                    </div>
                  )}

                  {verificationError && (
                    <div className="w-full bg-red-50 text-red-700 font-medium py-2.5 px-6 rounded-xl border border-red-200 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {verificationError}
                    </div>
                  )}

                  {!isVerifying && !verificationError && (
                    <div className="w-full bg-emerald-50 text-emerald-700 font-medium py-2.5 px-6 rounded-xl border border-emerald-200 flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" fill="currentColor" />
                      Verification submitted successfully!
                    </div>
                  )}
                </div>
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
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in duration-300">
              {/* Warning Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-stone-900 text-center mb-3">
                Unsaved Changes
              </h3>

              {/* Message */}
              <p className="text-sm text-stone-600 text-center mb-6 leading-relaxed">
                You have unsaved changes in your review. If you go back now, your review changes will be discarded.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSaveAndBack}
                  disabled={isVerifying}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Save Changes & Go Back
                    </>
                  )}
                </button>
                <button
                  onClick={handleDiscardChanges}
                  disabled={isVerifying}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-red-200 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Discard Changes
                </button>
                <button
                  onClick={() => setShowUnsavedChangesModal(false)}
                  disabled={isVerifying}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium py-2.5 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AnswerSheetView;
