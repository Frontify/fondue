/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { COMMAND_META, type EngineCommand } from '#/definition';
import { isRecord } from '#/model/values';

import { withAltReview } from './alt-review';
import { placeBlock } from './capabilities';
import { nearest, positionOf } from './positions';

/** The control that `image.insert` opens, and an upload start for one node: the host asset picker. */
export const MEDIA_PICKER = 'media-picker';
export const INSERT_IMAGE = 'image.insert';
export const REPLACE_IMAGE = 'image.replace';

/** The control that `image.alt.edit` opens: the alternative text dialog of the selected image. */
export const IMAGE_ALT = 'image-alt';

/** The `nodeId` of the image at the selection, which `image.alt.edit` applies to. */
export const selectedImage = (state: EditorState): string | undefined => {
    const type = state.schema.nodes.asset_image;
    const found = type === undefined ? undefined : nearest(state, type);
    const nodeId: unknown = found?.node.attrs.nodeId;
    return typeof nodeId === 'string' ? nodeId : undefined;
};

/** The fields of a picked `AssetValue` that an image stores; a picker result never gives it any other. */
export interface PickedAsset {
    readonly assetId: string;
    readonly mediaType: string;
    readonly labelSnapshot: string;
}

/** A host picker's result as untrusted input: an `AssetValue` with an `assetId`, else `undefined`. */
export const pickedAsset = (value: unknown): PickedAsset | undefined => {
    if (!isRecord(value)) {
        return undefined;
    }
    const { assetId, mediaType, labelSnapshot } = value;
    if (typeof assetId !== 'string' || assetId === '' || typeof mediaType !== 'string') {
        return undefined;
    }
    if (typeof labelSnapshot !== 'string') {
        return undefined;
    }
    return { assetId, mediaType, labelSnapshot };
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
 * the step of `image.replace`.
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
        dispatch?.(withAltReview(transaction, nodeId, asset.assetId).setMeta(COMMAND_META, REPLACE_IMAGE));
        return true;
    },
    active: () => false,
});
