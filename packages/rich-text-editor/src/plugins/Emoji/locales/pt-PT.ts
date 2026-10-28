/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_emoji: 'Emoji',
    RichTextEditor_emojiFailed: 'Não foi possível carregar o emoji.',
    RichTextEditor_emojiLoading: 'A carregar emoji…',
    RichTextEditor_emojiNoResults: 'Nenhum emoji encontrado',
    RichTextEditor_emojiSearch: 'Pesquisar emoji',
} satisfies PluginStrings<typeof en>;
