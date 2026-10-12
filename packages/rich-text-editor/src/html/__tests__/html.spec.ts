/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readdirSync, readFileSync } from 'node:fs';

import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

import { htmlFeatures, htmlModel } from '#/features/__tests__/fixtures/html';
import { compileContentModel, featureFromManifest } from '#/model';
import { defineEditor } from '#/react/define';

import { fromHTML } from '../index';

const { window } = new JSDOM('');
const model = htmlModel();
const clipboardFixtures = new URL('./fixtures/clipboard/', import.meta.url);
const securityFixtures = new URL('./fixtures/security/', import.meta.url);
const manifestFixture = new URL('../../model/__tests__/fixtures/manifest/acme-slug.json', import.meta.url);
const readUrl = (url: URL) => readFileSync(url, 'utf8');
const htmlNames = (directory: URL) => readdirSync(directory).filter((name) => name.endsWith('.html'));
const withoutNodeIds = (value: unknown): unknown =>
    JSON.parse(JSON.stringify(value, (key, item: unknown) => (key === 'nodeId' ? undefined : item)));

/** The content of the document that `fromHTML` makes of `html`, which must decode as `editable`. */
const contentOf = (html: string, options: Omit<Parameters<typeof fromHTML>[2], 'window'> = {}) => {
    const result = fromHTML(html, model, { window: window as unknown as Window, ...options });
    if (result.status !== 'editable') {
        throw new Error(`fromHTML returned ${result.status}`);
    }
    return result.document.content.content ?? [];
};
const paragraph = (...content: readonly object[]) => ({
    type: 'paragraph',
    attrs: { lang: null, align: null },
    content,
});

describe('fromHTML', () => {
    it.each(htmlNames(clipboardFixtures))(
        'converts the %s fixture to the document the CT paste wrote, ignoring nodeIds',
        (name) => {
            const pasted = JSON.parse(
                readUrl(new URL(name.replace(/\.html$/, '.paste.json'), clipboardFixtures)),
            ) as unknown;

            expect(withoutNodeIds(contentOf(readUrl(new URL(name, clipboardFixtures))))).toEqual(pasted);
        },
    );

    it('keeps the headings, marks, lists, link target, lang, dir and alt text of the Chromium capture', () => {
        const content = JSON.stringify(contentOf(readUrl(new URL('chromium-article.html', clipboardFixtures))));

        for (const kept of [
            '"type":"heading","attrs":{"nodeId":',
            '"level":2',
            '"marks":[{"type":"bold"}]',
            '"marks":[{"type":"subscript"}]',
            '"type":"ordered_list","attrs":{"start":3}',
            '"type":"bullet_list"',
            '"type":"blockquote"',
            '"href":"https://www.frontify.com/","openInNewWindow":true',
            '{"type":"language","attrs":{"lang":"ar","dir":"rtl"}}',
            '"attrs":{"lang":"de","align":null},"content":[{"type":"text","text":"Ein Bild: Frontify logo"}]',
        ]) {
            expect(content).toContain(kept);
        }
    });

    it('keeps every heading level, literal colour and justified text with no definition', () => {
        const levels = [1, 2, 3, 4, 5, 6];
        const html = levels.map((level) => `<h${level} style="text-align: justify">H${level}</h${level}>`).join('');

        const content = contentOf(`${html}<p><span style="color: rgb(192, 57, 43)">red</span></p>`);

        expect(withoutNodeIds(content)).toEqual([
            ...levels.map((level) => ({
                type: 'heading',
                attrs: { level, lang: null, align: 'justify' },
                content: [{ type: 'text', text: `H${level}` }],
            })),
            paragraph({ type: 'text', text: 'red', marks: [{ type: 'font_color', attrs: { value: '#c0392b' } }] }),
        ]);
    });

    it('keeps the alpha of an rgba colour as the last pair of the hex value', () => {
        const content = contentOf('<p><span style="color: rgba(0, 0, 0, 0.5)">half</span></p>');

        expect(withoutNodeIds(content)).toEqual([
            paragraph({ type: 'text', text: 'half', marks: [{ type: 'font_color', attrs: { value: '#00000080' } }] }),
        ]);
    });

    it('applies the creatable heading levels and paste policy of a definition', () => {
        const definition = defineEditor({
            id: 'test.html',
            model,
            policy: {
                creatableHeadingLevels: [2, 3, 4],
                features: { 'fixture.html-link': { create: true, edit: true, remove: true, paste: false } },
            },
        });

        const content = contentOf('<h1>Title</h1><h6>Small</h6><p><a href="https://x.io"><b>linked</b></a></p>', {
            definition,
        });

        expect(withoutNodeIds(content)).toEqual([
            {
                type: 'heading',
                attrs: { level: 2, lang: null, align: null },
                content: [{ type: 'text', text: 'Title' }],
            },
            {
                type: 'heading',
                attrs: { level: 4, lang: null, align: null },
                content: [{ type: 'text', text: 'Small' }],
            },
            paragraph({ type: 'text', text: 'linked', marks: [{ type: 'bold' }] }),
        ]);
    });

    it('gives each imported occurrence a nodeId from generateId', () => {
        let next = 0;
        const generateId = () => {
            next += 1;
            return `id-${next}`;
        };

        const content = contentOf('<h2>a</h2><h3>b</h3>', { generateId });

        expect(content.map((block) => (block.attrs as { readonly nodeId: string }).nodeId)).toEqual(['id-1', 'id-2']);
    });
});

describe('external HTML', () => {
    it('turns an element whose required attribute passes maxAttributeLength into a paragraph of its text', () => {
        const slug = featureFromManifest(JSON.parse(readUrl(manifestFixture)));
        const slugModel = compileContentModel([...htmlFeatures(), slug()], { id: 'fixture.html', version: 1 });

        const result = fromHTML(`<div class="acme-slug" data-slug="${'s'.repeat(10_000)}">kept</div>`, slugModel, {
            window: window as unknown as Window,
        });

        expect(result.status).toBe('editable');
        expect(result.status === 'editable' && result.document.content.content).toEqual([
            paragraph({ type: 'text', text: 'kept' }),
        ]);
    });

    it('applies options.limits maxAttributeLength, keeps a value exactly at it, and the default limit when none is given', () => {
        const html = '<p lang="en-x-abc">at</p><p lang="en-x-abcd">over</p><p><span lang="en-x-abcd">mark</span></p>';
        const lang = (value: string | null, ...content: readonly object[]) => ({
            type: 'paragraph',
            attrs: { lang: value, align: null },
            content,
        });
        const plain = (value: string) => ({ type: 'text', text: value });

        expect(contentOf(html, { limits: { maxAttributeLength: 8 } })).toEqual([
            lang('en-x-abc', plain('at')),
            lang(null, plain('over')),
            lang(null, plain('mark')),
        ]);
        expect(contentOf(html)).toEqual([
            lang('en-x-abc', plain('at')),
            lang('en-x-abcd', plain('over')),
            lang(null, {
                type: 'text',
                text: 'mark',
                marks: [{ type: 'language', attrs: { lang: 'en-x-abcd', dir: null } }],
            }),
        ]);
    });

    it('turns the span of only U+00A0 that Chromium and WebKit write for a copied space back into a space', () => {
        const html =
            '<p>a<span class="Apple-converted-space">&nbsp;</span>b <span>&nbsp;</span>c</p><p>d<span style="color: red">&nbsp;</span>e</p>';

        expect(textOf(contentOf(html))).toBe('a b cd\u00A0e');
    });

    const expected: Readonly<Record<string, string>> = {
        'clobbering-body.html': 't',
        'clobbering-create-element.html': 't',
        'clobbering-form.html': 'form kept|after',
        'clobbering-query-selector.html': 't',
        'event-handlers.html': 'Click here',
        'form.html': 'Go|form text',
        'id-class-style.html': 'Styled text',
        'iframe.html': 'a|b',
        'javascript-urls.html': 'js mixed encoded data',
        'math-mark.html': 'Before|m|After',
        'math.html': 'Before|pimath link|After',
        'object.html': 'fallback',
        'script-style.html': 'Kept',
        'svg-foreign-object.html': 'Before|fo|After',
        'svg-link.html': 'Before|x|After',
        'svg.html': 'Before|svg text svg link|After',
    };
    const MODELLED = new Set([
        'nodeId',
        'level',
        'lang',
        'dir',
        'align',
        'start',
        'href',
        'openInNewWindow',
        'styleId',
        'value',
    ]);
    const attributeNames = (value: unknown): string[] => {
        if (Array.isArray(value)) {
            return value.flatMap(attributeNames);
        }
        if (typeof value !== 'object' || value === null) {
            return [];
        }
        const { attrs, content, marks } = value as Record<string, unknown>;
        return [...Object.keys(attrs ?? {}), ...attributeNames(content), ...attributeNames(marks)];
    };
    const textOf = (content: readonly unknown[]): string =>
        content
            .map((block) => {
                const { text, content: children = [] } = block as {
                    readonly text?: string;
                    readonly content?: readonly unknown[];
                };
                if (text !== undefined) {
                    return text;
                }
                return textOf(children);
            })
            .join('');

    it('covers every file of the suite', () => {
        expect([...htmlNames(securityFixtures)].sort()).toEqual(Object.keys(expected).sort());
    });

    it.each(htmlNames(securityFixtures))('keeps only the text and modelled content of %s', (name) => {
        const content = contentOf(readUrl(new URL(name, securityFixtures)));
        const json = JSON.stringify(content);

        expect(content.map((block) => textOf([block])).join('|')).toBe(expected[name]);
        expect(json).not.toMatch(/alert|javascript|evil\.test|url\(|position|"(id|class|style|on\w+)"/i);
        expect(new Set(attributeNames(content))).toEqual(
            new Set(attributeNames(content).filter((key) => MODELLED.has(key))),
        );
        // SVG and MathML keep their text only, since the engine's tag rules match their elements by name.
        if (/^(svg|math)/.test(name)) {
            expect(content.map(({ type }) => type)).toEqual(['paragraph', 'paragraph', 'paragraph']);
            expect(json).not.toContain('"marks"');
        }
    });
});
