import React from 'react';

interface PdfViewerProps {
  pdfUrl: string;
  pageNumber?: number;
  x?: number;
  y?: number;
  markerColor?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, pageNumber, x, y, markerColor = 'bg-yellow-400' }) => {
  const finalUrl = pageNumber ? `${pdfUrl}#page=${pageNumber}` : pdfUrl;

  const showMarker = x !== undefined && y !== undefined && pageNumber !== undefined;

  return (
    <div 
      className="relative bg-stone-100 rounded-2xl border border-stone-200 p-2 overflow-auto mx-auto"
      style={{
        width: '210mm',
        height: '297mm',
      }}
    >
      {showMarker && (
        <div
          className={`absolute w-4 h-4 rounded-full z-10 animate-pulse ${markerColor}`}
          style={{
            left: `${x * 100}%`,
            top: `${y * 100}%`,
          }}
          title="Selected Question Location"
        />
      )}
      <iframe
        key={finalUrl} // Add key to force re-render on URL change
        src={finalUrl}
        className="w-full h-full rounded-xl border-none"
        title="PDF Viewer"
        aria-label="Answer Sheet PDF"
      ></iframe>
    </div>
  );
};

export default PdfViewer;
