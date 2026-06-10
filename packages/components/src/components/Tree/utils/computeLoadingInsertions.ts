/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ItemInstance } from '@headless-tree/core';

import { type TreeItemData } from '../types';

export type LoadingPlaceholder = { level: number; key: string };

export type LoadingInsertions = {
    byIndex: Map<number, LoadingPlaceholder>;
    rootLoading: LoadingPlaceholder | null;
};

/**
 * Computes where `TreeLoadingRow`s should be spliced into the flat list of visible items.
 * For each visible folder marked `isLoading`, finds its last visible descendant and registers
 * a placeholder to render after that index. The root case is handled separately because root
 * loading rows render at the very bottom of the list, after the main render loop.
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
        // Skip rows that aren't loading folders, or whose folder is collapsed (so the row
        // would be detached from anything visible).
        if (!data.isLoading || !parent.isExpanded()) {
            continue;
        }
        const parentLevel = parent.getItemMeta().level;
        // Find the last visible descendant of `parent` by walking forward while
        // `level > parentLevel`. The first row at `parentLevel` or shallower means we've
        // exited the folder. Starts at `parentIndex` so an expanded but empty folder
        // inserts the loading row immediately after its header.
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
