/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useState } from "react";
import { IconProps } from "@foundation/Icon/IconProps";
import { IconSize } from "@foundation/Icon/IconSize";
import IconCaretDown from "@foundation/Icon/Generated/IconCaretDown";
import IconCaretRight from "@foundation/Icon/Generated/IconCaretRight";
import { merge } from "@utilities/merge";
import { AnimatePresence, motion } from "framer-motion";
import { useDrag } from "react-dnd";
import { DropZone, DropZonePosition, OnDropCallback } from "@components/Tree/DropZone";

export const renderNodeArray = (
    nodes: TreeNodeProps[],
    activeNodeId: NullableString,
    onClick: (id: NullableString) => void,
    onDrop?: OnDropCallback,
    parentIds?: string[],
) =>
    nodes.map((node, i) => (
        <TreeNode
            key={node.id}
            node={node}
            activeNodeId={activeNodeId}
            strong
            onClick={onClick}
            isFirst={i === 0}
            onDrop={onDrop}
            parentIds={parentIds}
        />
    ));

export interface TreeNodeProps {
    id: string;
    name: string;
    icon?: ReactElement<IconProps>;
    label?: string;
    value?: string;
    nodes?: TreeNodeProps[];
    actions?: React.ReactNode[];
}

type NodeProps = {
    node: TreeNodeProps;
    strong?: boolean;
    activeNodeId?: NullableString;
    parentIds?: string[];
    onClick: (id: NullableString) => void;
    isFirst: boolean;
    onDrop?: OnDropCallback;
};

export const TreeNode = ({
    node,
    strong = false,
    activeNodeId = null,
    onClick,
    parentIds = [],
    isFirst,
    onDrop,
}: NodeProps): ReactElement<NodeProps> => {
    const { id, value, name, label, icon, nodes, actions } = node;
    const [{ opacity }, drag] = useDrag({
        item: { id, value, name, label, icon, nodes, actions },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
        type: "item",
        canDrag: onDrop !== undefined,
    });
    const [showNodes, setShowNodes] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const selected = id === activeNodeId;

    const setHoveredTrue = () => setIsHovered(true);
    const setHoveredFalse = () => setIsHovered(false);
    const onNodeClick = () => {
        if (!value) {
            setShowNodes(!showNodes);
            return;
        }

        if (onClick) {
            onClick(selected ? null : id);
        }
    };
    const toggleNodesVisibility = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowNodes(!showNodes);
    };

    /* eslint-disable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
    return (
        <li
            data-test-id="node"
            ref={drag}
            style={{ opacity }}
            className={merge([parentIds.length === 1 && "tw-pl-8", parentIds.length > 1 && "tw-pl-16"])}
        >
            {isFirst && (
                <DropZone
                    data={{
                        targetItem: node,
                        position: DropZonePosition.BEFORE,
                    }}
                    onDrop={onDrop}
                />
            )}
            <DropZone
                data={{
                    targetItem: node,
                    position: DropZonePosition.WITHIN,
                }}
                onDrop={onDrop}
            >
                <div
                    className={merge([
                        " tw-flex tw-py-1 tw-px-2 tw-rounded tw-no-underline tw-leading-6",
                        strong && "tw-font-bold",
                        value && !selected && "hover:tw-bg-black-5",
                        selected ? "tw-bg-violet-60 tw-text-white" : "tw-text-black",
                    ])}
                    onMouseEnter={setHoveredTrue}
                    onMouseLeave={setHoveredFalse}
                >
                    <a
                        data-test-id="node-link"
                        className="tw-flex tw-items-center tw-flex-grow tw-justify-between tw-cursor-pointer"
                        aria-selected={selected}
                        onClick={onNodeClick}
                    >
                        <div className="tw-flex tw-space-x-2 tw-items-center">
                            <span data-test-id="toggle" onClick={toggleNodesVisibility}>
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
                        <div className="tw-px-1.5">
                            <span
                                className={merge([
                                    "tw-text-black-100 tw-text-opacity-40 tw-font-normal",
                                    selected && "tw-text-black-50",
                                ])}
                            >
                                {label}
                            </span>
                        </div>
                    </a>
                    <AnimatePresence>
                        {actions && (isHovered || selected) && (
                            <motion.div
                                className="tw-flex tw-space-x-1.5 tw-items-center"
                                initial={{ width: 0 }}
                                animate={{ width: "auto" }}
                                exit={{ width: 0 }}
                                transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
                            >
                                {actions.map((action) => action)}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DropZone>

            {nodes && showNodes && (
                <ul
                    className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left"
                    data-test-id="sub-tree"
                >
                    {renderNodeArray(nodes, activeNodeId, onClick, onDrop, [...parentIds, id])}
                </ul>
            )}
            <DropZone
                data={{
                    targetItem: node,
                    position: DropZonePosition.AFTER,
                }}
                onDrop={onDrop}
            />
        </li>
    );
    /* eslint-enable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
};
