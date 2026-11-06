/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { parseCssColor, readStoredColor, toCssColor, toExportedColor, toStoredColor } from './colors';

describe('toStoredColor', () => {
    it('stores a named colour, a hex value, or one colour function of plain numbers as lowercase hex', () => {
        for (const [css, stored] of [
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
        ]) {
            expect(toStoredColor(css as string)).toBe(stored);
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
            'rgb(none 2 3)',
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

describe('readStoredColor', () => {
    it('reads a stored value written in another CSS form, such as the legacy editor wrote, as hex', () => {
        for (const [value, stored] of [
            ['#aabbcc', '#aabbcc'],
            ['#aabbcc80', '#aabbcc80'],
            ['#AABBCC', '#aabbcc'],
            ['red', '#ff0000'],
            ['rgb(0 0 255)', '#0000ff'],
            ['rgba(255, 20, 73, 0.5)', '#ff144980'],
        ]) {
            expect(readStoredColor(value)).toBe(stored);
        }
    });

    it('reads anything else as no colour', () => {
        for (const value of ['#aabbcc; x', 'x;y#aabbcc', '#aabbcc8', 'banana', undefined, null, 1, {}]) {
            expect(readStoredColor(value)).toBeUndefined();
        }
    });
});

describe('the picker colour', () => {
    it('is stored as hex, with two alpha digits only while translucent', () => {
        expect(toCssColor({ red: 255, green: 0, blue: 0, alpha: 1 })).toBe('#ff0000');
        expect(toCssColor({ red: 255, green: 0, blue: 0, alpha: 0.5 })).toBe('#ff000080');
        expect(toCssColor({ red: 255, green: 0, blue: 0, alpha: 0.999 })).toBe('#ff0000');
    });

    it('reads back from the stored hex', () => {
        expect(parseCssColor('#ff000080')).toEqual({ red: 255, green: 0, blue: 0, alpha: 0.5 });
        expect(parseCssColor('red')).toEqual({ red: 255, green: 0, blue: 0, alpha: 1 });
        expect(parseCssColor('banana')).toBeUndefined();
        expect(parseCssColor(undefined)).toBeUndefined();
    });
});

describe('toExportedColor', () => {
    it('writes hex while opaque and rgba() while translucent', () => {
        expect(toExportedColor('#c5221f')).toBe('#c5221f');
        expect(toExportedColor('#ff000080')).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('pastes back as the same stored colour for every alpha', () => {
        for (let byte = 0; byte < 255; byte++) {
            const stored = `#ff0000${byte.toString(16).padStart(2, '0')}`;
            expect(toStoredColor(toExportedColor(stored))).toBe(stored);
        }
    });
});
