/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ReactElement } from 'react';
import type { SelectContextProps } from '@components/Select/Select';
import { merge } from '@utilities/merge';
import { SelectContext } from '@components/Select/Select';
import { cloneElement, useContext, useMemo, useRef } from 'react';

export type SelectGroupItemProps = {
    children: ReactElement[];
    groupTitle?: string;
    'data-test-id'?: string;
};

export const SelectGroupItem = ({
    children,
    groupTitle,
    'data-test-id': dataTestId = 'fondue-select-group',
}: SelectGroupItemProps) => {
    const selectMenuRef = useRef<HTMLUListElement | null>(null);
    const { getMenuProps, parentWidth } = useContext<SelectContextProps>(SelectContext);

    const renderChildren = useMemo(() => children.map((child) => cloneElement(child)), [children]);

    return (
        <ul
            title={groupTitle}
            style={{ width: `${parentWidth}px` }}
            className={merge([
                '[&[title]]:before:tw-p-4 [&[title]]:before:tw-block before:tw-content-[attr(title)]',
                groupTitle ? '[&>li]:tw-pl-8' : '',
            ])}
            aria-label={`${groupTitle} menu group`}
            {...getMenuProps?.({ ref: selectMenuRef }, { suppressRefError: true })}
            data-test-id={dataTestId}
        >
            {renderChildren}
        </ul>
    );
};
SelectGroupItem.displayName = 'FondueSelectGroupItem';
