import React from 'react';

interface PdfViewerProps {
    pageNumber?: number;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pageNumber }) => {
    // This component loads a sample PDF from the `public` directory.
    // Make sure you have a `sample.pdf` file in a `public` folder at the project root.
    const pdfUrl = "/sample.pdf";
    const finalUrl = pageNumber ? `${pdfUrl}#page=${pageNumber}` : pdfUrl;
    
    return (
        <div className="bg-stone-100 rounded-2xl border border-stone-200 p-2 h-[calc(100vh-12rem)] overflow-hidden">
            <iframe 
                key={finalUrl} // Add key to force re-render on URL change
                src={finalUrl}
                className="w-full h-full rounded-xl border-none"
                title="PDF Viewer"
                aria-label="Answer Sheet PDF"
            >
            </iframe>
        </div>
    );
};

export default PdfViewer;