/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useReducer, useState } from "react";
import Node, { TreeNode } from "./Node";
import css from "./Tree.module.css";

export interface TreeProps {
    nodes: TreeNode[];
}

export default function Tree({ nodes }: TreeProps): ReactElement<TreeProps> {
    const [activeNodeId, setActiveNodeId] = useState<string>();
    const onClick = (id: string) => setActiveNodeId(id);

    return (
        <ul data-test-id="Tree" className={css.tree}>
            {nodes.map((node) => (
                <Node key={node.id} node={node} activeNodeId={activeNodeId} strong onClick={onClick} />
            ))}
        </ul>
    );
}
