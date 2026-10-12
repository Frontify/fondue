/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin, PluginKey, type Transaction } from 'prosemirror-state';

const ALT_REVIEW = new PluginKey<ReadonlyMap<string, string>>('alt-review');

/**
 * Asks the author, for this session, to review the alternative text of image `nodeId` while it holds `assetId`, which
 * a replacement or a completed upload set; `null` stops asking.
 */
export const withAltReview = (transaction: Transaction, nodeId: string, assetId: string | null): Transaction =>
    transaction.setMeta(ALT_REVIEW, { nodeId, assetId });

/** The asset whose alternative text the author is asked to review on the image `nodeId`, while it still holds it. */
export const altReviewOf = (state: EditorState, nodeId: string): string | undefined =>
    ALT_REVIEW.getState(state)?.get(nodeId);

/** The images whose alternative text the author is asked to review, by `nodeId`, with the asset that asked. */
export const altReviewPlugin = (): Plugin =>
    new Plugin<ReadonlyMap<string, string>>({
        key: ALT_REVIEW,
        state: {
            init: () => new Map(),
            apply: (transaction, reviews) => {
                const meta = transaction.getMeta(ALT_REVIEW) as
                    | { readonly nodeId: string; readonly assetId: string | null }
                    | undefined;
                if (meta === undefined) {
                    return reviews;
                }
                const next = new Map(reviews);
                if (meta.assetId === null) {
                    next.delete(meta.nodeId);
                } else {
                    next.set(meta.nodeId, meta.assetId);
                }
                return next;
            },
        },
    });
