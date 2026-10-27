/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_heading1: 'Titolo 1',
    RichTextEditor_heading2: 'Titolo 2',
    RichTextEditor_heading3: 'Titolo 3',
    RichTextEditor_heading4: 'Titolo 4',
    RichTextEditor_heading5: 'Titolo 5',
    RichTextEditor_heading6: 'Titolo 6',
    RichTextEditor_outlineEmpty: 'Nessun titolo per ora. I titoli che aggiungi compaiono qui.',
    RichTextEditor_outlineHeadingGone: 'Questo titolo non è più nel documento. La struttura mostra i titoli attuali.',
} satisfies PluginStrings<typeof en>;
