/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useReducer, useRef, useState } from 'react';

/**
 * The floating toolbar is normally shown over selected text only. While it has
 * focus, or has just been asked for from the keyboard, it is shown over a
 * caret too: that is "pinned", and it lasts only as long as focus stays within
 * the editor.
 */
export const useToolbarSummon = (
    focusWithin: boolean,
): {
    isPinned: boolean;
    pin: () => void;
    unpin: () => void;
    /** Alt+F10: pin the toolbar and ask it to take focus once it has rendered. */
    summon: () => void;
    /** Read and cleared by the toolbar when it takes focus. */
    focusRequestRef: MutableRefObject<boolean>;
} => {
    const [isPinned, setIsPinned] = useState(false);
    // Bumped by every request so the editor renders and the toolbar sees it,
    // even when the bar was already pinned and nothing else changes.
    const [, renderForRequest] = useReducer((count: number) => count + 1, 0);
    const focusRequestRef = useRef(false);

    if (isPinned && !focusWithin) {
        setIsPinned(false);
    }

    return {
        isPinned,
        pin: () => setIsPinned(true),
        unpin: () => setIsPinned(false),
        summon: () => {
            focusRequestRef.current = true;
            setIsPinned(true);
            renderForRequest();
        },
        focusRequestRef,
    };
};
