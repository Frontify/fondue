/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { fontColorPlugin } from './FontColor';

const fontColor = fontColorPlugin().marks?.fontColor;

const parse = (html: string): unknown => {
    const element = document.createElement('div');
    element.innerHTML = html;
    return fontColor?.parse[0]?.value?.(element.firstElementChild as HTMLElement);
};

describe('the font colour mark', () => {
    it('writes a colour into the style', () => {
        expect(fontColor?.toHtml({ color: '#c5221f' }).attrs).toEqual({ style: { color: '#c5221f' } });
    });

    it('leaves out a stored value that is not a colour', () => {
        for (const value of [{ color: 'red; background: url(x)' }, { color: 1 }, {}]) {
            expect(fontColor?.toHtml(value as never).attrs).toEqual({});
        }
    });

    it('reads a pasted colour, and ignores one that is not', () => {
        expect(parse('<span style="color: hsl(0, 50%, 50%)">x</span>')).toEqual({ color: 'hsl(0, 50%, 50%)' });
        expect(parse('<span style="color: rgb(1, 2, 3) url(x)">x</span>')).toBeNull();
    });
});
