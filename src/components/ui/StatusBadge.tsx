
import React from 'react';
import type { EvaluationStatus } from '../../types';
import { CheckCircle2, BrainCircuit, AlertCircle } from '../icons';

interface StatusBadgeProps {
  status: EvaluationStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<EvaluationStatus, string> = {
    'Graded': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Processing': 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse',
    'Needs Review': 'bg-amber-100 text-amber-700 border-amber-200',
  };

  const icons: Record<EvaluationStatus, React.ReactNode> = {
    'Graded': <CheckCircle2 className="w-3.5 h-3.5" />,
    'Processing': <BrainCircuit className="w-3.5 h-3.5" />,
    'Needs Review': <AlertCircle className="w-3.5 h-3.5" />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      {icons[status]}
      {status}
    </span>
  );
};

export default StatusBadge;