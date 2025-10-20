import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { QuadrantType } from './types';
import Header from './components/Header';
import TaskInbox from './components/TaskInbox';
import EisenhowerMatrix from './components/EisenhowerMatrix';
import AddTaskModal from './components/AddTaskModal';
import PomodoroTimer from './components/PomodoroTimer';

const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const App = () => {
  const [allTasks, setAllTasks] = useLocalStorage('vidgmarketing_daily_tasks', {});
  const [selectedDate, setSelectedDate] = useState(getLocalDateString(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tasksForSelectedDay = useMemo(() => allTasks[selectedDate] || [], [allTasks, selectedDate]);

  const updateTasksForDate = (date, newTasks) => {
    setAllTasks(prev => ({ ...prev, [date]: newTasks }));
  };

  const inboxTasks = useMemo(() => tasksForSelectedDay.filter(t => t.isImportant === undefined), [tasksForSelectedDay]);
  const matrixTasks = useMemo(() => tasksForSelectedDay.filter(t => t.isImportant !== undefined), [tasksForSelectedDay]);

  const handleDateChange = (offset) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + offset);
    setSelectedDate(getLocalDateString(currentDate));
  };
  
  const handleGoToToday = () => {
    setSelectedDate(getLocalDateString(new Date()));
  };

  const addTaskToInbox = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      isCompleted: false,
      createdAt: Date.now(),
    };
    updateTasksForDate(selectedDate, [...tasksForSelectedDay, newTask]);
  };

  const addMatrixTask = (text, isImportant, isUrgent) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      isCompleted: false,
      isImportant,
      isUrgent,
      createdAt: Date.now(),
    };
    updateTasksForDate(selectedDate, [...tasksForSelectedDay, newTask]);
  };
  
  const deleteTask = (id) => {
    updateTasksForDate(selectedDate, tasksForSelectedDay.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    updateTasksForDate(selectedDate, tasksForSelectedDay.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const updateTaskText = (id, newText) => {
    updateTasksForDate(selectedDate, tasksForSelectedDay.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const categorizeTask = (id, isImportant, isUrgent) => {
    updateTasksForDate(selectedDate, tasksForSelectedDay.map(task =>
      task.id === id ? { ...task, isImportant, isUrgent } : task
    ));
  };
  
  const updateTaskQuadrant = (id, quadrant) => {
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