/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, MouseEvent, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { useDndContext, useDndMonitor } from '@dnd-kit/core';

import { merge } from '@utilities/merge';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

import type { CollisionPosition, TreeDragEndEvent, TreeDragStartEvent, TreeItemProps } from '@components/Tree/types';
import { useTreeContext } from '@components/Tree/TreeContext';

import { DragHandle } from './DragHandle';
import { removeFragmentsAndEnrichChildren } from '../utils';
import { ExpandButton } from './ExpandButton';
import { INDENTATION_WIDTH, ROOT_ID } from '../Tree';
import { getItemPositionInParent } from '../helpers';

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) =>
    isSorting || wasDragging ? false : true;

export const TreeItem = ({
    id,
    type,
    label,
    onDrop,
    accepts,
    children,
    parentId,
    level = 0,
    contentComponent,
    draggable: itemDraggable = true,
    'data-test-id': dataTestId = 'tree-item',
}: TreeItemProps) => {
    const {
        onExpand,
        onSelect,
        treeState,
        registerOverlay,
        registerNodeChildren,
        unregisterNodeChildren,
        draggable: treeDraggable,
    } = useTreeContext();

    const { active, over } = useDndContext();

    const draggable = treeDraggable && itemDraggable;

    const isActive = active?.id === id;

    const activeIndex = treeState.nodes.findIndex(({ props }) => props.id === active?.id);
    const overIndex = treeState.nodes.findIndex(({ props }) => props.id === over?.id);

    const movingDown = activeIndex < overIndex;
    const movingUp = !movingDown;

    const projection = useMemo(() => {
        return isActive ? treeState.projection : null;
    }, [isActive, treeState.projection]);

    const projectionNode = useMemo(() => {
        return treeState.nodes.find(({ props }) => props.id === projection?.parentId);
    }, [projection?.parentId, treeState.nodes]);

    const isWithin = useMemo(() => {
        return projection !== null && over !== null && projection.depth > over.data.current?.level;
    }, [projection, over]);

    const canDrop =
        isActive &&
        !isWithin &&
        active.data.current &&
        over?.data.current?.accepts !== undefined &&
        over.data.current.accepts.includes(active.data.current.type);

    // Moving down the tree
    let canDropWithinMovingDown =
        movingDown &&
        isActive &&
        isWithin &&
        active.data.current &&
        over?.data.current?.accepts !== undefined &&
        projection?.depth !== projection?.minDepth &&
        over.data.current.accepts.includes(`${active.data.current.type}-within`);

    // Moving up the tree
    let canDropWithinMovingUp =
        movingUp &&
        isActive &&
        isWithin &&
        active.data.current &&
        projection &&
        projectionNode?.props.accepts &&
        projectionNode.props.accepts.includes(`${active.data.current.type}-within`);

    const handleItemDragEnd = (event: TreeDragEndEvent) => {
        const { over, active } = event;

        if (active.id === over?.id && projection?.depth === projection?.minDepth) {
            return;
        }

        if (movingUp) {
            canDropWithinMovingDown = false;
        }

        if (movingDown) {
            canDropWithinMovingUp = false;
        }

        if (isActive && over && (canDrop || canDropWithinMovingDown || canDropWithinMovingUp)) {
            const sortOver = getItemPositionInParent(
                { id: over.id, parentId: over.data?.current?.parentId },
                treeState.nodes,
            );

            const sortActive = getItemPositionInParent(
                { id: active.id, parentId: active.data?.current?.parentId },
                treeState.nodes,
            );

            let position: CollisionPosition = null;
            if (canDrop) {
                position = 'after';
            } else if (canDropWithinMovingDown || canDropWithinMovingUp) {
                position = 'within';
            }

            onDrop?.(
                {
                    id: canDropWithinMovingUp ? projection?.parentId?.toString() ?? 'ID not found' : over.id.toString(),
                    type: canDropWithinMovingUp ? projectionNode?.props.type : over?.data?.current?.type,
                    sort: sortOver + 1,
                },
                { id: active.id.toString(), type: active.data?.current?.type, sort: sortActive + 1 },
                position,
                movingUp ? 'up' : 'down',
            );
        }
    };

    const handleItemDragStart = useCallback(
        (event: TreeDragStartEvent) => {
            if (event.active.id !== id) {
                return;
            }

            registerOverlay({ contentComponent, children, id, label, level });
        },
        [children, contentComponent, id, label, level, registerOverlay],
    );

    useDndMonitor({
        onDragEnd: handleItemDragEnd,
        onDragStart: handleItemDragStart,
    });

    const isSelected = treeState.selectedIds.has(id);
    const isExpanded = treeState.expandedIds.has(id);

    const isParentRoot = parentId === ROOT_ID;
    const isParentActive = parentId && active?.id === parentId;
    const isParentExpanded = isParentRoot || (parentId && treeState.expandedIds.has(parentId));
    const isAncestorMounted = isParentRoot || (parentId && treeState.nodes.some((node) => node.props.id === parentId));

    const hasChildren = Children.count(children) > 0;

    const enrichedChildren = useMemo(
        () => removeFragmentsAndEnrichChildren(children, { parentId: id, level: level + 1 }),
        [children, id, level],
    );

    const childrenIds = useMemo(() => enrichedChildren.map((child) => child.props.id), [enrichedChildren]);

    const {
        attributes,
        listeners,
        transform,
        isDragging,
        setDraggableNodeRef,
        setDroppableNodeRef,
        setActivatorNodeRef,
    } = useSortable({
        id,
        transition: null,
        disabled: !draggable,
        data: { type, accepts, parentId, level },
        animateLayoutChanges,
    });

    useEffect(() => {
        if (Children.count(enrichedChildren) === 0) {
            return;
        }

        if (!isAncestorMounted || !isParentExpanded || isActive || isParentActive) {
            unregisterNodeChildren(enrichedChildren);
            return;
        }

        if (isExpanded) {
            registerNodeChildren({ id, children: enrichedChildren });
        } else {
            unregisterNodeChildren(enrichedChildren);
        }
    }, [
        id,
        level,
        isActive,
        isExpanded,
        isParentActive,
        isParentExpanded,
        enrichedChildren,
        isAncestorMounted,
        registerNodeChildren,
        unregisterNodeChildren,
    ]);

    const handleSelect = useCallback(
        (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
            event.stopPropagation();

            onSelect(id);
        },
        [id, onSelect],
    );

    const handleExpand = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.stopPropagation();

        onExpand(id);
    };

    const liClassName = useMemo(
        () =>
            merge([
                FOCUS_VISIBLE_STYLE,
                !isActive && !isSelected && 'focus-within:tw-bg-box-neutral',
                'tw-outline-none tw-ring-inset tw-group tw-px-2.5 tw-no-underline tw-leading-5 tw-h-10',
                isSelected
                    ? 'tw-font-medium tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse hover:tw-bg-box-neutral-strong-hover'
                    : 'hover:tw-bg-box-neutral tw-text-text',
            ]),
        [isActive, isSelected],
    );

    const containerClassName = merge([
        'tw-flex tw-items-center tw-gap-x-1.5 tw-h-10 tw-leading-5 tw-width-full',
        isActive && 'tw-border-box-selected-strong tw-border-dashed tw-border-2 tw-bg-box-selected-hover',
        isActive &&
            ((isWithin && !((movingDown && canDropWithinMovingDown) || (movingUp && canDropWithinMovingUp))) ||
                (!isWithin && !canDrop)) &&
            'tw-bg-box-negative-hover tw-border-box-negative-strong-hover tw-border-dashed tw-border-2',
    ]);

    const depthPadding = projection?.depth ? projection.depth * INDENTATION_WIDTH : undefined;
    const levelPadding = isActive ? 0 : level * INDENTATION_WIDTH;

    const liStyle = {
        paddingLeft: depthPadding ?? levelPadding,
    };

    const showContent = !isActive;
    const showChildren = isExpanded && !isActive;
    const showDragHandle = draggable && !isActive;
    const showLabel = label !== undefined && !isActive;
    const showExpandButton = hasChildren && !isActive;

    const transition = {
        duration: !isDragging ? 0.25 : 0,
        easings: {
            type: 'spring',
        },
        scale: {
            duration: 0.25,
        },
        zIndex: {
            delay: isDragging ? 0 : 0.25,
        },
    };

    const animate = {
        x: transform?.x,
        y: transform?.y,
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <li
            key={id}
            tabIndex={0}
            role="treeitem"
            style={liStyle}
            id={id.toString()}
            aria-label={label}
            aria-level={level}
            // layoutId={String(id)}
            onClick={handleSelect}
            className={liClassName}
            ref={setDroppableNodeRef}
            data-test-id={dataTestId}
            aria-selected={isSelected}
            aria-expanded={isExpanded}
            data-has-children={hasChildren}
            aria-owns={childrenIds.join(' ')}
        >
            <motion.div
                transition={transition}
                ref={setDraggableNodeRef}
                className={containerClassName}
                animate={transform ? animate : undefined}
            >
                {showDragHandle ? (
                    <DragHandle ref={setActivatorNodeRef} active={isSelected} {...listeners} {...attributes} />
                ) : (
                    <div className="tw-w-6"></div>
                )}

                {showExpandButton ? <ExpandButton onClick={handleExpand} expanded={showChildren} /> : null}

                {showLabel ? (
                    <span className="first:tw-ml-3.5 tw-w-full tw-h-full tw-flex tw-items-center">{label}</span>
                ) : null}

                {showContent && contentComponent}
            </motion.div>
        </li>
    );
};

TreeItem.displayName = 'FondueTreeItem';
