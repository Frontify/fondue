/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps, IconSize } from "@components/Icon/Icon";
import { ReactComponent as IconCaretRight } from "@components/Icon/Svg/CaretRight.svg";
import { ReactElement, useEffect, useState } from "react";
import css from "./Tree.module.css";

export interface TreeNode {
    name: string;
    icon?: ReactElement<IconProps>;
    label?: string;
    link?: string;
    nodes?: TreeNode[];
}

export interface NodeProps {
    node: TreeNode;
    onToggle?: () => void;
    onClick?: () => void;
}

export default function Node({
    node: { name, label, icon, nodes },
    onToggle,
    onClick,
}: NodeProps): ReactElement<NodeProps> {
    const [showNodes, setShowNodes] = useState(false);
    const [active, setActive] = useState(false);

    return (
        <li className={css.node}>
            <a
                className={active ? `${css.nodeLink} ${css.nodeLinkActive}` : css.nodeLink}
                onClick={() => {
                    setActive(true);
                    onToggle && onToggle();
                }}
            >
                <span
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowNodes(!showNodes);
                        onClick && onClick();
                    }}
                >
                    {nodes && (
                        <IconCaretRight
                            size={IconSize.Size16}
                            className={showNodes ? `${css.nodeToggle} ${css.nodeToggleActive}` : css.nodeToggle}
                        />
                    )}
                </span>
                <span className={css.nodeIcon}>{icon}</span>
                <span>{name}</span>
                <span className={css.nodeLabel}>{label}</span>
            </a>
            {nodes && showNodes && (
                <ul className={css.tree}>
                    {nodes.map((node) => {
                        return <Node key={node.name} node={node} />;
                    })}
                </ul>
            )}
        </li>
    );
}
