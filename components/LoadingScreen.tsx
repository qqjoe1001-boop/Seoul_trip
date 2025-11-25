import React from 'react';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface LoadingScreenProps {
  lang: Language;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ lang }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50/30 text-center px-4">
      <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{UI_TEXT[lang].loading}</h2>
      <p className="text-slate-500 max-w-md text-lg">
        {UI_TEXT[lang].loadingSub}
      </p>
    </div>
  );
};

export default LoadingScreen;