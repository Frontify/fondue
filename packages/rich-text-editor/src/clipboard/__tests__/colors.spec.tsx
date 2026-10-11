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

import { hexColor } from '../import/colors';

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
    const clipboardData = new DataTransfer();
    clipboardData.setData('text/html', html);
    act(() => {
        mounted.view.dom.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
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
