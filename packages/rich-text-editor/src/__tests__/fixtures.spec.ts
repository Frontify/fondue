/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const folder = (path: string) => fileURLToPath(new URL(path, import.meta.url));
const namesIn = (path: string, extension: string) =>
    readdirSync(folder(path)).filter((name) => name.endsWith(extension));

describe('the fixtures CI runs on a change to src', () => {
    it.each(namesIn('../model/__tests__/fixtures/hostile/', '.json'))(
        'gives hostile fixture %s an expected result',
        (name) => {
            const fixture = JSON.parse(readFileSync(folder(`../model/__tests__/fixtures/hostile/${name}`), 'utf8')) as {
                expected?: unknown;
            };

            expect(typeof fixture.expected).toBe('object');
            expect(Object.keys(fixture.expected as object)).not.toEqual([]);
        },
    );

    it('gives every urls.json entry an expected verdict: the checked href, or the code that rejects it', () => {
        const entries = JSON.parse(readFileSync(folder('../model/__tests__/fixtures/urls.json'), 'utf8')) as readonly {
            input?: unknown;
            ok?: unknown;
            code?: unknown;
            href?: unknown;
        }[];

        expect(entries.length).toBeGreaterThan(0);
        for (const entry of entries) {
            expect(typeof entry.input).toBe('string');
            if (entry.ok === true) {
                expect(typeof entry.href).toBe('string');
            } else {
                expect(entry.ok).toBe(false);
                expect(typeof entry.code).toBe('string');
            }
        }
    });

    it.each(namesIn('../html/__tests__/fixtures/clipboard/', '.html'))(
        'gives the pasted HTML %s its expected document in a .paste.json file',
        (name) => {
            expect(
                existsSync(folder(`../html/__tests__/fixtures/clipboard/${name.replace('.html', '.paste.json')}`)),
            ).toBe(true);
        },
    );
});
