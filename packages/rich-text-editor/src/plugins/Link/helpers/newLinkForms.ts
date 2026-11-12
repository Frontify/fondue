/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorControlApi } from '#/core';

/** Lets the hotkey open the toolbar button's new-link form: a hotkey only gets the api, so each button registers its opener under it. */
const openers = new WeakMap<EditorControlApi, () => void>();

/** Registers a button's opener for its editor; the returned function unregisters it. */
export const registerNewLinkForm = (api: EditorControlApi, open: () => void): (() => void) => {
    openers.set(api, open);
    return () => {
        if (openers.get(api) === open) {
            openers.delete(api);
        }
    };
};

/** Open this editor's form for a new link. False when its toolbar is not showing one. */
export const openNewLinkForm = (api: EditorControlApi): boolean => {
    const open = openers.get(api);
    open?.();
    return open !== undefined;
};
