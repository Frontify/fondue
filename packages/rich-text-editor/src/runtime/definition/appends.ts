/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin, Transaction } from 'prosemirror-state';

import { metaOf } from './engineJson';
import { APPEND_BATCH_META, type AppendBatch, type PluginOrigin } from './types';

/** Thrown past the append limit, so `commit` tells it apart from a plugin error. */
export class AppendLimitError extends Error {
    constructor(readonly chain: readonly PluginOrigin[]) {
        super('A root batch appended more transactions than ResourceLimits.maxAppendedTransactions allows.');
        this.name = 'AppendLimitError';
    }
}

/** The root transaction that `transactions` belong to; ProseMirror marks each appended transaction with its root. */
export const rootOf = (transactions: readonly Transaction[]): Transaction | undefined => {
    const root = transactions[0];
    if (root === undefined) {
        return undefined;
    }

    const appended = metaOf<unknown>(root, 'appendedTransaction');
    if (appended instanceof Transaction) {
        return appended;
    }

    return root;
};

/** The batch of the root that `transactions` belong to. */
export const batchOf = (transactions: readonly Transaction[]): AppendBatch | undefined => {
    const root = rootOf(transactions);
    if (root === undefined) {
        return undefined;
    }

    return metaOf<AppendBatch>(root, APPEND_BATCH_META);
};

/**
 * Wraps a plugin's `appendTransaction`, since `state.applyTransaction` loops with no cap: each appended transaction
 * is counted against its root batch's limit and takes its time from `Date.now`.
 */
export const countAppends = (plugin: Plugin, origin: PluginOrigin): Plugin => {
    const append = plugin.spec.appendTransaction;
    if (append === undefined) {
        return plugin;
    }

    const counted: Plugin = new Plugin({
        ...plugin.spec,
        appendTransaction: (transactions, oldState, newState) => {
            const batch = batchOf(transactions);
            let appended: ReturnType<typeof append>;
            try {
                appended = append.call(counted, transactions, oldState, newState);
            } catch (error) {
                if (batch !== undefined) {
                    batch.failed = origin;
                }

                throw error;
            }

            if (appended === null || appended === undefined || batch === undefined) {
                return appended;
            }

            batch.chain.push(origin);
            if (batch.chain.length > batch.limit) {
                throw new AppendLimitError(batch.chain);
            }

            return appended.setTime(batch.now());
        },
    });

    return counted;
};
