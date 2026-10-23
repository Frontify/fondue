/* (c) Copyright Frontify Ltd., all rights reserved. */

import { macBaseKeymap, pcBaseKeymap } from 'prosemirror-commands';
import { keydownHandler } from 'prosemirror-keymap';
import { Plugin, PluginKey } from 'prosemirror-state';

import { BASE_KEYS_PLUGIN } from '#/model/capabilities';
import { isApple, modOn } from '#/model/platform';

/** ProseMirror's base keymap of the platform, with `Mod` bound as the editor's own platform check reads it. */
const baseKeysOf = (keymap: typeof pcBaseKeymap, apple: boolean) =>
    keydownHandler(Object.fromEntries(Object.entries(keymap).map(([key, command]) => [modOn(key, apple), command])));
const BASE_KEYS = { apple: baseKeysOf(macBaseKeymap, true), other: baseKeysOf(pcBaseKeymap, false) };

/**
 * Enter, Backspace, Delete and select-all, which ProseMirror leaves to its base keymap: without them it prevents
 * Enter and a Backspace at a block start, and the browser's own select-all stops at a node view's chrome.
 */
export const baseKeysPlugin = () =>
    new Plugin({
        key: new PluginKey(BASE_KEYS_PLUGIN.id),
        props: {
            handleKeyDown: (view, event) => {
                const owner = view.dom.ownerDocument.defaultView;
                if (owner !== null && isApple(owner.navigator)) {
                    return BASE_KEYS.apple(view, event);
                }
                return BASE_KEYS.other(view, event);
            },
        },
    });
