/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { type SharedAttribute } from './compile';
import { type HtmlSpec } from './declarations';
import { islandText, renderSpaces, resolveHtmlSpec } from './html-spec';

const heading: HtmlSpec = [
    { attr: 'level', tags: { 1: 'h1', 2: 'h2' } },
    { lang: { attr: 'lang' }, 'data-tone': { option: 'tone' }, title: 'Fixed' },
    0,
];

describe('resolveHtmlSpec', () => {
    it('SPEC-rich-text-output/AC-003 picks the tag from an attribute and reads attributes, options and literals', () => {
        expect(resolveHtmlSpec(heading, { level: 2, lang: 'de' }, { tone: 'warm' })).toEqual({
            layers: [{ tag: 'h2', attrs: { lang: 'de', 'data-tone': 'warm', title: 'Fixed' } }],
            content: true,
        });
    });

    it('SPEC-rich-text-output/AC-003 writes no attribute for a null value and a span for a tag that no value picks', () => {
        expect(resolveHtmlSpec(heading, { level: 9, lang: null }, {})).toEqual({
            layers: [{ tag: 'span', attrs: { title: 'Fixed' } }],
            content: true,
        });
    });

    it('SPEC-rich-text-output/AC-003 nests elements and writes numbers, booleans and lists as text', () => {
        const spec: HtmlSpec = [
            'pre',
            ['code', { 'data-n': { attr: 'n' }, 'data-b': { attr: 'b' }, 'data-l': { attr: 'l' } }, 0],
        ];

        expect(resolveHtmlSpec(spec, { n: 3, b: true, l: [1, 2] }, {})).toEqual({
            layers: [
                { tag: 'pre', attrs: {} },
                { tag: 'code', attrs: { 'data-n': '3', 'data-b': 'true', 'data-l': '[1,2]' } },
            ],
            content: true,
        });
    });

    it('SPEC-rich-text-output/AC-003 marks a spec with no content hole as a leaf', () => {
        expect(resolveHtmlSpec(['hr'], {}, {})).toEqual({ layers: [{ tag: 'hr', attrs: {} }], content: false });
        expect(resolveHtmlSpec(['img', { alt: { attr: 'alt' } }], { alt: 'A' }, {}).content).toBe(false);
    });

    it('SPEC-rich-text/AC-073 keeps a checked URL and drops a URL attribute that fails checkHref', () => {
        const spec: HtmlSpec = [
            'a',
            { href: { attr: 'href' }, 'xlink:href': { attr: 'href' }, title: { attr: 'href' } },
            0,
        ];

        expect(resolveHtmlSpec(spec, { href: ' https://frontify.com ' }, {}).layers[0]?.attrs).toEqual({
            href: 'https://frontify.com',
            'xlink:href': 'https://frontify.com',
            title: ' https://frontify.com ',
        });
        expect(resolveHtmlSpec(spec, { href: 'javascript:alert(1)' }, {}).layers[0]?.attrs).toEqual({
            title: 'javascript:alert(1)',
        });
    });

    it('SPEC-rich-text/AC-071 drops a URL attribute under its React prop name, whatever its case', () => {
        const spec: HtmlSpec = [
            'a',
            { xlinkHref: { attr: 'u' }, srcDoc: { attr: 'u' }, formAction: { attr: 'u' }, srcSet: { attr: 'u' } },
            0,
        ];

        expect(resolveHtmlSpec(spec, { u: 'javascript:alert(1)' }, {}).layers[0]?.attrs).toEqual({});
        expect(resolveHtmlSpec(spec, { u: '/brand' }, {}).layers[0]?.attrs).toEqual({
            xlinkHref: '/brand',
            srcDoc: '/brand',
            formAction: '/brand',
            srcSet: '/brand',
        });
    });

    it('SPEC-rich-text-output/AC-003 writes a style binding only when the stored value is plain CSS', () => {
        const spec: HtmlSpec = ['p', { style: { attr: 'css' } }, 0];

        expect(resolveHtmlSpec(spec, { css: 'red; background: url(x)' }, {}).layers[0]?.attrs).toEqual({});
        expect(resolveHtmlSpec(spec, { css: 'red' }, {}).layers[0]?.attrs).toEqual({ style: 'red' });

        const upper: HtmlSpec = ['p', { STYLE: { attr: 'css' } }, 0];

        expect(resolveHtmlSpec(upper, { css: 'red; background: url(x)' }, {}).layers[0]?.attrs).toEqual({});
        expect(resolveHtmlSpec(upper, { css: 'red' }, {}).layers[0]?.attrs).toEqual({ STYLE: 'red' });
    });

    it('SPEC-rich-text-output/AC-018 writes a shared attribute as an HTML attribute or a plain CSS declaration only', () => {
        const shared: readonly SharedAttribute[] = [
            {
                name: 'dir',
                featureId: 'a',
                declaration: { on: ['paragraph'], value: { type: 'string', default: null }, html: { attr: 'dir' } },
            },
            {
                name: 'align',
                featureId: 'b',
                declaration: {
                    on: ['paragraph'],
                    value: { type: 'string', default: null },
                    html: { style: 'text-align' },
                },
            },
            {
                name: 'size',
                featureId: 'c',
                declaration: {
                    on: ['paragraph'],
                    value: { type: 'string', default: null },
                    html: { style: 'font-size' },
                },
            },
            {
                name: 'plain',
                featureId: 'd',
                declaration: { on: ['paragraph'], value: { type: 'string', default: null } },
            },
        ];

        expect(
            resolveHtmlSpec(
                ['p', 0],
                { dir: 'rtl', align: 'right', size: 'red; background: url(x)', plain: 'x' },
                {},
                shared,
            ).layers[0]?.attrs,
        ).toEqual({ dir: 'rtl', style: 'text-align: right;' });
        expect(resolveHtmlSpec(['p', 0], { dir: null, align: null }, {}, shared).layers[0]?.attrs).toEqual({});
    });
});

describe('renderSpaces', () => {
    it('SPEC-rich-text-output/AC-046 alternates U+0020 and U+00A0 from a space in each run of spaces', () => {
        expect(renderSpaces('a b')).toBe('a b');
        expect(renderSpaces('a  b')).toBe('a  b');
        expect(renderSpaces('a   b')).toBe('a   b');
        expect(renderSpaces('a     b')).toBe('a     b');
        expect(renderSpaces('  a  ')).toBe('  a  ');
        expect(renderSpaces('a\tb\n c')).toBe('a\tb\n c');
    });
});

describe('islandText', () => {
    it('SPEC-rich-text-format/AC-042 reads the text of each text object at a node position, in document order', () => {
        const original = {
            type: 'callout',
            text: 'own',
            content: [
                {
                    type: 'paragraph',
                    content: [
                        { type: 'text', text: 'one ' },
                        { type: 'emoji', content: [{ type: 'text', text: 'two' }] },
                    ],
                },
                { type: 'text', text: ' three' },
            ],
        };

        expect(islandText(original)).toBe('one two three');
        expect(islandText({ type: 'text', text: 'self' })).toBe('self');
    });

    it('SPEC-rich-text-format/AC-042 reads no text from a value that is no node, an attribute or a non-string text', () => {
        expect(islandText(5)).toBe('');
        expect(islandText(null)).toBe('');
        expect(islandText([{ type: 'text', text: 'array' }])).toBe('');
        expect(
            islandText({ type: 'x', attrs: { type: 'text', text: 'attr' }, content: [5, { type: 'text', text: 7 }] }),
        ).toBe('');
    });
});
