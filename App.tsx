
import React, { useState } from 'react';
import type { ActiveTab } from './types';
import Header from './components/layout/Header';
import EvaluationsView from './components/views/EvaluationsView';
import ComingSoonView from './components/views/ComingSoonView';
import UploadModal from './components/evaluations/UploadModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('evaluate');
  const [hasData, setHasData] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  return (
    <div className="min-h-screen bg-[#FAF7F5] font-sans text-stone-800">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onUploadClick={openUploadModal}
      />

      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        {activeTab === 'evaluate' ? (
          <EvaluationsView hasData={hasData} onUploadClick={openUploadModal} />
        ) : (
          <ComingSoonView moduleName={activeTab} />
        )}
      </main>

      {isUploadModalOpen && <UploadModal onClose={closeUploadModal} />}

      {/* DEMO TOGGLE - REMOVE IN PROD */}
      {activeTab === 'evaluate' && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setHasData(!hasData)}
            className="bg-stone-800 text-stone-200 px-4 py-2 rounded-full text-xs font-mono opacity-50 hover:opacity-100 transition-opacity"
          >
            Toggle Data State
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
