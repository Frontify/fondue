/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_heading1: 'Titre 1',
    RichTextEditor_heading2: 'Titre 2',
    RichTextEditor_heading3: 'Titre 3',
    RichTextEditor_heading4: 'Titre 4',
    RichTextEditor_heading5: 'Titre 5',
    RichTextEditor_heading6: 'Titre 6',
    RichTextEditor_outlineEmpty: 'Aucun titre pour l’instant. Les titres que vous ajoutez apparaissent ici.',
    RichTextEditor_outlineHeadingGone: 'Ce titre n’est plus dans le document. Le plan affiche les titres actuels.',
} satisfies PluginStrings<typeof en>;
