/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type enUS } from './en-US';

/** Every string the editor and its shipped plugins show, keyed `RichTextEditor_camelCase`, with `${name}` variables. */
export type RichTextStrings = typeof enUS.translationStrings;

export type RichTextStringKey = keyof RichTextStrings;

/** One language of the editor's own interface, imported from `@frontify/fondue-rich-text-editor/locales`. */
export type RichTextLocale = {
    /** The language tag the locale is for, such as `'de-CH'`. */
    lang: string;
    translationStrings: RichTextStrings;
};
