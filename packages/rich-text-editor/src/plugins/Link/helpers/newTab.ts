/* (c) Copyright Frontify Ltd., all rights reserved. */

export const NEW_TAB_TARGET = '_blank';

/**
 * So the new page cannot reach back to this one.
 */
export const NEW_TAB_REL = 'noopener noreferrer';

const ASCII_UPPERCASE = /[A-Z]/g;

/** Whether an anchor's target opens a new tab; browsers match the keyword ASCII case-insensitively. */
export const opensInNewTab = (target: string | null): boolean => {
    if (target === null) {
        return false;
    }

    return target.replaceAll(ASCII_UPPERCASE, (letter) => letter.toLowerCase()) === NEW_TAB_TARGET;
};
