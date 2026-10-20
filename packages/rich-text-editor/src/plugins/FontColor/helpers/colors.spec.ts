/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { isCssColor } from './colors';

describe('isCssColor', () => {
    it('accepts a keyword, a hex value, or one colour function of plain numbers', () => {
        for (const color of [
            'red',
            'Transparent',
            '#abc',
            '#abcd',
            '#aabbcc',
            '#aabbccdd',
            'rgb(1, 2, 3)',
            'rgba(1, 2, 3, 0.5)',
            'rgb(1 2 3 / 50%)',
            'hsl(120, 50%, 50%)',
            'hsla(120 50% 50% / 0.5)',
        ]) {
            expect(isCssColor(color)).toBe(true);
        }
    });

    it('refuses anything that could carry more CSS', () => {
        for (const color of [
            'red; background: url(x)',
            'red}body{display:none',
            'url(https://example.com/x.png)',
            'rgb(1, 2, 3); position: fixed',
            'rgb(1, 2, 3) url(x)',
            'expression(alert(1))',
            '\\72 ed',
            'var(--x)',
            '#abcde',
            '',
        ]) {
            expect(isCssColor(color)).toBe(false);
        }
    });

    it('refuses what is not a string', () => {
        for (const color of [undefined, null, 1, {}, true]) {
            expect(isCssColor(color)).toBe(false);
        }
    });
});
