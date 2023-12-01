/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { ReactElement, useContext, useMemo, useRef } from 'react';
import { FOCUS_STYLE_INSET_NO_OFFSET } from '@utilities/focusStyle';
import { SelectContext, SelectContextProps } from '@components/Select/Select';

export type SelectItemProps = {
    id: string;
    value: string;
    decorator?: ReactElement;
    title?: string;
    disabled?: boolean;
    'data-test-id'?: string;
};

export const SelectItem = ({
    id,
    disabled = false,
    decorator,
    value,
    title,
    'data-test-id': dataTestId = 'fondue-select-item',
}: SelectItemProps) => {
    const { getItemProps, itemsArray, selectedItem, highlightedIndex, parentWidth } =
        useContext<SelectContextProps>(SelectContext);
    const itemElementRef = useRef<HTMLLIElement | null>(null);

    const item: SelectItemProps = useMemo(() => {
        return {
            id,
            value,
        };
    }, [value, id]);

    const index = itemsArray.findIndex((item: SelectItemProps) => item.id === id);

    return (
        <li
            className={merge([
                'tw-p-2 tw-shadow-sm tw-flex tw-justify-start tw-items-center tw-rounded tw-cursor-pointer',
                selectedItem?.id === item.id && 'tw-font-bold tw-bg-box-selected tw-text-box-selected-inverse',
                !disabled && highlightedIndex === index ? FOCUS_STYLE_INSET_NO_OFFSET : '',
                disabled
                    ? 'tw-cursor-not-allowed tw-bg-box-disabled tw-text-bog-disabled-inverse'
                    : 'tw-text-text-weak',
            ])}
            style={{ width: `${parentWidth}px` }}
            key={id}
            title={title ?? value}
            data-test-id={dataTestId}
            {...getItemProps?.({ item, index, ref: itemElementRef })}
        >
            {decorator ? <span className="tw-pr-1">{decorator}</span> : null}
            <span>{title ?? value}</span>
        </li>
    );
};
SelectItem.displayName = 'FondueSelectItem';
