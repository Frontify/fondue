/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, KeyboardEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';

import { merge } from '@utilities/merge';
import { DraggableItem, DropZonePosition } from '@utilities/dnd';

import { DropZone } from '@components/DropZone';
import type { TreeItemProps } from '@components/Tree/types';
import { useTreeContext } from '@components/Tree/TreeContext';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

import { getAcceptTypes, getItemPositionInParent, getNextItemToFocus, getPreviousItemToFocus } from './helpers';
import { cloneThroughFragments, flattenChildren, isDescendant } from './utils';
import { DEFAULT_TREE_ITEM_PADDING } from './utils/defaultValues';

const DRAGGING_OPACITY = 0.4;
const DEFAULT_OPACITY = 1;

export const TreeItem = ({
    id,
    parentId,
    label,
    draggable: propsDraggable,
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
        registerTreeItemChildren,
        unregisterTreeItem,
        treeState,
        baseItemPadding,
    } = useTreeContext();

    const treeItemState = treeState.items.get(id);
    const itemRef = useRef<HTMLDivElement>(null);

    const [hovered, setHovered] = useState<boolean>(false);
    const handleMouseEnter = useCallback(() => setHovered(true), []);
    const handleMouseLeave = useCallback(() => setHovered(false), []);

    const sort = useMemo(
        () => (treeItemState?.parentId ? getItemPositionInParent(id, treeItemState.parentId, treeState) : -1),
        [id, treeItemState?.parentId, treeState],
    );

    useEffect(() => {
        if (itemRef.current) {
            registerTreeItem({
                id,
                parentId,
                level: level ?? 0,
                domElement: itemRef.current,
            });

            return () => {
                unregisterTreeItem(id);
            };
        }
    }, [id, level, parentId, registerTreeItem, unregisterTreeItem, itemRef]);

    useEffect(() => {
        const childrenIds = flattenChildren(children).map((child) => child.props.id);
        registerTreeItemChildren({ id, childrenIds: childrenIds.length > 0 ? childrenIds : undefined });
    }, [children, id, registerTreeItemChildren]);

    const [{ opacity }, drag] = useDrag({
        item: { id, type, sort },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? DRAGGING_OPACITY : DEFAULT_OPACITY,
            isDragging: monitor.isDragging(),
        }),
        type: type ?? treeId,
        canDrag: propsDraggable ?? draggable,
    });

    const handleDrop = useCallback(
        (
            targetItem: DraggableItem<{ id: string; sort: number }>,
            sourceItem: DraggableItem<{ id: string; sort: number }>,
            position: DropZonePosition,
        ) => {
            onTreeDrop(targetItem, sourceItem, position);
            onDrop?.(targetItem, sourceItem, position);
        },
        [onDrop, onTreeDrop],
    );

    const handleSelect = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            if (itemRef.current && isDescendant(event.target as HTMLElement, itemRef.current)) {
                event.stopPropagation();
                onSelect(id);
            }
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
            if (document.activeElement === itemRef.current && (event.key === 'Space' || event.key === 'Enter')) {
                event.stopPropagation();
                onExpand(id, !treeState.expandedIds.has(id));
            }
        },
        [id, onExpand, treeState.expandedIds],
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (document.activeElement === itemRef.current) {
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
            }
        },
        [id, onExpand, onSelect, treeItemState, treeState],
    );

    const enhancedChildren = useMemo(
        () => (children ? cloneThroughFragments(children, { parentId: id, level: (level || 0) + 1 }) : []),
        [children, id, level],
    );

    const hasChildren = Children.count(enhancedChildren) > 0;

    const paddingLeftByLevel = (treeItemState?.level ?? 0) * 16 + baseItemPadding.left;
    // Dropzone positioning is matched with existing styles from before https://github.com/Frontify/fondue/pull/1270
    const dropzonePadding = paddingLeftByLevel - DEFAULT_TREE_ITEM_PADDING.left;

    return (
        <li data-test-id="tree-item" ref={drag} style={{ opacity, transform: 'translate3d(0, 0, 0)' }}>
            {sort === 0 ? (
                <div
                    style={{
                        paddingLeft: dropzonePadding,
                    }}
                >
                    <DropZone
                        data-position={DropZonePosition.Before}
                        data={{
                            targetItem: { id, sort: sort ?? 0, type },
                            position: DropZonePosition.Before,
                        }}
                        onDrop={handleDrop}
                        accept={getAcceptTypes(accepts ?? treeId, 'before')}
                    />
                </div>
            ) : null}

            <DropZone
                data-position={DropZonePosition.Within}
                data={{
                    targetItem: { id, sort: sort ?? 0, type },
                    position: DropZonePosition.Within,
                }}
                onDrop={handleDrop}
                accept={getAcceptTypes(accepts ?? treeId, 'within')}
            >
                <div
                    className={merge([
                        treeState.selectedIds.has(id)
                            ? 'tw-font-medium tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse hover:tw-bg-box-neutral-strong-hover hover:tw-text-box-neutral-strong-inverse-hover'
                            : 'tw-text-text hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
                        FOCUS_VISIBLE_STYLE,
                        'tw-leading-5 tw-no-underline tw-flex',
                    ])}
                    data-test-id="tree-item-content"
                    style={{
                        paddingLeft: paddingLeftByLevel,
                        paddingRight: baseItemPadding.right,
                        paddingTop: baseItemPadding.top,
                        paddingBottom: baseItemPadding.bottom,
                    }}
                    ref={itemRef}
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
                    <div className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-6 tw-min-w-0">
                        <div className="tw-w-2 tw-h-3 tw-flex tw-items-center tw-justify-center">
                            {hasChildren && (
                                <button
                                    data-test-id="tree-item-toggle"
                                    className="tw-flex tw-items-center tw-justify-center tw-p-1.5 tw-cursor-pointer"
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
                    className="tw-p-0 tw-m-0 tw-list-none tw-font-sans tw-font-normal tw-text-left"
                    data-test-id="sub-tree-items"
                >
                    {enhancedChildren}
                </ul>
            ) : null}

            <div
                style={{
                    paddingLeft: dropzonePadding,
                }}
            >
                <DropZone
                    data-position={DropZonePosition.After}
                    data={{
                        targetItem: { id, sort: sort ?? 0, type },
                        position: DropZonePosition.After,
                    }}
                    onDrop={handleDrop}
                    accept={getAcceptTypes(accepts ?? treeId, 'after')}
                />
            </div>
        </li>
    );
};
TreeItem.displayName = 'FondueTreeItem';
