/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useEffect, useState } from "react";
import { TreeNode, TreeNodeProps } from "./Node";

export type TreeProps = {
    nodes: TreeNodeProps[];
    onSelect: (id: string | null) => void;
    activeNodeId?: string | null;
};

export const Tree: FC<TreeProps> = ({ nodes, onSelect, activeNodeId: initialActiveNodeId = null }) => {
    const [activeNodeId, setActiveNodeId] = useState<string | null>(initialActiveNodeId);
    useEffect(() => setActiveNodeId(initialActiveNodeId), [initialActiveNodeId]);

    return (
        <ul data-test-id="tree" className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm">
            {nodes.map((node) => (
                <TreeNode
                    key={node.id}
                    node={node}
                    activeNodeId={activeNodeId}
                    strong
                    onClick={(id: string | null) => {
                        setActiveNodeId(id);
                        onSelect(id);
                    }}
                />
            ))}
        </ul>
    );
};
