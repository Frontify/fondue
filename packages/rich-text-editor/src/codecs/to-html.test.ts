/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';

import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

import { doc, envelope, mark, node, paragraph, text } from '#/features/__fixtures__/documents';
import { core } from '#/features/core/feature';
import { compileContentModel, defineFeature, type JsonValue, type RichTextDocument } from '#/model';

import { fixturesIn } from '../../fixtures/reader/helpers';
import { semanticModel } from '../../fixtures/reader/semantic';

import { createCodecs } from './codecs';

const requires = [{ id: 'core', version: 1 }];
// A link that writes `target`, as SPEC-rich-text-references/AC-018 asks of a new-window link.
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
    JSON.parse(readFileSync(new URL('../../fixtures/security/urls.json', import.meta.url), 'utf8')) as {
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
    it.each(hostileDocuments)(
        'SPEC-rich-text-output/AC-017 writes %s as markup that DOMPurify leaves unchanged',
        (_, hostile) => {
            const { html } = codecs.toHTML(hostile);

            expect(html).not.toBe('');
            expect(DOMPurify.sanitize(html, { ADD_ATTR: ['target'] })).toBe(serialized(html));
            expect(html.toLowerCase()).not.toContain('javascript:');
            expect(html).not.toContain('<script');
        },
    );

    it('SPEC-rich-text-output/AC-017 keeps target on a new-window link, which DOMPurify drops without ADD_ATTR', () => {
        const { html } = codecs.toHTML(hostileDocuments[2]?.[1] as RichTextDocument);

        expect(html).toContain('target="_blank"');
        expect(DOMPurify.sanitize(html)).not.toContain('target=');
    });

    it.each(fixturesIn('valid'))(
        'SPEC-rich-text-output/AC-017 writes the valid fixture %s as markup DOMPurify leaves unchanged',
        (_, fixture) => {
            const { html } = createCodecs(semanticModel()).toHTML(fixture as RichTextDocument);

            expect(DOMPurify.sanitize(html, { ADD_ATTR: ['target'] })).toBe(serialized(html));
        },
    );
});
