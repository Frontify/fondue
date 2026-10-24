/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type Transaction } from 'prosemirror-state';
import { AttrStep } from 'prosemirror-transform';

import { positionOf } from '../../../positions';

import { completion, nodeIn } from './commands';
import { FILL_META } from './constants';
import { type NodeFacts } from './machine';
import { type Transport } from './transport';

/** The documents's asset IDs, which the uploads it still holds keep. */
const assetsIn = (doc: Node): Set<string> => {
    const assets = new Set<string>();
    doc.descendants((node) => {
        if (node.type.name === 'asset_image' && typeof node.attrs.assetId === 'string') {
            assets.add(node.attrs.assetId);
        }
    });
    return assets;
};

/** Whether `transactions` set the asset of slot `nodeId` themselves: an undo, a cancel or another replacement. */
const resets = (transactions: readonly Transaction[], nodeId: string) =>
    transactions.some(
        (tr) =>
            tr.getMeta(FILL_META) !== true &&
            tr.steps.some(
                (step, index) =>
                    step instanceof AttrStep &&
                    step.attr === 'assetId' &&
                    tr.docs[index]?.nodeAt(step.pos)?.attrs.nodeId === nodeId,
            ),
    );

/** What a published change, a history reset or a dispose does to the slots, and to the cache they fill from. */
export const createHistory = ({ link, feed }: Transport) => {
    const { host, cache, cells, fills, ended } = link;

    /**
     * Ends the upload of each slot that a published change removed or whose asset it set, and after an undo or a redo
     * fills a slot that shows a completed upload's start from the cache, keyed by that upload's operation ID.
     */
    const committed = (transactions: readonly Transaction[], history: boolean) => {
        const { doc } = host.state();
        for (const cell of cells.values()) {
            const { nodeId, operationId } = cell.slot;
            const node: NodeFacts | null = nodeIn(doc, nodeId)?.attrs ?? null;
            feed(cell, {
                type: 'committed',
                history,
                node,
                reset: resets(transactions, nodeId),
                cached: operationId !== undefined && cache.read(operationId) !== undefined,
            });
        }
        if (ended.length > 0) {
            host.abort(ended.splice(0));
        }
    };

    /** Applies the completions that `committed` found in the cache, as the upload's own completion did. */
    const flush = () => {
        for (let nodeId = fills.shift(); nodeId !== undefined; nodeId = fills.shift()) {
            const slot = cells.get(nodeId)?.slot;
            const entry = slot?.operationId === undefined ? undefined : cache.read(slot.operationId);
            if (entry !== undefined) {
                host.fill(completion(nodeId, entry.asset));
            }
        }
    };

    /**
     * History reset, `replaceDocument` or `dispose`: each completed upload whose asset `left` no longer holds is
     * released, then the cache empties. Where the session keeps the document, as a history reset does, its slots that
     * are not done stay with their uploads; otherwise none stays.
     */
    const reset = (left: Node, keeps = false) => {
        cache.empty(assetsIn(left));
        fills.length = 0;
        for (const cell of [...cells.values()]) {
            feed(cell, { type: 'reset', keeps, present: positionOf(left, cell.slot.nodeId) !== undefined });
        }
        host.changed();
    };

    return { committed, flush, reset };
};
