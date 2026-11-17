/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin, type EditorControlApi } from '#/core';

/** The name of Enter in the keyboard reference, and what the plugin says to screen readers: the hint read with the editor, and why an empty required editor refuses Enter. */
const BLUR_ON_BREAK_STRINGS = Object.freeze({
    submitTitle: 'Submit, outside a list',
    description: 'Press Enter to submit.',
    required: 'Type something before submitting.',
});

/**
 * Read once, when the editor mounts the plugin: a new `onBreak` or `required` from a later render is not seen.
 * Build the plugin once and read changing state, such as the text to save, through a ref.
 */
export type BlurOnBreakPluginOptions = {
    /**
     * Called when Enter commits, just before the editor gives up focus. Never called for a click away: that is the host's `onBlur`.
     */
    onBreak?: () => void;
    /**
     * Enter on an empty editor refuses instead of committing, and says why.
     *
     * @default false
     */
    required?: boolean;
};

type BreakLineParams = {
    api: EditorControlApi;
    onBreak: (() => void) | undefined;
    required: boolean;
};

const breakLine = ({ api, onBreak, required }: BreakLineParams): void => {
    if (api.lists.split()) {
        return;
    }
    if (required && api.isEmpty()) {
        api.announce(BLUR_ON_BREAK_STRINGS.required);
        return;
    }
    onBreak?.();
    api.blur();
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
 * blurOnBreakPlugin({ onBreak: submit, required: true })
 */
export const blurOnBreakPlugin = ({ onBreak, required = false }: BlurOnBreakPluginOptions = {}) => {
    // A field with no submit to announce says nothing about submitting.
    let description: string | undefined;
    if (onBreak !== undefined) {
        description = BLUR_ON_BREAK_STRINGS.description;
        if (required) {
            description = `${BLUR_ON_BREAK_STRINGS.description} ${BLUR_ON_BREAK_STRINGS.required}`;
        }
    }
    return definePlugin({
        id: 'blur-on-break',
        description,
        hotkeys: {
            Enter: {
                label: BLUR_ON_BREAK_STRINGS.submitTitle,
                // Enter is always this plugin's: it splits an item, refuses, or submits.
                run: (api) => {
                    breakLine({ api, onBreak, required });
                    return true;
                },
            },
        },
    });
};
