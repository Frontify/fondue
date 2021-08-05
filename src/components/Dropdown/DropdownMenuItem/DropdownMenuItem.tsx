/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    MenuItemContent,
    MenuItemContentProps,
    MenuItemContentSize,
    MenuItemContentStyle,
    SelectionIndicatorIcon,
} from "@components/Dropdown/MenuItemContent/MenuItemContent";
import { merge } from "@utilities/merge";
import { ReactElement } from "react";

export type DropdownMenuItemProps = {
    onClick?: () => void;
} & MenuItemContentProps;

export const DropdownMenuItem = ({
    title,
    icon,
    onClick,
    subtitle = "",
    size = MenuItemContentSize.Small,
    style = MenuItemContentStyle.Primary,
    disabled = false,
    active = false,
    selectionIndicator = SelectionIndicatorIcon.Check,
}: DropdownMenuItemProps): ReactElement<DropdownMenuItemProps> => {
    /* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/role-supports-aria-props,jsx-a11y/no-noninteractive-tabindex */
    return (
        <li
            data-test-id="dropdown-menu-item"
            className={merge(["relative focus:bg-white hover:bg-black-0", disabled && "pointer-events-none"])}
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
    );
    /* eslint-enable jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/role-supports-aria-props,jsx-a11y/no-noninteractive-tabindex */
};
