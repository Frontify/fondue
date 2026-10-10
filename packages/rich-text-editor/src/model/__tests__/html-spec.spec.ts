/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { type SharedAttribute } from '../compile';
import { type HtmlSpec } from '../declarations';
import { islandText, renderSpaces, resolveHtmlSpec } from '../html-spec';

const heading: HtmlSpec = [
    { attr: 'level', tags: { 1: 'h1', 2: 'h2' } },
    { lang: { attr: 'lang' }, 'data-tone': { option: 'tone' }, title: 'Fixed' },
    0,
];

describe('resolveHtmlSpec', () => {
    it('picks the tag from an attribute and reads attributes, options and literals', () => {
        expect(resolveHtmlSpec(heading, { level: 2, lang: 'de' }, { tone: 'warm' })).toEqual({
            layers: [{ tag: 'h2', attrs: { lang: 'de', 'data-tone': 'warm', title: 'Fixed' } }],
            content: true,
        });
    });

    it('writes no attribute for a null value and a span for a tag that no value picks', () => {
        expect(resolveHtmlSpec(heading, { level: 9, lang: null }, {})).toEqual({
            layers: [{ tag: 'span', attrs: { title: 'Fixed' } }],
            content: true,
        });
    });

    it('nests elements and writes numbers, booleans and lists as text', () => {
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

    it('marks a spec with no content hole as a leaf', () => {
        expect(resolveHtmlSpec(['hr'], {}, {})).toEqual({ layers: [{ tag: 'hr', attrs: {} }], content: false });
        expect(resolveHtmlSpec(['img', { alt: { attr: 'alt' } }], { alt: 'A' }, {}).content).toBe(false);
    });

    it('keeps a checked URL and drops a URL attribute that fails checkHref', () => {
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

    it('drops a URL attribute under its React prop name, whatever its case', () => {
        const spec: HtmlSpec = [
            'a',
            { xlinkHref: { attr: 'u' }, srcDoc: { attr: 'u' }, formAction: { attr: 'u' }, srcSet: { attr: 'u' } },
            0,
        ];

        expect(resolveHtmlSpec(spec, { u: 'javascript:alert(1)' }, {}).layers[0]?.attrs).toEqual({});
        expect(resolveHtmlSpec(spec, { u: '/brand' }, {}).layers[0]?.attrs).toEqual({
            xlinkHref: '/brand',
            formAction: '/brand',
            srcSet: '/brand',
        });
    });

    it('never writes a stored value to srcdoc, whatever its case, a check or a binding', () => {
        const markup = '<script>parent.alert(1)</script>';
        for (const name of ['srcdoc', 'SRCDOC', 'srcDoc']) {
            expect(resolveHtmlSpec(['iframe', { [name]: { attr: 'u' } }], { u: markup }, {}).layers[0]?.attrs).toEqual(
                {},
            );
            expect(
                resolveHtmlSpec(['iframe', { [name]: { attr: 'u' } }], { u: '/brand' }, {}).layers[0]?.attrs,
            ).toEqual({});
            expect(
                resolveHtmlSpec(['iframe', { [name]: { option: 'o' } }], {}, { o: '/brand' }).layers[0]?.attrs,
            ).toEqual({});
        }
        expect(resolveHtmlSpec(['iframe', { srcdoc: '/brand' }], {}, {}).layers[0]?.attrs).toEqual({});
        const shared: readonly SharedAttribute[] = [
            {
                name: 'u',
                featureId: 'a',
                declaration: { on: ['iframe'], value: { type: 'url', default: null }, html: { attr: 'srcdoc' } },
            },
        ];

        expect(resolveHtmlSpec(['iframe', 0], { u: '/brand' }, {}, shared).layers[0]?.attrs).toEqual({});
    });

    it('keeps a literal STYLE of any case together with a shared style declaration', () => {
        const shared: readonly SharedAttribute[] = [
            {
                name: 'align',
                featureId: 'b',
                declaration: {
                    on: ['paragraph'],
                    value: { type: 'string', default: null },
                    html: { style: 'text-align' },
                },
            },
        ];
        for (const name of ['style', 'STYLE', 'Style']) {
            expect(
                resolveHtmlSpec(['p', { [name]: 'margin: 0' }, 0], { align: 'right' }, {}, shared).layers[0]?.attrs,
            ).toEqual({ style: 'margin: 0;text-align: right;' });
        }
    });

    it('writes a shared attribute as an HTML attribute or a plain CSS declaration only', () => {
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
    it('alternates U+0020 and U+00A0 from a space in each run of spaces', () => {
        expect(renderSpaces('a b')).toBe('a b');
        expect(renderSpaces('a  b')).toBe('a  b');
        expect(renderSpaces('a   b')).toBe('a   b');
        expect(renderSpaces('a     b')).toBe('a     b');
        expect(renderSpaces('  a  ')).toBe('  a  ');
        expect(renderSpaces('a\tb\n c')).toBe('a\tb\n c');
    });
});

describe('islandText', () => {
    it('reads the text of each text object at a node position, in document order', () => {
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

    it('reads no text from a value that is no node, an attribute or a non-string text', () => {
        expect(islandText(5)).toBe('');
        expect(islandText(null)).toBe('');
        expect(islandText([{ type: 'text', text: 'array' }])).toBe('');
        expect(
            islandText({ type: 'x', attrs: { type: 'text', text: 'attr' }, content: [5, { type: 'text', text: 7 }] }),
        ).toBe('');
    });
});
