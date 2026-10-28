/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_numberedList: 'Lista numerada',
    RichTextEditor_startNumbering: 'Empezar la numeración en',
    RichTextEditor_startNumberingField: 'Primer número',
    RichTextEditor_startNumberingRange: 'Introduce un número entero entre ${min} y ${max}.',
} satisfies PluginStrings<typeof en>;
