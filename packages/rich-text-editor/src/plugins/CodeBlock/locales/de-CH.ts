/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_codeLanguage: 'Sprache: ${language}',
    RichTextEditor_codeLanguagePhpTemplate: 'PHP-Vorlage',
    RichTextEditor_codeLanguagePythonRepl: 'Python-REPL',
    RichTextEditor_codeLanguageShell: 'Shell-Sitzung',
    RichTextEditor_codePlainText: 'Klartext',
    RichTextEditor_copyCode: 'Code kopieren',
} satisfies PluginStrings<typeof en>;
