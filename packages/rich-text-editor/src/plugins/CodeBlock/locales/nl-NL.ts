/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_codeBlock: 'Codeblok',
    RichTextEditor_codeLanguage: 'Taal: ${language}',
    RichTextEditor_codeLanguageMenu: 'Codetaal',
    RichTextEditor_codeLanguagePhpTemplate: 'PHP-sjabloon',
    RichTextEditor_codeLanguagePythonRepl: 'Python-REPL',
    RichTextEditor_codeLanguageShell: 'Shellsessie',
    RichTextEditor_codePlainText: 'Platte tekst',
    RichTextEditor_copyCode: 'Code kopiëren',
} satisfies PluginStrings<typeof en>;
