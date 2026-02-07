import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useValentine } from '@/context/ValentineContext';
import MemoryVault from '@/components/layout/MemoryVault';
import { Utensils, Shirt, Bed, Heart, Edit2 } from 'lucide-react';

const TeddyDay = () => {
    const { userData, updateTeddy, fillMeter } = useValentine();
    const { teddyState } = userData;
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState(teddyState.name);
    const [activeAction, setActiveAction] = useState<string | null>(null);

    const handleAction = (action: 'feed' | 'dress' | 'tuck') => {
        setActiveAction(action);
        let updates: any = { bondLevel: teddyState.bondLevel + 5 };

        if (action === 'feed') updates.lastFed = new Date().toISOString();
        if (action === 'dress') updates.isDressed = !teddyState.isDressed;
        if (action === 'tuck') updates.isTuckedIn = !teddyState.isTuckedIn;

        updateTeddy(updates);
        fillMeter(10);
        setTimeout(() => setActiveAction(null), 2000);
    };

    const handleNameSave = () => {
        updateTeddy({ name: newName });
        setIsEditingName(false);
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
            <MemoryVault dayId={10} title="Teddy Day" />

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center z-10 w-full max-w-2xl"
            >
                <span className="text-pink-300 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">
                    Day 04
                </span>

                {/* Teddy Name Section */}
                <div className="flex items-center justify-center gap-3 mb-2">
                    {isEditingName ? (
                        <div className="flex items-center gap-2">
                            <input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="bg-white/10 border-b-2 border-pink-500 outline-none px-2 py-1 text-2xl font-playfair text-center w-40"
                                autoFocus
                            />
                            <button onClick={handleNameSave} className="text-green-400"><Check className="w-6 h-6" /></button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 group">
                            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-pink-300 drop-shadow-lg">
                                {teddyState.name}
                            </h2>
                            <button
                                onClick={() => setIsEditingName(true)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-pink-500"
                            >
                                <Edit2 className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center gap-2 mb-8">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    <span className="text-pink-200/60 font-bold text-sm tracking-widest uppercase">
                        Bond Level: {teddyState.bondLevel}
                    </span>
                </div>

                {/* Main Teddy Stage */}
                <div className="relative h-[300px] flex items-center justify-center mb-12">
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            scale: activeAction ? 1.2 : 1,
                            rotate: activeAction === 'feed' ? [0, 5, -5, 0] : 0
                        }}
                        className="text-[180px] relative z-10 select-none cursor-pointer"
                    >
                        {teddyState.isTuckedIn ? '😴' : '🧸'}

                        {/* Accessories */}
                        <AnimatePresence>
                            {teddyState.isDressed && !teddyState.isTuckedIn && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-6xl pointer-events-none"
                                >
                                    👕
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Action Animations */}
                        <AnimatePresence>
                            {activeAction === 'feed' && (
                                <motion.span
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: -50, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl"
                                >
                                    🍯
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Dream Particles */}
                    {teddyState.isTuckedIn && (
                        <div className="absolute inset-0 z-0">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <motion.span
                                    key={i}
                                    animate={{
                                        y: -100,
                                        x: Math.random() * 100 - 50,
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1, 0.5]
                                    }}
                                    transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                                    className="absolute left-1/2 top-1/2 text-pink-300 text-2xl"
                                >
                                    Z
                                </motion.span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Controls */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <CareAction
                        icon={<Utensils className="w-5 h-5" />}
                        label="Feed Honey"
                        onClick={() => handleAction('feed')}
                        active={activeAction === 'feed'}
                    />
                    <CareAction
                        icon={<Shirt className="w-5 h-5" />}
                        label={teddyState.isDressed ? "Undress" : "Dress Up"}
                        onClick={() => handleAction('dress')}
                        active={activeAction === 'dress'}
                    />
                    <CareAction
                        icon={<Bed className="w-5 h-5" />}
                        label={teddyState.isTuckedIn ? "Wake Up" : "Tuck In"}
                        onClick={() => handleAction('tuck')}
                        active={activeAction === 'tuck'}
                    />
                </div>

                <p className="mt-8 text-pink-100/40 italic text-sm">
                    {teddyState.bondLevel === 0
                        ? `Give ${teddyState.name} some love to increase your bond!`
                        : `You and ${teddyState.name} are becoming best friends!`}
                </p>
            </motion.div>
        </div>
    );
};

const CareAction = ({ icon, label, onClick, active }: any) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`flex flex-col items-center gap-2 p-4 rounded-3xl border transition-all ${active ? 'bg-pink-600 border-pink-400 shadow-lg shadow-pink-900/40' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
    >
        <div className={active ? 'text-white' : 'text-pink-400'}>{icon}</div>
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </motion.button>
);

const Check = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export default TeddyDay;
