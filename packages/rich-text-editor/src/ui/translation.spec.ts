/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { enUS } from '#/locales/en-US';
import { frFR } from '#/locales/fr-FR';

import { labelContextOf, translatedLabel, resolveLabel, translatorFor } from './translation';

const LANG = 'fr-FR';

describe('translatorFor', () => {
    it("says a key in the locale's words, its variables filled in", () => {
        const translate = translatorFor(frFR);

        expect(translate('RichTextEditor_bold')).toBe(frFR.RichTextEditor_bold);
        expect(translate('RichTextEditor_results', { count: '3' })).toBe('Résultats : 3');
    });

    it('throws for a variable a translation has but the English string does not', () => {
        const mistranslated = { ...enUS, RichTextEditor_bold: '${weight}' };

        expect(() => translatorFor(mistranslated)('RichTextEditor_bold')).toThrow('${weight}');
    });
});

describe('resolveLabel', () => {
    const context = labelContextOf(LANG, translatorFor(frFR));

    it("shows a host plugin's text as it is", () => {
        expect(resolveLabel('Callout', context)).toBe('Callout');
    });

    it("hands a host plugin's label function only the language", () => {
        expect(resolveLabel((label) => `${Object.keys(label).join()} ${label.lang}`, context)).toBe(`lang ${LANG}`);
    });

    it("says a shipped plugin's label in the editor's language", () => {
        expect(resolveLabel(translatedLabel('RichTextEditor_quote'), context)).toBe(frFR.RichTextEditor_quote);
    });
});

describe('the code block label', () => {
    it('is said in English and in French', () => {
        expect(enUS.RichTextEditor_codeBlock).toBe('Code block');
        expect(frFR.RichTextEditor_codeBlock).toBe('Bloc de code');
    });
});

describe('translatedLabel', () => {
    it('throws when something other than the editor reads it', () => {
        const label = translatedLabel('RichTextEditor_quote');

        expect(() => label({ lang: LANG })).toThrow('RichTextEditor_quote');
    });
});
