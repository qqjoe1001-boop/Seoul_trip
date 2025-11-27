import React, { useState, useRef } from 'react';
import { Activity } from '../types';
import { ACTIVITY_ICONS, SUBWAY_LINE_COLORS } from '../constants';

interface ActivityCardProps {
  activity: Activity;
  index: number;
  isLast: boolean;
  onEdit: (index: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  index, 
  isLast,
  onEdit,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const [isLongPressActive, setIsLongPressActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const iconClass = ACTIVITY_ICONS[activity.type] || 'fa-circle';
  
  // Highlight concerts or flights
  const isHighlight = activity.type === 'concert' || activity.type === 'flight';
  
  // Helper to parse text and inject inline badges
  const renderTransitInfo = (info: string) => {
    // Regex matches "Line X", "X號線", "X号线", "X호선", "AREX", "Shinbundang", "Gyeongui"
    // Supports number before or after the text
    const splitRegex = /((?:Line)\s?\d+|\d+\s?(?:號線|号线|호선)|AREX|Shinbundang|Gyeongui)/gi;
    const parts = info.split(splitRegex);

    return (
      <div className="text-sm text-slate-700 leading-relaxed">
        <span className="font-bold mr-2">交通:</span>
        {parts.map((part, index) => {
          const match = part.match(/(?:Line)\s?\d+|\d+\s?(?:號線|号线|호선)|AREX|Shinbundang|Gyeongui/i);
          if (match) {
            let lineNum = '';
            
            // Extract the number from string (handles "Line 4" and "4號線")
            const digitMatch = part.match(/\d+/);
            if (digitMatch) {
              lineNum = digitMatch[0];
            } else {
              // Handle named lines
              const fullMatch = part.toUpperCase();
              if (fullMatch.includes('AREX')) lineNum = 'A';
              if (fullMatch.includes('SHINBUNDANG')) lineNum = 'S';
              if (fullMatch.includes('GYEONGUI')) lineNum = 'K';
            }
            
            const colorClass = SUBWAY_LINE_COLORS[lineNum] || SUBWAY_LINE_COLORS.default;
            return (
              <span key={index} className={`inline-block mx-1 px-2 py-0.5 rounded-md font-bold shadow-sm ${colorClass} text-xs align-middle`}>
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location + " " + activity.title)}`;

  // --- Long Press Logic ---
  const startPress = () => {
    timerRef.current = setTimeout(() => {
      setIsLongPressActive(true);
      if (navigator.vibrate) navigator.vibrate(50); // Haptic feedback
    }, 200);
  };

  const cancelPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setTimeout(() => {
        setIsLongPressActive(false);
    }, 100);
  };

  const handleDragEnd = () => {
    setIsLongPressActive(false);
  };

  return (
    <div 
      className={`relative pl-12 pb-12 last:pb-0 group/card transition-all duration-200 select-none
        ${isLongPressActive ? 'scale-[1.02] z-20 cursor-grabbing' : ''}
      `}
      draggable={isLongPressActive}
      onDragStart={(e) => {
        if (isLongPressActive) onDragStart(e, index);
        else e.preventDefault();
      }}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={handleDragEnd}
      
      // Mouse Events
      onMouseDown={startPress}
      onMouseUp={cancelPress}
      onMouseLeave={cancelPress}
      
      // Touch Events
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      onTouchMove={() => {
          // If user moves finger (scrolls) before timer fires, cancel the long press
          if (timerRef.current) clearTimeout(timerRef.current);
      }}
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[15px] top-10 bottom-0 w-1 bg-rose-200 opacity-70" />
      )}
      
      {/* Icon Bubble (Visual indicator, also acts as manual handle hint) */}
      <div className={`
        absolute left-0 top-2 w-9 h-9 rounded-full flex items-center justify-center border-[3px] z-10 shadow-md transition-transform
        ${isLongPressActive ? 'scale-125 ring-2 ring-rose-300' : ''}
        ${isHighlight 
            ? 'bg-rose-500 border-rose-200 text-white' 
            : 'bg-white border-rose-100 text-rose-400'}
      `}
      >
        <i className={`fa-solid ${iconClass} text-sm`}></i>
      </div>

      {/* Transit Info - FORCE ROW LAYOUT to prevent break */}
      {activity.transitInfo && (
        <div className="mb-4 p-3 bg-white rounded-xl border border-sky-100 shadow-sm flex flex-row items-start gap-3 relative z-0">
           <div className="bg-sky-100 p-1.5 rounded-full text-sky-600 shrink-0 mt-0.5">
             <i className="fa-solid fa-train-subway text-base"></i>
           </div>
           <div className="flex-1 min-w-0">
             {renderTransitInfo(activity.transitInfo)}
           </div>
           <a 
             href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activity.location)}&travelmode=transit`}
             target="_blank"
             rel="noopener noreferrer"
             className="text-sky-400 hover:text-sky-600 px-2 mt-0.5 shrink-0"
             onTouchStart={(e) => e.stopPropagation()} // Prevent map link from triggering drag
             onMouseDown={(e) => e.stopPropagation()}
           >
             <i className="fa-solid fa-map-location-dot text-lg"></i>
           </a>
        </div>
      )}

      {/* Content Card */}
      <div className={`
        relative rounded-[1.5rem] p-6 border transition-all overflow-hidden
        ${isLongPressActive ? 'shadow-2xl shadow-rose-200 ring-2 ring-rose-300' : 'hover:shadow-xl hover:shadow-rose-200/50 hover:-translate-y-1'}
        ${isHighlight 
          ? 'bg-gradient-to-br from-rose-50 to-white border-rose-200' 
          : 'bg-white border-slate-100'
        }
      `}>
        {/* Edit Button */}
        <button 
          onClick={() => onEdit(index)}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/80 shadow text-slate-400 hover:text-rose-500 hover:bg-white transition-colors flex items-center justify-center z-20"
          onTouchStart={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <i className="fa-solid fa-pen text-sm"></i>
        </button>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
          <span className={`
            inline-block text-lg font-black px-4 py-1.5 rounded-lg shadow-sm tracking-wide
            ${isHighlight ? 'bg-rose-100 text-rose-500' : 'bg-rose-50 text-rose-400'}
          `}>
            {activity.time}
          </span>
          
          <a 
            href={googleMapUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 hover:opacity-80 transition-opacity pr-10"
            onTouchStart={(e) => e.stopPropagation()} // Prevent link from triggering drag
            onMouseDown={(e) => e.stopPropagation()}
          >
            <span className="text-lg font-black text-black uppercase tracking-wide border-b-2 border-transparent hover:border-rose-200">
              <i className="fa-solid fa-location-dot text-rose-500 mr-2"></i>
              {activity.location}
            </span>
            <i className="fa-solid fa-arrow-up-right-from-square text-slate-300 text-sm hover:text-rose-400"></i>
          </a>
        </div>
        
        <h3 className={`font-extrabold text-xl mb-2 tracking-tight ${isHighlight ? 'text-rose-500' : 'text-slate-800'}`}>
          {activity.title}
        </h3>
        
        <p className={`text-lg leading-relaxed font-medium ${isHighlight ? 'text-rose-500 opacity-70' : 'text-slate-500'}`}>
          {activity.description}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;