/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin, type EditorControlApi } from '#/core';

export type BlurOnBreakPluginOptions = {
    /**
     * Called when Enter commits, just before the editor gives up focus. Never called for a click away: that is the host's `onBlur`.
     */
    onBreak?: () => void;
    /**
     * Enter on an empty editor refuses instead of committing, and says why: `true` or an empty string for the default words, or a string for yours
     */
    required?: boolean | string;
};

const REQUIRED_MESSAGE = 'Type something before submitting.';

const requiredMessageOf = (required: true | string): string => {
    if (required === true || required === '') {
        return REQUIRED_MESSAGE;
    }
    return required;
};

/**
 * Enter commits instead of adding a paragraph, what a single-line editor (a
 * title field, a comment box) wants. Inside a list Enter still splits the
 * item, so a list typed into such an editor can grow; anywhere else it calls
 * `onBreak` and gives up focus. Plugin hotkeys run before the editor's own
 * keys, so this handler splits the item itself rather than leaving Enter to
 * the list.
 *
 * @example
 * blurOnBreakPlugin({ onBreak: submit, required: 'Write a comment first.' })
 */
export const blurOnBreakPlugin = ({ onBreak, required }: BlurOnBreakPluginOptions = {}) => {
    const breakLine = (api: EditorControlApi): void => {
        if (api.lists.split()) {
            return;
        }
        if (required !== undefined && required !== false && api.isEmpty()) {
            api.announce(requiredMessageOf(required));
            return;
        }
        onBreak?.();
        api.blur();
    };
    return definePlugin({
        id: 'blur-on-break',
        description: 'Press Enter to submit.',
        hotkeys: {
            // Enter is always this plugin's: it splits an item, refuses, or submits.
            Enter: (api) => {
                breakLine(api);
                return true;
            },
        },
    });
};
