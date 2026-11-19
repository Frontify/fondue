/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync } from 'node:fs';

import * as fondue from '@frontify/fondue-components/locales';
import { describe, expect, it } from 'vitest';

import { EDITOR_STRINGS } from '../en-US';
import * as shipped from '../index';
import { type RichTextLocale, type RichTextStringKey } from '../types';

const LOCALE_FILE = /^[a-z]{2}-[A-Z]{2}\.ts$/;
const PLACEHOLDER = /\$\{\w+\}/g;
const FONDUE_LOCALES = [
    'de-CH',
    'de-DE',
    'en-US',
    'es-ES',
    'fr-CH',
    'fr-FR',
    'it-CH',
    'it-IT',
    'nl-NL',
    'pl-PL',
    'pt-PT',
];
/** The placeholders that hold a count, which every locale puts after a colon so no string needs a plural form. */
const COUNT_PLACEHOLDERS = ['count'];

const files = readdirSync(new URL('..', import.meta.url))
    .filter((name) => LOCALE_FILE.test(name))
    .map((name) => name.replace('.ts', ''))
    .sort();

const EDITOR_KEYS = Object.keys(EDITOR_STRINGS) as RichTextStringKey[];

const editorStringsOf = ({ translationStrings }: RichTextLocale): [string, string][] =>
    EDITOR_KEYS.map((key) => [key, translationStrings[key]]);

const localeOf = (id: string): RichTextLocale => {
    const locale = (shipped as Record<string, RichTextLocale | undefined>)[id.replace('-', '')];
    if (locale === undefined) {
        throw new Error(`${id} is not exported from the locales entry point`);
    }
    return locale;
};

const placeholdersOf = (value: string): string[] => (value.match(PLACEHOLDER) ?? []).sort();

/** The count placeholders of `value` that stand anywhere but after a colon, an optional space or no-break space, and at the end. */
const misplacedCounts = (value: string): string[] =>
    COUNT_PLACEHOLDERS.filter((name) => {
        const all = value.split(`\${${name}}`).length - 1;
        const placed = value.match(new RegExp(`:[  ]?\\$\\{${name}\\}$`, 'g')) ?? [];
        return all !== placed.length;
    });

describe('the shipped locales', () => {
    it("are Fondue's eleven, each exported from the entry point", () => {
        expect(files).toEqual(FONDUE_LOCALES);
        expect(Object.keys(shipped).sort()).toEqual(FONDUE_LOCALES.map((id) => id.replace('-', '')).sort());
    });

    it.each(files)("%s holds Fondue's own locale for its lang, then the editor's strings", (id) => {
        const locale = localeOf(id);
        const components = Object.values(fondue).find((candidate) => candidate.lang === id);

        expect(locale.lang).toBe(id);
        expect(components?.lang).toBe(id);
        expect(locale.dateLocale).toBe(components?.dateLocale);
        expect(locale.translationStrings).toEqual(expect.objectContaining(components?.translationStrings));
    });

    it.each(files)('%s says every English editor string, with the same variables', (id) => {
        for (const [key, translated] of editorStringsOf(localeOf(id))) {
            expect([key, placeholdersOf(translated)]).toEqual([
                key,
                placeholdersOf(EDITOR_STRINGS[key as RichTextStringKey]),
            ]);
        }
    });

    it.each(files)('%s puts every count of an editor string after a colon, as a value of its own', (id) => {
        expect(editorStringsOf(localeOf(id)).filter(([, value]) => misplacedCounts(value).length > 0)).toEqual([]);
    });

    it('accepts a count after a colon only, at the end', () => {
        expect(['Results: ${count}', 'Résultats : ${count}', 'Results:${count}'].map(misplacedCounts)).toEqual([
            [],
            [],
            [],
        ]);
        expect(['${count} results', 'Results ${count}', 'Results: ${count} found'].map(misplacedCounts)).toEqual([
            ['count'],
            ['count'],
            ['count'],
        ]);
    });
});
