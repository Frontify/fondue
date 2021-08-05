/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useState } from "react";
import { IconProps } from "@elements/Icon/IconProps";
import { IconSize } from "@elements/Icon/IconSize";
import IconCaretDown from "@elements/Icon/Generated/IconCaretDown";
import IconCaretRight from "@elements/Icon/Generated/IconCaretRight";
import { merge } from "@utilities/merge";

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

export const TreeNode = ({
    node: { id, value, name, label, icon, nodes },
    strong = false,
    activeNodeId = null,
    onClick,
    parentIds = [],
}: NodeProps): ReactElement<NodeProps> => {
    const [showNodes, setShowNodes] = useState(false);
    const selected = id === activeNodeId;

    /* eslint-disable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
    return (
        <li data-test-id="node">
            <a
                data-test-id="node-link"
                className={merge([
                    "flex items-center justify-center py-1 px-2 rounded cursor-pointer no-underline",
                    strong && "font-bold",
                    value && !selected && "hover:bg-black-5",
                    selected ? "bg-violet-60 text-white" : "text-black",
                    parentIds.length === 1 && "pl-8",
                    parentIds.length > 1 && "pl-16",
                ])}
                aria-selected={selected}
                onClick={() => {
                    if (!value) {
                        setShowNodes(!showNodes);
                        return;
                    }

                    if (onClick) {
                        onClick(activeNodeId === id ? null : id);
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
                <span className={merge(["ml-auto text-black-opacity-40 font-normal", selected && "text-black-50"])}>
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
    /* eslint-enable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
};
