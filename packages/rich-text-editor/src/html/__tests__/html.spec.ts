/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { readdirSync, readFileSync } from 'node:fs';

import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

import { createCodecs } from '#/codecs';
import { htmlFeatures, htmlModel } from '#/features/__tests__/fixtures/html';
import { spotlight } from '#/features/__tests__/fixtures/spotlight/feature';
import { core } from '#/features/core/feature';
import { compileContentModel, defineFeature, type RichTextDocument } from '#/model';
import { defineEditor } from '#/react/define';

import { fromHTML } from '../index';

const { window } = new JSDOM('');
const model = htmlModel();
const clipboardFixtures = new URL('./fixtures/clipboard/', import.meta.url);
const securityFixtures = new URL('./fixtures/security/', import.meta.url);
const readUrl = (url: URL) => readFileSync(url, 'utf8');
const htmlNames = (directory: URL) => readdirSync(directory).filter((name) => name.endsWith('.html'));
const pastedFixtures = [
    clipboardFixtures,
    new URL('../../clipboard/__tests__/fixtures/vendor/', import.meta.url),
    new URL('../../clipboard/__tests__/fixtures/colors/', import.meta.url),
].flatMap((directory) => htmlNames(directory).map((name) => [name, directory] as const));
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
    it.each(pastedFixtures)(
        'converts the %s fixture to the document the CT paste wrote, ignoring nodeIds',
        (name, directory) => {
            const pasted = JSON.parse(readUrl(new URL(name.replace(/\.html$/, '.paste.json'), directory))) as unknown;

            expect(withoutNodeIds(contentOf(readUrl(new URL(name, directory))))).toEqual(pasted);
        },
    );

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

    it('keeps the leading, trailing and double spaces of a block through toHTML, as fast-check seed 7 found them lost', () => {
        const blocks = [paragraph({ type: 'text', text: `  H K<'<" """2 ` }), paragraph({ type: 'text', text: 'a ' })];
        const document = {
            format: 'frontify.rich-text',
            formatVersion: 1,
            model: model.ref,
            requiredCapabilities: model.capabilities,
            content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
        };

        expect(contentOf(createCodecs(model).toHTML(document as unknown as RichTextDocument).html)).toEqual(blocks);
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

    it('reads a `b` or `strong` that sets a normal weight as no bold, as paste does', () => {
        const content = contentOf(
            '<p><b style="font-weight:normal">plain </b><strong style="font-weight:400;font-style:italic">slanted</strong></p>',
        );

        expect(withoutNodeIds(content)).toEqual([
            paragraph({ type: 'text', text: 'plain ' }, { type: 'text', text: 'slanted', marks: [{ type: 'italic' }] }),
        ]);
    });

    it('keeps a normal weight inside a bold element normal, as paste does', () => {
        const content = contentOf(
            '<p><strong>bold <span style="font-weight:400">normal</span></strong><span style="font-weight:700">heavy <span style="font-weight:normal">light</span></span></p>',
        );

        expect(withoutNodeIds(content)).toEqual([
            paragraph(
                { type: 'text', text: 'bold ', marks: [{ type: 'bold' }] },
                { type: 'text', text: 'normal' },
                { type: 'text', text: 'heavy ', marks: [{ type: 'bold' }] },
                { type: 'text', text: 'light' },
            ),
        ]);
    });

    it('reads the function parse rules a feature declares, as paste does', () => {
        const spotlit = compileContentModel([core(), spotlight()], { id: 'test.spotlight', version: 1 });

        const result = fromHTML('<p><mark>kept</mark> <mark data-search-hit="">found</mark></p>', spotlit, {
            window: window as unknown as Window,
        });
        if (result.status !== 'editable') {
            throw new Error(`fromHTML returned ${result.status}`);
        }

        expect(withoutNodeIds(result.document.content.content)).toEqual([
            {
                type: 'paragraph',
                attrs: { lang: null },
                content: [
                    { type: 'text', text: 'kept', marks: [{ type: 'fixture_spotlight' }] },
                    { type: 'text', text: ' found' },
                ],
            },
        ]);
    });
});

describe('external HTML', () => {
    it('turns an element whose required attribute passes maxAttributeLength into a paragraph of its text', () => {
        const slug = defineFeature({
            id: 'acme.slug',
            version: 1,
            requires: [{ id: 'core', version: 1 }],
            nodes: {
                acme_slug: {
                    group: 'block',
                    content: 'inline*',
                    attrs: { slug: { type: 'string', required: true } },
                    html: ['div', { class: 'acme-slug', 'data-slug': { attr: 'slug' } }, 0],
                    parse: [{ tag: 'div.acme-slug', attrs: { slug: { from: 'data-slug' } } }],
                },
            },
            formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
        });
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
        const html = '<p lang="en-x-abc">at</p><p lang="en-x-abcd">over</p>';
        const lang = (value: string | null, ...content: readonly object[]) => ({
            type: 'paragraph',
            attrs: { lang: value, align: null },
            content,
        });
        const plain = (value: string) => ({ type: 'text', text: value });

        expect(contentOf(html, { limits: { maxAttributeLength: 8 } })).toEqual([
            lang('en-x-abc', plain('at')),
            lang(null, plain('over')),
        ]);
        expect(contentOf(html)).toEqual([lang('en-x-abc', plain('at')), lang('en-x-abcd', plain('over'))]);
    });

    /** A Word list paragraph of list `list` at `level`, its marker in the `mso-list:Ignore` span Word writes. */
    const wordItem = (list: string, level: number, marker: string, value: string) =>
        `<p class="MsoListParagraph" style="margin-left:.5in;text-indent:-.25in;mso-list:${list} level${level} lfo1"><!--[if !supportLists]--><span style="font-family:Symbol"><span style="mso-list:Ignore">${marker}<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;</span></span></span><!--[endif]-->${value}<o:p></o:p></p>\n`;
    const item = (...content: readonly object[]) => ({ type: 'list_item', content });
    const bullets = (...items: readonly object[]) => ({ type: 'bullet_list', content: items });
    const numbers = (...items: readonly object[]) => ({ type: 'ordered_list', attrs: { start: 1 }, content: items });
    const plain = (value: string) => paragraph({ type: 'text', text: value });

    it('rebuilds Word list paragraphs as nested lists by list and level, ordered for numbered markers, without their markers', () => {
        const html = [
            '<div class="WordSection1">',
            wordItem('l0', 1, '1.', 'One'),
            wordItem('l0', 2, 'a.', 'One A'),
            wordItem('l0', 4, 'i.', 'One A i'),
            wordItem('l0', 1, '2.', 'Two'),
            wordItem('l1', 1, '·', 'Dot'),
            wordItem('l1', 2, 'o', 'Circle'),
            '<p class="MsoNormal">Between</p>',
            wordItem('l1', 1, '§', 'After'),
            '</div>',
        ].join('');

        expect(withoutNodeIds(contentOf(html))).toEqual([
            numbers(
                item(plain('One'), numbers(item(plain('One A'), numbers(item(plain('One A i')))))),
                item(plain('Two')),
            ),
            bullets(item(plain('Dot'), bullets(item(plain('Circle'))))),
            plain('Between'),
            bullets(item(plain('After'))),
        ]);
    });

    it('clamps the mso-list levels of Word list paragraphs so the nesting fits limits.maxDepth', () => {
        const html = [1, 2, 3, 4, 5, 2_000_000_000].map((level) => wordItem('l0', level, '·', `L${level}`)).join('');
        let deepest = 0;
        const visit = (node: { readonly content?: readonly object[] }, depth: number) => {
            deepest = Math.max(deepest, depth);
            for (const child of node.content ?? []) {
                visit(child, depth + 1);
            }
        };

        visit({ content: contentOf(html, { limits: { maxDepth: 9 } }) }, 1);

        expect(deepest).toBe(9);
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
