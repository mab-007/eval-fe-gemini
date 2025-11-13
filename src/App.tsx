
import React, { useState, useEffect } from 'react';
import type { ActiveTab } from './types';
import Header from './components/layout/Header';
import EvaluationsView from './components/views/EvaluationsView';
import ComingSoonView from './components/views/ComingSoonView';
import UploadModal from './components/evaluations/UploadModal';
import AnswerSheetView from './components/views/AnswerSheetView';
import { apiService, type SubmissionData } from './services/api.service';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('evaluate');
  const [hasData, setHasData] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch submissions on mount
  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Refresh data when landing on evaluate dashboard (not on detail view)
  useEffect(() => {
    if (activeTab === 'evaluate' && !selectedSubmissionId) {
      fetchSubmissions();
    }
  }, [activeTab, selectedSubmissionId]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getSubmissions();
      setSubmissions(data);
      setHasData(data.length > 0);
    } catch (err) {
      setError('Failed to load submissions');
      console.error('Error loading submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  const handleSelectEvaluation = (id: number) => {
    setSelectedSubmissionId(id);
  };

  const handleBackToList = () => {
    setSelectedSubmissionId(null);
  };

  const handleNavigateToPrevious = () => {
    if (!selectedSubmissionId || submissions.length === 0) return;

    const currentIndex = submissions.findIndex(s => s.id === selectedSubmissionId);
    if (currentIndex > 0) {
      setSelectedSubmissionId(submissions[currentIndex - 1].id);
    }
  };

  const handleNavigateToNext = () => {
    if (!selectedSubmissionId || submissions.length === 0) return;

    const currentIndex = submissions.findIndex(s => s.id === selectedSubmissionId);
    if (currentIndex < submissions.length - 1) {
      setSelectedSubmissionId(submissions[currentIndex + 1].id);
    }
  };

  const selectedSubmission = submissions.find(s => s.id === selectedSubmissionId);
  const currentIndex = selectedSubmissionId ? submissions.findIndex(s => s.id === selectedSubmissionId) : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < submissions.length - 1;

  return (
    <div className="min-h-screen bg-[#FAF7F5] font-sans text-stone-800">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onUploadClick={openUploadModal}
      />

      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        {activeTab === 'evaluate' ? (
          selectedSubmission ? (
            <AnswerSheetView
              evaluationReport={{ questions: selectedSubmission.questions }}
              pdfUrl={selectedSubmission.download_url}
              studentName={selectedSubmission.student_name}
              studentRoll={selectedSubmission.roll}
              subject={selectedSubmission.subject}
              description={selectedSubmission.description}
              submissionId={selectedSubmission.id}
              status={selectedSubmission.status}
              onBack={handleBackToList}
              onNavigateToPrevious={hasPrevious ? handleNavigateToPrevious : undefined}
              onNavigateToNext={hasNext ? handleNavigateToNext : undefined}
            />
          ) : (
            <EvaluationsView
              hasData={hasData}
              loading={loading}
              error={error}
              submissions={submissions}
              onUploadClick={openUploadModal}
              onEvaluationSelect={handleSelectEvaluation}
            />
          )
        ) : (
          <ComingSoonView moduleName={activeTab} />
        )}
      </main>

      {isUploadModalOpen && <UploadModal onClose={closeUploadModal} />}
    </div>
  );
};

export default App;