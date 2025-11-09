import React, { useState } from 'react';
import type { Evaluation, QuestionFeedback } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import QuestionFeedbackCard from './QuestionFeedbackCard';
import { Download, ThumbsDown, Check, UserCheck } from '../icons';

interface EvaluationPanelProps {
    evaluation: Evaluation;
    evaluationReport: {
        overall_score: number;
        total_possible_score: number;
        overall_feedback: string;
    };
    details: QuestionFeedback[];
    selectedQuestion: QuestionFeedback | null;
    onQuestionSelect: (question: QuestionFeedback) => void;
    onDetailsUpdate: (question: QuestionFeedback) => void;
}

type FilterType = 'all' | 'review' | 'help';

const EvaluationPanel: React.FC<EvaluationPanelProps> = ({ evaluation, evaluationReport, details, selectedQuestion, onQuestionSelect, onDetailsUpdate }) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    
    const percentage = evaluationReport.total_possible_score > 0 
        ? Math.round((evaluationReport.overall_score / evaluationReport.total_possible_score) * 100) 
        : 0;
    
    const getScoreColor = (p: number) => {
        if (p >= 90) return 'text-emerald-600 bg-emerald-100 border-emerald-200';
        if (p >= 70) return 'text-stone-700 bg-stone-200 border-stone-300';
        return 'text-red-600 bg-red-100 border-red-200';
    }

    const filteredDetails = details.filter(q => {
        if (activeFilter === 'review') {
            return q.aiConfidence === 'Low' || q.aiConfidence === 'Medium' || q.aiConfidence === 'low' || q.aiConfidence === 'medium';
        }
        if (activeFilter === 'help') {
            return q.maxScore > 0 && (q.score / q.maxScore) * 100 < 30;
        }
        return true; // 'all'
    });

    const humanReviewedCount = details.filter(q => q.isEdited).length;

    const FilterButton: React.FC<{label: string, type: FilterType}> = ({ label, type }) => (
        <button 
            onClick={() => setActiveFilter(type)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeFilter === type 
                ? 'bg-[#AB896A] text-white' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm sticky top-28">
            <div className="p-6 border-b border-stone-100">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-stone-900">{evaluation.title}</h3>
                        <p className="text-sm text-stone-500">{evaluation.student} - {evaluation.subject}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 transition-colors ${getScoreColor(percentage)}`}>
                        {percentage}%
                    </div>
                </div>
                <div className="mt-4">
                    <StatusBadge status={evaluation.status} />
                </div>
            </div>
            
            <div className="p-6 space-y-3 bg-[#F9F6F3]/50 border-b border-stone-100">
                 <h4 className="text-sm font-semibold text-stone-600">AI Feedback Summary</h4>
                 <p className="text-sm text-stone-700 whitespace-pre-wrap">{evaluationReport.overall_feedback}</p>
            </div>

            <div className="p-6 border-b border-stone-100">
                 <h4 className="text-sm font-semibold text-stone-600 mb-3">Action Center Filters</h4>
                 <div className="flex items-center gap-2">
                    <FilterButton label="All Questions" type="all" />
                    <FilterButton label="Needs Review" type="review" />
                    <FilterButton label="Student Needs Help" type="help" />
                 </div>
            </div>

            <div className="max-h-[calc(100vh-42rem)] overflow-y-auto bg-[#F9F6F3]/50">
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-stone-600">Question Breakdown</h4>
                        {humanReviewedCount > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-100 px-2 py-1 rounded-md">
                                <UserCheck className="w-4 h-4" />
                                <span>{humanReviewedCount} / {details.length} Reviewed</span>
                            </div>
                         )}
                    </div>
                    {filteredDetails.map(q => 
                        <QuestionFeedbackCard 
                            key={q.questionNumber} 
                            feedback={q}
                            isSelected={selectedQuestion?.questionNumber === q.questionNumber}
                            onSelect={() => onQuestionSelect(q)}
                            onUpdate={onDetailsUpdate}
                        />
                    )}
                     {filteredDetails.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-sm font-medium text-stone-600">No Questions Match</p>
                            <p className="text-xs text-stone-400 mt-1">Try selecting a different filter.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 border-t border-stone-200 flex flex-col gap-3">
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