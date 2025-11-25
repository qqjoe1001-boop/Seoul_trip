import React, { useState } from 'react';
import { Expense } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface ExpenseTrackerProps {
  expenses: Expense[];
  onAddExpense: (item: string, cost: number, category: Expense['category']) => void;
  onRemoveExpense: (id: string) => void;
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ expenses, onAddExpense, onRemoveExpense }) => {
  const [item, setItem] = useState('');
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState<Expense['category']>('food');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !cost) return;
    onAddExpense(item, parseInt(cost), category);
    setItem('');
    setCost('');
  };

  const dayTotal = expenses.reduce((sum, curr) => sum + curr.cost, 0);

  return (
    <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          <i className="fa-solid fa-wallet text-emerald-500"></i>
          Daily Expenses
        </h3>
        <span className="font-bold text-emerald-600">₩ {dayTotal.toLocaleString()}</span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-2 mb-4">
        <div className="col-span-12 sm:col-span-5">
           <input 
             type="text" 
             placeholder="Item (e.g., Dinner)" 
             value={item}
             onChange={(e) => setItem(e.target.value)}
             className="w-full text-sm p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
           />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <input 
             type="number" 
             placeholder="₩ Cost" 
             value={cost}
             onChange={(e) => setCost(e.target.value)}
             className="w-full text-sm p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
           />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full text-sm p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="col-span-12 sm:col-span-1">
          <button type="submit" className="w-full h-full bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition flex items-center justify-center p-2 sm:p-0">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-2">
        {expenses.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-2">No expenses recorded for this day.</p>
        ) : (
          expenses.map(exp => (
            <div key={exp.id} className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 rounded-lg group">
              <div className="flex items-center gap-3">
                 <span className={`text-[10px] px-1.5 py-0.5 rounded border ${CATEGORY_COLORS[exp.category] || CATEGORY_COLORS.other}`}>
                   {exp.category}
                 </span>
                 <span className="text-slate-700">{exp.item}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-600">₩ {exp.cost.toLocaleString()}</span>
                <button 
                  onClick={() => onRemoveExpense(exp.id)}
                  className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                >
                  <i className="fa-solid fa-trash text-xs"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;