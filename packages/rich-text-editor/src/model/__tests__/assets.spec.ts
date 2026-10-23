/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { findUnresolvedAssets, type RichTextDocument } from '#/model';

const image = (nodeId: string, assetId: string | null) => ({
    type: 'figure',
    attrs: { nodeId: `figure-${nodeId}`, align: 'center' },
    content: [{ type: 'asset_image', attrs: { nodeId, assetId, labelSnapshot: 'logo.png' } }],
});
const stored = (blocks: readonly unknown[]) =>
    ({
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: { id: 'test.images', version: 1 },
        requiredCapabilities: [],
        content: { type: 'doc', attrs: { lang: null, dir: 'auto' }, content: blocks },
    }) as unknown as RichTextDocument;

describe('findUnresolvedAssets', () => {
    it('reports every image with a null assetId by nodeId and type, in document order, nested ones too', () => {
        const document = stored([
            image('image-1', null),
            image('image-2', 'asset-2'),
            { type: 'blockquote', content: [image('image-3', null)] },
        ]);

        expect(findUnresolvedAssets(document)).toEqual([
            { nodeId: 'image-1', type: 'asset_image' },
            { nodeId: 'image-3', type: 'asset_image' },
        ]);
    });

    it('reports nothing for a document whose images all have an asset', () => {
        expect(findUnresolvedAssets(stored([image('image-1', 'asset-1')]))).toEqual([]);
    });
});
