/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The target of a link that opens in a new tab.
 */
export const NEW_TAB_TARGET = '_blank';

/**
 * The `rel` of a link that opens in a new tab, so the new page cannot reach back to this one.
 */
export const NEW_TAB_REL = 'noopener noreferrer';

/**
 * The same protections as `NEW_TAB_REL`, in the comma list `window.open` takes.
 */
export const NEW_TAB_WINDOW_FEATURES = 'noopener,noreferrer';

/**
 * The marker on the hidden note a new-tab link carries, so parsing can tell it from the link's own text.
 */
export const NEW_TAB_NOTE_ATTRIBUTE = 'data-rte-link-note';

/**
 * The hidden note that tells a screen reader a link opens in a new tab.
 */
export const NEW_TAB_NOTE = ' (opens in new tab)';
