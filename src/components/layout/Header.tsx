
import React, { useState } from 'react';
import type { ActiveTab } from '../../types';
import NavButton from '../ui/NavButton';
import { BrainCircuit, FileText, CheckCircle2, Plus, Search, UploadCloud, X, Wrench } from '../icons';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#F0EBE6]/80 backdrop-blur-md border-b border-stone-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-stone-800 rounded-xl">
          <BrainCircuit className="w-6 h-6 text-[#F0EBE6]" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight text-stone-900">Dumbledore AI</h1>
          <p className="text-xs text-stone-500 font-medium">Exam evaluation platform</p>
        </div>
      </div>

      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center p-1 bg-stone-200/50 rounded-full border border-stone-200/50">
        <NavButton label="Study" icon={<FileText className="w-4 h-4" />} isActive={activeTab === 'study'} onClick={() => onTabChange('study')} />
        <NavButton label="Evaluate" icon={<CheckCircle2 className="w-4 h-4" />} isActive={activeTab === 'evaluate'} onClick={() => onTabChange('evaluate')} />
        <NavButton label="Create" icon={<Plus className="w-4 h-4" />} isActive={activeTab === 'create'} onClick={() => onTabChange('create')} />
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-[#AB896A] transition-colors" />
          <input
            type="text"
            placeholder="Search exam papers..."
            className="pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#AB896A]/20 w-64 transition-all"
          />
        </div>

        <div className="h-6 w-px bg-stone-300 hidden md:block"></div>

        <div className="flex items-center gap-2">
          {activeTab !== 'evaluate' && (
            <button disabled className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-400 text-sm font-medium rounded-full cursor-not-allowed border border-transparent">
              <Plus className="w-4 h-4" />
              <span>New Set</span>
              <span className="ml-1 px-1.5 py-0.5 bg-stone-200/50 text-[10px] font-bold uppercase tracking-wider rounded">Soon</span>
            </button>
          )}

          {activeTab === 'evaluate' ? (
            <button onClick={() => setShowMaintenanceModal(true)} className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-300 text-stone-500 text-sm font-medium rounded-full cursor-pointer border border-transparent hover:bg-stone-400 transition-colors">
              <UploadCloud className="w-4 h-4" />
              <span>Upload</span>
            </button>
          ) : (
            <button disabled className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-400 text-sm font-medium rounded-full cursor-not-allowed border border-transparent">
              <UploadCloud className="w-4 h-4" />
              <span>Upload</span>
              <span className="ml-1 px-1.5 py-0.5 bg-stone-200/50 text-[10px] font-bold uppercase tracking-wider rounded">Soon</span>
            </button>
          )}
        </div>

        <button className="w-10 h-10 rounded-full bg-[#C9A68C] flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
          AD
        </button>
      </div>

      {showMaintenanceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in duration-300">
            <button
              onClick={() => setShowMaintenanceModal(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 p-1 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 text-amber-600">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Under Maintenance</h3>
              <p className="text-stone-600 mt-3 leading-relaxed">
                We're currently performing maintenance on the upload feature. We'll be back soon with improvements!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMaintenanceModal(false)}
                className="w-full py-3.5 bg-[#AB896A] hover:bg-[#9a7b5f] text-white font-bold rounded-xl transition-all transform active:scale-[0.98] shadow-md hover:shadow-lg"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;