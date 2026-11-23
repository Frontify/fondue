/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync } from 'node:fs';

import * as fondue from '@frontify/fondue-components/locales';
import { describe, expect, it } from 'vitest';

import { enUS } from '../en-US';
import { STRINGS_BY_LANG } from '../index';
import { type RichTextStringKey, type RichTextStrings } from '../types';

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

const EDITOR_KEYS = Object.keys(enUS) as RichTextStringKey[];

const editorStringsOf = (strings: RichTextStrings): [string, string][] => EDITOR_KEYS.map((key) => [key, strings[key]]);

const stringsOf = (lang: string): RichTextStrings => {
    const strings = STRINGS_BY_LANG.get(lang);
    if (strings === undefined) {
        throw new Error(`${lang} is not in STRINGS_BY_LANG`);
    }
    return strings;
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
    it("are Fondue's eleven, each by its language tag", () => {
        expect(files).toEqual(FONDUE_LOCALES);
        expect([...STRINGS_BY_LANG.keys()].sort()).toEqual(FONDUE_LOCALES);
        expect(
            Object.values(fondue)
                .map((locale) => locale.lang)
                .sort(),
        ).toEqual(FONDUE_LOCALES);
    });

    it.each(files)('%s says every English editor string, with the same variables', (id) => {
        for (const [key, translated] of editorStringsOf(stringsOf(id))) {
            expect([key, placeholdersOf(translated)]).toEqual([key, placeholdersOf(enUS[key as RichTextStringKey])]);
        }
    });

    it.each(files)('%s puts every count of an editor string after a colon, as a value of its own', (id) => {
        expect(editorStringsOf(stringsOf(id)).filter(([, value]) => misplacedCounts(value).length > 0)).toEqual([]);
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
