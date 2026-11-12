/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { decodeStoredColor, encodeStoredColor, isStoredColor } from './storedColor';

describe('isStoredColor', () => {
    it('accepts only lowercase six or eight digit hex', () => {
        expect(isStoredColor('#c5221f')).toBe(true);
        expect(isStoredColor('#c5221f80')).toBe(true);
        for (const value of ['red', '#C5221F', '#f00', 'rgb(255, 0, 0)', '#c5221f; x', undefined, null, 1, {}]) {
            expect(isStoredColor(value)).toBe(false);
        }
    });
});

describe('the picker colour', () => {
    it('is stored as hex, with two alpha digits only while translucent', () => {
        expect(encodeStoredColor({ red: 255, green: 0, blue: 0, alpha: 1 })).toBe('#ff0000');
        expect(encodeStoredColor({ red: 255, green: 0, blue: 0, alpha: 0.5 })).toBe('#ff000080');
        expect(encodeStoredColor({ red: 255, green: 0, blue: 0, alpha: 0.999 })).toBe('#ff0000');
    });

    it('reads back from the stored hex', () => {
        expect(decodeStoredColor('#ff000080')).toEqual({ red: 255, green: 0, blue: 0, alpha: 0.5 });
        expect(decodeStoredColor('#c5221f5e')).toEqual({ red: 197, green: 34, blue: 31, alpha: 0.37 });
        expect(decodeStoredColor('#ff0000fe')).toEqual({ red: 255, green: 0, blue: 0, alpha: 0.996 });
        expect(decodeStoredColor('#ff0000')).toEqual({ red: 255, green: 0, blue: 0, alpha: 1 });
    });

    it('stores back as the same bytes for every alpha', () => {
        for (let byte = 0; byte <= 255; byte++) {
            let stored = '#ff0000';
            if (byte !== 255) {
                stored = `#ff0000${byte.toString(16).padStart(2, '0')}`;
            }
            expect(encodeStoredColor(decodeStoredColor(stored))).toBe(stored);
        }
    });

    it('reads back every whole percent the picker writes exactly', () => {
        for (let percent = 0; percent <= 100; percent++) {
            const stored = encodeStoredColor({ red: 255, green: 0, blue: 0, alpha: percent / 100 });
            expect(decodeStoredColor(stored).alpha).toBe(percent / 100);
        }
    });
});
