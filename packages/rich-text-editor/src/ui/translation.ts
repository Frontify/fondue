/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

import { type RteLabel, type RteLabelContext } from '#/core';
import { enUS } from '#/locales/en-US';
import {
    type PlainStringKey,
    type RichTextStringKey,
    type RichTextStrings,
    type VariableNamesOf,
} from '#/locales/types';

/** The values of the variables the string under `Key` needs, by name; nothing for a string with none. */
type TranslationArguments<Key extends RichTextStringKey> = [VariableNamesOf<Key>] extends [never]
    ? []
    : [variables: { readonly [Name in VariableNamesOf<Key>]: string }];

/** The shown string for `key`, its variables filled in. */
export type Translate = <Key extends RichTextStringKey>(key: Key, ...variables: TranslationArguments<Key>) => string;

/** A translated string's variables, read by the names found in its text. */
type FoundVariables = Readonly<Partial<Record<string, string>>>;

const VARIABLE = /\$\{(\w+)\}/g;

export const translatorFor =
    (strings: RichTextStrings): Translate =>
    (key, ...variables) => {
        const values: FoundVariables = variables[0] ?? {};

        return strings[key].replaceAll(VARIABLE, (_placeholder, name: string) => {
            const value = values[name];
            if (value === undefined) {
                throw new Error(`The string "${key}" needs a value for \${${name}}.`);
            }

            return value;
        });
    };

/** The editor's translator; English outside an editor, so a plugin's UI also renders on its own. */
export const TranslationContext = createContext<Translate>(translatorFor(enUS));
TranslationContext.displayName = 'TranslationContext';

/**
 * The editor's translator, for the UI of a shipped plugin. A host's plugin
 * shows its own, already translated text instead.
 */
export const useTranslate = (): Translate => useContext(TranslationContext);

/** Reachable only from this package, so the editor's string keys stay out of the plugin contract. */
const TRANSLATE = Symbol('translate');

/** What the editor hands a label function: the public language, and its translator for the shipped plugins. */
export type EditorLabelContext = RteLabelContext & { readonly [TRANSLATE]: Translate };

export const labelContextOf = (lang: string, translate: Translate): EditorLabelContext => ({
    lang,
    [TRANSLATE]: translate,
});

const isEditorLabelContext = (context: RteLabelContext): context is EditorLabelContext => TRANSLATE in context;

/**
 * A shipped plugin's label: its string in the language the editor shows.
 * @example
 * toolbar: [{ label: translatedLabel('RichTextEditor_bold'), icon: IconTextFormatBold }]
 */
export const translatedLabel =
    (key: PlainStringKey): Exclude<RteLabel, string> =>
    (context) => {
        if (!isEditorLabelContext(context)) {
            throw new Error(`The label "${key}" can only be read by the editor.`);
        }

        return context[TRANSLATE](key);
    };

/** A control's name as the editor shows it now. */
export const resolveLabel = (label: RteLabel, context: EditorLabelContext): string => {
    if (typeof label === 'string') {
        return label;
    }

    return label(context);
};
