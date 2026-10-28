/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_numberedList: 'Genummerde lijst',
    RichTextEditor_startNumbering: 'Nummering beginnen bij',
    RichTextEditor_startNumberingField: 'Eerste nummer',
    RichTextEditor_startNumberingRange: 'Voer een geheel getal in van ${min} tot ${max}.',
} satisfies PluginStrings<typeof en>;
