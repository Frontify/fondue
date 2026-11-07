/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin } from '#/core';

export type BlurOnBreakPluginOptions = {
    /** Called when Enter commits, just before the editor gives up focus. Never called for a click away: that is the host's `onBlur`. */
    onBreak?: () => void;
    /** Enter on an empty editor refuses instead of committing, and says why: `true` for the default words, or a string for yours. */
    required?: boolean | string;
};

const REQUIRED_MESSAGE = 'Type something before submitting.';

/**
 * Enter commits instead of adding a paragraph, what a single-line editor (a
 * title field, a comment box) wants. Inside a list Enter still splits the
 * item, so a list typed into such an editor can grow; anywhere else it calls
 * `onBreak` and gives up focus. Plugin hotkeys run before the editor's own
 * keys, so this handler splits the item itself rather than leaving Enter to
 * the list.
 */
export const blurOnBreakPlugin = ({ onBreak, required }: BlurOnBreakPluginOptions = {}) =>
    definePlugin({
        id: 'blur-on-break',
        description: 'Press Enter to submit.',
        hotkeys: {
            Enter: (api) => {
                if (api.lists.split()) {
                    return true;
                }
                if (required && api.isEmpty()) {
                    api.announce(typeof required === 'string' ? required : REQUIRED_MESSAGE);
                    return true;
                }
                onBreak?.();
                api.blur();
                return true;
            },
        },
    });
