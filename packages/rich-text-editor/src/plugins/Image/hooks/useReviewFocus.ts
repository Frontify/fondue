/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useEffect } from 'react';

/** After the author's own replacement, moves focus to the review action the prompt describes. */
export const useReviewFocus = (
    altLabel: string | undefined,
    takesFocus: boolean,
    barRef: RefObject<HTMLDivElement | null>,
) => {
    // After the author's own pick focus moves to the review action, which the prompt describes; a background
    // completion leaves focus where the author is, and its announcement carries the prompt.
    useEffect(() => {
        if (altLabel !== undefined && takesFocus) {
            const action = barRef.current?.querySelector<HTMLElement>(`button[aria-label="${CSS.escape(altLabel)}"]`);
            action?.focus();
        }
    }, [altLabel, takesFocus, barRef]);
};
