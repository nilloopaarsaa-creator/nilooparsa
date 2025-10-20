import React from 'react';
// Fix: Removed .js extension from imports to allow proper TypeScript module resolution.
import Quadrant from './Quadrant';
import { QuadrantType } from '../types';

const EisenhowerMatrix = ({ tasks, onToggle, onDelete, onUpdateQuadrant, onUpdateTask }) => {
  const doTasks = tasks.filter(task => task.isImportant && task.isUrgent);
  const scheduleTasks = tasks.filter(task => task.isImportant && !task.isUrgent);
  const delegateTasks = tasks.filter(task => !task.isImportant && task.isUrgent);
  const deleteTasks = tasks.filter(task => !task.isImportant && !task.isUrgent);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <Quadrant
        title="فوری و مهم"
        subtitle="انجام بده"
        tasks={doTasks}
        borderColor="border-red-500"
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdateQuadrant={onUpdateQuadrant}
        onUpdateTask={onUpdateTask}
      />
      <Quadrant
        title="مهم اما غیرفوری"
        subtitle="برنامه‌ریزی کن"
        tasks={scheduleTasks}
        borderColor="border-blue-500"
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdateQuadrant={onUpdateQuadrant}
        onUpdateTask={onUpdateTask}
      />
      <Quadrant
        title="فوری اما غیرمهم"
        subtitle="واگذار کن"
        tasks={delegateTasks}
        borderColor="border-yellow-500"
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdateQuadrant={onUpdateQuadrant}
        onUpdateTask={onUpdateTask}
      />
      <Quadrant
        title="نه فوری، نه مهم"
        subtitle="حذف کن"
        tasks={deleteTasks}
        borderColor="border-gray-500"
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdateQuadrant={onUpdateQuadrant}
        onUpdateTask={onUpdateTask}
      />
    </div>
  );
};

export default EisenhowerMatrix;