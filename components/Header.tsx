import React, { useState, useEffect } from 'react';
import { APP_TITLE, SUBTITLE, SEOUL_WEATHER } from '../constants';
import { Language, DayPlan } from '../types';

interface HeaderProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  currentDayPlan?: DayPlan;
}

const Header: React.FC<HeaderProps> = ({ currentLang, onLangChange, currentDayPlan }) => {
  const [seoulTime, setSeoulTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      // Format time for Seoul (Asia/Seoul)
      const timeString = date.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Seoul',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      setSeoulTime(timeString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    let locale = 'en-US';
    if (currentLang === 'zh') locale = 'zh-TW';
    else if (currentLang === 'ja') locale = 'ja-JP';
    else if (currentLang === 'ko') locale = 'ko-KR';

    return date.toLocaleDateString(locale, {
      weekday: 'short',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-md border-rose-100 border-b z-50">
      {/* Top Bar: Title & Controls */}
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
             <h1 className="text-xl sm:text-2xl font-bold text-rose-500 tracking-tight flex items-center">
              <i className="fa-solid fa-heart mr-2 opacity-50"></i>
              {APP_TITLE}
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">{SUBTITLE}</p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {/* Lang Switcher */}
            <div className="flex gap-1 bg-rose-50 p-1 rounded-full border border-rose-200 scale-90 sm:scale-100 origin-right">
              <button 
                onClick={() => onLangChange('zh')}
                className={`px-3 py-1 rounded-full text-lg font-bold transition-all ${currentLang === 'zh' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400 hover:text-rose-400'}`}
              >
                ZH
              </button>
              <button 
                onClick={() => onLangChange('ko')}
                className={`px-3 py-1 rounded-full text-lg font-bold transition-all ${currentLang === 'ko' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400 hover:text-rose-400'}`}
              >
                KO
              </button>
              <button 
                onClick={() => onLangChange('en')}
                className={`px-3 py-1 rounded-full text-lg font-bold transition-all ${currentLang === 'en' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400 hover:text-rose-400'}`}
              >
                EN
              </button>
              <button 
                onClick={() => onLangChange('ja')}
                className={`px-3 py-1 rounded-full text-lg font-bold transition-all ${currentLang === 'ja' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400 hover:text-rose-400'}`}
              >
                JP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar: Date, Time, Weather */}
      <div className="bg-slate-50 border-t border-slate-100 text-slate-600 text-sm font-medium">
        <div className="max-w-3xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <span className="bg-rose-100 text-rose-500 px-2 py-0.5 rounded text-xs font-bold">
               {currentDayPlan ? `Day ${currentDayPlan.day}` : 'Seoul'}
             </span>
             <span className="text-slate-800">
               {currentDayPlan ? formatDate(currentDayPlan.date) : ''}
             </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-blue-500">
              <i className={`fa-solid ${SEOUL_WEATHER.icon}`}></i>
              <span>{SEOUL_WEATHER.temp}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono bg-slate-200 px-2 py-0.5 rounded text-slate-700">
              <i className="fa-regular fa-clock text-xs"></i>
              {seoulTime}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;