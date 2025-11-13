import React from 'react';

interface AiFeedbackSummaryProps {
  feedback: string;
}

const AiFeedbackSummary: React.FC<AiFeedbackSummaryProps> = ({ feedback }) => {
  return (
    <div className="p-6 space-y-3 bg-white rounded-2xl border border-stone-200 shadow-sm">
      <h4 className="text-sm font-semibold text-stone-600">AI Feedback Summary</h4>
      <p className="text-sm text-stone-700 whitespace-pre-wrap">{feedback}</p>
    </div>
  );
};

export default AiFeedbackSummary;