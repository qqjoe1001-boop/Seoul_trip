import React from 'react';
import { DayPlan, Language } from '../types';
import { UI_TEXT } from '../constants';

interface DayTabsProps {
  days: DayPlan[];
  selectedDayId: number;
  onSelectDay: (dayId: number) => void;
  lang: Language;
}

const DayTabs: React.FC<DayTabsProps> = ({ days, selectedDayId, onSelectDay, lang }) => {
  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
      <div className="flex space-x-3 min-w-max">
        {days.map((day) => {
          const isSelected = day.day === selectedDayId;
          const dateObj = new Date(day.date);
          const month = dateObj.getMonth() + 1;
          const dateNum = dateObj.getDate();
          
          return (
            <button
              key={day.day}
              onClick={() => onSelectDay(day.day)}
              className={`
                flex flex-col items-center justify-center min-w-[5.5rem] py-3 px-4 rounded-2xl transition-all duration-300 border
                ${isSelected 
                  ? 'bg-gradient-to-br from-rose-400 to-rose-500 text-white border-rose-200 shadow-lg shadow-rose-200 scale-105' 
                  : 'bg-white text-slate-400 border-slate-100 hover:border-rose-200 hover:bg-rose-50'
                }
              `}
            >
              <span className={`font-medium opacity-90 mb-1 ${isSelected ? 'text-sm' : 'text-xs'}`}>
                {UI_TEXT[lang].day} {day.day}
              </span>
              <span className="text-xl font-bold">{month}/{dateNum}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DayTabs;