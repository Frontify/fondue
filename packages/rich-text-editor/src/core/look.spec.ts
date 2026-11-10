/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { BLOCK_FALLBACKS, lookProperties, lookStyle, styleOfClass } from './look';

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

describe('lookStyle', () => {
    it('puts the host values over the fallbacks, by CSS property name', () => {
        const style = lookStyle(
            { fontSize: 'var(--f-size)', marginBottom: '8px' },
            { ...BLOCK_FALLBACKS, 'font-size': '14px' },
        );

        expect(style).toEqual({ 'margin-top': '0', 'margin-bottom': '8px', 'font-size': 'var(--f-size)' });
    });

    it('is the fallbacks when the host sets nothing', () => {
        expect(lookStyle({}, BLOCK_FALLBACKS)).toEqual(BLOCK_FALLBACKS);
        expect(lookStyle({ color: undefined }, BLOCK_FALLBACKS)).toEqual(BLOCK_FALLBACKS);
    });

    for (const value of ['red; display: none', 'url(https://example.com/a.png)', '}', '', '   ']) {
        it(`throws, naming the field, for ${JSON.stringify(value)}`, () => {
            expect(() => lookStyle({ letterSpacing: value }, {})).toThrow(/"letterSpacing"/);
        });
    }
});

describe('styleOfClass', () => {
    it('keys the style by the class name', () => {
        expect(styleOfClass('rte-quote', { color: 'red' })).toEqual({ 'rte-quote': { color: 'red' } });
    });

    it('throws for a class without a name', () => {
        expect(() => styleOfClass(undefined, {})).toThrow(/no name/);
    });
});
