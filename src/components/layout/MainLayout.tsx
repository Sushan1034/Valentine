import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Music2, Palette, Flame } from 'lucide-react';
import HeartParticles from '../common/HeartParticles';
import CustomCursor from '../common/CustomCursor';
import DaySelector from './DaySelector';
import MusicPlayer from './MusicPlayer';
import { useValentine, MoodType } from '@/context/ValentineContext';

interface MainLayoutProps {
    children: React.ReactNode;
    activeDay: number;
    onDaySelect: (id: number) => void;
    unlockedDay: number;
}

const MainLayout = ({ children, activeDay, onDaySelect, unlockedDay }: MainLayoutProps) => {
    const { userData, setMood } = useValentine();
    const [logoClicks, setLogoClicks] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [showMoodMenu, setShowMoodMenu] = useState(false);

    const handleLogoClick = () => {
        const newClicks = logoClicks + 1;
        setLogoClicks(newClicks);
        if (newClicks >= 5) {
            setShowEasterEgg(true);
            setLogoClicks(0);
            setTimeout(() => setShowEasterEgg(false), 5000);
        }
    };

    const MOOD_COLORS: Record<MoodType, string> = {
        normal: 'from-rose-900/20 via-black to-black',
        happy: 'from-pink-600/20 via-black to-black',
        missing: 'from-indigo-900/30 via-black to-black',
        shy: 'from-rose-400/20 via-black to-black',
        heartbroken: 'from-gray-800/40 via-black to-black',
    };

    return (
        <div className={`min-h-screen bg-[#0a0505] text-white selection:bg-pink-500/30 font-inter overflow-hidden transition-colors duration-1000`}>
            {/* Dynamic Background Glow */}
            <div className={`fixed inset-0 bg-gradient-to-br ${MOOD_COLORS[userData.mood]} pointer-events-none transition-all duration-1000`} />
            <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />

            <HeartParticles />
            <CustomCursor />

            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/5">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={handleLogoClick}
                >
                    <motion.div
                        animate={logoClicks > 0 ? { scale: [1, 1.2, 1] } : {}}
                    >
                        <Heart className="w-8 h-8 text-pink-500 fill-pink-500 group-hover:scale-110 transition-transform" />
                    </motion.div>
                    <span className="text-xl font-playfair font-bold tracking-tight">
                        Valentine <span className="text-pink-500">Week</span>
                    </span>
                </motion.div>

                <div className="flex items-center gap-4">
                    {/* Streak Indicator */}
                    {userData.streak > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/20"
                        >
                            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                            <span className="text-sm font-bold text-orange-300">{userData.streak}</span>
                        </motion.div>
                    )}

                    {/* Mood Selector Trigger */}
                    <div className="relative">
                        <button
                            onClick={() => setShowMoodMenu(!showMoodMenu)}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <Palette className="w-5 h-5 text-pink-400" />
                        </button>

                        <AnimatePresence>
                            {showMoodMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className="absolute top-12 right-0 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl min-w-[200px]"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 px-2">How are you feeling?</p>
                                    <div className="grid grid-cols-1 gap-1">
                                        {(['normal', 'happy', 'missing', 'shy', 'heartbroken'] as MoodType[]).map((mood) => (
                                            <button
                                                key={mood}
                                                onClick={() => {
                                                    setMood(mood);
                                                    setShowMoodMenu(false);
                                                }}
                                                className={`px-4 py-2 rounded-xl text-left text-sm transition-all ${userData.mood === mood ? 'bg-pink-600 text-white' : 'hover:bg-white/5 text-white/60'
                                                    }`}
                                            >
                                                {mood.charAt(0).toUpperCase() + mood.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <MusicPlayer />
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="relative z-10 min-h-screen">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeDay}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            <DaySelector
                activeDay={activeDay}
                onDaySelect={onDaySelect}
                unlockedDay={unlockedDay}
            />

            {/* Easter Egg Popup */}
            <AnimatePresence>
                {showEasterEgg && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 pointer-events-none"
                    >
                        <div className="bg-pink-600/90 backdrop-blur-xl p-12 rounded-[50px] shadow-3xl text-center border-4 border-white/20">
                            <h2 className="text-4xl font-playfair font-bold mb-4">Secret Message Unlocked! 💖</h2>
                            <p className="text-xl italic">"Real love doesn't have a happy ending, because real love never ends."</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MainLayout;
