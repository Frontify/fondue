/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState, type ReactNode } from 'react';

import { Tree, type TreeChangeState, type TreeDropCandidate, type TreeNodeState } from '../../Tree';

/**
 * Stateful test harness that round-trips the canonical `TreeChangeState` through
 * `onChange` — mirroring how a consumer wires up a controlled Tree.
 *
 * With `renameable`, every row gets a "Rename <name>" action button that flips the
 * harness's `renamingId`, exercising the controlled `isRenaming` flow end-to-end
 * (renames land back in the tree through the `onChange` round-trip).
 *
 * Lives in `testutils/` (rather than inline in a `.ct.tsx` file) because Playwright's
 * component tests can only mount components reachable via a static `importSource`.
 * Inline components have no path to register against and fail with "Component ... cannot
 * be mounted".
 */
export type TestHarnessProps = {
    initial: TreeChangeState;
    multiSelect?: boolean;
    reorderable?: boolean;
    renameable?: boolean;
    accepts?: (items: TreeDropCandidate[]) => boolean;
    onChange?: (state: TreeChangeState) => void;
    onRename?: (id: string, newName: string) => void;
    onRenamingChange?: (id: string, isRenaming: boolean) => void;
};

export const TestHarness = ({
    initial,
    multiSelect = false,
    reorderable = false,
    renameable = false,
    accepts,
    onChange,
    onRename,
    onRenamingChange,
}: TestHarnessProps) => {
    const [nodes, setNodes] = useState(initial);
    const [renamingId, setRenamingId] = useState<string | null>(null);

    const renameProps = (node: TreeNodeState) =>
        renameable
            ? {
                  isRenaming: renamingId === node.id,
                  onRenamingChange: (isRenaming: boolean) => {
                      onRenamingChange?.(node.id, isRenaming);
                      setRenamingId(isRenaming ? node.id : null);
                  },
                  onRename: (newName: string) => onRename?.(node.id, newName),
              }
            : {};

    const renameAction = (node: TreeNodeState) =>
        renameable ? (
            <Tree.Action>
                <button type="button" onClick={() => setRenamingId(node.id)}>{`Rename ${node.name}`}</button>
            </Tree.Action>
        ) : null;

    const renderNodes = (list: TreeChangeState): ReactNode =>
        list.map((node) =>
            node.isFolder ? (
                <Tree.Folder
                    key={node.id}
                    id={node.id}
                    isExpanded={node.isExpanded}
                    isSelected={node.isSelected}
                    {...renameProps(node)}
                >
                    <Tree.FolderHeader>
                        <Tree.Label>{node.name}</Tree.Label>
                        {renameAction(node)}
                    </Tree.FolderHeader>
                    {renderNodes(node.children ?? [])}
                </Tree.Folder>
            ) : (
                <Tree.Item key={node.id} id={node.id} isSelected={node.isSelected} {...renameProps(node)}>
                    <Tree.Label>{node.name}</Tree.Label>
                    {renameAction(node)}
                </Tree.Item>
            ),
        );

    return (
        <Tree.Root
            multiSelect={multiSelect}
            reorderable={reorderable}
            accepts={accepts}
            onChange={(state) => {
                onChange?.(state);
                setNodes(state);
            }}
        >
            {renderNodes(nodes)}
        </Tree.Root>
    );
};
