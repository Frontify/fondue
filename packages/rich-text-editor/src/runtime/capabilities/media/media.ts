/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';

import { COMMAND_META, type EngineCommand } from '#/definition';
import { REPLACED_ASSET, isRecord } from '#/model';

import { placeBlock } from '..';
import { withNodeState } from '../../nodeState';
import { positionOf } from '../../positions';

import { INSERT_IMAGE, REPLACE_IMAGE } from './uploads/constants';

export { INSERT_IMAGE, REPLACE_IMAGE };

/** The fields of a picked `AssetValue` that an image stores; a picker result never gives it any other. */
export interface PickedAsset {
    readonly assetId: string;
    readonly mediaType: string;
    readonly labelSnapshot: string;
}

const SPACE = 0x20;

/**
 * `value` as a URL parser and its query reader read it: without tabs and line breaks, or spaces and controls at its
 * ends, with `\` as `/` and percent escapes decoded.
 */
const asUrlReads = (value: string) => {
    let start = 0;
    let end = value.length;
    while (start < end && value.charCodeAt(start) <= SPACE) {
        start += 1;
    }
    while (end > start && value.charCodeAt(end - 1) <= SPACE) {
        end -= 1;
    }
    return value
        .slice(start, end)
        .replaceAll(/[\t\n\r]/g, '')
        .replaceAll('\\', '/')
        .replaceAll(/%([\da-f]{2})/gi, (_whole, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)));
};

/**
 * Whether `assetId` reads as a URL, a signed URL or an access token, which an asset ID never is: an address with a
 * scheme and authority, a scheme that loads content, or a query key that signs or authorizes a request, as a URL
 * parser would read it.
 */
export const isAssetLocator = (assetId: string): boolean => {
    const read = asUrlReads(assetId);
    return (
        /^(?:[a-z][\d+.a-z-]*:)?\/\//i.test(read) ||
        /^(?:https?|data|blob|javascript|vbscript|file|ftp):/i.test(read) ||
        /[?&;][\w.-]*(?:token|signature|sig|credential|secret|api[_-]?key)=/i.test(read)
    );
};

/**
 * A host's answer as untrusted input: an `AssetValue` whose `assetId` is no URL or token and no longer than
 * `maxLength`, whose `mediaType` is one of `mediaTypes` when given, and whose `labelSnapshot` is cut to `maxLength`
 * characters, else `undefined`.
 */
export const pickedAsset = (
    value: unknown,
    options: { readonly mediaTypes?: readonly string[]; readonly maxLength: number },
): PickedAsset | undefined => {
    if (!isRecord(value)) {
        return undefined;
    }
    const { assetId, mediaType, labelSnapshot } = value;
    if (typeof assetId !== 'string' || assetId === '' || assetId.length > options.maxLength) {
        return undefined;
    }
    if (isAssetLocator(assetId) || typeof mediaType !== 'string' || typeof labelSnapshot !== 'string') {
        return undefined;
    }
    if (mediaType.length > options.maxLength) {
        return undefined;
    }
    if (options.mediaTypes !== undefined && !options.mediaTypes.includes(mediaType)) {
        return undefined;
    }
    // No more code units than twice the characters kept can hold them, so a huge label is cut before it is split.
    const head = labelSnapshot.slice(0, options.maxLength * 2);
    const characters = [...head];
    const label = characters.length > options.maxLength ? characters.slice(0, options.maxLength).join('') : head;
    return { assetId, mediaType, labelSnapshot: label };
};

/** Inserts a figure that holds the picked image where `insertNode` puts a block, as the step of `image.insert`. */
export const insertPicked = (schema: Schema, asset: PickedAsset): EngineCommand => ({
    run: (state, dispatch) => {
        const { figure, asset_image: image } = schema.nodes;
        if (figure === undefined || image === undefined) {
            return false;
        }
        const transaction = placeBlock(state, figure.create(null, image.create({ ...asset })));
        if (transaction === undefined) {
            return false;
        }
        dispatch?.(transaction.setMeta(COMMAND_META, INSERT_IMAGE));
        return true;
    },
    active: () => false,
});

/**
 * Sets the picked asset on the image `nodeId` with no intrinsic size, keeping its `nodeId` and alternative text, as
 * the step of `image.replace`, and records the author's own pick on it.
 */
export const refillPicked = (nodeId: string, asset: PickedAsset): EngineCommand => ({
    run: (state, dispatch) => {
        const pos = positionOf(state.doc, nodeId);
        const node = pos === undefined ? null : state.doc.nodeAt(pos);
        if (pos === undefined || node === null || node.type.name !== 'asset_image') {
            return false;
        }
        const transaction = state.tr;
        for (const [name, value] of Object.entries({ ...asset, width: null, height: null })) {
            transaction.setNodeAttribute(pos, name, value);
        }
        transaction.setMeta(COMMAND_META, REPLACE_IMAGE);
        // An image with no alternative text keeps asking for it, which no review replaces.
        const { altIntent } = node.attrs;
        if (altIntent === 'meaningful' || altIntent === 'decorative') {
            const replaced = { assetId: asset.assetId, focus: true };
            dispatch?.(withNodeState(transaction, [{ nodeId, key: REPLACED_ASSET, value: replaced }]));
        } else {
            dispatch?.(transaction);
        }
        return true;
    },
    active: () => false,
});
