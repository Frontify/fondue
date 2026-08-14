/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Attributes that mean something to the editor when they appear on what a
 * plugin renders. Declared here rather than written out at both ends, because a
 * misspelled one fails silently.
 */

/**
 * Marks the element that toggles a boolean block attribute when clicked: the
 * checkbox of a check-list item flips the item's `checked`. Spread it with
 * `toggles` rather than writing the attribute out.
 */
export const TOGGLE_ATTRIBUTE = 'data-rte-toggle';

/**
 * Makes a rendered element flip the named boolean block attribute on click:
 * `<span {...toggles('checked')} />`.
 */
export const toggles = (attribute: string): Record<string, string> => ({ [TOGGLE_ATTRIBUTE]: attribute });
