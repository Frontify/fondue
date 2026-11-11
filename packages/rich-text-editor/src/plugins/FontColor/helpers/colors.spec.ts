/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import {
    decodeStoredColor,
    encodeStoredColor,
    parseTypedHex,
    toColorName,
    toExportedColor,
    toStoredColor,
} from './colors';
import { NAMED_COLORS } from './namedColors';

describe('toStoredColor', () => {
    it('stores a named colour, a hex value, or one colour function of plain numbers as lowercase hex', () => {
        const cases: [string, string][] = [
            ['red', '#ff0000'],
            ['RebeccaPurple', '#663399'],
            [' DarkSlateGrey ', '#2f4f4f'],
            ['transparent', '#00000000'],
            ['#ABC', '#aabbcc'],
            ['#abcd', '#aabbccdd'],
            ['#AABBCC', '#aabbcc'],
            ['#aabbccff', '#aabbcc'],
            ['#aabbcc80', '#aabbcc80'],
            ['rgb(1, 2, 3)', '#010203'],
            ['rgba(1, 2, 3, 0.5)', '#01020380'],
            ['rgb(1 2 3 / 50%)', '#01020380'],
            ['rgb(100%, 0%, 0%)', '#ff0000'],
            ['rgb(300, -5, 0)', '#ff0000'],
            ['hsl(0, 50%, 50%)', '#bf4040'],
            ['hsla(120deg 100% 25% / 0.5)', '#00800080'],
            ['hsl(120 100 25)', '#008000'],
            ['rgb(10% 20 30)', '#1a141e'],
            ['rgb(1\t2\f3)', '#010203'],
            ['rgba(1, 2, 3, .5)', '#01020380'],
            ['rgb(+255, 0, 0)', '#ff0000'],
            ['rgb(1E2 0 0)', '#640000'],
            ['rgb(1e1% 0 0)', '#1a0000'],
            ['rgb(5e-1 0 0)', '#010000'],
            ['rgb(1e+2 0 0)', '#640000'],
            ['rgb(1,\n2,\r3)', '#010203'],
            ['#aabbcc8f', '#aabbcc8f'],
            ['#abcf', '#aabbcc'],
            ['hsl(1.2e2 100% 50%)', '#00ff00'],
            ['hsl(-120, 100%, 50%)', '#0000ff'],
            ['hsl(0, 150%, 25%)', '#800000'],
            ['hsl(0, -10%, 50%)', '#808080'],
            ['hsl(480, 100%, 25%)', '#008000'],
            ['hsl(0.5turn 100% 50%)', '#00ffff'],
            ['hsl(3.14159rad 100% 50%)', '#00ffff'],
            ['hsl(200grad 100% 50%)', '#00ffff'],
            ['hsl(0.5turn, 100%, 50%)', '#00ffff'],
            ['hsl(none 100% 50%)', '#ff0000'],
            ['rgb(255 none 0)', '#ff0000'],
            ['rgb(255 0 0 / none)', '#ff000000'],
            ['hsl(0 none 50%)', '#808080'],
            ['rgb(none 2 3)', '#000203'],
            ['rgba(1, 2, 3, 2)', '#010203'],
            ['rgb(1 2 3 / 150%)', '#010203'],
            ['rgba(1, 2, 3, -1)', '#01020300'],
            ['hsla(0, 100%, 50%, 2)', '#ff0000'],
        ];
        for (const [css, stored] of cases) {
            expect(toStoredColor(css)).toBe(stored);
        }
    });

    it('refuses anything else, so no other CSS reaches the document', () => {
        for (const css of [
            'red; background: url(x)',
            'red}body{display:none',
            'url(https://example.com/x.png)',
            'rgb(1, 2, 3); position: fixed',
            'rgb(1, 2, 3) url(x)',
            'expression(alert(1))',
            '\\72 ed',
            'var(--x)',
            '#abcde',
            '#ab',
            '#aabbccd',
            '#abcdefabc',
            'banana',
            'GrayText',
            'inherit',
            'currentColor',
            'constructor',
            '__proto__',
            'rgb(1, 2)',
            'rgb(a, b, c)',
            'rgb(1px, 2, 3)',
            'rgb(255, none, 0)',
            'hsl(none, 100%, 50%)',
            'hsl(nonedeg 100% 50%)',
            'hsl(noneturn 100% 50%)',
            'rgb(1, 2, 3, none)',
            'hsl(1px 100% 50%)',
            'hsl(10% 100% 50%)',
            'rgb(1 2 3 0.5)',
            'rgb(1 2 3, 0.5)',
            'rgb(1, 2, 3 / 0.5)',
            'rgb(/1 2 3)',
            'rgb(1,,2,3)',
            'rgb(1 2 3 /)',
            'rgb(10%, 20, 30)',
            'rgb(1. 2 3)',
            'rgb(1.e2 0 0)',
            'rgb(1e400 0 0)',
            'hsl(0, 50, 50%)',
            'hsl(50%, 50%, 50%)',
            `hsl(${'1'.repeat(400)}, 50%, 50%)`,
            ' #fff',
            'rgb(1 2 3)',
            'Khaki',
            'rgb(1\v2 3)',
            'rgb(1,2,3,0.5,9)',
            'rgb(1 2 3 / .5 / .2)',
            'x#fff',
            '#fffx',
            'x rgb(1,2,3)',
            'rgb(1,2,3)x',
            'x red',
            '',
        ]) {
            expect(toStoredColor(css)).toBeUndefined();
        }
    });
});

describe('toStoredColor on stored values', () => {
    it('reads a stored value written in another CSS form, such as the legacy editor wrote, as hex', () => {
        for (const [value, stored] of [
            ['#aabbcc', '#aabbcc'],
            ['#aabbcc80', '#aabbcc80'],
            ['#AABBCC', '#aabbcc'],
            ['red', '#ff0000'],
            ['rgb(0 0 255)', '#0000ff'],
            ['rgba(255, 20, 73, 0.5)', '#ff144980'],
        ]) {
            expect(toStoredColor(value)).toBe(stored);
        }
    });

    it('reads anything else as no colour', () => {
        for (const value of ['#aabbcc; x', 'x;y#aabbcc', '#aabbcc8', 'banana', undefined, null, 1, {}]) {
            expect(toStoredColor(value)).toBeUndefined();
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

describe('NAMED_COLORS', () => {
    it('holds the 148 CSS Color 4 names plus transparent', () => {
        expect(NAMED_COLORS.size).toBe(149);
    });

    it('maps lowercase letter names to lowercase hex', () => {
        for (const [name, hex] of NAMED_COLORS) {
            expect(name).toMatch(/^[a-z]+$/);
            expect(hex).toMatch(/^#[\da-f]{6}([\da-f]{2})?$/);
        }
    });
});
