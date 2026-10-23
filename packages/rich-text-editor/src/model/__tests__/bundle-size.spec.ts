/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { budgets, measure } from '../../__tests__/fixtures/size/bundle';

describe('model bundle', () => {
    it('stays within its Brotli budget and ships no prosemirror import', async () => {
        const { bytes, code } = await measure("export * from '#/model';");

        expect(code).not.toMatch(/['"]prosemirror-/);
        expect(bytes).toBeLessThanOrEqual(budgets['./model'] ?? 0);
    }, 60_000);
});
