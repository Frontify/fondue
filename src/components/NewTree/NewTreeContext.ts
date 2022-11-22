/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

export interface NewTreeContext {
    treeId: string;
    selectedIds: string[];
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
    multiselectMode: boolean;
}

export const NewTreeContext = createContext<NewTreeContext>({} as NewTreeContext);

export const useNewTreeContext = () => {
    return useContext(NewTreeContext);
};
