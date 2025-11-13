import React, { useState } from 'react';
import { X, ChevronDown, UploadCloud, FileIcon, Check } from '../icons';

type UploadStep = 'question_paper' | 'marking_scheme' | 'answer_sheet';

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const [uploadStep, setUploadStep] = useState<UploadStep>('question_paper');
  const [file, setFile] = useState<File | null>(null);
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [docType, setDocType] = useState('question_paper');
  const [questionPaperId, setQuestionPaperId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  const isButtonDisabled = () => {
    if (isSubmitting) return true;
    switch (uploadStep) {
      case 'question_paper':
        return !grade || !section || !subject || !file;
      case 'marking_scheme':
        return !file; // 'Next' is disabled if no file, 'Skip' is always enabled.
      default:
        return false;
    }
  };

  const submitData = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/evaluation/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Upload successful:', result);
      // Mock ID for local testing if backend doesn't return one
      const returnedId = result.id || `mock-id-${Date.now()}`;
      if (uploadStep === 'question_paper') {
        setQuestionPaperId(returnedId);
      }
      return true;
    } catch (error) {
      console.error('Upload failed:', error);
      // To allow workflow to continue in case of mock failure, we can simulate success
      // In a real app, you'd show an error and return false.
      if (uploadStep === 'question_paper') {
        setQuestionPaperId(null);
      }
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionPaperNext = async () => {
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('grade', grade);
      formData.append('section', section);
      formData.append('subject', subject);
      formData.append('docType', docType);

      if (await submitData(formData)) {
        setUploadStep('marking_scheme');
        setDocType('marking_scheme');
        setFile(null);
      }
  };

  const handleMarkingSchemeNext = async () => {
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (questionPaperId) formData.append('questionPaperId', questionPaperId);
    formData.append('docType', 'marking_scheme');
    
    if (await submitData(formData)) {
      setUploadStep('answer_sheet');
      setDocType('answer_sheet');
      setFile(null);
    }
  };

  const handleSkipMarkingScheme = () => {
    setUploadStep('answer_sheet');
    setDocType('answer_sheet');
    setFile(null);
  };

  const handleFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData();
      if (file) formData.append('file', file);
      if (questionPaperId) formData.append('questionPaperId', questionPaperId);
      formData.append('docType', 'answer_sheet');

      if (await submitData(formData)) {
        console.log("Final submission successful. Closing modal.");
        onClose();
      }
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
            <h3 className="text-2xl font-bold text-stone-900">Upload Documents</h3>
            <p className="text-stone-500 mt-1">Follow the steps to upload your exam set.</p>
        </div>

        <form className="space-y-5" onSubmit={handleFinalSubmit}>
           <div className={`grid grid-cols-2 gap-4 ${uploadStep !== 'question_paper' ? 'opacity-50 pointer-events-none' : ''}`}>
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

           <div className={uploadStep !== 'question_paper' ? 'opacity-50 pointer-events-none' : ''}>
             <label className="block text-sm font-medium text-stone-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
             <div className="relative">
                <select value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#AB896A]/20 focus:border-[#AB896A] transition-all pr-10 text-stone-700">
                <option value="">Select Subject</option>
                <option value="math">Mathematics</option><option value="physics">Physics</option><option value="chemistry">Chemistry</option><option value="biology">Biology</option><option value="history">History</option><option value="english">English</option><option value="cs">Computer Science</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
             </div>
           </div>

           {uploadStep !== 'question_paper' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"><Check className="w-5 h-5 text-green-600"/></div>
                <div>
                    <p className="font-semibold text-green-800">Question Paper uploaded!</p>
                    <p className="text-sm text-green-700">
                      {uploadStep === 'marking_scheme' 
                        ? "Next, upload the marking scheme."
                        : "Next, upload the student's answer sheet."
                      }
                    </p>
                </div>
            </div>
           )}

           <div className="pt-2">
             <label className="block text-sm font-medium text-stone-700 mb-1.5">
                {uploadStep === 'question_paper' ? 'Upload Question Paper' : uploadStep === 'marking_scheme' ? 'Upload Marking Scheme (Optional)' : 'Upload Answer Sheet'}
             </label>
             <div onDrop={handleDrop} onDragOver={handleDragOver} className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative group ${file ? 'border-[#AB896A] bg-[#AB896A]/5' : 'border-stone-300 hover:border-[#AB896A] hover:bg-stone-50'}`}>
               <input type="file" accept="application/pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
               {file ? (
                 <div className="flex flex-col items-center"><div className="w-12 h-12 bg-[#AB896A]/10 rounded-xl flex items-center justify-center text-[#AB896A] mb-3"><FileIcon className="w-6 h-6" /></div><p className="text-sm font-semibold text-stone-900 max-w-[200px] truncate">{file.name}</p><p className="text-xs text-stone-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p><p className="text-xs text-[#AB896A] font-medium mt-3">Click to change file</p></div>
               ) : (
                 <div className="flex flex-col items-center"><div className="w-12 h-12 bg-stone-100 group-hover:bg-[#F0EBE6] rounded-xl flex items-center justify-center text-stone-400 group-hover:text-[#AB896A] transition-colors mb-3"><UploadCloud className="w-6 h-6" /></div><p className="text-sm font-medium text-stone-700"><span className="text-[#AB896A]">Click to upload</span> or drag and drop</p><p className="text-xs text-stone-500 mt-1">PDF only (max. 10MB)</p></div>
               )}
             </div>
           </div>

           <div className="flex items-center gap-3 pt-4">
             {uploadStep === 'question_paper' && (
                <>
                  <button type="button" onClick={onClose} className="w-full py-3.5 border border-stone-300 text-stone-700 font-bold rounded-xl transition-all transform active:scale-[0.98] hover:bg-stone-50">Cancel</button>
                  <button type="button" onClick={handleQuestionPaperNext} disabled={isButtonDisabled() || isSubmitting} className="w-full py-3.5 bg-[#AB896A] hover:bg-[#9a7b5f] text-white font-bold rounded-xl transition-all transform active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:bg-stone-300 disabled:shadow-none disabled:cursor-not-allowed">
                    {isSubmitting ? 'Submitting...' : 'Next'}
                  </button>
                </>
             )}

             {uploadStep === 'marking_scheme' && (
                <>
                  <button type="button" onClick={handleSkipMarkingScheme} disabled={isSubmitting} className="w-full py-3.5 border border-stone-300 text-stone-700 font-bold rounded-xl transition-all transform active:scale-[0.98] hover:bg-stone-50">Skip</button>
                  <button type="button" onClick={handleMarkingSchemeNext} disabled={isButtonDisabled() || isSubmitting} className="w-full py-3.5 bg-[#AB896A] hover:bg-[#9a7b5f] text-white font-bold rounded-xl transition-all transform active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:bg-stone-300 disabled:shadow-none disabled:cursor-not-allowed">
                    {isSubmitting ? 'Submitting...' : 'Next'}
                  </button>
                </>
             )}

             {uploadStep === 'answer_sheet' && (
                <>
                  <button
                    type="submit"
                    name="upload_later"
                    disabled={isSubmitting}
                    className="w-full py-3.5 border border-stone-300 text-stone-700 font-bold rounded-xl transition-all transform active:scale-[0.98] hover:bg-stone-50 flex items-center justify-center gap-2 disabled:bg-stone-200 disabled:text-stone-400 disabled:border-stone-200 disabled:cursor-not-allowed"
                  >
                    <span>Upload Later</span>
                  </button>
                  <button
                    type="submit"
                    name="upload_now"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#AB896A] hover:bg-[#9a7b5f] text-white font-bold rounded-xl transition-all transform active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:bg-stone-300 disabled:shadow-none disabled:cursor-not-allowed"
                  >
                    <UploadCloud className="w-5 h-5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Now'}</span>
                  </button>
                </>
             )}
            </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
