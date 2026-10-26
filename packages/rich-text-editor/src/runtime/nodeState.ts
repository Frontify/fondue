/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorState, Plugin, PluginKey, type Transaction } from 'prosemirror-state';

import { type JsonValue } from '#/model';

/** One flag a transaction sets on a node, or removes with `null`. */
export type NodeStateChange = {
    readonly nodeId: string;
    readonly key: string;
    readonly value: JsonValue | null;
};

type NodeStates = ReadonlyMap<string, Readonly<Record<string, JsonValue>>>;

const NODE_STATE = new PluginKey<NodeStates>('node-state');

/** The flag changes `transaction` carries. */
export const nodeStateChanges = (transaction: Transaction): readonly NodeStateChange[] =>
    (transaction.getMeta(NODE_STATE) as readonly NodeStateChange[] | undefined) ?? [];

/** Adds `changes` to the flag changes of `transaction`, after those it carries already. */
export const withNodeState = (transaction: Transaction, changes: readonly NodeStateChange[]): Transaction =>
    transaction.setMeta(NODE_STATE, [...nodeStateChanges(transaction), ...changes]);

/** The flag `key` of the node `nodeId` in this session, or `undefined`. */
export const nodeStateOf = (state: EditorState, nodeId: string, key: string): JsonValue | undefined =>
    NODE_STATE.getState(state)?.get(nodeId)?.[key];

/** Flags plugins keep on nodes by `nodeId` for the session, which no undo step holds. */
export const nodeStatePlugin = (): Plugin =>
    new Plugin<NodeStates>({
        key: NODE_STATE,
        state: {
            init: () => new Map(),
            apply: (transaction, states) => {
                const changes = nodeStateChanges(transaction);
                if (changes.length === 0) {
                    return states;
                }
                const next = new Map(states);
                for (const { nodeId, key, value } of changes) {
                    const kept = Object.fromEntries(
                        Object.entries(next.get(nodeId) ?? {}).filter(([name]) => name !== key),
                    );
                    if (value !== null) {
                        kept[key] = value;
                    }
                    next.set(nodeId, kept);
                }
                return next;
            },
        },
    });
