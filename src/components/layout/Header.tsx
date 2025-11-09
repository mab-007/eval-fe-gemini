
import React from 'react';
import type { ActiveTab } from '../../types';
import NavButton from '../ui/NavButton';
import { BrainCircuit, FileText, CheckCircle2, Plus, Search, UploadCloud } from '../icons';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onUploadClick }) => {
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
            <button onClick={onUploadClick} className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#AB896A] hover:bg-[#9a7b5f] text-white text-sm font-medium rounded-full transition-colors shadow-sm">
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
    </header>
  );
};

export default Header;