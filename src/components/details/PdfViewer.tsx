import React from 'react';

const PdfViewer: React.FC = () => {
    const pdfUrl = "/science-exam-paper.pdf";
    
    return (
        <div className="bg-stone-100 rounded-2xl border border-stone-200 p-2 h-[calc(100vh-12rem)] overflow-hidden">
            <iframe 
                src={pdfUrl}
                className="w-full h-full rounded-xl border-none"
                title="PDF Viewer"
                aria-label="Answer Sheet PDF"
            >
            </iframe>
        </div>
    );
};

export default PdfViewer;
