/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_heading1: 'Überschrift 1',
    RichTextEditor_heading2: 'Überschrift 2',
    RichTextEditor_heading3: 'Überschrift 3',
    RichTextEditor_heading4: 'Überschrift 4',
    RichTextEditor_heading5: 'Überschrift 5',
    RichTextEditor_heading6: 'Überschrift 6',
    RichTextEditor_outline: 'Gliederung',
    RichTextEditor_outlineEmpty: 'Noch keine Überschriften. Überschriften, die Sie hinzufügen, erscheinen hier.',
    RichTextEditor_outlineHeadingGone:
        'Diese Überschrift ist nicht mehr im Dokument. Die Gliederung zeigt die aktuellen Überschriften.',
} satisfies PluginStrings<typeof en>;
