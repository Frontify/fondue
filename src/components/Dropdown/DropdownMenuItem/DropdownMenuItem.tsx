/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from "react";
import {
    MenuItemContent,
    MenuItemContentProps,
    MenuItemContentSize,
    MenuItemContentStyle,
    SelectionIndicatorIcon,
} from "@components/Dropdown/MenuItemContent/MenuItemContent";
import { merge } from "@utilities/merge";

export type DropdownMenuItemProps = {
    onClick?: () => void;
} & MenuItemContentProps;

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
    title,
    icon,
    onClick,
    subtitle = "",
    size = MenuItemContentSize.Small,
    style = MenuItemContentStyle.Primary,
    disabled = false,
    active = false,
    selectionIndicator = SelectionIndicatorIcon.Check,
}) => (
    /* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/role-supports-aria-props,jsx-a11y/no-noninteractive-tabindex */
    <li
        data-test-id="dropdown-menu-item"
        className={merge(["tw-relative focus:tw-bg-white hover:tw-bg-black-0", disabled && "tw-pointer-events-none"])}
        tabIndex={disabled ? 0 : 1}
        onClick={() => onClick && onClick()}
        aria-selected={active}
    >
        <MenuItemContent
            title={title}
            icon={icon}
            subtitle={subtitle}
            size={size}
            style={style}
            disabled={disabled}
            active={active}
            selectionIndicator={selectionIndicator}
        />
    </li>
    /* eslint-enable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/role-supports-aria-props,jsx-a11y/no-noninteractive-tabindex */
);
