/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it, vi } from 'vitest';

import {
    CHILD_SPACING_ATTRIBUTE,
    type ChildSpacing,
    defineBlock,
    defineContent,
    definePlugin,
    fondueToken,
    PARAGRAPH,
    type RteDocumentOf,
} from '../core';
import { serializeToHtml } from '../renderer/serializeToHtml';

// A block that holds blocks declares how they are spaced, and the document spaces them by that alone.

const CALLOUT = 'callout';
const FIRST_TEXT = 'First';
const LAST_TEXT = 'Last';
const BLOCK_GAP = fondueToken('spacing-x-small');

const calloutPlugin = (childSpacing: ChildSpacing) =>
    definePlugin({
        id: CALLOUT,
        content: defineContent({
            blocks: {
                [CALLOUT]: defineBlock({
                    content: { blocks: [PARAGRAPH] },
                    childSpacing,
                    toHtml: () => ({ tag: 'aside', children: [{ tag: 'div', children: true }] }),
                    parse: [{ tag: 'aside' }],
                }),
            },
        }),
    });

const calloutDocument: RteDocumentOf = {
    version: 1,
    blocks: [
        {
            type: CALLOUT,
            children: [
                { type: PARAGRAPH, children: [{ text: FIRST_TEXT }] },
                { type: PARAGRAPH, children: [{ text: LAST_TEXT }] },
            ],
        },
    ],
};

/** The `style` attribute of the paragraph holding this text. */
const paragraphStyle = (html: string, text: string): string => {
    const style = new RegExp(`<p style="([^"]*)">${text}</p>`).exec(html)?.[1];
    if (style === undefined) {
        throw new Error(`No styled paragraph with "${text}" in ${html}`);
    }
    return style;
};

const marginBelow = (value: string): string => `margin-bottom: ${value};`;

describe('a block that holds blocks', () => {
    it('carries its declared spacing where its content goes, not on its outermost element', () => {
        const html = serializeToHtml(calloutDocument, { plugins: [calloutPlugin('apart')], wrap: false });

        expect(html).toMatch(new RegExp(`^<aside><div ${CHILD_SPACING_ATTRIBUTE}="apart"><p>`));
    });

    it('spaces its children apart when it declares `apart`', () => {
        const html = serializeToHtml(calloutDocument, {
            plugins: [calloutPlugin('apart')],
            wrap: false,
            styling: 'inline',
        });

        const first = paragraphStyle(html, FIRST_TEXT);
        const last = paragraphStyle(html, LAST_TEXT);
        expect(first).toContain(marginBelow(BLOCK_GAP));
        expect(last).toContain(marginBelow('0'));
    });

    it('holds its children tight when it declares `tight`', () => {
        const html = serializeToHtml(calloutDocument, {
            plugins: [calloutPlugin('tight')],
            wrap: false,
            styling: 'inline',
        });

        for (const text of [FIRST_TEXT, LAST_TEXT]) {
            const style = paragraphStyle(html, text);
            expect(style).toContain(marginBelow('0'));
        }
    });

    it('spaces its children apart when no plugin defines it', () => {
        // The renderer names the unknown block once per run; this test is about its spacing alone.
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const html = serializeToHtml(calloutDocument, { plugins: [], wrap: false, styling: 'inline' });

        const first = paragraphStyle(html, FIRST_TEXT);
        expect(first).toContain(marginBelow(BLOCK_GAP));
        warn.mockRestore();
    });
});
