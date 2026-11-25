/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { parseHtml, type RteDocumentWith, serializeToHtml } from '../../index';

import { type HorizontalRuleBlock, horizontalRulePlugin } from './HorizontalRule';

const PLUGINS = [horizontalRulePlugin()];

/** An `<hr>` start tag, with or without attributes and self-closing slash. */
const HR_ELEMENT = /<hr[\s/>]/;

const DOCUMENT: RteDocumentWith<{ block: HorizontalRuleBlock }> = {
    version: 1,
    blocks: [
        { type: 'paragraph', children: [{ text: 'a' }] },
        { type: 'horizontalRule' },
        { type: 'paragraph', children: [{ text: 'b' }] },
    ],
};

describe('horizontalRulePlugin', () => {
    it('writes a horizontal rule block as an hr', () => {
        expect(serializeToHtml(DOCUMENT, { plugins: PLUGINS, wrap: false })).toMatch(HR_ELEMENT);
    });

    it('reads an hr between two paragraphs as a horizontal rule block', () => {
        expect(parseHtml('<p>a</p><hr><p>b</p>', { plugins: PLUGINS })).toEqual(DOCUMENT);
    });
});
