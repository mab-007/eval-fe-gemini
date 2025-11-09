
import React from 'react';
import type { QuestionFeedback } from '../../types';
import { CheckCircle2, XCircle } from '../icons';

interface QuestionFeedbackCardProps {
    feedback: QuestionFeedback;
}

const QuestionFeedbackCard: React.FC<QuestionFeedbackCardProps> = ({ feedback }) => {
    return (
        <div className="border border-stone-200 rounded-xl p-4 transition-all hover:border-stone-300 hover:bg-stone-50/50">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    {feedback.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <h5 className="font-bold text-sm text-stone-800">Question {feedback.questionNumber}</h5>
                </div>
                <div className="font-bold text-sm text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
                    {feedback.score} / {feedback.maxScore}
                </div>
            </div>
            <p className="text-sm text-stone-600 mb-3 pl-6">{feedback.feedback}</p>
            <div className="pl-6">
                 <button className="text-xs font-medium text-[#AB896A] hover:underline">Override score</button>
            </div>
        </div>
    );
};

export default QuestionFeedbackCard;
