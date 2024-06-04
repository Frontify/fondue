/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type SelectItemType = {
    value: string;
    label: string;
};

type ContextType = {
    items: SelectItemType[];
    registerMenuItem: (item: SelectItemType) => void;
    setFilterText: (text: string) => void;
};

export const SelectContext = createContext<ContextType>({
    items: [{ value: 'test', label: 'test' }],
    registerMenuItem: () => {},
    setFilterText: () => {},
});

export const SelectContextProvider = ({ children }: { children: ReactNode }) => {
    const [inputItems, setInputItemState] = useState<SelectItemType[]>([]);
    const [filterText, setFilterText] = useState('');
    const registerMenuItem = (item: SelectItemType) => {
        if (inputItems.some((i) => i.value === item.value)) {
            return;
        } else {
            setInputItemState((prev) => [...prev, item]);
        }
    };
    const filteredItems = useMemo(() => {
        if (filterText === '') {
            return inputItems;
        } else {
            return inputItems.filter((item) => item.label.toLowerCase().includes(filterText.toLowerCase()));
        }
    }, [inputItems, filterText]);

    return (
        <SelectContext.Provider value={{ registerMenuItem, items: filteredItems, setFilterText }}>
            {children}
        </SelectContext.Provider>
    );
};

export const useSelectData = () => {
    const { items, registerMenuItem, setFilterText } = useContext(SelectContext);

    return {
        items,
        registerMenuItem,
        setFilterText,
    };
};
