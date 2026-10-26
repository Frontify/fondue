/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { act } from '@testing-library/react';
import { type Node as EngineNode } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs';
import { blockquote, mark, node, paragraph, text } from '#/features/__tests__/fixtures/documents';
import { htmlFeatures, htmlLink } from '#/features/__tests__/fixtures/html';
import { quote } from '#/features/blocksQuote/feature';
import { core } from '#/features/core/feature';
import { language } from '#/features/marksLanguage/feature';
import { registry } from '#/features/registry';
import { fromHTML } from '#/html';
import {
    compileContentModel,
    type ContentModel,
    decodeDocument,
    defaultLimits,
    defineFeature,
    type JsonValue,
} from '#/model';
import { compiledModel } from '#/model/internal';
import { loadMarkdownReader } from '#/runtime/clipboard/markdown';
import { setSelection } from '#/testing';

import { NO_COLORS } from '../import/colors';
import { importHtml } from '../import/html';

import { model, ALLOW, type Options, mount, pasteInto, copyFrom, selectAll } from './fixtures/mount';

// Paste reads Markdown only after an editor's first idle moment, which these synchronous cases do not wait for.
beforeAll(loadMarkdownReader);

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('pasted HTML', () => {
    const htmlModel = compileContentModel(htmlFeatures(), { id: 'fixture.vocabulary', version: 1 });
    const block = (...content: readonly JsonValue[]) => node('paragraph', { lang: null, align: null }, ...content);
    /** An editor of the shipped text features and the HTML stand-ins, with the caret in an empty paragraph. */
    const mountHtml = (options: Options = {}) => mount({ editorModel: htmlModel, blocks: [block()], ...options });

    it('turns each U+00A0 after a space back into a space and keeps a lone U+00A0', () => {
        const mounted = mount({ blocks: [paragraph()] });

        pasteInto(mounted, { 'text/html': '<p>a &nbsp; &nbsp;b</p><p>a&nbsp;b</p>' });

        expect(mounted.content()).toEqual([paragraph(text('a    b')), paragraph(text('a\u00A0b'))]);
        mounted.unmount();
    });

    const preBlock = defineFeature({
        id: 'fixture.pre-block',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            code_block: {
                group: 'block',
                content: 'text*',
                marks: [],
                whitespace: 'pre',
                attrs: {},
                html: ['pre', 0],
                parse: [{ tag: 'pre' }],
            },
        },
    });
    it.each([
        [
            'a list item paragraph',
            '<ul><li>a &nbsp; &nbsp;b</li></ul>',
            [node('bullet_list', undefined, node('list_item', undefined, block(text('a    b'))))],
        ],
        [
            'a space and a U+00A0 split across marks',
            '<p>a <b>&nbsp;</b>x</p>',
            [block(text('a '), text(' ', mark('bold')), text('x'))],
        ],
        [
            'a code block that keeps its U+00A0',
            '<pre>a &nbsp; b</pre>',
            [{ type: 'code_block', content: [text('a \u00A0 b')] }],
        ],
    ] as const)('turns each U+00A0 after a space back into a space in %s', (_name, html, expected) => {
        const editorModel = compileContentModel([...htmlFeatures(), preBlock()], {
            id: 'fixture.vocabulary',
            version: 1,
        });
        const mounted = mount({ editorModel, blocks: [block()] });

        pasteInto(mounted, { 'text/html': html });

        expect(mounted.content()).toEqual(expected);
        mounted.unmount();
    });

    it('keeps the text of a pasted object and drops its embed, param and nested object', () => {
        const mounted = mount({ blocks: [paragraph()] });

        pasteInto(mounted, {
            'text/html':
                '<p>a</p><object data="x.swf"><param name="p" value="v">fallback <b>text</b><embed src="y"><object>no</object></object>',
        });

        expect(mounted.content()).toEqual([paragraph(text('a')), paragraph(text('fallback text'))]);
        mounted.unmount();
    });

    it('lets the parse rules of shipped features read only the listed attributes and styles', () => {
        const attributes = new Set([
            'href',
            'target',
            'start',
            'colspan',
            'rowspan',
            'scope',
            'dir',
            'lang',
            'checked',
            'data-checked',
            'data-language',
            'data-marker',
            'aria-checked',
            'color',
            'data-rte-color',
            'data-rte-style',
        ]);
        const styles = new Set([
            'text-align',
            'list-style-type',
            'font-weight',
            'font-style',
            'text-decoration',
            'vertical-align',
            'color',
            'background-color',
        ]);
        const shipped = compiledModel(
            compileContentModel(
                Object.values(registry).map((factory) => factory()),
                { id: 'test.shipped', version: 1 },
            ),
        );
        const read: string[] = [];
        for (const { parse } of [...shipped.nodes, ...shipped.marks].map(({ declaration }) => declaration)) {
            for (const rule of parse) {
                if ('style' in rule) {
                    read.push(`style:${rule.style}`);
                }

                for (const source of Object.values('tag' in rule ? (rule.attrs ?? {}) : {})) {
                    if ('from' in source) {
                        read.push(`attr:${source.from}`);
                    } else if ('fromStyle' in source) {
                        read.push(`style:${source.fromStyle}`);
                    }
                }
            }
        }

        for (const { parse } of shipped.nodes.flatMap(({ shared }) => shared.map(({ declaration }) => declaration))) {
            if (parse !== undefined && 'attr' in parse) {
                read.push(`attr:${parse.attr}`);
            } else if (parse !== undefined) {
                read.push(`style:${parse.style}`);
            }
        }

        expect(read.length).toBeGreaterThan(0);
        expect(
            read.filter((entry) => {
                const [kind, name] = entry.split(':') as [string, string];

                return !(kind === 'attr' ? attributes : styles).has(name);
            }),
        ).toEqual([]);
    });

    it('maps only the listed style properties to marks and stores no CSS text', () => {
        const mounted = mountHtml();

        pasteInto(mounted, {
            'text/html':
                '<p><span style="color:red;background:url(x);position:fixed">x</span> <span style="font-weight: bold; position: fixed">b</span></p>',
        });

        // The model keeps literal colours, so `red` becomes its hex value.
        expect(mounted.content()).toEqual([
            block(
                text('x', mark('font_color', { tokenId: null, value: '#ff0000' })),
                text(' '),
                text('b', mark('bold')),
            ),
        ]);
        expect(JSON.stringify(mounted.content())).not.toMatch(/red|url|fixed|style/);
        mounted.unmount();
    });

    it.each([
        ['h1 with levels 2 to 4 allowed', [2, 3, 4], '<h1>a</h1><h3>b</h3><h6>c</h6>', [2, 3, 4]],
        ['h2 with no level allowed', [], '<h2>a</h2>', []],
    ] as const)(
        'moves a pasted %s to the nearest allowed level, or makes it a paragraph',
        (_name, allowed, html, levels) => {
            const mounted = mountHtml({ policy: { creatableHeadingLevels: allowed } });

            pasteInto(mounted, { 'text/html': html });

            const content = mounted.content() as readonly { type: string; attrs: object }[];
            if (levels.length === 0) {
                expect(content).toEqual([block(text('a'))]);
            } else {
                expect(content.map(({ type, attrs }) => [type, (attrs as { level: number }).level])).toEqual(
                    levels.map((level) => ['heading', level]),
                );
            }

            mounted.unmount();
        },
    );

    it('pastes HTML with a link while links have paste: false as its text with no link mark', () => {
        const mounted = mountHtml({ policy: { features: { 'fixture.html-link': { ...ALLOW, paste: false } } } });

        pasteInto(mounted, { 'text/html': '<p><a href="https://frontify.com"><strong>linked</strong></a> text</p>' });

        expect(mounted.content()).toEqual([block(text('linked', mark('bold')), text(' text'))]);
        mounted.unmount();
    });

    it.each([
        ['maxDocumentNodes', 6, '<p>1</p><p>2</p><p>3</p><p>4</p>'],
        ['maxDepth', 4, '<blockquote><blockquote><blockquote><p>deep</p></blockquote></blockquote></blockquote>'],
    ] as const)('rejects pasted HTML over %s once inserted, with the state unchanged', (limit, value, html) => {
        const mounted = mountHtml({ limits: { [limit]: value } });
        const before = mounted.view.state;

        pasteInto(mounted, { 'text/html': html });

        expect(mounted.view.state.doc).toBe(before.doc);
        expect(mounted.view.state.selection.eq(before.selection)).toBe(true);
        expect(mounted.diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['clipboard.paste-rejected', { reason: limit }],
        ]);
        mounted.unmount();
    });

    /** A Word list paragraph, its bullet in the `mso-list:Ignore` span Word writes. */
    const wordItem = (level: number, value: string) =>
        `<p class="MsoListParagraph" style="margin-left:.5in;text-indent:-.25in;mso-list:l0 level${level} lfo1"><![if !supportLists]><span style="font-family:Symbol"><span style="mso-list:Ignore">·<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;</span></span></span><![endif]>${value}<o:p></o:p></p>`;
    /** The depth of the deepest node under `node`, as the resource limits count it. */
    const deepestOf = (node: EngineNode, depth = 1): number =>
        Math.max(depth, ...node.children.map((child) => deepestOf(child, depth + 1)));

    it.each([
        ['a top-level paragraph', [block()], 12],
        ['a paragraph in a blockquote', [blockquote(block())], 12],
        ['a top-level paragraph at the default limit', [block()], defaultLimits.maxDepth],
    ] as const)(
        'clamps the mso-list levels of pasted Word list paragraphs in %s so the nesting fits maxDepth',
        (_name, blocks, maxDepth) => {
            const mounted = mountHtml({ blocks, limits: { maxDepth } });
            act(() => {
                mounted.view.dispatch(mounted.view.state.tr.setSelection(Selection.atStart(mounted.view.state.doc)));
            });
            const levels = [...Array.from({ length: 40 }, (_, index) => index + 1), 2_000_000_000];
            const html = levels.map((level) => wordItem(level, `L${level}`)).join('');

            const started = performance.now();
            pasteInto(mounted, { 'text/html': html });
            const elapsed = performance.now() - started;

            const { doc } = mounted.view.state;
            expect(elapsed).toBeLessThan(100);
            expect(mounted.diagnostics).toEqual([]);
            expect(doc.textContent).toBe(levels.map((level) => `L${level}`).join(''));
            expect(deepestOf(doc)).toBeLessThanOrEqual(maxDepth);
            expect(deepestOf(doc)).toBeGreaterThanOrEqual(maxDepth - 1);
            mounted.unmount();
        },
    );

    it('pastes mention markup in HTML as its label text, dropping and announcing the images', () => {
        const mounted = mount({ blocks: [paragraph()] });

        pasteInto(mounted, {
            'text/html':
                '<p>Hi <span data-mention="u-1" data-resource-id="u-1">@Ada</span><img src="https://example.com/a.png" alt=""><img src="data:image/png;base64,iVBORw0KGgo=" alt="Logo"></p>',
        });

        expect(mounted.content()).toEqual([paragraph(text('Hi @AdaLogo'))]);
        expect(mounted.announced()).toBe('Media not pasted: 2');
        mounted.unmount();
    });

    it('reports an HTML parser that throws with codes only and changes nothing', () => {
        const mounted = mount();
        setSelection(mounted.handle, { text: 'a' });
        const before = mounted.view.state;
        vi.spyOn(DOMParser.prototype, 'parseFromString').mockImplementation(() => {
            throw new Error('Secret fixture text');
        });

        pasteInto(mounted, { 'text/html': '<p>Secret <b>fixture</b> text</p>', 'text/plain': 'Secret fixture text' });

        expect(mounted.view.state.doc).toBe(before.doc);
        expect(mounted.view.state.selection.eq(before.selection)).toBe(true);
        expect(mounted.diagnostics.map(({ code, details }) => [code, details])).toEqual([
            ['clipboard.paste-rejected', { reason: 'error' }],
        ]);
        expect(JSON.stringify(mounted.diagnostics)).not.toMatch(/Secret|fixture/);
        mounted.unmount();
    });

    it('pastes the copied text/html of a run of three spaces back as three spaces', () => {
        const source = mount({ blocks: [paragraph(text('a   b'))] });
        selectAll(source);
        const { html } = copyFrom(source);
        source.unmount();
        const target = mount({ blocks: [paragraph()] });

        pasteInto(target, { 'text/html': html });

        expect(html).toContain('a \u00A0 b');
        expect(target.content()).toEqual([paragraph(text('a   b'))]);
        target.unmount();
    });

    // A path, not a `URL`: happy-dom replaces the global `URL`, which rejects a `file:` URL.
    const here = dirname(fileURLToPath(import.meta.url));
    const valid = join(here, '..', '..', 'model', '__tests__', 'fixtures', 'model', 'valid');
    const security = join(here, '..', '..', 'html', '__tests__', 'fixtures', 'security');
    it.each(readdirSync(valid))(
        'parses the copied text/html and the toHTML output of %s to equal documents',
        (name) => {
            const stored = JSON.parse(readFileSync(join(valid, name), 'utf8')) as {
                content: { content: readonly JsonValue[] };
            };
            const mounted = mount({ blocks: stored.content.content });
            selectAll(mounted);
            const copied = copyFrom(mounted).html;
            const written = createCodecs(model).toHTML(mounted.handle.getSnapshot().document).html;
            const { schema } = mounted.view.state;
            const parsed = (html: string) =>
                schema.topNodeType.create(
                    null,
                    importHtml(html, schema, window, {
                        limits: defaultLimits,
                        headingLevels: undefined,
                        depth: 2,
                        colors: NO_COLORS,
                        rules: [],
                    }).content,
                );

            expect(parsed(copied).eq(parsed(written))).toBe(true);
            mounted.unmount();
        },
    );

    const withoutIds = (value: unknown): unknown =>
        JSON.parse(JSON.stringify(value, (property, item: unknown) => (property === 'nodeId' ? undefined : item)));
    /** What `fromHTML` makes of the copied text/html of `blocks` under `editorModel`, with the mounted source content. */
    const roundTrip = (editorModel: ContentModel, blocks: readonly JsonValue[]) => {
        const mounted = mount({ editorModel, blocks });
        selectAll(mounted);
        const { html } = copyFrom(mounted);
        const source = mounted.handle.getSnapshot().document.content.content;
        mounted.unmount();
        const result = fromHTML(html, editorModel, { window });
        expect(result.status).toBe('editable');

        return { imported: result.status === 'editable' && result.document.content.content, source };
    };

    it('converts the copied text/html of the spaces fixture with fromHTML to the mounted source document', () => {
        const stored = JSON.parse(readFileSync(join(valid, 'spaces.json'), 'utf8')) as {
            content: { content: readonly JsonValue[] };
        };

        const { imported, source } = roundTrip(model, stored.content.content);

        expect(imported).not.toEqual([]);
        expect(JSON.stringify(imported)).toContain('two  spaces and five     spaces');
        expect(withoutIds(imported)).toEqual(withoutIds(source));
    });

    it('converts the copied text/html of runs of spaces in marks, list items and code with fromHTML to the mounted source document', () => {
        const { imported, source } = roundTrip(htmlModel, [
            block(text('a   b'), text('  x', mark('bold')), text('y   z')),
            node('bullet_list', undefined, node('list_item', undefined, block(text('item   two')))),
        ]);

        expect(JSON.stringify(imported)).toContain('item   two');
        expect(withoutIds(imported)).toEqual(withoutIds(source));
    });

    it('pastes the toHTML output of a document with an island without its notice as text', () => {
        const source = mount({
            blocks: [paragraph(text('before')), { type: 'callout', content: [paragraph(text('Kept'))] } as JsonValue],
        });
        const html = createCodecs(model).toHTML(source.handle.getSnapshot().document).html;
        source.unmount();
        const found = /data-rte-message="islands"[^>]*>([^<]+)</.exec(html);
        const notice = String(found?.[1]);
        const target = mount({ blocks: [paragraph()] });

        pasteInto(target, { 'text/html': html });

        expect(found).not.toBeNull();
        expect(JSON.stringify(target.content())).toContain('before');
        expect(JSON.stringify(target.content())).not.toContain(notice);
        target.unmount();
    });

    it('replaces each attribute value decode would reject with its default, so the document still decodes as editable', () => {
        const long = `en-x-${'abcdefgh-'.repeat(1000)}abcdefgh`;
        const mounted = mountHtml();

        pasteInto(mounted, {
            'text/html': `<ol start="-1"><li>a</li></ol><p><span lang="fr" dir="x">b</span></p><p lang="${long}">c</p><p><a href="https://x.io/${'a'.repeat(9000)}">d</a></p>`,
        });

        expect(mounted.content()).toEqual([
            node('ordered_list', { start: 1 }, node('list_item', undefined, block(text('a')))),
            block(text('b', mark('language', { lang: 'fr', dir: null }))),
            block(text('c')),
            block(text('d')),
        ]);
        expect(decodeDocument(mounted.handle.getSnapshot().document, htmlModel).status).toBe('editable');
        mounted.unmount();
    });

    it('applies maxAttributeLength of the editor limits, keeps a value exactly at it, and the default limit when none is given', () => {
        const html = '<p lang="en-x-abc">at</p><p lang="en-x-abcd">over</p><p><span lang="en-x-abcd">mark</span></p>';
        const limited = mountHtml({ limits: { maxAttributeLength: 8 } });
        const unlimited = mountHtml();

        pasteInto(limited, { 'text/html': html });
        pasteInto(unlimited, { 'text/html': html });

        expect(limited.content()).toEqual([
            node('paragraph', { lang: 'en-x-abc', align: null }, text('at')),
            block(text('over')),
            block(text('mark')),
        ]);
        expect(unlimited.content()).toEqual([
            node('paragraph', { lang: 'en-x-abc', align: null }, text('at')),
            node('paragraph', { lang: 'en-x-abcd', align: null }, text('over')),
            block(text('mark', mark('language', { lang: 'en-x-abcd', dir: null }))),
        ]);
        limited.unmount();
        unlimited.unmount();
    });

    // happy-dom's parser drops what follows a `script` inside `svg`, so `svg.html` runs through `fromHTML` in jsdom only.
    it.each(['math-mark.html', 'math.html', 'svg-foreign-object.html', 'svg-link.html'])(
        'pastes the SVG or MathML of %s as its text only',
        (name) => {
            const mounted = mountHtml();

            pasteInto(mounted, { 'text/html': readFileSync(join(security, name), 'utf8') });

            const content = mounted.content() as readonly { type: string }[];
            expect(content.map(({ type }) => type)).toEqual(['paragraph', 'paragraph', 'paragraph']);
            expect(JSON.stringify(content)).not.toMatch(/"marks"|evil|javascript/);
            mounted.unmount();
        },
    );

    it('pastes an element whose required attribute passes maxAttributeLength as a paragraph of its text', () => {
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
        const editorModel = compileContentModel([...htmlFeatures(), slug()], { id: 'fixture.vocabulary', version: 1 });
        const mounted = mount({ editorModel, blocks: [block()] });

        pasteInto(mounted, { 'text/html': `<div class="acme-slug" data-slug="${'s'.repeat(10_000)}">kept</div>` });

        expect(mounted.content()).toEqual([block(text('kept'))]);
        expect(decodeDocument(mounted.handle.getSnapshot().document, editorModel).status).toBe('editable');
        mounted.unmount();
    });

    const bareLink = defineFeature({
        id: 'fixture.bare-link',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        marks: { plain_link: { attrs: {}, html: ['a', 0], parse: [{ tag: 'a' }], rank: -2 } },
    });
    const bareSpan = defineFeature({
        id: 'fixture.bare-span',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        marks: { plain_span: { attrs: {}, html: ['span', 0], parse: [{ tag: 'span' }] } },
    });
    it.each([
        ['a[href] after a bare a', [core(), bareLink(), htmlLink()], '<a href="https://x.io">x</a>', 'link'],
        ['a[href] before a bare a', [core(), htmlLink(), bareLink()], '<a href="https://x.io">x</a>', 'link'],
        ['span[lang] after a bare span', [core(), bareSpan(), language()], '<span lang="fr">x</span>', 'language'],
        ['span[lang] before a bare span', [core(), language(), bareSpan()], '<span lang="fr">x</span>', 'language'],
        ['a bare a after a[href], with no href', [core(), htmlLink(), bareLink()], '<a>x</a>', 'plain_link'],
        [
            'a bare span after span[lang], with no lang',
            [core(), language(), bareSpan()],
            '<span>x</span>',
            'plain_span',
        ],
    ] as const)(
        'takes a mark rule with an attribute selector over a bare tag in either model order, with %s',
        (_name, installed, html, type) => {
            const editorModel = compileContentModel(installed, { id: 'fixture.vocabulary', version: 1 });
            const mounted = mount({ editorModel, blocks: [{ type: 'paragraph', attrs: { lang: null } }] });

            pasteInto(mounted, { 'text/html': `<p>${html}</p>` });

            const paragraphs = mounted.content() as readonly {
                content: readonly { marks: readonly { type: string }[] }[];
            }[];
            expect(
                paragraphs.flatMap((child) => child.content.flatMap((run) => run.marks.map((entry) => entry.type))),
            ).toEqual([type]);
            mounted.unmount();
        },
    );

    const pullQuote = defineFeature({
        id: 'acme.pull-quote',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            acme_pull_quote: {
                group: 'block',
                content: 'inline*',
                attrs: { tone: { type: 'enum', values: ['neutral', 'brand'], default: 'neutral' } },
                html: ['blockquote', { class: 'acme-pull-quote', 'data-tone': { attr: 'tone' } }, 0],
                parse: [{ tag: 'blockquote.acme-pull-quote', attrs: { tone: { from: 'data-tone' } } }],
            },
        },
        formats: { html: 'lossless', text: 'lossy', markdown: 'unsupported' },
    });
    const aside = defineFeature({
        id: 'fixture.aside',
        version: 1,
        requires: [{ id: 'core', version: 1 }],
        nodes: {
            aside: { group: 'block', content: 'block+', attrs: {}, html: ['aside', 0], parse: [{ tag: 'blockquote' }] },
        },
    });
    it.each([
        [
            'blocks.quote first',
            [core(), quote(), pullQuote()],
            '<blockquote class="acme-pull-quote">x</blockquote>',
            'acme_pull_quote',
        ],
        [
            'the custom feature first',
            [core(), pullQuote(), quote()],
            '<blockquote class="acme-pull-quote">x</blockquote>',
            'acme_pull_quote',
        ],
        [
            'blocks.quote before a bare-tag rule',
            [core(), quote(), aside()],
            '<blockquote><p>x</p></blockquote>',
            'blockquote',
        ],
        [
            'a bare-tag rule before blocks.quote',
            [core(), aside(), quote()],
            '<blockquote><p>x</p></blockquote>',
            'aside',
        ],
    ] as const)('takes the more specific rule, then model order, with %s', (_name, installed, html, type) => {
        const editorModel = compileContentModel(installed, { id: 'fixture.vocabulary', version: 1 });
        const mounted = mount({ editorModel, blocks: [{ type: 'paragraph', attrs: { lang: null } }] });

        pasteInto(mounted, { 'text/html': html });

        expect((mounted.content() as readonly { type: string }[]).map((child) => child.type)).toEqual([type]);
        mounted.unmount();
    });
});
