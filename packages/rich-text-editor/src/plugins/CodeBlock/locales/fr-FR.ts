/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_codeBlock: 'Bloc de code',
    RichTextEditor_codeLanguage: 'Langage\u00A0: ${language}',
    RichTextEditor_codeLanguageMenu: 'Langage du code',
    RichTextEditor_codeLanguagePhpTemplate: 'Modèle PHP',
    RichTextEditor_codeLanguagePythonRepl: 'REPL Python',
    RichTextEditor_codeLanguageShell: 'Session shell',
    RichTextEditor_codePlainText: 'Texte brut',
    RichTextEditor_copyCode: 'Copier le code',
} satisfies PluginStrings<typeof en>;
