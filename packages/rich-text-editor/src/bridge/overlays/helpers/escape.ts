/* (c) Copyright Frontify Ltd., all rights reserved. */

// Escapes that an overlay hands on after closing, so the chrome still moves focus for them.
const passedEscapes = new WeakSet<Event>();

/** Closes an overlay on Escape and still lets the key return focus from a toolbar to the surface. */
export const passEscape = (event: KeyboardEvent): void => {
    passedEscapes.add(event);
};

/** Whether an overlay handed this Escape on, though it prevented its default. */
export const escapePassed = (event: Event): boolean => passedEscapes.has(event);
