import React from 'react';
import Quadrant from './Quadrant';
import { Task, QuadrantType } from '../types';

interface EisenhowerMatrixProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateQuadrant: (id: string, quadrant: QuadrantType) => void;
  onUpdateTask: (id: string, newText: string) => void;
}

const EisenhowerMatrix: React.FC<EisenhowerMatrixProps> = ({ tasks, onToggle, onDelete, onUpdateQuadrant, onUpdateTask }) => {
  const doTasks = tasks.filter(task => task.isImportant && task.isUrgent);
  const scheduleTasks = tasks.filter(task => task.isImportant && !task.isUrgent);
  const delegateTasks = tasks.filter(task => !task.isImportant && task.isUrgent);
  const deleteTasks = tasks.filter(task => !task.isImportant && !task.isUrgent);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <Quadrant
        title="فوری و مهم"
        subtitle="انجام بده"
        quadrantType={QuadrantType.DO}
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
        quadrantType={QuadrantType.SCHEDULE}
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
        quadrantType={QuadrantType.DELEGATE}
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
        quadrantType={QuadrantType.DELETE}
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
