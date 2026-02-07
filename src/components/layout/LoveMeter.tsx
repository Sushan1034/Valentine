import { motion } from 'framer-motion';
import { useValentine } from '@/context/ValentineContext';
import { Heart } from 'lucide-react';

const LoveMeter = () => {
    const { userData } = useValentine();
    const percentage = userData.loveMeter;

    return (
        <div className="fixed top-20 right-6 z-[60] flex flex-col items-center">
            <div className="relative w-12 h-48 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden shadow-xl">
                {/* Progress Bar */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600 via-pink-500 to-rose-400"
                    initial={{ height: 0 }}
                    animate={{ height: `${percentage}%` }}
                    transition={{ type: 'spring', damping: 20, stiffness: 50 }}
                />

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            </div>

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    filter: [`drop-shadow(0 0 0px #ec4899)`, `drop-shadow(0 0 10px #ec4899)`, `drop-shadow(0 0 0px #ec4899)`]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4 bg-pink-500 rounded-full p-2 shadow-lg shadow-pink-900/40"
            >
                <Heart className="w-5 h-5 text-white fill-current" />
            </motion.div>

            <div className="mt-2 text-[10px] font-bold uppercase tracking-tighter text-pink-300/60">
                {percentage}%
            </div>
        </div>
    );
};

export default LoveMeter;
