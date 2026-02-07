import { useState, useEffect } from 'react';

export const useValentineDate = () => {
    const [currentDay, setCurrentDay] = useState<number>(7);
    const [unlockedDay, setUnlockedDay] = useState<number>(7);

    useEffect(() => {
        // Current date from system
        const now = new Date();
        const isFebruary = now.getMonth() === 1; // 0-indexed, February is 1
        const date = now.getDate();

        if (isFebruary) {
            // Unlock all days up to the current date (max 14)
            const todayId = Math.min(date, 14);
            setUnlockedDay(todayId);
            
            // Set current day to today if it's within the range, otherwise default to Rose Day (7)
            if (date >= 7 && date <= 14) {
                setCurrentDay(date);
            } else if (date > 14) {
                setCurrentDay(14);
            } else {
                setCurrentDay(7);
            }
        } else {
            // If it's not February, lock all days (default to Rose Day 7)
            setUnlockedDay(7);
            setCurrentDay(7);
        }
    }, []);

    return { currentDay, setCurrentDay, unlockedDay };
};
