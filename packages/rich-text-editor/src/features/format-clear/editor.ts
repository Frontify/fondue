/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/plugin';

import { formatClear } from './feature';

// Links, mentions and `language` passages carry meaning, so clearing inline formatting keeps them.
const FORMATTING_MARKS = [
    'bold',
    'italic',
    'underline',
    'strike',
    'code',
    'subscript',
    'superscript',
    'highlight',
    'font_color',
];
// The block attributes clearing all formatting restores to their declared defaults.
const CLEARED_ATTRIBUTES = ['align', 'indent'];

/**
 * Clears formatting: Mod+\ removes the formatting marks only, and the toolbar button also removes every other mark,
 * lifts the selected blocks out of lists, turns them into paragraphs and clears alignment and indent.
 */
export const formatClearEditor = defineEditorPart(formatClear, {
    needs: ['blocks', 'marks'],
    commands: {
        'format.clear': {
            run: (api) => {
                const blocks = api.blocks.clear(CLEARED_ATTRIBUTES);
                const marks = api.marks.remove(api.marks.installed(), { wholeBlocks: true });
                return blocks || marks;
            },
        },
        'format.inline.clear': { run: (api) => api.marks.remove(FORMATTING_MARKS) },
    },
    keys: { 'Mod-\\': 'format.inline.clear' },
    toolbar: [
        {
            id: 'clear-formatting',
            kind: 'button',
            command: 'format.clear',
            labelKey: 'RichTextEditor_clearFormatting',
            icon: 'IconEraser',
        },
    ],
});
