/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AriaList } from "@components/Menu/Aria/AriaList";
import { AriaMenuItem } from "@components/Menu/Aria/AriaMenuItem";
import { AriaSection } from "@components/Menu/Aria/AriaSection";
import { getDisabledItemIds, getKeyItemRecord, getMenuItems, mapToAriaProps } from "@components/Menu/Aria/helper";
import { MenuItemType } from "@components/Menu/SelectMenu";
import { useMenu } from "@react-aria/menu";
import { useTreeState } from "@react-stately/tree";
import { FocusStrategy } from "@react-types/shared";
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
    focus?: FocusStrategy;
    border?: boolean;
    scrollable?: boolean;
};

export const ActionMenu = ({
    menuBlocks,
    ariaLabel = "Action Menu",
    focus,
    border = true,
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
        <AriaList ariaProps={{ ...menuProps }} ref={menuRef} border={border} scrollable={scrollable}>
            {[...state.collection].map((section) => {
                const { key: sectionKey, "aria-label": sectionAriaLabel } = section;

                return (
                    <AriaSection key={sectionKey} ariaLabel={sectionAriaLabel}>
                        {[...section.childNodes].map((item) => {
                            const menuItem = keyItemRecord[item.key];

                            return <AriaMenuItem key={item.key} menuItem={menuItem} state={state} node={item} />;
                        })}
                    </AriaSection>
                );
            })}
        </AriaList>
    );
};
