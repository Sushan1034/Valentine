import { motion } from 'framer-motion';
import { VALENTINE_DAYS } from '@/utils/days';

interface LockedScreenProps {
    dayId: number;
}

const LockedScreen = ({ dayId }: LockedScreenProps) => {
    const day = VALENTINE_DAYS.find(d => d.id === dayId);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
            >
                <div className="text-8xl mb-8 grayscale opacity-50">
                    {day?.icon}
                </div>
                <h2 className="text-4xl font-playfair font-bold text-white/40 mb-2">
                    {day?.name} is Locked
                </h2>
                <p className="text-white/20 uppercase tracking-[0.3em] text-xs">
                    Unlocks on February {dayId}th
                </p>

                <div className="mt-12 p-8 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-sm max-w-md mx-auto">
                    <p className="text-white/40 italic">
                        "Patience is a virtue, and love is worth the wait. Come back on the scheduled day to unlock this special experience."
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LockedScreen;
