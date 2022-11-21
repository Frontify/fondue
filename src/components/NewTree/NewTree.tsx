import React from 'react';
import { DndWrapper } from '@utilities/dnd';

import { NewTreeProps } from './types';
import { NewTreeContext } from './NewTreeContext';

export const NewTree = ({ treeId, children }: NewTreeProps) => {
    return (
        <NewTreeContext.Provider value={{ treeId }}>
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
