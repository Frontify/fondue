/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Item, Section } from '@react-stately/collections';
import React, { ReactNode } from 'react';
import { ActionMenuBlock, ActionMenuItemType } from '../ActionMenu/ActionMenu';
import { MenuBlock, MenuItemType } from '../../Dropdown/SelectMenu/SelectMenu';

export type MenuStateType = {
    'aria-label': string;
    children: ReactNode;
};

// Method return type is unclear because React Aria hook props are inexplicitly typed
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mapToAriaProps = (ariaLabel: string, menuBlocks: MenuBlock[] | ActionMenuBlock[]) => ({
    'aria-label': ariaLabel,
    children: menuBlocks.map(({ id, menuItems, ariaLabel: sectionAriaLabel }) => (
        <Section title={id} key={id} aria-label={sectionAriaLabel}>
            {menuItems.map((menuItem) => (
                <Item key={menuItem.id}>{menuItem.title}</Item>
            ))}
        </Section>
    )),
});

export const getMenuItems = <T extends MenuBlock | ActionMenuBlock = MenuBlock>(menuBlocks: T[]): T['menuItems'] =>
    menuBlocks.flatMap(({ menuItems }) => menuItems);

export const getKeyItemRecord = <T extends MenuItemType | ActionMenuItemType = MenuItemType>(
    items: T[],
): Record<string, T> => items.reduce<Record<string, T>>((previous, item) => ({ ...previous, [item.id]: item }), {});

export const getDisabledItemIds = <T extends MenuItemType | ActionMenuItemType = MenuItemType>(
    items: T[],
): Set<T['id']> =>
    new Set(
        items
            .reduce((acc: (string | number)[], curr: MenuItemType) => [...acc, curr.disabled ? curr.id : ''], [])
            .filter((id) => id !== '')
            .map((id) => id.toString()),
    );
