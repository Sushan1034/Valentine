import React, { createContext, useContext, useState, useEffect } from 'react';

export type RelationshipType = 'crush' | 'partner' | 'bestie' | 'self-love';
export type MoodType = 'happy' | 'missing' | 'shy' | 'heartbroken' | 'normal';

export interface TeddyState {
    name: string;
    bondLevel: number;
    lastFed: string;
    isDressed: boolean;
    isTuckedIn: boolean;
}

export interface PromiseItem {
    id: string;
    text: string;
    unlockDate?: string;
    passphrase?: string;
    isLocked: boolean;
    createdAt: string;
}

interface UserData {
    userName: string;
    partnerName: string;
    relationshipType: RelationshipType;
    loveMeter: number;
    streak: number;
    lastVisit: string;
    memories: Record<number, string>; // dayId -> note
    photos: Record<number, string>; // dayId -> base64
    mood: MoodType;
    teddyState: TeddyState;
    promiseVault: PromiseItem[];
    customMusic?: string; // base64
    youtubeUrl?: string; // youtube link
    currentTrackIndex: number;
}

interface ValentineContextType {
    userData: UserData;
    updateUserData: (data: Partial<UserData>) => void;
    addMemory: (dayId: number, content: string) => void;
    addPhoto: (dayId: number, base64: string) => void;
    fillMeter: (dayId: number) => void; // Logic to increment once per day
    setMood: (mood: MoodType) => void;
    updateTeddy: (data: Partial<TeddyState>) => void;
    addPromise: (promise: PromiseItem) => void;
    updateMusic: (base64: string) => void;
    updateYoutubeUrl: (url: string) => void;
    isFirstVisit: boolean;
}

const DEFAULT_USER_DATA: UserData = {
    userName: '',
    partnerName: '',
    relationshipType: 'partner',
    loveMeter: 0,
    streak: 0,
    lastVisit: '',
    memories: {},
    photos: {},
    mood: 'normal',
    teddyState: {
        name: 'Teddy',
        bondLevel: 0,
        lastFed: '',
        isDressed: false,
        isTuckedIn: false
    },
    promiseVault: [],
    currentTrackIndex: 0
};

const ValentineContext = createContext<ValentineContextType | undefined>(undefined);

export const ValentineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData>(DEFAULT_USER_DATA);
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [completedDays, setCompletedDays] = useState<number[]>([]);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('valentine_user_data');
        if (saved) {
            const data: UserData = JSON.parse(saved);
            const today = new Date().toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString();

            let newStreak = data.streak || 0;
            if (data.lastVisit === yesterday) {
                newStreak += 1;
            } else if (data.lastVisit !== today) {
                newStreak = 1;
            }

            // Initialize missing fields for migration
            setUserData({
                ...DEFAULT_USER_DATA,
                ...data,
                streak: newStreak,
                lastVisit: today
            });
            setIsFirstVisit(false);
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (userData.userName) {
            localStorage.setItem('valentine_user_data', JSON.stringify(userData));
        }
    }, [userData]);

    const updateUserData = (data: Partial<UserData>) => {
        setUserData(prev => ({ ...prev, ...data }));
        if (data.userName) setIsFirstVisit(false);
    };

    const addMemory = (dayId: number, content: string) => {
        setUserData(prev => ({
            ...prev,
            memories: { ...prev.memories, [dayId]: content }
        }));
    };

    const addPhoto = (dayId: number, base64: string) => {
        setUserData(prev => ({
            ...prev,
            photos: { ...prev.photos, [dayId]: base64 }
        }));
    };

    const fillMeter = (dayId: number) => {
        if (completedDays.includes(dayId)) return;

        setCompletedDays(prev => [...prev, dayId]);
        setUserData(prev => {
            // 100 / 8 days (7-14) = 12.5% per day
            const nextMeter = Math.min(prev.loveMeter + 12.5, 100);
            return { ...prev, loveMeter: nextMeter };
        });
    };

    const setMood = (mood: MoodType) => {
        setUserData(prev => ({ ...prev, mood }));
    };

    const updateTeddy = (data: Partial<TeddyState>) => {
        setUserData(prev => ({
            ...prev,
            teddyState: { ...prev.teddyState, ...data }
        }));
    };

    const addPromise = (promise: PromiseItem) => {
        setUserData(prev => ({
            ...prev,
            promiseVault: [...prev.promiseVault, promise]
        }));
    };

    const updateMusic = (base64: string) => {
        setUserData(prev => ({ ...prev, customMusic: base64 }));
    };

    const updateYoutubeUrl = (url: string) => {
        setUserData(prev => ({ ...prev, youtubeUrl: url }));
    };

    return (
        <ValentineContext.Provider value={{
            userData,
            updateUserData,
            addMemory,
            addPhoto,
            fillMeter,
            setMood,
            updateTeddy,
            addPromise,
            updateMusic,
            updateYoutubeUrl,
            isFirstVisit
        }}>
            {children}
        </ValentineContext.Provider>
    );
};

export const useValentine = () => {
    const context = useContext(ValentineContext);
    if (!context) throw new Error('useValentine must be used within a ValentineProvider');
    return context;
};
