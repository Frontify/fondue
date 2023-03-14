/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    KeyboardSensor,
    MeasuringConfiguration,
    MeasuringStrategy,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

import type {
    RegisterTreeItemChildrenPayload,
    RegisterTreeItemPayload,
    TreeItemState,
    TreeProps,
    TreeState,
    TreeStateAction,
} from '@components/Tree/types';
import { TreeContext, TreeContextProps } from '@components/Tree/TreeContext';

import { cloneThroughFragments, flattenChildren, fondueCollisionDetection, snapToHandle } from './utils';
import { type Overlay, TreeItemOverlay } from './TreeItemOverlay';

export const ROOT_ID = '__ROOT__';

const measuring: MeasuringConfiguration = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

const reducer = (state: TreeState, action: TreeStateAction): TreeState => {
    switch (action.type) {
        case 'SET_SELECT': {
            const { id, isSelected } = action.payload;

            if (!state.items.has(id)) {
                console.error(`No tree item registered with id ${id}.`);
                return state;
            }

            if (isSelected) {
                if (state.selectionMode === 'single') {
                    state.selectedIds.clear();
                }

                return {
                    ...state,
                    selectedIds: state.selectedIds.add(id),
                };
            }

            state.selectedIds.delete(id);
            return {
                ...state,
            };
        }

        case 'SET_EXPAND': {
            const { id, isExpanded } = action.payload;

            if (!state.items.has(id)) {
                throw new Error(`No tree item registered with id ${id}.`);
            }

            if (isExpanded) {
                return {
                    ...state,
                    expandedIds: state.expandedIds.add(id),
                };
            }

            state.expandedIds.delete(id);
            return {
                ...state,
            };
        }

        case 'ON_DROP': {
            const { targetId, id, position } = action.payload;

            const targetState = state.items.get(targetId);

            if (!targetState) {
                console.error(`No tree item registered with id ${targetId}.`);
                return state;
            }

            if (position === 'before' || position === 'after') {
                const parentTargetState = targetState.parentId ? state.items.get(targetState.parentId) : undefined;
                if (!parentTargetState || !targetState.parentId || !parentTargetState.childrenIds) {
                    console.error(`No tree item registered with id ${targetState.parentId}.`);
                    return state;
                }

                const sourceIndexInParent = parentTargetState.childrenIds.findIndex((childId) => childId === id);
                const targetIndexInParent = parentTargetState.childrenIds.findIndex((childId) => childId === targetId);

                const element = parentTargetState.childrenIds[sourceIndexInParent];

                const arrayWithoutElement = [
                    ...parentTargetState.childrenIds.slice(0, sourceIndexInParent),
                    ...parentTargetState.childrenIds.slice(sourceIndexInParent + 1),
                ];

                const indexOffset = position === 'after' ? 1 : 0;

                const newArray = [
                    ...arrayWithoutElement.slice(0, targetIndexInParent + indexOffset),
                    element,
                    ...arrayWithoutElement.slice(targetIndexInParent + indexOffset),
                ];

                state.items.set(targetState.parentId, { ...parentTargetState, childrenIds: newArray });
            } else if (position === 'within') {
                const sourceState = state.items.get(id);

                if (!sourceState || !sourceState.parentId) {
                    console.error(`No tree item registered with id ${id ?? sourceState?.parentId}.`);
                    return state;
                }
                const targetState = state.items.get(targetId);
                const oldParentState = state.items.get(sourceState.parentId);

                if (!targetState || !oldParentState) {
                    console.error(`No tree item registered with id ${targetId ?? sourceState.parentId}.`);
                    return state;
                }

                const oldParentChildrenIds = oldParentState.childrenIds?.filter((childId) => childId !== id);

                state.items
                    // Delete from old parent
                    .set(sourceState.parentId, {
                        ...oldParentState,
                        childrenIds:
                            oldParentChildrenIds && oldParentChildrenIds.length > 0 ? oldParentChildrenIds : undefined,
                    })
                    // Add to new parent
                    .set(targetId, { ...targetState, childrenIds: [...(targetState?.childrenIds ?? []), id] })
                    // Set new parent in source
                    .set(id, { ...sourceState, parentId: targetId });
            }

            return {
                ...state,
            };
        }

        case 'SET_SELECTION_MODE': {
            return {
                ...state,
                selectionMode: action.payload.selectionMode,
            };
        }

        case 'REGISTER_TREE_ITEM': {
            const { id, level, parentId, domElement: ref } = action.payload;

            if (state.items.has(id)) {
                console.warn('Tree item already registered.');
                return state;
            }

            return {
                ...state,
                items: state.items.set(id, {
                    parentId,
                    level,
                    domElement: ref,
                    childrenIds: undefined,
                }),
            };
        }

        case 'REGISTER_TREE_ITEM_CHILDREN': {
            const { id, childrenIds } = action.payload;

            const itemState = state.items.get(id);
            if (!itemState) {
                console.error(`No tree item registered with id ${id}.`);
                return state;
            }

            state.items.set(id, { ...itemState, childrenIds });

            return { ...state };
        }

        case 'UNREGISTER_TREE_ITEM': {
            const { id } = action.payload;

            state.items.delete(id);

            return {
                ...state,
                items: state.items,
            };
        }

        case 'REGISTER_OVERLAY_ITEM': {
            return {
                ...state,
                overlay: action.payload,
            };
        }

        case 'REPLACE_STATE':
            return {
                ...state,
                selectedIds: action.payload.selectedIds,
                expandedIds: action.payload.expandedIds,
                selectionMode: action.payload.selectionMode,
            };

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
}: TreeProps) => {
    const initialState: TreeState = useMemo(
        () => ({
            selectionMode: 'single',
            selectedIds: new Set(selectedIds ?? []),
            expandedIds: new Set(expandedIds ?? []),
            items: new Map<UniqueIdentifier, TreeItemState>().set(ROOT_ID, { level: -1 }),
        }),
        [expandedIds, selectedIds],
    );

    const [treeState, updateTreeState] = useReducer(reducer, initialState);

    const unregisterTreeItem = useCallback(
        (id: UniqueIdentifier) => updateTreeState({ type: 'UNREGISTER_TREE_ITEM', payload: { id } }),
        [],
    );

    const registerTreeItem = useCallback(
        (payload: RegisterTreeItemPayload) => updateTreeState({ type: 'REGISTER_TREE_ITEM', payload }),
        [],
    );

    const registerTreeItemChildren = useCallback(
        (payload: RegisterTreeItemChildrenPayload) => updateTreeState({ type: 'REGISTER_TREE_ITEM_CHILDREN', payload }),
        [],
    );

    const registerOverlay = useCallback(
        (overlay: Overlay) => updateTreeState({ type: 'REGISTER_OVERLAY_ITEM', payload: overlay }),
        [],
    );

    const enhancedChildren = useMemo(
        () => cloneThroughFragments(children, { level: 0, parentId: ROOT_ID }),
        [children],
    );

    const childrenIds = useMemo(
        () =>
            flattenChildren(enhancedChildren)
                .map((child) => child.props.id)
                .filter(Boolean),
        [enhancedChildren],
    );

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (multiselect && (event.key === 'Meta' || event.ctrlKey)) {
                updateTreeState({
                    type: 'SET_SELECTION_MODE',
                    payload: { selectionMode: 'multiselect' },
                });
            }
        };

        const keyUpHandler = (event: KeyboardEvent) => {
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

    useEffect(() => {
        updateTreeState({
            type: 'REPLACE_STATE',
            payload: initialState,
        });
    }, [initialState]);

    useEffect(() => {
        registerTreeItemChildren({ id: ROOT_ID, childrenIds });
    }, [childrenIds, registerTreeItemChildren]);

    const handleSelect = useCallback(
        (id: UniqueIdentifier) => {
            updateTreeState({
                type: 'SET_SELECT',
                payload: { id, isSelected: !treeState.selectedIds.has(id) },
            });
        },
        [treeState.selectedIds],
    );

    const handleExpand = useCallback(
        (id: UniqueIdentifier) => {
            updateTreeState({
                type: 'SET_EXPAND',
                payload: { id, isExpanded: !treeState.expandedIds.has(id) },
            });
        },
        [treeState.expandedIds],
    );

    const handleDrop = useCallback(
        (event: DragEndEvent) => {
            const { over, active, collisions } = event;

            if (!over?.id || !active?.id) {
                return;
            }

            const collision = collisions?.find((collision) => collision.id === over?.id);

            updateTreeState({
                type: 'ON_DROP',
                payload: {
                    id: active.id,
                    targetId: over?.id,
                    position: collision?.data?.position,
                },
            });

            onDrop?.(
                { id: over?.id.toString(), sort: 1 },
                { id: active.id.toString(), sort: 1 },
                collision?.data?.position,
            );
        },
        [onDrop],
    );

    const contextValue: TreeContextProps = useMemo(
        () => ({
            treeId: id,
            treeState,
            draggable,
            onSelect: onSelect ?? handleSelect,
            onExpand: onExpand ?? handleExpand,
            unregisterTreeItem,
            registerTreeItem,
            registerTreeItemChildren,
            registerOverlay,
        }),
        [
            draggable,
            handleExpand,
            handleSelect,
            id,
            onExpand,
            onSelect,
            registerOverlay,
            registerTreeItem,
            registerTreeItemChildren,
            treeState,
            unregisterTreeItem,
        ],
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );
    return (
        <TreeContext.Provider value={contextValue}>
            <ul
                id={id}
                role="tree"
                data-test-id="tree"
                className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
            >
                <DndContext
                    sensors={sensors}
                    measuring={measuring}
                    onDragEnd={handleDrop}
                    collisionDetection={fondueCollisionDetection}
                >
                    <SortableContext items={childrenIds} strategy={verticalListSortingStrategy}>
                        {enhancedChildren}
                    </SortableContext>

                    <DragOverlay dropAnimation={null} modifiers={[restrictToWindowEdges, snapToHandle]}>
                        <TreeItemOverlay />
                    </DragOverlay>
                </DndContext>
            </ul>
        </TreeContext.Provider>
    );
};

Tree.displayName = 'FondueTree';
