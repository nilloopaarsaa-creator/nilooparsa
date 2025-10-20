import React from 'react';
import { TrashIcon } from './icons';

const QuadrantButton = ({ onClick, children, title, className }) => (
    <button
      onClick={onClick}
      title={title}
      className={`px-2 py-1 text-xs rounded hover:opacity-100 transition-opacity ${className}`}
    >
      {children}
    </button>
);

const InboxTaskItem = ({ task, onDelete, onCategorize }) => {
  return (
    <div className="flex items-center justify-between bg-slate-800 p-2 rounded-md hover:bg-slate-700 transition-colors">
      <span className="text-slate-200 flex-grow truncate">{task.text}</span>
      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
        <span className="text-xs text-slate-400 mr-2">دسته‌بندی:</span>
        <QuadrantButton 
          onClick={() => onCategorize(task.id, true, true)}
          title="فوری و مهم"
          className="bg-red-500/50 opacity-80"
        >
          انجام
        </QuadrantButton>
        <QuadrantButton 
          onClick={() => onCategorize(task.id, true, false)}
          title="مهم اما غیرفوری"
          className="bg-blue-500/50 opacity-80"
        >
          برنامه
        </QuadrantButton>
        <QuadrantButton 
          onClick={() => onCategorize(task.id, false, true)}
          title="فوری اما غیرمهم"
          className="bg-yellow-500/50 opacity-80"
        >
          واگذاری
        </QuadrantButton>
        <QuadrantButton 
          onClick={() => onCategorize(task.id, false, false)}
          title="نه فوری، نه مهم"
          className="bg-gray-500/50 opacity-80"
        >
          حذف
        </QuadrantButton>
        <button 
            onClick={() => onDelete(task.id)} 
            title="حذف دائمی"
            className="p-1 rounded-full hover:bg-red-500/20 text-red-500 hover:text-red-400"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default InboxTaskItem;