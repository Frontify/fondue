/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

import { merge } from '@utilities/merge';
import { DraggableItem, DropZonePosition } from '@utilities/dnd';

import { DropZone } from '@components/DropZone';
import type { TreeItemProps } from '@components/Tree/types';
import { useTreeContext } from '@components/Tree/TreeContext';

import { useDraggableEnhancedChildren } from './hooks/useDraggableEnhancedChildren';
import { useDescendant } from './descendants';
import { DescendantContext } from './DescendantContext';

const DRAGGING_OPACITY = 0.4;
const DEFAULT_OPACITY = 1;

export const TreeItem = ({ id, sort, label, contentComponent, onDrop, type, accepts, children }: TreeItemProps) => {
    const { treeId, activeIndex, setActiveIndex, draggable, onDrop: onTreeDrop } = useTreeContext();

    const descendantRef = useRef<Nullable<HTMLLIElement>>(null);

    const descendantIndex = useDescendant(
        {
            // Assign the DOM node using a ref
            element: descendantRef.current,
        },
        // Tell the useDescendant hook to use a specific context.
        // This is key in case you have a compound component that needs index
        // tracking in separate correlating descendant components (like `Tabs`)
        DescendantContext,
    );

    // Now we know the index, so let's use it!
    const isSelected = descendantIndex === activeIndex;
    const select = () => {
        if (!isSelected) {
            setActiveIndex(descendantIndex);
        }
    };

    const [expanded, setExpanded] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    const [{ opacity }, drag] = useDrag({
        item: { id, sort, type },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? DRAGGING_OPACITY : DEFAULT_OPACITY,
            isDragging: monitor.isDragging(),
        }),
        type: type ?? treeId,
        canDrag: draggable,
    });

    const handleDrop = (
        targetItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
        sourceItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
        position: DropZonePosition,
    ) => {
        (onDrop ?? onTreeDrop)?.(targetItem, sourceItem, position);
    };

    const { draggableEnhancedChildren } = useDraggableEnhancedChildren({
        accept: getAcceptTypes(accepts ?? treeId, 'before'),
        onDrop: handleDrop,
        children,
    });

    const toggleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setExpanded((previousExpanded) => !previousExpanded);
    };

    const childrenArray = React.Children.toArray(children);

    let enhancedChildren: ReactNode = childrenArray;

    if (draggable) {
        enhancedChildren = draggableEnhancedChildren;
    }

    const caretComponent =
        childrenArray.length > 0 ? (
            <div
                className={merge([
                    'tw-transition-transform tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                    expanded ? 'tw-rotate-90' : '',
                ])}
            />
        ) : (
            <></>
        );

    return (
        <li
            data-test-id="tree-item"
            style={{ opacity }}
            ref={(element: HTMLLIElement) => {
                drag(element);
                descendantRef.current = element;
            }}
            tabIndex={-1}
            onMouseEnter={select}
        >
            <DropZone
                data-position={DropZonePosition.Within}
                data={{
                    targetItem: { id, sort, type },
                    position: DropZonePosition.Within,
                }}
                onDrop={handleDrop}
                accept={getAcceptTypes(accepts ?? treeId, 'within')}
            >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <div
                    className={merge([
                        'tw-flex tw-py-2 tw-px-2.5 tw-no-underline tw-leading-5 tw-h-10',
                        'tw-text-text hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
                    ])}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-6">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                        <span
                            data-test-id="tree-item-toggle"
                            className={merge([
                                'tw-w-2 tw-h-3 tw-flex tw-items-center tw-justify-center tw-py-3',
                                childrenArray.length > 0 && 'tw-cursor-pointer',
                            ])}
                            onClick={toggleExpand}
                        >
                            {caretComponent}
                        </span>

                        {label && <span>{label}</span>}

                        {contentComponent?.({ selected: false, hovered })}
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
                data-position={DropZonePosition.After}
                data={{
                    targetItem: { id, sort, type },
                    position: DropZonePosition.After,
                }}
                onDrop={handleDrop}
                accept={getAcceptTypes(accepts ?? treeId, 'after')}
            />
        </li>
    );
};

function getAcceptTypes<
    T extends { within: string | string[]; after: string | string[]; before: string | string[] } | string | string[],
>(accepts: T, position: 'within' | 'after' | 'before') {
    if (typeof accepts === 'object' && !(accepts instanceof Array)) {
        return accepts[position];
    } else {
        return accepts as string | string[];
    }
}
