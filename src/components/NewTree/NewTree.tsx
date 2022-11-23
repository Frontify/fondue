import React, { useEffect, useState } from 'react';
import { DndWrapper } from '@utilities/dnd';

import { NewTreeProps } from './types';
import { NewTreeContext } from './NewTreeContext';

export const NewTree = ({ id, draggable = false, children }: NewTreeProps) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [multiselect, setMultiselect] = useState<boolean>(false);

    const downKeyHandler = (event: KeyboardEvent) => {
        if (event.key === 'Meta' || event.ctrlKey) {
            setMultiselect(true);
        } else {
            setMultiselect(false);
        }
    };

    const upKeyHandler = (event: KeyboardEvent) => {
        if (event.key === 'Meta' || event.ctrlKey) {
            setMultiselect(false);
        }
    };

    const handleSelect = (id: string) => {
        if (multiselect) {
            const modifiedSelectedIds: Nullable<string[]> = selectedIds.includes(id)
                ? [...selectedIds].filter((i) => i !== id)
                : [...selectedIds, id];

            setSelectedIds(modifiedSelectedIds);
        } else {
            setSelectedIds([id]);
        }
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
        <NewTreeContext.Provider value={{ treeId: id, selectedIds, onSelect: handleSelect, draggable }}>
            <ul
                id={id}
                data-test-id="tree"
                className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
            >
                <DndWrapper id={id}>{children}</DndWrapper>
            </ul>
        </NewTreeContext.Provider>
    );
};
