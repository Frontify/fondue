/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AriaList } from '@components/ActionMenu/Aria/AriaList';
import { AriaMenuItem } from '@components/ActionMenu/Aria/AriaMenuItem';
import { AriaSection } from '@components/ActionMenu/Aria/AriaSection';
import { getDisabledItemIds, getKeyItemRecord, getMenuItems, mapToAriaProps } from '@components/ActionMenu/Aria/helper';
import { MenuItemType } from '@components/Dropdown/SelectMenu/SelectMenu';
import { useMenu } from '@react-aria/menu';
import { useTreeState } from '@react-stately/tree';
import { FocusStrategy } from '@react-types/shared';
import { ReactElement, useRef } from 'react';

export type ActionMenuItemType = MenuItemType & { onClick: () => void };
export type ActionMenuSwitchItemType = MenuItemType & {
    onClick: (switchValue: boolean) => void;
    type: 'switch';
    initialValue: boolean;
};

export type ActionMenuBlock = {
    id: string;
    menuItems: (ActionMenuItemType | ActionMenuSwitchItemType)[];
    ariaLabel?: string;
};

export type ActionMenuProps = {
    ariaLabel?: string;
    menuBlocks: ActionMenuBlock[];
    focus?: FocusStrategy;
    border?: boolean;
    scrollable?: boolean;
    onClick?: () => void;
};

export const ActionMenu = ({
    menuBlocks,
    ariaLabel = 'Action Menu',
    focus,
    border = true,
    scrollable = false,
    onClick,
}: ActionMenuProps): ReactElement<ActionMenuProps> => {
    const items = getMenuItems(menuBlocks);
    const keyItemRecord = getKeyItemRecord(items);
    const props = mapToAriaProps(ariaLabel, menuBlocks);
    const state = useTreeState({
        ...props,
        selectionMode: 'none',
        disabledKeys: getDisabledItemIds(items),
    });
    const menuRef = useRef<HTMLUListElement | null>(null);
    const { menuProps } = useMenu({ ...props, autoFocus: focus }, state, menuRef);

    return (
        <AriaList ariaProps={{ ...menuProps }} ref={menuRef} border={border} scrollable={scrollable}>
            {[...state.collection].map((section) => {
                const { key: sectionKey, 'aria-label': sectionAriaLabel } = section;

                return (
                    <AriaSection key={sectionKey} ariaLabel={sectionAriaLabel}>
                        {[...section.childNodes].map((item) => (
                            <AriaMenuItem
                                key={item.key}
                                menuItem={keyItemRecord[item.key as string]}
                                state={state}
                                node={item}
                                onClick={onClick}
                            />
                        ))}
                    </AriaSection>
                );
            })}
        </AriaList>
    );
};
ActionMenu.displayName = 'FondueActionMenu';
