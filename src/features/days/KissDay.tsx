import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useValentine } from '@/context/ValentineContext';
import MemoryVault from '@/components/layout/MemoryVault';
import { useSound } from '@/hooks/useSound';

const KissDay = () => {
    const { userData, fillMeter } = useValentine();
    const { playKiss } = useSound();
    const [kisses, setKisses] = useState<{ id: number; x: number; y: number; rotate: number }[]>([]);

    const addKiss = (e: React.MouseEvent | React.TouchEvent) => {
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const newKiss = {
            id: Date.now(),
            x: clientX,
            y: clientY,
            rotate: Math.random() * 40 - 20
        };

        setKisses(prev => [...prev.slice(-15), newKiss]);
        fillMeter(13);
        playKiss();
    };

    return (
        <div
            className="relative w-full h-full flex flex-col items-center justify-center pt-20 px-4 overflow-hidden cursor-pointer"
            onClick={addKiss}
        >
            <MemoryVault dayId={13} title="Kiss Day" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center z-10 pointer-events-none"
            >
                <span className="text-red-400 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">
                    Day 07
                </span>
                <h2 className="text-6xl md:text-8xl font-playfair font-bold text-red-500 mb-2 drop-shadow-lg">
                    Kiss Day
                </h2>

                <p className="text-red-200/60 mb-12 italic">
                    {userData.userName}, tap anywhere to blow kisses to {userData.partnerName}.
                </p>

                <div className="text-9xl mb-8 animate-bounce">
                    💋
                </div>

                <p className="text-red-300/40 text-sm uppercase tracking-widest font-bold">
                    Tap the screen to share your love
                </p>
            </motion.div>

            {/* Kiss Particles */}
            <AnimatePresence>
                {kisses.map(kiss => (
                    <motion.div
                        key={kiss.id}
                        initial={{ scale: 0, opacity: 0, x: kiss.x, y: kiss.y, rotate: kiss.rotate }}
                        animate={{
                            scale: [1, 1.5, 0.8],
                            opacity: [0, 1, 0],
                            y: kiss.y - 100,
                            x: kiss.x + (Math.random() * 40 - 20)
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="fixed pointer-events-none text-4xl"
                    >
                        💋
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default KissDay;
