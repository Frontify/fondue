/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { lookProperties } from './look';

describe('lookProperties', () => {
    it('names one custom property per field the host set', () => {
        expect(lookProperties('sampleStyle', { fontSize: 'var(--f-size)', textDecoration: 'underline' })).toEqual({
            '--rte-sample-style-font-size': 'var(--f-size)',
            '--rte-sample-style-text-decoration': 'underline',
        });
    });

    it('leaves a name without capitals as it is', () => {
        expect(lookProperties('plain', { marginBottom: '8px' })).toEqual({ '--rte-plain-margin-bottom': '8px' });
    });

    it('writes nothing for a field that is not set', () => {
        expect(lookProperties('plain', {})).toEqual({});
        expect(lookProperties('plain', { color: undefined })).toEqual({});
    });

    for (const value of ['red; display: none', 'url(https://example.com/a.png)', '}', '', '   ']) {
        it(`throws, naming the style and the field, for ${JSON.stringify(value)}`, () => {
            expect(() => lookProperties('plain', { letterSpacing: value })).toThrow(/"letterSpacing".*"plain"/);
        });
    }
});
