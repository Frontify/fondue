/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_emoji: 'Emoji',
    RichTextEditor_emojiFailed: 'L’emoji n’a pas pu être chargé.',
    RichTextEditor_emojiLoading: 'Chargement des emojis…',
    RichTextEditor_emojiNoResults: 'Aucun emoji trouvé',
    RichTextEditor_emojiSearch: 'Rechercher un emoji',
} satisfies PluginStrings<typeof en>;
