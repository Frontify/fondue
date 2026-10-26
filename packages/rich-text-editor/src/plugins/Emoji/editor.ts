/* (c) Copyright Frontify Ltd., all rights reserved. */

import { lazyPart } from '#/bridge/define';
import { defineEditorPart } from '#/bridge/plugin';

import { loadEmoji, searchEmoji } from './helpers/data';
import { emoji } from './feature';

const EmojiPicker = lazyPart(() => import('./components/EmojiPicker').then((loaded) => loaded.EmojiPicker));

// Enough for a list that scrolls, few enough to rank well.
const LIMIT = 50;

/** The `:` list of emoji by their CLDR names in the editor's locale and the Emoji button's picker, which insert the chosen one as text. */
export const emojiEditor = defineEditorPart(emoji, {
    needs: ['overlays'],
    commands: {
        'emoji.picker.open': {
            // The selection's start sits in text that is not code.
            enabled: (api) => {
                const { blockType, verbatim } = api.selection();

                return blockType !== null && !verbatim;
            },
            run: (api) => {
                api.overlays.open(EmojiPicker, {}, 'selection');

                return true;
            },
        },
    },
    toolbar: [
        {
            id: 'emoji',
            kind: 'button',
            command: 'emoji.picker.open',
            labelKey: 'RichTextEditor_emoji',
            icon: 'IconFaceHappy',
            opensOverlay: true,
        },
    ],
    suggestions: [
        {
            trigger: ':',
            labelKey: 'RichTextEditor_suggestions',
            // Two letters first, so a time such as `12:30` or a smiley such as `:)` opens none.
            rules: { afterPunctuation: false, maxQuery: 32, spaces: false, leadingLetters: 2 },
            search: async (query, { api }) => {
                const entries = await loadEmoji(api.locale());
                const items = searchEmoji(entries, query, LIMIT).map((entry) => ({
                    key: entry.emoji,
                    label: entry.label,
                    glyph: entry.emoji,
                    payload: { text: entry.emoji },
                }));

                return { items, nextCursor: null };
            },
            command: 'text.insert',
        },
    ],
});
