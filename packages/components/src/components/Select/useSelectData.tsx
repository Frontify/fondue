/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    createContext,
    forwardRef,
    useContext,
    useMemo,
    useState,
    type FC,
    type ForwardedRef,
    type ReactNode,
} from 'react';

export type SelectItemType = {
    value: string;
    label: string;
};

type ContextType = {
    items: SelectItemType[];
    registerMenuItem: (item: SelectItemType) => void;
    setFilterText: (text: string) => void;
};

const SelectContext = createContext<ContextType>({
    items: [{ value: 'test', label: 'test' }],
    registerMenuItem: () => {},
    setFilterText: () => {},
});

const SelectContextProvider = ({ children }: { children: ReactNode }) => {
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

export const withSelectContext = <RefType, ComponentPropType>(Component: FC<ComponentPropType>) => {
    // eslint-disable-next-line react/display-name
    return forwardRef<RefType, ComponentPropType>((props: ComponentPropType, forwardedRef: ForwardedRef<RefType>) => {
        return (
            <SelectContextProvider>
                <Component {...props} ref={forwardedRef} />
            </SelectContextProvider>
        );
    });
};
