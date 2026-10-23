/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorApi } from '#/bridge/plugin';

/** Whether the surface that `surface` returns holds focus. */
export const surfaceFocused = (surface: EditorApi['surface'] | undefined): boolean => {
    const element = surface?.();
    return element !== undefined && element.ownerDocument.activeElement === element;
};
