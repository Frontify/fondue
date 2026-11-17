/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

import { enUS } from '#/locales/en-US';
import { type RichTextLocale, type RichTextStringKey } from '#/locales/types';

/** The values of a string's `${name}` variables, by name. */
export type TranslationVariables = Readonly<Record<string, string>>;

/** The shown locale's string for `key`, its variables filled in. */
export type Translate = (key: RichTextStringKey, variables?: TranslationVariables) => string;

const VARIABLE = /\$\{(\w+)\}/g;

const STRING_KEYS: ReadonlySet<string> = new Set(Object.keys(enUS.translationStrings));

export const translatorFor =
    ({ translationStrings }: RichTextLocale): Translate =>
    (key, variables = {}) =>
        translationStrings[key].replaceAll(VARIABLE, (_placeholder, name: string) => {
            const value = variables[name];
            if (value === undefined) {
                throw new Error(`The string "${key}" needs a value for \${${name}}.`);
            }
            return value;
        });

/** The editor's translator; English outside an editor, so a plugin's UI also renders on its own. */
export const TranslationContext = createContext<Translate>(translatorFor(enUS));
TranslationContext.displayName = 'TranslationContext';

/**
 * The editor's translator, for the UI of a shipped plugin. A host's plugin
 * shows its own, already translated text instead.
 */
export const useTranslate = (): Translate => useContext(TranslationContext);

/**
 * What a toolbar entry or a block command is called: a shipped plugin names
 * it by a key of the editor's locale, which is looked up; a host's plugin
 * names it in its own, already translated text, shown as it is.
 */
export const translateLabel = (label: string, translate: Translate): string => {
    if (STRING_KEYS.has(label)) {
        // The set holds exactly the keys of the locale, which a Set cannot narrow to.
        return translate(label as RichTextStringKey);
    }
    return label;
};
