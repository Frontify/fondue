/* react-aria hook props types are inexplicitly typed */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AriaList } from "@components/Menu/Aria/AriaList";
import { AriaMenuItem } from "@components/Menu/Aria/AriaMenuItem";
import { AriaSection } from "@components/Menu/Aria/AriaSection";
import { getKeyItemRecord, getMenuItems } from "@components/Menu/Aria/helper";
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox";
import React, { ReactElement, useRef } from "react";
import { SelectMenuProps } from "./types";

export const SelectMenu = ({
    menuBlocks,
    ariaProps,
    state,
    ariaLabel = "Select Menu",
    scrollable = false,
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
        <AriaList ariaProps={listBoxProps} ref={listRef} scrollable={scrollable}>
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
