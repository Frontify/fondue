/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import fc from 'fast-check';
import { AllSelection, TextSelection } from 'prosemirror-state';
import { describe, expect, it } from 'vitest';

import { brandDocumentModel, commentModel, documentModel, inlineModel } from '#/features';
import { fcSettings, seeded } from '#/features/__tests__/fixtures/generated';
import { htmlArb, policyFaults, unsafeParts } from '#/html/__tests__/helpers/hostile-html';
import { type ContentModel, decodeDocument, type RichTextSlice } from '#/model';
import { mountProfile } from '#/react/__tests__/fixtures/profiles';
import { loadProfile } from '#/react/profiles';
import { type RichTextProfile } from '#/react/types';
import { paste } from '#/testing';

import { SLICE_TYPE } from '../slice';

const settings = fcSettings(60);

const PROFILES: readonly (readonly [RichTextProfile, ContentModel])[] = [
    ['inline', inlineModel],
    ['comment', commentModel],
    ['document', documentModel],
    ['brand-document', brandDocumentModel],
];

describe(seeded('pasting arbitrary HTML'), () => {
    it.each(PROFILES)(
        'keeps the %s editor a canonical document with no unsafe part, within the profile policy',
        async (profile, model) => {
            const mounted = await mountProfile(profile);
            const { definition } = await loadProfile(profile);
            const { view } = mounted;
            const { schema } = view.state;
            fc.assert(
                fc.property(fc.array(htmlArb, { minLength: 1, maxLength: 4 }), (parts) => {
                    const empty = view.state.tr.replaceWith(0, view.state.doc.content.size, schema.node('paragraph'));
                    view.dispatch(empty.setSelection(TextSelection.create(empty.doc, 1)));
                    act(() => {
                        paste(mounted.handle, { html: parts.join('') });
                    });
                    const { document } = mounted.handle.getSnapshot();
                    expect(decodeDocument(document, model)).toMatchObject({ status: 'editable', diagnostics: [] });
                    expect(unsafeParts(model, document.content)).toEqual([]);
                    expect(policyFaults(model, definition.authoring, document.content)).toEqual([]);
                    if (profile === 'inline') {
                        expect(document.content.content).toHaveLength(1);
                    }
                }),
                settings,
            );
        },
    );
});

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
