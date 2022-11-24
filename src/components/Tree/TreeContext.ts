/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

export interface TreeContext {
    treeId: string;
    selectedIds: string[];
    onSelect: (id: string) => void;
    draggable: boolean;
}

export const TreeContext = createContext<TreeContext>({} as TreeContext);

export const useTreeContext = () => {
    return useContext(TreeContext);
};
