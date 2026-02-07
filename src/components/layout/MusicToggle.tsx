import { motion } from 'framer-motion';
import { Music, Music2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const MusicToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Royalty-free romantic track (Lofi/Piano)
        audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play blocked by browser. Click to interact first."));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMusic}
            className="p-3 bg-white/5 border border-white/10 rounded-full text-pink-500 backdrop-blur-md pointer-events-auto"
        >
            {isPlaying ? <Music className="w-5 h-5 animate-spin-slow" /> : <Music2 className="w-5 h-5 opacity-50" />}
        </motion.button>
    );
};

export default MusicToggle;
