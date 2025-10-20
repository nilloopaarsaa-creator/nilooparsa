import React, { useState, useMemo } from 'react';
// Fix: Removed .js extension from imports to allow proper TypeScript module resolution.
import TaskItem from './TaskItem';
import SortControls from './SortControls';

const Quadrant = ({
  title,
  subtitle,
  tasks,
  borderColor,
  onToggle,
  onDelete,
  onUpdateQuadrant,
  onUpdateTask,
}) => {
  const [sortOption, setSortOption] = useState('createdAt_desc');

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      switch (sortOption) {
        case 'createdAt_asc':
          return a.createdAt - b.createdAt;
        case 'text_asc':
          return a.text.localeCompare(b.text);
        case 'text_desc':
          return b.text.localeCompare(a.text);
        case 'createdAt_desc':
        default:
          return b.createdAt - a.createdAt;
      }
    });
  }, [tasks, sortOption]);

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 ring-1 ring-slate-700/50">
      <div className={`border-b-2 ${borderColor} pb-2 mb-4`}>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
      <SortControls sortOption={sortOption} setSortOption={setSortOption} />
      <div className="space-y-2 max-h-80 overflow-y-auto pr-2 -mr-2">
        {sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            borderColor={borderColor}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdateQuadrant={onUpdateQuadrant}
            onUpdateTask={onUpdateTask}
          />
        ))}
         {tasks.length === 0 && <p className="text-slate-500 text-center py-4">تسکی در این بخش وجود ندارد.</p>}
      </div>
    </div>
  );
};

export default Quadrant;