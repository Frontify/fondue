/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { budgets, measure } from '../../__tests__/fixtures/size/bundle';

describe('reader bundle', () => {
    it('stays within its Brotli budget with zero engine bytes', async () => {
        const { bytes, modules } = await measure("export * from '#/reader';");

        expect(modules.filter((id) => /[/\\](?:prosemirror-[\w-]+|rope-sequence|orderedmap)[/\\]/.test(id))).toEqual(
            [],
        );
        expect(bytes).toBeLessThanOrEqual(budgets['./reader'] ?? 0);
    }, 60_000);
});
