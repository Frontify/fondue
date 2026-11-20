/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

import { type RteLabel, type RteLabelContext } from '#/core';
import { enUS } from '#/locales/en-US';
import { type RichTextStringKey, type RichTextStrings } from '#/locales/types';

/** The values of a string's `${name}` variables, by name. */
export type TranslationVariables = Readonly<Record<string, string>>;

/** The shown string for `key`, its variables filled in. */
export type Translate = (key: RichTextStringKey, variables?: TranslationVariables) => string;

const VARIABLE = /\$\{(\w+)\}/g;

export const translatorFor =
    (strings: RichTextStrings): Translate =>
    (key, variables = {}) =>
        strings[key].replaceAll(VARIABLE, (_placeholder, name: string) => {
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
    (key: RichTextStringKey): RteLabel =>
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
