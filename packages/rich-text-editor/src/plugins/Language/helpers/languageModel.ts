/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorApi } from '#/bridge/pluginApi/plugin';
import { type CodecContext } from '#/model';

/** The command the dialog runs. */
export const SET_LANGUAGE = 'mark.language.set';

/** The language dialog's strings, in the UI locale. */
export type LanguageStrings = {
    title: string;
    tag: string;
    direction: string;
    none: string;
    automatic: string;
    leftToRight: string;
    rightToLeft: string;
    invalid: string;
    remove: string;
    apply: string;
    cancel: string;
};

/** The direction choices of the dialog; `''` is no direction. */
export const directions = [
    { value: '', label: 'none' },
    { value: 'ltr', label: 'ltr' },
    { value: 'rtl', label: 'rtl' },
    { value: 'auto', label: 'auto' },
] as const;

/** The dialog's strings in the editor's UI locale; the keys themselves while there is no editor. */
export const languageStrings = (api: EditorApi | undefined): LanguageStrings => {
    let t: CodecContext['translate'] = (key) => key;
    if (api !== undefined) {
        t = api.translate;
    }

    return stringsOf(t);
};

const stringsOf = (t: CodecContext['translate']): LanguageStrings => ({
    title: t('RichTextEditor_languageTitle'),
    tag: t('RichTextEditor_languageTag'),
    direction: t('RichTextEditor_languageDirection'),
    none: t('RichTextEditor_languageNone'),
    automatic: t('RichTextEditor_languageAutomatic'),
    leftToRight: t('RichTextEditor_languageLeftToRight'),
    rightToLeft: t('RichTextEditor_languageRightToLeft'),
    invalid: t('RichTextEditor_languageInvalid'),
    remove: t('RichTextEditor_languageRemove'),
    apply: t('RichTextEditor_apply'),
    cancel: t('RichTextEditor_cancel'),
});

/** The `languages` option of `marks.language`, or none when that feature is not installed. */
export const languageOptions = (api: EditorApi | undefined): readonly string[] => {
    if (api === undefined) {
        return [];
    }

    const languages = api.optionsOf('marks.language')?.languages;
    if (!Array.isArray(languages)) {
        return [];
    }

    return languages.filter((tag): tag is string => typeof tag === 'string');
};

/** The editor's UI locale, `en-US` while there is no editor. */
export const localeOf = (api: EditorApi | undefined): string => {
    if (api === undefined) {
        return 'en-US';
    }

    return api.locale();
};

/** The name of the language `tag` in `locale`, or `tag` itself when the browser has none. */
export const labelOf = (tag: string, locale: string): string => {
    const name = new Intl.DisplayNames([locale], { type: 'language' }).of(tag);
    if (name === undefined) {
        return tag;
    }

    return name;
};

/** The stored direction of a dialog value, `null` for no direction. */
export const directionOf = (value: string): 'ltr' | 'rtl' | 'auto' | null => {
    if (value === 'ltr' || value === 'rtl' || value === 'auto') {
        return value;
    }

    return null;
};

/** The language mark at the selection's start, used to fill the dialog. */
export const currentLanguage = (api: EditorApi | undefined): { lang: string; dir: string } => {
    if (api === undefined) {
        return { lang: '', dir: '' };
    }

    const attrs = api.marks.attrs('language');
    let lang = '';
    if (typeof attrs?.lang === 'string') {
        lang = attrs.lang;
    }

    let dir = '';
    if (typeof attrs?.dir === 'string') {
        dir = attrs.dir;
    }

    return { lang, dir };
};

/** The tags to offer: a stored tag the option misses comes first. */
export const offeredLanguages = (languages: readonly string[], stored: string): readonly string[] => {
    if (languages.length > 0 && stored !== '' && !languages.includes(stored)) {
        return [stored, ...languages];
    }

    return languages;
};

/** The label of the direction `value`, as the dialog shows it. */
export const directionLabel = (value: string, strings: LanguageStrings): string => {
    if (value === 'ltr') {
        return strings.leftToRight;
    }

    if (value === 'rtl') {
        return strings.rightToLeft;
    }

    if (value === 'auto') {
        return strings.automatic;
    }

    return strings.none;
};
