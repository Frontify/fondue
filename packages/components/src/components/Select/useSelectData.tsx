/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, useState, type ReactNode } from 'react';

export type SelectItemType = {
    label: string;
};

type ContextType = {
    inputItems: { label: string }[];
    setInputItems: (item: SelectItemType) => void;
};

const SelectContext = createContext<ContextType>({
    inputItems: [],
    setInputItems: () => {},
});

export const SelectContextProvider = ({ children }: { children: ReactNode }) => {
    const [inputItems, setInputItemState] = useState([{ label: 'test' }]);
    const setInputItems = (item: SelectItemType) => setInputItemState([item]);
    return <SelectContext.Provider value={{ setInputItems, inputItems }}>{children}</SelectContext.Provider>;
};

export const useSelectData = () => {
    const { inputItems, setInputItems } = useContext(SelectContext);
    return {
        inputItems,
        setInputItems,
    };
};
