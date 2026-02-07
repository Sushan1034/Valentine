import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useValentine } from '@/context/ValentineContext';
import MemoryVault from '@/components/layout/MemoryVault';
import { Feather, ShieldCheck, Lock, Unlock, Calendar, Key } from 'lucide-react';

const PromiseDay = () => {
    const { userData, addPromise, fillMeter } = useValentine();
    const [text, setText] = useState('');
    const [unlockDate, setUnlockDate] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [isSecureMode, setIsSecureMode] = useState(false);
    const [showVault, setShowVault] = useState(false);
    const [unlockAttempts, setUnlockAttempts] = useState<Record<string, string>>({});

    const handleSave = () => {
        if (!text.trim()) return;

        const newPromise = {
            id: Date.now().toString(),
            text,
            unlockDate: isSecureMode ? unlockDate : undefined,
            passphrase: isSecureMode ? passphrase : undefined,
            isLocked: isSecureMode,
            createdAt: new Date().toISOString()
        };

        addPromise(newPromise);
        setText('');
        setUnlockDate('');
        setPassphrase('');
        setIsSecureMode(false);
        fillMeter(11);
    };

    const isPromiseLocked = (promise: any) => {
        if (!promise.isLocked) return false;

        const now = new Date();
        const targetDate = promise.unlockDate ? new Date(promise.unlockDate) : null;
        const dateLocked = targetDate && targetDate > now;

        const attempt = unlockAttempts[promise.id];
        const passLocked = promise.passphrase && attempt !== promise.passphrase;

        return dateLocked || passLocked;
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
            <MemoryVault dayId={11} title="Promise Day" />

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center z-10 w-full max-w-2xl"
            >
                <span className="text-blue-300 font-bold uppercase tracking-[0.3em] text-xs mb-2 block">
                    Day 05
                </span>
                <h2 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-2 drop-shadow-lg">
                    Promise Day
                </h2>

                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setShowVault(false)}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${!showVault ? 'bg-blue-600 shadow-lg shadow-blue-900/40 text-white' : 'bg-white/5 text-blue-200 hover:bg-white/10'}`}
                    >
                        Write New
                    </button>
                    <button
                        onClick={() => setShowVault(true)}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${showVault ? 'bg-blue-600 shadow-lg shadow-blue-900/40 text-white' : 'bg-white/5 text-blue-200 hover:bg-white/10'}`}
                    >
                        The Vault ({userData.promiseVault.length})
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {!showVault ? (
                        <motion.div
                            key="form"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl relative"
                        >
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Write a sacred promise..."
                                className="w-full h-40 bg-transparent border-none text-xl md:text-2xl font-light italic focus:ring-0 resize-none text-blue-50 leading-relaxed placeholder:text-blue-200/20"
                            />

                            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className={isSecureMode ? "text-blue-400" : "text-white/20"} />
                                        <span className="text-xs font-bold uppercase tracking-widest text-blue-100/60">Secure This Promise?</span>
                                    </div>
                                    <button
                                        onClick={() => setIsSecureMode(!isSecureMode)}
                                        className={`w-12 h-6 rounded-full transition-all relative ${isSecureMode ? 'bg-blue-600' : 'bg-white/10'}`}
                                    >
                                        <motion.div
                                            animate={{ x: isSecureMode ? 24 : 4 }}
                                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                                        />
                                    </button>
                                </div>

                                {isSecureMode && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                        <div className="flex items-center gap-2 bg-black/20 p-4 rounded-2xl border border-white/5">
                                            <Calendar className="w-4 h-4 text-blue-400" />
                                            <input
                                                type="date"
                                                value={unlockDate}
                                                onChange={(e) => setUnlockDate(e.target.value)}
                                                className="bg-transparent border-none text-xs text-white outline-none w-full"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 bg-black/20 p-4 rounded-2xl border border-white/5">
                                            <Key className="w-4 h-4 text-blue-400" />
                                            <input
                                                type="text"
                                                placeholder="Passphrase"
                                                value={passphrase}
                                                onChange={(e) => setPassphrase(e.target.value)}
                                                className="bg-transparent border-none text-xs text-white outline-none w-full"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSave}
                                    disabled={!text.trim()}
                                    className="mt-4 px-10 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white rounded-2xl font-bold shadow-lg shadow-blue-900/40 transition-all flex items-center gap-3 mx-auto"
                                >
                                    <Feather className="w-5 h-5" /> Seal in Vault
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="vault"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto pr-4 no-scrollbar"
                        >
                            {userData.promiseVault.map((p) => {
                                const locked = isPromiseLocked(p);
                                return (
                                    <motion.div
                                        key={p.id}
                                        className={`bg-white/5 border border-white/10 p-8 rounded-[35px] text-left relative overflow-hidden transition-all ${locked ? 'blur-sm grayscale' : ''}`}
                                    >
                                        {locked ? (
                                            <div className="flex flex-col items-center justify-center gap-4 text-center">
                                                <Lock className="w-12 h-12 text-blue-400/50" />
                                                <p className="text-xs font-bold uppercase tracking-widest text-blue-200/40">Locked until conditions are met</p>
                                                {p.unlockDate && (
                                                    <div className="flex items-center gap-2 text-[10px] text-blue-400">
                                                        <Calendar className="w-3 h-3" /> Hits {new Date(p.unlockDate).toLocaleDateString()}
                                                    </div>
                                                )}
                                                {p.passphrase && (
                                                    <div className="flex flex-col gap-2 w-full max-w-[150px]">
                                                        <input
                                                            type="password"
                                                            placeholder="Passphrase"
                                                            className="bg-black/40 border border-white/10 rounded-lg px-3 py-1 text-xs text-center text-white"
                                                            onChange={(e) => setUnlockAttempts(prev => ({ ...prev, [p.id]: e.target.value }))}
                                                        />
                                                        <span className="text-[8px] uppercase tracking-tighter text-blue-400/60 font-bold">Secret Code Required</span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <>
                                                <div className="absolute top-6 right-6 text-blue-400 opacity-20"><Unlock className="w-4 h-4" /></div>
                                                <p className="text-lg font-light italic text-blue-100 leading-relaxed">"{p.text}"</p>
                                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/20">
                                                    <span>Sealed On</span>
                                                    <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                );
                            })}
                            {userData.promiseVault.length === 0 && (
                                <div className="col-span-full py-20 text-blue-200/20 italic">No promises sealed in the vault yet...</div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PromiseDay;
