/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';

import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

import { htmlFeatures, htmlModel } from '#/features/__fixtures__/html';
import { compileContentModel, featureFromManifest } from '#/model';
import { defineEditor } from '#/react/define';

import { fromHTML } from './index';

const { window } = new JSDOM('');
const model = htmlModel();
const fixtures = (folder: string) => new URL(`../../fixtures/${folder}/`, import.meta.url);
const read = (folder: string, name: string) => readFileSync(new URL(name, fixtures(folder)), 'utf8');
const htmlFixtures = (folder: string) => readdirSync(fixtures(folder)).filter((name) => name.endsWith('.html'));
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
    it.each(htmlFixtures('clipboard'))(
        'SPEC-rich-text-output/AC-043 SPEC-rich-text-clipboard/AC-014 converts the %s fixture to the document the CT paste wrote, ignoring nodeIds',
        (name) => {
            const pasted = JSON.parse(read('clipboard', name.replace(/\.html$/, '.paste.json'))) as unknown;

            expect(withoutNodeIds(contentOf(read('clipboard', name)))).toEqual(pasted);
        },
    );

    it('SPEC-rich-text-clipboard/AC-014 keeps the headings, marks, lists, link target, lang, dir and alt text of the Chromium capture', () => {
        const content = JSON.stringify(contentOf(read('clipboard', 'chromium-article.html')));

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

    it('SPEC-rich-text-output/AC-044 keeps every heading level, literal colour and justified text with no definition', () => {
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

    it('SPEC-rich-text-clipboard/AC-015 SPEC-rich-text-output/AC-043 applies the creatable heading levels and paste policy of a definition', () => {
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

    it('SPEC-rich-text-output/AC-043 gives each imported occurrence a nodeId from the ID source', () => {
        let next = 0;
        const ids = {
            next: () => {
                next += 1;
                return `id-${next}`;
            },
        };

        const content = contentOf('<h2>a</h2><h3>b</h3>', { ids });

        expect(content.map((block) => (block.attrs as { readonly nodeId: string }).nodeId)).toEqual(['id-1', 'id-2']);
    });
});

describe('external HTML', () => {
    it('SPEC-rich-text-clipboard/AC-041 turns an element whose required attribute passes maxAttributeLength into a paragraph of its text', () => {
        const slug = featureFromManifest(JSON.parse(read('manifest', 'acme-slug.json')));
        const slugModel = compileContentModel([...htmlFeatures(), slug()], { id: 'fixture.html', version: 1 });

        const result = fromHTML(`<div class="acme-slug" data-slug="${'s'.repeat(10_000)}">kept</div>`, slugModel, {
            window: window as unknown as Window,
        });

        expect(result.status).toBe('editable');
        expect(result.status === 'editable' && result.document.content.content).toEqual([
            paragraph({ type: 'text', text: 'kept' }),
        ]);
    });

    const expected: Readonly<Record<string, string>> = {
        'clobbering-body.html': 't',
        'clobbering-form.html': 'form kept|after',
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

    it('SPEC-rich-text-clipboard/AC-010 covers every file of the suite', () => {
        expect(htmlFixtures('security/html')).toEqual(Object.keys(expected));
    });

    it.each(htmlFixtures('security/html'))(
        'SPEC-rich-text-clipboard/AC-010 SPEC-rich-text-clipboard/AC-044 keeps only the text and modelled content of %s',
        (name) => {
            const content = contentOf(read('security/html', name));
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
        },
    );
});
