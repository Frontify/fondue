/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { lookProperties } from './look';

describe('lookProperties', () => {
    it('names one custom property per field the host set', () => {
        expect(lookProperties('imageTitle', { fontSize: 'var(--f-size)', textDecoration: 'underline' })).toEqual({
            '--rte-image-title-font-size': 'var(--f-size)',
            '--rte-image-title-text-decoration': 'underline',
        });
    });

    it('leaves a name without capitals as it is', () => {
        expect(lookProperties('heading1', { marginBottom: '8px' })).toEqual({ '--rte-heading1-margin-bottom': '8px' });
    });

    it('writes nothing for a field that is not set', () => {
        expect(lookProperties('heading1', {})).toEqual({});
        expect(lookProperties('heading1', { color: undefined })).toEqual({});
    });

    for (const value of ['red; display: none', 'url(https://example.com/a.png)', '}', '', '   ']) {
        it(`throws, naming the style and the field, for ${JSON.stringify(value)}`, () => {
            expect(() => lookProperties('custom2', { letterSpacing: value })).toThrow(/"letterSpacing".*"custom2"/);
        });
    }
});
