import React, { useState } from 'react';
import type { Evaluation, QuestionFeedback } from '../../types';
import { DETAILED_EVALUATION_DATA, MOCK_DETAILED_QUESTIONS } from '../../constants';
import { ArrowLeft } from '../icons';
import PdfViewer from '../details/PdfViewer';
import EvaluationPanel from '../details/EvaluationPanel';

interface EvaluationDetailViewProps {
  evaluation: Evaluation;
  onBack: () => void;
}

const EvaluationDetailView: React.FC<EvaluationDetailViewProps> = ({ evaluation, onBack }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionFeedback | null>(null);
  const [details, setDetails] = useState<QuestionFeedback[]>(MOCK_DETAILED_QUESTIONS);

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
  };

  return (
    <div className="animate-in">
      <div className="mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Evaluations
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 space-y-8 lg:space-y-0">
        <div className="lg:col-span-2">
            <PdfViewer 
              pdfUrl={DETAILED_EVALUATION_DATA.download_url} 
              pageNumber={selectedQuestion?.pageNumber} 
            />
        </div>
        <div className="lg:col-span-1">
            <EvaluationPanel 
              evaluation={evaluation} 
              evaluationReport={DETAILED_EVALUATION_DATA.evaluation_report}
              details={details}
              onDetailsUpdate={handleDetailsUpdate}
              selectedQuestion={selectedQuestion}
              onQuestionSelect={handleQuestionSelect}
            />
        </div>
      </div>
    </div>
  );
};

export default EvaluationDetailView;
