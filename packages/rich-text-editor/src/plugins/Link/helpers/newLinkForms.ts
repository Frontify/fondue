/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorControlApi } from '#/core';

/**
 * The openers of the toolbar buttons' new-link forms, by editor, so the hotkey can open one
 */
const openers = /* @__PURE__ */ new WeakMap<EditorControlApi, () => void>();

/**
 * Registers a button's opener for its editor; the returned function unregisters it
 */
export const registerNewLinkForm = (api: EditorControlApi, open: () => void): (() => void) => {
    openers.set(api, open);
    return () => {
        if (openers.get(api) === open) {
            openers.delete(api);
        }
    };
};

/**
 * Open this editor's form for a new link. False when its toolbar is not showing one.
 */
export const openNewLinkForm = (api: EditorControlApi): boolean => {
    const open = openers.get(api);
    open?.();
    return open !== undefined;
};
