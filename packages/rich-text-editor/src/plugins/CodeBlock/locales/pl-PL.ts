/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_codeBlock: 'Blok kodu',
    RichTextEditor_codeLanguage: 'Język: ${language}',
    RichTextEditor_codeLanguageMenu: 'Język kodu',
    RichTextEditor_codeLanguagePhpTemplate: 'Szablon PHP',
    RichTextEditor_codeLanguagePythonRepl: 'Python REPL',
    RichTextEditor_codeLanguageShell: 'Sesja powłoki',
    RichTextEditor_codePlainText: 'Zwykły tekst',
    RichTextEditor_copyCode: 'Kopiuj kod',
} satisfies PluginStrings<typeof en>;
