/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readdirSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { enUS } from '../en-US';

const files = readdirSync(new URL('..', import.meta.url))
    .filter((name) => /^[a-z]{2}-[A-Z]{2}\.ts$/.test(name))
    .map((name) => name.replace('.ts', ''))
    .sort();
const placeholders = (value: string) => value.match(/\$\{\w+\}/g) ?? [];
const localeOf = async (file: string) => {
    const module = (await import(`../${file}.ts`)) as Record<string, typeof enUS | undefined>;
    const locale = module[file.replace('-', '')];
    if (locale === undefined) {
        throw new Error(`${file} exports no locale`);
    }
    return locale;
};

describe('package locales', () => {
    it('ships the eleven locales of Fondue', () => {
        expect(files).toEqual(
            ['de-CH', 'de-DE', 'en-US', 'es-ES', 'fr-CH', 'fr-FR', 'it-CH', 'it-IT', 'nl-NL', 'pl-PL', 'pt-PT'].sort(),
        );
    });

    it.each(files)('defines every enUS key of %s, with the same ${vars} and its own lang', async (file) => {
        const locale = await localeOf(file);

        expect(locale.lang).toBe(file);
        expect(Object.keys(locale.translationStrings).sort()).toEqual(Object.keys(enUS.translationStrings).sort());
        for (const [key, value] of Object.entries(enUS.translationStrings)) {
            const translated = locale.translationStrings[key as keyof typeof enUS.translationStrings];
            expect(placeholders(translated)).toEqual(placeholders(value));
        }
    });

    it('words no enUS help, instruction or error by shape, colour, size or position alone', () => {
        // Each allowed use, with why the string holds without seeing the layout.
        const allowed = new Set<string>([]);
        const sensory = ['click the', 'red', 'green', 'on the left', 'on the right', 'above', 'below'];
        const found = Object.entries(enUS.translationStrings).flatMap(([key, value]) =>
            sensory.filter((words) => new RegExp(`\\b${words}\\b`, 'i').test(value)).map((words) => `${key} ${words}`),
        );

        expect(found.filter((use) => !allowed.has(use))).toEqual([]);
        expect([...allowed].filter((use) => !found.includes(use))).toEqual([]);
    });
});
