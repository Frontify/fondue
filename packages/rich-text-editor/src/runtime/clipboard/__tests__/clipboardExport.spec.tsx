/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act } from '@testing-library/react';
import { NodeSelection } from 'prosemirror-state';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { fixtureChrome } from '#/features/__tests__/fixtures/chrome/feature';
import { fixtureCodeBlock } from '#/features/__tests__/fixtures/code-block/feature';
import { node, paragraph, text } from '#/features/__tests__/fixtures/documents';
import { fixtureMediaImage } from '#/features/__tests__/fixtures/media/feature';
import { fixtureTableBlock } from '#/features/__tests__/fixtures/table/feature';
import { core } from '#/features/core/feature';
import { mediaImage } from '#/features/mediaImage/feature';
import { compileContentModel, type JsonValue } from '#/model';
import { loadMarkdownReader } from '#/runtime/clipboard/markdown';

import { mount, copyFrom, selectAll } from '../../import/__tests__/fixtures/mount';

// Paste reads Markdown only after an editor's first idle moment, which these synchronous cases do not wait for.
beforeAll(loadMarkdownReader);

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('copy', () => {
    it('writes copied HTML with no chrome, contenteditable, nodeId or resource ID from a fixture with every node view', () => {
        const viewsModel = compileContentModel(
            [core(), fixtureChrome(), fixtureCodeBlock(), fixtureMediaImage(), fixtureTableBlock(), mediaImage()],
            { id: 'fixture.vocabulary', version: 1 },
        );
        const plain = (value: string) => ({ type: 'paragraph', attrs: { lang: null }, content: [text(value)] });
        const mounted = mount({
            editorModel: viewsModel,
            blocks: [
                plain('Before'),
                node('chrome_block', { nodeId: 'id-block', language: 'ts', checked: true }, text('code')),
                {
                    type: 'paragraph',
                    attrs: { lang: null },
                    content: [node('chrome_mention', { nodeId: 'id-mention', label: 'Ada' })],
                },
                node('chrome_image', { nodeId: 'id-image', assetId: 'asset-1' }),
                node('chrome_code', { nodeId: 'id-code', language: 'js' }, text('let a')),
                node('media_image', { nodeId: 'id-media', assetId: 'asset-2', alt: 'Logo' }),
                node('table_block', { nodeId: 'id-table' }, plain('Cell')),
                node(
                    'figure',
                    { nodeId: 'id-figure', align: 'center' },
                    node('asset_image', {
                        nodeId: 'id-shipped',
                        assetId: 'asset-3',
                        labelSnapshot: 'logo.png',
                        altIntent: 'meaningful',
                        altText: 'Logo',
                        width: 40,
                        height: 30,
                        displayWidth: null,
                        mediaType: 'image/png',
                    }),
                ),
            ],
        });
        selectAll(mounted);

        const { html } = copyFrom(mounted);

        expect(mounted.view.dom.querySelectorAll('[data-rte-chrome]')).toHaveLength(7);
        expect(html).toBe(
            '<div class="fondue-rte-content"><p dir="auto">Before</p><pre dir="auto">code</pre><p dir="auto"><span data-label="Ada"></span></p><div dir="auto"></div><pre dir="auto">let a</pre><figure dir="auto"></figure><section dir="auto"><p dir="auto">Cell</p></section><figure dir="auto" style="text-align:center"><span data-rte-image-unavailable="" data-rte-message="image-unavailable">Image unavailable <bdi>logo.png</bdi></span></figure></div>',
        );
        expect(html).not.toMatch(/asset-|id-|data-rte-chrome|contenteditable/);
        mounted.unmount();
    });

    it('copies a node-selected island as its island node, with its text in the HTML and plain text', () => {
        const original = { type: 'callout', content: [paragraph(text('Kept'))] };
        const mounted = mount({ blocks: [paragraph(text('ab')), original as JsonValue] });
        act(() => {
            mounted.view.dispatch(mounted.view.state.tr.setSelection(NodeSelection.create(mounted.view.state.doc, 4)));
        });

        const flavors = copyFrom(mounted);

        expect((JSON.parse(flavors.slice) as { content: unknown[] }).content).toEqual([
            { type: 'unsupported_block', attrs: { feature: 'callout', original } },
        ]);
        expect(flavors.html).toContain('Kept');
        expect(flavors.text).toBe('Kept');
        mounted.unmount();
    });
});
