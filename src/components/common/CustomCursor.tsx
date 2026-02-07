import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Add a sparkle occasionally
            if (Math.random() > 0.85) {
                setSparkles(prev => [...prev.slice(-10), { id: Date.now(), x: e.clientX, y: e.clientY }]);
            }

            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
            >
                <div className="w-full h-full bg-pink-500 rounded-full blur-[2px]" />
            </motion.div>

            <motion.div
                className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[10000] bg-white rounded-full"
                animate={{ x: position.x - 4, y: position.y - 4 }}
                transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.2 }}
            />

            <AnimatePresence>
                {sparkles.map(sparkle => (
                    <motion.div
                        key={sparkle.id}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 0, y: sparkle.y + 20 }}
                        exit={{ opacity: 0 }}
                        className="fixed pointer-events-none z-[9998] text-[10px]"
                        style={{ left: sparkle.x, top: sparkle.y }}
                    >
                        ✨
                    </motion.div>
                ))}
            </AnimatePresence>
        </>
    );
};

export default CustomCursor;
