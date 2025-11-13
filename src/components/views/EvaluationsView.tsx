
import React, { useState, useMemo } from 'react';
import type { ViewMode, EvaluationStatus } from '../../types';
import type { SubmissionData } from '../../services/api.service';
import StatCard from '../ui/StatCard';
import EvaluationsTable from '../evaluations/EvaluationsTable';
import EvaluationCard from '../evaluations/EvaluationCard';
import EmptyState from '../evaluations/EmptyState';
import Pagination from '../evaluations/Pagination';
import { FileText, BrainCircuit, Clock, Filter, List, LayoutGrid } from '../icons';

interface EvaluationsViewProps {
  hasData: boolean;
  loading: boolean;
  error: string | null;
  submissions: SubmissionData[];
  onUploadClick: () => void;
  onEvaluationSelect: (id: number) => void;
}

const EvaluationsView: React.FC<EvaluationsViewProps> = ({
  hasData,
  loading,
  error,
  submissions,
  onUploadClick,
  onEvaluationSelect
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    student: '',
    date: '', // YYYY-MM-DD
  });

  const areFiltersActive = useMemo(() => {
    return filters.status !== '' || filters.student !== '' || filters.date !== '';
  }, [filters]);

  // Transform submissions to Evaluation format
  const evaluations = useMemo(() => {
    return submissions.map(submission => ({
      id: submission.id,
      title: `Roll ${submission.roll}`,
      student: submission.student_name,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), // Using current date since no date in submission
      status: submission.status as EvaluationStatus,
      score: submission.total_marks > 0 ? Math.round((submission.score_awarded / submission.total_marks) * 100) : null,
      subject: submission.subject
    }));
  }, [submissions]);

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(evaluation => {
      const statusMatch = filters.status ? evaluation.status === filters.status : true;
      const studentMatch = filters.student ? evaluation.student.toLowerCase().includes(filters.student.toLowerCase()) : true;
      // For now, we'll skip date filtering since submissions don't have a date field
      return statusMatch && studentMatch;
    });
  }, [filters, evaluations]);

  const handleClearFilters = () => {
    setFilters({ status: '', student: '', date: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AB896A] mx-auto mb-4"></div>
          <p className="text-stone-500">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-stone-900 mb-2">Failed to Load Submissions</h3>
          <p className="text-stone-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#AB896A] text-white rounded-lg hover:bg-[#9a7b5f] font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-stone-900">Evaluations</h2>
          <p className="text-stone-500 mt-1">Manage and review your AI-graded answer sheets.</p>
        </div>
        {hasData && (
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="relative">
              <button 
                onClick={() => setIsFilterMenuOpen(prev => !prev)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50 relative"
              >
                <Filter className="w-4 h-4" />
                Filter
                {areFiltersActive && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
              </button>
              {isFilterMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-stone-200 rounded-xl shadow-lg z-10 p-4 animate-in fade-in-5 slide-in-from-top-2 duration-200">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-stone-500">Status</label>
                      <select value={filters.status} onChange={e => setFilters(f => ({...f, status: e.target.value}))} className="mt-1 w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#AB896A]">
                        <option value="">All Statuses</option>
                        <option value="Graded">Graded</option>
                        <option value="Needs Review">Needs Review</option>
                        <option value="Processing">Processing</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-500">Student</label>
                      <input type="text" placeholder="Enter student name..." value={filters.student} onChange={e => setFilters(f => ({...f, student: e.target.value}))} className="mt-1 w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#AB896A]" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-500">Date (From)</label>
                      <input type="date" value={filters.date} onChange={e => setFilters(f => ({...f, date: e.target.value}))} className="mt-1 w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#AB896A]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <button onClick={handleClearFilters} className="text-xs font-bold text-stone-500 hover:text-stone-800">Clear Filters</button>
                    <button onClick={() => setIsFilterMenuOpen(false)} className="px-3 py-1.5 bg-[#AB896A] text-white text-xs font-bold rounded-md hover:bg-[#9a7b5f]">
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
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
            <StatCard
              title="Total Papers"
              value={submissions.length.toString()}
              icon={<FileText className="text-[#AB896A]" />}
            />
            <StatCard
              title="Average Score"
              value={`${Math.round(submissions.reduce((acc, s) => acc + (s.total_marks > 0 ? (s.score_awarded / s.total_marks) * 100 : 0), 0) / (submissions.length || 1))}%`}
              icon={<BrainCircuit className="text-[#AB896A]" />}
            />
            <StatCard
              title="Pending Review"
              value={submissions.filter(s => s.status === 'Needs Review').length.toString()}
              icon={<Clock className="text-amber-600" />}
            />
          </div>

          {viewMode === 'list' ? (
             <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-visible">
                <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
                    <h3 className="font-semibold text-stone-800">Recent Submissions</h3>
                    <button className="text-sm text-[#AB896A] font-medium hover:underline">View all</button>
                </div>
                <div className="overflow-hidden">
                  <EvaluationsTable evaluations={filteredEvaluations} onRowClick={onEvaluationSelect} />
                </div>
                <Pagination currentCount={filteredEvaluations.length} totalCount={submissions.length} />
             </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvaluations.map((item) => (
                  <EvaluationCard key={item.id} item={item} onCardClick={onEvaluationSelect} />
                ))}
              </div>
              <div className="pt-6 border-t border-stone-200/50 mt-6">
                 <Pagination currentCount={filteredEvaluations.length} totalCount={submissions.length} />
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