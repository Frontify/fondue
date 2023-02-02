/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode, useCallback, useMemo, useState } from 'react';

import type { TreeProps } from '@components/Tree/types';
import { TreeContext } from '@components/Tree/TreeContext';
import { DndWrapper, DraggableItem, DropZonePosition } from '@utilities/dnd';

import { useDraggableEnhancedChildren } from './hooks/useDraggableEnhancedChildren';
import { DescendantProvider, useDescendantsInit } from './descendants';
import { DescendantContext } from './DescendantContext';

const noop = () => undefined;

export const Tree = ({ id, draggable = false, onDrop, children }: TreeProps) => {
    // const [selectedIds, setSelectedIds] = useState<string[]>(activeIds || []);
    // const [multiselect, setMultiselect] = useState<boolean>(false);

    const [descendants, setDescendants] = useDescendantsInit();
    const [activeIndex, setActiveIndex] = useState(-1);

    // const downKeyHandler = (event: KeyboardEvent) => {
    //     setMultiselect(event.key === 'Meta' || event.ctrlKey);
    // };

    // const upKeyHandler = (event: KeyboardEvent) => {
    //     setMultiselect(!(event.key === 'Meta' || event.ctrlKey));
    // };

    // useEffect(() => {
    //     window.addEventListener('keydown', downKeyHandler);
    //     window.addEventListener('keyup', upKeyHandler);

    //     return () => {
    //         window.removeEventListener('keydown', downKeyHandler);
    //         window.removeEventListener('keyup', upKeyHandler);
    //     };
    // }, []);

    // const handleSelect = useCallback(
    //     (id: string) => {
    //         setSelectedIds((prevState) => {
    //             if (!multiselect) {
    //                 return [id];
    //             }
    //             return prevState.includes(id)
    //                 ? prevState.filter((selectedId) => selectedId !== id)
    //                 : [...prevState, id];
    //         });
    //     },
    //     [multiselect],
    // );

    const handleDrop = useCallback(
        (
            targetItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
            sourceItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
            position: DropZonePosition,
        ) => {
            if (onDrop) {
                onDrop(targetItem, sourceItem, position);
            } else {
                return null;
            }
        },
        [onDrop],
    );

    const { draggableEnhancedChildren } = useDraggableEnhancedChildren({ accept: id, onDrop: handleDrop, children });

    const memoizedTreeContextValue = useMemo(
        () => ({
            treeId: id,
            // selectedIds,
            // onSelect: handleSelect,
            activeIndex,
            setActiveIndex,
            draggable,
            onDrop: handleDrop ?? noop,
        }),
        [id, activeIndex, setActiveIndex, draggable, handleDrop],
    );

    const childrenArray = React.Children.toArray(children);

    let enhancedChildren: ReactNode = childrenArray;

    if (draggable) {
        enhancedChildren = draggableEnhancedChildren;
    }

    return (
        <DescendantProvider context={DescendantContext} items={descendants} set={setDescendants}>
            <TreeContext.Provider value={memoizedTreeContextValue}>
                <ul
                    id={id}
                    data-test-id="tree"
                    className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
                >
                    <DndWrapper id={id}>{enhancedChildren}</DndWrapper>
                </ul>
            </TreeContext.Provider>
        </DescendantProvider>
    );
};
