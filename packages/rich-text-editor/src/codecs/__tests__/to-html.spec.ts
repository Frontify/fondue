/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readFileSync } from 'node:fs';

import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

import {
    bulletList,
    doc,
    envelope,
    listItem,
    mark,
    node,
    paragraph,
    text,
} from '#/features/__tests__/fixtures/documents';
import { core } from '#/features/core/feature';
import { compileContentModel, defineFeature, type JsonValue, type RichTextDocument } from '#/model';

import { semanticModel } from '../../reader/__tests__/fixtures/semantic';
import { fixturesIn } from '../../reader/__tests__/helpers/helpers';
import { createCodecs } from '../codecs';

const requires = [{ id: 'core', version: 1 }];
// A link that writes `target` on a new-window link.
const hostileFeatures = defineFeature({
    id: 'test.hostile',
    version: 1,
    requires,
    nodes: {
        note: {
            group: 'block',
            content: 'inline*',
            attrs: { label: { type: 'string', default: '' }, source: { type: 'url', nullable: true, default: null } },
            html: ['aside', { title: { attr: 'label' }, 'data-label': { attr: 'label' }, cite: { attr: 'source' } }, 0],
            parse: [],
        },
        frame: { group: 'block', attrs: {}, html: ['div'], parse: [] },
    },
    marks: {
        link: {
            attrs: { href: { type: 'url', required: true }, openInNewWindow: { type: 'boolean', default: false } },
            html: ['a', { href: { attr: 'href' }, target: '_blank', rel: 'noopener noreferrer' }, 0],
            parse: [],
            rank: -2,
        },
    },
    formats: { html: 'lossless', text: 'unsupported', markdown: 'unsupported' },
    codecs: {
        html: {
            nodes: {
                // A code feature's override that returns markup a sanitizer would remove: it must not reach the output.
                frame: () => [
                    'div',
                    { srcdoc: '<script>alert(1)</script>', onclick: 'alert(1)', src: 'javascript:alert(1)' },
                ],
            },
        },
    },
});
const model = compileContentModel([core(), hostileFeatures()], { id: 'test.hostile', version: 1 });
const codecs = createCodecs(model);
const wrap = (...blocks: readonly JsonValue[]) =>
    ({
        ...(envelope(doc(...blocks), ['core', 'test.hostile']) as object),
        model: model.ref,
    }) as unknown as RichTextDocument;
const HOSTILE = '"><script>alert(1)</script><img src=x onerror=alert(1)>&amp;\'';
const urls = (
    JSON.parse(readFileSync(new URL('../../model/__tests__/fixtures/urls.json', import.meta.url), 'utf8')) as {
        readonly input: string;
    }[]
).map(({ input }) => input);
const linked = (href: string, openInNewWindow: boolean) => mark('link', { href, openInNewWindow });

const hostileDocuments: readonly (readonly [string, RichTextDocument])[] = [
    ['hostile text', wrap(paragraph(text(HOSTILE)))],
    ['hostile attribute values', wrap(node('note', { label: HOSTILE, source: 'javascript:alert(1)' }, text('a')))],
    ['an openInNewWindow link', wrap(paragraph(text('open', linked('https://frontify.com', true))))],
    ...urls.map(
        (url) => [`a link to ${JSON.stringify(url)}`, wrap(paragraph(text(HOSTILE, linked(url, false))))] as const,
    ),
    [
        'opaque islands holding markup and a javascript: URL',
        wrap(
            { type: 'widget', attrs: { href: 'javascript:alert(1)' }, content: [{ type: 'text', text: HOSTILE }] },
            paragraph({ type: 'chip', attrs: { onclick: 'alert(1)' }, content: [{ type: 'text', text: HOSTILE }] }),
        ),
    ],
    ['an override that returns srcdoc, an event handler and a javascript: URL', wrap(node('frame'))],
];

// jsdom, not happy-dom: under happy-dom DOMPurify keeps an iframe and drops the first element, so it proves nothing.
const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

/** The markup as the DOM serializes it, the form DOMPurify returns. */
const serialized = (html: string) => {
    const template = window.document.createElement('template');
    template.innerHTML = html;
    return template.innerHTML;
};

describe('toHTML hostile fixtures', () => {
    it.each(hostileDocuments)('writes %s as markup that DOMPurify leaves unchanged', (_, hostile) => {
        const { html } = codecs.toHTML(hostile);

        expect(html).not.toBe('');
        expect(DOMPurify.sanitize(html, { ADD_ATTR: ['target'] })).toBe(serialized(html));
        expect(html.toLowerCase()).not.toContain('javascript:');
        expect(html).not.toContain('<script');
    });

    it('keeps target on a new-window link, which DOMPurify drops without ADD_ATTR', () => {
        const { html } = codecs.toHTML(hostileDocuments[2]?.[1] as RichTextDocument);

        expect(html).toContain('target="_blank"');
        expect(DOMPurify.sanitize(html)).not.toContain('target=');
    });

    it.each(fixturesIn('valid'))('writes the valid fixture %s as markup DOMPurify leaves unchanged', (_, fixture) => {
        const { html } = createCodecs(semanticModel()).toHTML(fixture as RichTextDocument);

        expect(DOMPurify.sanitize(html, { ADD_ATTR: ['target'] })).toBe(serialized(html));
    });
});

describe('toHTML direction', () => {
    const directionModel = semanticModel();
    const directionCodecs = createCodecs(directionModel);
    const document = (...blocks: readonly JsonValue[]) =>
        envelope(doc(...blocks), [
            'core',
            'fixture.align',
            'fixture.blocks',
            'fixture.link',
            'fixture.lists',
            'fixture.marks',
        ]) as unknown as RichTextDocument;

    it('writes dir auto on a paragraph, a heading and a list item that store no dir, and on the list', () => {
        const { html } = directionCodecs.toHTML(
            document(
                paragraph(text('Plain')),
                node(
                    'heading',
                    { nodeId: 'h-1', level: 1, lang: null, styleId: null, align: null, indent: 0 },
                    text('Title'),
                ),
                bulletList(listItem(paragraph(text('Item')))),
            ),
        );

        expect(html).toBe(
            '<div><p dir="auto">Plain</p><h1 dir="auto">Title</h1><ul dir="auto"><li dir="auto"><p dir="auto">Item</p></li></ul></div>',
        );
    });

    it('writes no dir on a link or bold', () => {
        const { html } = directionCodecs.toHTML(
            document(
                paragraph(
                    text(
                        'Go',
                        mark('link', { href: 'https://frontify.com', openInNewWindow: false, styleId: null }),
                        mark('bold'),
                    ),
                ),
            ),
        );

        expect(html).toBe('<div><p dir="auto"><a href="https://frontify.com"><strong>Go</strong></a></p></div>');
    });

    it('writes dir auto when an html override returns a spec for a block', () => {
        const quoted = defineFeature({
            id: 'test.quote',
            version: 1,
            requires,
            nodes: {
                quote: { group: 'block', content: 'inline*', attrs: {}, html: ['blockquote', 0], parse: [] },
            },
            formats: { html: 'lossless', text: 'lossless', markdown: 'lossless' },
            codecs: { html: { nodes: { quote: () => ['q', { cite: 'https://frontify.com' }, 0] } } },
        });
        const model = compileContentModel([core(), quoted()], { id: 'test.quote', version: 1 });
        const { html } = createCodecs(model).toHTML({
            ...(envelope(doc(node('quote', undefined, text('Said'))), ['core', 'test.quote']) as object),
            model: model.ref,
        } as unknown as RichTextDocument);

        expect(html).toBe('<div><q cite="https://frontify.com" dir="auto">Said</q></div>');
    });
});
