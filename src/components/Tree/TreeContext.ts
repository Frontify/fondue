/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

import { OnDropCallback } from '@components/DropZone';

export type TreeContextProps = {
    treeId: string;
    // selectedIds: string[];
    // onSelect: (id: string) => void;

    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;

    draggable: boolean;
    onDrop: OnDropCallback<{ id: string; sort: Nullable<number> }>;
};

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);

export const useTreeContext = () => {
    return useContext(TreeContext);
};
