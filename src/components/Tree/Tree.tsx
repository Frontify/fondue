/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    KeyboardEvent,
    cloneElement,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
    useTransition,
} from 'react';
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
    KeyboardSensor,
    MeasuringConfiguration,
    MeasuringStrategy,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import type {
    DragHandlerPosition,
    RegisterNodeChildrenPayload,
    SensorContext,
    TreeAnnouncements,
    TreeDragOverEvent,
    TreeDragStartEvent,
    TreeItemProps,
    TreeItemStyling,
    TreeProps,
    TreeState,
    TreeStateAction,
} from '@components/Tree/types';

import { InternalTreeItemProps, type Overlay, TreeItemOverlay } from './TreeItem';

import {
    recursivelyRemoveFragmentsAndEnrichChildren,
    sortableTreeKeyboardCoordinates,
    useDeepCompareEffect,
} from './utils';

import {
    currentNodesChanged,
    findIndexById,
    getAnnouncements,
    getCurrentChildrenForNewNodesIfExpanded,
    getNodeChildrenIds,
    getNodesToRender,
    getProjection,
    getReactNodeIdsInFlatArray,
    handleKeyDownEvent,
    removeReactNodesFromFlatArray,
    sensorsActivationConstraint,
    shouldUpdateTreeState,
    updateNodeWithNewChildren,
} from './helpers';

import { TreeContext, TreeContextProps } from './TreeContext';
import { ROOT_ID } from './helpers';
import { InternalTreeItemMultiSelectProps } from './TreeItem/TreeItemMultiselect';

const measuring: MeasuringConfiguration = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

enableMapSet();

const reducer = produce((draft: TreeState, action: TreeStateAction) => {
    switch (action.type) {
        case 'EXPAND_NODE':
            draft.expandedIds = new Set(draft.expandedIds).add(action.payload);
            return;

        case 'SHRINK_NODE':
            const newExpanded = new Set(draft.expandedIds);
            newExpanded.delete(action.payload);

            draft.expandedIds = newExpanded;
            return;

        case 'SET_SELECTION_MODE':
            draft.selectionMode = action.payload.selectionMode;
            return;

        case 'SET_PROJECTION':
            if (!isEqual(draft.projection, action.payload)) {
                draft.projection = action.payload;
            }
            return;

        case 'REGISTER_OVERLAY_ITEM':
            draft.overlay = action.payload;
            return;

        case 'REGISTER_ROOT_NODES':
            // reset rootNodes keeping any children when expanded
            draft.rootNodes = getCurrentChildrenForNewNodesIfExpanded(
                draft.rootNodes,
                draft.expandedIds,
                action.payload,
            );
            return;

        case 'REGISTER_NODE_CHILDREN':
            const { id: parentId, children } = action.payload;

            if (findIndexById(draft.rootNodes, parentId) === -1) {
                // This can happen when this action is triggered before the rootNodes array is updated
                // It happens if using static data will all nodes and handling expandedIds outside the Tree component
                // Most of the cases, it will register the children properly afterwards
                // See Scrollable Tree With Label story
                console.warn(`Parent element with ID "${parentId}" not found when registering children.`);
                return;
            }

            const currentChildrenIds = getNodeChildrenIds(draft.rootNodes, parentId);
            const newChildrenIds = children.map((node) => node.props.id);

            if (
                !isEqual(currentChildrenIds, newChildrenIds) ||
                currentNodesChanged(currentChildrenIds, draft.rootNodes, children)
            ) {
                // keep any children when parent expanded
                const newChildren = getCurrentChildrenForNewNodesIfExpanded(
                    draft.rootNodes,
                    draft.expandedIds,
                    children,
                );
                draft.rootNodes = updateNodeWithNewChildren(draft.rootNodes, parentId, newChildren);
            }

            return;

        case 'UNREGISTER_NODE_CHILDREN':
            const nodeIds = getReactNodeIdsInFlatArray(draft.rootNodes, action.payload);
            if (nodeIds.length > 0) {
                draft.rootNodes = removeReactNodesFromFlatArray(draft.rootNodes, nodeIds);
            }
            return;

        case 'REGISTER_NODES':
            draft.nodes = action.payload;
            return;

        case 'REPLACE_EXPANDED':
            draft.expandedIds = new Set(action.payload);
            return;

        case 'REPLACE_SELECTED':
            draft.selectedIds = new Set(action.payload);
            return;

        case 'REPLACE_STATE':
            draft.rootNodes = action.payload.rootNodes;
            draft.overlay = action.payload.overlay;
            draft.projection = action.payload.projection;
            draft.selectedIds = action.payload.selectedIds;
            draft.expandedIds = action.payload.expandedIds;
            draft.selectionMode = action.payload.selectionMode;
            return;

        default:
            console.warn(`Updated tree with action "${action.type}" but it has not effect.`);
            return;
    }
});

export const Tree = memo(
    ({
        id,
        onDrop,
        onSelect = () => void 0,
        onExpand,
        onShrink,
        children,
        selectedIds,
        expandedIds,
        draggable = false,
        multiselect = false,
        dragHandlerPosition = 'left',
        showDragHandlerOnHoverOnly = true,
        showContentWhileDragging = false,
        itemStyle,
        'data-test-id': dataTestId = 'fondue-tree',
    }: TreeProps) => {
        const initialState: TreeState = useMemo(
            () => ({
                selectionMode: multiselect ? 'multiselect' : 'single',
                selectedIds: new Set(selectedIds ?? []),
                expandedIds: new Set(expandedIds ?? []),
                rootNodes: [],
                expandedNodes: [],
                nodes: [],
                nodesReady: false,
                projection: null,
            }),
            [expandedIds, multiselect, selectedIds],
        );

        const [treeState, updateTreeState] = useReducer(reducer, initialState);
        const [, startTransition] = useTransition();

        const [offset, setOffset] = useState<Nullable<number>>(null);
        const [overId, setOverId] = useState<Nullable<string>>(null);
        const [activeId, setActiveId] = useState<Nullable<string>>(null);
        const [currentPosition, setCurrentPosition] =
            useState<Nullable<{ overId: string; parentId: Nullable<string> }>>(null);

        useEffect(() => {
            const keyDownHandler = (event: globalThis.KeyboardEvent) => {
                if (shouldUpdateTreeState(event, multiselect)) {
                    updateTreeState({
                        type: 'SET_SELECTION_MODE',
                        payload: { selectionMode: 'multiselect' },
                    });
                }
            };

            const keyUpHandler = (event: globalThis.KeyboardEvent) => {
                if (shouldUpdateTreeState(event, multiselect)) {
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
                onSelect(id);
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

        const handleDragEnd = (event: DragEndEvent) => {
            resetState();

            const { over, active } = event;

            if (!over?.id || !active?.id || !treeState.projection?.parentId) {
                return;
            }

            const activeNode = treeState.nodes.find((node) => node.props.id === active.id);
            const contentComponent = activeNode?.props?.contentComponent;

            onDrop?.({
                id: active.id.toString(),
                parentId: treeState.projection.parentId,
                sort: treeState.projection.position,
                contentComponent,
            });
        };

        const handleDragStart = ({ active: { id: activeId, data } }: TreeDragStartEvent) => {
            setActiveId(activeId);
            setOverId(activeId);

            if (activeId && data.current) {
                setCurrentPosition({
                    parentId: data.current.parentId,
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

            document.body.style.setProperty('cursor', 'default');
        };

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLUListElement>) => {
                return handleKeyDownEvent(
                    event,
                    treeState.expandedIds,
                    treeState.nodes,
                    handleSelect,
                    handleShrink,
                    handleExpand,
                );
            },
            [handleExpand, handleShrink, handleSelect, treeState.expandedIds, treeState.nodes],
        );

        const sensorContext: SensorContext = useRef({
            nodes: treeState.nodes,
            offset: offset ?? 0,
        });

        const [coordinateGetter] = useState(() => sortableTreeKeyboardCoordinates(sensorContext));
        const activationConstraint = sensorsActivationConstraint(dragHandlerPosition);

        const sensors = useSensors(
            useSensor(PointerSensor, { activationConstraint }),
            useSensor(KeyboardSensor, { coordinateGetter }),
        );

        const announcements: TreeAnnouncements = useMemo(() => {
            return getAnnouncements(treeState, currentPosition, setCurrentPosition);
        }, [currentPosition, treeState]);

        useDeepCompareEffect(() => {
            if (!children) {
                return;
            }

            updateTreeState({
                type: 'REGISTER_ROOT_NODES',
                payload: recursivelyRemoveFragmentsAndEnrichChildren(children, { parentId: ROOT_ID, level: 0 }),
            });
        }, [children]);

        useDeepCompareEffect(() => {
            if (treeState.rootNodes.length === 0) {
                return;
            }

            startTransition(() => {
                const nodesToRender = getNodesToRender(treeState.rootNodes, treeState.expandedIds);

                updateTreeState({
                    type: 'REGISTER_NODES',
                    payload: nodesToRender,
                });
            });
        }, [treeState.rootNodes, treeState.expandedIds]);

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
                offset: offset ?? 0,
            };
        }, [offset, treeState.nodes]);

        useEffect(() => {
            const projection =
                activeId && overId
                    ? getProjection({
                          nodes: treeState.nodes,
                          activeId,
                          overId,
                          dragOffset: offset ?? 0,
                      })
                    : null;

            updateTreeState({
                type: 'SET_PROJECTION',
                payload: projection,
            });
        }, [activeId, offset, overId, treeState.nodes]);

        const getPropToUse = (
            nodeProp: TreeItemProps['dragHandlerPosition' | 'showContentWhileDragging' | 'showDragHandlerOnHoverOnly'],
            treeProp: TreeProps['dragHandlerPosition' | 'showContentWhileDragging' | 'showDragHandlerOnHoverOnly'],
        ) => nodeProp || treeProp;

        const { nodes, items } = useMemo(() => {
            const treeItemStyle = {
                spacingY: 'none',
                contentHight: 'single-line',
                shadow: 'none',
                borderRadius: 'small',
                borderWidth: 'none',
                borderStyle: 'none',
                activeColorStyle: 'neutral',
                ...itemStyle,
            } as TreeItemStyling;

            const getTreeItemProps = (nodeProps: InternalTreeItemProps | InternalTreeItemMultiSelectProps) => {
                return multiselect
                    ? {
                          checkBoxPosition: getPropToUse(
                              (nodeProps as InternalTreeItemMultiSelectProps).checkBoxPosition,
                              dragHandlerPosition,
                          ) as DragHandlerPosition,
                      }
                    : {
                          draggable: (nodeProps as InternalTreeItemProps).draggable ? true : draggable,
                          dragHandlerPosition: getPropToUse(
                              (nodeProps as InternalTreeItemProps).dragHandlerPosition,
                              dragHandlerPosition,
                          ) as TreeProps['dragHandlerPosition'],
                          showDragHandlerOnHoverOnly: getPropToUse(
                              (nodeProps as InternalTreeItemProps).showDragHandlerOnHoverOnly,
                              showDragHandlerOnHoverOnly,
                          ) as TreeProps['showDragHandlerOnHoverOnly'],
                          showContentWhileDragging: getPropToUse(
                              (nodeProps as InternalTreeItemProps).showContentWhileDragging,
                              showContentWhileDragging,
                          ) as TreeProps['showContentWhileDragging'],
                      };
            };

            return {
                items: treeState.nodes.map((node) => node.props.id),
                nodes: treeState.nodes.map((node) =>
                    cloneElement(node, {
                        ...getTreeItemProps(node.props),
                        itemStyle: { ...treeItemStyle, ...node.props.itemStyle },
                        registerOverlay,
                        onExpand: handleExpand,
                        onShrink: handleShrink,
                        onSelect: handleSelect,
                        registerNodeChildren,
                        unregisterNodeChildren,
                    }),
                ),
            };
        }, [
            itemStyle,
            treeState.nodes,
            draggable,
            multiselect,
            dragHandlerPosition,
            showDragHandlerOnHoverOnly,
            showContentWhileDragging,
            registerOverlay,
            handleExpand,
            handleShrink,
            handleSelect,
            registerNodeChildren,
            unregisterNodeChildren,
        ]);

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
                        accessibility={{
                            announcements,
                            container: document.getElementById(id)?.parentElement ?? document.body,
                        }}
                        collisionDetection={closestCorners}
                    >
                        <SortableContext items={items} strategy={verticalListSortingStrategy}>
                            {nodes}
                        </SortableContext>

                        {createPortal(
                            <DragOverlay
                                zIndex={1500}
                                wrapperElement="ul"
                                dropAnimation={null}
                                modifiers={[restrictToWindowEdges]}
                            >
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
