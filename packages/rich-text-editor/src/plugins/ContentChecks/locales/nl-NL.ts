/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_checks: 'Toegankelijkheidscontroles',
    RichTextEditor_checksDismiss: 'Negeren',
    RichTextEditor_checksDismissed: 'Genegeerd',
    RichTextEditor_checksDocument: 'Hele document',
    RichTextEditor_checksErrors: 'Fouten: ${errors}.',
    RichTextEditor_checksGoTo: 'Ga naar',
    RichTextEditor_checksHelp: 'Zo beslis je',
    RichTextEditor_checksRepair: 'Oplossen',
    RichTextEditor_checksReview: 'Te controleren: ${review}.',
    RichTextEditor_checksSeverityError: 'Fout',
    RichTextEditor_checksSeverityReview: 'Te controleren',
    RichTextEditor_checksSeverityWarning: 'Waarschuwing',
    RichTextEditor_checksShowDismissed: 'Genegeerde tonen',
    RichTextEditor_checksWarnings: 'Waarschuwingen: ${warnings}.',
} satisfies PluginStrings<typeof en>;
