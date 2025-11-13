
import React, { useState, useEffect } from 'react';
import type { QuestionFeedback, AiConfidence, Mistake } from '../../types';
import { CheckCircle2, XCircle, UserCheck, MessageSquare, ThumbsUp, ThumbsDown, ChevronDown } from '../icons';

interface QuestionFeedbackCardProps {
    feedback: QuestionFeedback;
    isSelected: boolean;
    selectedMistake: Mistake | null;
    onSelect: () => void;
    onMistakeSelect: (mistake: Mistake | null) => void;
    onUpdate: (feedback: QuestionFeedback) => void;
}

const AiConfidenceBadge: React.FC<{ confidence: AiConfidence }> = ({ confidence }) => {
    const formattedConfidence = confidence.charAt(0).toUpperCase() + confidence.slice(1);
    const confidenceStyles: Record<string, string> = {
        High: 'bg-emerald-100 text-emerald-700',
        Medium: 'bg-amber-100 text-amber-700',
        Low: 'bg-red-100 text-red-700',
    };
    return (
        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${confidenceStyles[formattedConfidence]}`}>
            {formattedConfidence} Confidence
        </span>
    );
};

const DetailSection: React.FC<{ title: string; children: React.ReactNode; notFound?: boolean }> = ({ title, children, notFound }) => (
    <div>
        <h6 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">{title}</h6>
        {notFound ? (
            <p className="text-sm text-stone-400 italic">Not attempted by student.</p>
        ) : (
            <div className="text-sm text-stone-700 space-y-1">{children}</div>
        )}
    </div>
);


const QuestionFeedbackCard: React.FC<QuestionFeedbackCardProps> = ({ feedback, isSelected, selectedMistake, onSelect, onMistakeSelect, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    const [editedScore, setEditedScore] = useState(feedback.score);
    const [editedComment, setEditedComment] = useState(feedback.studentComment || '');
    
    useEffect(() => {
        if (!isEditing) {
            setEditedScore(feedback.score);
            setEditedComment(feedback.studentComment || '');
        }
    }, [isEditing, feedback]);

    const handleTotalScoreChange = (newScore: number) => {
        const clampedScore = Math.max(0, Math.min(newScore, feedback.maxScore));
        if (!isNaN(clampedScore)) {
            setEditedScore(clampedScore);
        }
    };

    const handleSave = () => {
        onUpdate({
            ...feedback,
            score: editedScore,
            isCorrect: editedScore === feedback.maxScore,
            studentComment: editedComment,
            isEdited: true,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleToggleEdit = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        setIsEditing(true);
    };
    
    const handleCardClick = () => {
        if (isEditing) return;
        onSelect();
    }
    
    const isSkipped = feedback.studentAnswer === "not found" || feedback.studentAnswer === "X";

    return (
        <div 
            onClick={handleCardClick}
            className={`border rounded-xl p-4 transition-all duration-300 bg-white ${
                isSelected 
                    ? 'shadow-lg border-[#AB896A]' 
                    : isEditing 
                    ? 'shadow-lg border-stone-300' 
                    : 'border-stone-200 hover:border-stone-300 hover:shadow-md'
            } ${isEditing ? 'cursor-default' : 'cursor-pointer'}`}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                    <h5 className="font-bold text-sm text-stone-800">Question {feedback.questionNumber}</h5>
                    {feedback.isEdited && <span title="Human verified"><UserCheck className="w-4 h-4 text-emerald-600" /></span>}
                </div>
            </div>
            <div className="font-bold text-sm text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
                {feedback.score} / {feedback.maxScore}
            </div>

            <div className="pl-6">
                <p className="text-sm text-stone-600 mb-3">{feedback.feedback}</p>
                <div className="flex items-center justify-between">
                    <AiConfidenceBadge confidence={feedback.aiConfidence} />
                     {!isSelected && <ChevronDown className="w-4 h-4 text-stone-400" />}
                </div>
            </div>
            
            {/* --- EXPANDED DETAILS --- */}
            {isSelected && !isEditing && (
                <div className="pt-4 mt-4 border-t border-stone-200/70 space-y-4 animate-in" onClick={e => e.stopPropagation()}>
                    <DetailSection title="Question Summary"><p>{feedback.questionSummary}</p></DetailSection>
                    <DetailSection title="Student's Answer" notFound={isSkipped}><p className="whitespace-pre-wrap font-mono text-xs bg-stone-100 p-2 rounded">{feedback.studentAnswer}</p></DetailSection>
                    <DetailSection title="Ideal Approach"><p>{feedback.idealApproach}</p></DetailSection>
                    
                    {feedback.mistakesMade.length > 0 && (
                        <DetailSection title="Mistakes Identified">
                            <ul className="list-disc pl-5 space-y-1">
                                {feedback.mistakesMade.map((mistake, index) => (
                                    <li 
                                        key={index} 
                                        onClick={() => onMistakeSelect(mistake === selectedMistake ? null : mistake)}
                                        className={`cursor-pointer transition-colors ${
                                            selectedMistake === mistake
                                                ? 'text-red-700 font-semibold'
                                                : 'text-red-700/80 hover:text-red-600'
                                        }`}>
                                            {mistake.mistake_description} <span className="font-semibold">({mistake.marks_lost} marks lost)</span>
                                    </li>
                                ))}
                            </ul>
                        </DetailSection>
                    )}

                    <div className="pt-2 flex justify-end">
                         <button onClick={handleToggleEdit} className="text-sm font-medium text-[#AB896A] hover:underline">Override Score & Add Comment</button>
                    </div>
                </div>
            )}


            {/* --- EDITING UI --- */}
            {isEditing && (
                <div className="bg-stone-50 rounded-lg border border-stone-200/80 p-4 mt-4 space-y-4 animate-in cursor-auto" onClick={e => e.stopPropagation()}>
                    <DetailSection title="Marking Scheme"><p className="italic">{feedback.markingScheme}</p></DetailSection>
                    
                    <div className="space-y-3 pt-3 border-t border-stone-200">
                        <h6 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Score Override</h6>
                         <div className="flex items-center justify-between">
                            <label htmlFor="total-score" className="text-sm font-bold text-stone-800">Total Score</label>
                            <div className="flex items-center gap-2">
                                <input type="number" step="0.5" id="total-score" value={editedScore} onChange={(e) => handleTotalScoreChange(parseFloat(e.target.value))} className="w-20 p-1.5 text-center bg-white border border-stone-300 rounded-md font-bold focus:outline-none focus:ring-1 focus:ring-[#AB896A]" min="0" max={feedback.maxScore} />
                                <span className="text-sm font-bold text-stone-500">/ {feedback.maxScore}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-stone-200">
                        <label htmlFor="student-comment" className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider"><MessageSquare className="w-3.5 h-3.5" />Comment for Student</label>
                        <textarea id="student-comment" value={editedComment} onChange={e => setEditedComment(e.target.value)} placeholder="Provide qualitative feedback for the student..." className="w-full p-2 text-sm bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#AB896A] min-h-[60px]"></textarea>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-stone-200">
                        <h6 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Feedback for AI</h6>
                        <div className="flex gap-2">
                             <button className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold p-2 rounded-lg bg-emerald-100/50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/50 hover:border-emerald-200 transition-colors"><ThumbsUp className="w-3.5 h-3.5" />AI was helpful</button>
                             <button className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold p-2 rounded-lg bg-red-100/50 text-red-700 hover:bg-red-100 border border-red-200/50 hover:border-red-200 transition-colors"><ThumbsDown className="w-3.5 h-3.5" />AI was incorrect</button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button onClick={handleCancel} className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-200 hover:bg-stone-300/80 rounded-lg transition-colors">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-white bg-[#AB896A] hover:bg-[#9a7b5f] rounded-lg transition-colors">Save Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionFeedbackCard;
