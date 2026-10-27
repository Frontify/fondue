/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_heading1: 'Nagłówek 1',
    RichTextEditor_heading2: 'Nagłówek 2',
    RichTextEditor_heading3: 'Nagłówek 3',
    RichTextEditor_heading4: 'Nagłówek 4',
    RichTextEditor_heading5: 'Nagłówek 5',
    RichTextEditor_heading6: 'Nagłówek 6',
    RichTextEditor_outlineEmpty: 'Brak nagłówków. Dodane nagłówki pojawią się tutaj.',
    RichTextEditor_outlineHeadingGone: 'Tego nagłówka nie ma już w dokumencie. Konspekt pokazuje bieżące nagłówki.',
} satisfies PluginStrings<typeof en>;
