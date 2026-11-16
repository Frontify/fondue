/* (c) Copyright Frontify Ltd., all rights reserved. */

export const NEW_TAB_TARGET = '_blank';

/**
 * So the new page cannot reach back to this one.
 */
export const NEW_TAB_REL = 'noopener noreferrer';

/**
 * The same protections as `NEW_TAB_REL`, in the comma list `window.open` takes.
 */
export const NEW_TAB_WINDOW_FEATURES = 'noopener,noreferrer';

/**
 * Kept apart from the other labels so the reading view does not carry them.
 */
export const DEFAULT_NEW_TAB_NOTE = ' (opens in new tab)';

/**
 * The marker on the hidden note a new-tab link carries, so parsing can tell it from the link's own text.
 */
export const NEW_TAB_NOTE_ATTRIBUTE = 'data-rte-link-note';
