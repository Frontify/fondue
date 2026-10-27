/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_emojiFailed: 'Nie udało się wczytać emoji.',
    RichTextEditor_emojiLoading: 'Wczytywanie emoji…',
    RichTextEditor_emojiNoResults: 'Nie znaleziono emoji',
    RichTextEditor_emojiSearch: 'Szukaj emoji',
} satisfies PluginStrings<typeof en>;
