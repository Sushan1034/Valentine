import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useValentine, RelationshipType } from '@/context/ValentineContext';
import { Heart, ChevronRight, Check } from 'lucide-react';

const RELATIONSHIP_TYPES: { type: RelationshipType; label: string; icon: string }[] = [
    { type: 'partner', label: 'Partner', icon: '💑' },
    { type: 'crush', label: 'Crush', icon: '💌' },
    { type: 'bestie', label: 'Bestie', icon: '🤝' },
    { type: 'self-love', label: 'Self Love', icon: '✨' },
];

const Onboarding = () => {
    const { updateUserData } = useValentine();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        userName: '',
        partnerName: '',
        relationshipType: 'partner' as RelationshipType
    });

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else updateUserData(formData);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-black opacity-50" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                    className="w-full max-w-lg z-10"
                >
                    {step === 1 && (
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-3xl text-center">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="mb-8"
                            >
                                <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-pink-900/40">
                                    <Heart className="w-10 h-10 text-white fill-white" />
                                </div>
                            </motion.div>
                            <h1 className="text-3xl font-playfair font-bold mb-2">Welcome, Love!</h1>
                            <p className="text-pink-200/60 lowercase tracking-wider mb-12">Before we begin the journey...</p>

                            <button
                                onClick={handleNext}
                                className="w-full py-4 bg-pink-600 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-pink-900/40"
                            >
                                Start My Experience <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-3xl">
                            <h2 className="text-2xl font-playfair font-bold mb-8">Who are the stars today?</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-pink-300/60 block mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={formData.userName}
                                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-pink-500 transition-all font-playfair"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-pink-300/60 block mb-2">Your Partner's Name</label>
                                    <input
                                        type="text"
                                        value={formData.partnerName}
                                        onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-pink-500 transition-all font-playfair"
                                        placeholder="Enter their name"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!formData.userName || !formData.partnerName}
                                className="w-full py-4 bg-pink-600 rounded-2xl font-bold flex items-center justify-center gap-2 mt-12 disabled:opacity-30 disabled:grayscale transition-all"
                            >
                                Almost There <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-3xl">
                            <h2 className="text-2xl font-playfair font-bold mb-8">What describes you best?</h2>

                            <div className="grid grid-cols-2 gap-4">
                                {RELATIONSHIP_TYPES.map((rel) => (
                                    <button
                                        key={rel.type}
                                        onClick={() => setFormData({ ...formData, relationshipType: rel.type })}
                                        className={`p-6 rounded-3xl border transition-all text-center flex flex-col items-center gap-3 ${formData.relationshipType === rel.type
                                                ? 'bg-pink-600 border-pink-400 shadow-lg shadow-pink-900/40'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <span className="text-3xl">{rel.icon}</span>
                                        <span className="text-xs font-bold uppercase tracking-widest">{rel.label}</span>
                                        {formData.relationshipType === rel.type && <Check className="w-4 h-4 text-white" />}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                className="w-full py-4 bg-pink-600 rounded-2xl font-bold flex items-center justify-center gap-2 mt-12 shadow-xl shadow-pink-900/40"
                            >
                                Create My Journey <Heart className="w-5 h-5 fill-white" />
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Onboarding;
