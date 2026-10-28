/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_heading1: 'Kop 1',
    RichTextEditor_heading2: 'Kop 2',
    RichTextEditor_heading3: 'Kop 3',
    RichTextEditor_heading4: 'Kop 4',
    RichTextEditor_heading5: 'Kop 5',
    RichTextEditor_heading6: 'Kop 6',
    RichTextEditor_outline: 'Overzicht',
    RichTextEditor_outlineEmpty: 'Nog geen koppen. Koppen die je toevoegt, verschijnen hier.',
    RichTextEditor_outlineHeadingGone:
        'Die kop staat niet meer in het document. Het overzicht toont de huidige koppen.',
} satisfies PluginStrings<typeof en>;
