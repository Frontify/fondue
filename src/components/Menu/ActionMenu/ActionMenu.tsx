/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AriaList } from "@components/Menu/Aria/AriaList";
import { AriaMenuItem } from "@components/Menu/Aria/AriaMenuItem";
import { AriaSection } from "@components/Menu/Aria/AriaSection";
import { getDisabledItemIds, getKeyItemRecord, getMenuItems, mapToAriaProps } from "@components/Menu/Aria/helper";
import { useMenu, useMenuItem, useMenuSection } from "@react-aria/menu";
import { useTreeState } from "@react-stately/tree";
import React, { ReactElement, useRef } from "react";
import { ActionMenuProps, MenuStyle } from "../types";

export const ActionMenu = ({
    menuBlocks,
    focus,
    style = MenuStyle.WithBorder,
    ariaLabel = "Action Menu",
    scrollable = false,
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
    const { menuProps } = useMenu({ ...props, autoFocus: focus }, state, menuRef);

    return (
        <AriaList ariaProps={{ ...menuProps }} ref={menuRef} scrollable={scrollable} style={style}>
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
                                    "aria-label": typeof menuItem?.title === "string" ? menuItem?.title : "Menu item",
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
