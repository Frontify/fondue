/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_emoji: 'Emoji',
    RichTextEditor_emojiFailed: 'Emoji konnte nicht geladen werden.',
    RichTextEditor_emojiLoading: 'Emoji werden geladen…',
    RichTextEditor_emojiNoResults: 'Kein Emoji gefunden',
    RichTextEditor_emojiSearch: 'Emoji suchen',
} satisfies PluginStrings<typeof en>;
