/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs/codecs';
import { RichTextReader } from '#/entries/reader';
import { type PresentationStyle } from '#/index';
import { deDE } from '#/locales/de-DE';
import {
    compileContentModel,
    type ContentNodeJSON,
    decodeDocument,
    type RichTextDocument,
    type RichTextSlice,
} from '#/model';
import urls from '#/model/__tests__/fixtures/urls.json';
import { bold } from '#/plugins/Bold/feature';
import { brandStyles } from '#/plugins/BrandStyles/feature';
import { core } from '#/plugins/Core/feature';
import { heading } from '#/plugins/Heading/feature';
import { link } from '#/plugins/Link/feature';
import { quote } from '#/plugins/Quote/feature';
import { mountText, para, storedIn, text } from '#/react/__tests__/fixtures/text';
import { paste, setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

/** The runs of the first block of `document`. */
const contentOf = (document: RichTextDocument) => {
    const blocks = document.content.content;
    const first = blocks?.[0];

    return first?.content;
};

type UrlFixture = {
    input: string;
    ok: boolean;
    href?: string;
};
const URLS = urls as readonly UrlFixture[];

const model = compileContentModel([core(), bold(), link()], { id: 'test.links', version: 1 });
const codecs = createCodecs(model);
const linkMark = (href: string, extra: Readonly<Record<string, unknown>> = {}) => ({
    type: 'link',
    attrs: { href, openInNewWindow: false, styleId: null, ...extra },
});
const linked = (value: string, href: string, extra: Readonly<Record<string, unknown>> = {}): ContentNodeJSON =>
    ({ type: 'text', text: value, marks: [linkMark(href, extra)] }) as ContentNodeJSON;
const documentOf = (...content: readonly ContentNodeJSON[]): RichTextDocument => storedIn(model, [para(...content)]);
const reader = (document: RichTextDocument, props: Readonly<Record<string, unknown>> = {}) =>
    renderToStaticMarkup(createElement(RichTextReader, { model, document, ...props }));
const marksOf = (document: RichTextDocument) =>
    (document.content.content?.[0]?.content ?? []).flatMap((node) => node.marks ?? []);

describe('link output', () => {
    it('writes a new-window link with target and rel, and says it opens a new window only in the reader', () => {
        const document = documentOf(
            text('See '),
            linked('the guide', 'https://frontify.com', { openInNewWindow: true }),
        );

        const markup = reader(document);
        const { html } = codecs.toHTML(document);

        expect(markup).toMatchInlineSnapshot(
            `"<div class="fondue-rte-content"><p dir="auto">See <a href="https://frontify.com" rel="noopener noreferrer" target="_blank">the guide<span style="position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap" data-rte-hidden-text=""> (opens in a new window)</span></a></p></div>"`,
        );
        expect(html).toMatchInlineSnapshot(
            `"<div class="fondue-rte-content"><p dir="auto">See <a href="https://frontify.com" rel="noopener noreferrer" target="_blank">the guide</a></p></div>"`,
        );
        expect(reader(document, { locale: deDE })).toContain('(öffnet in einem neuen Fenster)');
    });

    it('writes a link without openInNewWindow with no target in the reader and the HTML codec', () => {
        const document = documentOf(linked('the guide', 'https://frontify.com'));

        expect(reader(document)).not.toContain('target=');
        expect(codecs.toHTML(document).html).not.toContain('target=');
    });

    it('writes a styled link with its recipe class, reads its data-rte-style back into styleId on paste, and its target into openInNewWindow', () => {
        const styles: PresentationStyle[] = [
            {
                id: 'brand.button',
                label: 'Button',
                appliesTo: ['link'],
                deprecated: false,
                recipe: { backgroundColor: '#123456' },
            },
        ];
        const styled = compileContentModel([core(), heading(), quote(), link(), brandStyles()], {
            id: 'test.links',
            version: 1,
        });
        const stored = storedIn(styled, [
            para(linked('start', 'https://frontify.com', { styleId: 'brand.button', openInNewWindow: true })),
        ]);
        const { html } = createCodecs(styled).toHTML(stored, { inlineStyles: styles });
        expect(html).toContain('data-rte-style="brand.button"');

        const { handle } = mountText({ model: styled, blocks: [para(text('x'))] });
        setSelection(handle, { text: 'x' });
        act(() => {
            paste(handle, { html });
        });

        expect(marksOf(handle.getSnapshot().document)).toEqual([
            linkMark('https://frontify.com', { styleId: 'brand.button', openInNewWindow: true }),
        ]);
    });
});

describe('the URL check at every boundary', () => {
    it.each(URLS)('decodes, renders and writes a stored link to $input by the same verdict', ({ input, ok, href }) => {
        const result = decodeDocument(documentOf(linked('go', input)), model);
        expect(result.diagnostics.some(({ code }) => code === 'format.unsafe-url')).toBe(!ok);

        const markup = reader(documentOf(linked('go', input)));
        const { html } = codecs.toHTML(documentOf(linked('go', input)));
        const { markdown } = codecs.toMarkdown(documentOf(linked('go', input)));
        const { text: plain } = codecs.toPlainText(documentOf(linked('go', input)));
        for (const output of [markup, html, markdown]) {
            expect(output.toLowerCase()).not.toContain('javascript:');
        }

        if (ok) {
            expect(plain).toBe(`go (${href ?? ''})`);
            const escaped = (href ?? '').replaceAll('&', '&amp;');
            expect(markup).toContain(`<a href="${escaped}" rel="noopener">go</a>`);
            expect(html).toContain(`<a href="${escaped}" rel="noopener">go</a>`);
            expect(markdown).toContain('[go](');
        } else {
            expect(plain).toBe('go');
            expect(markup).not.toContain('<a');
            expect(html).not.toContain('<a');
            expect(markdown).not.toContain('](');
        }
    });

    it.each(URLS)('pastes an HTML link to $input by the same verdict', ({ input, ok, href }) => {
        const { handle } = mountText({ model, blocks: [para(text('x'))] });
        setSelection(handle, { text: 'x' });
        const anchor = document.createElement('a');
        anchor.setAttribute('href', input);
        anchor.textContent = 'go';
        act(() => {
            paste(handle, { html: anchor.outerHTML });
        });

        const marks = marksOf(handle.getSnapshot().document);
        expect(marks).toEqual(ok ? [linkMark(href ?? '')] : []);
    });

    // A Markdown destination holds no whitespace or control character, so those inputs cannot reach this boundary.
    it.each(URLS.filter(({ input }) => !/[\s\u0000-\u001F]/.test(input)))(
        'imports a Markdown link to $input by the same verdict',
        ({ input, ok }) => {
            const result = codecs.fromMarkdown(`[go](<${input}>)`);
            if (result.status === 'blocked') {
                throw new Error('The Markdown did not import.');
            }

            const runs = contentOf(result.document) ?? [];
            expect(runs.some((run) => run.text === 'go' && (run.marks ?? []).some(({ type }) => type === 'link'))).toBe(
                ok,
            );
        },
    );
});

describe('Markdown import of links', () => {
    it('keeps inline HTML as text, turns a javascript: link into its text, and links https and www literals', () => {
        const result = codecs.fromMarkdown(
            'A <b>bold</b> [trap](javascript:alert(1)) https://example.com and www.example.com end',
        );
        if (result.status === 'blocked') {
            throw new Error('The Markdown did not import.');
        }

        expect(contentOf(result.document)).toEqual([
            text('A <b>bold</b> [trap](javascript:alert(1)) '),
            linked('https://example.com', 'https://example.com'),
            text(' and '),
            linked('www.example.com', 'http://www.example.com'),
            text(' end'),
        ]);
    });
});

describe('pasting a URL over a selection', () => {
    it('links the selected word to the pasted URL, keeping its text, in one undo step', () => {
        const { handle } = mountText({ model, blocks: [para(text('Read the guide'))] });
        setSelection(handle, { text: 'guide' });
        act(() => {
            paste(handle, { text: 'https://frontify.com' });
        });

        expect(contentOf(handle.getSnapshot().document)).toEqual([
            text('Read the '),
            linked('guide', 'https://frontify.com'),
        ]);
        act(() => {
            handle.execute('history.undo');
        });
        expect(contentOf(handle.getSnapshot().document)).toEqual([text('Read the guide')]);
    });
});

describe('the links policy where content enters', () => {
    const narrowed = compileContentModel([core(), bold(), link({ allowedHosts: ['*.frontify.com'] })], {
        id: 'test.links',
        version: 1,
    });
    const pasteInto = (input: Parameters<typeof paste>[1]) => {
        const { handle } = mountText({ model: narrowed, blocks: [para(text('word'))] });
        setSelection(handle, { text: 'word' });
        act(() => {
            paste(handle, input);
        });

        return contentOf(handle.getSnapshot().document);
    };

    it('pastes an HTML link outside allowedHosts as its text, and one inside it as a link', () => {
        expect(pasteInto({ html: '<a href="https://example.com">away</a>' })).toEqual([text('away')]);
        expect(pasteInto({ html: '<a href="https://brand.frontify.com">home</a>' })).toEqual([
            linked('home', 'https://brand.frontify.com'),
        ]);
    });

    it('pastes an internal slice link outside allowedHosts as its text, and one inside it as a link', () => {
        const slice = (...content: readonly ContentNodeJSON[]): RichTextSlice => ({
            format: 'frontify.rich-text-slice',
            formatVersion: 1,
            model: narrowed.ref,
            requiredCapabilities: narrowed.capabilities,
            context: null,
            openStart: 1,
            openEnd: 1,
            content: [para(...content)],
        });

        expect(pasteInto({ slice: slice(linked('away', 'https://example.com')) })).toEqual([text('away')]);
        expect(pasteInto({ slice: slice(linked('home', 'https://brand.frontify.com')) })).toEqual([
            linked('home', 'https://brand.frontify.com'),
        ]);
    });

    it('pastes a URL outside allowedHosts over a selection as text, not as a link over it', () => {
        expect(pasteInto({ text: 'https://example.com' })).toEqual([text('https://example.com')]);
        expect(pasteInto({ text: 'https://brand.frontify.com' })).toEqual([
            linked('word', 'https://brand.frontify.com'),
        ]);
    });

    it('imports Markdown links and literals outside allowedHosts as text', () => {
        const result = createCodecs(narrowed).fromMarkdown(
            '[away](https://example.com) https://example.com [home](https://brand.frontify.com)',
        );
        if (result.status === 'blocked') {
            throw new Error('The Markdown did not import.');
        }

        expect(contentOf(result.document)).toEqual([
            text('[away](https://example.com) https://example.com '),
            linked('home', 'https://brand.frontify.com'),
        ]);
    });
});

describe('Markdown literals the URL check refuses', () => {
    it.each(['see https://evil.com:secret@frontify.com now', '[go](https://evil.com:secret@frontify.com)'])(
        'links no part of %s',
        (markdown) => {
            const result = codecs.fromMarkdown(markdown);
            if (result.status === 'blocked') {
                throw new Error('The Markdown did not import.');
            }

            expect(JSON.stringify(result.document)).not.toContain('"type":"link"');
            expect(contentOf(result.document)).toEqual([text(markdown)]);
        },
    );
});
