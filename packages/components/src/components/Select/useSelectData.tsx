/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, isValidElement, useMemo, useState, type ReactNode } from 'react';

import { Select } from './Select';
import { type SelectItemProps } from './SelectMenu';
import { type SelectSlotProps } from './SelectSlot';
import { getSelectOptionValue } from './utils';

export type SelectItemType = {
    value: string;
    label: string;
};

export const getRecursiveOptionValues = (children: ReactNode): { value: string; label: string }[] => {
    const values: { value: string; label: string }[] = [];
    Children.forEach(children, (child) => {
        if (isValidElement<SelectItemProps>(child) && child.type === Select.Item) {
            values.push(getSelectOptionValue(child.props));
        } else if (isValidElement<{ children: ReactNode }>(child) && child?.props.children) {
            const optionValues = getRecursiveOptionValues(child.props.children);
            values.push.apply(optionValues);
        }
    });
    return values;
};

export const useSelectData = (
    children: ReactNode,
    defaultValue?: string,
): {
    inputSlots: ReactNode[];
    menuSlots: ReactNode[];
    setFilterText: (text: string) => void;
    items: SelectItemType[];
    defaultItem: SelectItemType | undefined;
} => {
    const [filterText, setFilterText] = useState('');
    const { inputSlots, menuSlots, itemValues } = useMemo(() => {
        const inputSlots: ReactNode[] = [];
        const menuSlots: ReactNode[] = [];

        Children.forEach(children, (child) => {
            if (isValidElement<SelectSlotProps>(child) && child.type === Select.Slot) {
                if (child.props.name === 'menu') {
                    menuSlots.push(child.props.children);
                } else if (child.props.name === 'left' || child.props.name === 'right') {
                    inputSlots.push(child.props.children);
                }
            }
        });

        return {
            inputSlots,
            menuSlots,
            itemValues: getRecursiveOptionValues(menuSlots),
        };
    }, [children]);

    const filteredItems = useMemo(
        () => itemValues.filter((item) => item.label.toLowerCase().includes(filterText.toLowerCase())),
        [itemValues, filterText],
    );

    const defaultItem = useMemo(() => {
        return itemValues.find((item) => item.value === defaultValue);
    }, [itemValues, defaultValue]);

    return {
        inputSlots,
        menuSlots,
        setFilterText,
        items: filteredItems,
        defaultItem,
    };
};
