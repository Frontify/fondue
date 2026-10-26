/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs/codecs';
import { RichTextReader } from '#/entries/reader';
import { withInjectedHref } from '#/features/__tests__/fixtures/inject';
import { core } from '#/features/core/feature';
import { links } from '#/features/links/feature';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import { type decodeToTree as RealDecode } from '#/model/internal';
import { mountText, para, storedIn, text } from '#/react/__tests__/fixtures/text';

const injected = vi.hoisted(() => ({ href: undefined as string | undefined }));

vi.mock('#/model/decode', async (importOriginal) => {
    const original = await importOriginal<{ readonly decodeToTree: typeof RealDecode }>();

    return {
        ...original,
        decodeToTree: (...args: Parameters<typeof original.decodeToTree>) => {
            const decoded = original.decodeToTree(...args);
            if (injected.href === undefined || decoded.tree === undefined) {
                return decoded;
            }

            return { ...decoded, tree: withInjectedHref(decoded.tree, injected.href) };
        },
    };
});

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    injected.href = 'javascript:alert(1)';
});

afterEach(() => {
    vi.useRealTimers();
    injected.href = undefined;
});

const model = compileContentModel([core(), links()], { id: 'test.links', version: 1 });
const linked: ContentNodeJSON = {
    type: 'text',
    text: 'guide',
    marks: [{ type: 'link', attrs: { href: 'https://frontify.com', openInNewWindow: true, styleId: 'brand.button' } }],
} as ContentNodeJSON;
const document = storedIn(model, [para(text('Read the '), linked)]);
const presentation = {
    styles: [
        {
            id: 'brand.button',
            label: 'Button',
            appliesTo: ['link'],
            deprecated: false,
            recipe: { backgroundColor: '#1d4ed8' },
        },
    ],
    colorTokens: [],
} as const;
// The paragraph's own markup, which a link that failed the check leaves as plain text in every output.
const PLAIN = '<p dir="auto">Read the guide</p>';

describe('a link whose href reached the model past the checks', () => {
    it('renders in the reader as its text alone, with no anchor, href or link style', () => {
        const markup = renderToStaticMarkup(createElement(RichTextReader, { model, document, presentation }));

        expect(markup).toContain(PLAIN);
        expect(markup.toLowerCase()).not.toContain('javascript:');
    });

    it('writes no href or link style through any codec', () => {
        const codecs = createCodecs(model);
        const { html } = codecs.toHTML(document, { inlineStyles: presentation.styles });
        const { markdown } = codecs.toMarkdown(document);
        const { text: plain } = codecs.toPlainText(document);

        expect(html).toContain(PLAIN);
        for (const output of [html, markdown, plain]) {
            expect(output.toLowerCase()).not.toContain('javascript:');
        }
    });

    it('renders in the editor surface as its text alone, with no link element or link style', () => {
        const { view } = mountText({ model, document });
        const paragraph = view.dom.querySelector('p');

        expect(view.state.doc.textContent).toBe('Read the guide');
        expect(view.dom.querySelector('a')).toBeNull();
        expect(view.dom.querySelector('[data-rte-style], [class*="rte-style"]')).toBeNull();
        expect(paragraph?.textContent).toBe('Read the guide');
        expect(view.dom.innerHTML.toLowerCase()).not.toContain('javascript:');
    });
});
