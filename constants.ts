import { Language } from './types';

export const APP_TITLE = "Seoul Holiday 2025";
export const SUBTITLE = "Kyuhyun 'The Classic' & Cultural Tour";

export const TRIP_START_DATE = "2025-12-18";
export const TRIP_END_DATE = "2025-12-24";

export const SEOUL_WEATHER = {
  temp: "-2°C",
  condition: "Sunny 晴",
  icon: "fa-sun"
};

// Pastel/Girly Color Palette (Used for specific tags)
export const CATEGORY_COLORS = {
  food: 'bg-orange-100 text-orange-500 border-orange-200',
  transport: 'bg-sky-100 text-sky-500 border-sky-200',
  shopping: 'bg-rose-100 text-rose-500 border-rose-200',
  accommodation: 'bg-violet-100 text-violet-500 border-violet-200',
  other: 'bg-slate-100 text-slate-500 border-slate-200',
  concert: 'bg-fuchsia-100 text-fuchsia-600 border-fuchsia-200',
  flight: 'bg-blue-100 text-blue-600 border-blue-200',
};

export const ACTIVITY_ICONS = {
  flight: 'fa-plane',
  transport: 'fa-bus',
  attraction: 'fa-camera',
  food: 'fa-utensils',
  concert: 'fa-music',
  hotel: 'fa-bed',
};

// Official Seoul Subway Colors
export const SUBWAY_LINE_COLORS: Record<string, string> = {
  '1': 'bg-[#0052A4] text-white',
  '2': 'bg-[#00A84D] text-white',
  '3': 'bg-[#EF7C1C] text-white',
  '4': 'bg-[#00A4E3] text-white',
  '5': 'bg-[#996CAC] text-white',
  '6': 'bg-[#CD7C2F] text-white',
  '7': 'bg-[#747F00] text-white',
  '8': 'bg-[#E6186C] text-white',
  '9': 'bg-[#BDB092] text-white',
  'A': 'bg-[#0090D2] text-white', // AREX
  'S': 'bg-[#D4003B] text-white', // Shinbundang
  'K': 'bg-[#77C4A3] text-white', // Gyeongui-Jungang
  'default': 'bg-slate-200 text-slate-600'
};

export const UI_TEXT = {
  zh: {
    loading: "正在為您規劃夢幻首爾之旅...",
    loadingSub: "安排交通轉乘、圭賢演唱會及韓屋村行程中",
    day: "Day",
    footer: "Built with Gemini AI",
    error: "載入失敗，請稍後再試",
    addActivity: "新增行程",
    save: "儲存",
    cancel: "取消",
    title: "標題",
    time: "時間",
    location: "地點",
    desc: "描述",
    type: "類型"
  },
  en: {
    loading: "Planning your dreamy Seoul Trip...",
    loadingSub: "Organizing subway routes, Kyuhyun's concert, and Hanok visits",
    day: "Day",
    footer: "Built with Gemini AI",
    error: "Failed to load data, please try again",
    addActivity: "Add Activity",
    save: "Save",
    cancel: "Cancel",
    title: "Title",
    time: "Time",
    location: "Location",
    desc: "Description",
    type: "Type"
  },
  ja: {
    loading: "ソウル旅行を計画中...",
    loadingSub: "地下鉄のルート、キュヒョンのコンサート、韓屋村の訪問を調整しています",
    day: "Day",
    footer: "Built with Gemini AI",
    error: "データの読み込みに失敗しました",
    addActivity: "アクティビティを追加",
    save: "保存",
    cancel: "キャンセル",
    title: "タイトル",
    time: "時間",
    location: "場所",
    desc: "説明",
    type: "タイプ"
  }
};

export const SEOUL_IMAGES: Record<string, string[]> = {
  flight: [
    "https://images.unsplash.com/photo-1542296332-2e44a996aa0d?auto=format&fit=crop&q=80&w=800", // Passport/Plane
    "https://images.unsplash.com/photo-1578652392769-d4c38d3885d5?auto=format&fit=crop&q=80&w=800"  // Airport
  ],
  palace: [
    "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&q=80&w=800", // Gyeongbokgung
    "https://images.unsplash.com/photo-1610534279549-34208e8b0933?auto=format&fit=crop&q=80&w=800"  // Hanok Village
  ],
  hanok: [
    "https://images.unsplash.com/photo-1533973663678-293d6e32623e?auto=format&fit=crop&q=80&w=800", // Bukchon
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"  // Hanok Hotel
  ],
  food: [
    "https://images.unsplash.com/photo-1583223667854-e0e05b1ad4f3?auto=format&fit=crop&q=80&w=800", // Samgyetang
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800", // Bibimbap
    "https://images.unsplash.com/photo-1596756285852-c62d0432354c?auto=format&fit=crop&q=80&w=800", // BBQ
    "https://images.unsplash.com/photo-1606509893874-8aa47be88d18?auto=format&fit=crop&q=80&w=800"  // Noodles
  ],
  shopping: [
    "https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?auto=format&fit=crop&q=80&w=800", // Myeongdong
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800"  // Department Store
  ],
  tower: [
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800", // N Tower Far
    "https://images.unsplash.com/photo-1601625463687-25541fb72f62?auto=format&fit=crop&q=80&w=800"  // N Tower Close
  ],
  concert: [
    "https://images.unsplash.com/photo-1459749411177-287ce371c015?auto=format&fit=crop&q=80&w=800", // Concert Lights
    "https://images.unsplash.com/photo-1569424647610-d8869c4c5a71?auto=format&fit=crop&q=80&w=800"  // Olympic Park
  ],
  river: [
    "https://images.unsplash.com/photo-1632734493309-823a07a67f00?auto=format&fit=crop&q=80&w=800", // Hangang Park
    "https://images.unsplash.com/photo-1534944883909-54b9d0dc6b0d?auto=format&fit=crop&q=80&w=800"  // Cruise
  ],
  transport: [
    "https://images.unsplash.com/photo-1570125909232-eb2be79a1c74?auto=format&fit=crop&q=80&w=800", // Bus
    "https://images.unsplash.com/photo-1557221177-149eb55e89af?auto=format&fit=crop&q=80&w=800"  // Bus 2
  ],
  hotel: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800", // Hotel Ext
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"  // Hotel Int
  ]
};