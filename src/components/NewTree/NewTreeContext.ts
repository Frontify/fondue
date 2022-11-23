/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

export interface NewTreeContext {
    treeId: string;
    selectedIds: string[];
    onSelect: (id: string) => void;
    draggable: boolean;
}

export const NewTreeContext = createContext<NewTreeContext>({} as NewTreeContext);

export const useNewTreeContext = () => {
    return useContext(NewTreeContext);
};
