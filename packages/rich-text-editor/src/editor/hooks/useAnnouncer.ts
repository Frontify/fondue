/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

/**
 * The text a polite live region holds, and how to say something through it.
 * The region is cleared first and set on the next frame, so the same message
 * twice is two changes a screen reader announces twice.
 */
export const useAnnouncer = (): { message: string; announce: (message: string) => void } => {
    const [message, setMessage] = useState('');
    const frameRef = useRef(0);

    useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

    const announce = (next: string): void => {
        cancelAnimationFrame(frameRef.current);
        setMessage('');
        frameRef.current = requestAnimationFrame(() => setMessage(next));
    };

    return { message, announce };
};
