/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';

import { type ParseRule, parseReaderOf } from '#/core';

import { fontColorPlugin } from './FontColor';

const fontColor = fontColorPlugin.content?.marks?.fontColor;

const parse = (html: string): unknown => {
    const element = document.createElement('div');
    element.innerHTML = html;
    const span = element.firstElementChild as HTMLElement;
    // The font colour mark's first rule is its `span` tag rule, which reads the element.
    const rule = fontColor?.parse[0] as ParseRule<unknown> | undefined;
    return rule?.value?.(span, parseReaderOf(span));
};

describe('the font colour mark', () => {
    let warn: MockInstance<typeof console.warn>;
    beforeEach(() => {
        warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });
    afterEach(() => {
        warn.mockRestore();
    });

    it('draws an older colour form as it is written, with no warning', () => {
        for (const color of ['red', 'rgba(255, 20, 73, 0.5)', 'hsl(120deg 100% 50% / 50%)', '#C5221F', '#f00']) {
            expect(fontColor?.toHtml({ color }).attrs).toEqual({ style: { color } });
        }
        expect(warn).not.toHaveBeenCalled();
    });

    it('writes a stored colour into the style, as rgba() while translucent', () => {
        expect(fontColor?.toHtml({ color: '#c5221f' }).attrs).toEqual({ style: { color: '#c5221f' } });
        expect(fontColor?.toHtml({ color: '#c5221f80' }).attrs).toEqual({ style: { color: 'rgba(197, 34, 31, 0.5)' } });
    });

    it('keeps a value that could be more than a colour out of the style, and names it once in development', () => {
        for (const color of ['red; background: url(x)', 'expression(alert(1))', 'url(x)', 'rgb(1, 2, 3) url(x)']) {
            const value = { color };

            expect(fontColor?.toHtml(value).attrs).toEqual({});
            expect(fontColor?.toHtml(value).attrs).toEqual({});
            expect(value).toEqual({ color });
        }
        expect(warn).toHaveBeenCalledTimes(4);
        expect(warn.mock.calls[0]?.[0]).toContain('"fontColor" mark holds "red; background: url(x)"');
    });

    it('draws nothing and names nothing when the mark carries no colour', () => {
        for (const value of [{}, null]) {
            expect(fontColor?.toHtml(value as never).attrs).toEqual({});
        }
        expect(warn).not.toHaveBeenCalled();
    });

    it('stores a pasted colour as hex, and ignores one that is not a colour', () => {
        expect(parse('<span style="color: hsl(0, 50%, 50%)">x</span>')).toEqual({ color: '#bf4040' });
        expect(parse('<span style="color: Red">x</span>')).toEqual({ color: '#ff0000' });
        for (const color of ['rgb(1, 2, 3) url(x)', 'inherit', 'GrayText', 'banana']) {
            expect(parse(`<span style="color: ${color}">x</span>`)).toBeNull();
        }
        expect(parse('<span>x</span>')).toBeNull();
    });

    it('drops opaque black in any form, and keeps translucent black and other colours', () => {
        for (const color of ['black', '#000', '#000000ff', 'rgb(0 0 0)', 'hsl(0, 0%, 0%)', 'WindowText']) {
            expect(parse(`<span style="color: ${color}">x</span>`)).toBeNull();
        }
        expect(parse('<span style="color: rgba(0, 0, 0, 0.5)">x</span>')).toEqual({ color: '#00000080' });
        expect(parse('<span style="color: blue">x</span>')).toEqual({ color: '#0000ff' });
        expect(parse('<span style="color: lime">x</span>')).toEqual({ color: '#00ff00' });
    });
});
