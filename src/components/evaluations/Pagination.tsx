
import React from 'react';

interface PaginationProps {
    currentCount: number;
    totalCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentCount, totalCount }) => {
    return (
        <div className="px-6 py-3 border-t border-stone-100 flex items-center justify-between text-sm text-stone-500">
            <p>Showing {currentCount} of {totalCount} results</p>
            <div className="flex gap-2">
                <button className="px-3 py-1 rounded border border-stone-200 hover:bg-stone-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 rounded border border-stone-200 hover:bg-stone-50">Next</button>
            </div>
        </div>
    );
}

export default Pagination;