/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_linkCopied: 'Link kopiert',
    RichTextEditor_linkCopy: 'Link kopieren',
    RichTextEditor_linkDestination: 'URL',
    RichTextEditor_linkEdit: 'Link bearbeiten',
    RichTextEditor_linkFailed: 'Der Link konnte nicht gesetzt werden.',
    RichTextEditor_linkHostsAllowed: 'Verwenden Sie einen Link zu ${hosts}.',
    RichTextEditor_linkInsertNew: 'Als neuen Link einfügen',
    RichTextEditor_linkInvalid: 'Geben Sie einen gültigen Link ein, zum Beispiel https://example.com.',
    RichTextEditor_linkOpenInNewTab: 'Link in neuem Tab öffnen',
    RichTextEditor_linkOpenInNewWindow: 'In neuem Fenster öffnen',
    RichTextEditor_linkRemove: 'Link entfernen',
    RichTextEditor_linkResults: 'Seiten',
    RichTextEditor_linkSchemesAllowed: 'Verwenden Sie einen Link, der mit ${schemes} beginnt.',
    RichTextEditor_linkStyle: 'Stil',
    RichTextEditor_linkStyleNone: 'Keiner',
    RichTextEditor_linkText: 'Text',
    RichTextEditor_linkTextRemoved: 'Der verlinkte Text wurde entfernt.',
} satisfies PluginStrings<typeof en>;
