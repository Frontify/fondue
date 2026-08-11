/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconFaceHappy } from '@frontify/fondue-icons';

import { definePlugin } from '#/RichTextEditor';

import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

import { EMOJIS, matches } from './helpers/emojis';

/**
 * An emoji is plain text, so this plugin contributes no schema: `:` opens a
 * picker and choosing an entry types the character.
 */
export const EmojiPlugin = definePlugin(() => ({
    id: 'emoji',
    combobox: {
        trigger: ':',
        items: (query) => {
            const needle = query.toLowerCase();
            return EMOJIS.filter(([, name]) => matches(name, needle)).map(([glyph, name]) => ({
                // The glyph is the identity here: it is unique, and it is what
                // gets inserted.
                id: glyph,
                label: name,
                hint: glyph,
            }));
        },
        onSelect: (item, api) => api.insertText(item.id),
    },
    // The button opens the same picker the trigger does, at the caret.
    toolbar: (api) => (
        <ToolbarButton title="Emoji" onClick={() => api.insertText(':')}>
            <IconFaceHappy size={16} />
        </ToolbarButton>
    ),
}));
