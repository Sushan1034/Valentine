import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useValentine } from '@/context/ValentineContext';
import MemoryVault from '@/components/layout/MemoryVault';

const ProposeDay = () => {
    const { userData, fillMeter } = useValentine();
    const [accepted, setAccepted] = useState(false);
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

    const moveNoButton = () => {
        const x = Math.random() * 300 - 150;
        const y = Math.random() * 300 - 150;
        setNoPosition({ x, y });
    };

    const handleAccept = () => {
        setAccepted(true);
        fillMeter(8);
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
            <MemoryVault dayId={8} title="Propose Day" />

            {/* Background stars */}
            <div className="absolute inset-0 z-0">
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center z-10 max-w-lg w-full"
            >
                <span className="text-pink-500/80 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">
                    Day 02
                </span>
                <h2 className="text-6xl md:text-8xl font-playfair font-bold text-pink-500 mb-2 drop-shadow-lg">
                    Propose Day
                </h2>

                {/* Personalization */}
                <p className="text-pink-200/60 mb-12 italic">
                    {userData.userName}, are you ready to ask <span className="text-pink-400 font-bold">{userData.partnerName}</span> the big question?
                </p>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!accepted ? (
                            <motion.div
                                key="propose"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-6xl"
                                >
                                    💍
                                </motion.div>
                                <h3 className="text-3xl font-playfair font-bold leading-tight">
                                    "{userData.partnerName}, will you be mine forever?"
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleAccept}
                                        className="px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-full font-bold shadow-lg shadow-pink-900/40 min-w-[120px] transition-all"
                                    >
                                        Yes!
                                    </motion.button>
                                    <motion.button
                                        animate={{ x: noPosition.x, y: noPosition.y }}
                                        onMouseEnter={moveNoButton}
                                        onClick={moveNoButton}
                                        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold border border-white/10 min-w-[120px] transition-all"
                                    >
                                        No
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="accepted"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="space-y-6"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="text-7xl"
                                >
                                    ❤️
                                </motion.div>
                                <h3 className="text-4xl font-playfair font-bold text-pink-400">Partner said Yes!</h3>
                                <p className="text-pink-200/80">The journey of {userData.userName} & {userData.partnerName} continues...</p>
                                <div className="pt-4">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                scale: [0, 1.5, 0],
                                                y: -300 - Math.random() * 300,
                                                x: Math.random() * 600 - 300
                                            }}
                                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                                            className="absolute top-1/2 left-1/2 text-2xl pointer-events-none"
                                        >
                                            {['💖', '💍', '✨', '🌹'][Math.floor(Math.random() * 4)]}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default ProposeDay;
