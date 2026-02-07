import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useValentine } from '@/context/ValentineContext';
import MemoryVault from '@/components/layout/MemoryVault';

const CHOCOLATES = [
    { id: 1, type: '🍫', name: 'Dark' },
    { id: 2, type: '🍬', name: 'Caramel' },
    { id: 3, type: '🍩', name: 'Glazed' },
    { id: 4, type: '🍪', name: 'Cookie' },
];

const ChocolateDay = () => {
    const { userData, fillMeter } = useValentine();
    const [unwrapped, setUnwrapped] = useState<number[]>([]);
    const [gameActive, setGameActive] = useState(false);
    const [cards, setCards] = useState<any[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);

    const toggleUnwrap = (id: number) => {
        if (unwrapped.includes(id)) {
            setUnwrapped(unwrapped.filter(i => i !== id));
        } else {
            setUnwrapped([...unwrapped, id]);
            fillMeter(9);
        }
    };

    const initGame = () => {
        const doubleChocs = [...CHOCOLATES, ...CHOCOLATES].map((c, i) => ({
            ...c,
            gameId: i
        })).sort(() => Math.random() - 0.5);
        setCards(doubleChocs);
        setFlipped([]);
        setMatched([]);
        setGameActive(true);
    };

    const handleCardClick = (index: number) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            if (cards[newFlipped[0]].id === cards[newFlipped[1]].id) {
                setMatched([...matched, ...newFlipped]);
                setFlipped([]);
                fillMeter(5);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    useEffect(() => {
        if (matched.length === cards.length && cards.length > 0) {
            setTimeout(() => {
                setGameActive(false);
                fillMeter(9);
            }, 1000);
        }
    }, [matched]);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
            <MemoryVault dayId={9} title="Chocolate Day" />

            {/* Decorative dripping chocolate element */}
            <div className="fixed top-0 left-0 right-0 h-4 bg-amber-900 z-50">
                <div className="flex justify-around">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-8 bg-amber-900 rounded-b-full shadow-lg"
                            style={{ height: `${Math.random() * 40 + 20}px` }}
                        />
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center z-10 w-full max-w-4xl"
            >
                <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">
                    Day 03
                </span>
                <h2 className="text-6xl md:text-8xl font-playfair font-bold text-amber-600 mb-2 drop-shadow-lg">
                    Chocolate Day
                </h2>

                <p className="text-amber-200/60 mb-12 italic">
                    Sweet chocolates for <span className="text-amber-400 font-bold">{userData.partnerName}</span> from <span className="text-amber-400 font-bold">{userData.userName}</span>
                </p>

                {gameActive ? (
                    <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                        {cards.map((card, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => handleCardClick(i)}
                                className={`aspect-square cursor-pointer rounded-xl flex items-center justify-center text-3xl transition-all duration-500 preserve-3d ${flipped.includes(i) || matched.includes(i) ? 'bg-amber-100/20 rotate-y-180' : 'bg-amber-900 shadow-xl'
                                    }`}
                            >
                                {(flipped.includes(i) || matched.includes(i)) ? card.type : '🎁'}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {CHOCOLATES.map((choc) => (
                            <motion.div
                                key={choc.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleUnwrap(choc.id)}
                                className="relative aspect-square cursor-pointer"
                            >
                                <AnimatePresence mode="wait">
                                    {!unwrapped.includes(choc.id) ? (
                                        <motion.div
                                            key="wrapped"
                                            initial={{ rotateY: 180, opacity: 0 }}
                                            animate={{ rotateY: 0, opacity: 1 }}
                                            exit={{ rotateY: -180, opacity: 0 }}
                                            className="absolute inset-0 bg-amber-800 rounded-2xl flex items-center justify-center text-6xl shadow-xl border-4 border-amber-900 border-double"
                                        >
                                            🎁
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="unwrapped"
                                            initial={{ rotateY: 180, opacity: 0 }}
                                            animate={{ rotateY: 0, opacity: 1 }}
                                            exit={{ rotateY: -180, opacity: 0 }}
                                            className="absolute inset-0 bg-amber-100/10 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-4 shadow-inner border border-amber-500/30"
                                        >
                                            <div className="text-5xl mb-3">{choc.type}</div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Pure Love</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                    {!gameActive && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={initGame}
                            className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded-full font-bold shadow-lg shadow-amber-950/40 transition-all border border-amber-500/30"
                        >
                            Play Chocolate Match
                        </motion.button>
                    )}
                </div>

                <p className="mt-8 text-amber-200/40 italic text-sm">
                    {gameActive ? "Find all matching pairs to fill the meter!" : "Unwrap the chocolates to discover their sweetness."}
                </p>
            </motion.div>
        </div>
    );
};

export default ChocolateDay;
