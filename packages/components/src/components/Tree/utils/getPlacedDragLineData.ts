/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DragTarget, type TreeInstance } from '@headless-tree/core';

import { type TreeItemData } from '../types';

import { isNoopDrop } from './isNoopDrop';

type OrderedDragTarget = Extract<DragTarget<TreeItemData>, { childIndex: number }>;

type DragLinePlacement = {
    top: number;
    left: number;
};

/**
 * Drop-line position for the current drag.
 *
 * Headless-tree draws an ordered "insert after this expanded folder" line on the next
 * visible row, which is that folder's first child, while the insertion itself is the
 * next sibling after the whole subtree. When the row above the insertion is an expanded
 * folder with visible descendants, the line is moved to the bottom of the last one.
 */
export const getPlacedDragLineData = (tree: TreeInstance<TreeItemData>): DragLinePlacement | null => {
    if (isNoopDrop(tree)) {
        return null;
    }
    const data = tree.getDragLineData();
    if (!data) {
        return null;
    }
    // A line exists only for an ordered target, and only while the tree element is mounted.
    const target = tree.getDragTarget() as OrderedDragTarget;
    const above = target.item.getChildren()[target.childIndex - 1];
    if (!above) {
        return { top: data.top, left: data.left };
    }

    const visible = tree.getItems();
    const aboveIndex = visible.findIndex((item) => item.getId() === above.getId());
    const aboveLevel = above.getItemMeta().level;
    let last = above;
    for (let index = aboveIndex + 1; index < visible.length; index += 1) {
        const candidate = visible[index];
        if (!candidate || candidate.getItemMeta().level <= aboveLevel) {
            break;
        }
        last = candidate;
    }
    if (last.getId() === above.getId()) {
        return { top: data.top, left: data.left };
    }
    const lastBox = last.getElement()?.getBoundingClientRect();
    if (!lastBox) {
        return { top: data.top, left: data.left };
    }
    const treeBox = tree.getElement()!.getBoundingClientRect();
    return { top: lastBox.bottom - treeBox.top, left: data.left };
};
