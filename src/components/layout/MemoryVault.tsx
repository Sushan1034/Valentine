import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useValentine } from '@/context/ValentineContext';
import { BookOpen, Save, Check, Image as ImageIcon, Trash2 } from 'lucide-react';

interface MemoryVaultProps {
    dayId: number;
    title: string;
}

const MemoryVault = ({ dayId, title }: MemoryVaultProps) => {
    const { userData, addMemory, addPhoto } = useValentine();
    const [isEditing, setIsEditing] = useState(false);
    const [note, setNote] = useState(userData.memories[dayId] || '');
    const [showSaved, setShowSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        addMemory(dayId, note);
        setIsEditing(false);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                addPhoto(dayId, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed top-24 left-6 z-[60]">
            <motion.div
                layout
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all"
                style={{ width: isEditing ? '320px' : '60px' }}
            >
                <div className="p-3">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-pink-400"
                    >
                        <BookOpen className="w-5 h-5" />
                    </button>

                    <AnimatePresence>
                        {isEditing && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 space-y-4 px-1 pb-2"
                            >
                                <h4 className="text-xs font-bold uppercase tracking-widest text-pink-300/60">
                                    {title} Vault
                                </h4>

                                {/* Photo Section */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold uppercase tracking-tighter text-white/40">Captured Moment</span>
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-pink-400 hover:text-pink-300 transition-colors"
                                        >
                                            <ImageIcon className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handlePhotoUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>

                                    {userData.photos[dayId] && (
                                        <div className="relative group rounded-xl overflow-hidden aspect-video border border-white/10">
                                            <img src={userData.photos[dayId]} alt="Memory" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => addPhoto(dayId, '')}
                                                className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="w-3 h-3 text-red-400" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Capture a thought or memory for this day..."
                                    className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-sm italic outline-none focus:border-pink-500/50 resize-none transition-all"
                                />

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSave}
                                    className="w-full py-2.5 bg-pink-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Seal Memory
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <AnimatePresence>
                {showSaved && (
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className="absolute left-16 top-3 bg-green-500/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
                    >
                        <Check className="w-3 h-3" /> Saved!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MemoryVault;
