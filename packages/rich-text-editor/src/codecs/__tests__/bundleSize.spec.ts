/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { budgets, measure } from '../../__tests__/fixtures/size/bundle';

describe('codecs bundle', () => {
    it('stays within its Brotli budget, markdown-it included', async () => {
        const { bytes, modules } = await measure("export * from '#/codecs';");

        expect(modules.some((id) => id.includes('markdown-it'))).toBe(true);
        expect(bytes).toBeLessThanOrEqual(budgets['./codecs'] ?? 0);
    }, 60_000);
});
