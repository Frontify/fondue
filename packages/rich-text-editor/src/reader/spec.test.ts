/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { doc, envelope, node, text } from '#/features/__fixtures__/documents';
import { core } from '#/features/core/feature';
import { compileContentModel, defineFeature } from '#/model';

import { renderReader } from '../../fixtures/reader/helpers';

const spec = defineFeature({
    id: 'fixture.spec',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    options: { tone: { type: 'string', default: 'calm' } },
    nodes: {
        box: {
            group: 'block',
            content: 'inline*',
            attrs: {},
            html: [
                'div',
                {
                    class: 'box',
                    onclick: 'steal()',
                    'bad name': 'x',
                    style: 'text-align: right; --accent: 1',
                    colspan: '2',
                    tabindex: '0',
                    'data-tone': { option: 'tone' },
                },
                0,
            ],
            parse: [],
        },
        stamp: { group: 'block', attrs: {}, html: ['hr', 0], parse: [] },
        ghost: { group: 'block', attrs: {}, html: ['span', 0], parse: [] },
    },
});
const model = compileContentModel([core(), spec()], { id: 'fixture.vocabulary', version: 1 });
const render = (...blocks: readonly unknown[]) =>
    renderReader(envelope(doc(...(blocks as never[])), ['core', 'fixture.spec']), model);

describe('RichTextReader html specs', () => {
    it('SPEC-rich-text-output/AC-003 gives React the props of the attributes a spec writes and drops event handlers and bad names', () => {
        expect(render(node('box', {}, text('Hi')))).toBe(
            '<div><div class="box" style="text-align:right;--accent:1" colSpan="2" tabindex="0" data-tone="calm">Hi</div></div>',
        );
    });

    it('SPEC-rich-text-output/AC-003 drops the children of a void element and renders a node whose spec has no content hole as a leaf', () => {
        expect(render(node('stamp'), node('ghost'))).toBe('<div><hr/><span></span></div>');
    });
});
