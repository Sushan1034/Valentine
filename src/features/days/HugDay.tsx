import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useValentine } from '@/context/ValentineContext';
import MemoryVault from '@/components/layout/MemoryVault';
import { useSound } from '@/hooks/useSound';

const HugDay = () => {
    const { userData, fillMeter } = useValentine();
    const { playHeartbeat } = useSound();
    const [isHolding, setIsHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let interval: any;
        if (isHolding && !isComplete) {
            interval = setInterval(() => {
                setProgress(prev => {
                    const next = prev + 1;
                    if (next % 20 === 0) playHeartbeat();
                    if (next >= 100) {
                        setIsComplete(true);
                        fillMeter(12);
                        clearInterval(interval);
                        return 100;
                    }
                    return next;
                });
            }, 50);
        } else if (!isHolding && !isComplete) {
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [isHolding, isComplete, fillMeter, playHeartbeat]);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
            <MemoryVault dayId={12} title="Hug Day" />

            {/* Simple Pulsing Background Glow */}
            <motion.div
                animate={{
                    scale: isHolding ? [1, 1.1, 1] : 1,
                    opacity: isHolding ? [0.05, 0.1, 0.05] : 0.05
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="fixed inset-0 bg-orange-500 rounded-full blur-[150px] pointer-events-none"
            />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center z-10 w-full max-w-lg"
            >
                <span className="text-orange-300 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">
                    Day 06
                </span>
                <h2 className="text-6xl md:text-8xl font-playfair font-bold text-orange-400 mb-2 drop-shadow-lg">
                    Hug Day
                </h2>

                <p className="text-orange-100/60 mb-12 italic">
                    {userData.userName}, hold tight to send a warm embrace to {userData.partnerName}.
                </p>

                <div className="relative flex flex-col items-center gap-12">
                    {/* Progress Circular Meter */}
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                                cx="128"
                                cy="128"
                                r="120"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-white/5"
                            />
                            <motion.circle
                                cx="128"
                                cy="128"
                                r="120"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray="753.98"
                                animate={{ strokeDashoffset: 753.98 - (753.98 * progress) / 100 }}
                                className="text-orange-500"
                            />
                        </svg>

                        <motion.button
                            onPointerDown={() => setIsHolding(true)}
                            onPointerUp={() => setIsHolding(false)}
                            onPointerLeave={() => setIsHolding(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1.15 }}
                            animate={isHolding && !isComplete ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 1, repeat: Infinity }}
                            className={`w-48 h-48 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl transition-all duration-300 ${isComplete ? 'bg-orange-600' : 'bg-orange-500'}`}
                        >
                            <span className="text-6xl">{isComplete ? '🥰' : '🫂'}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                                {isComplete ? 'Hugged!' : 'Hold to Hug'}
                            </span>
                        </motion.button>

                    </div>

                    <div className="h-4">
                        <AnimatePresence>
                            {isHolding && !isComplete && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-orange-300 font-bold uppercase tracking-widest text-xs"
                                >
                                    Hold steady...
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <p className="mt-8 text-orange-100/40 italic text-sm">
                    {isComplete
                        ? `You've sent the perfect hug to ${userData.partnerName}! ❤️`
                        : "Hold the button for a 5-second hug."}
                </p>
            </motion.div>
        </div>
    );
};

export default HugDay;
