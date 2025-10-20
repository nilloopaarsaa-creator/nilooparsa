import React, { useState } from 'react';
import { Task } from '../types';
import InboxTaskItem from './InboxTaskItem';

interface TaskInboxProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onDelete: (id: string) => void;
  onCategorize: (id: string, isImportant: boolean, isUrgent: boolean) => void;
}

const TaskInbox: React.FC<TaskInboxProps> = ({ tasks, onAddTask, onDelete, onCategorize }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim());
      setText('');
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 mb-6 ring-1 ring-slate-700/50">
      <h2 className="text-xl font-bold text-white mb-3">صندوق ورودی سریع</h2>
      <p className="text-slate-400 mb-4 text-sm">تسک‌ها را اینجا اضافه کنید و بعداً آنها را دسته‌بندی کنید.</p>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="تسک جدیدی را وارد کنید و Enter بزنید..."
        />
        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg">
          افزودن
        </button>
      </form>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2 -mr-2">
        {tasks.map(task => (
          <InboxTaskItem key={task.id} task={task} onDelete={onDelete} onCategorize={onCategorize} />
        ))}
        {tasks.length === 0 && <p className="text-slate-500 text-center py-4">صندوق ورودی خالی است.</p>}
      </div>
    </div>
  );
};

export default TaskInbox;
