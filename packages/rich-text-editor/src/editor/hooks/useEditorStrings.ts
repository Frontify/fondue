/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type LocaleConfig, useFondueTheme } from '@frontify/fondue-components';
import { useEffect, useMemo } from 'react';

import { EDITOR_STRINGS } from '#/locales/en-US';
import { type RichTextStrings } from '#/locales/types';

import { warnMissingEditorStrings } from '../warnings';

const ENGLISH = 'en-US';

const EDITOR_KEYS = Object.keys(EDITOR_STRINGS);

/** The language the editor shows, and its strings in it. */
export type EditorStrings = { lang: string; strings: RichTextStrings };

/** What a `ThemeProvider` locale holds for the editor. */
type ThemeStrings =
    | { kind: 'translated'; lang: string; strings: RichTextStrings }
    | { kind: 'english' }
    | { kind: 'missing'; lang: string };

const holdsEditorStrings = (strings: Record<string, unknown>): strings is RichTextStrings =>
    EDITOR_KEYS.every((key) => typeof strings[key] === 'string');

/** A components-only locale says nothing about the editor: right for English, a host mistake for any other language. */
export const themeStringsOf = ({ lang = ENGLISH, translationStrings }: LocaleConfig): ThemeStrings => {
    if (holdsEditorStrings(translationStrings)) {
        return { kind: 'translated', lang, strings: translationStrings };
    }
    if (lang === ENGLISH) {
        return { kind: 'english' };
    }

    return { kind: 'missing', lang };
};

const editorStringsOf = (theme: ThemeStrings): EditorStrings => {
    switch (theme.kind) {
        case 'translated':
            return { lang: theme.lang, strings: theme.strings };
        case 'english':
        case 'missing':
            return { lang: ENGLISH, strings: EDITOR_STRINGS };
    }
};

/**
 * The editor's strings from the `ThemeProvider`'s `locale`, as the components
 * take theirs. A locale without them shows English, with a warning unless it is English.
 */
export const useEditorStrings = (): EditorStrings => {
    const { locale } = useFondueTheme();
    const theme = useMemo(() => themeStringsOf(locale), [locale]);

    useEffect(() => {
        if (theme.kind === 'missing') {
            warnMissingEditorStrings(theme.lang);
        }
    }, [theme]);

    return useMemo(() => editorStringsOf(theme), [theme]);
};
