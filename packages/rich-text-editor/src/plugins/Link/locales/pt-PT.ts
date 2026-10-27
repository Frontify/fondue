/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_linkCopied: 'Ligação copiada',
    RichTextEditor_linkCopy: 'Copiar ligação',
    RichTextEditor_linkDestination: 'URL',
    RichTextEditor_linkEdit: 'Editar ligação',
    RichTextEditor_linkFailed: 'Não foi possível aplicar a ligação.',
    RichTextEditor_linkHostsAllowed: 'Utilize uma ligação para ${hosts}.',
    RichTextEditor_linkInsertNew: 'Inserir como nova ligação',
    RichTextEditor_linkInvalid: 'Introduza uma ligação válida, como https://example.com.',
    RichTextEditor_linkOpenInNewTab: 'Abrir ligação num novo separador',
    RichTextEditor_linkOpenInNewWindow: 'Abrir numa nova janela',
    RichTextEditor_linkRemove: 'Remover ligação',
    RichTextEditor_linkResults: 'Páginas',
    RichTextEditor_linkSchemesAllowed: 'Utilize uma ligação que comece por ${schemes}.',
    RichTextEditor_linkStyle: 'Estilo',
    RichTextEditor_linkStyleNone: 'Nenhum',
    RichTextEditor_linkText: 'Texto',
    RichTextEditor_linkTextRemoved: 'O texto da ligação foi removido.',
} satisfies PluginStrings<typeof en>;
