/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_checksDismiss: 'Ausblenden',
    RichTextEditor_checksDismissed: 'Ausgeblendet',
    RichTextEditor_checksDocument: 'Ganzes Dokument',
    RichTextEditor_checksErrors: 'Fehler: ${errors}.',
    RichTextEditor_checksGoTo: 'Gehe zu',
    RichTextEditor_checksHelp: 'So entscheiden Sie',
    RichTextEditor_checksRepair: 'Beheben',
    RichTextEditor_checksReview: 'Zu prüfen: ${review}.',
    RichTextEditor_checksSeverityError: 'Fehler',
    RichTextEditor_checksSeverityReview: 'Zu prüfen',
    RichTextEditor_checksSeverityWarning: 'Warnung',
    RichTextEditor_checksShowDismissed: 'Ausgeblendete anzeigen',
    RichTextEditor_checksWarnings: 'Warnungen: ${warnings}.',
} satisfies PluginStrings<typeof en>;
