/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { createCodecs } from '#/codecs/codecs';
import { withInjectedHref } from '#/features/__tests__/fixtures/inject';
import { core } from '#/features/core/feature';
import { links } from '#/features/links/feature';
import { compileContentModel, type ContentNodeJSON } from '#/model';
import type * as Decode from '#/model/decode';
import { mountText, para, storedIn, text } from '#/react/__tests__/fixtures/text';
import { RichTextReader } from '#/reader';

const injected = vi.hoisted(() => ({ href: undefined as string | undefined }));

vi.mock('#/model/decode', async (importOriginal) => {
    const original = await importOriginal<typeof Decode>();
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
    marks: [{ type: 'link', attrs: { href: 'https://frontify.com', openInNewWindow: true, styleId: null } }],
} as ContentNodeJSON;
const document = storedIn(model, [para(text('Read the '), linked)]);

describe('a link whose href reached the model past the checks', () => {
    it('renders in the reader as its text alone, with no anchor or href', () => {
        const markup = renderToStaticMarkup(createElement(RichTextReader, { model, document }));

        expect(markup).toContain('Read the guide');
        expect(markup).not.toContain('<a');
        expect(markup).not.toContain('href');
        expect(markup.toLowerCase()).not.toContain('javascript:');
    });

    it('writes no href through any codec', () => {
        const codecs = createCodecs(model);
        const { html } = codecs.toHTML(document);
        const { markdown } = codecs.toMarkdown(document);
        const { text: plain } = codecs.toPlainText(document);

        expect(html).toContain('Read the guide');
        expect(html).not.toContain('href');
        for (const output of [html, markdown, plain]) {
            expect(output.toLowerCase()).not.toContain('javascript:');
        }
    });

    it('renders in the editor surface with no href', () => {
        const { view } = mountText({ model, document });
        const anchor = view.dom.querySelector('a');

        expect(view.state.doc.textContent).toBe('Read the guide');
        expect(anchor?.hasAttribute('href')).toBe(false);
        expect(view.dom.innerHTML.toLowerCase()).not.toContain('javascript:');
    });
});
