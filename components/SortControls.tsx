import React from 'react';
import { SortOption } from '../types';

interface SortControlsProps {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex justify-end items-center mb-2">
      <label htmlFor="sort-select" className="text-sm text-slate-400 mr-2">مرتب‌سازی:</label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value as SortOption)}
        className="bg-slate-700 text-white text-sm rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <option value="createdAt_desc">جدیدترین</option>
        <option value="createdAt_asc">قدیمی‌ترین</option>
        <option value="text_asc">الفبا (صعودی)</option>
        <option value="text_desc">الفبا (نزولی)</option>
      </select>
    </div>
  );
};

export default SortControls;
