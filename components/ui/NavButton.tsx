
import React from 'react';

interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-[#AB896A] text-white shadow-sm'
          : 'text-stone-600 hover:bg-stone-200/50 hover:text-stone-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default NavButton;
