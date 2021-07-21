/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps, IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@components/Icon/Svg/CaretDown.svg";
import { ReactComponent as IconCaretRight } from "@components/Icon/Svg/CaretRight.svg";
import { merge } from "@utilities/merge";
import { ReactElement, useState } from "react";
import css from "./Tree.module.css";

export interface TreeNodeProps {
    id: string;
    name: string;
    icon?: ReactElement<IconProps>;
    label?: string;
    value?: string;
    nodes?: TreeNodeProps[];
}

interface NodeProps {
    node: TreeNodeProps;
    strong?: boolean;
    activeNodeId?: string;
    onClick: (id: string) => void;
}

export default function TreeNode({
    node: { id, value, name, label, icon, nodes },
    strong = false,
    activeNodeId,
    onClick,
}: NodeProps): ReactElement<NodeProps> {
    const [showNodes, setShowNodes] = useState(false);

    return (
        <li data-test-id="node">
            <a
                className={merge([
                    css.nodeLink,
                    id === activeNodeId && css.nodeLinkSelected,
                    strong && css.strong,
                    value && css.selectableNodeLink,
                ])}
                onClick={() => {
                    if (value) {
                        onClick && onClick(id);
                    } else {
                        setShowNodes(!showNodes);
                    }
                }}
            >
                <span
                    data-test-id="toggle"
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowNodes(!showNodes);
                    }}
                >
                    {nodes &&
                        (showNodes ? (
                            <IconCaretDown size={IconSize.Size16} />
                        ) : (
                            <IconCaretRight size={IconSize.Size16} />
                        ))}
                </span>
                {icon && <span className={css.nodeIcon}>{icon}</span>}
                <span className={css.nodeName}>{name}</span>
                <span className={css.nodeLabel}>{label}</span>
            </a>
            {nodes && showNodes && (
                <ul className={css.tree} data-test-id="sub-tree">
                    {nodes.map((node) => {
                        return <TreeNode key={node.name} node={node} activeNodeId={activeNodeId} onClick={onClick} />;
                    })}
                </ul>
            )}
        </li>
    );
}
