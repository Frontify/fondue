/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useState } from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize } from "@foundation/Icon/IconSize";
import IconCaretDown from "@foundation/Icon/Generated/IconCaretDown";
import IconCaretRight from "@foundation/Icon/Generated/IconCaretRight";
import { merge } from "@utilities/merge";

export type TreeNodeProps = {
    id: string;
    name: string;
    icon?: ReactElement<IconProps>;
    label?: string;
    value?: string;
    nodes?: TreeNodeProps[];
    actions?: React.ReactNode[];
};

type NodeProps = {
    node: TreeNodeProps;
    strong?: boolean;
    activeNodeId?: string | null;
    parentIds?: string[];
    onClick: (id: string | null) => void;
};

export const TreeNode = ({
    node: { id, value, name, label, icon, nodes, actions },
    strong = false,
    activeNodeId = null,
    onClick,
    parentIds = [],
}: NodeProps): ReactElement<NodeProps> => {
    const [showNodes, setShowNodes] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const selected = id === activeNodeId;

    /* eslint-disable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
    return (
        <li data-test-id="node">
            <a
                data-test-id="node-link"
                className={merge([
                    "tw-flex tw-items-center tw-justify-between tw-py-1 tw-px-2 tw-rounded tw-cursor-pointer tw-no-underline tw-leading-6",
                    strong && "tw-font-bold",
                    value && !selected && "hover:tw-bg-black-5",
                    selected ? "tw-bg-violet-60 tw-text-white" : "tw-text-black",
                    parentIds.length === 1 && "tw-pl-8",
                    parentIds.length > 1 && "tw-pl-16",
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
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="tw-flex tw-space-x-2 tw-items-center">
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
                    {icon && <span>{icon}</span>}
                    <span data-test-id="node-link-name">{name}</span>
                </div>
                <div className="tw-flex tw-space-x-1.5 tw-items-center">
                    <span
                        className={merge([
                            "tw-text-black-100 tw-text-opacity-40 tw-font-normal",
                            selected && "tw-text-black-50",
                        ])}
                    >
                        {label}
                    </span>
                    {actions && (isHovered || activeNodeId === id) && actions.forEach((action) => action)}
                </div>
            </a>

            {nodes && showNodes && (
                <ul
                    className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left"
                    data-test-id="sub-tree"
                >
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
