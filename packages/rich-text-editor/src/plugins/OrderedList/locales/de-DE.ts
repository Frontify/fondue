/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_numberedList: 'Nummerierte Liste',
    RichTextEditor_startNumbering: 'Nummerierung beginnen bei',
    RichTextEditor_startNumberingField: 'Erste Nummer',
    RichTextEditor_startNumberingRange: 'Geben Sie eine ganze Zahl von ${min} bis ${max} ein.',
} satisfies PluginStrings<typeof en>;
