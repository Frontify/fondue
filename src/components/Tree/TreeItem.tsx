/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, {
    Children,
    KeyboardEvent,
    MouseEvent,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useDrag } from 'react-dnd';

import { merge } from '@utilities/merge';
import { DraggableItem, DropZonePosition } from '@utilities/dnd';

import { DropZone } from '@components/DropZone';
import type { TreeItemProps } from '@components/Tree/types';
import { useTreeContext } from '@components/Tree/TreeContext';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

import { useDraggableEnhancedChildren } from './hooks';
import { getAcceptTypes, getItemPositionInParent, getNextItemToFocus, getPreviousItemToFocus } from './helpers';
import { cloneThroughFragments, flattenChildren } from './utils';

const DRAGGING_OPACITY = 0.4;
const DEFAULT_OPACITY = 1;

export const TreeItem = ({
    id,
    parentId,
    label,
    contentComponent,
    onDrop,
    type,
    accepts,
    children,
    level,
}: TreeItemProps) => {
    const {
        treeId,
        draggable,
        onSelect,
        onExpand,
        onDrop: onTreeDrop,
        registerTreeItem,
        unregisterTreeItem,
        treeState,
    } = useTreeContext();

    const treeItemState = treeState.items.get(id);
    const itemRef = useRef<HTMLDivElement>(null);

    const [hovered, setHovered] = useState<boolean>(false);
    const handleMouseEnter = useCallback(() => setHovered(true), []);
    const handleMouseLeave = useCallback(() => setHovered(false), []);

    const sort = treeItemState?.parentId ? getItemPositionInParent(id, treeItemState.parentId, treeState) : -1;

    useEffect(() => {
        if (itemRef.current) {
            const childrenIds = flattenChildren(children).map((child) => child.props.id);

            registerTreeItem({
                id,
                parentId,
                childrenIds: childrenIds.length > 0 ? childrenIds : undefined,
                level: level ?? 0,
                domElement: itemRef.current,
            });

            return () => {
                unregisterTreeItem(id);
            };
        }
    }, [id, level, parentId, registerTreeItem, unregisterTreeItem, itemRef, children]);

    const [{ opacity }, drag] = useDrag({
        item: { id, type, sort },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? DRAGGING_OPACITY : DEFAULT_OPACITY,
            isDragging: monitor.isDragging(),
        }),
        type: type ?? treeId,
        canDrag: draggable,
    });

    const handleDrop = useCallback(
        (
            targetItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
            sourceItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
            position: DropZonePosition,
        ) => {
            (onDrop ?? onTreeDrop)?.(targetItem, sourceItem, position);
        },
        [onDrop, onTreeDrop],
    );

    const handleSelect = useCallback(
        (event: MouseEvent) => {
            event.stopPropagation();
            onSelect(id);
        },
        [id, onSelect],
    );

    const handleExpandClick = useCallback(
        (event: MouseEvent) => {
            event.stopPropagation();
            onExpand(id, !treeState.expandedIds.has(id));
        },
        [id, onExpand, treeState.expandedIds],
    );

    const handleExpandKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Space' || event.key === 'Enter') {
                event.stopPropagation();
                onExpand(id, !treeState.expandedIds.has(id));
            }
        },
        [id, onExpand, treeState.expandedIds],
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            switch (event.code) {
                case 'Enter':
                    event.preventDefault();
                    onSelect(id);
                    break;

                case 'Space':
                    event.preventDefault();
                    if (treeItemState?.childrenIds) {
                        onExpand(id, !treeState.expandedIds.has(id));
                    } else {
                        onSelect(id);
                    }
                    break;

                case 'ArrowRight':
                    event.preventDefault();
                    if (treeItemState?.childrenIds && !treeState.expandedIds.has(id)) {
                        onExpand(id, true);
                    } else if (treeItemState?.childrenIds?.[0]) {
                        const firstChildId = treeItemState.childrenIds[0];
                        const firstChildState = treeState.items.get(firstChildId);
                        firstChildState?.domElement?.focus();
                    }
                    break;

                case 'ArrowLeft':
                    event.preventDefault();
                    if (treeItemState?.childrenIds && treeState.expandedIds.has(id)) {
                        onExpand(id, false);
                    } else if (treeItemState?.parentId) {
                        const parentId = treeItemState.parentId;
                        const parentState = treeState.items.get(parentId);
                        parentState?.domElement?.focus();
                    }
                    break;

                case 'ArrowUp':
                    event.preventDefault();
                    if (treeItemState) {
                        const previousItemToFocus = getPreviousItemToFocus(id, treeItemState, treeState);
                        previousItemToFocus?.domElement?.focus();
                    }
                    break;

                case 'ArrowDown':
                    event.preventDefault();
                    if (treeItemState) {
                        const nextItemToFocus = getNextItemToFocus(id, treeItemState, treeState);
                        nextItemToFocus?.domElement?.focus();
                    }
                    break;
            }
        },
        [id, onExpand, onSelect, treeItemState, treeState],
    );

    const childrenArray = useMemo(
        () =>
            children
                ? cloneThroughFragments(children, {
                      parentId: id,
                      level: (level || 0) + 1,
                  })
                : [],
        [children, id, level],
    );

    const { draggableEnhancedChildren } = useDraggableEnhancedChildren({
        accept: getAcceptTypes(accepts ?? treeId, 'before'),
        onDrop: handleDrop,
        children: childrenArray,
        sort,
    });
    const enhancedChildren: ReactNode = draggable ? draggableEnhancedChildren : childrenArray;

    const hasChildren = Children.count(enhancedChildren) > 0;

    return (
        <li data-test-id="tree-item" ref={drag} style={{ opacity }}>
            <DropZone
                data-position={DropZonePosition.Within}
                data={{
                    targetItem: { id, sort, type },
                    position: DropZonePosition.Within,
                }}
                onDrop={handleDrop}
                accept={getAcceptTypes(accepts ?? treeId, 'within')}
            >
                <div
                    ref={itemRef}
                    className={merge([
                        'tw-flex tw-py-2 tw-px-2.5 tw-no-underline tw-leading-5 tw-h-10',
                        FOCUS_VISIBLE_STYLE,
                        treeState.selectedIds.has(id)
                            ? 'tw-font-medium tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover hover:tw-text-box-selected-strong-inverse-hover'
                            : 'tw-text-text hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
                    ])}
                    role="treeitem"
                    aria-label={label}
                    aria-level={treeItemState?.level}
                    aria-selected={treeState.selectedIds.has(id)}
                    aria-expanded={treeState.expandedIds.has(id)}
                    tabIndex={0}
                    onClick={handleSelect}
                    onKeyDown={handleKeyDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-6">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                        <div className="tw-w-2 tw-h-3 tw-flex tw-items-center tw-justify-center">
                            {hasChildren && (
                                <button
                                    data-test-id="tree-item-toggle"
                                    className="tw-flex tw-items-center tw-justify-center tw-py-3 tw-cursor-pointer"
                                    onClick={handleExpandClick}
                                    onKeyDown={handleExpandKeyDown}
                                    tabIndex={0}
                                >
                                    <div
                                        className={merge([
                                            'tw-transition-transform tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                                            treeState.selectedIds.has(id) && 'tw-text-box-selected-strong-inverse',
                                            treeState.expandedIds.has(id) && 'tw-rotate-90',
                                        ])}
                                    />
                                </button>
                            )}
                        </div>

                        {label ? <span>{label}</span> : null}

                        {contentComponent?.({ selected: treeState.selectedIds.has(id) ?? false, hovered })}
                    </div>
                </div>
            </DropZone>

            {treeState.expandedIds.has(id) ? (
                <ul
                    className="tw-p-0 tw-m-0 tw-list-none tw-font-sans tw-font-normal tw-text-left [&>li]:tw-pl-4"
                    data-test-id="sub-tree-items"
                >
                    {enhancedChildren}
                </ul>
            ) : null}

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
