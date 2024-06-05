/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, it, expect } from 'vitest';

import { isResponsiveObject } from './isResponsiveObject';

describe('isResponsiveObject', () => {
    it.each([
        { xs: 'tw-block', sm: 'tw-inline' },
        { xs: 'tw-block', sm: 'tw-inline', md: 'tw-flex' },
        { xs: 'tw-block', sm: 'tw-inline', md: 'tw-flex', lg: 'tw-grid' },
        { xs: 'tw-block', sm: 'tw-inline', md: 'tw-flex', lg: 'tw-grid', xl: 'tw-box' },
        { xs: 'tw-block', sm: 'tw-inline', md: 'tw-flex', lg: 'tw-grid', xl: 'tw-box', '2xl': 'tw-inline' },
        { xs: 'tw-block', md: 'tw-flex', xl: 'tw-box' },
    ])('should return true if the input is a responsive object', (input) => {
        expect(isResponsiveObject(input)).toBe(true);
    });

    it.each([
        null,
        undefined,
        '',
        'tw-block',
        false,
        true,
        1,
        0,
        Number.NaN,
        Infinity,
        -Infinity,
        {},
        { foo: 'bar' },
        [],
        ['foo', 'bar'],
    ])('should return false if the input is not a responsive object', (input) => {
        expect(isResponsiveObject(input)).toBe(false);
    });
});
