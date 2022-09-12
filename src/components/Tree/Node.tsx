/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useState } from 'react';
import { merge } from '@utilities/merge';
import { useDrag } from 'react-dnd';
import { DropZone, OnDropCallback } from '@components/DropZone';
import { TreeFlatListItem } from '@components/Tree';
import { DraggableItem, DropZonePosition } from '@utilities/dnd';
import { EditableInput } from '../EditableInput';

export type RenderNodeArrayData = Omit<NodeProps, 'isFirst' | 'strong' | 'node'> & {
    nodes: DraggableItem<TreeNodeItem>[];
};

export const renderNodeArray = ({
    nodes,
    activeIds,
    treeId,
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
            treeId={treeId}
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
    treeId: string;
    onDrop?: OnDropCallback<TreeNodeItem>;
    onEditableSave?: (targetItemId: string, value: string) => void;
};

export const Node = ({
    node,
    strong = false,
    activeIds,
    onClick,
    parentIds = [],
    isFirst,
    onDrop,
    onEditableSave,
    treeId,
}: NodeProps): ReactElement<NodeProps> => {
    const { id, value, name, label, icon, nodes, actions, editable, badge } = node;
    const [{ opacity }, drag] = useDrag({
        item: { id, value, name, label, icon, nodes, actions, editable, badge },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
        type: treeId,
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
                    treeId={treeId}
                />
            )}
            <DropZone
                data={{
                    targetItem: node,
                    position: DropZonePosition.Within,
                }}
                onDrop={onDrop}
                treeId={treeId}
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
                                {nodes && (
                                    <div
                                        className={merge([
                                            'tw-transition-transform tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                                            showNodes ? 'tw-rotate-90' : '',
                                            selected && 'tw-text-box-selected-strong-inverse',
                                        ])}
                                    ></div>
                                )}
                            </span>
                            {icon && <span className="tw-flex tw-justify-center tw-items-center tw-w-5">{icon}</span>}
                            {editable && onEditableSave ? (
                                <>
                                    <EditableInput
                                        options={{ additionalValues: node.id, enableDoubleClick: true }}
                                        onAdditionalValueSave={onEditableSave}
                                    >
                                        <div className={'tw-flex'}>{name}</div>
                                    </EditableInput>
                                    {badge && insertBadge()}
                                </>
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
                                    'tw-text-black-100 tw-text-opacity-40 tw-text-xs tw-font-normal',
                                    selected && 'tw-text-box-selected-strong-inverse',
                                ])}
                            >
                                {label}
                            </span>
                        </div>
                    </a>

                    {actions && (
                        <div
                            className={merge([
                                'tw-flex tw-items-center',
                                isHovered || selected ? 'tw-visible tw-space-x-1.5' : 'tw-invisible tw-w-0',
                            ])}
                        >
                            {actions.map((action) => action)}
                        </div>
                    )}
                </div>
            </DropZone>

            {nodes && showNodes && (
                <ul
                    className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left"
                    data-test-id="sub-tree"
                >
                    {renderNodeArray({
                        nodes,
                        treeId,
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
                treeId={treeId}
            />
        </li>
    );
    /* eslint-enable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
};
