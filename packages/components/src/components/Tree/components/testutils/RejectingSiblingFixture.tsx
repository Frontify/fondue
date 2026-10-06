/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tree, type TreeDropCandidate } from '../../Tree';

// Defined here, not in the .ct.tsx file: ct callback props are fire-and-forget, so canDrop's predicate must live in the mounted tree.
const rejectsFolders = (items: TreeDropCandidate[]) => items.every((item) => !item.isFolder);

/** An allowed reorder past `X` must stop showing its line once hovering `A`, whose own `accepts` rejects it. */
export const RejectingSiblingFixture = () => (
    <Tree.Root reorderable>
        <Tree.Folder id="F">
            <Tree.FolderHeader>
                <Tree.Label>F</Tree.Label>
            </Tree.FolderHeader>
        </Tree.Folder>
        <Tree.Item id="X">
            <Tree.Label>X</Tree.Label>
        </Tree.Item>
        <Tree.Item id="Y">
            <Tree.Label>Y</Tree.Label>
        </Tree.Item>
        <Tree.Folder id="P" isExpanded accepts={rejectsFolders}>
            <Tree.FolderHeader>
                <Tree.Label>P</Tree.Label>
            </Tree.FolderHeader>
            <Tree.Folder id="A" isExpanded accepts={rejectsFolders}>
                <Tree.FolderHeader>
                    <Tree.Label>A</Tree.Label>
                </Tree.FolderHeader>
                <Tree.Item id="a1">
                    <Tree.Label>a1</Tree.Label>
                </Tree.Item>
            </Tree.Folder>
        </Tree.Folder>
    </Tree.Root>
);
