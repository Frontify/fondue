/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_checks: 'Vérifications d’accessibilité',
    RichTextEditor_checksDismiss: 'Ignorer',
    RichTextEditor_checksDismissed: 'Ignoré',
    RichTextEditor_checksDocument: 'Document entier',
    RichTextEditor_checksErrors: 'Erreurs\u00A0: ${errors}.',
    RichTextEditor_checksGoTo: 'Atteindre',
    RichTextEditor_checksHelp: 'Comment décider',
    RichTextEditor_checksRepair: 'Corriger',
    RichTextEditor_checksReview: 'À vérifier\u00A0: ${review}.',
    RichTextEditor_checksSeverityError: 'Erreur',
    RichTextEditor_checksSeverityReview: 'À vérifier',
    RichTextEditor_checksSeverityWarning: 'Avertissement',
    RichTextEditor_checksShowDismissed: 'Afficher les éléments ignorés',
    RichTextEditor_checksWarnings: 'Avertissements\u00A0: ${warnings}.',
} satisfies PluginStrings<typeof en>;
