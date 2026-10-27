/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_linkCopied: 'Link gekopieerd',
    RichTextEditor_linkCopy: 'Link kopiëren',
    RichTextEditor_linkDestination: 'URL',
    RichTextEditor_linkEdit: 'Link bewerken',
    RichTextEditor_linkFailed: 'De link kon niet worden toegepast.',
    RichTextEditor_linkHostsAllowed: 'Gebruik een link naar ${hosts}.',
    RichTextEditor_linkInsertNew: 'Invoegen als nieuwe link',
    RichTextEditor_linkInvalid: 'Voer een geldige link in, zoals https://example.com.',
    RichTextEditor_linkOpenInNewTab: 'Link openen in nieuw tabblad',
    RichTextEditor_linkOpenInNewWindow: 'Openen in nieuw venster',
    RichTextEditor_linkRemove: 'Link verwijderen',
    RichTextEditor_linkResults: 'Pagina’s',
    RichTextEditor_linkSchemesAllowed: 'Gebruik een link die begint met ${schemes}.',
    RichTextEditor_linkStyle: 'Stijl',
    RichTextEditor_linkStyleNone: 'Geen',
    RichTextEditor_linkText: 'Tekst',
    RichTextEditor_linkTextRemoved: 'De gelinkte tekst is verwijderd.',
} satisfies PluginStrings<typeof en>;
