/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import { useEffect, useMemo } from 'react';

import { STRINGS_BY_LANG } from '#/locales';
import { ENGLISH, enUS } from '#/locales/en-US';
import { type RichTextStrings } from '#/locales/types';

import { warnUnknownLanguage } from '../warnings';

/** The language the editor shows, and its strings in it. */
export type EditorStrings = { lang: string; strings: RichTextStrings };

/** Whether the editor speaks the `ThemeProvider` locale's language. */
type ThemeLanguage = { kind: 'known'; lang: string; strings: RichTextStrings } | { kind: 'unknown'; lang: string };

const themeLanguageOf = (lang: string): ThemeLanguage => {
    const strings = STRINGS_BY_LANG.get(lang);
    if (strings === undefined) {
        return { kind: 'unknown', lang };
    }

    return { kind: 'known', lang, strings };
};

const editorStringsOf = (language: ThemeLanguage): EditorStrings => {
    switch (language.kind) {
        case 'known':
            return { lang: language.lang, strings: language.strings };
        case 'unknown':
            return { lang: ENGLISH, strings: enUS };
    }
};

/**
 * The editor's strings in the language of the `ThemeProvider`'s `locale`.
 * A language the editor does not speak shows English, with a warning.
 */
export const useEditorStrings = (): EditorStrings => {
    const { lang = ENGLISH } = useFondueTheme().locale;
    const language = useMemo(() => themeLanguageOf(lang), [lang]);

    useEffect(() => {
        if (language.kind === 'unknown') {
            warnUnknownLanguage(language.lang);
        }
    }, [language]);

    return useMemo(() => editorStringsOf(language), [language]);
};
