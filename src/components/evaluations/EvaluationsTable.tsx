
import React from 'react';
import type { Evaluation } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import { FileText } from '../icons';

interface EvaluationsTableProps {
  evaluations: Evaluation[];
  onRowClick: (id: number) => void;
}

const EvaluationsTable: React.FC<EvaluationsTableProps> = ({ evaluations, onRowClick }) => {

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#F9F6F3] text-xs uppercase tracking-wider font-medium text-stone-500">
          <tr>
            <th className="px-6 py-3 text-left">Paper Details</th>
            <th className="px-6 py-3 text-left">Student</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Score</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {evaluations.map((item) => (
            <tr key={item.id} onClick={() => onRowClick(item.id)} className="hover:bg-[#FAF7F5] transition-colors group cursor-pointer">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F0EBE6] flex items-center justify-center text-[#AB896A]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">{item.title}</p>
                    <p className="text-xs text-stone-500">{item.subject}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-stone-700">{item.student}</td>
              <td className="px-6 py-4 text-sm text-stone-500">{item.date}</td>
              <td className="px-6 py-4">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-6 py-4">
                {item.score ? (
                   <span className={`font-bold ${item.score >= 90 ? 'text-emerald-600' : item.score >= 70 ? 'text-stone-700' : 'text-red-600'}`}>
                     {item.score}%
                   </span>
                ) : (
                  <span className="text-stone-400 text-sm">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluationsTable;