/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

import type {
    RegisterTreeItemChildrenPayload,
    RegisterTreeItemPayload,
    TreeItemState,
    TreeProps,
    TreeState,
    TreeStateAction,
} from '@components/Tree/types';
import { TreeContext } from '@components/Tree/TreeContext';
import { DndWrapper, DraggableItem, DropZonePosition } from '@utilities/dnd';

import { cloneThroughFragments, flattenChildren } from './utils';
import { DEFAULT_TREE_ITEM_PADDING } from './utils/defaultValues';

const noop = () => undefined;
export const ROOT_ID = '__ROOT__';

const reducer = (state: TreeState, action: TreeStateAction): TreeState => {
    switch (action.type) {
        case 'SET_SELECT': {
            const { id, isSelected } = action.payload;

            if (!state.items.has(id)) {
                throw new Error(`No tree item registered with id ${id}.`);
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
                throw new Error(`No tree item registered with id ${targetId}.`);
            }

            if (position === DropZonePosition.Before || position === DropZonePosition.After) {
                const parentTargetState = targetState.parentId ? state.items.get(targetState.parentId) : undefined;
                if (!parentTargetState || !targetState.parentId || !parentTargetState.childrenIds) {
                    throw new Error(`No tree item registered with id ${targetState.parentId}.`);
                }

                const sourceIndexInParent = parentTargetState.childrenIds.findIndex((childId) => childId === id);
                const targetIndexInParent = parentTargetState.childrenIds.findIndex((childId) => childId === targetId);

                const element = parentTargetState.childrenIds[sourceIndexInParent];
                const arrayWithoutElement = [
                    ...parentTargetState.childrenIds.slice(0, sourceIndexInParent),
                    ...parentTargetState.childrenIds.slice(sourceIndexInParent + 1),
                ];

                const indexOffset = position === DropZonePosition.After ? 1 : 0;

                const newArray = [
                    ...arrayWithoutElement.slice(0, targetIndexInParent + indexOffset),
                    element,
                    ...arrayWithoutElement.slice(targetIndexInParent + indexOffset),
                ];

                state.items.set(targetState.parentId, { ...parentTargetState, childrenIds: newArray });
            } else if (position === DropZonePosition.Within) {
                const sourceState = state.items.get(id);
                if (!sourceState || !sourceState.parentId) {
                    throw new Error(`No tree item registered with id ${id ?? sourceState?.parentId}.`);
                }
                const targetState = state.items.get(targetId);
                const oldParentState = state.items.get(sourceState.parentId);
                if (!targetState || !oldParentState) {
                    throw new Error(`No tree item registered with id ${targetId ?? sourceState.parentId}.`);
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
                    .set(targetId, { ...targetState, childrenIds: [...(targetState?.childrenIds ?? [], id)] })
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
                throw new Error(`No tree item registered with id ${id}.`);
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
    selectedIds,
    expandedIds,
    draggable = false,
    onSelect,
    onExpand,
    onDrop,
    children,
    multiselect = true,
    basePadding = {},
}: TreeProps) => {
    const initialState: TreeState = useMemo(
        () => ({
            items: new Map<string, TreeItemState>().set(ROOT_ID, { level: -1 }),
            selectedIds: new Set(selectedIds ?? []),
            expandedIds: new Set(expandedIds ?? []),
            selectionMode: 'single',
        }),
        [expandedIds, selectedIds],
    );

    const [treeState, updateTreeState] = useReducer(reducer, initialState);

    const handleSelect = useCallback(
        (id: string) => {
            updateTreeState({
                type: 'SET_SELECT',
                payload: { id, isSelected: !treeState.selectedIds.has(id) },
            });
        },
        [treeState.selectedIds],
    );

    const handleExpand = useCallback((id: string, isExpanded: boolean) => {
        updateTreeState({
            type: 'SET_EXPAND',
            payload: { id, isExpanded },
        });
    }, []);

    const handleDrop = useCallback(
        (
            targetItem: DraggableItem<{ id: string; sort: number }>,
            sourceItem: DraggableItem<{ id: string; sort: number }>,
            position: DropZonePosition,
        ) => {
            updateTreeState({ type: 'ON_DROP', payload: { id: sourceItem.id, targetId: targetItem.id, position } });
            onDrop?.(targetItem, sourceItem, position);
        },
        [onDrop],
    );

    const enhancedChildren = useMemo(
        () => cloneThroughFragments(children, { level: 0, parentId: ROOT_ID }),
        [children],
    );

    const keyDownHandler = useCallback(
        (event: KeyboardEvent) => {
            if (multiselect && (event.key === 'Meta' || event.ctrlKey)) {
                updateTreeState({
                    type: 'SET_SELECTION_MODE',
                    payload: { selectionMode: 'multiselect' },
                });
            }
        },
        [multiselect],
    );

    const keyUpHandler = useCallback(
        (event: KeyboardEvent) => {
            if (multiselect && (event.key === 'Meta' || event.ctrlKey)) {
                updateTreeState({
                    type: 'SET_SELECTION_MODE',
                    payload: { selectionMode: 'single' },
                });
            }
        },
        [multiselect],
    );

    useEffect(() => {
        if (multiselect) {
            window.addEventListener('keydown', keyDownHandler);
            window.addEventListener('keyup', keyUpHandler);
        }

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);
        };
    }, [keyDownHandler, keyUpHandler, multiselect]);

    useEffect(() => {
        updateTreeState({
            type: 'REPLACE_STATE',
            payload: initialState,
        });
    }, [initialState]);

    const unregisterTreeItem = useCallback(
        (id: string) => updateTreeState({ type: 'UNREGISTER_TREE_ITEM', payload: { id } }),
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

    useEffect(() => {
        const childrenIds = flattenChildren(enhancedChildren)
            .map((child) => child.props.id)
            .filter(Boolean);
        registerTreeItemChildren({ id: ROOT_ID, childrenIds });
    }, [enhancedChildren, registerTreeItemChildren]);

    return (
        <TreeContext.Provider
            value={{
                treeId: id,
                treeState,
                draggable,
                onSelect: onSelect ?? handleSelect,
                onExpand: onExpand ?? handleExpand,
                onDrop: handleDrop ?? noop,
                unregisterTreeItem,
                registerTreeItem,
                registerTreeItemChildren,
                basePadding: { ...DEFAULT_TREE_ITEM_PADDING, ...basePadding },
            }}
        >
            <ul
                id={id}
                data-test-id="tree"
                className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
                role="tree"
            >
                <DndWrapper id={id}>{enhancedChildren}</DndWrapper>
            </ul>
        </TreeContext.Provider>
    );
};
Tree.displayName = 'FondueTree';
