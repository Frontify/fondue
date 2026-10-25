/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { budgets, profileBytes, type ProfileName } from '../../../__tests__/fixtures/size/bundle';

const ROWS: readonly (readonly [string, ProfileName, string])[] = [
    ['Inline', 'inline', 'inline-profile'],
    ['Comment', 'comment', 'comment-profile'],
    ['Document', 'document', 'document-profile'],
    ['Brand document', 'brand-document', 'brand-document-profile'],
];

const LOCALES = new URL('../../../locales', import.meta.url);
const otherLocales = readdirSync(LOCALES).filter((name) => /^[a-z]{2}-[A-Z]{2}\.ts$/.test(name) && name !== 'en-US.ts');

const MARKDOWN_MODULE =
    /\/node_modules\/(?:markdown-it|entities|linkify-it|mdurl|uc\.micro)\/|\/codecs\/(?:from|to)Markdown\.ts$/;

describe('profile bundles', () => {
    it.each(ROWS)(
        'keeps Markdown parsing out of the %s profile initial load',
        async (_name, profile) => {
            const { modules } = await profileBytes(profile);

            expect(modules.length).toBeGreaterThan(0);
            expect(modules.filter((id) => MARKDOWN_MODULE.test(id))).toEqual([]);
        },
        120_000,
    );

    it.each(ROWS)(
        'keeps every locale except enUS out of the %s profile initial load',
        async (_name, profile) => {
            const { modules } = await profileBytes(profile);
            const loaded = modules.filter((id) => id.includes('/src/locales/'));

            expect(otherLocales.length).toBeGreaterThan(0);
            expect(loaded.some((id) => id.endsWith('/locales/en-US.ts'))).toBe(true);
            expect(loaded.filter((id) => otherLocales.some((name) => id.endsWith(`/locales/${name}`)))).toEqual([]);
        },
        120_000,
    );

    it.each(ROWS)(
        'keeps the %s profile initial chunk within its Brotli budget',
        async (_name, profile, row) => {
            const { bytes } = await profileBytes(profile);

            expect(bytes).toBeLessThanOrEqual(budgets[row] ?? 0);
        },
        120_000,
    );

    it('grows the Document profile by at most 1 KB when marks.strike is added to it', async () => {
        const directory = mkdtempSync(join(tmpdir(), 'rte-strike-'));
        try {
            // The Document profile without the feature: the vocabulary and editor part of `marks.strike` are empty.
            const feature = join(directory, 'feature.ts');
            const editor = join(directory, 'editor.ts');
            writeFileSync(feature, 'export const strike = () => ({}) as never;\n');
            writeFileSync(editor, 'export const strikeEditor = {} as never;\n');
            const without = await profileBytes('document', [
                { find: '#/features/marksStrike/feature', replacement: feature },
                { find: '#/features/marksStrike/editor', replacement: editor },
            ]);
            const withStrike = await profileBytes('document');

            expect(withStrike.bytes - without.bytes).toBeLessThanOrEqual(1000);
        } finally {
            rmSync(directory, { recursive: true, force: true });
        }
    }, 240_000);
});
