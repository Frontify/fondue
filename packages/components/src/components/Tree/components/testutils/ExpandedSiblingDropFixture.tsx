/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tree, type TreeDropCandidate, type TreeMoveInfo } from '../../Tree';

// Defined here, not in the .ct.tsx file: ct callback props are fire-and-forget, so canDrop's predicate must live in the mounted tree.
const rejectsFolders = (items: TreeDropCandidate[]) => items.every((item) => !item.isFolder);

export type ExpandedSiblingDropFixtureProps = {
    onMoveB?: (info: TreeMoveInfo) => void;
};

/** `B` is dragged past two expanded, rejecting siblings: `C` (empty header) and `A` (with children). */
export const ExpandedSiblingDropFixture = ({ onMoveB }: ExpandedSiblingDropFixtureProps) => (
    <Tree.Root reorderable>
        <Tree.Folder id="B" onMove={onMoveB}>
            <Tree.FolderHeader>
                <Tree.Label>B</Tree.Label>
            </Tree.FolderHeader>
        </Tree.Folder>
        <Tree.Folder id="C" isExpanded accepts={rejectsFolders}>
            <Tree.FolderHeader>
                <Tree.Label>C</Tree.Label>
            </Tree.FolderHeader>
        </Tree.Folder>
        <Tree.Folder id="A" isExpanded accepts={rejectsFolders}>
            <Tree.FolderHeader>
                <Tree.Label>A</Tree.Label>
            </Tree.FolderHeader>
            <Tree.Item id="a1">
                <Tree.Label>a1</Tree.Label>
            </Tree.Item>
            <Tree.Item id="a2">
                <Tree.Label>a2</Tree.Label>
            </Tree.Item>
        </Tree.Folder>
    </Tree.Root>
);
