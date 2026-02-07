import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useValentine } from '@/context/ValentineContext';
import MemoryVault from '@/components/layout/MemoryVault';

const Petal = ({ id }: { id: number }) => {
    const [randoms] = useState({
        left: Math.random() * 100,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
        rotate: Math.random() * 360,
        size: Math.random() * 15 + 10,
    });

    return (
        <motion.div
            initial={{ y: -20, opacity: 0, x: `${randoms.left}vw`, rotate: 0 }}
            animate={{
                y: '110vh',
                opacity: [0, 1, 1, 0],
                x: [`${randoms.left}vw`, `${randoms.left + 10}vw`],
                rotate: randoms.rotate + 360
            }}
            transition={{
                duration: randoms.duration,
                repeat: Infinity,
                delay: randoms.delay,
                ease: "linear"
            }}
            className="fixed pointer-events-none text-rose-400/40"
            style={{ fontSize: randoms.size }}
        >
            🌸
        </motion.div>
    );
};

const RoseDay = () => {
    const { userData, fillMeter } = useValentine();
    const [rosesGifted, setRosesGifted] = useState(0);
    const [showHeart, setShowHeart] = useState(false);
    const [gameActive, setGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [fallingRoses, setFallingRoses] = useState<any[]>([]);

    const handleGift = () => {
        setRosesGifted(prev => prev + 1);
        setShowHeart(true);
        fillMeter(7);
        setTimeout(() => setShowHeart(false), 1000);
    };

    const startGame = () => {
        setGameActive(true);
        setScore(0);
        setFallingRoses([]);
    };

    useEffect(() => {
        if (gameActive) {
            const interval = setInterval(() => {
                setFallingRoses(prev => [...prev.slice(-15), {
                    id: Date.now(),
                    x: Math.random() * 80 + 10,
                    duration: Math.random() * 2 + 1.5
                }]);
            }, 800);

            const timer = setTimeout(() => {
                setGameActive(false);
                if (score >= 5) fillMeter(7);
            }, 15000);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [gameActive]);

    const catchRose = (id: number) => {
        setScore(prev => prev + 1);
        setFallingRoses(prev => prev.filter(r => r.id !== id));
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center pt-20 px-4">
            <MemoryVault dayId={7} title="Rose Day" />

            {/* Falling Petals Background */}
            <div className="fixed inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <Petal key={i} id={i} />
                ))}
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center z-10"
            >
                <span className="text-pink-500/80 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">
                    Day 01
                </span>
                <h2 className="text-6xl md:text-8xl font-playfair font-bold text-rose-500 mb-2 drop-shadow-lg">
                    Rose Day
                </h2>

                {/* Personalization */}
                <p className="text-rose-200/60 mb-12 italic">
                    Hey <span className="text-rose-400 font-bold">{userData.userName}</span>,
                    gift a beautiful rose to <span className="text-rose-400 font-bold">{userData.partnerName}</span>
                </p>

                {gameActive ? (
                    <div className="relative w-full max-w-md h-[400px] border-2 border-white/5 rounded-3xl bg-white/5 overflow-hidden mb-8">
                        <div className="absolute top-4 left-4 text-xs font-bold uppercase text-white/40">Catch the Roses!</div>
                        <div className="absolute top-4 right-4 text-2xl font-playfair">{score}</div>

                        <AnimatePresence>
                            {fallingRoses.map(rose => (
                                <motion.div
                                    key={rose.id}
                                    initial={{ y: -50, x: `${rose.x}%`, opacity: 1 }}
                                    animate={{ y: 450 }}
                                    transition={{ duration: rose.duration, ease: "linear" }}
                                    onClick={() => catchRose(rose.id)}
                                    className="absolute text-3xl cursor-pointer select-none"
                                >
                                    🌹
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="relative group cursor-pointer mb-8" onClick={handleGift}>
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="text-[120px] md:text-[200px] select-none filter drop-shadow-[0_0_30px_rgba(244,63,94,0.3)]"
                        >
                            🌹
                        </motion.div>

                        <AnimatePresence>
                            {showHeart && (
                                <motion.div
                                    initial={{ y: 0, opacity: 1, scale: 0.5 }}
                                    animate={{ y: -100, opacity: 0, scale: 2 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl text-rose-500 pointer-events-none"
                                >
                                    ❤️
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGift}
                        disabled={gameActive}
                        className="px-8 py-3 bg-rose-600 hover:bg-rose-500 disabled:opacity-30 text-white rounded-full font-bold shadow-lg shadow-rose-900/40 transition-all"
                    >
                        Gift a Rose
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        disabled={gameActive}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white rounded-full font-bold border border-white/10 transition-all"
                    >
                        {score > 0 ? 'Retry Game' : 'Play Mini Game'}
                    </motion.button>
                </div>

                <p className="mt-8 text-rose-200/40 italic text-sm">
                    {rosesGifted === 0
                        ? "Click the rose or play the game to fill the Love Meter!"
                        : `You've gifted ${rosesGifted} ${rosesGifted === 1 ? 'rose' : 'roses'}! The Love Meter is rising.`}
                </p>
            </motion.div>
        </div>
    );
};

export default RoseDay;
