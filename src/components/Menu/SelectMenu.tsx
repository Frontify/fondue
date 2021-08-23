/* react-aria hook props types are inexplicitly typed */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AriaList } from "@components/Menu/Aria/AriaList";
import { AriaMenuItem } from "@components/Menu/Aria/AriaMenuItem";
import { AriaSection } from "@components/Menu/Aria/AriaSection";
import { getKeyItemRecord, getMenuItems } from "@components/Menu/Aria/helper";
import { MenuItemProps } from "@components/Menu/MenuItem/MenuItem";
import { AriaListBoxOptions, useListBox, useListBoxSection, useOption } from "@react-aria/listbox";
import { SelectState } from "@react-stately/select";
import React, { ReactElement, useRef } from "react";

export type MenuItemType = MenuItemProps & { id: string };

export type MenuBlock = {
    id: string;
    menuItems: MenuItemType[];
    ariaLabel?: string;
};

export type SelectMenuProps = {
    menuBlocks: MenuBlock[];
    ariaProps: AriaListBoxOptions<any>;
    state: SelectState<any>;
    ariaLabel?: string;
};

export const SelectMenu = ({
    menuBlocks,
    ariaProps,
    state,
    ariaLabel = "Select Menu",
}: SelectMenuProps): ReactElement<SelectMenuProps> => {
    const items = getMenuItems(menuBlocks);
    const keyItemRecord = getKeyItemRecord(items);
    const listRef = useRef<HTMLUListElement | null>(null);
    const { listBoxProps } = useListBox(
        {
            ...ariaProps,
            "aria-label": ariaLabel,
        },
        state,
        listRef,
    );

    return (
        <AriaList ariaProps={listBoxProps} ref={listRef}>
            {[...state.collection].map((section) => {
                const { key: sectionKey, "aria-label": sectionAriaLabel } = section;
                const { itemProps, groupProps } = useListBoxSection({ "aria-label": sectionAriaLabel });

                return (
                    <AriaSection key={sectionKey} sectionProps={itemProps} groupProps={groupProps}>
                        {[...section.childNodes].map((item) => {
                            const menuItem = keyItemRecord[item.key];
                            const ref = useRef<HTMLLIElement | null>(null);
                            const { optionProps, isSelected } = useOption(
                                {
                                    key: item.key,
                                    shouldFocusOnHover: false,
                                },
                                state,
                                ref,
                            );

                            return (
                                <AriaMenuItem
                                    key={item.key}
                                    menuItem={menuItem}
                                    ref={ref}
                                    ariaProps={optionProps}
                                    isSelected={isSelected}
                                />
                            );
                        })}
                    </AriaSection>
                );
            })}
        </AriaList>
    );
};
