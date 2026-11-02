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
    it('writes a stored colour into the style, as rgba() while translucent', () => {
        expect(fontColor?.toHtml({ color: '#c5221f' }).attrs).toEqual({ style: { color: '#c5221f' } });
        expect(fontColor?.toHtml({ color: '#c5221f80' }).attrs).toEqual({ style: { color: 'rgba(197, 34, 31, 0.5)' } });
    });

    it('leaves out a stored value that is not a stored colour', () => {
        for (const value of [
            { color: 'red; background: url(x)' },
            { color: 'banana' },
            { color: 'red' },
            { color: 'rgb(255, 0, 0)' },
            { color: 1 },
            {},
        ]) {
            expect(fontColor?.toHtml(value as never).attrs).toEqual({});
        }
    });

    it('stores a pasted colour as hex, and ignores one that is not a colour', () => {
        expect(parse('<span style="color: hsl(0, 50%, 50%)">x</span>')).toEqual({ color: '#bf4040' });
        expect(parse('<span style="color: Red">x</span>')).toEqual({ color: '#ff0000' });
        for (const color of ['rgb(1, 2, 3) url(x)', 'inherit', 'GrayText', 'banana']) {
            expect(parse(`<span style="color: ${color}">x</span>`)).toBeNull();
        }
    });

    it('leaves pasted black in any form alone, but keeps a translucent black', () => {
        for (const color of ['black', '#000', '#000000ff', 'rgb(0 0 0)', 'hsl(0, 0%, 0%)', 'WindowText']) {
            expect(parse(`<span style="color: ${color}">x</span>`)).toBeNull();
        }
        expect(parse('<span style="color: rgba(0, 0, 0, 0.5)">x</span>')).toEqual({ color: '#00000080' });
        expect(parse('<span style="color: blue">x</span>')).toEqual({ color: '#0000ff' });
        expect(parse('<span style="color: lime">x</span>')).toEqual({ color: '#00ff00' });
    });
});
