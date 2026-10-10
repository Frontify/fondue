/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { LOADERS } from '#/react/locale';

import { COUNT_PLACEHOLDERS } from './countPlaceholders';
import { enUS } from './en-US';

const files = readdirSync(new URL('.', import.meta.url))
    .filter((name) => /^[a-z]{2}-[A-Z]{2}\.ts$/.test(name))
    .map((name) => name.replace('.ts', ''))
    .sort();
const placeholders = (value: string) => value.match(/\$\{\w+\}/g) ?? [];
const localeOf = async (file: string) => {
    const module = (await import(`./${file}.ts`)) as Record<string, typeof enUS | undefined>;
    const locale = module[file.replace('-', '')];
    if (locale === undefined) {
        throw new Error(`${file} exports no locale`);
    }
    return locale;
};
/** The count placeholders of `value` that stand anywhere but after a colon, an optional space or no-break space, and before the end or a period. */
const misplacedCounts = (value: string) =>
    COUNT_PLACEHOLDERS.filter((name) => {
        const all = value.split(`\${${name}}`).length - 1;
        const placed = value.match(new RegExp(`:[ \u00A0]?\\$\\{${name}\\}(?=\\.?$)`, 'g')) ?? [];
        return all !== placed.length;
    });

describe('package locales', () => {
    it('SPEC-rich-text-react/AC-058 ships the eleven locales of Fondue', () => {
        expect(files).toEqual(
            ['de-CH', 'de-DE', 'en-US', 'es-ES', 'fr-CH', 'fr-FR', 'it-CH', 'it-IT', 'nl-NL', 'pl-PL', 'pt-PT'].sort(),
        );
    });

    it.each(files)(
        'SPEC-rich-text-react/AC-058 defines every enUS key of %s, with the same ${vars} and its own lang',
        async (file) => {
            const locale = await localeOf(file);

            expect(locale.lang).toBe(file);
            expect(Object.keys(locale.translationStrings).sort()).toEqual(Object.keys(enUS.translationStrings).sort());
            for (const [key, value] of Object.entries(enUS.translationStrings)) {
                const translated = locale.translationStrings[key as keyof typeof enUS.translationStrings];
                expect(placeholders(translated)).toEqual(placeholders(value));
            }
        },
    );

    it('SPEC-rich-text-react/AC-101 loads every shipped locale but enUS through its own import()', () => {
        expect(Object.keys(LOADERS).sort()).toEqual(files.filter((file) => file !== 'en-US'));
    });

    it.each(Object.keys(LOADERS))('SPEC-rich-text-react/AC-101 loads the locale of its own id for %s', async (id) => {
        const loader = LOADERS[id];
        if (loader === undefined) {
            throw new Error(`${id} has no loader`);
        }

        const locale = await loader();

        expect(locale.lang).toBe(id);
    });

    it('SPEC-rich-text-react/AC-059 accepts a count after a colon only, at the end or before a period', () => {
        expect(
            [
                'Results: ${count}',
                'Errors: ${errors}.',
                'Avertissements\u00A0:\u00A0${warnings}',
                'Review:${review}',
            ].map(misplacedCounts),
        ).toEqual([[], [], [], []]);
        expect(
            ['${count} results', 'Results ${count}', 'Errors: ${errors} found', 'Review: ${review}!'].map(
                misplacedCounts,
            ),
        ).toEqual([['count'], ['count'], ['errors'], ['review']]);
    });

    it('SPEC-rich-text-react/AC-059 names every enUS placeholder as a count or as one that holds no count', () => {
        const notCounts = ['feature'];
        const unnamed = Object.values(enUS.translationStrings)
            .flatMap(placeholders)
            .map((placeholder) => placeholder.slice(2, -1))
            .filter((name) => !COUNT_PLACEHOLDERS.includes(name) && !notCounts.includes(name));

        expect(unnamed).toEqual([]);
    });

    it.each(files)(
        'SPEC-rich-text-react/AC-059 puts every count of %s after a colon as a standalone value',
        async (file) => {
            const locale = await localeOf(file);

            expect(
                Object.entries(locale.translationStrings).filter(([, value]) => misplacedCounts(value).length > 0),
            ).toEqual([]);
        },
    );

    it('SPEC-rich-text-accessibility/AC-004 words no enUS help, instruction or error by shape, colour, size or position alone', () => {
        // Each allowed use, with why the string holds without seeing the layout.
        const allowed = new Set([
            // The changes follow the message in reading order too, so a screen reader reaches them next.
            'RichTextEditor_recoveryMessage below',
        ]);
        const sensory = ['click the', 'red', 'green', 'on the left', 'on the right', 'above', 'below'];
        const found = Object.entries(enUS.translationStrings).flatMap(([key, value]) =>
            sensory.filter((words) => new RegExp(`\\b${words}\\b`, 'i').test(value)).map((words) => `${key} ${words}`),
        );

        expect(found.filter((use) => !allowed.has(use))).toEqual([]);
        expect([...allowed].filter((use) => !found.includes(use))).toEqual([]);
    });
});
