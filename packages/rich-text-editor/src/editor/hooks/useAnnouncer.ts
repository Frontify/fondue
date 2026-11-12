/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef, useState } from 'react';

/**
 * How long a message stays in the live region: one that no longer applies must not be found later in browse mode.
 */
const CLEAR_AFTER_MS = 5000;

/**
 * A no-break space marks a repeat: VoiceOver in Safari reads a live region again only when its text differs.
 */
const REPEAT_MARK = '\u00A0';

type UseAnnouncerResult = { message: string; announce: (message: string) => void };

/**
 * The text to set so a repeat differs from the last one.
 */
const repeatSafe = (next: string, last: string): string => {
    if (next === last) {
        return next + REPEAT_MARK;
    }
    return next;
};

/**
 * The text a polite live region holds, and how to say something through it.
 * The region is cleared first and set on the next frame, and a message equal
 * to the last one gets a no-break space added or dropped, so the same message
 * twice is two changes a screen reader announces twice.
 */
export const useAnnouncer = (): UseAnnouncerResult => {
    const [message, setMessage] = useState('');
    const frameRef = useRef(0);
    const clearRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const lastRef = useRef('');

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
            const text = repeatSafe(next, lastRef.current);
            lastRef.current = text;
            setMessage(text);
            clearRef.current = setTimeout(() => setMessage(''), CLEAR_AFTER_MS);
        });
    };

    return { message, announce };
};
