
import React, { useState, useEffect } from 'react';
import type { QuestionFeedback, QuestionFeedbackStep } from '../../types';
import { CheckCircle2, XCircle } from '../icons';

interface QuestionFeedbackCardProps {
    feedback: QuestionFeedback;
    isSelected: boolean;
    onSelect: () => void;
}

const QuestionFeedbackCard: React.FC<QuestionFeedbackCardProps> = ({ feedback: initialFeedback, isSelected, onSelect }) => {
    const [feedback, setFeedback] = useState(initialFeedback);
    const [isEditing, setIsEditing] = useState(false);
    
    const [editedScore, setEditedScore] = useState(feedback.score);
    const [editedSteps, setEditedSteps] = useState<QuestionFeedbackStep[]>(JSON.parse(JSON.stringify(feedback.steps || [])));

    useEffect(() => {
        setFeedback(initialFeedback);
    }, [initialFeedback]);

    useEffect(() => {
        if (!isEditing) {
            setEditedScore(feedback.score);
            setEditedSteps(JSON.parse(JSON.stringify(feedback.steps || [])));
        }
    }, [isEditing, feedback]);

    const handleStepScoreChange = (index: number, newScore: number) => {
        const newSteps = [...editedSteps];
        const clampedScore = Math.max(0, Math.min(newScore, newSteps[index].maxScore));
        
        if (!isNaN(clampedScore)) {
            newSteps[index] = { ...newSteps[index], score: clampedScore };
            setEditedSteps(newSteps);
            const newTotal = newSteps.reduce((sum, step) => sum + step.score, 0);
            setEditedScore(newTotal);
        }
    };
    
    const handleTotalScoreChange = (newScore: number) => {
        const clampedScore = Math.max(0, Math.min(newScore, feedback.maxScore));
        if (!isNaN(clampedScore)) {
            setEditedScore(clampedScore);
        }
    };

    const handleSave = () => {
        setFeedback({
            ...feedback,
            score: editedScore,
            steps: editedSteps,
            isCorrect: editedScore === feedback.maxScore,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedScore(feedback.score);
        setEditedSteps(JSON.parse(JSON.stringify(feedback.steps || [])));
        setIsEditing(false);
    };

    const handleToggleEdit = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card selection when clicking the button
        setIsEditing(!isEditing);
    };
    
    const handleCardClick = () => {
        if (isEditing) return; // Don't trigger select when in edit mode
        onSelect();
    }

    return (
        <div 
            onClick={handleCardClick}
            className={`border rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                isSelected 
                    ? 'bg-[#AB896A]/10 border-[#AB896A]' 
                    : isEditing 
                    ? 'bg-stone-50 border-stone-300 cursor-default' 
                    : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
            }`}
        >
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
            
            {!isEditing ? (
                <div className="pl-6">
                    <button onClick={handleToggleEdit} className="text-xs font-medium text-[#AB896A] hover:underline">Override score</button>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-stone-200 p-4 mt-4 space-y-4 animate-in cursor-auto">
                    <h6 className="text-xs font-bold text-stone-600 uppercase tracking-wider">Score Breakdown</h6>
                    
                    {editedSteps && editedSteps.length > 0 && (
                        <div className="space-y-2">
                            {editedSteps.map((step, index) => (
                                <div key={index} className="flex items-center justify-between gap-4">
                                    <label htmlFor={`step-${index}`} className="text-sm text-stone-600 flex-1 truncate">{step.description}</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            id={`step-${index}`}
                                            value={step.score}
                                            onChange={(e) => handleStepScoreChange(index, parseInt(e.target.value))}
                                            className="w-16 p-1 text-center bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#AB896A]"
                                            min="0"
                                            max={step.maxScore}
                                        />
                                        <span className="text-sm text-stone-400">/ {step.maxScore}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-stone-200/70">
                        <label htmlFor="total-score" className="text-sm font-bold text-stone-800">Total Score</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="total-score"
                                value={editedScore}
                                onChange={(e) => handleTotalScoreChange(parseInt(e.target.value))}
                                className="w-16 p-1 text-center bg-stone-100 border border-stone-300 rounded-md font-bold focus:outline-none focus:ring-1 focus:ring-[#AB896A]"
                                min="0"
                                max={feedback.maxScore}
                            />
                            <span className="text-sm font-bold text-stone-500">/ {feedback.maxScore}</span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button onClick={handleCancel} className="px-3 py-1.5 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button onClick={handleSave} className="px-3 py-1.5 text-xs font-semibold text-white bg-[#AB896A] hover:bg-[#9a7b5f] rounded-lg transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionFeedbackCard;
