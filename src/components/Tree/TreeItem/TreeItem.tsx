/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, MouseEvent, memo, useCallback, useLayoutEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { useDndContext, useDndMonitor } from '@dnd-kit/core';
import { noop } from 'lodash-es';

import { merge } from '@utilities/merge';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';

import type {
    RegisterNodeChildrenPayload,
    TreeDragEndEvent,
    TreeDragStartEvent,
    TreeItemProps,
} from '@components/Tree/types';

import { DragHandle } from './DragHandle';
import { removeFragmentsAndEnrichChildren } from '../utils';
import { ExpandButton } from './ExpandButton';
import { INDENTATION_WIDTH } from '../Tree';
import { Projection } from '../helpers';
import { Overlay } from './TreeItemOverlay';

import { setUseWhatChange, useWhatChanged } from '../useWhatChanged';

setUseWhatChange(true);

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) =>
    isSorting || wasDragging ? false : true;

/** @private */
type TreeItemPrivateProps = {
    level?: number;
    parentId?: string;
    isSelected?: boolean;
    isExpanded?: boolean;
    treeDraggable?: boolean;
    onSelect: (id: string) => void;
    onExpand: (id: string) => void;
    projection: Nullable<Projection>;
    registerOverlay: (overlay: Overlay) => void;
    unregisterNodeChildren: (payload: string) => void;
    registerNodeChildren: (payload: RegisterNodeChildrenPayload) => void;
};

/** @private */
type InternalTreeItemProps = TreeItemProps & TreeItemPrivateProps;

export const TreeItem = memo(
    ({
        id,
        type,
        label,
        onDrop,
        accepts,
        children,
        parentId,
        level = 0,
        contentComponent,
        isSelected = false,
        isExpanded = false,
        treeDraggable = false,
        projection,
        onSelect,
        onExpand,
        registerOverlay,
        registerNodeChildren,
        unregisterNodeChildren,
        draggable: itemDraggable = true,
        'data-test-id': dataTestId = 'fondue-tree-item',
    }: InternalTreeItemProps) => {
        useWhatChanged(
            [
                id,
                type,
                label,
                onDrop,
                accepts,
                children,
                parentId,
                level,
                contentComponent,
                isSelected,
                isExpanded,
                treeDraggable,
                projection,
                onSelect,
                onExpand,
                registerOverlay,
                registerNodeChildren,
                unregisterNodeChildren,
                itemDraggable,
                dataTestId,
            ],
            `
            id,
            type,
            label,
            onDrop,
            accepts,
            children,
            parentId,
            level,
            contentComponent,
            isSelected,
            isExpanded,
            treeDraggable,
            projection,
            onSelect,
            onExpand,
            registerOverlay,
            registerNodeChildren,
            unregisterNodeChildren,
            itemDraggable,
            dataTestId
            `,
        );

        const { active, over } = useDndContext();

        const draggable = treeDraggable && itemDraggable;

        const isActive = active?.id === id;

        const isWithin = projection !== null && over !== null && projection.depth > over.data.current?.level;

        const canDrop =
            isActive &&
            !isWithin &&
            active.data.current &&
            typeof over?.data?.current?.accepts === 'string' &&
            over.data.current.accepts?.split(', ').includes(active.data.current.type);

        const handleItemDragEnd = (event: TreeDragEndEvent) => {
            const { over, active } = event;

            if (active.id === over?.id && projection?.depth === projection?.minDepth) {
                return;
            }

            if (isActive && over && canDrop && projection?.parentId) {
                onDrop?.(active.id, projection.parentId, 5);
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

        const isParentActive = parentId && active?.id === parentId;

        const hasChildren = Children.count(children) > 0;

        const enrichedChildren = useMemo(
            () => removeFragmentsAndEnrichChildren(children, { parentId: id, level: level + 1 }),
            [children, id, level],
        );

        const childrenIds = useMemo(() => enrichedChildren.map((child) => child.props.id), [enrichedChildren]);

        const { attributes, listeners, transform, setDraggableNodeRef, setDroppableNodeRef, setActivatorNodeRef } =
            useSortable({
                id,
                disabled: !draggable,
                data: { type, accepts, parentId, level },
                animateLayoutChanges,
                transition: null,
            });

        useLayoutEffect(() => {
            if (Children.count(enrichedChildren) === 0) {
                return;
            }
            console.log(`isExpanded ${id}`, isExpanded);

            if (isActive || isParentActive) {
                console.log('unregistered if active or parent active', id);
                unregisterNodeChildren(id);
                return;
            }

            if (isExpanded) {
                console.log('registerNodeChildren for node:', id);
                registerNodeChildren({ id, children: enrichedChildren });
            } else {
                console.log('unregisterNodeChildren NOT expanded for node:', id);
                unregisterNodeChildren(id);
            }
        }, [isActive, isExpanded, isParentActive, enrichedChildren, registerNodeChildren, unregisterNodeChildren, id]);

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
            'tw-flex tw-items-center tw-h-10 tw-leading-5 tw-width-full',
            isActive && 'tw-border-box-selected-strong tw-border-dashed tw-border-2 tw-bg-box-selected-hover',
            isActive &&
                (isWithin || (!isWithin && !canDrop)) &&
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

        const animate = {
            x: transform?.x,
            y: transform?.y,
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
                aria-level={level}
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
                    ref={setDraggableNodeRef}
                    className={containerClassName}
                    animate={transform ? animate : undefined}
                >
                    {showDragHandle ? (
                        <DragHandle ref={setActivatorNodeRef} active={isSelected} {...listeners} {...attributes} />
                    ) : (
                        <div className="tw-w-6 tw-min-w-[24px]" />
                    )}

                    <ExpandButton
                        onClick={handleExpand}
                        expanded={showChildren}
                        disabled={!showExpandButton}
                        active={isSelected}
                    />

                    {showLabel ? (
                        <span className="first:tw-ml-3.5 tw-w-full tw-h-full tw-flex tw-items-center">{label}</span>
                    ) : null}
                    {id}
                    {/* {showContent && contentComponent} */}
                </motion.div>
            </li>
        );
    },
);

TreeItem.displayName = 'FondueTreeItem';
