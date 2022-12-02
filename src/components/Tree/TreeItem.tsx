/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode, useState } from 'react';
import { useDrag } from 'react-dnd';

import { DropZone } from '@components/DropZone';
import type { TreeItemProps } from '@components/Tree/types';
import { useTreeContext } from '@components/Tree/TreeContext';
import { DraggableItem, DropZonePosition } from '@utilities/dnd';
import { merge } from '@utilities/merge';

const DRAGGING_OPACITY = 0.4;
const DEFAULT_OPACITY = 1;

export const TreeItem = ({ id, sort, label, contentComponent, onSelect, onDrop, children }: TreeItemProps) => {
    const { treeId, selectedIds, onSelect: onItemSelect, draggable } = useTreeContext();

    const [expanded, setExpanded] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    const [{ opacity }, drag] = useDrag({
        item: { id, sort },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? DRAGGING_OPACITY : DEFAULT_OPACITY,
        }),
        type: treeId,
        canDrag: draggable,
    });

    const handleDrop = (
        targetItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
        sourceItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
        position: DropZonePosition,
    ) => {
        onDrop?.(targetItem, sourceItem, position);
    };

    const handleSelect = () => {
        onItemSelect(id);
        onSelect?.(id);
    };

    const toggleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setExpanded((previousExpanded) => !previousExpanded);
    };

    const childrenArray = React.Children.toArray(children);

    let enhancedChildren: ReactNode = childrenArray;

    if (draggable) {
        enhancedChildren = React.Children.map(children, (child, index) => {
            if (!child) {
                return <></>;
            }

            return React.cloneElement(
                <>
                    {index === 0 && (
                        <DropZone
                            data={{
                                targetItem: { id, sort },
                                position: DropZonePosition.Before,
                            }}
                            onDrop={handleDrop}
                            treeId={treeId}
                        />
                    )}

                    {child}
                </>,
            );
        });
    }

    const caretComponent =
        childrenArray.length > 0 ? (
            <div
                className={merge([
                    'tw-transition-transform tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                    expanded ? 'tw-rotate-90' : '',
                    selectedIds.includes(id) && 'tw-text-box-selected-strong-inverse',
                ])}
            />
        ) : (
            <></>
        );

    return (
        <li data-test-id="tree-item" ref={drag} style={{ opacity }}>
            <DropZone
                data={{
                    targetItem: { id, sort },
                    position: DropZonePosition.Within,
                }}
                treeId={treeId}
            >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <div
                    className={merge([
                        'tw-flex tw-py-2 tw-px-2.5 tw-no-underline tw-leading-5 tw-h-10',
                        selectedIds.includes(id)
                            ? 'tw-font-medium tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover hover:tw-text-box-selected-strong-inverse-hover'
                            : 'tw-text-text hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
                    ])}
                    onClick={handleSelect}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-6">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                        <span
                            data-test-id="tree-item-toggle"
                            className="tw-w-2 tw-h-3 tw-flex tw-items-center tw-justify-center tw-py-3 tw-cursor-pointer"
                            onClick={toggleExpand}
                        >
                            {caretComponent}
                        </span>

                        {label && <span>{label}</span>}

                        {contentComponent && contentComponent({ selected: selectedIds.includes(id), hovered })}
                    </div>
                </div>
            </DropZone>

            {expanded && (
                <ul
                    className="tw-p-0 tw-m-0 tw-list-none tw-font-sans tw-font-normal tw-text-left [&>li]:tw-pl-4"
                    data-test-id="sub-tree-items"
                >
                    {enhancedChildren}
                </ul>
            )}

            <DropZone
                data={{
                    targetItem: { id, sort },
                    position: DropZonePosition.After,
                }}
                onDrop={handleDrop}
                treeId={treeId}
            />
        </li>
    );
};
