/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { AllSelection, TextSelection } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { type RichTextSlice } from '#/model';
import { mountProfile } from '#/react/__tests__/fixtures/profiles';
import { paste } from '#/testing';

import { SLICE_TYPE } from '../slice';

describe('paste regressions', () => {
    it('joins a pasted link and an empty paragraph into the one paragraph of an Inline field', async () => {
        const { handle, content } = await mountProfile('inline');

        act(() => {
            paste(handle, { html: '<a href="https://frontify.com/">a</a><p></p>' });
        });

        expect(content()).toEqual([
            {
                type: 'paragraph',
                attrs: { lang: null, align: null },
                content: [
                    {
                        type: 'text',
                        text: 'a',
                        marks: [
                            {
                                type: 'link',
                                attrs: { href: 'https://frontify.com/', openInNewWindow: false, styleId: null },
                            },
                        ],
                    },
                ],
            },
        ]);
    });

    it('keeps an island block of a slice copied in an Inline field when pasting it into one', async () => {
        const { handle, view, content } = await mountProfile('inline');
        const { schema } = view.state;
        const original = {
            type: 'callout',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Kept' }] }],
        };
        const blocks = [
            schema.node('paragraph', null, schema.text('a')),
            schema.node('unsupported_block', { feature: 'callout', original }),
            schema.node('paragraph', null, schema.text('b')),
        ];
        act(() => {
            const filled = view.state.tr.replaceWith(0, view.state.doc.content.size, blocks);
            view.dispatch(filled.setSelection(new AllSelection(filled.doc)));
        });
        const clipboardData = new DataTransfer();
        act(() => {
            view.dom.dispatchEvent(new ClipboardEvent('copy', { clipboardData, bubbles: true, cancelable: true }));
        });
        act(() => {
            const empty = view.state.tr.replaceWith(0, view.state.doc.content.size, schema.node('paragraph'));
            view.dispatch(empty.setSelection(TextSelection.create(empty.doc, 1)));
        });

        act(() => {
            paste(handle, {
                slice: JSON.parse(clipboardData.getData(SLICE_TYPE)) as RichTextSlice,
                text: clipboardData.getData('text/plain'),
            });
        });

        expect(content()).toContainEqual(original);
    });
});
