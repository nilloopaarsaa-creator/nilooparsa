
import React, { useState } from 'react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (text: string, isImportant: boolean, isUrgent: boolean) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [text, setText] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim(), isImportant, isUrgent);
      setText('');
      setIsImportant(false);
      setIsUrgent(false);
      onClose();
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
        onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">افزودن تسک جدید</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="taskText" className="block text-slate-300 text-sm font-bold mb-2">
              شرح تسک
            </label>
            <input
              id="taskText"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="مثال: آماده کردن گزارش هفتگی"
              required
            />
          </div>
          <div className="flex justify-around mb-6">
            <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
              <input
                type="checkbox"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
                className="form-checkbox h-5 w-5 rounded bg-slate-900 border-slate-600 text-cyan-500 focus:ring-cyan-600"
              />
              <span className="text-slate-300">مهم</span>
            </label>
            <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="form-checkbox h-5 w-5 rounded bg-slate-900 border-slate-600 text-cyan-500 focus:ring-cyan-600"
              />
              <span className="text-slate-300">فوری</span>
            </label>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              افزودن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
