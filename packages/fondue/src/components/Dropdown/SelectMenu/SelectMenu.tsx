/* react-aria hook props types are inexplicitly typed */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getKeyItemRecord, getMenuItems } from '@components/ActionMenu/Aria/helper';
import { MenuItemProps } from '@components/MenuItem/MenuItem';
import { AriaListBoxOptions, useListBox } from '@react-aria/listbox';
import { ListState } from '@react-stately/list';
import { merge } from '@utilities/merge';
import { ReactElement, useRef } from 'react';
import { SelectMenuItem } from './SelectMenuItem';
import { SelectMenuSection } from './SelectMenuSection';

export type MenuItemType = Omit<MenuItemProps, 'switchComponent'> & { id: string | number; link?: string };

export type MenuBlock = {
    id: string;
    menuItems: MenuItemType[];
    ariaLabel?: string;
};

export type SelectMenuProps = {
    menuBlocks: MenuBlock[];
    ariaProps: AriaListBoxOptions<any>;
    state: ListState<any>;
    ariaLabel?: string;
    scrollable?: boolean;
};

export const SelectMenu = ({
    menuBlocks,
    ariaProps,
    state,
    ariaLabel = 'Select Menu',
    scrollable = false,
}: SelectMenuProps): ReactElement<SelectMenuProps> => {
    const items = getMenuItems(menuBlocks);
    const keyItemRecord = getKeyItemRecord(items);
    const listRef = useRef<HTMLUListElement | null>(null);
    const { listBoxProps } = useListBox(
        {
            ...ariaProps,
            'aria-label': ariaLabel,
        },
        state,
        listRef,
    );

    return (
        <ul
            {...listBoxProps}
            ref={listRef}
            className={merge([
                'tw-list-none tw-p-0 tw-m-0 tw-bg-base tw-z-20 focus-visible:tw-outline-none',
                scrollable && 'tw-overflow-y-auto',
            ])}
        >
            {[...state.collection].map((section) => {
                return (
                    <SelectMenuSection key={section.key} ariaLabel={section['aria-label']}>
                        {[...section.childNodes].map((item) => (
                            <SelectMenuItem
                                key={item.key}
                                state={state}
                                node={item}
                                menuItem={keyItemRecord[item.key as string]}
                            />
                        ))}
                    </SelectMenuSection>
                );
            })}
        </ul>
    );
};
SelectMenu.displayName = 'FondueSelectMenu';
