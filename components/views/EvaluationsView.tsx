
import React, { useState } from 'react';
import type { ViewMode } from '../../types';
import { MOCK_EVALUATIONS } from '../../constants';
import StatCard from '../ui/StatCard';
import EvaluationsTable from '../evaluations/EvaluationsTable';
import EvaluationCard from '../evaluations/EvaluationCard';
import EmptyState from '../evaluations/EmptyState';
import Pagination from '../evaluations/Pagination';
import { FileText, BrainCircuit, Clock, Filter, List, LayoutGrid } from '../icons';

interface EvaluationsViewProps {
  hasData: boolean;
  onUploadClick: () => void;
  onEvaluationSelect: (id: number) => void;
}

const EvaluationsView: React.FC<EvaluationsViewProps> = ({ hasData, onUploadClick, onEvaluationSelect }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-stone-900">Evaluations</h2>
          <p className="text-stone-500 mt-1">Manage and review your AI-graded answer sheets.</p>
        </div>
        {hasData && (
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <div className="flex items-center bg-stone-200/50 p-1 rounded-lg">
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}>
                <List className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}>
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {hasData ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Papers" value="142" icon={<FileText className="text-[#AB896A]" />} />
            <StatCard title="Average Score" value="84%" icon={<BrainCircuit className="text-[#AB896A]" />} change="+2.5%" positive />
            <StatCard title="Pending Review" value="8" icon={<Clock className="text-amber-600" />} />
          </div>

          {viewMode === 'list' ? (
             <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
                    <h3 className="font-semibold text-stone-800">Recent Submissions</h3>
                    <button className="text-sm text-[#AB896A] font-medium hover:underline">View all</button>
                </div>
                <EvaluationsTable evaluations={MOCK_EVALUATIONS} onRowClick={onEvaluationSelect} />
                <Pagination currentCount={5} totalCount={142} />
             </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_EVALUATIONS.map((item) => (
                  <EvaluationCard key={item.id} item={item} onCardClick={onEvaluationSelect} />
                ))}
              </div>
              <div className="pt-6 border-t border-stone-200/50 mt-6">
                 <Pagination currentCount={5} totalCount={142} />
              </div>
            </>
          )}
        </div>
      ) : (
        <EmptyState onUploadClick={onUploadClick} />
      )}
    </>
  );
};

export default EvaluationsView;
