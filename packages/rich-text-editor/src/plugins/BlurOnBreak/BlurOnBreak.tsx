/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin, type EditorControlApi } from '#/core';

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
     * Enter on an empty editor refuses instead of committing, and says why: `true` or an empty string for the default words, or a string for yours
     *
     * @default false
     */
    required?: boolean | string;
};

const REQUIRED_MESSAGE = 'Type something before submitting.';
const DESCRIPTION = 'Press Enter to submit.';

/** What to say when an empty editor refuses Enter, or null when the editor need not be filled. */
const requiredMessageOf = (required: boolean | string | undefined): string | null => {
    if (required === undefined || required === false) {
        return null;
    }
    if (required === true || required === '') {
        return REQUIRED_MESSAGE;
    }
    return required;
};

const breakLine = (api: EditorControlApi, { onBreak, required }: BlurOnBreakPluginOptions): void => {
    if (api.lists.split()) {
        return;
    }
    const requiredMessage = requiredMessageOf(required);
    if (requiredMessage !== null && api.isEmpty()) {
        api.announce(requiredMessage);
        return;
    }
    onBreak?.();
    api.blur();
};

/**
 * Enter commits instead of adding a paragraph, what a single-line editor (a
 * title field, a comment box) wants. Inside a list Enter still splits the
 * item, so a list typed into such an editor can grow, and on an empty item it
 * leaves the list; anywhere else it calls
 * `onBreak` and gives up focus. Plugin hotkeys run before the editor's own
 * keys, so this handler splits the item itself rather than leaving Enter to
 * the list.
 *
 * @example
 * blurOnBreakPlugin({ onBreak: submit, required: 'Write a comment first.' })
 */
export const blurOnBreakPlugin = (options: BlurOnBreakPluginOptions = {}) => {
    // A field with no submit to announce says nothing about submitting.
    let description: string | undefined;
    if (options.onBreak !== undefined) {
        description = DESCRIPTION;
        const requiredMessage = requiredMessageOf(options.required);
        if (requiredMessage !== null) {
            description = `${DESCRIPTION} ${requiredMessage}`;
        }
    }
    return definePlugin({
        id: 'blur-on-break',
        description,
        hotkeys: {
            // Enter is always this plugin's: it splits an item, refuses, or submits.
            Enter: {
                label: 'Submit, outside a list',
                run: (api) => {
                    breakLine(api, options);
                    return true;
                },
            },
        },
    });
};
