
import React from 'react';
import { UploadCloud, Plus } from '../icons';

interface EmptyStateProps {
  onUploadClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onUploadClick }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl border-2 border-dashed border-stone-200">
      <div className="w-24 h-24 bg-[#F0EBE6] rounded-full flex items-center justify-center mb-6 animate-pulse">
        <UploadCloud className="w-10 h-10 text-[#AB896A]" />
      </div>
      <h3 className="text-2xl font-bold text-stone-900 mb-2">No Answer Sheets Yet</h3>
      <p className="text-stone-500 max-w-md mb-8">
        Ready to see the magic? Upload your first batch of answer sheets and let Dumbledore AI handle the grading.
      </p>
      <button onClick={onUploadClick} className="flex items-center gap-2 px-6 py-3 bg-[#AB896A] hover:bg-[#9a7b5f] text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
        <Plus className="w-5 h-5" />
        <span>Upload your first papers</span>
      </button>
    </div>
  );
};

export default EmptyState;
