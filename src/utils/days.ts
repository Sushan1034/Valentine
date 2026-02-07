export type DayData = {
    id: number;
    date: string;
    name: string;
    theme: string;
    gradient: string;
    icon: string;
};

export const VALENTINE_DAYS: DayData[] = [
    { id: 7, date: '2026-02-07', name: 'Rose Day', theme: 'rose', gradient: 'from-red-900 via-rose-800 to-black', icon: '🌹' },
    { id: 8, date: '2026-02-08', name: 'Propose Day', theme: 'propose', gradient: 'from-orange-900 via-pink-800 to-black', icon: '💍' },
    { id: 9, date: '2026-02-09', name: 'Chocolate Day', theme: 'chocolate', gradient: 'from-amber-950 via-orange-900 to-black', icon: '🍫' },
    { id: 10, date: '2026-02-10', name: 'Teddy Day', theme: 'teddy', gradient: 'from-pink-900 via-rose-700 to-black', icon: '🧸' },
    { id: 11, date: '2026-02-11', name: 'Promise Day', theme: 'promise', gradient: 'from-indigo-950 via-blue-900 to-black', icon: '🤝' },
    { id: 12, date: '2026-02-12', name: 'Hug Day', theme: 'hug', gradient: 'from-orange-800 via-red-800 to-black', icon: '🤗' },
    { id: 13, date: '2026-02-13', name: 'Kiss Day', theme: 'kiss', gradient: 'from-rose-950 via-red-900 to-black', icon: '💋' },
    { id: 14, date: '2026-02-14', name: "Valentine's Day", theme: 'valentine', gradient: 'from-red-950 via-pink-950 to-black', icon: '❤️' },
];
