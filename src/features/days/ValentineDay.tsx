import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useValentine } from '@/context/ValentineContext';
import MemoryVault from '@/components/layout/MemoryVault';
import { Heart, Sparkles, Send, Calendar, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

const ValentineDay = () => {
    const { userData, fillMeter } = useValentine();
    const [isOpen, setIsOpen] = useState(false);
    const [showReel, setShowReel] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const memoryDays = [7, 8, 9, 10, 11, 12, 13];
    const journeyItems = memoryDays.map(day => ({
        day,
        note: userData.memories[day],
        photo: userData.photos[day],
    })).filter(item => item.note || item.photo);

    useEffect(() => {
        if (showReel) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % journeyItems.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [showReel, journeyItems.length]);

    const handleOpenLetter = () => {
        setIsOpen(true);
        fillMeter(14);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff1f44', '#ff708d', '#ffffff']
        });
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
            <MemoryVault dayId={14} title="Valentine's Day" />

            {/* Grand Finale Background */}
            <div className="fixed inset-0 z-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent pointer-events-none" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center z-10 w-full max-w-2xl"
            >
                <span className="text-rose-400 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">
                    The Grand Finale
                </span>
                <h2 className="text-6xl md:text-8xl font-playfair font-bold text-rose-500 mb-8 drop-shadow-lg">
                    Valentine's Day
                </h2>

                {!isOpen ? (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpenLetter}
                        className="cursor-pointer group relative"
                    >
                        <div className="text-[120px] mb-4 group-hover:rotate-12 transition-transform duration-500 drop-shadow-2xl">💌</div>
                        <p className="text-rose-300 font-bold uppercase tracking-widest text-sm animate-pulse">
                            Click to reveal our journey, {userData.userName}
                        </p>
                    </motion.div>
                ) : (
                    <div className="space-y-12 pb-20">
                        <motion.div
                            initial={{ rotateX: 90, opacity: 0 }}
                            animate={{ rotateX: 0, opacity: 1 }}
                            className="bg-rose-50/10 backdrop-blur-2xl border-2 border-rose-500/30 p-8 md:p-12 rounded-[50px] shadow-3xl text-left relative"
                        >
                            <div className="absolute -top-10 -right-10 text-6xl animate-bounce">💝</div>
                            <h3 className="text-3xl font-playfair font-bold text-rose-400 mb-6 underline decoration-rose-500/30">My Dearest {userData.partnerName},</h3>
                            <p className="text-xl font-light italic leading-relaxed text-rose-100 mb-8">
                                Every moment of this Valentine's Week has been a beautiful chapter in our story. From {userData.userName}'s perspective,
                                watching our love meter grow has been the highlight of my year.
                            </p>
                            <p className="text-xl font-light italic leading-relaxed text-rose-100 mb-8">
                                You are my {userData.relationshipType === 'partner' ? 'forever person' : userData.relationshipType}.
                                Today, I give you my whole heart, today and for all the Valentine's to come.
                            </p>
                            <p className="text-right text-3xl font-playfair font-bold text-rose-400">Forever Yours,<br />{userData.userName}</p>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowReel(true)}
                                className="px-10 py-4 bg-rose-600 text-white rounded-full font-bold flex items-center gap-3 mx-auto sm:mx-0 shadow-xl shadow-rose-900/40"
                            >
                                <Play className="w-5 h-5 fill-white" /> Watch Our Journey Reel
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.print()}
                                className="px-8 py-4 bg-white/10 text-white rounded-full font-bold flex items-center gap-3 mx-auto sm:mx-0 border border-white/20 backdrop-blur-md"
                            >
                                <Send className="w-5 h-5" /> Export Love Card
                            </motion.button>
                        </div>
                    </div>
                )}

                {/* Journey Reel Montage */}
                <AnimatePresence>
                    {showReel && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-6 md:p-12"
                        >
                            <button
                                onClick={() => setShowReel(false)}
                                className="absolute top-8 right-8 text-white/50 hover:text-white z-[110] p-2 bg-white/5 rounded-full"
                            >
                                <Heart className="w-6 h-6 rotate-45" />
                            </button>

                            <div className="text-center mb-8">
                                <h3 className="text-3xl font-playfair font-bold text-rose-500">Our Valentine Journey</h3>
                                <p className="text-rose-200/40 text-xs uppercase tracking-widest font-bold">Reliving the moments</p>
                            </div>

                            <div className="relative w-full max-w-4xl h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden rounded-[40px] border border-white/10 shadow-2xl">
                                <AnimatePresence mode="wait">
                                    {journeyItems.length > 0 ? (
                                        <motion.div
                                            key={currentSlide}
                                            initial={{ opacity: 0, scale: 1.1, x: 50 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, x: -50 }}
                                            transition={{ duration: 1, ease: "easeInOut" }}
                                            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                                        >
                                            {journeyItems[currentSlide].photo && (
                                                <div className="absolute inset-0 z-0">
                                                    <img
                                                        src={journeyItems[currentSlide].photo}
                                                        className="w-full h-full object-cover opacity-40 blur-sm scale-110"
                                                        alt=""
                                                    />
                                                </div>
                                            )}

                                            <div className="relative z-10 space-y-8">
                                                <span className="bg-rose-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.4em]">
                                                    Feb {journeyItems[currentSlide].day}th Memory
                                                </span>

                                                {journeyItems[currentSlide].photo && (
                                                    <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-3xl overflow-hidden border-4 border-white shadow-2xl rotate-2">
                                                        <img src={journeyItems[currentSlide].photo} className="w-full h-full object-cover" alt="Captured" />
                                                    </div>
                                                )}

                                                {journeyItems[currentSlide].note && (
                                                    <p className="text-2xl md:text-4xl font-playfair font-bold italic text-white drop-shadow-lg leading-relaxed max-w-2xl">
                                                        "{journeyItems[currentSlide].note}"
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="text-rose-300 italic">No memories captured yet... go back and fill the vault!</div>
                                    )}
                                </AnimatePresence>

                                {/* Reel Progress Dots */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                                    {journeyItems.map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-rose-500 w-6' : 'bg-white/20'}`} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ValentineDay;
