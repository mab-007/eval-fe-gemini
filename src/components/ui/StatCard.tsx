
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, positive }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-stone-500 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-3xl font-bold text-stone-900">{value}</h4>
          {change && (
            <span className={`text-xs font-medium ${positive ? 'text-emerald-600' : 'text-red-600'}`}>
              {change}
            </span>
          )}
        </div>
      </div>
      <div className="p-3 bg-[#F9F6F3] rounded-xl">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;