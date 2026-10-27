/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PluginStrings } from '#/locales/types';

import type en from './en-US';

export default {
    RichTextEditor_linkCopied: 'Lien copié',
    RichTextEditor_linkCopy: 'Copier le lien',
    RichTextEditor_linkDestination: 'URL',
    RichTextEditor_linkEdit: 'Modifier le lien',
    RichTextEditor_linkFailed: 'Impossible d’appliquer le lien.',
    RichTextEditor_linkHostsAllowed: 'Utilisez un lien vers ${hosts}.',
    RichTextEditor_linkInsertNew: 'Insérer comme nouveau lien',
    RichTextEditor_linkInvalid: 'Saisissez un lien valide, par exemple https://example.com.',
    RichTextEditor_linkOpenInNewTab: 'Ouvrir le lien dans un nouvel onglet',
    RichTextEditor_linkOpenInNewWindow: 'Ouvrir dans une nouvelle fenêtre',
    RichTextEditor_linkRemove: 'Supprimer le lien',
    RichTextEditor_linkResults: 'Pages',
    RichTextEditor_linkSchemesAllowed: 'Utilisez un lien qui commence par ${schemes}.',
    RichTextEditor_linkStyle: 'Style',
    RichTextEditor_linkStyleNone: 'Aucun',
    RichTextEditor_linkText: 'Texte',
    RichTextEditor_linkTextRemoved: 'Le texte lié a été supprimé.',
} satisfies PluginStrings<typeof en>;
