import React, { useState } from 'react';
import type { Evaluation, QuestionFeedback, Mistake } from '../../types';
import { DETAILED_EVALUATION_DATA, MOCK_DETAILED_QUESTIONS } from '../../constants';
import { ArrowLeft } from '../icons';
import PdfViewer from '../details/PdfViewer';
import EvaluationPanel from '../details/EvaluationPanel';
import AiFeedbackSummary from './AiFeedbackSummary';

interface EvaluationDetailViewProps {
  evaluation: Evaluation;
  onBack: () => void;
}

const EvaluationDetailView: React.FC<EvaluationDetailViewProps> = ({ evaluation, onBack }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionFeedback | null>(null);
  const [details, setDetails] = useState<QuestionFeedback[]>(MOCK_DETAILED_QUESTIONS);
  const [selectedMistake, setSelectedMistake] = useState<Mistake | null>(null);

  const handleDetailsUpdate = (updatedQuestion: QuestionFeedback) => {
    setDetails(prevDetails =>
      prevDetails.map(q =>
        (q.questionNumber === updatedQuestion.questionNumber && q.componentId === updatedQuestion.componentId) 
          ? updatedQuestion 
          : q
      )
    );
    // Also update the selected question if it's the one being edited
    if (selectedQuestion?.questionNumber === updatedQuestion.questionNumber && selectedQuestion?.componentId === updatedQuestion.componentId) {
        setSelectedQuestion(updatedQuestion);
    }
  };

  const handleQuestionSelect = (question: QuestionFeedback) => {
    // If the same question is clicked again, deselect it. Otherwise, select the new one.
    setSelectedQuestion(prev => 
      (prev?.questionNumber === question.questionNumber && prev?.componentId === question.componentId)
        ? null 
        : question
    );
    setSelectedMistake(null); // Reset mistake selection when a new question is selected
  };

  return (
    <div className="animate-in">
      <div className="mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Evaluations
        </button>
      </div>

      <div className="space-y-8">
        {/* Row 1: AI Feedback Summary */}
        <AiFeedbackSummary feedback={DETAILED_EVALUATION_DATA.evaluation_report.overall_feedback} />

        {/* Row 2: PDF Viewer and Evaluation Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
              <PdfViewer 
                pdfUrl={DETAILED_EVALUATION_DATA.download_url}
                pageNumber={selectedMistake?.page_number ?? selectedQuestion?.pageNumber}
                x={selectedMistake?.x_coordinate ?? selectedQuestion?.x_coordinate}
                y={selectedMistake?.y_coordinate ?? selectedQuestion?.y_coordinate}
                markerColor={selectedMistake ? 'bg-red-500' : 'bg-yellow-400'}
              />
          </div>
          <div className="lg:col-span-1">
              <EvaluationPanel 
                evaluation={evaluation} 
                evaluationReport={DETAILED_EVALUATION_DATA.evaluation_report}
                details={details}
                onDetailsUpdate={handleDetailsUpdate}
                selectedQuestion={selectedQuestion}
                selectedMistake={selectedMistake}
                onMistakeSelect={setSelectedMistake}
                onQuestionSelect={handleQuestionSelect}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationDetailView;
