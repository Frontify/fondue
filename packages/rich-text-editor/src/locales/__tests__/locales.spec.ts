/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { LOCALE_LOADERS } from '#/editor/hooks/useEditorLocale';

import { enUS } from '../en-US';
import * as shipped from '../index';
import { type RichTextLocale } from '../types';

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

    it.each(files)('%s says every English string, with the same variables, under its own lang', (id) => {
        const locale = localeOf(id);

        expect(locale.lang).toBe(id);
        expect(Object.keys(locale.translationStrings).sort()).toEqual(Object.keys(enUS.translationStrings).sort());
        for (const [key, english] of Object.entries(enUS.translationStrings)) {
            const translated = locale.translationStrings[key as keyof typeof enUS.translationStrings];
            expect([key, placeholdersOf(translated)]).toEqual([key, placeholdersOf(english)]);
        }
    });

    it.each(files)('%s puts every count after a colon, as a value of its own', (id) => {
        const { translationStrings } = localeOf(id);

        expect(Object.entries(translationStrings).filter(([, value]) => misplacedCounts(value).length > 0)).toEqual([]);
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

    it('loads every locale but English through an import of its own, for its own lang', async () => {
        expect([...LOCALE_LOADERS.keys()].sort()).toEqual(files.filter((id) => id !== 'en-US'));
        for (const [id, load] of LOCALE_LOADERS) {
            const locale = await load();
            expect(locale.lang).toBe(id);
        }
    });
});
