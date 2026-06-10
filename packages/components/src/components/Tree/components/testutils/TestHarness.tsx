/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState, type ReactNode } from 'react';

import { Tree, type TreeChangeState, type TreeDropCandidate } from '../../Tree';

const renderNodes = (nodes: TreeChangeState): ReactNode =>
    nodes.map((node) =>
        node.isFolder ? (
            <Tree.Folder
                key={node.id}
                id={node.id}
                label={node.name}
                isExpanded={node.isExpanded}
                isSelected={node.isSelected}
            >
                {renderNodes(node.children ?? [])}
            </Tree.Folder>
        ) : (
            <Tree.Item key={node.id} id={node.id} label={node.name} isSelected={node.isSelected} />
        ),
    );

/**
 * Stateful test harness that round-trips the canonical `TreeChangeState` through
 * `onChange` — mirroring how a consumer wires up a controlled Tree.
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
    accepts?: (items: TreeDropCandidate[]) => boolean;
    onChange?: (state: TreeChangeState) => void;
};

export const TestHarness = ({
    initial,
    multiSelect = false,
    reorderable = false,
    accepts,
    onChange,
}: TestHarnessProps) => {
    const [nodes, setNodes] = useState(initial);
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
