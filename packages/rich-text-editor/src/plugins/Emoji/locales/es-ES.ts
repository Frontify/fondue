/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_emoji: 'Emoji',
    RichTextEditor_emojiFailed: 'No se ha podido cargar el emoji.',
    RichTextEditor_emojiLoading: 'Cargando emoji…',
    RichTextEditor_emojiNoResults: 'Ningún emoji encontrado',
    RichTextEditor_emojiSearch: 'Buscar emoji',
} satisfies PluginStrings<typeof en>;
