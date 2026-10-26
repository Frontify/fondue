/* (c) Copyright Frontify Ltd., all rights reserved. */

// Node chrome sits inside the surface, so its controls take no Tab stop of their own; Alt+F10 reaches them.
export const OUT_OF_TAB_ORDER = -1;

/**
 * A press that keeps focus and the on-screen keyboard in the surface. It
 * prevents the `mousedown` that moves focus, since WebKit drops the click of a touch whose `pointerdown` was prevented.
 */
export const keepFocus = (event: { preventDefault(): void }): void => event.preventDefault();
