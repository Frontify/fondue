/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps, IconSize } from "@elements/Icon/Icon";
import { ReactComponent as IconCaretDown } from "@elements/Icon/Svg/CaretDown.svg";
import { ReactComponent as IconCaretRight } from "@elements/Icon/Svg/CaretRight.svg";
import { merge } from "@utilities/merge";
import { ReactElement, useState } from "react";

export type TreeNodeProps = {
    id: string;
    name: string;
    icon?: ReactElement<IconProps>;
    label?: string;
    value?: string;
    nodes?: TreeNodeProps[];
};

type NodeProps = {
    node: TreeNodeProps;
    strong?: boolean;
    activeNodeId?: string | null;
    parentIds?: string[];
    onClick: (id: string | null) => void;
};

export default function TreeNode({
    node: { id, value, name, label, icon, nodes },
    strong = false,
    activeNodeId = null,
    onClick,
    parentIds = [],
}: NodeProps): ReactElement<NodeProps> {
    const [showNodes, setShowNodes] = useState(false);
    const selected = id === activeNodeId;

    return (
        <li data-test-id="node">
            <a
                data-test-id="node-link"
                className={merge([
                    "flex items-center justify-center py-1 px-2 rounded text-black cursor-pointer no-underline",
                    strong && "font-bold",
                    value && !selected && "hover:bg-black-5",
                    selected && "bg-violet-60 text-white",
                    parentIds.length == 1 && "pl-8",
                    parentIds.length > 1 && "pl-16",
                ])}
                aria-selected={selected}
                onClick={() => {
                    if (!value) {
                        setShowNodes(!showNodes);
                        return;
                    }

                    if (activeNodeId === id) {
                        onClick && onClick(null);
                    } else {
                        onClick && onClick(id);
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
                {icon && <span className="pl-2">{icon}</span>}
                <span className="pl-2" data-test-id="node-link-name">
                    {name}
                </span>
                <span
                    className={merge(["ml-auto text-black-opacity-40 font-normal", selected && "text-black-hsla-60"])}
                >
                    {label}
                </span>
            </a>

            {nodes && showNodes && (
                <ul className="p-0 m-0 font-sans font-normal list-none text-left" data-test-id="sub-tree">
                    {nodes.map((node) => {
                        return (
                            <TreeNode
                                key={node.id}
                                node={node}
                                activeNodeId={activeNodeId}
                                onClick={onClick}
                                parentIds={[...parentIds, id]}
                            />
                        );
                    })}
                </ul>
            )}
        </li>
    );
}
