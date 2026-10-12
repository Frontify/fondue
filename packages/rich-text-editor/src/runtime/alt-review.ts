/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin, PluginKey, type Transaction } from 'prosemirror-state';

/** The asset whose alternative text the author is asked to review, and whether the prompt takes focus. */
interface AltReview {
    readonly assetId: string;
    readonly focus: boolean;
}

const ALT_REVIEW = new PluginKey<ReadonlyMap<string, AltReview>>('alt-review');

/**
 * Asks the author, for this session, to review the alternative text of image `nodeId` while it holds `assetId`, which
 * a replacement or a completed upload set; `null` stops asking. With `focus` false, as for an upload that completes
 * in the background, the prompt does not take focus from where the author works.
 */
export const withAltReview = (
    transaction: Transaction,
    nodeId: string,
    assetId: string | null,
    focus = true,
): Transaction => transaction.setMeta(ALT_REVIEW, { nodeId, assetId, focus });

/** The asset whose alternative text the author is asked to review on the image `nodeId`, while it still holds it. */
export const altReviewOf = (state: EditorState, nodeId: string): string | undefined =>
    ALT_REVIEW.getState(state)?.get(nodeId)?.assetId;

/** Whether the review prompt of image `nodeId` takes focus, as it does after the author's own pick. */
export const altReviewTakesFocus = (state: EditorState, nodeId: string): boolean =>
    ALT_REVIEW.getState(state)?.get(nodeId)?.focus === true;

/** The images whose alternative text the author is asked to review, by `nodeId`, with the asset that asked. */
export const altReviewPlugin = (): Plugin =>
    new Plugin<ReadonlyMap<string, AltReview>>({
        key: ALT_REVIEW,
        state: {
            init: () => new Map(),
            apply: (transaction, reviews) => {
                const meta = transaction.getMeta(ALT_REVIEW) as
                    | { readonly nodeId: string; readonly assetId: string | null; readonly focus: boolean }
                    | undefined;
                if (meta === undefined) {
                    return reviews;
                }
                const next = new Map(reviews);
                if (meta.assetId === null) {
                    next.delete(meta.nodeId);
                } else {
                    next.set(meta.nodeId, { assetId: meta.assetId, focus: meta.focus });
                }
                return next;
            },
        },
    });
