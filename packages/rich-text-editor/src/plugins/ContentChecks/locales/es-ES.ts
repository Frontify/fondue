/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_checksDismiss: 'Descartar',
    RichTextEditor_checksDismissed: 'Descartado',
    RichTextEditor_checksDocument: 'Documento completo',
    RichTextEditor_checksErrors: 'Errores: ${errors}.',
    RichTextEditor_checksGoTo: 'Ir a',
    RichTextEditor_checksHelp: 'Cómo decidir',
    RichTextEditor_checksRepair: 'Corregir',
    RichTextEditor_checksReview: 'Por revisar: ${review}.',
    RichTextEditor_checksSeverityError: 'Error',
    RichTextEditor_checksSeverityReview: 'Por revisar',
    RichTextEditor_checksSeverityWarning: 'Advertencia',
    RichTextEditor_checksShowDismissed: 'Mostrar descartados',
    RichTextEditor_checksWarnings: 'Advertencias: ${warnings}.',
} satisfies PluginStrings<typeof en>;
