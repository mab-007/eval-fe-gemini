import React, { useState } from 'react';
import { X, ChevronDown, UploadCloud, FileIcon, Plus } from '../icons';

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [docType, setDocType] = useState('question_paper');
  const [noMarkingScheme, setNoMarkingScheme] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else if (selectedFile) {
      alert('Please upload a PDF file.');
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else if (selectedFile) {
      alert('Please upload a PDF file.');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const isButtonDisabled = !grade || !section || !subject || !docType || !file || (docType === 'answer_sheet' && !noMarkingScheme);

  const resetForm = () => {
    setFile(null);
    setGrade('');
    setSection('');
    setSubject('');
    setDocType('question_paper');
    setNoMarkingScheme(false);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleNext = () => {
      // Mock submission logic for "Next"
      console.log("Submitted. Resetting form for next upload.");
      resetForm();
  };

  const handleFinish = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Mock submission logic for "Finish"
      console.log("Submitted. Closing modal.");
      onClose();
  };


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm" style={{ animation: 'in 0.3s' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative" style={{ animation: 'in 0.4s' }}>
        <button onClick={onClose} className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 p-1 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
        
        <div className="mb-6">
            <div className="w-12 h-12 bg-[#F0EBE6] rounded-xl flex items-center justify-center mb-4 text-[#AB896A]">
                <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900">Upload Document</h3>
            <p className="text-stone-500 mt-1">Enter details and attach your PDF.</p>
        </div>

        <form className="space-y-5" onSubmit={handleFinish}>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-stone-700 mb-1.5">Grade <span className="text-red-500">*</span></label>
               <div className="relative">
                <select value={grade} onChange={(e) => setGrade(e.target.value)} required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#AB896A]/20 focus:border-[#AB896A] transition-all pr-10 text-stone-700">
                    <option value="">Select Grade</option>
                    {[...Array(12)].map((_, i) => <option key={i} value={i + 1}>Grade {i + 1}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
               </div>
             </div>
             <div>
               <label className="block text-sm font-medium text-stone-700 mb-1.5">Section <span className="text-red-500">*</span></label>
               <div className="relative">
                <select value={section} onChange={(e) => setSection(e.target.value)} required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#AB896A]/20 focus:border-[#AB896A] transition-all pr-10 text-stone-700">
                    <option value="">Select Section</option>
                    {['A', 'B', 'C', 'D', 'E'].map(sec => <option key={sec} value={sec}>Section {sec}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
               </div>
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-stone-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
             <div className="relative">
                <select value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#AB896A]/20 focus:border-[#AB896A] transition-all pr-10 text-stone-700">
                <option value="">Select Subject</option>
                <option value="math">Mathematics</option><option value="physics">Physics</option><option value="chemistry">Chemistry</option><option value="biology">Biology</option><option value="history">History</option><option value="english">English</option><option value="cs">Computer Science</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-stone-700 mb-1.5">Document Type</label>
             <div className="relative">
                <select value={docType} onChange={(e) => setDocType(e.target.value)} required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#AB896A]/20 focus:border-[#AB896A] transition-all pr-10 text-stone-700">
                <option value="">Select Type</option><option value="answer_sheet">Answer Sheet</option><option value="question_paper">Question Paper</option><option value="marking_scheme">Marking Scheme</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
             </div>
           </div>

           <div className="pt-2">
             <label className="block text-sm font-medium text-stone-700 mb-1.5">Upload PDF</label>
             <div onDrop={handleDrop} onDragOver={handleDragOver} className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative group ${file ? 'border-[#AB896A] bg-[#AB896A]/5' : 'border-stone-300 hover:border-[#AB896A] hover:bg-stone-50'}`}>
               <input type="file" accept="application/pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
               {file ? (
                 <div className="flex flex-col items-center"><div className="w-12 h-12 bg-[#AB896A]/10 rounded-xl flex items-center justify-center text-[#AB896A] mb-3"><FileIcon className="w-6 h-6" /></div><p className="text-sm font-semibold text-stone-900 max-w-[200px] truncate">{file.name}</p><p className="text-xs text-stone-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p><p className="text-xs text-[#AB896A] font-medium mt-3">Click to change file</p></div>
               ) : (
                 <div className="flex flex-col items-center"><div className="w-12 h-12 bg-stone-100 group-hover:bg-[#F0EBE6] rounded-xl flex items-center justify-center text-stone-400 group-hover:text-[#AB896A] transition-colors mb-3"><UploadCloud className="w-6 h-6" /></div><p className="text-sm font-medium text-stone-700"><span className="text-[#AB896A]">Click to upload</span> or drag and drop</p><p className="text-xs text-stone-500 mt-1">PDF only (max. 10MB)</p></div>
               )}
             </div>
           </div>

           {docType === 'answer_sheet' && (
              <div className="flex items-center gap-2 pt-2">
                  <input
                      id="no-scheme-checkbox"
                      type="checkbox"
                      checked={noMarkingScheme}
                      onChange={(e) => setNoMarkingScheme(e.target.checked)}
                      className="h-4 w-4 rounded border-stone-300 text-[#AB896A] focus:ring-[#AB896A] cursor-pointer"
                  />
                  <label htmlFor="no-scheme-checkbox" className="text-sm font-medium text-stone-600 select-none cursor-pointer">
                      Submit without marking scheme
                  </label>
              </div>
           )}

           <div className="flex items-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleNext}
                disabled={isButtonDisabled}
                className="w-full py-3.5 border border-stone-300 text-stone-700 font-bold rounded-xl transition-all transform active:scale-[0.98] hover:bg-stone-50 flex items-center justify-center gap-2 disabled:bg-stone-200 disabled:text-stone-400 disabled:border-stone-200 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                <span>Next</span>
              </button>
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="w-full py-3.5 bg-[#AB896A] hover:bg-[#9a7b5f] text-white font-bold rounded-xl transition-all transform active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:bg-stone-300 disabled:shadow-none disabled:cursor-not-allowed"
              >
                <UploadCloud className="w-5 h-5" />
                <span>Finish</span>
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
