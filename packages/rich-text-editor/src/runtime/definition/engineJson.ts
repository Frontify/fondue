/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Fragment, type Node } from 'prosemirror-model';
import { type Plugin, type PluginKey, type Transaction } from 'prosemirror-state';

import { type TreeNode } from '#/model/internal';

/** `Transaction.getMeta` returns `any`. */
export const metaOf = <Value>(transaction: Transaction, key: string | Plugin | PluginKey): Value | undefined =>
    transaction.getMeta(key) as Value | undefined;

/** `Node.toJSON` returns `any`. */
export const nodeJson = (node: Node): TreeNode => node.toJSON() as TreeNode;

/** `Fragment.toJSON` returns `any`, and an empty fragment serialises to `null`. */
export const fragmentJson = (fragment: Fragment): TreeNode[] => {
    const json: unknown = fragment.toJSON();
    if (!Array.isArray(json)) {
        return [];
    }

    return json as TreeNode[];
};
