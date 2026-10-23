/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { budgets, measure } from '../../__tests__/fixtures/size/bundle';

describe('html bundle', () => {
    it('stays within its Brotli budget, prosemirror-model included', async () => {
        const { bytes, modules } = await measure("export * from '#/html';");

        expect(modules.some((id) => id.includes('prosemirror-model'))).toBe(true);
        expect(bytes).toBeLessThanOrEqual(budgets['./html'] ?? 0);
    }, 60_000);
});
