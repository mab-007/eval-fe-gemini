
import React, { useState } from 'react';
import type { Evaluation, QuestionFeedback } from '../../types';
import { MOCK_EVALUATION_DETAIL } from '../../constants';
import { ArrowLeft } from '../icons';
import PdfViewer from '../details/PdfViewer';
import EvaluationPanel from '../details/EvaluationPanel';

interface EvaluationDetailViewProps {
  evaluation: Evaluation;
  onBack: () => void;
}

const EvaluationDetailView: React.FC<EvaluationDetailViewProps> = ({ evaluation, onBack }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionFeedback | null>(null);

  const handleQuestionSelect = (question: QuestionFeedback) => {
    // If the same question is clicked again, deselect it. Otherwise, select the new one.
    setSelectedQuestion(prev => (prev?.questionNumber === question.questionNumber ? null : question));
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
            <PdfViewer pageNumber={selectedQuestion?.pageNumber} />
        </div>
        <div className="lg:col-span-1">
            <EvaluationPanel 
              evaluation={evaluation} 
              details={MOCK_EVALUATION_DETAIL}
              selectedQuestion={selectedQuestion}
              onQuestionSelect={handleQuestionSelect}
            />
        </div>
      </div>
    </div>
  );
};

export default EvaluationDetailView;