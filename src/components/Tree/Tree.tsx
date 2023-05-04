/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { cloneElement, memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { enableMapSet, produce } from 'immer';
import { createPortal } from 'react-dom';
import isEqual from 'lodash-es/isEqual';
import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverlay,
    KeyboardCode,
    KeyboardSensor,
    MeasuringConfiguration,
    MeasuringStrategy,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import type {
    RegisterNodeChildrenPayload,
    SensorContext,
    TreeActive,
    TreeAnnouncements,
    TreeDragOverEvent,
    TreeDragStartEvent,
    TreeOver,
    TreeProps,
    TreeState,
    TreeStateAction,
} from '@components/Tree/types';

import { type Overlay, TreeItemOverlay } from './TreeItem';
import {
    getMovementAnnouncement,
    getProjection,
    getReactNodeIdsInFlatArray,
    removeReactNodesFromFlatArray,
} from './helpers';
import { removeFragmentsAndEnrichChildren, sortableTreeKeyboardCoordinates, useDeepCompareEffect } from './utils';
import { TreeContext, TreeContextProps } from './TreeContext';

export const ROOT_ID = '__ROOT__';
export const INDENTATION_WIDTH = 32;

const measuring: MeasuringConfiguration = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

enableMapSet();

const reducer = produce((draft: TreeState, action: TreeStateAction) => {
    switch (action.type) {
        case 'SET_SELECT':
            {
                const newSelected = new Set(draft.selectedIds);

                const isSelected = !draft.selectedIds.has(action.payload);

                if (isSelected && draft.selectionMode === 'single') {
                    newSelected.clear();
                }

                isSelected ? newSelected.add(action.payload) : newSelected.delete(action.payload);

                draft.selectedIds = newSelected;
            }
            break;

        case 'EXPAND_NODE':
            {
                const newExpanded = new Set(draft.expandedIds).add(action.payload);
                draft.expandedIds = newExpanded;
            }
            break;

        case 'SHRINK_NODE':
            {
                const newExpanded = new Set(draft.expandedIds);
                newExpanded.delete(action.payload);
                draft.expandedIds = newExpanded;
            }
            break;

        case 'SET_SELECTION_MODE':
            {
                draft.selectionMode = action.payload.selectionMode;
            }
            break;

        case 'SET_PROJECTION':
            {
                draft.projection = action.payload;
            }
            break;

        case 'REGISTER_OVERLAY_ITEM':
            {
                draft.overlay = action.payload;
            }
            break;

        case 'REGISTER_NODE_CHILDREN':
            {
                const { id, children } = action.payload;

                const index = draft.nodes.findIndex((node) => node.props.id === id);

                if (index === -1) {
                    console.error(`Element with ID "${id}" not found.`);
                    return;
                }

                const sliceIndex = index + 1;

                const currentNodeChildrenIds = draft.nodes
                    .slice(sliceIndex, children.length - 1)
                    .map((node) => node.props.id);

                const newNodeChildrenIds = children.map((node) => node.props.id);

                if (isEqual(currentNodeChildrenIds, newNodeChildrenIds)) {
                    return;
                }

                const offset = draft.nodes.findLastIndex((node) => node.props.parentId === id) - sliceIndex;

                const nodes = [
                    ...draft.nodes.slice(0, sliceIndex),
                    ...children,
                    ...draft.nodes.slice(sliceIndex + offset),
                ];

                draft.nodes = nodes;
            }
            break;

        case 'UNREGISTER_NODE_CHILDREN':
            {
                const nodeIds = getReactNodeIdsInFlatArray(draft.nodes, action.payload);

                draft.nodes = removeReactNodesFromFlatArray(draft.nodes, nodeIds);
            }
            break;

        case 'REGISTER_ROOT_NODES':
            {
                draft.nodes = action.payload;
            }
            break;

        case 'REPLACE_EXPANDED':
            {
                draft.expandedIds = new Set(action.payload);
            }
            break;

        case 'REPLACE_SELECTED':
            {
                draft.selectedIds = new Set(action.payload);
            }
            break;

        case 'REPLACE_STATE':
            draft.nodes = action.payload.nodes;
            draft.overlay = action.payload.overlay;
            draft.projection = action.payload.projection;
            draft.selectedIds = action.payload.selectedIds;
            draft.expandedIds = action.payload.expandedIds;
            draft.selectionMode = action.payload.selectionMode;
            break;
        default:
            console.warn(`Updated tree with action "${action.type}" but it has not effect.`);
    }
});

export const Tree = memo(
    ({
        id,
        onDrop,
        onSelect,
        onExpand,
        onShrink,
        children,
        selectedIds,
        expandedIds,
        draggable = false,
        multiselect = false,
        'data-test-id': dataTestId = 'fondue-tree',
    }: TreeProps) => {
        const initialState: TreeState = useMemo(
            () => ({
                selectionMode: 'single',
                selectedIds: new Set(selectedIds ?? []),
                expandedIds: new Set(expandedIds ?? []),
                nodes: removeFragmentsAndEnrichChildren(children, { parentId: ROOT_ID, level: 0 }),
                projection: null,
            }),
            [children, expandedIds, selectedIds],
        );

        const [treeState, updateTreeState] = useReducer(reducer, initialState);
        const [offset, setOffset] = useState(0);
        const [overId, setOverId] = useState<Nullable<string>>(null);
        const [activeId, setActiveId] = useState<Nullable<string>>(null);
        const [currentPosition, setCurrentPosition] =
            useState<Nullable<{ overId: string; parentId: Nullable<string> }>>(null);

        const items = useMemo(() => treeState.nodes.map((node) => node.props.id), [treeState.nodes]);

        useEffect(() => {
            const keyDownHandler = (event: globalThis.KeyboardEvent) => {
                if (multiselect && (event.key === 'Meta' || event.ctrlKey)) {
                    updateTreeState({
                        type: 'SET_SELECTION_MODE',
                        payload: { selectionMode: 'multiselect' },
                    });
                }
            };

            const keyUpHandler = (event: globalThis.KeyboardEvent) => {
                if (multiselect && (event.key === 'Meta' || event.ctrlKey)) {
                    updateTreeState({
                        type: 'SET_SELECTION_MODE',
                        payload: { selectionMode: 'single' },
                    });
                }
            };

            if (multiselect) {
                window.addEventListener('keydown', keyDownHandler);
                window.addEventListener('keyup', keyUpHandler);
            }

            return () => {
                window.removeEventListener('keydown', keyDownHandler);
                window.removeEventListener('keyup', keyUpHandler);
            };
        }, [multiselect]);

        const registerOverlay = useCallback((overlay: Overlay) => {
            updateTreeState({ type: 'REGISTER_OVERLAY_ITEM', payload: overlay });
        }, []);

        const registerNodeChildren = useCallback((payload: RegisterNodeChildrenPayload) => {
            updateTreeState({ type: 'REGISTER_NODE_CHILDREN', payload });
        }, []);

        const unregisterNodeChildren = useCallback((payload: string) => {
            updateTreeState({ type: 'UNREGISTER_NODE_CHILDREN', payload });
        }, []);

        const handleSelect = useCallback(
            (id: string) => {
                if (onSelect) {
                    return onSelect(id);
                }

                updateTreeState({
                    type: 'SET_SELECT',
                    payload: id,
                });
            },
            [onSelect],
        );

        const handleExpand = useCallback(
            (id: string) => {
                if (onExpand) {
                    return onExpand(id);
                }

                updateTreeState({
                    type: 'EXPAND_NODE',
                    payload: id,
                });
            },
            [onExpand],
        );

        const handleShrink = useCallback(
            (id: string) => {
                if (onShrink) {
                    return onShrink(id);
                }

                updateTreeState({
                    type: 'SHRINK_NODE',
                    payload: id,
                });
            },
            [onShrink],
        );

        const handleDragEnd = useCallback(
            (event: DragEndEvent) => {
                resetState();

                const { over, active } = event;

                if (!over?.id || !active?.id || !treeState.projection?.parentId) {
                    return;
                }

                onDrop?.({
                    id: active.id.toString(),
                    parentId: treeState.projection.parentId,
                    sort: treeState.projection.position,
                });
            },
            [onDrop, treeState.projection?.parentId, treeState.projection?.position],
        );

        const handleDragStart = ({ active: { id: activeId } }: TreeDragStartEvent) => {
            setActiveId(activeId);
            setOverId(activeId);

            const activeNode = treeState.nodes.find((node) => node.props.id === activeId);

            if (activeNode) {
                setCurrentPosition({
                    parentId: activeNode.props.parentId,
                    overId: activeId,
                });
            }

            document.body.style.setProperty('cursor', 'grabbing');
        };

        const handleDragOver = ({ over }: TreeDragOverEvent) => {
            setOverId(over?.id ?? null);
        };

        const handleDragMove = ({ delta }: DragMoveEvent) => {
            setOffset(delta.x);
        };

        const handleDragCancel = () => {
            resetState();
        };

        const resetState = () => {
            setOverId(null);
            setActiveId(null);
            setOffset(0);
            setCurrentPosition(null);

            document.body.style.setProperty('cursor', '');
        };

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLUListElement>) => {
                const activeElement = document.activeElement;

                if (!activeElement || !activeElement.parentElement || !(activeElement instanceof HTMLLIElement)) {
                    return;
                }

                const items = Array.from(activeElement.parentElement.children).filter(
                    (child) => child.nodeName === 'LI',
                ) as HTMLLIElement[];

                const currentIndex = items.indexOf(activeElement);

                const node = treeState.nodes[currentIndex];

                const id: string = node.props.id;
                const isExpanded = treeState.expandedIds.has(id);
                const parentId: string = node.props.parentId;
                const hasChildren = activeElement.getAttribute('data-has-children') === 'true';

                const { code } = event;

                const toggleSelect = () => {
                    event.preventDefault();

                    handleSelect(id);
                };

                const toggleExpand = () => {
                    event.preventDefault();

                    handleExpand(id);
                };

                const focusPrevious = () => {
                    const previousIndex = (currentIndex + items.length - 1) % items.length;
                    items[previousIndex].focus();
                };

                const focusNext = () => {
                    const nextIndex = (currentIndex + 1) % items.length;
                    items[nextIndex].focus();
                };

                switch (code) {
                    case KeyboardCode.Enter:
                        toggleSelect();

                        break;

                    case KeyboardCode.Space:
                        hasChildren ? toggleExpand() : toggleSelect();

                        break;

                    case KeyboardCode.Right:
                        if (!hasChildren) {
                            break;
                        }

                        isExpanded ? focusNext() : toggleExpand();

                        break;

                    case KeyboardCode.Left:
                        if (hasChildren && isExpanded) {
                            toggleExpand();
                        } else if (parentId && parentId !== ROOT_ID) {
                            const parentIndex = treeState.nodes.findIndex((node) => node.props.id === parentId);

                            items[parentIndex].focus();
                        }
                        break;

                    case KeyboardCode.Up:
                        event.preventDefault();
                        focusPrevious();

                        break;

                    case KeyboardCode.Down:
                        event.preventDefault();
                        focusNext();

                        break;

                    default:
                        break;
                }
            },
            [handleExpand, handleSelect, treeState.expandedIds, treeState.nodes],
        );

        const sensorContext: SensorContext = useRef({
            nodes: treeState.nodes,
            offset,
        });

        const [coordinateGetter] = useState(() => sortableTreeKeyboardCoordinates(sensorContext));

        const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter }));

        const announcements: TreeAnnouncements = useMemo(() => {
            const getActiveTitle = (active: TreeActive) =>
                treeState.nodes.find((node) => node.key === active.id)?.props.contentComponent?.props.title;
            const getOverTitle = (over: TreeOver | null) =>
                treeState.nodes.find((node) => node.key === over?.id)?.props.contentComponent?.props.title;

            return {
                onDragStart({ active }) {
                    return `Picked up ${getActiveTitle(active) || active.id}.`;
                },
                onDragMove({ active, over }) {
                    return getMovementAnnouncement({
                        eventName: 'onDragMove',
                        activeId: active.id,
                        activeTitle: getActiveTitle(active),
                        overId: over?.id,
                        overTitle: getOverTitle(over),
                        treeState,
                        setCurrentPosition,
                        currentPosition,
                    });
                },
                onDragOver({ active, over }) {
                    return getMovementAnnouncement({
                        eventName: 'onDragOver',
                        activeId: active.id,
                        activeTitle: getActiveTitle(active),
                        overId: over?.id,
                        overTitle: getOverTitle(over),
                        treeState,
                        setCurrentPosition,
                        currentPosition,
                    });
                },
                onDragEnd({ active, over }) {
                    return getMovementAnnouncement({
                        eventName: 'onDragEnd',
                        activeId: active.id,
                        activeTitle: getActiveTitle(active),
                        overId: over?.id,
                        overTitle: getOverTitle(over),
                        treeState,
                        setCurrentPosition,
                        currentPosition,
                    });
                },
                onDragCancel({ active }) {
                    const nodeTitle = treeState.nodes.find((node) => node.key === active.id)?.props.contentComponent
                        .props.title;

                    return `Moving was cancelled. ${nodeTitle || active.id} was dropped in its original position.`;
                },
            };
        }, [currentPosition, treeState]);

        useDeepCompareEffect(() => {
            updateTreeState({
                type: 'REGISTER_ROOT_NODES',
                payload: removeFragmentsAndEnrichChildren(children, { parentId: ROOT_ID, level: 0 }),
            });
        }, [children]);

        useEffect(() => {
            updateTreeState({
                type: 'REPLACE_EXPANDED',
                payload: expandedIds ?? [],
            });
        }, [expandedIds]);

        useEffect(() => {
            updateTreeState({
                type: 'REPLACE_SELECTED',
                payload: selectedIds ?? [],
            });
        }, [selectedIds]);

        useDeepCompareEffect(() => {
            sensorContext.current = {
                nodes: treeState.nodes,
                offset,
            };
        }, [offset, treeState.nodes]);

        useEffect(() => {
            const projection =
                activeId && overId
                    ? getProjection({
                          nodes: treeState.nodes,
                          activeId,
                          overId,
                          dragOffset: offset,
                      })
                    : null;

            updateTreeState({
                type: 'SET_PROJECTION',
                payload: projection,
            });
        }, [activeId, offset, overId, treeState.nodes]);

        const nodes = useMemo(
            () =>
                treeState.nodes.map((node) => {
                    return cloneElement(node, {
                        projection: node.props.id === activeId ? treeState.projection : null,
                        treeDraggable: draggable,
                        isSelected: treeState.selectedIds.has(node.props.id),
                        isExpanded: treeState.expandedIds.has(node.props.id),
                        registerOverlay,
                        registerNodeChildren,
                        unregisterNodeChildren,
                        onExpand: handleExpand,
                        onShrink: handleShrink,
                        onSelect: handleSelect,
                    });
                }),
            [
                draggable,
                handleExpand,
                handleShrink,
                handleSelect,
                activeId,
                registerNodeChildren,
                registerOverlay,
                treeState.expandedIds,
                treeState.nodes,
                treeState.projection,
                treeState.selectedIds,
                unregisterNodeChildren,
            ],
        );

        const contextValue: TreeContextProps = useMemo(
            () => ({
                treeState,
                onSelect: handleSelect,
                onExpand: handleExpand,
                onShrink: handleShrink,
            }),
            [treeState, handleSelect, handleExpand, handleShrink],
        );

        return (
            <TreeContext.Provider value={contextValue}>
                <ul
                    id={id}
                    role="tree"
                    data-test-id={dataTestId}
                    onKeyDown={handleKeyDown}
                    aria-multiselectable={treeState.selectionMode === 'multiselect'}
                    className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
                >
                    <DndContext
                        sensors={sensors}
                        measuring={measuring}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDragMove={handleDragMove}
                        onDragStart={handleDragStart}
                        onDragCancel={handleDragCancel}
                        accessibility={{ announcements }}
                        collisionDetection={closestCenter}
                    >
                        <SortableContext items={items} strategy={verticalListSortingStrategy}>
                            {nodes}
                        </SortableContext>

                        {createPortal(
                            <DragOverlay wrapperElement="ul" dropAnimation={null} modifiers={[restrictToWindowEdges]}>
                                {treeState.overlay && (
                                    <TreeItemOverlay
                                        {...treeState.overlay}
                                        isSelected={treeState.selectedIds.has(treeState.overlay.id)}
                                    />
                                )}
                            </DragOverlay>,
                            document.body,
                        )}
                    </DndContext>
                </ul>
            </TreeContext.Provider>
        );
    },
);

Tree.displayName = 'FondueTree';
