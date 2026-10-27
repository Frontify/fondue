/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_emojiFailed: 'De emoji kon niet worden geladen.',
    RichTextEditor_emojiLoading: 'Emoji laden…',
    RichTextEditor_emojiNoResults: 'Geen emoji gevonden',
    RichTextEditor_emojiSearch: 'Emoji zoeken',
} satisfies PluginStrings<typeof en>;
