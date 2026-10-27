/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_linkCopied: 'Enlace copiado',
    RichTextEditor_linkCopy: 'Copiar enlace',
    RichTextEditor_linkDestination: 'URL',
    RichTextEditor_linkEdit: 'Editar enlace',
    RichTextEditor_linkFailed: 'No se ha podido aplicar el enlace.',
    RichTextEditor_linkHostsAllowed: 'Use un enlace a ${hosts}.',
    RichTextEditor_linkInsertNew: 'Insertar como enlace nuevo',
    RichTextEditor_linkInvalid: 'Escriba un enlace válido, como https://example.com.',
    RichTextEditor_linkOpenInNewTab: 'Abrir enlace en una pestaña nueva',
    RichTextEditor_linkOpenInNewWindow: 'Abrir en una ventana nueva',
    RichTextEditor_linkRemove: 'Quitar enlace',
    RichTextEditor_linkResults: 'Páginas',
    RichTextEditor_linkSchemesAllowed: 'Use un enlace que empiece por ${schemes}.',
    RichTextEditor_linkStyle: 'Estilo',
    RichTextEditor_linkStyleNone: 'Ninguno',
    RichTextEditor_linkText: 'Texto',
    RichTextEditor_linkTextRemoved: 'Se ha eliminado el texto enlazado.',
} satisfies PluginStrings<typeof en>;
