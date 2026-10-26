/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { expect, it } from 'vitest';

import { budgets } from './fixtures/size/bundle';

it('holds exactly the bundle budgets of each entry, each a positive byte count', () => {
    expect(Object.keys(budgets).sort()).toEqual(
        [
            './reader',
            './model',
            './codecs',
            './html',
            'inline-profile',
            'comment-profile',
            'document-profile',
            'brand-document-profile',
            './features',
            './locales/*',
            'package-css',
        ].sort(),
    );
    for (const bytes of Object.values(budgets)) {
        expect(Number.isInteger(bytes) && bytes > 0).toBe(true);
    }
});
