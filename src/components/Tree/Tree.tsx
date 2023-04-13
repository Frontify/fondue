/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
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
import { TreeContext, TreeContextProps } from '@components/Tree/TreeContext';

import { type Overlay, TreeItemOverlay } from './TreeItem';
import { getMovementAnnouncement, getProjection } from './helpers';
import { removeFragmentsAndEnrichChildren, sortableTreeKeyboardCoordinates } from './utils';

export const ROOT_ID = '__ROOT__';
export const INDENTATION_WIDTH = 32;

const measuring: MeasuringConfiguration = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

const reducer = (state: TreeState, action: TreeStateAction): TreeState => {
    switch (action.type) {
        case 'SET_SELECT': {
            const { id, isSelected } = action.payload;

            const newSelected = new Set(state.selectedIds);

            if (isSelected && state.selectionMode === 'single') {
                newSelected.clear();
            }

            isSelected ? newSelected.add(id) : newSelected.delete(id);

            return {
                ...state,
                selectedIds: newSelected,
            };
        }

        case 'SET_EXPAND': {
            const { id, isExpanded } = action.payload;

            const newExpanded = new Set(state.expandedIds);

            isExpanded ? newExpanded.add(id) : newExpanded.delete(id);

            return {
                ...state,
                expandedIds: newExpanded,
            };
        }

        case 'SET_SELECTION_MODE': {
            return {
                ...state,
                selectionMode: action.payload.selectionMode,
            };
        }

        case 'SET_PROJECTION': {
            return {
                ...state,
                projection: action.payload,
            };
        }

        case 'REGISTER_OVERLAY_ITEM': {
            return {
                ...state,
                overlay: action.payload,
            };
        }

        case 'REGISTER_NODE_CHILDREN': {
            const { id, children } = action.payload;

            const index = state.nodes.findIndex((node) => node.props.id === id);

            if (index === -1) {
                console.error(`Element with ID "${id}" not found.`);
                return state;
            }

            const sliceIndex = index + 1;

            const nodes = [...state.nodes.slice(0, sliceIndex), ...children, ...state.nodes.slice(sliceIndex)].filter(
                (node, index, self) => index === self.findIndex((item) => item.key === node.key),
            );

            return {
                ...state,
                nodes,
            };
        }

        case 'UNREGISTER_NODE_CHILDREN': {
            const newNodes = state.nodes.filter(
                (node) => !action.payload.map((node) => node.props.id).includes(node.props.id),
            );

            return { ...state, nodes: newNodes };
        }

        case 'REPLACE_STATE':
            return action.payload;

        default:
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            console.warn(`Updated tree with action "${action.type}" but it has not effect.`);
            return state;
    }
};

export const Tree = ({
    id,
    onDrop,
    onSelect,
    onExpand,
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

    const registerOverlay = useCallback(
        (overlay: Overlay) => updateTreeState({ type: 'REGISTER_OVERLAY_ITEM', payload: overlay }),
        [],
    );

    const registerNodeChildren = useCallback(
        (payload: RegisterNodeChildrenPayload) => updateTreeState({ type: 'REGISTER_NODE_CHILDREN', payload }),
        [],
    );

    const unregisterNodeChildren = useCallback(
        (payload: ReactElement[]) => updateTreeState({ type: 'UNREGISTER_NODE_CHILDREN', payload }),
        [],
    );

    const handleSelect = useCallback(
        (id: string) => {
            updateTreeState({
                type: 'SET_SELECT',
                payload: { id, isSelected: !treeState.selectedIds.has(id) },
            });
        },
        [treeState.selectedIds],
    );

    const handleExpand = useCallback(
        (id: string) => {
            const isExpanded = !treeState.expandedIds.has(id);

            updateTreeState({
                type: 'SET_EXPAND',
                payload: { id, isExpanded },
            });
        },
        [treeState.expandedIds],
    );

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            resetState();

            const { over, active, collisions } = event;

            if (!over?.id || !active?.id) {
                return;
            }

            const collision = collisions?.find((collision) => collision.id === over?.id);

            onDrop?.(
                { id: over?.id.toString(), sort: 1 },
                { id: active.id.toString(), sort: 1 },
                collision?.data?.position,
            );
        },
        [onDrop],
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

    const contextValue: TreeContextProps = useMemo(
        () => ({
            treeState,
            draggable,
            onSelect: onSelect ?? handleSelect,
            onExpand: onExpand ?? handleExpand,
            registerOverlay,
            registerNodeChildren,
            unregisterNodeChildren,
        }),
        [
            draggable,
            onExpand,
            onSelect,
            treeState,
            handleSelect,
            handleExpand,
            registerOverlay,
            registerNodeChildren,
            unregisterNodeChildren,
        ],
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
                const nodeTitle = treeState.nodes.find((node) => node.key === active.id)?.props.contentComponent.props
                    .title;

                return `Moving was cancelled. ${nodeTitle || active.id} was dropped in its original position.`;
            },
        };
    }, [currentPosition, treeState]);

    useEffect(() => {
        updateTreeState({
            type: 'REPLACE_STATE',
            payload: initialState,
        });
    }, [initialState]);

    useEffect(() => {
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
                        <AnimatePresence>{treeState.nodes}</AnimatePresence>
                    </SortableContext>

                    {createPortal(
                        <DragOverlay wrapperElement="ul" dropAnimation={null} modifiers={[restrictToWindowEdges]}>
                            <TreeItemOverlay />
                        </DragOverlay>,
                        document.body,
                    )}
                </DndContext>
            </ul>
        </TreeContext.Provider>
    );
};

Tree.displayName = 'FondueTree';
