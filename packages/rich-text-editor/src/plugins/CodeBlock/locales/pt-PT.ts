/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_codeBlock: 'Bloco de código',
    RichTextEditor_codeLanguage: 'Linguagem: ${language}',
    RichTextEditor_codeLanguageMenu: 'Linguagem do código',
    RichTextEditor_codeLanguagePhpTemplate: 'Modelo PHP',
    RichTextEditor_codeLanguagePythonRepl: 'REPL de Python',
    RichTextEditor_codeLanguageShell: 'Sessão de shell',
    RichTextEditor_codePlainText: 'Texto simples',
    RichTextEditor_copyCode: 'Copiar código',
} satisfies PluginStrings<typeof en>;
