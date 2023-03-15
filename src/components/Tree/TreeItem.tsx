/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, KeyboardEvent, MouseEvent, useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DragEndEvent, DragStartEvent, useDndContext, useDndMonitor } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { merge } from '@utilities/merge';
import { IconGrabHandle12 } from '@foundation/Icon';

import type { CollisionPosition, TreeItemProps } from '@components/Tree/types';
import { useTreeContext } from '@components/Tree/TreeContext';

import { cloneThroughFragments, flattenChildren, isDescendant } from './utils';
import { getItemPositionInParent, getNextItemToFocus, getPreviousItemToFocus, getSupportedDrop } from './helpers';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

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
    draggable: draggableItem = true,
}: TreeItemProps) => {
    const {
        onExpand,
        onSelect,
        treeState,
        draggable,
        registerOverlay,
        registerTreeItem,
        unregisterTreeItem,
        registerTreeItemChildren,
    } = useTreeContext();

    const treeItemState = treeState.items.get(id);

    const enhancedChildren = useMemo(
        () => (children ? cloneThroughFragments(children, { parentId: id, level: (level || 0) + 1 }) : []),
        [children, id, level],
    );

    const { collisions, active, over } = useDndContext();

    const collision = useMemo(() => collisions?.find((collision) => collision.id === id), [collisions, id]);

    const supportedDrop = getSupportedDrop(accepts, active?.data?.current?.type);

    const handleItemDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { over, active } = event;

            if (
                onDrop &&
                over?.id === id &&
                active.id !== over?.id &&
                supportedDrop[collision?.data?.position as CollisionPosition]
            ) {
                const treeItemStateOver = treeState.items.get(over.id);
                const treeItemStateActive = treeState.items.get(active.id);

                const sortActive = treeItemStateActive?.parentId
                    ? getItemPositionInParent(active.id, treeItemStateActive.parentId, treeState)
                    : -1;

                const sortOver = treeItemStateOver?.parentId
                    ? getItemPositionInParent(over.id, treeItemStateOver.parentId, treeState)
                    : -1;

                onDrop(
                    { id: over.id.toString(), type: over?.data?.current?.type, sort: sortOver },
                    { id: active.id.toString(), type: active.data?.current?.type, sort: sortActive },
                    collision?.data?.position ?? undefined,
                );
            }
        },
        [collision?.data?.position, id, onDrop, supportedDrop, treeState],
    );

    const handleItemDragStart = useCallback(
        (event: DragStartEvent) => {
            if (event.active.id !== id) {
                return;
            }

            registerOverlay({ contentComponent, children, id, label });
        },
        [children, contentComponent, id, label, registerOverlay],
    );

    useDndMonitor({ onDragEnd: handleItemDragEnd, onDragStart: handleItemDragStart });

    const isActive = active?.id === id;
    const isOver = over?.id === id && !isActive;
    const isWithin = isOver && collision?.data?.position === 'within';
    const isBefore = isOver && collision?.data?.position === 'before';
    const isAfter = isOver && collision?.data?.position === 'after';
    const isSelected = treeState.selectedIds.has(id);
    const isExpanded = treeState.expandedIds.has(id);

    const sort = treeItemState?.parentId ? getItemPositionInParent(id, treeItemState.parentId, treeState) : -1;

    const hasChildren = Children.count(enhancedChildren) > 0;

    const childrenIds = useMemo(() => flattenChildren(children).map((child) => child.props.id), [children]);

    const { attributes, listeners, setNodeRef, node } = useSortable({
        id,
        disabled: !draggable || !draggableItem,
        data: { type, accepts },
    });

    useEffect(() => {
        if (node.current) {
            registerTreeItem({
                id,
                parentId,
                level: level ?? 0,
                domElement: node.current,
            });

            return () => {
                unregisterTreeItem(id);
            };
        }
    }, [id, level, parentId, registerTreeItem, unregisterTreeItem, node]);

    useEffect(() => {
        registerTreeItemChildren({ id, childrenIds: childrenIds.length > 0 ? childrenIds : undefined });
    }, [id, childrenIds, registerTreeItemChildren]);

    const handleSelect = useCallback(
        (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
            if (node.current && isDescendant(event.target as HTMLElement, node.current)) {
                event.stopPropagation();

                onSelect(id);
            }
        },
        [id, node, onSelect],
    );

    const handleExpand = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.stopPropagation();

        onExpand(id);
    };

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (document.activeElement !== node.current) {
                return;
            }

            const { code } = event;

            const selectItem = () => {
                event.preventDefault();
                onSelect(id);
            };

            const expandItem = () => {
                event.preventDefault();
                onExpand(id);
            };

            const focusFirstChild = () => {
                const firstChildId = treeItemState?.childrenIds?.[0];

                if (!firstChildId) {
                    return console.error(`list item ${id} missing children`);
                }

                const firstChildState = treeState.items.get(firstChildId);
                firstChildState?.domElement?.focus();
            };

            const focusParent = () => {
                const parentId = treeItemState?.parentId;

                if (!parentId) {
                    return console.error(`list item ${id} missing parent`);
                }

                const parentState = treeState.items.get(parentId);
                parentState?.domElement?.focus();
            };

            const focusPreviousItem = () => {
                const previousItemToFocus = getPreviousItemToFocus(id, treeItemState, treeState);
                previousItemToFocus?.domElement?.focus();
            };

            const focusNextItem = () => {
                const nextItemToFocus = getNextItemToFocus(id, treeItemState, treeState);
                nextItemToFocus?.domElement?.focus();
            };

            switch (code) {
                case 'Enter':
                    selectItem();
                    break;

                case 'Space':
                    if (treeItemState?.childrenIds) {
                        expandItem();
                    } else {
                        selectItem();
                    }
                    break;

                case 'ArrowRight':
                    if (treeItemState?.childrenIds && !isExpanded) {
                        expandItem();
                    } else if (treeItemState?.childrenIds?.[0]) {
                        focusFirstChild();
                    }
                    break;

                case 'ArrowLeft':
                    if (treeItemState?.childrenIds && isExpanded) {
                        expandItem();
                    } else if (treeItemState?.parentId) {
                        focusParent();
                    }
                    break;

                case 'ArrowUp':
                    focusPreviousItem();
                    break;

                case 'ArrowDown':
                    focusNextItem();
                    break;

                default:
                    break;
            }
        },
        [id, isExpanded, node, onExpand, onSelect, treeItemState, treeState],
    );

    const indentation = `${treeItemState?.level ?? 0}rem`;

    const containerClassName = useMemo(
        () =>
            merge([
                FOCUS_VISIBLE_STYLE,
                !isActive && !isSelected && 'focus-within:tw-bg-box-neutral',
                'tw-outline-none tw-ring-inset tw-group tw-flex tw-items-center tw-gap-x-1.5 tw-px-2.5 tw-no-underline tw-leading-5 tw-h-10',
                isSelected
                    ? 'tw-font-medium tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse hover:tw-bg-box-neutral-strong-hover'
                    : 'hover:tw-bg-box-neutral tw-text-text',
                isWithin &&
                    !(supportedDrop.within || !draggableItem) &&
                    'tw-bg-box-negative-hover tw-border-box-negative-strong-hover tw-border-dashed tw-border-2',
                isWithin &&
                    supportedDrop.within &&
                    'tw-border-box-selected-strong tw-border-dashed tw-border-2 tw-bg-box-selected-hover',
                isActive && 'tw-opacity-40',
            ]),
        [draggableItem, isActive, isSelected, isWithin, supportedDrop.within],
    );

    const containerStyle = { paddingLeft: indentation };

    const hasBeforeDrop = draggable && draggableItem && sort === 0 && supportedDrop.before;
    const hasAfterDrop = draggable && draggableItem && supportedDrop.after;

    return (
        <>
            {hasBeforeDrop && animateDropZone(isBefore)}
            <li
                role="treeitem"
                id={id.toString()}
                aria-label={label}
                data-test-id="tree-item"
                aria-selected={isSelected}
                aria-expanded={isExpanded}
                aria-level={treeItemState?.level}
            >
                <div
                    role="row"
                    tabIndex={0}
                    ref={setNodeRef}
                    onClick={handleSelect}
                    style={containerStyle}
                    onKeyDown={handleKeyDown}
                    className={containerClassName}
                    data-test-id="tree-item-container"
                >
                    {draggable && draggableItem && (
                        <button
                            {...listeners}
                            {...attributes}
                            className={merge([
                                FOCUS_VISIBLE_STYLE,
                                'tw-p-1 first:tw-ml-2 group-hover:tw-opacity-100 group-focus-within:tw-opacity-100 tw-rounded-sm',
                                isSelected ? 'tw-opacity-100' : 'tw-opacity-0',
                            ])}
                        >
                            <IconGrabHandle12 />
                        </button>
                    )}
                    {hasChildren && (
                        <button
                            tabIndex={0}
                            onClick={handleExpand}
                            data-test-id="tree-item-toggle"
                            className={merge([
                                FOCUS_VISIBLE_STYLE,
                                'tw-p-1.5 first:tw-ml-2 tw-h-5 tw-w-5 tw-flex tw-justify-center tw-rounded-sm',
                            ])}
                        >
                            {!isActive && (
                                <div
                                    className={merge([
                                        'tw-transition-transform tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                                        isSelected && 'tw-text-box-selected-strong-inverse',
                                        isExpanded && 'tw-rotate-90',
                                    ])}
                                />
                            )}
                        </button>
                    )}

                    {label !== undefined && (
                        <span className="first:tw-ml-3.5 tw-w-full tw-h-full tw-flex tw-items-center">{label}</span>
                    )}

                    {contentComponent?.({ selected: isSelected })}
                </div>
                <AnimatePresence>
                    {isExpanded && !isActive && (
                        <motion.ul
                            role="group"
                            key={`content-${id}`}
                            data-test-id="sub-tree-items"
                            exit={{ height: 0, opacity: 0 }}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <SortableContext items={childrenIds} strategy={verticalListSortingStrategy}>
                                {enhancedChildren}
                            </SortableContext>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </li>

            {hasAfterDrop && animateDropZone(isAfter)}
        </>
    );
};

const animateDropZone = (animate: boolean) => {
    return (
        <motion.div
            role="row"
            aria-hidden={!animate}
            data-test-id="drop-zone"
            animate={{ height: animate ? 40 : 0 }}
            className={
                animate
                    ? 'tw-border-box-selected-strong tw-border-dashed tw-border-2 tw-bg-box-selected-hover'
                    : undefined
            }
        />
    );
};

TreeItem.displayName = 'FondueTreeItem';
