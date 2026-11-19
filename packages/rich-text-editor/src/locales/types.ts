/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type LocaleConfig } from '@frontify/fondue-components';

import { type EDITOR_STRINGS } from './en-US';

/** Every string the editor and its shipped plugins show, keyed `RichTextEditor_camelCase`, with `${name}` variables. */
export type RichTextStrings = typeof EDITOR_STRINGS;

export type RichTextStringKey = keyof RichTextStrings;

/**
 * A Fondue locale that also holds the editor's strings, for `ThemeProvider`'s
 * `locale`: the components and the editor then speak the same language.
 */
export type RichTextLocale = LocaleConfig & {
    translationStrings: LocaleConfig['translationStrings'] & RichTextStrings;
};
