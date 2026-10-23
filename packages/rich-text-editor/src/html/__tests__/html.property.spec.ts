/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

import { createCodecs } from '#/codecs';
import { inlineModel } from '#/features';
import { storedIn } from '#/features/__tests__/fixtures/documents';
import { type ContentNodeJSON } from '#/model';

import { fromHTML } from '../index';

const { window } = new JSDOM('');
const domWindow = window as unknown as Window;

describe('HTML round trip regressions', () => {
    it.each([
        ['language', { lang: 'en', dir: null }],
        ['font_color', { tokenId: 'brand.red', value: null }],
    ])('keeps the %s mark of a lone U+00A0 between two words', (type, attrs) => {
        const paragraph = {
            type: 'paragraph',
            attrs: { lang: null, align: null },
            content: [
                { type: 'text', text: 'a' },
                { type: 'text', text: '\u00A0', marks: [{ type, attrs }] },
                { type: 'text', text: 'b' },
            ],
        };
        const { html } = createCodecs(inlineModel).toHTML(storedIn(inlineModel, [paragraph as ContentNodeJSON]));

        const result = fromHTML(html, inlineModel, { window: domWindow });

        expect(result).toMatchObject({ status: 'editable', document: { content: { content: [paragraph] } } });
    });

    it('keeps the text of a refused link after a base element with an xlink:href, which makes jsdom matching throw', () => {
        const result = fromHTML('<base xlink:href=""><a href="javascript:alert(1)">x</a>', inlineModel, {
            window: domWindow,
        });

        expect(result).toMatchObject({
            status: 'editable',
            document: { content: { content: [{ type: 'paragraph', content: [{ type: 'text', text: 'x' }] }] } },
        });
    });
});
