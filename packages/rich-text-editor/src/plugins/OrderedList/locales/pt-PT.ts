/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_numberedList: 'Lista numerada',
    RichTextEditor_startNumbering: 'Iniciar a numeração em',
    RichTextEditor_startNumberingField: 'Primeiro número',
    RichTextEditor_startNumberingRange: 'Introduza um número inteiro entre ${min} e ${max}.',
} satisfies PluginStrings<typeof en>;
