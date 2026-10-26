/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentNodeJSON, type ContentRepair, defineFeature, type JsonObject } from '#/model';

const nodeId = { type: 'string', required: true } as const;
const SIDES = ['left', 'center', 'right'] as const;
const size = { type: 'integer', min: 1, max: 65_535, nullable: true, default: null } as const;
const IMAGE_ALT_REPAIR: ContentRepair = { command: 'image.alt.edit', feature: 'media.image' };
const IMAGE = { node: 'asset_image' } as const;
const IMAGE_EXTENSION = /\.(?:apng|avif|bmp|gif|heic|heif|ico|jfif|jpe?g|png|svg|tiff?|webp)$/i;

const attrsOf = (node: ContentNodeJSON): JsonObject => node.attrs ?? {};
const altIntentOf = (node: ContentNodeJSON) => attrsOf(node).altIntent ?? 'missing';
const folded = (value: string) => value.trim().toLowerCase();

/**
 * Images as a `figure` that holds one `asset_image`, which stores the host's `assetId`, never a URL: every output asks
 * the presentation's `resolveAssetUrl` at render time. The alternative text is an explicit choice, `meaningful` with
 * its text or `decorative`, and `missing` until the author makes it. A figure is block-level and aligns its image to
 * a side; text never wraps around it.
 */
export const mediaImage = defineFeature({
    id: 'media.image',
    version: 1,
    requires: [{ id: 'core', version: 1 }],
    options: {
        // SVG is left out, since it can hold script.
        acceptTypes: {
            type: 'list',
            items: { type: 'string', minLength: 1 },
            default: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/avif'],
        },
    },
    nodes: {
        figure: {
            group: 'block',
            content: 'asset_image',
            attrs: { nodeId, align: { type: 'enum', values: SIDES, default: 'center' } },
            // The reader and `toHTML` write the side as `text-align`; the editor's stylesheet reads it from here.
            html: ['figure', { 'data-align': { attr: 'align' } }, 0],
            parse: [],
        },
        asset_image: {
            attrs: {
                nodeId,
                assetId: { type: 'string', nullable: true, required: true },
                labelSnapshot: { type: 'string', required: true },
                altIntent: { type: 'enum', values: ['missing', 'decorative', 'meaningful'], default: 'missing' },
                altText: { type: 'string', default: '' },
                width: size,
                height: size,
                displayWidth: { type: 'integer', min: 10, max: 100, nullable: true, default: null },
                mediaType: { type: 'string', nullable: true, default: null },
            },
            // Pasted HTML never creates an image, since an `img` holds a URL and no asset.
            html: ['img'],
            parse: [],
        },
    },
    formats: { html: 'lossy', text: 'lossy', markdown: 'lossy' },
    contentRules: [
        {
            id: 'image.alt-missing',
            kind: 'automatic',
            severity: 'error',
            subject: IMAGE,
            repair: IMAGE_ALT_REPAIR,
            check: ({ node }) => {
                const intent = altIntentOf(node);
                const { altText } = attrsOf(node);
                // A meaningful image with blank text renders an empty `alt`, as a decorative one does.
                const blank = intent === 'meaningful' && (typeof altText !== 'string' || altText.trim() === '');
                if (intent !== 'missing' && !blank) {
                    return undefined;
                }

                return { payload: null };
            },
        },
        {
            id: 'image.alt-suspicious',
            kind: 'automatic',
            severity: 'warning',
            subject: IMAGE,
            repair: IMAGE_ALT_REPAIR,
            check: ({ node }, { genericWords }) => {
                const { altText, labelSnapshot } = attrsOf(node);
                if (altIntentOf(node) !== 'meaningful' || typeof altText !== 'string' || altText.trim() === '') {
                    return undefined;
                }

                const alt = folded(altText);
                const suspicious =
                    (typeof labelSnapshot === 'string' && alt === folded(labelSnapshot)) ||
                    IMAGE_EXTENSION.test(alt) ||
                    genericWords.has(alt);

                return suspicious ? { payload: null } : undefined;
            },
        },
        { id: 'image.content-review', kind: 'manual', severity: 'review', subject: IMAGE, check: () => true },
    ],
});
