import React from 'react';

const toShamsi = (dateString: string): string => {
    try {
        const date = new Date(dateString);
         // Adjust for timezone offset to prevent date shifting
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }).format(adjustedDate);
    } catch (e) {
        console.error("Failed to format date:", e);
        return "تاریخ نامعتبر";
    }
};


interface HeaderProps {
    selectedDate: string;
    onDateChange: (offset: number) => void;
    onGoToToday: () => void;
    onAddTaskClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange, onGoToToday, onAddTaskClick }) => {
  return (
    <header className="text-center border-b-2 border-slate-700 pb-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        ماتریس مدیریت زمان ویدیجی مارکتینگ
      </h1>
      <p className="text-slate-400 mt-2">وظایف خود را بر اساس اولویت مرتب کنید و بهره‌وری خود را افزایش دهید.</p>
      
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
            <button onClick={() => onDateChange(1)} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">فردا &larr;</button>
            <button onClick={onGoToToday} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md font-bold transition-colors">امروز</button>
            <button onClick={() => onDateChange(-1)} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">&rarr; دیروز</button>
        </div>
        <div className="text-lg font-semibold text-slate-300">
            {toShamsi(selectedDate)}
        </div>
        <button 
          onClick={onAddTaskClick}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          افزودن مستقیم
        </button>
      </div>
    </header>
  );
};

export default Header;
