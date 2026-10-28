/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_link: 'Link',
    RichTextEditor_linkCopied: 'Skopiowano link',
    RichTextEditor_linkCopy: 'Kopiuj link',
    RichTextEditor_linkDestination: 'URL',
    RichTextEditor_linkEdit: 'Edytuj link',
    RichTextEditor_linkFailed: 'Nie można zastosować linku.',
    RichTextEditor_linkHostsAllowed: 'Użyj linku do ${hosts}.',
    RichTextEditor_linkInsertNew: 'Wstaw jako nowy link',
    RichTextEditor_linkInvalid: 'Wpisz prawidłowy link, na przykład https://example.com.',
    RichTextEditor_linkNewWindow: '(otwiera się w nowym oknie)',
    RichTextEditor_linkOpenInNewTab: 'Otwórz link w nowej karcie',
    RichTextEditor_linkOpenInNewWindow: 'Otwórz w nowym oknie',
    RichTextEditor_linkRemove: 'Usuń link',
    RichTextEditor_linkResults: 'Strony',
    RichTextEditor_linkSchemesAllowed: 'Użyj linku zaczynającego się od ${schemes}.',
    RichTextEditor_linkStyle: 'Styl',
    RichTextEditor_linkStyleNone: 'Brak',
    RichTextEditor_linkText: 'Tekst',
    RichTextEditor_linkTextRemoved: 'Tekst linku został usunięty.',
} satisfies PluginStrings<typeof en>;
