/* eslint-disable jsx-a11y/click-events-have-key-events */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItem } from "@components/MenuItem";
import { SelectionIndicatorIcon } from "@components/MenuItem/MenuItem";
import { MenuItemContentSize } from "@components/MenuItem/MenuItemContent";
import { IconArrowLeft } from "@foundation/Icon";
import { getInteractionModality } from "@react-aria/interactions";
import { useOption } from "@react-aria/listbox";
import { merge } from "@utilities/merge";
import { useActor } from "@xstate/react";
import React, { FC, useRef } from "react";
import { sections } from "./sections";
import { DropdownState, LinkChooserState } from "./state/machine";
import { NavigationMenuItemProps, NavigationMenuProps } from "./types";
import { goToSection } from "./utils/helpers";

export const NavigationMenu: FC<NavigationMenuProps> = (props: NavigationMenuProps) => {
    const { machineService, state } = props;
    const [{ matches }, send] = useActor(machineService);

    return matches(`${LinkChooserState.Focused}.${DropdownState.Default}`) ? (
        <ul className="tw-py-2">
            {sections.map((section) => (
                <NavigationMenuItem
                    key={section.id}
                    section={section}
                    title={section.title}
                    state={state}
                    onPress={() => {
                        goToSection(section.id, send);
                    }}
                />
            ))}
        </ul>
    ) : null;
};

export const NavigationMenuItem: FC<NavigationMenuItemProps> = ({
    section,
    onPress,
    state,
    title,
    direction = "right",
}) => {
    const ref = useRef<HTMLLIElement>(null);
    const { isFocused } = useOption(
        {
            key: section.id,
            shouldFocusOnHover: false,
        },
        state,
        ref,
    );

    const isFocusVisible = getInteractionModality() !== "pointer";

    return (
        <div
            onClick={onPress}
            tabIndex={0}
            role="menuitem"
            aria-label={`Navigate to ${section.id} section of search results.`}
            data-key={section.id}
            data-test-id="link-chooser-navigation-menu-item"
            className={merge(["hover:tw-bg-black-0", isFocused && isFocusVisible && "tw-bg-black-0"])}
        >
            <MenuItem
                title={title}
                selectionIndicator={direction === "right" ? SelectionIndicatorIcon.CaretRight : undefined}
                decorator={direction === "left" ? <IconArrowLeft /> : undefined}
                size={MenuItemContentSize.XSmall}
            />
        </div>
    );
};
