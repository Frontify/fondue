/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { checkBundleSizes } from './check-bundle-size';

const root = fileURLToPath(new URL('..', import.meta.url));
const model = { build: './model', fixture: 'size-fixtures/model.ts' };

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
});
