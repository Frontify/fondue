/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useState } from "react";
import Node, { TreeNode } from "./Node";
import css from "./Tree.module.css";

export interface TreeProps {
    nodes: TreeNode[];
    onSelect: (id: string) => void;
    selectedNodeId?: string;
}

export default function Tree({ nodes, onSelect, selectedNodeId }: TreeProps): ReactElement<TreeProps> {
    const [activeNodeId, setActiveNodeId] = useState<string | undefined>(selectedNodeId);
    const onClick = (id: string) => {
        setActiveNodeId(id);
        onSelect(id);
    };

    return (
        <ul data-test-id="Tree" className={css.tree}>
            {nodes.map((node) => (
                <Node key={node.id} node={node} activeNodeId={activeNodeId} strong onClick={onClick} />
            ))}
        </ul>
    );
}
