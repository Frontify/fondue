/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_heading1: 'Título 1',
    RichTextEditor_heading2: 'Título 2',
    RichTextEditor_heading3: 'Título 3',
    RichTextEditor_heading4: 'Título 4',
    RichTextEditor_heading5: 'Título 5',
    RichTextEditor_heading6: 'Título 6',
    RichTextEditor_outline: 'Estrutura',
    RichTextEditor_outlineEmpty: 'Ainda não há títulos. Os títulos que adicionar aparecem aqui.',
    RichTextEditor_outlineHeadingGone: 'Esse título já não está no documento. A estrutura mostra os títulos atuais.',
} satisfies PluginStrings<typeof en>;
