import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeartParticles = () => {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 20 + 10,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: '110vh', opacity: 0, x: `${p.x}vw` }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, 0.4, 0.4, 0],
                        x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                    style={{
                        fontSize: p.size,
                        position: 'absolute',
                    }}
                    className="text-pink-500/20"
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
};

export default HeartParticles;
