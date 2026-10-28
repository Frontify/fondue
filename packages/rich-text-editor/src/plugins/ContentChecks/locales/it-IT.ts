/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_checks: 'Verifiche di accessibilità',
    RichTextEditor_checksDismiss: 'Ignora',
    RichTextEditor_checksDismissed: 'Ignorato',
    RichTextEditor_checksDocument: 'Intero documento',
    RichTextEditor_checksErrors: 'Errori: ${errors}.',
    RichTextEditor_checksGoTo: 'Vai a',
    RichTextEditor_checksHelp: 'Come decidere',
    RichTextEditor_checksRepair: 'Correggi',
    RichTextEditor_checksReview: 'Da verificare: ${review}.',
    RichTextEditor_checksSeverityError: 'Errore',
    RichTextEditor_checksSeverityReview: 'Da verificare',
    RichTextEditor_checksSeverityWarning: 'Avviso',
    RichTextEditor_checksShowDismissed: 'Mostra ignorati',
    RichTextEditor_checksWarnings: 'Avvisi: ${warnings}.',
} satisfies PluginStrings<typeof en>;
