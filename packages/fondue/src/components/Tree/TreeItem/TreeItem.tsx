/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDndContext, useDndMonitor } from '@dnd-kit/core';
import { type AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { noop } from 'lodash-es';
import { Children, type MouseEvent, memo, useCallback, useEffect, useMemo, useRef, forwardRef } from 'react';

import {
    type RegisterNodeChildrenPayload,
    type TreeDragEndEvent,
    type TreeDragMoveEvent,
    type TreeDragStartEvent,
    TreeItemBorderClassMap,
    TreeItemBorderRadiusClassMap,
    TreeItemBorderStyleClassMap,
    TreeItemColorsClassMap,
    type TreeItemProps,
    TreeItemShadowClassMap,
    TreeItemSpacingClassMap,
    type TreeItemStyling,
} from '@components/Tree/types';
import { useDebounce } from '@hooks/useDebounce';
import { FOCUS_VISIBLE_STYLE, PARENT_FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

import { EXPAND_ONHOVER_DELAY, INDENTATION_WIDTH, type Projection } from '../helpers';
import { removeFragmentsAndEnrichChildren, useDeepCompareEffect } from '../utils';

import { DragHandle } from './DragHandle';
import { ExpandButton } from './ExpandButton';
import { type Overlay } from './TreeItemOverlay';
import { useTreeItem } from './useTreeItem';

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) =>
    isSorting || wasDragging ? false : true;

/** @private */
type TreeItemPrivateProps = {
    level?: number;
    levelConstraint?: Nullable<number>;
    parentId?: string;
    isSelected?: boolean;
    isExpanded?: boolean;
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
    forwardRef(
        (
            {
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
                onClick,
                onSelect,
                onExpand,
                onShrink,
                registerOverlay,
                registerNodeChildren,
                unregisterNodeChildren,
                draggable = true,
                expandable = true,
                showDragHandlerOnHoverOnly = true,
                dragHandlerPosition = 'left',
                showContentWhileDragging = true,
                itemStyle,
                ignoreItemDoubleClick = false,
                expandOnSelect = false,
                'data-test-id': dataTestId = 'fondue-tree-item',
            }: InternalTreeItemProps,
            treeItemRef,
        ) => {
            const { active, over } = useDndContext();
            const { isSelected, isExpanded, projection } = useTreeItem(id);
            const expandDebounced = useRef<Nullable<string> | undefined>();

            const isActive = active?.id === id;
            const activeProjection = isActive && projection !== null && projection !== undefined ? projection : null;

            const overAccepts =
                typeof over?.data?.current?.accepts === 'string' ? over.data.current.accepts?.split(', ') : [];

            const parentAccepts =
                typeof activeProjection?.accepts === 'string' ? activeProjection.accepts?.split(', ') : [];

            const currentType = active?.data.current?.type || '';

            const isWithin =
                projection?.previousNode?.depth !== undefined && projection?.depth > projection?.previousNode?.depth;
            const isWithinOneLevel = isWithin && projection.depth - 1 === projection?.previousNode?.depth;

            const canDropWithinAndDeeper =
                isWithin &&
                projection?.previousNode?.accepts !== undefined &&
                (projection?.previousNode?.accepts.includes(`${currentType}-deeper`) ||
                    projection?.previousNode?.accepts.includes(`${currentType}-within`));

            const canDropWithin =
                (isActive &&
                    isWithinOneLevel &&
                    activeProjection?.previousNode?.accepts !== undefined &&
                    activeProjection?.previousNode?.accepts.includes(`${currentType}-within`)) ||
                (activeProjection?.isWithinParent && parentAccepts.includes(`${currentType}-within`));

            const canDrop =
                isActive && active?.data.current && ((overAccepts.includes(currentType) && !isWithin) || canDropWithin);

            const expandProjectionParent = useDebounce((toExpandId: string) => {
                if (expandDebounced.current === toExpandId) {
                    onExpand?.(toExpandId);
                }
            }, EXPAND_ONHOVER_DELAY);

            useEffect(() => {
                if (isActive) {
                    expandDebounced.current = isWithin ? activeProjection?.previousNode?.id : null;
                }

                if (
                    isActive &&
                    canDropWithinAndDeeper &&
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
                canDropWithinAndDeeper,
                isWithin,
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

                    registerOverlay?.({
                        contentComponent,
                        children,
                        id,
                        label,
                        level,
                        dragHandlerPosition,
                        showContentWhileDragging,
                    });
                },
                [
                    children,
                    contentComponent,
                    dragHandlerPosition,
                    id,
                    label,
                    level,
                    registerOverlay,
                    showContentWhileDragging,
                ],
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

            const itemStyleProps = useMemo(() => {
                return {
                    spacingY: 'none',
                    contentHight: 'single-line',
                    shadow: 'none',
                    borderRadius: 'small',
                    borderWidth: 'none',
                    borderStyle: 'none',
                    activeColorStyle: 'neutral',
                    ...itemStyle,
                } as TreeItemStyling;
            }, [itemStyle]);

            const styling = TreeItemColorsClassMap[itemStyleProps.activeColorStyle ?? 'neutral'];

            const { liClassName, backgroundClassName } = useMemo(() => {
                return {
                    liClassName: merge([
                        FOCUS_VISIBLE_STYLE,
                        'tw-box-content tw-relative tw-cursor-default tw-transition-colors tw-outline-none tw-ring-inset tw-group tw-no-underline tw-leading-5',
                        !isActive && isSelected ? styling.selectedTextColor : styling.textColor,
                        TreeItemSpacingClassMap[itemStyleProps.spacingY ?? 'none'],
                    ]),
                    backgroundClassName: merge([
                        'tw-block tw-absolute tw-inset-0 tw-transition-colors -tw-z-10',
                        itemStyleProps.borderWidth !== 'none'
                            ? TreeItemBorderRadiusClassMap[itemStyleProps.borderRadius ?? 'small']
                            : '',
                        !isActive &&
                            (!isSelected || itemStyleProps.activeColorStyle !== 'neutral') &&
                            styling.pressedBackgroundColor,
                        !isActive && isSelected ? styling.selectedBackgroundColor : styling.backgroundColor,
                        isSelected && PARENT_FOCUS_VISIBLE_STYLE,
                    ]),
                };
            }, [isActive, isSelected, itemStyleProps, styling]);

            const showContent = showContentWhileDragging ? true : !isActive;
            const wrapperContentClassName = merge([
                'tw-max-w-full tw-grow tw-overflow-hidden',
                isActive && showContentWhileDragging ? 'tw-opacity-75 tw-blur-sm tw-grayscale' : '',
            ]);
            const showChildren = isExpanded && !isActive;
            const showDragHandle = draggable && !isActive;
            const showLabel = label !== undefined && !isActive;
            const showExpandButton = !isActive && expandable && (showCaret === undefined ? hasChildren : showCaret);

            let previousItemToBeExpandedFeedback = '';
            if (
                !isActive &&
                !isExpanded &&
                showExpandButton &&
                canDropWithinAndDeeper &&
                projection?.previousNode?.id === id &&
                projection?.depth > projection?.previousNode?.depth
            ) {
                previousItemToBeExpandedFeedback = merge([
                    'tw-border-solid tw-border-box-selected-strong',
                    TreeItemBorderRadiusClassMap[itemStyleProps.borderRadius ?? 'small'],
                    TreeItemBorderClassMap.small,
                ]);
            }

            const containerBorder =
                itemStyleProps.borderWidth !== 'none' && previousItemToBeExpandedFeedback === ''
                    ? merge([
                          TreeItemBorderClassMap[itemStyleProps.borderWidth ?? 'none'],
                          TreeItemBorderRadiusClassMap[itemStyleProps.borderRadius ?? 'small'],
                          TreeItemBorderStyleClassMap[itemStyleProps.borderStyle ?? 'none'],
                      ])
                    : '';
            const containerHeight = itemStyleProps.contentHight === 'single-line' ? 'tw-h-10' : 'tw-h-fit';
            const containerActiveHeight = itemStyleProps.contentHight === 'single-line' ? 'tw-h-12' : 'tw-h-fit';

            const containerClassName = merge([
                'tw-relative tw-z-0 tw-transition-colors tw-flex tw-items-center tw-leading-5 tw-width-fit tw-justify-between tw-group',
                TreeItemShadowClassMap[itemStyleProps.shadow ?? 'none'],
                isActive ? 'tw-border-dashed tw-border-2 tw-pr-0' : containerBorder,
                isActive && TreeItemBorderRadiusClassMap[itemStyleProps.borderRadius ?? 'small'],
                isActive ? containerActiveHeight : containerHeight,
                isActive &&
                    (canDrop
                        ? 'tw-border-box-selected-strong tw-bg-box-selected-hover'
                        : 'tw-bg-box-negative-hover tw-border-box-negative-strong-hover'),
                previousItemToBeExpandedFeedback,
            ]);

            const depthPadding = activeProjection?.depth ? activeProjection.depth * INDENTATION_WIDTH : undefined;
            const levelPadding = isActive ? 0 : level * INDENTATION_WIDTH;

            const liStyle = { paddingLeft: depthPadding ?? levelPadding };
            const backgroundStyle =
                itemStyleProps.borderWidth !== 'none' ? {} : { marginLeft: -1 * (depthPadding ?? levelPadding) };

            const style = {
                transform: CSS.Transform.toString(transform),
                transition,
            };

            const handlerProps = { ...listeners, ...attributes };
            const dragHandlerProps = dragHandlerPosition !== 'none' ? handlerProps : {};
            const dragHandler =
                dragHandlerPosition !== 'none' ? (
                    <DragHandle
                        {...dragHandlerProps}
                        active={isSelected}
                        ref={setActivatorNodeRef}
                        disabled={!showDragHandle}
                        aria-hidden={!showDragHandle}
                        showDragHandlerOnHoverOnly={showDragHandlerOnHoverOnly}
                        activeColorStyle={itemStyleProps.activeColorStyle ?? 'neutral'}
                    />
                ) : null;

            const itemHandlerProps = dragHandlerPosition === 'none' ? { ...handlerProps } : {};

            return (
                <li
                    {...itemHandlerProps}
                    id={id}
                    key={id}
                    tabIndex={0}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="treeitem"
                    style={liStyle}
                    onKeyDown={noop}
                    aria-label={label}
                    aria-level={level + 1}
                    onClick={handleItemClick}
                    className={liClassName}
                    ref={(node) => {
                        setDroppableNodeRef(node);
                        if (typeof treeItemRef === 'function') {
                            treeItemRef(node);
                        } else if (treeItemRef?.current) {
                            treeItemRef.current = node;
                        }
                    }}
                    data-test-id={dataTestId}
                    aria-selected={isSelected}
                    aria-expanded={isExpanded}
                    data-has-children={hasChildren}
                    aria-owns={childrenIds.join(' ')}
                >
                    <div ref={setDraggableNodeRef} className={containerClassName} style={style}>
                        <span className={backgroundClassName} style={backgroundStyle} aria-hidden={true} />
                        {dragHandlerPosition === 'left' && dragHandler}
                        {expandable && (
                            <ExpandButton
                                active={transform?.y ? false : isSelected}
                                onClick={toggleExpand}
                                expanded={showChildren}
                                disabled={!showExpandButton}
                                aria-hidden={!showExpandButton}
                                className={showExpandButton ? 'tw-visible' : 'tw-invisible tw-pointer-events-none'}
                            />
                        )}
                        {showLabel && (
                            <span className="first:tw-ml-3.5 tw-w-full tw-h-full tw-flex tw-items-center">{label}</span>
                        )}
                        {showContent && <div className={wrapperContentClassName}>{contentComponent}</div>}
                        {dragHandlerPosition === 'right' && dragHandler}
                    </div>
                </li>
            );
        },
    ),
);

TreeItem.displayName = 'FondueTreeItem';
