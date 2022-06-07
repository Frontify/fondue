/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useState } from 'react';
import { merge } from '@utilities/merge';
import { AnimatePresence, motion } from 'framer-motion';
import { useDrag } from 'react-dnd';
import { DropZone, OnDropCallback } from '@components/DropZone';
import { TreeFlatListItem } from '@components/Tree';
import { DraggableItem, DropZonePosition } from '@utilities/dnd';
import { EditableNodeItem } from './components/EditableNodeItem';

export type RenderNodeArrayData = Omit<NodeProps, 'isFirst' | 'strong' | 'node'> & {
    nodes: DraggableItem<TreeNodeItem>[];
};

export const renderNodeArray = ({
    nodes,
    activeIds,
    treeName,
    onClick,
    onDrop,
    onEditableSave,
    parentIds,
}: RenderNodeArrayData) =>
    nodes.map((node, i) => (
        <Node
            key={node.id}
            node={node}
            nodeIndex={i}
            activeIds={activeIds}
            onClick={onClick}
            isFirst={i === 0}
            onDrop={onDrop}
            onEditableSave={onEditableSave}
            parentIds={parentIds}
            treeName={treeName}
        />
    ));

export interface TreeNodeItem extends TreeFlatListItem {
    nodes?: DraggableItem<TreeNodeItem>[];
}

type NodeProps = {
    node: DraggableItem<TreeNodeItem>;
    strong?: boolean;
    nodeIndex?: number;
    activeIds?: NullableString[];
    parentIds?: string[];
    onClick: (id: NullableString) => void;
    isFirst: boolean;
    treeName: string;
    onDrop?: OnDropCallback<TreeNodeItem>;
    onEditableSave?: (targetItemId: string, value: string) => void;
};

const baseClasses = 'tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal';

export const Node = ({
    node,
    strong = false,
    activeIds,
    onClick,
    parentIds = [],
    isFirst,
    onDrop,
    onEditableSave,
    treeName,
}: NodeProps): ReactElement<NodeProps> => {
    const { id, value, name, label, icon, nodes, actions, editable, badge } = node;
    const [{ opacity }, drag] = useDrag({
        item: { id, value, name, label, icon, nodes, actions, editable, badge },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
        type: treeName,
        canDrag: onDrop !== undefined,
    });
    const [showNodes, setShowNodes] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const selected = activeIds && activeIds.length > 0 && activeIds.includes(id);

    const setHoveredTrue = () => setIsHovered(true);
    const setHoveredFalse = () => setIsHovered(false);
    const onNodeClick = () => {
        if (!value) {
            setShowNodes(!showNodes);
            return;
        }

        if (onClick) {
            onClick(id);
        }
    };
    const toggleNodesVisibility = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowNodes(!showNodes);
    };

    const insertBadge = () => {
        return (
            <div
                data-test-id="node-badge"
                className={merge([
                    'tw-flex tw-justify-center tw-items-center tw-ml-2 tw-text-text-weak',
                    badge?.props.size && 'tw-w-8 tw-h-5 tw-bg-box-neutral tw-rounded-full',
                ])}
            >
                {badge}
            </div>
        );
    };

    /* eslint-disable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
    return (
        <li data-test-id="node" ref={drag} style={{ opacity }}>
            {isFirst && (
                <DropZone
                    data={{
                        targetItem: node,
                        position: DropZonePosition.Before,
                    }}
                    onDrop={onDrop}
                    treeName={treeName}
                />
            )}
            <DropZone
                data={{
                    targetItem: node,
                    position: DropZonePosition.Within,
                }}
                onDrop={onDrop}
                treeName={treeName}
            >
                <div
                    className={merge([
                        'tw-flex tw-py-2 tw-px-2.5 tw-no-underline tw-leading-5',
                        strong && 'tw-font-bold',
                        value &&
                            !selected &&
                            'tw-text-text hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
                        selected &&
                            'tw-font-medium tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover hover:tw-text-box-selected-strong-inverse-hover',
                    ])}
                    onMouseEnter={setHoveredTrue}
                    onMouseLeave={setHoveredFalse}
                >
                    <a
                        data-test-id="node-link"
                        className={merge([
                            'tw-flex tw-items-center tw-flex-grow tw-justify-between tw-cursor-pointer',
                            parentIds.length === 1 && 'tw-pl-4',
                            parentIds.length > 1 && 'tw-pl-8',
                        ])}
                        aria-selected={selected}
                        onClick={onNodeClick}
                    >
                        <div className="tw-flex tw-space-x-1 tw-items-center">
                            <span
                                data-test-id="toggle"
                                className="tw-w-2 tw-h-3 tw-flex tw-items-center tw-justify-center"
                                onClick={toggleNodesVisibility}
                            >
                                {nodes &&
                                    (showNodes ? (
                                        <div
                                            className={merge([
                                                baseClasses,
                                                'tw-border-l-4 tw-border-l-transparent tw-border-r-4 tw-border-r-transparent tw-border-t-4 tw-border-t-x-strong',
                                                selected && 'tw-text-box-selected-strong-inverse',
                                            ])}
                                        ></div>
                                    ) : (
                                        <div
                                            className={merge([
                                                baseClasses,
                                                'tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                                                selected && 'tw-text-box-selected-strong-inverse',
                                            ])}
                                        ></div>
                                    ))}
                            </span>
                            {icon && <span className="tw-flex tw-justify-center tw-items-center tw-w-5">{icon}</span>}
                            {editable && onEditableSave ? (
                                <EditableNodeItem name={name} targetItemId={node.id} onEditableSave={onEditableSave} />
                            ) : (
                                <span className="tw-flex tw-items-center" data-test-id="node-link-name">
                                    {name}
                                    {badge && insertBadge()}
                                </span>
                            )}
                        </div>
                        <div className="tw-px-1.5">
                            <span
                                className={merge([
                                    'tw-text-black-100 tw-text-opacity-40 tw-font-normal',
                                    selected && 'tw-text-box-selected-strong-inverse',
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
                                animate={{ width: 'auto' }}
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
                    {renderNodeArray({
                        nodes,
                        treeName,
                        activeIds,
                        onClick,
                        onDrop,
                        onEditableSave,
                        parentIds: [...parentIds, id],
                    })}
                </ul>
            )}
            <DropZone
                data={{
                    targetItem: node,
                    position: DropZonePosition.After,
                }}
                onDrop={onDrop}
                treeName={treeName}
            />
        </li>
    );
    /* eslint-enable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
};
