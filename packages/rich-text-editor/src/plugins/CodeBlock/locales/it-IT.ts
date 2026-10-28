/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_codeBlock: 'Blocco di codice',
    RichTextEditor_codeLanguage: 'Linguaggio: ${language}',
    RichTextEditor_codeLanguageMenu: 'Linguaggio del codice',
    RichTextEditor_codeLanguagePhpTemplate: 'Modello PHP',
    RichTextEditor_codeLanguagePythonRepl: 'REPL Python',
    RichTextEditor_codeLanguageShell: 'Sessione shell',
    RichTextEditor_codePlainText: 'Testo semplice',
    RichTextEditor_copyCode: 'Copia codice',
} satisfies PluginStrings<typeof en>;
