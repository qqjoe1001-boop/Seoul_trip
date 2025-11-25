import React, { useState, useEffect } from 'react';
import { Language, Activity } from '../types';
import { UI_TEXT } from '../constants';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
  lang: Language;
  initialData?: Activity | null;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({ isOpen, onClose, onSave, lang, initialData }) => {
  const [formData, setFormData] = useState<Partial<Activity>>({
    time: '12:00',
    title: '',
    description: '',
    location: '',
    type: 'attraction'
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    } else if (isOpen && !initialData) {
      // Reset if opening in add mode
      setFormData({
        time: '12:00',
        title: '',
        description: '',
        location: '',
        type: 'attraction'
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.time && formData.title && formData.location) {
        onSave({
            time: formData.time,
            title: formData.title,
            description: formData.description || '',
            location: formData.location,
            type: formData.type as any,
            transitInfo: initialData?.transitInfo || '', // Keep existing transit info if editing
            imageKeyword: formData.type
        });
        onClose();
        // Reset form
        setFormData({ time: '12:00', title: '', description: '', location: '', type: 'attraction' });
    }
  };

  const focusClass = "focus:outline-none focus:ring-rose-300 focus:border-transparent focus:ring-2";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <i className={`fa-solid ${initialData ? 'fa-pen-to-square' : 'fa-circle-plus'} text-rose-500 mr-2`}></i>
            {initialData ? (lang === 'zh' ? '編輯行程' : lang === 'ja' ? 'アクティビティを編集' : 'Edit Activity') : UI_TEXT[lang].addActivity}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">{UI_TEXT[lang].time}</label>
                <input 
                    type="time" 
                    required
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-bold ${focusClass}`}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">{UI_TEXT[lang].title}</label>
                <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl p-3 ${focusClass}`}
                    placeholder="e.g. Shopping"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">{UI_TEXT[lang].location}</label>
                <input 
                    type="text" 
                    required
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl p-3 ${focusClass}`}
                    placeholder="e.g. Myeongdong"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">{UI_TEXT[lang].type}</label>
                <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as any})}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl p-3 ${focusClass}`}
                >
                    <option value="attraction">Attraction</option>
                    <option value="food">Food</option>
                    <option value="shopping">Shopping</option>
                    <option value="concert">Concert</option>
                    <option value="transport">Transport</option>
                    <option value="hotel">Hotel</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">{UI_TEXT[lang].desc}</label>
                <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl p-3 h-24 ${focusClass}`}
                />
            </div>

            <div className="flex gap-3 pt-4">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition"
                >
                    {UI_TEXT[lang].cancel}
                </button>
                <button 
                    type="submit" 
                    className="flex-1 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 transition"
                >
                    {UI_TEXT[lang].save}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;