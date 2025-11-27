import { GoogleGenAI, Type } from "@google/genai";
import { TripData, Language } from "../types";
import { SEOUL_IMAGES } from "../constants";

const FALLBACK_DATA: Record<Language, TripData> = {
  zh: {
    days: [
        {
            day: 1, date: "2025-12-18", title: "抵達首爾", expenses: [],
            activities: [
                { time: "15:15", title: "長榮航空 BR160 起飛", description: "前往仁川國際機場", location: "桃園機場 T2", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[0] },
                { time: "18:45", title: "抵達仁川機場", description: "辦理入境手續、領取行李", location: "仁川機場 T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] },
                { time: "19:40", title: "搭乘機場巴士 6015", description: "直達 Wecostay Namsan", location: "機場巴士站 5B-1", type: "transport", transitInfo: "機場巴士 6015 (約 70 分鐘) -> 於 [退溪路3街韓屋村站] 下車", imageUrl: SEOUL_IMAGES.transport[0] },
                { time: "21:10", title: "入住 Wecostay Namsan", description: "忠武路站附近，整理休息", location: "Wecostay Namsan", type: "hotel", transitInfo: "下車後步行約 5 分鐘", imageUrl: SEOUL_IMAGES.hotel[1] }
            ]
        },
        {
            day: 2, date: "2025-12-19", title: "古宮與韓屋漫步", expenses: [],
            activities: [
                { time: "10:00", title: "光化門廣場 & 景福宮", description: "參觀王宮守門將換崗儀式", location: "景福宮", type: "attraction", transitInfo: "3號線 [忠武路站] 搭乘 (往安國方向) -> 經過 4 站 -> 於 [景福宮站] 下車", imageUrl: SEOUL_IMAGES.palace[0] },
                { time: "12:30", title: "午餐：土俗村參雞湯", description: "享用暖呼呼的傳統蔘雞湯", location: "土俗村參雞湯", type: "food", transitInfo: "步行 10 分鐘", imageUrl: SEOUL_IMAGES.food[0] },
                { time: "14:30", title: "北村韓屋村", description: "探索傳統韓屋建築之美", location: "北村韓屋村", type: "attraction", transitInfo: "步行 15 分鐘", imageUrl: SEOUL_IMAGES.hanok[0] },
                { time: "16:30", title: "仁寺洞步行街", description: "逛傳統工藝品店與茶館", location: "仁寺洞", type: "attraction", transitInfo: "步行 10 分鐘", imageUrl: SEOUL_IMAGES.palace[1] },
                { time: "19:00", title: "晚餐：仁寺洞韓定食", description: "體驗豐富的韓式料理", location: "仁寺洞美食街", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[1] }
            ]
        },
        {
            day: 3, date: "2025-12-20", title: "明洞與首爾塔", expenses: [],
            activities: [
                { time: "11:00", title: "明洞逛街", description: "美妝與潮流服飾購物", location: "明洞商圈", type: "attraction", transitInfo: "4號線 [忠武路站] 搭乘 (往明洞方向) -> 1 站 -> 於 [明洞站] 下車", imageUrl: SEOUL_IMAGES.shopping[0] },
                { time: "13:00", title: "午餐：明洞餃子", description: "必吃米其林推薦刀削麵", location: "明洞餃子", type: "food", transitInfo: "步行", imageUrl: SEOUL_IMAGES.food[3] },
                { time: "16:00", title: "南山纜車", description: "搭乘纜車前往首爾塔", location: "南山纜車", type: "transport", transitInfo: "步行或搭乘南山電梯 (明洞站 4 號出口附近)", imageUrl: SEOUL_IMAGES.tower[0] },
                { time: "17:30", title: "N首爾塔", description: "欣賞首爾夕陽與夜景", location: "N首爾塔", type: "attraction", transitInfo: "", imageUrl: SEOUL_IMAGES.tower[1] },
                { time: "19:30", title: "晚餐：炸豬排", description: "南山著名的炸豬排一條街", location: "南山炸豬排街", type: "food", transitInfo: "步行", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 4, date: "2025-12-21", title: "圭賢演唱會之日", expenses: [],
            activities: [
                { time: "10:00", title: "南山韓屋村", description: "幽靜的傳統庭院散步", location: "南山韓屋村", type: "attraction", transitInfo: "步行 10 分鐘 (忠武路站附近)", imageUrl: SEOUL_IMAGES.hanok[1] },
                { time: "12:00", title: "午餐", description: "忠武路附近美食", location: "忠武路", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[3] },
                { time: "15:00", title: "前往奧林匹克公園", description: "準備進場，購買周邊", location: "奧林匹克公園", type: "transport", transitInfo: "4號線 [忠武路站] (1站) -> [東大門歷史文化公園] 轉乘 -> 5號線 [奧林匹克公園站] (13站，約 45 分鐘)", imageUrl: SEOUL_IMAGES.concert[1] },
                { time: "17:00", title: "KYUHYUN Concert 'The Classic'", description: "享受圭賢溫暖的歌聲", location: "Olympic Hall", type: "concert", transitInfo: "步行至 Olympic Hall", imageUrl: SEOUL_IMAGES.concert[0] },
                { time: "20:30", title: "晚餐", description: "演唱會後慶功宴", location: "芳荑洞美食街", type: "food", transitInfo: "步行", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 5, date: "2025-12-22", title: "漢江浪漫遊", expenses: [],
            activities: [
                { time: "11:00", title: "汝矣島漢江公園", description: "江邊漫步與野餐氛圍", location: "汝矣島漢江公園", type: "attraction", transitInfo: "4號線 [忠武路站] -> [東大門歷史文化公園] 轉乘 -> 5號線 [汝矣渡口站] (下車即達)", imageUrl: SEOUL_IMAGES.river[0] },
                { time: "13:00", title: "午餐：現代百貨首爾", description: "The Hyundai Seoul 美食街", location: "The Hyundai Seoul", type: "food", transitInfo: "步行", imageUrl: SEOUL_IMAGES.shopping[1] },
                { time: "15:00", title: "The Hyundai Seoul 逛街", description: "首爾最潮百貨", location: "The Hyundai Seoul", type: "attraction", transitInfo: "", imageUrl: SEOUL_IMAGES.shopping[1] },
                { time: "19:00", title: "漢江遊覽船", description: "搭乘 Eland Cruise 欣賞夜景", location: "漢江遊覽船碼頭", type: "attraction", transitInfo: "沿漢江公園步行至碼頭", imageUrl: SEOUL_IMAGES.river[1] }
            ]
        },
        {
            day: 6, date: "2025-12-23", title: "放鬆與最後採購", expenses: [],
            activities: [
                { time: "11:00", title: "早午餐 Cafe", description: "享受悠閒咖啡時光", location: "乙支路", type: "food", transitInfo: "3號線 [忠武路站] 搭乘 -> 1 站 -> 於 [乙支路3街站] 下車", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" },
                { time: "14:00", title: "最後伴手禮採買", description: "樂天超市或便利店", location: "樂天超市 首爾站店", type: "attraction", transitInfo: "4號線 [忠武路站] 搭乘 -> 3 站 -> 於 [首爾站] 下車", imageUrl: "https://images.unsplash.com/photo-1580226993175-922616422cb4?auto=format&fit=crop&q=80&w=800" },
                { time: "18:00", title: "告別晚餐：韓式烤肉", description: "享用頂級韓牛或五花肉", location: "忠武路烤肉店", type: "food", transitInfo: "返回忠武路步行", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 7, date: "2025-12-24", title: "滿載而歸", expenses: [],
            activities: [
                { time: "06:10", title: "退房出發", description: "離開住宿前往機場巴士站", location: "Wecostay Namsan", type: "hotel", transitInfo: "步行至退溪路3街韓屋村站", imageUrl: SEOUL_IMAGES.hotel[0] },
                { time: "06:20", title: "搭乘機場巴士 6015", description: "前往仁川機場", location: "退溪路3街韓屋村站", type: "transport", transitInfo: "機場巴士 6015 (約 70-80 分鐘)", imageUrl: SEOUL_IMAGES.transport[1] },
                { time: "07:40", title: "抵達仁川機場", description: "辦理退稅、Check-in、逛免稅店", location: "仁川機場 T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] },
                { time: "11:40", title: "長榮航空 BR169 起飛", description: "再見首爾", location: "仁川機場 T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[0] },
                { time: "13:30", title: "抵達桃園機場", description: "溫暖的家", location: "桃園機場 T2", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] }
            ]
        }
    ]
  },
  en: {
    days: [
        {
            day: 1, date: "2025-12-18", title: "Arrival in Seoul", expenses: [],
            activities: [
                { time: "15:15", title: "EVA Air BR160 Departure", description: "Fly to Incheon Int'l Airport", location: "Taoyuan Airport T2", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[0] },
                { time: "18:45", title: "Arrival at Incheon", description: "Immigration & Baggage Claim", location: "Incheon Airport T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] },
                { time: "19:40", title: "Airport Bus 6015", description: "Direct to Wecostay Namsan", location: "Bus Stop 5B-1", type: "transport", transitInfo: "Bus 6015 (70 mins) -> Get off at [Toegyero 3-ga Hanok Village]", imageUrl: SEOUL_IMAGES.transport[0] },
                { time: "21:10", title: "Check-in Wecostay Namsan", description: "Near Chungmuro Station", location: "Wecostay Namsan", type: "hotel", transitInfo: "5 min walk from bus stop", imageUrl: SEOUL_IMAGES.hotel[1] }
            ]
        },
        {
            day: 2, date: "2025-12-19", title: "Palaces & Hanok Walk", expenses: [],
            activities: [
                { time: "10:00", title: "Gwanghwamun & Gyeongbokgung", description: "Royal Guard Changing Ceremony", location: "Gyeongbokgung Palace", type: "attraction", transitInfo: "Take Line 3 [Chungmuro] -> 4 stops -> Get off at [Gyeongbokgung Station]", imageUrl: SEOUL_IMAGES.palace[0] },
                { time: "12:30", title: "Lunch: Tosokchon Ginseng Chicken", description: "Famous Samgyetang", location: "Tosokchon Samgyetang", type: "food", transitInfo: "10 min walk", imageUrl: SEOUL_IMAGES.food[0] },
                { time: "14:30", title: "Bukchon Hanok Village", description: "Traditional Korean Houses", location: "Bukchon Hanok Village", type: "attraction", transitInfo: "15 min walk", imageUrl: SEOUL_IMAGES.hanok[0] },
                { time: "16:30", title: "Insadong Walking Street", description: "Traditional Crafts & Tea Houses", location: "Insadong", type: "attraction", transitInfo: "10 min walk", imageUrl: SEOUL_IMAGES.palace[1] },
                { time: "19:00", title: "Dinner: Insadong Hanjeongsik", description: "Korean Table d'hote", location: "Insadong", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[1] }
            ]
        },
        {
            day: 3, date: "2025-12-20", title: "Myeongdong & Namsan", expenses: [],
            activities: [
                { time: "11:00", title: "Myeongdong Shopping", description: "Cosmetics & Street Food", location: "Myeongdong Street", type: "attraction", transitInfo: "Take Line 4 [Chungmuro] -> 1 stop -> Get off at [Myeongdong Station]", imageUrl: SEOUL_IMAGES.shopping[0] },
                { time: "13:00", title: "Lunch: Myeongdong Kyoja", description: "Michelin Noodles", location: "Myeongdong Kyoja", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[3] },
                { time: "16:00", title: "Namsan Cable Car", description: "Ride up to N Seoul Tower", location: "Namsan Cable Car", type: "transport", transitInfo: "Walk or Namsan Elevator (near Myeongdong Exit 4)", imageUrl: SEOUL_IMAGES.tower[0] },
                { time: "17:30", title: "N Seoul Tower", description: "Sunset & City Views", location: "N Seoul Tower", type: "attraction", transitInfo: "", imageUrl: SEOUL_IMAGES.tower[1] },
                { time: "19:30", title: "Dinner: Namsan Tonkatsu", description: "Famous Pork Cutlet Street", location: "Namsan Tonkatsu Street", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 4, date: "2025-12-21", title: "Kyuhyun Concert Day", expenses: [],
            activities: [
                { time: "10:00", title: "Namsangol Hanok Village", description: "Peaceful Traditional Garden", location: "Namsangol Hanok Village", type: "attraction", transitInfo: "10 min walk from Chungmuro", imageUrl: SEOUL_IMAGES.hanok[1] },
                { time: "12:00", title: "Lunch", description: "Local food near Chungmuro", location: "Chungmuro", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[3] },
                { time: "15:00", title: "Head to Olympic Park", description: "Travel to concert venue", location: "Olympic Park", type: "transport", transitInfo: "Line 4 [Chungmuro] (1 stop) -> Transfer at [DDP] -> Line 5 [Olympic Park Station] (13 stops)", imageUrl: SEOUL_IMAGES.concert[1] },
                { time: "17:00", title: "KYUHYUN Concert 'The Classic'", description: "Enjoy the show!", location: "Olympic Hall", type: "concert", transitInfo: "Walk to Olympic Hall", imageUrl: SEOUL_IMAGES.concert[0] },
                { time: "20:30", title: "Celebratory Dinner", description: "Post-concert meal", location: "BangYi-Dong Food Alley", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 5, date: "2025-12-22", title: "Romantic Han River", expenses: [],
            activities: [
                { time: "11:00", title: "Yeouido Hangang Park", description: "Riverside Picnic & Chill", location: "Yeouido Hangang Park", type: "attraction", transitInfo: "Line 4 [Chungmuro] -> Transfer at [DDP] -> Line 5 [Yeouinaru Station]", imageUrl: SEOUL_IMAGES.river[0] },
                { time: "13:00", title: "Lunch: The Hyundai Seoul", description: "Trendy Food Court", location: "The Hyundai Seoul", type: "food", transitInfo: "Walk", imageUrl: SEOUL_IMAGES.shopping[1] },
                { time: "15:00", title: "The Hyundai Seoul", description: "Shopping at Seoul's Hottest Mall", location: "The Hyundai Seoul", type: "attraction", transitInfo: "", imageUrl: SEOUL_IMAGES.shopping[1] },
                { time: "19:00", title: "Han River Cruise", description: "Eland Cruise Night View", location: "Eland Cruise Dock", type: "attraction", transitInfo: "Walk to dock", imageUrl: SEOUL_IMAGES.river[1] }
            ]
        },
        {
            day: 6, date: "2025-12-23", title: "Relax & Last Shopping", expenses: [],
            activities: [
                { time: "11:00", title: "Brunch Cafe", description: "Relaxing Coffee Time", location: "Euljiro 3-ga", type: "food", transitInfo: "Take Line 3 [Chungmuro] -> 1 stop -> Get off at [Euljiro 3-ga]", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" },
                { time: "14:00", title: "Souvenir Shopping", description: "Lotte Mart or Convenience Stores", location: "Lotte Mart Seoul Station", type: "attraction", transitInfo: "Take Line 4 [Chungmuro] -> 3 stops -> Get off at [Seoul Station]", imageUrl: "https://images.unsplash.com/photo-1580226993175-922616422cb4?auto=format&fit=crop&q=80&w=800" },
                { time: "18:00", title: "Farewell Dinner: K-BBQ", description: "Premium Hanwoo or Pork Belly", location: "Chungmuro", type: "food", transitInfo: "Return to Chungmuro", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 7, date: "2025-12-24", title: "Homeward Bound", expenses: [],
            activities: [
                { time: "06:10", title: "Check-out", description: "Head to Bus Stop", location: "Wecostay Namsan", type: "hotel", transitInfo: "Walk to Toegyero 3-ga stop", imageUrl: SEOUL_IMAGES.hotel[0] },
                { time: "06:20", title: "Airport Bus 6015", description: "To Incheon Airport", location: "Bus Stop 6015", type: "transport", transitInfo: "Bus 6015 (70 mins)", imageUrl: SEOUL_IMAGES.transport[1] },
                { time: "07:40", title: "Arrive Incheon T1", description: "Tax Refund & Check-in", location: "Incheon Airport T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] },
                { time: "11:40", title: "EVA Air BR169 Departure", description: "Goodbye Seoul", location: "Incheon Airport T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[0] },
                { time: "13:30", title: "Arrival in Taoyuan", description: "Home Sweet Home", location: "Taoyuan Airport T2", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] }
            ]
        }
    ]
  },
  ja: {
    days: [
        {
            day: 1, date: "2025-12-18", title: "ソウル到着", expenses: [],
            activities: [
                { time: "15:15", title: "エバー航空 BR160 出発", description: "仁川国際空港へ", location: "桃園空港 T2", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[0] },
                { time: "18:45", title: "仁川空港 到着", description: "入国審査、荷物受取", location: "仁川空港 T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] },
                { time: "19:40", title: "空港バス 6015番", description: "Wecostay Namsanへ直行", location: "バス乗り場 5B-1", type: "transport", transitInfo: "空港バス 6015 (約70分) -> [退渓路3街・韓屋村] で下車", imageUrl: SEOUL_IMAGES.transport[0] },
                { time: "21:10", title: "Wecostay Namsan チェックイン", description: "忠武路駅近く", location: "Wecostay Namsan", type: "hotel", transitInfo: "バス停から徒歩5分", imageUrl: SEOUL_IMAGES.hotel[1] }
            ]
        },
        {
            day: 2, date: "2025-12-19", title: "古宮と韓屋の散策", expenses: [],
            activities: [
                { time: "10:00", title: "光化門広場 & 景福宮", description: "守門将交代式の見学", location: "景福宮", type: "attraction", transitInfo: "3号線 [忠武路] 乗車 -> 4駅移動 -> [景福宮駅] 下車", imageUrl: SEOUL_IMAGES.palace[0] },
                { time: "12:30", title: "ランチ：土俗村参鶏湯", description: "有名な参鶏湯（サムゲタン）", location: "土俗村参鶏湯", type: "food", transitInfo: "徒歩10分", imageUrl: SEOUL_IMAGES.food[0] },
                { time: "14:30", title: "北村韓屋村", description: "伝統的な韓屋の街並み", location: "北村韓屋村", type: "attraction", transitInfo: "徒歩15分", imageUrl: SEOUL_IMAGES.hanok[0] },
                { time: "16:30", title: "仁寺洞通り", description: "伝統工芸品と茶屋", location: "仁寺洞", type: "attraction", transitInfo: "徒歩10分", imageUrl: SEOUL_IMAGES.palace[1] },
                { time: "19:00", title: "ディナー：韓定食", description: "豪華な韓国料理コース", location: "仁寺洞", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[1] }
            ]
        },
        {
            day: 3, date: "2025-12-20", title: "明洞とソウルタワー", expenses: [],
            activities: [
                { time: "11:00", title: "明洞ショッピング", description: "コスメとファッション", location: "明洞通り", type: "attraction", transitInfo: "4号線 [忠武路] 乗車 -> 1駅移動 -> [明洞駅] 下車", imageUrl: SEOUL_IMAGES.shopping[0] },
                { time: "13:00", title: "ランチ：明洞餃子", description: "ミシュラン掲載のカルグクス", location: "明洞餃子", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[3] },
                { time: "16:00", title: "南山ケーブルカー", description: "ソウルタワーへ", location: "南山ケーブルカー", type: "transport", transitInfo: "徒歩または南山オルミ（エレベーター）", imageUrl: SEOUL_IMAGES.tower[0] },
                { time: "17:30", title: "Nソウルタワー", description: "夕日と夜景鑑賞", location: "Nソウルタワー", type: "attraction", transitInfo: "", imageUrl: SEOUL_IMAGES.tower[1] },
                { time: "19:30", title: "ディナー：南山トンカツ", description: "有名なトンカツ通り", location: "南山トンカツ通り", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 4, date: "2025-12-21", title: "キュヒョン コンサートの日", expenses: [],
            activities: [
                { time: "10:00", title: "南山韓屋村", description: "静かな伝統庭園の散策", location: "南山韓屋村", type: "attraction", transitInfo: "忠武路駅から徒歩10分", imageUrl: SEOUL_IMAGES.hanok[1] },
                { time: "12:00", title: "ランチ", description: "忠武路近くのグルメ", location: "忠武路", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[3] },
                { time: "15:00", title: "オリンピック公園へ移動", description: "会場へ移動、グッズ購入", location: "オリンピックホール", type: "transport", transitInfo: "4号線 [忠武路] (1駅) -> [東大門歴史文化公園] で乗換 -> 5号線 [オリンピック公園駅] (13駅)", imageUrl: SEOUL_IMAGES.concert[1] },
                { time: "17:00", title: "2025 KYUHYUN Concert", description: "'The Classic' コンサート鑑賞", location: "Olympic Hall", type: "concert", transitInfo: "ホールまで徒歩", imageUrl: SEOUL_IMAGES.concert[0] },
                { time: "20:30", title: "ディナー", description: "コンサート後の打ち上げ", location: "芳荑洞グルメ通り", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 5, date: "2025-12-22", title: "漢江ロマンチックツアー", expenses: [],
            activities: [
                { time: "11:00", title: "汝矣島漢江公園", description: "川沿いでのピクニック", location: "汝矣島漢江公園", type: "attraction", transitInfo: "4号線 [忠武路] -> [東大門歴史文化公園] 乗換 -> 5号線 [汝矣渡口駅]", imageUrl: SEOUL_IMAGES.river[0] },
                { time: "13:00", title: "ランチ：ザ・現代ソウル", description: "人気のフードコート", location: "ザ・現代ソウル", type: "food", transitInfo: "徒歩", imageUrl: SEOUL_IMAGES.shopping[1] },
                { time: "15:00", title: "ザ・現代ソウル", description: "ソウルの最新デパート", location: "ザ・現代ソウル", type: "attraction", transitInfo: "", imageUrl: SEOUL_IMAGES.shopping[1] },
                { time: "19:00", title: "漢江遊覧船", description: "イーランドクルーズで夜景鑑賞", location: "イーランドクルーズ", type: "attraction", transitInfo: "船着場へ徒歩", imageUrl: SEOUL_IMAGES.river[1] }
            ]
        },
        {
            day: 6, date: "2025-12-23", title: "リラックス & 最後のお買い物", expenses: [],
            activities: [
                { time: "11:00", title: "ブランチカフェ", description: "乙支路や益善洞でカフェ", location: "乙支路3街", type: "food", transitInfo: "3号線 [忠武路] -> 1駅 -> [乙支路3街] 下車", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" },
                { time: "14:00", title: "お土産購入", description: "ロッテマートやコンビニ", location: "ロッテマート ソウル駅", type: "attraction", transitInfo: "4号線 [忠武路] -> 3駅 -> [ソウル駅] 下車", imageUrl: "https://images.unsplash.com/photo-1580226993175-922616422cb4?auto=format&fit=crop&q=80&w=800" },
                { time: "18:00", title: "最後のディナー：韓国焼肉", description: "韓牛またはサムギョプサル", location: "忠武路", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 7, date: "2025-12-24", title: "帰国の日", expenses: [],
            activities: [
                { time: "05:40", title: "チェックアウト", description: "6015番バス乗り場へ", location: "Wecostay Namsan", type: "hotel", transitInfo: "退渓路3街のバス停へ徒歩", imageUrl: SEOUL_IMAGES.hotel[0] },
                { time: "05:50", title: "空港バス 6015番", description: "仁川空港へ", location: "退渓路3街・韓屋村", type: "transport", transitInfo: "空港バス 6015 (約70分)", imageUrl: SEOUL_IMAGES.transport[1] },
                { time: "07:10", title: "仁川空港到着", description: "チェックイン・出国手続き", location: "仁川空港 T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] },
                { time: "09:35", title: "ソウル -> 仙台 出発", description: "さようならソウル", location: "仁川空港 T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[0] },
                { time: "11:45", title: "仙台空港 到着", description: "ただいま", location: "仙台空港", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] }
            ]
        }
    ]
  },
  ko: {
    days: [
        {
            day: 1, date: "2025-12-18", title: "서울 도착", expenses: [],
            activities: [
                { time: "15:15", title: "에바항공 BR160 출발", description: "인천국제공항으로 이동", location: "타오위안 공항 T2", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[0] },
                { time: "18:45", title: "인천공항 도착", description: "입국 심사 및 수하물 수령", location: "인천공항 T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] },
                { time: "19:40", title: "공항버스 6015번", description: "Wecostay Namsan으로 직행", location: "버스 승강장 5B-1", type: "transport", transitInfo: "공항버스 6015 (약 70분) -> [퇴계로3가 한옥마을] 하차", imageUrl: SEOUL_IMAGES.transport[0] },
                { time: "21:10", title: "Wecostay Namsan 체크인", description: "충무로역 근처", location: "Wecostay Namsan", type: "hotel", transitInfo: "버스 정류장에서 도보 5분", imageUrl: SEOUL_IMAGES.hotel[1] }
            ]
        },
        {
            day: 2, date: "2025-12-19", title: "고궁과 한옥 산책", expenses: [],
            activities: [
                { time: "10:00", title: "광화문광장 & 경복궁", description: "수문장 교대식 관람", location: "경복궁", type: "attraction", transitInfo: "3호선 [충무로역] 탑승 -> 4정거장 -> [경복궁역] 하차", imageUrl: SEOUL_IMAGES.palace[0] },
                { time: "12:30", title: "점심: 토속촌 삼계탕", description: "따뜻한 전통 삼계탕", location: "토속촌 삼계탕", type: "food", transitInfo: "도보 10분", imageUrl: SEOUL_IMAGES.food[0] },
                { time: "14:30", title: "북촌한옥마을", description: "전통 한옥의 아름다움", location: "북촌한옥마을", type: "attraction", transitInfo: "도보 15분", imageUrl: SEOUL_IMAGES.hanok[0] },
                { time: "16:30", title: "인사동 거리", description: "전통 공예품과 찻집", location: "인사동", type: "attraction", transitInfo: "도보 10분", imageUrl: SEOUL_IMAGES.palace[1] },
                { time: "19:00", title: "저녁: 인사동 한정식", description: "푸짐한 한국 전통 요리", location: "인사동", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[1] }
            ]
        },
        {
            day: 3, date: "2025-12-20", title: "명동과 남산타워", expenses: [],
            activities: [
                { time: "11:00", title: "명동 쇼핑", description: "화장품 및 길거리 음식", location: "명동 거리", type: "attraction", transitInfo: "4호선 [충무로역] 탑승 -> 1정거장 -> [명동역] 하차", imageUrl: SEOUL_IMAGES.shopping[0] },
                { time: "13:00", title: "점심: 명동교자", description: "미슐랭 칼국수 맛집", location: "명동교자", type: "food", transitInfo: "도보", imageUrl: SEOUL_IMAGES.food[3] },
                { time: "16:00", title: "남산 케이블카", description: "N서울타워로 이동", location: "남산 케이블카", type: "transport", transitInfo: "도보 또는 남산 오르미 승강기 이용", imageUrl: SEOUL_IMAGES.tower[0] },
                { time: "17:30", title: "N서울타워", description: "서울의 노을과 야경 감상", location: "N서울타워", type: "attraction", transitInfo: "", imageUrl: SEOUL_IMAGES.tower[1] },
                { time: "19:30", title: "저녁: 남산 돈까스", description: "유명한 남산 돈까스 거리", location: "남산 돈까스 거리", type: "food", transitInfo: "도보", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 4, date: "2025-12-21", title: "규현 콘서트 당일", expenses: [],
            activities: [
                { time: "10:00", title: "남산골 한옥마을", description: "고즈넉한 전통 정원 산책", location: "남산골 한옥마을", type: "attraction", transitInfo: "충무로역 근처 도보 10분", imageUrl: SEOUL_IMAGES.hanok[1] },
                { time: "12:00", title: "점심", description: "충무로 근처 맛집", location: "충무로", type: "food", transitInfo: "", imageUrl: SEOUL_IMAGES.food[3] },
                { time: "15:00", title: "올림픽공원으로 이동", description: "공연장 이동 및 굿즈 구매", location: "올림픽공원", type: "transport", transitInfo: "4호선 [충무로역] (1정거장) -> [동대문역사문화공원] 환승 -> 5호선 [올림픽공원역] (13정거장)", imageUrl: SEOUL_IMAGES.concert[1] },
                { time: "17:00", title: "2025 규현 콘서트 'The Classic'", description: "규현의 감미로운 목소리 감상", location: "올림픽홀", type: "concert", transitInfo: "올림픽홀까지 도보", imageUrl: SEOUL_IMAGES.concert[0] },
                { time: "20:30", title: "뒤풀이 저녁", description: "콘서트 후 식사", location: "방이동 먹자골목", type: "food", transitInfo: "도보", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 5, date: "2025-12-22", title: "로맨틱 한강 투어", expenses: [],
            activities: [
                { time: "11:00", title: "여의도 한강공원", description: "한강 피크닉과 산책", location: "여의도 한강공원", type: "attraction", transitInfo: "4호선 [충무로역] -> [동대문역사문화공원] 환승 -> 5호선 [여의나루역]", imageUrl: SEOUL_IMAGES.river[0] },
                { time: "13:00", title: "점심: 더현대 서울", description: "트렌디한 푸드코트", location: "더현대 서울", type: "food", transitInfo: "도보", imageUrl: SEOUL_IMAGES.shopping[1] },
                { time: "15:00", title: "더현대 서울 쇼핑", description: "서울 핫플레이스 백화점", location: "더현대 서울", type: "attraction", transitInfo: "", imageUrl: SEOUL_IMAGES.shopping[1] },
                { time: "19:00", title: "한강 유람선", description: "이랜드 크루즈 야경", location: "이랜드 크루즈", type: "attraction", transitInfo: "한강공원에서 선착장까지 도보", imageUrl: SEOUL_IMAGES.river[1] }
            ]
        },
        {
            day: 6, date: "2025-12-23", title: "휴식 및 마지막 쇼핑", expenses: [],
            activities: [
                { time: "11:00", title: "브런치 카페", description: "여유로운 커피 타임", location: "을지로3가", type: "food", transitInfo: "3호선 [충무로역] -> 1정거장 -> [을지로3가역] 하차", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" },
                { time: "14:00", title: "기념품 쇼핑", description: "롯데마트 또는 편의점", location: "롯데마트 서울역점", type: "attraction", transitInfo: "4호선 [충무로역] -> 3정거장 -> [서울역] 하차", imageUrl: "https://images.unsplash.com/photo-1580226993175-922616422cb4?auto=format&fit=crop&q=80&w=800" },
                { time: "18:00", title: "고별 저녁: 삼겹살", description: "한우 또는 삼겹살 파티", location: "충무로", type: "food", transitInfo: "충무로로 복귀", imageUrl: SEOUL_IMAGES.food[2] }
            ]
        },
        {
            day: 7, date: "2025-12-24", title: "귀국", expenses: [],
            activities: [
                { time: "06:10", title: "체크아웃", description: "공항버스 정류장으로 이동", location: "Wecostay Namsan", type: "hotel", transitInfo: "퇴계로3가 정류장까지 도보", imageUrl: SEOUL_IMAGES.hotel[0] },
                { time: "06:20", title: "공항버스 6015번", description: "인천공항으로 이동", location: "퇴계로3가 한옥마을", type: "transport", transitInfo: "공항버스 6015 (약 70분)", imageUrl: SEOUL_IMAGES.transport[1] },
                { time: "07:40", title: "인천공항 도착", description: "텍스 리펀, 체크인, 면세점", location: "인천공항 T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] },
                { time: "11:40", title: "에바항공 BR169 출발", description: "안녕 서울", location: "인천공항 T1", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[0] },
                { time: "13:30", title: "타오위안 공항 도착", description: "집으로", location: "타오위안 공항 T2", type: "flight", transitInfo: "", imageUrl: SEOUL_IMAGES.flight[1] }
            ]
        }
    ]
  }
};

export const generateItinerary = async (lang: Language): Promise<TripData> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    let languageInstruction = "";
    switch (lang) {
      case 'en': languageInstruction = "English"; break;
      case 'ja': languageInstruction = "Japanese"; break;
      case 'ko': languageInstruction = "Korean"; break;
      default: languageInstruction = "Traditional Chinese (繁體中文)"; break;
    }

    // Dynamic schedule for Day 7 based on language (Japanese specific flight)
    let day7Instruction = "";
    if (lang === 'ja') {
      day7Instruction = "3. Day 7 (2025-12-24): 05:40 Leave Wecostay. 05:50 Take Airport Bus 6015 to ICN. Flight ICN(09:35) -> Sendai(11:45).";
    } else {
      day7Instruction = "3. Day 7 (2025-12-24): 06:10 Leave Wecostay Namsan. 06:20 Take Airport Bus 6015 to ICN. EVA Air BR169 ICN(11:40) -> TPE(13:30).";
    }

    const prompt = `
    Create a detailed 7-day Seoul itinerary (2025/12/18 - 2025/12/24).
    Accommodation: Wecostay Namsan (Near Chungmuro Station).

    CRITICAL INSTRUCTION: 
    - OUTPUT LANGUAGE: ${languageInstruction} ONLY.
    - Translate ALL content, including the "Fixed Schedule" items below, into ${languageInstruction}.
    - For Location names, use the standard name in ${languageInstruction} (e.g., in Japanese use Katakana/Kanji).
    - Generate a specific 'imageKeyword' (e.g., palace, food, shopping, concert, river, tower, transport, hotel) for each activity.

    STRICT FIXED SCHEDULE (Translate these to ${languageInstruction}):
    1. Day 1 (2025-12-18): EVA Air BR160 TPE(15:15) -> ICN(18:45). Take Airport Bus 6015 to Wecostay Namsan.
    2. Day 4 (2025-12-21): Morning: Namsangol Hanok Village. Evening: 17:00 Kyuhyun Concert 'The Classic' at Olympic Hall (Olympic Park).
    ${day7Instruction}

    MUST-INCLUDE ATTRACTIONS (Distribute logically on Days 2, 3, 5, 6):
    - Gwanghwamun Plaza & Gyeongbokgung Palace
    - Bukchon Hanok Village & Insadong Walking Street
    - Han River Cruise (Night)
    - Namsan Seoul Tower (Cable Car)
    - Myeongdong Shopping Street
    - Yeouido Hangang Park

    TRANSIT INFO REQUIREMENTS (EXTREMELY DETAILED):
    - You MUST specify: Starting Line & Station -> Transfer Station (if any) -> Ending Station -> Approx Stops.
    - English Example: "Line 4 [Chungmuro] (1 stop) -> Transfer at [DDP] -> Line 5 [Olympic Park] (13 stops)"
    - Chinese Example: "4號線 [忠武路站] (1站) -> [東大門歷史文化公園] 轉乘 -> 5號線 [奧林匹克公園站] (13站)"
    - Japanese Example: "4号線 [忠武路] (1駅) -> [東大門歴史文化公園] で乗換 -> 5号線 [オリンピック公園] (13駅)"
    - Korean Example: "4호선 [충무로역] (1정거장) -> [동대문역사문화공원] 환승 -> 5호선 [올림픽공원역] (13정거장)"

    PLANNING STRATEGY:
    - Group A (Historical): Gwanghwamun -> Gyeongbokgung -> Bukchon -> Insadong.
    - Group B (Central): Myeongdong -> Namsan Cable Car -> N Tower.
    - Group C (River): Yeouido Hangang Park -> Hyundai Seoul -> Cruise.
    
    REQUIREMENTS:
    - Style: Relaxed, girly, aesthetic.
    - "title" for each day should be a short theme.
    
    Return pure JSON matching this schema:
    {
      "days": [
        {
          "day": number,
          "date": "YYYY-MM-DD",
          "title": "Theme of the day",
          "activities": [
             {
               "time": "HH:MM", 
               "title": "Activity Name", 
               "description": "Short details", 
               "location": "Place Name", 
               "type": "flight" | "transport" | "attraction" | "food" | "concert" | "hotel",
               "transitInfo": "Detailed Transport details",
               "imageKeyword": "keyword for unsplash"
             }
          ]
        }
      ]
    }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  date: { type: Type.STRING },
                  title: { type: Type.STRING },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        location: { type: Type.STRING },
                        type: { type: Type.STRING, enum: ["flight", "transport", "attraction", "food", "concert", "hotel"] },
                        transitInfo: { type: Type.STRING },
                        imageKeyword: { type: Type.STRING }
                      },
                      required: ["time", "title", "description", "location", "type", "imageKeyword"]
                    }
                  }
                },
                required: ["day", "date", "title", "activities"]
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const data = JSON.parse(text) as TripData;
    
    // Helper to get random image from category
    const getImage = (keyword: string | undefined, type: string) => {
      let category = 'other';
      const key = (keyword || '').toLowerCase();
      
      if (key.includes('palace') || key.includes('hanok') || key.includes('culture')) category = 'palace';
      else if (key.includes('food') || key.includes('dinner') || key.includes('lunch')) category = 'food';
      else if (key.includes('shop') || key.includes('myeongdong') || key.includes('store')) category = 'shopping';
      else if (key.includes('tower') || key.includes('view')) category = 'tower';
      else if (key.includes('concert') || key.includes('music')) category = 'concert';
      else if (key.includes('river') || key.includes('cruise') || key.includes('park')) category = 'river';
      else if (key.includes('flight') || key.includes('airport')) category = 'flight';
      else if (key.includes('hotel') || key.includes('accommodation')) category = 'hotel';
      else if (key.includes('transport') || key.includes('bus') || key.includes('subway')) category = 'transport';
      else {
        // Fallback using type if keyword fails
        if (type === 'food') category = 'food';
        else if (type === 'flight') category = 'flight';
        else if (type === 'hotel') category = 'hotel';
        else if (type === 'concert') category = 'concert';
        else if (type === 'transport') category = 'transport';
        else category = 'palace'; // default attractive image
      }

      const images = SEOUL_IMAGES[category] || SEOUL_IMAGES.palace;
      return images[Math.floor(Math.random() * images.length)];
    };

    data.days.forEach(day => {
        day.activities.forEach((act) => {
            if (!act.imageUrl) {
                act.imageUrl = getImage(act.imageKeyword, act.type);
            }
        });
    });

    return data;

  } catch (error) {
    console.error("Gemini Error or Fallback Triggered:", error);
    // Return the hardcoded data in the correctly selected language
    return FALLBACK_DATA[lang];
  }
};