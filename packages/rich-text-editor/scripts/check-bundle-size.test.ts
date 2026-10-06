/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterEach, describe, expect, it } from 'vitest';

import { checkBundleSizes } from './check-bundle-size';

const root = fileURLToPath(new URL('..', import.meta.url));
const model = { build: './model', fixture: 'size-fixtures/model.ts' };
const temporaryRoots: string[] = [];

// A package root whose `./model` entry exists and whose fixtures hold the given sources.
const temporaryRoot = (fixtures: Record<string, string>) => {
    const directory = mkdtempSync(join(tmpdir(), 'check-bundle-size-'));
    temporaryRoots.push(directory);
    mkdirSync(join(directory, 'src/model'), { recursive: true });
    writeFileSync(join(directory, 'src/model/index.ts'), 'export const model = 1;\n');
    for (const [name, source] of Object.entries(fixtures)) {
        writeFileSync(join(directory, name), source);
    }
    return directory;
};

afterEach(() => {
    for (const directory of temporaryRoots.splice(0)) {
        rmSync(directory, { recursive: true, force: true });
    }
});

describe('check-bundle-size', () => {
    it('SPEC-rich-text-quality/AC-020 fails a build over its budget and passes it under', async () => {
        const over = await checkBundleSizes(root, [{ ...model, maxBytes: 1000 }]);
        const under = await checkBundleSizes(root, [{ ...model, maxBytes: 20_000 }]);

        expect(over.violations).toEqual([
            expect.stringMatching(/^\.\/model is \d+ Brotli bytes, over its budget of 1000$/),
        ]);
        expect(under.violations).toEqual([]);
    }, 60_000);

    it('SPEC-rich-text-quality/AC-020 fails when no budget is listed', async () => {
        const empty = await checkBundleSizes(root, []);

        expect(empty.violations).toEqual(['size-budgets.json holds no budget']);
    });

    it('SPEC-rich-text-quality/AC-020 fails a row without a positive maxBytes', async () => {
        const rows = [
            { ...model },
            { ...model, maxBytes: 0 },
            { ...model, maxBytes: '20000' },
            { ...model, maxBytes: Infinity },
        ];
        const { violations, report } = await checkBundleSizes(root, rows);

        expect(violations).toHaveLength(rows.length);
        expect(violations.every((violation) => violation.startsWith('size-budgets.json row '))).toBe(true);
        expect(report).toEqual([]);
    });

    it('SPEC-rich-text-quality/AC-020 fails a row whose build or fixture is not a non-empty string', async () => {
        const { violations, report } = await checkBundleSizes(root, [
            { build: './model', fixture: 42, maxBytes: 20_000 },
            { build: '', fixture: 'size-fixtures/model.ts', maxBytes: 20_000 },
            null,
        ]);

        expect(violations).toEqual([
            expect.stringContaining('row 0 '),
            expect.stringContaining('row 1 '),
            expect.stringContaining('row 2 '),
        ]);
        expect(report).toEqual([]);
    });

    it('SPEC-rich-text-quality/AC-020 fails a fixture that does not bundle its build', async () => {
        const temporary = temporaryRoot({ 'empty.ts': 'export {};\n' });
        const { violations } = await checkBundleSizes(temporary, [{ ...model, fixture: 'empty.ts', maxBytes: 20_000 }]);

        expect(violations).toEqual(['empty.ts does not bundle ./model']);
    }, 60_000);

    it('SPEC-rich-text-quality/AC-020 passes a fixture that bundles its build', async () => {
        const temporary = temporaryRoot({ 'pulls.ts': "export { model } from '#/model';\n" });
        const { violations, report } = await checkBundleSizes(temporary, [
            { ...model, fixture: 'pulls.ts', maxBytes: 20_000 },
        ]);

        expect(violations).toEqual([]);
        expect(report).toEqual([expect.stringMatching(/^\.\/model \d+\/20000$/)]);
    }, 60_000);

    it('SPEC-rich-text-quality/AC-020 fails a build with no entry module', async () => {
        const { violations } = await checkBundleSizes(root, [{ ...model, build: './missing', maxBytes: 20_000 }]);

        expect(violations).toEqual(['./missing has no src/<name>/index.ts or index.tsx entry']);
    });
});
