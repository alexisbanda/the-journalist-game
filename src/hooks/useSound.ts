'use client';

import { useCallback } from 'react';

// Simplified sound hook using HTML5 Audio
export const useSound = (src: string) => {
    const play = useCallback(() => {
        // In a real app we'd load files. 
        // For MVP/Demo I will assume files exist or fail gracefully.
        try {
            const audio = new Audio(src);
            audio.volume = 0.5;
            audio.play().catch(e => console.warn("Audio play failed (user interaction needed likely)", e));
        } catch (e) {
            // ignore
        }
    }, [src]);

    return [play];
};

// Pre-defined sounds map
export const SOUNDS = {
    CLICK: '/sounds/click.mp3',
    TYPE: '/sounds/type.mp3',
    NOTIFICATION: '/sounds/notification.mp3',
    SUCCESS: '/sounds/success.mp3',
    FAILURE: '/sounds/failure.mp3'
};
