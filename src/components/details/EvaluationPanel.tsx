
import React from 'react';
import type { Evaluation, QuestionFeedback } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import QuestionFeedbackCard from './QuestionFeedbackCard';
import { Download, ThumbsDown, Check } from '../icons';

interface EvaluationPanelProps {
    evaluation: Evaluation;
    details: QuestionFeedback[];
}

const EvaluationPanel: React.FC<EvaluationPanelProps> = ({ evaluation, details }) => {
    const totalScore = details.reduce((sum, q) => sum + q.score, 0);
    const maxScore = details.reduce((sum, q) => sum + q.maxScore, 0);
    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    
    const getScoreColor = (p: number) => {
        if (p >= 90) return 'text-emerald-600 bg-emerald-100 border-emerald-200';
        if (p >= 70) return 'text-stone-700 bg-stone-200 border-stone-300';
        return 'text-red-600 bg-red-100 border-red-200';
    }

    return (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm sticky top-28">
            <div className="p-6 border-b border-stone-100">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-stone-900">{evaluation.title}</h3>
                        <p className="text-sm text-stone-500">{evaluation.student} - {evaluation.subject}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${getScoreColor(percentage)}`}>
                        {percentage}%
                    </div>
                </div>
                <div className="mt-4">
                    <StatusBadge status={evaluation.status} />
                </div>
            </div>
            
            <div className="p-6 space-y-3 bg-[#F9F6F3]/50">
                 <h4 className="text-sm font-semibold text-stone-600">AI Feedback Summary</h4>
                 <p className="text-sm text-stone-700 bg-stone-100 p-3 rounded-lg border border-stone-200">The student shows a good grasp of foundational concepts but struggled with application-based questions. Key areas for improvement include date recall and understanding nuanced historical conflicts.</p>
            </div>

            <div className="max-h-[calc(100vh-32rem)] overflow-y-auto">
                <div className="p-6 space-y-4">
                    <h4 className="text-sm font-semibold text-stone-600">Question Breakdown</h4>
                    {details.map(q => <QuestionFeedbackCard key={q.questionNumber} feedback={q} />)}
                </div>
            </div>

            <div className="p-6 border-t border-stone-100 flex flex-col gap-3">
                 <div className="flex gap-3">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
                        <Check className="w-4 h-4" />
                        <span>Approve Grading</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
                        <ThumbsDown className="w-4 h-4" />
                        <span>Flag for Review</span>
                    </button>
                 </div>
                 <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-sm font-medium rounded-xl transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                </button>
            </div>
        </div>
    );
};

export default EvaluationPanel;