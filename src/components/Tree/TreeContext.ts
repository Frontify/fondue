/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

export interface TreeContextProps {
    treeId: string;
    selectedIds: string[];
    onSelect: (id: string) => void;
    draggable: boolean;
}

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);

export const useTreeContext = () => {
    return useContext(TreeContext);
};
