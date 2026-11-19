/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

describe('authoringExcerpts', () => {
    it('finds every anchor line in its source file', async () => {
        const excerpts = await import('./authoringExcerpts');

        for (const excerpt of Object.values(excerpts)) {
            expect(excerpt.split('\n').length).toBeGreaterThan(1);
        }
    });
});
