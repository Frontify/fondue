/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode, useEffect, useState } from 'react';

import { DropZone } from '@components/DropZone';
import { TreeContext } from '@components/Tree/TreeContext';
import type { TreeProps } from '@components/Tree/types';
import { DndWrapper, DraggableItem, DropZonePosition } from '@utilities/dnd';

export const Tree = ({ id, activeIds, draggable = false, onDrop, children }: TreeProps) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(activeIds || []);
    const [multiselect, setMultiselect] = useState<boolean>(false);

    const downKeyHandler = (event: KeyboardEvent) => {
        setMultiselect(event.key === 'Meta' || event.ctrlKey);
    };

    const upKeyHandler = (event: KeyboardEvent) => {
        setMultiselect(!(event.key === 'Meta' || event.ctrlKey));
    };

    useEffect(() => {
        window.addEventListener('keydown', downKeyHandler);
        window.addEventListener('keyup', upKeyHandler);

        return () => {
            window.removeEventListener('keydown', downKeyHandler);
            window.removeEventListener('keyup', upKeyHandler);
        };
    }, []);

    const handleSelect = (id: string) => {
        setSelectedIds((prevState) => {
            if (!multiselect) {
                return [id];
            }
            return prevState.includes(id) ? prevState.filter((selectedId) => selectedId !== id) : [...prevState, id];
        });
    };

    const handleDrop = (
        targetItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
        sourceItem: DraggableItem<{ id: string; sort: Nullable<number> }>,
        position: DropZonePosition,
    ) => {
        onDrop?.(targetItem, sourceItem, position);
    };

    const childrenArray = React.Children.toArray(children);

    let enhancedChildren: ReactNode = childrenArray;
    if (draggable) {
        enhancedChildren = React.Children.map(children, (child, index) => {
            if (!child) {
                return <></>;
            }

            return React.cloneElement(
                <>
                    {index === 0 && (
                        <DropZone
                            data={{
                                targetItem: { id: child.props.id, sort: child.props.sort },
                                position: DropZonePosition.Before,
                            }}
                            onDrop={handleDrop}
                            treeId={id}
                        />
                    )}

                    {child}
                </>,
            );
        });
    }

    return (
        <TreeContext.Provider
            value={{ treeId: id, selectedIds, onSelect: handleSelect, draggable, onDrop: handleDrop }}
        >
            <ul
                id={id}
                data-test-id="tree"
                className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
            >
                <DndWrapper id={id}>{enhancedChildren}</DndWrapper>
            </ul>
        </TreeContext.Provider>
    );
};
