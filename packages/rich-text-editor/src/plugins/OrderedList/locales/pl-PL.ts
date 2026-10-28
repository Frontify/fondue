/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_numberedList: 'Lista numerowana',
    RichTextEditor_startNumbering: 'Rozpocznij numerowanie od',
    RichTextEditor_startNumberingField: 'Pierwszy numer',
    RichTextEditor_startNumberingRange: 'Wpisz liczbę całkowitą od ${min} do ${max}.',
} satisfies PluginStrings<typeof en>;
