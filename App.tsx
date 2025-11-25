import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DayTabs from './components/DayTabs';
import ActivityCard from './components/ActivityCard';
import LoadingScreen from './components/LoadingScreen';
import AddActivityModal from './components/AddActivityModal';
import { generateItinerary } from './services/geminiService';
import { TripData, Language, Activity } from './types';
import { UI_TEXT } from './constants';

const App: React.FC = () => {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('zh');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for editing
  const [editingTarget, setEditingTarget] = useState<{dayId: number, index: number} | null>(null);
  
  // Drag and Drop State
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  // Fetch itinerary whenever language changes
  useEffect(() => {
    const fetchItinerary = async () => {
      setLoading(true);
      setTripData(null); 
      const data = await generateItinerary(language);
      setTripData(data);
      setLoading(false);
    };

    fetchItinerary();
  }, [language]);

  // Handle Drag Start
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    // Required for Firefox
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle Drag Over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); // Necessary to allow dropping
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    
    // Only reorder if dragging over a different item
    if (tripData) {
        const days = [...tripData.days];
        const dayIndex = days.findIndex(d => d.day === selectedDayId);
        if (dayIndex === -1) return;

        const activities = [...days[dayIndex].activities];
        const draggedItem = activities[draggedItemIndex];
        
        // Remove from old index
        activities.splice(draggedItemIndex, 1);
        // Insert at new index
        activities.splice(index, 0, draggedItem);
        
        days[dayIndex].activities = activities;
        setTripData({ ...tripData, days });
        setDraggedItemIndex(index); // Update dragged index to current position
    }
  };

  // Handle Drop (Commit change)
  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedItemIndex(null);
  };

  // Open modal for editing
  const handleEditActivity = (index: number) => {
    setEditingTarget({ dayId: selectedDayId, index });
    setIsModalOpen(true);
  };

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingTarget(null);
    setIsModalOpen(true);
  };

  const handleSaveActivity = (activityData: Activity) => {
      if (!tripData) return;
      const days = [...tripData.days];
      const dayIndex = days.findIndex(d => d.day === selectedDayId);
      if (dayIndex === -1) return;
      
      const activities = [...days[dayIndex].activities];

      if (editingTarget) {
        // Update existing activity
        if (editingTarget.dayId === selectedDayId) {
          activities[editingTarget.index] = {
            ...activities[editingTarget.index], // keep hidden props like transitInfo if not edited
            ...activityData
          };
          // Re-sort in case time changed
          activities.sort((a, b) => a.time.localeCompare(b.time));
          days[dayIndex].activities = activities;
          setTripData({ ...tripData, days });
        }
      } else {
        // Add new activity
        activities.push(activityData);
        activities.sort((a, b) => a.time.localeCompare(b.time));
        days[dayIndex].activities = activities;
        setTripData({ ...tripData, days });
      }
  };

  if (loading) return <LoadingScreen lang={language} />;
  if (!tripData) return <div className="p-10 text-center text-xl text-rose-500">{UI_TEXT[language].error}</div>;

  const currentDay = tripData.days.find(d => d.day === selectedDayId) || tripData.days[0];
  
  // Calculate initial data for modal if editing
  const editingActivity = editingTarget 
    ? tripData.days.find(d => d.day === editingTarget.dayId)?.activities[editingTarget.index] 
    : null;
  
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-hidden transition-colors duration-500">
      {/* Fixed Top Section: Header & Day Tabs */}
      <Header 
        currentLang={language} 
        onLangChange={setLanguage} 
        currentDayPlan={currentDay}
      />
      
      <div className="shrink-0 bg-white/60 backdrop-blur-md border-b border-rose-200 z-40 transition-colors">
        <div className="max-w-3xl mx-auto px-4 py-2">
          <DayTabs 
            days={tripData.days} 
            selectedDayId={selectedDayId} 
            onSelectDay={setSelectedDayId} 
            lang={language}
          />
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        <main className="max-w-3xl mx-auto px-4 pt-6 pb-32">
          {/* Timeline Title */}
          <div className="bg-white/60 backdrop-blur-sm rounded-[2.5rem] p-4 sm:p-10 shadow-xl shadow-rose-200/40 border border-white transition-all">
            <div className="mb-8 border-b-2 border-rose-200 pb-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight drop-shadow-sm text-center sm:text-left">
                {currentDay.title}
              </h2>
            </div>
            
            <div className="relative">
               {currentDay.activities.map((activity, index) => (
                 <ActivityCard 
                   key={`${selectedDayId}-${index}`} 
                   index={index}
                   activity={activity} 
                   isLast={index === currentDay.activities.length - 1} 
                   onEdit={handleEditActivity}
                   onDragStart={handleDragStart}
                   onDragOver={handleDragOver}
                   onDrop={handleDrop}
                 />
               ))}
            </div>
          </div>
          
          {/* Footer / Credits */}
          <footer className="mt-12 text-center text-slate-400 text-sm pb-8">
            <p className="flex justify-center items-center gap-2">
               <i className="fa-solid fa-sparkles text-yellow-400"></i>
               {UI_TEXT[language].footer}
               <i className="fa-solid fa-sparkles text-yellow-400"></i>
            </p>
            <p className="mt-1 opacity-60">Kyuhyun 'The Classic' Tour 2025</p>
          </footer>
        </main>
      </div>
      
      {/* Floating Action Button */}
      <button 
        onClick={handleOpenAddModal}
        className="fixed bottom-6 right-6 w-16 h-16 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg shadow-rose-200 flex items-center justify-center text-2xl hover:scale-110 transition-all z-50 active:scale-95"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      <AddActivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveActivity}
        lang={language}
        initialData={editingActivity}
      />
    </div>
  );
};

export default App;