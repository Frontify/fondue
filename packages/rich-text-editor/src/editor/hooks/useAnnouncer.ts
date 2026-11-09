/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

/**
 * How long a message stays in the live region: one that no longer applies must not be found later in browse mode.
 */
const CLEAR_AFTER_MS = 5000;

/**
 * The text a polite live region holds, and how to say something through it.
 * The region is cleared first and set on the next frame, so the same message
 * twice is two changes a screen reader announces twice.
 */
export const useAnnouncer = (): { message: string; announce: (message: string) => void } => {
    const [message, setMessage] = useState('');
    const frameRef = useRef(0);
    const clearRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(
        () => () => {
            cancelAnimationFrame(frameRef.current);
            clearTimeout(clearRef.current);
        },
        [],
    );

    const announce = (next: string): void => {
        cancelAnimationFrame(frameRef.current);
        clearTimeout(clearRef.current);
        setMessage('');
        frameRef.current = requestAnimationFrame(() => {
            setMessage(next);
            clearRef.current = setTimeout(() => setMessage(''), CLEAR_AFTER_MS);
        });
    };

    return { message, announce };
};
