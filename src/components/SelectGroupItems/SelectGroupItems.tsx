/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectItemProps } from '@components/SelectItem/SelectItem';
import { UseSelectPropGetters } from 'downshift';
import { ReactElement, cloneElement } from 'react';

export type SelectGroupItemsProps = {
    children: ReactElement[];
    getMenuProps?: Pick<UseSelectPropGetters<SelectItemProps>, 'getMenuProps'>;
    getItemProps?: Pick<UseSelectPropGetters<SelectItemProps>, 'getItemProps'>;
    selectedItemId?: string;
    highlightedIndex?: number;
    onChange?: (item: SelectItemProps) => void;
    'data-test-id'?: string;
};

export const SelectGroupItems = ({
    children,
    getMenuProps,
    getItemProps,
    selectedItemId,
    highlightedIndex,
    onChange,
    'data-test-id': dataTestId = 'fondue-select-group',
}: SelectGroupItemsProps) => {
    const handleOnClick = (item: SelectItemProps) => {
        onChange?.(item);
    };

    const renderChildren = () =>
        children.map((child) =>
            cloneElement(child, { onClick: handleOnClick, getItemProps, highlightedIndex, selectedItemId }),
        );

    return (
        <ul {...getMenuProps} data-test-id={dataTestId}>
            {renderChildren()}
        </ul>
    );
};
SelectGroupItems.displayName = 'FondueSelectGroupItems';
