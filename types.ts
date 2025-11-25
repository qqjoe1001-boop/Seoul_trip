export type Language = 'zh' | 'en' | 'ja';

export interface Expense {
  id: string;
  item: string;
  cost: number;
  category: 'food' | 'transport' | 'shopping' | 'accommodation' | 'other';
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'flight' | 'transport' | 'attraction' | 'food' | 'concert' | 'hotel';
  transitInfo?: string; // Estimated subway/bus info
  imageUrl?: string;
  imageKeyword?: string;
}

export interface DayPlan {
  day: number;
  date: string; // YYYY-MM-DD
  title: string;
  activities: Activity[];
  expenses: Expense[];
}

export interface TripData {
  days: DayPlan[];
}

export const INITIAL_TRIP_DATA: TripData = {
  days: []
};