/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/core';

/** The name of Enter in the keyboard reference. */
const BLUR_ON_BREAK_STRINGS = Object.freeze({
    submitTitle: 'Submit, outside a list',
});

/**
 * Read once, when the editor mounts the plugin: a new `onBreak` from a later render is not seen.
 * Build the plugin once and read changing state, such as the text to save, through a ref.
 */
export type BlurOnBreakPluginOptions = {
    /**
     * Called when Enter commits, just before the editor gives up focus. Never called for a click away: that is the host's `onBlur`.
     */
    onBreak?: () => void;
};

/**
 * Enter commits instead of adding a paragraph — what a single-line editor (a
 * title field, a comment box) wants. Inside a list Enter still splits the
 * item, so a list typed into such an editor can grow, and on an empty item it
 * leaves the list; anywhere else it calls `onBreak` and gives up focus. Plugin
 * hotkeys run before the editor's own keys, so this handler splits the item
 * itself rather than leaving Enter to the list.
 *
 * @example
 * blurOnBreakPlugin({ onBreak: submit })
 */
export const blurOnBreakPlugin = ({ onBreak }: BlurOnBreakPluginOptions = {}) =>
    definePlugin({
        id: 'blur-on-break',
        hotkeys: {
            Enter: {
                label: BLUR_ON_BREAK_STRINGS.submitTitle,
                // Enter is always this plugin's: it splits an item or submits.
                run: (api) => {
                    if (!api.lists.split()) {
                        onBreak?.();
                        api.blur();
                    }
                    return true;
                },
            },
        },
    });
