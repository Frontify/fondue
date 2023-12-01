/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectContext, SelectContextProps } from '@components/Select/Select';
import { merge } from '@utilities/merge';
import { ReactElement, cloneElement, useContext, useRef } from 'react';

export type SelectGroupItemsProps = {
    children: ReactElement[];
    groupTitle?: string;
    'data-test-id'?: string;
};

export const SelectGroupItems = ({
    children,
    groupTitle,
    'data-test-id': dataTestId = 'fondue-select-group',
}: SelectGroupItemsProps) => {
    const { getMenuProps, parentWidth } = useContext<SelectContextProps>(SelectContext);
    const selectMenuRef = useRef<HTMLUListElement | null>(null);

    const renderChildren = () => children.map((child) => cloneElement(child));

    return (
        <ul
            title={groupTitle}
            className={merge([
                '[&[title]]:before:tw-p-4 [&[title]]:before:tw-block before:tw-content-[attr(title)]',
                groupTitle ? '[&>li]:tw-pl-8' : '',
            ])}
            style={{ width: `${parentWidth}px` }}
            data-test-id={dataTestId}
            aria-label={`${groupTitle} menu group`}
            {...getMenuProps?.({ ref: selectMenuRef }, { suppressRefError: true })}
        >
            {renderChildren()}
        </ul>
    );
};
SelectGroupItems.displayName = 'FondueSelectGroupItems';
