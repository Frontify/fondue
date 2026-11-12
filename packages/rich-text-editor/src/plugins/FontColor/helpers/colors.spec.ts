/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { decodeStoredColor, toStoredColor } from '#/core';

import { isCompleteHex, parseTypedHex, toColorName, toExportedColor } from './colors';

describe('toColorName', () => {
    it('names a colour as upper-case hex, with the opacity while translucent', () => {
        expect(toColorName(decodeStoredColor('#ff000080'))).toBe('#FF0000 50%');
        expect(toColorName(decodeStoredColor('#c5221f'))).toBe('#C5221F');
        expect(toColorName(decodeStoredColor('#ff000000'))).toBe('#FF0000 0%');
    });

    it('rounds the opacity to a whole percent but still marks a translucent colour', () => {
        expect(toColorName(decodeStoredColor('#ff0000fe'))).toBe('#FF0000 100%');
    });
});

describe('parseTypedHex', () => {
    it('accepts three or six digits, with or without a leading hash', () => {
        expect(parseTypedHex('c5221f', undefined)).toEqual(decodeStoredColor('#c5221f'));
        expect(parseTypedHex('f00', undefined)).toEqual(decodeStoredColor('#ff0000'));
        expect(parseTypedHex('#c5221f', undefined)).toEqual(decodeStoredColor('#c5221f'));
    });

    it('reads upper case digits, and refuses a doubled hash', () => {
        expect(parseTypedHex('C5221F', undefined)).toEqual(decodeStoredColor('#c5221f'));
        expect(parseTypedHex('##fff', undefined)).toBeUndefined();
    });

    it('refuses any other length and no text', () => {
        expect(parseTypedHex('ff00', undefined)).toBeUndefined();
        expect(parseTypedHex('ff000080', undefined)).toBeUndefined();
        expect(parseTypedHex(undefined, undefined)).toBeUndefined();
    });

    it('passes the alpha through', () => {
        expect(parseTypedHex('f00', 0.5)).toEqual({ red: 255, green: 0, blue: 0, alpha: 0.5 });
        expect(parseTypedHex('f00', 0)).toEqual({ red: 255, green: 0, blue: 0, alpha: 0 });
    });
});

describe('toExportedColor', () => {
    it('writes hex while opaque and rgba() while translucent', () => {
        expect(toExportedColor('#c5221f')).toBe('#c5221f');
        expect(toExportedColor('#ff000080')).toBe('rgba(255, 0, 0, 0.5)');
        expect(toExportedColor('#ff000081')).toBe('rgba(255, 0, 0, 0.506)');
    });

    it('pastes back as the same stored colour for every alpha', () => {
        for (let byte = 0; byte < 255; byte++) {
            const stored = `#ff0000${byte.toString(16).padStart(2, '0')}`;
            expect(toStoredColor(toExportedColor(stored))).toBe(stored);
        }
    });
});

describe('isCompleteHex', () => {
    it('accepts six digits with or without a hash', () => {
        expect(isCompleteHex('c5221f')).toBe(true);
        expect(isCompleteHex('#C5221F')).toBe(true);
    });

    it('rejects anything else', () => {
        expect(isCompleteHex('f00')).toBe(false);
        expect(isCompleteHex('c5221')).toBe(false);
        expect(isCompleteHex('zz')).toBe(false);
        expect(isCompleteHex('c5221f0')).toBe(false);
        expect(isCompleteHex('ff000080')).toBe(false);
        expect(isCompleteHex('##c5221f')).toBe(false);
    });
});
