/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_checksDismiss: 'Ignorar',
    RichTextEditor_checksDismissed: 'Ignorado',
    RichTextEditor_checksDocument: 'Documento inteiro',
    RichTextEditor_checksErrors: 'Erros: ${errors}.',
    RichTextEditor_checksGoTo: 'Ir para',
    RichTextEditor_checksHelp: 'Como decidir',
    RichTextEditor_checksRepair: 'Corrigir',
    RichTextEditor_checksReview: 'A rever: ${review}.',
    RichTextEditor_checksSeverityError: 'Erro',
    RichTextEditor_checksSeverityReview: 'A rever',
    RichTextEditor_checksSeverityWarning: 'Aviso',
    RichTextEditor_checksShowDismissed: 'Mostrar ignorados',
    RichTextEditor_checksWarnings: 'Avisos: ${warnings}.',
} satisfies PluginStrings<typeof en>;
