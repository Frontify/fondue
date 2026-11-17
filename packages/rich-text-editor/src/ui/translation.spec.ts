/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { enUS } from '#/locales/en-US';
import { frFR } from '#/locales/fr-FR';

import { translateLabel, translatorFor } from './translation';

describe('translatorFor', () => {
    it("says a key in the locale's words, its variables filled in", () => {
        const translate = translatorFor(frFR);

        expect(translate('RichTextEditor_bold')).toBe(frFR.translationStrings.RichTextEditor_bold);
        expect(translate('RichTextEditor_results', { count: '3' })).toBe('Résultats : 3');
    });

    it('throws for a variable it was not given', () => {
        expect(() => translatorFor(enUS)('RichTextEditor_results')).toThrow('${count}');
    });
});

describe('translateLabel', () => {
    const translate = translatorFor(frFR);

    it("looks up a key of the editor's locale", () => {
        expect(translateLabel('RichTextEditor_quote', translate)).toBe(frFR.translationStrings.RichTextEditor_quote);
    });

    it("shows a host plugin's own text as it is", () => {
        expect(translateLabel('Callout', translate)).toBe('Callout');
        expect(translateLabel('RichTextEditor_unknown', translate)).toBe('RichTextEditor_unknown');
    });
});
