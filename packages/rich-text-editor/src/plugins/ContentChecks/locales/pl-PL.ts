/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_checks: 'Kontrola dostępności',
    RichTextEditor_checksDismiss: 'Pomiń',
    RichTextEditor_checksDismissed: 'Pominięte',
    RichTextEditor_checksDocument: 'Cały dokument',
    RichTextEditor_checksErrors: 'Błędy: ${errors}.',
    RichTextEditor_checksGoTo: 'Przejdź',
    RichTextEditor_checksHelp: 'Jak zdecydować',
    RichTextEditor_checksRepair: 'Popraw',
    RichTextEditor_checksReview: 'Do sprawdzenia: ${review}.',
    RichTextEditor_checksSeverityError: 'Błąd',
    RichTextEditor_checksSeverityReview: 'Do sprawdzenia',
    RichTextEditor_checksSeverityWarning: 'Ostrzeżenie',
    RichTextEditor_checksShowDismissed: 'Pokaż pominięte',
    RichTextEditor_checksWarnings: 'Ostrzeżenia: ${warnings}.',
} satisfies PluginStrings<typeof en>;
