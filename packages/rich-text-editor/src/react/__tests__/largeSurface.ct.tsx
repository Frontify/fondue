/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { type ContentNodeJSON } from '#/model';

import { perfBlocks } from '../../model/__tests__/fixtures/perf/documents';

import { PerfEditor } from './fixtures/PerfEditor';

/** The text of every node in document order, which a surface that holds each node shows. */
const textOf = (nodes: readonly ContentNodeJSON[]): string =>
    nodes
        .map((node) => {
            if (node.type === 'text') {
                return (node as unknown as { readonly text: string }).text;
            }

            return textOf(node.content ?? []);
        })
        .join('');

test('keeps every node of the large fixture in the editable DOM, with no windowing of the surface', async ({
    mount,
    page,
}) => {
    test.setTimeout(120_000);
    await mount(<PerfEditor fixture="large" />);
    await expect(page.locator('[data-test-id="fondue-rich-text-editor"]')).not.toHaveAttribute('aria-busy', {
        timeout: 60_000,
    });
    const blocks = perfBlocks('large');

    const surface = await page.evaluate(() => {
        // Node views draw labels and chrome, like a mention's name or an image's controls, outside the editable text.
        const editableText = (node: Node): string => {
            if (node instanceof Text) {
                return node.data;
            }

            if (node instanceof Element && node.getAttribute('contenteditable') === 'false') {
                return '';
            }

            return [...node.childNodes].map(editableText).join('');
        };

        const element = document.querySelector('[data-rte-surface]');
        if (!element) {
            return { text: '', blocks: 0 };
        }

        return { text: editableText(element), blocks: element.children.length };
    });

    // Every top-level block has an element, and every character of the document's text is in the surface.
    expect(surface.blocks).toBe(blocks.length);
    expect(surface.text).toBe(textOf(blocks));
    // Each of the 100 figures renders its image, not the unavailable placeholder.
    await expect(page.locator('[data-rte-surface] img')).toHaveCount(100);
});
