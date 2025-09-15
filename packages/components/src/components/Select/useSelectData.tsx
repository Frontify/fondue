/* (c) Copyright Frontify Ltd., all rights reserved. */

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

import { SelectClear } from './SelectClear';
import { ForwardedRefSelectItem, type SelectItemProps } from './SelectItem';
import { ForwardedRefSelectSlot, type SelectSlotProps } from './SelectSlot';
import { getSelectOptionValue } from './utils';

export type SelectItemType = {
    value: string;
    label: string;
};

export type AsyncItem = { label: string; value: string; content?: ReactNode };

export type AsyncItemsFetcher = (filterText: string) => Promise<AsyncItem[]>;

const useAsyncItems = (filterText: string, getAsyncItems?: AsyncItemsFetcher) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [asyncResult, setAsyncResult] = useState<{
        menuComponents: ReactNode[];
        items: { value: string; label: string; children?: ReactNode }[];
    }>({
        menuComponents: [],
        items: [],
    });

    useEffect(() => {
        setError(null);
        if (!getAsyncItems) {
            setAsyncResult({
                menuComponents: [],
                items: [],
            });
        }

        if (getAsyncItems) {
            setIsLoading(true);
            getAsyncItems(filterText)
                .then((items) => {
                    setAsyncResult({
                        menuComponents: items.map((item) => (
                            <ForwardedRefSelectItem key={item.value} label={item.label} value={item.value}>
                                {item.content ? item.content : item.label}
                            </ForwardedRefSelectItem>
                        )),
                        items: items.map((item) => ({ value: item.value, label: item.label, children: item.content })),
                    });
                    setIsLoading(false);
                })
                .catch((error: Error) => {
                    setError(error);
                    setIsLoading(false);
                });
        }
    }, [filterText, getAsyncItems]);

    return { isLoading, error, menuComponents: asyncResult.menuComponents, items: asyncResult.items };
};

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

/**
 * Custom hook for managing select data and filtering.
 *
 * @param {ReactNode} children - The React children to process, typically SelectItem components.
 * @param {AsyncItemsFetcher} [getAsyncItems] - Optional function to fetch items asynchronously based on filter text.
 * @returns {Object} An object containing the processed data.
 */
export const useSelectData = (children: ReactNode, getAsyncItems?: AsyncItemsFetcher) => {
    const [filterText, setFilterText] = useState('');
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
                            clearButton = cloneElement(child, { children: <SelectClear /> });
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

    const asyncItems = useAsyncItems(filterText, getAsyncItems);

    return {
        items: [...items, ...asyncItems.items],
        menuSlots: [...menuSlots, ...asyncItems.menuComponents],
        filterText,
        inputSlots,
        clearButton,
        setFilterText,
        getItemByValue,
        asyncItemStatus: {
            isLoading: asyncItems.isLoading,
            error: asyncItems.error,
        },
    };
};
