/* (c) Copyright Frontify Ltd., all rights reserved. */

export const NEW_TAB_TARGET = '_blank';

/**
 * So the new page cannot reach back to this one.
 */
export const NEW_TAB_REL = 'noopener noreferrer';

const ASCII_UPPERCASE = /[A-Z]/g;

/** Targets browsers open in a new tab: the `_blank` keyword, and `_new`, a window name no page has opened yet. */
const NEW_TAB_TARGETS: ReadonlySet<string> = new Set([NEW_TAB_TARGET, '_new']);

/** Whether an anchor's target opens a new tab: `_blank` or `_new`, matched ASCII case-insensitively as browsers match the keyword. */
export const opensInNewTab = (target: string | null): boolean => {
    if (target === null) {
        return false;
    }

    return NEW_TAB_TARGETS.has(target.replaceAll(ASCII_UPPERCASE, (letter) => letter.toLowerCase()));
};
