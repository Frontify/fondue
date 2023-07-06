/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, MouseEvent, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { useDndContext, useDndMonitor } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import noop from 'lodash-es/noop';

import { merge } from '@utilities/merge';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

import type {
    RegisterNodeChildrenPayload,
    TreeDragEndEvent,
    TreeDragMoveEvent,
    TreeDragStartEvent,
    TreeItemProps,
} from '@components/Tree/types';

import { EXPAND_ONHOVER_DELAY, INDENTATION_WIDTH, Projection } from '../helpers';
import { removeFragmentsAndEnrichChildren, useDeepCompareEffect } from '../utils';

import { DragHandle } from './DragHandle';
import { Overlay } from './TreeItemOverlay';
import { ExpandButton } from './ExpandButton';
import { useDebounce } from '@hooks/useDebounce';
import { useTreeItem } from './useTreeItem';

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) =>
    isSorting || wasDragging ? false : true;

/** @private */
type TreeItemPrivateProps = {
    level?: number;
    parentId?: string;
    isSelected?: boolean;
    isExpanded?: boolean;
    treeDraggable?: boolean;
    /** onSelect is passed by the Tree component when cloning the TreeItem */
    onSelect?: (id: string) => void;
    /** onClick is the user defined callback to run after the onSelect */
    onClick?: (id: string) => void;
    onExpand?: (id: string) => void;
    onShrink?: (id: string) => void;
    projection?: Nullable<Projection>;
    registerOverlay?: (overlay: Overlay) => void;
    unregisterNodeChildren?: (payload: string) => void;
    registerNodeChildren?: (payload: RegisterNodeChildrenPayload) => void;
};

/** @private */
export type InternalTreeItemProps = TreeItemProps & TreeItemPrivateProps;

export const TreeItem = memo(
    ({
        id,
        type,
        label,
        onDrop,
        accepts,
        showCaret,
        children,
        parentId,
        level = 0,
        contentComponent,
        treeDraggable = false,
        onClick,
        onSelect,
        onExpand,
        onShrink,
        registerOverlay,
        registerNodeChildren,
        unregisterNodeChildren,
        draggable: itemDraggable = true,
        ignoreItemDoubleClick = false,
        expandOnSelect = false,
        'data-test-id': dataTestId = 'fondue-tree-item',
    }: InternalTreeItemProps) => {
        const { active, over } = useDndContext();
        const { isSelected, isExpanded, projection } = useTreeItem(id);
        const expandDebounced = useRef<Nullable<string>>(null);

        const draggable = treeDraggable && itemDraggable;

        const isActive = active?.id === id;
        const activeProjection = isActive && projection !== null && projection !== undefined ? projection : null;

        const overAccepts =
            typeof over?.data?.current?.accepts === 'string' ? over.data.current.accepts?.split(', ') : [];

        const parentAccepts =
            typeof activeProjection?.accepts === 'string' ? activeProjection.accepts?.split(', ') : [];

        const currentType = active?.data.current?.type || '';
        const cleanCurrentType = currentType?.replace(/-\d+$/, '') || '';

        const isWithin =
            activeProjection !== null &&
            activeProjection.previousNode?.depth !== undefined &&
            activeProjection.depth > activeProjection.previousNode?.depth;

        const canDropWithin =
            (isWithin &&
                activeProjection.previousNode?.accepts !== undefined &&
                activeProjection.previousNode?.accepts.includes(`${cleanCurrentType}-within`)) ||
            (activeProjection?.isWithinParent && parentAccepts.includes(`${cleanCurrentType}-within`));

        const canDrop =
            isActive && active?.data.current && ((overAccepts.includes(currentType) && !isWithin) || canDropWithin);

        const expandProjectionParent = useDebounce((toExpandId: string) => {
            if (expandDebounced.current === toExpandId) {
                onExpand?.(toExpandId);
            }
        }, EXPAND_ONHOVER_DELAY);

        useEffect(() => {
            if (isActive && expandDebounced.current !== activeProjection?.previousNode?.id) {
                expandDebounced.current = activeProjection?.previousNode?.id ?? null;
            }

            if (
                isActive &&
                isWithin &&
                activeProjection?.parentId &&
                activeProjection.previousNode &&
                activeProjection.parentId === activeProjection.previousNode.id &&
                activeProjection.parentId !== active?.data?.current?.parentId
            ) {
                expandProjectionParent(activeProjection?.parentId);
            }
        }, [
            active?.data,
            activeProjection?.parentId,
            activeProjection?.previousNode,
            expandProjectionParent,
            isActive,
            isWithin,
            onExpand,
        ]);

        const handleItemDragEnd = useCallback(
            (event: TreeDragEndEvent) => {
                const { over, active } = event;

                if (
                    !isActive ||
                    !activeProjection ||
                    (active.id === over?.id && activeProjection?.depth === active.data.current?.level)
                ) {
                    return;
                }

                if (isActive && over && canDrop && onDrop) {
                    onDrop({
                        id: active.id,
                        parentId: activeProjection.parentId,
                        sort: activeProjection.position,
                        contentComponent,
                        parentType: activeProjection.type,
                    });
                }
            },
            [isActive, activeProjection, canDrop, onDrop, contentComponent],
        );

        const handleItemDragStart = useCallback(
            (event: TreeDragStartEvent) => {
                if (event.active.id !== id) {
                    return;
                }

                registerOverlay?.({ contentComponent, children, id, label, level });
            },
            [children, contentComponent, id, label, level, registerOverlay],
        );

        const handleItemDragMove = useCallback(
            (event: TreeDragMoveEvent) => {
                if (event.active.id === id) {
                    document.body.style.setProperty('cursor', canDrop ? 'grabbing' : 'no-drop');
                }
            },
            [canDrop, id],
        );

        useDndMonitor({
            onDragEnd: handleItemDragEnd,
            onDragStart: handleItemDragStart,
            onDragMove: handleItemDragMove,
        });

        const toggleExpand = useCallback(
            (event?: MouseEvent<HTMLButtonElement>) => {
                event?.stopPropagation();
                isExpanded ? onShrink?.(id) : onExpand?.(id);
            },
            [id, isExpanded, onExpand, onShrink],
        );

        const handleItemClick = useDebounce(
            (event: MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                if (ignoreItemDoubleClick && event.detail >= 2) {
                    return;
                }

                if (expandOnSelect) {
                    toggleExpand();
                }

                onSelect?.(id);
                onClick?.(id);
            },
            ignoreItemDoubleClick ? 300 : 0,
        );

        const isParentActive = parentId && active?.id === parentId;

        const hasChildren = Children.count(children) > 0;

        const { enrichedChildren, childrenIds } = useMemo(() => {
            const enrichedChildren = removeFragmentsAndEnrichChildren(children, { parentId: id, level: level + 1 });
            return {
                enrichedChildren,
                childrenIds: enrichedChildren.map((child) => child.props.id),
            };
        }, [children, id, level]);

        const {
            attributes,
            listeners,
            transform,
            transition,
            setDraggableNodeRef,
            setDroppableNodeRef,
            setActivatorNodeRef,
        } = useSortable({
            id,
            disabled: !draggable,
            data: { type, accepts, parentId, level },
            animateLayoutChanges,
            transition: null,
        });

        useDeepCompareEffect(() => {
            if (Children.count(enrichedChildren) === 0) {
                unregisterNodeChildren?.(id);
                return;
            }

            if (isActive || isParentActive) {
                unregisterNodeChildren?.(id);
                return;
            }

            if (isExpanded) {
                registerNodeChildren?.({ id, children: enrichedChildren });
            } else {
                unregisterNodeChildren?.(id);
            }
        }, [isActive, isExpanded, isParentActive, enrichedChildren, id]);

        const liClassName = useMemo(
            () =>
                merge([
                    FOCUS_VISIBLE_STYLE,
                    'tw-cursor-default tw-transition-colors tw-outline-none tw-ring-inset tw-group tw-px-2.5 tw-no-underline tw-leading-5 tw-h-10',
                    !isActive && !isSelected && 'active:tw-bg-box-neutral-pressed',
                    isSelected && !transform?.y
                        ? 'tw-font-medium tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse hover:tw-bg-box-neutral-strong-hover'
                        : 'hover:tw-bg-box-neutral tw-text-text',
                    transform?.y ? 'tw-bg-box-neutral-strong-inverse tw-text-text tw-font-normal' : '',
                ]),
            [isActive, isSelected, transform?.y],
        );

        const containerClassName = merge([
            'tw-transition-colors tw-flex tw-items-center tw-leading-5 tw-width-full',
            isActive ? 'tw-border-dashed tw-rounded-sm tw-border-2 tw-pr-0 tw-h-12' : 'tw-h-10',
            isActive &&
                (canDrop
                    ? 'tw-border-box-selected-strong tw-bg-box-selected-hover'
                    : 'tw-bg-box-negative-hover tw-border-box-negative-strong-hover'),
        ]);

        const depthPadding = activeProjection?.depth ? activeProjection.depth * INDENTATION_WIDTH : undefined;
        const levelPadding = isActive ? 0 : level * INDENTATION_WIDTH;

        const liStyle = {
            paddingLeft: depthPadding ?? levelPadding,
        };

        const showContent = !isActive;
        const showChildren = isExpanded && !isActive;
        const showDragHandle = draggable && !isActive;
        const showLabel = label !== undefined && !isActive;
        const showExpandButton = !isActive && (showCaret === undefined ? hasChildren : showCaret);

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <li
                id={id}
                key={id}
                tabIndex={0}
                role="treeitem"
                style={liStyle}
                onKeyDown={noop}
                aria-label={label}
                aria-level={level + 1}
                onClick={handleItemClick}
                className={liClassName}
                ref={setDroppableNodeRef}
                data-test-id={dataTestId}
                aria-selected={isSelected}
                aria-expanded={isExpanded}
                data-has-children={hasChildren}
                aria-owns={childrenIds.join(' ')}
            >
                <div ref={setDraggableNodeRef} className={containerClassName} style={style}>
                    <DragHandle
                        {...listeners}
                        {...attributes}
                        active={isSelected}
                        ref={setActivatorNodeRef}
                        disabled={!showDragHandle}
                        aria-hidden={!showDragHandle}
                        className={showDragHandle ? 'tw-visible' : 'tw-invisible tw-pointer-events-none'}
                    />

                    <ExpandButton
                        active={transform?.y ? false : isSelected}
                        onClick={toggleExpand}
                        expanded={showChildren}
                        disabled={!showExpandButton}
                        aria-hidden={!showExpandButton}
                        className={showExpandButton ? 'tw-visible' : 'tw-invisible tw-pointer-events-none'}
                    />

                    {showLabel && (
                        <span className="first:tw-ml-3.5 tw-w-full tw-h-full tw-flex tw-items-center">{label}</span>
                    )}

                    {showContent && contentComponent}
                </div>
            </li>
        );
    },
);

TreeItem.displayName = 'FondueTreeItem';
