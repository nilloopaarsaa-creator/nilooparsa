import React, { useState, useEffect, useCallback } from 'react';
import { PlayIcon, PauseIcon, ResetIcon } from './icons';

const WORK_MINUTES = 25 * 60;
const BREAK_MINUTES = 5 * 60;

const playBeep = () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) {
    console.warn("AudioContext is not supported by this browser.");
    return;
  }
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5 pitch for noticeability
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5); 
};


const PomodoroTimer = () => {
  const [mode, setMode] = useState('work');
  const [time, setTime] = useState(WORK_MINUTES);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = React.useRef<number | null>(null);

  const switchMode = useCallback(() => {
    playBeep();
    if (mode === 'work') {
      setMode('break');
      setTime(BREAK_MINUTES);
    } else {
      setMode('work');
      setTime(WORK_MINUTES);
    }
    setIsActive(false); // Pause on mode switch
  }, [mode]);


  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            switchMode();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, switchMode]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTime(mode === 'work' ? WORK_MINUTES : BREAK_MINUTES);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700 z-40">
        <div className="container mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="text-center">
                    <p className={`text-5xl font-mono ${mode === 'work' ? 'text-cyan-400' : 'text-green-400'}`}>{formatTime(time)}</p>
                    <p className="text-slate-400 text-sm">{mode === 'work' ? 'زمان تمرکز' : 'زمان استراحت'}</p>
                </div>
                 <div className="flex items-center gap-2">
                    <button onClick={toggleTimer} className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">
                        {isActive ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button onClick={resetTimer} className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">
                        <ResetIcon />
                    </button>
                </div>
            </div>
            <div className="text-right text-sm text-slate-400 max-w-lg">
                <h4 className="font-bold text-slate-300 mb-1">راهنمای تکنیک پومودورو</h4>
                <p>۱. یک تسک انتخاب کنید و تایمر را روی ۲۵ دقیقه تنظیم کنید.</p>
                <p>۲. تا پایان زمان، فقط روی آن تسک تمرکز کنید. از شبکه‌های اجتماعی، ایمیل و تماس‌های غیرضروری دوری کنید.</p>
                <p>۳. پس از ۲۵ دقیقه، ۵ دقیقه استراحت کنید. بعد از هر ۴ پومودورو، یک استراحت طولانی‌تر (۱۵-۳۰ دقیقه) داشته باشید.</p>
            </div>
        </div>
    </div>
  );
};

export default PomodoroTimer;