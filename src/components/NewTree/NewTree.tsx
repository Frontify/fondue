import React, { useEffect, useState } from 'react';
import { DndWrapper } from '@utilities/dnd';

import { NewTreeProps } from './types';
import { NewTreeContext } from './NewTreeContext';

export const NewTree = ({ treeId, children }: NewTreeProps) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [multiselectMode, setMultiselectMode] = useState<boolean>(false);

    const downKeyHandler = (event: KeyboardEvent) => {
        if (event.key === 'Meta' || event.ctrlKey) {
            setMultiselectMode(true);
        } else {
            setMultiselectMode(false);
        }
    };

    const upKeyHandler = (event: KeyboardEvent) => {
        if (event.key === 'Meta' || event.ctrlKey) {
            setMultiselectMode(false);
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
        <NewTreeContext.Provider value={{ treeId, selectedIds, setSelectedIds, multiselectMode }}>
            <ul
                id={treeId}
                data-test-id="tree"
                className="tw-p-0 tw-m-0 tw-font-sans tw-font-normal tw-list-none tw-text-left tw-text-sm tw-select-none"
            >
                <DndWrapper id={treeId}>{children}</DndWrapper>
            </ul>
        </NewTreeContext.Provider>
    );
};
