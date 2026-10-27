/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_emojiFailed: 'Non è stato possibile caricare l’emoji.',
    RichTextEditor_emojiLoading: 'Caricamento degli emoji…',
    RichTextEditor_emojiNoResults: 'Nessuna emoji trovata',
    RichTextEditor_emojiSearch: 'Cerca emoji',
} satisfies PluginStrings<typeof en>;
