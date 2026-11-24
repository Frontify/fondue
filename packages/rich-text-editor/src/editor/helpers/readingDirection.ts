/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReadingDirection } from '#/core';

/** Reads the computed direction because a portaled toolbar cannot inherit the host's `dir`. */
export const readingDirectionOf = (element: Element | null): ReadingDirection => {
    if (element === null) {
        return 'ltr';
    }

    if (getComputedStyle(element).direction === 'rtl') {
        return 'rtl';
    }

    return 'ltr';
};
