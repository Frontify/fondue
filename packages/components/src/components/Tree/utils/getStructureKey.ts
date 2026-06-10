/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeItemData } from '../types';

/**
 * Builds a stable hash describing the tree's parent/child structure. Used as a
 * `useEffect` dependency to call `tree.rebuildTree()` only when the structure
 * (not the per-node state) actually changes.
 *
 * Uses delimiters unlikely to appear in ids; if both `>` and `,` and `|` appear
 * inside an id, collisions are theoretically possible, but in practice consumer
 * ids are slugs/uuids.
 */
export const getStructureKey = (items: readonly TreeItemData[]): string =>
    items.map((item) => `${item.id}>${item.parentId ?? ''}>${(item.children ?? []).join(',')}`).join('|');
