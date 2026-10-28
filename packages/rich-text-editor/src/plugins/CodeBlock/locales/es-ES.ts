/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_codeBlock: 'Bloque de código',
    RichTextEditor_codeLanguage: 'Lenguaje: ${language}',
    RichTextEditor_codeLanguageMenu: 'Lenguaje del código',
    RichTextEditor_codeLanguagePhpTemplate: 'Plantilla PHP',
    RichTextEditor_codeLanguagePythonRepl: 'REPL de Python',
    RichTextEditor_codeLanguageShell: 'Sesión de shell',
    RichTextEditor_codePlainText: 'Texto sin formato',
    RichTextEditor_copyCode: 'Copiar código',
} satisfies PluginStrings<typeof en>;
