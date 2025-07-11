/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross } from '@frontify/fondue-icons';
import {
    Children,
    cloneElement,
    isValidElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import { ForwardedRefSelectItem, type SelectItemProps } from './SelectItem';
import { ForwardedRefSelectSlot, type SelectSlotProps } from './SelectSlot';
import { getSelectOptionValue } from './utils';

export type SelectItemType = {
    value: string;
    label: string;
};

export type AsyncOptionResult = {
    value: string;
    label: string;
    children: ReactNode;
};

export type AsyncOptionFetchFunction = (filterText: string) => Promise<AsyncOptionResult[]>;

/**
 * Recursively extracts option values from children.
 * This function traverses through the React component tree and collects all SelectItem values.
 *
 * @param {ReactNode} children - The React children to extract values from.
 * @returns {SelectItemType[]} An array of SelectItemType objects.
 *
 * @example
 * const options = (
 *   <SelectItem value="1">Option 1</SelectItem>
 *   <SelectItem value="2">Option 2</SelectItem>
 * );
 * const values = getRecursiveOptionValues(options);
 * // Returns: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]
 */
export const getRecursiveOptionValues = (
    children: ReactNode,
): { value: string; label: string; children?: ReactNode }[] => {
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

const useAsyncOptions = (filterText: string, getAsyncOptionValues?: AsyncOptionFetchFunction) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [asyncResult, setAsyncResult] = useState<{
        options: SelectItemType[];
        menuItems: ReactNode[];
    }>({ options: [], menuItems: [] });

    useEffect(() => {
        if (getAsyncOptionValues) {
            if (filterText === '') {
                setAsyncResult({ options: [], menuItems: [] });
            }
            setIsLoading(true);
            getAsyncOptionValues(filterText)
                .then((options) => {
                    setAsyncResult({
                        options: options.map((option) => ({
                            value: option.value,
                            label: option.label,
                        })),
                        menuItems: options.map((option) => option.children),
                    });
                    setIsLoading(false);
                })
                .catch(() => {
                    setHasError(true);
                    setIsLoading(false);
                });
        }
    }, [getAsyncOptionValues, filterText]);

    return { asyncOptions: asyncResult.options, asyncMenuItems: asyncResult.menuItems, isLoading, hasError };
};

/**
 * Custom hook for managing select data and filtering.
 *
 * @param {ReactNode} children - The React children to process, typically SelectItem components.
 * @returns {Object} An object containing the processed data.
 */
export const useSelectData = (children: ReactNode, getAsyncOptions?: AsyncOptionFetchFunction) => {
    const [filterText, setFilterText] = useState('');
    const { asyncOptions, asyncMenuItems, isLoading } = useAsyncOptions(filterText, getAsyncOptions);
    const { inputSlots, menuSlots, itemValues, clearButton } = useMemo(() => {
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

        const itemValues = getRecursiveOptionValues(menuSlots);

        return { inputSlots, menuSlots, itemValues, clearButton };
    }, [children]);

    const items = useMemo(
        () =>
            itemValues.filter(
                (item) => filterText === '' || item.label.toLowerCase().includes(filterText.toLowerCase()),
            ),
        [itemValues, filterText],
    );

    const getItemByValue = useCallback(
        (value?: string | null) => (value ? itemValues.find((item) => item.value === value) : undefined),
        [itemValues],
    );

    return {
        items: [...items, ...asyncOptions],
        menuSlots: [...menuSlots, ...asyncMenuItems],
        filterText,
        inputSlots,
        isLoadingAsyncOptions: isLoading,
        clearButton,
        setFilterText,
        getItemByValue,
    };
};
