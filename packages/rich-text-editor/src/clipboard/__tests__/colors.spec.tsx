/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { deliveredProfiles } from '#/features/__tests__/fixtures/profiles';
import { mountStyled } from '#/features/__tests__/fixtures/style-editor';
import { styleModel } from '#/features/__tests__/fixtures/styles';
import { fontColor } from '#/features/marks-font-color/feature';
import { brandStyles } from '#/features/styles-brand/feature';
import { compileContentModel, type ContentModel, type ContentNodeJSON } from '#/model';
import { hexColor } from '#/model/colors';
import { paste } from '#/testing';

// A path, not a `URL`: happy-dom replaces the global `URL`, which rejects a `file:` URL.
const fixtures = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
const readFixture = (name: string) => readFileSync(join(fixtures, name), 'utf8');

const SOURCES = {
    word: readFixture('vendor/word-windows-paragraphs.html'),
    'google docs': readFixture('vendor/google-docs-chrome.html'),
    'web page': readFixture('colors/web-page.html'),
} as const;

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

/** The colour marks of the content, in document order, as `type value`. */
const colorsIn = (nodes: readonly ContentNodeJSON[], found: string[] = []): string[] => {
    for (const node of nodes) {
        for (const mark of node.marks ?? []) {
            if (mark.type === 'font_color' || mark.type === 'highlight') {
                found.push(`${mark.type} ${JSON.stringify(mark.attrs?.value)}`);
            }
        }
        colorsIn(node.content ?? [], found);
    }
    return found;
};

const pasteHtml = (model: ContentModel, html: string) => {
    const mounted = mountStyled({ model, blocks: [{ type: 'paragraph', attrs: { lang: null } }] });
    act(() => {
        paste(mounted.handle, { html });
    });
    const colors = colorsIn(mounted.handle.getSnapshot().document.content.content ?? []);
    const announced = mounted.container.querySelector('[aria-live="polite"]')?.textContent;
    mounted.unmount();
    return { colors, announced };
};

const profiles = (): Readonly<Record<string, ContentModel>> => {
    const delivered = deliveredProfiles();
    const lists = { ...delivered, brand: [...(delivered.document ?? []), fontColor(), brandStyles()] };
    return Object.fromEntries(
        Object.entries(lists).map(([name, features]) => [
            name,
            compileContentModel(features, { id: `test.${name}`, version: 1 }),
        ]),
    );
};

describe('pasted colours', () => {
    it('keeps red, rgb(), hsl(), #ABC, font color and background colours as lowercase hex marks with literalColors', () => {
        const { colors, announced } = pasteHtml(styleModel(true), SOURCES['web page']);

        expect(colors).toEqual([
            'font_color "#ff0000"',
            'font_color "#008000"',
            'font_color "#0000ff"',
            'font_color "#aabbcc"',
            'font_color "#ff8800"',
            'highlight "#ffff00"',
            'highlight "#ff000080"',
            'font_color "#c0392b"',
            'highlight "#ffff0080"',
        ]);
        expect(announced).toBe('');
    });

    it.each([
        ['a paragraph', '<p style="color:#ff0000">text</p>', ['font_color "#ff0000"']],
        ['a heading', '<h2 style="color:#0000ff">text</h2>', ['font_color "#0000ff"']],
        ['a bold run', '<p><b style="color:#ff0000">text</b></p>', ['font_color "#ff0000"']],
        ['a paragraph background', '<p style="background-color:#ffff00">text</p>', ['highlight "#ffff00"']],
        [
            'a paragraph with both',
            '<p style="color:#ff0000;background-color:#ffff00">text</p>',
            ['font_color "#ff0000"', 'highlight "#ffff00"'],
        ],
    ])('keeps the colour pasted on %s with literalColors', (_, html, expected) => {
        expect(pasteHtml(styleModel(true), html)).toEqual({ colors: expected, announced: '' });
    });

    it('announces removed formatting for a pasted colour in a variable, which it cannot keep as hex', () => {
        const html = '<p><span style="color:var(--brand)">text</span></p>';

        expect(pasteHtml(styleModel(true), html)).toEqual({ colors: [], announced: 'Some formatting was removed.' });
        expect(pasteHtml(styleModel(), html)).toEqual({ colors: [], announced: 'Some formatting was removed.' });
    });

    it.each(['transparent', 'inherit', 'initial', 'unset', 'currentcolor'])(
        'announces nothing for a pasted colour of %s, which paints no colour',
        (color) => {
            const html = `<p><span style="color:${color};background-color:${color}">text</span></p>`;

            expect(pasteHtml(styleModel(), html)).toEqual({ colors: [], announced: '' });
        },
    );

    it('drops opaque black on a block, the source default, and keeps black on a run as the author set it', () => {
        const html =
            '<p style="color: rgb(0, 0, 0)">Plain <b style="color:#000000">bold</b> <font color="#000">old</font></p>';

        expect(pasteHtml(styleModel(true), html)).toEqual({
            colors: ['font_color "#000000"', 'font_color "#000000"'],
            announced: '',
        });
        expect(pasteHtml(styleModel(), '<p style="color: rgb(0, 0, 0)">Plain</p>')).toEqual({
            colors: [],
            announced: '',
        });
    });

    it('keeps the font colour of an element with data-rte-style out of the colour marks, uncounted', () => {
        const html = '<p><font data-rte-style="brand.button" color="#ff0000">x</font></p>';

        expect(pasteHtml(styleModel(true), html)).toEqual({ colors: [], announced: '' });
    });

    it('announces nothing for the paint of a token colour, which its token keeps', () => {
        const html = '<p><span data-rte-color="brand.red" style="color:#d32f2f">red</span></p>';

        expect(pasteHtml(styleModel(), html).announced).toBe('');
    });

    it.each(Object.keys(SOURCES) as (keyof typeof SOURCES)[])(
        'keeps the colours of a %s paste as lowercase #rrggbb or #rrggbbaa with literalColors',
        (source) => {
            const { colors } = pasteHtml(styleModel(true), SOURCES[source]);

            expect(colors.length).toBeGreaterThan(0);
            expect(
                colors.filter((color) => !/^(font_color|highlight) "#[0-9a-f]{6}([0-9a-f]{2})?"$/.test(color)),
            ).toEqual([]);
        },
    );

    for (const [profile, model] of Object.entries(profiles())) {
        it.each(Object.keys(SOURCES) as (keyof typeof SOURCES)[])(
            `drops the colours of a %s paste into the ${profile} profile with the removed-formatting announcement`,
            (source) => {
                expect(pasteHtml(model, SOURCES[source])).toEqual({
                    colors: [],
                    announced: 'Some formatting was removed.',
                });
            },
        );
    }

    it('drops pasted colours into a model with token colours only, keeping the text', () => {
        const model = compileContentModel([...(deliveredProfiles().document ?? []), fontColor(), brandStyles()], {
            id: 'test.tokens',
            version: 1,
        });

        expect(pasteHtml(model, '<p><span style="color: red">red</span></p>').colors).toEqual([]);
    });

    it.each([
        ['red', '#ff0000'],
        ['RGB(0, 128, 0)', '#008000'],
        ['rgb(0 128 0 / 50%)', '#00800080'],
        ['rgba(255, 0, 0, 0.5)', '#ff000080'],
        ['hsl(240, 100%, 50%)', '#0000ff'],
        ['hsla(120deg 100% 25% / 0.5)', '#00800080'],
        ['#ABC', '#aabbcc'],
        ['#ABCD', '#aabbccdd'],
        ['#AABBCCFF', '#aabbcc'],
        ['transparent', '#00000000'],
        ['windowtext', undefined],
        ['inherit', undefined],
        ['var(--x)', undefined],
    ])('converts the pasted colour %s to %s', (text, hex) => {
        expect(hexColor(text)).toBe(hex);
    });
});
