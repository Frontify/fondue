/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type TreeItemData } from '../types';

/**
 * Stable hash of the parent/child structure, used to call `tree.rebuildTree()` only
 * when the structure (not per-node state) changes. Delimiter collisions are
 * theoretically possible but consumer ids are slugs/uuids in practice.
 */
export const getStructureKey = (items: readonly TreeItemData[]): string =>
    items.map((item) => `${item.id}>${item.parentId ?? ''}>${(item.children ?? []).join(',')}`).join('|');
