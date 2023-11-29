/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_STYLE_INSET_NO_OFFSET } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap, validationTextClassMap } from '@utilities/validation';
import { useSelect } from 'downshift';
import { useEffect, useState } from 'react';
import { InputBaseProps } from 'src/types/input';

type SelectItem = {
    id: string;
    title: string;
    value: string | number;
};

export type SelectProps = {
    items: SelectItem[];
    label: string;
    hiddenLabel?: boolean;
    listGroupTitle?: string;
    onChange?: (value: SelectItem) => void;
} & Omit<InputBaseProps<string>, 'autocomplete' | 'clearable' | 'decorator' | 'suffix'>;

export const Select = ({
    label,
    hiddenLabel = false,
    items,
    listGroupTitle = 'Select a option',
    status = Validation.Default,
    onChange,
    'data-test-id': dataTestId = 'fondue-select',
}: SelectProps) => {
    const [selectedItem, setSelectedItem] = useState<SelectItem | null | undefined>(undefined);

    const itemToString = (item: SelectItem | null) => {
        return item ? item.title : '';
    };

    const { isOpen, highlightedIndex, getToggleButtonProps, getLabelProps, getMenuProps, getItemProps } = useSelect({
        items,
        itemToString,
        selectedItem,
        onSelectedItemChange: ({ selectedItem: newSelectedItem }) => setSelectedItem(newSelectedItem),
    });

    useEffect(() => {
        if (selectedItem) {
            onChange?.(selectedItem);
        }
    }, [selectedItem, onChange]);

    return (
        <div data-test-id={dataTestId}>
            <div className="tw-w-72 tw-flex tw-flex-col tw-gap-1">
                {hiddenLabel ? null : <label {...getLabelProps()}>{label}</label>}
                <div
                    className={merge([
                        'tw-p-2 tw-bg-base tw-flex tw-justify-between tw-cursor-pointer tw-border tw-rounded tw-border-line-strong',
                        status === Validation.Default
                            ? ''
                            : `${validationClassMap[status]} ${validationTextClassMap[status]}`,
                    ])}
                    {...getToggleButtonProps()}
                >
                    <span>{selectedItem ? selectedItem.title : listGroupTitle}</span>
                    <span className="tw-px-2">{isOpen ? <>&#8593;</> : <>&#8595;</>}</span>
                </div>
            </div>
            <ul
                className={merge([
                    'tw-absolute tw-w-72 tw-bg-base tw-mt-1 tw-shadow-md tw-max-h-80 tw-overflow-scroll tw-p-0 tw-z-10',
                    isOpen ? 'tw-display' : 'tw-hidden',
                ])}
                {...getMenuProps()}
                data-test-id={`${dataTestId}-list`}
            >
                {isOpen &&
                    items.map((item, index) => (
                        <li
                            className={merge([
                                'tw-p-3 tw-shadow-sm tw-flex tw-flex-col tw-rounded',
                                selectedItem === item && 'tw-font-bold',
                                highlightedIndex === index ? FOCUS_STYLE_INSET_NO_OFFSET : '',
                            ])}
                            key={item.id}
                            {...getItemProps({ item, index })}
                            data-test-id={`${dataTestId}-list-item`}
                        >
                            <span className="tw-text-text-weak">{item.title}</span>
                            <span className="tw-text-sm tw-text-text-weak">{item.value}</span>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
Select.displayName = 'FondueSelect';
