import React, { useState, useEffect, useRef } from 'react';
// Fix: Removed .js extension from imports to allow proper TypeScript module resolution.
import { QuadrantType } from '../types';
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, TrashIcon } from './icons';

const TaskItem = ({ task, borderColor, onToggle, onDelete, onUpdateQuadrant, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);
  
  const handleSave = () => {
    if (editText.trim() && editText.trim() !== task.text) {
      onUpdateTask(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const handleImportanceChange = () => {
    const newQuadrant = task.isImportant 
        ? (task.isUrgent ? QuadrantType.DELEGATE : QuadrantType.DELETE) 
        : (task.isUrgent ? QuadrantType.DO : QuadrantType.SCHEDULE);
    onUpdateQuadrant(task.id, newQuadrant);
  };

  const handleUrgencyChange = () => {
    const newQuadrant = task.isUrgent
        ? (task.isImportant ? QuadrantType.SCHEDULE : QuadrantType.DELETE)
        : (task.isImportant ? QuadrantType.DO : QuadrantType.DELEGATE);
    onUpdateQuadrant(task.id, newQuadrant);
  };
    
  return (
    <div className={`
      flex items-center justify-between bg-slate-800 p-2 rounded-md border-r-4 
      ${borderColor} transition-all duration-200 hover:bg-slate-700
    `}>
        <div className="flex items-center gap-3 flex-grow min-w-0">
            <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => onToggle(task.id)}
                className="form-checkbox h-5 w-5 rounded bg-slate-900 border-slate-600 text-cyan-500 focus:ring-cyan-600 cursor-pointer flex-shrink-0"
            />
            {isEditing ? (
                 <input
                    ref={inputRef}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="bg-slate-700 text-white rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                 />
            ) : (
                <span 
                    className={`flex-grow truncate cursor-pointer ${task.isCompleted ? 'line-through text-slate-500' : 'text-slate-200'}`}
                    onClick={() => setIsEditing(true)}
                    title="برای ویرایش کلیک کنید"
                >
                    {task.text}
                </span>
            )}
        </div>
      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
        <button onClick={handleImportanceChange} title={task.isImportant ? "تغییر به غیر مهم" : "تغییر به مهم"} className="p-1 rounded-full hover:bg-slate-600 text-slate-400 hover:text-white">
            {task.isImportant ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </button>
        <button onClick={handleUrgencyChange} title={task.isUrgent ? "تغییر به غیر فوری" : "تغییر به فوری"} className="p-1 rounded-full hover:bg-slate-600 text-slate-400 hover:text-white">
            {task.isUrgent ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </button>
        <button onClick={() => onDelete(task.id)} className="p-1 rounded-full hover:bg-red-500/20 text-red-500 hover:text-red-400">
            <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;