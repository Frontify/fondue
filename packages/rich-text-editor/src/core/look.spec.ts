/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { lookProperties, lookStyle, styleOfClass } from './look';

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

describe('lookStyle', () => {
    const FALLBACKS = { 'margin-top': '0', 'margin-bottom': '0' };

    it('puts the values the host set over the fallbacks, by CSS property name', () => {
        const properties = lookProperties('sample', { fontSize: 'var(--f-size)', marginBottom: '8px' });

        expect(lookStyle('sample', properties, { ...FALLBACKS, 'font-size': '14px' })).toEqual({
            'margin-top': '0',
            'margin-bottom': '8px',
            'font-size': 'var(--f-size)',
        });
    });

    it('is the fallbacks when the host sets nothing', () => {
        expect(lookStyle('sample', {}, FALLBACKS)).toEqual(FALLBACKS);
    });

    it('reads only the look of its own style', () => {
        expect(lookStyle('sample', lookProperties('other', { color: 'red' }), FALLBACKS)).toEqual(FALLBACKS);
    });
});

describe('styleOfClass', () => {
    it('keys the style by the class name', () => {
        expect(styleOfClass('sample', { color: 'red' })).toEqual({ sample: { color: 'red' } });
    });

    it('throws for a class without a name', () => {
        expect(() => styleOfClass(undefined, {})).toThrow(/no name/);
    });
});
