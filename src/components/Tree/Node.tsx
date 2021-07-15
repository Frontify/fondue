/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps, IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@components/Icon/Svg/CaretDown.svg";
import { ReactComponent as IconCaretRight } from "@components/Icon/Svg/CaretRight.svg";
import { ReactElement, useEffect, useState } from "react";
import css from "./Tree.module.css";

export interface TreeNode {
    id: string;
    name: string;
    icon?: ReactElement<IconProps>;
    label?: string;
    value?: string;
    nodes?: TreeNode[];
}

export interface NodeProps {
    node: TreeNode;
    strong?: boolean;
    activeNodeId?: string;
    onClick: (id: string) => void;
}

export default function Node({
    node: { id, value, name, label, icon, nodes },
    strong,
    activeNodeId,
    onClick,
}: NodeProps): ReactElement<NodeProps> {
    const [showNodes, setShowNodes] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => setActive(id === activeNodeId), [activeNodeId]);

    const classNames = [css.nodeLink];
    if (active) {
        classNames.push(css.nodeLinkActive);
    }
    if (strong) {
        classNames.push(css.nodeLinkStrong);
    }

    return (
        <li className={css.node}>
            <a
                className={classNames.join(" ")}
                onClick={() => {
                    if (value) {
                        setActive(true);
                        onClick && onClick(id);
                    }
                }}
            >
                <span
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
                <span className={active ? [css.nodeLabel, css.nodeLabelActive].join(" ") : css.nodeLabel}>{label}</span>
            </a>
            {nodes && showNodes && (
                <ul className={css.tree}>
                    {nodes.map((node) => {
                        return <Node key={node.name} node={node} activeNodeId={activeNodeId} onClick={onClick} />;
                    })}
                </ul>
            )}
        </li>
    );
}
