/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { budgets, measure } from '../../__tests__/fixtures/size/bundle';

// Every public entry, so the stylesheet holds what `./styles` ships.
const ENTRIES = ['#/index', '#/features', '#/entries/reader', '#/codecs', '#/runtime/import/fromHtml', '#/testing']
    .map((entry) => `export * from '${entry}';`)
    .join('\n');

describe('package stylesheet', () => {
    it('stays within its Brotli budget', async () => {
        const { cssBytes } = await measure(ENTRIES);

        expect(cssBytes).toBeGreaterThan(0);
        expect(cssBytes).toBeLessThanOrEqual(budgets['package-css'] ?? 0);
    }, 120_000);
});
