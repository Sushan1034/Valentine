import { useState, useEffect } from 'react';

export const useValentineDate = () => {
    const [currentDay, setCurrentDay] = useState<number>(7);
    const [unlockedDay, setUnlockedDay] = useState<number>(7);

    useEffect(() => {
        // Current date from system
        const now = new Date();
        const month = now.getMonth() + 1; // 0-indexed
        const date = now.getDate();

        // For Review: Unlock all days
        setUnlockedDay(14);
        setCurrentDay(7);

        // For Demo: If we are on Feb 7, let's keep it that way.
    }, []);

    return { currentDay, setCurrentDay, unlockedDay };
};
