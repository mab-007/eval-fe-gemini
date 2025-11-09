
import React from 'react';
import type { Evaluation } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import { FileText, MoreHorizontal } from '../icons';

interface EvaluationCardProps {
  item: Evaluation;
  onCardClick: (id: number) => void;
}

const EvaluationCard: React.FC<EvaluationCardProps> = ({ item, onCardClick }) => {
  return (
    <div onClick={() => onCardClick(item.id)} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F0EBE6] flex items-center justify-center text-[#AB896A] group-hover:bg-[#AB896A] group-hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 line-clamp-1">{item.title}</h4>
            <p className="text-xs text-stone-500 font-medium">{item.subject}</p>
          </div>
        </div>
        <button onClick={(e) => e.stopPropagation()} className="text-stone-400 hover:text-stone-700 p-1 hover:bg-stone-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Student</span>
          <span className="font-medium text-stone-900">{item.student}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-500">Date</span>
          <span className="text-stone-900">{item.date}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5 pt-4 border-t border-stone-100">
        <StatusBadge status={item.status} />
        {item.score ? (
            <span className={`text-lg font-bold ${item.score >= 90 ? 'text-emerald-600' : item.score >= 70 ? 'text-stone-700' : 'text-red-600'}`}>
              {item.score}%
            </span>
        ) : (
          <span className="text-stone-400 text-sm font-medium">—</span>
        )}
      </div>
    </div>
  );
};

export default EvaluationCard;