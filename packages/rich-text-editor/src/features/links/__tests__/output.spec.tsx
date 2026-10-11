/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs/codecs';
import { heading } from '#/features/blocks-heading/feature';
import { quote } from '#/features/blocks-quote/feature';
import { core } from '#/features/core/feature';
import { links } from '#/features/links/feature';
import { bold } from '#/features/marks-bold/feature';
import { brandStyles } from '#/features/styles-brand/feature';
import { type PresentationStyle } from '#/index';
import { deDE } from '#/locales/de-DE';
import { compileContentModel, type ContentNodeJSON, decodeDocument, type RichTextDocument } from '#/model';
import urls from '#/model/__tests__/fixtures/urls.json';
import { mountText, para, storedIn, text } from '#/react/__tests__/fixtures/text';
import { RichTextReader } from '#/reader';
import { setSelection } from '#/testing';

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
});

interface UrlFixture {
    readonly input: string;
    readonly ok: boolean;
    readonly href?: string;
}
const URLS = urls as readonly UrlFixture[];

const model = compileContentModel([core(), bold(), links()], { id: 'test.links', version: 1 });
const codecs = createCodecs(model);
const link = (href: string, extra: Readonly<Record<string, unknown>> = {}) => ({
    type: 'link',
    attrs: { href, openInNewWindow: false, styleId: null, ...extra },
});
const linked = (value: string, href: string, extra: Readonly<Record<string, unknown>> = {}): ContentNodeJSON =>
    ({ type: 'text', text: value, marks: [link(href, extra)] }) as ContentNodeJSON;
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
            `"<div class="fondue-rte-content"><p dir="auto">See <a href="https://frontify.com" target="_blank" rel="noopener noreferrer">the guide<span style="position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap" data-rte-hidden-text=""> (opens in a new window)</span></a></p></div>"`,
        );
        expect(html).toMatchInlineSnapshot(
            `"<div class="fondue-rte-content"><p dir="auto">See <a href="https://frontify.com" target="_blank" rel="noopener noreferrer">the guide</a></p></div>"`,
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
        const styled = compileContentModel([core(), heading(), quote(), links(), brandStyles()], {
            id: 'test.links',
            version: 1,
        });
        const stored = storedIn(styled, [
            para(linked('start', 'https://frontify.com', { styleId: 'brand.button', openInNewWindow: true })),
        ]);
        const { html } = createCodecs(styled).toHTML(stored, { inlineStyles: styles });
        expect(html).toContain('data-rte-style="brand.button"');

        const { handle, view } = mountText({ model: styled, blocks: [para(text('x'))] });
        setSelection(handle, { text: 'x' });
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/html', html);
        act(() => {
            view.dom.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
        });

        expect(marksOf(handle.getSnapshot().document)).toEqual([
            link('https://frontify.com', { styleId: 'brand.button', openInNewWindow: true }),
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
            expect(markup).toContain(`<a href="${escaped}">go</a>`);
            expect(html).toContain(`<a href="${escaped}">go</a>`);
            expect(markdown).toContain('[go](');
        } else {
            expect(plain).toBe('go');
            expect(markup).not.toContain('<a');
            expect(html).not.toContain('<a');
            expect(markdown).not.toContain('](');
        }
    });

    it.each(URLS)('pastes an HTML link to $input by the same verdict', ({ input, ok, href }) => {
        const { handle, view } = mountText({ model, blocks: [para(text('x'))] });
        setSelection(handle, { text: 'x' });
        const anchor = document.createElement('a');
        anchor.setAttribute('href', input);
        anchor.textContent = 'go';
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/html', anchor.outerHTML);
        act(() => {
            view.dom.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
        });

        const marks = marksOf(handle.getSnapshot().document);
        expect(marks).toEqual(ok ? [link(href ?? '')] : []);
    });

    // A Markdown destination holds no whitespace or control character, so those inputs cannot reach this boundary.
    it.each(URLS.filter(({ input }) => !/[\s\u0000-\u001F]/.test(input)))(
        'imports a Markdown link to $input by the same verdict',
        ({ input, ok }) => {
            const result = codecs.fromMarkdown(`[go](<${input}>)`);
            if (result.status === 'blocked') {
                throw new Error('The Markdown did not import.');
            }
            const runs = result.document.content.content?.[0]?.content ?? [];
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

        expect(result.document.content.content?.[0]?.content).toEqual([
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
        const { handle, view } = mountText({ model, blocks: [para(text('Read the guide'))] });
        setSelection(handle, { text: 'guide' });
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/plain', 'https://frontify.com');
        act(() => {
            view.dom.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
        });

        expect(handle.getSnapshot().document.content.content?.[0]?.content).toEqual([
            text('Read the '),
            linked('guide', 'https://frontify.com'),
        ]);
        act(() => {
            handle.execute('history.undo');
        });
        expect(handle.getSnapshot().document.content.content?.[0]?.content).toEqual([text('Read the guide')]);
    });
});
