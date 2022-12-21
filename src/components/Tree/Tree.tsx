/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useEffect, useState } from 'react';

import { TreeContext } from '@components/Tree/TreeContext';
import type { TreeProps } from '@components/Tree/types';
import { DndWrapper } from '@utilities/dnd';

export const Tree = ({ id, activeIds, draggable = false, children }: TreeProps): ReactElement => {
    const [selectedIds, setSelectedIds] = useState<string[]>(activeIds || []);
    const [multiselect, setMultiselect] = useState<boolean>(false);

    const downKeyHandler = (event: KeyboardEvent) => {
        setMultiselect(event.key === 'Meta' || event.ctrlKey);
    };

    const upKeyHandler = (event: KeyboardEvent) => {
        setMultiselect(!(event.key === 'Meta' || event.ctrlKey));
    };

    const handleSelect = (id: string) => {
        setSelectedIds((prevState) => {
            if (!multiselect) {
                return [id];
            }
            return prevState.includes(id) ? prevState.filter((selectedId) => selectedId !== id) : [...prevState, id];
        });
    };

    useEffect(() => {
        window.addEventListener('keydown', downKeyHandler);
        window.addEventListener('keyup', upKeyHandler);

        return () => {
            window.removeEventListener('keydown', downKeyHandler);
            window.removeEventListener('keyup', upKeyHandler);
        };
    }, []);

    return (
        <TreeContext.Provider value={{ treeId: id, selectedIds, onSelect: handleSelect, draggable }}>
            <ul
                id={id}
                data-test-id="tree"
                className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
            >
                <DndWrapper id={id}>{children}</DndWrapper>
            </ul>
        </TreeContext.Provider>
    );
};
