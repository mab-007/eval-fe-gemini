
import React from 'react';
import { Construction } from '../icons';

interface ComingSoonViewProps {
  moduleName: string;
}

const ComingSoonView: React.FC<ComingSoonViewProps> = ({ moduleName }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
      <div className="w-20 h-20 bg-stone-100 rounded-2xl flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-stone-300" />
      </div>
      <h2 className="text-2xl font-bold text-stone-400 mb-2 capitalize">{moduleName} Module</h2>
      <p className="text-stone-400 font-medium">Coming Soon</p>
      <p className="text-stone-300 max-w-sm mt-2">We are currently working hard to bring you this feature. Stay tuned!</p>
    </div>
  );
};

export default ComingSoonView;