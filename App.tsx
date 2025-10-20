import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Task, QuadrantType } from './types';
import Header from './components/Header';
import TaskInbox from './components/TaskInbox';
import EisenhowerMatrix from './components/EisenhowerMatrix';
import AddTaskModal from './components/AddTaskModal';
import PomodoroTimer from './components/PomodoroTimer';

const getLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const App: React.FC = () => {
  const [allTasks, setAllTasks] = useLocalStorage<Record<string, Task[]>>('vidgmarketing_daily_tasks', {});
  const [selectedDate, setSelectedDate] = useState<string>(getLocalDateString(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tasksForSelectedDay = useMemo(() => allTasks[selectedDate] || [], [allTasks, selectedDate]);

  const updateTasksForDate = (date: string, newTasks: Task[]) => {
    setAllTasks(prev => ({ ...prev, [date]: newTasks }));
  };

  const inboxTasks = useMemo(() => tasksForSelectedDay.filter(t => t.isImportant === undefined), [tasksForSelectedDay]);
  const matrixTasks = useMemo(() => tasksForSelectedDay.filter(t => t.isImportant !== undefined), [tasksForSelectedDay]);

  const handleDateChange = (offset: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);
    setSelectedDate(getLocalDateString(currentDate));
  };
  
  const handleGoToToday = () => {
    setSelectedDate(getLocalDateString(new Date()));
  };

  const addTaskToInbox = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      isCompleted: false,
      createdAt: Date.now(),
    };
    updateTasksForDate(selectedDate, [...tasksForSelectedDay, newTask]);
  };

  const addMatrixTask = (text: string, isImportant: boolean, isUrgent: boolean) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      isCompleted: false,
      isImportant,
      isUrgent,
      createdAt: Date.now(),
    };
    updateTasksForDate(selectedDate, [...tasksForSelectedDay, newTask]);
  };
  
  const deleteTask = (id: string) => {
    updateTasksForDate(selectedDate, tasksForSelectedDay.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    updateTasksForDate(selectedDate, tasksForSelectedDay.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const updateTaskText = (id: string, newText: string) => {
    updateTasksForDate(selectedDate, tasksForSelectedDay.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const categorizeTask = (id: string, isImportant: boolean, isUrgent: boolean) => {
    updateTasksForDate(selectedDate, tasksForSelectedDay.map(task =>
      task.id === id ? { ...task, isImportant, isUrgent } : task
    ));
  };
  
  const updateTaskQuadrant = (id: string, quadrant: QuadrantType) => {
    const newFlags = {
      [QuadrantType.DO]: { isImportant: true, isUrgent: true },
      [QuadrantType.SCHEDULE]: { isImportant: true, isUrgent: false },
      [QuadrantType.DELEGATE]: { isImportant: false, isUrgent: true },
      [QuadrantType.DELETE]: { isImportant: false, isUrgent: false },
    };
    updateTasksForDate(selectedDate, tasksForSelectedDay.map(task =>
      task.id === id ? { ...task, ...newFlags[quadrant] } : task
    ));
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Header 
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onGoToToday={handleGoToToday}
          onAddTaskClick={() => setIsModalOpen(true)}
        />
        <main className="mt-6">
          <TaskInbox
            tasks={inboxTasks}
            onAddTask={addTaskToInbox}
            onDelete={deleteTask}
            onCategorize={categorizeTask}
          />
          <EisenhowerMatrix
            tasks={matrixTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdateQuadrant={updateTaskQuadrant}
            onUpdateTask={updateTaskText}
          />
        </main>
      </div>
       <PomodoroTimer />
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={addMatrixTask}
      />
    </div>
  );
};

export default App;
