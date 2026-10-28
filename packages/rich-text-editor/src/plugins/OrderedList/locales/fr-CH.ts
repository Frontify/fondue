/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_numberedList: 'Liste numérotée',
    RichTextEditor_startNumbering: 'Commencer la numérotation à',
    RichTextEditor_startNumberingField: 'Premier numéro',
    RichTextEditor_startNumberingRange: 'Saisissez un nombre entier entre ${min} et ${max}.',
} satisfies PluginStrings<typeof en>;
