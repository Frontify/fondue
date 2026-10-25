/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { budgets, measure } from '../../__tests__/fixtures/size/bundle';

const ids = readdirSync(fileURLToPath(new URL('..', import.meta.url)))
    .filter((name) => /^[a-z]{2}-[A-Z]{2}\.ts$/.test(name))
    .map((name) => name.replace('.ts', ''));

describe('locale bundles', () => {
    it('cover the shipped locales', () => {
        expect(ids).toHaveLength(11);
    });

    it.each(ids)(
        'keeps %s within its Brotli budget',
        async (id) => {
            const { bytes } = await measure(`export * from '#/locales/${id}';`);

            expect(bytes).toBeLessThanOrEqual(budgets['./locales/*'] ?? 0);
        },
        60_000,
    );
});
