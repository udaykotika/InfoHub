import React from 'react';
import { TabType } from '../types';
interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
export function TabButton({
  active,
  onClick,
  children
}: TabButtonProps) {
  return <button onClick={onClick} className={`px-6 py-3 font-medium transition-colors ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
      {children}
    </button>;
}