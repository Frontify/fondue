/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItem } from "@components/MenuItem";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { getInteractionModality } from "@react-aria/interactions";
import { useOption } from "@react-aria/listbox";
import { merge } from "@utilities/merge";
import { useActor } from "@xstate/react";
import React, { FC, useRef } from "react";
import { sections } from "./sections";
import { DropdownState, LinkChooserState } from "./state/machine";
import { SectionActionMenuItemProps, SectionActionMenuProps } from "./types";
import { goToSection } from "./utils/helpers";

export const SectionActionMenu: FC<SectionActionMenuProps> = (props: SectionActionMenuProps) => {
    const { machineService, state } = props;
    const [{ matches }, send] = useActor(machineService);

    return matches(`${LinkChooserState.Focused}.${DropdownState.Default}`) ? (
        <ul className="tw-py-2">
            {sections.map((section) => (
                <SectionActionMenuItem
                    key={section.id}
                    section={section}
                    state={state}
                    onPress={() => {
                        goToSection(section.id, send);
                    }}
                />
            ))}
        </ul>
    ) : null;
};

const SectionActionMenuItem: FC<SectionActionMenuItemProps> = ({ section, onPress, state }) => {
    const ref = useRef<HTMLLIElement>(null);
    const { isFocused } = useOption(
        {
            key: section.id,
        },
        state,
        ref,
    );

    const isFocusVisible = getInteractionModality() !== "pointer";

    return (
        <div
            onMouseDown={onPress}
            tabIndex={0}
            role="menuitem"
            aria-label={`Navigate to ${section.id} section of search results.`}
            key={section.id}
            data-test-id="menu-item"
            className={merge(["hover:tw-bg-black-0", isFocused && isFocusVisible && "tw-bg-black-0"])}
        >
            <MenuItem
                title={section.title}
                selectionIndicator={SelectionIndicatorIcon.CaretRight}
                size={MenuItemContentSize.XSmall}
            />
        </div>
    );
};
