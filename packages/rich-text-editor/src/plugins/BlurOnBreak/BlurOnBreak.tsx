/* (c) Copyright Frontify Ltd., all rights reserved. */

import { definePlugin, type EditorControlApi } from '#/core';

/**
 * The words the plugin says to screen readers
 */
export type BlurOnBreakLabels = {
    /**
     * Said with the editor, when `onBreak` is set, to tell that Enter submits. The reason from `required` follows it.
     *
     * @default 'Press Enter to submit.'
     */
    description: string;
    /**
     * Said when Enter is refused because a required editor is empty.
     *
     * @default 'Type something before submitting.'
     */
    required: string;
};

const DEFAULT_BLUR_ON_BREAK_LABELS: BlurOnBreakLabels = {
    description: 'Press Enter to submit.',
    required: 'Type something before submitting.',
};

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
     * Enter on an empty editor refuses instead of committing, and says `labels.required`.
     *
     * @default false
     */
    required?: boolean;
    /**
     * The words the plugin says. Each one left out stays English.
     */
    labels?: Partial<BlurOnBreakLabels>;
};

type BreakLineParams = {
    api: EditorControlApi;
    onBreak: (() => void) | undefined;
    required: boolean;
    labels: BlurOnBreakLabels;
};

const breakLine = ({ api, onBreak, required, labels }: BreakLineParams): void => {
    if (api.lists.split()) {
        return;
    }
    if (required && api.isEmpty()) {
        api.announce(labels.required);
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
 * blurOnBreakPlugin({ onBreak: submit, required: true, labels: { required: 'Write a comment first.' } })
 */
export const blurOnBreakPlugin = ({
    onBreak,
    required = false,
    labels: labelOverrides,
}: BlurOnBreakPluginOptions = {}) => {
    const labels: BlurOnBreakLabels = { ...DEFAULT_BLUR_ON_BREAK_LABELS, ...labelOverrides };
    // A field with no submit to announce says nothing about submitting.
    let description: string | undefined;
    if (onBreak !== undefined) {
        description = labels.description;
        if (required) {
            description = `${labels.description} ${labels.required}`;
        }
    }
    return definePlugin({
        id: 'blur-on-break',
        description,
        hotkeys: {
            // Enter is always this plugin's: it splits an item, refuses, or submits.
            Enter: (api) => {
                breakLine({ api, onBreak, required, labels });
                return true;
            },
        },
    });
};
