/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { budgets, measure } from '../../__tests__/fixtures/size/bundle';

describe('features bundle', () => {
    it('stays within its Brotli budget, measured with the model modules external', async () => {
        const { bytes } = await measure("export * from '#/plugins';", {
            external: (id) => id === '#/model' || id.startsWith('#/model/'),
        });

        expect(bytes).toBeLessThanOrEqual(budgets['./features'] ?? 0);
    }, 60_000);
});
