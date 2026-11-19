/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { EDITOR_STRINGS } from '#/locales/en-US';
import { frFR } from '#/locales/fr-FR';

import { labelContextOf, localeLabel, resolveLabel, translatorFor } from './translation';

const LANG = 'fr-FR';

describe('translatorFor', () => {
    it("says a key in the locale's words, its variables filled in", () => {
        const translate = translatorFor(frFR.translationStrings);

        expect(translate('RichTextEditor_bold')).toBe(frFR.translationStrings.RichTextEditor_bold);
        expect(translate('RichTextEditor_results', { count: '3' })).toBe('Résultats : 3');
    });

    it('throws for a variable it was not given', () => {
        expect(() => translatorFor(EDITOR_STRINGS)('RichTextEditor_results')).toThrow('${count}');
    });
});

describe('resolveLabel', () => {
    const context = labelContextOf(LANG, translatorFor(frFR.translationStrings));

    it("shows a host plugin's text as it is", () => {
        expect(resolveLabel('Callout', context)).toBe('Callout');
    });

    it("hands a host plugin's label function only the language", () => {
        expect(resolveLabel((label) => `${Object.keys(label).join()} ${label.lang}`, context)).toBe(`lang ${LANG}`);
    });

    it("says a shipped plugin's label in the editor's language", () => {
        expect(resolveLabel(localeLabel('RichTextEditor_quote'), context)).toBe(
            frFR.translationStrings.RichTextEditor_quote,
        );
    });
});

describe('localeLabel', () => {
    it('throws when something other than the editor reads it', () => {
        const label = localeLabel('RichTextEditor_quote');

        expect(() => resolveLabel(label, { lang: LANG } as never)).toThrow('RichTextEditor_quote');
    });
});
