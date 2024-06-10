/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { Children, cloneElement, isValidElement, useMemo, useState, type ReactNode } from 'react';

import { ForwardedRefSelectItem, type SelectItemProps } from './SelectItem';
import { ForwardedRefSelectSlot, type SelectSlotProps } from './SelectSlot';
import { getSelectOptionValue } from './utils';

export type SelectItemType = {
    value: string;
    label: string;
};

export const getRecursiveOptionValues = (children: ReactNode): { value: string; label: string }[] => {
    const values: { value: string; label: string }[] = [];
    Children.forEach(children, (child) => {
        if (isValidElement<SelectItemProps>(child) && child.type === ForwardedRefSelectItem) {
            values.push(getSelectOptionValue(child.props));
        } else if (isValidElement<{ children: ReactNode }>(child) && child?.props.children) {
            const optionValues = getRecursiveOptionValues(child.props.children);
            values.push.apply(optionValues);
        }
    });
    return values;
};

export const useSelectData = (children: ReactNode, defaultValue?: string) => {
    const [filterText, setFilterText] = useState('');
    const { inputSlots, menuSlots, itemValues, label, clearButton } = useMemo(() => {
        const inputSlots: ReactNode[] = [];
        const menuSlots: ReactNode[] = [];
        let label: ReactNode;
        let clearButton: ReactNode;

        Children.forEach(children, (child) => {
            if (isValidElement<SelectSlotProps>(child) && child.type === ForwardedRefSelectSlot) {
                if (child.props.name === 'menu') {
                    menuSlots.push(child.props.children);
                } else if (child.props.name === 'left' || child.props.name === 'right') {
                    inputSlots.push(child);
                } else if (child.props.name === 'label') {
                    label = child;
                } else if (child.props.name === 'clear') {
                    if (child.props.children) {
                        clearButton = child;
                    } else {
                        clearButton = cloneElement(child, { children: <IconCross size={16} /> });
                    }
                }
            }
        });

        return {
            inputSlots,
            menuSlots,
            clearButton,
            label,
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
        clearButton,
        setFilterText,
        items: filteredItems,
        label,
        defaultItem,
    };
};
