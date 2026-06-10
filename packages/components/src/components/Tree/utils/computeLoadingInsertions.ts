/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ItemInstance } from '@headless-tree/core';

import { type TreeItemData } from '../types';

export type LoadingPlaceholder = { level: number; key: string };

export type LoadingInsertions = {
    byIndex: Map<number, LoadingPlaceholder>;
    rootLoading: LoadingPlaceholder | null;
};

/**
 * Computes where `TreeLoadingRow`s splice into the visible items: after the last visible
 * descendant of each expanded `isLoading` folder. The root loading row is separate — it
 * renders at the very bottom, after the main render loop.
 */
export const computeLoadingInsertions = (
    visibleItems: Array<ItemInstance<TreeItemData>>,
    rootIsLoading: boolean,
): LoadingInsertions => {
    const byIndex = new Map<number, LoadingPlaceholder>();
    for (let parentIndex = 0; parentIndex < visibleItems.length; parentIndex++) {
        const parent = visibleItems[parentIndex];
        if (!parent) {
            continue;
        }
        const data = parent.getItemData();
        if (!data.isLoading || !parent.isExpanded()) {
            continue;
        }
        const parentLevel = parent.getItemMeta().level;
        // Walk forward while `level > parentLevel` to find the last visible descendant.
        // Starting at `parentIndex` puts an empty folder's loading row right after its header.
        let lastDescendantIndex = parentIndex;
        for (let i = parentIndex + 1; i < visibleItems.length; i++) {
            const candidate = visibleItems[i];
            if (candidate && candidate.getItemMeta().level > parentLevel) {
                lastDescendantIndex = i;
            } else {
                break;
            }
        }
        byIndex.set(lastDescendantIndex, {
            level: parentLevel + 1,
            key: `${parent.getId()}__loading`,
        });
    }

    const rootLoading: LoadingPlaceholder | null = rootIsLoading ? { level: 0, key: '__root_loading' } : null;

    return { byIndex, rootLoading };
};
