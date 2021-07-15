/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from "react";
import Node, { TreeNode } from "./Node";
import css from "./Tree.module.css";

export interface TreeProps {
    nodes: TreeNode[];
}

export default function Tree({ nodes }: TreeProps): ReactElement<TreeProps> {
    return (
        <ul data-test-id="Tree" className={css.tree}>
            {nodes.map((node) => (
                <Node key={node.name} node={node} />
            ))}
        </ul>
    );
}
