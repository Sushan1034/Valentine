import { motion } from 'framer-motion';
import { VALENTINE_DAYS } from '@/utils/days';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DaySelectorProps {
    activeDay: number;
    onDaySelect: (id: number) => void;
    unlockedDay: number;
}

const DaySelector = ({ activeDay, onDaySelect, unlockedDay }: DaySelectorProps) => {
    return (
        <div className="fixed bottom-8 left-0 right-0 z-50 px-4 flex justify-center">
            <motion.div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-2 flex gap-2 overflow-x-auto no-scrollbar max-w-full md:max-w-max shadow-2xl"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', damping: 20 }}
            >
                {VALENTINE_DAYS.map((day) => {
                    const isLocked = day.id > unlockedDay;
                    const isActive = day.id === activeDay;

                    return (
                        <button
                            key={day.id}
                            disabled={isLocked}
                            onClick={() => onDaySelect(day.id)}
                            className={cn(
                                "relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300",
                                isActive ? "bg-pink-500 text-white scale-110 shadow-[0_0_20px_rgba(236,72,153,0.5)]" : "text-pink-300/60 hover:text-pink-300",
                                isLocked && "opacity-30 cursor-not-allowed grayscale",
                                !isActive && !isLocked && "hover:bg-white/10"
                            )}
                        >
                            <span>{day.icon}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeDay"
                                    className="absolute -inset-1 border-2 border-pink-500 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {day.name}
                            </div>
                        </button>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default DaySelector;
