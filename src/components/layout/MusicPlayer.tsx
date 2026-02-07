import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, SkipForward, SkipBack, Upload, Volume2, Youtube, X } from 'lucide-react';
import { useValentine } from '@/context/ValentineContext';
import ReactPlayer from 'react-player';

const DEFAULT_TRACKS = [
    { name: 'Love Me Like You Do', url: 'https://youtube.com/shorts/AuUo7vXhFYQ?si=d2aTlXX-oaU7NkbJ', color: 'text-pink-400' },
    { name: 'Ordinary', url: 'https://youtube.com/shorts/w4i9Ln86O7w?si=qjMpgr9ki4FGojIj', color: 'text-rose-400' },
    { name: 'All Of Me', url: 'https://youtube.com/shorts/HY-vI9W9cpc?si=rum5EYZGHaEDXQpL', color: 'text-indigo-400' },
    { name: 'A Thousand Years', url: 'https://youtube.com/shorts/okiYaQ6ZGsc?si=kQK9Jjd0WmgBocso', color: 'text-orange-400' },
    { name: 'Perfect', url: 'https://youtube.com/shorts/7BspO6r4Eog?si=Uu6M5FH0Nt0DHqsF', color: 'text-rose-500' },
    { name: 'Until I Found You', url: 'https://youtube.com/shorts/_oTL065WEB0?si=JhrPs2pB_Qcyj-I7', color: 'text-purple-400' }
];

const MusicPlayer = () => {
    const { userData, updateMusic, updateYoutubeUrl } = useValentine();
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [ytInput, setYtInput] = useState(userData.youtubeUrl || '');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isYoutubeLink = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');

    const currentTrack = userData.youtubeUrl
        ? { name: 'YouTube Track', url: userData.youtubeUrl }
        : userData.customMusic
            ? { name: 'Your Romantic Track', url: userData.customMusic }
            : DEFAULT_TRACKS[trackIndex];

    const isYoutube = !!userData.youtubeUrl || isYoutubeLink(currentTrack.url);

    useEffect(() => {
        if (!isYoutube) {
            if (isPlaying) {
                audioRef.current?.play().catch(e => console.error("Auto-play failed:", e));
            } else {
                audioRef.current?.pause();
            }
        }
    }, [isPlaying, trackIndex, userData.customMusic, isYoutube]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const handlePrev = () => {
        if (userData.customMusic || isYoutube) return;
        setTrackIndex((prev) => (prev - 1 + DEFAULT_TRACKS.length) % DEFAULT_TRACKS.length);
    };

    const handleNext = () => {
        if (userData.customMusic || isYoutube) return;
        setTrackIndex((prev) => (prev + 1) % DEFAULT_TRACKS.length);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateMusic(reader.result as string);
                updateYoutubeUrl(''); // Clear YT if file uploaded
                setIsPlaying(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleYtSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (ytInput.trim()) {
            updateYoutubeUrl(ytInput);
            updateMusic(''); // Clear custom file if YT selected
            setIsPlaying(true);
        }
    };

    const clearYt = () => {
        updateYoutubeUrl('');
        setYtInput('');
    };

    return (
        <div className="relative">
            {!isYoutube && (
                <audio
                    ref={audioRef}
                    src={currentTrack.url}
                    loop
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />
            )}

            {isYoutube && (
                <div className="hidden">
                    <ReactPlayer
                        src={currentTrack.url}
                        playing={isPlaying}
                        loop
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        width="0"
                        height="0"
                    />
                </div>
            )}

            <div className="flex items-center gap-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowMenu(!showMenu)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-2xl transition-all ${isPlaying ? 'bg-pink-600/20 text-pink-400 animate-spin-slow' : 'bg-white/5 text-white/40'}`}
                >
                    <Music className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                    {showMenu && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className="absolute top-14 right-0 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[30px] p-6 shadow-3xl min-w-[300px] z-50 overflow-hidden"
                        >
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/20 blur-[60px] pointer-events-none" />

                            <div className="relative">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Romantic Player</h4>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 hover:bg-white/10 rounded-full transition-all text-pink-400"
                                            title="Upload Your Romantic Song"
                                        >
                                            <Upload className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            accept="audio/*"
                                        />
                                    </div>
                                </div>

                                {/* YouTube Input */}
                                <form onSubmit={handleYtSubmit} className="mb-6 relative">
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-pink-500 transition-all">
                                        <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                                        <input
                                            type="text"
                                            value={ytInput}
                                            onChange={(e) => setYtInput(e.target.value)}
                                            placeholder="Paste YouTube Link..."
                                            className="bg-transparent border-none text-[10px] text-white outline-none w-full"
                                        />
                                        {userData.youtubeUrl && (
                                            <button type="button" onClick={clearYt} className="text-white/20 hover:text-white">
                                                <X className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                    <button type="submit" className="hidden" />
                                </form>

                                <div className="text-center mb-6">
                                    <p className="text-sm font-playfair italic text-white/80 mb-1 truncate px-2">
                                        {currentTrack.name}
                                    </p>
                                    <div className="flex items-center justify-center gap-6">
                                        <button
                                            onClick={handlePrev}
                                            disabled={isYoutube || !!userData.customMusic}
                                            className={`transition-colors ${isYoutube || !!userData.customMusic ? 'text-white/10 cursor-not-allowed' : 'text-white/40 hover:text-white'}`}
                                        >
                                            <SkipBack className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={togglePlay}
                                            className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg shadow-pink-900/40"
                                        >
                                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-0.5" />}
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={isYoutube || !!userData.customMusic}
                                            className={`transition-colors ${isYoutube || !!userData.customMusic ? 'text-white/10 cursor-not-allowed' : 'text-white/40 hover:text-white'}`}
                                        >
                                            <SkipForward className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/20 mb-2 px-2">Playlist</p>
                                    {DEFAULT_TRACKS.map((track, i) => (
                                        <button
                                            key={track.name}
                                            onClick={() => {
                                                setTrackIndex(i);
                                                updateMusic('');
                                                updateYoutubeUrl('');
                                                setIsPlaying(true);
                                            }}
                                            className={`w-full px-4 py-2 rounded-xl text-left text-xs transition-all flex items-center justify-between group ${(!userData.customMusic && !isYoutube && trackIndex === i) ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-white/40'}`}
                                        >
                                            <span>{track.name}</span>
                                            {(!userData.customMusic && !isYoutube && trackIndex === i) && isPlaying && (
                                                <div className="flex gap-0.5">
                                                    <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-pink-500" />
                                                    <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-0.5 bg-pink-500" />
                                                    <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-0.5 bg-pink-500" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                    {userData.customMusic && (
                                        <div className="mt-4 pt-4 border-t border-white/5">
                                            <button className="w-full px-4 py-2 rounded-xl bg-pink-600/20 text-pink-400 text-left text-xs font-bold flex items-center justify-between">
                                                <span>Your Upload</span>
                                                <Volume2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}
                                    {isYoutube && (
                                        <div className="mt-4 pt-4 border-t border-white/5">
                                            <button className="w-full px-4 py-2 rounded-xl bg-red-600/20 text-red-400 text-left text-xs font-bold flex items-center justify-between">
                                                <span>YouTube Playback</span>
                                                <Youtube className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MusicPlayer;
