/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_linkCopied: 'Link copiato',
    RichTextEditor_linkCopy: 'Copia link',
    RichTextEditor_linkDestination: 'URL',
    RichTextEditor_linkEdit: 'Modifica link',
    RichTextEditor_linkFailed: 'Impossibile applicare il link.',
    RichTextEditor_linkHostsAllowed: 'Usare un link verso ${hosts}.',
    RichTextEditor_linkInsertNew: 'Inserisci come nuovo link',
    RichTextEditor_linkInvalid: 'Inserire un link valido, ad esempio https://example.com.',
    RichTextEditor_linkOpenInNewTab: 'Apri link in una nuova scheda',
    RichTextEditor_linkOpenInNewWindow: 'Apri in una nuova finestra',
    RichTextEditor_linkRemove: 'Rimuovi link',
    RichTextEditor_linkResults: 'Pagine',
    RichTextEditor_linkSchemesAllowed: 'Usare un link che inizia con ${schemes}.',
    RichTextEditor_linkStyle: 'Stile',
    RichTextEditor_linkStyleNone: 'Nessuno',
    RichTextEditor_linkText: 'Testo',
    RichTextEditor_linkTextRemoved: 'Il testo collegato è stato rimosso.',
} satisfies PluginStrings<typeof en>;
