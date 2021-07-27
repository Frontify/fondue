/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Size, Style } from "@utilities/enum";
import { merge } from "@utilities/merge";
import { ReactElement } from "react";
import MenuItemContent, { MenuItemContentProps, SelectionIndicatorIcon } from "../MenuItemContent/MenuItemContent";

export type DropdownMenuItemProps = {
    onClick?: () => void;
} & MenuItemContentProps;

export default function DropdownMenuItem({
    title,
    icon,
    onClick,
    subtitle = "",
    size = Size.Small,
    style = Style.Primary,
    disabled = false,
    active = false,
    selectionIndicator = SelectionIndicatorIcon.Check,
}: DropdownMenuItemProps): ReactElement<DropdownMenuItemProps> {
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
}
