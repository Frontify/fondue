/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AriaList } from "@components/Menu/Aria/AriaList";
import { AriaMenuItem } from "@components/Menu/Aria/AriaMenuItem";
import { AriaSection } from "@components/Menu/Aria/AriaSection";
import { getDisabledItemIds, getKeyItemRecord, getMenuItems, mapToAriaProps } from "@components/Menu/Aria/helper";
import { MenuItemType } from "@components/Menu/SelectMenu";
import { useMenu, useMenuItem, useMenuSection } from "@react-aria/menu";
import { useTreeState } from "@react-stately/tree";
import React, { ReactElement, useRef } from "react";

export type ActionMenuItemType = MenuItemType & { onClick: () => void };

export type ActionMenuBlock = {
    id: string;
    menuItems: ActionMenuItemType[];
    ariaLabel?: string;
};

export type ActionMenuProps = {
    ariaLabel?: string;
    menuBlocks: ActionMenuBlock[];
};

export const ActionMenu = ({
    menuBlocks,
    ariaLabel = "Action Menu",
}: ActionMenuProps): ReactElement<ActionMenuProps> => {
    const items = getMenuItems(menuBlocks);
    const keyItemRecord = getKeyItemRecord(items);
    const props = mapToAriaProps(ariaLabel, menuBlocks);
    const state = useTreeState({
        ...props,
        selectionMode: "none",
        disabledKeys: getDisabledItemIds(items),
    });
    const menuRef = useRef<HTMLUListElement | null>(null);
    const { menuProps } = useMenu(props, state, menuRef);

    return (
        <AriaList ariaProps={menuProps} ref={menuRef}>
            {[...state.collection].map((section) => {
                const { key: sectionKey, "aria-label": sectionAriaLabel } = section;
                const { itemProps, groupProps } = useMenuSection({ "aria-label": sectionAriaLabel });

                return (
                    <AriaSection key={sectionKey} sectionProps={itemProps} groupProps={groupProps}>
                        {[...section.childNodes].map((item) => {
                            const menuItem = keyItemRecord[item.key];
                            const itemRef = useRef<HTMLLIElement | null>(null);
                            const { menuItemProps } = useMenuItem(
                                {
                                    ...item,
                                    onAction: () => menuItem?.onClick(),
                                    isDisabled: menuItem?.disabled || false,
                                    "aria-label": menuItem?.title || "Menu item",
                                },
                                state,
                                itemRef,
                            );

                            return (
                                <AriaMenuItem
                                    key={item.key}
                                    menuItem={menuItem}
                                    ariaProps={menuItemProps}
                                    ref={itemRef}
                                />
                            );
                        })}
                    </AriaSection>
                );
            })}
        </AriaList>
    );
};
