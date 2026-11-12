/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { NAMED_COLORS, toStoredColor } from './cssColor';

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
            'hsl(10%deg 100% 50%)',
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
            'hsl(0, 50%, 50)',
            'hsl(0, 50%, none)',
            'hsla(0, 50, 50%, 0.5)',
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
