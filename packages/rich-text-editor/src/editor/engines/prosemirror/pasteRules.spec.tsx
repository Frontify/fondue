/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import { defineBlock, type ParseRule } from '#/core';

import { VALUE_ATTR } from './documentConversion';
import { blockParseRules, MARK_PRIORITY, valueParseRules } from './pasteRules';

type ColorValue = { color: string | undefined };

/** A test rule that reads the colour its element declares through the editor's reader. */
const readColorRule: ParseRule<ColorValue> = {
    tag: 'span',
    value: (_element, read) => ({ color: read.color('color') }),
};

const styled = (tag: string, style: string | undefined): HTMLElement => {
    const element = document.createElement(tag);
    if (style !== undefined) {
        element.setAttribute('style', style);
    }
    return element;
};

const markAttrs = (style: string | undefined): unknown => {
    const [rule] = valueParseRules([readColorRule], MARK_PRIORITY);
    return rule?.getAttrs?.(styled('span', style));
};

describe("a tag rule's reader", () => {
    it('reads a declared colour as stored hex', () => {
        expect(markAttrs('color: red')).toEqual({ [VALUE_ATTR]: { color: '#ff0000' } });
        expect(markAttrs('color: rgba(255, 0, 0, 0.5)')).toEqual({ [VALUE_ATTR]: { color: '#ff000080' } });
    });

    it('reads no colour where the element declares none or no colour', () => {
        for (const style of [undefined, 'background-color: transparent', 'color: inherit', 'color: banana']) {
            expect(markAttrs(style)).toEqual({ [VALUE_ATTR]: { color: undefined } });
        }
    });

    it('is handed to block rules too', () => {
        const block = defineBlock<ColorValue>({
            content: 'text',
            defaults: { color: undefined },
            toHtml: () => ({ tag: 'p', children: true }),
            parse: [{ tag: 'p', value: (_element, read) => ({ color: read.color('color') }) }],
        });
        const [rule] = blockParseRules(block, []);

        expect(rule?.getAttrs?.(styled('p', 'color: #F00'))).toEqual({ color: '#ff0000' });
    });
});
