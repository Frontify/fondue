/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineEditorPart } from '#/bridge/plugin';

import { language } from './feature';
import { LanguageDialog } from './LanguageDialog';

const DIRECTIONS = ['ltr', 'rtl', 'auto'] as const;

/**
 * Opens the language dialog from the toolbar. `mark.language.set` takes `{ lang, dir }` or `null`, and at a caret
 * inside a passage changes or removes the whole passage; text typed at a passage's end stays outside it.
 */
export const languageEditor = defineEditorPart(language, {
    needs: ['marks', 'overlays'],
    commands: {
        'mark.language.edit': {
            // The selection's start sits in text that is not code.
            enabled: (api) => {
                const { blockType, verbatim } = api.selection();
                return blockType !== null && !verbatim;
            },
            run: (api) => {
                api.overlays.open(LanguageDialog, {}, 'selection');
                return true;
            },
        },
        'mark.language.set': {
            payload: {
                nullable: true,
                fields: {
                    lang: { type: 'language' },
                    dir: { type: 'enum', values: DIRECTIONS, nullable: true },
                },
            },
            run: (api, payload: { readonly lang: string; readonly dir: 'ltr' | 'rtl' | 'auto' | null } | null) => {
                if (payload === null) {
                    return api.marks.remove('language', { extendToMarkRange: true });
                }
                return api.marks.set('language', payload, { extendToMarkRange: true });
            },
        },
    },
    toolbar: [
        {
            id: 'language',
            kind: 'button',
            command: 'mark.language.edit',
            labelKey: 'RichTextEditor_language',
            icon: 'IconLanguage',
            opensOverlay: true,
        },
    ],
});
