/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import { Children, cloneElement, isValidElement, useCallback, useMemo, useState, type ReactNode } from 'react';

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
        } else if (isValidElement<{ children: ReactNode }>(child) && child.props.children) {
            const optionValues = getRecursiveOptionValues(child.props.children);
            for (const optionValue of optionValues) {
                values.push(optionValue);
            }
        }
    });
    return values;
};

export const useSelectData = (children: ReactNode, allowCustomValue = false) => {
    const [filterText, setFilterText] = useState('');

    const itemValues = useMemo(() => getRecursiveOptionValues(children), [children]);

    const valueExists = useMemo(
        () => itemValues.some((item) => item.label.toLocaleLowerCase() === filterText.toLocaleLowerCase()),
        [itemValues, filterText],
    );

    const shouldAddCustomItem = useMemo(
        () => allowCustomValue && filterText !== '' && !valueExists,
        [allowCustomValue, filterText, valueExists],
    );

    const { inputSlots, menuSlots, clearButton } = useMemo(() => {
        const inputSlots: ReactNode[] = [];
        const menuSlots: ReactNode[] = [];

        let clearButton: ReactNode;

        const hasSlots = Children.toArray(children).some(
            (child) => isValidElement<SelectSlotProps>(child) && child.type === ForwardedRefSelectSlot,
        );

        if (hasSlots) {
            Children.forEach(children, (child) => {
                if (isValidElement<SelectSlotProps>(child) && child.type === ForwardedRefSelectSlot) {
                    if (child.props.name === 'menu') {
                        menuSlots.push(child.props.children);
                    } else if (child.props.name === 'left' || child.props.name === 'right') {
                        inputSlots.push(child);
                    } else if (child.props.name === 'clear') {
                        if (child.props.children) {
                            clearButton = child;
                        } else {
                            clearButton = cloneElement(child, { children: <IconCross size={16} /> });
                        }
                    }
                }
            });
        } else {
            menuSlots.push(children);
        }

        if (shouldAddCustomItem) {
            const customItem = (
                <ForwardedRefSelectItem key={filterText} value={filterText} data-test-id="custom-item">
                    {filterText}
                </ForwardedRefSelectItem>
            );

            menuSlots.push(customItem);
        }

        return {
            inputSlots,
            menuSlots,
            clearButton,
        };
    }, [children, filterText, shouldAddCustomItem]);

    const getItemByValue = useCallback(
        (value?: string) => (value ? itemValues.find((item) => item.value === value) : undefined),
        [itemValues],
    );

    const items = useMemo(() => {
        const filteredItems = itemValues.filter(
            (item) => filterText === '' || item.label.toLowerCase().includes(filterText.toLowerCase()),
        );

        if (shouldAddCustomItem) {
            filteredItems.push({ label: filterText, value: filterText });
        }

        return filteredItems;
    }, [itemValues, shouldAddCustomItem, filterText]);

    return {
        inputSlots,
        menuSlots,
        clearButton,
        filterText,
        items,
        valueExists,
        setFilterText,
        getItemByValue,
    };
};
