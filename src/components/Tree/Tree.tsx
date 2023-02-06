/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode, useCallback, useEffect, useMemo, useReducer } from 'react';

import type {
    RegisterTreeItemPayload,
    TreeItemState,
    TreeProps,
    TreeState,
    TreeStateAction,
} from '@components/Tree/types';
import { TreeContext } from '@components/Tree/TreeContext';
import { DndWrapper, DraggableItem, DropZonePosition } from '@utilities/dnd';

import { useDraggableEnhancedChildren } from './hooks/useDraggableEnhancedChildren';
import { cloneThroughFragments } from './utils';

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

        case 'SET_SELECTION_MODE':
            return {
                ...state,
                selectionMode: action.payload.selectionMode,
            };

        case 'REGISTER_TREE_ITEM': {
            const { id, childrenIds, level, parentId, domElement: ref } = action.payload;

            if (state.items.has(id)) {
                console.warn('Tree item already registered.');
                return state;
            }

            if (parentId) {
                const parentState = state.items.get(parentId);
                if (parentState) {
                    const newChildrenIds = [...(parentState?.childrenIds ?? []), id];
                    state.items.set(parentId, { ...parentState, childrenIds: newChildrenIds });
                }
            }

            return {
                ...state,
                items: state.items.set(id, {
                    parentId,
                    childrenIds,
                    level,
                    domElement: ref,
                }),
            };
        }

        case 'UNREGISTER_TREE_ITEM':
            const { id } = action.payload;
            const currentItem = state.items.get(id);

            if (currentItem?.parentId) {
                const parentState = state.items.get(currentItem.parentId);
                if (parentState) {
                    const newChildrenIds = (parentState?.childrenIds ?? []).filter((childId) => childId !== id);
                    state.items.set(currentItem.parentId, { ...parentState, childrenIds: newChildrenIds });
                }
            }

            state.items.delete(id);

            return {
                ...state,
                items: state.items,
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
    activeIds,
    selectedIds,
    expandedIds = [],
    draggable = false,
    onSelect,
    onExpand,
    onDrop,
    children,
}: TreeProps) => {
    const initialState: TreeState = {
        items: new Map<string, TreeItemState>().set(ROOT_ID, { level: -1 }),
        selectedIds: new Set(selectedIds ?? activeIds ?? []),
        expandedIds: new Set(expandedIds),
        selectionMode: 'single',
    };

    const [treeState, updateTreeState] = useReducer(reducer, initialState);

    const keyDownHandler = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Meta' || event.ctrlKey) {
            updateTreeState({
                type: 'SET_SELECTION_MODE',
                payload: { selectionMode: 'multiselect' },
            });
        }
    }, []);

    const keyUpHandler = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Meta' || event.ctrlKey) {
            updateTreeState({
                type: 'SET_SELECTION_MODE',
                payload: { selectionMode: 'single' },
            });
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);
        };
    }, [keyDownHandler, keyUpHandler]);

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
            targetItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
            sourceItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
            position: DropZonePosition,
        ) => {
            onDrop?.(targetItem, sourceItem, position);
        },
        [onDrop],
    );

    const unregisterTreeItem = useCallback(
        (id: string) => updateTreeState({ type: 'UNREGISTER_TREE_ITEM', payload: { id } }),
        [],
    );

    const registerTreeItem = useCallback(
        (payload: RegisterTreeItemPayload) => updateTreeState({ type: 'REGISTER_TREE_ITEM', payload }),
        [],
    );

    const childrenArray = useMemo(() => cloneThroughFragments(children, { level: 0, parentId: ROOT_ID }), [children]);
    const { draggableEnhancedChildren } = useDraggableEnhancedChildren({
        accept: id,
        onDrop: handleDrop,
        children: childrenArray,
    });
    const enhancedChildren: ReactNode = draggable ? draggableEnhancedChildren : children;

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
