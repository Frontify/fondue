/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { UseSelectPropGetters } from 'downshift';
import { ReactElement, useMemo } from 'react';

import { FOCUS_STYLE_INSET_NO_OFFSET } from '@utilities/focusStyle';

export type SelectItemProps = {
    id: string;
    value: string;
    index: number;
    decoration?: ReactElement;
    selectedItemId?: string;
    highlightedIndex?: number;
    title?: string;
    getItemProps?: (
        item: SelectItemProps,
        index: number,
    ) => Pick<UseSelectPropGetters<SelectItemProps>, 'getItemProps'>;
    onClick?: (item: SelectItemProps) => void;
    'data-test-id'?: string;
};

export const SelectItem = ({
    value,
    title,
    id,
    index,
    decoration,
    selectedItemId,
    highlightedIndex,
    getItemProps,
    'data-test-id': dataTestId = 'fondue-select-item',
}: SelectItemProps) => {
    const item: SelectItemProps = useMemo(() => {
        return {
            value,
            title,
            id,
            index,
        };
    }, [value, title, id, index]);

    return (
        <li
            className={merge([
                'tw-p-3 tw-shadow-sm tw-flex tw-rounded tw-cursor-pointer',
                selectedItemId === item.id && 'tw-font-bold',
                highlightedIndex === index ? FOCUS_STYLE_INSET_NO_OFFSET : '',
            ])}
            key={id}
            id={`select-item-${id}`}
            {...getItemProps?.(item, index)}
            data-test-id={`${dataTestId}-list-item`}
        >
            {decoration ? <span className="tw-text-text-weak">{decoration}</span> : null}
            <span className="tw-text-text-weak">{title ?? value}</span>
        </li>
    );
};
SelectItem.displayName = 'FondueSelectItem';
